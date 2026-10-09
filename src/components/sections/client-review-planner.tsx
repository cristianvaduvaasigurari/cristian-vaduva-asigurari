"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarCheck,
  Plus,
  Trash2,
  Edit3,
  Download,
  Upload,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Lock,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Sparkles,
  Info,
  X,
  ListOrdered,
  Layers,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ReviewType,
  DiscussionArea,
  ChangeStatus,
  AgendaPriority,
  AgendaStatus,
  DecisionOutcome,
  ResponsibleParty,
  ChangeEntry,
  AgendaItem,
  DecisionRecord,
  ClientReviewPlannerData,
  REVIEW_TYPE_LABELS_RO,
  REVIEW_TYPE_LABELS_EN,
  DISCUSSION_AREA_LABELS_RO,
  DISCUSSION_AREA_LABELS_EN,
  CHANGE_STATUS_LABELS_RO,
  CHANGE_STATUS_LABELS_EN,
  AGENDA_STATUS_LABELS_RO,
  AGENDA_STATUS_LABELS_EN,
  DECISION_OUTCOME_LABELS_RO,
  DECISION_OUTCOME_LABELS_EN,
  RESPONSIBLE_PARTY_LABELS_RO,
  RESPONSIBLE_PARTY_LABELS_EN,
  generateSuggestedAgendaQuestions,
  getPlannerFollowUpStatus,
  generateReviewPlannerPdf,
  validateImportedReviewPlan,
} from "@/lib/client-review-planner";
import Link from "next/link";

export function ClientReviewPlanner() {
  const [lang, setLang] = useState<"ro" | "en">("ro");
  const isRo = lang === "ro";

  // Active Tab
  const [activeTab, setActiveTab] = useState<"scope" | "changes" | "agenda" | "decisions" | "summary">("scope");

  // Plan Data State in active memory
  const [plan, setPlan] = useState<ClientReviewPlannerData>({
    title: "Ședință Anuală de Revizuire Portofoliu 2026",
    reviewType: "annual_review",
    plannedDate: "2026-09-15",
    participants: "Cristian Văduva (Consultant) & Titular",
    generalContext: "Evaluare anuală a patrimoniului imobiliar, a polițelor auto CASCO și a planului de protecție financiară a familiei.",
    selectedAreas: ["home_property", "vehicle_mobility", "life_family", "existing_policies_renewals"],
    changes: [
      {
        id: "ch_1",
        category: "home_property",
        description: "Renovare completă apartament și instalare sistem panouri fotovoltaice.",
        changeDate: "2026-08-01",
        status: "to_discuss",
      },
      {
        id: "ch_2",
        category: "vehicle_mobility",
        description: "Schimbare autoturism principal (achiziție SUV nou).",
        changeDate: "2026-08-15",
        status: "to_discuss",
      },
    ],
    agenda: generateSuggestedAgendaQuestions("annual_review", ["home_property", "vehicle_mobility", "life_family", "existing_policies_renewals"], "ro"),
    decisions: [
      {
        id: "dec_1",
        decisionText: "Ajustare sumă asigurată locuință pentru a include investiția în panouri fotovoltaice.",
        outcome: "agreed",
        responsibleParty: "advisor",
        targetFollowUpDate: "2026-09-22",
        isCompleted: false,
      },
    ],
    lang: "ro",
    createdAt: "2026-09-01T10:00:00.000Z",
    updatedAt: "2026-09-01T10:00:00.000Z",
  });

  // Modals
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [editingChange, setEditingChange] = useState<ChangeEntry | null>(null);
  const [chCategory, setChCategory] = useState<DiscussionArea>("home_property");
  const [chDesc, setChDesc] = useState("");
  const [chDate, setChDate] = useState("");
  const [chStatus, setChStatus] = useState<ChangeStatus>("to_discuss");

  const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false);
  const [editingAgenda, setEditingAgenda] = useState<AgendaItem | null>(null);
  const [agTitle, setAgTitle] = useState("");
  const [agDetails, setAgDetails] = useState("");
  const [agArea, setAgArea] = useState<DiscussionArea>("home_property");
  const [agPriority, setAgPriority] = useState<AgendaPriority>("normal");
  const [agStatus, setAgStatus] = useState<AgendaStatus>("open");
  const [agNotes, setAgNotes] = useState("");

  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
  const [editingDecision, setEditingDecision] = useState<DecisionRecord | null>(null);
  const [decText, setDecText] = useState("");
  const [decOutcome, setDecOutcome] = useState<DecisionOutcome>("agreed");
  const [decResp, setDecResp] = useState<ResponsibleParty>("advisor");
  const [decDate, setDecDate] = useState("");
  const [decTargetDate, setDecTargetDate] = useState("");
  const [decAction, setDecAction] = useState("");

  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Toggle discussion area
  const toggleArea = (area: DiscussionArea) => {
    if (plan.selectedAreas.includes(area)) {
      if (plan.selectedAreas.length > 1) {
        setPlan({ ...plan, selectedAreas: plan.selectedAreas.filter((a) => a !== area) });
      }
    } else {
      setPlan({ ...plan, selectedAreas: [...plan.selectedAreas, area] });
    }
  };

  // Reset workspace
  const handleClearWorkspace = () => {
    setPlan({
      title: isRo ? "Plan Nou de Revizuire" : "New Review Plan",
      reviewType: "annual_review",
      selectedAreas: ["home_property"],
      changes: [],
      agenda: [],
      decisions: [],
      lang,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setIsClearConfirmOpen(false);
  };

  // Change Entry Handlers
  const openAddChange = () => {
    setEditingChange(null);
    setChCategory("home_property");
    setChDesc("");
    setChDate("");
    setChStatus("to_discuss");
    setIsChangeModalOpen(true);
  };

  const openEditChange = (ch: ChangeEntry) => {
    setEditingChange(ch);
    setChCategory(ch.category);
    setChDesc(ch.description);
    setChDate(ch.changeDate || "");
    setChStatus(ch.status);
    setIsChangeModalOpen(true);
  };

  const handleSaveChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chDesc.trim()) return;

    const entry: ChangeEntry = {
      id: editingChange ? editingChange.id : `ch_${Date.now()}`,
      category: chCategory,
      description: chDesc.trim(),
      changeDate: chDate || undefined,
      status: chStatus,
    };

    if (editingChange) {
      setPlan({ ...plan, changes: plan.changes.map((c) => (c.id === editingChange.id ? entry : c)) });
    } else {
      setPlan({ ...plan, changes: [entry, ...plan.changes] });
    }
    setIsChangeModalOpen(false);
  };

  const handleDeleteChange = (id: string) => {
    setPlan({ ...plan, changes: plan.changes.filter((c) => c.id !== id) });
  };

  // Agenda Item Handlers
  const openAddAgenda = () => {
    setEditingAgenda(null);
    setAgTitle("");
    setAgDetails("");
    setAgArea("home_property");
    setAgPriority("normal");
    setAgStatus("open");
    setAgNotes("");
    setIsAgendaModalOpen(true);
  };

  const openEditAgenda = (item: AgendaItem) => {
    setEditingAgenda(item);
    setAgTitle(item.title);
    setAgDetails(item.questionDetails || "");
    setAgArea(item.area);
    setAgPriority(item.priority);
    setAgStatus(item.status);
    setAgNotes(item.advisorNotes || "");
    setIsAgendaModalOpen(true);
  };

  const handleSaveAgenda = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agTitle.trim()) return;

    const item: AgendaItem = {
      id: editingAgenda ? editingAgenda.id : `ag_${Date.now()}`,
      title: agTitle.trim(),
      questionDetails: agDetails.trim() || undefined,
      area: agArea,
      priority: agPriority,
      status: agStatus,
      advisorNotes: agNotes.trim() || undefined,
    };

    if (editingAgenda) {
      setPlan({ ...plan, agenda: plan.agenda.map((a) => (a.id === editingAgenda.id ? item : a)) });
    } else {
      setPlan({ ...plan, agenda: [item, ...plan.agenda] });
    }
    setIsAgendaModalOpen(false);
  };

  const handleDeleteAgenda = (id: string) => {
    setPlan({ ...plan, agenda: plan.agenda.filter((a) => a.id !== id) });
  };

  // Decision Item Handlers
  const openAddDecision = () => {
    setEditingDecision(null);
    setDecText("");
    setDecOutcome("agreed");
    setDecResp("advisor");
    setDecDate("");
    setDecTargetDate("");
    setDecAction("");
    setIsDecisionModalOpen(true);
  };

  const openEditDecision = (dec: DecisionRecord) => {
    setEditingDecision(dec);
    setDecText(dec.decisionText);
    setDecOutcome(dec.outcome);
    setDecResp(dec.responsibleParty);
    setDecDate(dec.date || "");
    setDecTargetDate(dec.targetFollowUpDate || "");
    setDecAction(dec.followUpAction || "");
    setIsDecisionModalOpen(true);
  };

  const handleSaveDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!decText.trim()) return;

    const record: DecisionRecord = {
      id: editingDecision ? editingDecision.id : `dec_${Date.now()}`,
      decisionText: decText.trim(),
      outcome: decOutcome,
      responsibleParty: decResp,
      date: decDate || undefined,
      targetFollowUpDate: decTargetDate || undefined,
      followUpAction: decAction.trim() || undefined,
      isCompleted: editingDecision ? editingDecision.isCompleted : false,
    };

    if (editingDecision) {
      setPlan({ ...plan, decisions: plan.decisions.map((d) => (d.id === editingDecision.id ? record : d)) });
    } else {
      setPlan({ ...plan, decisions: [record, ...plan.decisions] });
    }
    setIsDecisionModalOpen(false);
  };

  const handleDeleteDecision = (id: string) => {
    setPlan({ ...plan, decisions: plan.decisions.filter((d) => d.id !== id) });
  };

  const toggleDecisionCompleted = (id: string) => {
    setPlan({
      ...plan,
      decisions: plan.decisions.map((d) => (d.id === id ? { ...d, isCompleted: !d.isCompleted } : d)),
    });
  };

  // PDF Export
  const handleDownloadPdf = () => {
    const doc = generateReviewPlannerPdf({ ...plan, lang });
    doc.save(`plan-revizuire-${Date.now()}.pdf`);
  };

  // JSON Export
  const handleExportJson = () => {
    const dataStr = JSON.stringify({ ...plan, lang }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `backup-plan-revizuire-${Date.now()}.json`;
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
      const res = validateImportedReviewPlan(text);
      if (res.isValid && res.plan) {
        setPlan(res.plan);
        setImportStatus(isRo ? "Plan importat cu succes în memorie!" : "Review plan imported successfully into memory!");
        setTimeout(() => setImportStatus(null), 3500);
      } else {
        setImportStatus(res.error || "Fișier JSON neconform.");
        setTimeout(() => setImportStatus(null), 3500);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Action Summary Metrics
  const openAgendaCount = plan.agenda.filter((a) => a.status === "open").length;
  const highPriorityCount = plan.agenda.filter((a) => a.priority === "high" && a.status !== "resolved").length;
  const pendingDecisionsCount = plan.decisions.filter((d) => d.outcome === "further_info_required" || d.outcome === "deferred").length;
  const overdueDecisions = plan.decisions.filter(
    (d) => !d.isCompleted && d.targetFollowUpDate && getPlannerFollowUpStatus(d.targetFollowUpDate) === "overdue"
  );
  const upcomingDecisions = plan.decisions.filter(
    (d) => !d.isCompleted && d.targetFollowUpDate && getPlannerFollowUpStatus(d.targetFollowUpDate) === "upcoming"
  );

  return (
    <div className="w-full space-y-8 max-w-5xl mx-auto">
      {/* 1. TOP TOOLBAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-zinc-900/80 border border-zinc-800">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          {[
            { id: "scope", labelRo: "1. Scop & Teme", labelEn: "1. Scope & Areas" },
            { id: "changes", labelRo: "2. Schimbări Recente", labelEn: "2. Change Register" },
            { id: "agenda", labelRo: "3. Agenda Întrebări", labelEn: "3. Discussion Agenda" },
            { id: "decisions", labelRo: "4. Registru Decizii", labelEn: "4. Decision Register" },
            { id: "summary", labelRo: "5. Sumar & Acțiuni", labelEn: "5. Action Summary" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as "scope" | "changes" | "agenda" | "decisions" | "summary")}
              className={`px-3 py-2 rounded-xl font-medium transition-all shrink-0 ${
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
            title={isRo ? "Golește planul" : "Clear plan"}
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
      {/* TAB 1: SCOPE & DISCUSSION AREAS */}
      {/* ======================================================== */}
      {activeTab === "scope" && (
        <div className="p-6 sm:p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-xl space-y-6">
          <div className="space-y-1 pb-4 border-b border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
              {isRo ? "SCOP REVIZUIRE & TEMATICI CHEIE" : "REVIEW SCOPE & TOPICS"}
            </span>
            <h3 className="text-xl font-heading font-bold text-white">
              {plan.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-zinc-300 font-medium">{isRo ? "Titlu Ședință Revizuire *" : "Review Meeting Title *"}</label>
              <Input
                value={plan.title}
                onChange={(e) => setPlan({ ...plan, title: e.target.value })}
                className="h-11 bg-zinc-900 border-zinc-800 text-white rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">{isRo ? "Tip Revizuire" : "Review Type"}</label>
              <select
                value={plan.reviewType}
                onChange={(e) => setPlan({ ...plan, reviewType: e.target.value as ReviewType })}
                className="w-full h-11 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none"
              >
                {Object.entries(isRo ? REVIEW_TYPE_LABELS_RO : REVIEW_TYPE_LABELS_EN).map(([t, lbl]) => (
                  <option key={t} value={t}>
                    {lbl}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">{isRo ? "Dată Planificată Întâlnire" : "Planned Review Date"}</label>
              <Input
                type="date"
                value={plan.plannedDate || ""}
                onChange={(e) => setPlan({ ...plan, plannedDate: e.target.value })}
                className="h-11 bg-zinc-900 border-zinc-800 text-white rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-zinc-300 font-medium">{isRo ? "Participanți / Persoane Implicate" : "Participants / Roles"}</label>
              <Input
                placeholder="Ex: Cristian Văduva (Broker), Client, Director Financiar..."
                value={plan.participants || ""}
                onChange={(e) => setPlan({ ...plan, participants: e.target.value })}
                className="h-11 bg-zinc-900 border-zinc-800 text-white rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-zinc-300 font-medium">{isRo ? "Context General & Obiective Urmărite" : "General Context & Goals"}</label>
              <textarea
                rows={2}
                placeholder={isRo ? "Scurt context despre evoluția patrimoniului sau schimbările dorite..." : "Context..."}
                value={plan.generalContext || ""}
                onChange={(e) => setPlan({ ...plan, generalContext: e.target.value })}
                className="w-full p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="text-zinc-300 font-bold text-xs block">
              {isRo ? "Selectează Tematicile de Discutat (Multi-Select):" : "Select Discussion Areas:"}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
              {Object.entries(isRo ? DISCUSSION_AREA_LABELS_RO : DISCUSSION_AREA_LABELS_EN).map(([area, lbl]) => {
                const isSelected = plan.selectedAreas.includes(area as DiscussionArea);
                return (
                  <div
                    key={area}
                    onClick={() => toggleArea(area as DiscussionArea)}
                    className={`cursor-pointer p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-blue-600/10 border-blue-500 text-white"
                        : "bg-zinc-900/40 border-zinc-800/80 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span className="font-medium text-xs truncate">{lbl}</span>
                    <span className={`text-xs font-bold ${isSelected ? "text-blue-400" : "text-transparent"}`}>✓</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-zinc-800">
            <Button
              type="button"
              onClick={() => setActiveTab("changes")}
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 px-6 flex items-center gap-2"
            >
              <span>{isRo ? "Mergi la Registrul de Schimbări" : "Proceed to Change Register"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: CHANGE REGISTER */}
      {/* ======================================================== */}
      {activeTab === "changes" && (
        <div className="p-6 sm:p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                {isRo ? "REGISTRU SCHIMBĂRI RECENTE ÎN PATRIMONIU" : "CHANGE REGISTER"}
              </span>
              <h3 className="text-xl font-heading font-bold text-white">
                {isRo ? "Ce s-a schimbat de la ultima revizuire?" : "What changed since your last review?"}
              </h3>
            </div>

            <Button
              type="button"
              onClick={openAddChange}
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10 px-4 flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>{isRo ? "Adaugă Schimbare" : "Add Change"}</span>
            </Button>
          </div>

          {plan.changes.length === 0 ? (
            <div className="p-12 text-center space-y-3 rounded-3xl bg-zinc-900/40 border border-zinc-800/80">
              <Sparkles className="w-10 h-10 text-zinc-600 mx-auto" />
              <h4 className="text-sm font-bold text-white">
                {isRo ? "Nicio schimbare înregistrată" : "No changes recorded"}
              </h4>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                {isRo
                  ? "Consemnează renovările, achizițiile auto sau schimbările de activitate pentru a le discuta cu brokerul."
                  : "Record renovations, auto purchases, or business shifts to discuss with your advisor."}
              </p>
              <Button
                type="button"
                onClick={openAddChange}
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10 px-5"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                {isRo ? "Adaugă Prima Schimbare" : "Add First Change"}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {plan.changes.map((ch) => {
                const areaLabel = isRo ? DISCUSSION_AREA_LABELS_RO[ch.category] : DISCUSSION_AREA_LABELS_EN[ch.category];
                const statusLabel = isRo ? CHANGE_STATUS_LABELS_RO[ch.status] : CHANGE_STATUS_LABELS_EN[ch.status];

                return (
                  <div
                    key={ch.id}
                    className="p-4 sm:p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-zinc-900 text-blue-400 border border-zinc-800">
                          {areaLabel}
                        </span>
                        {ch.changeDate && (
                          <span className="text-[11px] text-zinc-400 font-mono">
                            {ch.changeDate}
                          </span>
                        )}
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                            ch.status === "to_discuss"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              : ch.status === "discussed"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-zinc-800 text-zinc-400 border-zinc-700"
                          }`}
                        >
                          {statusLabel}
                        </span>
                      </div>
                      <p className="text-zinc-200 font-medium text-xs pt-1">{ch.description}</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => openEditChange(ch)}
                        className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteChange(ch.id)}
                        className="p-1.5 rounded-lg bg-zinc-900 text-zinc-500 hover:text-rose-400 border border-zinc-800"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: DISCUSSION AGENDA */}
      {/* ======================================================== */}
      {activeTab === "agenda" && (
        <div className="p-6 sm:p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                {isRo ? "AGENDA DE DISCUȚIE & ÎNTREBĂRI CLARIFICATOARE" : "DISCUSSION AGENDA"}
              </span>
              <h3 className="text-xl font-heading font-bold text-white">
                {isRo ? "Subiecte și întrebări pregătite pentru întâlnire" : "Key questions and topics for the review"}
              </h3>
            </div>

            <Button
              type="button"
              onClick={openAddAgenda}
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10 px-4 flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>{isRo ? "Adaugă Întrebare" : "Add Question"}</span>
            </Button>
          </div>

          <div className="space-y-3">
            {plan.agenda.map((ag) => {
              const areaLabel = isRo ? DISCUSSION_AREA_LABELS_RO[ag.area] : DISCUSSION_AREA_LABELS_EN[ag.area];
              const statusLabel = isRo ? AGENDA_STATUS_LABELS_RO[ag.status] : AGENDA_STATUS_LABELS_EN[ag.status];

              return (
                <div
                  key={ag.id}
                  className="p-4 sm:p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all space-y-2 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-zinc-900 text-blue-400 border border-zinc-800">
                        {areaLabel}
                      </span>
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          ag.priority === "high"
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            : "bg-zinc-800 text-zinc-300"
                        }`}
                      >
                        {ag.priority}
                      </span>
                      <span className="text-[10px] text-zinc-400">
                        Status: <strong className="text-zinc-200">{statusLabel}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => openEditAgenda(ag)}
                        className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteAgenda(ag.id)}
                        className="p-1.5 rounded-lg bg-zinc-900 text-zinc-500 hover:text-rose-400 border border-zinc-800"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h4 className="text-sm font-heading font-bold text-white">{ag.title}</h4>
                  {ag.questionDetails && (
                    <p className="text-xs text-zinc-300 leading-relaxed">{ag.questionDetails}</p>
                  )}
                  {ag.advisorNotes && (
                    <div className="p-2.5 rounded-xl bg-zinc-950 text-zinc-400 italic text-[11px]">
                      {isRo ? "Răspuns / Notițe Consultant:" : "Advisor Notes:"} {ag.advisorNotes}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: DECISION REGISTER */}
      {/* ======================================================== */}
      {activeTab === "decisions" && (
        <div className="p-6 sm:p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                {isRo ? "REGISTRU DECIZII & RESPONSABILITĂȚI" : "DECISION REGISTER"}
              </span>
              <h3 className="text-xl font-heading font-bold text-white">
                {isRo ? "Decizii convenite și pași de urmat" : "Agreed decisions and action items"}
              </h3>
            </div>

            <Button
              type="button"
              onClick={openAddDecision}
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10 px-4 flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>{isRo ? "Adaugă Decizie" : "Add Decision"}</span>
            </Button>
          </div>

          {plan.decisions.length === 0 ? (
            <div className="p-12 text-center space-y-3 rounded-3xl bg-zinc-900/40 border border-zinc-800/80">
              <CalendarCheck className="w-10 h-10 text-zinc-600 mx-auto" />
              <h4 className="text-sm font-bold text-white">
                {isRo ? "Nicio decizie înregistrată încă" : "No decisions recorded yet"}
              </h4>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                {isRo
                  ? "Consemnează concluziile ședinței, persoana responsabilă și termenul limită stabilit."
                  : "Record meeting outcomes, assigned parties, and target deadlines."}
              </p>
              <Button
                type="button"
                onClick={openAddDecision}
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10 px-5"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                {isRo ? "Adaugă Prima Decizie" : "Add First Decision"}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {plan.decisions.map((dec) => {
                const outcomeLabel = isRo ? DECISION_OUTCOME_LABELS_RO[dec.outcome] : DECISION_OUTCOME_LABELS_EN[dec.outcome];
                const respLabel = isRo ? RESPONSIBLE_PARTY_LABELS_RO[dec.responsibleParty] : RESPONSIBLE_PARTY_LABELS_EN[dec.responsibleParty];

                return (
                  <div
                    key={dec.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-2 text-xs ${
                      dec.isCompleted
                        ? "bg-zinc-950/60 border-zinc-800/60 opacity-75"
                        : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border ${
                            dec.outcome === "agreed"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : dec.outcome === "further_info_required"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              : "bg-zinc-800 text-zinc-300"
                          }`}
                        >
                          {outcomeLabel}
                        </span>
                        <span className="text-[11px] text-zinc-400">
                          {isRo ? "Responsabil:" : "Responsible:"} <strong className="text-zinc-200">{respLabel}</strong>
                        </span>
                        {dec.targetFollowUpDate && (
                          <span className="text-[11px] font-mono text-blue-400">
                            Scadență: {dec.targetFollowUpDate}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleDecisionCompleted(dec.id)}
                          className={`text-xs px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
                            dec.isCompleted
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{dec.isCompleted ? (isRo ? "Finalizat" : "Completed") : (isRo ? "Deschis" : "Open")}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => openEditDecision(dec)}
                          className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteDecision(dec.id)}
                          className="p-1.5 rounded-lg bg-zinc-900 text-zinc-500 hover:text-rose-400 border border-zinc-800"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h4 className={`text-sm font-heading font-bold ${dec.isCompleted ? "line-through text-zinc-400" : "text-white"}`}>
                      {dec.decisionText}
                    </h4>

                    {dec.followUpAction && (
                      <p className="text-xs text-zinc-300">
                        <strong className="text-blue-400">{isRo ? "Acțiune de urmat:" : "Action:"}</strong> {dec.followUpAction}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: ACTION SUMMARY & EXPORT */}
      {/* ======================================================== */}
      {activeTab === "summary" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                  {isRo ? "SUMAR ACȚIUNI & EXPORT DOSAR" : "ACTION SUMMARY & EXPORT"}
                </span>
                <h3 className="text-xl font-heading font-bold text-white">
                  {plan.title}
                </h3>
              </div>

              <Button
                type="button"
                onClick={handleDownloadPdf}
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 px-5 flex items-center gap-1.5 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>{isRo ? "Descarcă Raport PDF" : "Download PDF Summary"}</span>
              </Button>
            </div>

            {/* METRICS CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                <span className="text-zinc-500 font-semibold">{isRo ? "Întrebări Deschise" : "Open Questions"}</span>
                <div className="text-2xl font-bold text-white">{openAgendaCount}</div>
              </div>
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 space-y-1">
                <span className="font-semibold">{isRo ? "Prioritate Mare" : "High Priority"}</span>
                <div className="text-2xl font-bold">{highPriorityCount}</div>
              </div>
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 space-y-1">
                <span className="font-semibold">{isRo ? "Decizii în Așteptare" : "Decisions Pending"}</span>
                <div className="text-2xl font-bold">{pendingDecisionsCount}</div>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 space-y-1">
                <span className="font-semibold">{isRo ? "Total Decizii" : "Total Decisions"}</span>
                <div className="text-2xl font-bold">{plan.decisions.length}</div>
              </div>
            </div>

            {/* ADVISORY CTA */}
            <div className="p-6 rounded-3xl bg-blue-600/10 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-bold text-white">
                  {isRo ? "Dorești o ședință de revizuire cu Cristian Văduva?" : "Book your insurance review meeting with Cristian Vaduva"}
                </h4>
                <p className="text-xs text-zinc-400">
                  {isRo ? "Trimite solicitarea pentru stabilirea datei și auditul preliminar al portofoliului tău." : "Schedule an independent meeting to review your active policies and asset portfolio."}
                </p>
              </div>
              <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 px-6 shrink-0">
                <Link href="/verifica-polita">
                  {isRo ? "Solicită Întâlnire &rarr;" : "Request Meeting &rarr;"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRIVACY & LOCAL MEMORY NOTICE */}
      <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-2 text-xs text-zinc-400">
        <div className="flex items-center gap-2 text-zinc-300 font-bold">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>{isRo ? "Confidențialitate Totală & Stocare Volatilă" : "Total Privacy & Active Session Memory"}</span>
        </div>
        <p className="leading-relaxed">
          {isRo
            ? "Toate datele din acest planificator sunt procesate exclusiv în memoria locală a browserului tău pe durata sesiunii active. Nu sunt transmise către baze de date, servere sau terți. Descarcă fișierul PDF sau backup-ul JSON pentru păstrare offline înainte de reîncărcarea paginii."
            : "All meeting planning information is processed strictly in active browser memory. No data is stored on external servers or databases. Download your PDF or JSON backup before closing the tab."}
        </p>
      </div>

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT CHANGE */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isChangeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg p-6 sm:p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-2xl relative space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <h3 className="text-base font-heading font-bold text-white">
                  {editingChange
                    ? isRo ? "Editează Schimbare" : "Edit Change"
                    : isRo ? "Adaugă Schimbare Patrimoniu" : "Add Asset Change"}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsChangeModalOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900 border border-zinc-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveChange} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">{isRo ? "Tematică / Categorie" : "Category"}</label>
                    <select
                      value={chCategory}
                      onChange={(e) => setChCategory(e.target.value as DiscussionArea)}
                      className="w-full h-10 px-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none"
                    >
                      {Object.entries(isRo ? DISCUSSION_AREA_LABELS_RO : DISCUSSION_AREA_LABELS_EN).map(([cat, lbl]) => (
                        <option key={cat} value={cat}>
                          {lbl}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">{isRo ? "Dată Aproximativă" : "Date of Change"}</label>
                    <Input
                      type="date"
                      value={chDate}
                      onChange={(e) => setChDate(e.target.value)}
                      className="h-10 bg-zinc-900 border-zinc-800 text-white rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-medium">{isRo ? "Descriere Schimbare *" : "Change Description *"}</label>
                  <textarea
                    rows={3}
                    placeholder={isRo ? "Ex: Renovare acoperiș, achiziție echipament nou, schimbare domiciliu..." : "Description..."}
                    value={chDesc}
                    onChange={(e) => setChDesc(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-medium">{isRo ? "Status Discuție" : "Discussion Status"}</label>
                  <select
                    value={chStatus}
                    onChange={(e) => setChStatus(e.target.value as ChangeStatus)}
                    className="w-full h-10 px-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none"
                  >
                    {Object.entries(isRo ? CHANGE_STATUS_LABELS_RO : CHANGE_STATUS_LABELS_EN).map(([st, lbl]) => (
                      <option key={st} value={st}>
                        {lbl}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsChangeModalOpen(false)}
                    className="flex-1 rounded-xl border-zinc-800 text-zinc-300 text-xs h-10"
                  >
                    {isRo ? "Anulează" : "Cancel"}
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10"
                  >
                    {isRo ? "Salvează Schimbarea" : "Save Change"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT AGENDA ITEM */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isAgendaModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg p-6 sm:p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-2xl relative space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <h3 className="text-base font-heading font-bold text-white">
                  {editingAgenda
                    ? isRo ? "Editează Întrebare Agendă" : "Edit Agenda Question"
                    : isRo ? "Adaugă Întrebare în Agendă" : "Add Agenda Question"}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAgendaModalOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900 border border-zinc-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveAgenda} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-medium">{isRo ? "Titlu Subiect *" : "Topic Title *"}</label>
                  <Input
                    placeholder={isRo ? "Ex: Verificare franșiză inundație, Sublimită bijuterii..." : "Topic..."}
                    value={agTitle}
                    onChange={(e) => setAgTitle(e.target.value)}
                    required
                    className="h-10 bg-zinc-900 border-zinc-800 text-white rounded-xl text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">{isRo ? "Tematică" : "Area"}</label>
                    <select
                      value={agArea}
                      onChange={(e) => setAgArea(e.target.value as DiscussionArea)}
                      className="w-full h-10 px-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none"
                    >
                      {Object.entries(isRo ? DISCUSSION_AREA_LABELS_RO : DISCUSSION_AREA_LABELS_EN).map(([cat, lbl]) => (
                        <option key={cat} value={cat}>
                          {lbl}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">{isRo ? "Prioritate" : "Priority"}</label>
                    <select
                      value={agPriority}
                      onChange={(e) => setAgPriority(e.target.value as AgendaPriority)}
                      className="w-full h-10 px-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none"
                    >
                      <option value="high">{isRo ? "Mare (High)" : "High"}</option>
                      <option value="normal">{isRo ? "Normală" : "Normal"}</option>
                      <option value="low">{isRo ? "Scăzută" : "Low"}</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-medium">{isRo ? "Detalii Întrebare / Scenariu" : "Detailed Question"}</label>
                  <textarea
                    rows={2}
                    placeholder={isRo ? "Formulează întrebarea exactă pe care dorești să o adresezi..." : "Question..."}
                    value={agDetails}
                    onChange={(e) => setAgDetails(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-medium">{isRo ? "Status" : "Status"}</label>
                  <select
                    value={agStatus}
                    onChange={(e) => setAgStatus(e.target.value as AgendaStatus)}
                    className="w-full h-10 px-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none"
                  >
                    {Object.entries(isRo ? AGENDA_STATUS_LABELS_RO : AGENDA_STATUS_LABELS_EN).map(([st, lbl]) => (
                      <option key={st} value={st}>
                        {lbl}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAgendaModalOpen(false)}
                    className="flex-1 rounded-xl border-zinc-800 text-zinc-300 text-xs h-10"
                  >
                    {isRo ? "Anulează" : "Cancel"}
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10"
                  >
                    {isRo ? "Salvează Întrebarea" : "Save Question"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT DECISION */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isDecisionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg p-6 sm:p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-2xl relative space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <h3 className="text-base font-heading font-bold text-white">
                  {editingDecision
                    ? isRo ? "Editează Decizie" : "Edit Decision"
                    : isRo ? "Adaugă Decizie / Rezoluție" : "Add Decision"}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsDecisionModalOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900 border border-zinc-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveDecision} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-medium">{isRo ? "Decizie Convenită *" : "Agreed Decision *"}</label>
                  <textarea
                    rows={2}
                    placeholder={isRo ? "Ex: Majorare sumă asigurată la 200.000 EUR, trimitere cotații CASCO alternative..." : "Decision text..."}
                    value={decText}
                    onChange={(e) => setDecText(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">{isRo ? "Rezultat / Concluzie" : "Outcome"}</label>
                    <select
                      value={decOutcome}
                      onChange={(e) => setDecOutcome(e.target.value as DecisionOutcome)}
                      className="w-full h-10 px-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none"
                    >
                      {Object.entries(isRo ? DECISION_OUTCOME_LABELS_RO : DECISION_OUTCOME_LABELS_EN).map(([o, lbl]) => (
                        <option key={o} value={o}>
                          {lbl}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">{isRo ? "Responsabil Acțiune" : "Responsible Party"}</label>
                    <select
                      value={decResp}
                      onChange={(e) => setDecResp(e.target.value as ResponsibleParty)}
                      className="w-full h-10 px-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none"
                    >
                      {Object.entries(isRo ? RESPONSIBLE_PARTY_LABELS_RO : RESPONSIBLE_PARTY_LABELS_EN).map(([r, lbl]) => (
                        <option key={r} value={r}>
                          {lbl}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">{isRo ? "Următorul Pas (Action Item)" : "Action Item"}</label>
                    <Input
                      placeholder={isRo ? "Ex: Trimitere ofertă nouă..." : "Action item..."}
                      value={decAction}
                      onChange={(e) => setDecAction(e.target.value)}
                      className="h-10 bg-zinc-900 border-zinc-800 text-white rounded-xl text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">{isRo ? "Termen Limită (Follow-up)" : "Target Date"}</label>
                    <Input
                      type="date"
                      value={decTargetDate}
                      onChange={(e) => setDecTargetDate(e.target.value)}
                      className="h-10 bg-zinc-900 border-zinc-800 text-white rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDecisionModalOpen(false)}
                    className="flex-1 rounded-xl border-zinc-800 text-zinc-300 text-xs h-10"
                  >
                    {isRo ? "Anulează" : "Cancel"}
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10"
                  >
                    {isRo ? "Salvează Decizia" : "Save Decision"}
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
                {isRo ? "Golești planul de revizuire curent?" : "Clear active review plan?"}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {isRo
                  ? "Această acțiune va reseta toate întrebările, schimbările și deciziile din memoria activă. Asigură-te că ai descărcat un raport PDF sau backup JSON."
                  : "This will clear all in-memory agenda items and decisions. Download a PDF or JSON backup first if needed."}
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
