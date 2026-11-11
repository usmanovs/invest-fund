import { HISTORY, HISTORY_PERIOD } from "@/lib/historical-returns";
import { cn } from "@/lib/utils";
import { Section, SectionHeading } from "../section";

const pct = (n: number) =>
  `+${n.toLocaleString("ru-RU", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
const usd = (n: number) =>
  `$${n.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const maxRise = Math.max(...HISTORY.map((r) => r.rise));

export function History() {
  return (
    <Section id="history" tone="mist">
      <SectionHeading
        title="Насколько выросли цены акций за три года"
        lead={`Цены акций крупнейших технологических компаний и фонда на индекс S&P 500 с ${HISTORY_PERIOD.from} по ${HISTORY_PERIOD.to}.`}
      />

      <div
        role="table"
        aria-label="Рост цен акций за три года"
        className="mt-12 rounded-3xl bg-white px-6 md:px-8"
      >
        <div
          role="row"
          className="hidden grid-cols-[1.1fr_1.8fr_1fr] gap-6 border-b border-line py-5 text-sm text-slate md:grid"
        >
          <span role="columnheader">Компания</span>
          <span role="columnheader">Рост цены за 3 года</span>
          <span role="columnheader" className="text-right">
            Цена акции
          </span>
        </div>
        {HISTORY.map((r) => (
          <div
            key={r.ticker}
            role="row"
            className="grid items-center gap-x-6 gap-y-3 border-b border-line py-5 last:border-b-0 md:grid-cols-[1.1fr_1.8fr_1fr]"
          >
            <span role="rowheader">
              <span className={cn("font-heading text-lg font-medium", r.isIndex && "text-green-deep")}>
                {r.name}
              </span>
              <span className="ml-2 text-sm text-slate">{r.ticker}</span>
            </span>
            <span role="cell" className="flex items-center gap-3">
              <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-mist">
                <span
                  className={cn("block h-full rounded-full", r.isIndex ? "bg-green" : "bg-navy")}
                  style={{ width: `${(r.rise / maxRise) * 100}%` }}
                />
              </span>
              <span className="w-20 text-right font-heading text-lg font-medium tabular-nums">
                {pct(r.rise)}
              </span>
            </span>
            <span role="cell" className="text-slate tabular-nums md:text-right">
              {usd(r.priceFrom)} → {usd(r.priceTo)}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-8 max-w-4xl text-sm leading-relaxed text-slate">
        <strong className="font-medium text-ink">Это прошлое, а не прогноз.</strong> Эти три года
        были удачными для рынка США; так бывает не всегда, и внутри периода цены этих акций падали
        на 30% и более от своих максимумов, а фонда на индекс — на 19%. Прошлый рост не гарантирует будущий. Источник: Yahoo
        Finance, цены закрытия с поправкой на сплиты, без дивидендов, комиссий и налогов. Фонд на
        S&amp;P 500 — SPDR S&amp;P 500 ETF (SPY). Не является инвестиционной рекомендацией.
      </p>
    </Section>
  );
}
