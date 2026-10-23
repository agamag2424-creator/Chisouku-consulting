import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Button } from "../../components/ui/Button";
import { Section } from "../../components/ui/Section";
import { pageMetadata } from "../../lib/seo";
import { siteConfig } from "../../lib/siteConfig";

// Privacy policy and terms (PRD 11, E9.3). Wording and enquiry retention approved by the founder (IN-13, 17 Oct 2026).
export const metadata: Metadata = pageMetadata("/privacy");

const lastUpdated = "17 October 2026";

const collected = [
  "What you enter in the “Discuss your programme” form: name, work email, company, country, role, request type, platform, go-live decision date and your message, and your consent to be contacted about your request.",
  "Anything you send us by email, or share with us during an engagement.",
  "Anonymous website analytics: pages visited, the buttons clicked, device type, country and referring site. No cookies are used for analytics.",
];

const purposes = [
  "To reply to your enquiry.",
  "To prepare a readiness brief you have asked for.",
  "To provide the services you engage us for, under a written agreement.",
  "To understand which pages and buttons are used, so we can improve the site.",
  "To meet legal, security and administrative obligations.",
];

const providers = [
  { name: "Vercel", role: "hosts this website and provides its analytics" },
  { name: "Resend", role: "delivers form messages to our inbox" },
  { name: "Calendly", role: "handles bookings, if you choose to book a call" },
];

export default function PrivacyPage() {
  return (
    <>
      <Section tone="page">
        <h1 className="t-h1 text-ink">Privacy Policy and Terms</h1>
        <p className="mt-4 text-[14px] text-muted">{`Last updated: ${lastUpdated}`}</p>
      </Section>

      <Section tone="paper">
        <div className="flex max-w-[760px] flex-col gap-12">
          <Part title="What we collect">
            <List items={collected} />
          </Part>

          <Part title="Why we use it">
            <List items={purposes} />
            <p className="t-body text-ink">We do not sell, rent or trade personal data.</p>
          </Part>

          <Part title="Who processes it">
            <ul className="flex flex-col gap-2.5">
              {providers.map((item) => (
                <li key={item.name} className="t-body text-ink">
                  <span className="font-semibold">{item.name}</span> {item.role}.
                </li>
              ))}
            </ul>
            <p className="t-body text-ink">Each processes data under its own privacy terms.</p>
          </Part>

          <Part title="How long we keep it">
            <p className="t-body text-ink">
              Enquiries are kept for up to 24 months after our last contact, then deleted, unless they become part of an
              engagement.
            </p>
            <p className="t-body text-ink">
              Evidence shared during an engagement is handled under our data-handling policy, and deleted within 30 days
              of the final readout unless you ask us to keep it.
            </p>
            <div>
              <Button href="/independence-and-data#data-handling" variant="text">
                Independence and data handling
              </Button>
            </div>
          </Part>

          <Part title="Your choices">
            <p className="t-body text-ink">
              To see, correct or delete what we hold about you, email{" "}
              <a href={`mailto:${siteConfig.email}`} className="font-semibold text-teal underline underline-offset-4">
                {siteConfig.email}
              </a>
              . We reply within one business day.
            </p>
          </Part>

          <Part title="Terms of Service">
            <p className="t-body text-ink">
              Website content is provided for general information. Specific consulting deliverables, responsibilities,
              timelines, confidentiality and fees are governed by the written agreement for each engagement.
            </p>
            <p className="t-body text-ink">
              All site text, design, graphics, logos and code are the intellectual property of ChisokuLabs Pvt Ltd unless
              otherwise stated. You may not copy or redistribute website content without permission.
            </p>
          </Part>
        </div>
      </Section>
    </>
  );
}

function Part({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="t-h3 text-ink">{title}</h2>
      {children}
    </section>
  );
}

function List({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="t-body flex gap-3 text-ink">
          <span aria-hidden className="mt-[0.6em] size-2 shrink-0 rounded-full bg-teal" />
          {item}
        </li>
      ))}
    </ul>
  );
}
