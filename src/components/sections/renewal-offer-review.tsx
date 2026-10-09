"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
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
  TrendingUp,
  TrendingDown,
  Layers,
  HelpCircle,
  ShieldCheck,
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CurrencyCode,
  PaymentFrequency,
  TermComparisonStatus,
  PolicySideData,
  TermComparisonRow,
  RenewalOfferReviewData,
  CURRENCY_LABELS,
  FREQUENCY_LABELS_RO,
  FREQUENCY_LABELS_EN,
  TERM_STATUS_LABELS_RO,
  TERM_STATUS_LABELS_EN,
  DEFAULT_TERMS_ROWS,
  calculatePremiumDifference,
  generateSuggestedRenewalQuestions,
  generateRenewalOfferPdf,
  validateImportedRenewalReview,
} from "@/lib/renewal-offer-review";
import {
  PolicyCategory,
  CATEGORY_LABELS_RO,
  CATEGORY_LABELS_EN,
} from "@/lib/portfolio-calendar";
import Link from "next/link";

export function RenewalOfferReview() {
  const [lang, setLang] = useState<"ro" | "en">("ro");
  const isRo = lang === "ro";

  const [activeTab, setActiveTab] = useState<"inputs" | "terms" | "questions" | "export">("inputs");

  // In-Memory Review Data State
  const [review, setReview] = useState<RenewalOfferReviewData>(() => ({
    title: "Revizuire Ofertă Reînnoire CASCO 2026",
    category: "casco",
    current: {
      premium: 2400,
      currency: "RON",
      paymentFrequency: "annual",
      coverageLimit: 85000,
      limitBasis: "Valoare de Piață Reală",
      deductible: 500,
      deductibleBasis: "per daună parțială",
      exclusions: "Fără daune produse în afara carosabilului amenajat",
      startDate: "2025-11-01",
      expiryDate: "2026-11-01",
      notes: "Poliță în vigoare la Asigurator A.",
    },
    renewal: {
      premium: 2650,
      currency: "RON",
      paymentFrequency: "annual",
      coverageLimit: 80000,
      limitBasis: "Valoare de Piață Actualizată",
      deductible: 500,
      deductibleBasis: "per daună parțială",
      exclusions: "Aceleași excluderi din Condițiile Generale noi",
      startDate: "2026-11-01",
      expiryDate: "2027-11-01",
      notes: "Ofertă primită prin notificare de reînnoire.",
    },
    terms: DEFAULT_TERMS_ROWS.map((r) => ({
      ...r,
      currentVal: r.id === "coverage_limit" ? "85.000 RON" : r.id === "deductible" ? "500 RON" : undefined,
      renewalVal: r.id === "coverage_limit" ? "80.000 RON" : r.id === "deductible" ? "500 RON" : undefined,
      status: r.id === "coverage_limit" ? "different" : r.id === "deductible" ? "unchanged" : "needs_clarification",
    })),
    questions: [
      "Care este motivul creșterii de primă cu +10.4% în condițiile reducerii limitei asigurate?",
      "Există modificări ale franșizei sau excluderilor aplicabile pentru daune parțiale?",
    ],
    userNotes: "",
    lang: "ro",
    createdAt: "2026-10-09T10:00:00Z",
    updatedAt: "2026-10-09T10:00:00Z",
  }));

  const [newQuestionText, setNewQuestionText] = useState("");
  const [copiedQuestionIdx, setCopiedQuestionIdx] = useState<number | null>(null);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Premium difference calculation
  const premDiff = calculatePremiumDifference(review.current, review.renewal, lang);

  // Update a specific term comparison row
  const updateTermStatus = (id: string, status: TermComparisonStatus) => {
    setReview({
      ...review,
      terms: review.terms.map((t) => (t.id === id ? { ...t, status } : t)),
    });
  };

  const updateTermValues = (id: string, currentVal: string, renewalVal: string, notes?: string) => {
    setReview({
      ...review,
      terms: review.terms.map((t) => (t.id === id ? { ...t, currentVal, renewalVal, notes } : t)),
    });
  };

  // Add custom question
  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    setReview({
      ...review,
      questions: [...review.questions, newQuestionText.trim()],
    });
    setNewQuestionText("");
  };

  const handleDeleteQuestion = (idx: number) => {
    setReview({
      ...review,
      questions: review.questions.filter((_, i) => i !== idx),
    });
  };

  const handleCopyQuestion = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedQuestionIdx(idx);
    setTimeout(() => setCopiedQuestionIdx(null), 2000);
  };

  // Reset workspace
  const handleClearWorkspace = () => {
    setReview({
      title: isRo ? "Analiză Ofertă Reînnoire Nouă" : "New Renewal Offer Review",
      category: "casco",
      current: { currency: "RON", paymentFrequency: "annual" },
      renewal: { currency: "RON", paymentFrequency: "annual" },
      terms: DEFAULT_TERMS_ROWS.map((r) => ({ ...r, status: "needs_clarification" })),
      questions: [],
      userNotes: "",
      lang,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setIsClearConfirmOpen(false);
  };

  // PDF Export
  const handleDownloadPdf = () => {
    const doc = generateRenewalOfferPdf({ ...review, lang });
    doc.save(`analiza-reinnoire-${Date.now()}.pdf`);
  };

  // JSON Export
  const handleExportJson = () => {
    const dataStr = JSON.stringify({ ...review, lang }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `backup-analiza-reinnoire-${Date.now()}.json`;
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
      const res = validateImportedRenewalReview(text);
      if (res.isValid && res.review) {
        setReview(res.review);
        setImportStatus(isRo ? "Analiză importată cu succes în memorie!" : "Review worksheet imported into memory!");
        setTimeout(() => setImportStatus(null), 3500);
      } else {
        setImportStatus(res.error || "Fișier JSON neconform.");
        setTimeout(() => setImportStatus(null), 3500);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Statistics
  const differentTermsCount = review.terms.filter((t) => t.status === "different").length;
  const clarifyTermsCount = review.terms.filter((t) => t.status === "needs_clarification").length;

  return (
    <div className="w-full space-y-8 max-w-5xl mx-auto">
      {/* 1. TOP TOOLBAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-white border border-zinc-200">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          {[
            { id: "inputs" as const, labelRo: "1. Date Polițe & Prime", labelEn: "1. Policies & Premiums" },
            { id: "terms" as const, labelRo: "2. Matrice Diferențe Termeni", labelEn: "2. Terms Delta Matrix" },
            { id: "questions" as const, labelRo: "3. Întrebări & Clarificări", labelEn: "3. Questions & Clarifications" },
            { id: "export" as const, labelRo: "4. Raport & Concluzii", labelEn: "4. Summary & Report" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl font-medium transition-all shrink-0 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-md font-bold"
                  : "bg-zinc-50 text-zinc-500 hover:text-white border border-zinc-200"
              }`}
            >
              {isRo ? tab.labelRo : tab.labelEn}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 text-xs border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-200">
          <Button
            type="button"
            variant="outline"
            onClick={handleDownloadPdf}
            className="rounded-full border-zinc-200 hover:bg-zinc-800 text-zinc-600 h-9 px-3.5 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>PDF</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleExportJson}
            className="rounded-full border-zinc-200 hover:bg-zinc-800 text-zinc-600 h-9 px-3"
            title="Export JSON"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">JSON</span>
          </Button>

          <label className="cursor-pointer rounded-full border border-zinc-200 hover:bg-zinc-800 text-zinc-600 h-9 px-3 inline-flex items-center gap-1.5 transition-colors">
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Import</span>
            <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
          </label>

          <button
            type="button"
            onClick={() => setIsClearConfirmOpen(true)}
            className="text-zinc-500 hover:text-rose-400 transition-colors p-2"
            title={isRo ? "Golește analiza" : "Clear worksheet"}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1 p-1 rounded-full bg-zinc-50 border border-zinc-200">
            <button
              type="button"
              onClick={() => setLang("ro")}
              className={`px-2.5 py-0.5 rounded-full font-medium ${lang === "ro" ? "bg-blue-600 text-white" : "text-zinc-500 hover:text-white"}`}
            >
              RO
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-2.5 py-0.5 rounded-full font-medium ${lang === "en" ? "bg-blue-600 text-white" : "text-zinc-500 hover:text-white"}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {importStatus && (
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 text-xs flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-400" />
          <span>{importStatus}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 1: INPUTS (CURRENT VS RENEWAL) */}
      {/* ======================================================== */}
      {activeTab === "inputs" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-200 shadow-xl space-y-6">
            <div className="space-y-1 pb-4 border-b border-zinc-200">
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                {isRo ? "CONFIGURARE ANALIZĂ & DATE GENERALE" : "REVIEW CONFIGURATION"}
              </span>
              <h3 className="text-xl font-heading font-bold text-zinc-900">
                {review.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-zinc-600 font-medium">{isRo ? "Titlu Analiză *" : "Review Title *"}</label>
                <Input
                  value={review.title}
                  onChange={(e) => setReview({ ...review, title: e.target.value })}
                  className="h-10 bg-white border-zinc-200 text-white rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-600 font-medium">{isRo ? "Categorie Asigurare" : "Policy Category"}</label>
                <select
                  value={review.category}
                  onChange={(e) => setReview({ ...review, category: e.target.value as PolicyCategory })}
                  className="w-full h-10 px-3 rounded-xl bg-white border border-zinc-200 text-white text-xs focus:outline-none"
                >
                  {Object.entries(isRo ? CATEGORY_LABELS_RO : CATEGORY_LABELS_EN).map(([cat, lbl]) => (
                    <option key={cat} value={cat}>
                      {lbl}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* SIDE-BY-SIDE PANELS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* CURRENT POLICY PANEL */}
              <div className="p-5 sm:p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
                <div className="pb-3 border-b border-zinc-200 flex items-center justify-between">
                  <h4 className="font-heading font-bold text-sm text-zinc-800">
                    {isRo ? "1. Polița Curentă (În Vigoare)" : "1. Current Policy Terms"}
                  </h4>
                  <span className="text-[10px] text-zinc-500 uppercase font-semibold">Bază Comparație</span>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-zinc-500">Primă Curentă:</label>
                      <Input
                        type="number"
                        placeholder="Ex: 2400"
                        value={review.current.premium !== undefined ? review.current.premium : ""}
                        onChange={(e) =>
                          setReview({
                            ...review,
                            current: {
                              ...review.current,
                              premium: e.target.value ? parseFloat(e.target.value) : undefined,
                            },
                          })
                        }
                        className="h-10 bg-white border-zinc-200 text-white rounded-xl text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-zinc-500">Valută:</label>
                      <select
                        value={review.current.currency}
                        onChange={(e) =>
                          setReview({
                            ...review,
                            current: { ...review.current, currency: e.target.value as CurrencyCode },
                          })
                        }
                        className="w-full h-10 px-2.5 rounded-xl bg-white border border-zinc-200 text-white text-xs"
                      >
                        {Object.entries(CURRENCY_LABELS).map(([c, lbl]) => (
                          <option key={c} value={c}>
                            {lbl}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-500">Frecvență Plată:</label>
                    <select
                      value={review.current.paymentFrequency}
                      onChange={(e) =>
                        setReview({
                          ...review,
                          current: { ...review.current, paymentFrequency: e.target.value as PaymentFrequency },
                        })
                      }
                      className="w-full h-10 px-2.5 rounded-xl bg-white border border-zinc-200 text-white text-xs"
                    >
                      {Object.entries(isRo ? FREQUENCY_LABELS_RO : FREQUENCY_LABELS_EN).map(([f, lbl]) => (
                        <option key={f} value={f}>
                          {lbl}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-zinc-500">Sumă Asigurată / Limită:</label>
                      <Input
                        type="number"
                        placeholder="Ex: 85000"
                        value={review.current.coverageLimit !== undefined ? review.current.coverageLimit : ""}
                        onChange={(e) =>
                          setReview({
                            ...review,
                            current: {
                              ...review.current,
                              coverageLimit: e.target.value ? parseFloat(e.target.value) : undefined,
                            },
                          })
                        }
                        className="h-10 bg-white border-zinc-200 text-white rounded-xl text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-zinc-500">Franșiză (Deductible):</label>
                      <Input
                        type="number"
                        placeholder="Ex: 500"
                        value={review.current.deductible !== undefined ? review.current.deductible : ""}
                        onChange={(e) =>
                          setReview({
                            ...review,
                            current: {
                              ...review.current,
                              deductible: e.target.value ? parseFloat(e.target.value) : undefined,
                            },
                          })
                        }
                        className="h-10 bg-white border-zinc-200 text-white rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-500">Excluderi / Restricții Specifice:</label>
                    <Input
                      placeholder="Ex: Fără daune produse în afara carosabilului..."
                      value={review.current.exclusions || ""}
                      onChange={(e) =>
                        setReview({
                          ...review,
                          current: { ...review.current, exclusions: e.target.value },
                        })
                      }
                      className="h-10 bg-white border-zinc-200 text-white rounded-xl text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* RENEWAL OFFER PANEL */}
              <div className="p-5 sm:p-6 rounded-2xl bg-zinc-50 border border-blue-500/30 space-y-4">
                <div className="pb-3 border-b border-zinc-200 flex items-center justify-between">
                  <h4 className="font-heading font-bold text-sm text-blue-400">
                    {isRo ? "2. Oferta Nouă de Reînnoire" : "2. Proposed Renewal Offer"}
                  </h4>
                  <span className="text-[10px] text-blue-400 uppercase font-semibold">Propunere</span>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-zinc-500">Primă Cotată Reînnoire:</label>
                      <Input
                        type="number"
                        placeholder="Ex: 2650"
                        value={review.renewal.premium !== undefined ? review.renewal.premium : ""}
                        onChange={(e) =>
                          setReview({
                            ...review,
                            renewal: {
                              ...review.renewal,
                              premium: e.target.value ? parseFloat(e.target.value) : undefined,
                            },
                          })
                        }
                        className="h-10 bg-white border-zinc-200 text-white rounded-xl text-xs font-semibold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-zinc-500">Valută:</label>
                      <select
                        value={review.renewal.currency}
                        onChange={(e) =>
                          setReview({
                            ...review,
                            renewal: { ...review.renewal, currency: e.target.value as CurrencyCode },
                          })
                        }
                        className="w-full h-10 px-2.5 rounded-xl bg-white border border-zinc-200 text-white text-xs"
                      >
                        {Object.entries(CURRENCY_LABELS).map(([c, lbl]) => (
                          <option key={c} value={c}>
                            {lbl}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-500">Frecvență Plată:</label>
                    <select
                      value={review.renewal.paymentFrequency}
                      onChange={(e) =>
                        setReview({
                          ...review,
                          renewal: { ...review.renewal, paymentFrequency: e.target.value as PaymentFrequency },
                        })
                      }
                      className="w-full h-10 px-2.5 rounded-xl bg-white border border-zinc-200 text-white text-xs"
                    >
                      {Object.entries(isRo ? FREQUENCY_LABELS_RO : FREQUENCY_LABELS_EN).map(([f, lbl]) => (
                        <option key={f} value={f}>
                          {lbl}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-zinc-500">Sumă Asigurată Propusă:</label>
                      <Input
                        type="number"
                        placeholder="Ex: 80000"
                        value={review.renewal.coverageLimit !== undefined ? review.renewal.coverageLimit : ""}
                        onChange={(e) =>
                          setReview({
                            ...review,
                            renewal: {
                              ...review.renewal,
                              coverageLimit: e.target.value ? parseFloat(e.target.value) : undefined,
                            },
                          })
                        }
                        className="h-10 bg-white border-zinc-200 text-white rounded-xl text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-zinc-500">Franșiză Propusă:</label>
                      <Input
                        type="number"
                        placeholder="Ex: 500"
                        value={review.renewal.deductible !== undefined ? review.renewal.deductible : ""}
                        onChange={(e) =>
                          setReview({
                            ...review,
                            renewal: {
                              ...review.renewal,
                              deductible: e.target.value ? parseFloat(e.target.value) : undefined,
                            },
                          })
                        }
                        className="h-10 bg-white border-zinc-200 text-white rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-500">Excluderi Propuse:</label>
                    <Input
                      placeholder="Ex: Verifică Condițiile Generale noi..."
                      value={review.renewal.exclusions || ""}
                      onChange={(e) =>
                        setReview({
                          ...review,
                          renewal: { ...review.renewal, exclusions: e.target.value },
                        })
                      }
                      className="h-10 bg-white border-zinc-200 text-white rounded-xl text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* LIVE PREMIUM COMPARISON RESULT */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                  {isRo ? "REZULTAT DETERMINISTIC PRIMĂ" : "PREMIUM DELTA CALCULATION"}
                </span>
                {premDiff.isComparable && premDiff.difference !== undefined ? (
                  <div className="flex items-center gap-2">
                    <div className="text-lg font-bold font-heading text-white">
                      {premDiff.difference > 0 ? `+${premDiff.difference}` : premDiff.difference} {review.current.currency}
                    </div>
                    {premDiff.percentageChange !== undefined && (
                      <span
                        className={`font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          premDiff.direction === "increase"
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            : premDiff.direction === "decrease"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-zinc-800 text-zinc-600"
                        }`}
                      >
                        {premDiff.direction === "increase" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        <span>{premDiff.percentageChange > 0 ? `+${premDiff.percentageChange}%` : `${premDiff.percentageChange}%`}</span>
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="text-zinc-500 italic">{premDiff.reason || (isRo ? "Completează ambele valori de primă." : "Enter both values.")}</p>
                )}
              </div>

              <Button
                type="button"
                onClick={() => setActiveTab("terms")}
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10 px-5 flex items-center gap-1.5 shrink-0"
              >
                <span>{isRo ? "Analizează Diferențele de Clauze" : "Review Terms Matrix"}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: TERMS DELTA MATRIX */}
      {/* ======================================================== */}
      {activeTab === "terms" && (
        <div className="p-6 sm:p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-200 shadow-xl space-y-6">
          <div className="pb-4 border-b border-zinc-200 space-y-1">
            <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
              {isRo ? "MATRICE COMPARATIVĂ DETALIATĂ A TERMENILOR" : "TERMS COMPARISON MATRIX"}
            </span>
            <h3 className="text-xl font-heading font-bold text-zinc-900">
              {isRo ? "Verifică diferențele dintre contractul vechi și oferta nouă" : "Evaluate contractual differences side-by-side"}
            </h3>
            <p className="text-xs text-zinc-500">
              {isRo
                ? "Bifează starea fiecărui termen contractual. Dacă un termen nu este specificat pe ofertă, marchează 'Lipsește din Ofertă'."
                : "Mark the status of each term. Missing information should be clarified before accepting."}
            </p>
          </div>

          <div className="space-y-3">
            {review.terms.map((row) => (
              <div
                key={row.id}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 transition-all space-y-3 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="text-sm font-heading font-bold text-zinc-900">
                    {isRo ? row.labelRo : row.labelEn}
                  </h4>
                  <select
                    value={row.status}
                    onChange={(e) => updateTermStatus(row.id, e.target.value as TermComparisonStatus)}
                    className="h-8 px-2.5 rounded-lg bg-white border border-zinc-300 text-white text-[11px] focus:outline-none"
                  >
                    {Object.entries(isRo ? TERM_STATUS_LABELS_RO : TERM_STATUS_LABELS_EN).map(([s, lbl]) => (
                      <option key={s} value={s}>
                        {lbl}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-zinc-500 text-[11px]">{isRo ? "Valoare Poliță Curentă:" : "Current Value:"}</label>
                    <Input
                      placeholder={isRo ? "Ex: 85.000 RON..." : "Current value..."}
                      value={row.currentVal || ""}
                      onChange={(e) => updateTermValues(row.id, e.target.value, row.renewalVal || "", row.notes)}
                      className="h-9 bg-white border-zinc-200 text-white rounded-xl text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-blue-400 text-[11px] font-semibold">{isRo ? "Valoare Ofertă Reînnoire:" : "Renewal Value:"}</label>
                    <Input
                      placeholder={isRo ? "Ex: 80.000 RON..." : "Renewal value..."}
                      value={row.renewalVal || ""}
                      onChange={(e) => updateTermValues(row.id, row.currentVal || "", e.target.value, row.notes)}
                      className="h-9 bg-white border-zinc-200 text-white rounded-xl text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-4 border-t border-zinc-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveTab("inputs")}
              className="rounded-full border-zinc-200 text-zinc-600 text-xs h-11 px-5 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isRo ? "Înapoi la Prime" : "Back to Premiums"}</span>
            </Button>

            <Button
              type="button"
              onClick={() => setActiveTab("questions")}
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 px-6 flex items-center gap-2"
            >
              <span>{isRo ? "Vezi Întrebările de Clarificat" : "View Questions to Clarify"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: QUESTIONS & CLARIFICATIONS */}
      {/* ======================================================== */}
      {activeTab === "questions" && (
        <div className="p-6 sm:p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-200 shadow-xl space-y-6">
          <div className="pb-4 border-b border-zinc-200 space-y-1">
            <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
              {isRo ? "ÎNTREBĂRI CHEIE DE ADRESAT ASIGURATORULUI" : "RENEWAL CLARIFICATION QUESTIONS"}
            </span>
            <h3 className="text-xl font-heading font-bold text-zinc-900">
              {isRo ? "Ce trebuie să clarifici înainte de a semna reînnoirea?" : "Key questions to resolve before renewing"}
            </h3>
            <p className="text-xs text-zinc-500">
              {isRo
                ? "Întrebările de mai jos sunt generate pe baza diferențelor identificate în analiza ta."
                : "Questions below are generated based on your comparison delta."}
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {review.questions.map((q, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border border-zinc-200 flex items-start justify-between gap-3 text-zinc-800"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="leading-relaxed">{q}</p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopyQuestion(q, idx)}
                    className="p-1.5 rounded-lg bg-zinc-800 text-zinc-500 hover:text-white"
                    title={isRo ? "Copiază" : "Copy"}
                  >
                    {copiedQuestionIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(idx)}
                    className="p-1.5 rounded-lg bg-zinc-800 text-zinc-500 hover:text-rose-400"
                    title={isRo ? "Șterge" : "Delete"}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Add Custom Question Form */}
            <form onSubmit={handleAddQuestion} className="flex gap-2 pt-2">
              <Input
                placeholder={isRo ? "Adaugă o întrebare personalizată..." : "Add custom question..."}
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                className="h-10 bg-white border-zinc-200 text-white rounded-xl text-xs flex-1"
              />
              <Button type="submit" className="rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs h-10 px-4">
                <Plus className="w-3.5 h-3.5 mr-1" />
                {isRo ? "Adaugă" : "Add"}
              </Button>
            </form>
          </div>

          <div className="flex justify-between pt-4 border-t border-zinc-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveTab("terms")}
              className="rounded-full border-zinc-200 text-zinc-600 text-xs h-11 px-5 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isRo ? "Înapoi la Termeni" : "Back to Terms"}</span>
            </Button>

            <Button
              type="button"
              onClick={() => setActiveTab("export")}
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 px-6 flex items-center gap-2"
            >
              <span>{isRo ? "Vezi Raportul & Concluzii" : "View Summary & Report"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: SUMMARY & NEUTRAL EXPORT */}
      {/* ======================================================== */}
      {activeTab === "export" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-200 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                  {isRo ? "SUMAR ANALIZĂ & RAPORT DESCARCABIL" : "RENEWAL SUMMARY & REPORT"}
                </span>
                <h3 className="text-xl font-heading font-bold text-zinc-900">
                  {review.title}
                </h3>
              </div>

              <Button
                type="button"
                onClick={handleDownloadPdf}
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 px-5 flex items-center gap-1.5 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>{isRo ? "Descarcă Raport PDF" : "Download PDF Report"}</span>
              </Button>
            </div>

            {/* METRICS SUMMARY */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-white border border-zinc-200 space-y-1">
                <span className="text-zinc-500 font-semibold">{isRo ? "Diferență Primă" : "Premium Delta"}</span>
                <div className="text-xl font-bold text-zinc-900 font-heading truncate">
                  {premDiff.isComparable && premDiff.difference !== undefined
                    ? `${premDiff.difference > 0 ? `+${premDiff.difference}` : premDiff.difference} ${review.current.currency}`
                    : "—"}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 space-y-1">
                <span className="font-semibold">{isRo ? "Clauze Diferite" : "Different Terms"}</span>
                <div className="text-2xl font-bold">{differentTermsCount}</div>
              </div>
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 space-y-1">
                <span className="font-semibold">{isRo ? "De Clarificat" : "Needs Clarification"}</span>
                <div className="text-2xl font-bold">{clarifyTermsCount}</div>
              </div>
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 space-y-1">
                <span className="font-semibold">{isRo ? "Întrebări Pregătite" : "Questions Ready"}</span>
                <div className="text-2xl font-bold">{review.questions.length}</div>
              </div>
            </div>

            {/* NEUTRAL DECISION NOTICE */}
            <div className="p-5 rounded-2xl bg-white border border-zinc-200 space-y-2 text-xs text-zinc-500">
              <div className="flex items-center gap-2 text-zinc-600 font-bold">
                <Scale className="w-4 h-4 text-blue-400" />
                <span>{isRo ? "Neutralitate Decizională" : "Decision Neutrality"}</span>
              </div>
              <p className="leading-relaxed">
                {isRo
                  ? "Acest instrument oferă o comparație strict matematică și informativă a datelor introduse. Nu recomandă automat acceptarea sau refuzul ofertei. Decizia finală trebuie fundamentată pe Condițiile Generale complete și consultarea unui broker autorizat."
                  : "This tool provides an informational comparison and does not recommend accepting or rejecting any quote. Decisions should be based on full policy wordings."}
              </p>
            </div>

            {/* ADVISORY CTA */}
            <div className="p-6 rounded-3xl bg-blue-600/10 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-bold text-zinc-900">
                  {isRo ? "Vrei o părere independentă înainte de semnare?" : "Want an independent second opinion before signing?"}
                </h4>
                <p className="text-xs text-zinc-500">
                  {isRo ? "Trimite oferta pentru un audit profesionist și cotare pe întreaga piață a asigurărilor." : "Submit your renewal notice for a comprehensive terms audit and alternative quotes."}
                </p>
              </div>
              <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 px-6 shrink-0">
                <Link href="/verifica-polita">
                  {isRo ? "Auditează Oferta Gratuit &rarr;" : "Audit Renewal Free &rarr;"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRIVACY & LOCAL MEMORY NOTICE */}
      <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-2 text-xs text-zinc-500">
        <div className="flex items-center gap-2 text-zinc-600 font-bold">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>{isRo ? "Confidențialitate Totală & Stocare Volatilă" : "Total Privacy & Active Session Memory"}</span>
        </div>
        <p className="leading-relaxed">
          {isRo
            ? "Toate valorile și clauzele din această analiză sunt procesate exclusiv în memoria locală a browserului tău pe durata sesiunii active. Nu sunt transmise către servere sau baze de date. Descarcă fișierul PDF sau backup-ul JSON pentru păstrare offline înainte de reîncărcarea paginii."
            : "All renewal review entries are processed strictly in active browser memory. No data is stored on remote servers or databases. Download your PDF or JSON backup before closing the tab."}
        </p>
      </div>

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
              className="w-full max-w-md p-6 rounded-3xl bg-zinc-50 border border-rose-500/30 shadow-2xl space-y-4 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-zinc-900">
                {isRo ? "Golești analiza de reînnoire curentă?" : "Clear active renewal review?"}
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {isRo
                  ? "Această acțiune va reseta toate datele din memoria activă. Asigură-te că ai descărcat un raport PDF sau backup JSON."
                  : "This will clear all in-memory comparison values. Download a PDF or JSON backup first if needed."}
              </p>
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsClearConfirmOpen(false)}
                  className="flex-1 rounded-xl border-zinc-200 text-zinc-600 text-xs h-10"
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
