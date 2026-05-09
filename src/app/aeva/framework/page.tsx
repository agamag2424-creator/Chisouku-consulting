import type { Metadata } from "next";
import Link from "next/link";
import { DimensionCard } from "./components/DimensionCard";

export const metadata: Metadata = {
  title: "How AEVA Works",
  description:
    "Detailed explanation of the AEVA governance framework dimensions, deployment method, and enterprise credentials.",
};

const dimensions = [
  {
    letter: "A",
    color: "#4A90D9",
    title: "Agile Governance Layer",
    problem:
      "Governance frameworks fail when they live outside the delivery workflow. Teams under pressure skip compliance steps.",
    bullets: [
      "Embeds a 15-minute AI Risk Review into every sprint retrospective",
      "Adds AI tool assessment as a standing item in sprint planning",
      "Creates a lightweight risk token system — each new AI tool requires a token before use",
      "Produces an automatic audit trail from existing agile ceremonies with no extra overhead",
    ],
    inPractice:
      "At Yamaha, the first retrospective with the AEVA AI Risk Review revealed 7 unsanctioned tools in active use across 2 teams.",
    connectsTo: "Enterprise AI Visibility · Alignment Architecture",
  },
  {
    letter: "E",
    color: "#E8902A",
    title: "Enterprise AI Visibility",
    problem:
      "You cannot govern what you cannot see. Most enterprises have no inventory of AI tools in use.",
    bullets: [
      "Deploys a lightweight AI tool declaration process — form-based, not bureaucratic",
      "Builds a live AI tool registry: name, purpose, data access, risk tier, owner",
      "Classifies each tool: Sanctioned / Under Review / Unsanctioned",
      "Triggers automatic review workflow for any Unsanctioned classification",
    ],
    inPractice:
      "At Yamaha, the first AI tool inventory revealed tools accessing customer data without any security review. Two were immediately suspended.",
    connectsTo: "Agile Governance Layer · Alignment Architecture",
  },
  {
    letter: "V",
    color: "#5BBF8A",
    title: "Velocity Preservation",
    problem:
      "Governance that slows teams down gets bypassed. The fastest way to create Shadow AI is to make sanctioned AI usage too slow.",
    bullets: [
      "Pre-approves entire categories of low-risk tools — teams do not wait for individual approvals",
      "Creates a fast lane declaration process — low-risk tools approved within 24 hours",
      "Separates governance overhead from delivery overhead",
      "Measures governance overhead per sprint and actively reduces it",
    ],
    inPractice:
      "At Etihad, official AI procurement took 6 weeks. AEVA's fast lane reduced approval to 48 hours for low-risk tools — Shadow AI adoption dropped immediately.",
    connectsTo: "All dimensions — velocity is the design constraint that shapes everything",
  },
  {
    letter: "A",
    color: "#C96DD8",
    title: "Alignment Architecture",
    problem:
      "AI tool decisions made at team level are invisible at board level. Risk accumulates without anyone having a complete picture.",
    bullets: [
      "Produces a monthly AI Governance Dashboard — board-ready, one page",
      "Maps every AI tool to the organisation's risk appetite framework",
      "Connects tool usage data to regulatory requirements (DPDP, GDPR, ISO 42001)",
      "Creates escalation triggers — when risk threshold is crossed, governance lead is notified automatically",
    ],
    inPractice:
      "At Yamaha, the first AEVA Alignment Architecture output was a one-page board summary showing AI tool risk exposure across 5 departments — the first time leadership had seen the complete picture.",
    connectsTo: "Enterprise AI Visibility · Agile Governance Layer",
  },
];

const credentials = [
  {
    title: "Provisional Patent Pending",
    body: "Filed with Indian Patent Office, 2026",
  },
  {
    title: "Copyright Registration",
    body: "Diary No. LD-14934/2026-CO. Registered under Agam Agrawwal, 2026",
  },
  {
    title: "Live Deployment",
    body: "AEVA has been deployed in production enterprise environments across manufacturing and aviation",
  },
];

export default function AevaFrameworkPage() {
  return (
    <section className="bg-[#050a12] py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y)]">
      <div className="mx-auto w-full max-w-[var(--content-max-width)] px-[var(--content-padding-x-mobile)] md:px-[var(--content-padding-x)]">
        <nav className="text-[11px] uppercase tracking-[0.12em] text-[#6b8aaa]">
          <Link href="/" className="hover:text-[#dde6f0]">
            ChisokuLab
          </Link>{" "}
          →{" "}
          <Link href="/aeva" className="hover:text-[#dde6f0]">
            AEVA
          </Link>{" "}
          → <span className="text-[#dde6f0]">Framework</span>
        </nav>

        <p className="mt-6 text-label text-[#00d4ff]">METHODOLOGY</p>
        <h1 className="mt-3 text-display text-[#dde6f0]">How AEVA Works</h1>
        <p className="mt-5 max-w-4xl text-body-lg text-[#6b8aaa]">
          A governance framework is only as good as its deployment evidence.
          Here is what AEVA does, how it does it, and what it has achieved in
          production environments.
        </p>

        <div className="mt-10 space-y-6">
          {dimensions.map((dimension) => (
            <DimensionCard key={dimension.title} {...dimension} />
          ))}
        </div>

        <section className="mt-14">
          <h2 className="text-h1 text-[#dde6f0]">IP and Credentials</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {credentials.map((credential) => (
              <article
                key={credential.title}
                className="rounded-[16px] border border-[#1a2d45] bg-[#0c1620] p-5"
              >
                <h3 className="text-h3 text-[#dde6f0]">{credential.title}</h3>
                <p className="mt-2 text-body text-[#6b8aaa]">{credential.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-[20px] border border-[#1a2d45] bg-[#0c1620] p-6 md:p-8">
          <h2 className="text-h1 text-[#dde6f0]">See AEVA applied to your context</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/aeva/case-studies"
              className="inline-flex items-center justify-center rounded-full bg-[#00d4ff] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#050a12]"
            >
              View Case Studies →
            </Link>
            <Link
              href="/aeva/book"
              className="inline-flex items-center justify-center rounded-full border border-[#00d4ff] bg-transparent px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#00d4ff]"
            >
              Book a Call →
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}
