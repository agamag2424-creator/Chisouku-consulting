import { cn } from "../../lib/utils";

export type RagStatus = "green" | "amber" | "red";

const rag: Record<RagStatus, { label: string; dot: string; tint: string }> = {
  green: { label: "Green", dot: "bg-ev-ok", tint: "bg-ev-ok-tint" },
  amber: { label: "Amber", dot: "bg-ev-part", tint: "bg-ev-part-tint" },
  red: { label: "Red", dot: "bg-ev-miss", tint: "bg-ev-miss-tint" },
};

type RagBadgeProps = {
  status: RagStatus;
  /** Optional lead-in, e.g. "Reported" gives "Reported: Green". */
  prefix?: string;
  className?: string;
};

/** Status as a programme reports it. Text stays ink; colour sits on the dot and tint only. */
export function RagBadge({ status, prefix, className }: RagBadgeProps) {
  const { label, dot, tint } = rag[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap t-small rounded-control px-2 py-0.5 font-medium text-ink",
        tint,
        className,
      )}
    >
      <span aria-hidden className={cn("size-2 rounded-full", dot)} />
      {prefix ? `${prefix}: ${label}` : label}
    </span>
  );
}
