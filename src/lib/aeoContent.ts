import { siteConfig } from "./siteConfig";

// Answer content (PRD 9.9, 10). Single source for /faq, FAQPage JSON-LD and llms.txt. Prices, platforms and the fee
// credit come from config. Answers marked in PRD 9.9 as new wording await founder approval (IN-11).

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
    answer:
      "Yes, to extract claims and cross-check evidence, under the policy. AI processing runs only through providers contracted for zero data retention, and your data is never used to train AI models. Every finding is reviewed and signed by the principal; AI does not make the go-live recommendation.",
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
