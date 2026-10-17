import { cn } from "../../lib/utils";

export type EvidenceState = "present" | "partial" | "missing";

const toneClasses: Record<EvidenceState, string> = {
  present: "text-ev-ok",
  partial: "text-ev-part",
  missing: "text-ev-miss",
};

type EvidenceCellProps = {
  state: EvidenceState;
  /** Read by screen readers before the state, e.g. "Evidence" gives "Evidence: missing". */
  label: string;
  className?: string;
};

/** One READINESS-5 mark: ● present, ◐ partial (not counted), ○ missing. */
export function EvidenceCell({ state, label, className }: EvidenceCellProps) {
  return (
    <span className={cn("inline-flex items-center justify-center", toneClasses[state], className)}>
      <EvidenceGlyph state={state} />
      <span className="sr-only">{`${label}: ${state}`}</span>
    </span>
  );
}

/** Drawn as SVG so the three marks render identically whatever font is loaded. */
function EvidenceGlyph({ state }: { state: EvidenceState }) {
  return (
    <svg viewBox="0 0 16 16" className="size-4" aria-hidden focusable="false">
      {state === "present" ? (
        <circle cx="8" cy="8" r="6.5" fill="currentColor" />
      ) : (
        <circle cx="8" cy="8" r="5.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
      )}
      {state === "partial" && <path d="M8 2.25a5.75 5.75 0 0 0 0 11.5z" fill="currentColor" />}
    </svg>
  );
}
