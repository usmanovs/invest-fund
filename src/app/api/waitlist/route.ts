import { guardSubmission } from "@/lib/form-guard";
import { getSupabase } from "@/lib/supabase";
import { waitlistSchema, type ApiResult } from "@/lib/validation";

const json = (body: ApiResult, status = 200) => Response.json(body, { status });

export async function POST(request: Request) {
  const parsed = waitlistSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return json({ ok: false, error: "invalid" }, 400);

  const guard = guardSubmission(request, "waitlist", parsed.data, {
    minElapsedMs: 1500,
    limit: 5,
  });
  if (guard.verdict === "reject") return json({ ok: false, error: guard.error }, guard.status);
  if (guard.verdict === "discard") return json({ ok: true });

  const supabase = getSupabase();
  if (!supabase) return json({ ok: false, error: "not_configured" }, 503);

  const { error } = await supabase.rpc("join_waitlist", {
    p_email: parsed.data.email,
    p_source: "landing",
  });
  if (error) {
    console.error("join_waitlist failed:", error.message);
    return json({ ok: false, error: "storage_failed" }, 502);
  }
  return json({ ok: true });
}
