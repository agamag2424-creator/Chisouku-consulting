import type { Metadata } from "next";
import { Body, List, Part } from "../../components/legal/LegalParts";
import { Section } from "../../components/ui/Section";
import { pageMetadata } from "../../lib/seo";
import { siteConfig } from "../../lib/siteConfig";

// Terms of Service (Razorpay international-payments policy pages).
export const metadata: Metadata = pageMetadata("/terms");

const lastUpdated = "2 November 2026";

export default function TermsPage() {
  return (
    <>
      <Section tone="page">
        <h1 className="t-h1 text-ink">Terms of Service</h1>
        <p className="mt-4 text-[14px] text-muted">{`Last updated: ${lastUpdated}`}</p>
      </Section>

      <Section tone="paper">
        <div className="flex max-w-[760px] flex-col gap-12">
          <Body>
            These terms apply when you use chisokulabs.com or buy anything from us. &quot;We&quot;, &quot;us&quot; and
            &quot;{siteConfig.name}&quot; mean {siteConfig.legalName}, a company registered in India, of{" "}
            {siteConfig.address}. &quot;You&quot; means the person or organisation using the site or buying from us. By
            placing an order, you accept these terms.
          </Body>

          <Part title="1.1 What we offer">
            <List
              items={[
                "Go-Live Readiness Report (USD 149): a scored PDF report generated from your answers to an online questionnaire. It is based only on what you tell us. We do not read your documents, data or invoices.",
                "Go-Live Readiness Pack (USD 249). If you have already bought the Go-Live Readiness Report, its USD 149 is credited towards the Pack, so you pay USD 100: editable templates (.xlsx) and a PDF guide, delivered as a download.",
              ]}
            />
            <Body>Consulting services, priced as shown on the site:</Body>
            <List
              items={[
                "Readiness Evidence Check: 5 business days, USD 5,000 list price.",
                "Go-Live Decision Review: 10 business days, USD 12,000 list price.",
                "Founding-client rates and the fee credit apply as described on the site.",
              ]}
            />
            <Body>
              For each engagement we confirm the scope, dates and fee in writing (by email or a signed proposal) before
              work starts. If that written agreement conflicts with these terms, the written agreement applies.
            </Body>
            <Body>Free readiness brief: a free brief on your programme, prepared from public information.</Body>
          </Part>

          <Part title="1.2 Prices and payment">
            <List
              items={[
                "Prices are in US dollars unless we say otherwise.",
                "Prices exclude applicable taxes.",
                "Payments are processed by Razorpay. We never see or store your full card details.",
                "Digital products are paid for in full at checkout.",
                "Consulting fees are paid as set out in the written agreement.. Unless agreed otherwise, 50% is due on signing and 50% at the readout",
                "Your bank or card issuer may charge currency conversion or other fees. Those are your responsibility.",
              ]}
            />
          </Part>

          <Part title="1.3 What our work is, and is not">
            <List
              items={[
                "Our reports, templates and reviews support your own decision. They do not replace it.",
                "We do not give tax, legal or accounting advice.",
                "We do not certify compliance with UAE, Saudi (ZATCA) or any other e-invoicing rules.",
                "We do not configure or integrate systems.",
                "Regulatory dates and rules change. We use official sources at the time of writing, but you should check the current position with the relevant authority.",
              ]}
            />
          </Part>

          <Part title="1.4 Licence for digital products">
            <List
              items={[
                "Each purchase gives one company a non-exclusive, non-transferable licence to use and adapt the materials for its own internal work.",
                "You may not resell, redistribute or publish the materials, or share them outside your company.",
                "We keep all intellectual property in our materials and our methods, including READINESS-5.",
                "For consulting, you own the deliverables we prepare for you once you have paid in full. We keep our underlying methods and templates.",
              ]}
            />
          </Part>

          <Part title="1.5 Your responsibilities">
            <List
              items={[
                "Give accurate information. Report scores depend entirely on your answers.",
                "For consulting, provide the people and documents we ask for on time. If inputs arrive late, the dates may move.",
                "Do not misuse the site, for example by attempting unauthorised access or uploading harmful code.",
              ]}
            />
          </Part>

          <Part title="1.6 Confidentiality and data">
            <List
              items={[
                "We keep the information you share in confidence and use it only to deliver our services.",
                "We will sign a mutual NDA on request.",
                "Our Privacy page explains how we handle personal data.",
              ]}
            />
          </Part>

          <Part title="1.7 Liability">
            <List
              items={[
                "We provide our services with reasonable care and skill.",
                "Our total liability for any claim is limited to the amount you paid us for the product or engagement concerned.",
                "We are not liable for indirect or consequential loss, including lost profit, programme delay or regulatory penalties.",
                "Nothing in these terms limits liability that the law does not allow to be limited, such as liability for fraud.",
              ]}
            />
          </Part>

          <Part title="1.8 Refunds, cancellation and delivery">
            <Body>
              These are covered by our Refund and Cancellation Policy and our Shipping/Delivery Policy, which form part
              of these terms.
            </Body>
          </Part>

          <Part title="1.9 Events outside our control">
            <Body>Neither of us is responsible for delays caused by events beyond reasonable control.</Body>
          </Part>

          <Part title="1.10 Changes">
            <List
              items={[
                "We may update these terms.",
                "The version in force when you place your order applies to that order.",
              ]}
            />
          </Part>

          <Part title="1.11 Governing law and disputes">
            <List
              items={[
                "These terms are governed by the laws of India.",
                "If a dispute arises, we will first try to resolve it in good faith within 30 days.",
                "If that fails, the courts at Prayagraj, Uttar Pradesh, India have exclusive jurisdiction.",
              ]}
            />
          </Part>

          <Part title="1.12 Contact">
            <Body>
              {siteConfig.legalName}, {siteConfig.address} Email: {siteConfig.email} · Phone: {siteConfig.phone}
            </Body>
          </Part>
        </div>
      </Section>
    </>
  );
}
