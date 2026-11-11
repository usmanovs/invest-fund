import type { ApiError } from "./validation";

const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

/**
 * Простое ограничение частоты в памяти процесса. На serverless-хостинге счётчик
 * живёт в пределах одного экземпляра — этого достаточно как базовой защиты.
 */
function rateLimited(key: string, limit: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > limit;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

type Guard =
  | { verdict: "pass" }
  | { verdict: "reject"; error: ApiError; status: number }
  /** Бот попал в ловушку: отвечаем «ок», но ничего не сохраняем. */
  | { verdict: "discard" };

export function guardSubmission(
  request: Request,
  form: string,
  input: { website?: string; elapsedMs: number },
  opts: { minElapsedMs: number; limit: number },
): Guard {
  if (rateLimited(`${form}:${clientIp(request)}`, opts.limit)) {
    return { verdict: "reject", error: "rate_limited", status: 429 };
  }
  if (input.website) return { verdict: "discard" };
  if (input.elapsedMs < opts.minElapsedMs) {
    return { verdict: "reject", error: "too_fast", status: 400 };
  }
  return { verdict: "pass" };
}
