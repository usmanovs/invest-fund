"use client";

import { useEffect, useRef, useState } from "react";
import { ERROR_MESSAGES, type ApiResult } from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

/** Отправка формы на наш API. «Успех» показывается только после подтверждения сервера. */
export function useSubmit(endpoint: string) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  // Время открытия формы — для проверки на слишком быструю (автоматическую) отправку.
  const openedAt = useRef(0);
  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  async function submit(payload: Record<string, unknown>) {
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, elapsedMs: Date.now() - openedAt.current }),
      });
      const result = (await res.json().catch(() => null)) as ApiResult | null;
      if (res.ok && result?.ok) {
        setStatus("success");
        return;
      }
      setMessage(ERROR_MESSAGES[result && !result.ok ? result.error : "storage_failed"]);
      setStatus("error");
    } catch {
      setMessage(ERROR_MESSAGES.network);
      setStatus("error");
    }
  }

  return { status, message, submit };
}

/** Скрытое поле-ловушка для ботов. */
export const honeypotProps = {
  type: "text",
  name: "website",
  tabIndex: -1,
  autoComplete: "off",
  "aria-hidden": true,
  className: "absolute -left-[9999px] h-px w-px opacity-0",
} as const;
