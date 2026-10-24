// src/app/api/lead/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function sanitizeText(input: unknown): string {
  if (typeof input !== "string") return "";
  return input.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
}

function isHoneypotTriggered(val: string): boolean {
  return Boolean(val && val.trim().length > 0);
}

function validatePhone(phone: string): { isValid: boolean; sanitizedValue?: string; error?: string } {
  const sanitized = phone.replace(/[^\d+]/g, "").trim();
  const digitsOnly = sanitized.replace(/\D/g, "");
  if (!digitsOnly || digitsOnly.length < 9) {
    return { isValid: false, error: "Te rugăm să introduci un număr de telefon valid." };
  }
  return { isValid: true, sanitizedValue: sanitized };
}

function validateEmail(email: string, isRequired = false): { isValid: boolean; sanitizedValue?: string; error?: string } {
  const sanitized = email.trim().toLowerCase();
  if (!sanitized) {
    if (isRequired) return { isValid: false, error: "Adresa de email este obligatorie." };
    return { isValid: true, sanitizedValue: "" };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitized)) {
    return { isValid: false, error: "Te rugăm să introduci o adresă de email validă." };
  }
  return { isValid: true, sanitizedValue: sanitized };
}

function validateName(name: string, isRequired = false): { isValid: boolean; sanitizedValue?: string; error?: string } {
  const sanitized = sanitizeText(name);
  if (!sanitized || sanitized === "Anonim") {
    if (isRequired) return { isValid: false, error: "Numele este obligatoriu." };
    return { isValid: true, sanitizedValue: "Anonim" };
  }
  return { isValid: true, sanitizedValue: sanitized };
}

function validateMessage(message: string, maxLen = 2000): { isValid: boolean; sanitizedValue?: string; error?: string } {
  const sanitized = sanitizeText(message).slice(0, maxLen);
  return { isValid: true, sanitizedValue: sanitized };
}

import { checkRateLimit, createRateLimitResponse, getClientIp } from "@/lib/rateLimit";
import { logger, redactSensitiveData, sanitizeObject } from "@/lib/logger";
import { captureException } from "@/lib/sentry";

export const POST = async (request: Request) => {
  const correlationId = crypto.randomUUID();
  const clientIp = getClientIp(request);

  // 1. Rate Limiting: 5 lead submissions per minute per IP
  const rateLimitResult = await checkRateLimit(`lead:${clientIp}`, 5, 60000);
  if (!rateLimitResult.success) {
    logger.warn("Rate limit exceeded for lead submission", { correlationId, clientIp });
    return createRateLimitResponse(rateLimitResult.reset);
  }

  // 2. Reject excessive payload sizes (> 50KB)
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > 51200) {
    logger.warn("Payload size exceeds maximum allowed limit", { correlationId, contentLength });
    return NextResponse.json(
      { ok: false, success: false, error: "Dimensiunea cererii depășește limita permisă." },
      { status: 413, headers: { "Cache-Control": "private, no-cache, no-store" } }
    );
  }

  try {
    let nameRaw = "Anonim";
    let phoneRaw = "";
    let emailRaw = "";
    let serviceRaw = "Website Lead";
    let messageRaw = "";
    let sourceRaw = "Website Lead";
    let honeypotRaw = "";
    let consentGiven = false;
    let metadata: Record<string, unknown> | null = null;

    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      try {
        const json = await request.json();
        nameRaw = (json.name || "Anonim").toString();
        phoneRaw = (json.phone || "").toString();
        emailRaw = (json.email || "").toString();
        serviceRaw = (json.service || "Website Lead").toString();
        messageRaw = (json.message || "").toString();
        sourceRaw = (json.source || "Website Lead").toString();
        honeypotRaw = (json.website_hp || json.hp || "").toString();
        const rawJsonConsent = json.agreePrivacy ?? json.consent ?? json.agreeGDPR ?? json.privacyConsent ?? json.privacy;
        consentGiven = rawJsonConsent === true || rawJsonConsent === "true" || rawJsonConsent === "on" || rawJsonConsent === 1 || rawJsonConsent === "1";
        if (json.metadata) {
          metadata = typeof json.metadata === "string" ? JSON.parse(json.metadata) : json.metadata;
        }
      } catch {
        logger.warn("Malformed JSON body in lead submission", { correlationId, route: "/api/lead" });
        return NextResponse.json(
          { ok: false, success: false, error: "Formatul cererii este invalid." },
          { status: 400, headers: { "Cache-Control": "private, no-cache, no-store" } }
        );
      }
    } else {
      try {
        const formData = await request.formData();
        nameRaw = (formData.get("name") as string) || "Anonim";
        phoneRaw = (formData.get("phone") as string) || "";
        emailRaw = (formData.get("email") as string) || "";
        serviceRaw = (formData.get("service") as string) || "Website Lead";
        messageRaw = (formData.get("message") as string) || "";
        sourceRaw = (formData.get("source") as string) || "Website Lead";
        honeypotRaw = (formData.get("website_hp") as string) || (formData.get("hp") as string) || "";
        const rawFdConsent =
          formData.get("agreePrivacy") ??
          formData.get("consent") ??
          formData.get("agreeGDPR") ??
          formData.get("privacyConsent") ??
          formData.get("privacy");
        consentGiven =
          rawFdConsent === "true" ||
          rawFdConsent === "on" ||
          rawFdConsent === "1" ||
          rawFdConsent === "yes";

        const metadataStr = formData.get("metadata") as string;
        if (metadataStr) {
          try {
            metadata = JSON.parse(metadataStr);
          } catch {
            metadata = { raw: sanitizeText(metadataStr) };
          }
        }
      } catch {
        logger.warn("Malformed FormData in lead submission", { correlationId, route: "/api/lead" });
        return NextResponse.json(
          { ok: false, success: false, error: "Formatul cererii este invalid." },
          { status: 400, headers: { "Cache-Control": "private, no-cache, no-store" } }
        );
      }
    }

    // 2. Anti-spam Honeypot Check (Silent drop for bots)
    if (isHoneypotTriggered(honeypotRaw)) {
      logger.info("Spam bot trapped by honeypot", { correlationId, route: "/api/lead" });
      return NextResponse.json(
        { ok: true, success: true, message: "Solicitarea a fost recepționată." },
        { status: 200, headers: { "Cache-Control": "private, no-cache, no-store" } }
      );
    }

    // 3. Strict Input Validation & Sanitization
    const phoneVal = validatePhone(phoneRaw);
    if (!phoneVal.isValid) {
      return NextResponse.json(
        { ok: false, success: false, error: phoneVal.error },
        { status: 400, headers: { "Cache-Control": "private, no-cache, no-store" } }
      );
    }

    const emailVal = validateEmail(emailRaw, false);
    if (!emailVal.isValid) {
      return NextResponse.json(
        { ok: false, success: false, error: emailVal.error },
        { status: 400, headers: { "Cache-Control": "private, no-cache, no-store" } }
      );
    }

    const nameVal = validateName(nameRaw, false);
    if (!nameVal.isValid) {
      return NextResponse.json(
        { ok: false, success: false, error: nameVal.error },
        { status: 400, headers: { "Cache-Control": "private, no-cache, no-store" } }
      );
    }

    const messageVal = validateMessage(messageRaw, 2000);
    if (!messageVal.isValid) {
      return NextResponse.json(
        { ok: false, success: false, error: messageVal.error },
        { status: 400, headers: { "Cache-Control": "private, no-cache, no-store" } }
      );
    }

    // 4. GDPR Consent Check
    if (!consentGiven) {
      return NextResponse.json(
        {
          ok: false,
          success: false,
          error: "Este necesar să confirmați acordul privind politica de confidențialitate pentru a trimite solicitarea.",
        },
        { status: 400, headers: { "Cache-Control": "private, no-cache, no-store" } }
      );
    }

    const cleanName = nameVal.sanitizedValue || "Anonim";
    const cleanPhone = phoneVal.sanitizedValue!;
    const cleanEmail = emailVal.sanitizedValue || "";
    const cleanService = sanitizeText(serviceRaw) || "Website Lead";
    const cleanMessage = messageVal.sanitizedValue || "";
    const cleanSource = sanitizeText(sourceRaw) || "insurance.cristianvaduva.com";

    const formattedMessage = [
      cleanMessage,
      cleanSource ? `Sursă: ${cleanSource}` : null,
      metadata ? `Context: ${JSON.stringify(sanitizeObject(metadata))}` : null,
      `ID Corelare: ${correlationId}`,
    ]
      .filter(Boolean)
      .join("\n\n");

    const dbPayload = {
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      service_type: cleanService,
      message: formattedMessage,
    };

    const supabaseUrl = (
      process.env.SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL
    )?.trim();

    const supabaseKey = (
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )?.trim();

    // 5. Insert into Supabase REST API
    let dbSuccess = false;
    if (supabaseKey && supabaseUrl) {
      try {
        const restRes = await fetch(`${supabaseUrl}/rest/v1/leads`, {
          method: "POST",
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify(dbPayload),
          cache: "no-store",
        });

        if (restRes.ok || restRes.status === 201 || restRes.status === 200 || restRes.status === 204) {
          dbSuccess = true;
        } else {
          logger.error("Supabase lead insertion error status: " + restRes.status, undefined, {
            correlationId,
            route: "/api/lead",
          });
        }
      } catch (dbExc) {
        logger.error("Supabase lead insertion exception", dbExc, {
          correlationId,
          route: "/api/lead",
        });
      }
    } else {
      logger.error("Supabase environment configuration missing", undefined, {
        correlationId,
        route: "/api/lead",
      });
    }

    // 6. Trigger Operational Telegram Notification
    let tgSuccess = false;
    const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

    if (token && chatId) {
      const escapeHtml = (str: string) =>
        (str || "")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");

      const isPrivateClient =
        cleanService.toUpperCase().includes("PRIVATE CLIENT") ||
        (metadata && (metadata.division === "PRIVATE CLIENT" || metadata.lead_type === "PRIVATE CLIENT"));

      const tgLines = [
        isPrivateClient
          ? `🏛️ <b>CERERE CONFIDENȚIALĂ — PRIVATE CLIENT</b>`
          : `🔔 <b>CERERE OFERTĂ — INSURANCE</b>`,
        `─────────────────────`,
        `👤 <b>Nume:</b> ${escapeHtml(redactSensitiveData(cleanName))}`,
        `📞 <b>Telefon:</b> ${escapeHtml(cleanPhone)}`,
        `📧 <b>Email:</b> ${escapeHtml(cleanEmail || "Nespecificat")}`,
        `💼 <b>${isPrivateClient ? "Divizie / Serviciu" : "Asigurare"}:</b> ${escapeHtml(redactSensitiveData(cleanService))}`,
      ];

      if (cleanMessage) {
        tgLines.push(`\n📝 <b>Detalii / Mesaj:</b>\n${escapeHtml(redactSensitiveData(cleanMessage))}`);
      }

      tgLines.push(`\n🌐 <b>Sursă:</b> ${escapeHtml(cleanSource)}`);
      tgLines.push(`🔖 <b>Ref:</b> <code>${correlationId.slice(0, 8)}</code>`);
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
          logger.warn("Telegram notification alert failed status: " + tgRes.status, {
            correlationId,
            route: "/api/lead",
          });
        }
      } catch (tgErr) {
        logger.error("Telegram notification alert exception", tgErr, {
          correlationId,
          route: "/api/lead",
        });
      }
    }

    logger.info("Lead processed", {
      correlationId,
      route: "/api/lead",
      service: cleanService,
      dbSuccess,
      tgSuccess,
    });

    if (dbSuccess) {
      return NextResponse.json(
        {
          success: true,
          message: "Lead salvat cu succes.",
          correlationId,
        },
        {
          status: 200,
          headers: { "Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate" },
        }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Eroare temporară la salvarea datelor. Te rugăm să reîncerci.",
          correlationId,
        },
        {
          status: 500,
          headers: { "Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate" },
        }
      );
    }
  } catch (topErr) {
    captureException(topErr, { correlationId, route: "/api/lead" });
    logger.error("Unhandled lead route error", topErr, { correlationId, route: "/api/lead" });
    return NextResponse.json(
      {
        success: false,
        error: "Eroare tehnică internă.",
        correlationId,
      },
      {
        status: 500,
        headers: { "Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate" },
      }
    );
  }
};
