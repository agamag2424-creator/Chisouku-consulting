# E8.4 — Structured data, llms.txt, metadata: checks (local production build)

| Check | Result |
|---|---|
| Metadata map | `src/lib/seo.ts` `routeSeo`: title and description for all 11 new routes; `pageMetadata(path)` gives title, description, canonical, Open Graph and Twitter. Every new page and both layouts (offers, markets) use it |
| Lengths | e2e: every title ≤ 60 characters (with " \| ChisokuLabs"), every description ≤ 155. Shortened: `/` (209 → 147), offers (164/172 → ≤ 125), `/see-it-first` (186 → 142), `/glossary` (158 → 150) |
| Canonicals, H1 | every route has a canonical on www.chisokulabs.com and exactly one H1 |
| JSON-LD | Organization (areaServed AE + SA, no founder), WebSite, Service + Offer on both offer pages and both market pages. `auditServiceJsonLd`, `diagnosticServiceJsonLd` and `implementationServiceJsonLd` deleted; no JSON-LD on any new route mentions PMO, Diagnostic, Automation Audit or Implementation |
| llms.txt | rebuilt in `src/lib/llms.ts` from the canonical answers, config and the SEO map (live routes only). **The internal "Probe query set (for operators)" is gone** (E8.0 finding 2). Sample: `llms.txt.sample` |
| llms-full.txt | llms.txt + the 13 FAQ answers + the 16 glossary terms |
| e2e | 47 / 47 · unit 13 / 13 · lint 0 |

Not in scope: `/contact` and `/privacy` metadata (E9 rewrites both pages).
