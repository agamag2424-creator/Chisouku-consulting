import type { Metadata } from "next";
import { Body, List, Part } from "../../../components/legal/LegalParts";
import { Button } from "../../../components/ui/Button";
import { Section } from "../../../components/ui/Section";
import { bands, provisionalAfter, weakAt } from "../../../content/pmoSelfCheck";
import { pageMetadata } from "../../../lib/seo";

export const metadata: Metadata = pageMetadata("/pmo-self-check/methodology");

const sources: { name: string; href: string; note: string }[] = [
  {
    name: "PMI, Project Management Offices: A Practice Guide (2025) and the PMO Value Ring",
    href: "https://pmoga.pmi.org/resources/pmo-practice-guide",
    note: "A PMO is judged by the value the people it serves see in it. This shaped the PMO value and executive ownership questions.",
  },
  {
    name: "PeopleCert, PRINCE2 P3M3 maturity model",
    href: "https://www.peoplecert.org/Organizations/Services/Drive-Organisational-Growth-P3M3",
    note: "Its seven perspectives (governance, control, benefits, risk, stakeholders, finance and resources) shaped the list of dimensions.",
  },
  {
    name: "PeopleCert, P3O (Portfolio, Programme and Project Offices)",
    href: "https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/P3O-7",
    note: "The PMO as a decision-support function. This shaped the reporting and data questions.",
  },
  {
    name: "PMI, The Standard for Organizational Project Management (2018), and OPM3",
    href: "https://www.pmi.org/standards/organizational-project-management",
    note: "The progression from standardising to measuring, controlling and improving shaped levels 2 to 5.",
  },
  {
    name: "CMMI Institute (ISACA), levels of capability and performance",
    href: "https://cmmiinstitute.com/learning/appraisals/levels",
    note: "The general shape most maturity models share. Our level wording is our own.",
  },
  {
    name: "ISO 21500, 21502, 21504 and 21505",
    href: "https://www.iso.org/standard/75704.html",
    note: "Neutral, method-agnostic vocabulary, and the principle that practice should be proportionate to the work.",
  },
];

/** Methodology note for the PMO self-check (September port PRD, Story 5.4; research file sections 1, 3, 4 and 5). */
export default function SelfCheckMethodologyPage() {
  return (
    <>
      <Section className="report-cover">
        <p className="eyebrow">PMO self-check</p>
        <h1 className="t-h1 max-w-[22ch] text-ink">Methodology note</h1>
        <p className="t-body mt-5 max-w-[62ch] text-muted">
          How the self-check was built, how it is scored, and what it is not.
        </p>
      </Section>

      <Section tone="paper">
        <div className="flex max-w-[760px] flex-col gap-12">
          <Part title="Informed by public material">
            <Body>
              The self-check is informed by public material on PMO and portfolio maturity. We read public pages, leaflets,
              abstracts and previews only. All 15 questions and their 75 level descriptions are written in our own words,
              and the level names (Ad hoc, Emerging, Defined, Measured, Improving) are our own.
            </Body>
            <ul className="flex flex-col gap-4">
              {sources.map((s) => (
                <li key={s.href} className="text-[16px] leading-[1.6]">
                  <a href={s.href} className="font-semibold text-teal underline underline-offset-4" rel="noopener noreferrer" target="_blank">
                    {s.name}
                  </a>
                  <span className="text-muted">. {s.note}</span>
                </li>
              ))}
            </ul>
          </Part>

          <Part title="How it is scored">
            <List
              items={[
                "Each answered question scores 1 to 5.",
                "A dimension's score is the average of its answered questions.",
                "The overall score is the average of the dimension scores, with every dimension weighted equally, so a dimension with two questions does not count double.",
                `"Not sure" answers are left out of the averages and listed. More than ${provisionalAfter} of 15 makes the result provisional.`,
                `Any dimension at ${weakAt.toFixed(1)} or below is flagged, whatever the overall band.`,
                `Bands: ${bands.map((b) => `${b.name} (${b.range})`).join(", ")}.`,
              ]}
            />
            <Body>
              Two assumptions: equal weighting, because no source we found publishes evidence-based weights for these
              dimensions; and round band cut-offs, chosen for readability and not calibrated against any dataset.
            </Body>
          </Part>

          <Part title="What it is not">
            <List
              items={[
                "It is not an official or accredited assessment under any of the frameworks above, and it gives no level or score under them.",
                "It does not compare you with other organisations. We publish no averages or percentiles.",
                "It is a self-reported snapshot from one person. The PMO Health Check tests the same ten dimensions against evidence.",
              ]}
            />
          </Part>

          <Part title="Trademarks">
            <Body>
              PRINCE2®, P3M3® and P3O® are registered trademarks of the PeopleCert group. PMI® is a registered mark of the
              Project Management Institute, Inc. CMMI® is a registered trademark of ISACA. ChisokuLabs is not affiliated with
              or endorsed by these organisations.
            </Body>
          </Part>

          <div>
            <Button href="/pmo-self-check" variant="primary" ctaId="self_check">
              Take the PMO self-check
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
