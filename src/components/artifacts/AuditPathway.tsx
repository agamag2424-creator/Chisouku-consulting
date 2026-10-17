import { cn } from "../../lib/utils";

const phases = [
  {
    name: "Map",
    output: "Workflow map",
    detail: "Inputs, owners, forums, packs",
    visual: "map",
  },
  {
    name: "Locate",
    output: "Drag ledger",
    detail: "Bottlenecks and decision gaps",
    visual: "locate",
  },
  {
    name: "Prioritize",
    output: "Opportunity matrix",
    detail: "Impact, effort, automation fit",
    visual: "matrix",
  },
  {
    name: "Blueprint",
    output: "Implementation blueprint",
    detail: "Sequence ready for operators",
    visual: "blueprint",
  },
] as const;

type Props = {
  className?: string;
};

export function AuditPathway({ className }: Props) {
  return (
    <div className={cn("report-board ink-corners", className)}>
      <div className="grid md:grid-cols-2 xl:grid-cols-4">
        {phases.map((phase, index) => (
          <div
            key={phase.name}
            className={cn(
              "relative flex min-h-[220px] flex-col p-5 pathway-phase",
              index < phases.length - 1 && "border-b border-ink/10 xl:border-b-0 xl:border-r",
              "md:odd:border-r md:[&:nth-child(2)]:border-r-0 xl:[&:nth-child(2)]:border-r",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-bold text-[var(--color-muted)]">
                0{index + 1}
              </span>
              <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-[-0.02em]">
                {phase.name}
              </span>
            </div>
            <div className="mt-5 flex-1">
              <PhaseVisual type={phase.visual} />
            </div>
            <div className="mt-4 border-t border-ink/10 pt-4">
              <div className="text-sm font-bold text-[var(--color-ink)]">{phase.output}</div>
              <div className="mt-1 text-[13px] font-bold text-[var(--color-muted)]">
                {phase.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhaseVisual({ type }: { type: (typeof phases)[number]["visual"] }) {
  switch (type) {
    case "map":
      return (
        <svg viewBox="0 0 200 90" className="h-24 w-full" aria-hidden>
          <rect className="fill-ink" x="70" y="28" width="60" height="34" rx="4" />
          <rect className="fill-teal/15 stroke-ink/20" x="12" y="12" width="44" height="24" rx="3" />
          <rect className="fill-paper/90 stroke-ink/20" x="144" y="12" width="44" height="24" rx="3" />
          <rect className="fill-paper/90 stroke-ink/20" x="12" y="54" width="44" height="24" rx="3" />
          <rect className="fill-paper/90 stroke-ink/20" x="144" y="54" width="44" height="24" rx="3" />
          <path className="stroke-ink/25" d="M56 24 H70 M130 24 H144 M56 66 H70 M130 66 H144" />
        </svg>
      );
    case "locate":
      return (
        <svg viewBox="0 0 200 90" className="h-24 w-full" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect className="fill-ink/5" x="16" y={12 + i * 18} width="168" height="14" rx="2" />
              <rect className={`${i === 2 ? "fill-teal/35" : "fill-ink/12"}`}
                x="16"
                y={12 + i * 18}
                width={40 + i * 28}
                height="14"
                rx="2"
              />
            </g>
          ))}
        </svg>
      );
    case "matrix":
      return (
        <svg viewBox="0 0 200 90" className="h-24 w-full" aria-hidden>
          <rect className="stroke-ink/18" x="40" y="10" width="120" height="70" fill="none" />
          <path className="stroke-ink/12" d="M100 10 V80 M40 45 H160" />
          <circle className="fill-teal" cx="128" cy="28" r="7" />
          <circle className="fill-ink/35" cx="72" cy="58" r="6" />
          <circle className="fill-muted" cx="118" cy="62" r="5" />
        </svg>
      );
    case "blueprint":
      return (
        <svg viewBox="0 0 200 90" className="h-24 w-full" aria-hidden>
          {["1", "2", "3"].map((n, i) => (
            <g key={n} transform={`translate(${20 + i * 56} 18)`}>
              <rect className={`stroke-ink/18 ${i === 0 ? "fill-ink" : "fill-paper/90"}`} width="48" height="54" rx="3" />
              <text className={`${i === 0 ? "fill-paper" : "fill-ink"}`}
                x="24"
                y="32"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
              >
                {n}
              </text>
            </g>
          ))}
        </svg>
      );
    default: {
      const _exhaustive: never = type;
      return _exhaustive;
    }
  }
}
