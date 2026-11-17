import type { Metadata } from "next";
import { Body, List, Part } from "../../components/legal/LegalParts";
import { Section } from "../../components/ui/Section";
import { pageMetadata } from "../../lib/seo";
import { extraDaysSentence, siteConfig } from "../../lib/siteConfig";
import { healthAudit as healthAuditCopy, healthCheck as healthCheckCopy } from "../../content/offer";

// About Us (Razorpay international-payments policy pages). Keeps existing site wording where it matches.
export const metadata: Metadata = pageMetadata("/about");

const lastUpdated = "17 November 2026";

export default function AboutPage() {
  return (
    <>
      <Section tone="page">
        <h1 className="t-h1 text-ink">About Us</h1>
        <p className="mt-4 text-[14px] text-muted">{`Last updated: ${lastUpdated}`}</p>
      </Section>

      <Section tone="paper">
        <div className="flex max-w-[760px] flex-col gap-12">
          <Body>
            {siteConfig.name} provides a fixed-price, independent check of how programmes and portfolios are governed,
            reported and run. The UK is first; the UAE is by arrangement.
          </Body>

          <Body>
            We help sponsors and PMO leads see whether the status being reported is supported by evidence. The score is
            Healthy, Needs attention or At risk, with owners, dates and a 30-day fix plan. We test every critical claim
            using HEALTH-5: Status, Owner, Evidence, Date, Action. We also check for contradictions between reports and
            forums.
          </Body>

          <Part title="We have no stake in your delivery">
            <List
              items={[
                "no implementation fees;",
                "no software resale;",
                "no system integrator partnerships or referral fees;",
                "any conflict disclosed in writing before an engagement.",
              ]}
            />
          </Part>

          <Part title="How you can work with us">
            <List
              items={[
                `PMO Health Check: ${healthCheckCopy.price}, ${healthCheckCopy.scope.toLowerCase()}, ${healthCheckCopy.timing.toLowerCase()}.`,
                `PMO Health Audit: ${healthAuditCopy.scope.charAt(0).toLowerCase()}${healthAuditCopy.scope.slice(1)}. ${healthAuditCopy.priceLine} ${extraDaysSentence}`,
                "A free one-page briefing on your programme, prepared from public information.",
              ]}
            />
          </Part>

          <Body>
            {siteConfig.name} is a trading name of {siteConfig.legalName}, {siteConfig.address}.
          </Body>
        </div>
      </Section>
    </>
  );
}
