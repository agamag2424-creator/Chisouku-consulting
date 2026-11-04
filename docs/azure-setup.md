# Azure setup for the paid funnel

Everything the paid funnel stores lives in your Azure subscription:

- **Azure Database for PostgreSQL (flexible server):** orders, funnel events and the anonymous `/readiness` counter.
- **Azure Blob Storage:** the private Pack ZIP, handed out through 10-minute signed links.

> **Easiest way:** paste `scripts/azure/setup-azure.sh` into Azure Cloud Shell (Bash). It does steps 1–4 below in one go
> (it also uploads a small test Pack file) and prints the values for step 5. The manual steps below are for reference.

The website stays on Vercel and reaches both over the internet with TLS. Allow about 45 minutes. Do the steps in order;
each one says exactly what to copy for the next.

> **Cost.** The smallest suitable database (Burstable B1ms, 32 GiB) costs roughly USD 15–20 a month, and Blob
> Storage for one ZIP costs pennies. Your Microsoft for Startups credits cover this while they last (about 7 months).
> Check the exact figure in the [Azure pricing calculator](https://azure.microsoft.com/pricing/calculator/), and set
> a reminder for when the credits end.

---

## 1. Resource group

1. In the [Azure portal](https://portal.azure.com), search **Resource groups** → **Create**.
2. **Name:** `rg-chisokulabs-website`. **Region:** **Central India**. The subscription's billing-guard policy allows only this region, and
   `vercel.json` runs the site's server code in Mumbai, next door.
3. **Review + create** → **Create**.

Keeping the website's resources in one group makes the later clean-up of your subscription simple.

## 2. PostgreSQL database server

1. Search **Azure Database for PostgreSQL flexible servers** → **Create**.
2. **Basics:**
   - Resource group: `rg-chisokulabs-website`
   - Server name: `chisokulabs-db` (or any free name; it becomes `chisokulabs-db.postgres.database.azure.com`)
   - Region: **Central India**
   - PostgreSQL version: **16**
   - Workload type: **Development** (this offers the Burstable tier)
   - Compute + storage → **Configure server**: **Burstable, Standard_B1ms** (1 vCore, 2 GiB), storage **32 GiB**,
     storage autogrow **off**. High availability **disabled**. Backup retention **7 days**. **Save**.
   - Authentication method: **PostgreSQL authentication only**
   - Admin username: `cladmin`
   - Password: a long random password (24+ characters). Save it in your password manager as
     "Azure Postgres admin". The website never uses this one.
3. **Networking:**
   - Connectivity method: **Public access (allowed IP addresses)**
   - Firewall rules → **Add 0.0.0.0 - 255.255.255.255**, named `AllowAll`.
     Vercel has no fixed IP addresses, so the server must accept connections from anywhere. What keeps it safe:
     TLS on every connection (enforced by default; leave it on), a strong password, and a website login that can
     only touch three tables.
   - Leave "Allow public access from any Azure service" unticked.
4. **Review + create** → **Create**. It takes about 5 minutes.
5. When it is ready, open the server → **Settings → Databases** → **Add** → name `chisokulabs` → **Save**.
6. Still on the server, open **Settings → Server parameters**, search `require_secure_transport` and check it says
   **ON**. Do not change it.

## 3. Create the tables and the website's login

1. On your computer, make a second long random password **using only letters and digits** (so it needs no escaping
   in a URL), for example from your password manager with symbols turned off, 32 characters. Save it as
   "Azure Postgres website_app".
2. Open `db/migrations/001_paid_funnel.sql` from the repository and replace `REPLACE_WITH_A_LONG_RANDOM_PASSWORD` with
   that password. Save the edited copy on your computer only; do not commit it.
3. In the portal, click the **Cloud Shell** icon (`>_`) at the top, choose **Bash**. If asked, let it create its small
   storage account (it goes in its own resource group; that one is expected).
4. In Cloud Shell, click **Manage files → Upload** and upload your edited `001_paid_funnel.sql`.
5. Run (replace the server name if yours differs; enter the **admin** password when asked):

   ```bash
   psql "host=chisokulabs-db.postgres.database.azure.com port=5432 dbname=chisokulabs user=cladmin sslmode=require" -f 001_paid_funnel.sql
   ```

   It should end with several `GRANT` lines and no `ERROR`.
6. Delete the uploaded file: `rm 001_paid_funnel.sql`.

Your website connection string is then:

```
postgres://website_app:<website_app password>@chisokulabs-db.postgres.database.azure.com:5432/chisokulabs
```

## 4. Storage for the Pack ZIP

1. Search **Storage accounts** → **Create**.
2. **Basics:** resource group `rg-chisokulabs-website`; name `chisokulabsfiles` (3–24 lowercase letters and digits,
   must be unique); region **Central India**; performance **Standard**; redundancy **LRS**.
3. **Advanced:** **Require secure transfer**: on. **Allow enabling anonymous access on individual containers**:
   **off**. **Enable storage account key access**: **on** (the website signs download links with the key).
   **Minimum TLS version**: 1.2.
4. **Review + create** → **Create**.
5. Open the account → **Data storage → Containers** → **+ Container** → name `pack`, anonymous access level
   **Private** → **Create**.
6. When the Pack ZIP is ready: open `pack` → **Upload** → choose the file, for example
   `go-live-readiness-pack-v1.zip`. For a later version, upload it under a new name and update `PACK_BLOB_PATH`.
7. Open **Security + networking → Access keys** → **Show** next to **key1** → copy the **Key** (not the connection
   string).

## 5. Environment variables in Vercel

Vercel → project **chisouku-consulting** → **Settings → Environment Variables**. Add each one for **Preview** first
(you test there); add them for **Production** only when you are ready to take real payments. Tick **Sensitive** for
every secret.

| Name | Value |
|---|---|
| `DATABASE_URL` | the connection string from step 3 |
| `AZURE_STORAGE_ACCOUNT` | `chisokulabsfiles` |
| `AZURE_STORAGE_KEY` | key1 from step 4 |
| `PACK_CONTAINER` | `pack` |
| `PACK_BLOB_PATH` | the ZIP's name, for example `go-live-readiness-pack-v1.zip` |
| `RAZORPAY_MODE` | `test` (Preview). `live` only in Production, at launch |
| `RAZORPAY_KEY_ID` | Razorpay test key id (`rzp_test_…`) |
| `RAZORPAY_KEY_SECRET` | Razorpay test key secret |
| `RAZORPAY_WEBHOOK_SECRET` | the secret you type when creating the webhook (step 6) |
| `ADMIN_API_TOKEN` | 48+ random characters (used to deliver report PDFs) |
| `SITE_URL` | **Production only:** `https://www.chisokulabs.com`. Leave unset for Preview |
| `RESEND_API_KEY` | already set |

`.env.example` in the repository lists the same names. After saving, **redeploy** the preview (Deployments → the
`feat/paid-funnel` deployment → ⋯ → Redeploy), because variables apply only to new deployments.

The `/readiness` counter starts recording as soon as `DATABASE_URL` is set. The old `SUPABASE_*` variables are no
longer used.

## 6. Razorpay (test mode) and the preview

1. Razorpay Dashboard → switch to **Test Mode** → **Account & Settings → API Keys** → generate a test key. Copy both
   values into the Vercel variables above.
2. Previews on Vercel ask visitors to sign in, which would also block Razorpay's webhook. In Vercel → **Settings →
   Deployment Protection → Protection Bypass for Automation**, create a secret and copy it.
3. Razorpay (Test Mode) → **Webhooks → Add New Webhook**:
   - URL: `https://chisouku-consulting-git-feat-paid-funnel-agam-agrawals-projects.vercel.app/api/webhooks/razorpay?x-vercel-protection-bypass=<bypass secret>`
     (the branch address stays the same across redeploys)
   - Secret: a long random string; put the same value in `RAZORPAY_WEBHOOK_SECRET`
   - Events: **payment.captured** and **refund.processed**
4. USD payments need international payments enabled on the Razorpay account before going live; in test mode they
   work already.

## 7. Test (brief section 9)

1. Open the preview's `/readiness`, finish the check, click through to the report page, pay with a Razorpay
   [test card](https://razorpay.com/docs/payments/payments/test-card-details/).
2. Check: the thank-you page shows the report message; an ops alert reaches hello@chisokulabs.com; in Cloud Shell,
   `psql … -c "select status, product from orders order by created_at desc limit 5;"` shows `paid`.
3. Deliver the report: `ADMIN_API_TOKEN=… node scripts/ops/deliver-report.mjs --order <id> --pdf report.pdf --site <preview URL>`.
   The buyer email has the PDF and the upgrade link.
4. Buy the Pack, download it, refund a payment in the dashboard, and check the link is blocked.

## 8. Security notes

- The website logs in as `website_app`, which can insert readiness rows and read/write orders and events. It cannot
  read other tables, drop anything or create roles. Use the admin login only for maintenance.
- Rotate `AZURE_STORAGE_KEY` (Access keys → Rotate key1), the database password and the Razorpay secrets if any of
  them is ever exposed; then update Vercel and redeploy.
- Nothing personal is stored for the readiness check. Orders hold the buyer's email and campaign tags only; card
  details stay with Razorpay.
