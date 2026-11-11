import { Section, SectionHeading } from "../section";

const pairs = [
  {
    topic: "Простота",
    diy: "Профессиональная платформа с тысячами инструментов. Новичку легко запутаться и ошибиться.",
    ours: "Только то, что нужно для долгосрочных вложений в индексные фонды. Несколько экранов вместо торгового терминала.",
  },
  {
    topic: "Язык и обучение",
    diy: "Анкеты, налоговые формы и большая часть материалов рассчитаны на международного клиента.",
    ours: "Объяснения и уроки на русском языке — с примерами, понятными в Кыргызстане.",
  },
  {
    topic: "Что покупать",
    diy: "Фонды, пропорции и момент покупки вы выбираете сами.",
    ours: "Готовые портфели из индексных фондов под срок и отношение к риску.",
  },
  {
    topic: "Поддержка",
    diy: "Служба поддержки за рубежом, в другом часовом поясе.",
    ours: "Местная команда, которой можно задать вопрос на своём языке.",
  },
];

export function WhyNotIb() {
  return (
    <Section id="why" tone="mist">
      <SectionHeading
        title="Почему не открыть счёт в Interactive Brokers самому?"
        lead="Можно — и опытным инвесторам это подходит. Interactive Brokers — крупный международный брокер. Но путь от «хочу попробовать» до первой покупки фонда там долгий. Вот что мы хотим упростить."
      />
      <div className="mt-12 overflow-hidden rounded-3xl bg-white">
        <div className="hidden grid-cols-[0.7fr_1fr_1fr] gap-8 px-8 pt-7 pb-4 md:grid">
          <span />
          <span className="font-heading text-lg font-medium text-slate">Самостоятельно</span>
          <span className="font-heading text-lg font-medium text-green-deep">
            Как задумываем мы
          </span>
        </div>
        {pairs.map((p) => (
          <div
            key={p.topic}
            className="grid gap-x-8 gap-y-4 border-t border-line px-6 py-6 first:border-t-0 md:grid-cols-[0.7fr_1fr_1fr] md:px-8 md:first:border-t"
          >
            <h3 className="text-xl font-medium">{p.topic}</h3>
            <p className="text-[0.98rem] text-slate">
              <span className="mb-1 block text-sm font-medium text-ink md:hidden">Самостоятельно</span>
              {p.diy}
            </p>
            <p className="text-[0.98rem] text-ink">
              <span className="mb-1 block text-sm font-medium text-green-deep md:hidden">
                Как задумываем мы
              </span>
              {p.ours}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-6 max-w-3xl text-sm text-slate">
        Правая колонка — наши намерения, а не описание работающего сервиса. Мы не связаны с
        Interactive Brokers и не имеем договорённостей ни с одним брокером.
      </p>
    </Section>
  );
}
