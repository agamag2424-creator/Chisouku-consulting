import { packClaim, sampleLabel } from "../../content/samplePack";
import { cn } from "../../lib/utils";
import { evidencedCount, readiness5 } from "../hero/evidenceCheckData";
import type { EvidenceState } from "../ui/EvidenceCell";

// E3.2: one claim through the five READINESS-5 checks, into a score, then into contradiction testing.
// Static inline SVG, token colours via Tailwind fill/stroke utilities, labels in Plex Sans.
// Wide layout from 1000px (below that its labels get too small); a vertical one below. Wording is the site's existing labels.

const claim = packClaim("T1");
const other = packClaim("I1");
const score = evidencedCount(claim.marks);
const scoreTint = score >= 4 ? "fill-ev-ok-tint" : score >= 2 ? "fill-ev-part-tint" : "fill-ev-miss-tint";
const scoreDot = score >= 4 ? "fill-ev-ok" : score >= 2 ? "fill-ev-part" : "fill-ev-miss";

const title = "How one claim is tested";
const desc = `${claim.id}, "${claim.claim}", reported Green, is checked on Status, Owner, Evidence, Date and Action: ${claim.marks
  .map((mark, index) => `${readiness5[index].name} ${mark}`)
  .join(", ")}. That gives ${score} of 5 evidenced. It is then tested against ${other.id}, "${other.claim}", and a contradiction is found.`;

const text = "font-[family-name:var(--font-body)]";
const mono = "font-[family-name:var(--font-mono)]";

function Mark({ cx, cy, state, r = 9 }: { cx: number; cy: number; state: EvidenceState; r?: number }) {
  if (state === "present") return <circle cx={cx} cy={cy} r={r} className="fill-ev-ok" />;
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r - 1}
        strokeWidth="2"
        className={cn("fill-paper", state === "partial" ? "stroke-ev-part" : "stroke-ev-miss")}
      />
      {state === "partial" && (
        <path d={`M${cx} ${cy - r + 1} A ${r - 1} ${r - 1} 0 0 0 ${cx} ${cy + r - 1} Z`} className="fill-ev-part" />
      )}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const horizontal = y1 === y2;
  const head = horizontal ? `M${x2 - 8} ${y2 - 6} L${x2} ${y2} L${x2 - 8} ${y2 + 6}` : `M${x2 - 6} ${y2 - 8} L${x2} ${y2} L${x2 + 6} ${y2 - 8}`;
  return (
    <g className="stroke-muted" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M${x1} ${y1} L${x2} ${y2}`} />
      <path d={head} />
    </g>
  );
}

/** Claim card used by both layouts, drawn at (x, y), width w. */
function ClaimBox({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={118} rx={4} className="fill-paper stroke-line" />
      <text x={x + 16} y={y + 26} className={cn(text, "fill-muted")} fontSize="13">
        Claim as reported
      </text>
      <text x={x + 16} y={y + 54} className={cn(mono, "fill-ink")} fontSize="15">
        {claim.id}
      </text>
      <text x={x + 46} y={y + 54} className={cn(text, "fill-ink")} fontSize="15" fontWeight="600">
        {claim.claim}
      </text>
      <rect x={x + 16} y={y + 74} width={124} height={26} rx={6} className="fill-ev-ok-tint" />
      <circle cx={x + 30} cy={y + 87} r={4} className="fill-ev-ok" />
      <text x={x + 40} y={y + 92} className={cn(text, "fill-ink")} fontSize="13" fontWeight="500">
        Reported: Green
      </text>
    </g>
  );
}

function ScoreBox({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={46} rx={6} className={scoreTint} />
      <circle cx={x + 18} cy={y + 23} r={5} className={scoreDot} />
      <text x={x + 32} y={y + 28} className={cn(mono, "fill-ink")} fontSize="14">
        {`${score} of 5 evidenced`}
      </text>
    </g>
  );
}

function ContradictionBox({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={118} rx={4} className="fill-paper stroke-line" />
      <text x={x + 16} y={y + 26} className={cn(text, "fill-muted")} fontSize="13">
        Contradiction testing
      </text>
      <circle cx={x + 30} cy={y + 64} r={8} className="fill-ink" />
      <path d={`M${x + 40} ${y + 64} H${x + w - 40}`} strokeWidth="2" strokeDasharray="5 4" className="stroke-ev-miss" />
      <circle cx={x + w - 30} cy={y + 64} r={8} className="fill-ink" />
      <text x={x + 30} y={y + 98} textAnchor="middle" className={cn(mono, "fill-ink")} fontSize="14">
        {claim.id}
      </text>
      <text x={x + w - 30} y={y + 98} textAnchor="middle" className={cn(mono, "fill-ink")} fontSize="14">
        {other.id}
      </text>
    </g>
  );
}

/** Five check nodes in a row: letter above, mark below. */
function Checks({ x, y, gap }: { x: number; y: number; gap: number }) {
  return (
    <g>
      <text x={x + gap * 2} y={y - 34} textAnchor="middle" className={cn(text, "fill-muted")} fontSize="13">
        READINESS-5
      </text>
      {claim.marks.map((mark, index) => {
        const cx = x + gap * index;
        return (
          <g key={readiness5[index].key}>
            <circle cx={cx} cy={y} r={20} className="fill-paper stroke-line" />
            <text x={cx} y={y + 5} textAnchor="middle" className={cn(text, "fill-teal")} fontSize="15" fontWeight="700">
              {readiness5[index].key}
            </text>
            <Mark cx={cx} cy={y + 44} state={mark} />
          </g>
        );
      })}
    </g>
  );
}

export function ClaimFlow({ className }: { className?: string }) {
  return (
    <figure className={cn("rounded-sheet border border-line bg-page p-4 min-[641px]:p-6", className)}>
      {/* Wide: left to right. */}
      <svg
        viewBox="0 0 1160 190"
        role="img"
        aria-labelledby="claim-flow-wide-title"
        aria-describedby="claim-flow-wide-desc"
        className="hidden h-auto w-full min-[1000px]:block"
      >
        <title id="claim-flow-wide-title">{title}</title>
        <desc id="claim-flow-wide-desc">{desc}</desc>
        <ClaimBox x={0} y={36} w={300} />
        <Arrow x1={312} y1={95} x2={352} y2={95} />
        <Checks x={392} y={80} gap={58} />
        <Arrow x1={656} y1={95} x2={692} y2={95} />
        <ScoreBox x={702} y={72} w={176} />
        <Arrow x1={890} y1={95} x2={926} y2={95} />
        <ContradictionBox x={936} y={36} w={224} />
      </svg>
      {/* Narrow: top to bottom. */}
      <svg
        viewBox="0 0 320 560"
        role="img"
        aria-labelledby="claim-flow-tall-title"
        aria-describedby="claim-flow-tall-desc"
        className="mx-auto block h-auto w-full max-w-[360px] min-[1000px]:hidden"
      >
        <title id="claim-flow-tall-title">{title}</title>
        <desc id="claim-flow-tall-desc">{desc}</desc>
        <ClaimBox x={0} y={0} w={320} />
        <Arrow x1={160} y1={128} x2={160} y2={160} />
        <Checks x={44} y={214} gap={58} />
        <Arrow x1={160} y1={280} x2={160} y2={312} />
        <ScoreBox x={70} y={322} w={180} />
        <Arrow x1={160} y1={378} x2={160} y2={410} />
        <ContradictionBox x={0} y={420} w={320} />
      </svg>
      <figcaption className="mt-3 text-[13px] text-muted">{sampleLabel}</figcaption>
    </figure>
  );
}
