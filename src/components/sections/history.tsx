import { HISTORY, HISTORY_PERIOD } from "@/lib/historical-returns";
import { cn } from "@/lib/utils";
import { Section, SectionHeading } from "../section";

const pct = (n: number, sign = false) =>
  `${sign && n > 0 ? "+" : ""}${n.toLocaleString("ru-RU", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`.replace("-", "−");

const maxPerYear = Math.max(...HISTORY.map((r) => r.perYear));

export function History() {
  return (
    <Section id="history" tone="mist">
      <SectionHeading
        title="Что было на самом деле: пять лет крупных технологических компаний"
        lead={`Фактические результаты акций с ${HISTORY_PERIOD.from} по ${HISTORY_PERIOD.to} в долларах, с учётом дивидендов. Для сравнения — фонд на весь индекс S&P 500.`}
      />

      <div role="table" aria-label="Результаты акций за пять лет" className="mt-12 rounded-3xl bg-white px-6 md:px-8">
        <div role="row" className="hidden grid-cols-[1.1fr_1.6fr_0.7fr_0.8fr] gap-6 border-b border-line py-5 text-sm text-slate md:grid">
          <span role="columnheader">Компания</span>
          <span role="columnheader">В среднем за год</span>
          <span role="columnheader" className="text-right">За 5 лет</span>
          <span role="columnheader" className="text-right">Худшее падение</span>
        </div>
        {HISTORY.map((r) => (
          <div
            key={r.ticker}
            role="row"
            className="grid grid-cols-2 items-center gap-x-6 gap-y-3 border-b border-line py-5 last:border-b-0 md:grid-cols-[1.1fr_1.6fr_0.7fr_0.8fr]"
          >
            <span role="rowheader" className="col-span-2 md:col-span-1">
              <span className={cn("font-heading text-lg font-medium", r.isIndex && "text-green-deep")}>
                {r.name}
              </span>
              <span className="ml-2 text-sm text-slate">{r.ticker}</span>
            </span>
            <span role="cell" className="col-span-2 flex items-center gap-3 md:col-span-1">
              <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-mist">
                <span
                  className={cn("block h-full rounded-full", r.isIndex ? "bg-green" : "bg-navy")}
                  style={{ width: `${(r.perYear / maxPerYear) * 100}%` }}
                />
              </span>
              <span className="w-16 text-right font-medium tabular-nums">{pct(r.perYear, true)}</span>
            </span>
            <span role="cell" className="tabular-nums md:text-right">
              <span className="block text-sm text-slate md:hidden">За 5 лет</span>
              {pct(r.total, true)}
            </span>
            <span role="cell" className="text-right font-medium text-destructive tabular-nums">
              <span className="block text-sm font-normal text-slate md:hidden">Худшее падение</span>
              {pct(r.maxDrawdown)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 text-[0.98rem] text-slate md:grid-cols-3">
        <p>
          <strong className="font-medium text-ink">Это прошлое, а не обещание.</strong> Следующие
          пять лет могут оказаться совсем другими, в том числе убыточными. Прошлая доходность не
          гарантирует будущую.
        </p>
        <p>
          <strong className="font-medium text-ink">Рост не был ровным.</strong> «Худшее падение» —
          насколько акция проседала от своего максимума внутри периода. Акции Meta в 2022 году
          теряли почти три четверти цены.
        </p>
        <p>
          <strong className="font-medium text-ink">Это известные победители.</strong> Мы знаем их
          имена, потому что они выросли. Заранее угадать таких трудно — поэтому наша идея построена
          на фондах на весь индекс, а не на отдельных акциях.
        </p>
      </div>
      <p className="mt-8 text-sm text-slate">
        Источник: Yahoo Finance, цены закрытия с поправкой на дивиденды и сплиты. «В среднем за год» —
        среднегодовая доходность с учётом сложного процента. Фонд на S&amp;P 500 — SPDR S&amp;P 500
        ETF (SPY). Без учёта комиссий, налогов и изменения курса сома. Не является инвестиционной
        рекомендацией.
      </p>
    </Section>
  );
}
