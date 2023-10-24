import { google } from "googleapis";
import { NextResponse } from "next/server";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });

export async function GET(request: any,context: { params: any }) {

  try {
    

    const sheetName = context.params.branch;
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${sheetName}`,
    });
    console.log(sheetName)
    if (response.data && response.data.values) {
      console.log(response.data.values)
      return NextResponse.json({
        data: response.data.values,
    
      });

    } else {
      return NextResponse.json({ data: [] });
    }
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "An error occurred while processing the GET request." });
  }
}

export async function POST(request: Request, context: { params: any }) {
  try {
    const sheetName = context.params.branch;
    const body = await request.json();
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${sheetName}!A2:E2`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            body.EmployeeID,
            body.EmployeeName,
            body.Temperature,
            body.Time,
            body.Date,
          ],
        ],
      },
    });
    return NextResponse.json(`${response.data.updates?.updatedRange}`);
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "An error occurred while processing the POST request." });
  }
}

export async function PATCH(request: Request, context: { params: any }) {
  try {
    const sheetName = context.params.branch;
    const body = await request.json();
    console.log(body,sheetName)
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${sheetName}!A${body.range}:E${body.range}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            body.EmployeeID,
            body.EmployeeName,
            body.Temperature,
            body.Time,
            body.Date,
          ],
        ],
      },
    });
    return NextResponse.json(`${response.data.updatedRange}`);
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json({ error: "An error occurred while processing the PATCH request." });
  }
}

export async function DELETE(request: Request, context: { params: any }) {
  try {
    const sheetName = context.params.branch;
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const body = await request.json();
    const row = body.range;
    const sheetMetadata = await sheets.spreadsheets.get({
      spreadsheetId,
    });
    const sheet = sheetMetadata?.data?.sheets?.find(
      (s) => s?.properties?.title === sheetName
    );

    if (!sheet) {
      throw new Error(`Sheet "${sheetName}" not found`);
    }
    const sheetId = sheet?.properties?.sheetId;

    const deleteRequest = {
      spreadsheetId,
      resource: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId,
                dimension: "ROWS",
                startIndex: row - 1,
                endIndex: row,
              },
            },
          },
        ],
      },
    };
    const response = await sheets.spreadsheets.batchUpdate(deleteRequest);
    console.log(response.data.updatedSpreadsheet?.namedRanges, response.status);
    return NextResponse.json(`${response.data.updatedSpreadsheet?.namedRanges}`);
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "An error occurred while processing the DELETE request." });
  }
}
