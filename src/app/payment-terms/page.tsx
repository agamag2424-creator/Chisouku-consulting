import type { Metadata } from "next";
import Link from "next/link";
import { Body, Part } from "../../components/legal/LegalParts";
import { Section } from "../../components/ui/Section";
import { healthAudit, healthCheck, taxLine } from "../../content/offer";
import { pageMetadata } from "../../lib/seo";

// Payment terms (change 3): one footer link to the two policies Razorpay requires. Both keep their own pages and URLs.
export const metadata: Metadata = pageMetadata("/payment-terms");

const policies = [
  {
    href: "/refund-policy",
    title: "Refund and Cancellation Policy",
    text: "What happens if you cancel the PMO Health Check or the PMO Health Audit, and how to ask.",
  },
  {
    href: "/shipping-policy",
    title: "Shipping and Delivery Policy",
    text: "How and when the Health Check and the Audit are delivered.",
  },
];

export default function PaymentTermsPage() {
  return (
    <>
      <Section tone="page">
        <h1 className="t-h1 text-ink">Payment terms</h1>
      </Section>
      <Section tone="paper">
        <div className="flex max-w-[760px] flex-col gap-12">
          <Part title="How payment works">
            <Body>
              PMO Health Check: {healthCheck.payment} {healthCheck.credit}
            </Body>
            <Body>
              PMO Health Audit: {healthAudit.priceLine} {healthAudit.payment}
            </Body>
            <Body>{taxLine}</Body>
          </Part>
          <Part title="Policies">
            <ul className="flex flex-col gap-5">
              {policies.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-[18px] font-semibold text-teal underline underline-offset-4">
                    {p.title}
                  </Link>
                  <p className="t-small mt-1 text-muted">{p.text}</p>
                </li>
              ))}
            </ul>
          </Part>
        </div>
      </Section>
    </>
  );
}
