const problemCards = [
  {
    icon: "🔄",
    title: "Pilot Purgatory",
    body: "AI initiatives proliferate at the pilot stage — funded, celebrated, announced — but fail consistently at the transition to production. Not because the technology is insufficient. Because the governance infrastructure does not exist.",
  },
  {
    icon: "⚠️",
    title: "Shadow AI Proliferation",
    body: "Employees adopt AI tools outside sanctioned channels before governance exists. No visibility, no risk assessment, no audit trail. Directly observed at Yamaha Motor Solutions — across 5 departments simultaneously.",
  },
  {
    icon: "📐",
    title: "Broken Agile Assumptions",
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
        <p className="mt-6 max-w-4xl text-body-lg text-[#6b8aaa]">
          They are failing at the specific, repeatable transition from pilot to
          production — because the governance, methodology, and team architecture
          required to productionise AI capability do not exist in most
          organisations.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {problemCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[20px] border border-[#1a2d45] bg-[#0c1620] p-6"
            >
              <p className="text-2xl">{card.icon}</p>
              <h3 className="mt-4 text-h2 text-[#dde6f0]">{card.title}</h3>
              <p className="mt-3 text-body text-[#6b8aaa]">{card.body}</p>
            </article>
          ))}
        </div>

        <p className="mt-8 text-h3 text-[#f59e0b]">
          AEVA provides the governance infrastructure. The methodology. The team
          architecture. All three — simultaneously.
        </p>
      </div>
    </section>
  );
}
