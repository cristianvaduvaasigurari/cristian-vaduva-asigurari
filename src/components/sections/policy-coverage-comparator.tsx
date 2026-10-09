"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitCompare,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Download,
  RotateCcw,
  Sparkles,
  Layers,
  ArrowRight,
  Lock,
  Copy,
  Check,
  Building2,
  Calendar,
  DollarSign,
  AlignLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PolicyComparisonData,
  ComparisonRow,
  ReviewSubject,
  DEFAULT_REVIEW_SUBJECTS,
  buildComparisonRows,
  generateAdvisorQuestions,
  comparePastedTexts,
  generateComparisonPdf,
  FieldStatus,
} from "@/lib/policy-comparison";
import {
  PolicyCategory,
  CATEGORY_LABELS_RO,
  CATEGORY_LABELS_EN,
} from "@/lib/portfolio-calendar";
import Link from "next/link";

export function PolicyCoverageComparator() {
  const [lang, setLang] = useState<"ro" | "en">("ro");
  const isRo = lang === "ro";

  // Tab navigation
  const [activeTab, setActiveTab] = useState<"input" | "matrix" | "checklist" | "text_diff" | "questions">("input");

  // Policy A State
  const [polA, setPolA] = useState<PolicyComparisonData>({
    label: "Oferta Asigurator A",
    category: "home",
    insurer: "",
    productName: "Premium Home",
    coverageLimit: 150000,
    limitCurrency: "EUR",
    limitBasis: "Valoare Reconstrucție Nou",
    deductible: 100,
    deductibleCurrency: "EUR",
    deductibleBasis: "per daună apă accidentală",
    exclusions: "Inundații naturale fără autorizație, vicii ascunse de construcție",
    waitingPeriod: "5 zile de la emitere",
    territorialScope: "România",
    effectiveDates: "12 luni",
    specialConditions: "Include asistență tehnică de urgență la domiciliu (instalații/lăcătuș)",
    pastedText: "",
  });

  // Policy B State
  const [polB, setPolB] = useState<PolicyComparisonData>({
    label: "Oferta Asigurator B",
    category: "home",
    insurer: "",
    productName: "Standard Guard",
    coverageLimit: 120000,
    limitCurrency: "EUR",
    limitBasis: "Valoare Reală cu Uzură",
    deductible: 0,
    deductibleCurrency: "EUR",
    deductibleBasis: "Fără franșiză",
    exclusions: "Exclusă răspunderea civilă față de vecini la avarii de conducte",
    waitingPeriod: "Fără carență",
    territorialScope: "România",
    effectiveDates: "12 luni",
    specialConditions: "Nu include asistență de urgență",
    pastedText: "",
  });

  // Subjects review checklist state
  const [subjects, setSubjects] = useState<ReviewSubject[]>(
    DEFAULT_REVIEW_SUBJECTS.map((s) => ({
      ...s,
      statusA: "clarify",
      statusB: "clarify",
    }))
  );

  // Copy questions state
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Reset comparison
  const handleReset = () => {
    setPolA({
      label: "Oferta A",
      category: "rca",
      insurer: "",
      productName: "",
      coverageLimit: undefined,
      limitCurrency: "RON",
      limitBasis: "",
      deductible: undefined,
      deductibleCurrency: "RON",
      deductibleBasis: "",
      exclusions: "",
      waitingPeriod: "",
      territorialScope: "",
      effectiveDates: "",
      specialConditions: "",
      pastedText: "",
    });
    setPolB({
      label: "Oferta B",
      category: "rca",
      insurer: "",
      productName: "",
      coverageLimit: undefined,
      limitCurrency: "RON",
      limitBasis: "",
      deductible: undefined,
      deductibleCurrency: "RON",
      deductibleBasis: "",
      exclusions: "",
      waitingPeriod: "",
      territorialScope: "",
      effectiveDates: "",
      specialConditions: "",
      pastedText: "",
    });
    setSubjects(
      DEFAULT_REVIEW_SUBJECTS.map((s) => ({
        ...s,
        statusA: "clarify",
        statusB: "clarify",
      }))
    );
  };

  // Build matrix & advisor questions
  const comparisonRows = buildComparisonRows(polA, polB, lang);
  const advisorQuestions = generateAdvisorQuestions(polA, polB, subjects, lang);
  const textDiffResult = comparePastedTexts(polA.pastedText || "", polB.pastedText || "", lang);

  // Subject status update helper
  const updateSubjectStatus = (
    id: string,
    target: "statusA" | "statusB",
    status: "reviewed" | "clarify" | "not_applicable" | "not_found"
  ) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [target]: status } : s))
    );
  };

  // PDF Export
  const handleDownloadPdf = () => {
    const doc = generateComparisonPdf(polA, polB, subjects, advisorQuestions, lang);
    doc.save(`comparatie-polite-${Date.now()}.pdf`);
  };

  const handleCopyQuestion = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const statusBadge = (st: FieldStatus) => {
    switch (st) {
      case "provided":
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">{isRo ? "Completat" : "Provided"}</span>;
      case "missing":
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500 border border-zinc-300 font-medium">{isRo ? "Nespecificat" : "Missing"}</span>;
      case "requires_review":
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">{isRo ? "De Verificat" : "Review"}</span>;
      case "user_difference":
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">{isRo ? "Diferență" : "Difference"}</span>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full space-y-8 max-w-5xl mx-auto">
      {/* 1. TOP TOOLBAR & TAB SWITCHER */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-white border border-zinc-200">
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("input")}
            className={`px-3.5 py-2 rounded-xl font-medium transition-all ${
              activeTab === "input" ? "bg-blue-600 text-white shadow-md" : "text-zinc-500 hover:text-white"
            }`}
          >
            {isRo ? "1. Detalii Polițe" : "1. Policy Details"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("matrix")}
            className={`px-3.5 py-2 rounded-xl font-medium transition-all ${
              activeTab === "matrix" ? "bg-blue-600 text-white shadow-md" : "text-zinc-500 hover:text-white"
            }`}
          >
            {isRo ? "2. Matrice Comparativă" : "2. Comparison Matrix"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("checklist")}
            className={`px-3.5 py-2 rounded-xl font-medium transition-all ${
              activeTab === "checklist" ? "bg-blue-600 text-white shadow-md" : "text-zinc-500 hover:text-white"
            }`}
          >
            {isRo ? "3. Checklist Clauze (13)" : "3. Clause Checklist (13)"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("text_diff")}
            className={`px-3.5 py-2 rounded-xl font-medium transition-all ${
              activeTab === "text_diff" ? "bg-blue-600 text-white shadow-md" : "text-zinc-500 hover:text-white"
            }`}
          >
            {isRo ? "4. Analiză Text Clauze" : "4. Clause Text Diff"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("questions")}
            className={`px-3.5 py-2 rounded-xl font-medium transition-all ${
              activeTab === "questions" ? "bg-blue-600 text-white shadow-md" : "text-zinc-500 hover:text-white"
            }`}
          >
            {isRo ? "5. Întrebări Broker" : "5. Advisor Questions"}
          </button>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-200">
          <Button
            type="button"
            variant="outline"
            onClick={handleDownloadPdf}
            className="rounded-full border-zinc-200 hover:bg-zinc-800 text-zinc-600 h-9 px-3.5 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>PDF Raport</span>
          </Button>

          <button
            type="button"
            onClick={handleReset}
            className="text-zinc-500 hover:text-zinc-600 transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isRo ? "Resetează" : "Reset"}</span>
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

      {/* ======================================================== */}
      {/* TAB 1: INPUT DATA (SIDE-BY-SIDE FORM) */}
      {/* ======================================================== */}
      {activeTab === "input" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* POLICY A COLUMN */}
            <div className="p-6 sm:p-7 rounded-[2.5rem] bg-zinc-50 border border-blue-500/30 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                    A
                  </div>
                  <h3 className="text-base font-heading font-bold text-zinc-900">
                    {isRo ? "Polița A / Oferta 1" : "Policy A / Offer 1"}
                  </h3>
                </div>
                <span className="text-[11px] text-zinc-500">{polA.category}</span>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-zinc-600 font-medium">Denumire / Identificator *</label>
                  <Input
                    value={polA.label}
                    onChange={(e) => setPolA({ ...polA, label: e.target.value })}
                    className="h-10 bg-white border-zinc-200 text-white rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-zinc-600 font-medium">Categorie</label>
                    <select
                      value={polA.category}
                      onChange={(e) => setPolA({ ...polA, category: e.target.value as PolicyCategory })}
                      className="w-full h-10 px-2.5 rounded-xl bg-white border border-zinc-200 text-white focus:outline-none text-xs"
                    >
                      {Object.entries(isRo ? CATEGORY_LABELS_RO : CATEGORY_LABELS_EN).map(([cat, lbl]) => (
                        <option key={cat} value={cat}>
                          {lbl}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-zinc-600 font-medium">Companie Asigurare</label>
                    <Input
                      placeholder="Ex: Allianz, Generali..."
                      value={polA.insurer}
                      onChange={(e) => setPolA({ ...polA, insurer: e.target.value })}
                      className="h-10 bg-white border-zinc-200 text-white rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-zinc-600 font-medium">Sumă Asigurată / Limită</label>
                    <div className="flex gap-1.5">
                      <Input
                        type="number"
                        placeholder="Ex: 150000"
                        value={polA.coverageLimit !== undefined ? polA.coverageLimit : ""}
                        onChange={(e) => setPolA({ ...polA, coverageLimit: e.target.value ? parseFloat(e.target.value) : undefined })}
                        className="h-10 bg-white border-zinc-200 text-white rounded-xl flex-1"
                      />
                      <select
                        value={polA.limitCurrency}
                        onChange={(e) => setPolA({ ...polA, limitCurrency: e.target.value as "EUR" | "RON" | "USD" })}
                        className="h-10 px-2 rounded-xl bg-white border border-zinc-200 text-white text-xs"
                      >
                        <option value="EUR">EUR</option>
                        <option value="RON">RON</option>
                        <option value="USD">USD</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-600 font-medium">Franșiză (Excess)</label>
                    <div className="flex gap-1.5">
                      <Input
                        type="number"
                        placeholder="Ex: 100"
                        value={polA.deductible !== undefined ? polA.deductible : ""}
                        onChange={(e) => setPolA({ ...polA, deductible: e.target.value ? parseFloat(e.target.value) : undefined })}
                        className="h-10 bg-white border-zinc-200 text-white rounded-xl flex-1"
                      />
                      <select
                        value={polA.deductibleCurrency}
                        onChange={(e) => setPolA({ ...polA, deductibleCurrency: e.target.value as "EUR" | "RON" | "USD" })}
                        className="h-10 px-2 rounded-xl bg-white border border-zinc-200 text-white text-xs"
                      >
                        <option value="EUR">EUR</option>
                        <option value="RON">RON</option>
                        <option value="USD">USD</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-600 font-medium">Bază Evaluare / Calcul Despăgubire</label>
                  <Input
                    placeholder="Ex: Valoare de nou (reconstrucție) / Valoare reală cu uzură..."
                    value={polA.limitBasis}
                    onChange={(e) => setPolA({ ...polA, limitBasis: e.target.value })}
                    className="h-10 bg-white border-zinc-200 text-white rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-600 font-medium">Excluderi Menționate</label>
                  <textarea
                    rows={2}
                    placeholder="Ex: Fără daune produse de cutremur peste limita PAD..."
                    value={polA.exclusions}
                    onChange={(e) => setPolA({ ...polA, exclusions: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-white border border-zinc-200 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-zinc-600 font-medium">Perioadă Carență</label>
                    <Input
                      placeholder="Ex: 5 zile / Fără"
                      value={polA.waitingPeriod}
                      onChange={(e) => setPolA({ ...polA, waitingPeriod: e.target.value })}
                      className="h-10 bg-white border-zinc-200 text-white rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-zinc-600 font-medium">Arie Teritorială</label>
                    <Input
                      placeholder="Ex: România / UE"
                      value={polA.territorialScope}
                      onChange={(e) => setPolA({ ...polA, territorialScope: e.target.value })}
                      className="h-10 bg-white border-zinc-200 text-white rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-600 font-medium">Condiții Speciale / Endorsements</label>
                  <Input
                    placeholder="Ex: Include asistență 24/7 decontare directă..."
                    value={polA.specialConditions}
                    onChange={(e) => setPolA({ ...polA, specialConditions: e.target.value })}
                    className="h-10 bg-white border-zinc-200 text-white rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* POLICY B COLUMN */}
            <div className="p-6 sm:p-7 rounded-[2.5rem] bg-zinc-50 border border-zinc-200 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-zinc-800 text-zinc-600 flex items-center justify-center font-bold text-xs">
                    B
                  </div>
                  <h3 className="text-base font-heading font-bold text-zinc-900">
                    {isRo ? "Polița B / Oferta 2" : "Policy B / Offer 2"}
                  </h3>
                </div>
                <span className="text-[11px] text-zinc-500">{polB.category}</span>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-zinc-600 font-medium">Denumire / Identificator *</label>
                  <Input
                    value={polB.label}
                    onChange={(e) => setPolB({ ...polB, label: e.target.value })}
                    className="h-10 bg-white border-zinc-200 text-white rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-zinc-600 font-medium">Categorie</label>
                    <select
                      value={polB.category}
                      onChange={(e) => setPolB({ ...polB, category: e.target.value as PolicyCategory })}
                      className="w-full h-10 px-2.5 rounded-xl bg-white border border-zinc-200 text-white focus:outline-none text-xs"
                    >
                      {Object.entries(isRo ? CATEGORY_LABELS_RO : CATEGORY_LABELS_EN).map(([cat, lbl]) => (
                        <option key={cat} value={cat}>
                          {lbl}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-zinc-600 font-medium">Companie Asigurare</label>
                    <Input
                      placeholder="Ex: Groupama, Omniasig..."
                      value={polB.insurer}
                      onChange={(e) => setPolB({ ...polB, insurer: e.target.value })}
                      className="h-10 bg-white border-zinc-200 text-white rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-zinc-600 font-medium">Sumă Asigurată / Limită</label>
                    <div className="flex gap-1.5">
                      <Input
                        type="number"
                        placeholder="Ex: 120000"
                        value={polB.coverageLimit !== undefined ? polB.coverageLimit : ""}
                        onChange={(e) => setPolB({ ...polB, coverageLimit: e.target.value ? parseFloat(e.target.value) : undefined })}
                        className="h-10 bg-white border-zinc-200 text-white rounded-xl flex-1"
                      />
                      <select
                        value={polB.limitCurrency}
                        onChange={(e) => setPolB({ ...polB, limitCurrency: e.target.value as "EUR" | "RON" | "USD" })}
                        className="h-10 px-2 rounded-xl bg-white border border-zinc-200 text-white text-xs"
                      >
                        <option value="EUR">EUR</option>
                        <option value="RON">RON</option>
                        <option value="USD">USD</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-600 font-medium">Franșiză (Excess)</label>
                    <div className="flex gap-1.5">
                      <Input
                        type="number"
                        placeholder="Ex: 0"
                        value={polB.deductible !== undefined ? polB.deductible : ""}
                        onChange={(e) => setPolB({ ...polB, deductible: e.target.value ? parseFloat(e.target.value) : undefined })}
                        className="h-10 bg-white border-zinc-200 text-white rounded-xl flex-1"
                      />
                      <select
                        value={polB.deductibleCurrency}
                        onChange={(e) => setPolB({ ...polB, deductibleCurrency: e.target.value as "EUR" | "RON" | "USD" })}
                        className="h-10 px-2 rounded-xl bg-white border border-zinc-200 text-white text-xs"
                      >
                        <option value="EUR">EUR</option>
                        <option value="RON">RON</option>
                        <option value="USD">USD</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-600 font-medium">Bază Evaluare / Calcul Despăgubire</label>
                  <Input
                    placeholder="Ex: Valoare reală..."
                    value={polB.limitBasis}
                    onChange={(e) => setPolB({ ...polB, limitBasis: e.target.value })}
                    className="h-10 bg-white border-zinc-200 text-white rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-600 font-medium">Excluderi Menționate</label>
                  <textarea
                    rows={2}
                    placeholder="Ex: Exclude răspunderea pentru infiltrații..."
                    value={polB.exclusions}
                    onChange={(e) => setPolB({ ...polB, exclusions: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-white border border-zinc-200 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-zinc-600 font-medium">Perioadă Carență</label>
                    <Input
                      placeholder="Ex: Fără carență"
                      value={polB.waitingPeriod}
                      onChange={(e) => setPolB({ ...polB, waitingPeriod: e.target.value })}
                      className="h-10 bg-white border-zinc-200 text-white rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-zinc-600 font-medium">Arie Teritorială</label>
                    <Input
                      placeholder="Ex: România"
                      value={polB.territorialScope}
                      onChange={(e) => setPolB({ ...polB, territorialScope: e.target.value })}
                      className="h-10 bg-white border-zinc-200 text-white rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-600 font-medium">Condiții Speciale / Endorsements</label>
                  <Input
                    placeholder="Ex: Fără servicii suplimentare..."
                    value={polB.specialConditions}
                    onChange={(e) => setPolB({ ...polB, specialConditions: e.target.value })}
                    className="h-10 bg-white border-zinc-200 text-white rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() => setActiveTab("matrix")}
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 px-6 flex items-center gap-2"
            >
              <span>{isRo ? "Vezi Matricea Comparativă" : "View Comparison Matrix"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: SIDE-BY-SIDE COMPARISON MATRIX */}
      {/* ======================================================== */}
      {activeTab === "matrix" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-200 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                  {isRo ? "MATRICE DETERMINISTICĂ" : "DETERMINISTIC COMPARISON MATRIX"}
                </span>
                <h3 className="text-lg font-heading font-bold text-zinc-900">
                  {polA.label} vs. {polB.label}
                </h3>
              </div>
              <div className="text-xs text-zinc-500">
                {isRo ? "Comparație directă pe bază de parametri introduși" : "Direct parameter comparison"}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 text-zinc-500">
                    <th className="py-3 px-3 font-semibold w-1/3">{isRo ? "Parametru Contractual" : "Contractual Parameter"}</th>
                    <th className="py-3 px-3 font-semibold w-1/3 text-blue-400 bg-blue-500/5 rounded-t-xl">{polA.label}</th>
                    <th className="py-3 px-3 font-semibold w-1/3 text-zinc-800">{polB.label}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {comparisonRows.map((row) => (
                    <tr key={row.fieldId} className="hover:bg-zinc-50 transition-colors">
                      <td className="py-3 px-3 align-top font-medium text-zinc-600">
                        <div>{isRo ? row.labelRo : row.labelEn}</div>
                        {row.notes && <div className="text-[10px] text-amber-400/80 mt-0.5">{row.notes}</div>}
                      </td>
                      <td className="py-3 px-3 align-top bg-blue-500/5">
                        <div className="space-y-1">
                          <div className="text-white font-medium">{row.valA}</div>
                          {statusBadge(row.statusA)}
                        </div>
                      </td>
                      <td className="py-3 px-3 align-top">
                        <div className="space-y-1">
                          <div className="text-zinc-800 font-medium">{row.valB}</div>
                          {statusBadge(row.statusB)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-4 border-t border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {isRo
                    ? "Comparația nu clasează o ofertă ca fiind 'mai bună'. O sumă asigurată mai mare poate avea excluderi mai restrictive."
                    : "Comparison does not rank an offer. Higher limits may be offset by restrictive exclusions."}
                </span>
              </div>
              <Button
                type="button"
                onClick={() => setActiveTab("checklist")}
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10 px-5 shrink-0"
              >
                <span>{isRo ? "Verifică Clauzele (13)" : "Check Clauses (13)"}</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: EXCLUSION & CLAUSE CHECKLIST */}
      {/* ======================================================== */}
      {activeTab === "checklist" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-200 shadow-xl space-y-6">
            <div className="pb-4 border-b border-zinc-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                {isRo ? "CHECKLIST DE AUDIT ŞI VERIFICARE CONTRACTUALĂ" : "CLAUSE AUDIT CHECKLIST"}
              </span>
              <h3 className="text-lg font-heading font-bold text-zinc-900">
                {isRo ? "13 Capitole Cheie de Verificat în Condițiile Generale" : "13 Key Policy Chapters to Verify in Full Terms"}
              </h3>
              <p className="text-xs text-zinc-500">
                {isRo
                  ? "Bifează starea fiecărui capitol pentru cele două oferte. Statusul 'Negăsit' nu garantează absența clauzei din contractul complet."
                  : "Mark the status of each chapter. 'Not found' does not guarantee the clause is absent from full contract."}
              </p>
            </div>

            <div className="space-y-4">
              {subjects.map((sub) => (
                <div
                  key={sub.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-zinc-200/80 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-heading font-bold text-zinc-900">
                        {isRo ? sub.titleRo : sub.titleEn}
                      </h4>
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        {isRo ? sub.descriptionRo : sub.descriptionEn}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-200/60 text-xs">
                    {/* Status A */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-500/5 border border-blue-500/20">
                      <span className="font-semibold text-blue-400">{polA.label}:</span>
                      <select
                        value={sub.statusA}
                        onChange={(e) => updateSubjectStatus(sub.id, "statusA", e.target.value as "reviewed" | "clarify" | "not_applicable" | "not_found")}
                        className="h-8 px-2 rounded-lg bg-white border border-zinc-300 text-white text-[11px] focus:outline-none"
                      >
                        <option value="reviewed">{isRo ? "✓ Verificat OK" : "✓ Reviewed OK"}</option>
                        <option value="clarify">{isRo ? "⚠️ Necesită Clarificare" : "⚠️ Clarification Needed"}</option>
                        <option value="not_found">{isRo ? "❓ Negăsit în Ofertă" : "❓ Not Found in Quote"}</option>
                        <option value="not_applicable">{isRo ? "— Nu se aplică" : "— Not Applicable"}</option>
                      </select>
                    </div>

                    {/* Status B */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-zinc-200">
                      <span className="font-semibold text-zinc-600">{polB.label}:</span>
                      <select
                        value={sub.statusB}
                        onChange={(e) => updateSubjectStatus(sub.id, "statusB", e.target.value as "reviewed" | "clarify" | "not_applicable" | "not_found")}
                        className="h-8 px-2 rounded-lg bg-white border border-zinc-300 text-white text-[11px] focus:outline-none"
                      >
                        <option value="reviewed">{isRo ? "✓ Verificat OK" : "✓ Reviewed OK"}</option>
                        <option value="clarify">{isRo ? "⚠️ Necesită Clarificare" : "⚠️ Clarification Needed"}</option>
                        <option value="not_found">{isRo ? "❓ Negăsit în Ofertă" : "❓ Not Found in Quote"}</option>
                        <option value="not_applicable">{isRo ? "— Nu se aplică" : "— Not Applicable"}</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-zinc-200">
              <Button
                type="button"
                onClick={() => setActiveTab("questions")}
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 px-6 flex items-center gap-2"
              >
                <span>{isRo ? "Generează Întrebările pentru Broker" : "Generate Advisor Questions"}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: CLAUSE TEXT DIFF */}
      {/* ======================================================== */}
      {activeTab === "text_diff" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-200 shadow-xl space-y-6">
            <div className="pb-4 border-b border-zinc-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                {isRo ? "ANALIZĂ DETERMINISTICĂ TEXT CLAUZE" : "DETERMINISTIC TEXT DIFF"}
              </span>
              <h3 className="text-lg font-heading font-bold text-zinc-900">
                {isRo ? "Compară Pasaje și Clauze Copiate Manual" : "Compare Pasted Policy Excerpts"}
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {isRo
                  ? "Lipește fragmente de clauze din cele două contracte. Algoritmul compară structura textului, dar nu interpretează efectul juridic al nuanțelor contractuale."
                  : "Paste policy clauses side-by-side. Text differences do not constitute legal interpretation."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-blue-400">
                  {isRo ? `Text Clauze: ${polA.label}` : `Clauses: ${polA.label}`}
                </label>
                <textarea
                  rows={8}
                  placeholder={isRo ? "Lipește aici textul clauzei din Polița A..." : "Paste excerpt from Policy A..."}
                  value={polA.pastedText}
                  onChange={(e) => setPolA({ ...polA, pastedText: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-white border border-zinc-200 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-600">
                  {isRo ? `Text Clauze: ${polB.label}` : `Clauses: ${polB.label}`}
                </label>
                <textarea
                  rows={8}
                  placeholder={isRo ? "Lipește aici textul clauzei din Polița B..." : "Paste excerpt from Policy B..."}
                  value={polB.pastedText}
                  onChange={(e) => setPolB({ ...polB, pastedText: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-white border border-zinc-200 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {textDiffResult.hasComparison && (
              <div className="p-5 rounded-2xl bg-white border border-zinc-200 space-y-4 text-xs">
                <h4 className="font-bold text-zinc-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>{isRo ? "Rezultate Analiză Text" : "Text Analysis Results"}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-zinc-500 font-medium">{isRo ? `Pasaje unice în ${polA.label}:` : `Unique in ${polA.label}:`}</span>
                    {textDiffResult.uniqueLinesA.length > 0 ? (
                      <ul className="list-disc pl-4 space-y-1 text-blue-800 font-mono text-[11px]">
                        {textDiffResult.uniqueLinesA.map((line, idx) => (
                          <li key={idx} className="truncate">{line}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-zinc-500 text-[11px]">{isRo ? "Niciun rând complet diferit detectat." : "No distinct lines detected."}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <span className="text-zinc-500 font-medium">{isRo ? `Pasaje unice în ${polB.label}:` : `Unique in ${polB.label}:`}</span>
                    {textDiffResult.uniqueLinesB.length > 0 ? (
                      <ul className="list-disc pl-4 space-y-1 text-amber-800 font-mono text-[11px]">
                        {textDiffResult.uniqueLinesB.map((line, idx) => (
                          <li key={idx} className="truncate">{line}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-zinc-500 text-[11px]">{isRo ? "Niciun rând complet diferit detectat." : "No distinct lines detected."}</p>
                    )}
                  </div>
                </div>

                {textDiffResult.commonKeywords.length > 0 && (
                  <div className="pt-2 border-t border-zinc-200 text-[11px] text-zinc-500">
                    <strong className="text-zinc-600">{isRo ? "Termeni-cheie prezenți în ambele texte: " : "Key terms present in both texts: "}</strong>
                    {textDiffResult.commonKeywords.join(", ")}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: SUGGESTED ADVISOR QUESTIONS */}
      {/* ======================================================== */}
      {activeTab === "questions" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-200 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                  {isRo ? "GHID DE NEGOCIERE & CLARIFICARE" : "NEGOTIATION & ADVISORY GUIDE"}
                </span>
                <h3 className="text-lg font-heading font-bold text-zinc-900">
                  {isRo ? "Întrebări Esențiale de Adresat Brokerului / Asiguratorului" : "Essential Questions for Your Insurance Advisor"}
                </h3>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleDownloadPdf}
                className="rounded-full border-zinc-200 hover:bg-zinc-800 text-zinc-600 text-xs h-10 px-4 flex items-center gap-1.5 shrink-0"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>{isRo ? "Descarcă Raport PDF" : "Download PDF Report"}</span>
              </Button>
            </div>

            <div className="space-y-3">
              {advisorQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 transition-all flex items-start justify-between gap-4 text-xs"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-zinc-800 leading-relaxed">{q}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyQuestion(q, idx)}
                    className="p-2 rounded-xl bg-zinc-800 text-zinc-500 hover:text-white transition-colors shrink-0"
                    title={isRo ? "Copiază întrebarea" : "Copy question"}
                  >
                    {copiedIndex === idx ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>

            {/* Direct CTA */}
            <div className="p-6 rounded-3xl bg-blue-600/10 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-bold text-zinc-900">
                  {isRo ? "Dorești o opinie independentă de la Cristian Văduva?" : "Want an independent expert review from Cristian Vaduva?"}
                </h4>
                <p className="text-xs text-zinc-500">
                  {isRo ? "Trimite polițele pentru un audit contractual complet și negociere profesionistă." : "Submit your policies for a comprehensive contractual audit and market quotes."}
                </p>
              </div>
              <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 px-6 shrink-0">
                <Link href="/verifica-polita">
                  {isRo ? "Auditează Polița Acum &rarr;" : "Audit Policy Now &rarr;"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRIVACY SAFEGUARD NOTICE */}
      <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-2 text-xs text-zinc-500">
        <div className="flex items-center gap-2 text-zinc-600 font-bold">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>{isRo ? "Confidențialitate Totală & Stocare Volatilă" : "Total Privacy & In-Memory Execution"}</span>
        </div>
        <p className="leading-relaxed">
          {isRo
            ? "Toate datele și textele introduse sunt procesate exclusiv în memoria browserului tău pe durata sesiunii active. Nu sunt transmise către servere externe, modele lingvistice terțe sau baze de date. Dacă reîncarci pagina fără a descărca raportul PDF, datele se resetează."
            : "All entered information is processed entirely in browser memory. No data is stored on remote servers or sent to third-party APIs. Download your PDF report before refreshing."}
        </p>
      </div>
    </div>
  );
}
