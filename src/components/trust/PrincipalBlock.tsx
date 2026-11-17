import { backgroundLine } from "../../content/offer";
import { siteConfig } from "../../lib/siteConfig";
import { Button } from "../ui/Button";
import { Section } from "../ui/Section";

// Background line from the source-of-truth table: "11+ years in programme delivery", employers never named as clients.
// No photo or credentials (none are named unless the founder provides them). Hidden when siteConfig.principalBlock is false.
const paragraph = `Every Health Check and Audit is carried out and signed by the founder. ${backgroundLine}`;

/** "Who does the work", shared by the homepage and the offer pages. */
export function PrincipalBlock({ tone = "paper", id }: { tone?: "page" | "paper"; id?: string }) {
  if (!siteConfig.principalBlock) return null;
  return (
    <Section tone={tone} id={id}>
      <div className="grid gap-6 min-[1100px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] min-[1100px]:items-center min-[1100px]:gap-16">
        <h2 className="t-h2 text-ink">Who does the work</h2>
        <div>
          <p className="t-body text-ink">{paragraph}</p>
          <div className="mt-5">
            <Button href="/about" variant="text">
              About ChisokuLabs
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
