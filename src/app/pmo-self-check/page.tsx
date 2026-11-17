import type { Metadata } from "next";
import { PmoSelfCheck } from "../../components/selfCheck/PmoSelfCheck";
import { Section } from "../../components/ui/Section";
import { selfCheckPitch } from "../../content/offer";
import { selfCheckFooter } from "../../content/pmoSelfCheck";
import { pageMetadata } from "../../lib/seo";
import Link from "next/link";

export const metadata: Metadata = pageMetadata("/pmo-self-check");

/** /pmo-self-check (September port PRD, Epic 5). Indexed; computed in the browser; no answers stored or sent. */
export default function PmoSelfCheckPage() {
  return (
    <>
      <Section className="report-cover">
        <p className="eyebrow">Free, five minutes</p>
        <h1 className="t-h1 max-w-[20ch] text-ink">PMO self-check</h1>
        <p className="t-body mt-5 max-w-[60ch] text-muted">{selfCheckPitch}</p>
      </Section>
      <Section tone="paper">
        <PmoSelfCheck />
        <p className="t-small mt-12 max-w-[68ch] text-muted" data-self-check-footer>
          {selfCheckFooter}{" "}
          <Link href="/pmo-self-check/methodology" className="text-teal underline underline-offset-4">
            Methodology note
          </Link>
        </p>
      </Section>
    </>
  );
}
