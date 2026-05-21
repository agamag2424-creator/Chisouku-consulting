# Insights Waitlist Setup (Google Sheets + Apps Script)

The `/insights` signup form submits through `POST /api/insights-waitlist`.
That API route forwards data to a Google Apps Script Web App URL.

## 1) Create Google Sheet

Create a new Google Sheet with this header row:

- `submittedAt`
- `sourcePage`
- `email`
- `userAgent`

## 2) Add Apps Script

In the sheet:

1. `Extensions` -> `Apps Script`
2. Replace the default code with:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const body = JSON.parse(e.postData.contents || "{}");

    sheet.appendRow([
      body.submittedAt || new Date().toISOString(),
      body.sourcePage || "",
      body.email || "",
      body.userAgent || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: String(error) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 3) Deploy as Web App

1. Click `Deploy` -> `New deployment`
2. Select type: `Web app`
3. Execute as: `Me`
4. Who has access: `Anyone`
5. Deploy and copy the Web App URL

## 4) Configure env var

Set this environment variable:

- `GOOGLE_APPS_SCRIPT_INSIGHTS_WAITLIST_URL=<your_web_app_url>`

### Local

Add to `.env.local`:

```bash
GOOGLE_APPS_SCRIPT_INSIGHTS_WAITLIST_URL=https://script.google.com/macros/s/XXXX/exec
```

### Vercel

1. Vercel project -> `Settings` -> `Environment Variables`
2. Add key: `GOOGLE_APPS_SCRIPT_INSIGHTS_WAITLIST_URL`
3. Paste the same URL
4. Redeploy

## 5) Test

1. Open `/insights`
2. Submit the signup form
3. Confirm the success message appears
4. Confirm a new row appears in your Google Sheet
