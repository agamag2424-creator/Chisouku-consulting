import { cn } from "../../lib/utils";

type Props = {
  className?: string;
};

/** Consulting-grade sample audit artifact with sidebar metrics. */
export function SampleAuditArtifact({ className }: Props) {
  return (
    <div className={cn("artifact-sheet paper-grain ink-corners overflow-hidden", className)}>
      <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
        <div className="border-b border-[rgba(17,24,32,0.12)] p-6 md:p-8 lg:border-b-0 lg:border-r">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-cyan-strong)]">
                Artifact
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-[-0.02em]">
                PMO Operating Map
              </h3>
            </div>
            <span className="shrink-0 rounded-[2px] border border-[rgba(0,166,200,0.35)] bg-[rgba(0,166,200,0.08)] px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-cyan-strong)]">
              Excerpt
            </span>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["Workflow map", "Inputs → Forums → Packs"],
              ["Bottleneck zone", "Consolidation lag"],
              ["Automation fit", "Phase 1 reporting"],
            ].map(([title, detail]) => (
              <div
                key={title}
                className="metric-chip border border-[rgba(17,24,32,0.12)] bg-[rgba(255,253,248,0.8)] p-4"
              >
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                  {title}
                </div>
                <div className="mt-2 text-sm font-semibold text-[var(--color-ink)]">{detail}</div>
                <div className="mt-4 h-16 overflow-hidden">
                  <svg viewBox="0 0 140 56" className="h-full w-full" aria-hidden>
                    <path
                      d="M8 40 L36 28 L64 34 L92 16 L128 22"
                      fill="none"
                      stroke="rgba(0,166,200,0.75)"
                      strokeWidth="2"
                    />
                    <circle cx="92" cy="16" r="4" fill="#111820" />
                    <rect x="8" y="46" width="120" height="4" rx="1" fill="rgba(17,24,32,0.08)" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="border border-[rgba(17,24,32,0.12)] p-4">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                ROI hypothesis
              </div>
              <p className="mt-2 text-sm font-semibold leading-6 text-[var(--color-ink)]">
                Reduce weekly pack assembly drag before expanding automation scope.
              </p>
            </div>
            <div className="border border-[rgba(17,24,32,0.12)] p-4">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                Implementation sequence
              </div>
              <div className="mt-3 flex items-center gap-2">
                {["Map", "Fix", "Automate"].map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded-[2px] px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em]",
                        i === 0
                          ? "bg-[var(--color-ink)] text-[#fffdf8]"
                          : "bg-[rgba(17,24,32,0.06)] text-[var(--color-muted)]",
                      )}
                    >
                      {step}
                    </span>
                    {i < 2 && <span className="text-[var(--color-muted)]">→</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="bg-[rgba(17,24,32,0.03)] p-6 md:p-8">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
            Sidebar metrics
          </div>
          <dl className="mt-6 space-y-5">
            {[
              ["Cadence", "Weekly"],
              ["Manual drag", "High"],
              ["Automation fit", "Phase 1"],
              ["Risk", "Low"],
              ["Review effort", "15 min target"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="metric-chip -mx-2 border border-transparent px-2 pb-4 pt-1"
              >
                <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                  {label}
                </dt>
                <dd className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold tracking-[-0.02em] text-[var(--color-ink)]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </div>
  );
}
