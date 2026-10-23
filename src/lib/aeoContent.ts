import { siteConfig } from "./siteConfig";

// Answer content (PRD 9.9, 10). Single source for /faq, FAQPage JSON-LD and llms.txt. Prices, platforms and the fee
// credit come from config. New wording approved by the founder (IN-11, 17 Oct 2026).

const { evidenceCheck, decisionReview } = siteConfig.offers;
const platformList = new Intl.ListFormat("en-GB", { type: "conjunction" }).format(siteConfig.platforms);

export const feeCreditAnswer = `The full Evidence Check fee is credited against a Go-Live Decision Review signed within ${siteConfig.feeCreditDays} days of the Evidence Check report.`;

/** Canonical one-paragraph answers: what ChisokuLabs does, offers, method, markets and policy. */
export const canonicalAnswers = {
  whatWeDo: `Before leadership approves a major ERP or core-platform go-live, ${siteConfig.name} independently tests whether every critical readiness claim has the status, owner, evidence, date and action to defend that decision.`,
  offers: `${evidenceCheck.name}: ${evidenceCheck.days} business days, ${siteConfig.currency} ${evidenceCheck.listPrice.toLocaleString("en-US")}. ${decisionReview.name}: ${decisionReview.days} business days, ${siteConfig.currency} ${decisionReview.listPrice.toLocaleString("en-US")}, ending in Go, Conditional Go or No-Go with the conditions, owners and dates behind it.`,
  method: "READINESS-5 tests every critical claim for Status, Owner, Evidence, Date and Action. Contradiction testing then checks the claims against each other, because the most expensive risks sit between workstreams.",
  markets: `ERP and core-platform programmes in the ${siteConfig.markets.primary} and ${siteConfig.markets.secondary}, on ${platformList}. Remote by default, on site by arrangement.`,
  policy: "No implementation fees, no software resale, no system integrator partnerships or referral fees. Client evidence is processed under a written data-handling policy and never used to train AI models. The review does not guarantee go-live success.",
} as const;

export type FaqItem = {
  id: string;
  question: string;
  /** First sentence answers the question directly; 90 words at most. */
  answer: string;
  related?: { href: string; label: string }[];
};

/** Shared verbatim by the FAQ item "Do you use AI on our data?" and /method ("How we use AI, safely"). */
export const aiOnOurDataAnswer =
  "Yes, to extract claims and cross-check evidence, under the policy. AI processing runs only through providers contracted for zero data retention, and your data is never used to train AI models. Every finding is reviewed and signed by the principal; AI does not make the go-live recommendation.";

/** PRD 9.9, in order. */
export const faqItems: FaqItem[] = [
  {
    id: "si-readiness-review",
    question: "How is this different from our system integrator's readiness review?",
    answer:
      "We are independent of delivery, and your system integrator is not: its review is part of delivery, and its final milestone depends on the date holding. We test every critical claim on READINESS-5, check the claims against each other, and give a Go, Conditional Go or No-Go with the conditions, owners and dates behind it.",
    related: [{ href: "/method", label: "How READINESS-5 works" }],
  },
  {
    id: "trust-our-si",
    question: "We trust our SI. Why would we need independent assurance?",
    answer:
      "Because leadership is asked to approve the go-live on reports written by the people being judged on delivery. We don't assume anyone is misleading you. We check whether the evidence supports what is being reported.",
  },
  {
    id: "when-to-start",
    question: "When should a review start?",
    answer: "Six to sixteen weeks before the go-live decision. Earlier is fine.",
  },
  {
    id: "under-four-weeks",
    question: "We go live in under four weeks. Can you still help?",
    answer: `Yes. A ${evidenceCheck.name}, scoped to the highest-risk domains.`,
    related: [{ href: evidenceCheck.path, label: evidenceCheck.name }],
  },
  {
    id: "platforms",
    question: "Which platforms do you cover?",
    answer: `${platformList}.`,
  },
  {
    id: "team-time",
    question: "What do you need from our team?",
    answer:
      "Documents on day one. Interviews only where the evidence conflicts, which keeps your team's time to a minimum.",
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
    question: "Do you guarantee a successful go-live?",
    answer: "No. The review does not guarantee go-live success.",
  },
  {
    id: "why-publish-prices",
    question: "Why are your prices public?",
    answer:
      "So you can judge the cost before you talk to us, and set it against what a slipped go-live would cost you. Each list price covers one programme, up to five workstreams.",
    related: [{ href: "/pricing", label: "Pricing" }],
  },
  {
    id: "fee-credit",
    question: "What is the fee credit?",
    answer: feeCreditAnswer,
  },
  {
    id: "saudi-arabia",
    question: "Do you work in Saudi Arabia?",
    answer: "Yes. Remote by default, on site by arrangement.",
    related: [{ href: "/go-live-readiness-saudi-arabia", label: "Go-live readiness in Saudi Arabia" }],
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

/** PRD 10 glossary, in the PRD's order. */
export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "go-live-readiness",
    term: "Go-live readiness",
    definition:
      "The state in which a programme can switch to the new system with known, accepted risk. It is shown by evidence for each critical claim, not by status colours.",
  },
  {
    id: "go-no-go-decision",
    term: "Go/no-go decision",
    definition:
      "The formal decision, usually taken by a steering committee, on whether to go live on the planned date. A ChisokuLabs review ends in Go, Conditional Go or No-Go.",
    related: { href: "/go-live-decision-review", label: "Go-Live Decision Review" },
  },
  {
    id: "conditional-go",
    term: "Conditional Go",
    definition:
      "A decision to go live once named conditions are met, each with an owner and a date. If a condition is not met by its date, the decision is revisited.",
  },
  {
    id: "cutover",
    term: "Cutover",
    definition:
      "The planned sequence of steps that moves the business from the old system to the new one, including the final data load, the switch and the checks before users start work.",
  },
  {
    id: "rollback-point",
    term: "Rollback point",
    definition:
      "The last agreed point in cutover at which the programme can return to the old system. It needs a tested rollback plan and a named person who can call it.",
  },
  {
    id: "point-of-no-return",
    term: "Point of no return",
    definition:
      "The moment in cutover after which returning to the old system is no longer practical. After it, problems are fixed forward.",
  },
  {
    id: "hypercare",
    term: "Hypercare",
    definition:
      "The period of heightened support straight after go-live, when the project team stays on to resolve issues quickly before handing over to normal support.",
  },
  {
    id: "sit",
    term: "SIT (system integration testing)",
    definition:
      "Testing that the new system and the systems it connects to exchange data correctly from end to end. It comes before UAT.",
  },
  {
    id: "uat",
    term: "UAT (user acceptance testing)",
    definition:
      "Testing by business users that the system supports their processes. A signed acceptance from each business area is a key piece of readiness evidence.",
  },
  {
    id: "data-migration-reconciliation",
    term: "Data migration reconciliation",
    definition:
      "Checking that the data loaded into the new system matches the source, by record counts, balances and key fields. The evidence is the reconciliation output, signed off by the data owner.",
  },
  {
    id: "mock-load",
    term: "Mock load",
    definition:
      "A rehearsal of the data migration with production-like data, run before cutover to test load times, errors and reconciliation.",
  },
  {
    id: "raid-log",
    term: "RAID log",
    definition:
      "A register of risks, assumptions, issues and dependencies, each with an owner. It is a source for readiness claims, not proof of them.",
  },
  {
    id: "readiness-claim",
    term: "Readiness claim",
    definition:
      "A statement that something is ready for go-live, such as “UAT is complete” or “cutover is rehearsed”. Every critical claim is tested on READINESS-5.",
  },
  {
    id: "readiness-5",
    term: "READINESS-5",
    definition:
      "The ChisokuLabs test for every critical readiness claim: Status, Owner, Evidence, Date and Action. A claim reported Green with 2 of 5 is an assumption, not a fact.",
    related: { href: "/method", label: "How READINESS-5 works" },
  },
  {
    id: "contradiction-testing",
    term: "Contradiction testing",
    definition:
      "Checking readiness claims against each other across workstreams, for example a reconciliation reported as passed while a business entity has not signed UAT. The most expensive risks sit between workstreams.",
    related: { href: "/method", label: "How READINESS-5 works" },
  },
  {
    id: "decision-condition",
    term: "Decision condition",
    definition:
      "Something that must be true before go-live under a Conditional Go, with a named owner and an evidence-by date.",
  },
];
