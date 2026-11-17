import { findingsBoard, type FindingVisual } from "../../content/diagrams";
import { cn } from "../../lib/utils";

type Props = { className?: string };

/** "What we usually find" (September "Operating drag board", relabelled): the three problems first, then five signals. */
export function FindingsBoard({ className }: Props) {
  return (
    <figure className={cn("report-board paper-grain ink-corners", className)} aria-label={findingsBoard.alt}>
      <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
        <p className="eyebrow mb-0">{findingsBoard.eyebrow}</p>
        <p className="font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
          {findingsBoard.count}
        </p>
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
            <span
              aria-hidden
              className="pointer-events-none absolute -right-1 -top-3 font-[family-name:var(--font-display)] text-5xl font-bold leading-none text-ink/[0.05]"
            >
              {item.id}
            </span>
            <MiniVisual type={item.visual} />
            {item.problem && (
              <p className="relative mt-3 font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-[0.12em] text-gold-ink">
                {findingsBoard.problemsLabel}
              </p>
            )}
            <p className={cn("relative text-[15px] font-bold tracking-[-0.01em] text-ink", item.problem ? "mt-1" : "mt-3")}>
              {item.label}
            </p>
          </li>
        ))}
      </ul>
    </figure>
  );
}

function MiniVisual({ type }: { type: FindingVisual }) {
  const common = "h-12 w-full";
  switch (type) {
    case "cycle":
      return (
        <svg viewBox="0 0 120 48" className={common} aria-hidden>
          <circle cx="60" cy="24" r="16" fill="none" stroke="rgba(17,24,32,0.25)" strokeWidth="2" strokeDasharray="6 4" />
          <path d="M72 12 L78 18 L70 20" fill="none" stroke="#00A6C8" strokeWidth="2" />
        </svg>
      );
    case "systems":
      return (
        <svg viewBox="0 0 120 48" className={common} aria-hidden>
          {[18, 48, 78].map((x) => (
            <rect key={x} x={x} y="10" width="22" height="28" rx="2" fill="rgba(17,24,32,0.08)" stroke="rgba(17,24,32,0.2)" />
          ))}
          <path d="M40 24 H48 M70 24 H78" stroke="#00A6C8" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
      );
    case "sheet":
      return (
        <svg viewBox="0 0 120 48" className={common} aria-hidden>
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2, 3].map((c) => (
              <rect
                key={`${r}-${c}`}
                x={20 + c * 20}
                y={8 + r * 9}
                width="16"
                height="7"
                rx="1"
                fill={c === 3 ? "rgba(168,146,95,0.45)" : "rgba(17,24,32,0.08)"}
              />
            )),
          )}
        </svg>
      );
    case "stale":
      return (
        <svg viewBox="0 0 120 48" className={common} aria-hidden>
          <rect x="18" y="8" width="84" height="32" rx="3" fill="rgba(17,24,32,0.06)" stroke="rgba(17,24,32,0.18)" />
          <path d="M28 30 L48 20 L68 26 L90 14" fill="none" stroke="rgba(17,24,32,0.2)" strokeWidth="2" />
          <circle cx="90" cy="14" r="3" fill="#A8925F" />
        </svg>
      );
    case "late":
      return (
        <svg viewBox="0 0 120 48" className={common} aria-hidden>
          <circle cx="60" cy="24" r="16" fill="none" stroke="rgba(17,24,32,0.2)" strokeWidth="2" />
          <path d="M60 14 V24 L70 28" fill="none" stroke="#00A6C8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "conflict":
      return (
        <svg viewBox="0 0 120 48" className={common} aria-hidden>
          <path d="M30 34 L50 14 L70 34 Z" fill="rgba(168,146,95,0.2)" stroke="#A8925F" strokeWidth="1.5" />
          <path d="M55 34 L75 14 L95 34 Z" fill="rgba(0,166,200,0.15)" stroke="#00A6C8" strokeWidth="1.5" />
        </svg>
      );
    case "prep":
      return (
        <svg viewBox="0 0 120 48" className={common} aria-hidden>
          <rect x="28" y="10" width="64" height="28" rx="2" fill="rgba(17,24,32,0.06)" stroke="rgba(17,24,32,0.18)" />
          <path d="M38 20 H82 M38 28 H70" stroke="rgba(17,24,32,0.25)" strokeWidth="2" />
          <circle cx="86" cy="14" r="5" fill="#111820" />
        </svg>
      );
    case "reactive":
      return (
        <svg viewBox="0 0 120 48" className={common} aria-hidden>
          <path d="M20 30 L40 30 L55 30 L75 30 L100 12" fill="none" stroke="rgba(17,24,32,0.2)" strokeWidth="2" />
          <path d="M75 30 L100 12" stroke="#B23B3B" strokeWidth="2.5" />
          <circle cx="100" cy="12" r="3.5" fill="#B23B3B" />
        </svg>
      );
    default: {
      const exhaustive: never = type;
      return exhaustive;
    }
  }
}
