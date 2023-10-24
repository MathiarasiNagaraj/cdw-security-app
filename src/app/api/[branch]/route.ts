import { google } from "googleapis";
import { NextResponse } from "next/server";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: 'cdw-359@dark-torch-399107.iam.gserviceaccount.com',
    private_key:"-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCwAUEgGH1pt6ZL\n0FmqAfeUW/PWhl9mA607Sd5JfQcnYokhxXhLyR4pms771RWIKUhUvdYL635v/gVD\nOIFYANVOaY4ZUmhb3L9zc90B6b04xNqIfYby4sad+CJx+H9b9e51mRq3FtP7jycX\n+F09Ai/t3DHMzAn3TC2obG7VJ39qghZGc7S8TPFIiClNmU5hXm6bCtWjKeWPNeVt\nviluaGhg9Sb5HVbHPu3zEfIyqNiIx9CCKIVEXgTDaFCVXov/3ZIZX/NnAl+0VoxB\naKDjJPaZYYjM5SPyAfnwp0szxlJHGRs4XiIY0fsqlupwewafzwad83hEFoq+GDrc\nQfNQhXyVAgMBAAECggEAFiaSQ6/RWNS8IR5/ql3FAu7vqTgQGY6s5qFNUIJjvBky\nmQV5NlCBc0sAccFHjHNlnwSlQ6rHpuCZWPRrkt/H+K5gK9+rMqR9k9IpJmx8XACq\nYDMsILVZudfYve9AWBqDgFlce15sH2TMzr97PIph7dWgjt2/A1ibBm9fI4RtDMJM\n3L8NFN9N+5blTTFVibYBm6GwLb/kB6e8UT+UY8Y2ED1BcIuPw60eTwwHflIAzFsa\naQJhkob6WQ50NLTYfDzg4xsCg/H6NI2Pq2zpM9I0LEf4clT5y7vbcc6ognwImPyC\n/93uYyXwuVMq981THgnCHHZC+ilN9jkNCuDy255uAQKBgQDm8oCWdd8ea4BwoBhg\natsee+MGPm+XM0rJ7DkD0kZBLSPzrvuDiaHbedjWbS8Mk0NDjjksK3WuISFrPn3s\njrqAlwBbx3rFwjGPmWm/TP4c5BGK4tRxuUuIaQ5YRYMdO2VMB62i5uTnaHMBKBfU\naH9yr1Cq1NAbHX658Nz92/4MRQKBgQDDGPsB2MqZqfoJf1yXtRlu3EKCMFVwo4+b\n2QzLH6cvsVr0yRubpQETlfQgKvwu1Z0rvSjfxfUZTVUiUt84XNulf4VoemSl6Pbr\nfiN8gTBJPj81dm+q/60IkfX9kn9y9y7X/kFPvFg5Rl1iXL09SQmNSIKKYTy/mG+v\n+Zwm+VS8EQKBgANs3VNd9C0zUvhYp4PmkdFl7PwOuQD5Fcbg5geUes5EqR/YHIra\n47epmvmzLNt246yA04BANMKcYy6AAsYbZ9C4bJzv3HZKZwnGMLdRoQM0rr3sl1II\neYJQbJIKleM9GkeCZaTg38w+1FXUDmZsFlfRGdUuytdcHKENXXm2ZZIxAoGAHBNB\nM8/Vv+00/R7l3TMDeO+bZo68DNyMsvm2HJjufy9/jlBOd8Rz9jSTD/n/lmHJH102\nP5WGIuD9ClZwpvS96wAB27oZN8LhnZvmUWlp4HBjujbT9QCcDuqqQpZNXubxR8Xf\n8jCBZaSZlakQ1nvnMvynRHCfxFaUY/eAoB8rMXECgYBo7AsSCrd5Z+RRJAgmaFHM\n1UoDnDn0M3f4BXK4234aYYGYbvm1yGPT7ozad9RMZLdugYFlROEUg7D7pYm92awN\nTwLB/LVVrnTlSTPzdrtX5vA9ccQhuC8Bt7rOURI1HMUVC8UldW4Hfitg/3bB018U\nuM/XhoD471oO2x69oMkkdg==\n-----END PRIVATE KEY-----\n",
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

    if (response.data && response.data.values) {
     
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

    return NextResponse.json(`${response.data.updatedSpreadsheet?.namedRanges}`);
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "An error occurred while processing the DELETE request." });
  }
}
