import type { Metadata } from "next";
import { EvidenceCheckHero } from "../components/hero/EvidenceCheckHero";
import {
  BriefIllustration,
  CrossCheckStrip,
  IndependencePanel,
  PackIllustration,
  PrincipalChips,
  PrincipalSignature,
  ReadinessTiles,
  VerdictCards,
  WeekStrip,
  WorkstreamMap,
} from "../components/home/HomeVisuals";
import { OfferPanels } from "../components/home/OfferPanels";
import { SlipCostEstimator } from "../components/home/SlipCostEstimator";
import { Button } from "../components/ui/Button";
import { Section } from "../components/ui/Section";
import { Sheet } from "../components/ui/Sheet";
import { defaultTitle, ogImage } from "../lib/seo";
import { siteConfig } from "../lib/siteConfig";
import { cn } from "../lib/utils";

const description =
  "Before leadership approves a major ERP or core-platform go-live, ChisokuLabs independently tests whether every critical readiness claim has the status, owner, evidence, date and action to defend that decision.";

export const metadata: Metadata = {
  title: { absolute: defaultTitle },
  description,
  alternates: { canonical: siteConfig.url },
  // Nested metadata replaces the layout's, so the share image is repeated here.
  openGraph: { type: "website", title: defaultTitle, description, url: siteConfig.url, images: [ogImage] },
  twitter: { card: "summary_large_image", title: defaultTitle, description, images: [ogImage.url] },
};

const CTA = {
  review: { href: "/contact?request=review", label: "Discuss your programme" },
  brief: { href: "/contact?request=brief", label: "Request a free readiness brief" },
  samplePack: { href: "/see-it-first#sample-pack", label: "See a full sample decision pack" },
} as const;

/** Heading beside text from 1100px; stacked below. */
const split = "grid gap-6 min-[1100px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] min-[1100px]:gap-16";

const verdicts = [
  { verdict: "Go", detail: "The evidence supports the date." },
  { verdict: "Conditional Go", detail: "Named conditions, owners and dates that must be met first." },
  { verdict: "No-Go", detail: "What is missing and the shortest path back to a date." },
] as const;

export default function Home() {
  return (
    <>
      {/* 1. Hero (ink band, PRD 9.12) */}
      <Section
        tone="ink"
        containerClassName="grid gap-12 min-[1200px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] min-[1200px]:items-center min-[1200px]:gap-16"
      >
        <div>
          <h1 className="t-h1 max-w-[18ch] text-paper">{siteConfig.positioning}</h1>
          <p className="t-body mt-5 max-w-[46ch] text-paper/75">
            Independent go-live decision assurance for ERP and core-platform programmes in the UAE and Saudi Arabia.
          </p>
          <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
            <Button href={CTA.review.href} variant="inverse" size="lg">
              {CTA.review.label}
            </Button>
            <Button href={CTA.samplePack.href} variant="inverse-outline" size="lg">
              {CTA.samplePack.label}
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Platforms">
            {siteConfig.platforms.map((platform) => (
              <li key={platform} className="rounded-full border border-paper/25 px-3 py-1.5 text-[13px] text-paper/85">
                {platform}
              </li>
            ))}
          </ul>
        </div>
        <EvidenceCheckHero />
      </Section>

      {/* 2. The problem */}
      <Section tone="paper">
        <div className={split}>
          <h2 className="t-h2 text-ink">Every workstream can explain its piece. Nobody owns the whole picture.</h2>
          <p className="t-body text-muted">
            Testing reports a pass rate. Migration reports a reconciliation. Cutover has a plan. The system integrator has an
            opinion, and its final milestone depends on the date holding. Weeks before go-live, leadership is asked to
            approve a decision on reports written by the people being judged on delivery. We don&apos;t assume anyone is
            misleading you. We check whether the evidence supports what is being reported.
          </p>
        </div>
        <WorkstreamMap />
      </Section>

      {/* 3. How we test readiness: the 9.1 body, split around the tiles */}
      <Section tone="page">
        <div className={cn(split, "min-[1100px]:items-end")}>
          <h2 className="t-h2 text-ink">Five questions for every critical claim.</h2>
          <p className="t-body text-muted">
            For each readiness claim across testing, data migration, integration, cutover and governance, we ask:
          </p>
        </div>
        <ReadinessTiles />
        <CrossCheckStrip
          action={
            <Button href="/method" variant="text" className="text-teal-tint">
              How READINESS-5 works
            </Button>
          }
        >
          Then we check the claims against each other, because the most expensive risks sit between workstreams.
        </CrossCheckStrip>
      </Section>

      {/* 4. What you get */}
      <Section tone="paper">
        <h2 className="t-h2 text-ink">A decision you can defend.</h2>
        <VerdictCards verdicts={verdicts} />
        <div className="mt-7">
          <Button href={CTA.samplePack.href} variant="text">
            {CTA.samplePack.label}
          </Button>
        </div>
      </Section>

      {/* 4a. What a slipped go-live costs (PRD 9.11; copy pending IN-7) */}
      <Section tone="page">
        <div className={cn(split, "min-[1100px]:items-end")}>
          <h2 className="t-h2 text-ink">What a slipped go-live costs.</h2>
          <p className="t-body text-muted">
            Put in your own numbers. When a go-live date moves, the programme team, the system integrator and the current
            system all keep running.
          </p>
        </div>
        <SlipCostEstimator />
      </Section>

      {/* 5. Offers */}
      <Section tone="paper">
        <h2 className="t-h2 text-ink">Start small, or go straight to a decision.</h2>
        <OfferPanels />
      </Section>

      {/* 6. See it before you sign */}
      <Section tone="page">
        <h2 className="t-h2 text-ink">See the work before you talk to us.</h2>
        <ul className="mt-12 grid gap-6 min-[900px]:grid-cols-2">
          <li>
            <Sheet className="flex h-full flex-col gap-3 overflow-hidden p-6 min-[641px]:p-8">
              <PackIllustration />
              <h3 className="t-h3 text-ink">The full sample decision pack</h3>
              <p className="t-small text-muted">View or download, no form.</p>
              <div className="mt-auto pt-3">
                <Button href={CTA.samplePack.href}>{CTA.samplePack.label}</Button>
              </div>
            </Sheet>
          </li>
          <li>
            <Sheet className="flex h-full flex-col gap-3 overflow-hidden p-6 min-[641px]:p-8">
              <BriefIllustration />
              <h3 className="t-h3 text-ink">A free readiness brief on your programme</h3>
              <p className="t-small text-muted">Prepared from public information.</p>
              <div className="mt-auto pt-3">
                <Button href={CTA.brief.href} variant="secondary">
                  {CTA.brief.label}
                </Button>
              </div>
            </Sheet>
          </li>
          {siteConfig.selfCheck.live && siteConfig.selfCheck.url && (
            <li>
              <Sheet className="flex h-full flex-col p-6 min-[641px]:p-8">
                <h3 className="t-h3 text-ink">The Readiness Self-Check</h3>
                <div className="mt-auto pt-6">
                  <Button href={siteConfig.selfCheck.url} variant="secondary">
                    The Readiness Self-Check
                  </Button>
                </div>
              </Sheet>
            </li>
          )}
        </ul>
      </Section>

      {/* 7. Why not the usual options: the compact comparison table arrives with E5.2 */}
      <Section tone="paper">
        <h2 className="t-h2 text-ink">Why not the usual options</h2>
        <div className="mt-6">
          <Button href="/pricing" variant="text">
            Pricing
          </Button>
        </div>
      </Section>

      {/* 8. Independent, and careful with your data */}
      <Section tone="tint">
        <div className={split}>
          <div>
            <h2 className="t-h2 text-ink">No stake in your go-live date.</h2>
            <p className="t-body mt-6 text-ink">
              We take no implementation fees, resell no software and hold no system integrator partnerships. Your
              documents are processed under a written data-handling policy: never used to train models, deleted at the end
              of the engagement unless you ask us to keep them.
            </p>
            <div className="mt-6">
              <Button href="/independence-and-data" variant="text">
                Independence and data handling
              </Button>
            </div>
          </div>
          <IndependencePanel />
        </div>
      </Section>

      {/* 9. Principal-led (PRD 8.3, IN-3 approved) */}
      {siteConfig.principalBlock && (
        <Section tone="paper">
          <div className={cn(split, "min-[1100px]:items-center")}>
            <div className="flex flex-col gap-5">
              <h2 className="t-h2 text-ink">Principal-led</h2>
              <PrincipalSignature />
            </div>
            <div className="flex flex-col gap-6">
              <p className="t-body text-ink">
                Every review is led and signed by a principal with 11+ years leading ERP and transformation programmes
                across aviation, banking and manufacturing, including multi-country go-lives.
              </p>
              <PrincipalChips />
            </div>
          </div>
        </Section>
      )}

      {/* 10. Closing CTA (ink band) */}
      <Section tone="ink">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 className="t-h2 max-w-[18ch] text-paper">Six weeks from go-live? Start with the evidence.</h2>
          <div className="flex w-full flex-col gap-3 min-[480px]:w-auto min-[480px]:flex-row min-[480px]:flex-wrap">
            <Button href={CTA.review.href} variant="inverse" size="lg">
              {CTA.review.label}
            </Button>
            <Button href={CTA.brief.href} variant="inverse-outline" size="lg">
              {CTA.brief.label}
            </Button>
          </div>
        </div>
        <WeekStrip />
      </Section>
    </>
  );
}
