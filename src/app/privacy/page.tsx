import type { Metadata } from "next";
import { Section } from "../../components/ui/Section";
import { SectionLabel } from "../../components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Privacy Policy & Terms of Service",
  description:
    "ChisokuLab privacy policy, terms of service, and cookie policy.",
  keywords: ["ChisokuLab", "privacy policy", "terms of service"],
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-void pt-14 text-[var(--color-text-primary)]">
      <Section>
        <div className="mx-auto max-w-[800px] py-[136px] pb-[80px]">
          <header className="mb-8">
            <SectionLabel>LEGAL</SectionLabel>
            <h1 className="text-h1 mt-3">Privacy Policy &amp; Terms of Service</h1>
            <p className="text-body mt-2">Last updated: March 2026</p>
          </header>

          {/* Simple static tab labels (both sections on one page) */}
          <div className="mb-10 flex gap-8 border-b border-[var(--color-border)] pb-3 text-[13px] font-semibold uppercase tracking-[0.12em]">
            <div className="cursor-default border-b-2 border-[var(--color-cyan)] text-[var(--color-text-primary)]">
              Privacy Policy
            </div>
            <div className="cursor-default text-[var(--color-text-muted)]">
              Terms of Service
            </div>
          </div>

          <PrivacyContent />

          <div className="mt-16 h-px w-full bg-[var(--color-border)]" />

          <TermsContent />
        </div>
      </Section>
    </main>
  );
}

function PrivacyContent() {
  return (
    <section aria-labelledby="privacy-heading">
      <h2 id="privacy-heading" className="text-h2 mb-3">
        Privacy Policy
      </h2>

      <h3 className="text-h3 mt-10 mb-3">1. Introduction</h3>
      <p className="text-body mb-4">
        ChisokuLab Pvt Ltd (&quot;ChisokuLab&quot;, &quot;we&quot;,
        &quot;us&quot;, &quot;our&quot;) is committed to protecting your
        privacy. This policy explains what personal data we collect when you
        visit our website or engage with our services, how we use it, and your
        rights regarding that data.
      </p>
      <p className="text-body mb-4">
        ChisokuLab is registered in India and provides AI governance consulting
        and AI solution development services to clients globally, including in
        the European Union and United Kingdom.
      </p>

      <h3 className="text-h3 mt-10 mb-3">2. Information We Collect</h3>
      <p className="text-body mb-2">
        We collect the following types of information:
      </p>
      <p className="text-body mb-2 font-semibold">
        Information you provide directly:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-5 text-[13px] text-[var(--color-text-secondary)]">
        <li>
          Name, email address, company name, and job title when you book a
          discovery call or submit a contact form
        </li>
        <li>Email address when you sign up for our insights newsletter</li>
        <li>Information included in messages you send us</li>
      </ul>
      <p className="text-body mb-2 font-semibold">
        Information collected automatically:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-5 text-[13px] text-[var(--color-text-secondary)]">
        <li>Browser type and version</li>
        <li>Pages visited and time spent on each page</li>
        <li>Referring URL (how you found us)</li>
        <li>Device type and screen resolution</li>
        <li>IP address (anonymized where possible)</li>
      </ul>
      <p className="text-body mb-2 font-semibold">
        Information we do NOT collect:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-5 text-[13px] text-[var(--color-text-secondary)]">
        <li>
          We do not collect sensitive personal data such as financial
          information, health data, or government identifiers through this
          website
        </li>
        <li>
          We do not use AI to profile visitors or make automated decisions about
          individuals
        </li>
      </ul>

      <h3 className="text-h3 mt-10 mb-3">3. How We Use Your Information</h3>
      <ul className="mb-4 list-disc space-y-2 pl-5 text-[13px] text-[var(--color-text-secondary)]">
        <li>To respond to your inquiry or schedule a discovery call</li>
        <li>To send you resources you have requested (checklists, templates)</li>
        <li>To send our insights newsletter (only if you have subscribed)</li>
        <li>To improve our website, content, and services</li>
        <li>
          To understand how visitors use our site (via anonymized analytics)
        </li>
      </ul>
      <p className="text-body mb-4">
        We will never sell, rent, or trade your personal data to third parties.
      </p>

      <h3 className="text-h3 mt-10 mb-3">4. Cookies</h3>
      <p className="text-body mb-4">
        Our website uses the following types of cookies:
      </p>
      <p className="text-body mb-2 font-semibold">Essential cookies:</p>
      <p className="text-body mb-4">
        Required for the website to function. These include cookies that
        remember your cookie consent preference. You cannot opt out of essential
        cookies.
      </p>
      <p className="text-body mb-2 font-semibold">Analytics cookies:</p>
      <p className="text-body mb-4">
        Help us understand how visitors use our site. These are only loaded if
        you explicitly consent via our cookie banner. We use Plausible
        Analytics, which is privacy-friendly and does not use cookies for
        tracking individual visitors.
      </p>
      <p className="text-body mb-4">
        You can manage cookies in your browser settings at any time. Disabling
        essential cookies may affect site functionality.
      </p>

      <h3 className="text-h3 mt-10 mb-3">5. Data Storage &amp; Security</h3>
      <p className="text-body mb-4">
        Your data is stored securely using industry-standard encryption (TLS
        1.2+). Our website is hosted on Vercel&apos;s infrastructure. We retain
        your personal data only as long as necessary for the purpose it was
        collected, or as required by law.
      </p>

      <h3 className="text-h3 mt-10 mb-3">6. Your Rights</h3>
      <p className="text-body mb-4">
        If you are located in the European Union, United Kingdom, or any
        jurisdiction with data protection laws, you have the following rights
        regarding your personal data:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-5 text-[13px] text-[var(--color-text-secondary)]">
        <li>
          <strong>Right of access</strong> — You can request a copy of the
          personal data we hold about you
        </li>
        <li>
          <strong>Right to rectification</strong> — You can ask us to correct
          inaccurate or incomplete data
        </li>
        <li>
          <strong>Right to erasure</strong> — You can ask us to delete your
          personal data (&quot;right to be forgotten&quot;)
        </li>
        <li>
          <strong>Right to data portability</strong> — You can request your data
          in a structured, machine-readable format
        </li>
        <li>
          <strong>Right to object</strong> — You can object to processing of
          your data for certain purposes
        </li>
        <li>
          <strong>Right to restrict processing</strong> — You can ask us to
          limit how we use your data
        </li>
      </ul>
      <p className="text-body mb-4">
        To exercise any of these rights, contact us at:{" "}
        <a
          href="mailto:privacy@chisokulab.com"
          className="text-[var(--color-cyan)] underline"
        >
          privacy@chisokulab.com
        </a>
        . We will respond to your request within 30 days.
      </p>

      <h3 className="text-h3 mt-10 mb-3">7. Third-Party Services</h3>
      <p className="text-body mb-4">
        We use the following third-party services that may process your data
        according to their own privacy policies:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-5 text-[13px] text-[var(--color-text-secondary)]">
        <li>Calendly (calendly.com) — for scheduling discovery calls</li>
        <li>Vercel (vercel.com) — for website hosting</li>
        <li>Plausible (plausible.io) — for website analytics</li>
        <li>Google Workspace — for waitlist and signup storage</li>
        <li>Zoho Mail (zoho.com) — for email communications</li>
      </ul>
      <p className="text-body mb-4">
        We encourage you to review the privacy policies of these services
        directly.
      </p>

      <h3 className="text-h3 mt-10 mb-3">8. Changes to This Policy</h3>
      <p className="text-body mb-4">
        We may update this privacy policy from time to time. Any changes will be
        posted on this page with an updated revision date. We encourage you to
        review this page periodically.
      </p>

      <h3 className="text-h3 mt-10 mb-3">9. Contact Us</h3>
      <p className="text-body mb-2">
        For privacy-related questions or to exercise your data rights:
      </p>
      <p className="text-body mb-1">
        Email:{" "}
        <a
          href="mailto:privacy@chisokulab.com"
          className="text-[var(--color-cyan)] underline"
        >
          privacy@chisokulab.com
        </a>
      </p>
      <p className="text-body">
        Website:{" "}
        <a
          href="/contact"
          className="text-[var(--color-cyan)] underline"
        >
          chisokulab.com/contact
        </a>
      </p>
    </section>
  );
}

function TermsContent() {
  return (
    <section aria-labelledby="terms-heading" className="mt-12">
      <h2 id="terms-heading" className="text-h2 mb-3">
        Terms of Service
      </h2>

      <h3 className="text-h3 mt-10 mb-3">1. Services</h3>
      <p className="text-body mb-4">
        ChisokuLab provides AI governance consulting, PMO modernization, and AI
        solution development services as described on our website. Specific
        service deliverables, timelines, and fees are governed by individual
        service agreements signed with each client.
      </p>

      <h3 className="text-h3 mt-10 mb-3">2. Website Use</h3>
      <p className="text-body mb-2">
        You may use this website for informational purposes. You may not:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-5 text-[13px] text-[var(--color-text-secondary)]">
        <li>Copy, reproduce, or redistribute our content without permission</li>
        <li>Use automated tools to scrape or crawl our website</li>
        <li>Attempt to gain unauthorized access to our systems</li>
        <li>Use our website for any unlawful purpose</li>
      </ul>

      <h3 className="text-h3 mt-10 mb-3">3. Intellectual Property</h3>
      <p className="text-body mb-4">
        All content on this website — including text, design, graphics, logos,
        and code — is the intellectual property of ChisokuLab Pvt Ltd and is
        protected by applicable copyright and trademark laws.
      </p>
      <p className="text-body mb-4">
        Deliverables created during client engagements are governed by the
        intellectual property terms in each individual service agreement.
      </p>

      <h3 className="text-h3 mt-10 mb-3">4. Disclaimer</h3>
      <p className="text-body mb-4">
        The information on this website is provided for general informational
        purposes only. While we strive to keep the information current and
        accurate, we make no warranties or representations about the
        completeness, accuracy, or reliability of any information on this site.
      </p>
      <p className="text-body mb-4">
        Statistics and data cited on our website are sourced from third-party
        research and are provided for illustrative purposes.
      </p>

      <h3 className="text-h3 mt-10 mb-3">5. Limitation of Liability</h3>
      <p className="text-body mb-4">
        To the maximum extent permitted by applicable law, ChisokuLab shall not
        be liable for any indirect, incidental, special, consequential, or
        punitive damages arising from your use of this website or our services.
      </p>

      <h3 className="text-h3 mt-10 mb-3">6. Governing Law</h3>
      <p className="text-body mb-4">
        These terms are governed by and construed in accordance with the laws of
        India. For clients in the European Union or United Kingdom, applicable
        local consumer protection laws also apply.
      </p>
      <p className="text-body mb-4">
        Any disputes arising from these terms shall be resolved through
        good-faith negotiation first, and if unsuccessful, through arbitration
        in Prayagraj, India.
      </p>

      <h3 className="text-h3 mt-10 mb-3">7. Contact</h3>
      <p className="text-body">
        For questions about these terms:{" "}
        <a
          href="mailto:legal@chisokulab.com"
          className="text-[var(--color-cyan)] underline"
        >
          legal@chisokulab.com
        </a>
      </p>
    </section>
  );
}

