# ChisokuLabs

Marketing site for ChisokuLabs: independent go-live decision assurance for ERP and core-platform programmes in the UAE
and Saudi Arabia. "Your programme reports Green. We test whether the evidence agrees."

Production: [www.chisokulabs.com](https://www.chisokulabs.com). Requirements and backlog:
`docs/go-live-repositioning/PRD.md` and `BACKLOG.md`; Evidence Reports in `docs/go-live-repositioning/evidence/`.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript
- Tailwind CSS v4; design tokens in `src/styles/globals.css` (no hex values anywhere else)
- Resend for the "Discuss your programme" form (`POST /api/audit-fit`)
- Vercel hosting and Vercel Analytics (cookieless)

## Getting started

```bash
npm install
npm run build && npm start   # http://localhost:3000
npm run lint
npm run test:unit
npm run leak-scan            # after a build
```

`next dev` also works, but it writes an `AGENTS.md` file at the root; do not commit it.

## Environment

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Delivers form messages (Production and Preview). Without it the form reports an error and shows the email address; it never reports a false success. |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console meta tag |

Form emails are sent from `siteConfig.formSender` (the `chisokulabs.com` domain is verified in Resend), to
`siteConfig.email`, with reply-to set to the visitor.

## Content model

- **`src/lib/siteConfig.ts`** is the single source for offers, prices, the founding rate and places remaining, the fee
  credit, markets, platforms, contact details and feature flags (`principalBlock`, `selfCheck`). Pages, JSON-LD and
  `llms.txt` read these values; never repeat them in JSX.
- **`routeLive`** in the same file lists every route and whether it is live. Links to a route that is not live render as
  plain text; pages that are not live use `routeRenders()` and return 404 in production (they render on previews and in
  development). The sitemap is generated from `routeLive`.
- **`src/lib/seo.ts`** holds every page's title and description (`routeSeo`, titles ≤ 60 characters with
  " | ChisokuLabs", descriptions ≤ 155) and builds metadata with `pageMetadata(path)`.
- **Content modules** in `src/content/`: the sample decision pack (`samplePack.ts`), comparison table, market pages
  (`markets.ts`, every dated fact with the issuer's source), answer guides (`guides.ts`) and form request types.
  FAQ, glossary and canonical answers live in `src/lib/aeoContent.ts`; `src/lib/llms.ts` builds `/llms.txt` and
  `/llms-full.txt` from them.
- **Copy** comes from PRD section 9 (verbatim) or is approved by the founder; new wording is listed in the PRD with an
  input number (IN-…) until approved.

## Structure

```
src/app/            Routes, metadata, API route, sitemap, robots, llms.txt
src/components/     ui/ (Button, Section, Sheet, …), hero/, home/, offers/, method/, markets/, guides/, contact/, …
src/content/        Page content modules
src/lib/            siteConfig, seo, jsonLd, aeoContent, llms, track
scripts/            Unit tests, leak scan, e2e specs (scripts/e2e, Playwright)
```

Old URLs (the PMO offer pages and earlier routes) redirect permanently in `next.config.ts` (PRD 4.2).

## Analytics

`track()` in `src/lib/track.ts` sends to Vercel Analytics: `cta_click {id, page, placement}` (every `Button` link
carries a `data-cta` id), `hero_view_toggle`, `slip_estimate_used`, `sample_pack_view`, `sample_pack_download`,
`form_submit {request_type}`, `form_error {reason, request_type}`. Never send what a visitor typed.

## Leak scan

Nothing internal or off-message may reach the site (BACKLOG rule 14). After a build, run:

```bash
npm run build
npm run leak-scan
```

`scripts/leak-scan.mjs` scans the built pages (`.next/server/app/**/*.{html,body,rsc}`) and `src/` for forbidden terms
(old offer wording, client and employer names, the founder's name, certification claims, "guarantee"), whole-word and
case-insensitive, and exits with code 1 on any hit, printing file, line and context. A short list of reviewed phrases is
allowed (the public email address, and sentences that say the review does *not* guarantee success); change that list
only with the founder's agreement. `docs/` and the script itself are not scanned. Unit tests: `npm run test:unit`.

## Proof rules (PRD 8)

- No client names, logos, testimonials, case studies, ratings or counts of past engagements.
- No founder name, photo or employer names. The principal is described only by the approved paragraph.
- Industry statistics only with a named, linked source, never in the hero.
- Every sample artefact is labelled "Illustrative example. Fictional programme. Not a client engagement."
- Never claim certification, regulatory approval or guaranteed outcomes: "The review does not guarantee go-live success."
