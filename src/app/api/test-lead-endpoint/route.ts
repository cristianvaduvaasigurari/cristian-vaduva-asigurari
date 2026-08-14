import { NextResponse } from "next/server";

export const POST = async () => {
  return NextResponse.json({ ok: true, message: "Test endpoint working!" }, { status: 200 });
};
