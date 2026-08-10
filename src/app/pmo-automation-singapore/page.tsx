import type { Metadata } from "next";
import { GuidePage } from "../../components/aeo/GuidePage";
import { canonicalAnswers } from "../../lib/aeoContent";
import { auditPriceRange, siteConfig } from "../../lib/siteConfig";

const title = "PMO Automation for Singapore Growth-Stage SMEs";
const description =
  "ChisokuLabs PMO reporting automation for Singapore growth-stage SMEs — Free PMO Diagnostic, PMO Automation Audit, and optional implementation.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/pmo-automation-singapore" },
  openGraph: {
    title: `${title} | ChisokuLabs`,
    description,
    url: `${siteConfig.url}/pmo-automation-singapore`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ChisokuLabs`,
    description,
    images: ["/og.png"],
  },
};

export default function SingaporePage() {
  return (
    <GuidePage
      breadcrumbName="Singapore"
      path="/pmo-automation-singapore"
      eyebrow="Market · Singapore"
      title="PMO automation for Singapore SMEs."
      subhead={`${canonicalAnswers.whatWeDo} Singapore is a primary market alongside the GCC.`}
      answer={`For Singapore growth-stage SMEs with reporting or PMO visibility drag, we start at the pack cycle — Free PMO Diagnostic, then a scoped PMO Automation Audit (typically ${auditPriceRange}, ${siteConfig.pricing.timeline}).`}
      bullets={[
        canonicalAnswers.whoFor,
        canonicalAnswers.systems,
        "Engagement language and pricing in USD; scope confirmed on the fit call.",
      ]}
      primaryHref="/free-pmo-diagnostic"
      primaryLabel="Free PMO Diagnostic"
      secondaryHref="/contact"
      secondaryLabel="Book Audit Fit Call"
      sections={[
        {
          heading: "Why Singapore teams feel pack-cycle drag",
          paragraphs: [
            "Growth-stage Singapore operators often run multi-tool stacks across delivery and leadership forums. The pain is rarely “we need another dashboard.” It is hours lost assembling status, reconciling sources, and distributing packs that are already late.",
            "ChisokuLabs treats Singapore as a focus market for the same ladder used globally on this site: baseline → blueprint → optional build — without selling multi-year PMO rebuild theatre.",
          ],
        },
        {
          heading: "What a Singapore engagement looks like",
          paragraphs: [
            "Remote-friendly discovery interviews, system access for the reporting layer, and a blueprint you can take to leadership. Implementation follows only when the audit shows clear ownership and fit.",
            `${canonicalAnswers.noRoiGuarantee} Founder track-record metrics on this site are career delivery leadership, not Singapore client ROI case studies.`,
          ],
        },
        {
          heading: "Related reading",
          paragraphs: [
            "Compare Diagnostic vs Audit, read the PMO reporting automation guide, or review the audit offer page for deliverables and timeline.",
          ],
        },
      ]}
    />
  );
}
