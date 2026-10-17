import { cn } from "../../lib/utils";

const phases = [
  {
    window: "Days 1–3",
    title: "Stabilize visibility",
    items: ["Confirm owners & forums", "Freeze reporting definitions", "Baseline pack cycle"],
  },
  {
    window: "Days 4–7",
    title: "Remove first drag",
    items: ["Automate export glue", "Freshness checks", "Escalation thresholds"],
  },
  {
    window: "Days 8–10+",
    title: "Sequence the rest",
    items: ["Opportunity backlog", "ROI hypothesis", "30–90 day plan"],
  },
] as const;

type Props = {
  className?: string;
};

/** Implementation blueprint artifact. */
export function ImplementationBlueprint({ className }: Props) {
  return (
    <div className={cn("artifact-sheet ink-corners overflow-hidden", className)}>
      <div className="flex items-start justify-between gap-4 border-b border-ink/12 px-6 py-5">
        <div>
          <p className="text-[13px] font-bold text-teal">
            Artifact
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-[-0.02em]">
            Implementation Blueprint
          </h3>
        </div>
        <span className="shrink-0 border border-teal/35 bg-teal/8 px-2 py-1 text-[13px] font-bold text-teal">
          Blueprint
        </span>
      </div>

      <div className="grid gap-4 p-6 md:grid-cols-3">
        {phases.map((phase, index) => (
          <div
            key={phase.window}
            className={cn(
              "border p-5",
              index === 0
                ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-paper"
                : "border-ink/14 bg-paper/90",
            )}
          >
            <div
              className={cn(
                "text-[13px] font-bold",
                index === 0 ? "text-teal-tint" : "text-[var(--color-muted)]",
              )}
            >
              {phase.window}
            </div>
            <h4
              className={cn(
                "mt-3 font-[family-name:var(--font-display)] text-lg font-bold tracking-[-0.02em]",
                index === 0 ? "text-paper" : "text-[var(--color-ink)]",
              )}
            >
              {phase.title}
            </h4>
            <ul className="mt-4 space-y-2">
              {phase.items.map((item) => (
                <li
                  key={item}
                  className={cn(
                    "border-t pt-2 text-sm",
                    index === 0
                      ? "border-white/15 text-paper/80"
                      : "border-ink/10 text-[var(--color-muted)]",
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
