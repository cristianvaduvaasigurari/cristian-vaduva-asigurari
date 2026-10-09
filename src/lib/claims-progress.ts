import jsPDF from "jspdf";
import { PolicyCategory, CATEGORY_LABELS_RO, CATEGORY_LABELS_EN } from "./portfolio-calendar";

export type ClaimStage =
  | "incident_recorded"
  | "preparing_notification"
  | "reported_to_insurer"
  | "awaiting_documents"
  | "documents_submitted"
  | "awaiting_insurer_response"
  | "assessment_investigation"
  | "settlement_repair_coordination"
  | "resolved"
  | "disputed_clarification";

export type ActivityType =
  | "phone_call"
  | "email"
  | "insurer_notification"
  | "document_requested"
  | "document_submitted"
  | "assessment_inspection"
  | "repair_service_update"
  | "payment_settlement_update"
  | "follow_up_reminder"
  | "other";

export type DocRegisterStatus =
  | "to_obtain"
  | "requested"
  | "ready"
  | "submitted"
  | "additional_info_requested"
  | "not_applicable";

export interface ActivityEntry {
  id: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:MM
  type: ActivityType;
  title: string;
  notes?: string;
  contactName?: string;
  nextAction?: string;
  followUpDate?: string; // YYYY-MM-DD
  isCompleted?: boolean;
  createdAt: string;
}

export interface ClaimDocRecord {
  id: string;
  name: string;
  status: DocRegisterStatus;
  dateRequested?: string;
  dateSubmitted?: string;
  notes?: string;
}

export interface ClaimsWorkspaceData {
  nickname: string;
  category: PolicyCategory;
  incidentDate?: string;
  reportedDate?: string;
  insurer?: string;
  stage: ClaimStage;
  nextFollowUpDate?: string;
  generalNotes?: string;
  activities: ActivityEntry[];
  documents: ClaimDocRecord[];
  lang: "ro" | "en";
  createdAt: string;
  updatedAt: string;
}

export const CLAIM_STAGE_LABELS_RO: Record<ClaimStage, string> = {
  incident_recorded: "1. Incident Înregistrat (Intern)",
  preparing_notification: "2. Pregătire Notificare / Dosar",
  reported_to_insurer: "3. Avizat la Asigurator",
  awaiting_documents: "4. În Așteptare Documente / Acte",
  documents_submitted: "5. Documente Transmise Integral",
  awaiting_insurer_response: "6. În Așteptare Răspuns Asigurator",
  assessment_investigation: "7. Constatare Daună / Inspecție Tehnică",
  settlement_repair_coordination: "8. Coordonare Reparație / Ofertă Despăgubire",
  resolved: "9. Dosar Soluționat & Despăgubit",
  disputed_clarification: "10. În Dispută / Necesită Clarificare",
};

export const CLAIM_STAGE_LABELS_EN: Record<ClaimStage, string> = {
  incident_recorded: "1. Incident Recorded Internally",
  preparing_notification: "2. Preparing Claim Notice",
  reported_to_insurer: "3. Claim Reported to Insurer",
  awaiting_documents: "4. Awaiting Required Documents",
  documents_submitted: "5. Documents Fully Submitted",
  awaiting_insurer_response: "6. Awaiting Insurer Response",
  assessment_investigation: "7. Technical Survey & Assessment",
  settlement_repair_coordination: "8. Repair / Settlement Coordination",
  resolved: "9. Resolved & Paid / Closed",
  disputed_clarification: "10. Disputed / Clarification Needed",
};

export const ACTIVITY_TYPE_LABELS_RO: Record<ActivityType, string> = {
  phone_call: "Apel Telefonic",
  email: "Email / Corespondență",
  insurer_notification: "Notificare Asigurator",
  document_requested: "Document Solicitat",
  document_submitted: "Document Transmis",
  assessment_inspection: "Inspecție / Constatare",
  repair_service_update: "Update Service / Reparație",
  payment_settlement_update: "Plată / Despăgubire",
  follow_up_reminder: "Reamintire Follow-up",
  other: "Altă Activitate",
};

export const ACTIVITY_TYPE_LABELS_EN: Record<ActivityType, string> = {
  phone_call: "Phone Call",
  email: "Email / Correspondence",
  insurer_notification: "Insurer Notification",
  document_requested: "Document Requested",
  document_submitted: "Document Submitted",
  assessment_inspection: "Damage Assessment / Survey",
  repair_service_update: "Repair / Service Update",
  payment_settlement_update: "Payment / Settlement",
  follow_up_reminder: "Follow-up Reminder",
  other: "Other Activity",
};

export const DOC_REGISTER_STATUS_RO: Record<DocRegisterStatus, string> = {
  to_obtain: "De Obținut",
  requested: "Solicitat de Asigurator",
  ready: "Pregătit (Gata de trimis)",
  submitted: "Transmis Asiguratorului",
  additional_info_requested: "Informații Suplimentare Cerute",
  not_applicable: "Neaplicabil",
};

export const DOC_REGISTER_STATUS_EN: Record<DocRegisterStatus, string> = {
  to_obtain: "To Obtain",
  requested: "Requested by Insurer",
  ready: "Ready to Submit",
  submitted: "Submitted to Insurer",
  additional_info_requested: "Additional Info Requested",
  not_applicable: "Not Applicable",
};

/**
 * Compares two date strings (YYYY-MM-DD) in local calendar time to determine follow-up status.
 */
export function getFollowUpStatus(targetDateStr?: string): "overdue" | "today" | "upcoming" | "none" {
  if (!targetDateStr) return "none";
  const parts = targetDateStr.split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return "none";

  const [y, m, d] = parts;
  const target = new Date(y, m - 1, d, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "overdue";
  if (diffDays === 0) return "today";
  return "upcoming";
}

/**
 * PDF Timeline & Claims Progress Report Generator.
 */
export function generateClaimsProgressPdf(claim: ClaimsWorkspaceData): jsPDF {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const isRo = claim.lang === "ro";
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = 18;

  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 28, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("CRISTIAN VADUVA — ASIGURARI PREMIUM", margin, 12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  doc.text("Jurnal Cronologic Dauna & Registru Documente | Insurance.CristianVaduva.com", margin, 18);

  const dateStr = new Date().toLocaleDateString(isRo ? "ro-RO" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(`${isRo ? "Data generarii" : "Date Generated"}: ${dateStr}`, pageWidth - margin, 18, { align: "right" });

  y = 36;

  // Claim Title
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text(
    `${isRo ? "JURNAL URMARIRE DAUNA" : "CLAIM TRACKING DOSSIER"}: ${claim.nickname}`,
    margin,
    y
  );

  y += 7;

  // Claim Details Summary Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.rect(margin, y, contentWidth, 22, "FD");

  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);

  const catLabel = isRo ? CATEGORY_LABELS_RO[claim.category] : CATEGORY_LABELS_EN[claim.category];
  const stageLabel = isRo ? CLAIM_STAGE_LABELS_RO[claim.stage] : CLAIM_STAGE_LABELS_EN[claim.stage];

  doc.setFont("helvetica", "bold");
  doc.text(`${isRo ? "Categorie" : "Category"}:`, margin + 4, y + 6);
  doc.setFont("helvetica", "normal");
  doc.text(catLabel, margin + 28, y + 6);

  doc.setFont("helvetica", "bold");
  doc.text(`${isRo ? "Stadiu Actual" : "Current Stage"}:`, margin + 4, y + 11);
  doc.setFont("helvetica", "normal");
  doc.text(stageLabel, margin + 28, y + 11);

  doc.setFont("helvetica", "bold");
  doc.text(`${isRo ? "Asigurator" : "Insurer"}:`, margin + 4, y + 16);
  doc.setFont("helvetica", "normal");
  doc.text(claim.insurer || (isRo ? "Nespecificat" : "Not specified"), margin + 28, y + 16);

  const col2X = margin + contentWidth / 2 + 4;
  if (claim.incidentDate) {
    doc.setFont("helvetica", "bold");
    doc.text(`${isRo ? "Data Eveniment" : "Incident Date"}:`, col2X, y + 6);
    doc.setFont("helvetica", "normal");
    doc.text(claim.incidentDate, col2X + 32, y + 6);
  }

  if (claim.reportedDate) {
    doc.setFont("helvetica", "bold");
    doc.text(`${isRo ? "Data Avizare" : "Notice Date"}:`, col2X, y + 11);
    doc.setFont("helvetica", "normal");
    doc.text(claim.reportedDate, col2X + 32, y + 11);
  }

  if (claim.nextFollowUpDate) {
    doc.setFont("helvetica", "bold");
    doc.text(`${isRo ? "Urmator Follow-up" : "Next Follow-up"}:`, col2X, y + 16);
    doc.setFont("helvetica", "normal");
    doc.text(claim.nextFollowUpDate, col2X + 32, y + 16);
  }

  y += 28;

  // Section 1: Chronological Activity Log
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(isRo ? "1. CRONOLOGIE ACTIVITATI & COMUNICARI" : "1. ACTIVITY & COMMUNICATIONS LOG", margin, y);

  y += 6;

  if (claim.activities.length === 0) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(isRo ? "Nicio activitate consemnată încă." : "No activity recorded yet.", margin, y);
    y += 8;
  } else {
    claim.activities.slice(0, 6).forEach((act) => {
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(226, 232, 240);
      doc.rect(margin, y, contentWidth, 14, "FD");

      const typeLabel = isRo ? ACTIVITY_TYPE_LABELS_RO[act.type] : ACTIVITY_TYPE_LABELS_EN[act.type];

      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 41, 59);
      doc.text(`${act.date}${act.time ? ` ${act.time}` : ""} • [${typeLabel}] ${act.title}`, margin + 3, y + 5);

      if (act.notes || act.nextAction) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(100, 116, 139);
        const subtext = [act.notes, act.nextAction ? `Urmator pas: ${act.nextAction}` : null].filter(Boolean).join(" | ");
        const splitText = doc.splitTextToSize(subtext, contentWidth - 6);
        doc.text(splitText[0] || "", margin + 3, y + 9.5);
      }

      y += 16;
    });
  }

  y += 2;

  // Section 2: Document Register
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(isRo ? "2. REGISTRU DOCUMENTE DOSAR" : "2. CLAIM DOCUMENT REGISTER", margin, y);

  y += 6;

  if (claim.documents.length === 0) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(isRo ? "Niciun document adăugat în registru." : "No documents recorded in register.", margin, y);
    y += 8;
  } else {
    claim.documents.slice(0, 5).forEach((docRec) => {
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(51, 65, 85);
      doc.text(`• ${docRec.name}`, margin + 2, y);

      const statusLbl = isRo ? DOC_REGISTER_STATUS_RO[docRec.status] : DOC_REGISTER_STATUS_EN[docRec.status];
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 116, 139);
      doc.text(
        `Status: ${statusLbl}${docRec.dateSubmitted ? ` | Transmis: ${docRec.dateSubmitted}` : ""}`,
        pageWidth - margin,
        y,
        { align: "right" }
      );

      y += 5.5;
    });
  }

  y += 3;

  // Section 3: General Notes
  if (claim.generalNotes && claim.generalNotes.trim().length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(isRo ? "3. NOTITE GENERALE & OBSERVATII" : "3. GENERAL NOTES", margin, y);

    y += 5;

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, y, contentWidth, 12, "FD");

    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    const splitNotes = doc.splitTextToSize(claim.generalNotes, contentWidth - 4);
    doc.text(splitNotes[0] || "", margin + 2, y + 4.5);

    y += 15;
  }

  // Footer Disclaimer & Advisory Contact
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, y, contentWidth, 22, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.text(isRo ? "CONSULTANTA DOSAR DAUNA (CRISTIAN VADUVA):" : "CLAIMS ADVISORY CONTACT (CRISTIAN VADUVA):", margin + 3, y + 4.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    isRo
      ? "Telefon: 0767 110 439 | Website: https://insurance.cristianvaduva.com/generator-dosar-dauna\nAcest jurnal are rol pur organizatoric privat. Nu constituie o notificare oficiala catre asigurator sau o promisiune de aprobare a dosarului."
      : "Phone: 0767 110 439 | Website: https://insurance.cristianvaduva.com/generator-dosar-dauna\nThis dossier is a private organizational tool. It does not constitute formal insurer communication or a guarantee of claim payment.",
    margin + 3,
    y + 9.5
  );

  return doc;
}

/**
 * Validates a JSON imported claims tracker workspace.
 */
export function validateImportedClaimsWorkspace(jsonStr: string): {
  isValid: boolean;
  error?: string;
  claim?: ClaimsWorkspaceData;
} {
  try {
    const parsed = JSON.parse(jsonStr);
    if (!parsed || typeof parsed !== "object") {
      return { isValid: false, error: "Fișier JSON invalid sau corupt." };
    }

    if (!parsed.nickname || typeof parsed.nickname !== "string") {
      return { isValid: false, error: "Denumirea dosarului (nickname) lipsește." };
    }

    const validStages: ClaimStage[] = [
      "incident_recorded",
      "preparing_notification",
      "reported_to_insurer",
      "awaiting_documents",
      "documents_submitted",
      "awaiting_insurer_response",
      "assessment_investigation",
      "settlement_repair_coordination",
      "resolved",
      "disputed_clarification",
    ];

    const stage = validStages.includes(parsed.stage) ? parsed.stage : "incident_recorded";

    const activities: ActivityEntry[] = Array.isArray(parsed.activities)
      ? (parsed.activities as Record<string, unknown>[]).slice(0, 100).map((act) => ({
          id: String(act.id || Math.random().toString(36).substring(2, 9)),
          date: String(act.date || new Date().toISOString().slice(0, 10)).slice(0, 10),
          time: act.time ? String(act.time).slice(0, 5) : undefined,
          type: [
            "phone_call",
            "email",
            "insurer_notification",
            "document_requested",
            "document_submitted",
            "assessment_inspection",
            "repair_service_update",
            "payment_settlement_update",
            "follow_up_reminder",
            "other",
          ].includes(String(act.type))
            ? (act.type as ActivityType)
            : "other",
          title: String(act.title || "Activitate").slice(0, 120),
          notes: act.notes ? String(act.notes).slice(0, 500) : undefined,
          contactName: act.contactName ? String(act.contactName).slice(0, 80) : undefined,
          nextAction: act.nextAction ? String(act.nextAction).slice(0, 120) : undefined,
          followUpDate: act.followUpDate ? String(act.followUpDate).slice(0, 10) : undefined,
          isCompleted: Boolean(act.isCompleted),
          createdAt: typeof act.createdAt === "string" ? act.createdAt : new Date().toISOString(),
        }))
      : [];

    const documents: ClaimDocRecord[] = Array.isArray(parsed.documents)
      ? (parsed.documents as Record<string, unknown>[]).slice(0, 50).map((d) => ({
          id: String(d.id || Math.random().toString(36).substring(2, 9)),
          name: String(d.name || "Document").slice(0, 120),
          status: [
            "to_obtain",
            "requested",
            "ready",
            "submitted",
            "additional_info_requested",
            "not_applicable",
          ].includes(String(d.status))
            ? (d.status as DocRegisterStatus)
            : "to_obtain",
          dateRequested: d.dateRequested ? String(d.dateRequested).slice(0, 10) : undefined,
          dateSubmitted: d.dateSubmitted ? String(d.dateSubmitted).slice(0, 10) : undefined,
          notes: d.notes ? String(d.notes).slice(0, 300) : undefined,
        }))
      : [];

    const claim: ClaimsWorkspaceData = {
      nickname: String(parsed.nickname).slice(0, 100),
      category: [
        "rca",
        "casco",
        "home",
        "life",
        "health",
        "travel",
        "business",
        "professional_liability",
        "private_client",
        "other",
      ].includes(parsed.category)
        ? parsed.category
        : "casco",
      incidentDate: parsed.incidentDate ? String(parsed.incidentDate).slice(0, 10) : undefined,
      reportedDate: parsed.reportedDate ? String(parsed.reportedDate).slice(0, 10) : undefined,
      insurer: parsed.insurer ? String(parsed.insurer).slice(0, 100) : undefined,
      stage,
      nextFollowUpDate: parsed.nextFollowUpDate ? String(parsed.nextFollowUpDate).slice(0, 10) : undefined,
      generalNotes: parsed.generalNotes ? String(parsed.generalNotes).slice(0, 1000) : undefined,
      activities,
      documents,
      lang: parsed.lang === "en" ? "en" : "ro",
      createdAt: parsed.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return { isValid: true, claim };
  } catch {
    return { isValid: false, error: "Eroare la parsarea structurii JSON." };
  }
}
