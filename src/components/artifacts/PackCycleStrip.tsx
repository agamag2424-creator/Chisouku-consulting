import { cn } from "../../lib/utils";

const manualSteps = [
  { label: "Export", detail: "Jira, Sheets, BI" },
  { label: "Paste", detail: "Spreadsheet glue" },
  { label: "Reconcile", detail: "Late, manual" },
  { label: "Write", detail: "Narrative by hand" },
  { label: "Send", detail: "Forum chase" },
] as const;

const automatedSteps = [
  { label: "Extract", detail: "Live signals" },
  { label: "Transform", detail: "Rules, freshness" },
  { label: "AI layer", detail: "Narrative, alerts" },
  { label: "Pack", detail: "Ready on cadence" },
  { label: "Distribute", detail: "Owners, forums" },
] as const;

type Props = {
  className?: string;
};

/** Before/after pack cycle — methodology excerpt, not client results. */
export function PackCycleStrip({ className }: Props) {
  return (
    <div className={cn("report-board ink-corners", className)}>
      <div className="flex flex-col gap-2 border-b border-ink/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] font-bold text-teal">
          Pack cycle: Before / After
        </p>
        <p className="text-[13px] font-bold text-[var(--color-muted)]">
          Methodology excerpt
        </p>
      </div>

      <div className="grid lg:grid-cols-2">
        {/* Before — Manual */}
        <div className="border-b border-ink/10 p-6 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[13px] font-bold text-[var(--color-muted)]">
              Before
            </span>
            <span className="text-[13px] font-bold text-[var(--color-muted)]">
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
                className="border border-ink/14 bg-ink/3 px-2.5 py-1 text-[13px] font-bold text-[var(--color-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* After — AI-assisted */}
        <div className="bg-teal/4 p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[13px] font-bold text-teal">
              After
            </span>
            <span className="text-[13px] font-bold text-teal">
              AI-assisted pack
            </span>
          </div>
          <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-bold tracking-[-0.02em]">
            Automated pack cycle
          </h3>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Live extract, then rules + AI narrative, then pack on cadence, then distribute.
          </p>

          <WorkflowRow variant="automated" steps={automatedSteps} className="mt-8" />

          <div className="mt-6 flex flex-wrap gap-2">
            {["Fresh on cadence", "AI narrative", "Owners notified"].map((tag) => (
              <span
                key={tag}
                className="border border-teal/35 bg-teal/8 px-2.5 py-1 text-[13px] font-bold text-teal"
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
                  <path className={`${isAuto ? "stroke-teal" : "stroke-ink/28"}`}
                    d={`M${x + 88} 36 H${x + 104}`}
                    fill="none"
                    strokeWidth="1.5"
                    strokeDasharray={isAuto ? undefined : "3 4"}
                  />
                ) : null}
                <rect className={`${isAuto ? index === 2 ? "fill-teal/14" : "fill-paper/95" : "fill-paper/90"} ${isAuto ? index === 2 ? "stroke-teal" : "stroke-teal/45" : "stroke-ink/22"}`}
                  x={x}
                  y="8"
                  width="88"
                  height="56"
                  rx="3"
                  strokeWidth={isAuto && index === 2 ? 2 : 1.25}
                />
                <text className="fill-ink"
                  x={x + 44}
                  y="30"
                  textAnchor="middle"
                  fontFamily="var(--font-display), sans-serif"
                  fontSize="11"
                  fontWeight="700"
                >
                  {step.label}
                </text>
                <text className="fill-muted"
                  x={x + 44}
                  y="48"
                  textAnchor="middle"
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
                    ? "border-teal bg-teal-tint"
                    : "border-teal/35 bg-paper/95"
                  : "border-ink/18 bg-paper/90",
              )}
            >
              <div>
                <div className="font-[family-name:var(--font-display)] text-sm font-bold tracking-[-0.01em]">
                  {step.label}
                </div>
                <div className="mt-0.5 text-[13px] font-bold text-[var(--color-muted)]">
                  {step.detail}
                </div>
              </div>
              <span className="t-data text-[13px] text-[var(--color-muted)]">
                {index + 1}
              </span>
            </div>
            {index < steps.length - 1 ? (
              <span
                className={cn(
                  "flex w-4 shrink-0 items-center justify-center text-sm",
                  isAuto ? "text-teal" : "text-[var(--color-muted)]",
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
