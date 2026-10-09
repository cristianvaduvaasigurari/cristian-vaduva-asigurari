"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileEdit,
  Plus,
  Trash2,
  Edit3,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Send,
  FileCheck,
  FileText,
  Lock,
  ArrowRight,
  RotateCcw,
  X,
  Info,
  Search,
  Filter,
  Eye,
  SlidersHorizontal,
  HelpCircle,
  Calendar,
  Layers,
  Archive,
  MessageSquare,
  ShieldCheck,
  CheckSquare,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PolicyChangeRecord,
  PolicyChangeType,
  PolicyChangeStatus,
  SubmissionChannel,
  EventType,
  ChangeEvent,
  ConfirmationDetails,
  CHANGE_TYPE_INFO,
  STATUS_INFO,
  EVENT_TYPE_INFO,
  CHANNEL_LABELS,
  getFollowUpStatus,
  getChangeWarnings,
  generateChangeSummaryStats,
  generatePolicyChangePdf,
  validateImportedPolicyChangeData,
  PolicyChangeExportData,
} from "@/lib/policy-change-tracker";
import Link from "next/link";

const INITIAL_DEMO_RECORDS: PolicyChangeRecord[] = [
  {
    id: "chg_1",
    title: "Adăugare Clauză Panouri Fotovoltaice pe Acoperiș",
    relatedPolicyNickname: "Asigurare Locuință & PAD",
    category: "Locuință",
    insurer: "Allianz-Țiriac",
    changeType: "coverage_limit_value",
    description: "Solicitare includere sistem fotovoltaic 10kW instalat pe acoperiș și majorare limită bunuri/instalații cu 12.000 EUR.",
    reason: "Instalare recentă finalizată și recepționată.",
    dateIdentified: "2026-03-01",
    desiredEffectiveDate: "2026-03-15",
    dateSubmitted: "2026-03-02",
    submissionChannel: "email",
    status: "info_supplied",
    nextFollowUpDate: "2026-10-15",
    notes: "Am trimis factura de achiziție a panourilor și certificatul de garanție.",
    confirmationDetails: undefined,
    events: [
      {
        id: "ev_1",
        date: "2026-03-01",
        eventType: "draft_created",
        title: "Identificare necesitate extindere acoperire",
        notes: "Recepție panouri solare finalizată.",
      },
      {
        id: "ev_2",
        date: "2026-03-02",
        eventType: "request_submitted",
        title: "Email trimis către subscriitor",
        notes: "Atașat factură panouri.",
      },
      {
        id: "ev_3",
        date: "2026-03-04",
        eventType: "info_requested",
        title: "Asiguratorul a cerut autorizația de construire / dosarul de prosumator",
        notes: "Solicitare primită de la departamentul tehnic.",
      },
      {
        id: "ev_4",
        date: "2026-03-05",
        eventType: "info_supplied",
        title: "Documente prosumator transmise pe email",
        notes: "Așteptare confirmare calcul diferență de primă.",
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "chg_2",
    title: "Modificare Adresă Garare & Domiciliu CASCO",
    relatedPolicyNickname: "CASCO Autoturism Principal",
    category: "CASCO",
    insurer: "Omniasig VIG",
    changeType: "address_property",
    description: "Actualizare adresă de parcare pe timp de noapte de la garaj exterior la curte privată supravegheată.",
    reason: "Mutare la noua reședință.",
    dateIdentified: "2026-02-20",
    desiredEffectiveDate: "2026-03-01",
    dateSubmitted: "2026-02-22",
    submissionChannel: "advisor",
    status: "updated_policy_received",
    nextFollowUpDate: undefined,
    notes: "Actul adițional a fost primit și arhivat.",
    confirmationDetails: {
      confirmationDate: "2026-02-28",
      confirmationChannel: "Email broker",
      sourceReferenceTitle: "Act Adițional CASCO Nr. 2/2026",
      hasUpdatedDocumentReceived: true,
      notes: "Fără diferență de primă.",
    },
    events: [
      {
        id: "ev_21",
        date: "2026-02-22",
        eventType: "request_submitted",
        title: "Cerere transmisă prin consilier",
      },
      {
        id: "ev_22",
        date: "2026-02-28",
        eventType: "written_confirmation",
        title: "Act adițional emis și semnat primit pe email",
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function PolicyChangeTracker() {
  const [records, setRecords] = useState<PolicyChangeRecord[]>(INITIAL_DEMO_RECORDS);
  const [activeTab, setActiveTab] = useState<"register" | "timeline" | "warnings" | "report">("register");

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterChangeType, setFilterChangeType] = useState<string>("all");
  const [filterFollowUp, setFilterFollowUp] = useState<string>("all");

  // Modals & States
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<PolicyChangeRecord | null>(null);
  const [recordFormData, setRecordFormData] = useState<Partial<PolicyChangeRecord>>({
    changeType: "address_property",
    status: "draft",
    submissionChannel: "email",
    category: "General",
  });

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [targetRecordForEvent, setTargetRecordForEvent] = useState<PolicyChangeRecord | null>(null);
  const [eventFormData, setEventFormData] = useState<Partial<ChangeEvent>>({
    eventType: "request_submitted",
    date: new Date().toISOString().split("T")[0],
  });

  const [recordToDelete, setRecordToDelete] = useState<PolicyChangeRecord | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [userNotes, setUserNotes] = useState("");
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);

  const stats = useMemo(() => generateChangeSummaryStats(records), [records]);

  // Filtered records
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = r.title.toLowerCase().includes(q);
        const matchNick = r.relatedPolicyNickname.toLowerCase().includes(q);
        const matchIns = r.insurer?.toLowerCase().includes(q);
        const matchDesc = r.description.toLowerCase().includes(q);
        const matchReason = r.reason?.toLowerCase().includes(q);
        if (!matchTitle && !matchNick && !matchIns && !matchDesc && !matchReason) return false;
      }
      if (filterCategory !== "all" && r.category !== filterCategory) return false;
      if (filterStatus !== "all" && r.status !== filterStatus) return false;
      if (filterChangeType !== "all" && r.changeType !== filterChangeType) return false;
      if (filterFollowUp !== "all") {
        const fu = getFollowUpStatus(r.nextFollowUpDate);
        if (filterFollowUp === "overdue" && fu.status !== "overdue") return false;
        if (filterFollowUp === "upcoming" && fu.status !== "upcoming_7_days" && fu.status !== "due_today") return false;
      }
      return true;
    });
  }, [records, searchQuery, filterCategory, filterStatus, filterChangeType, filterFollowUp]);

  // Categories list derived from records
  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    records.forEach((r) => {
      if (r.category) set.add(r.category);
    });
    return Array.from(set);
  }, [records]);

  // Handlers for Record Modal
  const handleOpenAddRecord = () => {
    setRecordFormData({
      title: "",
      relatedPolicyNickname: "",
      category: "General",
      changeType: "address_property",
      status: "draft",
      submissionChannel: "email",
      description: "",
      events: [],
    });
    setEditingRecord(null);
    setIsRecordModalOpen(true);
  };

  const handleOpenEditRecord = (rec: PolicyChangeRecord) => {
    setRecordFormData({ ...rec });
    setEditingRecord(rec);
    setIsRecordModalOpen(true);
  };

  const handleSaveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recordFormData.title || !recordFormData.title.trim()) return;
    if (!recordFormData.relatedPolicyNickname || !recordFormData.relatedPolicyNickname.trim()) return;
    if (!recordFormData.description || !recordFormData.description.trim()) return;

    const now = new Date().toISOString();

    if (editingRecord) {
      setRecords((prev) =>
        prev.map((r) =>
          r.id === editingRecord.id
            ? ({
                ...r,
                ...recordFormData,
                title: recordFormData.title!.trim(),
                relatedPolicyNickname: recordFormData.relatedPolicyNickname!.trim(),
                description: recordFormData.description!.trim(),
                updatedAt: now,
              } as PolicyChangeRecord)
            : r
        )
      );
    } else {
      const initialEvents: ChangeEvent[] = [
        {
          id: `ev_${Date.now()}`,
          date: recordFormData.dateIdentified || new Date().toISOString().split("T")[0],
          eventType: "draft_created",
          title: "Cerere inițiată în tracker",
        },
      ];

      const newRecord: PolicyChangeRecord = {
        id: `chg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        title: recordFormData.title.trim(),
        relatedPolicyNickname: recordFormData.relatedPolicyNickname.trim(),
        category: recordFormData.category || "General",
        insurer: recordFormData.insurer?.trim() || undefined,
        changeType: recordFormData.changeType || "other",
        description: recordFormData.description.trim(),
        reason: recordFormData.reason?.trim() || undefined,
        dateIdentified: recordFormData.dateIdentified || undefined,
        desiredEffectiveDate: recordFormData.desiredEffectiveDate || undefined,
        dateSubmitted: recordFormData.dateSubmitted || undefined,
        submissionChannel: recordFormData.submissionChannel || undefined,
        status: recordFormData.status || "draft",
        nextFollowUpDate: recordFormData.nextFollowUpDate || undefined,
        notes: recordFormData.notes?.trim() || undefined,
        confirmationDetails: recordFormData.confirmationDetails || undefined,
        events: initialEvents,
        createdAt: now,
        updatedAt: now,
      };

      setRecords((prev) => [newRecord, ...prev]);
    }

    setIsRecordModalOpen(false);
    setEditingRecord(null);
  };

  // Handlers for Event Modal
  const handleOpenAddEvent = (record: PolicyChangeRecord) => {
    setTargetRecordForEvent(record);
    setEventFormData({
      date: new Date().toISOString().split("T")[0],
      eventType: "contact_made",
      title: "",
      notes: "",
    });
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetRecordForEvent || !eventFormData.title || !eventFormData.title.trim()) return;

    const newEvent: ChangeEvent = {
      id: `ev_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      date: eventFormData.date || new Date().toISOString().split("T")[0],
      time: eventFormData.time || undefined,
      eventType: eventFormData.eventType || "other",
      title: eventFormData.title.trim(),
      notes: eventFormData.notes?.trim() || undefined,
      followUpAction: eventFormData.followUpAction?.trim() || undefined,
      followUpDate: eventFormData.followUpDate || undefined,
    };

    setRecords((prev) =>
      prev.map((r) =>
        r.id === targetRecordForEvent.id
          ? {
              ...r,
              events: [newEvent, ...r.events],
              nextFollowUpDate: eventFormData.followUpDate || r.nextFollowUpDate,
              updatedAt: new Date().toISOString(),
            }
          : r
      )
    );

    setIsEventModalOpen(false);
    setTargetRecordForEvent(null);
  };

  // Deletion & Reset
  const handleDeleteRecord = () => {
    if (!recordToDelete) return;
    setRecords((prev) => prev.filter((r) => r.id !== recordToDelete.id));
    setRecordToDelete(null);
  };

  const handleResetWorkspace = () => {
    setRecords([]);
    setUserNotes("");
    setIsResetConfirmOpen(false);
  };

  // JSON Export & Import
  const handleExportJson = () => {
    const exportData: PolicyChangeExportData = {
      schemaVersion: "1.0",
      exportedAt: new Date().toISOString(),
      userNotes: userNotes.trim() || undefined,
      records,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registru-modificari-polite-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        const result = validateImportedPolicyChangeData(parsed);

        if (!result.valid || !result.data) {
          setImportError(result.error || "Fișierul JSON nu este valid.");
          setImportSuccess(null);
          return;
        }

        setRecords(result.data.records);
        if (result.data.userNotes) setUserNotes(result.data.userNotes);
        setImportError(null);
        setImportSuccess(`Au fost importate cu succes ${result.data.records.length} cereri de modificare!`);
        setTimeout(() => setImportSuccess(null), 5000);
      } catch {
        setImportError("Eroare la procesarea fișierului JSON. Verificați formatul.");
        setImportSuccess(null);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleExportPdf = () => {
    const exportData: PolicyChangeExportData = {
      schemaVersion: "1.0",
      exportedAt: new Date().toISOString(),
      userNotes: userNotes.trim() || undefined,
      records,
    };
    generatePolicyChangePdf(exportData);
  };

  return (
    <div className="space-y-8">
      {/* Top KPI Metrics Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Total Cereri</div>
          <div className="text-2xl sm:text-3xl font-bold text-zinc-900 mt-1">{stats.totalRequests}</div>
          <div className="text-[11px] text-zinc-500 mt-1">Înregistrate manual</div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">În Așteptare</div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-400 mt-1">{stats.awaitingResponseCount}</div>
          <div className="text-[11px] text-zinc-500 mt-1">Răspuns asigurator</div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Info Suplimentare</div>
          <div className="text-2xl sm:text-3xl font-bold text-purple-400 mt-1">{stats.infoRequestedCount}</div>
          <div className="text-[11px] text-zinc-500 mt-1">Cerute de companie</div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Confirmat Scris</div>
          <div className="text-2xl sm:text-3xl font-bold text-teal-400 mt-1">{stats.writtenConfirmationCount}</div>
          <div className="text-[11px] text-zinc-500 mt-1">Acord documentat</div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Document Primit</div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mt-1">{stats.updatedDocumentCount}</div>
          <div className="text-[11px] text-zinc-500 mt-1">Act adițional arhivat</div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Follow-Up Depășit</div>
          <div className="text-2xl sm:text-3xl font-bold text-red-400 mt-1">{stats.overdueFollowUpsCount}</div>
          <div className="text-[11px] text-zinc-500 mt-1">Scadențe trecute</div>
        </div>
      </div>

      {/* Main Tab Bar & Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-zinc-200 rounded-xl overflow-x-auto">
          <button
            onClick={() => setActiveTab("register")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === "register"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-zinc-500 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <FileEdit className="w-3.5 h-3.5" />
            <span>Registru Modificări ({records.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("timeline")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === "timeline"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-zinc-500 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Cronologie Evenimente</span>
          </button>

          <button
            onClick={() => setActiveTab("warnings")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === "warnings"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-zinc-500 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Alerte & Scadențe ({stats.overdueFollowUpsCount + stats.approvalReportedCount})</span>
          </button>

          <button
            onClick={() => setActiveTab("report")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === "report"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-zinc-500 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Raport & Export</span>
          </button>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            onClick={handleOpenAddRecord}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-xs font-semibold shadow-md shadow-blue-900/20"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Adaugă Modificare
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportPdf}
            className="border-zinc-300 bg-zinc-800/60 text-zinc-600 hover:text-white hover:bg-zinc-800 text-xs"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            PDF
          </Button>
        </div>
      </div>

      {/* Notifications */}
      {importSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{importSuccess}</span>
        </div>
      )}
      {importError && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{importError}</span>
        </div>
      )}

      {/* TAB 1: CHANGE REQUESTS REGISTER */}
      {activeTab === "register" && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Caută în cereri, poliță, descriere, motiv..."
                className="pl-9 bg-zinc-50 border-zinc-200 text-xs text-white placeholder:text-zinc-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <select
              value={filterChangeType}
              onChange={(e) => setFilterChangeType(e.target.value)}
              className="bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs text-zinc-600 focus:outline-none focus:border-blue-500"
            >
              <option value="all">Toate Tipurile de Modificări</option>
              {Object.keys(CHANGE_TYPE_INFO).map((k) => (
                <option key={k} value={k}>
                  {CHANGE_TYPE_INFO[k as PolicyChangeType].labelRo}
                </option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs text-zinc-600 focus:outline-none focus:border-blue-500"
            >
              <option value="all">Toate Statusurile</option>
              {Object.keys(STATUS_INFO).map((k) => (
                <option key={k} value={k}>
                  {STATUS_INFO[k as PolicyChangeStatus].labelRo}
                </option>
              ))}
            </select>
          </div>

          {/* Records Cards */}
          {filteredRecords.length > 0 ? (
            <div className="space-y-4">
              {filteredRecords.map((r) => {
                const changeTypeInfo = CHANGE_TYPE_INFO[r.changeType];
                const statusInfo = STATUS_INFO[r.status];
                const warnings = getChangeWarnings(r);
                const followUp = getFollowUpStatus(r.nextFollowUpDate);

                return (
                  <div
                    key={r.id}
                    className="bg-white border border-zinc-200 hover:border-zinc-300 rounded-2xl p-5 transition-all space-y-4 shadow-lg shadow-black/10"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-800 text-blue-400 border border-zinc-300">
                            {changeTypeInfo.labelRo}
                          </span>
                          <span className="text-xs text-zinc-500 font-medium">
                            Poliță: <strong className="text-zinc-800">{r.relatedPolicyNickname}</strong>
                          </span>
                          {r.insurer && (
                            <span className="text-xs text-zinc-500">({r.insurer})</span>
                          )}
                        </div>
                        <h4 className="text-base font-bold text-zinc-900">{r.title}</h4>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border shrink-0 ${
                          statusInfo.color === "emerald"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : statusInfo.color === "teal"
                            ? "bg-teal-500/10 text-teal-400 border-teal-500/20"
                            : statusInfo.color === "purple"
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                            : statusInfo.color === "amber"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : statusInfo.color === "red"
                            ? "bg-red-500/10 text-red-400 border-red-500/20"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        }`}
                      >
                        {statusInfo.labelRo}
                      </span>
                    </div>

                    {/* Description & Reason */}
                    <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/60 text-xs text-zinc-600 space-y-1.5">
                      <div>
                        <span className="text-zinc-500 font-semibold">Descriere solicitare: </span>
                        <span>{r.description}</span>
                      </div>
                      {r.reason && (
                        <div>
                          <span className="text-zinc-500 font-semibold">Motivație / context: </span>
                          <span className="text-zinc-500">{r.reason}</span>
                        </div>
                      )}
                    </div>

                    {/* Dates & Submission info */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-zinc-500 p-2.5 bg-zinc-50/30 rounded-lg border border-zinc-200/50">
                      <div>
                        <span className="text-zinc-500 block">Identificată la:</span>
                        <span className="text-zinc-800 font-medium">{r.dateIdentified || "Nespecificată"}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">Data dorită:</span>
                        <span className="text-zinc-800 font-medium">{r.desiredEffectiveDate || "Nespecificată"}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">Transmisă prin:</span>
                        <span className="text-zinc-800 font-medium">
                          {r.submissionChannel ? CHANNEL_LABELS[r.submissionChannel] : "Nespecificat"}
                        </span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">Următorul Follow-up:</span>
                        <span
                          className={`font-medium ${
                            followUp.status === "overdue"
                              ? "text-red-400"
                              : followUp.status === "due_today" || followUp.status === "upcoming_7_days"
                              ? "text-amber-400"
                              : "text-zinc-800"
                          }`}
                        >
                          {r.nextFollowUpDate || "Fără scadență"}
                        </span>
                      </div>
                    </div>

                    {/* Warnings List */}
                    {warnings.length > 0 && (
                      <div className="space-y-1.5">
                        {warnings.map((w, idx) => (
                          <div
                            key={idx}
                            className={`p-2.5 rounded-lg text-xs flex items-start gap-2 border ${
                              w.severity === "alert"
                                ? "bg-red-500/10 border-red-500/20 text-red-300"
                                : w.severity === "warning"
                                ? "bg-amber-500/10 border-amber-500/20 text-amber-800"
                                : "bg-blue-500/10 border-blue-500/20 text-blue-800"
                            }`}
                          >
                            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <span>{w.messageRo}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Confirmation details if any */}
                    {r.confirmationDetails && (
                      <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-zinc-800 space-y-1">
                        <div className="font-semibold text-teal-300 flex items-center gap-1.5">
                          <CheckSquare className="w-4 h-4" />
                          <span>Detalii Confirmare Înregistrată</span>
                        </div>
                        <div className="text-[11px] text-zinc-600">
                          Confirmat la: <strong>{r.confirmationDetails.confirmationDate || "Dată nespecificată"}</strong> via {r.confirmationDetails.confirmationChannel || "canal n/a"}
                        </div>
                        {r.confirmationDetails.sourceReferenceTitle && (
                          <div className="text-[11px] text-zinc-500">
                            Document referință: {r.confirmationDetails.sourceReferenceTitle}
                          </div>
                        )}
                        <div className="text-[11px] flex items-center gap-1.5 pt-0.5">
                          <span>Act adițional primit:</span>
                          {r.confirmationDetails.hasUpdatedDocumentReceived ? (
                            <span className="text-emerald-400 font-semibold">Da (Arhivat)</span>
                          ) : (
                            <span className="text-amber-400 font-semibold">Nu (În așteptare act)</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Event Snippet & Action Bar */}
                    <div className="pt-3 border-t border-zinc-200/80 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-zinc-500">
                        {r.events.length} evenimente înregistrate în istoric
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOpenAddEvent(r)}
                          className="border-zinc-300 bg-zinc-800/60 text-xs text-zinc-800 hover:text-white"
                        >
                          <Plus className="w-3.5 h-3.5 mr-1" />
                          Adaugă Eveniment
                        </Button>

                        <button
                          onClick={() => handleOpenEditRecord(r)}
                          className="p-1.5 rounded-lg bg-zinc-800 text-zinc-600 hover:text-white hover:bg-zinc-700 transition-colors"
                          title="Editează cererea"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setRecordToDelete(r)}
                          className="p-1.5 rounded-lg bg-zinc-800 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Șterge cererea"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-zinc-50 border border-zinc-200/60 rounded-2xl">
              <FileEdit className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-zinc-600">Nicio cerere de modificare înregistrată</h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                Adaugă prima solicitare de modificare a contractului tău (schimbare adresă, adăugare echipamente, modificare sumă asigurată).
              </p>
              <Button onClick={handleOpenAddRecord} size="sm" className="mt-4 bg-blue-600 hover:bg-blue-500 text-xs">
                <Plus className="w-3.5 h-3.5 mr-1" />
                Adaugă Modificare
              </Button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: EVENT TIMELINE LOG */}
      {activeTab === "timeline" && (
        <div className="space-y-6">
          <div className="bg-zinc-50 border border-zinc-200/60 rounded-xl p-4 text-xs text-zinc-500 flex items-start gap-3">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-zinc-800">Cronologie evenimente:</span> Fiecare etapă de comunicare (solicitare transmisă, documente cerute, confirmare primită) este logată cronologic pentru a avea o evidență clară în cazul unor neînțelegeri cu asiguratorul.
            </div>
          </div>

          <div className="space-y-6">
            {records.map((r) => (
              <div key={r.id} className="bg-white border border-zinc-200 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900">{r.title}</h3>
                    <div className="text-xs text-zinc-500">Poliță: {r.relatedPolicyNickname}</div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenAddEvent(r)}
                    className="border-zinc-300 bg-zinc-800 text-xs text-zinc-800"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    Adaugă Eveniment
                  </Button>
                </div>

                {r.events.length > 0 ? (
                  <div className="relative pl-6 border-l border-zinc-200 space-y-4 pt-1">
                    {r.events.map((ev) => {
                      const evInfo = EVENT_TYPE_INFO[ev.eventType];

                      return (
                        <div key={ev.id} className="relative">
                          <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-zinc-900" />
                          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 text-xs space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-semibold text-zinc-800">{ev.title}</span>
                              <span className="text-[10px] text-zinc-500">{ev.date} {ev.time || ""}</span>
                            </div>
                            <div className="text-[11px] text-blue-400">{evInfo?.labelRo || ev.eventType}</div>
                            {ev.notes && <div className="text-zinc-500 text-xs mt-1">{ev.notes}</div>}
                            {ev.followUpAction && (
                              <div className="text-amber-400 text-[11px] pt-1">
                                Acțiune necesară: {ev.followUpAction} {ev.followUpDate ? `(până la ${ev.followUpDate})` : ""}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-xs text-zinc-500 italic">
                    Niciun eveniment notat încă.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: WARNINGS & DEADLINES */}
      {activeTab === "warnings" && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-zinc-900">Alerte de Procedură & Urmărire Scadențe</h3>
            </div>

            <p className="text-xs text-zinc-500">
              Verifică situațiile în care data dorită de intrare în vigoare a trecut fără confirmare scrisă sau în care a fost notată o aprobare verbală neînsoțită de documente oficiale.
            </p>

            {/* Overdue follow ups */}
            {records.filter((r) => getFollowUpStatus(r.nextFollowUpDate).status === "overdue").length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                  ⚠️ Termene de Follow-up Depășite
                </div>
                {records
                  .filter((r) => getFollowUpStatus(r.nextFollowUpDate).status === "overdue")
                  .map((r) => (
                    <div
                      key={r.id}
                      className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-zinc-800 flex items-center justify-between gap-3"
                    >
                      <div>
                        <span className="font-semibold text-white">{r.title}</span> — Scadență contact: {r.nextFollowUpDate}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleOpenEditRecord(r)}
                        className="bg-zinc-800 hover:bg-zinc-700 text-xs"
                      >
                        Actualizează
                      </Button>
                    </div>
                  ))}
              </div>
            )}

            {/* Approvals without written confirmation */}
            {records.filter((r) => r.status === "approval_reported").length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  ⚠️ Aprobări Verbale / Neoficiale Neînsoțite de Act Scris
                </div>
                {records
                  .filter((r) => r.status === "approval_reported")
                  .map((r) => (
                    <div
                      key={r.id}
                      className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-zinc-800 flex items-center justify-between gap-3"
                    >
                      <div>
                        <span className="font-semibold text-white">{r.title}</span> — Atenție: Asigurarea nu produce efecte fără document oficial emis.
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleOpenEditRecord(r)}
                        className="bg-zinc-800 hover:bg-zinc-700 text-xs"
                      >
                        Înregistrează confirmare
                      </Button>
                    </div>
                  ))}
              </div>
            )}

            {/* Effective date passed */}
            {records.filter((r) => getChangeWarnings(r).some((w) => w.type === "effective_date_passed")).length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
                  ⚠️ Data Dorită de Intrare în Vigoare a Trecut
                </div>
                {records
                  .filter((r) => getChangeWarnings(r).some((w) => w.type === "effective_date_passed"))
                  .map((r) => (
                    <div
                      key={r.id}
                      className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl text-xs text-zinc-800 flex items-center justify-between gap-3"
                    >
                      <div>
                        <span className="font-semibold text-white">{r.title}</span> — Data dorită: {r.desiredEffectiveDate}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleOpenEditRecord(r)}
                        className="bg-zinc-800 hover:bg-zinc-700 text-xs"
                      >
                        Verifică status
                      </Button>
                    </div>
                  ))}
              </div>
            )}

            {stats.overdueFollowUpsCount === 0 && stats.approvalReportedCount === 0 && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Toate cererile active sunt în grafic, fără scadențe depășite sau aprobări nesusținute documentar!</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: REPORT & BACKUP */}
      {activeTab === "report" && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-zinc-900">Export & Backup Registru Modificări</h3>
              <p className="text-xs text-zinc-500 mt-1">
                Descarcă un dosar PDF structurat sau salvează un backup JSON securizat local în memoria browserului.
              </p>
            </div>

            {/* User notes */}
            <div>
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2">
                Notițe Generale / Urmărire Acte Adiționale
              </label>
              <textarea
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="Ex: Am transmis cererea pentru panourile solare, urmează să primesc actul adițional în 3 zile lucrătoare..."
                rows={3}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-800 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 flex flex-col justify-between">
                <div>
                  <FileText className="w-6 h-6 text-blue-400 mb-2" />
                  <h4 className="text-sm font-semibold text-white">Raport PDF Structurat</h4>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Document PDF cu inventarul cererilor, cronologia evenimentelor și stadiul actelor adiționale.
                  </p>
                </div>
                <Button onClick={handleExportPdf} className="mt-4 bg-blue-600 hover:bg-blue-500 text-xs">
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Descarcă PDF
                </Button>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 flex flex-col justify-between">
                <div>
                  <Download className="w-6 h-6 text-emerald-400 mb-2" />
                  <h4 className="text-sm font-semibold text-white">Export JSON Backup</h4>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Fișier securizat local pentru transfer între calculatoare sau sesiuni viitoare.
                  </p>
                </div>
                <Button onClick={handleExportJson} variant="outline" className="mt-4 border-zinc-300 text-xs">
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Export JSON
                </Button>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 flex flex-col justify-between">
                <div>
                  <Upload className="w-6 h-6 text-purple-400 mb-2" />
                  <h4 className="text-sm font-semibold text-white">Import Fișier JSON</h4>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Încarcă un backup JSON salvat anterior pentru a continua urmărirea.
                  </p>
                </div>
                <label className="mt-4 inline-flex items-center justify-center rounded-md text-xs font-medium border border-zinc-300 bg-zinc-800 px-4 py-2 text-zinc-800 hover:bg-zinc-700 cursor-pointer">
                  <Upload className="w-3.5 h-3.5 mr-1.5" />
                  <span>Încarcă Fișier</span>
                  <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
                </label>
              </div>
            </div>

            {/* Contextual Link to Evidence Register */}
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="font-semibold text-blue-800">Dorești să înregistrezi documentul oficial primit?</span>
                <p className="text-zinc-500 text-[11px] mt-0.5">
                  Poți nota specificațiile și clauzele actului adițional în Registrul de Documentare & Surse.
                </p>
              </div>
              <Link
                href="/registru-documentare"
                className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg inline-flex items-center gap-1 font-medium shrink-0"
              >
                <span>Deschide Registru Surse</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            {/* Privacy note & Reset button */}
            <div className="pt-6 border-t border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Toate informațiile rămân strict în memoria browserului tău și nu sunt trimise către servere.</span>
              </div>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => setIsResetConfirmOpen(true)}
                className="text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                Resetează Registrul
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT CHANGE RECORD */}
      <AnimatePresence>
        {isRecordModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-zinc-200 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                    <FileEdit className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900">
                    {editingRecord ? "Editează Cerere de Modificare" : "Adaugă Cerere de Modificare"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsRecordModalOpen(false)}
                  className="text-zinc-500 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveRecord} className="p-6 overflow-y-auto space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-600 font-semibold mb-1">
                    Titlu Scurt Solicitare <span className="text-red-400">*</span>
                  </label>
                  <Input
                    required
                    value={recordFormData.title || ""}
                    onChange={(e) => setRecordFormData({ ...recordFormData, title: e.target.value })}
                    placeholder="Ex: Adăugare panouri fotovoltaice, Schimbare adresă CASCO..."
                    className="bg-zinc-50 border-zinc-200 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-zinc-600 font-semibold mb-1">
                      Poliță Asociată <span className="text-red-400">*</span>
                    </label>
                    <Input
                      required
                      value={recordFormData.relatedPolicyNickname || ""}
                      onChange={(e) => setRecordFormData({ ...recordFormData, relatedPolicyNickname: e.target.value })}
                      placeholder="Ex: CASCO BMW, Locuință..."
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Categorie Asigurare</label>
                    <Input
                      value={recordFormData.category || ""}
                      onChange={(e) => setRecordFormData({ ...recordFormData, category: e.target.value })}
                      placeholder="Ex: CASCO, Locuință, RCA..."
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Companie Asigurare</label>
                    <Input
                      value={recordFormData.insurer || ""}
                      onChange={(e) => setRecordFormData({ ...recordFormData, insurer: e.target.value })}
                      placeholder="Ex: Allianz, Omniasig, Generali..."
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Tip Modificare</label>
                    <select
                      value={recordFormData.changeType || "address_property"}
                      onChange={(e) => setRecordFormData({ ...recordFormData, changeType: e.target.value as PolicyChangeType })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-800 focus:outline-none focus:border-blue-500"
                    >
                      {Object.keys(CHANGE_TYPE_INFO).map((k) => (
                        <option key={k} value={k}>
                          {CHANGE_TYPE_INFO[k as PolicyChangeType].labelRo}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Status Solicitare</label>
                    <select
                      value={recordFormData.status || "draft"}
                      onChange={(e) => setRecordFormData({ ...recordFormData, status: e.target.value as PolicyChangeStatus })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-800 focus:outline-none focus:border-blue-500"
                    >
                      {Object.keys(STATUS_INFO).map((k) => (
                        <option key={k} value={k}>
                          {STATUS_INFO[k as PolicyChangeStatus].labelRo}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-600 font-semibold mb-1">
                    Descriere Solicitare / Detalii exacte <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    required
                    value={recordFormData.description || ""}
                    onChange={(e) => setRecordFormData({ ...recordFormData, description: e.target.value })}
                    placeholder="Descrie exact ce dorești să fie modificat în contractul de asigurare..."
                    rows={3}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs text-zinc-800 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-600 font-medium mb-1">Motiv / Context (Opțional)</label>
                  <Input
                    value={recordFormData.reason || ""}
                    onChange={(e) => setRecordFormData({ ...recordFormData, reason: e.target.value })}
                    placeholder="Ex: Achiziție recentă, schimbare buletin, extindere clădire..."
                    className="bg-zinc-50 border-zinc-200 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Data Identificării</label>
                    <Input
                      type="date"
                      value={recordFormData.dateIdentified || ""}
                      onChange={(e) => setRecordFormData({ ...recordFormData, dateIdentified: e.target.value })}
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Data Dorită Intrare în Vigoare</label>
                    <Input
                      type="date"
                      value={recordFormData.desiredEffectiveDate || ""}
                      onChange={(e) => setRecordFormData({ ...recordFormData, desiredEffectiveDate: e.target.value })}
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Data Transmiterii Cererii</label>
                    <Input
                      type="date"
                      value={recordFormData.dateSubmitted || ""}
                      onChange={(e) => setRecordFormData({ ...recordFormData, dateSubmitted: e.target.value })}
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Canal de Transmitere</label>
                    <select
                      value={recordFormData.submissionChannel || "email"}
                      onChange={(e) => setRecordFormData({ ...recordFormData, submissionChannel: e.target.value as SubmissionChannel })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-800 focus:outline-none focus:border-blue-500"
                    >
                      {Object.keys(CHANNEL_LABELS).map((k) => (
                        <option key={k} value={k}>
                          {CHANNEL_LABELS[k as SubmissionChannel]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Următorul Termen de Contact (Follow-up)</label>
                    <Input
                      type="date"
                      value={recordFormData.nextFollowUpDate || ""}
                      onChange={(e) => setRecordFormData({ ...recordFormData, nextFollowUpDate: e.target.value })}
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Optional confirmation section */}
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-3">
                  <div className="font-semibold text-zinc-800 text-xs">
                    Detalii Confirmare Scrisă (Dacă este aplicabil)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      type="date"
                      placeholder="Data confirmării"
                      value={recordFormData.confirmationDetails?.confirmationDate || ""}
                      onChange={(e) =>
                        setRecordFormData({
                          ...recordFormData,
                          confirmationDetails: {
                            ...recordFormData.confirmationDetails,
                            confirmationDate: e.target.value,
                          },
                        })
                      }
                      className="bg-white border-zinc-300 text-xs text-white"
                    />
                    <Input
                      placeholder="Canal confirmare (ex: Email broker)"
                      value={recordFormData.confirmationDetails?.confirmationChannel || ""}
                      onChange={(e) =>
                        setRecordFormData({
                          ...recordFormData,
                          confirmationDetails: {
                            ...recordFormData.confirmationDetails,
                            confirmationChannel: e.target.value,
                          },
                        })
                      }
                      className="bg-white border-zinc-300 text-xs text-white"
                    />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer text-zinc-600 text-xs">
                    <input
                      type="checkbox"
                      checked={recordFormData.confirmationDetails?.hasUpdatedDocumentReceived || false}
                      onChange={(e) =>
                        setRecordFormData({
                          ...recordFormData,
                          confirmationDetails: {
                            ...recordFormData.confirmationDetails,
                            hasUpdatedDocumentReceived: e.target.checked,
                          },
                        })
                      }
                      className="rounded bg-white border-zinc-300 text-blue-600 focus:ring-0"
                    />
                    <span>Actul adițional / polița modificată a fost primită oficial</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-zinc-200 flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsRecordModalOpen(false)}
                    className="border-zinc-300 text-xs"
                  >
                    Anulează
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs">
                    {editingRecord ? "Salvează Modificările" : "Adaugă Cererea"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD EVENT */}
      <AnimatePresence>
        {isEventModalOpen && targetRecordForEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-zinc-200 rounded-2xl w-full max-w-lg flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900">Adaugă Eveniment în Cronologie</h3>
                </div>
                <button
                  onClick={() => setIsEventModalOpen(false)}
                  className="text-zinc-500 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEvent} className="p-6 space-y-4 text-xs">
                <div>
                  <div className="text-zinc-500 mb-2">
                    Cerere: <strong className="text-white">{targetRecordForEvent.title}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Dată Eveniment</label>
                    <Input
                      type="date"
                      required
                      value={eventFormData.date || ""}
                      onChange={(e) => setEventFormData({ ...eventFormData, date: e.target.value })}
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Tip Eveniment</label>
                    <select
                      value={eventFormData.eventType || "contact_made"}
                      onChange={(e) => setEventFormData({ ...eventFormData, eventType: e.target.value as EventType })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-800 focus:outline-none focus:border-blue-500"
                    >
                      {Object.keys(EVENT_TYPE_INFO).map((k) => (
                        <option key={k} value={k}>
                          {EVENT_TYPE_INFO[k as EventType].labelRo}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-600 font-semibold mb-1">
                    Titlu Eveniment <span className="text-red-400">*</span>
                  </label>
                  <Input
                    required
                    value={eventFormData.title || ""}
                    onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
                    placeholder="Ex: Email primit de la asigurator, Transmis dosar tehnic..."
                    className="bg-zinc-50 border-zinc-200 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-600 font-medium mb-1">Observații / Notițe</label>
                  <textarea
                    value={eventFormData.notes || ""}
                    onChange={(e) => setEventFormData({ ...eventFormData, notes: e.target.value })}
                    placeholder="Detalii despre ce s-a discutat sau convenit..."
                    rows={2}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs text-zinc-800 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Acțiune de Follow-up (Opțional)</label>
                    <Input
                      value={eventFormData.followUpAction || ""}
                      onChange={(e) => setEventFormData({ ...eventFormData, followUpAction: e.target.value })}
                      placeholder="Ex: Revenire cu apel dacă nu primesc răspuns..."
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Dată Scadență Follow-up</label>
                    <Input
                      type="date"
                      value={eventFormData.followUpDate || ""}
                      onChange={(e) => setEventFormData({ ...eventFormData, followUpDate: e.target.value })}
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-200 flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEventModalOpen(false)}
                    className="border-zinc-300 text-xs"
                  >
                    Anulează
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs">
                    Adaugă în Cronologie
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: CONFIRM DELETE */}
      <AnimatePresence>
        {recordToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-zinc-200 rounded-2xl w-full max-w-md p-6 text-xs shadow-2xl"
            >
              <div className="flex items-center gap-3 text-red-400 mb-3">
                <Trash2 className="w-5 h-5" />
                <h3 className="text-sm font-bold text-zinc-900">Confirmă Ștergerea Solicitării</h3>
              </div>
              <p className="text-zinc-600 mb-4">
                Sigur dorești să ștergi solicitarea <strong className="text-white">&ldquo;{recordToDelete.title}&rdquo;</strong> și întreg istoricul său?
              </p>
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRecordToDelete(null)}
                  className="border-zinc-300 text-xs"
                >
                  Anulează
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteRecord}
                  className="bg-red-600 hover:bg-red-500 text-xs"
                >
                  Șterge Definitiv
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: CONFIRM RESET WORKSPACE */}
      <AnimatePresence>
        {isResetConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-zinc-200 rounded-2xl w-full max-w-md p-6 text-xs shadow-2xl"
            >
              <div className="flex items-center gap-3 text-red-400 mb-3">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-sm font-bold text-zinc-900">Resetare Completă Tracker</h3>
              </div>
              <p className="text-zinc-600 mb-4 leading-relaxed">
                Această acțiune va șterge toate solicitările și evenimentele înregistrate în această sesiune de navigare. Asigură-te că ai descărcat un raport PDF sau un export JSON înainte de resetare.
              </p>
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsResetConfirmOpen(false)}
                  className="border-zinc-300 text-xs"
                >
                  Anulează
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleResetWorkspace}
                  className="bg-red-600 hover:bg-red-500 text-xs"
                >
                  Resetează Tot
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
