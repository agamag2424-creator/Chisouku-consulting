import type { Metadata } from "next";
import { Body, List, Part } from "../../components/legal/LegalParts";
import { Section } from "../../components/ui/Section";
import { pageMetadata } from "../../lib/seo";
import { extraDaysSentence, siteConfig } from "../../lib/siteConfig";
import { healthAudit, healthCheck } from "../../content/offer";

// Shipping and Delivery Policy (Razorpay international-payments policy pages).
export const metadata: Metadata = pageMetadata("/shipping-policy");

const lastUpdated = "17 November 2026";

export default function ShippingPolicyPage() {
  return (
    <>
      <Section tone="page">
        <h1 className="t-h1 text-ink">Shipping and Delivery Policy</h1>
        <p className="mt-4 text-[14px] text-muted">{`Last updated: ${lastUpdated}`}</p>
      </Section>

      <Section tone="paper">
        <div className="flex max-w-[760px] flex-col gap-12">
          <Body>We do not ship physical goods. Everything we sell is a service, delivered remotely or on site.</Body>

          <Part title="3.1 Consulting services">
            <Body>Delivered remotely (video calls, email and shared documents), or on site where agreed in writing.</Body>
            <Body>Typical durations:</Body>
            <List
              items={[
                `PMO Health Check: ${healthCheck.timing.toLowerCase()}. ${healthCheck.outputs}.`,
                `PMO Health Audit: ${healthAudit.cap.toLowerCase()} ${extraDaysSentence.replace("The Audit is capped at 5 working days. ", "")}`,
                "Delivery and shipping charges: none.",
              ]}
            />
            <Body>The start date and deliverables are confirmed in writing before work begins.</Body>
            <Body>Timelines depend on your team providing documents and access on time.</Body>
          </Part>

          <Part title="3.2 If a deliverable hasn't arrived">
            <List
              items={[
                "Check your spam or junk folder first.",
                `If it still hasn't arrived 2 business days after the readout, email ${siteConfig.email}.`,
                "We will re-send it the same day.",
              ]}
            />
          </Part>

          <Part title="3.3 Contact">
            <Body>
              {siteConfig.legalName}, {siteConfig.address} · {siteConfig.email}
            </Body>
          </Part>
        </div>
      </Section>
    </>
  );
}
