import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PmoOperatingMap } from "../components/artifacts/PmoOperatingMap";
import { OperatingDragGrid } from "../components/artifacts/OperatingDragGrid";
import { AuditPathway } from "../components/artifacts/AuditPathway";
import { SampleAuditArtifact } from "../components/artifacts/SampleAuditArtifact";
import { DiagnosticOrbit } from "../components/artifacts/DiagnosticOrbit";
import { siteConfig } from "../lib/siteConfig";

export const metadata: Metadata = {
  title: "PMO Automation Audit for GCC Growth-Stage SMEs",
  description:
    "Find the drag in your delivery system. Run the free PMO Diagnostic or review the ChisokuLabs PMO Automation Audit.",
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
    label: "Method",
    title: "Map → Locate → Prioritize → Blueprint",
    detail: "A fixed audit sequence with operator-ready outputs.",
  },
  {
    label: "Markets",
    title: "GCC · Singapore",
    detail: "Built for growth-stage SMEs with reporting and PMO visibility gaps.",
  },
  {
    label: "After the call",
    title: "Scope, then 5–10 days",
    detail: "Fit confirmed first. Engagement timeline and range follow.",
  },
] as const;

export default function Home() {
  return (
    <>
      {/* 1. Hero — single composition */}
      <section className="section report-cover pt-10 md:pt-14">
        <div className="container relative">
          <div className="mb-8 flex flex-col gap-6 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow hero-kicker">ChisokuLabs</p>
              <h1 className="display hero-title">Find the drag.</h1>
              <p className="subhead hero-copy mt-4 !mb-0">
                For GCC and Singapore growth-stage SMEs with reporting, escalation,
                and PMO visibility gaps.
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

      {/* 2. Before the Audit */}
      <section className="section bg-[var(--color-paper)]">
        <div className="container">
          <p className="eyebrow">Before the audit</p>
          <h2 className="headline">Operating drag.</h2>
          <p className="subhead mt-4">Current state.</p>
          <div className="mt-10">
            <OperatingDragGrid />
          </div>
        </div>
      </section>

      {/* 3. Audit Pathway */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">The engagement</p>
          <h2 className="headline">Four phases. Four outputs.</h2>
          <p className="subhead mt-4">Map · Locate · Prioritize · Blueprint</p>
          <div className="mt-10">
            <AuditPathway />
          </div>
        </div>
      </section>

      {/* 4. Audit Artifact */}
      <section className="section bg-[var(--color-paper)]">
        <div className="container">
          <p className="eyebrow">Audit output</p>
          <h2 className="headline">Audit artifact.</h2>
          <div className="mt-10">
            <SampleAuditArtifact />
          </div>
        </div>
      </section>

      {/* 5. Founder */}
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
            <div className="mt-8 grid gap-px bg-[rgba(17,24,32,0.12)] sm:grid-cols-2">
              {proofTiles.map((tile) => (
                <div
                  key={tile.title}
                  className="bg-[var(--color-paper)] p-5"
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

      {/* 6. Free Diagnostic CTA */}
      <section className="section bg-[var(--color-paper)]">
        <div className="container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="eyebrow">Start here</p>
            <h2 className="headline">5-minute PMO baseline.</h2>
            <p className="subhead mt-4">
              A serious first step before an Audit Fit Call.
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

      {/* 7. Trust geometry */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">Why this, now</p>
          <h2 className="headline">Clarity before commitment.</h2>
          <div className="mt-10 grid gap-8 border-t border-[rgba(17,24,32,0.14)] pt-8 md:grid-cols-3">
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
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="section dark-band atmosphere-band">
        <div className="container max-w-4xl text-center">
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
