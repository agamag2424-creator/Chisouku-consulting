import { cn } from "../../lib/utils";

const frames = [
  {
    n: "01",
    title: "Manual export",
    detail: "Multi-system CSVs, late starts",
  },
  {
    n: "02",
    title: "Consolidation",
    detail: "Spreadsheet glue work",
  },
  {
    n: "03",
    title: "AI-assisted pack",
    detail: "Fresh signals · narrative · distribute",
  },
] as const;

type Props = {
  className?: string;
};

/** Illustrative before/after filmstrip — methodology, not client results. */
export function PackCycleStrip({ className }: Props) {
  return (
    <div className={cn("report-board paper-grain ink-corners", className)}>
      <div className="flex items-center justify-between border-b border-[rgba(17,24,32,0.1)] px-5 py-4">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-cyan-strong)]">
          Pack cycle
        </p>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
          Methodology excerpt
        </p>
      </div>
      <div className="grid md:grid-cols-3">
        {frames.map((frame, index) => (
          <div
            key={frame.n}
            className={cn(
              "relative min-h-[180px] p-6",
              index < frames.length - 1 && "border-b border-[rgba(17,24,32,0.1)] md:border-b-0 md:border-r",
              index === frames.length - 1 && "bg-[rgba(0,166,200,0.04)]",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                {frame.n}
              </span>
              {index < frames.length - 1 ? (
                <span className="hidden font-mono text-[var(--color-cyan-strong)] md:inline" aria-hidden>
                  →
                </span>
              ) : (
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-cyan-strong)]">
                  Activate
                </span>
              )}
            </div>
            <h3 className="mt-8 font-[family-name:var(--font-display)] text-xl font-bold tracking-[-0.02em]">
              {frame.title}
            </h3>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{frame.detail}</p>
            <div className="mt-6 h-10">
              <svg viewBox="0 0 160 40" className="h-full w-full" aria-hidden>
                {index === 0 && (
                  <>
                    <rect x="8" y="8" width="36" height="24" rx="2" fill="rgba(17,24,32,0.08)" stroke="rgba(17,24,32,0.2)" />
                    <rect x="52" y="8" width="36" height="24" rx="2" fill="rgba(17,24,32,0.08)" stroke="rgba(17,24,32,0.2)" />
                    <rect x="96" y="8" width="36" height="24" rx="2" fill="rgba(17,24,32,0.08)" stroke="rgba(17,24,32,0.2)" />
                  </>
                )}
                {index === 1 && (
                  <>
                    {[0, 1, 2, 3].map((r) =>
                      [0, 1, 2, 3].map((c) => (
                        <rect
                          key={`${r}-${c}`}
                          x={20 + c * 28}
                          y={4 + r * 8}
                          width="22"
                          height="6"
                          rx="1"
                          fill={r === 1 && c === 2 ? "rgba(0,166,200,0.4)" : "rgba(17,24,32,0.08)"}
                        />
                      )),
                    )}
                  </>
                )}
                {index === 2 && (
                  <>
                    <path d="M12 28 L48 18 L84 22 L120 10 L148 14" fill="none" stroke="#00A6C8" strokeWidth="2" />
                    <circle cx="120" cy="10" r="4" fill="#111820" />
                    <rect x="12" y="32" width="136" height="4" rx="1" fill="rgba(0,166,200,0.25)" />
                  </>
                )}
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
