/**
 * Offer wording: the single source shared by the site and the cold emails (September port PRD, "Offer and copy source
 * of truth"). Change it here first, then in the emails. Prices come from siteConfig; never type a price in JSX.
 */
import { calendlyLink, extraDaysSentence, formatPrice, siteConfig, type CalendlyContent } from "../lib/siteConfig";

const check = siteConfig.offers.healthCheck;
const audit = siteConfig.offers.healthAudit;

export const ladder = {
  summary: `Free PMO self-check, then PMO Health Check (${formatPrice(check.listPrice)}), then PMO Health Audit`,
  steps: [
    {
      key: "selfCheck",
      name: "PMO self-check",
      price: "Free",
      meta: "5 minutes, online",
      body: "The same ten dimensions the paid Health Check fills in with evidence, scored from your own answers.",
      href: "/pmo-self-check",
    },
    {
      key: "healthCheck",
      name: check.name,
      price: formatPrice(check.listPrice),
      meta: "One programme, five working days",
      body: "The PMO Health Scorecard filled in with evidence, the top findings, a 30-day fix plan and a 45-minute readout.",
      href: check.path,
    },
    {
      key: "healthAudit",
      name: audit.name,
      price: formatPrice(audit.listPrice),
      meta: "The whole portfolio, capped at 5 working days",
      body: "The whole portfolio, scored with evidence on the same ten scorecard dimensions.",
      href: audit.path,
    },
  ],
} as const;

/** PMO Health Check: exact wording from the source-of-truth table. */
export const healthCheck = {
  name: check.name,
  scope: "One programme",
  inputs: "Your status pack, RAID log, governance calendar and plan, plus three short interviews",
  outputs: "The PMO Health Scorecard filled in with evidence, the top findings, a 30-day fix plan and a 45-minute readout",
  timing: "Five working days after documents arrive",
  price: formatPrice(check.listPrice),
  payment: `${formatPrice(check.listPrice)}, paid in full on signature.`,
  credit: `Credited in full against the Audit if the Audit is signed within ${siteConfig.feeCreditDays} days.`,
  /** Review decision 2: the fee is not returned on cancellation. The word "refund" is never used for the Health Check. */
  cancellation: "If you cancel, the fee is not returned.",
  partialView:
    "One programme gives only a partial view of prioritisation, capacity and PMO value. The PMO Health Audit covers those across the whole portfolio.",
} as const;

/** PMO Health Audit: exact wording from the source-of-truth table and the 17 Nov decisions. */
export const healthAudit = {
  name: audit.name,
  scope: "The whole portfolio, scored with evidence on the same ten scorecard dimensions",
  listPrice: formatPrice(audit.listPrice),
  foundingPrice: audit.foundingPrice === null ? null : formatPrice(audit.foundingPrice),
  priceLine: `${formatPrice(audit.listPrice)} list, ${formatPrice(audit.foundingPrice ?? audit.listPrice)} founding.`,
  cap: "Capped at 5 working days.",
  extraDays: extraDaysSentence,
  payment: "Paid 50/50: half on signature, half on delivery.",
} as const;

export const selfCheckPitch =
  "The online PMO self-check is the scorecard: the same ten dimensions the paid Health Check fills in with evidence.";

export const threeProblemsLine =
  "RAID logs nobody acts on. Status that turns Red too late. Governance forums that cannot actually decide.";

/** Headline option 1 (decided 17 Nov 2026). */
export const headline = {
  h1: "RAID logs nobody acts on. Status that turns Red too late. Forums that cannot decide.",
  sub: "A fixed-price PMO Health Check finds which one is yours, with evidence, in five working days.",
  market: "For UK organisations running a PMO",
} as const;

export const backgroundLine = "11+ years in programme delivery. Employed at Yamaha, Etihad, HCLTech and Coforge.";

export const ctas = {
  primaryLabel: "Book a 20-minute call",
  secondaryLabel: "Take the PMO self-check (5 minutes)",
  secondaryHref: "/pmo-self-check",
} as const;

export const primaryCtaHref = (content: CalendlyContent) => calendlyLink(content);
