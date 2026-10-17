# E2.4 — checks (local production build, `next start` on :3100)

| Check | Result |
|---|---|
| Rendered H1 | `Your programme reports Green.<!-- --> <br/>We test whether the evidence agrees.` |
| Text for assistive tech | textContent "Your programme reports Green. We test whether the evidence agrees." (space kept); innerText breaks after "Green." at 1440, 900 and 390 |
| Largest contentful paint | the H1 in 3 of 3 runs (a first version with two block spans made the sub-line the LCP element, so it was replaced with a spaced line break) |
| Lighthouse mobile on `/`, same machine, back to back | E2.3 (before): 85 / 91 / 92, median 91; **E2.4: 92 / 92 / 93, median 92**; LCP about 3.0 s both, CLS 0 |
| e2e / axe | 17 / 17; 0 violations on `/` at 1440 and 390 |
| Share image | `public/og.png` re-rendered with one sentence per line (`og.png` here) |

Note: this container measures 2–5 points lower and noisier than the E1 one; individual runs between 80 and 93 appeared on unchanged code. Only same-machine back-to-back runs are compared.
