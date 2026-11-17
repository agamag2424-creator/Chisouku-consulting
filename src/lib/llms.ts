import { foundingClientStatement } from "../content/founding";
import { healthAudit as auditCopy, healthCheck as checkCopy, ladder, selfCheckPitch } from "../content/offer";
import { canonicalAnswers, faqItems, feeCreditAnswer, glossaryTerms } from "./aeoContent";
import { routeSeo } from "./seo";
import { extraDaysSentence, isRouteListed, siteConfig } from "./siteConfig";

// /llms.txt and /llms-full.txt, built from the canonical answers and config. Public text only.

const { healthCheck, healthAudit } = siteConfig.offers;
const link = (path: string) => `${siteConfig.url}${path === "/" ? "" : path}`;

/** Listed pages only, with their titles from the SEO map. */
function keyPages(): string[] {
  return Object.entries(routeSeo)
    .filter(([path]) => isRouteListed(path))
    .map(([path, { title, description }]) => `- [${title}](${link(path)}): ${description}`);
}

export function buildLlmsTxt(): string {
  return [
    `# ${siteConfig.name}`,
    ``,
    `> ${canonicalAnswers.whatWeDo}`,
    ``,
    siteConfig.schemaDescription,
    ``,
    `## Offers`,
    `- Ladder: ${ladder.summary}.`,
    `- [PMO self-check](${link("/pmo-self-check")}): free, about five minutes. ${selfCheckPitch} Answers stay in the browser.`,
    `- [${healthCheck.name}](${link(healthCheck.path)}): ${checkCopy.scope}. ${checkCopy.inputs}. ${checkCopy.outputs}. ${checkCopy.timing}. ${checkCopy.payment}`,
    `- [${healthAudit.name}](${link(healthAudit.path)}): ${auditCopy.scope}. ${auditCopy.priceLine} ${auditCopy.cap} ${auditCopy.payment}`,
    `- ${extraDaysSentence}`,
    `- Fee credit: ${feeCreditAnswer}`,
    ...(siteConfig.foundingSlotsRemaining > 0
      ? [`- Founding-client rate applies to the ${healthAudit.name} only. ${foundingClientStatement(siteConfig.foundingSlotsRemaining)}`]
      : []),
    ``,
    `## Method`,
    `- ${canonicalAnswers.method} [Method](${link("/method")})`,
    ``,
    `## Where we work`,
    `- ${canonicalAnswers.markets}`,
    ``,
    `## Independence and data`,
    `- ${canonicalAnswers.policy} [Independence and data handling](${link("/independence-and-data")})`,
    ``,
    `## Proof`,
    `- ${siteConfig.name} publishes no client names, testimonials or case studies.`,
    ``,
    `## Key pages`,
    ...keyPages(),
    ``,
    `## Contact`,
    `- Legal name: ${siteConfig.legalName}`,
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
