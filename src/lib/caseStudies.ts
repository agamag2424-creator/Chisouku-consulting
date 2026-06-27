export type CaseStudyFrontmatter = {
  title: string;
  sector: string;
  summary: string;
  date: string;
  published: boolean;
  takeaways: string[];
};

export type CaseStudy = CaseStudyFrontmatter & {
  slug: string;
  content: string;
};

const caseStudies: CaseStudy[] = [
  {
    slug: "uber-ai-adoption-question",
    title: "Uber & The AI Adoption Question",
    sector: "Mobility & Logistics",
    summary:
      "A neutral analysis of where enterprise AI adoption failed and what organisations can learn from it",
    date: "2026-06-01",
    published: false,
    takeaways: [
      "AI adoption failure is rarely a technology problem",
      "PMO governance gaps are the leading cause of failed deployments",
      "Most enterprises lack a structured AI transition framework",
    ],
    content: `## Executive Context

This case study draft is currently in preparation. The published analysis will break down where enterprise AI adoption did not meet operational expectations and how those patterns can be corrected.

## What To Expect

- A neutral review of adoption friction points
- Signals that indicate governance and execution gaps early
- A practical transformation lens for PMO-led teams`,
  },
];

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  return [...caseStudies].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getPublishedCaseStudies(): Promise<CaseStudy[]> {
  const studies = await getAllCaseStudies();
  return studies.filter((caseStudy) => caseStudy.published);
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug) ?? null;
}
