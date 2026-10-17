import Link from "next/link";
import { BrandMark } from "../brand/BrandMark";
import { navLinks, siteConfig } from "../../lib/siteConfig";
import { legacy } from "../../lib/legacyOffer"; // footer copy is replaced in E1.4

const guideLinks = [
  { href: "/pmo-reporting-automation", label: "PMO reporting automation" },
  { href: "/diagnostic-vs-audit", label: "Diagnostic vs Audit" },
  { href: "/pmo-automation-singapore", label: "Singapore" },
  { href: "/pmo-automation-gcc", label: "GCC" },
] as const;

const linkClass = "text-paper/80 underline-offset-4 transition-colors hover:text-paper hover:underline";

/** The site's one dark surface (PRD E0.5). Link set and copy change in E1.4. */
export function Footer() {
  return (
    <footer className="bg-ink text-paper/80">
      <div className="mx-auto grid max-w-[var(--content-max-width)] gap-10 px-[var(--content-padding-x-mobile)] py-14 md:grid-cols-[1.1fr_1fr_1fr] md:px-[var(--content-padding-x)]">
        <div>
          <Link href="/" className="mb-4 flex items-center gap-3" aria-label="ChisokuLabs home">
            <BrandMark className="h-9 w-9" inverted />
            <span className="font-[family-name:var(--font-display)] text-[20px] font-bold tracking-[-0.03em] text-paper">
              ChisokuLabs
            </span>
          </Link>
          <p className="t-small font-semibold text-teal-tint">{siteConfig.tagline}</p>
          <p className="t-small mt-3 max-w-[560px]">
            {legacy.subline}. For growth-stage SMEs in the GCC and Singapore —
            Free PMO Diagnostic, then PMO Automation Audit, then optional implementation.
          </p>
        </div>

        <nav aria-label="Site" className="t-small">
          <p className="mb-3 font-semibold text-paper">Site</p>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/faq" className={linkClass}>
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/glossary" className={linkClass}>
                Glossary
              </Link>
            </li>
            <li>
              <Link href="/contact" className={linkClass}>
                Audit Fit Call
              </Link>
            </li>
          </ul>
        </nav>

        <div className="t-small grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-1">
          <nav aria-label="Guides">
            <p className="mb-3 font-semibold text-paper">Guides</p>
            <ul className="space-y-3">
              {guideLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="mb-3 font-semibold text-paper">Contact</p>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a href="/llms.txt" className={linkClass}>
                  llms.txt
                </a>
              </li>
              <li>
                <Link href="/privacy" className={linkClass}>
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-paper/10 px-[var(--content-padding-x-mobile)] py-4 text-center text-[13px] text-paper/65">
        © 2026 ChisokuLabs Pvt Ltd. All rights reserved.
      </div>
    </footer>
  );
}
