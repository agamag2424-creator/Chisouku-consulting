import type { Metadata } from "next";
import { Fragment } from "react";
import { ComparisonTable } from "../components/compare/ComparisonTable";
import { EvidenceCheckHero } from "../components/hero/EvidenceCheckHero";
import {
  BriefIllustration,
  CrossCheckStrip,
  IndependencePanel,
  ReadinessTiles,
  VerdictCards,
  WorkstreamMap,
} from "../components/home/HomeVisuals";
import { OfferPanels } from "../components/home/OfferPanels";
import { PrincipalBlock } from "../components/trust/PrincipalBlock";
import { BookCallButton } from "../components/ui/BookCallButton";
import { Button } from "../components/ui/Button";
import { Section } from "../components/ui/Section";
import { Sheet } from "../components/ui/Sheet";
import { pageMetadata } from "../lib/seo";
import { calendlyLink, siteConfig } from "../lib/siteConfig";
import { cn } from "../lib/utils";

export const metadata: Metadata = pageMetadata("/");

const CTA = {
  review: { href: "/contact?request=review", label: "Discuss your programme" },
  brief: { href: "/contact?request=brief", label: "Request a free briefing" },
} as const;

/** One sentence. A real space sits before any later line break, and the H1 stays one text block. */
const positioningLines = siteConfig.positioning.split(/(?<=\.)\s+/);

/** Heading beside text from 1100px; stacked below. */
const split = "grid gap-6 min-[1100px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] min-[1100px]:gap-16";

const verdicts = [
  { verdict: "Healthy", detail: "The evidence supports the status being reported." },
  { verdict: "Needs attention", detail: "Named gaps, owners and dates that must be closed first." },
  { verdict: "At risk", detail: "What is missing, and the 30-day fix plan to recover." },
] as const;

export default function Home() {
  return (
    <>
      <Section
        tone="ink"
        containerClassName="grid gap-12 min-[1200px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] min-[1200px]:items-center min-[1200px]:gap-16"
      >
        <div>
          <h1 className="t-h1 max-w-[22ch] text-paper">
            {positioningLines.map((line, index) => (
              <Fragment key={line}>
                {index > 0 && (
                  <>
                    {" "}
                    <br />
                  </>
                )}
                {line}
              </Fragment>
            ))}
          </h1>
          <p className="t-body mt-5 max-w-[46ch] text-paper/75">{siteConfig.heroSub}</p>
          <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
            <Button
              href={calendlyLink("hero")}
              variant="inverse"
              size="lg"
              ctaId="book_call"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a 30-minute call
            </Button>
            <Button href={CTA.review.href} variant="inverse-outline" size="lg">
              {CTA.review.label}
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="What we look at">
            {siteConfig.homeStrip.map((item) => (
              <li key={item} className="rounded-full border border-paper/25 px-3 py-1.5 text-[13px] text-paper/85">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <EvidenceCheckHero />
      </Section>

      <Section tone="paper">
        <div className={split}>
          <h2 className="t-h2 text-ink">Every project reports its own status. Nobody owns the whole picture.</h2>
          <p className="t-body text-muted">
            RAID logs grow, but actions don&apos;t close. Status turns Red the week it&apos;s too late to change anything.
            Leadership is asked to act on reports written by the people being judged on delivery. We don&apos;t assume anyone
            is misleading you. We check whether the evidence supports what is being reported.
          </p>
        </div>
        <WorkstreamMap />
      </Section>

      <Section tone="page">
        <div className={cn(split, "min-[1100px]:items-end")}>
          <h2 className="t-h2 text-ink">Five questions for every critical claim.</h2>
          <p className="t-body text-muted">
            HEALTH-5: for every programme, is the status current, owned, evidenced, dated and actioned?
          </p>
        </div>
        <ReadinessTiles />
        <CrossCheckStrip
          action={
            <Button href="/method" variant="text" className="text-teal-tint">
              How HEALTH-5 works
            </Button>
          }
        >
          Then we check the claims against each other, because the most expensive risks sit between projects, reports and
          forums, not inside any one of them.
        </CrossCheckStrip>
      </Section>

      <Section tone="paper">
        <h2 className="t-h2 text-ink">A score you can act on.</h2>
        <VerdictCards verdicts={verdicts} />
        <p className="t-body mt-7 max-w-[62ch] text-muted">
          Scored on the Project Health Scorecard: scope, schedule, risk, resourcing and stakeholder communications.
        </p>
      </Section>

      <Section tone="page">
        <h2 className="t-h2 text-ink">Start with one programme, or go straight to a portfolio audit.</h2>
        <OfferPanels />
      </Section>

      <Section tone="paper">
        <h2 className="t-h2 text-ink">See the work before you talk to us.</h2>
        <ul className="mt-12 grid gap-6 min-[900px]:grid-cols-2">
          <li>
            <Sheet className="flex h-full flex-col gap-3 overflow-hidden p-6 min-[641px]:p-8">
              <BriefIllustration />
              <h3 className="t-h3 text-ink">A free one-page briefing on your programme</h3>
              <p className="t-small text-muted">Prepared from public information.</p>
              <div className="mt-auto flex flex-col gap-3 pt-3 min-[480px]:flex-row min-[480px]:flex-wrap">
                <Button href={CTA.brief.href} variant="secondary">
                  {CTA.brief.label}
                </Button>
                <BookCallButton content="brief" size="md" />
              </div>
            </Sheet>
          </li>
        </ul>
      </Section>

      <Section tone="page">
        <h2 className="t-h2 text-ink">Why not the usual options</h2>
        <ComparisonTable id="home-comparison" rows={4} className="mt-10" />
        <div className="mt-6">
          <Button href="/pricing" variant="text">
            Pricing
          </Button>
        </div>
      </Section>

      <Section tone="tint">
        <div className={split}>
          <div>
            <h2 className="t-h2 text-ink">No stake in your delivery.</h2>
            <p className="t-body mt-6 text-ink">
              We take no implementation fees, resell no software and hold no retainer. Your documents are processed under
              a written data-handling policy: never used to train models, deleted within 30 days of the final readout
              unless you ask us to keep them.
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

      <PrincipalBlock id="principal" />

      <Section tone="ink">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 className="t-h2 max-w-[22ch] text-paper">
            Not sure what your status reports are telling you? Start with one programme.
          </h2>
          <div className="flex w-full flex-col gap-3 min-[480px]:w-auto min-[480px]:flex-row min-[480px]:flex-wrap">
            <Button href={CTA.review.href} variant="inverse" size="lg">
              {CTA.review.label}
            </Button>
            <Button href={CTA.brief.href} variant="inverse-outline" size="lg">
              {CTA.brief.label}
            </Button>
            <BookCallButton content="closing" variant="inverse-outline" />
          </div>
        </div>
      </Section>
    </>
  );
}
