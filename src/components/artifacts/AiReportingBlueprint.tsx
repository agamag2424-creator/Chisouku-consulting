import { cn } from "../../lib/utils";

const layers = [
  { name: "Data", detail: "Status · RAID · Capacity · Forum inputs" },
  { name: "Integration", detail: "Jira · Sheets · BI · Slack / Teams" },
  { name: "Logic", detail: "Rules · LLM narrative · Freshness · Escalation" },
  { name: "Interface", detail: "Pack · Dashboard · Distribution" },
] as const;

const flow = [
  "Extract",
  "Transform",
  "Load",
  "Calculate",
  "Visualize",
  "Distribute",
] as const;

type Props = {
  className?: string;
};

/** Methodology excerpt — AI reporting automation architecture (no client claims). */
export function AiReportingBlueprint({ className }: Props) {
  return (
    <div className={cn("artifact-sheet paper-grain ink-corners overflow-hidden", className)}>
      <div className="flex flex-col gap-3 border-b border-[rgba(17,24,32,0.12)] px-6 py-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-cyan-strong)]">
            Methodology excerpt · PMO reporting layer
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-[-0.02em]">
            AI Reporting Automation Blueprint
          </h3>
        </div>
        <span className="shrink-0 self-start border border-[rgba(0,166,200,0.35)] bg-[rgba(0,166,200,0.08)] px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-cyan-strong)]">
          Architecture
        </span>
      </div>

      <div className="grid gap-0 sm:grid-cols-4">
        {layers.map((layer, index) => (
          <div
            key={layer.name}
            className={cn(
              "min-h-[140px] p-5",
              index < layers.length - 1 && "border-b border-[rgba(17,24,32,0.1)] sm:border-b-0 sm:border-r",
              index === 2 && "bg-[rgba(0,166,200,0.05)]",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              {index < layers.length - 1 ? (
                <span className="hidden font-mono text-[var(--color-cyan-strong)] sm:inline" aria-hidden>
                  →
                </span>
              ) : null}
            </div>
            <h4 className="mt-6 font-[family-name:var(--font-display)] text-xl font-bold tracking-[-0.02em]">
              {layer.name}
            </h4>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{layer.detail}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-[rgba(17,24,32,0.12)] bg-[rgba(17,24,32,0.03)] px-6 py-5">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
          Pack flow
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {flow.map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <span className="border border-[rgba(17,24,32,0.18)] bg-[rgba(255,253,248,0.95)] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-ink)]">
                {step}
              </span>
              {index < flow.length - 1 ? (
                <span className="font-mono text-[var(--color-cyan-strong)]" aria-hidden>
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
