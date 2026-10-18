# E3.2 — checks (local production build, `next start` on :3100)

| Check | Result |
|---|---|
| Lint / typecheck / build | 0 problems / OK / OK |
| e2e | 19 / 19; the method test now also checks that exactly one diagram is exposed per width, named "How one claim is tested", with a description that includes "3 of 5 evidenced" |
| axe on `/method` | 0 violations at 1440 and 390 |
| Diagram colours | token utilities only (`fill-*`, `stroke-*`), no hex. Label contrast: muted on paper 5.5:1, muted on page 5.1:1, teal on paper 6.1:1, ink on score tints 14.1–14.7:1 (all ≥ 4.5:1) |
| Layouts | wide (left to right) from 1000px; vertical below, so labels stay at their set size on phones and tablets (`claim-flow--desktop/tablet/mobile.png`) |
| Static | no animation; the claim, marks and score come from `src/content/samplePack.ts` (T1, I1) |
| Lighthouse mobile `/method` | 91 / 93 / 94, median 93; a11y 100, SEO 100, CLS 0 |

