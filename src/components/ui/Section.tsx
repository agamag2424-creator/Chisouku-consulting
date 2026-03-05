import * as React from "react";
import { cn } from "../../lib/utils";

type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  paddingY?: string;
};

export function Section({ id, className, children, paddingY }: SectionProps) {
  const style: React.CSSProperties | undefined = paddingY
    ? { paddingTop: paddingY, paddingBottom: paddingY }
    : undefined;

  return (
    <section
      id={id}
      style={style}
      className={cn(
        "relative z-[1] flex w-full justify-center",
        className,
      )}
    >
      <div
        className={cn(
          "w-full",
          "max-w-[var(--content-max-width)]",
          "px-[var(--content-padding-x-mobile)]",
          "md:px-[var(--content-padding-x)]",
          !paddingY &&
            "py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y)]",
        )}
      >
        {children}
      </div>
    </section>
  );
}

