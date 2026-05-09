const problemCards = [
  {
    icon: "⚠️",
    title: "Shadow AI Proliferation",
    body: "Employees adopt AI tools outside sanctioned channels. No visibility, no risk assessment, no audit trail. It spreads before anyone has named it.",
  },
  {
    icon: "🔀",
    title: "Agentic Workflow Risk",
    body: "AI agents make decisions autonomously across systems. Without a governance layer, no one knows what decisions were made, by whom, or why.",
  },
  {
    icon: "📉",
    title: "Policy-Delivery Gap",
    body: "AI policies exist on paper. Delivery teams ignore them under pressure. The gap between what is written and what is practiced grows with every sprint.",
  },
];

export function AevaProblem() {
  return (
    <section className="bg-[#050a12] py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y)]">
      <div className="mx-auto w-full max-w-[var(--content-max-width)] px-[var(--content-padding-x-mobile)] md:px-[var(--content-padding-x)]">
        <p className="text-label text-[#00d4ff]">THE PROBLEM</p>
        <h2 className="mt-4 max-w-4xl text-display text-[#dde6f0]">
          Enterprises are adopting AI faster than their governance can keep up
        </h2>

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
          AEVA was built to close all three gaps — simultaneously.
        </p>
      </div>
    </section>
  );
}
