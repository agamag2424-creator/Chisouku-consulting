# Hosting on Azure

The site runs on **Azure App Service** in the resource group `rg-chisokulabs-website` (Central India), on the
Microsoft for Startups credits. Vercel's free plan does not allow a site that takes payments.

| Piece | Name |
| --- | --- |
| App Service plan | `chisokulabs-web-plan` (Linux, B1) |
| Web app | `chisokulabs-web-318661` (Node 22, `node server.js`, HTTPS only, TLS 1.2+) |
| Database | `chisokulabs-db-215c8e-7` (PostgreSQL 16, Burstable B2s), database `chisokulabs` |
| File store | `chisokulabsfiles215c8e`, private container `pack` |
| Domain | `www.chisokulabs.com`: GoDaddy CNAME to the web app, free App Service managed certificate |
| Apex | `chisokulabs.com` still points to Vercel, which redirects to `www` |

**Deploys.** `.github/workflows/azure-deploy.yml` runs on every push to `main`: it builds the standalone server
(`output: "standalone"` in `next.config.ts`), signs in to Azure with GitHub OIDC (app registration
`chisokulabs-github-deploy`, role Website Contributor on the web app only; no password stored in GitHub), deploys, and
checks a few pages. Vercel still builds `main` too; it serves only the apex redirect and previews.

**Settings.** The site's settings (database, file store, Resend, Razorpay, admin token) live in Azure portal → the web
app → **Settings → Environment variables**, not in GitHub or Vercel. Change them there; the app restarts by itself.

**Billing guard.** The subscription allows only approved resource types and only Central India. The website group has
one exemption, `allow-website-hosting`, from the resource-type rule. The region rule still applies.

**One-time scripts** (Cloud Shell, already run): `scripts/azure/setup-webapp.sh` (plan, web app, deploy identity,
settings) and `scripts/azure/switch-domain.sh` (GoDaddy records, domain and certificate).
