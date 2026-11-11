export type Option<T extends string = string> = { value: T; label: string };

export const CURRENT_INVESTMENTS = [
  { value: "real_estate", label: "Недвижимость" },
  { value: "deposit", label: "Банковский депозит" },
  { value: "cash_usd", label: "Наличные доллары" },
  { value: "gold", label: "Золото" },
  { value: "crypto", label: "Криптовалюта" },
  { value: "stocks", label: "Акции или фонды" },
  { value: "business", label: "Свой бизнес" },
  { value: "none", label: "Пока никуда" },
] as const satisfies readonly Option[];

export const INTEREST = [
  { value: "very", label: "Очень интересно" },
  { value: "somewhat", label: "Скорее интересно" },
  { value: "unsure", label: "Пока не знаю" },
  { value: "no", label: "Не интересно" },
] as const satisfies readonly Option[];

export const STARTING_AMOUNT = [
  { value: "lt100", label: "Меньше $100" },
  { value: "100_500", label: "$100–500" },
  { value: "500_2000", label: "$500–2 000" },
  { value: "2000_10000", label: "$2 000–10 000" },
  { value: "gt10000", label: "Больше $10 000" },
] as const satisfies readonly Option[];

export const FEE_WILLINGNESS = [
  { value: "none", label: "Не готов платить" },
  { value: "pct_0_5", label: "До 0,5% от суммы в год" },
  { value: "pct_1", label: "До 1% в год" },
  { value: "pct_2", label: "До 2% в год" },
  { value: "subscription", label: "Лучше фиксированная подписка" },
  { value: "unsure", label: "Затрудняюсь ответить" },
] as const satisfies readonly Option[];

export const CONCERNS = [
  { value: "losing_money", label: "Потерять деньги на падении рынка" },
  { value: "trust", label: "Мошенничество, недоверие к посреднику" },
  { value: "legality", label: "Законность и налоги" },
  { value: "withdrawal", label: "Сложно вывести деньги" },
  { value: "complexity", label: "Слишком сложно разобраться" },
  { value: "fees", label: "Высокие комиссии" },
  { value: "transfers", label: "Переводы за рубеж и курс валют" },
  { value: "sharia", label: "Соответствие нормам шариата" },
] as const satisfies readonly Option[];

export const values = <T extends string>(opts: readonly Option<T>[]) =>
  opts.map((o) => o.value) as [T, ...T[]];
