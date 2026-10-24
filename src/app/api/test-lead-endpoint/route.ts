import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async () => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Endpoint not available in production" },
      { status: 404, headers: { "Cache-Control": "no-store" } }
    );
  }
  return NextResponse.json({ ok: true, message: "Test endpoint working!" }, { status: 200 });
};
