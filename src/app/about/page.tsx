import type { Metadata } from "next";
import { Body, List, Part } from "../../components/legal/LegalParts";
import { Button } from "../../components/ui/Button";
import { Section } from "../../components/ui/Section";
import { backgroundLine, healthAudit as healthAuditCopy, healthCheck as healthCheckCopy, threeProblemsLine } from "../../content/offer";
import { markets } from "../../content/markets";
import { pageMetadata } from "../../lib/seo";
import { extraDaysSentence, siteConfig } from "../../lib/siteConfig";

// About Us (also a Razorpay policy page). Story 6.1: the ladder, the three problems and the background line.
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
            {siteConfig.name} runs fixed-price PMO Health Checks and Audits for UK organisations running a PMO, and for
            organisations in the UAE and Saudi Arabia.
          </Body>

          <Part title="What we look for">
            <Body>{threeProblemsLine}</Body>
            <Body>
              We check what is reported against the evidence: the status pack, the RAID log, the governance calendar and the
              plan, plus three short interviews.
            </Body>
          </Part>

          <Part title="Who does the work">
            <Body>Every Health Check and Audit is carried out and signed by the founder. {backgroundLine}</Body>
          </Part>

          <Part title="How you can work with us">
            <List
              items={[
                "PMO self-check: free, online, about five minutes. Answers stay in your browser.",
                `PMO Health Check: ${healthCheckCopy.price}, ${healthCheckCopy.scope.toLowerCase()}, ${healthCheckCopy.timing.toLowerCase()}. ${healthCheckCopy.payment}`,
                `PMO Health Audit: ${healthAuditCopy.scope.charAt(0).toLowerCase()}${healthAuditCopy.scope.slice(1)}. ${healthAuditCopy.priceLine} ${extraDaysSentence}`,
              ]}
            />
          </Part>

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

          <Part title="Where we work">
            <Body>
              The UK first. Remote by default, on site where agreed. Prices are in US dollars. Also{" "}
              <a href={markets.uae.path} className="text-teal underline underline-offset-4">
                the UAE
              </a>{" "}
              and{" "}
              <a href={markets.saudiArabia.path} className="text-teal underline underline-offset-4">
                Saudi Arabia
              </a>
              .
            </Body>
          </Part>

          <Body>
            {siteConfig.name} is a trading name of {siteConfig.legalName}, {siteConfig.address}.
          </Body>

          <div>
            <Button href="/pmo-self-check" variant="secondary" ctaId="self_check">
              Take the PMO self-check
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
