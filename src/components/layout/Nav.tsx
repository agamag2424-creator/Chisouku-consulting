"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import { navLinks } from "../../lib/siteConfig";
import { BrandMark } from "../brand/BrandMark";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname?.startsWith(href);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] border-b border-[rgba(17,24,32,0.1)] bg-[rgba(247,244,238,0.9)] backdrop-blur-xl">
        <div
          className={cn(
            "mx-auto flex h-20 max-w-[var(--content-max-width)] items-center justify-between",
            "px-[var(--content-padding-x-mobile)] md:px-[var(--content-padding-x)]",
          )}
        >
          <Link href="/" className="group flex items-center gap-3" aria-label="ChisokuLabs home">
            <BrandMark className="h-10 w-10" />
            <span className="flex flex-col leading-none">
              <span className="font-[family-name:var(--font-display)] text-[19px] font-bold tracking-[-0.02em] text-[var(--color-ink)]">
                ChisokuLabs
              </span>
              <span className="mt-1 hidden font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--color-muted)] sm:block">
                PMO Automation Audit
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-[13px] font-semibold tracking-[0.01em]",
                    "transition-colors duration-200",
                    isActive(link.href)
                      ? "text-[var(--color-ink)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-ink)]",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link href="/contact" className="button button-primary">
              Audit Fit Call
            </Link>
          </nav>

          <button
            type="button"
            aria-label="Toggle navigation"
            className="flex h-10 w-10 items-center justify-center border border-[rgba(17,24,32,0.16)] bg-[var(--color-paper)] lg:hidden"
            onClick={() => setOpen(true)}
          >
            <span className="flex h-4 w-5 flex-col justify-between">
              <span className="h-[2px] w-full rounded-full bg-[var(--color-ink)]" />
              <span className="h-[2px] w-full rounded-full bg-[var(--color-ink)]" />
              <span className="h-[2px] w-full rounded-full bg-[var(--color-ink)]" />
            </span>
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[200] flex flex-col bg-[var(--color-page)] text-[var(--color-ink)]">
          <div className="flex items-center justify-between px-6 pt-4">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-muted)]">
              Menu
            </span>
            <button
              type="button"
              aria-label="Close navigation"
              className="flex h-9 w-9 items-center justify-center"
              onClick={() => setOpen(false)}
            >
              <span className="relative block h-4 w-4">
                <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rotate-45 rounded-full bg-[var(--color-ink)]" />
                <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 -rotate-45 rounded-full bg-[var(--color-ink)]" />
              </span>
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "font-[family-name:var(--font-display)] text-[28px] font-bold tracking-[-0.02em]",
                  isActive(link.href)
                    ? "text-[var(--color-ink)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-ink)]",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 px-6 pb-10">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="button button-primary w-full max-w-xs"
            >
              Audit Fit Call
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
