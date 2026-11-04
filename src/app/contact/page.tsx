import { JsonLdScript } from "../../components/aeo/JsonLdScript";
import { ProgrammeForm } from "../../components/contact/ProgrammeForm";
import { Body, List } from "../../components/legal/LegalParts";
import { isRequestKey } from "../../content/contactForm";
import { Section } from "../../components/ui/Section";
import { breadcrumbJsonLd } from "../../lib/jsonLd";
import { calendlyLink, siteConfig } from "../../lib/siteConfig";

// Contact Us (Razorpay policy content) plus the existing programme form (PRD 11, E9.1).
const title = "Contact Us";
const lastUpdated = "4 November 2026";

type Props = { searchParams?: Promise<{ request?: string | string[] }> };

export default async function ContactPage({ searchParams }: Props) {
  const { request } = (await searchParams) ?? {};
  const initialRequest = isRequestKey(request) ? request : "review";

  return (
    <>
      <JsonLdScript
        id="contact-breadcrumb-ld-json"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: title, path: "/contact" },
        ])}
      />

      <Section tone="page">
        <h1 className="t-h1 text-ink">{title}</h1>
        <p className="mt-4 text-[14px] text-muted">{`Last updated: ${lastUpdated}`}</p>
      </Section>

      <Section tone="paper">
        <div className="flex max-w-[760px] flex-col gap-8">
          <Body>
            {siteConfig.legalName} {siteConfig.address}
          </Body>
          <div className="flex flex-col gap-3 text-[15px] text-ink">
            <p>
              Email: <span className="font-semibold">{siteConfig.email}</span>
            </p>
            <p>
              Phone: <span className="font-semibold">{siteConfig.phone}</span>
            </p>
          </div>
          <Body>
            Response time: we reply to every message within 2 business days (Monday to Friday, India time). Refund and
            delivery queries get the same response time.
          </Body>
          <Body>
            Orders: for a refund, cancellation or a missing delivery, include your payment ID.
          </Body>
          <List
            items={[
              "Go-Live Readiness Report: USD 149.",
              "Go-Live Readiness Pack: USD 249. If you've bought the report, its USD 149 is credited towards the Pack if you buy the Pack within 60 days of your report being delivered.",
            ]}
          />
          <div className="flex flex-col gap-3 border-t border-line pt-6 text-[15px] text-ink">
            <p>
              Prefer to talk?{" "}
              <a
                href={calendlyLink("contact")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-teal underline underline-offset-4 hover:text-ink"
              >
                Book a call
              </a>
            </p>
          </div>
        </div>
      </Section>

      <Section
        tone="page"
        containerClassName="grid gap-10 min-[1000px]:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] min-[1000px]:items-start min-[1000px]:gap-16"
      >
        <div className="flex flex-col gap-6">
          <h2 className="t-h2 text-ink">Discuss your programme</h2>
          <p className="t-body text-muted">We reply within 2 business days.</p>
        </div>
        <ProgrammeForm key={initialRequest} initialRequest={initialRequest} />
      </Section>
    </>
  );
}
