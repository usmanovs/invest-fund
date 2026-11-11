"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CONCERNS,
  CURRENT_INVESTMENTS,
  FEE_WILLINGNESS,
  INTEREST,
  STARTING_AMOUNT,
} from "@/lib/survey-options";
import { surveySchema, type SurveyInput } from "@/lib/validation";
import { ChoiceGroup } from "./choice-group";
import { honeypotProps, useSubmit } from "./use-submit";

type Draft = {
  currentInvestments: SurveyInput["currentInvestments"];
  interest: SurveyInput["interest"] | "";
  startingAmount: SurveyInput["startingAmount"] | "";
  feeWillingness: SurveyInput["feeWillingness"] | "";
  concerns: SurveyInput["concerns"];
  comment: string;
};

const empty: Draft = {
  currentInvestments: [],
  interest: "",
  startingAmount: "",
  feeWillingness: "",
  concerns: [],
  comment: "",
};

export function SurveyForm() {
  const [draft, setDraft] = useState<Draft>(empty);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof Draft, string>>>({});
  const { status, message, submit } = useSubmit("/api/survey");

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = surveySchema.safeParse({ ...draft, website, elapsedMs: 0 });
    if (!parsed.success) {
      const next: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Draft;
        next[key] ??= issue.message;
      }
      setErrors(next);
      const first = Object.keys(empty).find((k) => next[k as keyof Draft]);
      if (first) document.getElementsByName(first)[0]?.closest("fieldset")?.scrollIntoView({ block: "center" });
      return;
    }
    void submit({ ...draft, website });
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-3xl bg-green-tint p-8 md:p-10">
        <h3 className="text-2xl font-medium text-green-deep">Ответы сохранены. Спасибо!</h3>
        <p className="mt-3 max-w-xl text-ink">
          Вы помогаете нам решить, стоит ли делать этот сервис и каким он должен быть. Если хотите
          узнать, чем всё закончится, оставьте email в листе ожидания ниже.
        </p>
      </div>
    );
  }

  const multiHint = "Можно выбрать несколько вариантов";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-10">
      <ChoiceGroup
        multiple
        legend="1. Куда вы сейчас вкладываете или где храните сбережения?"
        hint={multiHint}
        name="currentInvestments"
        options={CURRENT_INVESTMENTS}
        value={draft.currentInvestments}
        onChange={(v) => {
          // «Пока никуда» исключает остальные варианты.
          const pickedNone = v.includes("none") && !draft.currentInvestments.includes("none");
          set("currentInvestments", pickedNone ? ["none"] : v.filter((x) => x !== "none" || v.length === 1));
        }}
        error={errors.currentInvestments}
      />
      <ChoiceGroup
        legend="2. Насколько вам интересны индексные фонды США?"
        name="interest"
        options={INTEREST}
        value={draft.interest}
        onChange={(v) => set("interest", v)}
        error={errors.interest}
      />
      <ChoiceGroup
        legend="3. С какой суммы вы бы начали?"
        name="startingAmount"
        options={STARTING_AMOUNT}
        value={draft.startingAmount}
        onChange={(v) => set("startingAmount", v)}
        error={errors.startingAmount}
      />
      <ChoiceGroup
        legend="4. Сколько вы готовы платить за такой сервис?"
        hint="Например, 1% в год от $1 000 на счёте — это $10 в год"
        name="feeWillingness"
        options={FEE_WILLINGNESS}
        value={draft.feeWillingness}
        onChange={(v) => set("feeWillingness", v)}
        error={errors.feeWillingness}
      />
      <ChoiceGroup
        multiple
        legend="5. Что вас беспокоит больше всего?"
        hint={multiHint}
        name="concerns"
        options={CONCERNS}
        value={draft.concerns}
        onChange={(v) => set("concerns", v)}
        error={errors.concerns}
      />
      <div>
        <Label htmlFor="survey-comment" className="font-heading text-xl leading-snug font-medium">
          Хотите что-то добавить?
        </Label>
        <p className="mt-1 text-sm text-slate">Необязательно</p>
        <Textarea
          id="survey-comment"
          name="comment"
          rows={3}
          maxLength={1000}
          value={draft.comment}
          onChange={(e) => set("comment", e.target.value)}
          placeholder="Например, что помогло бы вам доверить сервису первые $100"
          className="mt-4 min-h-24 bg-white px-4 py-3 text-base md:text-base"
          aria-invalid={Boolean(errors.comment)}
        />
        {errors.comment ? (
          <p className="mt-2 text-sm font-medium text-destructive">{errors.comment}</p>
        ) : null}
      </div>

      <input {...honeypotProps} value={website} onChange={(e) => setWebsite(e.target.value)} />

      <div>
        <Button
          type="submit"
          disabled={status === "submitting"}
          className="h-13 w-full rounded-xl bg-navy px-8 text-base text-white hover:bg-navy-deep sm:w-auto"
        >
          {status === "submitting" ? "Отправляем…" : "Отправить ответы"}
        </Button>
        {status === "error" ? (
          <p role="alert" className="mt-4 text-sm font-medium text-destructive">
            {message}
          </p>
        ) : null}
        <p className="mt-4 text-sm text-slate">Опрос анонимный: мы не просим имя и контакты.</p>
      </div>
    </form>
  );
}
