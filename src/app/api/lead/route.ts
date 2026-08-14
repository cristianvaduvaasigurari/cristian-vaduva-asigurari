// src/app/api/lead/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const DEFAULT_SUPABASE_URL = "https://fcpsafjgjnecdlyqfcid.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjcHNhZmpnam5lY2RseXFmY2lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MzAyMTksImV4cCI6MjA5ODMwNjIxOX0.n-Obp-2j284umEvkKHBiTmmTfYARKvGrx3dUDhvcGPY";
const DEFAULT_TELEGRAM_BOT_TOKEN = "8879456913:AAEQtberMOikmLjLkq7Okrjw47znlBzhokM";
const DEFAULT_TELEGRAM_CHAT_ID = "-1003998698561";

export const POST = async (request: Request) => {
  try {
    let name = "Anonim";
    let phone = "";
    let email = "";
    let service = "Website Lead";
    let message = "";
    let source = "Website Lead";
    let metadata: Record<string, unknown> | null = null;

    try {
      const formData = await request.formData();
      name = (formData.get("name") as string || "Anonim").trim();
      phone = (formData.get("phone") as string || "").trim();
      email = (formData.get("email") as string || "").trim();
      service = (formData.get("service") as string || "Website Lead").trim();
      message = (formData.get("message") as string || "").trim();
      source = (formData.get("source") as string || "Website Lead").trim();
      const metadataStr = formData.get("metadata") as string;
      if (metadataStr) {
        try {
          metadata = JSON.parse(metadataStr);
        } catch {
          metadata = { raw: metadataStr };
        }
      }
    } catch {
      try {
        const json = await request.json();
        name = (json.name || "Anonim").toString().trim();
        phone = (json.phone || "").toString().trim();
        email = (json.email || "").toString().trim();
        service = (json.service || "Website Lead").toString().trim();
        message = (json.message || "").toString().trim();
        source = (json.source || "Website Lead").toString().trim();
        if (json.metadata) {
          metadata = typeof json.metadata === "string" ? JSON.parse(json.metadata) : json.metadata;
        }
      } catch (e) {
        console.error("[Insurance Lead] Body parse error:", e);
      }
    }

    if (!phone) {
      return NextResponse.json(
        { ok: false, success: false, error: "Numărul de telefon este obligatoriu." },
        { status: 200 }
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

    const supabaseUrl = (
      process.env.SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      DEFAULT_SUPABASE_URL
    ).trim();

    // Use only the service role key for write access; abort if missing
    const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || DEFAULT_SUPABASE_ANON_KEY).trim();
    if (!supabaseKey) {
      console.error('[Insurance Lead] Supabase service role key missing');
      return NextResponse.json(
        { success: false, error: 'Eroare la salvarea datelor.' },
        { status: 500 }
      );
    }

    // 1. Insert into Supabase REST API
    let dbSuccess = false;
    try {
      const keysToTry = [
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        DEFAULT_SUPABASE_ANON_KEY,
      ].filter(Boolean) as string[];

      for (const key of keysToTry) {
        const trimmedKey = key.trim();
        if (!trimmedKey) continue;

        const restRes = await fetch(`${supabaseUrl}/rest/v1/leads`, {
          method: "POST",
          headers: {
            "apikey": trimmedKey,
            "Authorization": `Bearer ${trimmedKey}`,
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
          },
          body: JSON.stringify(dbPayload),
          cache: "no-store",
        });

        if (restRes.ok || restRes.status === 201 || restRes.status === 200 || restRes.status === 204) {
          dbSuccess = true;
          break;
        } else {
          const errTxt = await restRes.text().catch(() => "");
          console.error(`[Insurance Lead] DB insert failed with status ${restRes.status}:`, errTxt);
        }
      }
    } catch (dbExc) {
      console.error("[Insurance Lead] DB insert exception:", dbExc);
    }

    // 2. Trigger Telegram Notification
    const token = process.env.TELEGRAM_BOT_TOKEN || DEFAULT_TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID || DEFAULT_TELEGRAM_CHAT_ID;

    if (token && chatId) {
      const tgText = [
        `🧠 Cristian Văduva Premium Lead`,
        `─────────────────────`,
        `👤 Nume: ${dbPayload.name}`,
        `📞 Telefon: ${dbPayload.phone}`,
        `📧 Email: ${dbPayload.email || "N/A"}`,
        `💼 Serviciu: ${dbPayload.service_type}`,
        `💬 Mesaj: ${formattedMessage || "—"}`,
        `📍 URL Pagină: ${request.headers.get("referer") || "Website Lead"}`,
        `🕒 Data/Oră: ${new Date().toISOString()}`,
      ].join("\n");

      try {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: tgText,
            parse_mode: "HTML",
          }),
        });
      } catch (tgErr) {
        console.error("[Insurance Lead] Telegram alert error:", tgErr);
      }
    }

    if (dbSuccess) {
      return NextResponse.json(
        { success: true, message: "Lead salvat cu succes." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: "Eroare la salvarea datelor." },
        { status: 200 }
      );
    }
  } catch (topErr) {
    console.error("[Insurance Lead] Unhandled route error:", topErr);
    return NextResponse.json(
      { success: false, error: "Eroare la salvarea datelor." },
      { status: 200 }
    );
  }
};
