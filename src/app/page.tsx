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
  title: "AI Automation for Delivery Systems | PMO Reporting Audit",
  description:
    "Find the drag. Automate what repeats. ChisokuLabs builds AI automation into delivery systems—starting with the PMO reporting layer.",
  alternates: { canonical: "/" },
};

const proofTiles = [
  {
    title: "11+ years",
    detail: "PMO / delivery experience",
    icon: "years",
  },
  {
    title: "40+ FTE",
    detail: "Programme delivery exposure",
    icon: "fte",
  },
  {
    title: "UK fintech PMO",
    detail: "Regulated operating context",
    icon: "uk",
  },
  {
    title: "7-country",
    detail: "Programme context",
    icon: "world",
  },
] as const;

const trustPoints = [
  {
    label: "Moat",
    title: "AI workflow automation",
    detail:
      "Delivery ops automation — integrations plus LLM where narrative packs need intelligence.",
  },
  {
    label: "Wedge",
    title: "PMO reporting layer first",
    detail: "Fastest place delivery drag becomes visible — and automatable.",
  },
  {
    label: "Markets",
    title: "GCC · Singapore",
    detail: "Growth-stage SMEs with reporting, escalation, and PMO visibility gaps.",
  },
  {
    label: "After the call",
    title: "Audit, then optional Activate",
    detail: "Scope the audit first. Implementation follows only when the blueprint is real.",
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
              <p className="eyebrow hero-kicker">ChisokuLabs · AI for delivery systems</p>
              <h1 className="display hero-title !max-w-[14ch]">
                Find the drag. Automate what repeats.
              </h1>
              <p className="subhead hero-copy mt-4 !mb-0">
                For GCC and Singapore growth-stage SMEs. PMO reporting is the entry
                layer.
              </p>
            </div>
            <div className="hero-actions flex shrink-0 flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.diagnosticUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-primary"
              >
                Run Free PMO Diagnostic
              </a>
              <Link href="/pmo-automation-audit" className="button button-secondary">
                View PMO Automation Audit
              </Link>
            </div>
          </div>

          <PmoOperatingMap className="hero-map-reveal" />
        </div>
      </section>

      <section className="section bg-[var(--color-paper)]">
        <div className="container">
          <p className="eyebrow">Before the audit</p>
          <h2 className="headline">Operating drag.</h2>
          <p className="subhead mt-4">Current state in the reporting layer.</p>
          <div className="mt-10">
            <OperatingDragGrid />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Method</p>
          <h2 className="headline">AI Impact Model.</h2>
          <p className="subhead mt-4">
            PMO reporting is Assess → Architect. Implementation is Activate.
          </p>
          <div className="mt-10">
            <AiImpactModel compact />
          </div>
          <Link href="/method" className="button button-secondary mt-8">
            View method detail
          </Link>
        </div>
      </section>

      <section className="section bg-[var(--color-paper)]">
        <div className="container">
          <p className="eyebrow">The engagement</p>
          <h2 className="headline">Four phases. Four outputs.</h2>
          <p className="subhead mt-4">Map · Locate · Prioritize · Blueprint</p>
          <div className="mt-10">
            <AuditPathway />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">From drag to automation</p>
          <h2 className="headline">Manual pack → AI-assisted pack.</h2>
          <div className="mt-10">
            <PackCycleStrip />
          </div>
        </div>
      </section>

      <section className="section bg-[var(--color-paper)]">
        <div className="container">
          <p className="eyebrow">What you get back</p>
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
          <p className="eyebrow">Audit output</p>
          <h2 className="headline">Audit artifact.</h2>
          <div className="mt-10">
            <SampleAuditArtifact />
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[var(--color-muted)]">
              Blueprint ready? Continue to implementation fit.
            </p>
            <Link href="/implementation" className="button button-secondary">
              View Activate path
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <figure className="relative">
            <div className="absolute -left-4 -top-4 hidden h-full w-full border border-[rgba(17,24,32,0.14)] md:block" />
            <div className="relative overflow-hidden shadow-[0_34px_90px_rgba(17,24,32,0.18)]">
              <Image
                src="/images/founder-agam.png"
                alt="Agam Agrawwal, Founder of ChisokuLabs"
                width={1254}
                height={1254}
                className="aspect-[4/5] w-full object-cover object-[50%_18%]"
                priority
              />
            </div>
          </figure>
          <div>
            <p className="eyebrow">Founder</p>
            <h2 className="headline">Delivery rooms, not decks.</h2>
            <p className="subhead mt-4">
              PMO delivery leadership + AI automation practice.
            </p>
            <div className="report-board paper-grain mt-8 grid sm:grid-cols-2">
              {proofTiles.map((tile, index) => (
                <div
                  key={tile.title}
                  className={[
                    "p-5",
                    index < 2 ? "border-b border-[rgba(17,24,32,0.1)]" : "",
                    index % 2 === 0 ? "sm:border-r sm:border-[rgba(17,24,32,0.1)]" : "",
                  ].join(" ")}
                >
                  <ProofIcon type={tile.icon} />
                  <div className="mt-3 font-[family-name:var(--font-display)] text-xl font-bold tracking-[-0.02em]">
                    {tile.title}
                  </div>
                  <div className="mt-1 text-sm text-[var(--color-muted)]">{tile.detail}</div>
                </div>
              ))}
            </div>
            <Link href="/founder-track-record" className="button button-secondary mt-8">
              View founder detail
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-[var(--color-paper)]">
        <div className="container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="eyebrow">Start here</p>
            <h2 className="headline">5-minute PMO baseline.</h2>
            <p className="subhead mt-4">
              See where AI automation can remove reporting drag.
            </p>
            <a
              href={siteConfig.diagnosticUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary mt-8"
            >
              Run Free Diagnostic
            </a>
          </div>
          <DiagnosticOrbit />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Why this, now</p>
          <h2 className="headline">Clarity before commitment.</h2>
          <div className="mt-10 grid gap-8 border-t border-[rgba(17,24,32,0.14)] pt-8 md:grid-cols-2 xl:grid-cols-4">
            {trustPoints.map((point) => (
              <div key={point.label}>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-cyan-strong)]">
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
          <p className="mt-8 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-muted)]">
            Systems we automate against · {siteConfig.systems.join(" · ")}
          </p>
        </div>
      </section>

      <section className="section dark-band photo-atmosphere photo-atmosphere-dark">
        <div className="photo-atmosphere-media" aria-hidden>
          <Image
            src="/images/founder-agam.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[50%_18%]"
          />
        </div>
        <div className="container relative z-[1] max-w-4xl text-center">
          <p className="eyebrow !text-[rgba(0,166,200,0.9)]">Next step</p>
          <h2 className="headline mx-auto !max-w-xl">
            Run the diagnostic. Then map the audit.
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={siteConfig.diagnosticUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-light"
            >
              Run Free PMO Diagnostic
            </a>
            <Link href="/contact" className="button button-line-light">
              Book Audit Fit Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ProofIcon({ type }: { type: (typeof proofTiles)[number]["icon"] }) {
  switch (type) {
    case "years":
      return (
        <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
          <rect x="4" y="6" width="24" height="20" rx="2" fill="none" stroke="rgba(17,24,32,0.35)" strokeWidth="2" />
          <path d="M4 12 H28" stroke="#00A6C8" strokeWidth="2" />
        </svg>
      );
    case "fte":
      return (
        <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
          <circle cx="10" cy="12" r="3" fill="#111820" />
          <circle cx="22" cy="12" r="3" fill="#111820" />
          <path d="M5 24c0-3 2.5-5 5-5s5 2 5 5 M17 24c0-3 2.5-5 5-5s5 2 5 5" fill="none" stroke="#00A6C8" strokeWidth="2" />
        </svg>
      );
    case "uk":
      return (
        <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
          <rect x="5" y="8" width="22" height="16" rx="2" fill="none" stroke="rgba(17,24,32,0.35)" strokeWidth="2" />
          <path d="M5 16 H27 M16 8 V24" stroke="#00A6C8" strokeWidth="2" />
        </svg>
      );
    case "world":
      return (
        <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
          <circle cx="16" cy="16" r="10" fill="none" stroke="rgba(17,24,32,0.35)" strokeWidth="2" />
          <ellipse cx="16" cy="16" rx="5" ry="10" fill="none" stroke="#00A6C8" strokeWidth="2" />
          <path d="M6 16 H26" stroke="rgba(17,24,32,0.25)" strokeWidth="2" />
        </svg>
      );
    default: {
      const _exhaustive: never = type;
      return _exhaustive;
    }
  }
}
