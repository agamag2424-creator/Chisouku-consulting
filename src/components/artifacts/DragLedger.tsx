import { cn } from "../../lib/utils";

const rows = [
  {
    friction: "Multi-system export lag",
    impact: "Pack starts late every Monday",
  },
  {
    friction: "Spreadsheet consolidation",
    impact: "Analyst hours consumed on glue work",
  },
  {
    friction: "Stale status fields",
    impact: "Steering debate on outdated numbers",
  },
  {
    friction: "Escalation threshold ambiguity",
    impact: "Risks surface after the decision window",
  },
  {
    friction: "Meeting prep overhead",
    impact: "Leadership time spent assembling, not deciding",
  },
] as const;

type Props = {
  className?: string;
};

/** Drag ledger artifact. */
export function DragLedger({ className }: Props) {
  return (
    <div className={cn("artifact-sheet ink-corners overflow-hidden", className)}>
      <div className="flex items-start justify-between gap-4 border-b border-ink/12 px-6 py-5">
        <div>
          <p className="text-[13px] font-bold text-[var(--color-cyan-strong)]">
            Artifact
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-[-0.02em]">
            Drag Ledger
          </h3>
        </div>
        <span className="shrink-0 border border-teal/35 bg-teal/8 px-2 py-1 text-[13px] font-bold text-[var(--color-cyan-strong)]">
          Ledger
        </span>
      </div>

      <div className="px-6 py-2">
        <div className="hidden grid-cols-[56px_1fr_28px_1fr] gap-4 border-b border-ink/10 py-3 text-[13px] font-bold text-[var(--color-muted)] md:grid">
          <span>#</span>
          <span>Friction</span>
          <span aria-hidden />
          <span>Operating impact</span>
        </div>
        {rows.map((row, index) => (
          <div key={row.friction} className="ledger-row">
            <div className="t-data text-[var(--color-cyan-strong)]">
              {index + 1}
            </div>
            <div className="text-sm font-bold tracking-[-0.01em] text-[var(--color-ink)]">
              {row.friction}
            </div>
            <div
              className="ledger-arrow hidden pt-1 text-[var(--color-muted)] md:block"
              aria-hidden
            ></div>
            <div className="ledger-impact text-sm text-[var(--color-muted)]">
              {row.impact}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
