import { NextRequest, NextResponse } from "next/server";
import { turso, generateId } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source = "website" } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim().toLowerCase())) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check for duplicates — if already subscribed, still return success
    // so the client can unlock content for returning users
    const existing = await turso.execute({
      sql: "SELECT id FROM Subscriber WHERE email = ?",
      args: [cleanEmail],
    });

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { message: "Already subscribed", alreadySubscribed: true },
        { status: 200 }
      );
    }

    await turso.execute({
      sql: "INSERT INTO Subscriber (id, email, source, createdAt) VALUES (?, ?, ?, datetime('now'))",
      args: [generateId(), cleanEmail, source],
    });

    return NextResponse.json(
      { message: "Successfully subscribed!", alreadySubscribed: false },
      { status: 201 }
    );
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
