import Link from "next/link";

const proofCards = [
  {
    tag: "MANUFACTURING",
    company: "Yamaha Motor Solutions India",
    challenge:
      "Shadow AI proliferation detected across 5 departments before any policy existed.",
    result:
      "400+ hours recovered. AI tool usage governed. Risk register implemented.",
    dimensions: "Enterprise AI Visibility · Agile Governance Layer",
  },
  {
    tag: "AVIATION",
    company: "Etihad Airways + Dubai Airports",
    challenge:
      "Agentic delivery workflows across a 200+ person programme with no governance alignment.",
    result: "500+ hours recovered. Cross-functional alignment achieved.",
    dimensions: "Alignment Architecture · Velocity Preservation",
  },
];

export function AevaProofStrip() {
  return (
    <section className="bg-[#08131f] py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y)]">
      <div className="mx-auto w-full max-w-[var(--content-max-width)] px-[var(--content-padding-x-mobile)] md:px-[var(--content-padding-x)]">
        <p className="text-label text-[#00d4ff]">DEPLOYMENT EVIDENCE</p>
        <h2 className="mt-4 text-display text-[#dde6f0]">AEVA in the real world</h2>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {proofCards.map((card) => (
            <article
              key={card.company}
              className="rounded-[20px] border border-[#1a2d45] bg-[#0c1620] p-6"
            >
              <p className="text-label text-[#00d4ff]">{card.tag}</p>
              <h3 className="mt-3 text-h2 text-[#dde6f0]">{card.company}</h3>
              <p className="mt-3 text-body text-[#6b8aaa]">{card.challenge}</p>
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
