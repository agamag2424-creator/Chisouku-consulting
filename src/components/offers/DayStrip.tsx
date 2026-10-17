import { cn } from "../../lib/utils";

/** Business days as a strip; first and last days marked (PRD 9.12). Decorative: the days are stated in text nearby. */
export function DayStrip({ days, className }: { days: number; className?: string }) {
  return (
    <ol
      aria-hidden
      className={cn("grid gap-1", className)}
      style={{ gridTemplateColumns: `repeat(${days}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: days }, (_, day) => (
        <li
          key={day}
          className={cn(
            "t-data flex h-8 items-center justify-center rounded-sheet text-[12px]",
            day === 0 || day === days - 1 ? "bg-ink text-paper" : "bg-teal-tint text-teal",
          )}
        >
          {days <= 5 ? `D${day + 1}` : day + 1}
        </li>
      ))}
    </ol>
  );
}
