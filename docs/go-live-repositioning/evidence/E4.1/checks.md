# E4.1 — checks (local production build, `next start` on :3100)

| Asset | Path | Status | Size | Notes |
|---|---|---|---|---|
| Sample pack PDF | `/documents/chisokulabs-go-live-decision-pack-illustrative.pdf` | 200 `application/pdf` | 313 KB (AC ≤ 1 MB) | Copied unchanged from `docs/go-live-repositioning/assets/`; matches `siteConfig.samplePackPath` |
| Page 1 image | `/images/sample-pack/page-1.png` | 200 `image/png` | 74.5 KB (AC ≤ 350 KB) | 1600 × 1133, `pdftoppm -scale-to-x 1600`, quantised to 128 colours, no dithering |
| Page 2 image | `/images/sample-pack/page-2.png` | 200 `image/png` | 80.8 KB (AC ≤ 350 KB) | 1600 × 1133, same process |
| Old checklist | `/aeo-probe-checklist.txt` | 404 | – | removed in E4.0 |

Width, height and alt text for both images live in `packPages` (`src/content/samplePack.ts`). Both pages carry the pack's own "Illustrative example · Halcyon Group is fictional · Not a client engagement" banner.
