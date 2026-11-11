import { z } from "zod";
import {
  CONCERNS,
  CURRENT_INVESTMENTS,
  FEE_WILLINGNESS,
  INTEREST,
  STARTING_AMOUNT,
  values,
} from "./survey-options";

/** Поля защиты от спама, общие для обеих форм. */
const antiSpam = {
  /** Ловушка: скрытое поле, которое человек не заполняет. */
  website: z.string().max(200).optional(),
  /** Сколько миллисекунд форма была открыта до отправки. */
  elapsedMs: z.number().int().nonnegative(),
};

export const waitlistSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Укажите email")
    .max(254, "Слишком длинный адрес")
    .email("Похоже, в адресе ошибка"),
  ...antiSpam,
});

export const surveySchema = z.object({
  currentInvestments: z
    .array(z.enum(values(CURRENT_INVESTMENTS)))
    .min(1, "Выберите хотя бы один вариант")
    .max(CURRENT_INVESTMENTS.length),
  interest: z.enum(values(INTEREST), "Выберите вариант"),
  startingAmount: z.enum(values(STARTING_AMOUNT), "Выберите вариант"),
  feeWillingness: z.enum(values(FEE_WILLINGNESS), "Выберите вариант"),
  concerns: z
    .array(z.enum(values(CONCERNS)))
    .min(1, "Выберите хотя бы один вариант")
    .max(CONCERNS.length),
  comment: z.string().trim().max(1000, "Не больше 1000 символов").optional(),
  ...antiSpam,
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
export type SurveyInput = z.infer<typeof surveySchema>;

export type ApiError =
  | "invalid"
  | "too_fast"
  | "rate_limited"
  | "not_configured"
  | "storage_failed";

export type ApiResult = { ok: true } | { ok: false; error: ApiError };

export const ERROR_MESSAGES: Record<ApiError | "network", string> = {
  invalid: "Проверьте заполнение формы и отправьте ещё раз.",
  too_fast: "Форма отправлена слишком быстро. Подождите пару секунд и повторите.",
  rate_limited: "Слишком много попыток. Повторите через несколько минут.",
  not_configured:
    "Форма ещё не подключена к базе данных, поэтому ответ не сохранён. Попробуйте позже.",
  storage_failed: "Не получилось сохранить ответ. Повторите попытку чуть позже.",
  network: "Нет связи с сервером. Проверьте интернет и повторите — ответ не сохранён.",
};
