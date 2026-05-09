import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AEVA in Production",
  description:
    "Enterprise AEVA case studies from manufacturing and aviation with measurable outcomes.",
};

const yamahaStats = [
  { value: "400+", label: "hours of delivery capacity recovered" },
  { value: "7", label: "unsanctioned AI tools identified and governed in first sprint" },
  { value: "5", label: "departments brought under governance" },
  { value: "1", label: "AI tool registry built from zero" },
];

const etihadStats = [
  { value: "500+", label: "hours recovered through structured governance" },
  { value: "200+", label: "person programme under alignment framework" },
  { value: "2", label: "organisations aligned to single governance model" },
  { value: "3", label: "regulatory frameworks mapped" },
];

export default function AevaCaseStudiesPage() {
  return (
    <section className="bg-[#050a12] py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y)]">
      <div className="mx-auto w-full max-w-[var(--content-max-width)] px-[var(--content-padding-x-mobile)] md:px-[var(--content-padding-x)]">
        <p className="text-label text-[#00d4ff]">DEPLOYMENT EVIDENCE</p>
        <h1 className="mt-4 text-display text-[#dde6f0]">AEVA in Production</h1>
        <p className="mt-4 text-body-lg text-[#6b8aaa]">
          Two enterprise deployments. Real problems. Measurable outcomes.
        </p>

        <article className="mt-12 rounded-[20px] border border-[#1a2d45] bg-[#0c1620] p-6 md:p-8">
          <header className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[#4A90D966] bg-[#4A90D91a] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#9ec8f1]">
              Manufacturing
            </span>
            <h2 className="text-h1 text-[#dde6f0]">Yamaha Motor Solutions India</h2>
            <span className="text-[12px] font-medium text-[#6b8aaa]">2025</span>
          </header>

          <div className="mt-6 space-y-4 text-body text-[#6b8aaa]">
            <p>
              Shadow AI proliferation across 5 departments. No policy. Tools
              accessing sensitive data without security review.
            </p>
            <p>
              Challenge: Govern without destroying velocity in a 300-person
              operation.
            </p>
          </div>

          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9ec8f1]">
            Enterprise AI Visibility · Agile Governance Layer
          </p>

          <ul className="mt-6 space-y-2 text-body text-[#6b8aaa]">
            <li>- Introduced AI risk reviews into sprint retrospectives across teams.</li>
            <li>- Built a live AI tool inventory with ownership and risk tiers.</li>
            <li>- Established fast governance pathways to reduce unsanctioned tool usage.</li>
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
            The moment you create a clear, fast, low-friction path to
            sanctioned AI use — adoption of unsanctioned tools drops
            immediately.
          </blockquote>
        </article>

        <article className="mt-8 rounded-[20px] border border-[#1a2d45] bg-[#0c1620] p-6 md:p-8">
          <header className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[#5BBF8A66] bg-[#5BBF8A1a] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#b5e9cc]">
              Aviation
            </span>
            <h2 className="text-h1 text-[#dde6f0]">Etihad Airways · Dubai Airports</h2>
            <span className="text-[12px] font-medium text-[#6b8aaa]">2023-2024</span>
          </header>

          <div className="mt-6 space-y-4 text-body text-[#6b8aaa]">
            <p>
              200+ person aviation transformation programme. Agentic delivery
              workflows introduced mid-programme. No governance alignment layer.
            </p>
            <p>
              Challenge: Governance across two organisations with different risk
              appetites and regulatory complexity.
            </p>
          </div>

          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#c9adef]">
            Alignment Architecture · Velocity Preservation
          </p>

          <ul className="mt-6 space-y-2 text-body text-[#6b8aaa]">
            <li>- Created a shared AI governance model across both organisations.</li>
            <li>- Mapped AI usage decisions to risk and compliance requirements.</li>
            <li>- Added velocity-friendly approval pathways to reduce governance drag.</li>
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
            parties. AEVA&apos;s Alignment Architecture gave both organisations a
            shared language for AI risk — without requiring either to change
            their internal policies.
          </blockquote>
        </article>

        <section className="mt-10 rounded-[20px] border border-[#1a2d45] bg-[#0c1620] p-6 md:p-8">
          <p className="text-body-lg text-[#dde6f0]">
            Want to understand how AEVA would apply to your organisation?
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
