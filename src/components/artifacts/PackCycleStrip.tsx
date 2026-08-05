import { cn } from "../../lib/utils";

const manualSteps = [
  { label: "Export", detail: "Jira · Sheets · BI" },
  { label: "Paste", detail: "Spreadsheet glue" },
  { label: "Reconcile", detail: "Late · manual" },
  { label: "Write", detail: "Narrative by hand" },
  { label: "Send", detail: "Forum chase" },
] as const;

const automatedSteps = [
  { label: "Extract", detail: "Live signals" },
  { label: "Transform", detail: "Rules · freshness" },
  { label: "AI layer", detail: "Narrative · alerts" },
  { label: "Pack", detail: "Ready on cadence" },
  { label: "Distribute", detail: "Owners · forums" },
] as const;

type Props = {
  className?: string;
};

/** Before/after pack cycle — methodology excerpt, not client results. */
export function PackCycleStrip({ className }: Props) {
  return (
    <div className={cn("report-board paper-grain ink-corners", className)}>
      <div className="flex flex-col gap-2 border-b border-[rgba(17,24,32,0.1)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-cyan-strong)]">
          Pack cycle · Before / After
        </p>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
          Methodology excerpt
        </p>
      </div>

      <div className="grid lg:grid-cols-2">
        {/* BEFORE — Manual */}
        <div className="border-b border-[rgba(17,24,32,0.1)] p-6 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
              Before
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
              Manual pack
            </span>
          </div>
          <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-bold tracking-[-0.02em]">
            Operator-assembled cycle
          </h3>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Multi-system exports, spreadsheet glue, late narrative, forum chase.
          </p>

          <WorkflowRow variant="manual" steps={manualSteps} className="mt-8" />

          <div className="mt-6 flex flex-wrap gap-2">
            {["Hours of glue", "Stale signals", "Missed escalation"].map((tag) => (
              <span
                key={tag}
                className="border border-[rgba(17,24,32,0.14)] bg-[rgba(17,24,32,0.03)] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--color-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* AFTER — AI-assisted */}
        <div className="bg-[rgba(0,166,200,0.04)] p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-cyan-strong)]">
              After
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-cyan-strong)]">
              AI-assisted pack
            </span>
          </div>
          <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-bold tracking-[-0.02em]">
            Automated pack cycle
          </h3>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Live extract → rules + AI narrative → pack on cadence → distribute.
          </p>

          <WorkflowRow variant="automated" steps={automatedSteps} className="mt-8" />

          <div className="mt-6 flex flex-wrap gap-2">
            {["Fresh on cadence", "AI narrative", "Owners notified"].map((tag) => (
              <span
                key={tag}
                className="border border-[rgba(0,166,200,0.35)] bg-[rgba(0,166,200,0.08)] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--color-cyan-strong)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowRow({
  steps,
  variant,
  className,
}: {
  steps: readonly { label: string; detail: string }[];
  variant: "manual" | "automated";
  className?: string;
}) {
  const isAuto = variant === "automated";

  return (
    <div className={cn("flex flex-col gap-0", className)}>
      {/* Desktop / tablet flow */}
      <div className="hidden sm:block">
        <svg
          viewBox="0 0 520 88"
          className="h-auto w-full"
          role="img"
          aria-label={isAuto ? "Automated pack workflow" : "Manual pack workflow"}
        >
          {steps.map((step, index) => {
            const x = 8 + index * 104;
            return (
              <g key={step.label}>
                {index < steps.length - 1 ? (
                  <path
                    d={`M${x + 88} 36 H${x + 104}`}
                    fill="none"
                    stroke={isAuto ? "#00A6C8" : "rgba(17,24,32,0.28)"}
                    strokeWidth="1.5"
                    strokeDasharray={isAuto ? undefined : "3 4"}
                  />
                ) : null}
                <rect
                  x={x}
                  y="8"
                  width="88"
                  height="56"
                  rx="3"
                  fill={
                    isAuto
                      ? index === 2
                        ? "rgba(0,166,200,0.14)"
                        : "rgba(255,253,248,0.95)"
                      : "rgba(255,253,248,0.9)"
                  }
                  stroke={
                    isAuto
                      ? index === 2
                        ? "#00A6C8"
                        : "rgba(0,166,200,0.45)"
                      : "rgba(17,24,32,0.22)"
                  }
                  strokeWidth={isAuto && index === 2 ? 2 : 1.25}
                />
                <text
                  x={x + 44}
                  y="30"
                  textAnchor="middle"
                  fill="#111820"
                  fontFamily="var(--font-display), sans-serif"
                  fontSize="11"
                  fontWeight="700"
                >
                  {step.label}
                </text>
                <text
                  x={x + 44}
                  y="48"
                  textAnchor="middle"
                  fill="#65707B"
                  fontFamily="ui-monospace, monospace"
                  fontSize="8"
                  fontWeight="600"
                >
                  {step.detail}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Mobile stacked flow */}
      <ol className="space-y-2 sm:hidden">
        {steps.map((step, index) => (
          <li key={step.label} className="flex items-stretch gap-2">
            <div
              className={cn(
                "flex min-h-[52px] flex-1 items-center justify-between gap-3 border px-3 py-2",
                isAuto
                  ? index === 2
                    ? "border-[var(--color-cyan)] bg-[rgba(0,166,200,0.12)]"
                    : "border-[rgba(0,166,200,0.35)] bg-[rgba(255,253,248,0.95)]"
                  : "border-[rgba(17,24,32,0.18)] bg-[rgba(255,253,248,0.9)]",
              )}
            >
              <div>
                <div className="font-[family-name:var(--font-display)] text-sm font-bold tracking-[-0.01em]">
                  {step.label}
                </div>
                <div className="mt-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--color-muted)]">
                  {step.detail}
                </div>
              </div>
              <span className="font-mono text-[10px] font-bold text-[var(--color-muted)]">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            {index < steps.length - 1 ? (
              <span
                className={cn(
                  "flex w-4 shrink-0 items-center justify-center font-mono text-sm",
                  isAuto ? "text-[var(--color-cyan-strong)]" : "text-[var(--color-muted)]",
                )}
                aria-hidden
              >
                ↓
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
