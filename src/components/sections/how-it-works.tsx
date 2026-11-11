import { Section, SectionHeading } from "../section";

const steps = [
  {
    title: "Разбираетесь в основах",
    text: "Короткие уроки на русском: что такое индексный фонд, откуда берётся доход и какие есть риски. Без жаргона и без обещаний быстрых денег.",
  },
  {
    title: "Выбираете готовый портфель",
    text: "Несколько понятных стратегий из индексных фондов под ваш срок и отношение к риску. Не нужно самому изучать тысячи бумаг.",
  },
  {
    title: "Пополняете в своём темпе",
    text: "Вносите посильную сумму регулярно и видите, из чего состоит портфель и сколько он стоит. Если есть вопросы — отвечает поддержка в Кыргызстане.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how" tone="mist">
      <SectionHeading
        title="Как это могло бы работать"
        lead="Так мы представляем себе сервис сейчас. Это замысел, а не готовый продукт: детали зависят от ваших ответов в опросе и от требований регулятора."
      />
      <ol className="mt-14 grid gap-6 lg:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} className="rounded-3xl bg-white p-7 md:p-8">
            <span
              aria-hidden="true"
              className="flex size-11 items-center justify-center rounded-full bg-green-tint font-heading text-lg font-semibold text-green-deep"
            >
              {i + 1}
            </span>
            <h3 className="mt-6 text-2xl leading-tight font-medium">{s.title}</h3>
            <p className="mt-3 text-slate">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
