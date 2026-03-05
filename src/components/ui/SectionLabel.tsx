import * as React from "react";
import { cn } from "../../lib/utils";

type SectionLabelColor = "muted" | "cyan" | "amber" | "red" | "green";

type SectionLabelProps = {
  children: React.ReactNode;
  color?: SectionLabelColor;
  className?: string;
};

const colorClassMap: Record<SectionLabelColor, string> = {
  muted: "text-[var(--color-text-muted)]",
  cyan: "text-[var(--color-cyan)]",
  amber: "text-[var(--color-amber)]",
  red: "text-[var(--color-red)]",
  green: "text-[var(--color-green)]",
};

export function SectionLabel({
  children,
  color = "muted",
  className,
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-label mb-[14px]",
        colorClassMap[color],
        "inline-block",
        className,
      )}
    >
      {children}
    </p>
  );
}

