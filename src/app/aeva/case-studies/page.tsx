import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AEVA in Production",
  description:
    "Two enterprise deployments. Real governance challenges. Measurable outcomes — manufacturing and aviation case studies.",
};

const yamahaStats = [
  { value: "400+", label: "hours of delivery capacity recovered" },
  { value: "5", label: "departments brought under governance framework" },
  { value: "1st", label: "live enterprise deployment of AEVA framework" },
  {
    value: "0",
    label: "uncontrolled AI tool usage remaining after governance implementation",
  },
];

const etihadStats = [
  { value: "500+", label: "hours recovered through structured governance" },
  { value: "200+", label: "person programme under governance framework" },
  {
    value: "2",
    label: "independent organisations aligned to single governance model",
  },
  {
    value: "108%",
    label: "revenue growth achieved in delivery portfolio (Coforge)",
  },
];

export default function AevaCaseStudiesPage() {
  return (
    <section className="bg-[#050a12] py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y)]">
      <div className="mx-auto w-full max-w-[var(--content-max-width)] px-[var(--content-padding-x-mobile)] md:px-[var(--content-padding-x)]">
        <p className="text-label text-[#00d4ff]">DEPLOYMENT EVIDENCE</p>
        <h1 className="mt-4 text-display text-[#dde6f0]">AEVA in Production</h1>
        <p className="mt-4 max-w-4xl text-body-lg text-[#6b8aaa]">
          Two enterprise deployments. Real governance challenges. Measurable
          outcomes. AEVA was not designed in a consulting firm — it was designed
          in boardrooms, delivery rooms, and post-mortems where the same failure
          patterns repeated across sectors.
        </p>

        <article className="mt-12 rounded-[20px] border border-[#1a2d45] bg-[#0c1620] p-6 md:p-8">
          <header className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            <span className="w-fit rounded-full border border-[#4A90D966] bg-[#4A90D91a] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#9ec8f1]">
              MANUFACTURING
            </span>
            <h2 className="text-h1 text-[#dde6f0]">
              Yamaha Motor Solutions India
            </h2>
            <span className="text-[12px] font-medium text-[#6b8aaa]">
              2025 — First Live AEVA Deployment
            </span>
          </header>

          <div className="mt-6 space-y-4 text-body text-[#6b8aaa]">
            <p>
              <span className="font-semibold text-[#dde6f0]">Situation:</span>{" "}
              Shadow AI proliferation detected across 5 departments before any
              policy existed. Employees openly using ChatGPT via personal mobile
              devices on uncleared production data. No data security governance,
              no output validation, no organisational visibility. Leadership,
              meanwhile, continued projecting an image of purposeful AI adoption
              in external communications. The gap between projection and reality
              was structural.
            </p>
            <p>
              <span className="font-semibold text-[#dde6f0]">Challenge:</span>{" "}
              Contain the Shadow AI risk without destroying delivery momentum.
              Govern a 300+ person operation where unsanctioned AI usage had
              spread across multiple teams simultaneously.
            </p>
          </div>

          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9ec8f1]">
            Precision Backlog Refinement · Shadow AI Proliferation Mitigation ·
            Increment Delivery Charter · Enterprise AI Visibility
          </p>

          <ul className="mt-6 space-y-2 text-body text-[#6b8aaa]">
            <li>
              - Conducted first AI tool inventory across all 5 departments —
              surfacing the full scope of unsanctioned usage before attempting
              governance
            </li>
            <li>
              - Deployed Increment Delivery Charter — sanctioned tools, data
              classification boundaries, output accountability assignment per
              Increment
            </li>
            <li>
              - Introduced Precision Backlog Refinement with
              Functional-Technical AC Taxonomy — creating process-level immunity
              where Shadow AI output must comply with Functional AC to pass
              Feature Clearance regardless of which tool generated it
            </li>
          </ul>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {yamahaStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[14px] border border-[#1a2d45] bg-[#0b1520] p-4"
              >
                <p className="text-stat text-[#22c55e]">{stat.value}</p>
                <p className="mt-2 text-body text-[#6b8aaa]">{stat.label}</p>
              </div>
            ))}
          </div>

          <blockquote className="mt-7 border-l-2 border-[#00d4ff66] pl-4 text-body text-[#9cb6ce]">
            Shadow AI is not a technology problem. It is a governance vacuum.
            The moment you create a clear, fast, low-friction path to sanctioned
            AI use — adoption of unsanctioned tools drops immediately. The
            technical fence cannot be made high enough. Process-level immunity is
            the only durable solution.
          </blockquote>
        </article>

        <article className="mt-8 rounded-[20px] border border-[#1a2d45] bg-[#0c1620] p-6 md:p-8">
          <header className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            <span className="w-fit rounded-full border border-[#5BBF8A66] bg-[#5BBF8A1a] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#b5e9cc]">
              AVIATION
            </span>
            <h2 className="text-h1 text-[#dde6f0]">
              Etihad Airways · Dubai Airports
            </h2>
            <span className="text-[12px] font-medium text-[#6b8aaa]">
              Multi-Organisation Programme
            </span>
          </header>

          <div className="mt-6 space-y-4 text-body text-[#6b8aaa]">
            <p>
              <span className="font-semibold text-[#dde6f0]">Situation:</span>{" "}
              200+ person aviation transformation programme. Agentic delivery
              workflows introduced mid-programme. No governance alignment layer.
              Multi-organisation complexity — airline and airport authority with
              different risk appetites, regulatory frameworks, and internal
              governance cultures.
            </p>
            <p>
              <span className="font-semibold text-[#dde6f0]">Challenge:</span>{" "}
              Establish a single governance model accepted by two independent
              organisations without requiring either to change their internal
              policies.
            </p>
          </div>

          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#c9adef]">
            Alignment Architecture (Dimension 04) · Velocity Preservation ·
            Identity Crisis Mitigation · Financial Model Application
          </p>

          <ul className="mt-6 space-y-2 text-body text-[#6b8aaa]">
            <li>
              - Applied AEVA financial model to reframe per-project cost vs
              annual team cost — creating commercial alignment between
              organisations on delivery investment
            </li>
            <li>
              - Deployed Identity Crisis mitigation for senior practitioners whose
              delivery authority was challenged by AI-assisted workflows —
              reframing from &quot;I build&quot; to &quot;I govern what AI
              builds&quot;
            </li>
            <li>
              - Established shared AI governance language between airline and
              airport authority — Increment Delivery Charter as the contract
              between organisations
            </li>
          </ul>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {etihadStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[14px] border border-[#1a2d45] bg-[#0b1520] p-4"
              >
                <p className="text-stat text-[#22c55e]">{stat.value}</p>
                <p className="mt-2 text-body text-[#6b8aaa]">{stat.label}</p>
              </div>
            ))}
          </div>

          <blockquote className="mt-7 border-l-2 border-[#00d4ff66] pl-4 text-body text-[#9cb6ce]">
            In multi-organisation programmes, governance is the contract between
            parties. AEVA&apos;s approach gave both organisations a shared
            language for AI risk — without requiring either to change their
            internal policies. The framework adapted. The organisations did not
            have to.
          </blockquote>
        </article>

        <section className="mt-10 rounded-[20px] border border-[#1a2d45] bg-[#0c1620] p-6 md:p-8">
          <p className="text-body-lg text-[#dde6f0]">
            Want to understand how AEVA would apply to your organisation&apos;s
            AI delivery challenges?
          </p>
          <div className="mt-5">
            <Link
              href="/aeva/book"
              className="inline-flex items-center justify-center rounded-full bg-[#00d4ff] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#050a12]"
            >
              Book a 20-minute call
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}
