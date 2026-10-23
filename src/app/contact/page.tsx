import { JsonLdScript } from "../../components/aeo/JsonLdScript";
import { ProgrammeForm } from "../../components/contact/ProgrammeForm";
import { isRequestKey } from "../../content/contactForm";
import { Section } from "../../components/ui/Section";
import { breadcrumbJsonLd } from "../../lib/jsonLd";
import { calendlyLink, siteConfig } from "../../lib/siteConfig";

// "Discuss your programme" (PRD 11, E9.1). `?request=brief|review|pricing` presets the request type.
const title = "Discuss your programme";

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
      <Section
        tone="page"
        containerClassName="grid gap-10 min-[1000px]:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] min-[1000px]:items-start min-[1000px]:gap-16"
      >
        <div className="flex flex-col gap-6">
          <h1 className="t-h1 text-ink">{title}</h1>
          <p className="t-body text-muted">We reply within one business day.</p>
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
            <p>
              Email: <span className="font-semibold">{siteConfig.email}</span>
            </p>
          </div>
        </div>
        <ProgrammeForm key={initialRequest} initialRequest={initialRequest} />
      </Section>
    </>
  );
}
