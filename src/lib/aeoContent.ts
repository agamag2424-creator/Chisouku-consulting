import { feeCreditSentence, siteConfig } from "./siteConfig";

// Answer content. Single source for /faq, FAQPage JSON-LD and llms.txt. Prices and the fee credit come from config.

const { healthCheck, healthAudit } = siteConfig.offers;

export const feeCreditAnswer = feeCreditSentence;

/** Canonical one-paragraph answers: what ChisokuLabs does, offers, method, markets and policy. */
export const canonicalAnswers = {
  whatWeDo: `A fixed-price, independent check of how one programme or portfolio is governed, reported and run, with a 30-day fix plan. Led by a PMO lead with 11+ years running programmes.`,
  offers: `${healthCheck.name}: ${healthCheck.days} working days, ${siteConfig.currency} ${healthCheck.listPrice.toLocaleString("en-US")}, one programme. ${healthAudit.name}: ${healthAudit.days} working days, list ${siteConfig.currency} ${healthAudit.listPrice.toLocaleString("en-US")}, founding-client rate ${siteConfig.currency} ${healthAudit.foundingPrice?.toLocaleString("en-US")}. The score is Healthy, Needs attention or At risk, with a 30-day fix plan. Extra days on the audit are quoted separately at the same day rate.`,
  method:
    "HEALTH-5 tests every critical status claim for Status, Owner, Evidence, Date and Action. Contradiction testing then checks the claims against each other, because the most expensive risks sit between projects, reports and forums, not inside any one of them.",
  markets:
    "The UK first. The UAE by arrangement, remote by default, on site where agreed. Remote work elsewhere is by arrangement.",
  policy:
    "No implementation fees, no software resale, no system integrator partnerships or referral fees. Client evidence is processed under a written data-handling policy and never used to train AI models. The audit does not guarantee that a programme or portfolio will recover.",
} as const;

export type FaqItem = {
  id: string;
  question: string;
  /** First sentence answers the question directly. */
  answer: string;
  related?: { href: string; label: string }[];
};

/** Shared verbatim by the FAQ item "Do you use AI on our data?" and /method ("How we use AI, safely"). */
export const aiOnOurDataAnswer =
  "Yes, to extract claims and cross-check evidence, under the policy. AI processing runs only through providers contracted for zero data retention, and your data is never used to train AI models. Every finding is reviewed and signed by the principal; AI does not make the health recommendation.";

export const faqItems: FaqItem[] = [
  {
    id: "head-of-pmo",
    question: "How is this different from hiring a Head of PMO, or a freelance PMO at a day rate?",
    answer:
      "A Head of PMO is a hire. A day-rate PMO joins the team. We stay independent of delivery, test every critical claim on HEALTH-5, and leave you with a score and a 30-day fix plan. We do not take the delivery role.",
    related: [{ href: "/method", label: "How HEALTH-5 works" }],
  },
  {
    id: "why-independent",
    question: "Why would we need an independent check?",
    answer:
      "Because leadership is asked to act on reports written by the people being judged on delivery. We don't assume anyone is misleading you. We check whether the evidence supports what is being reported.",
  },
  {
    id: "when-to-start",
    question: "When should a check start?",
    answer: "As soon as status reports and a RAID log exist. Earlier is more useful, because there is still time to act.",
  },
  {
    id: "one-programme",
    question: "Do you start with one programme?",
    answer: `Yes. The ${healthCheck.name} is scoped to one programme, and is the usual starting point.`,
    related: [{ href: healthCheck.path, label: healthCheck.name }],
  },
  {
    id: "what-we-look-at",
    question: "What do you look at?",
    answer:
      "Governance, reporting, RAID, cadence, prioritisation and the PMO operating model. The work is not limited to a single software platform.",
  },
  {
    id: "team-time",
    question: "What do you need from our team?",
    answer:
      "Documents on day one. The Health Check includes one sponsor and two team interviews (45 minutes each, remote).",
  },
  {
    id: "protect-documents",
    question: "How do you protect our documents?",
    answer:
      "Under a written data-handling policy. Evidence is shared under NDA, stored encrypted in a dedicated engagement workspace with access limited to the principal, and deleted within 30 days of the final readout unless you ask us to keep it.",
    related: [{ href: "/independence-and-data", label: "Independence and data handling" }],
  },
  {
    id: "ai-on-our-data",
    question: "Do you use AI on our data?",
    answer: aiOnOurDataAnswer,
    related: [{ href: "/independence-and-data#ai-use", label: "How AI is used" }],
  },
  {
    id: "guarantee",
    question: "Do you guarantee that a programme or portfolio will recover?",
    answer: "No. The audit does not guarantee that a programme or portfolio will recover.",
  },
  {
    id: "why-publish-prices",
    question: "Why are your prices public?",
    answer:
      "So you can judge the cost before you talk to us. The Health Check is one programme. The Audit list price covers one portfolio review, scoped on the call.",
    related: [{ href: "/pricing", label: "Pricing" }],
  },
  {
    id: "fee-credit",
    question: "What is the fee credit?",
    answer: feeCreditAnswer,
  },
  {
    id: "where-we-work",
    question: "Where do you work?",
    answer:
      "The UK first. The UAE by arrangement, remote by default, on site where agreed. Remote work elsewhere is by arrangement.",
  },
  {
    id: "fixes",
    question: "Do you implement or fix what you find?",
    answer: "No. We stay independent, and we tell you who should own each fix.",
  },
];

export type GlossaryTerm = {
  /** Anchor on /glossary. */
  id: string;
  term: string;
  /** One to three sentences. */
  definition: string;
  related?: { href: string; label: string };
};

/** PMO health glossary, in reading order. Go-live-only terms are not listed. */
export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "pmo-health-check",
    term: "PMO Health Check",
    definition:
      "A fixed-price check of one programme, delivered in 5 working days from the documents, for USD 500. You receive a Project Health Scorecard, the top findings, a 30-day fix plan and a 45-minute readout. The fee is credited in full against a PMO Health Audit signed within 60 days of the readout.",
    related: { href: healthCheck.path, label: healthCheck.name },
  },
  {
    id: "pmo-health-audit",
    term: "PMO Health Audit",
    definition:
      "A fixed-price audit of how a programme or portfolio is governed, reported and run, capped at 5 working days, at a list price of USD 5,000 or a founding-client rate of USD 2,500. Extra days are quoted separately at the same day rate. The score is Healthy, Needs attention or At risk, with a 30-day fix plan.",
    related: { href: healthAudit.path, label: healthAudit.name },
  },
  {
    id: "project-health-scorecard",
    term: "Project Health Scorecard",
    definition:
      "The scored deliverable from a Health Check or a Health Audit. It covers scope, schedule, risk, resourcing and stakeholder communications, and it records the evidence behind the score.",
  },
  {
    id: "healthy",
    term: "Healthy",
    definition: "The evidence supports the status being reported.",
  },
  {
    id: "needs-attention",
    term: "Needs attention",
    definition: "Named gaps, owners and dates that must be closed first.",
  },
  {
    id: "at-risk",
    term: "At risk",
    definition: "What is missing, and the 30-day fix plan to recover.",
  },
  {
    id: "raid-log",
    term: "RAID log",
    definition:
      "A register of risks, assumptions, issues and dependencies, each with an owner and, where it is an action, a due date. A log that is up to date is not the same as a log that has been acted on.",
  },
  {
    id: "health-5",
    term: "HEALTH-5",
    definition:
      "The ChisokuLabs test for every critical status claim: Status, Owner, Evidence, Date and Action. A claim reported Green with 2 of 5 is an assumption, not a fact.",
    related: { href: "/method", label: "How HEALTH-5 works" },
  },
  {
    id: "contradiction-testing",
    term: "Contradiction testing",
    definition:
      "Checking status claims against each other across projects, reports and forums. The most expensive risks sit between them, not inside any one of them.",
    related: { href: "/method", label: "How HEALTH-5 works" },
  },
  {
    id: "status-evidence",
    term: "Status evidence",
    definition:
      "An artefact that shows whether a reported status is true: a status pack, a RAID log, governance minutes or a plan. The score rests on the artefact, not on the colour in the pack.",
  },
  {
    id: "governance",
    term: "Governance",
    definition:
      "The forums, owners and decisions that run a programme or portfolio. A forum that met is not the same as a forum that decided.",
  },
];
