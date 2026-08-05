import { cn } from "../../lib/utils";
import { impactPhases } from "../../lib/siteConfig";

type Props = {
  className?: string;
  compact?: boolean;
};

export function AiImpactModel({ className, compact = false }: Props) {
  return (
    <div className={cn("report-board paper-grain ink-corners", className)}>
      <div
        className={cn(
          "flex flex-col gap-3 border-b border-[rgba(17,24,32,0.1)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between",
        )}
      >
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-cyan-strong)]">
            AI Impact Model
          </p>
          {!compact && (
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Assess → Architect → Activate → Accelerate
            </p>
          )}
        </div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
          Methodology
        </p>
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4">
        {impactPhases.map((phase, index) => (
          <div
            key={phase.key}
            className={cn(
              "relative flex min-h-[160px] flex-col p-5 pathway-phase",
              index < impactPhases.length - 1 &&
                "border-b border-[rgba(17,24,32,0.1)] xl:border-b-0 xl:border-r",
              "sm:odd:border-r sm:[&:nth-child(2)]:border-r-0 xl:[&:nth-child(2)]:border-r",
            )}
            style={{ animationDelay: `${100 + index * 80}ms` }}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                0{index + 1}
              </span>
              <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-[-0.02em]">
                {phase.name}
              </span>
            </div>
            <div className="mt-6 flex-1">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-cyan-strong)]">
                {phase.buyer}
              </div>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--color-ink)]">
                {phase.site}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
