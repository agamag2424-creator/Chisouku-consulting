import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type CalloutProps = {
  tone?: "info" | "caution";
  title?: string;
  className?: string;
  children: ReactNode;
};

/** Boxed note with a left rule. Caution uses ink, not amber: evidence colours are reserved for evidence status. */
export function Callout({ tone = "info", title, className, children }: CalloutProps) {
  return (
    <div
      role="note"
      className={cn(
        "rounded-r-sheet border-l-[3px] py-4 pr-5 pl-5 text-ink",
        tone === "info" ? "border-teal bg-teal-tint" : "border-ink bg-faint",
        className,
      )}
    >
      {title && <p className="mb-1 font-semibold">{title}</p>}
      <div className="t-small">{children}</div>
    </div>
  );
}
