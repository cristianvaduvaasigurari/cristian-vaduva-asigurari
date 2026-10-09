import { jsPDF } from "jspdf";

export type PolicyChangeType =
  | "address_property"
  | "add_remove_asset"
  | "coverage_limit_value"
  | "deductible_options"
  | "add_remove_person"
  | "business_activity"
  | "policy_correction"
  | "endorsement_request"
  | "other";

export type PolicyChangeStatus =
  | "draft"
  | "ready_to_submit"
  | "submitted"
  | "awaiting_response"
  | "info_requested"
  | "info_supplied"
  | "approval_reported"
  | "written_confirmation_recorded"
  | "updated_policy_received"
  | "declined"
  | "withdrawn"
  | "closed"
  | "requires_clarification";

export type SubmissionChannel =
  | "email"
  | "portal"
  | "advisor"
  | "phone"
  | "in_person"
  | "other";

export type EventType =
  | "draft_created"
  | "request_submitted"
  | "contact_made"
  | "response_received"
  | "info_requested"
  | "info_supplied"
  | "approval_reported"
  | "written_confirmation"
  | "updated_document_received"
  | "declined"
  | "withdrawn"
  | "follow_up_done"
  | "other";

export interface ChangeEvent {
  id: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:MM
  eventType: EventType;
  title: string;
  notes?: string;
  followUpAction?: string;
  followUpDate?: string; // YYYY-MM-DD
}

export interface ConfirmationDetails {
  confirmationDate?: string;
  confirmationChannel?: string;
  sourceReferenceTitle?: string;
  hasUpdatedDocumentReceived?: boolean;
  notes?: string;
}

export interface PolicyChangeRecord {
  id: string;
  title: string; // required
  relatedPolicyNickname: string; // required
  category: string;
  insurer?: string;
  changeType: PolicyChangeType;
  description: string; // required
  reason?: string;
  dateIdentified?: string; // YYYY-MM-DD
  desiredEffectiveDate?: string; // YYYY-MM-DD
  dateSubmitted?: string; // YYYY-MM-DD
  submissionChannel?: SubmissionChannel;
  status: PolicyChangeStatus;
  nextFollowUpDate?: string; // YYYY-MM-DD
  notes?: string;
  confirmationDetails?: ConfirmationDetails;
  events: ChangeEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface PolicyChangeExportData {
  schemaVersion: "1.0";
  exportedAt: string;
  userNotes?: string;
  records: PolicyChangeRecord[];
}

export const CHANGE_TYPE_INFO: Record<
  PolicyChangeType,
  { labelRo: string; labelEn: string; iconName: string }
> = {
  address_property: {
    labelRo: "Schimbare Adresă / Bun Imobil",
    labelEn: "Address / Property Change",
    iconName: "Home",
  },
  add_remove_asset: {
    labelRo: "Adăugare / Radiere Bun Asigurat",
    labelEn: "Add / Remove Insured Asset",
    iconName: "Car",
  },
  coverage_limit_value: {
    labelRo: "Modificare Sumă / Limită Asigurată",
    labelEn: "Coverage Limit / Value Change",
    iconName: "TrendingUp",
  },
  deductible_options: {
    labelRo: "Modificare Franșiză / Clauze Opționale",
    labelEn: "Deductible / Optional Terms",
    iconName: "Sliders",
  },
  add_remove_person: {
    labelRo: "Adăugare / Eliminare Asigurat / Beneficiar",
    labelEn: "Add / Remove Insured Person",
    iconName: "Users",
  },
  business_activity: {
    labelRo: "Schimbare Activitate / Expunere B2B",
    labelEn: "Business Activity / Exposure",
    iconName: "Briefcase",
  },
  policy_correction: {
    labelRo: "Corecție Erori pe Poliță",
    labelEn: "Policy Correction Request",
    iconName: "CheckSquare",
  },
  endorsement_request: {
    labelRo: "Solicitare Act Adițional / Endorsement",
    labelEn: "Endorsement / Schedule Request",
    iconName: "FileText",
  },
  other: {
    labelRo: "Altă Modificare Declarată",
    labelEn: "Other Change Request",
    iconName: "Layers",
  },
};

export const STATUS_INFO: Record<
  PolicyChangeStatus,
  { labelRo: string; labelEn: string; color: string; badgeText: string }
> = {
  draft: {
    labelRo: "Ciornă / cerere în pregătire",
    labelEn: "Draft / preparing request",
    color: "zinc",
    badgeText: "Ciornă",
  },
  ready_to_submit: {
    labelRo: "Gata de trimis",
    labelEn: "Ready to submit",
    color: "blue",
    badgeText: "Gata de trimis",
  },
  submitted: {
    labelRo: "Cerere transmisă (declarat)",
    labelEn: "Request submitted (user recorded)",
    color: "cyan",
    badgeText: "Trimisă",
  },
  awaiting_response: {
    labelRo: "În așteptare răspuns asigurator",
    labelEn: "Awaiting insurer response",
    color: "amber",
    badgeText: "În așteptare",
  },
  info_requested: {
    labelRo: "Informații suplimentare cerute",
    labelEn: "Additional information requested",
    color: "purple",
    badgeText: "Info cerute",
  },
  info_supplied: {
    labelRo: "Informații suplimentare transmise",
    labelEn: "Further information supplied",
    color: "indigo",
    badgeText: "Info transmise",
  },
  approval_reported: {
    labelRo: "Aprobare semnalată (fără act scris)",
    labelEn: "Approval reported (verbal / unconfirmed)",
    color: "orange",
    badgeText: "Aprobat neoficial",
  },
  written_confirmation_recorded: {
    labelRo: "Confirmare scrisă înregistrată",
    labelEn: "Written confirmation recorded",
    color: "teal",
    badgeText: "Confirmat scris",
  },
  updated_policy_received: {
    labelRo: "Act adițional / poliță nouă primită",
    labelEn: "Updated policy document recorded",
    color: "emerald",
    badgeText: "Document primit",
  },
  declined: {
    labelRo: "Refuzat de asigurator (declarat)",
    labelEn: "Declined by insurer",
    color: "red",
    badgeText: "Refuzat",
  },
  withdrawn: {
    labelRo: "Retras de utilizator",
    labelEn: "Withdrawn by user",
    color: "slate",
    badgeText: "Retras",
  },
  closed: {
    labelRo: "Închis — fără acțiuni",
    labelEn: "Closed — no further action",
    color: "zinc",
    badgeText: "Închis",
  },
  requires_clarification: {
    labelRo: "Necesită clarificare",
    labelEn: "Requires clarification",
    color: "rose",
    badgeText: "De clarificat",
  },
};

export const EVENT_TYPE_INFO: Record<
  EventType,
  { labelRo: string; labelEn: string }
> = {
  draft_created: { labelRo: "Cerere inițiată", labelEn: "Draft created" },
  request_submitted: { labelRo: "Cerere transmisă", labelEn: "Request submitted" },
  contact_made: { labelRo: "Contact asigurator / broker", labelEn: "Contact made" },
  response_received: { labelRo: "Răspuns primit", labelEn: "Response received" },
  info_requested: { labelRo: "Informații suplimentare cerute", labelEn: "Info requested" },
  info_supplied: { labelRo: "Informații suplimentare trimise", labelEn: "Info supplied" },
  approval_reported: { labelRo: "Aprobare raportată", labelEn: "Approval reported" },
  written_confirmation: { labelRo: "Confirmare scrisă primită", labelEn: "Written confirmation" },
  updated_document_received: { labelRo: "Document / act adițional primit", labelEn: "Updated document received" },
  declined: { labelRo: "Cerere refuzată", labelEn: "Declined" },
  withdrawn: { labelRo: "Cerere retrasă", labelEn: "Withdrawn" },
  follow_up_done: { labelRo: "Follow-up efectuat", labelEn: "Follow-up completed" },
  other: { labelRo: "Alt eveniment", labelEn: "Other event" },
};

export const CHANNEL_LABELS: Record<SubmissionChannel, string> = {
  email: "Email",
  portal: "Portal Online Asigurator",
  advisor: "Consilier / Broker Dedicat",
  phone: "Apel Telefonic",
  in_person: "Prezență fizică / Sediu",
  other: "Alt Canal",
};

export type FollowUpStatus =
  | "overdue"
  | "due_today"
  | "upcoming_7_days"
  | "future"
  | "no_date";

export function getFollowUpStatus(followUpDateStr?: string): {
  status: FollowUpStatus;
  diffDays: number | null;
  labelRo: string;
  labelEn: string;
} {
  if (!followUpDateStr) {
    return {
      status: "no_date",
      diffDays: null,
      labelRo: "Fără dată follow-up",
      labelEn: "No follow-up date",
    };
  }

  const parts = followUpDateStr.split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) {
    return {
      status: "no_date",
      diffDays: null,
      labelRo: "Dată invalidă",
      labelEn: "Invalid date",
    };
  }

  const [year, month, day] = parts;
  const targetDate = new Date(year, month - 1, day, 23, 59, 59);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffMs = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      status: "overdue",
      diffDays,
      labelRo: `Depășit (${Math.abs(diffDays)} zile)`,
      labelEn: `Overdue (${Math.abs(diffDays)} days)`,
    };
  }
  if (diffDays === 0) {
    return {
      status: "due_today",
      diffDays: 0,
      labelRo: "Scadență astăzi",
      labelEn: "Due today",
    };
  }
  if (diffDays <= 7) {
    return {
      status: "upcoming_7_days",
      diffDays,
      labelRo: `În ${diffDays} zile`,
      labelEn: `In ${diffDays} days`,
    };
  }

  return {
    status: "future",
    diffDays,
    labelRo: `În ${diffDays} zile`,
    labelEn: `In ${diffDays} days`,
  };
}

export interface ChangeWarning {
  type:
    | "effective_date_passed"
    | "approval_without_written"
    | "written_without_document"
    | "unresolved_request"
    | "followup_overdue"
    | "followup_upcoming";
  messageRo: string;
  messageEn: string;
  severity: "warning" | "alert" | "info";
}

export function getChangeWarnings(record: PolicyChangeRecord): ChangeWarning[] {
  const warnings: ChangeWarning[] = [];

  // Desired effective date passed without confirmation
  if (
    record.desiredEffectiveDate &&
    record.status !== "written_confirmation_recorded" &&
    record.status !== "updated_policy_received" &&
    record.status !== "closed" &&
    record.status !== "withdrawn" &&
    record.status !== "declined"
  ) {
    const parts = record.desiredEffectiveDate.split("-").map(Number);
    if (parts.length === 3 && !parts.some(isNaN)) {
      const effDate = new Date(parts[0], parts[1] - 1, parts[2], 23, 59, 59);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (effDate.getTime() < today.getTime()) {
        warnings.push({
          type: "effective_date_passed",
          messageRo: `Data dorită de intrare în vigoare (${record.desiredEffectiveDate}) a trecut, dar nu a fost înregistrată o confirmare scrisă.`,
          messageEn: `Desired effective date (${record.desiredEffectiveDate}) has passed without recorded written confirmation.`,
          severity: "warning",
        });
      }
    }
  }

  // Approval reported without written confirmation
  if (record.status === "approval_reported") {
    warnings.push({
      type: "approval_without_written",
      messageRo: "Aprobarea a fost semnalată neoficial, însă nu a fost documentată o confirmare scrisă de la asigurator.",
      messageEn: "Approval recorded by user; written confirmation has not been documented in this tracker.",
      severity: "alert",
    });
  }

  // Written confirmation recorded but no updated policy document
  if (
    record.status === "written_confirmation_recorded" &&
    !record.confirmationDetails?.hasUpdatedDocumentReceived
  ) {
    warnings.push({
      type: "written_without_document",
      messageRo: "Confirmarea scrisă este notată, dar actul adițional / polița modificată oficială nu a fost încă înregistrată ca primită.",
      messageEn: "Written confirmation recorded, but updated policy schedule/endorsement has not been recorded as received.",
      severity: "info",
    });
  }

  // Unresolved request
  if (
    record.status === "awaiting_response" ||
    record.status === "info_requested" ||
    record.status === "requires_clarification"
  ) {
    warnings.push({
      type: "unresolved_request",
      messageRo: "Cererea este în curs de soluționare și necesită urmărirea răspunsului.",
      messageEn: "Change request is pending resolution.",
      severity: "info",
    });
  }

  // Follow-up checks
  if (record.nextFollowUpDate) {
    const fu = getFollowUpStatus(record.nextFollowUpDate);
    if (fu.status === "overdue") {
      warnings.push({
        type: "followup_overdue",
        messageRo: `Data de follow-up (${record.nextFollowUpDate}) este depășită cu ${Math.abs(fu.diffDays || 0)} zile.`,
        messageEn: `Follow-up date (${record.nextFollowUpDate}) is overdue by ${Math.abs(fu.diffDays || 0)} days.`,
        severity: "warning",
      });
    } else if (fu.status === "due_today" || fu.status === "upcoming_7_days") {
      warnings.push({
        type: "followup_upcoming",
        messageRo: `Următorul contact este programat în curând (${record.nextFollowUpDate}).`,
        messageEn: `Next follow-up is scheduled soon (${record.nextFollowUpDate}).`,
        severity: "info",
      });
    }
  }

  return warnings;
}

export interface ChangeTrackerSummaryStats {
  totalRequests: number;
  awaitingResponseCount: number;
  infoRequestedCount: number;
  approvalReportedCount: number;
  writtenConfirmationCount: number;
  updatedDocumentCount: number;
  overdueFollowUpsCount: number;
  upcomingFollowUpsCount: number;
  declinedOrWithdrawnCount: number;
}

export function generateChangeSummaryStats(records: PolicyChangeRecord[]): ChangeTrackerSummaryStats {
  let awaitingResponseCount = 0;
  let infoRequestedCount = 0;
  let approvalReportedCount = 0;
  let writtenConfirmationCount = 0;
  let updatedDocumentCount = 0;
  let overdueFollowUpsCount = 0;
  let upcomingFollowUpsCount = 0;
  let declinedOrWithdrawnCount = 0;

  for (const r of records) {
    if (r.status === "awaiting_response" || r.status === "submitted") awaitingResponseCount++;
    if (r.status === "info_requested") infoRequestedCount++;
    if (r.status === "approval_reported") approvalReportedCount++;
    if (r.status === "written_confirmation_recorded") writtenConfirmationCount++;
    if (r.status === "updated_policy_received") updatedDocumentCount++;
    if (r.status === "declined" || r.status === "withdrawn") declinedOrWithdrawnCount++;

    if (r.nextFollowUpDate) {
      const fu = getFollowUpStatus(r.nextFollowUpDate);
      if (fu.status === "overdue") overdueFollowUpsCount++;
      if (fu.status === "due_today" || fu.status === "upcoming_7_days") upcomingFollowUpsCount++;
    }
  }

  return {
    totalRequests: records.length,
    awaitingResponseCount,
    infoRequestedCount,
    approvalReportedCount,
    writtenConfirmationCount,
    updatedDocumentCount,
    overdueFollowUpsCount,
    upcomingFollowUpsCount,
    declinedOrWithdrawnCount,
  };
}

export function validateImportedPolicyChangeData(json: unknown): {
  valid: boolean;
  data?: PolicyChangeExportData;
  error?: string;
} {
  if (!json || typeof json !== "object") {
    return { valid: false, error: "Fișierul JSON este gol sau invalid." };
  }

  const obj = json as Record<string, unknown>;

  if (obj.schemaVersion !== "1.0") {
    return { valid: false, error: "Versiunea schemei JSON nu este suportată (este necesară 1.0)." };
  }

  if (!Array.isArray(obj.records)) {
    return { valid: false, error: "Structura 'records' lipsește sau nu este o listă." };
  }

  if (obj.records.length > 200) {
    return { valid: false, error: "Numărul de înregistrări depășește limita permisă de siguranță (200)." };
  }

  const validChangeTypes: PolicyChangeType[] = [
    "address_property",
    "add_remove_asset",
    "coverage_limit_value",
    "deductible_options",
    "add_remove_person",
    "business_activity",
    "policy_correction",
    "endorsement_request",
    "other",
  ];

  const validStatuses: PolicyChangeStatus[] = [
    "draft",
    "ready_to_submit",
    "submitted",
    "awaiting_response",
    "info_requested",
    "info_supplied",
    "approval_reported",
    "written_confirmation_recorded",
    "updated_policy_received",
    "declined",
    "withdrawn",
    "closed",
    "requires_clarification",
  ];

  const validChannels: SubmissionChannel[] = [
    "email",
    "portal",
    "advisor",
    "phone",
    "in_person",
    "other",
  ];

  const validEventTypes: EventType[] = [
    "draft_created",
    "request_submitted",
    "contact_made",
    "response_received",
    "info_requested",
    "info_supplied",
    "approval_reported",
    "written_confirmation",
    "updated_document_received",
    "declined",
    "withdrawn",
    "follow_up_done",
    "other",
  ];

  const sanitizedRecords: PolicyChangeRecord[] = [];

  for (let i = 0; i < obj.records.length; i++) {
    const r = obj.records[i] as Record<string, unknown>;
    if (!r || typeof r !== "object") continue;

    if (typeof r.title !== "string" || !r.title.trim()) {
      return { valid: false, error: `Înregistrarea de la indexul ${i} nu are un titlu valid.` };
    }
    if (typeof r.relatedPolicyNickname !== "string" || !r.relatedPolicyNickname.trim()) {
      return { valid: false, error: `Înregistrarea "${r.title}" nu are o poliță asociată.` };
    }
    if (typeof r.description !== "string" || !r.description.trim()) {
      return { valid: false, error: `Înregistrarea "${r.title}" nu are o descriere validă.` };
    }

    const changeType =
      typeof r.changeType === "string" && validChangeTypes.includes(r.changeType as PolicyChangeType)
        ? (r.changeType as PolicyChangeType)
        : "other";

    const status =
      typeof r.status === "string" && validStatuses.includes(r.status as PolicyChangeStatus)
        ? (r.status as PolicyChangeStatus)
        : "draft";

    const submissionChannel =
      typeof r.submissionChannel === "string" && validChannels.includes(r.submissionChannel as SubmissionChannel)
        ? (r.submissionChannel as SubmissionChannel)
        : undefined;

    // Events sanitization
    const rawEvents = Array.isArray(r.events) ? r.events : [];
    const sanitizedEvents: ChangeEvent[] = [];

    for (let j = 0; j < Math.min(rawEvents.length, 100); j++) {
      const ev = rawEvents[j] as Record<string, unknown>;
      if (!ev || typeof ev !== "object") continue;

      const evType =
        typeof ev.eventType === "string" && validEventTypes.includes(ev.eventType as EventType)
          ? (ev.eventType as EventType)
          : "other";

      sanitizedEvents.push({
        id: typeof ev.id === "string" && ev.id.trim() ? ev.id.slice(0, 50) : `ev_${Date.now()}_${j}`,
        date: typeof ev.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(ev.date) ? ev.date : new Date().toISOString().split("T")[0],
        time: typeof ev.time === "string" ? ev.time.slice(0, 10) : undefined,
        eventType: evType,
        title: typeof ev.title === "string" && ev.title.trim() ? ev.title.trim().slice(0, 150) : "Eveniment",
        notes: typeof ev.notes === "string" ? ev.notes.trim().slice(0, 500) : undefined,
        followUpAction: typeof ev.followUpAction === "string" ? ev.followUpAction.trim().slice(0, 200) : undefined,
        followUpDate: typeof ev.followUpDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(ev.followUpDate) ? ev.followUpDate : undefined,
      });
    }

    // Confirmation details
    let confDetails: ConfirmationDetails | undefined = undefined;
    if (r.confirmationDetails && typeof r.confirmationDetails === "object") {
      const cd = r.confirmationDetails as Record<string, unknown>;
      confDetails = {
        confirmationDate: typeof cd.confirmationDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(cd.confirmationDate) ? cd.confirmationDate : undefined,
        confirmationChannel: typeof cd.confirmationChannel === "string" ? cd.confirmationChannel.trim().slice(0, 100) : undefined,
        sourceReferenceTitle: typeof cd.sourceReferenceTitle === "string" ? cd.sourceReferenceTitle.trim().slice(0, 150) : undefined,
        hasUpdatedDocumentReceived: Boolean(cd.hasUpdatedDocumentReceived),
        notes: typeof cd.notes === "string" ? cd.notes.trim().slice(0, 500) : undefined,
      };
    }

    sanitizedRecords.push({
      id: typeof r.id === "string" && r.id.trim() ? r.id.slice(0, 50) : `chg_${Date.now()}_${i}`,
      title: String(r.title).trim().slice(0, 150),
      relatedPolicyNickname: String(r.relatedPolicyNickname).trim().slice(0, 100),
      category: typeof r.category === "string" ? r.category.trim().slice(0, 50) : "General",
      insurer: typeof r.insurer === "string" ? r.insurer.trim().slice(0, 100) : undefined,
      changeType,
      description: String(r.description).trim().slice(0, 1000),
      reason: typeof r.reason === "string" ? r.reason.trim().slice(0, 500) : undefined,
      dateIdentified: typeof r.dateIdentified === "string" && /^\d{4}-\d{2}-\d{2}$/.test(r.dateIdentified) ? r.dateIdentified : undefined,
      desiredEffectiveDate: typeof r.desiredEffectiveDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(r.desiredEffectiveDate) ? r.desiredEffectiveDate : undefined,
      dateSubmitted: typeof r.dateSubmitted === "string" && /^\d{4}-\d{2}-\d{2}$/.test(r.dateSubmitted) ? r.dateSubmitted : undefined,
      submissionChannel,
      status,
      nextFollowUpDate: typeof r.nextFollowUpDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(r.nextFollowUpDate) ? r.nextFollowUpDate : undefined,
      notes: typeof r.notes === "string" ? r.notes.trim().slice(0, 1000) : undefined,
      confirmationDetails: confDetails,
      events: sanitizedEvents,
      createdAt: typeof r.createdAt === "string" ? r.createdAt : new Date().toISOString(),
      updatedAt: typeof r.updatedAt === "string" ? r.updatedAt : new Date().toISOString(),
    });
  }

  return {
    valid: true,
    data: {
      schemaVersion: "1.0",
      exportedAt: typeof obj.exportedAt === "string" ? obj.exportedAt : new Date().toISOString(),
      userNotes: typeof obj.userNotes === "string" ? obj.userNotes.trim().slice(0, 1000) : undefined,
      records: sanitizedRecords,
    },
  };
}

export function generatePolicyChangePdf(exportData: PolicyChangeExportData): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let currentY = 18;

  function ensureSpace(neededHeight: number) {
    if (currentY + neededHeight > pageHeight - 20) {
      doc.addPage();
      currentY = 18;
      drawHeader(true);
    }
  }

  function drawHeader(isContinuation = false) {
    doc.setFillColor(11, 13, 16);
    doc.rect(0, 0, pageWidth, 28, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("CRISTIAN VĂDUVA — INSURANCE ADVISORY", margin, 12);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150, 160, 175);
    doc.text("Registru Modificări Polițe & Urmărire Acte Adiționale", margin, 18);

    doc.setFontSize(8);
    doc.setTextColor(120, 135, 150);
    const dateStr = new Date(exportData.exportedAt || Date.now()).toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    doc.text(`Generat: ${dateStr}${isContinuation ? " (Continuare)" : ""}`, pageWidth - margin, 18, { align: "right" });

    currentY = 34;
  }

  drawHeader(false);

  // Stats Box
  const stats = generateChangeSummaryStats(exportData.records);
  doc.setFillColor(245, 247, 250);
  doc.setDrawColor(220, 225, 230);
  doc.roundedRect(margin, currentY, contentWidth, 24, 2, 2, "FD");

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("SUMAR CERERI DE MODIFICARE POLIȚE", margin + 4, currentY + 7);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(`• Total cereri înregistrate: ${stats.totalRequests}`, margin + 4, currentY + 13);
  doc.text(`• În așteptare răspuns: ${stats.awaitingResponseCount}`, margin + 4, currentY + 18);

  doc.text(`• Confirmări scrise notate: ${stats.writtenConfirmationCount}`, margin + 65, currentY + 13);
  doc.text(`• Acte adiționale primite: ${stats.updatedDocumentCount}`, margin + 65, currentY + 18);

  doc.text(`• Follow-up depășit: ${stats.overdueFollowUpsCount}`, margin + 130, currentY + 13);
  doc.text(`• Aprobări neoficiale (fără act): ${stats.approvalReportedCount}`, margin + 130, currentY + 18);

  currentY += 30;

  // Records list
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("INVENTAR CERERI & ISTORIC EVENIMENTE", margin, currentY);
  currentY += 6;

  for (const record of exportData.records) {
    const changeTypeInfo = CHANGE_TYPE_INFO[record.changeType];
    const statusInfo = STATUS_INFO[record.status];
    const warnings = getChangeWarnings(record);

    const baseHeight = 28 + (record.reason ? 5 : 0) + (warnings.length > 0 ? warnings.length * 5 : 0);
    const eventsHeight = record.events.length * 5;
    const totalRowHeight = baseHeight + eventsHeight;

    ensureSpace(Math.min(totalRowHeight, 80));

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, currentY, contentWidth, totalRowHeight - 2, 1, 1, "FD");

    // Title & Status
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(record.title, margin + 3, currentY + 5);

    doc.setFontSize(7.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.text(`Status: ${statusInfo.labelRo}`, pageWidth - margin - 3, currentY + 5, { align: "right" });

    // Meta details
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text(
      `Poliță: ${record.relatedPolicyNickname} | Tip: ${changeTypeInfo.labelRo} | Asigurator: ${record.insurer || "Nespecificat"}`,
      margin + 3,
      currentY + 10
    );

    // Description
    doc.setTextColor(51, 65, 85);
    doc.setFontSize(7.5);
    doc.text(`Descriere: ${record.description.slice(0, 120)}`, margin + 3, currentY + 15);

    let subY = currentY + 19.5;
    if (record.reason) {
      doc.setTextColor(100, 116, 139);
      doc.text(`Motiv: ${record.reason.slice(0, 110)}`, margin + 3, subY);
      subY += 4.5;
    }

    // Dates & Channels
    doc.setTextColor(71, 85, 105);
    doc.text(
      `Transmis: ${record.dateSubmitted || "Nespecificat"} (${record.submissionChannel ? CHANNEL_LABELS[record.submissionChannel] : "canal n/a"}) | Dată dorită: ${record.desiredEffectiveDate || "N/A"} | Follow-up: ${record.nextFollowUpDate || "N/A"}`,
      margin + 3,
      subY
    );
    subY += 5;

    // Warnings
    if (warnings.length > 0) {
      doc.setTextColor(180, 83, 9);
      doc.setFontSize(7);
      for (const w of warnings) {
        doc.text(`⚠️ ${w.messageRo}`, margin + 3, subY);
        subY += 4.5;
      }
    }

    // Events history snippet
    if (record.events.length > 0) {
      doc.setTextColor(37, 99, 235);
      doc.setFontSize(7);
      doc.text("Cronologie evenimente înregistrate:", margin + 3, subY);
      subY += 4;

      doc.setTextColor(71, 85, 105);
      for (const ev of record.events) {
        doc.text(`  • [${ev.date}] ${ev.title} (${EVENT_TYPE_INFO[ev.eventType]?.labelRo || ev.eventType})`, margin + 3, subY);
        subY += 4;
      }
    }

    currentY += totalRowHeight + 2;
  }

  // Disclaimer and Footer
  ensureSpace(28);
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, currentY, contentWidth, 22, 1, 1, "FD");

  doc.setTextColor(100, 116, 139);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text(
    "NOTĂ LEGALĂ: Modificările și evenimentele înregistrate reprezintă stadii declarate exclusiv de utilizator.",
    margin + 3,
    currentY + 5
  );
  doc.text(
    "Acest instrument nu produce efecte juridice, nu trimite cereri automate și nu garantează că asiguratorul a operat modificarea.",
    margin + 3,
    currentY + 9
  );
  doc.text(
    "Efectele contractuale se produc numai în baza actului adițional sau confirmării scrise emise oficial de către compania de asigurare.",
    margin + 3,
    currentY + 13
  );
  doc.text(
    "Consultanță specializată: Cristian Văduva | Telefon / WhatsApp: 0767 110 439 | Email: contact@cristianvaduva.com",
    margin + 3,
    currentY + 18
  );

  doc.save(`registru-modificari-polite-${new Date().toISOString().split("T")[0]}.pdf`);
}
