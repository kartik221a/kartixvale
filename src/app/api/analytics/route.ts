import { NextRequest, NextResponse } from "next/server";
import { turso, generateId } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventType, page, metadata } = body;

    if (!eventType || typeof eventType !== "string") {
      return NextResponse.json(
        { error: "eventType is required" },
        { status: 400 }
      );
    }

    const validTypes = ["page_view", "button_click", "email_signup"];
    if (!validTypes.includes(eventType)) {
      return NextResponse.json(
        { error: "Invalid eventType" },
        { status: 400 }
      );
    }

    await turso.execute({
      sql: "INSERT INTO AnalyticsEvent (id, eventType, page, metadata, createdAt) VALUES (?, ?, ?, ?, datetime('now'))",
      args: [
        generateId(),
        eventType,
        page || null,
        metadata ? JSON.stringify(metadata) : null,
      ],
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
