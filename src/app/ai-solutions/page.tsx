import type { Metadata } from "next";
import { Section } from "../../components/ui/Section";
import { SectionLabel } from "../../components/ui/SectionLabel";
import { GlowButton } from "../../components/ui/GlowButton";
import { TransformTile } from "../../components/homepage/TransformTile";
import { SolutionShowcaseSection } from "../../components/solutions/SolutionShowcaseSection";
import { SolutionsMethodologySection } from "../../components/solutions/SolutionsMethodologySection";
import { SolutionsCtaSection } from "../../components/solutions/SolutionsCtaSection";

export const metadata: Metadata = {
  title: "AI Solutions, Automation & Applied AI Builds",
  description:
    "ChisokuLab designs and builds applied AI solutions — from email intelligence and document automation to custom copilots — with governance built in.",
};

export default function AiSolutionsPage() {
  return (
    <main className="min-h-screen bg-void pt-14 text-[var(--color-text-primary)]">
      <Section>
        <div className="flex flex-col items-start gap-10 md:flex-row md:items-center md:gap-16">
          {/* Left content */}
          <div className="max-w-[700px] space-y-6 md:flex-1">
            <SectionLabel color="green">
              AI SOLUTIONS &amp; AUTOMATION
            </SectionLabel>
            <h1
              className="text-display"
              style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
            >
              AI solutions that work as hard as your team.
            </h1>
            <p className="text-body-lg max-w-[560px]">
              Stop experimenting with AI and start deploying it. We build custom
              AI solutions for real business problems — email intelligence,
              operations automation, document generation — with governance built
              in from day one.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <GlowButton
                href="/contact"
                variant="primary"
                size="md"
                className="bg-[var(--color-green)] text-[var(--color-void)] hover:shadow-[0_0_36px_var(--color-green-glow)]"
              >
                BOOK A SOLUTIONS DISCOVERY CALL
              </GlowButton>
              <a
                href="#solutions"
                className="text-[12px] font-semibold uppercase tracking-[0.13em] text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-text-primary)]"
              >
                See our solutions below ↓
              </a>
            </div>
          </div>

          {/* Right side workflow diagram (reuse TransformTile visual) */}
          <div className="mt-10 hidden md:flex md:flex-1 md:justify-end">
            <div className="w-[380px] opacity-70">
              <TransformTile />
            </div>
          </div>
        </div>
      </Section>
      <SolutionShowcaseSection />
      <SolutionsMethodologySection />
      <SolutionsCtaSection />
    </main>
  );
}
