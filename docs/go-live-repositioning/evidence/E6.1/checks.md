# E6.1 — checks

| Check | Result |
|---|---|
| **Production build** (`npm run build`) | `/independence-and-data` returns **404**, with `noindex` and the default site title (the page title is set only where the page renders); no link to it anywhere |
| **Preview build** (`VERCEL_ENV=preview`) | 200: the full page renders for review |
| Guard | `routeRenders()` in `siteConfig`: live route, or development, or Vercel preview; fails closed when the environment is unknown (unit test, 13/13) |
| e2e | 28 / 28 in both modes (production: 404 and no links; preview: H1, the three anchored sections, the deletion statement, "Last updated", and no certification words) |
| axe (preview build) | 0 violations at 1440 and 390 |
| Lighthouse mobile (preview build) | 80 / 94 / 98, median 94; a11y 100, SEO 100, CLS 0 |
| Internal-material scan (production build) | clean |
| Lint / typecheck | 0 problems / OK |

Screenshots (preview build): `independence--desktop-part*.png`, `independence--mobile-part*.png`.
