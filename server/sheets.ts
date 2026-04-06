import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function getAuth() {
  const email = process.env.GOOGLE_CLIENT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !key) return null;

  return new google.auth.JWT({ email, key, scopes: SCOPES });
}

export async function appendLeadToSheet(lead: {
  name: string;
  email: string;
  phone: string;
  truckType: string;
  timestamp: string;
}): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const auth = getAuth();
  if (!auth || !sheetId || sheetId === "REPLACE_WITH_YOUR_SHEET_ID") return;

  const sheets = google.sheets({ version: "v4", auth });

  // Get current row count to generate sequential No.
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "A:A",
  });
  const rowCount = existing.data.values?.length ?? 1;
  const no = rowCount; // Row 1 = header, so first lead = 1

  const date = new Date(lead.timestamp);
  const timeStr = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  const dateStr = date.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });

  // Columns: No | Time | Date | Full Name | Email Address | Phone Number | What type of truck do you operate?
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "A1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[no, timeStr, dateStr, lead.name, lead.email, lead.phone, lead.truckType]],
    },
  });
}
