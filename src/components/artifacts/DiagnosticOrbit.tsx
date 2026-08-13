import { cn } from "../../lib/utils";

type Props = {
  className?: string;
};

/** Solar-system style diagnostic graphic with slow orbit motion. */
export function DiagnosticOrbit({ className }: Props) {
  // Short orbit labels — full names on the measures list; match DimensionLabels order
  const inner = [
    { label: "Governance", angle: -20 },
    { label: "Portfolio", angle: 48 },
    { label: "People", angle: 130 },
  ];
  const outer = [
    { label: "Reporting", angle: 205 },
    { label: "AI readiness", angle: 290, emphasize: true },
  ];

  return (
    <div
      className={cn(
        "glass-canvas paper-grain ink-corners relative flex items-center justify-center overflow-hidden p-6",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,166,200,0.12),transparent_58%)]" />
      <svg
        viewBox="0 0 420 420"
        className="relative z-10 h-auto w-full max-w-[420px]"
        role="img"
        aria-label="PMO diagnostic orbit graphic"
      >
        <circle cx="210" cy="210" r="168" fill="none" stroke="rgba(17,24,32,0.08)" strokeWidth="1" />
        <circle
          cx="210"
          cy="210"
          r="148"
          fill="none"
          stroke="rgba(0,166,200,0.18)"
          strokeWidth="1.5"
          strokeDasharray="4 8"
        />
        <circle cx="210" cy="210" r="118" fill="none" stroke="rgba(17,24,32,0.14)" strokeWidth="1.5" />

        <circle cx="210" cy="210" r="54" fill="#111820" />
        <circle cx="210" cy="210" r="62" fill="none" stroke="rgba(0,166,200,0.45)" strokeWidth="2" />
        <text
          x="210"
          y="204"
          textAnchor="middle"
          fill="#FFFDF8"
          fontFamily="var(--font-display), sans-serif"
          fontSize="13"
          fontWeight="700"
        >
          PMO Score
        </text>
        <text
          x="210"
          y="224"
          textAnchor="middle"
          fill="#AAB3BA"
          fontFamily="ui-monospace, monospace"
          fontSize="10"
          fontWeight="700"
        >
          BASELINE
        </text>

        <g className="orbit-ring">
          {inner.map((planet) => {
            const rad = (planet.angle * Math.PI) / 180;
            const x = 210 + Math.cos(rad) * 118;
            const y = 210 + Math.sin(rad) * 118;
            return (
              <g key={planet.label} transform={`translate(${x} ${y})`}>
                <circle r="18" fill="rgba(255,253,248,0.96)" stroke="rgba(17,24,32,0.2)" strokeWidth="1.5" />
                <circle r="4" fill="#00A6C8" />
                <g className="orbit-label-fix">
                  <text
                    y="34"
                    textAnchor="middle"
                    fill="#65707B"
                    fontFamily="ui-monospace, monospace"
                    fontSize="9"
                    fontWeight="700"
                  >
                    {planet.label.toUpperCase()}
                  </text>
                </g>
              </g>
            );
          })}
        </g>

        <g className="orbit-ring-slow">
          {outer.map((planet) => {
            const rad = (planet.angle * Math.PI) / 180;
            const x = 210 + Math.cos(rad) * 148;
            const y = 210 + Math.sin(rad) * 148;
            const emphasize = "emphasize" in planet && planet.emphasize;
            return (
              <g key={planet.label} transform={`translate(${x} ${y})`}>
                <circle
                  r={emphasize ? 22 : 18}
                  fill={emphasize ? "rgba(0,166,200,0.12)" : "rgba(255,253,248,0.96)"}
                  stroke={emphasize ? "#00A6C8" : "rgba(17,24,32,0.2)"}
                  strokeWidth={emphasize ? 2 : 1.5}
                />
                <circle r="4" fill="#00A6C8" />
                <g className="orbit-label-fix-slow">
                  <text
                    y={emphasize ? 38 : 34}
                    textAnchor="middle"
                    fill={emphasize ? "#007F9C" : "#65707B"}
                    fontFamily="ui-monospace, monospace"
                    fontSize="9"
                    fontWeight="700"
                  >
                    {planet.label.toUpperCase()}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>
      <p className="absolute bottom-4 left-0 right-0 text-center font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-muted)]">
        PMO Diagnostic
      </p>
    </div>
  );
}
