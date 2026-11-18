import { dimensionOrbit } from "../../content/diagrams";
import { dimensions } from "../../content/pmoSelfCheck";
import { cn } from "../../lib/utils";

type Props = {
  className?: string;
  /** Dimension ids to mark as flagged (2.0 or below) on a result. */
  flagged?: readonly string[];
  /** Replaces "Overall band" in the centre, e.g. the band name on a result. */
  centreTitle?: string;
  /** Drawing above the list at every width, for narrow columns such as the self-check result. */
  stacked?: boolean;
};

const R = 150;

/** The self-check's ten dimensions around the overall band (September "Diagnostic orbit", relabelled). */
export function DimensionOrbit({ className, flagged = [], centreTitle, stacked = false }: Props) {
  return (
    <figure className={cn("glass-canvas relative overflow-hidden p-5 md:p-6", className)}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,166,200,0.12),transparent_58%)]" aria-hidden />
      <div className={cn("relative z-10 grid items-center gap-6", !stacked && "min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]")}>
        <svg viewBox="0 0 420 420" className="mx-auto h-auto w-full max-w-[380px]" role="img" aria-label={dimensionOrbit.alt}>
          <circle cx="210" cy="210" r="182" fill="none" stroke="rgba(17,24,32,0.08)" />
          <g className="orbit-ring-slow">
            <circle cx="210" cy="210" r="168" fill="none" stroke="rgba(0,166,200,0.25)" strokeWidth="1.5" strokeDasharray="4 8" />
          </g>
          <circle cx="210" cy="210" r={R} fill="none" stroke="rgba(17,24,32,0.14)" strokeWidth="1.5" />
          <circle cx="210" cy="210" r="66" fill="#111820" />
          <circle cx="210" cy="210" r="74" fill="none" stroke="rgba(0,166,200,0.45)" strokeWidth="2" />
          <text x="210" y="206" textAnchor="middle" fill="#FFFFFF" fontFamily="var(--font-body), sans-serif" fontSize={centreTitle ? 12.5 : 15} fontWeight="600">
            {centreTitle ?? dimensionOrbit.centreTitle}
          </text>
          <text x="210" y="226" textAnchor="middle" fill="#C7CED3" fontFamily="var(--font-body), sans-serif" fontSize="10" fontWeight="700">
            {dimensionOrbit.centreSub}
          </text>
          {dimensions.map((d, i) => {
            const angle = (-90 + i * 36) * (Math.PI / 180);
            const x = 210 + Math.cos(angle) * R;
            const y = 210 + Math.sin(angle) * R;
            const isFlagged = flagged.includes(d.id);
            return (
              <g key={d.id} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
                <circle r="19" fill={isFlagged ? "#F8E5E5" : "#FFFFFF"} stroke={isFlagged ? "#B23B3B" : "rgba(17,24,32,0.25)"} strokeWidth={isFlagged ? 2 : 1.5} />
                <text y="5" textAnchor="middle" fill={isFlagged ? "#B23B3B" : "#111820"} fontFamily="var(--font-body), sans-serif" fontSize="14" fontWeight="700">
                  {d.id}
                </text>
              </g>
            );
          })}
        </svg>
        <figcaption>
          <p className="eyebrow">{dimensionOrbit.caption}</p>
          <ol className={cn("grid gap-x-4 gap-y-1.5 text-[15px] text-ink min-[480px]:grid-cols-2", !stacked && "min-[900px]:grid-cols-1")}>
            {dimensions.map((d) => (
              <li key={d.id} className="flex gap-2">
                <span className="w-4 shrink-0 font-[family-name:var(--font-body)] text-[13px] font-bold text-teal">{d.id}</span>
                <span>
                  {d.name}
                  {flagged.includes(d.id) && <span className="ml-1 font-semibold text-ev-miss">(flagged)</span>}
                </span>
              </li>
            ))}
          </ol>
        </figcaption>
      </div>
    </figure>
  );
}
