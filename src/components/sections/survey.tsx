import { SurveyForm } from "../forms/survey-form";
import { Section, SectionHeading } from "../section";

export function Survey() {
  return (
    <Section id="survey">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          title="Помогите нам понять, нужен ли такой сервис"
          lead="Пять вопросов, около двух минут. По ответам мы решим, делать ли проект, с какой минимальной суммой и за какую плату. Честное «не интересно» нам тоже очень полезно."
          className="lg:sticky lg:top-28 lg:self-start"
        />
        <SurveyForm />
      </div>
    </Section>
  );
}
