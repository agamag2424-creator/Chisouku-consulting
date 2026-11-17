import { findingsBoard } from "../../content/diagrams";
import { cn } from "../../lib/utils";

type Props = { className?: string };

/** "What we usually find" (the September signals board, relabelled): the three problems first, then five signals. */
export function FindingsBoard({ className }: Props) {
  return (
    <figure className={cn("report-board paper-grain ink-corners", className)} aria-label={findingsBoard.alt}>
      <div className="border-b border-ink/10 px-5 py-4">
        <p className="eyebrow mb-0">{findingsBoard.eyebrow}</p>
      </div>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
        {findingsBoard.items.map((item, index) => (
          <li
            key={item.id}
            className={cn(
              "relative overflow-hidden p-5",
              item.problem && "bg-[rgba(168,146,95,0.08)]",
              index < findingsBoard.items.length - 1 && "border-b border-ink/10",
              "sm:border-b sm:odd:border-r",
              "lg:border-b-0 lg:border-r lg:[&:nth-child(4n)]:border-r-0 lg:[&:nth-child(n+5)]:border-t",
            )}
          >
            {item.problem && (
              <p className="relative label text-gold-ink">
                {findingsBoard.problemsLabel}
              </p>
            )}
            <p className={cn("relative text-[15px] font-bold tracking-[-0.01em] text-ink", item.problem && "mt-1")}>
              {item.label}
            </p>
          </li>
        ))}
      </ul>
    </figure>
  );
}
