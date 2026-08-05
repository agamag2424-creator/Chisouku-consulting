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
    <div
      className={cn(
        "overflow-hidden border border-[rgba(17,24,32,0.14)] bg-[rgba(255,253,248,0.94)]",
        className,
      )}
    >
      <div className="grid md:grid-cols-2 xl:grid-cols-4">
        {phases.map((phase, index) => (
          <div
            key={phase.name}
            className={cn(
              "relative flex min-h-[220px] flex-col p-5 pathway-phase",
              index < phases.length - 1 && "border-b border-[rgba(17,24,32,0.1)] xl:border-b-0 xl:border-r",
              "md:odd:border-r md:[&:nth-child(2)]:border-r-0 xl:[&:nth-child(2)]:border-r",
            )}
            style={{ animationDelay: `${120 + index * 90}ms` }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                0{index + 1}
              </span>
              <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-[-0.02em]">
                {phase.name}
              </span>
            </div>
            <div className="mt-5 flex-1">
              <PhaseVisual type={phase.visual} />
            </div>
            <div className="mt-4 border-t border-[rgba(17,24,32,0.1)] pt-4">
              <div className="text-sm font-bold text-[var(--color-ink)]">{phase.output}</div>
              <div className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
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
          <rect x="70" y="28" width="60" height="34" rx="4" fill="#111820" />
          <rect x="12" y="12" width="44" height="24" rx="3" fill="rgba(0,166,200,0.15)" stroke="rgba(17,24,32,0.2)" />
          <rect x="144" y="12" width="44" height="24" rx="3" fill="rgba(255,253,248,0.9)" stroke="rgba(17,24,32,0.2)" />
          <rect x="12" y="54" width="44" height="24" rx="3" fill="rgba(255,253,248,0.9)" stroke="rgba(17,24,32,0.2)" />
          <rect x="144" y="54" width="44" height="24" rx="3" fill="rgba(255,253,248,0.9)" stroke="rgba(17,24,32,0.2)" />
          <path d="M56 24 H70 M130 24 H144 M56 66 H70 M130 66 H144" stroke="rgba(17,24,32,0.25)" />
        </svg>
      );
    case "locate":
      return (
        <svg viewBox="0 0 200 90" className="h-24 w-full" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x="16" y={12 + i * 18} width="168" height="14" rx="2" fill="rgba(17,24,32,0.05)" />
              <rect
                x="16"
                y={12 + i * 18}
                width={40 + i * 28}
                height="14"
                rx="2"
                fill={i === 2 ? "rgba(0,166,200,0.35)" : "rgba(17,24,32,0.12)"}
              />
            </g>
          ))}
        </svg>
      );
    case "matrix":
      return (
        <svg viewBox="0 0 200 90" className="h-24 w-full" aria-hidden>
          <rect x="40" y="10" width="120" height="70" fill="none" stroke="rgba(17,24,32,0.18)" />
          <path d="M100 10 V80 M40 45 H160" stroke="rgba(17,24,32,0.12)" />
          <circle cx="128" cy="28" r="7" fill="#00A6C8" />
          <circle cx="72" cy="58" r="6" fill="rgba(17,24,32,0.35)" />
          <circle cx="118" cy="62" r="5" fill="#B9965B" />
        </svg>
      );
    case "blueprint":
      return (
        <svg viewBox="0 0 200 90" className="h-24 w-full" aria-hidden>
          {["01", "02", "03"].map((n, i) => (
            <g key={n} transform={`translate(${20 + i * 56} 18)`}>
              <rect width="48" height="54" rx="3" fill={i === 0 ? "#111820" : "rgba(255,253,248,0.9)"} stroke="rgba(17,24,32,0.18)" />
              <text
                x="24"
                y="32"
                textAnchor="middle"
                fill={i === 0 ? "#FFFDF8" : "#111820"}
                fontFamily="ui-monospace, monospace"
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
