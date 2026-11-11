/**
 * Изменение цен акций за 3 года: 10.11.2023 – 10.11.2026.
 * Источник: Yahoo Finance, цены закрытия (с поправкой на сплиты, без дивидендов).
 * Расчёт в долларах США, без учёта комиссий и налогов. При обновлении пересчитывайте все поля.
 */
export const HISTORY_PERIOD = { from: "10 ноября 2023", to: "10 ноября 2026" };

export type HistoryRow = {
  ticker: string;
  name: string;
  /** Цена акции в начале и в конце периода, $ */
  priceFrom: number;
  priceTo: number;
  /** Рост цены за весь период, % */
  rise: number;
  isIndex?: boolean;
};

export const HISTORY: HistoryRow[] = [
  { ticker: "NVDA", name: "Nvidia", priceFrom: 48.33, priceTo: 168.89, rise: 249.4 },
  { ticker: "GOOGL", name: "Alphabet (Google)", priceFrom: 132.59, priceTo: 287.38, rise: 116.7 },
  { ticker: "META", name: "Meta", priceFrom: 328.77, priceTo: 641.39, rise: 95.1 },
  { ticker: "AMZN", name: "Amazon", priceFrom: 143.56, priceTo: 270.87, rise: 88.7 },
  { ticker: "AAPL", name: "Apple", priceFrom: 186.4, priceTo: 348.51, rise: 87.0 },
  { ticker: "SPY", name: "Фонд на S&P 500", priceFrom: 440.61, priceTo: 749.92, rise: 70.2, isIndex: true },
  { ticker: "MSFT", name: "Microsoft", priceFrom: 369.67, priceTo: 533.16, rise: 44.2 },
];
