import * as React from "react";
import { cn } from "../../lib/utils";

type ValueColor = "red" | "amber" | "green" | "white";

type DataRowProps = {
  label: string;
  value: React.ReactNode;
  valueColor?: ValueColor;
  mono?: boolean;
  className?: string;
};

const valueColorClassMap: Record<ValueColor, string> = {
  red: "text-[var(--color-red)]",
  amber: "text-[var(--color-amber)]",
  green: "text-[var(--color-green)]",
  white: "text-[var(--color-text-primary)]",
};

export function DataRow({
  label,
  value,
  valueColor = "white",
  mono = true,
  className,
}: DataRowProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-[var(--color-border)] py-[7px]",
        className,
      )}
    >
      <span className="text-[10px] text-[var(--color-text-secondary)]">
        {label}
      </span>
      <span
        className={cn(
          "text-[11px] font-bold",
          mono && "font-mono",
          valueColorClassMap[valueColor],
        )}
      >
        {value}
      </span>
    </div>
  );
}

