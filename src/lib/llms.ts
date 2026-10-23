import { foundingClientStatement } from "../content/founding";
import { markets } from "../content/markets";
import { sampleLabel } from "../content/samplePack";
import { canonicalAnswers, faqItems, feeCreditAnswer, glossaryTerms } from "./aeoContent";
import { routeSeo } from "./seo";
import { isRouteLive, siteConfig } from "./siteConfig";

// /llms.txt and /llms-full.txt (PRD 10, E8.4), built from the canonical answers and config. Public text only: nothing
// here may be internal (backlog rule 14).

const { evidenceCheck, decisionReview, continuous } = siteConfig.offers;
const money = (value: number) => `${siteConfig.currency} ${value.toLocaleString("en-US")}`;
const link = (path: string) => `${siteConfig.url}${path === "/" ? "" : path}`;

/** Live pages only, with their titles from the SEO map. */
function keyPages(): string[] {
  return Object.entries(routeSeo)
    .filter(([path]) => isRouteLive(path))
    .map(([path, { title, description }]) => `- [${title}](${link(path)}): ${description}`);
}

export function buildLlmsTxt(): string {
  return [
    `# ${siteConfig.name}`,
    ``,
    `> ${canonicalAnswers.whatWeDo}`,
    ``,
    `${siteConfig.tagline}. ${siteConfig.positioning}`,
    ``,
    `## Offers`,
    `- [${evidenceCheck.name}](${link(evidenceCheck.path)}): ${evidenceCheck.days} business days, ${money(evidenceCheck.listPrice)}.`,
    `- [${decisionReview.name}](${link(decisionReview.path)}): ${decisionReview.days} business days, ${money(decisionReview.listPrice)}. Ends in Go, Conditional Go or No-Go with the conditions, owners and dates behind it.`,
    `- ${continuous.name}: from ${money(continuous.listPriceFromMonthly)} per month, until go-live and hypercare.`,
    `- Fee credit: ${feeCreditAnswer}`,
    ...(siteConfig.foundingSlotsRemaining > 0
      ? [
          `- ${foundingClientStatement(siteConfig.foundingSlotsRemaining)}`,
        ]
      : []),
    ``,
    `## Method`,
    `- ${canonicalAnswers.method} [Method](${link("/method")})`,
    ``,
    `## Markets`,
    `- ${canonicalAnswers.markets}`,
    ...Object.values(markets).map((market) => `- [${market.name}](${link(market.path)})`),
    ``,
    `## Independence and data`,
    `- ${canonicalAnswers.policy} [Independence and data handling](${link("/independence-and-data")})`,
    ``,
    `## Proof`,
    `- ${siteConfig.name} publishes no client names, testimonials or case studies.`,
    `- The sample decision pack is labelled: "${sampleLabel}"`,
    ``,
    `## Key pages`,
    ...keyPages(),
    ``,
    `## Contact`,
    `- Email: ${siteConfig.email}`,
    `- [Discuss your programme](${link("/contact")})`,
    `- Full text: ${link("/llms-full.txt")}`,
    ``,
  ].join("\n");
}

export function buildLlmsFullTxt(): string {
  return [
    buildLlmsTxt(),
    `## FAQ`,
    ``,
    ...faqItems.map((item) => `### ${item.question}\n${item.answer}\n`),
    `## Glossary`,
    ``,
    ...glossaryTerms.map((term) => `### ${term.term}\n${term.definition}\n`),
  ].join("\n");
}
