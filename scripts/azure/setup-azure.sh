cat > ~/chisoku-setup.sh <<'CHISOKU_SETUP'
# ChisokuLabs website: one-time Azure setup for the paid funnel. Run once, in Azure Cloud Shell (Bash).
# Creates (in Central India, the only region the subscription's billing-guard policy allows):
# resource group rg-chisokulabs-website, a PostgreSQL database (Burstable B1ms), the tables,
# a private file store for the Pack, and a small test Pack file. Prints the values to send back.
# Generated from db/migrations/001_paid_funnel.sql; keep the two in step.
set -euo pipefail

RG=rg-chisokulabs-website
SUFFIX=$(openssl rand -hex 3)
SERVER=chisokulabs-db-$SUFFIX
STORAGE=chisokulabsfiles$SUFFIX
DB=chisokulabs
ADMIN_USER=cladmin
ADMIN_PW="A$(openssl rand -hex 20)z"
APP_PW=$(openssl rand -hex 24)

echo ""
echo "Step 1 of 6: checking your Azure subscription..."
echo "Using subscription: $(az account show --query name -o tsv)"
echo "Azure CLI version: $(az version --query '"azure-cli"' -o tsv)"
az provider register --namespace Microsoft.DBforPostgreSQL --wait
az provider register --namespace Microsoft.Storage --wait

echo "Step 2 of 6: creating the database server. This takes 5 to 10 minutes. Please wait..."
# The group may already exist from an earlier attempt; resources can sit in any region inside it.
if [ "$(az group exists -n $RG)" != "true" ]; then az group create -n $RG -l centralindia -o none; fi
LOCATION=""
for TRY in centralindia; do
  if az postgres flexible-server create -g $RG -n $SERVER -l $TRY \
      --tier Burstable --sku-name Standard_B1ms --storage-size 32 --version 16 \
      --admin-user $ADMIN_USER --admin-password "$ADMIN_PW" \
      --public-access All --yes -o none 2>/tmp/chisoku-err.txt; then
    LOCATION=$TRY
    break
  fi
  cat /tmp/chisoku-err.txt
  # Only a lack of room in a region is worth trying elsewhere; any other error stops here with its real reason.
  if ! grep -qi "location\|region\|capacity\|quota\|not available\|restricted\|sku" /tmp/chisoku-err.txt; then
    echo "SETUP STOPPED: Azure did not accept the request (see the message above). Send this screen to Claude."
    exit 1
  fi
  echo "That region was not available. Trying the next one..."
done
rm -f /tmp/chisoku-err.txt
if [ -z "$LOCATION" ]; then
  echo "SETUP STOPPED: Azure could not create the database in Central India (see above). Send this screen to Claude."
  exit 1
fi

echo "Step 3 of 6: creating the database and its tables..."
PGPASSWORD="$ADMIN_PW" psql "host=$SERVER.postgres.database.azure.com port=5432 dbname=postgres user=$ADMIN_USER sslmode=require" \
  -v ON_ERROR_STOP=1 -q <<SQL
select 'create database $DB' where not exists (select from pg_database where datname = '$DB') \gexec
SQL
cat > /tmp/chisoku.sql <<'SQL'
-- ChisokuLabs website database (Azure Database for PostgreSQL, flexible server).
-- Run once, as the server admin, in the database the website uses (see docs/azure-setup.md). Safe to re-run.
-- Tables: readiness_completions (anonymous /readiness counts), orders and analytics_events (paid funnel).

-- gen_random_uuid() is built into PostgreSQL 13 and later, so no extension is needed.

-- Anonymous counts of completed /readiness checks. No IP address, email address, name or answers.
create table if not exists readiness_completions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  score_band text not null check (score_band in ('not_ready', 'partly_ready', 'ready')),
  utm_source text check (utm_source is null or char_length(utm_source) <= 120),
  utm_medium text check (utm_medium is null or char_length(utm_medium) <= 120),
  utm_campaign text check (utm_campaign is null or char_length(utm_campaign) <= 120),
  referrer_host text check (referrer_host is null or char_length(referrer_host) <= 253)
);

-- One row per checkout. Created when the buyer starts checkout; the Razorpay webhook marks it paid.
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  razorpay_order_id text not null unique,
  payment_id text unique,
  product text not null check (product in ('report_149', 'pack_249', 'pack_upgrade_100')),
  amount_cents integer not null check (amount_cents > 0),
  currency text not null default 'USD',
  email text not null check (char_length(email) <= 254),
  assessment_id text,
  readiness_band text check (readiness_band is null or readiness_band in ('not_ready', 'partly_ready', 'ready')),
  utm_source text check (utm_source is null or char_length(utm_source) <= 120),
  utm_medium text check (utm_medium is null or char_length(utm_medium) <= 120),
  utm_campaign text check (utm_campaign is null or char_length(utm_campaign) <= 120),
  utm_content text check (utm_content is null or char_length(utm_content) <= 120),
  status text not null default 'created'
    check (status in ('created', 'paid', 'delivered', 'refunded', 'needs_review')),
  created_at timestamptz not null default now(),
  paid_at timestamptz,
  delivered_at timestamptz,
  downloaded_at timestamptz,
  download_token text unique,
  link_expires_at timestamptz,
  credit_applied boolean not null default false,
  source_report_order_id uuid references orders (id)
);

create index if not exists orders_email_idx on orders (lower(email));

-- Server-side funnel events: purchase, pack_upgrade, pack_downloaded, refunded. Never card details or answers.
create table if not exists analytics_events (
  id uuid primary key default gen_random_uuid(),
  name text not null check (name in ('purchase', 'pack_upgrade', 'pack_downloaded', 'refunded')),
  order_id uuid references orders (id),
  props jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- One purchase event per order, so a replayed webhook cannot count a sale twice.
create unique index if not exists analytics_events_one_purchase on analytics_events (order_id) where name = 'purchase';

-- The website signs in as its own role, which can only read and write these three tables.
-- Replace the password before running; use the same value in DATABASE_URL.
do $$
begin
  if not exists (select from pg_roles where rolname = 'website_app') then
    create role website_app login password 'REPLACE_WITH_A_LONG_RANDOM_PASSWORD';
  end if;
  execute format('grant connect on database %I to website_app', current_database());
end
$$;

grant usage on schema public to website_app;
grant insert on readiness_completions to website_app;
grant select, insert, update on orders to website_app;
grant select, insert on analytics_events to website_app;
SQL
sed -i "s/REPLACE_WITH_A_LONG_RANDOM_PASSWORD/$APP_PW/" /tmp/chisoku.sql
PGPASSWORD="$ADMIN_PW" psql "host=$SERVER.postgres.database.azure.com port=5432 dbname=$DB user=$ADMIN_USER sslmode=require" \
  -v ON_ERROR_STOP=1 -q -f /tmp/chisoku.sql
rm -f /tmp/chisoku.sql

echo "Step 4 of 6: creating the private file store..."
az storage account create -g $RG -n $STORAGE -l $LOCATION --sku Standard_LRS --kind StorageV2 \
  --min-tls-version TLS1_2 --allow-blob-public-access false --https-only true -o none
KEY=$(az storage account keys list -g $RG -n $STORAGE --query "[0].value" -o tsv)
az storage container create --name pack --account-name $STORAGE --account-key "$KEY" --public-access off -o none

echo "Step 5 of 6: adding a small test Pack file..."
mkdir -p /tmp/chisoku-pack
echo "Test file. The real Go-Live Readiness Pack replaces this before launch." > /tmp/chisoku-pack/README.txt
python3 -c "import zipfile; z = zipfile.ZipFile('/tmp/test-pack.zip', 'w'); z.write('/tmp/chisoku-pack/README.txt', 'README.txt'); z.close()"
az storage blob upload --account-name $STORAGE --account-key "$KEY" -c pack -n test-pack.zip -f /tmp/test-pack.zip --overwrite -o none
rm -rf /tmp/chisoku-pack /tmp/test-pack.zip

echo "Step 6 of 6: done."
echo ""
echo "==================== COPY FROM HERE ===================="
echo "DATABASE_URL=postgres://website_app:$APP_PW@$SERVER.postgres.database.azure.com:5432/$DB"
echo "AZURE_STORAGE_ACCOUNT=$STORAGE"
echo "AZURE_STORAGE_KEY=$KEY"
echo "PACK_CONTAINER=pack"
echo "PACK_BLOB_PATH=test-pack.zip"
echo "REGION=$LOCATION"
echo "===================== COPY TO HERE ====================="
echo ""
echo "Send everything between the two lines to Claude."
rm -f ~/chisoku-setup.sh
CHISOKU_SETUP
bash ~/chisoku-setup.sh
