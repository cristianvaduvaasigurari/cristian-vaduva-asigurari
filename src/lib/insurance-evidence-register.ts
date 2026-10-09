import { jsPDF } from "jspdf";

export type SourceType =
  | "policy_wording"
  | "policy_schedule"
  | "renewal_offer"
  | "insurer_communication"
  | "broker_clarification"
  | "asset_valuation"
  | "claim_correspondence"
  | "invoice_payment"
  | "regulatory_legal"
  | "user_entered"
  | "other";

export type VerificationStatus =
  | "user_entered_unverified"
  | "source_recorded_unverified"
  | "passage_reviewed"
  | "clarification_requested"
  | "clarification_received"
  | "superseded_outdated";

export type StatementStatus =
  | "user_assertion"
  | "source_recorded"
  | "passage_reviewed"
  | "requires_clarification"
  | "clarified_in_writing"
  | "no_longer_current";

export interface EvidenceSource {
  id: string;
  title: string; // required
  sourceType: SourceType;
  authorOrOrganization?: string;
  dateReceived?: string; // YYYY-MM-DD
  dateOfDocument?: string; // YYYY-MM-DD
  relatedPolicyNickname?: string;
  relatedCategory?: string;
  referenceOrSection?: string;
  summary?: string;
  verificationStatus: VerificationStatus;
  followUpDate?: string; // YYYY-MM-DD
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EvidenceStatement {
  id: string;
  statement: string; // required
  category?: string;
  relatedPolicyNickname?: string;
  sourceIds: string[]; // linked source IDs
  sourceReference?: string;
  statementStatus: StatementStatus;
  dateRecorded?: string; // YYYY-MM-DD
  notes?: string;
  conflictNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EvidenceRegisterData {
  schemaVersion: "1.0";
  exportedAt: string;
  userNotes?: string;
  sources: EvidenceSource[];
  statements: EvidenceStatement[];
}

export const SOURCE_TYPE_INFO: Record<
  SourceType,
  { labelRo: string; labelEn: string; color: string }
> = {
  policy_wording: {
    labelRo: "Condiții Generale Poliță",
    labelEn: "Policy Wording",
    color: "blue",
  },
  policy_schedule: {
    labelRo: "Specificație Poliță / Schedule",
    labelEn: "Policy Schedule",
    color: "cyan",
  },
  renewal_offer: {
    labelRo: "Ofertă Reînnoire",
    labelEn: "Renewal Offer",
    color: "amber",
  },
  insurer_communication: {
    labelRo: "Adresă / Email Asigurator",
    labelEn: "Insurer Email / Letter",
    color: "purple",
  },
  broker_clarification: {
    labelRo: "Clarificare Scrisă Broker",
    labelEn: "Broker Clarification",
    color: "emerald",
  },
  asset_valuation: {
    labelRo: "Raport Evaluare Bun",
    labelEn: "Asset Valuation",
    color: "rose",
  },
  claim_correspondence: {
    labelRo: "Corespondență Dosar Daună",
    labelEn: "Claim Correspondence",
    color: "orange",
  },
  invoice_payment: {
    labelRo: "Factură / Dovadă Plată",
    labelEn: "Invoice / Payment Proof",
    color: "teal",
  },
  regulatory_legal: {
    labelRo: "Reglementare / Sursă Legală",
    labelEn: "Legal / Regulatory Source",
    color: "indigo",
  },
  user_entered: {
    labelRo: "Notă / Informație Declarată",
    labelEn: "User Entered Note",
    color: "zinc",
  },
  other: {
    labelRo: "Altă Sursă",
    labelEn: "Other Source",
    color: "slate",
  },
};

export const VERIFICATION_STATUS_INFO: Record<
  VerificationStatus,
  { labelRo: string; labelEn: string; color: string }
> = {
  user_entered_unverified: {
    labelRo: "Informativ utilizator; neverificat",
    labelEn: "User entered; not checked",
    color: "zinc",
  },
  source_recorded_unverified: {
    labelRo: "Sursă notată; conținut neverificat",
    labelEn: "Source recorded; not verified",
    color: "amber",
  },
  passage_reviewed: {
    labelRo: "Paragraf revizuit în document",
    labelEn: "Passage reviewed by user",
    color: "blue",
  },
  clarification_requested: {
    labelRo: "Clarificare solicitată",
    labelEn: "Clarification requested",
    color: "purple",
  },
  clarification_received: {
    labelRo: "Clarificare primită în scris",
    labelEn: "Clarification received",
    color: "emerald",
  },
  superseded_outdated: {
    labelRo: "Înlocuit / Perimat istoric",
    labelEn: "Superseded / Outdated",
    color: "red",
  },
};

export const STATEMENT_STATUS_INFO: Record<
  StatementStatus,
  { labelRo: string; labelEn: string; color: string }
> = {
  user_assertion: {
    labelRo: "Afirmație proprie (nesusținută)",
    labelEn: "User assertion",
    color: "zinc",
  },
  source_recorded: {
    labelRo: "Extras din sursă notată",
    labelEn: "Source recorded",
    color: "amber",
  },
  passage_reviewed: {
    labelRo: "Verificat în textul sursei",
    labelEn: "Passage reviewed",
    color: "blue",
  },
  requires_clarification: {
    labelRo: "Necesită clarificare",
    labelEn: "Requires clarification",
    color: "purple",
  },
  clarified_in_writing: {
    labelRo: "Clarificat în scris",
    labelEn: "Clarified in writing",
    color: "emerald",
  },
  no_longer_current: {
    labelRo: "Nu mai este de actualitate",
    labelEn: "No longer current",
    color: "red",
  },
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

export interface RegisterSummaryStats {
  totalSources: number;
  totalStatements: number;
  clarificationsPending: number;
  clarificationsReceived: number;
  overdueFollowUps: number;
  unlinkedStatements: number;
  supersededSources: number;
  conflictingStatements: number;
}

export function generateEvidenceSummaryStats(
  sources: EvidenceSource[],
  statements: EvidenceStatement[]
): RegisterSummaryStats {
  let clarificationsPending = 0;
  let clarificationsReceived = 0;
  let overdueFollowUps = 0;
  let supersededSources = 0;
  let conflictingStatements = 0;

  for (const s of sources) {
    if (s.verificationStatus === "clarification_requested") clarificationsPending++;
    if (s.verificationStatus === "clarification_received") clarificationsReceived++;
    if (s.verificationStatus === "superseded_outdated") supersededSources++;

    const followUp = getFollowUpStatus(s.followUpDate);
    if (followUp.status === "overdue") overdueFollowUps++;
  }

  let unlinkedStatements = 0;
  for (const st of statements) {
    if (st.statementStatus === "requires_clarification") clarificationsPending++;
    if (st.statementStatus === "clarified_in_writing") clarificationsReceived++;
    if (st.sourceIds.length === 0) unlinkedStatements++;
    if (st.conflictNote && st.conflictNote.trim()) conflictingStatements++;
  }

  return {
    totalSources: sources.length,
    totalStatements: statements.length,
    clarificationsPending,
    clarificationsReceived,
    overdueFollowUps,
    unlinkedStatements,
    supersededSources,
    conflictingStatements,
  };
}

export function validateImportedEvidenceRegister(json: unknown): {
  valid: boolean;
  data?: EvidenceRegisterData;
  error?: string;
} {
  if (!json || typeof json !== "object") {
    return { valid: false, error: "Fișierul JSON este gol sau invalid." };
  }

  const obj = json as Record<string, unknown>;

  if (obj.schemaVersion !== "1.0") {
    return { valid: false, error: "Versiunea schemei JSON nu este suportată (este necesară 1.0)." };
  }

  if (!Array.isArray(obj.sources) || !Array.isArray(obj.statements)) {
    return { valid: false, error: "Structura 'sources' sau 'statements' lipsește." };
  }

  if (obj.sources.length > 200 || obj.statements.length > 300) {
    return { valid: false, error: "Numărul de elemente depășește limita permisă de siguranță." };
  }

  const validSourceTypes: SourceType[] = [
    "policy_wording",
    "policy_schedule",
    "renewal_offer",
    "insurer_communication",
    "broker_clarification",
    "asset_valuation",
    "claim_correspondence",
    "invoice_payment",
    "regulatory_legal",
    "user_entered",
    "other",
  ];

  const validVerifStatuses: VerificationStatus[] = [
    "user_entered_unverified",
    "source_recorded_unverified",
    "passage_reviewed",
    "clarification_requested",
    "clarification_received",
    "superseded_outdated",
  ];

  const validStatementStatuses: StatementStatus[] = [
    "user_assertion",
    "source_recorded",
    "passage_reviewed",
    "requires_clarification",
    "clarified_in_writing",
    "no_longer_current",
  ];

  const sanitizedSources: EvidenceSource[] = [];
  const sourceIdSet = new Set<string>();

  for (let i = 0; i < obj.sources.length; i++) {
    const s = obj.sources[i] as Record<string, unknown>;
    if (!s || typeof s !== "object") continue;

    const id = typeof s.id === "string" && s.id.trim() ? s.id.slice(0, 50) : `src_${Date.now()}_${i}`;
    sourceIdSet.add(id);

    sanitizedSources.push({
      id,
      title: typeof s.title === "string" && s.title.trim() ? s.title.trim().slice(0, 150) : `Sursă neintitulată #${i + 1}`,
      sourceType: typeof s.sourceType === "string" && validSourceTypes.includes(s.sourceType as SourceType) ? (s.sourceType as SourceType) : "other",
      authorOrOrganization: typeof s.authorOrOrganization === "string" ? s.authorOrOrganization.trim().slice(0, 100) : undefined,
      dateReceived: typeof s.dateReceived === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s.dateReceived) ? s.dateReceived : undefined,
      dateOfDocument: typeof s.dateOfDocument === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s.dateOfDocument) ? s.dateOfDocument : undefined,
      relatedPolicyNickname: typeof s.relatedPolicyNickname === "string" ? s.relatedPolicyNickname.trim().slice(0, 100) : undefined,
      relatedCategory: typeof s.relatedCategory === "string" ? s.relatedCategory.trim().slice(0, 50) : undefined,
      referenceOrSection: typeof s.referenceOrSection === "string" ? s.referenceOrSection.trim().slice(0, 100) : undefined,
      summary: typeof s.summary === "string" ? s.summary.trim().slice(0, 1000) : undefined,
      verificationStatus: typeof s.verificationStatus === "string" && validVerifStatuses.includes(s.verificationStatus as VerificationStatus) ? (s.verificationStatus as VerificationStatus) : "user_entered_unverified",
      followUpDate: typeof s.followUpDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s.followUpDate) ? s.followUpDate : undefined,
      notes: typeof s.notes === "string" ? s.notes.trim().slice(0, 1000) : undefined,
      createdAt: typeof s.createdAt === "string" ? s.createdAt : new Date().toISOString(),
      updatedAt: typeof s.updatedAt === "string" ? s.updatedAt : new Date().toISOString(),
    });
  }

  const sanitizedStatements: EvidenceStatement[] = [];

  for (let i = 0; i < obj.statements.length; i++) {
    const st = obj.statements[i] as Record<string, unknown>;
    if (!st || typeof st !== "object") continue;

    // Filter linked sourceIds to only existing sources
    const rawSourceIds = Array.isArray(st.sourceIds) ? st.sourceIds : [];
    const validSourceIds = rawSourceIds.filter((sid) => typeof sid === "string" && sourceIdSet.has(sid)).slice(0, 20);

    sanitizedStatements.push({
      id: typeof st.id === "string" && st.id.trim() ? st.id.slice(0, 50) : `stmt_${Date.now()}_${i}`,
      statement: typeof st.statement === "string" && st.statement.trim() ? st.statement.trim().slice(0, 500) : `Afirmație neintitulată #${i + 1}`,
      category: typeof st.category === "string" ? st.category.trim().slice(0, 50) : undefined,
      relatedPolicyNickname: typeof st.relatedPolicyNickname === "string" ? st.relatedPolicyNickname.trim().slice(0, 100) : undefined,
      sourceIds: validSourceIds,
      sourceReference: typeof st.sourceReference === "string" ? st.sourceReference.trim().slice(0, 100) : undefined,
      statementStatus: typeof st.statementStatus === "string" && validStatementStatuses.includes(st.statementStatus as StatementStatus) ? (st.statementStatus as StatementStatus) : "user_assertion",
      dateRecorded: typeof st.dateRecorded === "string" && /^\d{4}-\d{2}-\d{2}$/.test(st.dateRecorded) ? st.dateRecorded : undefined,
      notes: typeof st.notes === "string" ? st.notes.trim().slice(0, 500) : undefined,
      conflictNote: typeof st.conflictNote === "string" ? st.conflictNote.trim().slice(0, 500) : undefined,
      createdAt: typeof st.createdAt === "string" ? st.createdAt : new Date().toISOString(),
      updatedAt: typeof st.updatedAt === "string" ? st.updatedAt : new Date().toISOString(),
    });
  }

  return {
    valid: true,
    data: {
      schemaVersion: "1.0",
      exportedAt: typeof obj.exportedAt === "string" ? obj.exportedAt : new Date().toISOString(),
      userNotes: typeof obj.userNotes === "string" ? obj.userNotes.trim().slice(0, 1000) : undefined,
      sources: sanitizedSources,
      statements: sanitizedStatements,
    },
  };
}

export function generateEvidenceRegisterPdf(exportData: EvidenceRegisterData): void {
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
    doc.text("Registru de Documentare, Surse & Clauze Asigurare", margin, 18);

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
  const stats = generateEvidenceSummaryStats(exportData.sources, exportData.statements);
  doc.setFillColor(245, 247, 250);
  doc.setDrawColor(220, 225, 230);
  doc.roundedRect(margin, currentY, contentWidth, 22, 2, 2, "FD");

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("SUMAR REGISTRU SURSE & AFIRMAȚII", margin + 4, currentY + 6.5);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(`• Total surse notate: ${stats.totalSources}`, margin + 4, currentY + 12);
  doc.text(`• Afirmații / Clauze: ${stats.totalStatements}`, margin + 4, currentY + 17);

  doc.text(`• Clarificări în așteptare: ${stats.clarificationsPending}`, margin + 65, currentY + 12);
  doc.text(`• Clarificări primite: ${stats.clarificationsReceived}`, margin + 65, currentY + 17);

  doc.text(`• Follow-up depășit: ${stats.overdueFollowUps}`, margin + 130, currentY + 12);
  doc.text(`• Afirmații fără sursă: ${stats.unlinkedStatements}`, margin + 130, currentY + 17);

  currentY += 28;

  // Conflict or Missing Source Callout
  if (stats.conflictingStatements > 0 || stats.unlinkedStatements > 0) {
    ensureSpace(18);
    doc.setFillColor(254, 243, 199);
    doc.setDrawColor(245, 158, 11);
    doc.roundedRect(margin, currentY, contentWidth, 14, 2, 2, "FD");

    doc.setTextColor(146, 64, 14);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    doc.text("AVERTIZĂRI DE VERIFICARE ȘI RECONCILIERE", margin + 4, currentY + 5.5);

    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.text(
      `• Au fost identificate ${stats.conflictingStatements} afirmații cu note de conflict și ${stats.unlinkedStatements} afirmații nesusținute de surse notate.`,
      margin + 4,
      currentY + 10.5
    );
    currentY += 19;
  }

  // Section 1: Statements & Their Supporting Sources
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("1. AFIRMAȚII & CLAUZE CU SURSE ATRIBUITE", margin, currentY);
  currentY += 6;

  for (const st of exportData.statements) {
    const linkedSources = exportData.sources.filter((s) => st.sourceIds.includes(s.id));
    const stStatus = STATEMENT_STATUS_INFO[st.statementStatus];

    const rowHeight = 22 + (st.notes || st.conflictNote ? 6 : 0) + (linkedSources.length > 0 ? 5 : 0);
    ensureSpace(rowHeight);

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, currentY, contentWidth, rowHeight - 2, 1, 1, "FD");

    // Statement Text
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    doc.text(doc.splitTextToSize(`„${st.statement}”`, contentWidth - 40), margin + 3, currentY + 5);

    // Status on right
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(30, 41, 59);
    doc.text(stStatus.labelRo, pageWidth - margin - 3, currentY + 5, { align: "right" });

    // Category & Policy
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(7.5);
    const metaStr = `Poliță: ${st.relatedPolicyNickname || "Generală"} | Categorie: ${st.category || "Nespecificată"} | Ref: ${st.sourceReference || "N/A"}`;
    doc.text(metaStr, margin + 3, currentY + 10);

    // Linked Sources
    let subY = currentY + 14.5;
    if (linkedSources.length > 0) {
      doc.setTextColor(37, 99, 235);
      doc.setFontSize(7);
      const srcTitles = linkedSources.map((s) => `[${s.title}]`).join(", ");
      doc.text(`Surse legate: ${srcTitles}`, margin + 3, subY);
      subY += 4.5;
    } else {
      doc.setTextColor(180, 83, 9);
      doc.setFontSize(7);
      doc.text("⚠️ Afirmație declarativă proprie (fără sursă asociată)", margin + 3, subY);
      subY += 4.5;
    }

    if (st.conflictNote) {
      doc.setTextColor(220, 38, 38);
      doc.setFontSize(7);
      doc.text(`Conflict notat: ${st.conflictNote.slice(0, 100)}`, margin + 3, subY);
    } else if (st.notes) {
      doc.setTextColor(100, 116, 139);
      doc.setFontSize(7);
      doc.text(`Notă: ${st.notes.slice(0, 100)}`, margin + 3, subY);
    }

    currentY += rowHeight;
  }

  currentY += 4;

  // Section 2: Source Documents Register
  ensureSpace(20);
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("2. REGISTRU DETALIAT SURSE & DOCUMENTE NOTATE", margin, currentY);
  currentY += 6;

  for (const src of exportData.sources) {
    const srcType = SOURCE_TYPE_INFO[src.sourceType];
    const verifStatus = VERIFICATION_STATUS_INFO[src.verificationStatus];
    const followUp = getFollowUpStatus(src.followUpDate);

    const rowHeight = 22 + (src.summary ? 6 : 0);
    ensureSpace(rowHeight);

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, currentY, contentWidth, rowHeight - 2, 1, 1, "FD");

    // Title
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    doc.text(src.title, margin + 3, currentY + 5);

    // Status on right
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text(verifStatus.labelRo, pageWidth - margin - 3, currentY + 5, { align: "right" });

    // Meta
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(7.5);
    const metaText = `Tip: ${srcType.labelRo} | Emitent: ${src.authorOrOrganization || "Nespecificat"} | Dată: ${src.dateOfDocument || src.dateReceived || "Nespecificată"}`;
    doc.text(metaText, margin + 3, currentY + 10);

    let subY = currentY + 14.5;
    if (src.summary) {
      doc.setTextColor(51, 65, 85);
      doc.setFontSize(7);
      doc.text(`Sumar: ${src.summary.slice(0, 115)}`, margin + 3, subY);
      subY += 4.5;
    }

    if (src.followUpDate) {
      doc.setTextColor(180, 83, 9);
      doc.setFontSize(7);
      doc.text(`Follow-up stabilit: ${src.followUpDate} [${followUp.labelRo}]`, margin + 3, subY);
    }

    currentY += rowHeight;
  }

  // Legal Disclaimer
  ensureSpace(28);
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, currentY, contentWidth, 22, 1, 1, "FD");

  doc.setTextColor(100, 116, 139);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text(
    "NOTĂ LEGALĂ: Înregistrările din acest document sunt menținute exclusiv de utilizator și nu sunt autentificate de aplicație.",
    margin + 3,
    currentY + 5
  );
  doc.text(
    "Aplicația nu stabilește dacă o sursă este obligatorie juridic sau dacă înlocuiește condițiile generale oficiale ale asiguratorului.",
    margin + 3,
    currentY + 9
  );
  doc.text(
    "Pentru confirmarea drepturilor și obligațiilor contractuale, solicitați întotdeauna clarificări scrise direct de la asigurator.",
    margin + 3,
    currentY + 13
  );
  doc.text(
    "Consultanță specializată: Cristian Văduva | Telefon / WhatsApp: 0767 110 439 | Email: contact@cristianvaduva.com",
    margin + 3,
    currentY + 18
  );

  doc.save(`registru-documentare-asigurari-${new Date().toISOString().split("T")[0]}.pdf`);
}
