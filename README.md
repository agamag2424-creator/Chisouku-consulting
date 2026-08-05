# ChisokuLabs

Marketing site for ChisokuLabs — AI automation for delivery systems, starting with the PMO reporting layer.

Production: [chisokulabs.com](https://www.chisokulabs.com)

## Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4 with design tokens in `src/styles/globals.css`
- Resend for audit fit form delivery
- Deployed on Vercel

## Getting started

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000.

```bash
npm run lint
npm run build
```

## Environment

Create `.env.local`:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Sends audit fit form submissions via `POST /api/audit-fit` |
| `AUDIT_FIT_TO_EMAIL` | Destination inbox for those submissions |

## Content model

Copy that appears in more than one place lives in `src/lib/siteConfig.ts` — tagline, subline, markets, systems, audit pricing, and the diagnostic URL. Change it there rather than in individual pages so quoted figures and naming cannot drift.

`auditPriceRange` in the same file is the display form of the audit price and is used by both the audit page and the JSON-LD offer.

## Engagement ladder

The site is organised around three steps, and this vocabulary should stay consistent:

1. **Free PMO Diagnostic** — hosted separately at [diagnostic.chisokulabs.com](https://diagnostic.chisokulabs.com)
2. **PMO Automation Audit** — `/pmo-automation-audit`
3. **Implementation** — `/implementation`

`Assess → Architect → Activate → Accelerate` is the internal method model shown on `/method`. "Activate" is the method-phase name; buyer-facing copy says "implementation".

## Structure

```
src/app/            Routes and metadata
src/components/     Layout, artifacts (SVG visuals), contact form
src/lib/            siteConfig and helpers
src/styles/         Global tokens and utilities
```

Legacy URLs from earlier versions of the site are redirected in `next.config.ts`.

## Proof rules

The site makes no client claims that cannot be substantiated. Sample artifacts are labelled as methodology excerpts, the drag estimator is framed as directional, and founder achievements are attributed to prior employment. Keep new copy within these constraints.
