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

    const [subscribersResult, contactMessagesResult, recentSubscribersResult, recentMessagesResult] =
      await Promise.all([
        turso.execute("SELECT COUNT(*) as count FROM Subscriber"),
        turso.execute("SELECT COUNT(*) as count FROM ContactMessage"),
        turso.execute("SELECT id, email, source, createdAt FROM Subscriber ORDER BY createdAt DESC LIMIT 20"),
        turso.execute("SELECT id, name, email, message, createdAt FROM ContactMessage ORDER BY createdAt DESC LIMIT 20"),
      ]);

    const totalSubscribers = Number(subscribersResult.rows[0]?.count ?? 0);
    const totalContactMessages = Number(contactMessagesResult.rows[0]?.count ?? 0);

    const recentSubscribers = recentSubscribersResult.rows.map((row) => ({
      id: row.id as string,
      email: row.email as string,
      source: row.source as string,
      createdAt: row.createdAt as string,
    }));

    const recentMessages = recentMessagesResult.rows.map((row) => ({
      id: row.id as string,
      name: row.name as string,
      email: row.email as string,
      message: row.message as string,
      createdAt: row.createdAt as string,
    }));

    return NextResponse.json({
      summary: {
        totalSubscribers,
        totalContactMessages,
      },
      recentSubscribers,
      recentMessages,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
