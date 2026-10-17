# E8.5 — Sitemap, robots, share images: checks (local production build)

| Check | Result |
|---|---|
| Sitemap | `src/app/sitemap.ts` is generated from `routeLive`: `/sitemap.xml` lists exactly the 13 live routes (e2e compares the list), `lastModified` 17 October 2026. Old routes are gone from it; guides join automatically when E8.3 switches them on |
| Robots | unchanged: allow all, `Disallow: /_ui`, sitemap URL (e2e) |
| Share images | new 1200×630 PNGs in the new visual system (ink, Archivo headline, the site's own fonts): `og-evidence-check.png`, `og-decision-review.png`, `og-method.png`, `og-see-it-first.png`. Rendered with Playwright by drawing over the built homepage, so no route was added (nothing internal to remove). Headlines and lines are approved page wording |
| Wiring | `routeSeo` entries carry `image`; `pageMetadata` sets `og:image` (1200×630) and the Twitter image. e2e checks each page's `og:image` and that the file serves |
| e2e | 49 / 49 · lint 0 · typecheck OK |

Social-preview check: a live preview checker needs a public URL; run it on the staging deployment after merge (the images are attached here as files in `public/`). `og-audit.png`, `og-contact.png` and `og-diagnostic.png` are still used by legacy pages and `/contact`; E9/E10 remove them.
