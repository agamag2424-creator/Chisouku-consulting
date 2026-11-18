import {
  healthMap,
  threeProblems,
  type ProblemId,
} from "../../content/diagrams";
import { cn } from "../../lib/utils";

type Props = {
  className?: string;
  /** Drawing only: no title above it and no numbered key below (the homepage hero, where the text beside it says the same). */
  compact?: boolean;
};

const INK = "#111820";
const MUTED = "#5F6A75";
const CYAN = "#00A6C8";
const GOLD = "#A8925F";

/** Node boxes on a 720 x 480 canvas: two on top, two at the sides, the decision forum below. */
const layout: Record<
  string,
  {
    x: number;
    y: number;
    w: number;
    h: number;
    dot: [number, number];
    line: string;
  }
> = {
  raid: {
    x: 88,
    y: 52,
    w: 168,
    h: 64,
    dot: [172, 116],
    line: "M172 116 L300 176",
  },
  status: {
    x: 464,
    y: 52,
    w: 168,
    h: 64,
    dot: [548, 116],
    line: "M548 116 L420 176",
  },
  calendar: {
    x: 24,
    y: 236,
    w: 176,
    h: 64,
    dot: [200, 268],
    line: "M200 268 L242 262",
  },
  plan: {
    x: 520,
    y: 236,
    w: 176,
    h: 64,
    dot: [520, 268],
    line: "M520 268 L478 262",
  },
  forum: {
    x: 260,
    y: 392,
    w: 200,
    h: 60,
    dot: [360, 392],
    line: "M360 332 L360 392",
  },
};

const problemNumber = (id: ProblemId) =>
  threeProblems.findIndex((p) => p.id === id) + 1;

/** PMO Health Map (September "PMO Operating Map", relabelled). Drawn map from 640px; a stacked list below that. */
export function PmoHealthMap({ className, compact = false }: Props) {
  return (
    <figure
      className={cn(
        "glass-canvas relative overflow-hidden",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[rgba(0,166,200,0.12)] blur-3xl"
        aria-hidden
      />
      <div className="relative z-10 p-5 md:p-8">
        {!compact && (
          <>
            <p className="eyebrow">{healthMap.eyebrow}</p>
            {/* A titled figure, not a page heading: an h3 here could skip a level. */}
            <p className="font-[family-name:var(--font-body)] text-xl font-semibold tracking-[-0.02em] text-ink md:text-2xl">
              {healthMap.title}
            </p>
          </>
        )}

        <svg
          viewBox="0 0 720 480"
          className={cn(
            "hidden h-auto w-full min-[640px]:block",
            !compact && "mt-4",
          )}
          role="img"
          aria-label={healthMap.alt}
        >
          <g
            className="map-draw"
            stroke="rgba(17,24,32,0.28)"
            strokeWidth="1.5"
            fill="none"
          >
            {healthMap.nodes.map((n) => (
              <path
                key={n.id}
                d={layout[n.id].line}
                stroke={n.id === "forum" ? "rgba(0,166,200,0.7)" : undefined}
              />
            ))}
          </g>
          <g fill={CYAN}>
            {healthMap.nodes.map((n) => (
              <circle
                key={n.id}
                className="map-node-dot"
                cx={layout[n.id].dot[0]}
                cy={layout[n.id].dot[1]}
                r="3.5"
              />
            ))}
          </g>
          <rect
            x="242"
            y="176"
            width="236"
            height="156"
            rx="8"
            fill="#E4F1F3"
            stroke={INK}
            strokeWidth="2"
          />
          <text
            x="360"
            y="232"
            textAnchor="middle"
            fill={INK}
            fontFamily="var(--font-body), sans-serif"
            fontSize="20"
            fontWeight="600"
          >
            {healthMap.centreTitle}
          </text>
          <text
            x="360"
            y="258"
            textAnchor="middle"
            fill={MUTED}
            fontFamily="var(--font-body), sans-serif"
            fontSize="13"
            fontWeight="600"
          >
            {healthMap.centreSub}
          </text>
          <g transform="translate(298 282)">
            {threeProblems.map((p, i) => (
              <g key={p.id} transform={`translate(${i * 44} 0)`}>
                <circle cx="18" cy="12" r="11" fill={GOLD} />
                <text
                  x="18"
                  y="16"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontFamily="var(--font-body), sans-serif"
                  fontSize="11"
                  fontWeight="700"
                >
                  {i + 1}
                </text>
              </g>
            ))}
          </g>
          {healthMap.nodes.map((n, i) => {
            const box = layout[n.id];
            const accent = n.id === "forum";
            return (
              // The animated group stays untransformed: a CSS transform would replace the SVG translate.
              <g
                key={n.id}
                className="map-sat"
                style={{ animationDelay: `${720 + i * 100}ms` }}
              >
                <g transform={`translate(${box.x} ${box.y})`}>
                  <rect
                    width={box.w}
                    height={box.h}
                    rx="6"
                    fill={accent ? INK : "#FFFFFF"}
                    stroke={accent ? INK : "rgba(17,24,32,0.2)"}
                    strokeWidth="1.5"
                  />
                  <text
                    x="14"
                    y="27"
                    fill={accent ? "#FFFFFF" : INK}
                    fontFamily="var(--font-body), sans-serif"
                    fontSize="15"
                    fontWeight="600"
                  >
                    {n.title}
                  </text>
                  <text
                    x="14"
                    y="47"
                    fill={accent ? "#C7CED3" : MUTED}
                    fontFamily="var(--font-body), sans-serif"
                    fontSize="13"
                    fontWeight="600"
                  >
                    {n.sub}
                  </text>
                  {n.problem && (
                    <g transform={`translate(${box.w - 4} -4)`}>
                      <circle
                        r="11"
                        fill={GOLD}
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      />
                      <text
                        y="4"
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontFamily="var(--font-body), sans-serif"
                        fontSize="11"
                        fontWeight="700"
                      >
                        {problemNumber(n.problem)}
                      </text>
                    </g>
                  )}
                </g>
              </g>
            );
          })}
        </svg>

        {/* Below 640px: the same content as a list (no drawing to shrink). */}
        <ul className="mt-5 space-y-2 min-[640px]:hidden">
          {healthMap.nodes.map((n) => (
            <li
              key={n.id}
              className={cn(
                "flex items-start justify-between gap-3 border p-3",
                n.id === "forum"
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/15 bg-paper",
              )}
            >
              <span>
                <span className="block font-[family-name:var(--font-body)] text-[16px] font-semibold">
                  {n.title}
                </span>
                <span
                  className={cn(
                    "block font-[family-name:var(--font-body)] text-[12px]",
                    n.id === "forum" ? "text-paper/75" : "text-muted",
                  )}
                >
                  {n.sub}
                </span>
              </span>
              {n.problem && (
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-ink font-[family-name:var(--font-body)] text-[12px] font-bold text-paper">
                  <span className="sr-only">Problem </span>
                  {problemNumber(n.problem)}
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* Compact: the drawing's own label names the three problems, and the hero text says them too. */}
        {!compact && (
          <figcaption className="mt-5 border-t border-ink/10 pt-4">
            <ol className="grid gap-2 text-[15px] text-ink min-[900px]:grid-cols-3">
              {threeProblems.map((p, i) => (
                <li key={p.id} className="flex items-start gap-2">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-ink font-[family-name:var(--font-body)] text-[11px] font-bold text-paper"
                  >
                    {i + 1}
                  </span>
                  <span>{p.short}</span>
                </li>
              ))}
            </ol>
          </figcaption>
        )}
      </div>
    </figure>
  );
}
