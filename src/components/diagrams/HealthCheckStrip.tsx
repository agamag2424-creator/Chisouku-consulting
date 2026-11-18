import { healthCheckStrip, type StripVisual } from "../../content/diagrams";
import { cn } from "../../lib/utils";

type Props = { className?: string };

/** The Health Check in five working days (September "Engagement strip", relabelled). Stacks on mobile. */
export function HealthCheckStrip({ className }: Props) {
  const phases = healthCheckStrip.phases;
  return (
    <figure className={cn("report-board", className)} aria-label={healthCheckStrip.alt}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/10 px-5 py-4">
        <p className="eyebrow mb-0">{healthCheckStrip.eyebrow}</p>
        <p className="label text-muted">
          {healthCheckStrip.title}
        </p>
      </div>
      <ol className="grid md:grid-cols-2 xl:grid-cols-5">
        {phases.map((phase, index) => (
          <li
            key={phase.name}
            className={cn(
              "pathway-phase relative flex flex-col border-ink/10 p-5 xl:min-h-[250px]",
              index < phases.length - 1 && "border-b xl:border-b-0 xl:border-r",
              "md:odd:border-r md:last:border-r-0 xl:last:border-r-0",
            )}
            style={{ animationDelay: `${120 + index * 90}ms` }}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="label text-muted">
                0{index + 1}
              </span>
              <span className="font-[family-name:var(--font-body)] text-[17px] font-semibold tracking-[-0.02em]">{phase.name}</span>
            </div>
            <div className="mt-4 flex-1">
              <PhaseVisual type={phase.visual} />
            </div>
            <div className="mt-4 border-t border-ink/10 pt-4">
              <p className="text-[15px] font-bold text-ink">{phase.output}</p>
              <p className="mt-1 text-[14px] text-muted">{phase.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

function PhaseVisual({ type }: { type: StripVisual }) {
  const common = "h-20 w-full";
  switch (type) {
    case "documents":
      return (
        <svg viewBox="0 0 200 80" className={common} aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${30 + i * 36} ${14 + (i % 2) * 6})`}>
              <rect width="30" height="40" rx="2" fill={i === 1 ? "rgba(0,166,200,0.15)" : "#FFFFFF"} stroke="rgba(17,24,32,0.22)" />
              <path d="M6 12 H24 M6 19 H24 M6 26 H18" stroke="rgba(17,24,32,0.25)" />
            </g>
          ))}
        </svg>
      );
    case "interviews":
      return (
        <svg viewBox="0 0 200 80" className={common} aria-hidden>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${46 + i * 54} 18)`}>
              <circle cx="0" cy="10" r="10" fill={i === 1 ? "#111820" : "rgba(17,24,32,0.15)"} />
              <path d="M-16 44 Q0 24 16 44" fill={i === 1 ? "#111820" : "rgba(17,24,32,0.15)"} />
            </g>
          ))}
        </svg>
      );
    case "scorecard":
      return (
        <svg viewBox="0 0 200 80" className={common} aria-hidden>
          {[0, 1, 2, 3, 4].map((r) => (
            <g key={r}>
              <rect x="30" y={8 + r * 13} width="90" height="9" rx="1" fill="rgba(17,24,32,0.07)" />
              <rect
                x="128"
                y={8 + r * 13}
                width="42"
                height="9"
                rx="1"
                fill={r === 1 ? "rgba(178,59,59,0.45)" : r === 3 ? "rgba(168,108,18,0.4)" : "rgba(46,125,79,0.35)"}
              />
            </g>
          ))}
        </svg>
      );
    case "plan":
      return (
        <svg viewBox="0 0 200 80" className={common} aria-hidden>
          {["01", "02", "03"].map((n, i) => (
            <g key={n} transform={`translate(${28 + i * 52} 12)`}>
              <rect width="44" height="52" rx="3" fill={i === 0 ? "#111820" : "#FFFFFF"} stroke="rgba(17,24,32,0.18)" />
              <text x="22" y="31" textAnchor="middle" fill={i === 0 ? "#FFFFFF" : "#111820"} fontFamily="var(--font-body), sans-serif" fontSize="12" fontWeight="700">
                {n}
              </text>
            </g>
          ))}
        </svg>
      );
    case "readout":
      return (
        <svg viewBox="0 0 200 80" className={common} aria-hidden>
          <circle cx="100" cy="40" r="28" fill="none" stroke="rgba(17,24,32,0.18)" strokeWidth="2" />
          <path d="M100 40 L100 12 A28 28 0 1 1 72 40 Z" fill="rgba(0,166,200,0.25)" />
          <circle cx="100" cy="40" r="3" fill="#111820" />
        </svg>
      );
    default: {
      const exhaustive: never = type;
      return exhaustive;
    }
  }
}
