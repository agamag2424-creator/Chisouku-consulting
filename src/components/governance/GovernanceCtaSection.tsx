import * as React from "react";
import { Section } from "../ui/Section";
import { SectionLabel } from "../ui/SectionLabel";
import { GlowButton } from "../ui/GlowButton";

export function GovernanceCtaSection() {
  return (
    <Section>
      <div className="py-[80px] text-center text-[var(--color-text-primary)]">
        <SectionLabel>NEXT STEP</SectionLabel>
        <h2 className="text-h1 mb-4">
          Every week without governance is a week your AI runs ungoverned.
        </h2>
        <p className="text-body mx-auto mb-8 max-w-[520px]">
          Let&apos;s assess your organization&apos;s AI exposure. One 30-minute
          conversation to map the gap between your current reality and a
          governed, measurable operating model.
        </p>
        <GlowButton href="/contact" size="lg" pulsing>
          BOOK A GOVERNANCE ASSESSMENT CALL
        </GlowButton>
        <p className="mt-4 text-[12px] italic text-[var(--color-text-muted)]">
          Free 30-minute call. No pitch decks. Just clarity.
        </p>
      </div>
    </Section>
  );
}

