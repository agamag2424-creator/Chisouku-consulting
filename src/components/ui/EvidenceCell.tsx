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

/**
 * Drawn with CSS (one element) so the three marks render identically whatever font is loaded.
 * Same geometry as the earlier SVG: a disc 13/16 of its box, ring 1.5px, partial fills the left half.
 * The box is 16px; a caller can set `--glyph` (e.g. `[--glyph:12px]`) to resize it.
 */
function EvidenceGlyph({ state }: { state: EvidenceState }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block size-[calc(var(--glyph,16px)*0.8125)] m-[calc(var(--glyph,16px)*0.09375)] rounded-full",
        state === "present" ? "bg-current" : "border-[1.5px] border-current",
        state === "partial" && "bg-[linear-gradient(90deg,currentColor_50%,transparent_50%)]",
      )}
    />
  );
}
