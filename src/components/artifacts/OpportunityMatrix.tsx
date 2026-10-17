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
    <div className={cn("artifact-sheet ink-corners overflow-hidden", className)}>
      <div className="flex items-start justify-between gap-4 border-b border-ink/12 px-6 py-5">
        <div>
          <p className="text-[13px] font-bold text-teal">
            Artifact
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-[-0.02em]">
            Automation Opportunity Matrix
          </h3>
        </div>
        <span className="shrink-0 border border-teal/35 bg-teal/8 px-2 py-1 text-[13px] font-bold text-teal">
          Matrix
        </span>
      </div>

      <div className="relative p-6">
        <div className="mb-4 flex justify-between text-[13px] font-bold text-[var(--color-muted)]">
          <span>Low effort</span>
          <span>High impact ↑</span>
        </div>
        <svg
          viewBox="0 0 480 320"
          className="h-auto w-full"
          role="img"
          aria-label="Automation opportunity matrix plotting impact versus effort"
        >
          <rect className="fill-paper/70 stroke-ink/18"
            x="48"
            y="24"
            width="400"
            height="260"
          />
          <path className="stroke-ink/12" d="M248 24 V284 M48 154 H448" />
          <text className="fill-muted" x="58" y="44" fontSize="10" fontWeight="700">
            Quick wins
          </text>
          <text className="fill-muted" x="360" y="44" fontSize="10" fontWeight="700">
            Strategic
          </text>
          <text className="fill-muted" x="58" y="272" fontSize="10" fontWeight="700">
            Fill later
          </text>
          <text className="fill-muted" x="352" y="272" fontSize="10" fontWeight="700">
            Heavy lift
          </text>

          {points.map((point) => {
            const cx = 48 + (point.x / 100) * 400;
            const cy = 284 - (point.y / 100) * 260;
            const fillClass =
              point.tone === "cyan"
                ? "fill-teal"
                : point.tone === "gold"
                  ? "fill-muted"
                  : point.tone === "ink"
                    ? "fill-ink"
                    : "fill-ink/35";
            return (
              <g key={point.label}>
                <circle className={fillClass} cx={cx} cy={cy} r={point.size} opacity="0.92" />
                <text className="fill-ink"
                  x={cx + point.size + 8}
                  y={cy + 4}
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
        <p className="mt-3 text-[13px] font-bold text-[var(--color-muted)]">
          Impact × effort scoring
        </p>
      </div>
    </div>
  );
}
