# E10.1 — Redirects: checks (local production build)

`curl -I` status and Location for each old URL:

```
/pmo-automation-audit        308 /readiness-evidence-check
/implementation              308 /go-live-decision-review
/sample-outputs              308 /see-it-first
/free-pmo-diagnostic         308 /see-it-first
/diagnostic-vs-audit         308 /pricing
/pmo-reporting-automation    308 /method
/pmo-automation-gcc          308 /go-live-readiness-uae
/pmo-automation-singapore    308 /go-live-readiness-uae
/case-studies/x              308 /see-it-first
/ai-solutions/x              308 /go-live-decision-review
```

Old route folders deleted: pmo-automation-audit, implementation, sample-outputs, free-pmo-diagnostic, diagnostic-vs-audit, pmo-reporting-automation, pmo-automation-gcc, pmo-automation-singapore. Legacy redirects updated so none chain through a removed route (`/case-studies/*` → `/see-it-first`, `/ai-solutions/*` → `/go-live-decision-review`). e2e 78/78 (11 redirect checks). Preview `curl -I` to be pasted once the staging deployment is reachable without sign-in (Vercel protection).
