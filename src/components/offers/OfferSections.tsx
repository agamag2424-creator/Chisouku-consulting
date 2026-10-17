import type { ReactNode } from "react";
import { offerPriceLabel, siteConfig } from "../../lib/siteConfig";
import { cn } from "../../lib/utils";
import { EvidenceCell, type EvidenceState } from "../ui/EvidenceCell";
import { Button } from "../ui/Button";
import { Section } from "../ui/Section";
import { Sheet } from "../ui/Sheet";
import { WeekStrip } from "../home/HomeVisuals";
import { DayStrip } from "./DayStrip";

// Offer page sections (PRD 9.2, 9.3) in the E1.6 visual language. Copy is passed in verbatim by each page.

export type FixedOffer = "evidenceCheck" | "decisionReview";

const CTA = {
  review: { href: "/contact?request=review", label: "Discuss your programme" },
  brief: { href: "/contact?request=brief", label: "Request a free readiness brief" },
  samplePack: { href: "/see-it-first#sample-pack", label: "See a full sample decision pack" },
} as const;

/** Heading beside its lead from 1100px; stacked below (as on the homepage). */
export function SectionHead({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="grid gap-6 min-[1100px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] min-[1100px]:items-end min-[1100px]:gap-16">
      <h2 className="t-h2 text-ink">{title}</h2>
      {children && <div className="t-body text-muted">{children}</div>}
    </div>
  );
}

/** Ink hero: name, lead, CTA; a white card with the days and prices from config. */
export function OfferHero({ offer, lead }: { offer: FixedOffer; lead: string }) {
  const data = siteConfig.offers[offer];
  const price = offerPriceLabel(offer);
  return (
    <Section
      tone="ink"
      containerClassName="grid gap-12 min-[1100px]:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] min-[1100px]:items-center min-[1100px]:gap-16"
    >
      <div>
        <h1 className="t-h1 text-paper">{data.name}</h1>
        <p className="t-body mt-5 max-w-[58ch] text-paper/80">{lead}</p>
        <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
          <Button href={CTA.review.href} variant="inverse" size="lg">
            {CTA.review.label}
          </Button>
          <Button href={CTA.samplePack.href} variant="inverse-outline" size="lg">
            {CTA.samplePack.label}
          </Button>
        </div>
      </div>
      <Sheet className="flex flex-col gap-6 p-6 text-ink shadow-2xl min-[641px]:p-8">
        <p className="flex items-baseline gap-3">
          <span className="t-data text-[44px] leading-none tracking-[-0.03em]">{data.days}</span>
          <span className="t-small text-muted">business days</span>
        </p>
        <DayStrip days={data.days} />
        <dl className="flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-5">
          <div>
            <dt className="text-[13px] text-muted">List price</dt>
            <dd className="t-data mt-1.5 text-[26px] text-ink">{price.list}</dd>
          </div>
          {price.founding && (
            <div>
              <dt className="text-[13px] text-muted">Founding-client rate</dt>
              <dd className="t-data mt-1.5 text-[26px] text-teal">{price.founding}</dd>
            </div>
          )}
        </dl>
      </Sheet>
    </Section>
  );
}

/** "6–16 weeks from a go-live decision" as a window on a week scale ending at the decision. */
export function DecisionWindow({ fromWeeks, toWeeks }: { fromWeeks: number; toWeeks: number }) {
  const scale = fromWeeks + 4;
  const at = (weeks: number) => `${((scale - weeks) / scale) * 100}%`;
  return (
    <div aria-hidden className="relative mt-12 pb-20 pt-2 min-[641px]:pb-12">
      <div className="relative h-3 rounded-full bg-faint">
        <span
          className="absolute inset-y-0 rounded-full bg-teal"
          style={{ left: at(fromWeeks), right: `calc(100% - ${at(toWeeks)})` }}
        />
        <span className="absolute -top-1.5 right-0 size-6 rounded-full border-4 border-paper bg-ink" />
      </div>
      {[fromWeeks, toWeeks].map((weeks) => (
        <span
          key={weeks}
          className="t-data absolute top-8 -translate-x-1/2 text-[13px] text-teal"
          style={{ left: at(weeks) }}
        >
          {`W-${weeks}`}
        </span>
      ))}
      <span className="t-small absolute right-0 top-14 font-semibold text-ink min-[641px]:top-8">Go-live decision</span>
    </div>
  );
}

const documentIcon = (
  <svg viewBox="0 0 22 22" className="size-[22px] shrink-0 text-teal" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden focusable="false">
    <path d="M6 3h7l4 4v12H6z" />
    <path d="M13 3v4h4M9 11h5M9 14.5h5" />
  </svg>
);

/** The documents a review reads, as tiles. */
export function DocumentTiles({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-10 grid gap-3 min-[641px]:grid-cols-2 min-[1100px]:grid-cols-3">
      {items.map((item) => (
        <li key={item}>
          <Sheet className="flex h-full items-center gap-3.5 px-5 py-4">
            {documentIcon}
            <span className="t-small font-semibold text-ink">{item}</span>
          </Sheet>
        </li>
      ))}
    </ul>
  );
}

export type DeliverableKind = "register" | "contradiction" | "risks" | "readout" | "brief" | "conditions" | "actions";

/** What the client receives: one tile per deliverable, each with a small drawing of it (shapes only). */
export function DeliverableTiles({ items, columns = 4 }: { items: readonly { kind: DeliverableKind; text: string }[]; columns?: 3 | 4 }) {
  return (
    <ul
      className={cn(
        "mt-10 grid gap-4 min-[641px]:grid-cols-2",
        columns === 4 ? "min-[1100px]:grid-cols-4" : "min-[1100px]:grid-cols-3",
      )}
    >
      {items.map((item) => (
        <li key={item.text}>
          <Sheet className="flex h-full flex-col gap-5 p-6">
            <span aria-hidden className="flex h-20 items-center justify-center rounded-sheet bg-page px-4">
              {deliverableDrawing[item.kind]}
            </span>
            <span className="t-body text-ink">{item.text}</span>
          </Sheet>
        </li>
      ))}
    </ul>
  );
}

const registerRows: readonly (readonly EvidenceState[])[] = [
  ["present", "present", "partial", "present", "missing"],
  ["present", "missing", "missing", "missing", "missing"],
];

const line = "block h-1.5 rounded-full bg-line";

const deliverableDrawing: Record<DeliverableKind, ReactNode> = {
  register: (
    <span className="flex w-full flex-col gap-2">
      {registerRows.map((row, index) => (
        <span key={index} className="flex items-center gap-1.5">
          <span className={cn(line, "flex-1")} />
          {row.map((state, cell) => (
            <EvidenceCell key={cell} state={state} label="" className="[&_svg]:size-3 [&>.sr-only]:hidden" />
          ))}
        </span>
      ))}
    </span>
  ),
  contradiction: (
    <span className="flex items-center">
      <span className="size-4 rounded-full bg-ink" />
      <span className="w-14 border-t-2 border-dashed border-ev-miss" />
      <span className="size-4 rounded-full bg-ink" />
    </span>
  ),
  risks: (
    <span className="flex h-12 items-end gap-1.5">
      {[100, 82, 64, 46, 30].map((height) => (
        <span key={height} className="w-4 rounded-t-[2px] bg-ink" style={{ height: `${height}%` }} />
      ))}
    </span>
  ),
  readout: (
    <svg viewBox="0 0 40 40" className="size-11 text-ink" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" focusable="false">
      <circle cx="20" cy="20" r="15" />
      <path d="M20 11v9l6 4" />
    </svg>
  ),
  brief: (
    <span className="flex gap-1.5">
      {[0, 1].map((page) => (
        <span key={page} className="flex h-14 w-11 flex-col gap-1.5 rounded-[2px] border border-line bg-paper p-1.5">
          <span className={cn(line, page === 0 ? "w-3/4 bg-ink" : "w-1/2")} />
          <span className={line} />
          <span className={line} />
        </span>
      ))}
    </span>
  ),
  conditions: (
    <span className="flex w-full flex-col gap-2">
      {[0, 1, 2].map((row) => (
        <span key={row} className="grid grid-cols-[2fr_1fr_1fr] gap-1.5">
          <span className={cn(line, "bg-teal")} />
          <span className={line} />
          <span className={line} />
        </span>
      ))}
    </span>
  ),
  actions: (
    <span className="flex w-full flex-col gap-2">
      {[0, 1, 2].map((row) => (
        <span key={row} className="flex items-center gap-2">
          <span className="size-3 shrink-0 rounded-[2px] border-2 border-ink" />
          <span className={cn(line, "flex-1")} />
        </span>
      ))}
    </span>
  ),
};

export type RunStep = { from: number; to: number; text: string };

const dayLabel = ({ from, to }: RunStep) => (from === to ? `Day ${from}` : `Days ${from}–${to}`);

/** The real sequence, numbered; each step's days are marked on a track of all business days. */
export function RunSequence({ days, steps }: { days: number; steps: readonly RunStep[] }) {
  return (
    <ol className="mt-10 overflow-hidden rounded-sheet border border-line bg-paper">
      {steps.map((step, index) => (
        <li
          key={step.text}
          className="grid gap-4 border-t border-line p-5 first:border-t-0 min-[900px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] min-[900px]:items-center min-[900px]:gap-8 min-[900px]:px-6"
        >
          <span className="flex items-start gap-4">
            <span className="t-data flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-[14px] text-paper">
              {index + 1}
            </span>
            <span className="flex flex-col gap-1">
              <span className="t-data text-[13px] text-teal">{dayLabel(step)}</span>
              <span className="t-small font-semibold text-ink">{step.text}</span>
            </span>
          </span>
          <span aria-hidden className="grid gap-1" style={{ gridTemplateColumns: `repeat(${days}, minmax(0, 1fr))` }}>
            {Array.from({ length: days }, (_, day) => (
              <span
                key={day}
                className={cn("h-7 rounded-sheet", day + 1 >= step.from && day + 1 <= step.to ? "bg-ink" : "bg-faint")}
              />
            ))}
          </span>
        </li>
      ))}
    </ol>
  );
}

/** "What it is not": each item a struck-through tile. */
export function NotList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-10 grid gap-3 min-[900px]:grid-cols-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3.5 rounded-sheet bg-paper p-5">
          <svg viewBox="0 0 22 22" className="mt-0.5 size-[22px] shrink-0 text-ink" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden focusable="false">
            <circle cx="11" cy="11" r="8.5" />
            <path d="M7.5 7.5l7 7M14.5 7.5l-7 7" />
          </svg>
          <span className="t-small font-semibold text-ink">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Closing band shared with the homepage (approved E1.6 wording). */
export function OfferClosing() {
  return (
    <Section tone="ink">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <h2 className="t-h2 max-w-[18ch] text-paper">Six weeks from go-live? Start with the evidence.</h2>
        <div className="flex w-full flex-col gap-3 min-[480px]:w-auto min-[480px]:flex-row min-[480px]:flex-wrap">
          <Button href={CTA.review.href} variant="inverse" size="lg">
            {CTA.review.label}
          </Button>
          <Button href={CTA.brief.href} variant="inverse-outline" size="lg">
            {CTA.brief.label}
          </Button>
        </div>
      </div>
      <WeekStrip />
    </Section>
  );
}

export { CTA as offerCta };

/** Review scope: the core domains as solid tiles, an optional one dashed with its condition. */
export function ScopeTiles({ core, optional }: { core: readonly string[]; optional?: { name: string; note: string } }) {
  return (
    <ul className="mt-10 grid grid-cols-2 gap-3 min-[641px]:grid-cols-3 min-[1100px]:grid-cols-6">
      {core.map((name) => (
        <li key={name} className="flex min-h-20 items-end rounded-sheet bg-ink p-4 min-[641px]:min-h-24">
          <span className="t-small font-semibold text-paper">{name}</span>
        </li>
      ))}
      {optional && (
        <li className="flex min-h-20 flex-col justify-end gap-1 rounded-sheet border-2 border-dashed border-ink/40 p-4 min-[641px]:min-h-24">
          <span className="t-small font-semibold text-ink">{optional.name}</span>
          <span className="text-[13px] text-muted">{optional.note}</span>
        </li>
      )}
    </ul>
  );
}

/** The method as three steps in order, joined by arrows (stacked on phones). */
export function MethodFlow({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="mt-10 grid gap-3 min-[900px]:grid-cols-[repeat(3,minmax(0,1fr))] min-[900px]:gap-10">
      {steps.map((step, index) => (
        <li
          key={step}
          className={cn(
            "relative flex items-start gap-4 rounded-sheet border border-line bg-paper p-5",
            index < steps.length - 1 &&
              "min-[900px]:after:absolute min-[900px]:after:-right-8 min-[900px]:after:top-1/2 min-[900px]:after:size-4 min-[900px]:after:-translate-y-1/2 min-[900px]:after:rotate-45 min-[900px]:after:border-r-2 min-[900px]:after:border-t-2 min-[900px]:after:border-ink",
          )}
        >
          <span className="t-data flex size-8 shrink-0 items-center justify-center rounded-full bg-teal text-[14px] text-paper">
            {index + 1}
          </span>
          <span className="t-small font-semibold text-ink">{step}</span>
        </li>
      ))}
    </ol>
  );
}

/** Speed note as two bars on one business-day scale: the usual 4–6 weeks against this offer's days. */
export function SpeedBars({ days, usual }: { days: number; usual: { label: string; fromDays: number; toDays: number } }) {
  const pct = (value: number) => `${(value / usual.toDays) * 100}%`;
  return (
    <div aria-hidden className="grid gap-4">
      <div className="grid gap-2">
        <span className="flex justify-between gap-3 text-[13px]">
          <span className="font-semibold text-ink">{usual.label}</span>
        </span>
        <span className="relative block h-4 rounded-full bg-faint">
          <span className="absolute inset-y-0 left-0 rounded-full bg-line" style={{ width: pct(usual.fromDays) }} />
          <span
            className="absolute inset-y-0 rounded-r-full border-2 border-l-0 border-dashed border-line"
            style={{ left: pct(usual.fromDays), right: 0 }}
          />
        </span>
      </div>
      <div className="grid gap-2">
        <span className="t-data text-[13px] text-teal">{`${days} business days`}</span>
        <span className="relative block h-4 rounded-full bg-faint">
          <span className="absolute inset-y-0 left-0 rounded-full bg-teal" style={{ width: pct(days) }} />
        </span>
      </div>
    </div>
  );
}
