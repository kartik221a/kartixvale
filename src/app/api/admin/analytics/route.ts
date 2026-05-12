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

    // Get total counts
    const [
      pageViewsResult,
      buttonClicksResult,
      emailSignupsResult,
      subscribersResult,
      contactMessagesResult,
      recentEventsResult,
      recentSubscribersResult,
    ] = await Promise.all([
      turso.execute("SELECT COUNT(*) as count FROM AnalyticsEvent WHERE eventType = 'page_view'"),
      turso.execute("SELECT COUNT(*) as count FROM AnalyticsEvent WHERE eventType = 'button_click'"),
      turso.execute("SELECT COUNT(*) as count FROM AnalyticsEvent WHERE eventType = 'email_signup'"),
      turso.execute("SELECT COUNT(*) as count FROM Subscriber"),
      turso.execute("SELECT COUNT(*) as count FROM ContactMessage"),
      turso.execute("SELECT id, eventType, page, metadata, createdAt FROM AnalyticsEvent ORDER BY createdAt DESC LIMIT 50"),
      turso.execute("SELECT id, email, source, createdAt FROM Subscriber ORDER BY createdAt DESC LIMIT 20"),
    ]);

    const totalPageViews = Number(pageViewsResult.rows[0]?.count ?? 0);
    const totalButtonClicks = Number(buttonClicksResult.rows[0]?.count ?? 0);
    const totalEmailSignups = Number(emailSignupsResult.rows[0]?.count ?? 0);
    const totalSubscribers = Number(subscribersResult.rows[0]?.count ?? 0);
    const totalContactMessages = Number(contactMessagesResult.rows[0]?.count ?? 0);

    // Get page views by day (last 7 days) using SQLite date function
    const recentPageViewsResult = await turso.execute(
      "SELECT DATE(createdAt) as day, COUNT(*) as views FROM AnalyticsEvent WHERE eventType = 'page_view' AND createdAt >= datetime('now', '-7 days') GROUP BY DATE(createdAt) ORDER BY day ASC"
    );

    const chartData = recentPageViewsResult.rows.map((row) => ({
      date: row.day as string,
      views: Number(row.views),
    }));


    const recentEvents = recentEventsResult.rows.map((row) => ({
      id: row.id as string,
      eventType: row.eventType as string,
      page: row.page as string | null,
      metadata: row.metadata as string | null,
      createdAt: row.createdAt as string,
    }));

    const recentSubscribers = recentSubscribersResult.rows.map((row) => ({
      id: row.id as string,
      email: row.email as string,
      source: row.source as string,
      createdAt: row.createdAt as string,
    }));

    return NextResponse.json({
      summary: {
        totalPageViews,
        totalButtonClicks,
        totalEmailSignups,
        totalSubscribers,
        totalContactMessages,
      },
      chartData,
      recentEvents,
      recentSubscribers,
    });
  } catch (error) {
    console.error("Admin analytics error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
