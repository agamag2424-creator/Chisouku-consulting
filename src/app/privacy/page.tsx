import type { Metadata } from "next";
import { Body, List, Part } from "../../components/legal/LegalParts";
import { Button } from "../../components/ui/Button";
import { Section } from "../../components/ui/Section";
import { pageMetadata } from "../../lib/seo";
import { siteConfig } from "../../lib/siteConfig";

// Privacy Policy (Razorpay international-payments policy pages). Replaces the E9.3 version dated 17 October 2026.
export const metadata: Metadata = pageMetadata("/privacy");

const effectiveDate = "2 November 2026";

export default function PrivacyPage() {
  return (
    <>
      <Section tone="page">
        <h1 className="t-h1 text-ink">Privacy Policy</h1>
        <p className="mt-4 text-[14px] text-muted">
          {`Effective date: ${effectiveDate} (replaces the version last updated 17 October 2026)`}
        </p>
      </Section>

      <Section tone="paper">
        <div className="flex max-w-[760px] flex-col gap-12">
          <Part title="Who we are">
            <Body>
              {siteConfig.legalName} (&quot;{siteConfig.name}&quot;, &quot;we&quot;), {siteConfig.address}, is
              responsible for your personal data under India&apos;s Digital Personal Data Protection Act, 2023 (DPDP
              Act).
            </Body>
          </Part>

          <Part title="What we collect">
            <Body>
              Enquiries: what you enter in the &quot;Discuss your programme&quot; form. That is your name, work email,
              company, country, role, request type, platform, go-live decision date and message, plus your consent to be
              contacted about your request.
            </Body>
            <Body>
              Messages and engagements: anything you send us by email, or share with us during an engagement.
            </Body>
            <Body>Purchases: if you buy a report or pack, we collect:</Body>
            <List
              items={[
                "your name, email address and billing country;",
                "the answers you give in the questionnaire;",
                "the payment reference.",
              ]}
            />
            <Body>
              Analytics: anonymous website analytics, meaning pages visited, buttons clicked, device type, country and
              referring site. No cookies are used for analytics.
            </Body>
          </Part>

          <Part title="Why we use it">
            <List
              items={[
                "To reply to your enquiry.",
                "To prepare a readiness brief you have asked for.",
                "To provide the services you engage us for, under a written agreement.",
                "To process payments, deliver your purchase, issue invoices and handle refunds.",
                "To understand which pages and buttons are used, so we can improve the site.",
                "To meet legal, tax, security and administrative obligations.",
              ]}
            />
            <Body>We do not sell, rent or trade personal data.</Body>
          </Part>

          <Part title="Payments">
            <Body>
              Payments are processed by Razorpay Software Private Limited. Your card or bank details go directly to
              Razorpay and are handled under its privacy policy. We never see or store your full card number. We receive
              only:
            </Body>
            <List
              items={[
                "the payment status, amount and reference;",
                "the contact details you enter at checkout.",
              ]}
            />
          </Part>

          <Part title="Cookies">
            <Body>
              Our analytics use no cookies. The Razorpay checkout and Calendly booking pages may set their own essential
              cookies so that they work securely. You can block cookies in your browser, but checkout or booking may then
              not work.
            </Body>
          </Part>

          <Part title="Who processes it">
            <List
              items={[
                "Vercel hosts this website and provides its analytics.",
                "Resend delivers form messages and purchase emails.",
                "Calendly handles bookings, if you choose to book a call.",
                "Razorpay processes payments.",
              ]}
            />
            <Body>
              Each processes data under its own privacy terms. Some of these providers process data outside India. We
              also disclose personal data where the law requires us to.
            </Body>
          </Part>

          <Part title="How long we keep it">
            <Body>
              Enquiries: kept for up to 24 months after our last contact, then deleted, unless they become part of an
              engagement.
            </Body>
            <Body>
              Engagement evidence: handled under our Independence and data handling policy, and deleted within 30 days of
              the final readout unless you ask us to keep it.
            </Body>
            <div>
              <Button href="/independence-and-data#data-handling" variant="text">
                Independence and data handling
              </Button>
            </div>
            <Body>
              Order, invoice and payment records: kept for 8 years, as Indian tax and company law requires.
            </Body>
            <Body>Questionnaire answers: kept for 24 months after purchase, then deleted.</Body>
          </Part>

          <Part title="Your rights">
            <Body>Under the DPDP Act you may:</Body>
            <List
              items={[
                "ask to access, correct, complete or erase your personal data;",
                "withdraw your consent at any time;",
                "have a grievance addressed;",
                "nominate someone to exercise these rights for you.",
              ]}
            />
            <Body>
              Withdrawing consent does not affect processing already carried out, or records we must keep by law. To use
              any of these rights, email{" "}
              <a href={`mailto:${siteConfig.email}`} className="font-semibold text-teal underline underline-offset-4">
                {siteConfig.email}
              </a>
              .
            </Body>
          </Part>

          <Part title="Grievance Officer">
            <Body>
              Grievance Officer, {siteConfig.legalName} {siteConfig.address} Email: {siteConfig.email} · Phone:{" "}
              {siteConfig.phone}
            </Body>
            <Body>
              We acknowledge a complaint within 2 business days and resolve it within 30 days. If you are not satisfied
              with our response, you may complain to the Data Protection Board of India.
            </Body>
          </Part>

          <Part title="Changes">
            <Body>We will post any changes on this page and update the effective date.</Body>
          </Part>
        </div>
      </Section>
    </>
  );
}
