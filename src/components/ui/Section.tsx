import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type SectionProps = {
  /** "ink" only where PRD 5.1 allows a dark surface (hero, closing CTA). */
  tone?: "page" | "paper" | "tint" | "ink";
  id?: string;
  className?: string;
  containerClassName?: string;
  "aria-labelledby"?: string;
  children: ReactNode;
};

const toneClasses = {
  page: "bg-page",
  paper: "bg-paper",
  tint: "bg-teal-tint",
  ink: "bg-ink text-paper",
} as const;

/** Page section: 64px vertical rhythm on mobile, 96px from 641px, content width from `--content-max-width`. */
export function Section({
  tone = "page",
  id,
  className,
  containerClassName,
  children,
  ...aria
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "px-[var(--content-padding-x-mobile)] py-16 min-[641px]:px-[var(--content-padding-x)] min-[641px]:py-24",
        toneClasses[tone],
        className,
      )}
      {...aria}
    >
      <div className={cn("mx-auto w-full max-w-[var(--content-max-width)]", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
