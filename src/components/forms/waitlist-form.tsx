"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { waitlistSchema } from "@/lib/validation";
import { honeypotProps, useSubmit } from "./use-submit";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  const { status, message, submit } = useSubmit("/api/waitlist");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = waitlistSchema.safeParse({ email, website, elapsedMs: 0 });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Проверьте адрес");
      return;
    }
    setError("");
    void submit({ email: parsed.data.email, website });
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl bg-white/10 p-6">
        <p className="font-heading text-xl font-medium">Вы в листе ожидания</p>
        <p className="mt-2 text-muted-foreground">
          Адрес сохранён. Напишем, когда будут новости о проекте — и ни по какому другому поводу.
        </p>
      </div>
    );
  }

  const shownError = error || (status === "error" ? message : "");

  return (
    <form onSubmit={onSubmit} noValidate>
      <Label htmlFor="waitlist-email" className="text-[0.95rem] font-normal text-muted-foreground">
        Ваш email
      </Label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <Input
          id="waitlist-email"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={shownError ? "waitlist-error" : undefined}
          className="h-13 flex-1 border-input bg-white/5 px-4 text-base placeholder:text-white/40 md:text-base"
        />
        <Button
          type="submit"
          disabled={status === "submitting"}
          className="h-13 rounded-xl bg-green px-7 text-base text-white hover:bg-green-deep"
        >
          {status === "submitting" ? "Сохраняем…" : "Мне интересно"}
        </Button>
      </div>
      <input {...honeypotProps} value={website} onChange={(e) => setWebsite(e.target.value)} />
      {shownError ? (
        <p id="waitlist-error" role="alert" className="mt-3 text-sm font-medium text-[#ffb4ab]">
          {shownError}
        </p>
      ) : null}
    </form>
  );
}
