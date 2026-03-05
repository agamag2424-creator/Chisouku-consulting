import * as React from "react";
import { cn } from "../../lib/utils";

type StatusColor = "red" | "amber" | "green";

type DashboardPanelProps = {
  title: string;
  statusColor: StatusColor;
  children: React.ReactNode;
  className?: string;
};

const statusDotColorMap: Record<StatusColor, string> = {
  red: "bg-[var(--color-red)] shadow-[0_0_12px_var(--color-red-glow)]",
  amber:
    "bg-[var(--color-amber)] shadow-[0_0_12px_var(--color-amber-glow)]",
  green:
    "bg-[var(--color-green)] shadow-[0_0_12px_var(--color-green-glow)]",
};

export function DashboardPanel({
  title,
  statusColor,
  children,
  className,
}: DashboardPanelProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-[var(--color-panel)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
        <span className="text-label text-[9px] text-[var(--color-text-muted)]">
          {title}
        </span>
        <span
          className={cn(
            "inline-flex h-[10px] w-[10px] items-center justify-center rounded-full",
            statusDotColorMap[statusColor],
            "animate-pulse",
          )}
        />
      </div>
      <div className="px-4 py-[14px] text-[12px] text-[var(--color-text-secondary)]">
        {children}
      </div>
    </div>
  );
}

