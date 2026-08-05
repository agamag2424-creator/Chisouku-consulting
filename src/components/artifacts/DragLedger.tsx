import { cn } from "../../lib/utils";

const rows = [
  {
    id: "01",
    friction: "Multi-system export lag",
    impact: "Pack starts late every Monday",
  },
  {
    id: "02",
    friction: "Spreadsheet consolidation",
    impact: "Analyst hours consumed on glue work",
  },
  {
    id: "03",
    friction: "Stale status fields",
    impact: "Steering debate on outdated numbers",
  },
  {
    id: "04",
    friction: "Escalation threshold ambiguity",
    impact: "Risks surface after the decision window",
  },
  {
    id: "05",
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
    <div className={cn("artifact-sheet overflow-hidden", className)}>
      <div className="flex items-start justify-between gap-4 border-b border-[rgba(17,24,32,0.12)] px-6 py-5">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-cyan-strong)]">
            Artifact
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-[-0.02em]">
            Drag Ledger
          </h3>
        </div>
        <span className="shrink-0 border border-[rgba(0,166,200,0.35)] bg-[rgba(0,166,200,0.08)] px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-cyan-strong)]">
          Ledger
        </span>
      </div>

      <div className="px-6 py-2">
        <div className="hidden grid-cols-[56px_1fr_28px_1fr] gap-4 border-b border-[rgba(17,24,32,0.1)] py-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-muted)] md:grid">
          <span>#</span>
          <span>Friction</span>
          <span aria-hidden />
          <span>Operating impact</span>
        </div>
        {rows.map((row) => (
          <div key={row.id} className="ledger-row">
            <div className="font-mono text-sm font-bold text-[var(--color-cyan-strong)]">
              {row.id}
            </div>
            <div className="text-sm font-bold tracking-[-0.01em] text-[var(--color-ink)]">
              {row.friction}
            </div>
            <div
              className="ledger-arrow hidden pt-1 font-mono text-[var(--color-muted)] md:block"
              aria-hidden
            >
              →
            </div>
            <div className="ledger-impact text-sm text-[var(--color-muted)]">
              {row.impact}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
