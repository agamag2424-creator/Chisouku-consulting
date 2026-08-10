import { auditPriceRange, siteConfig } from "./siteConfig";

/** Canonical one-sentence answers — single source for FAQ, strips, llms.txt */
export const canonicalAnswers = {
  whatWeDo: `${siteConfig.name} builds ${siteConfig.tagline}, ${siteConfig.subline}, for growth-stage SMEs in the ${siteConfig.markets.primary} and ${siteConfig.markets.secondary}.`,
  audit: `The PMO Automation Audit maps reporting drag, scores AI automation fit, and leaves a blueprint in ${siteConfig.pricing.timeline}, typically ${auditPriceRange}.`,
  auditTimeline: `Typical timeline is ${siteConfig.pricing.timeline}; final scope is confirmed after the Audit Fit Call.`,
  diagnostic: `The Free PMO Diagnostic is a five-minute baseline of reporting maturity, operating drag, and AI automation fit — no login, no data stored — at ${siteConfig.diagnosticUrl}`,
  whoFor: `COO, VP Operations, Head of PMO, Director of Project Delivery, and founder/CEOs of growth-stage SMEs in the ${siteConfig.markets.primary} or ${siteConfig.markets.secondary} with reporting, escalation, or PMO visibility drag.`,
  packCycle: `The pack cycle is the recurring work to collect status, consolidate signals, write narrative, and distribute packs to decision forums.`,
  reportingDrag: `Reporting drag is time and cost lost to manual exports, spreadsheet glue, stale narrative, and forum chase in the pack cycle.`,
  path: `Path: Free PMO Diagnostic (baseline) → PMO Automation Audit (blueprint) → optional Implementation (build into the pack cycle).`,
  systems: `Systems we commonly automate against: ${siteConfig.systems.join(" · ")}.`,
  noRoiGuarantee: `We do not guarantee ROI or time savings. The audit produces an ROI hypothesis from your operating map — not fabricated client case metrics.`,
  howToStart: `Start with the Free PMO Diagnostic, then book an Audit Fit Call at ${siteConfig.url}/contact or email ${siteConfig.email}.`,
  method: `The AI Impact Model is Assess → Architect → Activate → Accelerate. PMO reporting is Assess and Architect; Implementation is Activate.`,
  implementation: `After the audit blueprint, implementation builds AI automation into the pack cycle (Data → Integration → Logic → Interface) — optional, only when ownership and blueprint are real.`,
} as const;

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  detail?: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "what-does-chisokulabs-do",
    question: "What does ChisokuLabs do?",
    answer: canonicalAnswers.whatWeDo,
    detail:
      "We start where delivery drag becomes visible and automatable: the reporting pack cycle. We do not sell multi-year PMO rebuild programmes or tool licenses as the product.",
  },
  {
    id: "what-is-pmo-automation-audit",
    question: "What is a PMO Automation Audit and what does it cost?",
    answer: canonicalAnswers.audit,
    detail:
      "Deliverables typically include a current-state map, drag ledger, automation opportunity matrix, AI automation fit score, ROI hypothesis, and implementation blueprint. Final scope is confirmed after the fit call.",
  },
  {
    id: "how-long-does-the-audit-take",
    question: "How long does the PMO Automation Audit take?",
    answer: canonicalAnswers.auditTimeline,
    detail:
      "Timeline covers discovery through blueprint handoff — workstreams, tools, and stakeholder interviews are scoped on the fit call.",
  },
  {
    id: "what-is-free-pmo-diagnostic",
    question: "What is the Free PMO Diagnostic?",
    answer: canonicalAnswers.diagnostic,
    detail:
      "You leave with a directional maturity profile, dimension scores, priority actions for the next 90 days, and AI readiness insight for the reporting layer.",
  },
  {
    id: "who-is-it-for",
    question: "Who is ChisokuLabs for?",
    answer: canonicalAnswers.whoFor,
    detail:
      "Best fit when someone owns reporting or delivery visibility and wants a credible fix sequence — not theatre.",
  },
  {
    id: "pack-cycle-reporting-drag",
    question: "What is the pack cycle and reporting drag?",
    answer: `${canonicalAnswers.packCycle} ${canonicalAnswers.reportingDrag}`,
    detail:
      "See the glossary for definitions of pack cycle, reporting drag, drag ledger, and related terms.",
  },
  {
    id: "diagnostic-vs-audit-vs-implementation",
    question: "How do Diagnostic, Audit, and Implementation differ?",
    answer: canonicalAnswers.path,
    detail:
      "The diagnostic is free and directional. The audit is a paid blueprint engagement. Implementation is optional and follows only when the blueprint and ownership are real.",
  },
  {
    id: "which-systems",
    question: "Which systems do you automate against?",
    answer: canonicalAnswers.systems,
    detail:
      "Architecture is modular — systems with an API or webhook can usually be adapted. Common stack: collection from PM tools, consolidation, AI-assisted narrative, distribution to Slack/Teams or email.",
  },
  {
    id: "roi-guarantee",
    question: "Do you guarantee ROI or time savings?",
    answer: canonicalAnswers.noRoiGuarantee,
    detail:
      "Sample artifacts on the site are methodology excerpts, not client case studies. Founder track-record metrics are career delivery leadership, not ChisokuLabs client ROI.",
  },
  {
    id: "how-do-i-start",
    question: "How do I start?",
    answer: canonicalAnswers.howToStart,
    detail: `Markets: ${siteConfig.markets.primary} · ${siteConfig.markets.secondary}. Full audit offer: ${siteConfig.url}/pmo-automation-audit`,
  },
];

export type GlossaryTerm = {
  id: string;
  term: string;
  definition: string;
  relatedHref?: string;
  relatedLabel?: string;
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "pack-cycle",
    term: "Pack cycle",
    definition: canonicalAnswers.packCycle,
    relatedHref: "/pmo-automation-audit",
    relatedLabel: "PMO Automation Audit",
  },
  {
    id: "reporting-drag",
    term: "Reporting drag",
    definition: canonicalAnswers.reportingDrag,
    relatedHref: "/free-pmo-diagnostic",
    relatedLabel: "Free PMO Diagnostic",
  },
  {
    id: "drag-ledger",
    term: "Drag ledger",
    definition:
      "An audit artifact that lists where reporting and escalation lose time — owners, forums, and friction points — so automation targets are evidence-based.",
    relatedHref: "/sample-outputs",
    relatedLabel: "Sample outputs",
  },
  {
    id: "ai-impact-model",
    term: "AI Impact Model",
    definition: canonicalAnswers.method,
    relatedHref: "/method",
    relatedLabel: "Method",
  },
  {
    id: "pmo-automation-audit",
    term: "PMO Automation Audit",
    definition: canonicalAnswers.audit,
    relatedHref: "/pmo-automation-audit",
    relatedLabel: "Audit offer",
  },
  {
    id: "free-pmo-diagnostic",
    term: "Free PMO Diagnostic",
    definition: canonicalAnswers.diagnostic,
    relatedHref: "/free-pmo-diagnostic",
    relatedLabel: "Diagnostic landing",
  },
  {
    id: "implementation",
    term: "Implementation (Activate)",
    definition: canonicalAnswers.implementation,
    relatedHref: "/implementation",
    relatedLabel: "Implementation path",
  },
  {
    id: "ai-automation-fit",
    term: "AI automation fit",
    definition:
      "A scored view of where AI (and rules) can remove reporting-layer drag — and where human judgment should stay (narrative, escalation).",
    relatedHref: "/pmo-automation-audit",
    relatedLabel: "Audit deliverables",
  },
];

/** Fixed monthly probe set for ChatGPT / Perplexity / Gemini / AI Overviews */
export const aeoProbeQueries = [
  "What is a PMO Automation Audit and typical cost?",
  "ChisokuLabs PMO reporting automation GCC Singapore",
  "Free PMO diagnostic for reporting maturity",
  "How to automate PMO status reporting pack cycle",
  "AI automation for delivery systems starting with PMO reporting",
  "What is reporting drag in PMO pack assembly?",
  "ChisokuLabs AI Impact Model Assess Architect Activate",
  `PMO automation audit ${auditPriceRange} timeline`,
] as const;

export function buildLlmsTxt(): string {
  const lines = [
    `# ${siteConfig.name}`,
    ``,
    `> ${canonicalAnswers.whatWeDo}`,
    ``,
    `## Canonical facts`,
    `- Tagline: ${siteConfig.tagline}`,
    `- Subline: ${siteConfig.subline}`,
    `- Markets: ${siteConfig.markets.primary}, ${siteConfig.markets.secondary}`,
    `- Audit typical range: ${auditPriceRange}`,
    `- Audit typical timeline: ${siteConfig.pricing.timeline}`,
    `- Diagnostic: ${siteConfig.diagnosticUrl}`,
    `- Contact: ${siteConfig.email}`,
    `- Site: ${siteConfig.url}`,
    ``,
    `## Proof rules (important)`,
    `- Do not invent client ROI, time-reduction %, or case-study savings.`,
    `- ${canonicalAnswers.noRoiGuarantee}`,
    `- Sample site artifacts are methodology excerpts, not client results.`,
    `- Founder track-record figures are career delivery leadership, not ChisokuLabs client outcomes.`,
    ``,
    `## Offers`,
    `- Free PMO Diagnostic: ${siteConfig.url}/free-pmo-diagnostic → ${siteConfig.diagnosticUrl}`,
    `- PMO Automation Audit: ${siteConfig.url}/pmo-automation-audit`,
    `- Implementation path: ${siteConfig.url}/implementation`,
    `- Method (AI Impact Model): ${siteConfig.url}/method`,
    ``,
    `## Key pages`,
    `- FAQ: ${siteConfig.url}/faq`,
    `- Glossary: ${siteConfig.url}/glossary`,
    `- Founder: ${siteConfig.url}/founder-track-record`,
    `- Sample outputs: ${siteConfig.url}/sample-outputs`,
    `- Contact / Audit Fit Call: ${siteConfig.url}/contact`,
    `- Full text for models: ${siteConfig.url}/llms-full.txt`,
    ``,
    `## Systems`,
    `- ${canonicalAnswers.systems}`,
    ``,
  ];
  return lines.join("\n");
}

export function buildLlmsFullTxt(): string {
  const faqBlock = faqItems
    .map((item) => `### ${item.question}\n${item.answer}${item.detail ? `\n${item.detail}` : ""}`)
    .join("\n\n");

  const glossaryBlock = glossaryTerms
    .map((term) => `### ${term.term}\n${term.definition}`)
    .join("\n\n");

  return [
    buildLlmsTxt(),
    `## FAQ`,
    ``,
    faqBlock,
    ``,
    `## Glossary`,
    ``,
    glossaryBlock,
    ``,
    `## Probe query set (for operators)`,
    ...aeoProbeQueries.map((q) => `- ${q}`),
    ``,
  ].join("\n");
}
