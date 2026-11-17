"use client";

import * as React from "react";
import { ctas, primaryCtaHref } from "../../content/offer";
import {
  clampInput,
  reportingCost,
  reportingCostDefaults,
  reportingCostLimits,
  type Currency,
} from "../../lib/reportingCost";
import { track } from "../../lib/track";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";

type Field = keyof typeof reportingCostLimits;

const fields: { key: Field; label: string; unit: (c: Currency) => string }[] = [
  { key: "people", label: "People who prepare status packs and governance meetings", unit: () => "people" },
  { key: "hoursPerWeek", label: "Hours each per week", unit: () => "hours" },
  { key: "hourlyCost", label: "Fully loaded hourly cost", unit: (c) => (c === "GBP" ? "£ an hour" : "$ an hour") },
];

/**
 * "What your PMO reporting costs today" (the September reporting-cost calculator, Story 3.1). Everything is computed
 * in the browser and nothing is sent; `calculator_used` fires once, with no values.
 */
export function ReportingCostCalculator({ className }: { className?: string }) {
  const [values, setValues] = React.useState({
    people: reportingCostDefaults.people,
    hoursPerWeek: reportingCostDefaults.hoursPerWeek,
    hourlyCost: reportingCostDefaults.hourlyCost,
  });
  const [currency, setCurrency] = React.useState<Currency>(reportingCostDefaults.currency);
  /** What is typed in each number box; the limits apply when the box loses focus. */
  const [drafts, setDrafts] = React.useState<Partial<Record<Field, string>>>({});
  const used = React.useRef(false);
  const id = React.useId();

  const markUsed = () => {
    if (used.current) return;
    used.current = true;
    track("calculator_used");
  };
  const set = (key: Field, raw: number) => {
    markUsed();
    setValues((v) => ({ ...v, [key]: clampInput(raw, key) }));
  };
  const type = (key: Field, text: string) => {
    markUsed();
    setDrafts((d) => ({ ...d, [key]: text }));
    const n = Number(text);
    const { min, max } = reportingCostLimits[key];
    if (text.trim() !== "" && Number.isFinite(n) && n >= min && n <= max) setValues((v) => ({ ...v, [key]: Math.round(n) }));
  };
  const commit = (key: Field) => {
    const text = drafts[key];
    if (text === undefined) return;
    set(key, Number(text));
    setDrafts((d) => ({ ...d, [key]: undefined }));
  };

  const result = reportingCost({ ...values, currency });

  return (
    <div className={cn("report-board paper-grain ink-corners overflow-hidden", className)} data-calculator="reporting-cost">
      <div className="flex flex-col gap-2 border-b border-ink/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="eyebrow mb-0">Reporting cost</p>
        <p className="label text-muted">
          Your numbers, in your browser
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1fr]">
        <div className="border-b border-ink/10 p-5 md:p-6 lg:border-b-0 lg:border-r">
          <fieldset className="mb-6">
            <legend className="form-label">Currency</legend>
            <div className="inline-flex rounded-control border border-ink/20 p-1" role="radiogroup" aria-label="Currency" data-currency-switch>
              {(["GBP", "USD"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  role="radio"
                  aria-checked={currency === c}
                  onClick={() => {
                    markUsed();
                    setCurrency(c);
                  }}
                  className={cn(
                    "min-h-10 rounded-control px-4 text-[15px] font-semibold transition-colors",
                    currency === c ? "bg-ink text-paper" : "text-ink hover:bg-ink/5",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-6">
            {fields.map((f) => {
              const limits = reportingCostLimits[f.key];
              const inputId = `${id}-${f.key}`;
              return (
                <div key={f.key}>
                  <div className="mb-2 flex items-end justify-between gap-3">
                    <label htmlFor={inputId} className="form-label !mb-0 max-w-[30ch]">
                      {f.label}
                    </label>
                    <span className="flex items-baseline gap-1.5">
                      <input
                        type="number"
                        inputMode="numeric"
                        aria-label={`${f.label} (type a number)`}
                        className="w-20 rounded-control border border-ink/20 bg-paper px-2 py-1 text-right font-[family-name:var(--font-display)] text-lg font-semibold"
                        min={limits.min}
                        max={limits.max}
                        step={limits.step}
                        value={drafts[f.key] ?? String(values[f.key])}
                        onChange={(e) => type(f.key, e.target.value)}
                        onBlur={() => commit(f.key)}
                      />
                      <span className="label text-muted">
                        {f.unit(currency)}
                      </span>
                    </span>
                  </div>
                  <input
                    id={inputId}
                    type="range"
                    className="cost-slider w-full"
                    min={limits.min}
                    max={limits.max}
                    step={limits.step}
                    value={values[f.key]}
                    onChange={(e) => {
                      setDrafts((d) => ({ ...d, [f.key]: undefined }));
                      set(f.key, Number(e.target.value));
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-[rgba(0,166,200,0.04)] p-5 md:p-6">
          <p className="label text-muted">
            Every year, today
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2" aria-live="polite">
            <div className="border border-ink/15 bg-paper p-4">
              <p className="label text-muted">Hours per year</p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.03em] text-ink" data-result="hours">
                {result.hoursLabel}
              </p>
            </div>
            <div className="border border-ink bg-ink p-4 text-paper">
              <p className="label text-paper/75">Cost per year</p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.03em]" data-result="cost">
                {result.costLabel}
              </p>
            </div>
          </div>
          <p className="t-small mt-3 text-muted">People × hours each week × 48 working weeks, at your hourly cost.</p>

          <div className="mt-8 border-t border-ink/12 pt-6">
            <p className="t-body text-ink">The PMO Health Check shows whether that time produces decisions, or just reports.</p>
            <div className="mt-5">
              <Button href={primaryCtaHref("estimator")} size="lg" ctaId="book_call" target="_blank" rel="noopener noreferrer">
                {ctas.primaryLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
