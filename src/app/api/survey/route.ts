import { guardSubmission } from "@/lib/form-guard";
import { getSupabase } from "@/lib/supabase";
import { surveySchema, type ApiResult } from "@/lib/validation";

const json = (body: ApiResult, status = 200) => Response.json(body, { status });

export async function POST(request: Request) {
  const parsed = surveySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return json({ ok: false, error: "invalid" }, 400);

  const guard = guardSubmission(request, "survey", parsed.data, {
    minElapsedMs: 4000,
    limit: 5,
  });
  if (guard.verdict === "reject") return json({ ok: false, error: guard.error }, guard.status);
  if (guard.verdict === "discard") return json({ ok: true });

  const supabase = getSupabase();
  if (!supabase) return json({ ok: false, error: "not_configured" }, 503);

  const d = parsed.data;
  const { error } = await supabase.rpc("submit_survey", {
    p_current_investments: d.currentInvestments,
    p_interest: d.interest,
    p_starting_amount: d.startingAmount,
    p_fee_willingness: d.feeWillingness,
    p_concerns: d.concerns,
    p_comment: d.comment ?? null,
  });
  if (error) {
    console.error("submit_survey failed:", error.message);
    return json({ ok: false, error: "storage_failed" }, 502);
  }
  return json({ ok: true });
}
