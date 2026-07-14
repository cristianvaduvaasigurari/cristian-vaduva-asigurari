// src/app/api/lead/route.ts
import { NextResponse } from "next/server";
import { submitLead } from "@/lib/actions";

export const POST = async (request: Request) => {
  try {
    const formData = await request.formData();
    const name = (formData.get("name") as string || "").trim();
    const phone = (formData.get("phone") as string || "").trim();
    if (!name || !phone) {
      return NextResponse.json({ success: false, error: "Name and phone are required." }, { status: 400 });
    }
    const result = await submitLead(formData);
    if (result.success) {
      return NextResponse.json({ success: true, message: result.message }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (err) {
    console.error("API /api/lead error", err);
    return NextResponse.json({ success: false, error: "Unexpected server error." }, { status: 500 });
  }
};
