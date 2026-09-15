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

    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
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
        console.error("[Insurance Lead] JSON body parse error:", e);
      }
    } else {
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
      } catch (e) {
        console.error("[Insurance Lead] FormData parse error:", e);
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

    const supabaseKey = (
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      DEFAULT_SUPABASE_ANON_KEY
    )?.trim();

    // 1. Insert into Supabase REST API
    let dbSuccess = false;
    if (supabaseKey && supabaseUrl) {
      try {
        const restRes = await fetch(`${supabaseUrl}/rest/v1/leads`, {
          method: "POST",
          headers: {
            "apikey": supabaseKey,
            "Authorization": `Bearer ${supabaseKey}`,
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
          },
          body: JSON.stringify(dbPayload),
          cache: "no-store",
        });

        if (restRes.ok || restRes.status === 201 || restRes.status === 200 || restRes.status === 204) {
          dbSuccess = true;
        } else {
          const errTxt = await restRes.text().catch(() => "");
          console.error(`[Insurance Lead] DB insert failed status ${restRes.status}:`, errTxt);
        }
      } catch (dbExc) {
        console.error("[Insurance Lead] DB insert exception:", dbExc);
      }
    }

    // 2. Trigger Telegram Notification
    let tgSuccess = false;
    const token = process.env.TELEGRAM_BOT_TOKEN || DEFAULT_TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID || DEFAULT_TELEGRAM_CHAT_ID;

    if (token && chatId) {
      const escapeHtml = (str: string) =>
        (str || "")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");

      const tgLines = [
        `🔔 <b>CERERE OFERTĂ — INSURANCE</b>`,
        `─────────────────────`,
        `👤 <b>Nume:</b> ${escapeHtml(dbPayload.name)}`,
        `📞 <b>Telefon:</b> ${escapeHtml(dbPayload.phone)}`,
        `📧 <b>Email:</b> ${escapeHtml(dbPayload.email || "Nespecificat")}`,
        `💼 <b>Asigurare:</b> ${escapeHtml(dbPayload.service_type)}`,
      ];

      if (message) {
        tgLines.push(`\n📝 <b>Detalii / Mesaj:</b>\n${escapeHtml(message)}`);
      }

      if (metadata && Object.keys(metadata).length > 0) {
        const metaEntries = Object.entries(metadata)
          .map(([k, v]) => `• ${escapeHtml(k)}: ${escapeHtml(String(v))}`)
          .join("\n");
        tgLines.push(`\n📋 <b>Context / Detalii Specifice:</b>\n${metaEntries}`);
      }

      tgLines.push(`\n🌐 <b>Sursă:</b> ${escapeHtml(source || "insurance.cristianvaduva.com")}`);
      tgLines.push(`🕒 <b>Data:</b> ${new Date().toISOString()}`);

      const tgText = tgLines.join("\n");

      try {
        const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: tgText,
            parse_mode: "HTML",
          }),
        });
        if (tgRes.ok) {
          tgSuccess = true;
        } else {
          const tgErrTxt = await tgRes.text().catch(() => "");
          console.error(`[Insurance Lead] Telegram alert failed status ${tgRes.status}:`, tgErrTxt);
        }
      } catch (tgErr) {
        console.error("[Insurance Lead] Telegram alert error:", tgErr);
      }
    }

    if (dbSuccess || tgSuccess) {
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
