# E4.2 — checks (local production build, `next start` on :3100)

| Check | Result |
|---|---|
| Lint / typecheck / build | 0 problems / OK / OK (`/see-it-first` prerendered static) |
| e2e (Playwright 1.56.1) | 23 / 23: 4 new (1440 and 360: H1, both page images load with descriptive alt, "Download the PDF" has `href` and `download`, no `<form>` on the page, illustrative label, no horizontal scroll; the PDF is served under 1 MB; the homepage "See a full sample decision pack" link lands on `/see-it-first#sample-pack`) plus all earlier tests |
| axe (WCAG 2.1 A/AA) | 0 violations on `/see-it-first` and `/`, at 1440 and 390 |
| Lighthouse mobile `/see-it-first` | 88 / 93 / 94, median 93; a11y 100, best practices 96, SEO 100, CLS 0 |
| Analytics | `sample_pack_view` (IntersectionObserver, once, at 25 % visible) and `sample_pack_download` (on click) call `track()`, still the no-op stub until E9.2 |
| Route | `/see-it-first` on in `routeLive`: "See it first" appears in the nav and footer, and the homepage section 6 links are active |

Screenshots: `see-it-first--desktop-part0..1.png`, `see-it-first--mobile-part0.png`.
