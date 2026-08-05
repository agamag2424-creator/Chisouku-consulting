import { cn } from "../../lib/utils";

const pains = [
  { id: "01", label: "Manual reporting cycles", visual: "cycle" },
  { id: "02", label: "Multi-system exports", visual: "systems" },
  { id: "03", label: "Spreadsheet consolidation", visual: "sheet" },
  { id: "04", label: "Stale dashboards", visual: "stale" },
  { id: "05", label: "Late escalation", visual: "late" },
  { id: "06", label: "Resource conflicts", visual: "conflict" },
  { id: "07", label: "Meeting prep overhead", visual: "prep" },
  { id: "08", label: "Reactive project health", visual: "reactive" },
] as const;

type Props = {
  className?: string;
};

export function OperatingDragGrid({ className }: Props) {
  return (
    <div className={cn("report-board paper-grain ink-corners", className)}>
      <div className="flex items-center justify-between border-b border-[rgba(17,24,32,0.1)] px-5 py-4">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-cyan-strong)]">
          Current-state board
        </p>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
          08 signals
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4">
        {pains.map((pain, index) => (
          <div
            key={pain.id}
            className={cn(
              "relative overflow-hidden p-5",
              index < pains.length - 1 && "border-b border-[rgba(17,24,32,0.1)]",
              "sm:border-b sm:odd:border-r",
              "lg:border-b-0 lg:border-r lg:[&:nth-child(4n)]:border-r-0 lg:[&:nth-child(n+5)]:border-t",
            )}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-1 -top-3 font-[family-name:var(--font-display)] text-5xl font-bold leading-none text-[rgba(17,24,32,0.045)]"
            >
              {pain.id}
            </span>
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
          <path d="M40 24 H48 M70 24 H78" stroke="#00A6C8" strokeWidth="2" />
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
                fill={r === 2 && c === 1 ? "rgba(0,166,200,0.35)" : "rgba(17,24,32,0.08)"}
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
          <circle cx="90" cy="14" r="3" fill="#B9965B" />
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
          <path d="M30 34 L50 14 L70 34 Z" fill="rgba(185,150,91,0.2)" stroke="#B9965B" strokeWidth="1.5" />
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
          <path d="M20 34 L40 28 L55 36 L75 12 L100 20" fill="none" stroke="rgba(17,24,32,0.2)" strokeWidth="2" />
          <path d="M75 12 L100 20" stroke="#00A6C8" strokeWidth="2.5" />
          <circle cx="75" cy="12" r="3.5" fill="#111820" />
        </svg>
      );
    default: {
      const _exhaustive: never = type;
      return _exhaustive;
    }
  }
}
