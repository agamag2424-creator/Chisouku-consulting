import * as React from "react";
import { SectionLabel } from "../ui/SectionLabel";
import { AnimateOnScroll } from "../animations/AnimateOnScroll";

export function PhilosophySection() {
  return (
    <section className="relative w-full border-y border-[var(--color-border)] bg-[var(--color-panel)] text-[var(--color-text-primary)]">
      <div className="mx-auto flex max-w-[var(--content-max-width)] flex-col items-center px-[40px] py-[80px] text-center sm:px-[40px]">
        <AnimateOnScroll direction="up" duration={0.8}>
          <SectionLabel>THE CHISOKU PHILOSOPHY</SectionLabel>
        </AnimateOnScroll>
        <AnimateOnScroll
          direction="up"
          duration={0.8}
          delay={0.1}
          className="mt-2"
        >
          <h2
            className="text-h1 mb-4"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              background:
                "linear-gradient(135deg, var(--color-text-primary), var(--color-cyan))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Knowing what is enough in a world that always wants more.
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll
          direction="up"
          duration={0.7}
          delay={0.25}
          className="mt-2"
        >
          <p className="mx-auto max-w-[480px] text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
            Chisoku (知足) — the art of enough. We don&apos;t sell you every AI
            tool. We build the ones that matter, and govern the rest. Just
            enough process. Just enough AI. Maximum control.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

