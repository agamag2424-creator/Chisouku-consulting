import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PmoOperatingMap } from "../components/artifacts/PmoOperatingMap";
import { OperatingDragGrid } from "../components/artifacts/OperatingDragGrid";
import { AuditPathway } from "../components/artifacts/AuditPathway";
import { SampleAuditArtifact } from "../components/artifacts/SampleAuditArtifact";
import { DiagnosticOrbit } from "../components/artifacts/DiagnosticOrbit";
import { AiImpactModel } from "../components/artifacts/AiImpactModel";
import { PackCycleStrip } from "../components/artifacts/PackCycleStrip";
import { PackDragEstimator } from "../components/artifacts/PackDragEstimator";
import { siteConfig } from "../lib/siteConfig";

export const metadata: Metadata = {
  title: {
    absolute: "PMO Reporting Automation | ChisokuLabs",
  },
  description:
    "Find the drag. Automate what repeats. ChisokuLabs builds AI automation into delivery systems—starting with the PMO reporting layer for growth-stage SMEs in the GCC and Singapore.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "PMO Reporting Automation | ChisokuLabs",
    description:
      "Find delivery drag in the PMO reporting layer—then automate what repeats.",
    url: siteConfig.url,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PMO Reporting Automation | ChisokuLabs",
    description:
      "Starting with the PMO reporting layer for GCC and Singapore growth-stage SMEs.",
    images: ["/og.png"],
  },
};

const trustPoints = [
  {
    label: "Capability",
    title: "AI workflow automation",
    detail:
      "Delivery ops automation — integrations plus intelligence where narrative packs need judgment.",
  },
  {
    label: "Starting point",
    title: "PMO reporting layer first",
    detail: "Fastest place delivery drag becomes visible — and automatable.",
  },
  {
    label: "Markets",
    title: "GCC, Singapore",
    detail: "Growth-stage SMEs with reporting, escalation, and PMO visibility gaps.",
  },
  {
    label: "After the call",
    title: "Audit, then optional implementation",
    detail: "Scope the audit first. Implementation follows only when the blueprint is real.",
  },
] as const;

const engagementPath = [
  {
    number: "1",
    outcome: "Baseline",
    title: "Free PMO Diagnostic",
    detail:
      "A five-minute baseline of reporting maturity, operating drag, and automation fit.",
    href: "/free-pmo-diagnostic",
  },
  {
    number: "2",
    outcome: "Blueprint",
    title: "PMO Automation Audit",
    detail:
      "Map the pack cycle, prioritize opportunities, and leave with an implementation blueprint.",
    href: "/pmo-automation-audit",
  },
  {
    number: "3",
    outcome: "Implementation",
    title: "AI automation for delivery systems",
    detail:
      "Build the approved automation into delivery workflows—starting with PMO reporting.",
    href: "/implementation",
  },
] as const;

export default function Home() {
  return (
    <>
      <section className="section report-cover photo-atmosphere pt-10 md:pt-14">
        <div className="photo-atmosphere-media" aria-hidden>
          <Image
            src="/images/pmo-operating-map-cover.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="container relative">
          <div className="mb-8 flex flex-col gap-6 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="display !max-w-[14ch]">
                Find the drag. Automate what repeats.
              </h1>
              <p className="subhead mt-4 !mb-0 !max-w-xl">
                {siteConfig.subline} — the fastest place delivery drag becomes
                visible, measurable, and automatable.
              </p>
              <p className="mt-5 !mb-0 text-[13px] font-bold text-[var(--color-muted)]">
                Markets: GCC, Singapore
              </p>
            </div>
            <div className="hero-actions flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link href="/free-pmo-diagnostic" className="button button-primary">
                Free PMO Diagnostic
              </Link>
              <Link href="/pmo-automation-audit" className="button button-secondary">
                View PMO Automation Audit
              </Link>
            </div>
          </div>

          <PmoOperatingMap />
        </div>
      </section>

      <section className="section bg-[var(--color-paper)]">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <h2 className="headline !max-w-[12ch]">Diagnostic. Audit. Implementation.</h2>
            </div>
            <p className="subhead !mb-0 lg:max-w-2xl lg:justify-self-end">
              PMO reporting is where we begin. AI automation for delivery systems
              is where the path leads.
            </p>
          </div>

          <div
            className="mt-14 grid border-y border-ink/14 md:grid-cols-3"
            aria-label="ChisokuLabs engagement pathway"
          >
            {engagementPath.map((step, index) => (
              <Link
                key={step.number}
                href={step.href}
                className={[
                  "relative block min-h-[260px] overflow-hidden p-7 md:p-8 transition-colors hover:bg-teal/6",
                  index < engagementPath.length - 1
                    ? "border-b border-ink/12 md:border-b-0 md:border-r"
                    : "bg-teal/4",
                ].join(" ")}
              >
                <div className="relative flex h-full min-h-[196px] flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[13px] font-bold text-[var(--color-cyan-strong)]">
                      {step.number}
                    </span>
                    <span className="text-[13px] font-bold text-[var(--color-muted)]">
                      {step.outcome}
                    </span>
                  </div>
                  <h3 className="mt-10 max-w-[18ch] font-[family-name:var(--font-display)] text-2xl font-bold tracking-[-0.03em] text-[var(--color-ink)]">
                    {step.title}
                  </h3>
                  <p className="mt-auto pt-6 text-sm leading-relaxed text-[var(--color-muted)]">
                    {step.detail}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="headline">Operating drag.</h2>
          <p className="subhead mt-4">Current state in the reporting layer.</p>
          <div className="mt-10">
            <OperatingDragGrid />
          </div>
        </div>
      </section>

      <section className="section bg-[var(--color-paper)]">
        <div className="container">
          <h2 className="headline">AI Impact Model.</h2>
          <p className="subhead mt-4">
            PMO reporting is Assess, then Architect. Implementation is Activate.
          </p>
          <div className="mt-10">
            <AiImpactModel compact />
          </div>
          <Link href="/method" className="button button-secondary mt-8">
            View method detail
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="headline">Four phases. Four outputs.</h2>
          <p className="subhead mt-4">Map, Locate, Prioritize, Blueprint</p>
          <div className="mt-10">
            <AuditPathway />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="headline">Manual pack, then AI-assisted pack.</h2>
          <div className="mt-10">
            <PackCycleStrip />
          </div>
        </div>
      </section>

      <section className="section bg-[var(--color-paper)]">
        <div className="container">
          <h2 className="headline">Time. Cost. Fresh packs.</h2>
          <p className="subhead mt-4">
            See what reporting drag is costing you — then validate with the free
            diagnostic.
          </p>
          <div className="mt-10">
            <PackDragEstimator />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="headline">Audit artifact.</h2>
          <div className="mt-10">
            <SampleAuditArtifact />
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[var(--color-muted)]">
              Blueprint ready? Continue to the implementation path.
            </p>
            <Link href="/implementation" className="button button-secondary">
              View implementation path
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl">
          <h2 className="headline">Delivery rooms, not decks.</h2>
          <p className="subhead mt-4">
            Work starts in the reporting layer — map drag, score automation fit,
            leave a blueprint. Implementation only when ownership is real.
          </p>
          <Link href="/method" className="button button-secondary mt-8">
            View AI Impact Model
          </Link>
        </div>
      </section>

      <section className="section bg-[var(--color-paper)]">
        <div className="container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <h2 className="headline">5-minute PMO baseline.</h2>
            <p className="subhead mt-4">
              See where AI automation can remove reporting drag.
            </p>
            <Link href="/free-pmo-diagnostic" className="button button-primary mt-8">
              Free PMO Diagnostic
            </Link>
          </div>
          <DiagnosticOrbit />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="headline">Clarity before commitment.</h2>
          <div className="mt-10 grid gap-8 border-t border-ink/14 pt-8 md:grid-cols-2 xl:grid-cols-4">
            {trustPoints.map((point) => (
              <div key={point.label}>
                <p className="text-[13px] font-bold text-[var(--color-cyan-strong)]">
                  {point.label}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-bold tracking-[-0.02em]">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {point.detail}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[13px] font-bold text-[var(--color-muted)]">
            Systems we automate against: {siteConfig.systems.join(", ")}
          </p>
        </div>
      </section>

      <section className="section bg-[var(--color-paper)]">
        <div className="container">
          <h2 className="headline">Guides for Google and buyers.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              {
                href: "/pmo-reporting-automation",
                title: "PMO reporting automation",
                detail: "Automate the pack cycle without a multi-year rebuild.",
              },
              {
                href: "/diagnostic-vs-audit",
                title: "Diagnostic vs Audit",
                detail: "Free baseline versus paid blueprint — when to use each.",
              },
              {
                href: "/pmo-automation-singapore",
                title: "Singapore",
                detail: "Growth-stage SMEs — same ladder, Singapore focus.",
              },
              {
                href: "/pmo-automation-gcc",
                title: "GCC",
                detail: "GCC growth-stage SMEs — diagnostic, audit, optional build.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="artifact-sheet block p-6 transition-colors hover:border-teal/35"
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold tracking-[-0.02em] text-[var(--color-ink)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {item.detail}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-band atmosphere-band">
        <div className="container max-w-4xl text-center">
          <h2 className="headline mx-auto !max-w-xl">
            Run the diagnostic. Then map the audit.
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/free-pmo-diagnostic" className="button button-light">
              Free PMO Diagnostic
            </Link>
            <Link href="/pmo-automation-audit" className="button button-line-light">
              View PMO Automation Audit
            </Link>
          </div>
          <p className="mt-6 text-sm text-paper/72">
            Ready to talk?{" "}
            <Link href="/contact" className="font-semibold text-paper underline-offset-4 hover:underline">
              Book Audit Fit Call
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
