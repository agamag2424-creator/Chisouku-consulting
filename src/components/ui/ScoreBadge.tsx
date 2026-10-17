import { cn } from "../../lib/utils";

type ScoreBadgeProps = {
  /** Elements evidenced (● only; ◐ does not count). */
  score: number;
  total?: number;
  className?: string;
};

/** PRD 7: 4 or more evidenced reads as ok, 2–3 partial, 0–1 missing. */
function scoreTone(score: number) {
  if (score >= 4) return { dot: "bg-ev-ok", tint: "bg-ev-ok-tint" };
  if (score >= 2) return { dot: "bg-ev-part", tint: "bg-ev-part-tint" };
  return { dot: "bg-ev-miss", tint: "bg-ev-miss-tint" };
}

/** "3 of 5 evidenced". Text stays ink; the score colour sits on the dot and tint only. */
export function ScoreBadge({ score, total = 5, className }: ScoreBadgeProps) {
  const clamped = Math.min(Math.max(Math.round(score), 0), total);
  const { dot, tint } = scoreTone(clamped);
  return (
    <span
      className={cn(
        "t-data inline-flex items-center gap-1.5 whitespace-nowrap rounded-control px-2 py-0.5 text-ink",
        tint,
        className,
      )}
    >
      <span aria-hidden className={cn("size-2 rounded-full", dot)} />
      {`${clamped} of ${total} evidenced`}
    </span>
  );
}
