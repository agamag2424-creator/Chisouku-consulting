import * as React from "react";
import { Section } from "../ui/Section";
import { SectionLabel } from "../ui/SectionLabel";
import { GlowButton } from "../ui/GlowButton";

export function SolutionsCtaSection() {
  return (
    <Section>
      <div className="py-[100px] text-center text-[var(--color-text-primary)]">
        <SectionLabel>NEXT STEP</SectionLabel>
        <h2 className="text-h1 mb-4">
          Your biggest operational bottleneck has an AI solution. Let&apos;s
          find it.
        </h2>
        <p className="text-body mx-auto mb-8 max-w-[520px]">
          One 30-minute conversation to identify where AI can deliver the most
          value in your organization. We&apos;ll outline a solution concept
          before the call ends.
        </p>
        <GlowButton
          href="/contact"
          size="lg"
          pulsing
          className="bg-[var(--color-green)] text-[var(--color-void)] hover:shadow-[0_0_36px_var(--color-green-glow)]"
        >
          BOOK A SOLUTIONS DISCOVERY CALL
        </GlowButton>
        <p className="mt-4 text-[12px] italic text-[var(--color-text-muted)]">
          Free 30-minute call. Real solution concepts. Not slides.
        </p>
      </div>
    </Section>
  );
}

