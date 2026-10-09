"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ClaimSettlementData,
  ClaimFinancials,
  ClaimLineItem,
  SettlementQuestionAction,
  ClaimCategory,
  ClaimReviewStatus,
  ValuationBasis,
  LineItemCategory,
  EvidenceStatus,
  ItemReviewStatus,
  CurrencyCode,
  CLAIM_CATEGORY_INFO,
  REVIEW_STATUS_INFO,
  VALUATION_BASIS_INFO,
  LINE_ITEM_CATEGORY_INFO,
  EVIDENCE_STATUS_INFO,
  ITEM_REVIEW_STATUS_INFO,
  calculateSettlementReconciliation,
  generateSuggestedClaimQuestions,
  generateSettlementAnalyzerPdf,
  validateImportedClaimSettlementData,
} from "@/lib/claim-settlement-analyzer";
import Link from "next/link";

const INITIAL_DEMO_DATA: ClaimSettlementData = {
  schemaVersion: "1.0",
  exportedAt: new Date().toISOString(),
  claimReference: "Dosar Daună CASCO Autoturism",
  category: "motor",
  incidentDate: "2026-02-15",
  offerReceivedDate: "2026-03-01",
  reviewStatus: "reconciliation_in_progress",
  description: "Avarie bară față, aripă dreapta și far LED în urma unui impact minor în parcare.",
  insurerExplanationNotes: "Asiguratorul a aplicat franșiza contractuală de 100 EUR și o depreciere de 15% pe manoperă/piese.",
  userNotes: "Devizul service-ului autorizat este cu 1.450 EUR mai mare decât oferta de despăgubire propusă în regie proprie.",
  financials: {
    currency: "EUR",
    basisInsurer: "vat_inclusive",
    basisUser: "repair_estimate",
    insurerGrossOffer: 4200,
    deductibleShown: 100,
    depreciationAdjustment: 450,
    salvageDeduction: 0,
    otherDeductions: 0,
    additionalAmountsIncluded: 150, // Towing assistance
    insurerStatedNetOffer: 3800,
    userEstimate: 5250,
    amountAlreadyPaid: 0,
  },
  lineItems: [
    {
      id: "item_1",
      description: "Înlocuire Far LED Matrix Dreapta (Piesă originală OEM)",
      category: "parts",
      amountClaimed: 2400,
      amountOffered: 1800,
      currency: "EUR",
      basis: "repair_estimate",
      evidenceStatus: "available",
      reviewStatus: "unresolved",
      notes: "Asiguratorul a cotat o piesă aftermarket compatibilă, deși mașina este în garanție de producător.",
    },
    {
      id: "item_2",
      description: "Manoperă tinichigerie și vopsitorie Bară + Aripă",
      category: "labor",
      amountClaimed: 1650,
      amountOffered: 1200,
      currency: "EUR",
      basis: "repair_estimate",
      evidenceStatus: "available",
      reviewStatus: "requires_clarification",
      notes: "Tariful orar aprobat de asigurator este de 180 RON/h față de 260 RON/h tariful service-ului.",
    },
    {
      id: "item_3",
      description: "Tractare de la locul incidentului la service autorizat",
      category: "transport",
      amountClaimed: 150,
      amountOffered: 150,
      currency: "EUR",
      basis: "vat_inclusive",
      evidenceStatus: "available",
      reviewStatus: "explained",
      notes: "Acceptat integral conform facturii prezentate.",
    },
  ],
  questionsActions: [
    {
      id: "q_1",
      question: "Care este temeiul contractual pentru cotarea pieselor aftermarket pe o mașină aflată în garanție?",
      suggested: false,
      answer: "Așteptare răspuns scris de la inspectorul de daună.",
      responsibleParty: "Inspector Daune Omniasig",
      followUpDate: "2026-10-15",
      status: "in_progress",
    },
    {
      id: "q_2",
      question: "Puteți furniza devizul detaliat cu timpii de manoperă aprobați conform catalogului Audatex?",
      suggested: true,
      answer: undefined,
      responsibleParty: "Departament Lichidare Daune",
      followUpDate: "2026-10-16",
      status: "pending",
    },
  ],
};

export function ClaimSettlementAnalyzer() {
  const [data, setData] = useState<ClaimSettlementData>(INITIAL_DEMO_DATA);
  const [activeTab, setActiveTab] = useState<"overview" | "reconciliation" | "line_items" | "questions" | "report">("reconciliation");

  // Line item modal
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ClaimLineItem | null>(null);
  const [itemFormData, setItemFormData] = useState<Partial<ClaimLineItem>>({
    category: "parts",
    evidenceStatus: "available",
    reviewStatus: "unresolved",
    currency: "EUR",
  });

  // Question modal
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<SettlementQuestionAction | null>(null);
  const [questionFormData, setQuestionFormData] = useState<Partial<SettlementQuestionAction>>({
    status: "pending",
  });

  const [itemToDelete, setItemToDelete] = useState<{ type: "item" | "question"; id: string; title: string } | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);

  const recon = useMemo(() => calculateSettlementReconciliation(data.financials), [data.financials]);

  // Handle line item save
  const handleSaveLineItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemFormData.description || !itemFormData.description.trim()) return;

    if (editingItem) {
      setData((prev) => ({
        ...prev,
        lineItems: prev.lineItems.map((it) =>
          it.id === editingItem.id
            ? ({
                ...it,
                ...itemFormData,
                description: itemFormData.description!.trim(),
              } as ClaimLineItem)
            : it
        ),
      }));
    } else {
      const newItem: ClaimLineItem = {
        id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        description: itemFormData.description.trim(),
        category: itemFormData.category || "parts",
        amountClaimed: itemFormData.amountClaimed !== undefined && !isNaN(itemFormData.amountClaimed) ? Number(itemFormData.amountClaimed) : undefined,
        amountOffered: itemFormData.amountOffered !== undefined && !isNaN(itemFormData.amountOffered) ? Number(itemFormData.amountOffered) : undefined,
        currency: itemFormData.currency || data.financials.currency,
        basis: itemFormData.basis || data.financials.basisUser,
        evidenceStatus: itemFormData.evidenceStatus || "available",
        reviewStatus: itemFormData.reviewStatus || "unresolved",
        notes: itemFormData.notes?.trim() || undefined,
      };

      setData((prev) => ({
        ...prev,
        lineItems: [newItem, ...prev.lineItems],
      }));
    }

    setIsItemModalOpen(false);
    setEditingItem(null);
  };

  // Handle question save
  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionFormData.question || !questionFormData.question.trim()) return;

    if (editingQuestion) {
      setData((prev) => ({
        ...prev,
        questionsActions: prev.questionsActions.map((q) =>
          q.id === editingQuestion.id
            ? ({
                ...q,
                ...questionFormData,
                question: questionFormData.question!.trim(),
              } as SettlementQuestionAction)
            : q
        ),
      }));
    } else {
      const newQ: SettlementQuestionAction = {
        id: `q_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        question: questionFormData.question.trim(),
        suggested: false,
        answer: questionFormData.answer?.trim() || undefined,
        responsibleParty: questionFormData.responsibleParty?.trim() || undefined,
        followUpDate: questionFormData.followUpDate || undefined,
        status: questionFormData.status || "pending",
      };

      setData((prev) => ({
        ...prev,
        questionsActions: [...prev.questionsActions, newQ],
      }));
    }

    setIsQuestionModalOpen(false);
    setEditingQuestion(null);
  };

  // Populate suggested questions
  const handleAddSuggestedQuestions = () => {
    const suggested = generateSuggestedClaimQuestions(data);
    const existingIds = new Set(data.questionsActions.map((q) => q.question.toLowerCase().trim()));

    const newToAdd = suggested.filter((sq) => !existingIds.has(sq.question.toLowerCase().trim()));

    if (newToAdd.length > 0) {
      setData((prev) => ({
        ...prev,
        questionsActions: [...prev.questionsActions, ...newToAdd],
      }));
    }
  };

  // Deletion
  const handleDeleteItem = () => {
    if (!itemToDelete) return;
    if (itemToDelete.type === "item") {
      setData((prev) => ({
        ...prev,
        lineItems: prev.lineItems.filter((it) => it.id !== itemToDelete.id),
      }));
    } else {
      setData((prev) => ({
        ...prev,
        questionsActions: prev.questionsActions.filter((q) => q.id !== itemToDelete.id),
      }));
    }
    setItemToDelete(null);
  };

  // Workspace reset
  const handleResetWorkspace = () => {
    setData({
      schemaVersion: "1.0",
      exportedAt: new Date().toISOString(),
      claimReference: "",
      category: "motor",
      reviewStatus: "initial_review",
      financials: {
        currency: "RON",
      },
      lineItems: [],
      questionsActions: [],
    });
    setIsResetConfirmOpen(false);
  };

  // Export JSON
  const handleExportJson = () => {
    const exportPayload: ClaimSettlementData = {
      ...data,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analiza-despagubire-${(data.claimReference || "dosar").toLowerCase().replace(/[^a-z0-9]/g, "-")}-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        const result = validateImportedClaimSettlementData(parsed);

        if (!result.valid || !result.data) {
          setImportError(result.error || "Fișierul JSON nu este valid.");
          setImportSuccess(null);
          return;
        }

        setData(result.data);
        setImportError(null);
        setImportSuccess("Dosarul de despăgubire a fost importat cu succes!");
        setTimeout(() => setImportSuccess(null), 5000);
      } catch {
        setImportError("Eroare la procesarea fișierului JSON.");
        setImportSuccess(null);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Export PDF
  const handleExportPdf = () => {
    generateSettlementAnalyzerPdf(data);
  };

  const curr = data.financials.currency || "RON";

  return (
    <div className="space-y-8">
      {/* Top KPI Header Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Ofertă Netă Asigurator</div>
          <div className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">
            {data.financials.insurerStatedNetOffer !== undefined ? (
              <span>
                {data.financials.insurerStatedNetOffer.toLocaleString("ro-RO")} {curr}
              </span>
            ) : (
              <span className="text-zinc-500 text-sm italic">Nespecificată</span>
            )}
          </div>
          <div className="text-[11px] text-zinc-500 mt-1">Suma propusă la plată</div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Deviz / Estimare Proprie</div>
          <div className="text-xl sm:text-2xl font-bold text-blue-400 mt-1">
            {data.financials.userEstimate !== undefined ? (
              <span>
                {data.financials.userEstimate.toLocaleString("ro-RO")} {curr}
              </span>
            ) : (
              <span className="text-zinc-500 text-sm italic">Nespecificat</span>
            )}
          </div>
          <div className="text-[11px] text-zinc-500 mt-1">Calcul service / bunuri</div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Diferență Estimare</div>
          <div
            className={`text-xl sm:text-2xl font-bold mt-1 ${
              recon.isEstimateHigher
                ? "text-amber-400"
                : recon.isEstimateLower
                ? "text-emerald-400"
                : "text-zinc-600"
            }`}
          >
            {recon.isComparisonPossible && recon.estimateVsOfferDifference !== undefined ? (
              <span>
                {recon.estimateVsOfferDifference > 0 ? "+" : ""}
                {recon.estimateVsOfferDifference.toLocaleString("ro-RO")} {curr}
              </span>
            ) : (
              <span className="text-zinc-500 text-sm italic">N/A</span>
            )}
          </div>
          <div className="text-[11px] text-zinc-500 mt-1">
            {recon.isEstimateHigher
              ? "Deviz mai mare decât oferta"
              : recon.isEstimateLower
              ? "Ofertă mai mare decât devizul"
              : "Comparație deviz vs ofertă"}
          </div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Rest de Încasat</div>
          <div className="text-xl sm:text-2xl font-bold text-teal-400 mt-1">
            {recon.remainingPayable !== undefined ? (
              <span>
                {recon.remainingPayable.toLocaleString("ro-RO")} {curr}
              </span>
            ) : (
              <span className="text-zinc-500 text-sm italic">Nespecificat</span>
            )}
          </div>
          <div className="text-[11px] text-zinc-500 mt-1">După avansuri / plăți parțiale</div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Poziții în Dispută</div>
          <div className="text-xl sm:text-2xl font-bold text-rose-400 mt-1">
            {data.lineItems.filter((i) => i.reviewStatus === "unresolved" || i.reviewStatus === "requires_clarification").length}
          </div>
          <div className="text-[11px] text-zinc-500 mt-1">Din {data.lineItems.length} poziții notate</div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Reconciliere Cifre</div>
          <div className="mt-1">
            {recon.hasReconciliationDiscrepancy ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                <AlertTriangle className="w-3 h-3" /> Discrepanță
              </span>
            ) : recon.isReconciliationPossible ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3" /> Reconciliat
              </span>
            ) : (
              <span className="text-xs text-zinc-500 italic">Date incomplete</span>
            )}
          </div>
          <div className="text-[11px] text-zinc-500 mt-1">Aritmetică internă ofertă</div>
        </div>
      </div>

      {/* Main Tab Bar & Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-zinc-200 rounded-xl overflow-x-auto">
          <button
            onClick={() => setActiveTab("reconciliation")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === "reconciliation"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-zinc-500 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Reconciliere Cifre & Ofertă</span>
          </button>

          <button
            onClick={() => setActiveTab("line_items")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === "line_items"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-zinc-500 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Diferențe pe Poziții ({data.lineItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("questions")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === "questions"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-zinc-500 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Întrebări Asigurator ({data.questionsActions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-zinc-500 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Date Dosar</span>
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
            <span>Raport & Backup</span>
          </button>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {activeTab === "line_items" ? (
            <Button
              onClick={() => {
                setItemFormData({
                  category: "parts",
                  evidenceStatus: "available",
                  reviewStatus: "unresolved",
                  currency: data.financials.currency,
                });
                setEditingItem(null);
                setIsItemModalOpen(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-xs font-semibold shadow-md shadow-blue-900/20"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Adaugă Poziție Deviz
            </Button>
          ) : activeTab === "questions" ? (
            <Button
              onClick={() => {
                setQuestionFormData({ status: "pending" });
                setEditingQuestion(null);
                setIsQuestionModalOpen(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-xs font-semibold shadow-md shadow-blue-900/20"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Adaugă Întrebare
            </Button>
          ) : null}

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

      {/* TAB 1: RECONCILIATION */}
      {activeTab === "reconciliation" && (
        <div className="space-y-6">
          {/* Transparent Formula & Warning Callouts */}
          <div className="bg-zinc-50 border border-zinc-200/60 rounded-xl p-4 text-xs text-zinc-600 space-y-2">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Principiu de calcul:</span> Reconcilierea compară componentele declarate în oferta asiguratorului cu oferta netă comunicată, precum și diferența semnată față de devizul propriu de reparație:
                <div className="mt-1 font-mono text-[11px] text-blue-800 bg-zinc-50 p-2 rounded border border-zinc-200">
                  Diferență = Deviz Propriu Utilizator − Ofertă Netă Asigurator
                </div>
              </div>
            </div>
            {recon.warnings.length > 0 && (
              <div className="pt-2 border-t border-zinc-200/60 space-y-1">
                {recon.warnings.map((w, idx) => (
                  <div key={idx} className="text-amber-400 text-[11px] flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{w}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Panel 1: Insurer Offer Breakdown */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  1. Componente Ofertă Asigurator
                </h3>
                <div className="flex items-center gap-2">
                  <select
                    value={data.financials.currency || "RON"}
                    onChange={(e) =>
                      setData({
                        ...data,
                        financials: { ...data.financials, currency: e.target.value as CurrencyCode },
                      })
                    }
                    className="bg-zinc-50 border border-zinc-200 rounded px-2 py-1 text-xs text-zinc-800"
                  >
                    <option value="RON">RON</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-zinc-500 mb-1">Ofertă Brută Asigurator (înainte de deduceri)</label>
                  <Input
                    type="number"
                    step="any"
                    placeholder="Ex: 4200"
                    value={data.financials.insurerGrossOffer !== undefined ? data.financials.insurerGrossOffer : ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        financials: {
                          ...data.financials,
                          insurerGrossOffer: e.target.value === "" ? undefined : parseFloat(e.target.value),
                        },
                      })
                    }
                    className="bg-zinc-50 border-zinc-200 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-500 mb-1">Franșiză Reținută (−)</label>
                    <Input
                      type="number"
                      step="any"
                      placeholder="Ex: 100"
                      value={data.financials.deductibleShown !== undefined ? data.financials.deductibleShown : ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          financials: {
                            ...data.financials,
                            deductibleShown: e.target.value === "" ? undefined : parseFloat(e.target.value),
                          },
                        })
                      }
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-500 mb-1">Uzura / Deprecierea Reținută (−)</label>
                    <Input
                      type="number"
                      step="any"
                      placeholder="Ex: 450"
                      value={data.financials.depreciationAdjustment !== undefined ? data.financials.depreciationAdjustment : ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          financials: {
                            ...data.financials,
                            depreciationAdjustment: e.target.value === "" ? undefined : parseFloat(e.target.value),
                          },
                        })
                      }
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-500 mb-1">Valoare Epavă / Resturi (−)</label>
                    <Input
                      type="number"
                      step="any"
                      placeholder="Ex: 0"
                      value={data.financials.salvageDeduction !== undefined ? data.financials.salvageDeduction : ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          financials: {
                            ...data.financials,
                            salvageDeduction: e.target.value === "" ? undefined : parseFloat(e.target.value),
                          },
                        })
                      }
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-500 mb-1">Sume Adiționale / Transport (+)</label>
                    <Input
                      type="number"
                      step="any"
                      placeholder="Ex: 150"
                      value={data.financials.additionalAmountsIncluded !== undefined ? data.financials.additionalAmountsIncluded : ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          financials: {
                            ...data.financials,
                            additionalAmountsIncluded: e.target.value === "" ? undefined : parseFloat(e.target.value),
                          },
                        })
                      }
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-500 mb-1">Alte Deduceri (−)</label>
                    <Input
                      type="number"
                      step="any"
                      placeholder="Ex: 0"
                      value={data.financials.otherDeductions !== undefined ? data.financials.otherDeductions : ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          financials: {
                            ...data.financials,
                            otherDeductions: e.target.value === "" ? undefined : parseFloat(e.target.value),
                          },
                        })
                      }
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-500 mb-1">Descriere alte deduceri</label>
                    <Input
                      placeholder="Ex: Neconformitate documente"
                      value={data.financials.otherDeductionsDescription || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          financials: {
                            ...data.financials,
                            otherDeductionsDescription: e.target.value,
                          },
                        })
                      }
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-200">
                  <label className="block text-zinc-800 font-semibold mb-1">
                    Oferta Netă Comunicată de Asigurator (Suma Finală Propusă)
                  </label>
                  <Input
                    type="number"
                    step="any"
                    placeholder="Ex: 3800"
                    value={data.financials.insurerStatedNetOffer !== undefined ? data.financials.insurerStatedNetOffer : ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        financials: {
                          ...data.financials,
                          insurerStatedNetOffer: e.target.value === "" ? undefined : parseFloat(e.target.value),
                        },
                      })
                    }
                    className="bg-zinc-50 border-blue-500/50 text-xs text-white font-bold text-base"
                  />
                </div>
              </div>
            </div>

            {/* Panel 2: User Estimates & Reconciliation Diff */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  2. Deviz Propriu & Comparație Finală
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-zinc-600 font-semibold mb-1">
                      Estimarea / Devizul Propriu de Reparație sau Înlocuire
                    </label>
                    <Input
                      type="number"
                      step="any"
                      placeholder="Ex: 5250"
                      value={data.financials.userEstimate !== undefined ? data.financials.userEstimate : ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          financials: {
                            ...data.financials,
                            userEstimate: e.target.value === "" ? undefined : parseFloat(e.target.value),
                          },
                        })
                      }
                      className="bg-zinc-50 border-zinc-200 text-xs text-white font-bold text-base"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-500 mb-1">Bază Evaluare Asigurator</label>
                      <select
                        value={data.financials.basisInsurer || "vat_inclusive"}
                        onChange={(e) =>
                          setData({
                            ...data,
                            financials: { ...data.financials, basisInsurer: e.target.value as ValuationBasis },
                          })
                        }
                        className="w-full bg-zinc-50 border border-zinc-200 rounded px-2.5 py-1.5 text-xs text-zinc-800"
                      >
                        {Object.keys(VALUATION_BASIS_INFO).map((k) => (
                          <option key={k} value={k}>
                            {VALUATION_BASIS_INFO[k as ValuationBasis].labelRo}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-zinc-500 mb-1">Bază Deviz Propriu</label>
                      <select
                        value={data.financials.basisUser || "repair_estimate"}
                        onChange={(e) =>
                          setData({
                            ...data,
                            financials: { ...data.financials, basisUser: e.target.value as ValuationBasis },
                          })
                        }
                        className="w-full bg-zinc-50 border border-zinc-200 rounded px-2.5 py-1.5 text-xs text-zinc-800"
                      >
                        {Object.keys(VALUATION_BASIS_INFO).map((k) => (
                          <option key={k} value={k}>
                            {VALUATION_BASIS_INFO[k as ValuationBasis].labelRo}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-500 mb-1">Sumă Deja Încasată / Avans Achitat</label>
                    <Input
                      type="number"
                      step="any"
                      placeholder="Ex: 0"
                      value={data.financials.amountAlreadyPaid !== undefined ? data.financials.amountAlreadyPaid : ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          financials: {
                            ...data.financials,
                            amountAlreadyPaid: e.target.value === "" ? undefined : parseFloat(e.target.value),
                          },
                        })
                      }
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Live Calculation Display Card */}
              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-xs space-y-2 mt-4">
                <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
                  Rezultat Comparativ Deviz vs Ofertă
                </div>

                {recon.isComparisonPossible && recon.estimateVsOfferDifference !== undefined ? (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-600">Diferență semnată:</span>
                      <span
                        className={`font-bold text-sm ${
                          recon.isEstimateHigher
                            ? "text-amber-400"
                            : recon.isEstimateLower
                            ? "text-emerald-400"
                            : "text-zinc-600"
                        }`}
                      >
                        {recon.estimateVsOfferDifference > 0 ? "+" : ""}
                        {recon.estimateVsOfferDifference.toLocaleString("ro-RO")} {curr}
                      </span>
                    </div>

                    <div className="text-[11px] text-zinc-500">
                      {recon.isEstimateHigher
                        ? "Devizul tău este mai mare decât oferta asiguratorului. Recomandare: verifică pozițiile neacoperite în tab-ul „Diferențe pe Poziții”."
                        : recon.isEstimateLower
                        ? "Oferta asiguratorului acoperă integral devizul estimat."
                        : "Oferta asiguratorului este identică cu estimarea ta."}
                    </div>
                  </div>
                ) : (
                  <div className="text-zinc-500 italic text-[11px]">
                    Introduceți atât oferta netă, cât și devizul propriu pentru a afișa diferența de calcul.
                  </div>
                )}

                {recon.remainingPayable !== undefined && (
                  <div className="pt-2 border-t border-zinc-200/80 flex items-center justify-between text-zinc-600">
                    <span>Rest de plată din ofertă:</span>
                    <span className="font-bold text-teal-400">
                      {recon.remainingPayable.toLocaleString("ro-RO")} {curr}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LINE ITEMS */}
      {activeTab === "line_items" && (
        <div className="space-y-6">
          <div className="bg-zinc-50 border border-zinc-200/60 rounded-xl p-4 text-xs text-zinc-500 flex items-start gap-3">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-zinc-800">Inventar pe poziții:</span> Compară manopera, piesele sau bunurile revendicate cu ceea ce a aprobat efectiv asiguratorul. Poți evidenția diferențele de preț sau piesele refuzate.
            </div>
          </div>

          {data.lineItems.length > 0 ? (
            <div className="space-y-3">
              {data.lineItems.map((item) => {
                const cat = LINE_ITEM_CATEGORY_INFO[item.category]?.labelRo || item.category;
                const evStatus = EVIDENCE_STATUS_INFO[item.evidenceStatus];
                const revStatus = ITEM_REVIEW_STATUS_INFO[item.reviewStatus];
                const diff =
                  item.amountClaimed !== undefined && item.amountOffered !== undefined
                    ? Math.round((item.amountClaimed - item.amountOffered) * 100) / 100
                    : null;

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-zinc-200 hover:border-zinc-300 rounded-2xl p-4 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg shadow-black/10 text-xs"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-800 text-blue-400 border border-zinc-300">
                          {cat}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                            revStatus.color === "emerald"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : revStatus.color === "rose"
                              ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          }`}
                        >
                          {revStatus.labelRo}
                        </span>
                        <span className="text-[10px] text-zinc-500">
                          Dovadă: <strong className="text-zinc-600">{evStatus.labelRo}</strong>
                        </span>
                      </div>

                      <h4 className="font-bold text-zinc-900 text-sm pt-0.5">{item.description}</h4>

                      {item.notes && (
                        <p className="text-zinc-500 text-[11px] italic pt-0.5">&ldquo;{item.notes}&rdquo;</p>
                      )}
                    </div>

                    {/* Financials & Diff */}
                    <div className="flex flex-wrap items-center gap-4 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200 shrink-0">
                      <div>
                        <div className="text-[10px] text-zinc-500 uppercase">Revendicat</div>
                        <div className="font-semibold text-zinc-800">
                          {item.amountClaimed !== undefined ? `${item.amountClaimed.toLocaleString("ro-RO")} ${item.currency}` : "N/A"}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] text-zinc-500 uppercase">Aprobat Ofertă</div>
                        <div className="font-semibold text-zinc-800">
                          {item.amountOffered !== undefined ? `${item.amountOffered.toLocaleString("ro-RO")} ${item.currency}` : "N/A"}
                        </div>
                      </div>

                      {diff !== null && (
                        <div>
                          <div className="text-[10px] text-zinc-500 uppercase">Diferență</div>
                          <div
                            className={`font-bold ${
                              diff > 0 ? "text-amber-400" : diff < 0 ? "text-emerald-400" : "text-zinc-500"
                            }`}
                          >
                            {diff > 0 ? `+${diff.toLocaleString("ro-RO")}` : diff.toLocaleString("ro-RO")} {item.currency}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 self-end md:self-center">
                      <button
                        onClick={() => {
                          setItemFormData({ ...item });
                          setEditingItem(item);
                          setIsItemModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-zinc-800 text-zinc-600 hover:text-white hover:bg-zinc-700 transition-colors"
                        title="Editează poziția"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setItemToDelete({ type: "item", id: item.id, title: item.description })}
                        className="p-1.5 rounded-lg bg-zinc-800 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Șterge poziția"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-zinc-50 border border-zinc-200/60 rounded-2xl">
              <SlidersHorizontal className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-zinc-600">Nicio poziție de deviz înregistrată</h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                Adaugă piesele de schimb, orele de manoperă sau cheltuielile de cazare pentru a evidenția reducerile operate de asigurator.
              </p>
              <Button
                onClick={() => {
                  setItemFormData({
                    category: "parts",
                    evidenceStatus: "available",
                    reviewStatus: "unresolved",
                    currency: data.financials.currency,
                  });
                  setEditingItem(null);
                  setIsItemModalOpen(true);
                }}
                size="sm"
                className="mt-4 bg-blue-600 hover:bg-blue-500 text-xs"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                Adaugă Prima Poziție
              </Button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: QUESTIONS & ACTIONS */}
      {activeTab === "questions" && (
        <div className="space-y-6">
          <div className="bg-zinc-50 border border-zinc-200/60 rounded-xl p-4 text-xs text-zinc-500 flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-zinc-800">Pregătire dialog cu asiguratorul:</span> Întrebările neutre te ajută să ceri clarificări scrise fără a genera tensiuni inutile sau a formula acuzații nefondate.
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleAddSuggestedQuestions}
              className="border-zinc-300 bg-zinc-800 text-xs shrink-0 text-zinc-800 hover:text-white"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-purple-400" />
              Sugerează Întrebări
            </Button>
          </div>

          {data.questionsActions.length > 0 ? (
            <div className="space-y-3">
              {data.questionsActions.map((q) => (
                <div
                  key={q.id}
                  className="bg-white border border-zinc-200 hover:border-zinc-300 rounded-2xl p-4 transition-all space-y-3 text-xs shadow-lg shadow-black/10"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {q.suggested && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                            Sugestie automată
                          </span>
                        )}
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                            q.status === "resolved"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : q.status === "in_progress"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                              : "bg-zinc-800 text-zinc-500 border-zinc-300"
                          }`}
                        >
                          {q.status === "resolved" ? "Răspuns primit" : q.status === "in_progress" ? "În discuție" : "În așteptare"}
                        </span>
                      </div>
                      <h4 className="font-semibold text-white text-sm pt-1">Q: {q.question}</h4>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                      <button
                        onClick={() => {
                          setQuestionFormData({ ...q });
                          setEditingQuestion(q);
                          setIsQuestionModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-zinc-800 text-zinc-600 hover:text-white hover:bg-zinc-700 transition-colors"
                        title="Editează întrebarea"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setItemToDelete({ type: "question", id: q.id, title: q.question })}
                        className="p-1.5 rounded-lg bg-zinc-800 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Șterge întrebarea"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Answer & Responsible */}
                  <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 space-y-1.5">
                    <div>
                      <span className="text-zinc-500 font-semibold">Răspuns primit de la asigurator: </span>
                      {q.answer ? (
                        <span className="text-emerald-800 font-medium">{q.answer}</span>
                      ) : (
                        <span className="text-zinc-500 italic">Niciun răspuns înregistrat încă</span>
                      )}
                    </div>
                    {(q.responsibleParty || q.followUpDate) && (
                      <div className="text-[11px] text-zinc-500 flex flex-wrap items-center gap-3 pt-1">
                        {q.responsibleParty && <span>Responsabil: <strong className="text-zinc-800">{q.responsibleParty}</strong></span>}
                        {q.followUpDate && <span>Follow-up: <strong className="text-zinc-800">{q.followUpDate}</strong></span>}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-zinc-50 border border-zinc-200/60 rounded-2xl">
              <HelpCircle className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-zinc-600">Nicio întrebare pregătită</h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                Generează întrebări sugerate bazate pe calculele tale sau adaugă întrebări proprii pentru asigurator.
              </p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <Button onClick={handleAddSuggestedQuestions} size="sm" className="bg-blue-600 hover:bg-blue-500 text-xs">
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  Generează Sugestii
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: OVERVIEW & NOTES */}
      {activeTab === "overview" && (
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-zinc-900 mb-2">Detalii Generale Dosar Daună</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-500 mb-1 font-semibold">Referință / Denumire Dosar</label>
              <Input
                value={data.claimReference}
                onChange={(e) => setData({ ...data, claimReference: e.target.value })}
                placeholder="Ex: Daună CASCO Parcare, Inundație Apartament..."
                className="bg-zinc-50 border-zinc-200 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-zinc-500 mb-1 font-semibold">Categorie Daună</label>
              <select
                value={data.category}
                onChange={(e) => setData({ ...data, category: e.target.value as ClaimCategory })}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-800"
              >
                {Object.keys(CLAIM_CATEGORY_INFO).map((k) => (
                  <option key={k} value={k}>
                    {CLAIM_CATEGORY_INFO[k as ClaimCategory].labelRo}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-zinc-500 mb-1 font-semibold">Dată Eveniment (Opțional)</label>
              <Input
                type="date"
                value={data.incidentDate || ""}
                onChange={(e) => setData({ ...data, incidentDate: e.target.value })}
                className="bg-zinc-50 border-zinc-200 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-zinc-500 mb-1 font-semibold">Dată Ofertă Asigurator</label>
              <Input
                type="date"
                value={data.offerReceivedDate || ""}
                onChange={(e) => setData({ ...data, offerReceivedDate: e.target.value })}
                className="bg-zinc-50 border-zinc-200 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-zinc-500 mb-1 font-semibold">Stadiu Revizuire Dosar</label>
              <select
                value={data.reviewStatus}
                onChange={(e) => setData({ ...data, reviewStatus: e.target.value as ClaimReviewStatus })}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-800"
              >
                {Object.keys(REVIEW_STATUS_INFO).map((k) => (
                  <option key={k} value={k}>
                    {REVIEW_STATUS_INFO[k as ClaimReviewStatus].labelRo}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-zinc-500 mb-1 font-semibold">Scurtă Descriere a Evenimentului</label>
            <textarea
              value={data.description || ""}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              placeholder="Descrie pe scurt circumstanțele producerii daunei..."
              rows={2}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs text-zinc-800"
            />
          </div>

          <div>
            <label className="block text-zinc-500 mb-1 font-semibold">Explicațiile / Motivele Invocate de Asigurator</label>
            <textarea
              value={data.insurerExplanationNotes || ""}
              onChange={(e) => setData({ ...data, insurerExplanationNotes: e.target.value })}
              placeholder="Ex: Asiguratorul a motivat că piesa nu poate fi înlocuită de nou..."
              rows={2}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs text-zinc-800"
            />
          </div>
        </div>
      )}

      {/* TAB 5: REPORT & BACKUP */}
      {activeTab === "report" && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-6 text-xs">
            <div>
              <h3 className="text-lg font-bold text-zinc-900">Export & Backup Dosar Despăgubire</h3>
              <p className="text-zinc-500 mt-1">
                Descarcă un dosar complet PDF sau salvează un backup JSON securizat local în memoria browserului.
              </p>
            </div>

            {/* Notes Section */}
            <div>
              <label className="block font-semibold text-zinc-600 uppercase tracking-wider mb-2">
                Notițe Generale Utilizator / Strategie Contestație
              </label>
              <textarea
                value={data.userNotes || ""}
                onChange={(e) => setData({ ...data, userNotes: e.target.value })}
                placeholder="Ex: Pregătit cerere de reanalizare împreună cu Cristian Văduva..."
                rows={3}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-800"
              />
            </div>

            {/* Export Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 flex flex-col justify-between">
                <div>
                  <FileText className="w-6 h-6 text-blue-400 mb-2" />
                  <h4 className="text-sm font-semibold text-white">Raport PDF Structurat</h4>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Document PDF cu reconcilierea cifrelor, pozițiile din deviz, întrebările și disclaimerul legal.
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
                    Fișier securizat local pentru transfer între calculatoare sau reluarea sesiunii.
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
                    Încarcă un backup JSON salvat anterior pentru a continua reconcilierea.
                  </p>
                </div>
                <label className="mt-4 inline-flex items-center justify-center rounded-md text-xs font-medium border border-zinc-300 bg-zinc-800 px-4 py-2 text-zinc-800 hover:bg-zinc-700 cursor-pointer">
                  <Upload className="w-3.5 h-3.5 mr-1.5" />
                  <span>Încarcă Fișier</span>
                  <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
                </label>
              </div>
            </div>

            {/* Privacy note & Reset button */}
            <div className="pt-6 border-t border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-zinc-500">
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
                Resetează Fișa
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT LINE ITEM */}
      <AnimatePresence>
        {isItemModalOpen && (
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
                    <SlidersHorizontal className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900">
                    {editingItem ? "Editează Poziție Deviz" : "Adaugă Poziție Deviz"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsItemModalOpen(false)}
                  className="text-zinc-500 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveLineItem} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-600 font-semibold mb-1">
                    Descriere Poziție / Piesă / Lucrare <span className="text-red-400">*</span>
                  </label>
                  <Input
                    required
                    value={itemFormData.description || ""}
                    onChange={(e) => setItemFormData({ ...itemFormData, description: e.target.value })}
                    placeholder="Ex: Înlocuire bară protecție față OEM, Manoperă vopsitorie..."
                    className="bg-zinc-50 border-zinc-200 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Categorie</label>
                    <select
                      value={itemFormData.category || "parts"}
                      onChange={(e) => setItemFormData({ ...itemFormData, category: e.target.value as LineItemCategory })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded px-2.5 py-1.5 text-xs text-zinc-800"
                    >
                      {Object.keys(LINE_ITEM_CATEGORY_INFO).map((k) => (
                        <option key={k} value={k}>
                          {LINE_ITEM_CATEGORY_INFO[k as LineItemCategory].labelRo}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Stadiu Poziție</label>
                    <select
                      value={itemFormData.reviewStatus || "unresolved"}
                      onChange={(e) => setItemFormData({ ...itemFormData, reviewStatus: e.target.value as ItemReviewStatus })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded px-2.5 py-1.5 text-xs text-zinc-800"
                    >
                      {Object.keys(ITEM_REVIEW_STATUS_INFO).map((k) => (
                        <option key={k} value={k}>
                          {ITEM_REVIEW_STATUS_INFO[k as ItemReviewStatus].labelRo}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Sumă Revendicată / Deviz</label>
                    <Input
                      type="number"
                      step="any"
                      placeholder="Ex: 2400"
                      value={itemFormData.amountClaimed !== undefined ? itemFormData.amountClaimed : ""}
                      onChange={(e) =>
                        setItemFormData({
                          ...itemFormData,
                          amountClaimed: e.target.value === "" ? undefined : parseFloat(e.target.value),
                        })
                      }
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Sumă Aprobată în Ofertă</label>
                    <Input
                      type="number"
                      step="any"
                      placeholder="Ex: 1800"
                      value={itemFormData.amountOffered !== undefined ? itemFormData.amountOffered : ""}
                      onChange={(e) =>
                        setItemFormData({
                          ...itemFormData,
                          amountOffered: e.target.value === "" ? undefined : parseFloat(e.target.value),
                        })
                      }
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-600 font-medium mb-1">Stadiu Documente Doveditoare</label>
                  <select
                    value={itemFormData.evidenceStatus || "available"}
                    onChange={(e) => setItemFormData({ ...itemFormData, evidenceStatus: e.target.value as EvidenceStatus })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded px-2.5 py-1.5 text-xs text-zinc-800"
                  >
                    {Object.keys(EVIDENCE_STATUS_INFO).map((k) => (
                      <option key={k} value={k}>
                        {EVIDENCE_STATUS_INFO[k as EvidenceStatus].labelRo}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-600 font-medium mb-1">Observații / Notițe</label>
                  <textarea
                    value={itemFormData.notes || ""}
                    onChange={(e) => setItemFormData({ ...itemFormData, notes: e.target.value })}
                    placeholder="Ex: Asiguratorul a diminuat tariful cu 20% fără justificare..."
                    rows={2}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs text-zinc-800"
                  />
                </div>

                <div className="pt-4 border-t border-zinc-200 flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsItemModalOpen(false)}
                    className="border-zinc-300 text-xs"
                  >
                    Anulează
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs">
                    {editingItem ? "Salvează Modificările" : "Adaugă Poziția"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD / EDIT QUESTION */}
      <AnimatePresence>
        {isQuestionModalOpen && (
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
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900">
                    {editingQuestion ? "Editează Întrebare" : "Adaugă Întrebare pentru Asigurator"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsQuestionModalOpen(false)}
                  className="text-zinc-500 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveQuestion} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-600 font-semibold mb-1">
                    Întrebare / Clarificare Solicitată <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    required
                    value={questionFormData.question || ""}
                    onChange={(e) => setQuestionFormData({ ...questionFormData, question: e.target.value })}
                    placeholder="Ex: Puteți clarifica temeiul legal al aplicării coeficientului de uzură?"
                    rows={2}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-600 font-medium mb-1">Răspuns Primit de la Asigurator</label>
                  <textarea
                    value={questionFormData.answer || ""}
                    onChange={(e) => setQuestionFormData({ ...questionFormData, answer: e.target.value })}
                    placeholder="Notează răspunsul sau poziția transmisă de companie..."
                    rows={2}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs text-zinc-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Persoană / Departament Responsabil</label>
                    <Input
                      value={questionFormData.responsibleParty || ""}
                      onChange={(e) => setQuestionFormData({ ...questionFormData, responsibleParty: e.target.value })}
                      placeholder="Ex: Inspector daune, Lichidator..."
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Dată Scadență / Follow-up</label>
                    <Input
                      type="date"
                      value={questionFormData.followUpDate || ""}
                      onChange={(e) => setQuestionFormData({ ...questionFormData, followUpDate: e.target.value })}
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-600 font-medium mb-1">Status Întrebare</label>
                  <select
                    value={questionFormData.status || "pending"}
                    onChange={(e) => setQuestionFormData({ ...questionFormData, status: e.target.value as "pending" | "in_progress" | "resolved" })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded px-2.5 py-1.5 text-xs text-zinc-800"
                  >
                    <option value="pending">În așteptare răspuns</option>
                    <option value="in_progress">În discuție / clarificare</option>
                    <option value="resolved">Clarificat / Răspuns primit</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-zinc-200 flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsQuestionModalOpen(false)}
                    className="border-zinc-300 text-xs"
                  >
                    Anulează
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs">
                    {editingQuestion ? "Salvează Modificările" : "Adaugă Întrebarea"}
                  </Button>
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
              className="bg-white border border-zinc-200 rounded-2xl w-full max-w-md p-6 text-xs shadow-2xl"
            >
              <div className="flex items-center gap-3 text-red-400 mb-3">
                <Trash2 className="w-5 h-5" />
                <h3 className="text-sm font-bold text-zinc-900">
                  Confirmă Ștergerea {itemToDelete.type === "item" ? "Poziției" : "Întrebării"}
                </h3>
              </div>
              <p className="text-zinc-600 mb-4">
                Sigur dorești să ștergi <strong className="text-white">&ldquo;{itemToDelete.title}&rdquo;</strong>?
              </p>
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setItemToDelete(null)}
                  className="border-zinc-300 text-xs"
                >
                  Anulează
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteItem}
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
                <h3 className="text-sm font-bold text-zinc-900">Resetare Fișă Despăgubire</h3>
              </div>
              <p className="text-zinc-600 mb-4 leading-relaxed">
                Această acțiune va șterge toate cifrele, devizele și întrebările înregistrate în această sesiune de navigare. Descarcă un raport PDF sau un export JSON înainte de resetare.
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
