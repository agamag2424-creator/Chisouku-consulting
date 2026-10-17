"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { track } from "../../lib/track";
import { EvidenceCell } from "../ui/EvidenceCell";
import { RagBadge } from "../ui/RagBadge";
import { ScoreBadge } from "../ui/ScoreBadge";
import {
  MOSTLY_EVIDENCED,
  evidenceStateLabel,
  evidencedCount,
  heroCard,
  heroClaims,
  heroCompletionSummary,
  heroContradiction,
  readiness5,
  sampleLabel,
} from "./evidenceCheckData";

// PRD 7 (v1.2): the card moves once, on its own, from the reported view to the evidenced view.
const AUTO_SWITCH_MS = 1800;

/** "auto" until the visitor chooses; CSS shows reported, or evidenced under reduced motion (globals.css). */
type View = "auto" | "reported" | "evidenced";
type ShownView = Exclude<View, "auto">;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const reportedGreen = heroClaims.filter((claim) => claim.reported === "green").length;
const mostlyEvidenced = heroClaims.filter((claim) => evidencedCount(claim.marks) >= MOSTLY_EVIDENCED).length;
const contradictionIndex = heroClaims.findIndex((claim) => claim.id === heroContradiction.between[0]);
const contradictionSr = `Contradiction between ${heroContradiction.between.join(" and ")}: `;

/** Hero Evidence Check: three claims reported Green, seen as reported and as evidenced on READINESS-5. */
export function EvidenceCheckHero({ className }: { className?: string }) {
  const reducedMotion = React.useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  const [view, setView] = React.useState<View>("auto");
  const [picked, setPicked] = React.useState(heroClaims[0].id);

  React.useEffect(() => {
    if (reducedMotion || view !== "auto") return;
    const timer = window.setTimeout(() => setView("evidenced"), AUTO_SWITCH_MS);
    return () => window.clearTimeout(timer);
  }, [reducedMotion, view]);

  const shown: ShownView = view === "auto" ? (reducedMotion ? "evidenced" : "reported") : view;
  const evidenced = shown === "evidenced";

  const choose = (next: ShownView) => {
    setView(next);
    track("hero_view_toggle", { view: next });
  };
  const pick = (id: string) => {
    setPicked(id);
    if (!evidenced) choose("evidenced");
  };

  const pickedClaim = heroClaims.find((claim) => claim.id === picked) ?? heroClaims[0];
  const isPicked = (id: string) => evidenced && id === picked;

  return (
    <div
      className={cn("ec overflow-hidden rounded-sheet border border-line bg-paper text-ink shadow-2xl", className)}
      data-view={view}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-faint px-5 py-4">
        <div>
          <p className="t-small font-semibold">{heroCard.title}</p>
          <p className="text-[13px] text-muted">{heroCard.subtitle}</p>
        </div>
        <div role="group" aria-label="View" className="inline-flex gap-1 rounded-control bg-faint p-1">
          {(["reported", "evidenced"] as const).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={shown === key}
              onClick={() => choose(key)}
              className="min-h-10 rounded-control px-4 text-[14px] font-semibold text-muted transition-colors hover:text-ink aria-pressed:bg-paper aria-pressed:text-ink aria-pressed:shadow-sm"
            >
              {heroCard.views[key]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 border-b border-faint">
        <Stat className="ec-rep" value={`${reportedGreen}/${heroClaims.length}`} label={heroCard.reportedLabel} />
        <Stat className="ec-rep border-l border-faint" value="?" valueClassName="text-line" label={heroCard.notCheckedLabel} />
        <Stat className="ec-ev" value={`${mostlyEvidenced}/${heroClaims.length}`} label={heroCard.evidencedLabel} />
        <Stat className="ec-ev border-l border-faint" value="1" valueClassName="text-ev-miss" label={heroCard.contradictionLabel} />
      </div>

      {/* One table for every width. From 641px a classic table with the contradiction bracket in the gutter; below,
          each row is a small grid (ID and claim, then the marks with their letters, then the score). ARIA roles
          keep the table semantics when the display changes. */}
      <table role="table" className="w-full border-collapse text-left max-[640px]:block">
        <caption className="sr-only">
          Readiness claims reported Green, checked on Status, Owner, Evidence, Date and Action
        </caption>
        <thead role="rowgroup" className="max-[640px]:sr-only">
          <tr role="row" className="text-[12px] font-semibold text-muted">
            <td className="w-6 p-0" aria-hidden />
            <th role="columnheader" scope="col" className="px-2 pb-2 pt-3">
              ID
            </th>
            <th role="columnheader" scope="col" className="px-2 pb-2 pt-3">
              Claim as reported
            </th>
            <th role="columnheader" scope="col" className="ec-rep px-3 pb-2 pt-3">
              Reported
            </th>
            {readiness5.map((element) => (
              <th
                key={element.key}
                role="columnheader"
                scope="col"
                className="ec-ev w-7 px-1 pb-2 pt-3 text-center"
              >
                <abbr title={element.name} className="no-underline">
                  {element.key}
                </abbr>
              </th>
            ))}
            <th role="columnheader" scope="col" className="ec-ev px-3 pb-2 pt-3">
              Evidenced
            </th>
          </tr>
        </thead>
        <tbody role="rowgroup" className="max-[640px]:block">
          {heroClaims.map((claim, claimIndex) => (
            <tr
              key={claim.id}
              role="row"
              className={cn(
                "border-t border-faint transition-colors",
                "max-[640px]:grid max-[640px]:grid-cols-[2.25rem_repeat(5,1.75rem)_minmax(0,1fr)] max-[640px]:items-center max-[640px]:px-4 max-[640px]:py-2",
                isPicked(claim.id) && "bg-teal-tint",
              )}
            >
              {claimIndex === contradictionIndex ? (
                <td rowSpan={2} className="relative w-6 bg-paper p-0 max-[640px]:hidden" aria-hidden>
                  <ContradictionBracket />
                </td>
              ) : claimIndex === contradictionIndex + 1 ? null : (
                <td className="w-6 bg-paper p-0 max-[640px]:hidden" aria-hidden />
              )}
              <th role="rowheader" scope="row" className="t-data px-2 py-2 align-middle text-[14px] max-[640px]:p-0">
                {claim.id}
              </th>
              <td role="cell" className="px-2 py-2 align-middle max-[640px]:col-span-6 max-[640px]:p-0">
                <ClaimButton text={claim.claim} pressed={isPicked(claim.id)} onClick={() => pick(claim.id)} />
              </td>
              <td role="cell" className="ec-rep px-3 py-2 align-middle max-[640px]:col-span-6 max-[640px]:col-start-2 max-[640px]:p-0 max-[640px]:pb-1">
                <RagBadge status={claim.reported} />
              </td>
              {claim.marks.map((mark, cellIndex) => (
                <td
                  key={readiness5[cellIndex].key}
                  role="cell"
                  data-key={readiness5[cellIndex].key}
                  className={cn(
                    "ec-ev px-1 py-2 text-center align-middle",
                    "max-[640px]:flex max-[640px]:flex-col max-[640px]:items-center max-[640px]:gap-1 max-[640px]:p-0 max-[640px]:pb-1",
                    "max-[640px]:before:text-[12px] max-[640px]:before:font-semibold max-[640px]:before:text-muted max-[640px]:before:content-[attr(data-key)]",
                    cellIndex === 0 && "max-[640px]:col-start-2",
                  )}
                >
                  <EvidenceCell state={mark} label={readiness5[cellIndex].name} />
                </td>
              ))}
              <td role="cell" className="ec-ev px-3 py-2 align-middle max-[640px]:col-span-6 max-[640px]:col-start-2 max-[640px]:p-0 max-[640px]:pb-1 max-[640px]:pt-1">
                <ScoreBadge score={evidencedCount(claim.marks)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ContradictionNote className="mx-4 mt-3 flex min-[641px]:mx-5" />

      <div className="ec-ev px-5 pt-4">
        <p className="text-[13px] text-muted">{`${pickedClaim.id} ${pickedClaim.claim}: ${heroCard.detailSuffix}`}</p>
        <ul className="mt-2 grid grid-cols-2 gap-2 min-[480px]:grid-cols-5">
          {pickedClaim.marks.map((mark, cellIndex) => (
            <li key={readiness5[cellIndex].key} className="flex flex-col gap-1.5 rounded-sheet bg-page p-2.5">
              <span className="flex items-center gap-2 text-[12px] font-semibold">
                <EvidenceCell state={mark} label={readiness5[cellIndex].name} className="[--glyph:14px]" />
                <span aria-hidden>{readiness5[cellIndex].name}</span>
              </span>
              <span aria-hidden className="text-[12px] text-muted">
                {evidenceStateLabel[mark]}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-faint px-5 py-4">
        <p className="text-[13px] text-muted">{sampleLabel}</p>
        <ul className="flex gap-3.5 text-[13px] text-muted" aria-label="Key">
          {(["present", "partial", "missing"] as const).map((state) => (
            <li key={state} className="flex items-center gap-1.5">
              <EvidenceCell state={state} label="Key" className="[--glyph:12px] [&>.sr-only]:hidden" />
              {evidenceStateLabel[state]}
            </li>
          ))}
        </ul>
      </div>

      <div className="sr-only" role="status" aria-live="polite">
        {evidenced ? heroCompletionSummary : ""}
      </div>
    </div>
  );
}

function Stat({
  value,
  label,
  className,
  valueClassName,
}: {
  value: string;
  label: string;
  className?: string;
  valueClassName?: string;
}) {
  return (
    <p className={cn("flex flex-col gap-1.5 px-5 py-4 min-[480px]:flex-row min-[480px]:items-baseline min-[480px]:gap-3", className)}>
      <span className={cn("t-data text-[34px] leading-none tracking-[-0.03em] min-[641px]:text-[40px]", valueClassName)}>
        {value}
      </span>
      <span className="text-[14px] leading-snug text-muted">{label}</span>
    </p>
  );
}

/** The claim text; selecting it shows that claim's evidence below the table. */
function ClaimButton({ text, pressed, onClick }: { text: string; pressed: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className="t-small min-h-11 w-full rounded-control text-left decoration-1 underline-offset-4 hover:underline"
    >
      {text}
    </button>
  );
}

function ContradictionNote({ className }: { className?: string }) {
  return (
    <p className={cn("ec-ev t-small gap-2 rounded-sheet bg-ev-miss-tint px-3 py-2.5 text-ink", className)}>
      <span aria-hidden className="mt-[0.45em] size-2 shrink-0 rounded-full bg-ev-miss" />
      <span>
        <span className="sr-only">{contradictionSr}</span>
        {heroContradiction.label}
      </span>
    </p>
  );
}

/** Bracket joining the two contradicting rows (T1 and I1), drawn when the evidenced view opens. */
function ContradictionBracket() {
  return (
    <svg
      className="ec-ev ec-link absolute inset-0 h-full w-full text-ev-miss"
      viewBox="0 0 24 100"
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
    >
      <path
        d="M22 25 H8 V75 H22"
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
