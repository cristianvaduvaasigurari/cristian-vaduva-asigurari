"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Plus,
  Trash2,
  Edit3,
  Download,
  Upload,
  Calendar,
  Clock,
  Check,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Lock,
  PhoneCall,
  Mail,
  FileCheck,
  Wrench,
  DollarSign,
  Info,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ClaimStage,
  ActivityType,
  DocRegisterStatus,
  ActivityEntry,
  ClaimDocRecord,
  ClaimsWorkspaceData,
  CLAIM_STAGE_LABELS_RO,
  CLAIM_STAGE_LABELS_EN,
  ACTIVITY_TYPE_LABELS_RO,
  ACTIVITY_TYPE_LABELS_EN,
  DOC_REGISTER_STATUS_RO,
  DOC_REGISTER_STATUS_EN,
  getFollowUpStatus,
  generateClaimsProgressPdf,
  validateImportedClaimsWorkspace,
} from "@/lib/claims-progress";
import {
  PolicyCategory,
  CATEGORY_LABELS_RO,
  CATEGORY_LABELS_EN,
} from "@/lib/portfolio-calendar";
import Link from "next/link";

export function ClaimsProgressTracker() {
  const [lang, setLang] = useState<"ro" | "en">("ro");
  const isRo = lang === "ro";

  // Active Tab
  const [activeTab, setActiveTab] = useState<"overview" | "timeline" | "documents" | "followups">("overview");

  // Claim Workspace in-memory state
  const [claim, setClaim] = useState<ClaimsWorkspaceData>({
    nickname: "Dosar Tamponare Parcare — BMW Seria 3",
    category: "casco",
    incidentDate: "2026-09-01",
    reportedDate: "2026-09-02",
    insurer: "Generali Asigurări",
    stage: "assessment_investigation",
    nextFollowUpDate: "2026-09-10",
    generalNotes: "Avarii aripă dreaptă față și far spart în parcarea subterană. S-a eliberat notificare de deschidere dosar.",
    activities: [
      {
        id: "act_1",
        date: "2026-09-01",
        time: "10:30",
        type: "insurer_notification",
        title: "Avizare daună telefonică la call-center",
        notes: "S-a primit numărul de înregistrare al dosarului de daună.",
        contactName: "Call Center Daune",
        isCompleted: true,
        createdAt: "2026-09-01T10:30:00.000Z",
      },
      {
        id: "act_2",
        date: "2026-09-02",
        time: "14:15",
        type: "document_submitted",
        title: "Transmitere documente inițiale pe portal",
        notes: "S-au încărcat: permis, talon, poliță CASCO și fotografii inițiale.",
        isCompleted: true,
        createdAt: "2026-09-02T14:15:00.000Z",
      },
      {
        id: "act_3",
        date: "2026-09-03",
        time: "11:00",
        type: "assessment_inspection",
        title: "Constatare fizică la service partener",
        notes: "Inspectorul de daune a efectuat fotografiile de detaliu și a deschis nota de constatare.",
        contactName: "Inspector Daune Auto",
        nextAction: "Așteptare accept de plată / deviz estimativ",
        followUpDate: "2026-09-10",
        isCompleted: false,
        createdAt: "2026-09-03T11:00:00.000Z",
      },
    ],
    documents: [
      {
        id: "doc_1",
        name: "Certificat de Înmatriculare (Talon) & Permis Conducere",
        status: "submitted",
        dateSubmitted: "2026-09-02",
        notes: "Transmis prin email către inspector.",
      },
      {
        id: "doc_2",
        name: "Formular Constatare Amiabilă / Declarație Eveniment",
        status: "submitted",
        dateSubmitted: "2026-09-02",
      },
      {
        id: "doc_3",
        name: "Deviz de Reparație Estimativ de la Service Reprezentanță",
        status: "requested",
        dateRequested: "2026-09-03",
        notes: "Service-ul finalizează devizul tehnic cu piesele originale.",
      },
    ],
    lang: "ro",
    createdAt: "2026-09-01T10:00:00.000Z",
    updatedAt: "2026-09-03T11:00:00.000Z",
  });

  // Timeline Sorting
  const [timelineSort, setTimelineSort] = useState<"newest" | "oldest">("newest");

  // Activity Modal State
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<ActivityEntry | null>(null);
  const [actTitle, setActTitle] = useState("");
  const [actType, setActType] = useState<ActivityType>("phone_call");
  const [actDate, setActDate] = useState(new Date().toISOString().slice(0, 10));
  const [actTime, setActTime] = useState("");
  const [actContact, setActContact] = useState("");
  const [actNotes, setActNotes] = useState("");
  const [actNextAction, setActNextAction] = useState("");
  const [actFollowUpDate, setActFollowUpDate] = useState("");

  // Document Modal State
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<ClaimDocRecord | null>(null);
  const [docName, setDocName] = useState("");
  const [docStatus, setDocStatus] = useState<DocRegisterStatus>("to_obtain");
  const [docDateRequested, setDocDateRequested] = useState("");
  const [docDateSubmitted, setDocDateSubmitted] = useState("");
  const [docNotes, setDocNotes] = useState("");

  // Clear Workspace Confirm Modal
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Clear workspace
  const handleClearWorkspace = () => {
    setClaim({
      nickname: isRo ? "Dosar Daună Nou" : "New Claim Dossier",
      category: "casco",
      stage: "incident_recorded",
      activities: [],
      documents: [],
      lang,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setIsClearConfirmOpen(false);
  };

  // Open Add Activity Modal
  const openAddActivity = () => {
    setEditingActivity(null);
    setActTitle("");
    setActType("phone_call");
    setActDate(new Date().toISOString().slice(0, 10));
    setActTime("");
    setActContact("");
    setActNotes("");
    setActNextAction("");
    setActFollowUpDate("");
    setIsActivityModalOpen(true);
  };

  // Open Edit Activity Modal
  const openEditActivity = (act: ActivityEntry) => {
    setEditingActivity(act);
    setActTitle(act.title);
    setActType(act.type);
    setActDate(act.date);
    setActTime(act.time || "");
    setActContact(act.contactName || "");
    setActNotes(act.notes || "");
    setActNextAction(act.nextAction || "");
    setActFollowUpDate(act.followUpDate || "");
    setIsActivityModalOpen(true);
  };

  // Save Activity Entry
  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actTitle.trim() || !actDate) return;

    const entry: ActivityEntry = {
      id: editingActivity ? editingActivity.id : `act_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      date: actDate,
      time: actTime.trim() || undefined,
      type: actType,
      title: actTitle.trim(),
      notes: actNotes.trim() || undefined,
      contactName: actContact.trim() || undefined,
      nextAction: actNextAction.trim() || undefined,
      followUpDate: actFollowUpDate || undefined,
      isCompleted: editingActivity ? editingActivity.isCompleted : false,
      createdAt: editingActivity ? editingActivity.createdAt : new Date().toISOString(),
    };

    if (editingActivity) {
      setClaim({
        ...claim,
        activities: claim.activities.map((a) => (a.id === editingActivity.id ? entry : a)),
      });
    } else {
      setClaim({
        ...claim,
        activities: [entry, ...claim.activities],
      });
    }

    setIsActivityModalOpen(false);
  };

  // Delete Activity Entry
  const handleDeleteActivity = (id: string) => {
    setClaim({
      ...claim,
      activities: claim.activities.filter((a) => a.id !== id),
    });
  };

  // Toggle Activity Completed
  const toggleActivityCompleted = (id: string) => {
    setClaim({
      ...claim,
      activities: claim.activities.map((a) => (a.id === id ? { ...a, isCompleted: !a.isCompleted } : a)),
    });
  };

  // Open Add Document Modal
  const openAddDoc = () => {
    setEditingDoc(null);
    setDocName("");
    setDocStatus("to_obtain");
    setDocDateRequested("");
    setDocDateSubmitted("");
    setDocNotes("");
    setIsDocModalOpen(true);
  };

  // Open Edit Document Modal
  const openEditDoc = (d: ClaimDocRecord) => {
    setEditingDoc(d);
    setDocName(d.name);
    setDocStatus(d.status);
    setDocDateRequested(d.dateRequested || "");
    setDocDateSubmitted(d.dateSubmitted || "");
    setDocNotes(d.notes || "");
    setIsDocModalOpen(true);
  };

  // Save Document Record
  const handleSaveDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) return;

    const record: ClaimDocRecord = {
      id: editingDoc ? editingDoc.id : `doc_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: docName.trim(),
      status: docStatus,
      dateRequested: docDateRequested || undefined,
      dateSubmitted: docDateSubmitted || undefined,
      notes: docNotes.trim() || undefined,
    };

    if (editingDoc) {
      setClaim({
        ...claim,
        documents: claim.documents.map((d) => (d.id === editingDoc.id ? record : d)),
      });
    } else {
      setClaim({
        ...claim,
        documents: [record, ...claim.documents],
      });
    }

    setIsDocModalOpen(false);
  };

  // Delete Document Record
  const handleDeleteDoc = (id: string) => {
    setClaim({
      ...claim,
      documents: claim.documents.filter((d) => d.id !== id),
    });
  };

  // PDF Export
  const handleDownloadPdf = () => {
    const doc = generateClaimsProgressPdf({ ...claim, lang });
    doc.save(`urmarire-dauna-${claim.nickname.replace(/\s+/g, "_").toLowerCase()}-${Date.now()}.pdf`);
  };

  // JSON Export
  const handleExportJson = () => {
    const dataStr = JSON.stringify({ ...claim, lang }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `backup-dauna-${claim.nickname.replace(/\s+/g, "_").toLowerCase()}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // JSON Import
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const res = validateImportedClaimsWorkspace(text);
      if (res.isValid && res.claim) {
        setClaim(res.claim);
        setImportStatus(isRo ? "Jurnal importat cu succes în memorie!" : "Claim dossier imported into memory!");
        setTimeout(() => setImportStatus(null), 3500);
      } else {
        setImportStatus(res.error || "Fișier JSON neconform.");
        setTimeout(() => setImportStatus(null), 3500);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Sorted Activities
  const sortedActivities = [...claim.activities].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time || "00:00"}`).getTime() || 0;
    const dateB = new Date(`${b.date}T${b.time || "00:00"}`).getTime() || 0;
    return timelineSort === "newest" ? dateB - dateA : dateA - dateB;
  });

  // Follow-up statistics
  const overdueActivities = claim.activities.filter(
    (a) => !a.isCompleted && a.followUpDate && getFollowUpStatus(a.followUpDate) === "overdue"
  );
  const todayActivities = claim.activities.filter(
    (a) => !a.isCompleted && a.followUpDate && getFollowUpStatus(a.followUpDate) === "today"
  );
  const upcomingActivities = claim.activities.filter(
    (a) => !a.isCompleted && a.followUpDate && getFollowUpStatus(a.followUpDate) === "upcoming"
  );

  return (
    <div className="w-full space-y-8 max-w-5xl mx-auto">
      {/* 1. TOP TOOLBAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-zinc-900/80 border border-zinc-800">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          {[
            { id: "overview", labelRo: "1. Prezentare & Stadiu", labelEn: "1. Overview & Stage" },
            { id: "timeline", labelRo: "2. Jurnal Cronologic", labelEn: "2. Activity Log" },
            { id: "documents", labelRo: "3. Registru Documente", labelEn: "3. Document Register" },
            { id: "followups", labelRo: "4. Scadențe & Follow-up", labelEn: "4. Follow-ups" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as "overview" | "timeline" | "documents" | "followups")}
              className={`px-3.5 py-2 rounded-xl font-medium transition-all shrink-0 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-md font-bold"
                  : "bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {isRo ? tab.labelRo : tab.labelEn}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 text-xs border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-800">
          <Button
            type="button"
            variant="outline"
            onClick={handleDownloadPdf}
            className="rounded-full border-zinc-800 hover:bg-zinc-800 text-zinc-300 h-9 px-3.5 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>PDF</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleExportJson}
            className="rounded-full border-zinc-800 hover:bg-zinc-800 text-zinc-300 h-9 px-3"
            title="Export JSON"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">JSON</span>
          </Button>

          <label className="cursor-pointer rounded-full border border-zinc-800 hover:bg-zinc-800 text-zinc-300 h-9 px-3 inline-flex items-center gap-1.5 transition-colors">
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Import</span>
            <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
          </label>

          <button
            type="button"
            onClick={() => setIsClearConfirmOpen(true)}
            className="text-zinc-500 hover:text-rose-400 transition-colors p-2"
            title={isRo ? "Golește spațiul de lucru" : "Clear workspace"}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1 p-1 rounded-full bg-zinc-950 border border-zinc-800">
            <button
              type="button"
              onClick={() => setLang("ro")}
              className={`px-2.5 py-0.5 rounded-full font-medium ${lang === "ro" ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-white"}`}
            >
              RO
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-2.5 py-0.5 rounded-full font-medium ${lang === "en" ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-white"}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {importStatus && (
        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-400" />
          <span>{importStatus}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 1: OVERVIEW & STAGE */}
      {/* ======================================================== */}
      {activeTab === "overview" && (
        <div className="p-6 sm:p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                {isRo ? "IDENTIFICARE DOSAR & STADIU OPERAȚIONAL" : "CLAIM IDENTIFICATION & CURRENT STAGE"}
              </span>
              <h3 className="text-xl font-heading font-bold text-white">
                {claim.nickname}
              </h3>
            </div>
            <div className="text-xs text-zinc-400">
              <span className="font-semibold text-zinc-300">{claim.activities.length}</span> {isRo ? "activități consemnate" : "recorded events"}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-zinc-300 font-medium">{isRo ? "Denumire / Nickname Dosar *" : "Claim Nickname *"}</label>
              <Input
                value={claim.nickname}
                onChange={(e) => setClaim({ ...claim, nickname: e.target.value })}
                className="h-11 bg-zinc-900 border-zinc-800 text-white rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">{isRo ? "Categorie Asigurare" : "Insurance Category"}</label>
              <select
                value={claim.category}
                onChange={(e) => setClaim({ ...claim, category: e.target.value as PolicyCategory })}
                className="w-full h-11 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none"
              >
                {Object.entries(isRo ? CATEGORY_LABELS_RO : CATEGORY_LABELS_EN).map(([cat, lbl]) => (
                  <option key={cat} value={cat}>
                    {lbl}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">{isRo ? "Stadiu Procesare Daună" : "Current Processing Stage"}</label>
              <select
                value={claim.stage}
                onChange={(e) => setClaim({ ...claim, stage: e.target.value as ClaimStage })}
                className="w-full h-11 px-3 rounded-xl bg-zinc-900 border border-blue-500/50 text-blue-300 text-xs focus:outline-none font-semibold"
              >
                {Object.entries(isRo ? CLAIM_STAGE_LABELS_RO : CLAIM_STAGE_LABELS_EN).map(([stg, lbl]) => (
                  <option key={stg} value={stg}>
                    {lbl}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">{isRo ? "Companie Asigurare / Administrator Daune" : "Insurer / Claims Handler"}</label>
              <Input
                placeholder="Ex: Generali, Allianz, Groupama..."
                value={claim.insurer || ""}
                onChange={(e) => setClaim({ ...claim, insurer: e.target.value })}
                className="h-11 bg-zinc-900 border-zinc-800 text-white rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">{isRo ? "Dată Eveniment (Sinistru)" : "Incident Date"}</label>
              <Input
                type="date"
                value={claim.incidentDate || ""}
                onChange={(e) => setClaim({ ...claim, incidentDate: e.target.value })}
                className="h-11 bg-zinc-900 border-zinc-800 text-white rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">{isRo ? "Dată Avizare la Asigurator" : "Date Reported to Insurer"}</label>
              <Input
                type="date"
                value={claim.reportedDate || ""}
                onChange={(e) => setClaim({ ...claim, reportedDate: e.target.value })}
                className="h-11 bg-zinc-900 border-zinc-800 text-white rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">{isRo ? "Următorul Follow-up Planificat" : "Next Planned Follow-up"}</label>
              <Input
                type="date"
                value={claim.nextFollowUpDate || ""}
                onChange={(e) => setClaim({ ...claim, nextFollowUpDate: e.target.value })}
                className="h-11 bg-zinc-900 border-zinc-800 text-white rounded-xl text-xs font-semibold"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-zinc-300 font-medium">{isRo ? "Notițe Generale Dosar (Context, Martori, Nr. Dosar Intern)" : "General Claim Notes"}</label>
              <textarea
                rows={3}
                placeholder={isRo ? "Adaugă detalii relevante despre desfășurarea evenimentului..." : "Add relevant details..."}
                value={claim.generalNotes || ""}
                onChange={(e) => setClaim({ ...claim, generalNotes: e.target.value })}
                className="w-full p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-zinc-800">
            <Button
              type="button"
              onClick={() => setActiveTab("timeline")}
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 px-6 flex items-center gap-2"
            >
              <span>{isRo ? "Mergi la Jurnalul Cronologic" : "Go to Activity Log"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: CHRONOLOGICAL ACTIVITY LOG */}
      {/* ======================================================== */}
      {activeTab === "timeline" && (
        <div className="p-6 sm:p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                {isRo ? "JURNAL CRONOLOGIC & ISTORIC COMUNICĂRI" : "CHRONOLOGICAL ACTIVITY TIMELINE"}
              </span>
              <h3 className="text-xl font-heading font-bold text-white">
                {isRo ? "Toate interacțiunile și etapele înregistrate" : "All interactions and recorded steps"}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={timelineSort}
                onChange={(e) => setTimelineSort(e.target.value as "newest" | "oldest")}
                className="h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none"
              >
                <option value="newest">{isRo ? "Cele mai recente primele" : "Newest first"}</option>
                <option value="oldest">{isRo ? "Cele mai vechi primele" : "Oldest first"}</option>
              </select>

              <Button
                type="button"
                onClick={openAddActivity}
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10 px-4 flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>{isRo ? "Adaugă Eveniment" : "Add Event"}</span>
              </Button>
            </div>
          </div>

          {sortedActivities.length === 0 ? (
            <div className="p-12 text-center space-y-3 rounded-3xl bg-zinc-900/40 border border-zinc-800/80">
              <Clock className="w-10 h-10 text-zinc-600 mx-auto" />
              <h4 className="text-sm font-bold text-white">
                {isRo ? "Nu există activități înregistrate" : "No activities recorded yet"}
              </h4>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                {isRo
                  ? "Adaugă primul apel telefonic, email primit sau notă de inspecție pentru a păstra evidența exactă a comunicării."
                  : "Add your first phone call, email, or survey note to maintain a detailed communication trail."}
              </p>
              <Button
                type="button"
                onClick={openAddActivity}
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10 px-5"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                {isRo ? "Adaugă Prima Activitate" : "Add First Activity"}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedActivities.map((act) => {
                const typeLabel = isRo ? ACTIVITY_TYPE_LABELS_RO[act.type] : ACTIVITY_TYPE_LABELS_EN[act.type];
                const followUpStatus = getFollowUpStatus(act.followUpDate);

                return (
                  <div
                    key={act.id}
                    className={`p-5 rounded-2xl border transition-all space-y-3 ${
                      act.isCompleted
                        ? "bg-zinc-950/60 border-zinc-800/60 opacity-75"
                        : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-900 text-blue-400 border border-zinc-800">
                          {typeLabel}
                        </span>
                        <span className="text-xs text-zinc-400 font-mono">
                          {act.date} {act.time && `• ${act.time}`}
                        </span>
                        {act.contactName && (
                          <span className="text-xs text-zinc-300">
                            • <strong>{act.contactName}</strong>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleActivityCompleted(act.id)}
                          className={`text-xs px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
                            act.isCompleted
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{act.isCompleted ? (isRo ? "Finalizat" : "Completed") : (isRo ? "În Lucru" : "Open")}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => openEditActivity(act)}
                          className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteActivity(act.id)}
                          className="p-1.5 rounded-lg bg-zinc-900 text-zinc-500 hover:text-rose-400 border border-zinc-800"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h4 className={`text-sm font-heading font-bold ${act.isCompleted ? "line-through text-zinc-400" : "text-white"}`}>
                      {act.title}
                    </h4>

                    {act.notes && (
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {act.notes}
                      </p>
                    )}

                    {(act.nextAction || act.followUpDate) && (
                      <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                        {act.nextAction && (
                          <span className="text-zinc-300">
                            <strong className="text-blue-400">{isRo ? "Următorul Pas:" : "Next Action:"}</strong> {act.nextAction}
                          </span>
                        )}
                        {act.followUpDate && (
                          <span
                            className={`font-semibold px-2 py-0.5 rounded-md ${
                              followUpStatus === "overdue"
                                ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                : followUpStatus === "today"
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                : "text-zinc-400"
                            }`}
                          >
                            {isRo ? "Scadență:" : "Due:"} {act.followUpDate}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: DOCUMENT REGISTER */}
      {/* ======================================================== */}
      {activeTab === "documents" && (
        <div className="p-6 sm:p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                {isRo ? "REGISTRU EVIDENȚĂ ACTE TRANSMISE" : "CLAIM DOCUMENT REGISTER"}
              </span>
              <h3 className="text-xl font-heading font-bold text-white">
                {isRo ? "Evidența documentelor solicitate și transmise" : "Record of requested and submitted claim documents"}
              </h3>
            </div>

            <Button
              type="button"
              onClick={openAddDoc}
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10 px-4 flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>{isRo ? "Adaugă Document" : "Add Document"}</span>
            </Button>
          </div>

          {claim.documents.length === 0 ? (
            <div className="p-12 text-center space-y-3 rounded-3xl bg-zinc-900/40 border border-zinc-800/80">
              <FileText className="w-10 h-10 text-zinc-600 mx-auto" />
              <h4 className="text-sm font-bold text-white">
                {isRo ? "Niciun document înregistrat" : "No documents recorded yet"}
              </h4>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                {isRo
                  ? "Monitorizează certificatele, devizele sau fotografiile solicitate de asigurator."
                  : "Track certificates, estimates, or photos requested by the claims adjuster."}
              </p>
              <Button
                type="button"
                onClick={openAddDoc}
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10 px-5"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                {isRo ? "Adaugă Primul Document" : "Add First Document"}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {claim.documents.map((d) => (
                <div
                  key={d.id}
                  className="p-4 sm:p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1 flex-1">
                    <h4 className="text-sm font-heading font-bold text-white">
                      {d.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 text-zinc-400 text-[11px]">
                      {d.dateRequested && (
                        <span>
                          {isRo ? "Solicitat la:" : "Requested:"} <strong className="text-zinc-300">{d.dateRequested}</strong>
                        </span>
                      )}
                      {d.dateSubmitted && (
                        <span>
                          {isRo ? "Transmis la:" : "Submitted:"} <strong className="text-emerald-400">{d.dateSubmitted}</strong>
                        </span>
                      )}
                      {d.notes && <span>• {d.notes}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${
                        d.status === "submitted"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : d.status === "requested"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : d.status === "ready"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : "bg-zinc-800 text-zinc-400 border-zinc-700"
                      }`}
                    >
                      {isRo ? DOC_REGISTER_STATUS_RO[d.status] : DOC_REGISTER_STATUS_EN[d.status]}
                    </span>

                    <button
                      type="button"
                      onClick={() => openEditDoc(d)}
                      className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteDoc(d.id)}
                      className="p-1.5 rounded-lg bg-zinc-900 text-zinc-500 hover:text-rose-400 border border-zinc-800"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: FOLLOW-UPS & DEADLINES */}
      {/* ======================================================== */}
      {activeTab === "followups" && (
        <div className="p-6 sm:p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-xl space-y-6">
          <div className="pb-4 border-b border-zinc-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
              {isRo ? "SCADENȚE & ACȚIUNI PLANIFICATE" : "FOLLOW-UP MANAGEMENT"}
            </span>
            <h3 className="text-xl font-heading font-bold text-white">
              {isRo ? "Situația termenelor limită și reamintirilor personale" : "Overview of planned follow-ups and user reminders"}
            </h3>
            <p className="text-xs text-zinc-400">
              {isRo
                ? "Scadențele sunt stabilite exclusiv de tine pentru urmărirea eficientă a dosarului și nu reprezintă termene legale obligatorii pentru asigurator."
                : "Reminders are set by you for personal tracking and do not represent statutory insurer deadlines."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className={`p-4 rounded-2xl border space-y-1 ${overdueActivities.length > 0 ? "bg-rose-500/10 border-rose-500/30 text-rose-400" : "bg-zinc-900/60 border-zinc-800 text-zinc-400"}`}>
              <span className="font-semibold uppercase tracking-wider text-[11px]">{isRo ? "Scadențe Depășite" : "Overdue Follow-ups"}</span>
              <div className="text-3xl font-bold font-heading">{overdueActivities.length}</div>
              <span className="text-[10px] opacity-80">{isRo ? "Necesită revenire" : "Action required"}</span>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1 ${todayActivities.length > 0 ? "bg-amber-500/10 border-amber-500/30 text-amber-400" : "bg-zinc-900/60 border-zinc-800 text-zinc-400"}`}>
              <span className="font-semibold uppercase tracking-wider text-[11px]">{isRo ? "Scadențe Astăzi" : "Due Today"}</span>
              <div className="text-3xl font-bold font-heading">{todayActivities.length}</div>
              <span className="text-[10px] opacity-80">{isRo ? "Programate azi" : "Scheduled today"}</span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-blue-400 space-y-1">
              <span className="font-semibold uppercase tracking-wider text-[11px]">{isRo ? "Viitoare" : "Upcoming"}</span>
              <div className="text-3xl font-bold font-heading">{upcomingActivities.length}</div>
              <span className="text-[10px] text-zinc-500">{isRo ? "În zilele următoare" : "In future days"}</span>
            </div>
          </div>

          {/* List of open follow-ups */}
          <div className="space-y-3 pt-2">
            {[...overdueActivities, ...todayActivities, ...upcomingActivities].map((act) => (
              <div
                key={act.id}
                className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5 flex-1">
                  <span className="font-bold text-white block">{act.title}</span>
                  {act.nextAction && <span className="text-zinc-400 text-[11px]">Pas: {act.nextAction}</span>}
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-zinc-300 font-semibold">{act.followUpDate}</span>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => toggleActivityCompleted(act.id)}
                    className="rounded-xl border-zinc-800 text-xs h-8"
                  >
                    <Check className="w-3 h-3 mr-1 text-emerald-400" />
                    {isRo ? "Marchează Rezolvat" : "Mark Done"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. PRIVACY & LOCAL MEMORY GUARANTEE */}
      <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-2 text-xs text-zinc-400">
        <div className="flex items-center gap-2 text-zinc-300 font-bold">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>{isRo ? "Confidențialitate Totală & Stocare Volatilă" : "Total Privacy & Active Session Memory"}</span>
        </div>
        <p className="leading-relaxed">
          {isRo
            ? "Toate datele din acest jurnal de daună sunt procesate exclusiv în memoria locală a browserului tău pe durata sesiunii curente. Nu sunt transmise către baze de date, servere sau terți. Descarcă fișierul PDF sau backup-ul JSON pentru păstrare offline înainte de reîncărcarea paginii."
            : "All claim tracking information is processed strictly in active browser memory. No data is stored on external servers or databases. Download your PDF or JSON backup before closing the tab."}
        </p>
      </div>

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT ACTIVITY ENTRY */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isActivityModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg p-6 sm:p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-2xl relative space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <h3 className="text-base font-heading font-bold text-white">
                  {editingActivity
                    ? isRo ? "Editează Eveniment" : "Edit Event"
                    : isRo ? "Adaugă Eveniment / Interacțiune" : "Add Event / Interaction"}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsActivityModalOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900 border border-zinc-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveActivity} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-medium">{isRo ? "Titlu Activitate *" : "Event Title *"}</label>
                  <Input
                    placeholder={isRo ? "Ex: Apel inspector daune, Trimitere factură service..." : "Ex: Call adjuster, Sent invoice..."}
                    value={actTitle}
                    onChange={(e) => setActTitle(e.target.value)}
                    required
                    className="h-10 bg-zinc-900 border-zinc-800 text-white rounded-xl text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">{isRo ? "Tip Interacțiune" : "Interaction Type"}</label>
                    <select
                      value={actType}
                      onChange={(e) => setActType(e.target.value as ActivityType)}
                      className="w-full h-10 px-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none"
                    >
                      {Object.entries(isRo ? ACTIVITY_TYPE_LABELS_RO : ACTIVITY_TYPE_LABELS_EN).map(([t, lbl]) => (
                        <option key={t} value={t}>
                          {lbl}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">{isRo ? "Persoană / Departament Contact" : "Contact / Department"}</label>
                    <Input
                      placeholder={isRo ? "Ex: Inspector Popescu, Call Center..." : "Ex: Adjuster..."}
                      value={actContact}
                      onChange={(e) => setActContact(e.target.value)}
                      className="h-10 bg-zinc-900 border-zinc-800 text-white rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">{isRo ? "Dată Eveniment *" : "Event Date *"}</label>
                    <Input
                      type="date"
                      value={actDate}
                      onChange={(e) => setActDate(e.target.value)}
                      required
                      className="h-10 bg-zinc-900 border-zinc-800 text-white rounded-xl text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">{isRo ? "Oră (Opțional)" : "Time (Optional)"}</label>
                    <Input
                      placeholder="HH:MM (Ex: 14:30)"
                      value={actTime}
                      onChange={(e) => setActTime(e.target.value)}
                      className="h-10 bg-zinc-900 border-zinc-800 text-white rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-medium">{isRo ? "Detalii & Conținut Discuție" : "Details & Notes"}</label>
                  <textarea
                    rows={2}
                    placeholder={isRo ? "Consemnează ce s-a stabilit, solicitările primite..." : "Record discussion details..."}
                    value={actNotes}
                    onChange={(e) => setActNotes(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">{isRo ? "Următorul Pas (Next Action)" : "Next Action"}</label>
                    <Input
                      placeholder={isRo ? "Ex: Trimitere deviz rectificat..." : "Ex: Send adjusted quote..."}
                      value={actNextAction}
                      onChange={(e) => setActNextAction(e.target.value)}
                      className="h-10 bg-zinc-900 border-zinc-800 text-white rounded-xl text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">{isRo ? "Dată Scadență Follow-up" : "Follow-up Due Date"}</label>
                    <Input
                      type="date"
                      value={actFollowUpDate}
                      onChange={(e) => setActFollowUpDate(e.target.value)}
                      className="h-10 bg-zinc-900 border-zinc-800 text-white rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsActivityModalOpen(false)}
                    className="flex-1 rounded-xl border-zinc-800 text-zinc-300 text-xs h-10"
                  >
                    {isRo ? "Anulează" : "Cancel"}
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10"
                  >
                    {isRo ? "Salvează Evenimentul" : "Save Event"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT DOCUMENT RECORD */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isDocModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg p-6 sm:p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-2xl relative space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <h3 className="text-base font-heading font-bold text-white">
                  {editingDoc
                    ? isRo ? "Editează Înregistrare Document" : "Edit Document Record"
                    : isRo ? "Adaugă Document în Registru" : "Add Document to Register"}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsDocModalOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900 border border-zinc-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveDoc} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-medium">{isRo ? "Denumire Document *" : "Document Name *"}</label>
                  <Input
                    placeholder={isRo ? "Ex: Proces-Verbal Poliție, Deviz Reparație..." : "Ex: Police Report, Repair Estimate..."}
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    required
                    className="h-10 bg-zinc-900 border-zinc-800 text-white rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-medium">{isRo ? "Status Transmitere" : "Submission Status"}</label>
                  <select
                    value={docStatus}
                    onChange={(e) => setDocStatus(e.target.value as DocRegisterStatus)}
                    className="w-full h-10 px-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none"
                  >
                    {Object.entries(isRo ? DOC_REGISTER_STATUS_RO : DOC_REGISTER_STATUS_EN).map(([s, lbl]) => (
                      <option key={s} value={s}>
                        {lbl}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">{isRo ? "Dată Solicitare" : "Date Requested"}</label>
                    <Input
                      type="date"
                      value={docDateRequested}
                      onChange={(e) => setDocDateRequested(e.target.value)}
                      className="h-10 bg-zinc-900 border-zinc-800 text-white rounded-xl text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">{isRo ? "Dată Transmitere" : "Date Submitted"}</label>
                    <Input
                      type="date"
                      value={docDateSubmitted}
                      onChange={(e) => setDocDateSubmitted(e.target.value)}
                      className="h-10 bg-zinc-900 border-zinc-800 text-white rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-medium">{isRo ? "Notițe (Opțional)" : "Notes (Optional)"}</label>
                  <Input
                    placeholder={isRo ? "Ex: Trimis în original / electronic..." : "Ex: Sent electronically..."}
                    value={docNotes}
                    onChange={(e) => setDocNotes(e.target.value)}
                    className="h-10 bg-zinc-900 border-zinc-800 text-white rounded-xl text-xs"
                  />
                </div>

                <div className="pt-3 border-t border-zinc-800 flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDocModalOpen(false)}
                    className="flex-1 rounded-xl border-zinc-800 text-zinc-300 text-xs h-10"
                  >
                    {isRo ? "Anulează" : "Cancel"}
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10"
                  >
                    {isRo ? "Salvează Documentul" : "Save Document"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* MODAL: CONFIRM CLEAR WORKSPACE */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isClearConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md p-6 rounded-3xl bg-zinc-950 border border-rose-500/30 shadow-2xl space-y-4 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">
                {isRo ? "Golești jurnalul de daună curent?" : "Clear active claims dossier?"}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {isRo
                  ? "Această acțiune va reseta toate evenimentele și documentele din memoria activă. Asigură-te că ai descărcat un raport PDF sau backup JSON."
                  : "This will clear all in-memory events and document records. Download a PDF or JSON backup first if needed."}
              </p>
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsClearConfirmOpen(false)}
                  className="flex-1 rounded-xl border-zinc-800 text-zinc-300 text-xs h-10"
                >
                  {isRo ? "Anulează" : "Cancel"}
                </Button>
                <Button
                  type="button"
                  onClick={handleClearWorkspace}
                  className="flex-1 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs h-10"
                >
                  {isRo ? "Da, Golește Tot" : "Yes, Clear All"}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
