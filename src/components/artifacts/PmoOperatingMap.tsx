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
            aria-label="PMO Operating Map connecting inputs, cadence, friction, decision forum, and blueprint through an AI automation layer"
          >
            <defs>
              <linearGradient id="mapGlow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#DFF4F7" />
                <stop offset="100%" stopColor="#F2F0EB" />
              </linearGradient>
              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connectors terminate at node edges so they never cross box content. */}
            <g className="map-draw" stroke="rgba(17,24,32,0.28)" strokeWidth="1.5" fill="none">
              <path d="M160 116 L310 176" />
              <path d="M560 116 L410 176" />
              <path d="M192 290 L242 270" />
              <path d="M528 290 L478 270" />
              <path d="M360 332 L360 392" stroke="rgba(0,166,200,0.7)" />
            </g>
            <g fill="#00A6C8">
              <circle className="map-node-dot" cx="160" cy="116" r="3.5" />
              <circle className="map-node-dot" cx="560" cy="116" r="3.5" />
              <circle className="map-node-dot" cx="192" cy="290" r="3.5" />
              <circle className="map-node-dot" cx="528" cy="290" r="3.5" />
              <circle className="map-node-dot" cx="360" cy="392" r="3.5" />
            </g>

            {/* Center */}
            <rect
              x="242"
              y="176"
              width="236"
              height="156"
              rx="8"
              fill="url(#mapGlow)"
              stroke="#111820"
              strokeWidth="2"
              filter="url(#softGlow)"
            />
            <text
              x="360"
              y="218"
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
              y="246"
              textAnchor="middle"
              fill="#65707B"
              fontFamily="ui-monospace, monospace"
              fontSize="10"
              fontWeight="700"
            >
              SIGNALS → AI AUTOMATION → ACTION
            </text>
            <g transform="translate(292 264)">
              {[0, 1, 2, 3, 4].map((i) => (
                <rect
                  key={i}
                  x={i * 28}
                  y="0"
                  width="22"
                  height="16"
                  rx="2"
                  fill={i === 2 ? "rgba(0,166,200,0.35)" : "rgba(17,24,32,0.08)"}
                  stroke="rgba(17,24,32,0.18)"
                />
              ))}
            </g>
            <text
              x="360"
              y="302"
              textAnchor="middle"
              fill="#007F9C"
              fontFamily="ui-monospace, monospace"
              fontSize="8.5"
              fontWeight="700"
            >
              AI LAYER · NARRATIVE · FRESHNESS
            </text>
            <text
              x="360"
              y="316"
              textAnchor="middle"
              fill="#007F9C"
              fontFamily="ui-monospace, monospace"
              fontSize="8.5"
              fontWeight="700"
            >
              ALERTS · ESCALATION SIGNALS
            </text>

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
  const subtitleFontSize = Math.min(10, (w - 28) / (subtitle.length * 0.6));

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
        fontSize={subtitleFontSize}
        fontWeight="600"
      >
        {subtitle}
      </text>
    </g>
  );
}
