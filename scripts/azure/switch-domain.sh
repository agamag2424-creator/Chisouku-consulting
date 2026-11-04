cat > ~/chisoku-domain.sh <<'CHISOKU_DOMAIN'
# Moves www.chisokulabs.com to the Azure web app: shows the two GoDaddy DNS edits, waits for them to take effect,
# then adds the domain to the web app with a free Azure-managed certificate. chisokulabs.com (no www) stays as it
# is and keeps forwarding to www.
set -euo pipefail
RG=rg-chisokulabs-website
APP=chisokulabs-web-318661
HOST=www.chisokulabs.com
ID=$(az webapp show -g $RG -n $APP --query customDomainVerificationId -o tsv)

echo ""
echo "=============== DO THIS IN GODADDY NOW ==============="
echo "GoDaddy > My Products > chisokulabs.com > DNS. Then:"
echo ""
echo "1) Add New Record:"
echo "     Type:  TXT"
echo "     Name:  asuid.www"
echo "     Value: $ID"
echo ""
echo "2) Find the existing CNAME record named www, click the pencil (edit), set:"
echo "     Value: $APP.azurewebsites.net"
echo ""
echo "Save both. Then come back here and press Enter."
echo "======================================================"
read -r _

dns() { curl -s "https://dns.google/resolve?name=$1&type=$2"; }
echo "Waiting for the internet to see your GoDaddy changes (usually 5 to 30 minutes)..."
for i in $(seq 1 90); do
  TXT_OK=$(dns asuid.$HOST TXT | grep -c "$ID" || true)
  CNAME_OK=$(dns $HOST CNAME | grep -ci "$APP.azurewebsites.net" || true)
  if [ "$TXT_OK" -gt 0 ] && [ "$CNAME_OK" -gt 0 ]; then echo "GoDaddy changes are live."; break; fi
  echo "  Not yet (TXT seen: $TXT_OK, CNAME seen: $CNAME_OK). Checking again in 30 seconds..."
  sleep 30
done
if [ "${TXT_OK:-0}" -eq 0 ] || [ "${CNAME_OK:-0}" -eq 0 ]; then
  echo "STOPPED: after 45 minutes the GoDaddy changes are still not visible. Check them and send this screen to Claude."
  exit 1
fi

echo "Adding www.chisokulabs.com to the web app..."
az webapp config hostname add -g $RG --webapp-name $APP --hostname $HOST -o none
echo "Creating the free security certificate (a few minutes)..."
TP=""
for i in 1 2 3 4 5 6; do
  TP=$(az webapp config ssl create -g $RG -n $APP --hostname $HOST --query thumbprint -o tsv 2>/tmp/chisoku-err.txt) && [ -n "$TP" ] && break
  cat /tmp/chisoku-err.txt; echo "  Trying again in 60 seconds..."; sleep 60
done
if [ -z "$TP" ]; then echo "STOPPED: the certificate was not created (see above). Send this screen to Claude."; exit 1; fi
az webapp config ssl bind -g $RG -n $APP --certificate-thumbprint $TP --ssl-type SNI -o none
sleep 20
echo ""
echo "==================== COPY FROM HERE ===================="
echo "HTTPS_CHECK=$(curl -s -o /dev/null -w '%{http_code}' https://$HOST/)"
echo "SERVED_BY=$(curl -sI https://$HOST/ | grep -ci 'x-vercel' | sed 's/^0$/azure/;s/^[1-9].*/vercel-still-cached/')"
echo "CERT=$TP"
echo "===================== COPY TO HERE ====================="
rm -f ~/chisoku-domain.sh /tmp/chisoku-err.txt
CHISOKU_DOMAIN
bash ~/chisoku-domain.sh
