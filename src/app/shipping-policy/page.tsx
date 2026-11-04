import type { Metadata } from "next";
import { Body, List, Part } from "../../components/legal/LegalParts";
import { Section } from "../../components/ui/Section";
import { pageMetadata } from "../../lib/seo";
import { siteConfig } from "../../lib/siteConfig";

// Shipping and Delivery Policy (Razorpay international-payments policy pages).
export const metadata: Metadata = pageMetadata("/shipping-policy");

const lastUpdated = "4 November 2026";

export default function ShippingPolicyPage() {
  return (
    <>
      <Section tone="page">
        <h1 className="t-h1 text-ink">Shipping and Delivery Policy</h1>
        <p className="mt-4 text-[14px] text-muted">{`Last updated: ${lastUpdated}`}</p>
      </Section>

      <Section tone="paper">
        <div className="flex max-w-[760px] flex-col gap-12">
          <Body>We do not ship physical goods. Everything we sell is delivered electronically or as a service.</Body>

          <Part title="3.1 Digital products">
            <Body>Go-Live Readiness Report:</Body>
            <List
              items={[
                "delivered as a PDF to the email address you give at checkout;",
                "within 48 hours of payment.",
              ]}
            />
            <Body>Go-Live Readiness Pack:</Body>
            <List
              items={[
                "delivered as a download link (ZIP file containing .xlsx templates and a PDF guide);",
                "sent by email and/or shown on the payment confirmation page within 48 hours of payment.",
              ]}
            />
            <Body>The link stays active for 30 days. Email us if you need it re-sent.</Body>
            <Body>Delivery and shipping charges: none.</Body>
            <Body>Where we deliver: worldwide, wherever we are able to accept payment.</Body>
          </Part>

          <Part title="3.2 Consulting services">
            <Body>Delivered remotely (video calls, email and shared documents), or on site where agreed in writing.</Body>
            <Body>Typical durations:</Body>
            <List
              items={[
                "Readiness Evidence Check: 5 business days. A scoping call and document request on day 1, evidence review on days 2–4, and written findings and a readout on day 5.",
                "Go-Live Decision Review: 10 business days.",
              ]}
            />
            <Body>The start date and deliverables are confirmed in writing before work begins.</Body>
            <Body>Timelines depend on your team providing documents and access on time.</Body>
          </Part>

          <Part title="3.3 If something hasn't arrived">
            <List
              items={[
                "Check your spam or junk folder first.",
                `If it still hasn't arrived after 48 hours, email ${siteConfig.email} with your payment ID.`,
                "We will re-send it, or refund you under our Refund and Cancellation Policy.",
              ]}
            />
          </Part>

          <Part title="3.4 Contact">
            <Body>
              {siteConfig.legalName}, {siteConfig.address} · {siteConfig.email}
            </Body>
          </Part>
        </div>
      </Section>
    </>
  );
}
