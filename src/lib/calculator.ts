export type CalculatorInput = {
  initial: number;
  monthly: number;
  years: number;
  /** Гипотетическая годовая доходность, в процентах. */
  annualRate: number;
};

export type YearPoint = {
  year: number;
  contributed: number;
  /** Разница между итогом и взносами; при отрицательной доходности — меньше нуля. */
  growth: number;
  total: number;
};

/** Ежемесячные взносы в конце месяца, ежемесячная капитализация. */
export function project({ initial, monthly, years, annualRate }: CalculatorInput): YearPoint[] {
  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  const points: YearPoint[] = [{ year: 0, contributed: initial, growth: 0, total: initial }];
  let total = initial;
  let contributed = initial;
  for (let month = 1; month <= years * 12; month++) {
    total = total * (1 + monthlyRate) + monthly;
    contributed += monthly;
    if (month % 12 === 0) {
      points.push({
        year: month / 12,
        contributed: Math.round(contributed),
        growth: Math.round(total - contributed),
        total: Math.round(total),
      });
    }
  }
  return points;
}

const usd = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const formatUsd = (n: number) => usd.format(n);

export function pluralYears(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "год";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "года";
  return "лет";
}
