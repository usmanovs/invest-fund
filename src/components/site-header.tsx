import { CtaLink } from "./cta-link";
import { Logo } from "./logo";

const nav = [
  { href: "#solution", label: "Идея" },
  { href: "#calculator", label: "Калькулятор" },
  { href: "#compare", label: "Сравнение" },
  { href: "#survey", label: "Опрос" },
  { href: "#faq", label: "Вопросы" },
];

export function SiteHeader() {
  return (
    <>
      <p className="bg-navy-deep px-5 py-2.5 text-center text-sm leading-snug text-white/85">
        Проект на стадии идеи. Мы не принимаем деньги и не оказываем инвестиционных услуг — сейчас
        мы только изучаем спрос.
      </p>
      <header className="sticky top-0 z-40 border-b border-line/70 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 md:px-8">
          <a href="#top" aria-label="Тамчы — в начало страницы">
            <Logo />
          </a>
          <nav aria-label="Разделы страницы" className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.95rem] text-slate transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <CtaLink href="#waitlist" size="sm" variant="navy">
            Мне интересно
          </CtaLink>
        </div>
      </header>
    </>
  );
}
