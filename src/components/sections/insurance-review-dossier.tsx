"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderOpen,
  CheckSquare,
  FileText,
  AlertCircle,
  HelpCircle,
  Download,
  Upload,
  Printer,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  Lock,
  Copy,
  Check,
  Building,
  Car,
  Heart,
  Briefcase,
  Gem,
  AlertTriangle,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ReviewPurposeId,
  REVIEW_PURPOSES,
  DocChecklistItem,
  DocItemStatus,
  ReviewDossierData,
  buildDossierItems,
  generateSuggestedQuestions,
  generateDossierPdf,
  validateImportedDossier,
} from "@/lib/dossier-checklist";
import Link from "next/link";

export function InsuranceReviewDossier() {
  const [lang, setLang] = useState<"ro" | "en">("ro");
  const isRo = lang === "ro";

  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selected Purposes
  const [selectedPurposes, setSelectedPurposes] = useState<ReviewPurposeId[]>([
    "existing_policy",
    "renewal",
  ]);

  // Dossier title & notes
  const [dossierTitle, setDossierTitle] = useState<string>("Dosar Personal de Asigurări 2026");
  const [userNotes, setUserNotes] = useState<string>("");

  // Items State
  const [items, setItems] = useState<DocChecklistItem[]>(() => buildDossierItems(["existing_policy", "renewal"]));

  // Advisor Questions State
  const [advisorQuestions, setAdvisorQuestions] = useState<string[]>(() =>
    generateSuggestedQuestions(["existing_policy", "renewal"], buildDossierItems(["existing_policy", "renewal"]), "ro")
  );
  const [newQuestionText, setNewQuestionText] = useState<string>("");

  // Confirmation & Feedback States
  const [copiedQuestionIdx, setCopiedQuestionIdx] = useState<number | null>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Toggle purpose
  const togglePurpose = (id: ReviewPurposeId) => {
    const nextPurposes = selectedPurposes.includes(id)
      ? selectedPurposes.length > 1
        ? selectedPurposes.filter((p) => p !== id)
        : selectedPurposes
      : [...selectedPurposes, id];
    setSelectedPurposes(nextPurposes);
    const defaultItems = buildDossierItems(nextPurposes);
    setItems(defaultItems);
    setAdvisorQuestions(generateSuggestedQuestions(nextPurposes, defaultItems, lang));
  };

  // Update item status
  const setItemStatus = (id: string, status: DocItemStatus) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, status } : it)));
  };

  // Add custom question
  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    setAdvisorQuestions([...advisorQuestions, newQuestionText.trim()]);
    setNewQuestionText("");
  };

  const handleRemoveQuestion = (idx: number) => {
    setAdvisorQuestions(advisorQuestions.filter((_, i) => i !== idx));
  };

  const handleCopyQuestion = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedQuestionIdx(idx);
    setTimeout(() => setCopiedQuestionIdx(null), 2000);
  };

  // Reset engine
  const handleReset = () => {
    setSelectedPurposes(["existing_policy", "renewal"]);
    setDossierTitle(isRo ? "Dosar Personal de Asigurări 2026" : "Insurance Review Dossier 2026");
    setUserNotes("");
    setCurrentStep(1);
  };

  // Current dossier object
  const currentDossier: ReviewDossierData = {
    title: dossierTitle.trim() || (isRo ? "Dosar Asigurare" : "Insurance Dossier"),
    purposes: selectedPurposes,
    lang,
    items,
    advisorQuestions,
    userNotes: userNotes.trim() || undefined,
    createdAt: new Date().toISOString(),
  };

  // PDF Export
  const handleDownloadPdf = () => {
    const doc = generateDossierPdf(currentDossier);
    doc.save(`dosar-asigurare-${Date.now()}.pdf`);
  };

  // JSON Export
  const handleExportJson = () => {
    const dataStr = JSON.stringify(currentDossier, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `backup-dosar-asigurare-${Date.now()}.json`;
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
      const res = validateImportedDossier(text);
      if (res.isValid && res.dossier) {
        setDossierTitle(res.dossier.title);
        setSelectedPurposes(res.dossier.purposes);
        setItems(res.dossier.items);
        setAdvisorQuestions(res.dossier.advisorQuestions);
        if (res.dossier.userNotes) setUserNotes(res.dossier.userNotes);
        setImportStatus(isRo ? "Dosar importat cu succes!" : "Dossier imported successfully!");
        setTimeout(() => setImportStatus(null), 3500);
      } else {
        setImportStatus(res.error || "Fișier JSON neconform.");
        setTimeout(() => setImportStatus(null), 3500);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Metrics
  const availableCount = items.filter((it) => it.status === "available").length;
  const toObtainCount = items.filter((it) => it.status === "to_obtain").length;
  const clarifyCount = items.filter((it) => it.status === "needs_clarification").length;

  return (
    <div className="w-full space-y-8 max-w-5xl mx-auto">
      {/* 1. TOP TOOLBAR & STEP SELECTOR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-zinc-900/80 border border-zinc-800">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 text-xs">
          {[
            { num: 1, labelRo: "1. Obiective Dosar", labelEn: "1. Review Scope" },
            { num: 2, labelRo: "2. Checklist Documente", labelEn: "2. Document Checklist" },
            { num: 3, labelRo: "3. Întrebări Broker", labelEn: "3. Advisor Questions" },
            { num: 4, labelRo: "4. Previzualizare & Export", labelEn: "4. Preview & Export" },
          ].map((s) => (
            <button
              key={s.num}
              type="button"
              onClick={() => setCurrentStep(s.num)}
              className={`px-3.5 py-1.5 rounded-xl font-medium transition-all shrink-0 ${
                currentStep === s.num
                  ? "bg-blue-600 text-white shadow-md font-bold"
                  : "bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {isRo ? s.labelRo : s.labelEn}
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
            title="Backup JSON"
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
            onClick={handleReset}
            className="text-zinc-500 hover:text-zinc-300 transition-colors p-2"
            title={isRo ? "Resetează" : "Reset"}
          >
            <RotateCcw className="w-3.5 h-3.5" />
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
      {/* STEP 1: PURPOSE SELECTION */}
      {/* ======================================================== */}
      {currentStep === 1 && (
        <div className="p-6 sm:p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-xl space-y-6">
          <div className="space-y-1 pb-4 border-b border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
              {isRo ? "PASUL 1 DIN 4: OBIECTIVUL DOSARULUI" : "STEP 1 OF 4: REVIEW SCOPE"}
            </span>
            <h3 className="text-xl font-heading font-bold text-white">
              {isRo ? "Pentru ce situație dorești să pregătești dosarul?" : "What is the primary purpose of your review dossier?"}
            </h3>
            <p className="text-xs text-zinc-400">
              {isRo
                ? "Selectează unul sau mai multe motive pentru a genera automat checklist-ul relevant de documente."
                : "Select one or more reasons to dynamically assemble a targeted document checklist."}
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5 text-xs max-w-md">
              <label className="text-zinc-300 font-medium">{isRo ? "Denumire Dosar (Opțional)" : "Dossier Title (Optional)"}</label>
              <Input
                value={dossierTitle}
                onChange={(e) => setDossierTitle(e.target.value)}
                className="h-10 bg-zinc-900 border-zinc-800 text-white rounded-xl text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {REVIEW_PURPOSES.map((p) => {
                const isSelected = selectedPurposes.includes(p.id);
                return (
                  <div
                    key={p.id}
                    onClick={() => togglePurpose(p.id)}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all space-y-2 ${
                      isSelected
                        ? "bg-blue-600/10 border-blue-500 shadow-lg"
                        : "bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-xs text-white">
                        {isRo ? p.titleRo : p.titleEn}
                      </span>
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center border text-[10px] ${
                          isSelected
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "border-zinc-700 bg-zinc-800 text-transparent"
                        }`}
                      >
                        ✓
                      </div>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {isRo ? p.descRo : p.descEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-zinc-800">
            <Button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 px-6 flex items-center gap-2"
            >
              <span>{isRo ? "Vezi Checklist-ul Documentelor" : "View Document Checklist"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 2: DOCUMENT CHECKLIST */}
      {/* ======================================================== */}
      {currentStep === 2 && (
        <div className="p-6 sm:p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                {isRo ? "PASUL 2 DIN 4: CHECKLIST DOCUMENTAR" : "STEP 2 OF 4: DOCUMENT CHECKLIST"}
              </span>
              <h3 className="text-xl font-heading font-bold text-white">
                {isRo ? "Bifează starea fiecărui document necesar" : "Mark the availability of each required document"}
              </h3>
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {availableCount} {isRo ? "Disponibile" : "Available"}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {toObtainCount} {isRo ? "De Obținut" : "To Obtain"}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {items.map((it) => (
              <div
                key={it.id}
                className="p-4 sm:p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <h4 className="text-sm font-heading font-bold text-white">
                      {isRo ? it.titleRo : it.titleEn}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {isRo ? it.descriptionRo : it.descriptionEn}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 shrink-0 text-xs">
                    <button
                      type="button"
                      onClick={() => setItemStatus(it.id, "available")}
                      className={`px-3 py-1.5 rounded-xl border font-medium transition-all ${
                        it.status === "available"
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                          : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
                      }`}
                    >
                      {isRo ? "✓ Am Documentul" : "✓ Available"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setItemStatus(it.id, "to_obtain")}
                      className={`px-3 py-1.5 rounded-xl border font-medium transition-all ${
                        it.status === "to_obtain"
                          ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                          : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
                      }`}
                    >
                      {isRo ? "⏳ De Obținut" : "⏳ To Obtain"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setItemStatus(it.id, "needs_clarification")}
                      className={`px-3 py-1.5 rounded-xl border font-medium transition-all ${
                        it.status === "needs_clarification"
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
                      }`}
                    >
                      {isRo ? "❓ Clarificare" : "❓ Clarify"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setItemStatus(it.id, "not_applicable")}
                      className={`px-3 py-1.5 rounded-xl border font-medium transition-all ${
                        it.status === "not_applicable"
                          ? "bg-zinc-800 text-zinc-200 border-zinc-700 shadow-sm"
                          : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-400"
                      }`}
                    >
                      {isRo ? "— N/A" : "— N/A"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-4 border-t border-zinc-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(1)}
              className="rounded-full border-zinc-800 text-zinc-300 text-xs h-11 px-5 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isRo ? "Înapoi la Obiective" : "Back to Scope"}</span>
            </Button>

            <Button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 px-6 flex items-center gap-2"
            >
              <span>{isRo ? "Organizează Întrebările" : "Organize Questions"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 3: ADVISOR QUESTION BUILDER */}
      {/* ======================================================== */}
      {currentStep === 3 && (
        <div className="p-6 sm:p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-xl space-y-6">
          <div className="space-y-1 pb-4 border-b border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
              {isRo ? "PASUL 3 DIN 4: ÎNTREBĂRI PENTRU BROKER" : "STEP 3 OF 4: ADVISOR QUESTIONS"}
            </span>
            <h3 className="text-xl font-heading font-bold text-white">
              {isRo ? "Ce dorești să clarifici la întâlnirea de consultanță?" : "What do you want to clarify during the advisory review?"}
            </h3>
            <p className="text-xs text-zinc-400">
              {isRo
                ? "Întrebările de mai jos au fost generate pe baza obiectivelor tale. Poți adăuga propriile întrebări sau șterge ce nu se aplică."
                : "Questions below are tailored to your dossier. You can add custom questions or remove items."}
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {advisorQuestions.map((q, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-start justify-between gap-3 text-zinc-200"
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
                    className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
                    title={isRo ? "Copiază" : "Copy"}
                  >
                    {copiedQuestionIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(idx)}
                    className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-rose-400"
                    title={isRo ? "Șterge" : "Delete"}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Add Custom Question */}
            <form onSubmit={handleAddQuestion} className="flex gap-2 pt-2">
              <Input
                placeholder={isRo ? "Scrie o întrebare personalizată..." : "Type your custom question..."}
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                className="h-10 bg-zinc-900 border-zinc-800 text-white rounded-xl text-xs flex-1"
              />
              <Button type="submit" className="rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs h-10 px-4">
                <Plus className="w-3.5 h-3.5 mr-1" />
                {isRo ? "Adaugă" : "Add"}
              </Button>
            </form>
          </div>

          <div className="flex justify-between pt-4 border-t border-zinc-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(2)}
              className="rounded-full border-zinc-800 text-zinc-300 text-xs h-11 px-5 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isRo ? "Înapoi la Checklist" : "Back to Checklist"}</span>
            </Button>

            <Button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 px-6 flex items-center gap-2"
            >
              <span>{isRo ? "Previzualizare & Export Raport" : "Preview & Export"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 4: PREVIEW & EXPORT */}
      {/* ======================================================== */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                  {isRo ? "PASUL 4 DIN 4: PREVIZUALIZARE DOSAR" : "STEP 4 OF 4: DOSSIER PREVIEW"}
                </span>
                <h3 className="text-xl font-heading font-bold text-white">
                  {currentDossier.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 px-5 flex items-center gap-1.5 shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>{isRo ? "Descarcă Dosar PDF" : "Download PDF Dossier"}</span>
                </Button>
              </div>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                <span className="text-zinc-500 font-semibold">{isRo ? "Documente Totale" : "Total Documents"}</span>
                <div className="text-2xl font-bold text-white">{items.length}</div>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 space-y-1">
                <span className="font-semibold">{isRo ? "Disponibile" : "Available"}</span>
                <div className="text-2xl font-bold">{availableCount}</div>
              </div>
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 space-y-1">
                <span className="font-semibold">{isRo ? "De Obținut" : "To Obtain"}</span>
                <div className="text-2xl font-bold">{toObtainCount}</div>
              </div>
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 space-y-1">
                <span className="font-semibold">{isRo ? "Întrebări Pregătite" : "Questions Ready"}</span>
                <div className="text-2xl font-bold">{advisorQuestions.length}</div>
              </div>
            </div>

            {/* OPTIONAL NOTES */}
            <div className="space-y-2 text-xs">
              <label className="text-zinc-300 font-medium">
                {isRo ? "Notițe Speciale pentru Raportul PDF (Opțional)" : "Special Notes for PDF Dossier (Optional)"}
              </label>
              <textarea
                rows={3}
                placeholder={isRo ? "Adaugă detalii non-sensibile despre proprietate, termene limită sau preferințe..." : "Add non-sensitive context regarding deadlines, asset details, or preferences..."}
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                className="w-full p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* ADVISORY CTA */}
            <div className="p-6 rounded-3xl bg-blue-600/10 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-bold text-white">
                  {isRo ? "Pregătit pentru auditul independent?" : "Ready for an independent policy review?"}
                </h4>
                <p className="text-xs text-zinc-400">
                  {isRo ? "Trimite polițele pentru o analiză detaliată a termenilor și negociere cu asiguratorii." : "Submit your contracts for a thorough terms analysis and market negotiation."}
                </p>
              </div>
              <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 px-6 shrink-0">
                <Link href="/verifica-polita">
                  {isRo ? "Trimite Solicitare Audit &rarr;" : "Submit Review Request &rarr;"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRIVACY SAFEGUARD NOTICE */}
      <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-2 text-xs text-zinc-400">
        <div className="flex items-center gap-2 text-zinc-300 font-bold">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>{isRo ? "Confidențialitate Totală & Stocare Volatilă" : "Total Privacy & In-Memory Execution"}</span>
        </div>
        <p className="leading-relaxed">
          {isRo
            ? "Toate datele din acest dosar sunt procesate exclusiv în memoria browserului tău pe durata sesiunii active. Nu sunt transmise automat pe servere sau baze de date. Descarcă fișierul PDF sau backup-ul JSON pentru păstrare."
            : "All dossier information is processed strictly in local browser memory. No data is sent to external servers or databases. Download your PDF or JSON backup for offline storage."}
        </p>
      </div>
    </div>
  );
}
