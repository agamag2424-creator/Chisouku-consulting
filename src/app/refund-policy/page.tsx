import type { Metadata } from "next";
import { Body, List, Part } from "../../components/legal/LegalParts";
import { Section } from "../../components/ui/Section";
import { pageMetadata } from "../../lib/seo";
import { siteConfig } from "../../lib/siteConfig";

// Refund and Cancellation Policy (Razorpay international-payments policy pages).
export const metadata: Metadata = pageMetadata("/refund-policy");

const lastUpdated = "2 November 2026";

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
            We want you to be satisfied with what you buy. This policy explains when you can cancel and when you get
            your money back.
          </Body>

          <Part title="2.1 Go-Live Readiness Report (digital)">
            <Body>Price: USD 149.</Body>
            <Body>
              When we refund: the report is generated from your own answers, so we refund it in full only if:
            </Body>
            <List
              items={[
                "the report is faulty (for example, incomplete or unreadable) and we can't send a corrected copy within 5 business days; or",
                "it isn't delivered within 48 hours of payment.",
              ]}
            />
            <Body>
              Cancellation: reports are generated within minutes of payment, so an order can&apos;t usually be cancelled
              once paid. If yours hasn&apos;t been generated yet, email us and we&apos;ll cancel it and refund you in
              full.
            </Body>
          </Part>

          <Part title="2.2 Go-Live Readiness Pack (digital)">
            <Body>
              Price: USD 249, or USD 100 if you&apos;ve already bought the report (its USD 149 is credited towards the
              Pack).
            </Body>
            <Body>
              After download: the files can&apos;t be returned once downloaded, so refunds are limited to these cases:
            </Body>
            <List
              items={[
                "you haven't downloaded the files, and you ask within 7 days of purchase;",
                "the files are faulty or incomplete, and we can't send a working copy within 5 business days;",
                "you were charged twice, or the files were never delivered.",
              ]}
            />
            <Body>
              Report credit: if the USD 149 report credit was applied, a Pack refund is the amount you actually paid
              (USD 100). Refunding the Pack does not refund the report.
            </Body>
          </Part>

          <Part title="2.3 Consulting (Readiness Evidence Check, Go-Live Decision Review)">
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
            <Body>
              Not satisfied: tell us within 5 business days of the readout and we will correct anything that doesn&apos;t
              meet the agreed scope at no charge.
            </Body>
            <Body>
              Fee credit: an Evidence Check fee already credited against a Go-Live Decision Review is not refunded a
              second time.
            </Body>
            <Body>Free readiness brief: this is free, so there is nothing to refund.</Body>
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
