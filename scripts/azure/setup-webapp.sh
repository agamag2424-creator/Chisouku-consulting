cat > ~/chisoku-web.sh <<'CHISOKU_WEB'
# ChisokuLabs website: one-time Azure setup for hosting the site. Run once, in Azure Cloud Shell (Bash).
# Creates, in Central India and the website's resource group: an App Service plan (Linux, B1) and a web app (Node 22),
# plus an app registration that lets GitHub Actions deploy to this one web app only (OIDC, no password stored),
# and writes the site's settings into the web app. Fill the four values below before pasting; never commit them.
set -euo pipefail

DATABASE_URL='REPLACE_DATABASE_URL'
RZP_KEY_ID='REPLACE_RAZORPAY_KEY_ID'
RZP_KEY_SECRET='REPLACE_RAZORPAY_KEY_SECRET'
RZP_WEBHOOK_SECRET='REPLACE_RAZORPAY_WEBHOOK_SECRET'

RG=rg-chisokulabs-website
LOCATION=centralindia
SUFFIX=$(openssl rand -hex 3)
PLAN=chisokulabs-web-plan
APP=chisokulabs-web-$SUFFIX
REPO=agamag2424-creator/Chisouku-consulting

echo ""
echo "Paste your Resend API key (resend.com, API Keys, Create API key), then press Enter. It stays hidden:"
read -rs RESEND_KEY
echo ""
if [ -z "$RESEND_KEY" ]; then echo "SETUP STOPPED: no Resend key was pasted. Paste the whole text again."; exit 1; fi

echo "Step 1 of 4: checking your Azure subscription..."
echo "Using subscription: $(az account show --query name -o tsv)"
az provider register --namespace Microsoft.Web --wait

echo "Step 2 of 4: creating the web hosting plan and the web app (2 to 5 minutes)..."
if [ -z "$(az appservice plan list -g $RG --query "[?name=='$PLAN'].name" -o tsv)" ]; then
  SIZE=""
  for TRY in B1 B2; do
    echo "Trying size $TRY..."
    if az appservice plan create -g $RG -n $PLAN -l $LOCATION --is-linux --sku $TRY -o none 2>/tmp/chisoku-err.txt; then
      SIZE=$TRY; break
    fi
    cat /tmp/chisoku-err.txt
  done
  if [ -z "$SIZE" ]; then echo "SETUP STOPPED: Azure did not create the hosting plan (see above). Send this screen to Claude."; exit 1; fi
fi
az webapp create -g $RG -p $PLAN -n $APP --runtime "NODE:22-lts" -o none
az webapp config set -g $RG -n $APP --startup-file "node server.js" --always-on true --http20-enabled true \
  --min-tls-version 1.2 --ftps-state Disabled -o none
az webapp update -g $RG -n $APP --https-only true -o none
STORAGE=$(az storage account list -g $RG --query "[0].name" -o tsv)
STORAGE_KEY=$(az storage account keys list -g $RG -n $STORAGE --query "[0].value" -o tsv)
az webapp config appsettings set -g $RG -n $APP -o none --settings \
  HOSTNAME=0.0.0.0 SCM_DO_BUILD_DURING_DEPLOYMENT=false \
  "DATABASE_URL=$DATABASE_URL" "AZURE_STORAGE_ACCOUNT=$STORAGE" "AZURE_STORAGE_KEY=$STORAGE_KEY" \
  PACK_CONTAINER=pack PACK_BLOB_PATH=test-pack.zip \
  RAZORPAY_MODE=test "RAZORPAY_KEY_ID=$RZP_KEY_ID" "RAZORPAY_KEY_SECRET=$RZP_KEY_SECRET" \
  "RAZORPAY_WEBHOOK_SECRET=$RZP_WEBHOOK_SECRET" "ADMIN_API_TOKEN=$(openssl rand -hex 24)" \
  "RESEND_API_KEY=$RESEND_KEY" SITE_URL=https://www.chisokulabs.com \
  GOOGLE_SITE_VERIFICATION=sFP9aPJdlXb8tevdRl8QQsNKjQzTdYV5U7DdwHA8g1k

echo "Step 3 of 4: letting GitHub deploy to this web app..."
CLIENT_ID=$(az ad app list --display-name chisokulabs-github-deploy --query "[0].appId" -o tsv)
if [ -z "$CLIENT_ID" ]; then
  CLIENT_ID=$(az ad app create --display-name chisokulabs-github-deploy --query appId -o tsv)
fi
az ad sp show --id $CLIENT_ID -o none 2>/dev/null || az ad sp create --id $CLIENT_ID -o none
for BRANCH in main feat/paid-funnel; do
  NAME=github-$(echo $BRANCH | tr '/' '-')
  if [ -z "$(az ad app federated-credential list --id $CLIENT_ID --query "[?name=='$NAME'].name" -o tsv)" ]; then
    az ad app federated-credential create --id $CLIENT_ID -o none --parameters "{\"name\":\"$NAME\",\"issuer\":\"https://token.actions.githubusercontent.com\",\"subject\":\"repo:$REPO:ref:refs/heads/$BRANCH\",\"audiences\":[\"api://AzureADTokenExchange\"]}"
  fi
done
SCOPE=$(az webapp show -g $RG -n $APP --query id -o tsv)
# A new app registration can take a minute to reach the role service.
for i in 1 2 3 4 5 6; do
  if az role assignment create --assignee $CLIENT_ID --role "Website Contributor" --scope $SCOPE -o none 2>/dev/null; then break; fi
  echo "  Waiting for Azure to catch up..."; sleep 20
done

echo "Step 4 of 4: done."
echo ""
echo "==================== COPY FROM HERE ===================="
echo "AZURE_WEBAPP_NAME=$APP"
echo "AZURE_CLIENT_ID=$CLIENT_ID"
echo "AZURE_TENANT_ID=$(az account show --query tenantId -o tsv)"
echo "AZURE_SUBSCRIPTION_ID=$(az account show --query id -o tsv)"
echo "ROLE=$(az role assignment list --assignee $CLIENT_ID --scope $SCOPE --query "[0].roleDefinitionName" -o tsv)"
echo "SIZE=$(az appservice plan show -g $RG -n $PLAN --query sku.name -o tsv)"
echo "===================== COPY TO HERE ====================="
echo ""
echo "Send everything between the two lines to Claude."
rm -f ~/chisoku-web.sh
CHISOKU_WEB
bash ~/chisoku-web.sh
