# E5.3 — homepage performance (local production builds, `next start`, Lighthouse 12.8.2 mobile, same machine)

## What changed
1. **Hero rendered once.** The desktop table and the separate phone list are now one table. Below 641px each row is a small grid (ID and claim; the five marks with their letters drawn by CSS; the score), and explicit ARIA roles keep the table semantics. Homepage elements: **970 → 769**.
2. **JSON-LD in the server HTML.** `JsonLdScript` was a `next/script` with `afterInteractive`, so every structured-data block was injected by JavaScript after hydration. It is now a plain `<script type="application/ld+json">`, as Next.js recommends. The serializer moved to `src/lib/safeJson.ts` and escapes `<` (unit test). Crawlers also get the data without running JavaScript.

## Results (homepage, Lighthouse mobile, three runs each)
| Build | Round | Runs | Median | Median TBT |
|---|---|---|---|---|
| release head (E1–E4) | 1 | 75 / 87 / 92 | 87 | 316 ms |
| E5.2 | 1 | 82 / 88 / 92 | 88 | 290 ms |
| E5.3, step 1 only | 1 | 89 / 92 / 92 | 92 | 256 ms |
| E5.2 | 2 | 89 / 89 / 92 | 89 | 300 ms |
| E5.3, step 1 only | 2 | 85 / 89 / 90 | 89 | 348 ms |
| **E5.3, steps 1 + 2** | 3 | 93 / 94 / 95 | **94** | **133 ms** |
| E5.2 | 4 | 87 / 90 / 96 | 90 | 245 ms |
| **E5.3, steps 1 + 2** | 4 | 93 / 93 / 96 | **93** | **177 ms** |

Step 1 alone was within this machine's noise. Step 2 is the clear gain: blocking time roughly halves.
Other pages: `/go-live-decision-review` 95 / 96 / 96 (median 96, TBT 140 ms).

## Checks
lint 0 · typecheck OK · build OK · unit 12 / 12 · e2e 26 / 26 · axe 0 on `/`, `/go-live-decision-review`, `/pricing` · JSON-LD present and parsing on `/`, both offer pages, `/method`, `/pricing` · internal-material scan clean.

Screenshots: `hero-desktop-reported.png`, `hero-desktop-evidenced.png`, `hero-mobile-reported.png`, `hero-mobile-evidenced.png` (360px).
