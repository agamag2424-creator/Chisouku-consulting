'use client';

import * as React from "react";
import { Section } from "../../components/ui/Section";
import { SectionLabel } from "../../components/ui/SectionLabel";
import { GlowButton } from "../../components/ui/GlowButton";

export default function ContactPage() {
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) {
      return;
    }
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      // leave script in place; safe to keep for navigation back
    };
  }, []);

  return (
    <main className="min-h-screen bg-void pt-14 text-[var(--color-text-primary)]">
      <Section>
        <div className="flex flex-col gap-10 md:flex-row md:items-start">
          {/* Left column */}
          <div className="md:w-1/2 space-y-6">
            <SectionLabel>NEXT STEP</SectionLabel>
            <h1 className="text-h1">
              Let&apos;s map your AI reality.
            </h1>
            <p className="text-body-lg max-w-[520px]">
              One 30-minute call. We&apos;ll assess your governance gaps and
              identify your highest-value AI opportunities. No pitch decks. No
              pressure. Just a clear picture of where you are and what comes
              next.
            </p>
            <ul className="mt-4 space-y-2 text-[13px] text-[var(--color-text-secondary)]">
              <li>✓ Free 30-minute conversation</li>
              <li>✓ Both governance and solutions covered</li>
              <li>✓ Actionable threat assessment within 24 hours</li>
            </ul>
            <div className="mt-8 border-t border-[var(--color-border)] pt-6 text-[13px] text-[var(--color-text-secondary)]">
              <div className="mb-1 font-semibold text-[var(--color-text-primary)]">
                Prefer email?
              </div>
              <a
                href="mailto:agam@chisokulabs.com"
                className="text-[14px] text-[var(--color-cyan)] underline-offset-2 hover:underline"
              >
                agam@chisokulabs.com
              </a>
              <div className="mt-5 mb-1 font-semibold text-[var(--color-text-primary)]">
                Connect on LinkedIn
              </div>
              <a
                href="https://www.linkedin.com/in/agamag24"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-[var(--color-text-secondary)] underline-offset-2 hover:text-[var(--color-text-primary)] hover:underline"
              >
                linkedin.com/in/agamag24 →
              </a>
            </div>
          </div>

          {/* Right column */}
          <div className="md:w-1/2 w-full">
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/agam-agrawwal/discovery-call"
              style={{ minWidth: 320, height: 630 }}
            />
            {/* Simple fallback form for when Calendly cannot load */}
            <noscript>
              <FallbackForm />
            </noscript>
          </div>
        </div>
      </Section>
    </main>
  );
}

function FallbackForm() {
  return (
    <form className="mt-6 space-y-4 text-left">
      <div>
        <label className="block text-[12px] font-semibold mb-1">
          Name
        </label>
        <input
          type="text"
          className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-cyan)]"
          required
        />
      </div>
      <div>
        <label className="block text-[12px] font-semibold mb-1">
          Email
        </label>
        <input
          type="email"
          className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-cyan)]"
          required
        />
      </div>
      <div>
        <label className="block text-[12px] font-semibold mb-1">
          Company
        </label>
        <input
          type="text"
          className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-cyan)]"
        />
      </div>
      <div>
        <label className="block text-[12px] font-semibold mb-1">
          Primary interest
        </label>
        <select className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-cyan)]">
          <option>Governance</option>
          <option>AI Solutions</option>
          <option>Both</option>
        </select>
      </div>
      <div>
        <label className="block text-[12px] font-semibold mb-1">
          What&apos;s your biggest challenge?
        </label>
        <textarea
          className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-cyan)]"
          rows={4}
        />
      </div>
      <GlowButton href="/contact" variant="primary" size="md" className="inline-flex">
        SUBMIT
      </GlowButton>
    </form>
  );
}

