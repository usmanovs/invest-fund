import { Section, SectionHeading } from "../section";

const rows = [
  {
    criterion: "Порог входа",
    realEstate: "Десятки тысяч долларов или ипотека",
    funds: "Небольшие суммы; минимум от $100 — гипотеза, которую мы проверяем",
  },
  {
    criterion: "Ликвидность",
    realEstate: "Продажа занимает недели и месяцы, только целиком",
    funds: "Паи продаются в дни работы биржи, можно частями",
  },
  {
    criterion: "Диверсификация",
    realEstate: "Один объект в одном городе",
    funds: "Сотни компаний из разных отраслей в одном фонде",
  },
  {
    criterion: "Управление",
    realEstate: "Ремонт, арендаторы, документы, налоги",
    funds: "Не требует ежедневного участия; нужно выдерживать колебания цены",
  },
  {
    criterion: "Основные риски",
    realEstate: "Падение цен на местном рынке, простой без арендаторов, износ, юридические споры",
    funds: "Падение рынка акций (иногда на десятки процентов), курс валют, риски посредников и переводов",
  },
  {
    criterion: "Что ещё важно",
    realEstate: "Осязаемый актив: в квартире можно жить или сдавать её",
    funds: "Доход не гарантирован; разумный срок вложений — от нескольких лет",
  },
];

export function Comparison() {
  return (
    <Section id="compare">
      <SectionHeading
        title="Недвижимость и индексные фонды: честное сравнение"
        lead="Это разные инструменты, и один не заменяет другой. У обоих есть сильные стороны и риски."
      />
      <div role="table" aria-label="Сравнение недвижимости и индексных фондов" className="mt-12">
        <div
          role="row"
          className="hidden grid-cols-[0.8fr_1.3fr_1.3fr] gap-8 border-b-2 border-navy pb-4 md:grid"
        >
          <span role="columnheader" className="sr-only">
            Критерий
          </span>
          <span />
          <span role="columnheader" className="font-heading text-xl font-medium">
            Недвижимость
          </span>
          <span role="columnheader" className="font-heading text-xl font-medium text-green-deep">
            Индексные фонды
          </span>
        </div>
        {rows.map((r) => (
          <div
            key={r.criterion}
            role="row"
            className="grid grid-cols-2 gap-x-5 gap-y-3 border-b border-line py-6 md:grid-cols-[0.8fr_1.3fr_1.3fr] md:gap-8"
          >
            <span role="rowheader" className="col-span-2 font-heading text-lg font-medium md:col-span-1">
              {r.criterion}
            </span>
            <span role="cell" className="text-[0.98rem] text-slate">
              <span className="mb-1 block text-sm font-medium text-ink md:hidden">Недвижимость</span>
              {r.realEstate}
            </span>
            <span role="cell" className="text-[0.98rem] text-slate">
              <span className="mb-1 block text-sm font-medium text-green-deep md:hidden">
                Индексные фонды
              </span>
              {r.funds}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
