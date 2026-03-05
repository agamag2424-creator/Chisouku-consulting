import * as React from "react";
import { SectionLabel } from "../ui/SectionLabel";
import { GlowButton } from "../ui/GlowButton";
import { AnimateOnScroll } from "../animations/AnimateOnScroll";

export function FinalCtaSection() {
  return (
    <section
      id="contact-cta"
      className="relative bg-void text-[var(--color-text-primary)]"
    >
      <div className="mx-auto flex max-w-[var(--content-max-width)] flex-col items-center px-[40px] py-[100px] text-center">
        <AnimateOnScroll direction="up">
          <SectionLabel>NEXT STEP</SectionLabel>
        </AnimateOnScroll>

        <AnimateOnScroll direction="up" delay={0.1}>
          <h2 className="text-h1 mb-4">
            One conversation to map your AI reality — threats and opportunities.
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll direction="up" delay={0.2}>
          <p className="mx-auto mb-8 max-w-[500px] text-body">
            30 minutes. We&apos;ll assess your governance gaps AND identify your
            highest-value AI opportunities. No pitch decks. Just clarity on what
            needs to happen next.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll direction="up" delay={0.3}>
          <GlowButton href="/contact" size="lg" pulsing>
            BOOK YOUR FREE DISCOVERY CALL
          </GlowButton>
        </AnimateOnScroll>

        <AnimateOnScroll direction="up" delay={0.4}>
          <button
            type="button"
            className="mt-4 text-[12px] font-semibold uppercase tracking-[0.13em] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          >
            Download our AI Readiness Assessment →
          </button>
        </AnimateOnScroll>

        <AnimateOnScroll direction="up" delay={0.5}>
          <p className="mt-4 text-[12px] italic text-[var(--color-text-muted)]">
            Free 30-minute call. Both governance and solutions covered.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

