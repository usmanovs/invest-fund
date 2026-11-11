"use client";

import { useId, useMemo, useState } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { formatUsd, pluralYears, project, type YearPoint } from "@/lib/calculator";
import { Section, SectionHeading } from "../section";

const GROWTH = "#3ecf8e";
const CONTRIBUTED = "#c9d4e6";

type FieldProps = {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  suffix: string;
};

function Field({ label, value, onChange, min, max, step, suffix }: FieldProps) {
  const id = useId();
  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <Label htmlFor={id} className="text-[0.95rem] font-normal text-muted-foreground">
          {label}
        </Label>
        <div className="relative w-36 shrink-0">
          <Input
            id={id}
            type="number"
            inputMode="decimal"
            min={min}
            max={max}
            step={step}
            value={Number.isFinite(value) ? value : ""}
            onChange={(e) => onChange(e.target.value === "" ? NaN : Number(e.target.value))}
            onBlur={() => onChange(Number.isFinite(value) ? clamp(value) : min)}
            className="h-11 border-input bg-white/5 pr-12 text-right text-base font-medium tabular-nums md:text-base"
          />
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
            {suffix}
          </span>
        </div>
      </div>
      <Slider
        aria-label={label}
        className="mt-4"
        min={min}
        max={max}
        step={step}
        value={[Number.isFinite(value) ? clamp(value) : min]}
        onValueChange={(v) => onChange(Array.isArray(v) ? v[0] : v)}
      />
    </div>
  );
}

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: YearPoint }[];
}) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="rounded-xl bg-white px-4 py-3 text-sm text-ink shadow-lg">
      <p className="font-medium">
        Через {p.year} {pluralYears(p.year)}
      </p>
      <p className="mt-1 tabular-nums">Сумма: {formatUsd(p.total)}</p>
      <p className="text-slate tabular-nums">Из них взносы: {formatUsd(p.contributed)}</p>
    </div>
  );
}

const compactUsd = (v: number) =>
  Math.abs(v) >= 1_000_000
    ? `$${(v / 1_000_000).toLocaleString("ru-RU", { maximumFractionDigits: 1 })} млн`
    : Math.abs(v) >= 1000
      ? `$${Math.round(v / 1000)} тыс.`
      : `$${v}`;

export function Calculator() {
  const [initial, setInitial] = useState(100);
  const [monthly, setMonthly] = useState(100);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(7);

  const data = useMemo(() => {
    const safe = (v: number, min: number, max: number) =>
      Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : min;
    return project({
      initial: safe(initial, 0, 50000),
      monthly: safe(monthly, 0, 2000),
      years: Math.round(safe(years, 1, 40)),
      annualRate: safe(rate, -5, 15),
    });
  }, [initial, monthly, years, rate]);

  const last = data[data.length - 1];

  return (
    <Section id="calculator" tone="navy">
      <SectionHeading
        title="Посчитайте свой сценарий"
        lead="Задайте суммы, срок и доходность, в которую верите сами. Калькулятор покажет арифметику регулярных взносов — попробуйте и отрицательную доходность тоже."
      />
      <div className="mt-12 grid gap-10 lg:grid-cols-[22rem_1fr] lg:gap-14">
        <div className="space-y-8">
          <Field label="Первый взнос" value={initial} onChange={setInitial} min={0} max={50000} step={100} suffix="$" />
          <Field label="Взнос каждый месяц" value={monthly} onChange={setMonthly} min={0} max={2000} step={10} suffix="$" />
          <Field label="Срок" value={years} onChange={setYears} min={1} max={40} step={1} suffix="лет" />
          <Field label="Гипотетическая доходность в год" value={rate} onChange={setRate} min={-5} max={15} step={0.5} suffix="%" />
        </div>

        <div className="min-w-0">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3" aria-live="polite">
            <div className="col-span-2 sm:col-span-1">
              <dt className="text-sm text-muted-foreground">
                Через {last.year} {pluralYears(last.year)}
              </dt>
              <dd className="mt-1 font-heading text-4xl font-semibold tabular-nums">
                {formatUsd(last.total)}
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-0.5 w-4" style={{ background: CONTRIBUTED }} />
                Ваши взносы
              </dt>
              <dd className="mt-1 text-2xl font-medium tabular-nums">{formatUsd(last.contributed)}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="size-2.5 rounded-sm" style={{ background: GROWTH }} />
                {last.growth >= 0 ? "Рост" : "Убыток"}
              </dt>
              <dd className="mt-1 text-2xl font-medium tabular-nums">{formatUsd(last.growth)}</dd>
            </div>
          </dl>

          <div className="mt-8 h-72 sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="growth-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={GROWTH} stopOpacity={0.45} />
                    <stop offset="100%" stopColor={GROWTH} stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis
                  dataKey="year"
                  tick={{ fill: "#a9b8d0", fontSize: 13 }}
                  tickLine={false}
                  axisLine={{ stroke: "rgba(255,255,255,0.25)" }}
                  tickFormatter={(y: number) => (y === 0 ? "" : `${y}`)}
                  minTickGap={24}
                />
                <YAxis
                  width={72}
                  tick={{ fill: "#a9b8d0", fontSize: 13 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={compactUsd}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ stroke: "rgba(255,255,255,0.4)" }} />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke={GROWTH}
                  strokeWidth={2.5}
                  fill="url(#growth-fill)"
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="contributed"
                  stroke={CONTRIBUTED}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  isAnimationActive={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-right text-sm text-muted-foreground">годы</p>
        </div>
      </div>

      <p className="mt-10 max-w-4xl border-t border-white/15 pt-6 text-sm leading-relaxed text-muted-foreground">
        <strong className="font-medium text-white">Это не прогноз и не обещание.</strong> Расчёт
        условный: он предполагает одинаковую доходность каждый год, чего на реальном рынке не
        бывает, и не учитывает комиссии, налоги, инфляцию и изменение курса валют. Фактический
        результат может быть существенно ниже, в том числе меньше суммы взносов. Прошлая доходность
        фондового рынка не гарантирует будущую.
      </p>
    </Section>
  );
}
