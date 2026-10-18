# E8.3 — Answer guides: checks (local production build)

| Check | Result |
|---|---|
| Routes | `/guides/s4hana-go-no-go-checklist`, `/guides/is-my-erp-ready-to-go-live`, `/guides/independent-assurance-vs-si-readiness-review`: static, `routeLive` on, listed in the footer ("Guides") and the sitemap; content in `src/content/guides.ts`, layout `GuideArticle` |
| Direct answer | first paragraph under the H1, 47 / 53 / 54 words (limit 60) |
| Length | 889 / 824 / 811 words of content (800–1,400); e2e measures the rendered page |
| Table or checklist | S/4HANA: READINESS-5 table + 5-domain checklist (24 real go-live checks). ERP ready: READINESS-5 table, 10 warning signs. Assurance vs SI: comparison table (PRD 9.8 columns and footnote) |
| Links | method, both offers, sample pack on every guide |
| Sources | every dated fact links to the issuer (SAP Support, UAE Ministry of Finance, ZATCA), verified in E7.0. **Industry statistics left out**: the Horváth and Gartner pages (PRD 8.4) return HTTP 403 to every request from the build environment, so they could not be checked |
| JSON-LD | `BreadcrumbList` on all three; `HowTo` on the S/4HANA guide (5 steps with their directions) |
| SEO | unique titles (≤ 60) and descriptions (≤ 155), one H1 each (seo.spec now covers 14 routes) |
| e2e | 55 / 55 · axe 0 at 1440 and 390 (tables are keyboard-scrollable regions) · no horizontal scroll · internal-material scan clean |
| Copy | new wording, pending IN-11 |
