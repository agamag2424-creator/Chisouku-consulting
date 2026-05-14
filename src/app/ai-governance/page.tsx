import type { Metadata } from "next";
import { Section } from "../../components/ui/Section";
import { SectionLabel } from "../../components/ui/SectionLabel";
import { GlowButton } from "../../components/ui/GlowButton";
import { DashboardPanel } from "../../components/ui/DashboardPanel";
import { DataRow } from "../../components/ui/DataRow";
import { ThreatConsoleSection } from "../../components/governance/ThreatConsoleSection";
import { GovernanceMethodologySection } from "../../components/governance/GovernanceMethodologySection";
import { LeadMagnetsSection } from "../../components/governance/LeadMagnetsSection";
import { GovernanceCtaSection } from "../../components/governance/GovernanceCtaSection";

export const metadata: Metadata = {
  title: "AI Governance Consulting & PMO Modernization",
  description:
    "ChisokuLab helps you audit, design, and deploy AI governance frameworks so shadow AI is brought under control and your PMO is ready for the AI era.",
  keywords: [
    "AI governance consulting",
    "responsible AI",
    "shadow AI",
    "AI risk management",
  ],
};

export default function AiGovernancePage() {
  return (
    <main className="min-h-screen bg-void pt-14 text-[var(--color-text-primary)]">
      <Section>
        <div className="flex flex-col items-start gap-10 md:flex-row md:items-start md:gap-16">
          {/* Left content */}
          <div className="max-w-[700px] space-y-6 md:flex-1">
            <SectionLabel color="cyan">
              AI GOVERNANCE &amp; PMO MODERNIZATION
            </SectionLabel>
            <h1 className="text-display" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
              Your organization is running ungoverned AI. Here&apos;s how we fix
              it.
            </h1>
            <p className="text-body-lg max-w-[560px]">
              Shadow AI is already inside your walls. Your PMO framework
              predates the AI era. We audit, design, and deploy a unified
              governance system — so your AI adoption accelerates with control,
              not chaos.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <GlowButton href="/contact" variant="primary" size="md">
                BOOK A GOVERNANCE ASSESSMENT
              </GlowButton>
              <a
                href="#methodology"
                className="text-[12px] font-semibold uppercase tracking-[0.13em] text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-text-primary)]"
              >
                See our methodology below ↓
              </a>
            </div>
          </div>

          {/* Right side simplified dashboard (desktop only) */}
          <div className="mt-8 hidden md:flex md:flex-1 md:justify-end">
            <div className="w-[360px] opacity-70">
              <DashboardPanel
                title="GOVERNANCE SNAPSHOT"
                statusColor="amber"
              >
                <DataRow
                  label="Shadow AI tools identified"
                  value="12+"
                  valueColor="red"
                />
                <DataRow
                  label="Documented AI policies"
                  value="0"
                  valueColor="red"
                />
                <DataRow
                  label="Governance maturity"
                  value="Ad-hoc"
                  valueColor="amber"
                />
                <DataRow
                  label="Next audit / certification"
                  value="&lt; 12 months"
                  valueColor="amber"
                  mono={false}
                />
                <DataRow
                  label="Executive confidence"
                  value="Low"
                  valueColor="red"
                  mono={false}
                />
              </DashboardPanel>
            </div>
          </div>
        </div>
      </Section>
      <ThreatConsoleSection />
      <GovernanceMethodologySection />
      <LeadMagnetsSection />
      <GovernanceCtaSection />
    </main>
  );
}
