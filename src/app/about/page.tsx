import type { Metadata } from "next";
import { Body, List, Part } from "../../components/legal/LegalParts";
import { Section } from "../../components/ui/Section";
import { pageMetadata } from "../../lib/seo";
import { siteConfig } from "../../lib/siteConfig";

// About Us (Razorpay international-payments policy pages). Keeps existing site wording where it matches.
export const metadata: Metadata = pageMetadata("/about");

const lastUpdated = "2 November 2026";

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
            {siteConfig.name} provides independent go-live decision assurance for ERP and core-platform programmes in
            the UAE and Saudi Arabia.
          </Body>

          <Body>
            We help steering committees reach a go-live decision they can defend. The options are Go, Conditional Go or
            No-Go, with the conditions, owners and dates behind each. We test the readiness evidence behind every
            critical claim using our READINESS-5 method: Status, Owner, Evidence, Date, Action. We also check for
            contradictions between workstreams.
          </Body>

          <Part title="We have no stake in your go-live date">
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
                "Readiness Evidence Check: 5 business days.",
                "Go-Live Decision Review: 10 business days.",
                "A free readiness brief on your programme, prepared from public information.",
                "Self-serve options: the Go-Live Readiness Report and the Go-Live Readiness Pack.",
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
