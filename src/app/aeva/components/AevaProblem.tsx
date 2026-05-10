const problemCards = [
  {
    icon: "🔄",
    title: "Pilot Purgatory",
    accent: "#f59e0b",
    body: "AI initiatives proliferate at the pilot stage — funded, celebrated, announced — but fail consistently at the transition to production. Not because the technology is insufficient. Because the governance infrastructure does not exist.",
  },
  {
    icon: "⚠️",
    title: "Shadow AI Proliferation",
    accent: "#00d4ff",
    body: "Employees adopt AI tools outside sanctioned channels before governance exists. No visibility, no risk assessment, no audit trail. Directly observed at Yamaha Motor Solutions — across 5 departments simultaneously.",
  },
  {
    icon: "📐",
    title: "Broken Agile Assumptions",
    accent: "#a855f7",
    body: "Story points assume human effort as the production variable. Sprint cadences assume human velocity as the constraint. None of these assumptions hold in an AI-augmented delivery environment. Every ceremony requires structural rethinking.",
  },
];

export function AevaProblem() {
  return (
    <section className="bg-[#050a12] py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y)]">
      <div className="mx-auto w-full max-w-[var(--content-max-width)] px-[var(--content-padding-x-mobile)] md:px-[var(--content-padding-x)]">
        <p className="text-label text-[#00d4ff]">THE PROBLEM</p>
        <h2 className="mt-4 max-w-4xl text-display text-[#dde6f0]">
          Enterprises are not failing at AI because the technology is insufficient
        </h2>
        <p className="mt-6 max-w-4xl border-l-2 border-[#00d4ff]/30 pl-5 text-body-lg leading-relaxed text-[#8aa4bf]">
          They are failing at the specific, repeatable transition from pilot to
          production — because the governance, methodology, and team architecture
          required to productionise AI capability do not exist in most
          organisations.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {problemCards.map((card) => (
            <article
              key={card.title}
              className="group relative overflow-hidden rounded-[20px] border border-[#1a2d45] bg-[#0c1620] p-6 shadow-[0_20px_48px_rgba(0,0,0,0.22)] transition hover:-translate-y-[2px] hover:border-[#334e6b]"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
                style={{
                  background: `linear-gradient(90deg, ${card.accent}, ${card.accent}44, transparent)`,
                  boxShadow: `0 0 22px ${card.accent}44`,
                }}
              />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-[#1a2d45] bg-[#050a12] text-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                {card.icon}
              </div>
              <h3 className="mt-4 text-h2 text-[#dde6f0]">{card.title}</h3>
              <p className="mt-3 text-body leading-relaxed text-[#6b8aaa]">
                {card.body}
              </p>
            </article>
          ))}
        </div>

        <div className="relative mt-10 overflow-hidden rounded-[18px] border border-[#f59e0b]/35 bg-gradient-to-br from-[#f59e0b]/[0.1] via-transparent to-transparent px-5 py-5 md:px-7 md:py-6">
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#f59e0b]/15 blur-3xl" />
          <p className="relative text-h3 leading-snug text-[#f5d9a8]">
            AEVA provides the governance infrastructure. The methodology. The team
            architecture. All three — simultaneously.
          </p>
        </div>
      </div>
    </section>
  );
}
