import { cn } from "../../lib/utils";

const pains = [
  { label: "Manual reporting cycles", visual: "cycle" },
  { label: "Multi-system exports", visual: "systems" },
  { label: "Spreadsheet consolidation", visual: "sheet" },
  { label: "Stale dashboards", visual: "stale" },
  { label: "Late escalation", visual: "late" },
  { label: "Resource conflicts", visual: "conflict" },
  { label: "Meeting prep overhead", visual: "prep" },
  { label: "Reactive project health", visual: "reactive" },
] as const;

type Props = {
  className?: string;
};

export function OperatingDragGrid({ className }: Props) {
  return (
    <div className={cn("report-board ink-corners", className)}>
      <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
        <p className="text-[13px] font-bold text-teal">
          Current-state board
        </p>
        <p className="text-[13px] font-bold text-[var(--color-muted)]">
          8 signals
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4">
        {pains.map((pain, index) => (
          <div
            key={pain.label}
            className={cn(
              "relative overflow-hidden p-5",
              index < pains.length - 1 && "border-b border-ink/10",
              "sm:border-b sm:odd:border-r",
              "lg:border-b-0 lg:border-r lg:[&:nth-child(4n)]:border-r-0 lg:[&:nth-child(n+5)]:border-t",
            )}
          >
            <MiniVisual type={pain.visual} />
            <div className="relative mt-3 text-sm font-bold tracking-[-0.01em] text-[var(--color-ink)]">
              {pain.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniVisual({ type }: { type: (typeof pains)[number]["visual"] }) {
  const common = "h-12 w-full";
  switch (type) {
    case "cycle":
      return (
        <svg viewBox="0 0 120 48" className={common} aria-hidden>
          <circle className="stroke-ink/25" cx="60" cy="24" r="16" fill="none" strokeWidth="2" strokeDasharray="6 4" />
          <path className="stroke-teal" d="M72 12 L78 18 L70 20" fill="none" strokeWidth="2" />
        </svg>
      );
    case "systems":
      return (
        <svg viewBox="0 0 120 48" className={common} aria-hidden>
          {[18, 48, 78].map((x) => (
            <rect className="fill-ink/8 stroke-ink/20" key={x} x={x} y="10" width="22" height="28" rx="2" />
          ))}
          <path className="stroke-teal" d="M40 24 H48 M70 24 H78" strokeWidth="2" />
        </svg>
      );
    case "sheet":
      return (
        <svg viewBox="0 0 120 48" className={common} aria-hidden>
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2, 3].map((c) => (
              <rect className={`${r === 2 && c === 1 ? "fill-teal/35" : "fill-ink/8"}`}
                key={`${r}-${c}`}
                x={20 + c * 20}
                y={8 + r * 9}
                width="16"
                height="7"
                rx="1"
              />
            )),
          )}
        </svg>
      );
    case "stale":
      return (
        <svg viewBox="0 0 120 48" className={common} aria-hidden>
          <rect className="fill-ink/6 stroke-ink/18" x="18" y="8" width="84" height="32" rx="3" />
          <path className="stroke-ink/20" d="M28 30 L48 20 L68 26 L90 14" fill="none" strokeWidth="2" />
          <circle className="fill-muted" cx="90" cy="14" r="3" />
        </svg>
      );
    case "late":
      return (
        <svg viewBox="0 0 120 48" className={common} aria-hidden>
          <circle className="stroke-ink/20" cx="60" cy="24" r="16" fill="none" strokeWidth="2" />
          <path className="stroke-teal" d="M60 14 V24 L70 28" fill="none" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "conflict":
      return (
        <svg viewBox="0 0 120 48" className={common} aria-hidden>
          <path className="fill-muted/20 stroke-muted" d="M30 34 L50 14 L70 34 Z" strokeWidth="1.5" />
          <path className="fill-teal/15 stroke-teal" d="M55 34 L75 14 L95 34 Z" strokeWidth="1.5" />
        </svg>
      );
    case "prep":
      return (
        <svg viewBox="0 0 120 48" className={common} aria-hidden>
          <rect className="fill-ink/6 stroke-ink/18" x="28" y="10" width="64" height="28" rx="2" />
          <path className="stroke-ink/25" d="M38 20 H82 M38 28 H70" strokeWidth="2" />
          <circle className="fill-ink" cx="86" cy="14" r="5" />
        </svg>
      );
    case "reactive":
      return (
        <svg viewBox="0 0 120 48" className={common} aria-hidden>
          <path className="stroke-ink/20" d="M20 34 L40 28 L55 36 L75 12 L100 20" fill="none" strokeWidth="2" />
          <path className="stroke-teal" d="M75 12 L100 20" strokeWidth="2.5" />
          <circle className="fill-ink" cx="75" cy="12" r="3.5" />
        </svg>
      );
    default: {
      const _exhaustive: never = type;
      return _exhaustive;
    }
  }
}
