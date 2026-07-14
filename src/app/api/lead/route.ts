// src/app/api/lead/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendTelegramAlert } from "@/lib/telegram";

export const POST = async (request: Request) => {
  try {
    const formData = await request.formData();
    const name = (formData.get("name") as string || "").trim();
    const phone = (formData.get("phone") as string || "").trim();
    if (!name || !phone) {
      return NextResponse.json({ success: false, error: "Name and phone are required." }, { status: 400 });
    }
    const email = (formData.get("email") as string || "").trim();
    const service = (formData.get("service") as string || "Website Lead").trim();
    const message = (formData.get("message") as string || "").trim();
    const source = (formData.get("source") as string || "Website Lead").trim();
    const metadataStr = formData.get("metadata") as string;
    const metadata = metadataStr ? JSON.parse(metadataStr) : null;
    const formattedMessage = [
      message,
      source ? `Sursă: ${source}` : null,
      metadata ? `Detalii: ${JSON.stringify(metadata, null, 2)}` : null
    ]
      .filter(Boolean)
      .join("\n\n");
    const supabase = await createClient();
    const { error } = await supabase.from("leads").insert([
      { name, email, phone, service_type: service, message: formattedMessage }
    ]);
    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ success: false, error: "Eroare la salvarea datelor." }, { status: 500 });
    }
    // Await Telegram notification (synchronous)
    await sendTelegramAlert({
      name,
      phone,
      email,
      service,
      message: formattedMessage,
      pageUrl: "N/A",
      timestamp: new Date().toISOString()
    });
    return NextResponse.json({ success: true, message: "Lead saved and notification sent." }, { status: 200 });
  } catch (err) {
    console.error("API /api/lead error", err);
    return NextResponse.json({ success: false, error: "Unexpected server error." }, { status: 500 });
  }
};
