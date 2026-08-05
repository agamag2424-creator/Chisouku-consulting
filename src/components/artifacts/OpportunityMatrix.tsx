import { cn } from "../../lib/utils";

const points = [
  { x: 78, y: 28, label: "Pack automation", size: 14, tone: "cyan" as const },
  { x: 62, y: 42, label: "Status freshness", size: 11, tone: "ink" as const },
  { x: 34, y: 58, label: "RAID alerts", size: 10, tone: "gold" as const },
  { x: 48, y: 72, label: "Capacity view", size: 9, tone: "muted" as const },
  { x: 22, y: 78, label: "Tool sprawl cleanup", size: 8, tone: "muted" as const },
];

type Props = {
  className?: string;
};

/** Automation opportunity matrix artifact. */
export function OpportunityMatrix({ className }: Props) {
  return (
    <div className={cn("artifact-sheet overflow-hidden", className)}>
      <div className="flex items-start justify-between gap-4 border-b border-[rgba(17,24,32,0.12)] px-6 py-5">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-cyan-strong)]">
            Artifact
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-[-0.02em]">
            Automation Opportunity Matrix
          </h3>
        </div>
        <span className="shrink-0 border border-[rgba(0,166,200,0.35)] bg-[rgba(0,166,200,0.08)] px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-cyan-strong)]">
          Matrix
        </span>
      </div>

      <div className="relative p-6">
        <div className="mb-4 flex justify-between font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-muted)]">
          <span>Low effort →</span>
          <span>High impact ↑</span>
        </div>
        <svg
          viewBox="0 0 480 320"
          className="h-auto w-full"
          role="img"
          aria-label="Automation opportunity matrix plotting impact versus effort"
        >
          <rect
            x="48"
            y="24"
            width="400"
            height="260"
            fill="rgba(255,253,248,0.7)"
            stroke="rgba(17,24,32,0.18)"
          />
          <path d="M248 24 V284 M48 154 H448" stroke="rgba(17,24,32,0.12)" />
          <text x="58" y="44" fill="#65707B" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700">
            QUICK WINS
          </text>
          <text x="360" y="44" fill="#65707B" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700">
            STRATEGIC
          </text>
          <text x="58" y="272" fill="#65707B" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700">
            FILL LATER
          </text>
          <text x="352" y="272" fill="#65707B" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700">
            HEAVY LIFT
          </text>

          {points.map((point) => {
            const cx = 48 + (point.x / 100) * 400;
            const cy = 284 - (point.y / 100) * 260;
            const fill =
              point.tone === "cyan"
                ? "#00A6C8"
                : point.tone === "gold"
                  ? "#B9965B"
                  : point.tone === "ink"
                    ? "#111820"
                    : "rgba(17,24,32,0.35)";
            return (
              <g key={point.label}>
                <circle cx={cx} cy={cy} r={point.size} fill={fill} opacity="0.92" />
                <text
                  x={cx + point.size + 8}
                  y={cy + 4}
                  fill="#111820"
                  fontFamily="var(--font-display), sans-serif"
                  fontSize="12"
                  fontWeight="700"
                >
                  {point.label}
                </text>
              </g>
            );
          })}
        </svg>
        <p className="mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
          Impact × effort scoring
        </p>
      </div>
    </div>
  );
}
