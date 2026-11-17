import Image from "next/image";
import { backgroundLine } from "../../content/offer";
import { siteConfig } from "../../lib/siteConfig";
import { cn } from "../../lib/utils";
import { Section } from "../ui/Section";

const { founder } = siteConfig;

/** Photo (square, about 320 px on desktop) or, until the file is added, the founder's initials. */
function FounderPhoto({ className }: { className?: string }) {
  if (founder.photo) {
    return (
      <Image
        src={founder.photo}
        alt={founder.name}
        width={320}
        height={320}
        sizes="(min-width: 1100px) 320px, 240px"
        className={cn("aspect-square w-full max-w-[240px] rounded-sheet object-cover min-[1100px]:max-w-[320px]", className)}
      />
    );
  }
  const initials = founder.name
    .split(" ")
    .map((part) => part[0])
    .join("");
  return (
    <div
      role="img"
      aria-label={founder.name}
      className={cn(
        "flex aspect-square w-full max-w-[240px] items-center justify-center rounded-sheet bg-ink font-[family-name:var(--font-display)] text-6xl font-semibold text-paper min-[1100px]:max-w-[320px]",
        className,
      )}
    >
      {initials}
    </div>
  );
}

/**
 * "Who does the work" (change 1), shared by the homepage and /about: photo, name, title, LinkedIn and the founder's
 * line in his own words. Employers are named as employers, never clients. No credentials are named.
 */
export function PrincipalBlock({ tone = "paper", id, heading = "Who does the work" }: { tone?: "page" | "paper"; id?: string; heading?: string }) {
  if (!siteConfig.principalBlock) return null;
  return (
    <Section tone={tone} id={id}>
      <div className="grid gap-8 min-[800px]:grid-cols-[minmax(0,320px)_minmax(0,1fr)] min-[800px]:items-center min-[800px]:gap-14" data-founder>
        <FounderPhoto />
        <div>
          <h2 className="t-h2 text-ink">{heading}</h2>
          <p className="t-body mt-5 text-ink" data-founder-line>
            <span className="font-[family-name:var(--font-display)] text-[22px] font-semibold">{founder.name}</span>,{" "}
            <span className="font-semibold">{founder.title}</span>. Every Health Check and Audit is carried out
            and signed by me. {backgroundLine}
          </p>
          <a
            href={founder.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="founder_linkedin"
            className="mt-5 inline-flex items-center gap-2 text-[16px] font-semibold text-teal underline underline-offset-4 hover:decoration-2"
          >
            {founder.name} on LinkedIn
          </a>
        </div>
      </div>
    </Section>
  );
}
