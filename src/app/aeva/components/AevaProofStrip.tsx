import Link from "next/link";

const proofCards = [
  {
    tag: "MANUFACTURING",
    accent: "#4A90D9",
    company: "Yamaha Motor Solutions India — 2025",
    situation:
      "Shadow AI proliferation detected across 5 departments before any policy existed. Employees using unsanctioned AI tools on uncleared data with no governance, no visibility, no audit trail.",
    result:
      "400+ hours of delivery capacity recovered. First live AEVA deployment. AI tool registry built from zero. 5 departments brought under governance framework.",
    dimensions: "Ceremony Restructuring · Shadow AI Proliferation Mitigation",
  },
  {
    tag: "AVIATION",
    accent: "#5BBF8A",
    company: "Etihad Airways + Dubai Airports",
    situation:
      "200+ person aviation transformation programme. Agentic delivery workflows introduced mid-programme. No governance alignment layer. Multiple organisations, different risk appetites.",
    result:
      "500+ hours recovered through structured governance. Delivery portfolio achieving 108% revenue growth. Programme value exceeding USD 90 million.",
    dimensions: "Financial Model · Identity Crisis Mitigation",
  },
];

export function AevaProofStrip() {
  return (
    <section className="relative overflow-hidden bg-[#08131f] py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,212,255,0.08),transparent_55%)]" />

      <div className="relative mx-auto w-full max-w-[var(--content-max-width)] px-[var(--content-padding-x-mobile)] md:px-[var(--content-padding-x)]">
        <p className="text-label text-[#00d4ff]">DEPLOYMENT EVIDENCE</p>
        <h2 className="mt-4 max-w-3xl text-display text-[#dde6f0]">
          AEVA in production environments
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {proofCards.map((card) => (
            <article
              key={card.company}
              className="group relative overflow-hidden rounded-[22px] border border-[#1a2d45] bg-[#0c1620] p-6 shadow-[0_22px_52px_rgba(0,0,0,0.28)] transition hover:-translate-y-[2px] hover:border-[#334e6b] md:p-7"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
                style={{
                  background: `linear-gradient(90deg, ${card.accent}, ${card.accent}44, transparent)`,
                  boxShadow: `0 0 26px ${card.accent}38`,
                }}
              />
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-[0.1] blur-3xl"
                style={{ backgroundColor: card.accent }}
              />

              <p
                className="relative text-[11px] font-bold uppercase tracking-[0.14em]"
                style={{ color: card.accent }}
              >
                {card.tag}
              </p>
              <h3 className="relative mt-3 text-h2 text-[#dde6f0]">{card.company}</h3>

              <div className="relative mt-5 rounded-[14px] border border-[#1a2d45]/90 bg-[#050a12]/55 p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#00d4ff]/95">
                  Situation
                </p>
                <p className="mt-2 text-body leading-relaxed text-[#a9bdd4]">
                  {card.situation}
                </p>
              </div>

              <p className="relative mt-4 text-body leading-relaxed text-[#22c55e]">
                <span className="font-semibold text-[#86efac]">Result:</span>{" "}
                {card.result}
              </p>

              <p className="relative mt-4 rounded-[10px] border border-[#1a2d45]/80 bg-[#050a12]/40 px-3 py-2 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.11em] text-[#8aa4bf]">
                {card.dimensions}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/aeva/case-studies"
            className="inline-flex items-center justify-center rounded-full border border-[#00d4ff]/45 bg-[#00d4ff]/[0.07] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#00d4ff] shadow-[0_0_24px_rgba(0,212,255,0.12)] transition hover:border-[#00d4ff] hover:bg-[#00d4ff]/12"
          >
            See full case studies →
          </Link>
        </div>
      </div>
    </section>
  );
}
