"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "../../lib/siteConfig";
import { cn } from "../../lib/utils";

const WEEKS_PER_YEAR = 48;
/** Planning range for reclaimable pack-glue work — hypothesis, not a promise. */
const RECLAIM_LOW = 0.4;
const RECLAIM_HIGH = 0.6;

const benefits = [
  {
    label: "Time",
    title: "Hours back to delivery",
    detail: "Less export, paste, and narrative glue every pack cycle.",
  },
  {
    label: "Cost",
    title: "Reporting drag priced",
    detail: "See the annual cost of manual packs before you buy tools.",
  },
  {
    label: "Freshness",
    title: "Signals on cadence",
    detail: "Forums decide on current numbers — not last week’s spreadsheet.",
  },
  {
    label: "Fit",
    title: "Automate only what pays",
    detail: "AI where narrative and alerts matter; rules where they do not.",
  },
] as const;

type Props = {
  className?: string;
};

/** Homepage estimator — pack drag from operator inputs. */
export function PackDragEstimator({ className }: Props) {
  const [people, setPeople] = React.useState(2);
  const [hoursPerWeek, setHoursPerWeek] = React.useState(8);
  const [hourlyRate, setHourlyRate] = React.useState(75);

  const hoursYear = people * hoursPerWeek * WEEKS_PER_YEAR;
  const costYear = hoursYear * hourlyRate;
  const reclaimHoursLow = Math.round(hoursYear * RECLAIM_LOW);
  const reclaimHoursHigh = Math.round(hoursYear * RECLAIM_HIGH);
  const reclaimCostLow = reclaimHoursLow * hourlyRate;
  const reclaimCostHigh = reclaimHoursHigh * hourlyRate;

  return (
    <div className={cn("report-board paper-grain ink-corners overflow-hidden", className)}>
      <div className="flex flex-col gap-2 border-b border-[rgba(17,24,32,0.1)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-cyan-strong)]">
          Pack drag estimate
        </p>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
          Your numbers · Directional
        </p>
      </div>

      <div className="grid gap-0 border-b border-[rgba(17,24,32,0.1)] sm:grid-cols-2 xl:grid-cols-4">
        {benefits.map((benefit, index) => (
          <div
            key={benefit.label}
            className={cn(
              "p-5",
              index < benefits.length - 1 && "border-b border-[rgba(17,24,32,0.1)] sm:border-b-0",
              "sm:odd:border-r xl:border-r xl:[&:nth-child(4)]:border-r-0",
              "sm:[&:nth-child(2)]:border-r-0 xl:[&:nth-child(2)]:border-r",
            )}
          >
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-cyan-strong)]">
              {benefit.label}
            </p>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-bold tracking-[-0.02em]">
              {benefit.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
              {benefit.detail}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
        <div className="border-b border-[rgba(17,24,32,0.1)] p-6 lg:border-b-0 lg:border-r">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-[-0.02em]">
            Estimate your reporting drag
          </h3>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Adjust the inputs. See hours and cost tied up in pack assembly —
            then reclaim range if AI automation removes the glue work.
          </p>

          <div className="mt-8 grid gap-5">
            <SliderField
              label="People touching the pack"
              value={people}
              min={1}
              max={12}
              step={1}
              suffix="people"
              onChange={setPeople}
            />
            <SliderField
              label="Hours per person / week"
              value={hoursPerWeek}
              min={1}
              max={20}
              step={1}
              suffix="hrs"
              onChange={setHoursPerWeek}
            />
            <SliderField
              label="Fully loaded hourly cost (USD)"
              value={hourlyRate}
              min={25}
              max={200}
              step={5}
              prefix="$"
              onChange={setHourlyRate}
            />
          </div>
        </div>

        <div className="bg-[rgba(0,166,200,0.04)] p-6">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
            Annual drag · Today
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Metric
              label="Hours burned"
              value={formatNumber(hoursYear)}
              unit="hrs / year"
            />
            <Metric
              label="Cost of drag"
              value={`$${formatNumber(costYear)}`}
              unit="USD / year"
              emphasize
            />
          </div>

          <div className="mt-8 border-t border-[rgba(17,24,32,0.12)] pt-6">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-cyan-strong)]">
              Planning reclaim · After automation
            </p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Directional range if {Math.round(RECLAIM_LOW * 100)}–
              {Math.round(RECLAIM_HIGH * 100)}% of pack glue is automated —
              not a guarantee. Audit produces the ROI hypothesis.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Metric
                label="Time back"
                value={`${formatNumber(reclaimHoursLow)}–${formatNumber(reclaimHoursHigh)}`}
                unit="hrs / year"
              />
              <Metric
                label="Cost back"
                value={`$${formatNumber(reclaimCostLow)}–$${formatNumber(reclaimCostHigh)}`}
                unit="USD / year"
                emphasize
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-[rgba(17,24,32,0.12)] pt-6 sm:flex-row">
            <a
              href={siteConfig.diagnosticUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary"
            >
              Validate with Free PMO Diagnostic
            </a>
            <Link href="/contact" className="button button-secondary">
              Book Audit Fit Call
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="form-label !mb-0">{label}</span>
        <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-[-0.02em] text-[var(--color-ink)]">
          {prefix}
          {value}
          {suffix ? (
            <span className="ml-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--color-muted)]">
              {suffix}
            </span>
          ) : null}
        </span>
      </div>
      <input
        type="range"
        className="drag-slider w-full"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
    </label>
  );
}

function Metric({
  label,
  value,
  unit,
  emphasize = false,
}: {
  label: string;
  value: string;
  unit: string;
  emphasize?: boolean;
}) {
  return (
    <div
      className={cn(
        "border p-4",
        emphasize
          ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[#fffdf8]"
          : "border-[rgba(17,24,32,0.14)] bg-[rgba(255,253,248,0.95)]",
      )}
    >
      <p
        className={cn(
          "font-mono text-[10px] font-bold uppercase tracking-[0.14em]",
          emphasize ? "text-[rgba(0,166,200,0.9)]" : "text-[var(--color-muted)]",
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-[-0.03em] md:text-3xl",
          emphasize ? "text-[#fffdf8]" : "text-[var(--color-ink)]",
        )}
      >
        {value}
      </p>
      <p
        className={cn(
          "mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em]",
          emphasize ? "text-[#aab3ba]" : "text-[var(--color-muted)]",
        )}
      >
        {unit}
      </p>
    </div>
  );
}

function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(Math.round(n));
}
