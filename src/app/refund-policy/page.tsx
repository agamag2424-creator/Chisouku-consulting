import type { Metadata } from "next";
import { Body, List, Part } from "../../components/legal/LegalParts";
import { Section } from "../../components/ui/Section";
import { pageMetadata } from "../../lib/seo";
import { siteConfig } from "../../lib/siteConfig";
import { healthAudit, healthCheck } from "../../content/offer";

// Refund and Cancellation Policy (Razorpay international-payments policy pages).
export const metadata: Metadata = pageMetadata("/refund-policy");

const lastUpdated = "17 November 2026";

export default function RefundPolicyPage() {
  return (
    <>
      <Section tone="page">
        <h1 className="t-h1 text-ink">Refund and Cancellation Policy</h1>
        <p className="mt-4 text-[14px] text-muted">{`Last updated: ${lastUpdated}`}</p>
      </Section>

      <Section tone="paper">
        <div className="flex max-w-[760px] flex-col gap-12">
          <Body>
            This policy explains when you can cancel the PMO Health Check or the PMO Health Audit, and what happens to
            your payment.
          </Body>

          <Part title="2.1 PMO Health Check">
            <Body>Price: {healthCheck.payment}</Body>
            <Body>
              {healthCheck.cancellation} {healthCheck.credit}
            </Body>
            <Body>
              Rescheduling: you may move the start date once, at no charge, with at least 2 business days&apos; notice.
            </Body>
            <Body>If we cannot deliver it, we return the fee in full.</Body>
          </Part>

          <Part title="2.2 PMO Health Audit">
            <Body>Price: {healthAudit.priceLine} {healthAudit.payment}</Body>
            <Body>Cancellation by you:</Body>
            <List
              items={[
                "more than 5 business days before the agreed start: full refund of anything paid;",
                "within 5 business days of the start: refund less 25% of the fee, which covers time reserved;",
                "after work has started: we charge for work done, pro rata by business day, and refund the rest.",
              ]}
            />
            <Body>
              Rescheduling: you may move the start date once, at no charge, with at least 2 business days&apos; notice.
            </Body>
            <Body>Cancellation by us: if we can&apos;t deliver, you get a full refund of any unearned fees.</Body>
          </Part>

          <Part title="2.3 If you are not satisfied">
            <Body>
              Tell us within 5 business days of the readout and we will correct anything that doesn&apos;t meet the agreed
              scope at no charge.
            </Body>
          </Part>

          <Part title="2.4 How to ask for a refund or cancellation">
            <List
              items={[
                `Email ${siteConfig.email} with your order or payment ID and the reason.`,
                "We reply within 2 business days.",
              ]}
            />
          </Part>

          <Part title="2.5 Refund timelines">
            <List
              items={[
                "Approved refunds go back to your original payment method through Razorpay within 5–7 business days of approval.",
                "Your bank may take longer to show the money in your account, especially for international cards.",
                "We refund the amount we received, in the original currency where possible. We don't control exchange-rate differences or fees charged by your bank.",
              ]}
            />
          </Part>

          <Part title="2.6 Contact">
            <Body>
              {siteConfig.legalName}, {siteConfig.address} · {siteConfig.email}
            </Body>
          </Part>
        </div>
      </Section>
    </>
  );
}
