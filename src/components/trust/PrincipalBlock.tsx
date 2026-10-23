import { siteConfig } from "../../lib/siteConfig";
import { Section } from "../ui/Section";

// PRD 8.3 (IN-3 approved). No image, name or links (PRD L4). Hidden entirely when siteConfig.principalBlock is false.
const paragraph =
  "Every review is led and signed by a principal with 11+ years leading ERP and transformation programmes across aviation, banking and manufacturing, including multi-country go-lives.";

const chips = ["11+ years", "Aviation", "Banking", "Manufacturing", "Multi-country go-lives"] as const;

/** "Principal-led" section, shared by the homepage and the offer pages (E6.2). */
export function PrincipalBlock({ tone = "paper", id }: { tone?: "page" | "paper"; id?: string }) {
  if (!siteConfig.principalBlock) return null;
  return (
    <Section tone={tone} id={id}>
      <div className="grid gap-6 min-[1100px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] min-[1100px]:items-center min-[1100px]:gap-16">
        <div className="flex flex-col gap-5">
          <h2 className="t-h2 text-ink">Principal-led</h2>
          <span aria-hidden className="flex items-center gap-4">
            <span className="w-full max-w-[220px] border-t border-ink" />
            <span className="shrink-0 text-[13px] text-muted">Led and signed by a principal</span>
          </span>
        </div>
        <div className="flex flex-col gap-6">
          <p className="t-body text-ink">{paragraph}</p>
          <ul className="flex flex-wrap gap-2" aria-label="Experience">
            {chips.map((chip) => (
              <li key={chip} className="rounded-full border border-line bg-paper px-3.5 py-2 text-[14px] font-medium text-ink">
                {chip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
