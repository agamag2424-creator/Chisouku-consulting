import { healthAudit as auditCopy, healthCheck as checkCopy, selfCheckPitch } from "../content/offer";
import { extraDaysSentence, feeCreditSentence, siteConfig } from "./siteConfig";

// Answer content. Single source for /faq, FAQPage JSON-LD and llms.txt. Offer wording comes from content/offer.ts and
// prices from siteConfig.

const { healthCheck, healthAudit } = siteConfig.offers;

export const feeCreditAnswer = feeCreditSentence;

/** Canonical one-paragraph answers: what ChisokuLabs does, offers, method, markets and policy. */
export const canonicalAnswers = {
  whatWeDo:
    `Fixed-price PMO Health Checks and Audits. A ${checkCopy.price} PMO Health Check finds, with evidence and in five working days, whether RAID logs are acted on, whether status turns Red in time and whether governance forums decide. 11+ years in programme delivery.`,
  offers: `Free PMO self-check, then ${healthCheck.name} (${checkCopy.price}), then ${healthAudit.name}. ${healthCheck.name}: ${checkCopy.scope.toLowerCase()}; ${checkCopy.inputs.toLowerCase()}; ${checkCopy.outputs.charAt(0).toLowerCase() + checkCopy.outputs.slice(1)}; ${checkCopy.timing.toLowerCase()}; ${checkCopy.payment} ${checkCopy.credit} ${healthAudit.name}: ${auditCopy.scope.toLowerCase()}; ${auditCopy.priceLine} ${auditCopy.cap} ${extraDaysSentence} ${auditCopy.payment}`,
  method:
    "The PMO Health Scorecard scores ten dimensions, from governance and decision rights to PMO value perception. The free self-check scores them from one person's answers; the Health Check fills them in with evidence from your documents and three short interviews.",
  markets:
    "The UK first. The UAE and Saudi Arabia too, remote by default, on site where agreed. Prices are in US dollars.",
  policy:
    "No implementation fees, no software resale, no system integrator partnerships or referral fees. Client evidence is processed under a written data-handling policy and never used to train AI models. Neither the Health Check nor the Audit guarantees that a programme or portfolio will recover.",
} as const;

export type FaqItem = {
  id: string;
  question: string;
  /** First sentence answers the question directly. */
  answer: string;
  related?: { href: string; label: string }[];
};

/** Shared verbatim by the FAQ item "Do you use AI on our data?" and /method ("How we use AI, safely"). Approved wording. */
export const aiOnOurDataAnswer =
  "Yes, to extract claims and cross-check evidence, under the policy. AI processing runs only through providers contracted for zero data retention, and your data is never used to train AI models. Every finding is reviewed and signed by the principal; AI does not make the health recommendation.";

/** The answer to "is this an accredited assessment" (research file, sections 3.3 and 4). */
export const accreditationAnswer =
  "No. The self-check and the PMO Health Check are informed by public material on PMO and portfolio maturity. Neither is an official or accredited assessment, and we are not an accredited assessor. The methodology note lists the public sources.";

export const faqItems: FaqItem[] = [
  {
    id: "price",
    question: "How much does it cost?",
    answer: `The ${healthCheck.name} is ${checkCopy.price}, ${checkCopy.payment.replace(`${checkCopy.price}, `, "")} The ${healthAudit.name} is ${auditCopy.priceLine} ${auditCopy.cap} ${extraDaysSentence} ${auditCopy.payment} The PMO self-check is free.`,
    related: [{ href: "/pricing", label: "Pricing" }],
  },
  {
    id: "fee-credit",
    question: "Is the Health Check fee credited against the Audit?",
    answer: `Yes. ${checkCopy.credit} ${checkCopy.cancellation}`,
  },
  {
    id: "timing",
    question: "How long does the Health Check take?",
    answer: `${checkCopy.timing}. It covers one programme and ends with a 45-minute readout.`,
    related: [{ href: healthCheck.path, label: healthCheck.name }],
  },
  {
    id: "documents",
    question: "What do you need from us?",
    answer: `${checkCopy.inputs}. We send the exact request on the day you sign.`,
  },
  {
    id: "confidentiality",
    question: "How do you keep our documents confidential?",
    answer:
      "Under a written data-handling policy. Evidence is shared under NDA, stored encrypted in a dedicated engagement workspace with access limited to the founder, and deleted within 30 days of the final readout unless you ask us to keep it.",
    related: [{ href: "/independence-and-data", label: "Independence and data handling" }],
  },
  {
    id: "accredited",
    question: "Is this an accredited assessment?",
    answer: accreditationAnswer,
    related: [{ href: "/pmo-self-check/methodology", label: "Methodology note" }],
  },
  {
    id: "self-check",
    question: "What is the free PMO self-check?",
    answer: `${selfCheckPitch} It takes about five minutes, and your answers stay in your browser.`,
    related: [{ href: "/pmo-self-check", label: "Take the PMO self-check" }],
  },
  {
    id: "health-check-or-audit",
    question: "Should we start with the Health Check or the Audit?",
    answer: `Usually the Health Check, on one programme. ${checkCopy.partialView}`,
  },
  {
    id: "ai-on-our-data",
    question: "Do you use AI on our data?",
    answer: aiOnOurDataAnswer,
    related: [{ href: "/independence-and-data#ai-use", label: "How AI is used" }],
  },
  {
    id: "fixes",
    question: "Do you implement or fix what you find?",
    answer: "No. We stay independent, and we tell you who should own each fix.",
  },
  {
    id: "guarantee",
    question: "Do you guarantee that a programme or portfolio will recover?",
    answer: "No. Neither the Health Check nor the Audit guarantees that a programme or portfolio will recover.",
  },
  {
    id: "where-we-work",
    question: "Where do you work?",
    answer: "The UK first. The UAE and Saudi Arabia too, remote by default, on site where agreed. Prices are in US dollars.",
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
      `A fixed-price check of one programme for ${checkCopy.payment.charAt(0).toLowerCase()}${checkCopy.payment.slice(1)} ${checkCopy.timing}, you receive ${checkCopy.outputs.charAt(0).toLowerCase()}${checkCopy.outputs.slice(1)}. The fee is ${checkCopy.credit.charAt(0).toLowerCase()}${checkCopy.credit.slice(1)}`,
    related: { href: healthCheck.path, label: healthCheck.name },
  },
  {
    id: "pmo-health-audit",
    term: "PMO Health Audit",
    definition:
      `A fixed-price audit of ${auditCopy.scope.charAt(0).toLowerCase()}${auditCopy.scope.slice(1)}. ${auditCopy.priceLine} ${auditCopy.cap}`,
    related: { href: healthAudit.path, label: healthAudit.name },
  },
  {
    id: "pmo-health-scorecard",
    term: "PMO Health Scorecard",
    definition:
      "Ten dimensions, from governance and decision rights to PMO value perception, each scored from Ad hoc to Improving. The free self-check scores them from your answers; the Health Check fills them in with evidence.",
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
