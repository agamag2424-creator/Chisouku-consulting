import type { Metadata } from "next";
import { GuidePage } from "../../components/aeo/GuidePage";
import { canonicalAnswers } from "../../lib/aeoContent";
import { auditPriceRange, siteConfig } from "../../lib/siteConfig";

const title = "Free PMO Diagnostic vs PMO Automation Audit";
const description =
  "When to run the Free PMO Diagnostic versus buying the PMO Automation Audit — baseline vs blueprint, cost, timeline, and what each produces.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/diagnostic-vs-audit" },
  openGraph: {
    title: `${title} | ChisokuLabs`,
    description,
    url: `${siteConfig.url}/diagnostic-vs-audit`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ChisokuLabs`,
    description,
    images: ["/og.png"],
  },
};

export default function DiagnosticVsAuditPage() {
  return (
    <GuidePage
      breadcrumbName="Diagnostic vs Audit"
      path="/diagnostic-vs-audit"
      eyebrow="Compare"
      title="Diagnostic vs Audit."
      subhead="One is a free five-minute baseline. The other is a paid blueprint engagement. They are sequential — not substitutes."
      answer={canonicalAnswers.path}
      bullets={[
        `Diagnostic: free, directional, no login — ${siteConfig.diagnosticUrl}`,
        `Audit: typically ${auditPriceRange} · ${siteConfig.pricing.timeline} · blueprint + fit score`,
        "Skip the diagnostic only when reporting drag is already obvious and ownership is clear.",
      ]}
      primaryHref="/free-pmo-diagnostic"
      primaryLabel="Free PMO Diagnostic"
      secondaryHref="/pmo-automation-audit"
      secondaryLabel="PMO Automation Audit"
      sections={[
        {
          heading: "What the Free PMO Diagnostic is for",
          paragraphs: [
            canonicalAnswers.diagnostic,
            "Use it when you need a shared language for maturity and AI readiness before asking leadership for an audit budget. The score is directional — enough to expose gaps worth investigating, not a substitute for interviews and system mapping.",
          ],
        },
        {
          heading: "What the PMO Automation Audit is for",
          paragraphs: [
            canonicalAnswers.audit,
            "Buy the audit when pack-cycle friction is material, someone owns reporting or delivery visibility, and you need a go/no-go for implementation — not another strategy deck.",
          ],
        },
        {
          heading: "When you can skip the diagnostic",
          paragraphs: [
            "If operators already agree the pack cycle is broken, tools and owners are known, and leadership wants a blueprint in days not weeks, go straight to an Audit Fit Call. The diagnostic still helps when stakeholders disagree on how bad the drag is.",
            `After either path: optional implementation only when ownership and blueprint are real. ${canonicalAnswers.noRoiGuarantee}`,
          ],
        },
      ]}
    />
  );
}
