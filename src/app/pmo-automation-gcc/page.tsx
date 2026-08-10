import type { Metadata } from "next";
import { GuidePage } from "../../components/aeo/GuidePage";
import { canonicalAnswers } from "../../lib/aeoContent";
import { auditPriceRange, siteConfig } from "../../lib/siteConfig";

const title = "PMO Automation for GCC Growth-Stage SMEs";
const description =
  "ChisokuLabs PMO reporting automation for GCC growth-stage SMEs — Free PMO Diagnostic, PMO Automation Audit (USD 4–5k), and optional implementation.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/pmo-automation-gcc" },
  openGraph: {
    title: `${title} | ChisokuLabs`,
    description,
    url: `${siteConfig.url}/pmo-automation-gcc`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ChisokuLabs`,
    description,
    images: ["/og.png"],
  },
};

export default function GccPage() {
  return (
    <GuidePage
      breadcrumbName="GCC"
      path="/pmo-automation-gcc"
      eyebrow="Market · GCC"
      title="PMO automation for GCC SMEs."
      subhead={`${canonicalAnswers.whatWeDo} The GCC is a primary market alongside Singapore.`}
      answer={`For GCC growth-stage SMEs with reporting, escalation, or PMO visibility drag, start with the Free PMO Diagnostic, then a PMO Automation Audit — typically ${auditPriceRange} over ${siteConfig.pricing.timeline}.`}
      bullets={[
        "Fit roles: COO · VP Operations · Head of PMO · Delivery Director · founder/CEO",
        canonicalAnswers.systems,
        "USD commercial terms; blueprint-first — implementation only when ownership is real.",
      ]}
      primaryHref="/free-pmo-diagnostic"
      primaryLabel="Free PMO Diagnostic"
      secondaryHref="/pmo-automation-audit"
      secondaryLabel="PMO Automation Audit"
      sections={[
        {
          heading: "GCC context without doorway fluff",
          paragraphs: [
            "GCC growth-stage organisations often juggle multi-country stakeholders, rapid programme load, and reporting packs that still depend on spreadsheet glue. The opportunity is the same reporting layer: fresher packs, less assembly drag, clearer escalation signals.",
            "We do not invent local case ROI. We sell a diagnostic baseline and a scoped audit blueprint — then optional implementation when the map says go.",
          ],
        },
        {
          heading: "Commercial posture",
          paragraphs: [
            `Audit pricing and timeline match the live site (${auditPriceRange}, ${siteConfig.pricing.timeline}). Final scope is confirmed after the Audit Fit Call — workstreams, tools, and stakeholder interviews.`,
            canonicalAnswers.noRoiGuarantee,
          ],
        },
        {
          heading: "Start",
          paragraphs: [
            `Run the Free PMO Diagnostic landing, book an Audit Fit Call at ${siteConfig.url}/contact, or email ${siteConfig.email}. Related: Singapore market page, Diagnostic vs Audit, and the PMO reporting automation guide.`,
          ],
        },
      ]}
    />
  );
}
