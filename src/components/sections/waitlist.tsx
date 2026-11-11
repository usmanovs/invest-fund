import { WaitlistForm } from "../forms/waitlist-form";
import { Section } from "../section";

export function Waitlist() {
  return (
    <Section id="waitlist" tone="navy">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="text-3xl leading-[1.12] font-semibold md:text-[2.75rem]">
            Оставьте email — расскажем, если проект состоится
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Лист ожидания ни к чему вас не обязывает. Мы не просим денег и документов — только
            адрес, чтобы написать о результатах опроса и возможном запуске.
          </p>
        </div>
        <div>
          <WaitlistForm />
          <p className="mt-4 text-sm text-muted-foreground">
            Запись в лист ожидания — не заявка на открытие счёта. Сервис не запущен и может не
            запуститься.
          </p>
        </div>
      </div>
    </Section>
  );
}
