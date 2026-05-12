import { NextResponse } from "next/server";

// This endpoint is called by Vercel Cron daily at 12am IST (18:30 UTC)
// It triggers a rebuild by calling the Vercel Deploy Hook
export async function GET() {
  try {
    const deployHook = process.env.VERCEL_DEPLOY_HOOK_URL;

    if (!deployHook) {
      console.log("No VERCEL_DEPLOY_HOOK_URL set - skipping auto-deploy");
      return NextResponse.json({
        message: "No deploy hook configured. Set VERCEL_DEPLOY_HOOK_URL env var.",
        status: "skipped",
      });
    }

    const response = await fetch(deployHook, { method: "POST" });

    if (response.ok) {
      return NextResponse.json({
        message: "Deploy triggered successfully",
        status: "success",
        timestamp: new Date().toISOString(),
      });
    } else {
      console.error("Deploy hook failed:", response.status, await response.text());
      return NextResponse.json(
        { message: "Deploy hook failed", status: "error" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Cron deploy error:", error);
    return NextResponse.json(
      { message: "Internal error", status: "error" },
      { status: 500 }
    );
  }
}
