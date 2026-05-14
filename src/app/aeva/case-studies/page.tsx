import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AEVA in Production — AI Governance Case Studies",
  description:
    "Two enterprise deployments. Real governance challenges. Measurable outcomes — manufacturing and aviation case studies.",
  keywords: [
    "AEVA framework",
    "AI governance framework",
    "enterprise AI governance",
  ],
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

function CaseStudiesHero() {
  return (
    <div className="relative mb-10 overflow-hidden rounded-[24px] border border-[#1a2d45] bg-[#050a12] md:mb-14">
      <div className="pointer-events-none absolute inset-0 opacity-[0.93]">
        <div className="absolute inset-0 animate-[aevaGradientShift_23s_ease_infinite] bg-[radial-gradient(circle_at_12%_22%,rgba(74,144,217,0.2),transparent_46%),radial-gradient(circle_at_90%_20%,rgba(91,191,138,0.14),transparent_48%),radial-gradient(circle_at_70%_88%,rgba(0,212,255,0.1),transparent_52%),linear-gradient(152deg,#050a12,#08192a,#050a12)] [background-size:180%_180%]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#050a12]/30 to-[#050a12]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: "46px 46px",
        }}
      />

      <div className="relative z-10 px-5 py-9 md:px-9 md:py-11 lg:px-11 lg:py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:justify-between lg:gap-14">
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00d4ff]/35 bg-[#00d4ff]/[0.07] px-3.5 py-1.5 shadow-[0_0_28px_rgba(0,212,255,0.14)]">
              <span
                className="relative flex h-2 w-2 rounded-full bg-[#00d4ff]"
                style={{ boxShadow: "0 0 14px #00d4ff" }}
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-[#00d4ff] opacity-35" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7ee9ff]">
                Deployment evidence
              </span>
            </div>

            <h1 className="mt-6 max-w-[18ch] text-display font-semibold leading-[1.06] tracking-[-0.02em] text-[#dde6f0] md:max-w-none">
              <span className="bg-gradient-to-r from-[#7dd3fc] via-[#a5f3fc] to-[#5eead4] bg-clip-text text-transparent">
                AEVA
              </span>{" "}
              in{" "}
              <span className="text-[#dde6f0]">Production</span>
            </h1>

            <p className="mt-6 max-w-2xl border-l-2 border-[#00d4ff]/35 pl-5 text-[17px] leading-relaxed text-[#9eb6d2] md:text-[18px]">
              Two enterprise deployments. Real governance challenges. Measurable
              outcomes. AEVA was not designed in a consulting firm — it was
              designed in boardrooms, delivery rooms, and post-mortems where the
              same failure patterns repeated across sectors.
            </p>
          </div>

          <aside className="flex w-full shrink-0 flex-col justify-between rounded-[18px] border border-[#1a2d45]/90 bg-[#060d15]/85 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md lg:max-w-[300px]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b8aaa]">
                Two programmes
              </p>
              <p className="mt-1 text-[12px] leading-snug text-[#8aa4bf]">
                Manufacturing first deployment · Aviation multi-org alignment.
              </p>
            </div>
            <ul className="mt-5 space-y-3">
              <li className="flex items-center gap-3 rounded-[12px] border border-[#1a2d45]/85 bg-[#050a12]/70 py-2.5 pl-3 pr-3">
                <span
                  className="flex h-10 w-1.5 shrink-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(180deg, #4A90D9, rgba(74,144,217,0.4))",
                    boxShadow: "0 0 14px rgba(74,144,217,0.45)",
                  }}
                />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9ec8f1]">
                    Yamaha Motor Solutions India
                  </p>
                  <p className="text-[12px] text-[#c5d7ea]">Manufacturing · 2025</p>
                </div>
              </li>
              <li className="flex items-center gap-3 rounded-[12px] border border-[#1a2d45]/85 bg-[#050a12]/70 py-2.5 pl-3 pr-3">
                <span
                  className="flex h-10 w-1.5 shrink-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(180deg, #5BBF8A, rgba(91,191,138,0.4))",
                    boxShadow: "0 0 14px rgba(91,191,138,0.4)",
                  }}
                />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#b5e9cc]">
                    Etihad · Dubai Airports
                  </p>
                  <p className="text-[12px] text-[#c5d7ea]">Aviation programme</p>
                </div>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}

function ApproachList({
  items,
  accentColor,
}: {
  items: string[];
  accentColor: string;
}) {
  return (
    <div className="relative mt-6 rounded-[16px] border border-dashed border-[#2a4058]/85 bg-[linear-gradient(165deg,rgba(8,15,24,0.85)_0%,rgba(5,10,18,0.45)_100%)] p-5 md:p-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7dd3fc]/90">
        Approach
      </p>
      <ul className="relative mt-5 list-none space-y-0 pl-0">
        {items.length > 1 ? (
          <div
            aria-hidden
            className="pointer-events-none absolute left-[17px] top-9 bottom-10 w-px md:left-[19px]"
            style={{
              background: `linear-gradient(180deg, ${accentColor}00 0%, ${accentColor}66 12%, ${accentColor}33 50%, ${accentColor}12 88%, ${accentColor}00 100%)`,
            }}
          />
        ) : null}
        {items.map((item, i) => (
          <li
            key={item.slice(0, 48)}
            className="relative flex gap-4 pb-7 last:pb-0 md:gap-5"
          >
            <div
              className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 bg-[#0a121c] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:h-10 md:w-10"
              style={{ borderColor: `${accentColor}aa` }}
            >
              <span
                className="text-[12px] font-bold tabular-nums"
                style={{ color: accentColor }}
              >
                {i + 1}
              </span>
            </div>
            <p className="min-w-0 flex-1 pt-1 text-[15px] leading-relaxed text-[#b4c9df] md:pt-1.5 md:text-[15.5px]">
              {item.replace(/^-\s*/, "")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatGrid({
  stats,
  accentColor,
}: {
  stats: { value: string; label: string }[];
  accentColor: string;
}) {
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group relative overflow-hidden rounded-[16px] border border-[#1a2d45] bg-[#0b1520] p-4 transition duration-200 hover:-translate-y-[2px] hover:border-[#334e6b] hover:shadow-[0_14px_36px_rgba(0,0,0,0.35)] md:p-5"
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-90 transition group-hover:opacity-100"
            style={{
              background: `linear-gradient(90deg, ${accentColor}, transparent)`,
              boxShadow: `0 0 20px ${accentColor}44`,
            }}
          />
          <p className="text-stat tabular-nums text-[#22c55e]">{stat.value}</p>
          <p className="mt-2 text-body text-[#6b8aaa]">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

export default function AevaCaseStudiesPage() {
  const yamahaApproach = [
    "Conducted first AI tool inventory across all 5 departments — surfacing the full scope of unsanctioned usage before attempting governance",
    "Deployed Increment Delivery Charter — sanctioned tools, data classification boundaries, output accountability assignment per Increment",
    "Introduced Precision Backlog Refinement with Functional-Technical AC Taxonomy — creating process-level immunity where Shadow AI output must comply with Functional AC to pass Feature Clearance regardless of which tool generated it",
  ];

  const etihadApproach = [
    "Applied AEVA financial model to reframe per-project cost vs annual team cost — creating commercial alignment between organisations on delivery investment",
    'Deployed Identity Crisis mitigation for senior practitioners whose delivery authority was challenged by AI-assisted workflows — reframing from "I build" to "I govern what AI builds"',
    "Established shared AI governance language between airline and airport authority — Increment Delivery Charter as the contract between organisations",
  ];

  return (
    <section className="bg-[#050a12] py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y)]">
      <div className="mx-auto w-full max-w-[var(--content-max-width)] px-[var(--content-padding-x-mobile)] md:px-[var(--content-padding-x)]">
        <CaseStudiesHero />

        <div className="space-y-10 md:space-y-12">
          <article className="relative overflow-hidden rounded-[22px] border border-[#1a2d45] bg-[#0c1620] p-6 shadow-[0_24px_56px_rgba(0,0,0,0.28)] md:p-8">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
              style={{
                background:
                  "linear-gradient(90deg, #4A90D9, rgba(74,144,217,0.35), transparent)",
                boxShadow: "0 0 28px rgba(74,144,217,0.35)",
              }}
            />
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#4A90D9]/10 blur-3xl" />

            <header className="relative flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
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

            <div className="relative mt-8 grid gap-4 lg:grid-cols-2">
              <div className="rounded-[16px] border border-[#1a2d45]/90 bg-[#050a12]/55 p-5 md:p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#00d4ff]/95">
                  Situation
                </p>
                <p className="mt-3 text-body leading-relaxed text-[#a9bdd4]">
                  Shadow AI proliferation detected across 5 departments before any
                  policy existed. Employees openly using ChatGPT via personal mobile
                  devices on uncleared production data. No data security governance,
                  no output validation, no organisational visibility. Leadership,
                  meanwhile, continued projecting an image of purposeful AI adoption
                  in external communications. The gap between projection and reality
                  was structural.
                </p>
              </div>
              <div className="rounded-[16px] border border-dashed border-[#2a4058]/85 bg-[#050a12]/35 p-5 md:p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#f59e0b]/95">
                  Challenge
                </p>
                <p className="mt-3 text-body leading-relaxed text-[#a9bdd4]">
                  Contain the Shadow AI risk without destroying delivery momentum.
                  Govern a 300+ person operation where unsanctioned AI usage had
                  spread across multiple teams simultaneously.
                </p>
              </div>
            </div>

            <div className="relative mt-6 rounded-[14px] border border-[#4A90D9]/25 bg-[#4A90D9]/[0.06] px-4 py-3 md:px-5 md:py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9ec8f1]/95">
                AEVA elements applied
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase leading-relaxed tracking-[0.12em] text-[#b8d4f0]">
                Precision Backlog Refinement · Shadow AI Proliferation Mitigation ·
                Increment Delivery Charter · Enterprise AI Visibility
              </p>
            </div>

            <ApproachList items={yamahaApproach} accentColor="#4A90D9" />

            <StatGrid stats={yamahaStats} accentColor="#4A90D9" />

            <blockquote className="relative mt-8 overflow-hidden rounded-[18px] border border-[#00d4ff]/25 bg-gradient-to-br from-[#00d4ff]/[0.07] via-[#050a12]/40 to-transparent p-6 md:p-7">
              <span
                className="pointer-events-none absolute -left-1 top-3 font-serif text-6xl leading-none text-[#00d4ff]/15"
                aria-hidden
              >
                &ldquo;
              </span>
              <p className="relative text-[15px] leading-relaxed text-[#c5dce8] md:text-[16px]">
                Shadow AI is not a technology problem. It is a governance vacuum.
                The moment you create a clear, fast, low-friction path to sanctioned
                AI use — adoption of unsanctioned tools drops immediately. The
                technical fence cannot be made high enough. Process-level immunity
                is the only durable solution.
              </p>
            </blockquote>
          </article>

          <article className="relative overflow-hidden rounded-[22px] border border-[#1a2d45] bg-[#0c1620] p-6 shadow-[0_24px_56px_rgba(0,0,0,0.28)] md:p-8">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
              style={{
                background:
                  "linear-gradient(90deg, #5BBF8A, rgba(91,191,138,0.35), transparent)",
                boxShadow: "0 0 28px rgba(91,191,138,0.35)",
              }}
            />
            <div className="pointer-events-none absolute -right-16 top-0 h-52 w-52 rounded-full bg-[#5BBF8A]/12 blur-3xl" />

            <header className="relative flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
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

            <div className="relative mt-8 grid gap-4 lg:grid-cols-2">
              <div className="rounded-[16px] border border-[#1a2d45]/90 bg-[#050a12]/55 p-5 md:p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#00d4ff]/95">
                  Situation
                </p>
                <p className="mt-3 text-body leading-relaxed text-[#a9bdd4]">
                  200+ person aviation transformation programme. Agentic delivery
                  workflows introduced mid-programme. No governance alignment layer.
                  Multi-organisation complexity — airline and airport authority with
                  different risk appetites, regulatory frameworks, and internal
                  governance cultures.
                </p>
              </div>
              <div className="rounded-[16px] border border-dashed border-[#2a4058]/85 bg-[#050a12]/35 p-5 md:p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#f59e0b]/95">
                  Challenge
                </p>
                <p className="mt-3 text-body leading-relaxed text-[#a9bdd4]">
                  Establish a single governance model accepted by two independent
                  organisations without requiring either to change their internal
                  policies.
                </p>
              </div>
            </div>

            <div className="relative mt-6 rounded-[14px] border border-[#5BBF8A]/25 bg-[#5BBF8A]/[0.06] px-4 py-3 md:px-5 md:py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#b5e9cc]/95">
                AEVA elements applied
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase leading-relaxed tracking-[0.12em] text-[#c8ead8]">
                Alignment Architecture (Dimension 04) · Velocity Preservation ·
                Identity Crisis Mitigation · Financial Model Application
              </p>
            </div>

            <ApproachList items={etihadApproach} accentColor="#5BBF8A" />

            <StatGrid stats={etihadStats} accentColor="#5BBF8A" />

            <blockquote className="relative mt-8 overflow-hidden rounded-[18px] border border-[#00d4ff]/25 bg-gradient-to-br from-[#00d4ff]/[0.07] via-[#050a12]/40 to-transparent p-6 md:p-7">
              <span
                className="pointer-events-none absolute -left-1 top-3 font-serif text-6xl leading-none text-[#00d4ff]/15"
                aria-hidden
              >
                &ldquo;
              </span>
              <p className="relative text-[15px] leading-relaxed text-[#c5dce8] md:text-[16px]">
                In multi-organisation programmes, governance is the contract between
                parties. AEVA&apos;s approach gave both organisations a shared
                language for AI risk — without requiring either to change their
                internal policies. The framework adapted. The organisations did not
                have to.
              </p>
            </blockquote>
          </article>

          <section className="relative overflow-hidden rounded-[24px] border border-[#00d4ff]/35">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#00d4ff]/[0.12] via-[#050a12] to-[#5BBF8A]/[0.07]" />
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[#00d4ff]/18 blur-3xl" />

            <div className="relative p-8 md:flex md:items-center md:justify-between md:gap-10 md:p-10">
              <p className="max-w-xl text-body-lg leading-snug text-[#dde6f0]">
                Want to understand how AEVA would apply to your organisation&apos;s
                AI delivery challenges?
              </p>
              <div className="mt-6 shrink-0 md:mt-0">
                <Link
                  href="/aeva/book"
                  className="inline-flex items-center justify-center rounded-full bg-[#00d4ff] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#050a12] shadow-[0_8px_28px_rgba(0,212,255,0.35)] transition hover:-translate-y-px hover:brightness-110"
                >
                  Book a 20-minute call
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
