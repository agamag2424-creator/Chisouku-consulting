import type { Metadata } from "next";
import { GuidePage } from "../../components/aeo/GuidePage";
import { canonicalAnswers } from "../../lib/aeoContent";
import { auditPriceRange, siteConfig } from "../../lib/siteConfig";

const title = "PMO Reporting Automation";
const description =
  "How to automate the PMO reporting pack cycle — collection, consolidation, narrative, and distribution — starting with a diagnostic and optional audit.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/pmo-reporting-automation" },
  openGraph: {
    title: `${title} | ChisokuLabs`,
    description,
    url: `${siteConfig.url}/pmo-reporting-automation`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ChisokuLabs`,
    description,
    images: ["/og.png"],
  },
};

export default function PmoReportingAutomationPage() {
  return (
    <GuidePage
      breadcrumbName="PMO Reporting Automation"
      path="/pmo-reporting-automation"
      eyebrow="Guide"
      title="PMO reporting automation."
      subhead={`${siteConfig.tagline}. ${siteConfig.subline} — for growth-stage SMEs in the ${siteConfig.markets.primary} and ${siteConfig.markets.secondary}.`}
      answer={`${canonicalAnswers.packCycle} Automating that cycle is where ChisokuLabs starts — not with a multi-year PMO rebuild.`}
      bullets={[
        canonicalAnswers.reportingDrag,
        `Typical next step after a free baseline: PMO Automation Audit (${auditPriceRange}, ${siteConfig.pricing.timeline}).`,
        canonicalAnswers.systems,
      ]}
      primaryHref="/free-pmo-diagnostic"
      primaryLabel="Free PMO Diagnostic"
      secondaryHref="/pmo-automation-audit"
      secondaryLabel="PMO Automation Audit"
      sections={[
        {
          heading: "What breaks in the pack cycle",
          paragraphs: [
            "Most delivery teams already have tools — Jira, Sheets, Power BI, Slack or Teams. The drag is not “no data.” It is the glue work between systems: exports, paste, reconciliation, late narrative, and chasing forums for the weekly pack.",
            "That glue work compounds. Packs arrive stale. Escalations fire late. Leadership decides on last week’s spreadsheet. Operators lose hours that should go to delivery, not assembly.",
          ],
        },
        {
          heading: "What “automation” means here",
          paragraphs: [
            "PMO reporting automation means wiring the pack cycle so signals extract on cadence, rules keep freshness, AI assists narrative where judgment still matters, and packs distribute to the right owners — without pretending AI should own escalation alone.",
            "The stack ChisokuLabs uses in buyer language is Data → Integration → Logic → Interface. Human review stays on narrative and escalation. Dashboards without an operating owner are not the product.",
          ],
        },
        {
          heading: "A proof-safe path to start",
          paragraphs: [
            canonicalAnswers.path,
            "We do not guarantee ROI or time savings on a marketing page. The audit produces an ROI hypothesis from your operating map. Sample artifacts on this site are methodology excerpts, not client case studies.",
            `Markets: ${siteConfig.markets.primary} · ${siteConfig.markets.secondary}. Contact: ${siteConfig.email}.`,
          ],
        },
      ]}
    />
  );
}
