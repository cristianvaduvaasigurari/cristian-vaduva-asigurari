"use client";

import * as React from "react";
import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  Edit3,
  Copy,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  FileText,
  ShieldCheck,
  Search,
  Filter,
  RotateCcw,
  X,
  Info,
  Layers,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  BellRing,
  FileCheck2,
  CalendarDays,
  FileWarning,
  Sparkles,
  ArrowUpDown,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TimelineEvent,
  TimelineEventCategory,
  EventDateType,
  TimelineEventStatus,
  ResponsibleParty,
  SourceType,
  PolicyDeadlineTimelineData,
  CATEGORY_DEFINITIONS,
  STATUS_DEFINITIONS,
  DATE_TYPE_DEFINITIONS,
  SOURCE_TYPE_DEFINITIONS,
  RESPONSIBLE_PARTY_DEFINITIONS,
  EVENT_TEMPLATES,
  INITIAL_TIMELINE_DATA,
  formatLocalDateRo,
  isDatePast,
  getEventClarifications,
  computeEffectiveStatus,
  generateTimelineSummaryStats,
  validateImportedTimelineData,
  generatePolicyDeadlinesPdf,
} from "@/lib/policy-deadline-timeline";
import Link from "next/link";

type TabView = "timeline" | "list" | "deadlines" | "guide";
type SortOption = "date_asc" | "date_desc" | "status" | "updated_desc";

export function PolicyDeadlineTimeline() {
  const [data, setData] = useState<PolicyDeadlineTimelineData>(INITIAL_TIMELINE_DATA);
  const [activeTab, setActiveTab] = useState<TabView>("timeline");

  // Filter and Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDateType, setFilterDateType] = useState<string>("all");
  const [filterResponsible, setFilterResponsible] = useState<string>("all");
  const [filterSourceType, setFilterSourceType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("date_asc");

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<TimelineEvent | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Summary statistics
  const stats = useMemo(() => generateTimelineSummaryStats(data.events), [data.events]);

  // Filtered and Sorted Events
  const filteredEvents = useMemo(() => {
    let result = [...data.events];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (ev) =>
          ev.title.toLowerCase().includes(q) ||
          (ev.notes && ev.notes.toLowerCase().includes(q)) ||
          (ev.sourceTitle && ev.sourceTitle.toLowerCase().includes(q)) ||
          (ev.relatedOrganization && ev.relatedOrganization.toLowerCase().includes(q)) ||
          (ev.reminderNotes && ev.reminderNotes.toLowerCase().includes(q))
      );
    }

    // Filters
    if (filterCategory !== "all") {
      result = result.filter((ev) => ev.category === filterCategory);
    }

    if (filterStatus !== "all") {
      result = result.filter((ev) => {
        const eff = computeEffectiveStatus(ev);
        return eff === filterStatus;
      });
    }

    if (filterDateType !== "all") {
      result = result.filter((ev) => ev.dateType === filterDateType);
    }

    if (filterResponsible !== "all") {
      result = result.filter((ev) => ev.responsibleParty === filterResponsible);
    }

    if (filterSourceType !== "all") {
      result = result.filter((ev) => ev.sourceType === filterSourceType);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "date_asc") {
        return (a.eventDate || "").localeCompare(b.eventDate || "");
      }
      if (sortBy === "date_desc") {
        return (b.eventDate || "").localeCompare(a.eventDate || "");
      }
      if (sortBy === "updated_desc") {
        return (b.updatedAt || "").localeCompare(a.updatedAt || "");
      }
      if (sortBy === "status") {
        const effA = computeEffectiveStatus(a);
        const effB = computeEffectiveStatus(b);
        return effA.localeCompare(effB);
      }
      return 0;
    });

    return result;
  }, [
    data.events,
    searchQuery,
    filterCategory,
    filterStatus,
    filterDateType,
    filterResponsible,
    filterSourceType,
    sortBy,
  ]);

  // Deadlines Tab Items (Follow-ups & Upcoming target dates)
  const deadlineItems = useMemo(() => {
    return data.events
      .filter((ev) => ev.status !== "cancelled")
      .sort((a, b) => {
        const dateA = a.followUpDate || a.eventDate;
        const dateB = b.followUpDate || b.eventDate;
        return dateA.localeCompare(dateB);
      });
  }, [data.events]);

  // Handlers for Policy Info
  const updatePolicyInfo = (field: keyof PolicyDeadlineTimelineData, val: string) => {
    setData((prev) => ({
      ...prev,
      [field]: val,
      updatedAt: new Date().toISOString(),
    }));
  };

  // Add / Edit Event handlers
  const openNewEventModal = (template?: typeof EVENT_TEMPLATES[0]) => {
    const newEvent: TimelineEvent = {
      id: `ev-${Date.now()}`,
      title: template?.title || "",
      category: template?.category || "other",
      eventDate: new Date().toISOString().split("T")[0],
      dateType: template?.dateType || "confirmed",
      status: "upcoming",
      responsibleParty: template?.responsibleParty || "user",
      sourceType: template?.sourceType || "policy_schedule",
      notes: template?.notes || "",
      hasWrittenConfirmation: template?.hasWrittenConfirmation || false,
      followUpRequired: template?.followUpRequired || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setEditingEvent(newEvent);
    setIsEditModalOpen(true);
  };

  const handleSaveEvent = (evToSave: TimelineEvent) => {
    setData((prev) => {
      const exists = prev.events.some((item) => item.id === evToSave.id);
      const updatedEvents = exists
        ? prev.events.map((item) => (item.id === evToSave.id ? { ...evToSave, updatedAt: new Date().toISOString() } : item))
        : [...prev.events, { ...evToSave, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }];

      return {
        ...prev,
        events: updatedEvents,
        updatedAt: new Date().toISOString(),
      };
    });
    setIsEditModalOpen(false);
    setEditingEvent(null);
  };

  const handleToggleComplete = (eventId: string) => {
    setData((prev) => ({
      ...prev,
      events: prev.events.map((ev) => {
        if (ev.id === eventId) {
          const isNowCompleted = ev.status !== "completed";
          return {
            ...ev,
            status: isNowCompleted ? "completed" : "upcoming",
            completionDate: isNowCompleted ? new Date().toISOString().split("T")[0] : undefined,
            updatedAt: new Date().toISOString(),
          };
        }
        return ev;
      }),
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleDuplicateEvent = (ev: TimelineEvent) => {
    const duplicated: TimelineEvent = {
      ...ev,
      id: `ev-dup-${Date.now()}`,
      title: `${ev.title} (Copie)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setData((prev) => ({
      ...prev,
      events: [...prev.events, duplicated],
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleDeleteEvent = (id: string) => {
    setData((prev) => ({
      ...prev,
      events: prev.events.filter((ev) => ev.id !== id),
      updatedAt: new Date().toISOString(),
    }));
    setDeleteCandidateId(null);
  };

  // Export JSON
  const handleExportJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const cleanRef = (data.policyReference || "polita").toLowerCase().replace(/[^a-z0-9]/g, "-");
    link.download = `backup-termene-${cleanRef}-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const validation = validateImportedTimelineData(content);
      if (validation.success) {
        setData(validation.data);
      } else {
        setImportError(validation.error);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleResetWorkspace = () => {
    setData({
      schemaVersion: "1.0",
      policyReference: "POL-NOUA",
      policyNickname: "Poliță Nouă",
      events: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setIsResetConfirmOpen(false);
  };

  return (
    <div className="w-full space-y-8">
      {/* Expiry Prompt if passed */}
      {stats.expiryPassedPrompt && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex items-start gap-4 text-amber-200">
          <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-amber-300">
              Notă Importantă: Data expirării poliței a trecut
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Polița consemnată are o dată de expirare anterioară zilei curente. Vă rugăm să verificați statutul activ și continuitatea acoperirii direct cu asigurătorul emitent sau brokerul dumneavoastră. Acest instrument organizatoric nu determină valabilitatea juridică sau încetarea automată a contractului.
            </p>
          </div>
        </div>
      )}

      {/* Policy Header Box */}
      <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 backdrop-blur-sm shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                {data.policyNickname || "Poliță Fără Titlu"}
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400 font-mono">
                  {data.policyReference}
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Registru cronologic & evidență termene scadente | Stocare 100% în browser (volatilă)
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => generatePolicyDeadlinesPdf(data)}
              className="bg-zinc-800/60 border-zinc-700 hover:bg-zinc-700 text-zinc-200 text-xs h-9 gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              Descarcă PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportJson}
              className="bg-zinc-800/60 border-zinc-700 hover:bg-zinc-700 text-zinc-200 text-xs h-9 gap-1.5"
            >
              <Upload className="w-3.5 h-3.5 text-zinc-400" />
              Export Backup JSON
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="bg-zinc-800/60 border-zinc-700 hover:bg-zinc-700 text-zinc-200 text-xs h-9 gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              Import JSON
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportFile}
              accept=".json"
              className="hidden"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsResetConfirmOpen(true)}
              className="bg-zinc-800/60 border-zinc-700 hover:bg-rose-950/40 hover:border-rose-800 text-zinc-400 hover:text-rose-300 text-xs h-9"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Error Alert if JSON import failed */}
        {importError && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>{importError}</span>
            </div>
            <button
              onClick={() => setImportError(null)}
              className="text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Editable Metadata Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          <div>
            <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-1">
              Denumire / Nickname Poliță
            </label>
            <Input
              value={data.policyNickname}
              onChange={(e) => updatePolicyInfo("policyNickname", e.target.value)}
              placeholder="Ex: CASCO Autoturism, Locuință"
              className="bg-zinc-950/60 border-zinc-800 text-zinc-100 text-xs h-8 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-1">
              Referință Non-Sensibilă
            </label>
            <Input
              value={data.policyReference}
              onChange={(e) => updatePolicyInfo("policyReference", e.target.value)}
              placeholder="Ex: POL-2026-01"
              className="bg-zinc-950/60 border-zinc-800 text-zinc-100 text-xs h-8 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-1">
              Companie Asigurare / Broker
            </label>
            <Input
              value={data.insurerName || ""}
              onChange={(e) => updatePolicyInfo("insurerName", e.target.value)}
              placeholder="Ex: Allianz, Omniasig, Groupama"
              className="bg-zinc-950/60 border-zinc-800 text-zinc-100 text-xs h-8 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-1">
              Categorie Poliță
            </label>
            <Input
              value={data.policyCategory || ""}
              onChange={(e) => updatePolicyInfo("policyCategory", e.target.value)}
              placeholder="Ex: Auto, Locuință, Sănătate"
              className="bg-zinc-950/60 border-zinc-800 text-zinc-100 text-xs h-8 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* KPI Dashboard Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Total Evenimente</span>
            <Layers className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white tracking-tight">
            {stats.totalEvents}
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Viitoare / Active</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-cyan-400 tracking-tight">
            {stats.upcomingCount}
          </div>
        </div>

        <div
          className={`border rounded-xl p-3.5 flex flex-col justify-between ${
            stats.overdueCount > 0
              ? "bg-rose-500/10 border-rose-500/30"
              : "bg-zinc-900/60 border-zinc-800/80"
          }`}
        >
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Scadențe Depășite</span>
            <AlertTriangle
              className={`w-4 h-4 ${
                stats.overdueCount > 0 ? "text-rose-400" : "text-zinc-500"
              }`}
            />
          </div>
          <div
            className={`mt-2 text-2xl font-bold tracking-tight ${
              stats.overdueCount > 0 ? "text-rose-400" : "text-zinc-400"
            }`}
          >
            {stats.overdueCount}
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Așteaptă Confirmare</span>
            <HelpCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-amber-400 tracking-tight">
            {stats.awaitingConfirmationCount}
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Finalizate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-400 tracking-tight">
            {stats.completedCount}
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Clarificări Necesare</span>
            <FileWarning className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-yellow-400 tracking-tight">
            {stats.clarificationsCount}
          </div>
        </div>
      </div>

      {/* Quick Add Templates Bar */}
      <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Adăugare Rapidă din Șabloane Uzuale
          </span>
          <Button
            size="sm"
            onClick={() => openNewEventModal()}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs h-8 gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Eveniment Personalizat
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {EVENT_TEMPLATES.map((tmpl, idx) => (
            <button
              key={idx}
              onClick={() => openNewEventModal(tmpl)}
              className="px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700/60 text-xs text-zinc-200 transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3 h-3 text-blue-400" />
              <span>{tmpl.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("timeline")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === "timeline"
              ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
              : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          Cronologie Evenimente
        </button>
        <button
          onClick={() => setActiveTab("list")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === "list"
              ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
              : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
          }`}
        >
          <Layers className="w-4 h-4" />
          Registru & Filtre ({filteredEvents.length})
        </button>
        <button
          onClick={() => setActiveTab("deadlines")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === "deadlines"
              ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
              : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
          }`}
        >
          <BellRing className="w-4 h-4" />
          Scadențe & Urmăriri
          {stats.overdueCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-rose-500" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("guide")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === "guide"
              ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
              : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
          }`}
        >
          <Info className="w-4 h-4" />
          Ghid & Surse Documentare
        </button>
      </div>

      {/* TAB 1: TIMELINE VIEW */}
      {activeTab === "timeline" && (
        <div className="space-y-6">
          {data.events.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/30">
              <Calendar className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
              <h3 className="text-base font-medium text-zinc-300">
                Nu există repere consemnate în această cronologie
              </h3>
              <p className="text-xs text-zinc-500 max-w-md mx-auto mt-1 mb-4">
                Adaugă data de expirare a poliței curente, ofertele primite, notificările de reziliere sau termenele de plată pentru a monitoriza evoluția contractului.
              </p>
              <Button
                size="sm"
                onClick={() => openNewEventModal()}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs h-9 gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Adaugă Primul Eveniment
              </Button>
            </div>
          ) : (
            <div className="relative border-l border-zinc-800 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8 py-2">
              {[...data.events]
                .sort((a, b) => (a.eventDate || "").localeCompare(b.eventDate || ""))
                .map((ev, index) => {
                  const effStatus = computeEffectiveStatus(ev);
                  const catInfo = CATEGORY_DEFINITIONS[ev.category] || CATEGORY_DEFINITIONS.other;
                  const statusInfo = STATUS_DEFINITIONS[effStatus] || STATUS_DEFINITIONS.upcoming;
                  const dateTypeInfo = DATE_TYPE_DEFINITIONS[ev.dateType] || DATE_TYPE_DEFINITIONS.estimated;
                  const clarifications = getEventClarifications(ev);

                  const isOverdue = effStatus === "overdue";
                  const isCompleted = ev.status === "completed";

                  return (
                    <div key={ev.id} className="relative group">
                      {/* Timeline Dot */}
                      <div
                        className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
                          isOverdue
                            ? "bg-rose-500 border-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.6)]"
                            : isCompleted
                            ? "bg-emerald-500 border-emerald-300"
                            : "bg-blue-500 border-blue-300"
                        }`}
                      />

                      {/* Event Card */}
                      <div
                        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                          isOverdue
                            ? "bg-rose-950/20 border-rose-800/60"
                            : isCompleted
                            ? "bg-zinc-900/60 border-zinc-800/80 opacity-80"
                            : "bg-zinc-900/90 border-zinc-800 hover:border-zinc-700"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-bold text-white">
                                {formatLocalDateRo(ev.eventDate)}
                              </span>
                              {ev.eventTime && (
                                <span className="text-xs text-zinc-400 font-mono">
                                  ({ev.eventTime})
                                </span>
                              )}
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${dateTypeInfo.badgeClass}`}
                              >
                                {dateTypeInfo.labelRo}
                              </span>
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${statusInfo.badgeClass}`}
                              >
                                {statusInfo.labelRo}
                              </span>
                            </div>

                            <h3 className="text-base font-semibold text-zinc-100 flex items-center gap-2 pt-0.5">
                              {ev.title}
                            </h3>
                            <p className="text-xs text-blue-400 font-medium">
                              {catInfo.labelRo}
                            </p>
                          </div>

                          {/* Action icons */}
                          <div className="flex items-center gap-1 shrink-0">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleComplete(ev.id)}
                              className={`h-8 px-2.5 text-xs gap-1 ${
                                isCompleted
                                  ? "text-emerald-400 hover:text-emerald-300 bg-emerald-500/10"
                                  : "text-zinc-400 hover:text-white"
                              }`}
                              title={isCompleted ? "Marchează ca nefinalizat" : "Marchează ca finalizat"}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">
                                {isCompleted ? "Finalizat" : "Finalizează"}
                              </span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingEvent(ev);
                                setIsEditModalOpen(true);
                              }}
                              className="h-8 w-8 text-zinc-400 hover:text-white"
                              title="Editează"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDuplicateEvent(ev)}
                              className="h-8 w-8 text-zinc-400 hover:text-white"
                              title="Duplică"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setDeleteCandidateId(ev.id)}
                              className="h-8 w-8 text-zinc-400 hover:text-rose-400"
                              title="Șterge"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>

                        {/* Notes and Context */}
                        {ev.notes && (
                          <p className="text-xs text-zinc-300 mt-2.5 leading-relaxed bg-zinc-950/40 p-2.5 rounded-lg border border-zinc-800/60">
                            {ev.notes}
                          </p>
                        )}

                        {/* Metadata pills & Evidence */}
                        <div className="mt-3 pt-3 border-t border-zinc-800/60 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-400">
                          <div>
                            <span className="text-zinc-500">Responsabil:</span>{" "}
                            <span className="text-zinc-200">
                              {RESPONSIBLE_PARTY_DEFINITIONS[ev.responsibleParty]?.labelRo || ev.responsibleParty}
                            </span>
                            {ev.relatedOrganization && (
                              <span className="text-zinc-400"> ({ev.relatedOrganization})</span>
                            )}
                          </div>

                          {ev.sourceTitle && (
                            <div>
                              <span className="text-zinc-500">Sursă:</span>{" "}
                              <span className="text-zinc-200">{ev.sourceTitle}</span>
                            </div>
                          )}

                          <div>
                            <span className="text-zinc-500">Confirmare scrisă:</span>{" "}
                            {ev.hasWrittenConfirmation ? (
                              <span className="text-emerald-400 font-medium">Înregistrată</span>
                            ) : (
                              <span className="text-zinc-500">Neconfirmată</span>
                            )}
                          </div>

                          {ev.followUpRequired && (
                            <div className="flex items-center gap-1 text-amber-400">
                              <Clock className="w-3 h-3" />
                              <span>
                                Follow-up: {formatLocalDateRo(ev.followUpDate)}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Clarification notices */}
                        {clarifications.length > 0 && (
                          <div className="mt-3 space-y-1">
                            {clarifications.map((cl, i) => (
                              <div
                                key={i}
                                className="text-[11px] text-yellow-300 bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-1 rounded-md flex items-center gap-1.5"
                              >
                                <AlertTriangle className="w-3 h-3 text-yellow-400 shrink-0" />
                                <span>{cl}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: REGISTER & FILTERS VIEW */}
      {activeTab === "list" && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Caută după titlu, sursă, organizație, note..."
                  className="pl-9 bg-zinc-950/60 border-zinc-800 text-xs h-9 text-zinc-100"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-zinc-950/60 border border-zinc-800 rounded-lg text-xs h-9 px-2.5 text-zinc-200"
                >
                  <option value="date_asc">Sortează: Dată (Crescător)</option>
                  <option value="date_desc">Sortează: Dată (Descrescător)</option>
                  <option value="status">Sortează: Status</option>
                  <option value="updated_desc">Sortează: Recent modificate</option>
                </select>
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pt-1 text-xs">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-zinc-950/60 border border-zinc-800 rounded-lg h-8 px-2 text-zinc-300"
              >
                <option value="all">Toate Categoriile</option>
                {Object.entries(CATEGORY_DEFINITIONS).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.labelRo}
                  </option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-zinc-950/60 border border-zinc-800 rounded-lg h-8 px-2 text-zinc-300"
              >
                <option value="all">Toate Statusurile</option>
                {Object.entries(STATUS_DEFINITIONS).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.labelRo}
                  </option>
                ))}
              </select>

              <select
                value={filterDateType}
                onChange={(e) => setFilterDateType(e.target.value)}
                className="bg-zinc-950/60 border border-zinc-800 rounded-lg h-8 px-2 text-zinc-300"
              >
                <option value="all">Toate Tipurile de Dată</option>
                {Object.entries(DATE_TYPE_DEFINITIONS).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.labelRo}
                  </option>
                ))}
              </select>

              <select
                value={filterResponsible}
                onChange={(e) => setFilterResponsible(e.target.value)}
                className="bg-zinc-950/60 border border-zinc-800 rounded-lg h-8 px-2 text-zinc-300"
              >
                <option value="all">Toți Responsabilii</option>
                {Object.entries(RESPONSIBLE_PARTY_DEFINITIONS).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.labelRo}
                  </option>
                ))}
              </select>

              <select
                value={filterSourceType}
                onChange={(e) => setFilterSourceType(e.target.value)}
                className="bg-zinc-950/60 border border-zinc-800 rounded-lg h-8 px-2 text-zinc-300"
              >
                <option value="all">Toate Tipuri Surse</option>
                {Object.entries(SOURCE_TYPE_DEFINITIONS).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.labelRo}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Events List */}
          {filteredEvents.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 border border-zinc-800 rounded-xl">
              Niciun eveniment nu corespunde filtrelor selectate.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredEvents.map((ev) => {
                const effStatus = computeEffectiveStatus(ev);
                const statusInfo = STATUS_DEFINITIONS[effStatus] || STATUS_DEFINITIONS.upcoming;
                const catInfo = CATEGORY_DEFINITIONS[ev.category] || CATEGORY_DEFINITIONS.other;
                const dateTypeInfo = DATE_TYPE_DEFINITIONS[ev.dateType] || DATE_TYPE_DEFINITIONS.estimated;

                return (
                  <div
                    key={ev.id}
                    className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-white">
                          {formatLocalDateRo(ev.eventDate)}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full border ${statusInfo.badgeClass}`}
                        >
                          {statusInfo.labelRo}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full border ${dateTypeInfo.badgeClass}`}
                        >
                          {dateTypeInfo.labelRo}
                        </span>
                        <span className="text-[11px] text-zinc-400">
                          [{catInfo.labelRo}]
                        </span>
                      </div>

                      <h4 className="text-sm font-semibold text-zinc-100">
                        {ev.title}
                      </h4>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
                        <span>
                          Responsabil:{" "}
                          <strong className="text-zinc-300">
                            {RESPONSIBLE_PARTY_DEFINITIONS[ev.responsibleParty]?.labelRo || ev.responsibleParty}
                          </strong>
                        </span>
                        {ev.sourceTitle && (
                          <span>
                            Sursă:{" "}
                            <strong className="text-zinc-300">{ev.sourceTitle}</strong>
                          </span>
                        )}
                        {ev.followUpRequired && (
                          <span className="text-amber-400">
                            Follow-up: {formatLocalDateRo(ev.followUpDate)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 self-end md:self-center shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleComplete(ev.id)}
                        className={`h-8 px-2 text-xs gap-1 ${
                          ev.status === "completed"
                            ? "text-emerald-400 bg-emerald-500/10"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{ev.status === "completed" ? "Finalizat" : "Rezolvă"}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingEvent(ev);
                          setIsEditModalOpen(true);
                        }}
                        className="h-8 w-8 text-zinc-400 hover:text-white"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDuplicateEvent(ev)}
                        className="h-8 w-8 text-zinc-400 hover:text-white"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteCandidateId(ev.id)}
                        className="h-8 w-8 text-zinc-400 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: DEADLINES & FOLLOW-UPS */}
      {activeTab === "deadlines" && (
        <div className="space-y-6">
          <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-xl text-xs text-zinc-300">
            <h4 className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <BellRing className="w-4 h-4 text-blue-400" />
              Monitorizare Scadențe & Follow-up-uri Active
            </h4>
            <p className="text-zinc-400 leading-relaxed">
              Această secțiune evidențiază termenele țintă stabilite de utilizator pentru acțiuni de reînnoire, notificări, primiri de documente sau solicitări de daune.
            </p>
          </div>

          <div className="space-y-3">
            {deadlineItems.length === 0 ? (
              <div className="p-8 text-center text-zinc-500 border border-zinc-800 rounded-xl">
                Nu există evenimente active.
              </div>
            ) : (
              deadlineItems.map((ev) => {
                const effStatus = computeEffectiveStatus(ev);
                const isOverdue = effStatus === "overdue";
                const isCompleted = ev.status === "completed";

                return (
                  <div
                    key={ev.id}
                    className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isOverdue
                        ? "bg-rose-950/20 border-rose-800/60 text-rose-200"
                        : isCompleted
                        ? "bg-zinc-900/40 border-zinc-800/50 opacity-60"
                        : "bg-zinc-900/80 border-zinc-800"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {isOverdue && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold uppercase">
                            Termen Depășit
                          </span>
                        )}
                        <span className="text-xs font-bold text-white">
                          Data eveniment: {formatLocalDateRo(ev.eventDate)}
                        </span>
                        {ev.followUpRequired && ev.followUpDate && (
                          <span className="text-xs text-amber-400">
                            | Follow-up țintă: {formatLocalDateRo(ev.followUpDate)}
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-semibold text-zinc-100">
                        {ev.title}
                      </h4>

                      {ev.reminderNotes && (
                        <p className="text-xs text-zinc-300 font-medium">
                          Observație / Reminder: {ev.reminderNotes}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <Button
                        size="sm"
                        onClick={() => handleToggleComplete(ev.id)}
                        className={`text-xs h-8 gap-1.5 ${
                          isCompleted
                            ? "bg-zinc-800 text-zinc-300"
                            : "bg-emerald-600 hover:bg-emerald-500 text-white"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isCompleted ? "Re-deschide" : "Finalizează"}</span>
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 4: GUIDE & METHODOLOGY */}
      {activeTab === "guide" && (
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 space-y-6 text-sm text-zinc-300">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">
              Ghid Metodologic: Registrul de Termene & Scadențe
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Acest instrument este conceput pentru a ajuta asigurații să își organizeze cronologia evenimentelor contractuale, fără a depinde de notificări externe și fără a pierde termene importante de analiză sau decizie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-950/60 border border-zinc-800 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                1. Surse Documentare Recomandate
              </h4>
              <ul className="text-xs text-zinc-400 space-y-1.5 list-disc list-inside">
                <li>
                  <strong className="text-zinc-200">Condiții de asigurare (Wording):</strong> Reglementează preavizul de reziliere sau reînnoire.
                </li>
                <li>
                  <strong className="text-zinc-200">Poliță / Tablou (Schedule):</strong> Specifică data intrării în vigoare, expirării și scadențele ratelor.
                </li>
                <li>
                  <strong className="text-zinc-200">Ofertă Scrisă:</strong> Conține termenele de valabilitate a prețului cotat.
                </li>
                <li>
                  <strong className="text-zinc-200">Comunicări Scrise:</strong> Confirmă primirea notificărilor sau cererilor de emitere addendum.
                </li>
              </ul>
            </div>

            <div className="bg-zinc-950/60 border border-zinc-800 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                2. Limite & Precizări Juridice
              </h4>
              <ul className="text-xs text-zinc-400 space-y-1.5 list-disc list-inside">
                <li>Aplicația nu calculează automat preavize legale fără indicarea clauzei exacte de către utilizator.</li>
                <li>Un termen depășit în acest timeline nu reprezintă o probă juridică de reziliere sau neplată.</li>
                <li>Statutul juridic al contractului este stabilit exclusiv conform documentelor oficiale emise de asigurător.</li>
                <li>Nu trimiteți documente originale sau date personale sensibile; folosiți referințe generice.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* EDIT / CREATE EVENT MODAL */}
      <AnimatePresence>
        {isEditModalOpen && editingEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  {editingEvent.title ? "Editare Reper Timeline" : "Adăugare Reper Nou"}
                </h3>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                {/* Title */}
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Titlu Eveniment / Reper *
                  </label>
                  <Input
                    value={editingEvent.title}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, title: e.target.value })
                    }
                    placeholder="Ex: Primire Ofertă Reînnoire de la Asigurător"
                    className="bg-zinc-950/80 border-zinc-800 text-zinc-100 text-xs h-9"
                  />
                </div>

                {/* Category & Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">
                      Categorie Eveniment
                    </label>
                    <select
                      value={editingEvent.category}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          category: e.target.value as TimelineEventCategory,
                        })
                      }
                      className="w-full bg-zinc-950/80 border border-zinc-800 rounded-lg h-9 px-2 text-zinc-200"
                    >
                      {Object.entries(CATEGORY_DEFINITIONS).map(([k, v]) => (
                        <option key={k} value={k}>
                          {v.labelRo}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">
                      Status Eveniment
                    </label>
                    <select
                      value={editingEvent.status}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          status: e.target.value as TimelineEventStatus,
                        })
                      }
                      className="w-full bg-zinc-950/80 border border-zinc-800 rounded-lg h-9 px-2 text-zinc-200"
                    >
                      {Object.entries(STATUS_DEFINITIONS).map(([k, v]) => (
                        <option key={k} value={k}>
                          {v.labelRo}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Dates: Event Date & Date Type */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">
                      Dată Eveniment (YYYY-MM-DD) *
                    </label>
                    <Input
                      type="date"
                      value={editingEvent.eventDate}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, eventDate: e.target.value })
                      }
                      className="bg-zinc-950/80 border-zinc-800 text-zinc-100 text-xs h-9"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">
                      Oră Opțională (HH:MM)
                    </label>
                    <Input
                      type="time"
                      value={editingEvent.eventTime || ""}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, eventTime: e.target.value })
                      }
                      className="bg-zinc-950/80 border-zinc-800 text-zinc-100 text-xs h-9"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">
                      Tip Certitudine Dată
                    </label>
                    <select
                      value={editingEvent.dateType}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          dateType: e.target.value as EventDateType,
                        })
                      }
                      className="w-full bg-zinc-950/80 border border-zinc-800 rounded-lg h-9 px-2 text-zinc-200"
                    >
                      {Object.entries(DATE_TYPE_DEFINITIONS).map(([k, v]) => (
                        <option key={k} value={k}>
                          {v.labelRo}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Completion Date (if completed) */}
                {editingEvent.status === "completed" && (
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">
                      Dată Efectivă Finalizare (YYYY-MM-DD)
                    </label>
                    <Input
                      type="date"
                      value={editingEvent.completionDate || ""}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, completionDate: e.target.value })
                      }
                      className="bg-zinc-950/80 border-zinc-800 text-zinc-100 text-xs h-9"
                    />
                  </div>
                )}

                {/* Responsible Party & Organization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">
                      Parte Responsabilă
                    </label>
                    <select
                      value={editingEvent.responsibleParty}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          responsibleParty: e.target.value as ResponsibleParty,
                        })
                      }
                      className="w-full bg-zinc-950/80 border border-zinc-800 rounded-lg h-9 px-2 text-zinc-200"
                    >
                      {Object.entries(RESPONSIBLE_PARTY_DEFINITIONS).map(([k, v]) => (
                        <option key={k} value={k}>
                          {v.labelRo}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">
                      Organizație Conexă (Opțional)
                    </label>
                    <Input
                      value={editingEvent.relatedOrganization || ""}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, relatedOrganization: e.target.value })
                      }
                      placeholder="Ex: Allianz, Broker Partener, Service Auto"
                      className="bg-zinc-950/80 border-zinc-800 text-zinc-100 text-xs h-9"
                    />
                  </div>
                </div>

                {/* Source & Evidence */}
                <div className="bg-zinc-950/40 p-3.5 rounded-xl border border-zinc-800/80 space-y-3">
                  <span className="font-semibold text-zinc-300 block">
                    Înregistrare Sursă & Dovadă Documentară
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-400 mb-1">Tip Sursă</label>
                      <select
                        value={editingEvent.sourceType}
                        onChange={(e) =>
                          setEditingEvent({
                            ...editingEvent,
                            sourceType: e.target.value as SourceType,
                          })
                        }
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg h-8 px-2 text-zinc-200"
                      >
                        {Object.entries(SOURCE_TYPE_DEFINITIONS).map(([k, v]) => (
                          <option key={k} value={k}>
                            {v.labelRo}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-zinc-400 mb-1">
                        Titlu / Referință Sursă Text
                      </label>
                      <Input
                        value={editingEvent.sourceTitle || ""}
                        onChange={(e) =>
                          setEditingEvent({ ...editingEvent, sourceTitle: e.target.value })
                        }
                        placeholder="Ex: Condiții Specifice Art. 12, Email din 10.10"
                        className="bg-zinc-900 border-zinc-800 text-zinc-100 text-xs h-8"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="hasWrittenConfirmation"
                      checked={editingEvent.hasWrittenConfirmation}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          hasWrittenConfirmation: e.target.checked,
                        })
                      }
                      className="rounded border-zinc-700 bg-zinc-900 text-blue-600 focus:ring-0"
                    />
                    <label
                      htmlFor="hasWrittenConfirmation"
                      className="text-zinc-300 text-xs cursor-pointer select-none"
                    >
                      Există confirmare scrisă înregistrată (email, număr înregistrare, chitanță)
                    </label>
                  </div>
                </div>

                {/* Follow-up Section */}
                <div className="bg-zinc-950/40 p-3.5 rounded-xl border border-zinc-800/80 space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="followUpRequired"
                      checked={editingEvent.followUpRequired}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          followUpRequired: e.target.checked,
                        })
                      }
                      className="rounded border-zinc-700 bg-zinc-900 text-blue-600 focus:ring-0"
                    />
                    <label
                      htmlFor="followUpRequired"
                      className="text-zinc-300 font-medium text-xs cursor-pointer select-none"
                    >
                      Necesită acțiune de follow-up / monitorizare
                    </label>
                  </div>

                  {editingEvent.followUpRequired && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-zinc-400 mb-1">
                          Dată Țintă Follow-up
                        </label>
                        <Input
                          type="date"
                          value={editingEvent.followUpDate || ""}
                          onChange={(e) =>
                            setEditingEvent({ ...editingEvent, followUpDate: e.target.value })
                          }
                          className="bg-zinc-900 border-zinc-800 text-zinc-100 text-xs h-8"
                        />
                      </div>

                      <div>
                        <label className="block text-zinc-400 mb-1">
                          Observație / Reminder Follow-up
                        </label>
                        <Input
                          value={editingEvent.reminderNotes || ""}
                          onChange={(e) =>
                            setEditingEvent({ ...editingEvent, reminderNotes: e.target.value })
                          }
                          placeholder="Ex: Sună brokerul dacă nu a trimis oferta"
                          className="bg-zinc-900 border-zinc-800 text-zinc-100 text-xs h-8"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Note & Detalii Suplimentare
                  </label>
                  <textarea
                    rows={2}
                    value={editingEvent.notes || ""}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, notes: e.target.value })
                    }
                    placeholder="Alte detalii sau instrucțiuni specifice..."
                    className="w-full bg-zinc-950/80 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 text-xs focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-2 border-t border-zinc-800 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-zinc-800 border-zinc-700 text-zinc-300 text-xs h-9"
                >
                  Anulează
                </Button>
                <Button
                  size="sm"
                  disabled={!editingEvent.title.trim() || !editingEvent.eventDate}
                  onClick={() => handleSaveEvent(editingEvent)}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs h-9"
                >
                  Salvează Eveniment
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RESET CONFIRMATION MODAL */}
      <AnimatePresence>
        {isResetConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center gap-3 text-rose-400">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="text-base font-bold text-white">
                  Resetare Spațiu de Lucru
                </h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Datele din acest timeline există exclusiv în memoria temporară a browserului. Dacă resetați spațiul de lucru fără a descărca un fișier de backup JSON sau raportul PDF, toate evenimentele consemnate se vor pierde.
              </p>
              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsResetConfirmOpen(false)}
                  className="bg-zinc-800 border-zinc-700 text-zinc-300 text-xs h-9"
                >
                  Păstrează Datele
                </Button>
                <Button
                  size="sm"
                  onClick={handleResetWorkspace}
                  className="bg-rose-600 hover:bg-rose-500 text-white text-xs h-9"
                >
                  Confirmă Resetarea
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE EVENT CONFIRMATION MODAL */}
      <AnimatePresence>
        {deleteCandidateId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center gap-3 text-rose-400">
                <Trash2 className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Ștergere Eveniment</h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Sunteți sigur că doriți să ștergeți acest reper din cronologie?
              </p>
              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeleteCandidateId(null)}
                  className="bg-zinc-800 border-zinc-700 text-zinc-300 text-xs h-8"
                >
                  Anulează
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDeleteEvent(deleteCandidateId)}
                  className="bg-rose-600 hover:bg-rose-500 text-white text-xs h-8"
                >
                  Șterge
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
