"use client";

import * as React from "react";
import { formatPrice, offerPriceLabel, siteConfig } from "../../lib/siteConfig";
import { slipEstimate, slipLabel, type SlipInputs } from "../../lib/slipEstimate";
import { track } from "../../lib/track";
import { Button } from "../ui/Button";
import { Sheet } from "../ui/Sheet";

// Copy: PRD 9.11 draft, pending founder approval (IN-7).
// Each number field has a slider beside it (PRD 9.12); the slider covers the common range, the field the full one.
const fields: { key: keyof SlipInputs; label: string; max: number; step: number; sliderMax: number; sliderStep: number }[] = [
  { key: "people", label: "People working on the programme (your team and partners)", max: 5000, step: 1, sliderMax: 500, sliderStep: 5 },
  { key: "dayRate", label: "Average cost per person per day (USD, fully loaded)", max: 20000, step: 50, sliderMax: 3000, sliderStep: 50 },
  { key: "weeks", label: "Weeks the go-live could slip", max: 52, step: 1, sliderMax: 26, sliderStep: 1 },
  {
    key: "parallelRunMonthly",
    label: "Monthly cost of keeping the current system running (USD, optional)",
    max: 10000000,
    step: 1000,
    sliderMax: 500000,
    sliderStep: 5000,
  },
];

const MAX_BARS = 26;

const ANNOUNCE_DELAY_MS = 400;

/** Homepage section 4a: what each week of go-live slip costs, set against the Evidence Check price. */
export function SlipCostEstimator() {
  const [values, setValues] = React.useState<Record<keyof SlipInputs, string>>(() => {
    const d = siteConfig.slipEstimator.defaults;
    return { people: String(d.people), dayRate: String(d.dayRate), weeks: String(d.weeks), parallelRunMonthly: String(d.parallelRunMonthly) };
  });
  const tracked = React.useRef(false);
  const [announcement, setAnnouncement] = React.useState("");

  const inputs: SlipInputs = {
    people: Number(values.people),
    dayRate: Number(values.dayRate),
    weeks: Number(values.weeks),
    parallelRunMonthly: Number(values.parallelRunMonthly),
  };
  const result = slipEstimate(inputs, {
    workingDaysPerWeek: siteConfig.slipEstimator.workingDaysPerWeek,
    comparisonPrice: siteConfig.offers.evidenceCheck.listPrice,
  });
  const weeks = Number.isFinite(inputs.weeks) && inputs.weeks > 0 ? inputs.weeks : 0;
  const weekly = formatPrice(Math.round(result.weeklyRunRate));
  const total = formatPrice(Math.round(result.totalCost));
  const price = offerPriceLabel("evidenceCheck");
  const priceText = price.founding ? `${price.list} list, ${price.founding} founding-client rate` : price.list;

  // Announce the result once typing pauses, so screen readers are not flooded on every keystroke.
  const totalLabel = slipLabel(weeks);
  const summary = `Cost per week of slip: ${weekly}. ${totalLabel}: ${total}.`;
  React.useEffect(() => {
    if (!tracked.current) return;
    const timer = window.setTimeout(() => setAnnouncement(summary), ANNOUNCE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [summary]);

  const onChange = (key: keyof SlipInputs) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((current) => ({ ...current, [key]: event.target.value }));
    if (!tracked.current) {
      tracked.current = true;
      track("slip_estimate_used");
    }
  };

  const bars = Math.min(Math.round(weeks), MAX_BARS);
  const comparisonPrice = siteConfig.offers.evidenceCheck.listPrice;
  const comparisonWidth = result.totalCost > 0 ? Math.min(Math.max((comparisonPrice / result.totalCost) * 100, 0.8), 100) : 100;

  return (
    <Sheet className="mt-12 grid overflow-hidden min-[900px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <form
        className="grid content-start gap-6 border-b border-line p-6 min-[641px]:p-9 min-[900px]:border-b-0 min-[900px]:border-r"
        onSubmit={(event) => event.preventDefault()}
        noValidate
      >
        <p className="t-small text-muted">Example values. Replace them with yours.</p>
        {fields.map((field) => (
          <div key={field.key} className="grid gap-2.5">
            <div className="flex items-end justify-between gap-4">
              <label htmlFor={`slip-${field.key}`} className="t-small font-semibold text-ink">
                {field.label}
              </label>
              <input
                id={`slip-${field.key}`}
                type="number"
                inputMode="numeric"
                min={0}
                max={field.max}
                step={field.step}
                value={values[field.key]}
                onChange={onChange(field.key)}
                className="t-data min-h-11 w-28 shrink-0 rounded-control border border-line bg-paper px-3 text-right text-[16px] text-ink min-[641px]:w-32"
              />
            </div>
            <input
              type="range"
              min={0}
              max={field.sliderMax}
              step={field.sliderStep}
              value={values[field.key]}
              onChange={onChange(field.key)}
              aria-label={field.label}
              className="h-7 w-full accent-teal"
            />
          </div>
        ))}
      </form>

      <div className="flex flex-col gap-6 bg-page p-6 min-[641px]:p-9">
        <dl className="grid gap-5 min-[480px]:grid-cols-2">
          <div>
            <dt className="t-small text-muted">Cost per week of slip</dt>
            <dd className="t-data mt-2 text-[32px] leading-none tracking-[-0.03em] text-ink min-[641px]:text-[40px]">{weekly}</dd>
          </div>
          <div>
            <dt className="t-small text-muted">{totalLabel}</dt>
            <dd className="t-data mt-2 text-[32px] leading-none tracking-[-0.03em] text-ink min-[641px]:text-[40px]">{total}</dd>
          </div>
        </dl>

        {bars > 0 && (
          <div aria-hidden>
            <div className="flex h-[150px] items-end gap-1.5 border-b border-line">
              {Array.from({ length: bars }, (_, bar) => (
                <span
                  key={bar}
                  className="min-w-1 flex-1 rounded-t-[3px] bg-ink transition-[height] duration-300"
                  style={{ height: `${((bar + 1) / bars) * 100}%` }}
                />
              ))}
            </div>
            <p className="mt-1.5 flex justify-between text-[13px] text-muted">
              <span>Week 1</span>
              <span>{`Week ${bars}`}</span>
            </p>
          </div>
        )}

        <div aria-hidden className="grid gap-2 text-[13px]">
          <p className="flex justify-between gap-3">
            <span className="font-semibold text-ink">{totalLabel}</span>
            <span className="t-data text-ink">{total}</span>
          </p>
          <span className="h-3.5 overflow-hidden rounded-full bg-faint">
            <span className="block h-full w-full bg-ink" />
          </span>
          <p className="mt-1 flex justify-between gap-3">
            <span className="font-semibold text-teal">{siteConfig.offers.evidenceCheck.name}</span>
            <span className="t-data text-ink">{price.list}</span>
          </p>
          <span className="h-3.5 overflow-hidden rounded-full bg-faint">
            <span className="block h-full bg-teal transition-[width] duration-300" style={{ width: `${comparisonWidth}%` }} />
          </span>
        </div>

        {result.comparisonDays !== null && (
          <p className="t-body text-ink">
            {`A Readiness Evidence Check costs ${priceText}: about ${result.comparisonDays} working days of your programme's run-rate.`}
          </p>
        )}
        <p className="text-[13px] leading-normal text-muted">
          Calculated in your browser from your numbers. Directional only: it leaves out lost benefits, contract penalties
          and business disruption. Not a forecast for your programme.
        </p>
        <div className="flex flex-col gap-3 min-[480px]:flex-row min-[480px]:items-center min-[480px]:gap-5">
          <Button href="/contact?request=brief">Request a free readiness brief</Button>
          <Button href="/contact?request=review" variant="text">
            Discuss your programme
          </Button>
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>
    </Sheet>
  );
}
