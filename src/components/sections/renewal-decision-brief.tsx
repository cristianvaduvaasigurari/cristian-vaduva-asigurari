"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCheck2,
  Plus,
  Trash2,
  Edit3,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Clock,
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
  Sparkles,
  ShieldAlert,
  CheckSquare,
  AlertCircle,
  TrendingDown,
  TrendingUp,
  FileCheck,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  RenewalDecisionBriefData,
  RenewalCategory,
  CurrencyCode,
  PaymentFrequency,
  InfoSourceType,
  DecisionStatus,
  ChangeDisclosureStatus,
  AgendaCategory,
  RecordedChange,
  UnresolvedItem,
  RenewalOption,
  DiscussionAgendaItem,
  OutstandingAction,
  CATEGORY_INFO,
  DECISION_STATUS_INFO,
  AGENDA_CATEGORY_INFO,
  FREQUENCY_LABELS,
  generateDecisionBriefSummary,
  generateSuggestedAgendaQuestions,
  generateRenewalDecisionBriefPdf,
  validateImportedDecisionBrief,
} from "@/lib/renewal-decision-brief";
import Link from "next/link";

const INITIAL_DEMO_DATA: RenewalDecisionBriefData = {
  schemaVersion: "1.0",
  exportedAt: new Date().toISOString(),
  policyReference: "Reînnoire Poliță CASCO & Locuință 2026",
  category: "casco",
  expiryDate: "2026-11-15",
  offerReceivedDate: "2026-10-01",
  intendedDecisionDate: "2026-10-25",
  currency: "EUR",
  currentPolicySummary: "CASCO All Risks cu franșiză 100 EUR și asistență extinsă VIP.",
  renewalOfferSummary: "Oferta nouă de reînnoire include o majorare de primă de 8%, dar păstrează franșiza neschimbată.",
  infoSource: "renewal_offer",
  changes: [
    {
      id: "chg_1",
      description: "Montare sistem antifurt GPS suplimentar omologat.",
      changeType: "asset_changes",
      dateOrPeriod: "2026-06",
      disclosureStatus: "disclosed",
      evidenceSource: "Factură montaj service autorizat",
      clarificationNeeded: false,
      notes: "Poate aduce reducere de primă pe clauza de furt.",
    },
  ],
  unresolvedItems: [
    {
      id: "unres_1",
      topicOrQuestion: "Este inclusă clauza de decontare directă la service-urile de reprezentanță fără avans?",
      responsibleParty: "Broker Asigurări",
      status: "in_progress",
      targetDate: "2026-10-20",
      recordedAnswer: "Așteptare confirmare scrisă din partea subscriitorului.",
    },
  ],
  options: [
    {
      id: "opt_1",
      label: "Polița actuală (Expiră în curând)",
      premiumAmount: 950,
      currency: "EUR",
      paymentFrequency: "annual",
      statedDeductible: "100 EUR / eveniment",
      coverageLimits: "42.000 EUR valoare agreată",
      importantExclusions: "Fără daune pe circuite închise",
      sourceAndDate: "Contract 2025-2026",
      userNotes: "Condiții bune, fără daune în ultimul an.",
    },
    {
      id: "opt_2",
      label: "Oferta de reînnoire primită",
      premiumAmount: 1025,
      currency: "EUR",
      paymentFrequency: "annual",
      statedDeductible: "100 EUR / eveniment",
      coverageLimits: "40.500 EUR (actualizat cu uzura de an)",
      importantExclusions: "Aceleași excluderi",
      sourceAndDate: "Ofertă email 01.10.2026",
      userNotes: "Preț ușor majorat, dar menține service-ul de reprezentanță.",
    },
  ],
  agendaItems: [
    {
      id: "ag_1",
      category: "limits_deductibles",
      topic: "Confirmarea valorii asigurate agreate pentru noul an de asigurare.",
      suggested: false,
      resolved: false,
    },
    {
      id: "ag_2",
      category: "missing_info_confirmation",
      topic: "Confirmarea primirii dovezii de montaj GPS pentru reducerea de primă.",
      suggested: false,
      resolved: true,
    },
  ],
  decisionStatus: "awaiting_clarification",
  decisionRationale: "Prefer să reînnoiesc cu asiguratorul actual dacă menține decontarea directă cu reprezentanța.",
  actions: [
    {
      id: "act_1",
      actionTitle: "Transmisie cerere clarificare decontare directă către broker",
      responsiblePerson: "Cristian Văduva (Broker)",
      targetDate: "2026-10-18",
      completed: true,
      writtenConfirmationReceived: "yes",
      documentReceived: "not_applicable",
    },
    {
      id: "act_2",
      actionTitle: "Emitere și semnare poliță nouă reînnoită",
      responsiblePerson: "Utilizator & Asigurator",
      targetDate: "2026-10-25",
      completed: false,
      writtenConfirmationReceived: "no",
      documentReceived: "no",
    },
  ],
};

export function RenewalDecisionBrief() {
  const [data, setData] = useState<RenewalDecisionBriefData>(INITIAL_DEMO_DATA);
  const [activeStep, setActiveStep] = useState<"step_a" | "step_b" | "step_c" | "step_d" | "report">("step_c");

  // Modals for Step B (Change & Unresolved)
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [editingChange, setEditingChange] = useState<RecordedChange | null>(null);
  const [changeFormData, setChangeFormData] = useState<Partial<RecordedChange>>({
    changeType: "asset_changes",
    disclosureStatus: "disclosed",
    clarificationNeeded: false,
  });

  const [isUnresolvedModalOpen, setIsUnresolvedModalOpen] = useState(false);
  const [editingUnresolved, setEditingUnresolved] = useState<UnresolvedItem | null>(null);
  const [unresolvedFormData, setUnresolvedFormData] = useState<Partial<UnresolvedItem>>({
    status: "pending",
  });

  // Modal for Step C (Option & Agenda)
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [editingOption, setEditingOption] = useState<RenewalOption | null>(null);
  const [optionFormData, setOptionFormData] = useState<Partial<RenewalOption>>({
    currency: "EUR",
    paymentFrequency: "annual",
  });

  const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false);
  const [editingAgenda, setEditingAgenda] = useState<DiscussionAgendaItem | null>(null);
  const [agendaFormData, setAgendaFormData] = useState<Partial<DiscussionAgendaItem>>({
    category: "coverage_exclusions",
    resolved: false,
  });

  // Modal for Step D (Action)
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [editingAction, setEditingAction] = useState<OutstandingAction | null>(null);
  const [actionFormData, setActionFormData] = useState<Partial<OutstandingAction>>({
    completed: false,
    writtenConfirmationReceived: "not_applicable",
    documentReceived: "not_applicable",
  });

  // Common deletion & reset
  const [itemToDelete, setItemToDelete] = useState<{ type: string; id: string; title: string } | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);

  const summary = useMemo(() => generateDecisionBriefSummary(data), [data]);

  // Handlers for Changes
  const handleSaveChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!changeFormData.description || !changeFormData.description.trim()) return;

    if (editingChange) {
      setData((prev) => ({
        ...prev,
        changes: prev.changes.map((c) =>
          c.id === editingChange.id
            ? ({ ...c, ...changeFormData, description: changeFormData.description!.trim() } as RecordedChange)
            : c
        ),
      }));
    } else {
      const newChange: RecordedChange = {
        id: `chg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        description: changeFormData.description.trim(),
        changeType: changeFormData.changeType || "asset_changes",
        dateOrPeriod: changeFormData.dateOrPeriod || undefined,
        disclosureStatus: changeFormData.disclosureStatus || "disclosed",
        evidenceSource: changeFormData.evidenceSource?.trim() || undefined,
        clarificationNeeded: Boolean(changeFormData.clarificationNeeded),
        notes: changeFormData.notes?.trim() || undefined,
      };
      setData((prev) => ({ ...prev, changes: [...prev.changes, newChange] }));
    }
    setIsChangeModalOpen(false);
    setEditingChange(null);
  };

  // Handlers for Unresolved Items
  const handleSaveUnresolved = (e: React.FormEvent) => {
    e.preventDefault();
    if (!unresolvedFormData.topicOrQuestion || !unresolvedFormData.topicOrQuestion.trim()) return;

    if (editingUnresolved) {
      setData((prev) => ({
        ...prev,
        unresolvedItems: prev.unresolvedItems.map((u) =>
          u.id === editingUnresolved.id
            ? ({ ...u, ...unresolvedFormData, topicOrQuestion: unresolvedFormData.topicOrQuestion!.trim() } as UnresolvedItem)
            : u
        ),
      }));
    } else {
      const newUnresolved: UnresolvedItem = {
        id: `unres_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        topicOrQuestion: unresolvedFormData.topicOrQuestion.trim(),
        responsibleParty: unresolvedFormData.responsibleParty?.trim() || undefined,
        status: unresolvedFormData.status || "pending",
        targetDate: unresolvedFormData.targetDate || undefined,
        recordedAnswer: unresolvedFormData.recordedAnswer?.trim() || undefined,
      };
      setData((prev) => ({ ...prev, unresolvedItems: [...prev.unresolvedItems, newUnresolved] }));
    }
    setIsUnresolvedModalOpen(false);
    setEditingUnresolved(null);
  };

  // Handlers for Options
  const handleSaveOption = (e: React.FormEvent) => {
    e.preventDefault();
    if (!optionFormData.label || !optionFormData.label.trim()) return;

    if (editingOption) {
      setData((prev) => ({
        ...prev,
        options: prev.options.map((o) =>
          o.id === editingOption.id
            ? ({ ...o, ...optionFormData, label: optionFormData.label!.trim() } as RenewalOption)
            : o
        ),
      }));
    } else {
      const newOption: RenewalOption = {
        id: `opt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        label: optionFormData.label.trim(),
        premiumAmount: optionFormData.premiumAmount !== undefined && !isNaN(optionFormData.premiumAmount) ? Number(optionFormData.premiumAmount) : undefined,
        currency: optionFormData.currency || data.currency,
        paymentFrequency: optionFormData.paymentFrequency || "annual",
        statedDeductible: optionFormData.statedDeductible?.trim() || undefined,
        coverageLimits: optionFormData.coverageLimits?.trim() || undefined,
        importantExclusions: optionFormData.importantExclusions?.trim() || undefined,
        sourceAndDate: optionFormData.sourceAndDate?.trim() || undefined,
        missingInformation: optionFormData.missingInformation?.trim() || undefined,
        userNotes: optionFormData.userNotes?.trim() || undefined,
      };
      setData((prev) => ({ ...prev, options: [...prev.options, newOption] }));
    }
    setIsOptionModalOpen(false);
    setEditingOption(null);
  };

  // Handlers for Agenda
  const handleSaveAgenda = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agendaFormData.topic || !agendaFormData.topic.trim()) return;

    if (editingAgenda) {
      setData((prev) => ({
        ...prev,
        agendaItems: prev.agendaItems.map((a) =>
          a.id === editingAgenda.id
            ? ({ ...a, ...agendaFormData, topic: agendaFormData.topic!.trim() } as DiscussionAgendaItem)
            : a
        ),
      }));
    } else {
      const newAg: DiscussionAgendaItem = {
        id: `ag_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        category: agendaFormData.category || "coverage_exclusions",
        topic: agendaFormData.topic.trim(),
        suggested: false,
        notes: agendaFormData.notes?.trim() || undefined,
        resolved: Boolean(agendaFormData.resolved),
      };
      setData((prev) => ({ ...prev, agendaItems: [...prev.agendaItems, newAg] }));
    }
    setIsAgendaModalOpen(false);
    setEditingAgenda(null);
  };

  const handleSuggestAgendaQuestions = () => {
    const suggested = generateSuggestedAgendaQuestions(data);
    const existing = new Set(data.agendaItems.map((a) => a.topic.toLowerCase().trim()));
    const toAdd = suggested.filter((s) => !existing.has(s.topic.toLowerCase().trim()));

    if (toAdd.length > 0) {
      setData((prev) => ({ ...prev, agendaItems: [...prev.agendaItems, ...toAdd] }));
    }
  };

  // Handlers for Actions
  const handleSaveAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionFormData.actionTitle || !actionFormData.actionTitle.trim()) return;

    if (editingAction) {
      setData((prev) => ({
        ...prev,
        actions: prev.actions.map((act) =>
          act.id === editingAction.id
            ? ({ ...act, ...actionFormData, actionTitle: actionFormData.actionTitle!.trim() } as OutstandingAction)
            : act
        ),
      }));
    } else {
      const newAct: OutstandingAction = {
        id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        actionTitle: actionFormData.actionTitle.trim(),
        responsiblePerson: actionFormData.responsiblePerson?.trim() || undefined,
        targetDate: actionFormData.targetDate || undefined,
        completed: Boolean(actionFormData.completed),
        writtenConfirmationReceived: actionFormData.writtenConfirmationReceived || "not_applicable",
        documentReceived: actionFormData.documentReceived || "not_applicable",
      };
      setData((prev) => ({ ...prev, actions: [...prev.actions, newAct] }));
    }
    setIsActionModalOpen(false);
    setEditingAction(null);
  };

  // Deletion dispatcher
  const handleDeleteItem = () => {
    if (!itemToDelete) return;
    const { type, id } = itemToDelete;

    if (type === "change") {
      setData((prev) => ({ ...prev, changes: prev.changes.filter((c) => c.id !== id) }));
    } else if (type === "unresolved") {
      setData((prev) => ({ ...prev, unresolvedItems: prev.unresolvedItems.filter((u) => u.id !== id) }));
    } else if (type === "option") {
      setData((prev) => ({ ...prev, options: prev.options.filter((o) => o.id !== id) }));
    } else if (type === "agenda") {
      setData((prev) => ({ ...prev, agendaItems: prev.agendaItems.filter((a) => a.id !== id) }));
    } else if (type === "action") {
      setData((prev) => ({ ...prev, actions: prev.actions.filter((act) => act.id !== id) }));
    }
    setItemToDelete(null);
  };

  // Workspace reset
  const handleResetWorkspace = () => {
    setData({
      schemaVersion: "1.0",
      exportedAt: new Date().toISOString(),
      policyReference: "",
      category: "rca",
      currency: "RON",
      changes: [],
      unresolvedItems: [],
      options: [],
      agendaItems: [],
      decisionStatus: "not_decided",
      actions: [],
    });
    setIsResetConfirmOpen(false);
  };

  // Export / Import
  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `decizie-reinnoire-${(data.policyReference || "dosar").toLowerCase().replace(/[^a-z0-9]/g, "-")}-${new Date().toISOString().split("T")[0]}.json`;
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
        const result = validateImportedDecisionBrief(parsed);

        if (!result.valid || !result.data) {
          setImportError(result.error || "Fișierul JSON nu este valid.");
          setImportSuccess(null);
          return;
        }

        setData(result.data);
        setImportError(null);
        setImportSuccess("Fișa de decizie a fost importată cu succes!");
        setTimeout(() => setImportSuccess(null), 5000);
      } catch {
        setImportError("Eroare la procesarea fișierului JSON.");
        setImportSuccess(null);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleExportPdf = () => {
    generateRenewalDecisionBriefPdf(data);
  };

  const decStatusInfo = DECISION_STATUS_INFO[data.decisionStatus];

  return (
    <div className="space-y-8">
      {/* Top Header Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-400 text-xs font-medium uppercase tracking-wider">Status Decizie</div>
          <div className="mt-1">
            <span
              className={`px-2 py-0.5 rounded text-xs font-bold border ${
                decStatusInfo.color === "emerald"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : decStatusInfo.color === "blue"
                  ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  : decStatusInfo.color === "amber"
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  : "bg-zinc-800 text-zinc-300 border-zinc-700"
              }`}
            >
              {decStatusInfo.labelRo}
            </span>
          </div>
          <div className="text-[11px] text-zinc-500 mt-1">Consemnat de utilizator</div>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-400 text-xs font-medium uppercase tracking-wider">Expirare Poliță</div>
          <div
            className={`text-lg sm:text-xl font-bold mt-1 ${
              summary.hasExpiryPassed
                ? "text-red-400"
                : summary.daysUntilExpiry !== null && summary.daysUntilExpiry <= 7
                ? "text-amber-400"
                : "text-white"
            }`}
          >
            {data.expiryDate || <span className="text-zinc-500 text-sm italic">Nespecificată</span>}
          </div>
          <div className="text-[11px] text-zinc-500 mt-1">
            {summary.hasExpiryPassed
              ? "Expirată conform datei notate"
              : summary.daysUntilExpiry !== null
              ? `${summary.daysUntilExpiry} zile rămase`
              : "Dată nesetată"}
          </div>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-400 text-xs font-medium uppercase tracking-wider">Opțiuni Notate</div>
          <div className="text-2xl sm:text-3xl font-bold text-blue-400 mt-1">{data.options.length}</div>
          <div className="text-[11px] text-zinc-500 mt-1">Oferte & alternative</div>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-400 text-xs font-medium uppercase tracking-wider">Modificări de Risc</div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-400 mt-1">{data.changes.length}</div>
          <div className="text-[11px] text-zinc-500 mt-1">Bunuri & expuneri noi</div>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-400 text-xs font-medium uppercase tracking-wider">Clarificări Deschise</div>
          <div className="text-2xl sm:text-3xl font-bold text-purple-400 mt-1">
            {data.unresolvedItems.filter((i) => i.status !== "resolved").length}
          </div>
          <div className="text-[11px] text-zinc-500 mt-1">Întrebări fără răspuns</div>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-400 text-xs font-medium uppercase tracking-wider">Acțiuni Deschise</div>
          <div className="text-2xl sm:text-3xl font-bold text-teal-400 mt-1">{summary.outstandingActionsCount}</div>
          <div className="text-[11px] text-zinc-500 mt-1">Din {data.actions.length} sarcini</div>
        </div>
      </div>

      {/* Main 4-Step Navigation Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-1.5 p-1 bg-zinc-900/90 border border-zinc-800 rounded-xl overflow-x-auto">
          <button
            onClick={() => setActiveStep("step_a")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeStep === "step_a"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>A. Context Poliță</span>
          </button>

          <button
            onClick={() => setActiveStep("step_b")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeStep === "step_b"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>B. Modificări & Clarificări ({data.changes.length + data.unresolvedItems.length})</span>
          </button>

          <button
            onClick={() => setActiveStep("step_c")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeStep === "step_c"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>C. Opțiuni & Agendă ({data.options.length})</span>
          </button>

          <button
            onClick={() => setActiveStep("step_d")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeStep === "step_d"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>D. Decizie & Acțiuni ({data.actions.length})</span>
          </button>

          <button
            onClick={() => setActiveStep("report")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeStep === "report"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Raport & Export</span>
          </button>
        </div>

        {/* Global Export Button */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportPdf}
            className="border-zinc-700 bg-zinc-800/60 text-zinc-300 hover:text-white hover:bg-zinc-800 text-xs"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Descarcă PDF
          </Button>
        </div>
      </div>

      {/* Notifications */}
      {importSuccess && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
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

      {/* STEP A: POLICY CONTEXT */}
      {activeStep === "step_a" && (
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white mb-2">Pasul A — Contextul Poliței și al Reînnoirii</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 mb-1 font-semibold">
                Denumire Poliță / Referință Dosar <span className="text-red-400">*</span>
              </label>
              <Input
                value={data.policyReference}
                onChange={(e) => setData({ ...data, policyReference: e.target.value })}
                placeholder="Ex: CASCO Autoturism, Asigurare Locuință..."
                className="bg-zinc-950 border-zinc-800 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-zinc-400 mb-1 font-semibold">Categorie Asigurare</label>
              <select
                value={data.category}
                onChange={(e) => setData({ ...data, category: e.target.value as RenewalCategory })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200"
              >
                {Object.keys(CATEGORY_INFO).map((k) => (
                  <option key={k} value={k}>
                    {CATEGORY_INFO[k as RenewalCategory].labelRo}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-zinc-400 mb-1 font-semibold">Dată Expirare Poliță Curentă</label>
              <Input
                type="date"
                value={data.expiryDate || ""}
                onChange={(e) => setData({ ...data, expiryDate: e.target.value })}
                className="bg-zinc-950 border-zinc-800 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-zinc-400 mb-1 font-semibold">Dată Primire Ofertă Reînnoire</label>
              <Input
                type="date"
                value={data.offerReceivedDate || ""}
                onChange={(e) => setData({ ...data, offerReceivedDate: e.target.value })}
                className="bg-zinc-950 border-zinc-800 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-zinc-400 mb-1 font-semibold">Dată Țintă pentru Decizie</label>
              <Input
                type="date"
                value={data.intendedDecisionDate || ""}
                onChange={(e) => setData({ ...data, intendedDecisionDate: e.target.value })}
                className="bg-zinc-950 border-zinc-800 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-zinc-400 mb-1 font-semibold">Sumar Poliță Curentă (Termeni existenți)</label>
              <textarea
                value={data.currentPolicySummary || ""}
                onChange={(e) => setData({ ...data, currentPolicySummary: e.target.value })}
                placeholder="Ex: Condiții actuale, franșiză, asistență inclusă..."
                rows={3}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200"
              />
            </div>

            <div>
              <label className="block text-zinc-400 mb-1 font-semibold">Sumar Ofertă Nouă (Schimbări sesizate)</label>
              <textarea
                value={data.renewalOfferSummary || ""}
                onChange={(e) => setData({ ...data, renewalOfferSummary: e.target.value })}
                placeholder="Ex: Preț nou, modificări de franșiză, clauze noi..."
                rows={3}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP B: CHANGES & UNRESOLVED ITEMS */}
      {activeStep === "step_b" && (
        <div className="space-y-6">
          {/* Changes Section */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">1. Modificări de Risc & Bunuri Survenite</h3>
                <p className="text-zinc-400 text-[11px] mt-0.5">
                  Schimbări de adresă, adăugare de echipamente, modificări de valoare sau daune recente.
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  setChangeFormData({
                    changeType: "asset_changes",
                    disclosureStatus: "disclosed",
                    clarificationNeeded: false,
                  });
                  setEditingChange(null);
                  setIsChangeModalOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-500 text-xs"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                Adaugă Modificare
              </Button>
            </div>

            {data.changes.length > 0 ? (
              <div className="space-y-3">
                {data.changes.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{c.description}</span>
                        {c.clarificationNeeded && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            Necesită clarificare
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        Perioadă: {c.dateOrPeriod || "Nespecificată"} | Declarat: {c.disclosureStatus === "disclosed" ? "Da" : "Nu"} | Sursă: {c.evidenceSource || "Nespecificată"}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => {
                          setChangeFormData({ ...c });
                          setEditingChange(c);
                          setIsChangeModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setItemToDelete({ type: "change", id: c.id, title: c.description })}
                        className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 text-zinc-500 italic text-center">
                Nu au fost notate modificări de risc.
              </div>
            )}
          </div>

          {/* Unresolved items Section */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">2. Registru Întrebări & Informații Neconfirmate</h3>
                <p className="text-zinc-400 text-[11px] mt-0.5">
                  Subiecte deschise care trebuie lămurite înainte de acceptarea ofertei.
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  setUnresolvedFormData({ status: "pending" });
                  setEditingUnresolved(null);
                  setIsUnresolvedModalOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-500 text-xs"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                Adaugă Întrebare
              </Button>
            </div>

            {data.unresolvedItems.length > 0 ? (
              <div className="space-y-3">
                {data.unresolvedItems.map((u) => (
                  <div
                    key={u.id}
                    className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-semibold text-white">Q: {u.topicOrQuestion}</div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            setUnresolvedFormData({ ...u });
                            setEditingUnresolved(u);
                            setIsUnresolvedModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setItemToDelete({ type: "unresolved", id: u.id, title: u.topicOrQuestion })}
                          className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-[11px] text-zinc-400 flex flex-wrap items-center gap-3">
                      <span>Status: <strong className={u.status === "resolved" ? "text-emerald-400" : "text-amber-400"}>{u.status === "resolved" ? "Clarificat" : "În așteptare"}</strong></span>
                      {u.responsibleParty && <span>Responsabil: {u.responsibleParty}</span>}
                      {u.targetDate && <span>Termen: {u.targetDate}</span>}
                    </div>
                    {u.recordedAnswer && (
                      <div className="text-[11px] text-emerald-300 p-2 rounded bg-zinc-900 border border-zinc-800">
                        Răspuns: {u.recordedAnswer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 text-zinc-500 italic text-center">
                Nu există întrebări nerezolvate înregistrate.
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP C: OPTIONS & AGENDA */}
      {activeStep === "step_c" && (
        <div className="space-y-6">
          {/* Options Comparison Cards */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">1. Opțiuni & Oferte de Reînnoire Notate</h3>
                <p className="text-zinc-400 text-[11px] mt-0.5">
                  Compară prețul, frecvența și termenii principali între oferta primită și variantele alternative.
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  setOptionFormData({ currency: data.currency, paymentFrequency: "annual" });
                  setEditingOption(null);
                  setIsOptionModalOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-500 text-xs"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                Adaugă Opțiune
              </Button>
            </div>

            {data.options.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.options.map((opt) => (
                  <div
                    key={opt.id}
                    className="bg-zinc-950 rounded-2xl p-4 border border-zinc-800 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-white text-sm">{opt.label}</h4>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setOptionFormData({ ...opt });
                              setEditingOption(opt);
                              setIsOptionModalOpen(true);
                            }}
                            className="p-1 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => setItemToDelete({ type: "option", id: opt.id, title: opt.label })}
                            className="p-1 rounded bg-zinc-800 text-zinc-400 hover:text-red-400"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1">
                        <div className="text-lg font-bold text-white">
                          {opt.premiumAmount !== undefined ? `${opt.premiumAmount.toLocaleString("ro-RO")} ${opt.currency}` : "Primă nespecificată"}
                        </div>
                        <div className="text-[11px] text-zinc-400">
                          {opt.paymentFrequency ? FREQUENCY_LABELS[opt.paymentFrequency] : "Frecvență n/a"}
                        </div>
                      </div>

                      <div className="space-y-1 text-[11px] text-zinc-300">
                        {opt.statedDeductible && <div>Franșiză: <strong>{opt.statedDeductible}</strong></div>}
                        {opt.coverageLimits && <div>Limite: <strong>{opt.coverageLimits}</strong></div>}
                        {opt.importantExclusions && <div className="text-amber-400/90">Excluderi: {opt.importantExclusions}</div>}
                        {opt.userNotes && <div className="italic text-zinc-400">&ldquo;{opt.userNotes}&rdquo;</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 text-zinc-500 italic text-center">
                Nu a fost adăugată nicio opțiune.
              </div>
            )}
          </div>

          {/* Agenda Section */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white">2. Agendă de Discuție cu Consilierul sau Asiguratorul</h3>
                <p className="text-zinc-400 text-[11px] mt-0.5">
                  Subiecte concrete structurate pe capitole pentru ședința de reînnoire.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSuggestAgendaQuestions}
                  className="border-zinc-700 bg-zinc-800 text-xs text-zinc-200"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1 text-purple-400" />
                  Sugerează Subiecte
                </Button>

                <Button
                  size="sm"
                  onClick={() => {
                    setAgendaFormData({ category: "coverage_exclusions", resolved: false });
                    setEditingAgenda(null);
                    setIsAgendaModalOpen(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-xs"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Adaugă Subiect
                </Button>
              </div>
            </div>

            {data.agendaItems.length > 0 ? (
              <div className="space-y-2">
                {data.agendaItems.map((ag) => (
                  <div
                    key={ag.id}
                    className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <button
                        onClick={() => {
                          setData((prev) => ({
                            ...prev,
                            agendaItems: prev.agendaItems.map((a) =>
                              a.id === ag.id ? { ...a, resolved: !a.resolved } : a
                            ),
                          }));
                        }}
                        className={`p-1 rounded border mt-0.5 transition-colors ${
                          ag.resolved
                            ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                            : "bg-zinc-900 border-zinc-700 text-transparent"
                        }`}
                      >
                        <Check className="w-3 h-3" />
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold text-blue-400">
                            {AGENDA_CATEGORY_INFO[ag.category]?.labelRo || ag.category}
                          </span>
                        </div>
                        <div className={`font-medium ${ag.resolved ? "line-through text-zinc-500" : "text-white"}`}>
                          {ag.topic}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => {
                          setAgendaFormData({ ...ag });
                          setEditingAgenda(ag);
                          setIsAgendaModalOpen(true);
                        }}
                        className="p-1 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setItemToDelete({ type: "agenda", id: ag.id, title: ag.topic })}
                        className="p-1 rounded bg-zinc-800 text-zinc-400 hover:text-red-400"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 text-zinc-500 italic text-center">
                Nu există subiecte în agendă. Apasă „Sugerează Subiecte” pentru a începe.
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP D: DECISION & ACTION PLAN */}
      {activeStep === "step_d" && (
        <div className="space-y-6">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white mb-2">Pasul D — Consemnarea Deciziei & Planul de Acțiune</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Status Decizie Asumată</label>
                <select
                  value={data.decisionStatus}
                  onChange={(e) => setData({ ...data, decisionStatus: e.target.value as DecisionStatus })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200"
                >
                  {Object.keys(DECISION_STATUS_INFO).map((k) => (
                    <option key={k} value={k}>
                      {DECISION_STATUS_INFO[k as DecisionStatus].labelRo}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Dată Decizie / Transmitere</label>
                <Input
                  type="date"
                  value={data.actualDecisionDate || ""}
                  onChange={(e) => setData({ ...data, actualDecisionDate: e.target.value })}
                  className="bg-zinc-950 border-zinc-800 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 mb-1 font-semibold">Motivație / Argumente Decizie</label>
              <textarea
                value={data.decisionRationale || ""}
                onChange={(e) => setData({ ...data, decisionRationale: e.target.value })}
                placeholder="Ex: Am acceptat oferta reînnoită deoarece diferența de preț este mică și păstrează acoperirile dorite..."
                rows={3}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200"
              />
            </div>
          </div>

          {/* Action Plan Table */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Plan de Acțiune & Finalizare Reînnoire</h3>
                <p className="text-zinc-400 text-[11px] mt-0.5">
                  Urmărește semnarea, transmiterea documentelor și primirea poliței oficiale.
                </p>
              </div>

              <Button
                size="sm"
                onClick={() => {
                  setActionFormData({
                    completed: false,
                    writtenConfirmationReceived: "not_applicable",
                    documentReceived: "not_applicable",
                  });
                  setEditingAction(null);
                  setIsActionModalOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-500 text-xs"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                Adaugă Acțiune
              </Button>
            </div>

            {data.actions.length > 0 ? (
              <div className="space-y-3">
                {data.actions.map((act) => (
                  <div
                    key={act.id}
                    className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <button
                        onClick={() => {
                          setData((prev) => ({
                            ...prev,
                            actions: prev.actions.map((a) =>
                              a.id === act.id ? { ...a, completed: !a.completed } : a
                            ),
                          }));
                        }}
                        className={`p-1 rounded border mt-0.5 transition-colors ${
                          act.completed
                            ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                            : "bg-zinc-900 border-zinc-700 text-transparent"
                        }`}
                      >
                        <Check className="w-3 h-3" />
                      </button>

                      <div className="space-y-0.5">
                        <div className={`font-semibold ${act.completed ? "line-through text-zinc-500" : "text-white"}`}>
                          {act.actionTitle}
                        </div>
                        <div className="text-[11px] text-zinc-400 flex flex-wrap items-center gap-3">
                          {act.responsiblePerson && <span>Responsabil: {act.responsiblePerson}</span>}
                          {act.targetDate && <span>Termen: {act.targetDate}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 self-end sm:self-auto">
                      <button
                        onClick={() => {
                          setActionFormData({ ...act });
                          setEditingAction(act);
                          setIsActionModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setItemToDelete({ type: "action", id: act.id, title: act.actionTitle })}
                        className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 text-zinc-500 italic text-center">
                Nu există acțiuni definite.
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 5: REPORT & BACKUP */}
      {activeStep === "report" && (
        <div className="space-y-6">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-6 text-xs">
            <div>
              <h3 className="text-lg font-bold text-white">Export & Backup Fișă de Decizie</h3>
              <p className="text-zinc-400 mt-1">
                Descarcă un dosar PDF structurat sau salvează un backup JSON securizat local în memoria browserului.
              </p>
            </div>

            {/* User Notes */}
            <div>
              <label className="block font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Notițe Finale / Concluzii Personale
              </label>
              <textarea
                value={data.userNotes || ""}
                onChange={(e) => setData({ ...data, userNotes: e.target.value })}
                placeholder="Ex: Decizie finalizată cu consilierul Cristian Văduva..."
                rows={3}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200"
              />
            </div>

            {/* Export Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col justify-between">
                <div>
                  <FileText className="w-6 h-6 text-blue-400 mb-2" />
                  <h4 className="text-sm font-semibold text-white">Raport PDF Structurat</h4>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Document PDF cu contextul, opțiunile, agenda de discuție și decizia asumată.
                  </p>
                </div>
                <Button onClick={handleExportPdf} className="mt-4 bg-blue-600 hover:bg-blue-500 text-xs">
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Descarcă PDF
                </Button>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col justify-between">
                <div>
                  <Download className="w-6 h-6 text-emerald-400 mb-2" />
                  <h4 className="text-sm font-semibold text-white">Export JSON Backup</h4>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Fișier securizat local pentru transfer între calculatoare sau reluarea sesiunii.
                  </p>
                </div>
                <Button onClick={handleExportJson} variant="outline" className="mt-4 border-zinc-700 text-xs">
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Export JSON
                </Button>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col justify-between">
                <div>
                  <Upload className="w-6 h-6 text-purple-400 mb-2" />
                  <h4 className="text-sm font-semibold text-white">Import Fișier JSON</h4>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Încarcă o fișă de decizie salvată anterior pentru a continua organizarea.
                  </p>
                </div>
                <label className="mt-4 inline-flex items-center justify-center rounded-md text-xs font-medium border border-zinc-700 bg-zinc-800 px-4 py-2 text-zinc-200 hover:bg-zinc-700 cursor-pointer">
                  <Upload className="w-3.5 h-3.5 mr-1.5" />
                  <span>Încarcă Fișier</span>
                  <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
                </label>
              </div>
            </div>

            {/* Privacy note & Reset button */}
            <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-zinc-500">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Toate datele rămân strict în memoria browserului tău și nu sunt trimise către servere.</span>
              </div>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => setIsResetConfirmOpen(true)}
                className="text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                Resetează Fișa
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT CHANGE */}
      <AnimatePresence>
        {isChangeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
                <h3 className="text-base font-bold text-white">
                  {editingChange ? "Editează Modificare" : "Adaugă Modificare de Risc"}
                </h3>
                <button onClick={() => setIsChangeModalOpen(false)} className="text-zinc-500 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleSaveChange} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    Descriere Modificare <span className="text-red-400">*</span>
                  </label>
                  <Input
                    required
                    value={changeFormData.description || ""}
                    onChange={(e) => setChangeFormData({ ...changeFormData, description: e.target.value })}
                    placeholder="Ex: Montaj GPS, Schimbare destinație clădire..."
                    className="bg-zinc-950 border-zinc-800 text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Perioadă / Dată</label>
                    <Input
                      value={changeFormData.dateOrPeriod || ""}
                      onChange={(e) => setChangeFormData({ ...changeFormData, dateOrPeriod: e.target.value })}
                      placeholder="Ex: Iunie 2026"
                      className="bg-zinc-950 border-zinc-800 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Declarat Asiguratorului?</label>
                    <select
                      value={changeFormData.disclosureStatus || "disclosed"}
                      onChange={(e) => setChangeFormData({ ...changeFormData, disclosureStatus: e.target.value as ChangeDisclosureStatus })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-200"
                    >
                      <option value="disclosed">Da (Declarat)</option>
                      <option value="not_disclosed">Nu (Nedeclarat încă)</option>
                      <option value="in_progress">În curs de declarare</option>
                      <option value="not_applicable">Nu se aplică</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Dovadă / Sursă Document</label>
                  <Input
                    value={changeFormData.evidenceSource || ""}
                    onChange={(e) => setChangeFormData({ ...changeFormData, evidenceSource: e.target.value })}
                    placeholder="Ex: Factură montaj, Certificat..."
                    className="bg-zinc-950 border-zinc-800 text-xs text-white"
                  />
                </div>
                <label className="flex items-center gap-2 text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={changeFormData.clarificationNeeded || false}
                    onChange={(e) => setChangeFormData({ ...changeFormData, clarificationNeeded: e.target.checked })}
                    className="rounded bg-zinc-950 border-zinc-700 text-blue-600"
                  />
                  <span>Necesită clarificare cu privire la declarare</span>
                </label>
                <div className="pt-4 border-t border-zinc-800 flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsChangeModalOpen(false)} className="border-zinc-700 text-xs">Anulează</Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs">Salvează</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD / EDIT UNRESOLVED ITEM */}
      <AnimatePresence>
        {isUnresolvedModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
                <h3 className="text-base font-bold text-white">
                  {editingUnresolved ? "Editează Întrebare" : "Adaugă Întrebare / Subiect Neclarificat"}
                </h3>
                <button onClick={() => setIsUnresolvedModalOpen(false)} className="text-zinc-500 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleSaveUnresolved} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    Întrebare / Subiect de Lămurit <span className="text-red-400">*</span>
                  </label>
                  <Input
                    required
                    value={unresolvedFormData.topicOrQuestion || ""}
                    onChange={(e) => setUnresolvedFormData({ ...unresolvedFormData, topicOrQuestion: e.target.value })}
                    placeholder="Ex: Este inclusă decontarea directă cu reprezentanța?"
                    className="bg-zinc-950 border-zinc-800 text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Responsabil</label>
                    <Input
                      value={unresolvedFormData.responsibleParty || ""}
                      onChange={(e) => setUnresolvedFormData({ ...unresolvedFormData, responsibleParty: e.target.value })}
                      placeholder="Ex: Broker, Asigurator..."
                      className="bg-zinc-950 border-zinc-800 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Status</label>
                    <select
                      value={unresolvedFormData.status || "pending"}
                      onChange={(e) => setUnresolvedFormData({ ...unresolvedFormData, status: e.target.value as "pending" | "in_progress" | "resolved" })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-200"
                    >
                      <option value="pending">În așteptare</option>
                      <option value="in_progress">În curs</option>
                      <option value="resolved">Clarificat</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Răspuns Notat</label>
                  <textarea
                    value={unresolvedFormData.recordedAnswer || ""}
                    onChange={(e) => setUnresolvedFormData({ ...unresolvedFormData, recordedAnswer: e.target.value })}
                    placeholder="Notează răspunsul primit..."
                    rows={2}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200"
                  />
                </div>
                <div className="pt-4 border-t border-zinc-800 flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsUnresolvedModalOpen(false)} className="border-zinc-700 text-xs">Anulează</Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs">Salvează</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD / EDIT OPTION */}
      <AnimatePresence>
        {isOptionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
                <h3 className="text-base font-bold text-white">
                  {editingOption ? "Editează Opțiune" : "Adaugă Opțiune de Reînnoire"}
                </h3>
                <button onClick={() => setIsOptionModalOpen(false)} className="text-zinc-500 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleSaveOption} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    Denumire Opțiune <span className="text-red-400">*</span>
                  </label>
                  <Input
                    required
                    value={optionFormData.label || ""}
                    onChange={(e) => setOptionFormData({ ...optionFormData, label: e.target.value })}
                    placeholder="Ex: Oferta Generali, Varianta Allianz..."
                    className="bg-zinc-950 border-zinc-800 text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Primă Cotată</label>
                    <Input
                      type="number"
                      step="any"
                      placeholder="Ex: 950"
                      value={optionFormData.premiumAmount !== undefined ? optionFormData.premiumAmount : ""}
                      onChange={(e) =>
                        setOptionFormData({
                          ...optionFormData,
                          premiumAmount: e.target.value === "" ? undefined : parseFloat(e.target.value),
                        })
                      }
                      className="bg-zinc-950 border-zinc-800 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Frecvență Plată</label>
                    <select
                      value={optionFormData.paymentFrequency || "annual"}
                      onChange={(e) => setOptionFormData({ ...optionFormData, paymentFrequency: e.target.value as PaymentFrequency })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-200"
                    >
                      {Object.keys(FREQUENCY_LABELS).map((k) => (
                        <option key={k} value={k}>
                          {FREQUENCY_LABELS[k as PaymentFrequency]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Franșiză Notată</label>
                    <Input
                      value={optionFormData.statedDeductible || ""}
                      onChange={(e) => setOptionFormData({ ...optionFormData, statedDeductible: e.target.value })}
                      placeholder="Ex: 100 EUR"
                      className="bg-zinc-950 border-zinc-800 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Limite Asigurate</label>
                    <Input
                      value={optionFormData.coverageLimits || ""}
                      onChange={(e) => setOptionFormData({ ...optionFormData, coverageLimits: e.target.value })}
                      placeholder="Ex: 40.000 EUR"
                      className="bg-zinc-950 border-zinc-800 text-xs text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Excluderi sau Condiții Notate</label>
                  <Input
                    value={optionFormData.importantExclusions || ""}
                    onChange={(e) => setOptionFormData({ ...optionFormData, importantExclusions: e.target.value })}
                    placeholder="Ex: Fără asistență rutieră externă..."
                    className="bg-zinc-950 border-zinc-800 text-xs text-white"
                  />
                </div>
                <div className="pt-4 border-t border-zinc-800 flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsOptionModalOpen(false)} className="border-zinc-700 text-xs">Anulează</Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs">Salvează</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD / EDIT AGENDA */}
      <AnimatePresence>
        {isAgendaModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
                <h3 className="text-base font-bold text-white">
                  {editingAgenda ? "Editează Subiect Agendă" : "Adaugă Subiect Agendă"}
                </h3>
                <button onClick={() => setIsAgendaModalOpen(false)} className="text-zinc-500 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleSaveAgenda} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    Subiect / Întrebare Discuție <span className="text-red-400">*</span>
                  </label>
                  <Input
                    required
                    value={agendaFormData.topic || ""}
                    onChange={(e) => setAgendaFormData({ ...agendaFormData, topic: e.target.value })}
                    placeholder="Ex: Confirmare valoare asigurată agreată..."
                    className="bg-zinc-950 border-zinc-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Capitol Agendă</label>
                  <select
                    value={agendaFormData.category || "coverage_exclusions"}
                    onChange={(e) => setAgendaFormData({ ...agendaFormData, category: e.target.value as AgendaCategory })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-200"
                  >
                    {Object.keys(AGENDA_CATEGORY_INFO).map((k) => (
                      <option key={k} value={k}>
                        {AGENDA_CATEGORY_INFO[k as AgendaCategory].labelRo}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="pt-4 border-t border-zinc-800 flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsAgendaModalOpen(false)} className="border-zinc-700 text-xs">Anulează</Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs">Salvează</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD / EDIT ACTION */}
      <AnimatePresence>
        {isActionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
                <h3 className="text-base font-bold text-white">
                  {editingAction ? "Editează Acțiune" : "Adaugă Acțiune în Plan"}
                </h3>
                <button onClick={() => setIsActionModalOpen(false)} className="text-zinc-500 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleSaveAction} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    Titlu Acțiune / Sarcină <span className="text-red-400">*</span>
                  </label>
                  <Input
                    required
                    value={actionFormData.actionTitle || ""}
                    onChange={(e) => setActionFormData({ ...actionFormData, actionTitle: e.target.value })}
                    placeholder="Ex: Transmitere cerere semnată, Verificare poliță emisă..."
                    className="bg-zinc-950 border-zinc-800 text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Responsabil</label>
                    <Input
                      value={actionFormData.responsiblePerson || ""}
                      onChange={(e) => setActionFormData({ ...actionFormData, responsiblePerson: e.target.value })}
                      placeholder="Ex: Utilizator, Broker..."
                      className="bg-zinc-950 border-zinc-800 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Termen Țintă</label>
                    <Input
                      type="date"
                      value={actionFormData.targetDate || ""}
                      onChange={(e) => setActionFormData({ ...actionFormData, targetDate: e.target.value })}
                      className="bg-zinc-950 border-zinc-800 text-xs text-white"
                    />
                  </div>
                </div>
                <div className="pt-4 border-t border-zinc-800 flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsActionModalOpen(false)} className="border-zinc-700 text-xs">Anulează</Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs">Salvează</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: CONFIRM DELETE */}
      <AnimatePresence>
        {itemToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-6 text-xs shadow-2xl"
            >
              <div className="flex items-center gap-3 text-red-400 mb-3">
                <Trash2 className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white">Confirmă Ștergerea</h3>
              </div>
              <p className="text-zinc-300 mb-4">
                Sigur dorești să ștergi <strong className="text-white">&ldquo;{itemToDelete.title}&rdquo;</strong>?
              </p>
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setItemToDelete(null)} className="border-zinc-700 text-xs">Anulează</Button>
                <Button variant="destructive" size="sm" onClick={handleDeleteItem} className="bg-red-600 hover:bg-red-500 text-xs">Șterge Definitiv</Button>
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
              className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-6 text-xs shadow-2xl"
            >
              <div className="flex items-center gap-3 text-red-400 mb-3">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white">Resetare Fișă Decizie</h3>
              </div>
              <p className="text-zinc-300 mb-4 leading-relaxed">
                Această acțiune va șterge toate datele introduse în această sesiune de navigare. Asigură-te că ai descărcat un raport PDF sau un export JSON înainte de resetare.
              </p>
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsResetConfirmOpen(false)} className="border-zinc-700 text-xs">Anulează</Button>
                <Button variant="destructive" size="sm" onClick={handleResetWorkspace} className="bg-red-600 hover:bg-red-500 text-xs">Resetează Tot</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
