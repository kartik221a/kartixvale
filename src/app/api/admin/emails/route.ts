import { NextRequest, NextResponse } from "next/server";
import { turso } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD || "kartix2024";
    const authHeader = request.headers.get("authorization");
    const password = authHeader?.replace("Bearer ", "");

    if (password !== adminPassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format");

    const result = await turso.execute(
      "SELECT id, email, source, createdAt FROM Subscriber ORDER BY createdAt DESC"
    );

    const subscribers = result.rows.map((row) => ({
      id: row.id as string,
      email: row.email as string,
      source: row.source as string,
      createdAt: row.createdAt as string,
    }));

    if (format === "csv") {
      const csvHeader = "Email,Source,Subscribed At\n";
      const csvRows = subscribers
        .map((s) => `${s.email},${s.source},${s.createdAt}`)
        .join("\n");
      const csv = csvHeader + csvRows;

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": "attachment; filename=subscribers.csv",
        },
      });
    }

    return NextResponse.json({ subscribers, total: subscribers.length });
  } catch (error) {
    console.error("Admin emails error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
