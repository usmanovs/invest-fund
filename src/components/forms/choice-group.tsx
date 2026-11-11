import type { Option } from "@/lib/survey-options";

type Props<T extends string> = {
  legend: string;
  hint?: string;
  name: string;
  options: readonly Option<T>[];
  error?: string;
} & (
  | { multiple: true; value: T[]; onChange: (v: T[]) => void }
  | { multiple?: false; value: T | ""; onChange: (v: T) => void }
);

/** Группа вариантов-«чипов» на нативных radio/checkbox: работает с клавиатуры и скринридерами. */
export function ChoiceGroup<T extends string>(props: Props<T>) {
  const { legend, hint, name, options, error } = props;
  const errorId = `${name}-error`;
  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="font-heading text-xl leading-snug font-medium">{legend}</legend>
      {hint ? <p className="mt-1 text-sm text-slate">{hint}</p> : null}
      <div className="mt-4 flex flex-wrap gap-2.5">
        {options.map((o) => {
          const checked = props.multiple ? props.value.includes(o.value) : props.value === o.value;
          return (
            <label
              key={o.value}
              className="cursor-pointer rounded-full border border-input bg-white px-4 py-2.5 text-[0.95rem] leading-tight transition-colors select-none hover:border-ink has-checked:border-navy has-checked:bg-navy has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-green"
            >
              <input
                type={props.multiple ? "checkbox" : "radio"}
                name={name}
                value={o.value}
                checked={checked}
                onChange={() => {
                  if (props.multiple) {
                    props.onChange(
                      checked ? props.value.filter((v) => v !== o.value) : [...props.value, o.value],
                    );
                  } else {
                    props.onChange(o.value);
                  }
                }}
                className="sr-only"
              />
              {o.label}
            </label>
          );
        })}
      </div>
      {error ? (
        <p id={errorId} className="mt-3 text-sm font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
