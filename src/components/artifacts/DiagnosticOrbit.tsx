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
        "artifact-sheet ink-corners relative flex items-center justify-center overflow-hidden p-6",
        className,
      )}
    >
      <svg
        viewBox="0 0 420 420"
        className="relative z-10 h-auto w-full max-w-[420px]"
        role="img"
        aria-label="PMO diagnostic orbit graphic"
      >
        <circle className="stroke-ink/8" cx="210" cy="210" r="168" fill="none" strokeWidth="1" />
        <circle className="stroke-teal/18"
          cx="210"
          cy="210"
          r="148"
          fill="none"
          strokeWidth="1.5"
          strokeDasharray="4 8"
        />
        <circle className="stroke-ink/14" cx="210" cy="210" r="118" fill="none" strokeWidth="1.5" />

        <circle className="fill-ink" cx="210" cy="210" r="54" />
        <circle className="stroke-teal/45" cx="210" cy="210" r="62" fill="none" strokeWidth="2" />
        <text className="fill-paper"
          x="210"
          y="204"
          textAnchor="middle"
          fontFamily="var(--font-display), sans-serif"
          fontSize="13"
          fontWeight="700"
        >
          PMO Score
        </text>
        <text className="fill-paper/65"
          x="210"
          y="224"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
        >
          Baseline
        </text>

        <g>
          {inner.map((planet) => {
            const rad = (planet.angle * Math.PI) / 180;
            const x = 210 + Math.cos(rad) * 118;
            const y = 210 + Math.sin(rad) * 118;
            return (
              <g key={planet.label} transform={`translate(${x} ${y})`}>
                <circle className="fill-paper/96 stroke-ink/20" r="18" strokeWidth="1.5" />
                <circle className="fill-teal" r="4" />
                <g>
                  <text className="fill-muted"
                    y="34"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="700"
                  >
                    {planet.label}
                  </text>
                </g>
              </g>
            );
          })}
        </g>

        <g>
          {outer.map((planet) => {
            const rad = (planet.angle * Math.PI) / 180;
            const x = 210 + Math.cos(rad) * 148;
            const y = 210 + Math.sin(rad) * 148;
            const emphasize = "emphasize" in planet && planet.emphasize;
            return (
              <g key={planet.label} transform={`translate(${x} ${y})`}>
                <circle className={`${emphasize ? "fill-teal/12" : "fill-paper/96"} ${emphasize ? "stroke-teal" : "stroke-ink/20"}`}
                  r={emphasize ? 22 : 18}
                  strokeWidth={emphasize ? 2 : 1.5}
                />
                <circle className="fill-teal" r="4" />
                <g>
                  <text className={`${emphasize ? "fill-teal" : "fill-muted"}`}
                    y={emphasize ? 38 : 34}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="700"
                  >
                    {planet.label}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>
      <p className="absolute bottom-4 left-0 right-0 text-center text-[13px] font-bold text-[var(--color-muted)]">
        PMO Diagnostic
      </p>
    </div>
  );
}
