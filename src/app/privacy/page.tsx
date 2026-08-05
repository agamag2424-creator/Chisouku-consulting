import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy and Terms",
  description: "ChisokuLabs privacy policy, terms of service, and contact details.",
  keywords: ["ChisokuLabs", "privacy policy", "terms of service"],
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="section pt-16">
      <div className="container max-w-[860px]">
        <p className="eyebrow">Legal</p>
        <h1 className="headline">Privacy Policy and Terms of Service</h1>
        <p className="body-copy mt-4">Last updated: August 2026</p>

        <div className="mt-10 space-y-10">
          <section>
            <h2 className="text-2xl font-bold">Privacy Policy</h2>
            <p className="body-copy mt-4">
              ChisokuLabs Pvt Ltd (&quot;ChisokuLabs&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collects
              only the information needed to respond to inquiries, qualify audit
              requests, operate this website, and provide requested services.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 body-copy">
              <li>Name, email address, company, role, country, and form details you provide.</li>
              <li>Basic website analytics such as pages visited, device type, and referring URL.</li>
              <li>Messages and documents you choose to share for an audit or fit call.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold">How We Use Information</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 body-copy">
              <li>To respond to your inquiry or Audit Fit Call request.</li>
              <li>To provide requested diagnostics, audits, or consulting services.</li>
              <li>To improve website content, navigation, and service packaging.</li>
              <li>To meet legal, security, and administrative obligations.</li>
            </ul>
            <p className="body-copy mt-4">
              We do not sell, rent, or trade personal data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Third-Party Services</h2>
            <p className="body-copy mt-4">
              We may use service providers for hosting, email, scheduling,
              analytics, and form handling. These providers process data under
              their own privacy terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Terms of Service</h2>
            <p className="body-copy mt-4">
              Website content is provided for general informational purposes.
              Specific consulting deliverables, responsibilities, timelines,
              confidentiality, and fees are governed by the relevant written
              agreement for each engagement.
            </p>
            <p className="body-copy mt-4">
              All site text, design, graphics, logos, and code are the
              intellectual property of ChisokuLabs Pvt Ltd unless otherwise
              stated. You may not copy or redistribute website content without
              permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Contact</h2>
            <p className="body-copy mt-4">
              For privacy or legal questions, contact{" "}
              <a className="font-bold text-[var(--color-cyan-strong)] underline" href="mailto:agam@chisokulabs.com">
                agam@chisokulabs.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
