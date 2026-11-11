/**
 * Фактические результаты за 5 лет: 11.11.2021 – 10.11.2026.
 * Источник: Yahoo Finance, цены закрытия с поправкой на дивиденды и сплиты (adjusted close).
 * Расчёт в долларах США, без учёта комиссий и налогов. При обновлении пересчитывайте все поля.
 */
export const HISTORY_PERIOD = { from: "11 ноября 2021", to: "10 ноября 2026" };

export type HistoryRow = {
  ticker: string;
  name: string;
  /** Изменение за весь период, % */
  total: number;
  /** Среднегодовая доходность (CAGR), % */
  perYear: number;
  /** Самое глубокое падение от максимума внутри периода, % */
  maxDrawdown: number;
  isIndex?: boolean;
};

export const HISTORY: HistoryRow[] = [
  { ticker: "NVDA", name: "Nvidia", total: 458.2, perYear: 41.1, maxDrawdown: -66.3 },
  { ticker: "AAPL", name: "Apple", total: 141.3, perYear: 19.3, maxDrawdown: -33.4 },
  { ticker: "GOOGL", name: "Alphabet (Google)", total: 99.0, perYear: 14.8, maxDrawdown: -44.3 },
  { ticker: "META", name: "Meta", total: 97.6, perYear: 14.6, maxDrawdown: -74.4 },
  { ticker: "SPY", name: "Фонд на S&P 500", total: 72.9, perYear: 11.6, maxDrawdown: -24.5, isIndex: true },
  { ticker: "MSFT", name: "Microsoft", total: 67.1, perYear: 10.8, maxDrawdown: -37.1 },
  { ticker: "AMZN", name: "Amazon", total: 56.0, perYear: 9.3, maxDrawdown: -55.7 },
];
