"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import { isRouteLive, navLinks } from "../../lib/siteConfig";
import { BrandMark } from "../brand/BrandMark";
import { Button } from "../ui/Button";

const CTA = { href: "/contact?request=review", label: "Discuss your programme" } as const;

// Links to routes that are not live yet are left out (siteConfig.routeLive).
const liveNavLinks = navLinks.filter((link) => isRouteLive(link.href));

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const dialogRef = React.useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname?.startsWith(href);

  const close = React.useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // While open: lock page scroll, move focus into the dialog, keep Tab inside it, close on Escape.
  React.useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] border-b border-line bg-paper">
        <div
          className={cn(
            "mx-auto flex h-20 max-w-[var(--content-max-width)] items-center justify-between gap-6",
            "px-[var(--content-padding-x-mobile)] md:px-[var(--content-padding-x)]",
          )}
        >
          <Link href="/" className="flex items-center gap-3" aria-label="ChisokuLabs home">
            <BrandMark className="h-9 w-9" />
            <span className="font-[family-name:var(--font-display)] text-[20px] font-bold tracking-[-0.03em] text-ink">
              ChisokuLabs
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            <ul className="flex items-center gap-6">
              {liveNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "text-[15px] font-medium transition-colors",
                      isActive(link.href) ? "text-ink" : "text-muted hover:text-ink",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button href={CTA.href}>{CTA.label}</Button>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 items-center justify-center rounded-control border border-line bg-paper lg:hidden"
            onClick={() => setOpen(true)}
          >
            <span className="flex h-4 w-5 flex-col justify-between" aria-hidden>
              <span className="h-[2px] w-full rounded-full bg-ink" />
              <span className="h-[2px] w-full rounded-full bg-ink" />
              <span className="h-[2px] w-full rounded-full bg-ink" />
            </span>
          </button>
        </div>
      </header>

      {open && (
        <div
          ref={dialogRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[200] flex flex-col bg-paper text-ink"
        >
          <div className="flex h-20 items-center justify-between border-b border-line px-[var(--content-padding-x-mobile)]">
            <span className="font-[family-name:var(--font-display)] text-[20px] font-bold tracking-[-0.03em]">
              ChisokuLabs
            </span>
            <button
              type="button"
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-control border border-line"
              onClick={close}
            >
              <span className="relative block h-4 w-4" aria-hidden>
                <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rotate-45 rounded-full bg-ink" />
                <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 -rotate-45 rounded-full bg-ink" />
              </span>
            </button>
          </div>

          <nav aria-label="Main" className="flex-1 overflow-y-auto px-[var(--content-padding-x-mobile)] py-6">
            <ul className="divide-y divide-line border-y border-line">
              {liveNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "block py-4 text-[20px] font-medium",
                      isActive(link.href) ? "text-ink" : "text-muted hover:text-ink",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-[var(--content-padding-x-mobile)] pb-8">
            <Button href={CTA.href} size="lg" className="w-full" onClick={() => setOpen(false)}>
              {CTA.label}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
