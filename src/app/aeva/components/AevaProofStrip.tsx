import Link from "next/link";

const proofCards = [
  {
    tag: "MANUFACTURING",
    company: "Yamaha Motor Solutions India — 2025",
    situation:
      "Shadow AI proliferation detected across 5 departments before any policy existed. Employees using unsanctioned AI tools on uncleared data with no governance, no visibility, no audit trail.",
    result:
      "400+ hours of delivery capacity recovered. First live AEVA deployment. AI tool registry built from zero. 5 departments brought under governance framework.",
    dimensions: "Ceremony Restructuring · Shadow AI Proliferation Mitigation",
  },
  {
    tag: "AVIATION",
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
    <section className="bg-[#08131f] py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y)]">
      <div className="mx-auto w-full max-w-[var(--content-max-width)] px-[var(--content-padding-x-mobile)] md:px-[var(--content-padding-x)]">
        <p className="text-label text-[#00d4ff]">DEPLOYMENT EVIDENCE</p>
        <h2 className="mt-4 text-display text-[#dde6f0]">
          AEVA in production environments
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {proofCards.map((card) => (
            <article
              key={card.company}
              className="rounded-[20px] border border-[#1a2d45] bg-[#0c1620] p-6"
            >
              <p className="text-label text-[#00d4ff]">{card.tag}</p>
              <h3 className="mt-3 text-h2 text-[#dde6f0]">{card.company}</h3>
              <p className="mt-3 text-body text-[#6b8aaa]">
                <span className="font-semibold text-[#dde6f0]">Situation:</span>{" "}
                {card.situation}
              </p>
              <p className="mt-4 text-body text-[#22c55e]">
                <span className="font-semibold">Result:</span> {card.result}
              </p>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6b8aaa]">
                {card.dimensions}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/aeva/case-studies"
            className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#00d4ff] hover:text-[#72e5ff]"
          >
            See full case studies →
          </Link>
        </div>
      </div>
    </section>
  );
}
