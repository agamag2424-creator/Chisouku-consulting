import Link from "next/link";
import { BrandMark } from "../brand/BrandMark";
import { isRouteLive, siteConfig } from "../../lib/siteConfig";

type FooterLink = { href: string; label: string };

/** Footer links (PRD 4.3). Each group shows only live routes; an empty group is omitted. */
const groups: { title: string; links: FooterLink[] }[] = [
  {
    title: "Site",
    links: [
      { href: siteConfig.offers.decisionReview.path, label: siteConfig.offers.decisionReview.name },
      { href: siteConfig.offers.evidenceCheck.path, label: siteConfig.offers.evidenceCheck.name },
      { href: "/method", label: "Method" },
      { href: "/see-it-first", label: "See it first" },
      { href: "/pricing", label: "Pricing" },
      { href: "/faq", label: "FAQ" },
      { href: "/glossary", label: "Glossary" },
      { href: "/independence-and-data", label: "Independence and data" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
  {
    title: "Markets",
    links: [
      { href: "/go-live-readiness-uae", label: "UAE" },
      { href: "/go-live-readiness-saudi-arabia", label: "Saudi Arabia" },
    ],
  },
  // Guides (PRD 4.1) join this list in E8.3, with their titles.
];

const linkClass = "text-paper/80 underline-offset-4 transition-colors hover:text-paper hover:underline";

/** The site's one dark surface (PRD E0.5). */
export function Footer() {
  const liveGroups = groups
    .map((group) => ({ ...group, links: group.links.filter((link) => isRouteLive(link.href)) }))
    .filter((group) => group.links.length > 0);

  return (
    <footer className="bg-ink text-paper/80">
      <div className="mx-auto grid max-w-[var(--content-max-width)] gap-10 px-[var(--content-padding-x-mobile)] py-14 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] md:px-[var(--content-padding-x)]">
        <div>
          <Link href="/" className="mb-4 flex items-center gap-3" aria-label="ChisokuLabs home">
            <BrandMark className="h-9 w-9" inverted />
            <span className="font-[family-name:var(--font-display)] text-[20px] font-bold tracking-[-0.03em] text-paper">
              ChisokuLabs
            </span>
          </Link>
          <p className="t-small max-w-[46ch]">
            Independent go-live decision assurance for ERP and core-platform programmes in the UAE and Saudi Arabia.
          </p>
        </div>

        {liveGroups.map((group) => (
          <nav key={group.title} aria-label={group.title} className="t-small">
            <p className="mb-3 font-semibold text-paper">{group.title}</p>
            <ul className="space-y-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="t-small">
          <p className="mb-3 font-semibold text-paper">Contact</p>
          <ul className="space-y-3">
            <li>
              <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                {siteConfig.email}
              </a>
            </li>
            <li>
              <Link href="/contact?request=review" className={linkClass}>
                Discuss your programme
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/10 px-[var(--content-padding-x-mobile)] py-4 text-center text-[13px] text-paper/65">
        © 2026 ChisokuLabs Pvt Ltd. All rights reserved.
      </div>
    </footer>
  );
}
