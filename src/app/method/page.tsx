import type { Metadata } from "next";
import { JsonLdScript } from "../../components/aeo/JsonLdScript";
import {
  ClaimCard,
  ConditionsTable,
  ContradictionTable,
  ElementCards,
  EvidenceRegister,
  ReportedVersusScore,
  ScoreKey,
} from "../../components/method/MethodVisuals";
import { ClaimFlow } from "../../components/method/ClaimFlow";
import { OfferClosing, SectionHead, offerCta } from "../../components/offers/OfferSections";
import { Button } from "../../components/ui/Button";
import { Section } from "../../components/ui/Section";
import { Sheet } from "../../components/ui/Sheet";
import {
  packJudgementNote,
  packMethodNote,
  packRecommendation,
  sampleLabel,
} from "../../content/samplePack";
import { breadcrumbJsonLd } from "../../lib/jsonLd";
import { pageMetadata } from "../../lib/seo";

// PRD 9.4. Headings and one-line tests are 9.4's; examples and their wording come from the sample pack.
const title = "READINESS-5: how we test a go-live claim";

export const metadata: Metadata = pageMetadata("/method");

export default function MethodPage() {
  return (
    <>
      <JsonLdScript
        id="method-breadcrumb-ld-json"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Method", path: "/method" },
        ])}
      />

      <Section
        tone="ink"
        containerClassName="grid gap-12 min-[1100px]:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] min-[1100px]:items-center min-[1100px]:gap-16"
      >
        <div>
          <h1 className="t-h1 max-w-[20ch] text-paper">{title}</h1>
          <p className="t-body mt-5 max-w-[58ch] text-paper/80">{packMethodNote}</p>
          <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
            <Button href={offerCta.review.href} variant="inverse" size="lg">
              {offerCta.review.label}
            </Button>
            <Button href={offerCta.samplePack.href} variant="inverse-outline" size="lg">
              {offerCta.samplePack.label}
            </Button>
          </div>
        </div>
        <ClaimCard id="T1" label={sampleLabel} />
      </Section>

      <Section tone="paper">
        <SectionHead title="The five elements" />
        <ClaimFlow className="mt-10" />
        <ElementCards />
        <p className="mt-6 text-[13px] text-muted">{sampleLabel}</p>
      </Section>

      <Section tone="page">
        <SectionHead title="Scoring">
          <p>A claim reported Green with 2 of 5 is an assumption, not a fact.</p>
        </SectionHead>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <ScoreKey />
          <ReportedVersusScore id="I1" />
        </div>
        <EvidenceRegister />
        <p className="mt-4 text-[13px] text-muted">{sampleLabel}</p>
      </Section>

      <Section tone="paper">
        <SectionHead title="Contradiction testing" />
        <ContradictionTable />
        <p className="mt-4 text-[13px] text-muted">{sampleLabel}</p>
      </Section>

      <Section tone="page">
        <SectionHead title="From findings to a decision">
          <p>Each condition names the evidence that closes it, its owner and the date that evidence is due.</p>
        </SectionHead>
        <div className="mt-10 grid gap-6 min-[1100px]:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          <Sheet className="flex flex-col gap-4 border-2 border-teal p-6 min-[641px]:p-8">
            <span className="self-start rounded-full bg-teal px-3 py-1 text-[13px] font-semibold text-paper">
              {packRecommendation.verdict}
            </span>
            <p className="t-body text-ink">{packRecommendation.summary}</p>
            <p className="t-small border-t border-line pt-4 text-ink">{packRecommendation.fallback}</p>
          </Sheet>
          <ConditionsTable />
        </div>
        <p className="mt-4 text-[13px] text-muted">{sampleLabel}</p>
      </Section>

      <Section tone="tint">
        <SectionHead title="What tooling does and doesn't do" />
        <ul className="mt-10 grid gap-4 min-[900px]:grid-cols-2">
          <li className="flex flex-col gap-3 rounded-sheet bg-paper p-6">
            <span className="font-[family-name:var(--font-display)] text-[15px] font-extrabold tracking-[0.02em] text-teal">
              Does
            </span>
            <span className="t-body text-ink">Extracts and cross-checks every claim.</span>
          </li>
          <li className="flex flex-col gap-3 rounded-sheet bg-paper p-6">
            <span className="font-[family-name:var(--font-display)] text-[15px] font-extrabold tracking-[0.02em] text-ink">
              Doesn&apos;t
            </span>
            <span className="t-body text-ink">Decide. A principal reviews every finding and makes the judgement.</span>
          </li>
        </ul>
        <p className="t-small mt-6 text-ink">{packJudgementNote}</p>
      </Section>

      <OfferClosing />
    </>
  );
}
