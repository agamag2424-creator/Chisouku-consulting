import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type SheetProps = {
  as?: "div" | "article" | "figure";
  className?: string;
  children: ReactNode;
};

/** Artifact surface: paper, 1px line, sheet radius. No blur, shadow or hover lift. */
export function Sheet({ as: Tag = "div", className, children }: SheetProps) {
  return <Tag className={cn("rounded-sheet border border-line bg-paper", className)}>{children}</Tag>;
}
