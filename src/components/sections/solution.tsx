import { Section, SectionHeading } from "../section";

const features = [
  {
    title: "Сотни компаний в одной покупке",
    text: "Индексный фонд повторяет состав рыночного индекса. Фонд на S&P 500 — это доля примерно в 500 крупнейших публичных компаниях США сразу, а не ставка на одну из них.",
  },
  {
    title: "Небольшими суммами",
    text: "Не нужно копить годами, чтобы начать. Идея — пополнять портфель регулярно, тем, что получается отложить. Мы проверяем, реально ли сделать вход от $100.",
  },
  {
    title: "Активы в долларах",
    text: "Фонды на американские акции оцениваются в долларах США. Это способ держать часть сбережений не в одной валюте и не в одной стране.",
  },
  {
    title: "Можно продать часть",
    text: "Паи биржевых фондов торгуются каждый рабочий день биржи. В отличие от квартиры, продать можно ровно столько, сколько нужно.",
  },
];

export function Solution() {
  return (
    <Section id="solution">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
        <SectionHeading
          title="Наша идея: индексные фонды США — понятно и постепенно"
          lead="Простая платформа, где не нужно выбирать отдельные акции и следить за рынком каждый день. Вы регулярно вкладываете посильную сумму в широкий рынок и держите долго."
        />
        <blockquote className="self-end border-l-2 border-green pl-6">
          <p className="font-heading text-2xl leading-snug font-medium md:text-3xl">
            «Тама-тама көл болот»
          </p>
          <footer className="mt-2 text-slate">
            Капля за каплей — получается озеро. Кыргызская пословица, из которой выросло рабочее
            название проекта.
          </footer>
        </blockquote>
      </div>
      <ul className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-x-10">
        {features.map((f) => (
          <li key={f.title} className="border-t-2 border-navy pt-5">
            <h3 className="text-xl leading-snug font-medium">{f.title}</h3>
            <p className="mt-3 text-[0.98rem] text-slate">{f.text}</p>
          </li>
        ))}
      </ul>
      <p className="mt-12 max-w-3xl text-sm text-slate">
        Диверсификация снижает зависимость от одной компании, но не защищает от падения рынка в
        целом. Стоимость фондов на акции может заметно снижаться, иногда на годы.
      </p>
    </Section>
  );
}
