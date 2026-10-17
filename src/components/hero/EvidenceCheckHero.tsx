"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { track } from "../../lib/track";
import { EvidenceCell } from "../ui/EvidenceCell";
import { RagBadge } from "../ui/RagBadge";
import { ScoreBadge } from "../ui/ScoreBadge";
import {
  evidencedCount,
  heroClaims,
  heroCompletionSummary,
  heroContradiction,
  readiness5,
  sampleLabel,
} from "./evidenceCheckData";

// Timing (PRD 7): start after 700 ms, cells 120 ms apart, then the score; contradiction last. Ends near 4.2 s.
const START_MS = 700;
const CELL_MS = 120;
const SCORE_AFTER_LAST_CELL_MS = 180;
const CLAIM_MS = 900;
const LINK_AFTER_LAST_SCORE_MS = 240;
const DONE_AFTER_LINK_MS = 500;

type Phase = "idle" | "resolving" | "linking" | "done";

type CheckState = {
  phase: Phase;
  /** Cells resolved so far, counted left to right through the claims. */
  resolved: number;
  /** Claims whose score has replaced the pending marker. */
  scored: number;
};

const CELLS_PER_CLAIM = readiness5.length;
const INITIAL: CheckState = { phase: "idle", resolved: 0, scored: 0 };
const FINAL: CheckState = { phase: "done", resolved: heroClaims.length * CELLS_PER_CLAIM, scored: heroClaims.length };

/** The whole sequence as (time, state) steps: idle → resolving(claim, cell) → linking → done. */
function timeline(): { at: number; state: CheckState }[] {
  const steps: { at: number; state: CheckState }[] = [];
  let lastScoreAt = START_MS;
  heroClaims.forEach((_, claim) => {
    const claimStart = START_MS + claim * CLAIM_MS;
    for (let cell = 0; cell < CELLS_PER_CLAIM; cell++) {
      steps.push({
        at: claimStart + cell * CELL_MS,
        state: { phase: "resolving", resolved: claim * CELLS_PER_CLAIM + cell + 1, scored: claim },
      });
    }
    lastScoreAt = claimStart + (CELLS_PER_CLAIM - 1) * CELL_MS + SCORE_AFTER_LAST_CELL_MS;
    steps.push({
      at: lastScoreAt,
      state: { phase: "resolving", resolved: (claim + 1) * CELLS_PER_CLAIM, scored: claim + 1 },
    });
  });
  const linkAt = lastScoreAt + LINK_AFTER_LAST_SCORE_MS;
  steps.push({ at: linkAt, state: { ...FINAL, phase: "linking" } });
  steps.push({ at: linkAt + DONE_AFTER_LINK_MS, state: FINAL });
  return steps;
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** Interactive hero table: each claim reported Green is checked against READINESS-5. */
export function EvidenceCheckHero({ className }: { className?: string }) {
  const reducedMotion = React.useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  const [run, setRun] = React.useState(0);
  const [state, setState] = React.useState<CheckState>(INITIAL);

  React.useEffect(() => {
    if (reducedMotion) return;
    const timers = timeline().map(({ at, state: next }) => window.setTimeout(() => setState(next), at));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [run, reducedMotion]);

  // Reduced motion shows the final state immediately (CSS also does this before hydration).
  const view = reducedMotion ? FINAL : state;
  const linked = view.phase === "linking" || view.phase === "done";
  const done = view.phase === "done";

  const replay = () => {
    setState(INITIAL);
    setRun((value) => value + 1);
    track("hero_check_replay");
  };

  const cellOn = (claim: number, cell: number) => claim * CELLS_PER_CLAIM + cell < view.resolved;
  const contradictionIndex = heroClaims.findIndex((c) => c.id === heroContradiction.between[0]);

  return (
    <div className={cn("ec", className)} data-phase={view.phase} data-linked={linked}>
      {/* Desktop and tablet: one table, contradiction bracket in the left gutter. */}
      <div className="hidden rounded-sheet border border-line bg-paper min-[641px]:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Readiness claims reported Green, checked on Status, Owner, Evidence, Date and Action
          </caption>
          <thead>
            <tr className="border-b border-line bg-faint">
              <td className="w-6 p-0" aria-hidden />
              <th scope="col" className="t-small px-2 py-3 font-semibold text-ink">
                ID
              </th>
              <th scope="col" className="t-small px-2 py-3 font-semibold text-ink">
                Claim as reported
              </th>
              <th scope="col" className="t-small px-2 py-3 font-semibold text-ink">
                Reported
              </th>
              {readiness5.map((element) => (
                <th key={element.key} scope="col" className="t-small w-8 px-1 py-3 text-center font-semibold text-ink">
                  <abbr title={element.name} className="no-underline">
                    {element.key}
                  </abbr>
                </th>
              ))}
              <th scope="col" className="t-small px-3 py-3 font-semibold text-ink">
                Evidenced
              </th>
            </tr>
          </thead>
          <tbody>
            {heroClaims.map((claim, claimIndex) => (
              <tr key={claim.id} className="border-b border-line last:border-b-0">
                {claimIndex === contradictionIndex ? (
                  <td rowSpan={2} className="relative w-6 p-0" aria-hidden>
                    <ContradictionBracket />
                  </td>
                ) : claimIndex === contradictionIndex + 1 ? null : (
                  <td className="w-6 p-0" aria-hidden />
                )}
                <th scope="row" className="t-data px-2 py-3 align-middle text-[14px] text-ink">
                  {claim.id}
                </th>
                <td className="t-small px-2 py-3 align-middle text-ink">{claim.claim}</td>
                <td className="px-2 py-3 align-middle">
                  <RagBadge status={claim.reported} />
                </td>
                {claim.marks.map((mark, cellIndex) => (
                  <td key={readiness5[cellIndex].key} className="px-1 py-3 text-center align-middle">
                    <Mark
                      on={cellOn(claimIndex, cellIndex)}
                      state={mark}
                      label={readiness5[cellIndex].name}
                    />
                  </td>
                ))}
                <td className="px-3 py-3 align-middle">
                  <Score on={claimIndex < view.scored} score={evidencedCount(claim.marks)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="ec-label t-small flex gap-2 border-t border-line px-4 py-3 text-ink">
          <span aria-hidden className="mt-[0.45em] h-2 w-2 shrink-0 rounded-full bg-ev-miss" />
          <span>
            <span className="sr-only">{`Contradiction between ${heroContradiction.between.join(" and ")}: `}</span>
            {heroContradiction.label}
          </span>
        </p>
      </div>

      {/* Mobile: claims stack; the contradiction is a note under T1. */}
      <ol className="divide-y divide-line rounded-sheet border border-line bg-paper min-[641px]:hidden">
        {heroClaims.map((claim, claimIndex) => (
          <li key={claim.id} className="px-4 py-4">
            <div className="flex items-start gap-3">
              <span className="t-data pt-0.5 text-[14px] text-ink">{claim.id}</span>
              <div className="min-w-0 flex-1">
                <p className="t-small text-ink">{claim.claim}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <RagBadge status={claim.reported} prefix="Reported" />
                  <Score on={claimIndex < view.scored} score={evidencedCount(claim.marks)} />
                </div>
                <dl className="mt-3 flex gap-3">
                  {claim.marks.map((mark, cellIndex) => (
                    <div key={readiness5[cellIndex].key} className="flex flex-col items-center gap-1">
                      <dt className="text-[12px] font-semibold text-muted">
                        <abbr title={readiness5[cellIndex].name} className="no-underline">
                          {readiness5[cellIndex].key}
                        </abbr>
                      </dt>
                      <dd>
                        <Mark
                          on={cellOn(claimIndex, cellIndex)}
                          state={mark}
                          label={readiness5[cellIndex].name}
                        />
                      </dd>
                    </div>
                  ))}
                </dl>
                {claimIndex === contradictionIndex && (
                  <p className="ec-label t-small mt-3 flex gap-2 border-l-2 border-ev-miss pl-2 text-ink">
                    <span>
                      <span className="sr-only">{`Contradiction between ${heroContradiction.between.join(" and ")}: `}</span>
                      {heroContradiction.label}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="t-small text-muted">{sampleLabel}</p>
        <button
          type="button"
          onClick={replay}
          disabled={!done}
          className={cn(
            "ec-replay t-small font-semibold text-teal underline decoration-1 underline-offset-4 hover:decoration-2",
            done ? "visible" : "invisible",
          )}
        >
          Run the check again
        </button>
      </div>

      <div className="sr-only" role="status" aria-live="polite">
        {done ? heroCompletionSummary : ""}
      </div>
    </div>
  );
}

/** One R5 cell: a pending marker until resolved, then the evidence mark. Both share one grid slot. */
function Mark({ on, state, label }: { on: boolean; state: "present" | "partial" | "missing"; label: string }) {
  return (
    <span className="inline-grid place-items-center" data-on={on}>
      <span className="ec-pending [grid-area:1/1]">
        <span aria-hidden className="block h-4 w-4 rounded-full border border-dashed border-line" />
        <span className="sr-only">{`${label}: not checked yet`}</span>
      </span>
      <span className="ec-final [grid-area:1/1]">
        <EvidenceCell state={state} label={label} />
      </span>
    </span>
  );
}

function Score({ on, score }: { on: boolean; score: number }) {
  return (
    <span className="inline-grid" data-on={on}>
      <span className="ec-pending t-small text-muted [grid-area:1/1]">
        <span aria-hidden>–</span>
        <span className="sr-only">Not checked yet</span>
      </span>
      <span className="ec-final [grid-area:1/1]">
        <ScoreBadge score={score} />
      </span>
    </span>
  );
}

/** Bracket joining the two contradicting rows (T1 and I1), drawn when the check links them. */
function ContradictionBracket() {
  return (
    <svg
      className="ec-link absolute inset-0 h-full w-full text-ev-miss"
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
