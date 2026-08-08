// src/app/api/lead/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendTelegramAlert } from "@/lib/telegram";

export const POST = async (request: Request) => {
  try {
    console.log("[Insurance Lead] request received");

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      console.log("[Insurance Lead] payload: invalid form data");
      return NextResponse.json(
        { ok: false, success: false, error: "Date invalide furnizate." },
        { status: 400 }
      );
    }

    const name = (formData.get("name") as string || "Anonim").trim();
    const phone = (formData.get("phone") as string || "").trim();
    const email = (formData.get("email") as string || "").trim();
    const service = (formData.get("service") as string || "Website Lead").trim();
    const message = (formData.get("message") as string || "").trim();
    const source = (formData.get("source") as string || "Website Lead").trim();
    const metadataStr = formData.get("metadata") as string;
    let metadata: Record<string, unknown> | null = null;

    if (metadataStr) {
      try {
        metadata = JSON.parse(metadataStr);
      } catch {
        metadata = { raw: metadataStr };
      }
    }

    console.log("[Insurance Lead] payload:", {
      name,
      phone,
      email,
      service,
      source,
      hasMetadata: Boolean(metadata),
    });

    if (!phone) {
      return NextResponse.json(
        { ok: false, success: false, error: "Numărul de telefon este obligatoriu." },
        { status: 400 }
      );
    }

    const formattedMessage = [
      message,
      source ? `Sursă: ${source}` : null,
      metadata ? `Detalii: ${JSON.stringify(metadata, null, 2)}` : null,
    ]
      .filter(Boolean)
      .join("\n\n");

    const dbPayload = {
      name: name || "Anonim",
      email,
      phone,
      service_type: service,
      message: formattedMessage,
    };

    console.log("[Insurance Lead] database insert:", dbPayload);

    const supabase = await createClient();
    const { error } = await supabase.from("leads").insert([dbPayload]);

    console.log("[Insurance Lead] database result:", error ? { message: error.message, code: error.code } : "success");

    if (error) {
      console.error("[Insurance Lead] Supabase insert error:", error);
      return NextResponse.json(
        { ok: false, success: false, error: "Eroare la salvarea datelor." },
        { status: 500 }
      );
    }

    let telegramResult = false;
    try {
      telegramResult = await sendTelegramAlert({
        name: dbPayload.name,
        phone: dbPayload.phone,
        email: dbPayload.email,
        service: dbPayload.service_type,
        message: formattedMessage,
        pageUrl: "N/A",
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error("[Insurance Lead] Telegram error:", err);
    }

    console.log("[Insurance Lead] telegram result:", telegramResult);

    return NextResponse.json(
      { ok: true, success: true, message: "Lead salvat cu succes." },
      { status: 200 }
    );
  } catch (err) {
    console.error("[Insurance Lead] API exception:", err);
    return NextResponse.json(
      { ok: false, success: false, error: "Eroare la salvarea datelor." },
      { status: 500 }
    );
  }
};

