# Course Waitlist Setup (Google Sheets + Apps Script)

This project submits course waitlist nominations through `POST /api/course-waitlist`
and insights notification signups through `POST /api/insights-waitlist`. Both API
routes forward data to your Google Apps Script Web App URL.

## 1) Create Google Sheet

Create a new Google Sheet with this header row:

- `submittedAt`
- `sourcePage`
- `fullName`
- `workEmail`
- `phone`
- `company`
- `role`
- `country`
- `experienceYears`
- `whyJoining`
- `consent`
- `optInFutureModules`
- `optInFreeTemplates`
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
      body.fullName || "",
      body.workEmail || "",
      body.phone || "",
      body.company || "",
      body.role || "",
      body.country || "",
      body.experienceYears || "",
      body.whyJoining || "",
      body.consent ? "true" : "false",
      body.optInFutureModules ? "true" : "false",
      body.optInFreeTemplates ? "true" : "false",
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

- `GOOGLE_APPS_SCRIPT_WAITLIST_URL=<your_web_app_url>`

### Local

Add to `.env.local`:

```bash
GOOGLE_APPS_SCRIPT_WAITLIST_URL=https://script.google.com/macros/s/XXXX/exec
```

### Vercel

1. Vercel project -> `Settings` -> `Environment Variables`
2. Add key: `GOOGLE_APPS_SCRIPT_WAITLIST_URL`
3. Paste the same URL
4. Redeploy

## 5) Test

1. Open `/ai-governance-course`
2. Submit the waitlist form
3. Confirm success message appears
4. Confirm a new row appears in your Google Sheet
5. Open `/insights`
6. Submit the notification form
7. Confirm success message appears
8. Confirm another row appears in your Google Sheet with `sourcePage` set to `/insights`
