import * as React from "react";
import { cn } from "../../lib/utils";

type SeverityLevel = "critical" | "elevated" | "info" | "resolved";

type SeverityTagProps = {
  level: SeverityLevel;
  children: React.ReactNode;
  className?: string;
};

const levelClasses: Record<SeverityLevel, string> = {
  critical:
    "text-[var(--color-red)] bg-[var(--color-red-dim)] border border-[rgba(255,59,59,0.16)]",
  elevated:
    "text-[var(--color-amber)] bg-[var(--color-amber-dim)] border border-[rgba(255,184,0,0.16)]",
  info: "text-[var(--color-cyan)] bg-[var(--color-cyan-dim)] border border-[rgba(0,212,255,0.16)]",
  resolved:
    "text-[var(--color-green)] bg-[var(--color-green-dim)] border border-[rgba(0,255,136,0.16)]",
};

export function SeverityTag({
  level,
  children,
  className,
}: SeverityTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-[11px] py-[4px]",
        "text-[9px] font-bold tracking-[0.14em] uppercase",
        levelClasses[level],
        className,
      )}
    >
      {children}
    </span>
  );
}

