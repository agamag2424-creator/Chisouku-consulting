"use client";

import * as React from "react";
import { formatPrice, offerPriceLabel, siteConfig } from "../../lib/siteConfig";
import { slipEstimate, type SlipInputs } from "../../lib/slipEstimate";
import { track } from "../../lib/track";
import { Button } from "../ui/Button";
import { Sheet } from "../ui/Sheet";

// Copy: PRD 9.11 draft, pending founder approval (IN-7).
const fields: { key: keyof SlipInputs; label: string; max: number; step: number }[] = [
  { key: "people", label: "People working on the programme (your team and partners)", max: 5000, step: 1 },
  { key: "dayRate", label: "Average cost per person per day (USD, fully loaded)", max: 20000, step: 50 },
  { key: "weeks", label: "Weeks the go-live could slip", max: 52, step: 1 },
  {
    key: "parallelRunMonthly",
    label: "Monthly cost of keeping the current system running (USD, optional)",
    max: 10000000,
    step: 1000,
  },
];

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
  const summary = `Cost per week of slip: ${weekly}. Cost of a ${weeks}-week slip: ${total}.`;
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

  return (
    <Sheet className="mt-10 grid gap-8 p-6 min-[641px]:p-8 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="grid content-start gap-5" onSubmit={(event) => event.preventDefault()} noValidate>
        <p className="t-small text-muted">Example values. Replace them with yours.</p>
        {fields.map((field) => (
          <div key={field.key}>
            <label htmlFor={`slip-${field.key}`} className="t-small mb-1.5 block font-semibold text-ink">
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
              className="t-data w-full rounded-control border border-line bg-paper px-3 py-2.5 text-[16px] text-ink"
            />
          </div>
        ))}
      </form>

      <div className="flex flex-col">
        <dl className="grid gap-5">
          <div className="border-b border-line pb-5">
            <dt className="t-small text-muted">Cost per week of slip</dt>
            <dd className="t-data mt-1 text-[28px] text-ink">{weekly}</dd>
          </div>
          <div className="border-b border-line pb-5">
            <dt className="t-small text-muted">{`Cost of a ${weeks}-week slip`}</dt>
            <dd className="t-data mt-1 text-[28px] text-ink">{total}</dd>
          </div>
        </dl>
        {result.comparisonDays !== null && (
          <p className="t-body mt-5 text-ink">
            {`A Readiness Evidence Check costs ${priceText}: about ${result.comparisonDays} working days of your programme's run-rate.`}
          </p>
        )}
        <p className="t-small mt-4 text-muted">
          Calculated in your browser from your numbers. Directional only: it leaves out lost benefits, contract penalties
          and business disruption. Not a forecast for your programme.
        </p>
        <div className="mt-6 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:items-center">
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
