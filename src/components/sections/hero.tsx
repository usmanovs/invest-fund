import { CtaLink } from "../cta-link";

/** Высоты ступеней: взносы, которые со временем дорастают до той же высоты, что и «квартира». */
const steps = [10, 18, 26, 35, 44, 54, 64, 75, 87, 100];

function ThresholdFigure() {
  return (
    <figure className="on-navy rounded-[1.75rem] bg-navy p-6 sm:p-8">
      <div className="flex h-64 items-end gap-5 border-b border-white/25 sm:h-80 sm:gap-8">
        <div className="step-rise flex h-full w-[26%] items-start justify-center rounded-t-lg border border-b-0 border-white/35 bg-white/10 pt-4">
          <span className="fade-in text-center text-sm leading-tight text-white/90 [animation-delay:0.6s]">
            вся сумма
            <br />
            сразу
          </span>
        </div>
        <div className="flex h-full flex-1 items-end gap-1 sm:gap-1.5">
          {steps.map((h, i) => (
            <div
              key={h}
              className="step-rise flex-1 rounded-t-[5px] bg-[#3ecf8e]"
              style={{
                height: `${h}%`,
                opacity: 0.45 + (i / (steps.length - 1)) * 0.55,
                animationDelay: `${0.5 + i * 0.09}s`,
              }}
            />
          ))}
        </div>
      </div>
      <figcaption className="mt-4 flex gap-5 text-sm sm:gap-8">
        <span className="w-[26%] shrink-0 font-medium">Квартира</span>
        <span className="flex-1">
          <span className="font-medium">Индексные фонды</span>
          <span className="block text-muted-foreground">взнос за взносом, в своём темпе</span>
        </span>
      </figcaption>
      <p className="mt-5 text-xs text-muted-foreground">
        Схема показывает идею, а не прогноз: стоимость фондов может и расти, и падать.
      </p>
    </figure>
  );
}

export function Hero() {
  return (
    <section id="top" className="bg-white">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pt-14 pb-20 md:px-8 md:pt-20 md:pb-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <h1 className="text-[2.6rem] leading-[1.04] font-semibold sm:text-6xl lg:text-[4.1rem]">
            Инвестиции — это не только недвижимость
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate sm:text-xl">
            Мы хотим сделать простой сервис для жителей Кыргызстана: постепенно вкладывать в
            индексные фонды США, например на S&amp;P 500, — с небольших сумм, с обучением и
            поддержкой на русском языке.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="#waitlist">Мне интересно</CtaLink>
            <CtaLink href="#survey" variant="ghost">
              Пройти опрос за 2 минуты
            </CtaLink>
          </div>
          <p className="mt-6 max-w-xl text-sm text-slate">
            Сервис ещё не запущен, и вкладывать деньги через нас нельзя. Мы спрашиваем, нужен ли он
            вам, прежде чем его строить.
          </p>
        </div>
        <ThresholdFigure />
      </div>
    </section>
  );
}
