import { jsPDF } from "jspdf";

export type TimelineEventCategory =
  | "policy_inception_expiry"
  | "renewal_offer"
  | "renewal_decision"
  | "cancellation_notice"
  | "notice_communication"
  | "policy_amendment"
  | "endorsement_receipt"
  | "premium_payment"
  | "claim_followup"
  | "insurer_adviser_response"
  | "contractual_regulatory_deadline"
  | "other";

export type EventDateType = "confirmed" | "estimated" | "awaiting_confirmation";

export type TimelineEventStatus =
  | "upcoming"
  | "completed"
  | "awaiting_response"
  | "overdue"
  | "cancelled"
  | "requires_clarification";

export type ResponsibleParty =
  | "user"
  | "insurer"
  | "adviser"
  | "broker"
  | "claims_inspector"
  | "third_party"
  | "other";

export type SourceType =
  | "policy_wording"
  | "policy_schedule"
  | "renewal_offer"
  | "written_insurer_comm"
  | "adviser_comm"
  | "payment_record"
  | "legal_regulatory_source"
  | "user_note"
  | "other";

export interface TimelineEvent {
  id: string;
  title: string;
  category: TimelineEventCategory;
  eventDate: string; // YYYY-MM-DD
  eventTime?: string; // HH:MM
  dateType: EventDateType;
  status: TimelineEventStatus;
  completionDate?: string; // YYYY-MM-DD
  responsibleParty: ResponsibleParty;
  relatedOrganization?: string;
  notes?: string;
  sourceType: SourceType;
  sourceTitle?: string;
  sourceIssuer?: string;
  sourceDate?: string;
  sourceExcerpt?: string;
  hasWrittenConfirmation: boolean;
  followUpRequired: boolean;
  followUpDate?: string; // YYYY-MM-DD
  reminderNotes?: string;
  relatedEventId?: string;
  userCalculationRule?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PolicyDeadlineTimelineData {
  schemaVersion: "1.0";
  policyReference: string;
  policyNickname: string;
  insurerName?: string;
  policyCategory?: string;
  generalNotes?: string;
  events: TimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

export const CATEGORY_DEFINITIONS: Record<
  TimelineEventCategory,
  { labelRo: string; labelEn: string; color: string; description: string }
> = {
  policy_inception_expiry: {
    labelRo: "Valabilitate / Expirare Poliță",
    labelEn: "Policy Inception / Expiry",
    color: "blue",
    description: "Data intrării în vigoare sau scadența contractuală a poliței.",
  },
  renewal_offer: {
    labelRo: "Primire Ofertă Reînnoire",
    labelEn: "Renewal Offer Received",
    color: "indigo",
    description: "Data recepționării ofertei de prelungire de la asigurător/broker.",
  },
  renewal_decision: {
    labelRo: "Termen Decizie Reînnoire",
    labelEn: "Renewal Decision Deadline",
    color: "purple",
    description: "Data țintă stabilită de utilizator pentru a decide prelungirea sau schimbarea.",
  },
  cancellation_notice: {
    labelRo: "Notificare Reziliere / Non-reînnoire",
    labelEn: "Cancellation / Non-Renewal Notice",
    color: "rose",
    description: "Data transmiterii sau înregistrării cererii de denunțare / non-reînnoire.",
  },
  notice_communication: {
    labelRo: "Comunicare Notificare Oficială",
    labelEn: "Notice Sent / Received",
    color: "amber",
    description: "Data transmiterii sau confirmării primirii unei notificări formale.",
  },
  policy_amendment: {
    labelRo: "Cerere Modificare / Act Adițional",
    labelEn: "Policy Amendment Request",
    color: "cyan",
    description: "Data solicitării unei schimbări de date, sume asigurate sau riscuri.",
  },
  endorsement_receipt: {
    labelRo: "Primire Supliment / Endorsement",
    labelEn: "Endorsement / Schedule Received",
    color: "emerald",
    description: "Data primirii documentului rectificativ oficial emis de asigurător.",
  },
  premium_payment: {
    labelRo: "Scadență / Plată Primă",
    labelEn: "Premium Payment Date",
    color: "teal",
    description: "Data scadenței ratei sau data consemnării plății primelor de asigurare.",
  },
  claim_followup: {
    labelRo: "Follow-up Dosar Daună",
    labelEn: "Claim Follow-up",
    color: "orange",
    description: "Termene de completare documente, inspecții sau comunicări în dosar.",
  },
  insurer_adviser_response: {
    labelRo: "Termen Răspuns Asigurător / Broker",
    labelEn: "Insurer / Adviser Response Date",
    color: "sky",
    description: "Data până la care a fost promis sau solicitat un răspuns oficial.",
  },
  contractual_regulatory_deadline: {
    labelRo: "Termen Contractual / Legal Verificat",
    labelEn: "Verified Contractual / Legal Deadline",
    color: "violet",
    description: "Termen specific identificat din textul poliței sau reglementări oficiale.",
  },
  other: {
    labelRo: "Alt Reper Personalizat",
    labelEn: "Other Custom Milestone",
    color: "zinc",
    description: "Orice alt eveniment sau termen relevant definit de utilizator.",
  },
};

export const STATUS_DEFINITIONS: Record<
  TimelineEventStatus,
  { labelRo: string; labelEn: string; badgeClass: string }
> = {
  upcoming: {
    labelRo: "În derulare / Viitor",
    labelEn: "Upcoming / Open",
    badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  },
  completed: {
    labelRo: "Finalizat",
    labelEn: "Completed",
    badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  },
  awaiting_response: {
    labelRo: "În așteptare răspuns",
    labelEn: "Awaiting Response",
    badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  },
  overdue: {
    labelRo: "Termen depășit (țintă utilizator)",
    labelEn: "Overdue (user target)",
    badgeClass: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  },
  cancelled: {
    labelRo: "Anulat / Fără obiect",
    labelEn: "Cancelled",
    badgeClass: "bg-zinc-500/10 text-zinc-400 border-zinc-500/30",
  },
  requires_clarification: {
    labelRo: "Necesită clarificare",
    labelEn: "Requires Clarification",
    badgeClass: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  },
};

export const DATE_TYPE_DEFINITIONS: Record<
  EventDateType,
  { labelRo: string; labelEn: string; badgeClass: string }
> = {
  confirmed: {
    labelRo: "Dată confirmată",
    labelEn: "Confirmed date",
    badgeClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  estimated: {
    labelRo: "Dată estimată",
    labelEn: "Estimated date",
    badgeClass: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  awaiting_confirmation: {
    labelRo: "Așteaptă confirmare",
    labelEn: "Awaiting confirmation",
    badgeClass: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
};

export const SOURCE_TYPE_DEFINITIONS: Record<
  SourceType,
  { labelRo: string; labelEn: string }
> = {
  policy_wording: {
    labelRo: "Condiții de asigurare (Wording)",
    labelEn: "Policy Wording",
  },
  policy_schedule: {
    labelRo: "Poliță / Tablou de bord (Schedule)",
    labelEn: "Policy Schedule",
  },
  renewal_offer: {
    labelRo: "Ofertă de reînnoire primită",
    labelEn: "Renewal Offer",
  },
  written_insurer_comm: {
    labelRo: "Comunicare scrisă asigurător (Email/Adresă)",
    labelEn: "Written Insurer Communication",
  },
  adviser_comm: {
    labelRo: "Comunicare consultant / broker",
    labelEn: "Adviser Communication",
  },
  payment_record: {
    labelRo: "Dovadă / Extras de cont",
    labelEn: "Payment Record",
  },
  legal_regulatory_source: {
    labelRo: "Sursă legală / reglementare (introdusă de utilizator)",
    labelEn: "Official Legal / Regulatory Source",
  },
  user_note: {
    labelRo: "Notă / Estimare proprie fără sursă",
    labelEn: "User Note / Unverified",
  },
  other: {
    labelRo: "Altă sursă",
    labelEn: "Other",
  },
};

export const RESPONSIBLE_PARTY_DEFINITIONS: Record<
  ResponsibleParty,
  { labelRo: string; labelEn: string }
> = {
  user: { labelRo: "Asigurat / Utilizator", labelEn: "Policyholder / User" },
  insurer: { labelRo: "Asigurător (Companie)", labelEn: "Insurer" },
  adviser: { labelRo: "Consultant / Broker", labelEn: "Adviser / Broker" },
  broker: { labelRo: "Broker Asigurări", labelEn: "Insurance Broker" },
  claims_inspector: { labelRo: "Inspector Daune", labelEn: "Claims Inspector" },
  third_party: { labelRo: "Terț / Service / Expert", labelEn: "Third Party" },
  other: { labelRo: "Alt responsabil", labelEn: "Other" },
};

export interface EventTemplate {
  title: string;
  category: TimelineEventCategory;
  responsibleParty: ResponsibleParty;
  sourceType: SourceType;
  dateType: EventDateType;
  notes: string;
  hasWrittenConfirmation: boolean;
  followUpRequired: boolean;
}

export const EVENT_TEMPLATES: EventTemplate[] = [
  {
    title: "Expirare Contractuală Poliță",
    category: "policy_inception_expiry",
    responsibleParty: "user",
    sourceType: "policy_schedule",
    dateType: "confirmed",
    notes: "Data expirării menționată pe polița de asigurare curentă.",
    hasWrittenConfirmation: true,
    followUpRequired: true,
  },
  {
    title: "Primire Ofertă Reînnoire de la Asigurător",
    category: "renewal_offer",
    responsibleParty: "insurer",
    sourceType: "renewal_offer",
    dateType: "confirmed",
    notes: "Data la care asigurătorul sau brokerul a transmis propunerea de prelungire.",
    hasWrittenConfirmation: true,
    followUpRequired: true,
  },
  {
    title: "Termen Țintă Decizie Reînnoire / Schimbare",
    category: "renewal_decision",
    responsibleParty: "user",
    sourceType: "user_note",
    dateType: "estimated",
    notes: "Data limită până la care utilizatorul dorește să finalizeze analiza ofertelor.",
    hasWrittenConfirmation: false,
    followUpRequired: false,
  },
  {
    title: "Notificare Reziliere / Non-reînnoire Transmisă",
    category: "cancellation_notice",
    responsibleParty: "user",
    sourceType: "written_insurer_comm",
    dateType: "confirmed",
    notes: "Data la care s-a expediat notificarea scrisă de denunțare sau refuz al prelungirii.",
    hasWrittenConfirmation: true,
    followUpRequired: true,
  },
  {
    title: "Solicitare Modificare Poliță (Addendum)",
    category: "policy_amendment",
    responsibleParty: "user",
    sourceType: "written_insurer_comm",
    dateType: "confirmed",
    notes: "Data solicitării unei modificări (adresă, vehicul, sumă asigurată).",
    hasWrittenConfirmation: false,
    followUpRequired: true,
  },
  {
    title: "Primire Act Adițional / Endorsement Semnat",
    category: "endorsement_receipt",
    responsibleParty: "insurer",
    sourceType: "policy_schedule",
    dateType: "confirmed",
    notes: "Data recepționării actului adițional emis și semnat de asigurător.",
    hasWrittenConfirmation: true,
    followUpRequired: false,
  },
  {
    title: "Scadență Rată Primă de Asigurare",
    category: "premium_payment",
    responsibleParty: "user",
    sourceType: "policy_schedule",
    dateType: "confirmed",
    notes: "Data scadenței conform graficului de plată din poliță.",
    hasWrittenConfirmation: true,
    followUpRequired: false,
  },
  {
    title: "Follow-up Completare Documente Dosar Daună",
    category: "claim_followup",
    responsibleParty: "user",
    sourceType: "written_insurer_comm",
    dateType: "awaiting_confirmation",
    notes: "Termen limită convenit pentru transmiterea documentelor suplimentare.",
    hasWrittenConfirmation: false,
    followUpRequired: true,
  },
];

export const INITIAL_TIMELINE_DATA: PolicyDeadlineTimelineData = {
  schemaVersion: "1.0",
  policyReference: "POL-EXEMPLU-2026",
  policyNickname: "CASCO / Locuință Exemplu",
  insurerName: "Asigurătorul Meu",
  policyCategory: "Auto / Bunuri",
  generalNotes: "Timeline orientativ pentru monitorizarea termenelor contractuale și a comunicărilor.",
  events: [
    {
      id: "ev-init-1",
      title: "Data Expirării Poliței Curente",
      category: "policy_inception_expiry",
      eventDate: "2026-11-15",
      dateType: "confirmed",
      status: "upcoming",
      responsibleParty: "user",
      relatedOrganization: "Asigurătorul Meu",
      sourceType: "policy_schedule",
      sourceTitle: "Poliță CASCO Seria AB Nr. 123456",
      sourceIssuer: "Asigurător",
      sourceDate: "2025-11-15",
      hasWrittenConfirmation: true,
      followUpRequired: true,
      followUpDate: "2026-10-25",
      reminderNotes: "Analizează oferta cu 20 de zile înainte de expirare.",
      notes: "Scadența finală a contractului în vigoare.",
      createdAt: "2026-10-09T10:00:00Z",
      updatedAt: "2026-10-09T10:00:00Z",
    },
    {
      id: "ev-init-2",
      title: "Primire Propunere Reînnoire",
      category: "renewal_offer",
      eventDate: "2026-10-20",
      dateType: "estimated",
      status: "upcoming",
      responsibleParty: "insurer",
      relatedOrganization: "Broker de Asigurare",
      sourceType: "adviser_comm",
      sourceTitle: "Email preliminar consilier",
      hasWrittenConfirmation: false,
      followUpRequired: true,
      followUpDate: "2026-10-22",
      reminderNotes: "Contactează brokerul dacă oferta nu sosește până la data menționată.",
      notes: "Așteptăm oferta de la broker conform discuției inițiale.",
      createdAt: "2026-10-09T10:00:00Z",
      updatedAt: "2026-10-09T10:00:00Z",
    },
  ],
  createdAt: "2026-10-09T10:00:00Z",
  updatedAt: "2026-10-09T10:00:00Z",
};

/**
 * Deterministic date parser that prevents UTC day shifts.
 */
export function parseLocalDate(dateStr: string): Date | null {
  if (!dateStr || typeof dateStr !== "string") return null;
  const parts = dateStr.trim().split("-");
  if (parts.length !== 3) return null;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  const d = new Date(year, month, day);
  return isNaN(d.getTime()) ? null : d;
}

export function formatLocalDateRo(dateStr?: string): string {
  if (!dateStr) return "Nespecificată";
  const d = parseLocalDate(dateStr);
  if (!d) return dateStr;
  return d.toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function isDatePast(dateStr?: string): boolean {
  if (!dateStr) return false;
  const d = parseLocalDate(dateStr);
  if (!d) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d.getTime() < today.getTime();
}

/**
 * Evaluates clarification warnings for an event.
 */
export function getEventClarifications(event: TimelineEvent): string[] {
  const issues: string[] = [];

  // 1. Missing or unparseable event date
  if (!event.eventDate || !parseLocalDate(event.eventDate)) {
    issues.push("Dată eveniment lipsă sau în format invalid");
  }

  // 2. Completed status without completion date
  if (event.status === "completed" && !event.completionDate) {
    issues.push("Marcat 'Finalizat' fără o dată efectivă de finalizare consemnată");
  }

  // 3. Follow-up required without follow-up date
  if (event.followUpRequired && !event.followUpDate) {
    issues.push("Follow-up activat fără dată limită stabilită");
  }

  // 4. Cancellation or non-renewal notice lacking source or confirmation
  if (
    event.category === "cancellation_notice" &&
    (!event.hasWrittenConfirmation || event.sourceType === "user_note")
  ) {
    issues.push("Notificare de reziliere fără confirmare scrisă sau sursă verificată (de documentat)");
  }

  // 5. Expiry date passed warning
  if (event.category === "policy_inception_expiry" && isDatePast(event.eventDate)) {
    issues.push("Data expirării a trecut — verificați statutul activ al poliței cu asigurătorul");
  }

  return issues;
}

/**
 * Computes the effective operational status based on user target dates and completion.
 */
export function computeEffectiveStatus(event: TimelineEvent): TimelineEventStatus {
  if (event.status === "completed" || event.status === "cancelled") {
    return event.status;
  }

  // If follow-up date exists and is in the past
  if (event.followUpRequired && event.followUpDate && isDatePast(event.followUpDate)) {
    return "overdue";
  }

  // If event target date itself is in the past and still pending
  if (isDatePast(event.eventDate) && event.status === "upcoming") {
    return "overdue";
  }

  if (getEventClarifications(event).length > 0 && event.status !== "awaiting_response") {
    return "requires_clarification";
  }

  return event.status;
}

export interface TimelineSummaryStats {
  totalEvents: number;
  upcomingCount: number;
  overdueCount: number;
  awaitingConfirmationCount: number;
  awaitingResponseCount: number;
  completedCount: number;
  clarificationsCount: number;
  noSourceCount: number;
  expiryPassedPrompt: boolean;
}

export function generateTimelineSummaryStats(
  events: TimelineEvent[]
): TimelineSummaryStats {
  let upcomingCount = 0;
  let overdueCount = 0;
  let awaitingConfirmationCount = 0;
  let awaitingResponseCount = 0;
  let completedCount = 0;
  let clarificationsCount = 0;
  let noSourceCount = 0;
  let expiryPassedPrompt = false;

  for (const ev of events) {
    const effStatus = computeEffectiveStatus(ev);

    if (ev.status === "completed") completedCount++;
    else if (effStatus === "overdue") overdueCount++;
    else if (ev.status === "awaiting_response") awaitingResponseCount++;
    else upcomingCount++;

    if (ev.dateType === "awaiting_confirmation" || !ev.hasWrittenConfirmation) {
      awaitingConfirmationCount++;
    }

    if (getEventClarifications(ev).length > 0) {
      clarificationsCount++;
    }

    if (ev.sourceType === "user_note" || !ev.sourceTitle) {
      noSourceCount++;
    }

    if (ev.category === "policy_inception_expiry" && isDatePast(ev.eventDate)) {
      expiryPassedPrompt = true;
    }
  }

  return {
    totalEvents: events.length,
    upcomingCount,
    overdueCount,
    awaitingConfirmationCount,
    awaitingResponseCount,
    completedCount,
    clarificationsCount,
    noSourceCount,
    expiryPassedPrompt,
  };
}

/**
 * Validates imported JSON data strictly.
 */
export function validateImportedTimelineData(
  jsonStr: string
): { success: true; data: PolicyDeadlineTimelineData } | { success: false; error: string } {
  try {
    const parsed = JSON.parse(jsonStr);
    if (!parsed || typeof parsed !== "object") {
      return { success: false, error: "Fișierul JSON nu conține un obiect valid." };
    }

    if (parsed.schemaVersion !== "1.0") {
      return {
        success: false,
        error: "Versiunea schemei nu este compatibilă (trebuie să fie 1.0).",
      };
    }

    if (typeof parsed.policyReference !== "string" || !parsed.policyReference.trim()) {
      return { success: false, error: "Lipsește referința poliței." };
    }

    if (!Array.isArray(parsed.events)) {
      return { success: false, error: "Lista de evenimente este invalidă (trebuie să fie un tablou)." };
    }

    if (parsed.events.length > 200) {
      return { success: false, error: "Numărul de evenimente depășește limita permisă de 200." };
    }

    const validatedEvents: TimelineEvent[] = [];

    for (let i = 0; i < parsed.events.length; i++) {
      const ev = parsed.events[i];
      if (!ev || typeof ev !== "object") {
        return { success: false, error: `Evenimentul de la indexul ${i} este invalid.` };
      }

      if (!ev.id || typeof ev.id !== "string") {
        ev.id = `ev-imp-${Date.now()}-${i}`;
      }

      if (!ev.title || typeof ev.title !== "string" || ev.title.length > 250) {
        return { success: false, error: `Titlul evenimentului ${i + 1} este invalid sau prea lung.` };
      }

      if (!CATEGORY_DEFINITIONS[ev.category as TimelineEventCategory]) {
        ev.category = "other";
      }

      if (!ev.eventDate || typeof ev.eventDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(ev.eventDate)) {
        return {
          success: false,
          error: `Data evenimentului '${ev.title}' este invalidă (format cerut: YYYY-MM-DD).`,
        };
      }

      const validDateTypes: EventDateType[] = ["confirmed", "estimated", "awaiting_confirmation"];
      if (!validDateTypes.includes(ev.dateType)) {
        ev.dateType = "estimated";
      }

      const validStatuses: TimelineEventStatus[] = [
        "upcoming",
        "completed",
        "awaiting_response",
        "overdue",
        "cancelled",
        "requires_clarification",
      ];
      if (!validStatuses.includes(ev.status)) {
        ev.status = "upcoming";
      }

      const validResponsible: ResponsibleParty[] = [
        "user",
        "insurer",
        "adviser",
        "broker",
        "claims_inspector",
        "third_party",
        "other",
      ];
      if (!validResponsible.includes(ev.responsibleParty)) {
        ev.responsibleParty = "user";
      }

      const validSourceTypes: SourceType[] = [
        "policy_wording",
        "policy_schedule",
        "renewal_offer",
        "written_insurer_comm",
        "adviser_comm",
        "payment_record",
        "legal_regulatory_source",
        "user_note",
        "other",
      ];
      if (!validSourceTypes.includes(ev.sourceType)) {
        ev.sourceType = "user_note";
      }

      validatedEvents.push({
        id: String(ev.id).slice(0, 50),
        title: String(ev.title).slice(0, 250),
        category: ev.category,
        eventDate: ev.eventDate,
        eventTime: ev.eventTime ? String(ev.eventTime).slice(0, 10) : undefined,
        dateType: ev.dateType,
        status: ev.status,
        completionDate: ev.completionDate ? String(ev.completionDate).slice(0, 10) : undefined,
        responsibleParty: ev.responsibleParty,
        relatedOrganization: ev.relatedOrganization ? String(ev.relatedOrganization).slice(0, 100) : undefined,
        notes: ev.notes ? String(ev.notes).slice(0, 1000) : undefined,
        sourceType: ev.sourceType,
        sourceTitle: ev.sourceTitle ? String(ev.sourceTitle).slice(0, 200) : undefined,
        sourceIssuer: ev.sourceIssuer ? String(ev.sourceIssuer).slice(0, 100) : undefined,
        sourceDate: ev.sourceDate ? String(ev.sourceDate).slice(0, 10) : undefined,
        sourceExcerpt: ev.sourceExcerpt ? String(ev.sourceExcerpt).slice(0, 500) : undefined,
        hasWrittenConfirmation: Boolean(ev.hasWrittenConfirmation),
        followUpRequired: Boolean(ev.followUpRequired),
        followUpDate: ev.followUpDate ? String(ev.followUpDate).slice(0, 10) : undefined,
        reminderNotes: ev.reminderNotes ? String(ev.reminderNotes).slice(0, 500) : undefined,
        relatedEventId: ev.relatedEventId ? String(ev.relatedEventId).slice(0, 50) : undefined,
        userCalculationRule: ev.userCalculationRule ? String(ev.userCalculationRule).slice(0, 300) : undefined,
        createdAt: ev.createdAt || new Date().toISOString(),
        updatedAt: ev.updatedAt || new Date().toISOString(),
      });
    }

    const cleanData: PolicyDeadlineTimelineData = {
      schemaVersion: "1.0",
      policyReference: String(parsed.policyReference).slice(0, 100),
      policyNickname: String(parsed.policyNickname || parsed.policyReference).slice(0, 100),
      insurerName: parsed.insurerName ? String(parsed.insurerName).slice(0, 100) : undefined,
      policyCategory: parsed.policyCategory ? String(parsed.policyCategory).slice(0, 100) : undefined,
      generalNotes: parsed.generalNotes ? String(parsed.generalNotes).slice(0, 2000) : undefined,
      events: validatedEvents,
      createdAt: parsed.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return { success: true, data: cleanData };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Fișier JSON corupt";
    return { success: false, error: `Eroare la parsarea fișierului: ${message}` };
  }
}

/**
 * Produces a downloadable PDF report of the policy timeline.
 */
export function generatePolicyDeadlinesPdf(data: PolicyDeadlineTimelineData): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let currentY = margin;

  const ensureSpace = (neededHeight: number) => {
    if (currentY + neededHeight > pageHeight - margin - 15) {
      doc.addPage();
      currentY = margin;
      drawHeaderSmall();
    }
  };

  const drawHeaderSmall = () => {
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, pageWidth, 12, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("CRISTIAN VĂDUVA — INSURANCE ADVISORY | TIMELINE TERMENE POLIȚĂ", margin, 8);
    doc.setFont("helvetica", "normal");
    doc.text(`Ref: ${data.policyReference}`, pageWidth - margin - 40, 8);
    currentY = margin + 4;
  };

  // Main Header Banner
  doc.setFillColor(11, 13, 16); // #0b0d10
  doc.rect(0, 0, pageWidth, 32, "F");

  // Accent line
  doc.setFillColor(37, 99, 235); // blue-600
  doc.rect(0, 32, pageWidth, 1.5, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("REGISTRU TERMENE & SCADENȚE POLIȚĂ", margin, 13);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    `Poliță: ${data.policyNickname || data.policyReference} | Asigurător: ${data.insurerName || "Nespecificat"}`,
    margin,
    19
  );
  doc.text(
    `Generat la: ${new Date().toLocaleDateString("ro-RO")} ${new Date().toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" })} | Document de uz personal`,
    margin,
    25
  );

  currentY = 40;

  // Stats Box
  const stats = generateTimelineSummaryStats(data.events);

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, currentY, contentWidth, 20, 2, 2, "FD");

  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("REZUMAT OPERAȚIONAL TIMELINE", margin + 4, currentY + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);

  const colWidth = contentWidth / 4;
  doc.text(`Total repere: ${stats.totalEvents}`, margin + 4, currentY + 12);
  doc.text(`Viitoare / Active: ${stats.upcomingCount}`, margin + 4 + colWidth, currentY + 12);
  doc.text(`Finalizate: ${stats.completedCount}`, margin + 4 + colWidth * 2, currentY + 12);
  doc.text(`Scadențe depășite: ${stats.overdueCount}`, margin + 4 + colWidth * 3, currentY + 12);

  doc.text(`Așteaptă confirmare: ${stats.awaitingConfirmationCount}`, margin + 4, currentY + 16.5);
  doc.text(`Clarificări cerute: ${stats.clarificationsCount}`, margin + 4 + colWidth, currentY + 16.5);
  doc.text(`Fără sursă probantă: ${stats.noSourceCount}`, margin + 4 + colWidth * 2, currentY + 16.5);

  currentY += 26;

  // General Notes if present
  if (data.generalNotes) {
    ensureSpace(16);
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, currentY, contentWidth, 12, 1, 1, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text("Note generale:", margin + 3, currentY + 4.5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(71, 85, 105);
    doc.text(doc.splitTextToSize(data.generalNotes, contentWidth - 10)[0], margin + 3, currentY + 8.5);

    currentY += 16;
  }

  // Sorted Events: Chronological order
  const sortedEvents = [...data.events].sort((a, b) => {
    return (a.eventDate || "").localeCompare(b.eventDate || "");
  });

  // Section: Chronological Events
  ensureSpace(16);
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("CRONOLOGIA EVENIMENTELOR & TERMENELOR", margin, currentY);
  currentY += 6;

  if (sortedEvents.length === 0) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text("Nu au fost introduse evenimente în această cronologie.", margin, currentY + 4);
    currentY += 10;
  } else {
    for (let idx = 0; idx < sortedEvents.length; idx++) {
      const ev = sortedEvents[idx];
      const effStatus = computeEffectiveStatus(ev);
      const catInfo = CATEGORY_DEFINITIONS[ev.category] || CATEGORY_DEFINITIONS.other;
      const statusInfo = STATUS_DEFINITIONS[effStatus] || STATUS_DEFINITIONS.upcoming;
      const dateTypeInfo = DATE_TYPE_DEFINITIONS[ev.dateType] || DATE_TYPE_DEFINITIONS.estimated;
      const clarifications = getEventClarifications(ev);

      // Estimate card height
      let cardHeight = 24;
      if (ev.notes) cardHeight += 4;
      if (ev.sourceTitle) cardHeight += 4;
      if (clarifications.length > 0) cardHeight += clarifications.length * 3.5 + 2;

      ensureSpace(cardHeight + 4);

      // Card Box
      doc.setFillColor(255, 255, 255);
      if (effStatus === "overdue") {
        doc.setDrawColor(244, 63, 94); // rose-500
      } else if (ev.status === "completed") {
        doc.setDrawColor(16, 185, 129); // emerald-500
      } else {
        doc.setDrawColor(226, 232, 240); // slate-200
      }
      doc.roundedRect(margin, currentY, contentWidth, cardHeight, 1.5, 1.5, "FD");

      // Left bar indicator
      if (effStatus === "overdue") {
        doc.setFillColor(244, 63, 94);
      } else if (ev.status === "completed") {
        doc.setFillColor(16, 185, 129);
      } else {
        doc.setFillColor(37, 99, 235);
      }
      doc.rect(margin, currentY, 2.5, cardHeight, "F");

      // Event Date & Title
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      const dateHeader = `${formatLocalDateRo(ev.eventDate)} ${ev.eventTime ? `(${ev.eventTime})` : ""}`;
      doc.text(`${dateHeader} — ${ev.title}`, margin + 5, currentY + 5);

      // Category & Status pill text
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(71, 85, 105);
      doc.text(
        `Categorie: ${catInfo.labelRo} | Status: ${statusInfo.labelRo} | Tip dată: ${dateTypeInfo.labelRo}`,
        margin + 5,
        currentY + 9.5
      );

      // Responsibility & Organization
      const respInfo = RESPONSIBLE_PARTY_DEFINITIONS[ev.responsibleParty]?.labelRo || ev.responsibleParty;
      doc.text(
        `Responsabil: ${respInfo} ${ev.relatedOrganization ? `(${ev.relatedOrganization})` : ""} | Confirmat scris: ${ev.hasWrittenConfirmation ? "DA" : "NU"}`,
        margin + 5,
        currentY + 13.5
      );

      // Follow-up info
      let subY = currentY + 17.5;
      if (ev.followUpRequired) {
        doc.setTextColor(217, 119, 6);
        doc.setFontSize(7);
        doc.text(
          `Follow-up țintă: ${formatLocalDateRo(ev.followUpDate)} ${ev.reminderNotes ? `— ${ev.reminderNotes.slice(0, 70)}` : ""}`,
          margin + 5,
          subY
        );
        subY += 4;
      }

      // Source info
      if (ev.sourceTitle) {
        doc.setTextColor(100, 116, 139);
        doc.setFontSize(6.5);
        doc.text(
          `Sursă: ${SOURCE_TYPE_DEFINITIONS[ev.sourceType]?.labelRo || ev.sourceType} — ${ev.sourceTitle.slice(0, 80)}`,
          margin + 5,
          subY
        );
        subY += 4;
      }

      // Notes
      if (ev.notes) {
        doc.setTextColor(100, 116, 139);
        doc.setFontSize(6.5);
        doc.text(`Note: ${ev.notes.slice(0, 100)}`, margin + 5, subY);
        subY += 4;
      }

      // Clarification alerts
      if (clarifications.length > 0) {
        doc.setTextColor(225, 29, 72);
        doc.setFontSize(6.5);
        for (const cl of clarifications) {
          doc.text(`! ${cl}`, margin + 5, subY);
          subY += 3.5;
        }
      }

      currentY += cardHeight + 3.5;
    }
  }

  // Legal Disclaimer Box
  ensureSpace(28);
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, currentY, contentWidth, 22, 1, 1, "FD");

  doc.setTextColor(100, 116, 139);
  doc.setFontSize(6.5);
  doc.setFont("helvetica", "normal");
  doc.text(
    "NOTĂ ȘI PRECIZĂRI METODOLOGICE: Acest registru este un instrument strict organizatoric și de evidență personală.",
    margin + 3,
    currentY + 4.5
  );
  doc.text(
    "Aplicația NU determină valabilitatea legală a notificărilor, perioadele legale de preaviz, termenul de grație sau continuitatea acoperirii.",
    margin + 3,
    currentY + 8.5
  );
  doc.text(
    "O dată de expirare sau scadență depășită consemnată aici nu constituie probă juridică a încetării sau reînnoirii poliței.",
    margin + 3,
    currentY + 12.5
  );
  doc.text(
    "Pentru verificarea statutului juridic al contractului de asigurare, consultați exclusiv asigurătorul emitent sau un consultant autorizat.",
    margin + 3,
    currentY + 16.5
  );

  const cleanRef = (data.policyReference || "polita").toLowerCase().replace(/[^a-z0-9]/g, "-");
  doc.save(`termene-polita-${cleanRef}-${new Date().toISOString().split("T")[0]}.pdf`);
}
