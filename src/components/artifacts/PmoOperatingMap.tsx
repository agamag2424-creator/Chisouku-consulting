import { cn } from "../../lib/utils";

type Props = {
  className?: string;
  compact?: boolean;
};

/** Proprietary-looking PMO Operating Map — center map with surrounding operating nodes. */
export function PmoOperatingMap({ className, compact = false }: Props) {
  return (
    <div
      className={cn(
        "glass-canvas paper-grain ink-corners relative overflow-hidden",
        compact ? "min-h-[420px]" : "min-h-[560px] md:min-h-[640px]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 map-grid-texture opacity-70" />
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[rgba(0,166,200,0.12)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-[rgba(185,150,91,0.1)] blur-3xl" />

      <div className="relative z-10 flex h-full flex-col p-5 md:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-cyan-strong)]">
              Artifact
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold tracking-[-0.02em] text-[var(--color-ink)] md:text-2xl">
              PMO Operating Map
            </h3>
          </div>
          <div className="hidden text-right font-mono text-[10px] font-bold uppercase leading-5 tracking-[0.12em] text-[var(--color-muted)] sm:block">
            Cadence · Weekly
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[720px] flex-1">
          <svg
            viewBox="0 0 720 480"
            className="h-auto w-full"
            role="img"
            aria-label="PMO Operating Map connecting Inputs, Cadence, Friction, Decision Forum, and Blueprint around a central PMO map"
          >
            <defs>
              <linearGradient id="mapGlow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(0,166,200,0.18)" />
                <stop offset="100%" stopColor="rgba(17,24,32,0.04)" />
              </linearGradient>
              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connection lines — full, unclipped, draw-on */}
            <g className="map-draw" stroke="rgba(17,24,32,0.28)" strokeWidth="1.5" fill="none">
              <path d="M160 96 L300 210" />
              <path d="M560 96 L420 210" />
              <path d="M120 300 L290 270" />
              <path d="M600 300 L430 270" />
              <path d="M360 340 L360 390" stroke="rgba(0,166,200,0.7)" />
            </g>
            <g fill="#00A6C8">
              <circle className="map-node-dot" cx="160" cy="96" r="3.5" />
              <circle className="map-node-dot" cx="560" cy="96" r="3.5" />
              <circle className="map-node-dot" cx="120" cy="300" r="3.5" />
              <circle className="map-node-dot" cx="600" cy="300" r="3.5" />
              <circle className="map-node-dot" cx="360" cy="390" r="3.5" />
            </g>

            {/* Center */}
            <rect
              x="250"
              y="180"
              width="220"
              height="140"
              rx="8"
              fill="url(#mapGlow)"
              stroke="#111820"
              strokeWidth="2"
              filter="url(#softGlow)"
            />
            <text
              x="360"
              y="228"
              textAnchor="middle"
              fill="#111820"
              fontFamily="var(--font-display), sans-serif"
              fontSize="18"
              fontWeight="700"
            >
              PMO Operating Map
            </text>
            <text
              x="360"
              y="256"
              textAnchor="middle"
              fill="#65707B"
              fontFamily="ui-monospace, monospace"
              fontSize="11"
              fontWeight="700"
            >
              SIGNALS → CLARITY → ACTION
            </text>
            <g transform="translate(292 278)">
              {[0, 1, 2, 3, 4].map((i) => (
                <rect
                  key={i}
                  x={i * 28}
                  y="0"
                  width="22"
                  height="18"
                  rx="2"
                  fill={i === 2 ? "rgba(0,166,200,0.35)" : "rgba(17,24,32,0.08)"}
                  stroke="rgba(17,24,32,0.18)"
                />
              ))}
            </g>

            {/* Satellite nodes */}
            <g className="map-sat" style={{ animationDelay: "720ms" }}>
              {node(88, 52, 144, 64, "Inputs", "Tools · Exports · Status")}
            </g>
            <g className="map-sat" style={{ animationDelay: "820ms" }}>
              {node(488, 52, 144, 64, "Cadence", "Weekly · Steering · RAID")}
            </g>
            <g className="map-sat" style={{ animationDelay: "920ms" }}>
              {node(48, 258, 144, 64, "Friction", "Stale · Manual · Late")}
            </g>
            <g className="map-sat" style={{ animationDelay: "1020ms" }}>
              {node(528, 258, 144, 64, "Decision Forum", "Owners · Thresholds")}
            </g>
            <g className="map-sat" style={{ animationDelay: "1120ms" }}>
              {node(268, 392, 184, 56, "Blueprint", "Sequence · Automation fit", true)}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function node(
  x: number,
  y: number,
  w: number,
  h: number,
  title: string,
  subtitle: string,
  accent = false,
) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width={w}
        height={h}
        rx="6"
        fill={accent ? "#111820" : "rgba(255,253,248,0.94)"}
        stroke={accent ? "#111820" : "rgba(17,24,32,0.2)"}
        strokeWidth="1.5"
      />
      <text
        x={14}
        y={26}
        fill={accent ? "#FFFDF8" : "#111820"}
        fontFamily="var(--font-display), sans-serif"
        fontSize="14"
        fontWeight="700"
      >
        {title}
      </text>
      <text
        x={14}
        y={46}
        fill={accent ? "#AAB3BA" : "#65707B"}
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        fontWeight="600"
      >
        {subtitle}
      </text>
    </g>
  );
}
