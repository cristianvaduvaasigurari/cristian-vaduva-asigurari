"use client";

import * as React from "react";
import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCheck,
  FileWarning,
  Plus,
  Trash2,
  Edit3,
  Copy,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Clock,
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
  FileText,
  Sparkles,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ClaimDocumentItem,
  ClaimCategory,
  DocCategory,
  RequirementSource,
  RequirementType,
  DocumentAvailability,
  ClaimEvidenceChecklistData,
  CLAIM_CATEGORY_LABELS,
  DOC_CATEGORY_LABELS,
  REQUIREMENT_SOURCE_LABELS,
  REQUIREMENT_TYPE_LABELS,
  AVAILABILITY_LABELS,
  STARTER_TEMPLATES_BY_CATEGORY,
  INITIAL_CLAIM_EVIDENCE_DATA,
  formatLocalDateRo,
  isDatePast,
  generateClaimEvidenceSummaryStats,
  validateImportedClaimEvidenceData,
  generateClaimEvidencePdf,
} from "@/lib/claim-evidence-checklist";
import Link from "next/link";

type TabView = "checklist" | "missing" | "guide";

export function ClaimEvidenceChecklist() {
  const [data, setData] = useState<ClaimEvidenceChecklistData>(INITIAL_CLAIM_EVIDENCE_DATA);
  const [activeTab, setActiveTab] = useState<TabView>("checklist");

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDocCategory, setFilterDocCategory] = useState<string>("all");
  const [filterAvailability, setFilterAvailability] = useState<string>("all");
  const [filterReqType, setFilterReqType] = useState<string>("all");

  // Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ClaimDocumentItem | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Summary statistics
  const stats = useMemo(() => generateClaimEvidenceSummaryStats(data.items), [data.items]);

  // Filtered Items
  const filteredItems = useMemo(() => {
    let result = [...data.items];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (it) =>
          it.title.toLowerCase().includes(q) ||
          (it.notes && it.notes.toLowerCase().includes(q)) ||
          (it.missingDetails && it.missingDetails.toLowerCase().includes(q)) ||
          (it.requirementSourceDetail && it.requirementSourceDetail.toLowerCase().includes(q))
      );
    }

    if (filterDocCategory !== "all") {
      result = result.filter((it) => it.docCategory === filterDocCategory);
    }

    if (filterAvailability !== "all") {
      result = result.filter((it) => it.availability === filterAvailability);
    }

    if (filterReqType !== "all") {
      result = result.filter((it) => it.requirementType === filterReqType);
    }

    return result;
  }, [data.items, searchQuery, filterDocCategory, filterAvailability, filterReqType]);

  // Missing / Urgent Items
  const missingItems = useMemo(() => {
    return data.items.filter(
      (it) =>
        it.availability === "missing_needed" ||
        it.availability === "in_progress" ||
        (it.followUpRequired && it.followUpTargetDate && isDatePast(it.followUpTargetDate))
    );
  }, [data.items]);

  // Update Metadata
  const updateClaimInfo = (field: keyof ClaimEvidenceChecklistData, val: string) => {
    setData((prev) => ({
      ...prev,
      [field]: val,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleCategoryChange = (newCat: ClaimCategory) => {
    setData((prev) => ({
      ...prev,
      claimCategory: newCat,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleLoadStarterTemplate = (category: ClaimCategory) => {
    const starter = STARTER_TEMPLATES_BY_CATEGORY[category] || STARTER_TEMPLATES_BY_CATEGORY.other;
    const newItems: ClaimDocumentItem[] = starter.map((tmpl, idx) => ({
      ...tmpl,
      id: `doc-${Date.now()}-${idx}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    setData((prev) => ({
      ...prev,
      claimCategory: category,
      items: newItems,
      updatedAt: new Date().toISOString(),
    }));
  };

  // Add / Edit handlers
  const openNewItemModal = () => {
    const newItem: ClaimDocumentItem = {
      id: `doc-${Date.now()}`,
      title: "",
      docCategory: "identification_policy",
      requirementSource: "insurer_request",
      requirementType: "mandatory_per_source",
      availability: "in_progress",
      hasInsurerReceiptConfirmation: false,
      followUpRequired: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setEditingItem(newItem);
    setIsEditModalOpen(true);
  };

  const handleSaveItem = (itemToSave: ClaimDocumentItem) => {
    setData((prev) => {
      const exists = prev.items.some((it) => it.id === itemToSave.id);
      const updatedItems = exists
        ? prev.items.map((it) => (it.id === itemToSave.id ? { ...itemToSave, updatedAt: new Date().toISOString() } : it))
        : [...prev.items, { ...itemToSave, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }];

      return {
        ...prev,
        items: updatedItems,
        updatedAt: new Date().toISOString(),
      };
    });
    setIsEditModalOpen(false);
    setEditingItem(null);
  };

  const handleQuickAvailabilityToggle = (id: string, newAvail: DocumentAvailability) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.map((it) =>
        it.id === id
          ? {
              ...it,
              availability: newAvail,
              dateSubmitted: newAvail === "obtained_and_submitted" && !it.dateSubmitted ? new Date().toISOString().split("T")[0] : it.dateSubmitted,
              updatedAt: new Date().toISOString(),
            }
          : it
      ),
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleDuplicateItem = (item: ClaimDocumentItem) => {
    const dup: ClaimDocumentItem = {
      ...item,
      id: `doc-dup-${Date.now()}`,
      title: `${item.title} (Copie)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setData((prev) => ({
      ...prev,
      items: [...prev.items, dup],
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleDeleteItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.filter((it) => it.id !== id),
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
    const cleanRef = (data.claimReference || "dosar-dauna").toLowerCase().replace(/[^a-z0-9]/g, "-");
    link.download = `backup-documente-dauna-${cleanRef}-${new Date().toISOString().split("T")[0]}.json`;
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
      const validation = validateImportedClaimEvidenceData(content);
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
      claimReference: "DOSAR-DAUNA-NOU",
      claimNickname: "Dosar Daună Nou",
      claimCategory: "auto_casco",
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setIsResetConfirmOpen(false);
  };

  return (
    <div className="w-full space-y-8">
      {/* Header Info Box */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 sm:p-6 backdrop-blur-sm shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-900 tracking-tight flex items-center gap-2">
                {data.claimNickname || "Dosar Daună"}
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-500 font-mono">
                  {data.claimReference}
                </span>
              </h2>
              <p className="text-xs text-zinc-500">
                Borderou verificare documente & dovadă probatorie | Stocare 100% în browser (volatilă)
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => generateClaimEvidencePdf(data)}
              className="bg-zinc-800/60 border-zinc-300 hover:bg-zinc-700 text-zinc-800 text-xs h-9 gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              Descarcă PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportJson}
              className="bg-zinc-800/60 border-zinc-300 hover:bg-zinc-700 text-zinc-800 text-xs h-9 gap-1.5"
            >
              <Upload className="w-3.5 h-3.5 text-zinc-500" />
              Export Backup JSON
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="bg-zinc-800/60 border-zinc-300 hover:bg-zinc-700 text-zinc-800 text-xs h-9 gap-1.5"
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
              className="bg-zinc-800/60 border-zinc-300 hover:bg-rose-950/40 hover:border-rose-800 text-zinc-500 hover:text-rose-800 text-xs h-9"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Error Alert */}
        {importError && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>{importError}</span>
            </div>
            <button onClick={() => setImportError(null)} className="text-zinc-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Metadata Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">
              Denumire / Nickname Dosar
            </label>
            <Input
              value={data.claimNickname}
              onChange={(e) => updateClaimInfo("claimNickname", e.target.value)}
              placeholder="Ex: Daună CASCO Parcare, Inundație Baie"
              className="bg-zinc-50 border-zinc-200 text-zinc-900 text-xs h-8"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">
              Categorie Daună
            </label>
            <select
              value={data.claimCategory}
              onChange={(e) => handleCategoryChange(e.target.value as ClaimCategory)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-md text-zinc-800 text-xs h-8 px-2"
            >
              {Object.entries(CLAIM_CATEGORY_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.ro}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">
              Companie de Asigurare
            </label>
            <Input
              value={data.insurerName || ""}
              onChange={(e) => updateClaimInfo("insurerName", e.target.value)}
              placeholder="Ex: Allianz, Omniasig, Groupama"
              className="bg-zinc-50 border-zinc-200 text-zinc-900 text-xs h-8"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">
              Număr Dosar Asigurător
            </label>
            <Input
              value={data.claimFileNumber || ""}
              onChange={(e) => updateClaimInfo("claimFileNumber", e.target.value)}
              placeholder="Ex: DOS-2026-987654"
              className="bg-zinc-50 border-zinc-200 text-zinc-900 text-xs h-8"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">
              Dată Eveniment (YYYY-MM-DD)
            </label>
            <Input
              type="date"
              value={data.incidentDate || ""}
              onChange={(e) => updateClaimInfo("incidentDate", e.target.value)}
              className="bg-zinc-50 border-zinc-200 text-zinc-900 text-xs h-8"
            />
          </div>
        </div>
      </div>

      {/* KPI Dashboard Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-zinc-200/80 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500 text-xs">
            <span>Completitudine</span>
            <Sparkles className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-blue-400 tracking-tight">
            {stats.completenessPercent}%
          </div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500 text-xs">
            <span>Disponibile</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-400 tracking-tight">
            {stats.availableCount}
          </div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500 text-xs">
            <span>Transmise Asigurător</span>
            <FileCheck2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-cyan-400 tracking-tight">
            {stats.submittedCount}
          </div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500 text-xs">
            <span>În Curs de Obținere</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-blue-400 tracking-tight">
            {stats.inProgressCount}
          </div>
        </div>

        <div
          className={`border rounded-xl p-3.5 flex flex-col justify-between ${
            stats.missingNeededCount > 0
              ? "bg-rose-500/10 border-rose-500/30"
              : "bg-white border-zinc-200/80"
          }`}
        >
          <div className="flex items-center justify-between text-zinc-500 text-xs">
            <span>Lipsă / Necesar</span>
            <AlertTriangle
              className={`w-4 h-4 ${
                stats.missingNeededCount > 0 ? "text-rose-400" : "text-zinc-500"
              }`}
            />
          </div>
          <div
            className={`mt-2 text-2xl font-bold tracking-tight ${
              stats.missingNeededCount > 0 ? "text-rose-400" : "text-zinc-500"
            }`}
          >
            {stats.missingNeededCount}
          </div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500 text-xs">
            <span>Confirmări Primire</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-400 tracking-tight">
            {stats.confirmedReceiptCount}
          </div>
        </div>
      </div>

      {/* Starter Templates Bar */}
      <div className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Șablon Recomandat pentru Categoria Curentă
          </span>
          <p className="text-[11px] text-zinc-500">
            Încarcă documentele uzual solicitate pentru{" "}
            <strong className="text-zinc-800">
              {CLAIM_CATEGORY_LABELS[data.claimCategory]?.ro}
            </strong>
            .
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => handleLoadStarterTemplate(data.claimCategory)}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-800 text-xs h-8 gap-1.5 border border-zinc-300"
          >
            <RotateCcw className="w-3 h-3 text-blue-400" />
            Încarcă Șablonul ({CLAIM_CATEGORY_LABELS[data.claimCategory]?.ro})
          </Button>
          <Button
            size="sm"
            onClick={openNewItemModal}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs h-8 gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Adaugă Document Personalizat
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200/80 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("checklist")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === "checklist"
              ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
              : "text-zinc-500 hover:text-white hover:bg-zinc-800/50"
          }`}
        >
          <FileCheck className="w-4 h-4" />
          Checklist Documente ({filteredItems.length})
        </button>
        <button
          onClick={() => setActiveTab("missing")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === "missing"
              ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
              : "text-zinc-500 hover:text-white hover:bg-zinc-800/50"
          }`}
        >
          <FileWarning className="w-4 h-4" />
          Documente Lipsă & În Curs ({missingItems.length})
          {stats.missingNeededCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-rose-500" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("guide")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === "guide"
              ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
              : "text-zinc-500 hover:text-white hover:bg-zinc-800/50"
          }`}
        >
          <Info className="w-4 h-4" />
          Ghid Probațiune Daune
        </button>
      </div>

      {/* TAB 1: CHECKLIST */}
      {activeTab === "checklist" && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-white border border-zinc-200 p-4 rounded-2xl space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Caută document după titlu, sursă, observații..."
                className="pl-9 bg-zinc-50 border-zinc-200 text-xs h-9 text-zinc-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
              <select
                value={filterDocCategory}
                onChange={(e) => setFilterDocCategory(e.target.value)}
                className="bg-zinc-50 border border-zinc-200 rounded-lg h-8 px-2 text-zinc-600"
              >
                <option value="all">Toate Categoriile de Documente</option>
                {Object.entries(DOC_CATEGORY_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.ro}
                  </option>
                ))}
              </select>

              <select
                value={filterAvailability}
                onChange={(e) => setFilterAvailability(e.target.value)}
                className="bg-zinc-50 border border-zinc-200 rounded-lg h-8 px-2 text-zinc-600"
              >
                <option value="all">Toate Disponibilitățile</option>
                {Object.entries(AVAILABILITY_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.ro}
                  </option>
                ))}
              </select>

              <select
                value={filterReqType}
                onChange={(e) => setFilterReqType(e.target.value)}
                className="bg-zinc-50 border border-zinc-200 rounded-lg h-8 px-2 text-zinc-600"
              >
                <option value="all">Toate Tipurile de Cerință</option>
                {Object.entries(REQUIREMENT_TYPE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.ro}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Document Cards */}
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 border border-zinc-200 rounded-xl">
              Niciun document nu corespunde filtrelor selectate.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredItems.map((item, index) => {
                const docCatInfo = DOC_CATEGORY_LABELS[item.docCategory] || DOC_CATEGORY_LABELS.other;
                const reqTypeInfo = REQUIREMENT_TYPE_LABELS[item.requirementType] || REQUIREMENT_TYPE_LABELS.suggested_preparation;
                const availInfo = AVAILABILITY_LABELS[item.availability] || AVAILABILITY_LABELS.in_progress;
                const reqSourceInfo = REQUIREMENT_SOURCE_LABELS[item.requirementSource] || REQUIREMENT_SOURCE_LABELS.user_preparation;

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-white border border-zinc-200 hover:border-zinc-300 transition-colors space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono font-bold text-zinc-500">
                            #{index + 1}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${availInfo.badgeClass}`}
                          >
                            {availInfo.ro}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${reqTypeInfo.badgeClass}`}
                          >
                            {reqTypeInfo.ro}
                          </span>
                          <span className="text-[11px] text-zinc-500">
                            [{docCatInfo.ro}]
                          </span>
                        </div>

                        <h4 className="text-sm font-semibold text-zinc-900 pt-0.5">
                          {item.title}
                        </h4>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 pt-1">
                          <span>
                            Sursă:{" "}
                            <strong className="text-zinc-600">{reqSourceInfo.ro}</strong>
                            {item.requirementSourceDetail && (
                              <span className="text-zinc-500"> ({item.requirementSourceDetail})</span>
                            )}
                          </span>

                          {item.dateSubmitted && (
                            <span className="text-cyan-400">
                              Transmis: {formatLocalDateRo(item.dateSubmitted)}
                            </span>
                          )}

                          <span>
                            Confirmare primire:{" "}
                            {item.hasInsurerReceiptConfirmation ? (
                              <strong className="text-emerald-400">Înregistrată</strong>
                            ) : (
                              <span className="text-zinc-500">Neconfirmată</span>
                            )}
                          </span>

                          {item.followUpRequired && item.followUpTargetDate && (
                            <span className="text-amber-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Follow-up: {formatLocalDateRo(item.followUpTargetDate)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1 shrink-0 self-end sm:self-start">
                        {item.availability !== "obtained_and_submitted" ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleQuickAvailabilityToggle(item.id, "obtained_and_submitted")
                            }
                            className="h-8 px-2 text-xs gap-1 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                            title="Marchează ca transmis"
                          >
                            <FileCheck2 className="w-3.5 h-3.5" />
                            <span>Transmite</span>
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleQuickAvailabilityToggle(item.id, "available")
                            }
                            className="h-8 px-2 text-xs gap-1 text-zinc-500 hover:text-white"
                            title="Re-deschide"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </Button>
                        )}

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingItem(item);
                            setIsEditModalOpen(true);
                          }}
                          className="h-8 w-8 text-zinc-500 hover:text-white"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDuplicateItem(item)}
                          className="h-8 w-8 text-zinc-500 hover:text-white"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteCandidateId(item.id)}
                          className="h-8 w-8 text-zinc-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>

                    {item.notes && (
                      <p className="text-xs text-zinc-600 bg-zinc-50/50 p-2.5 rounded-lg border border-zinc-200/60 leading-relaxed">
                        {item.notes}
                      </p>
                    )}

                    {item.missingDetails && (
                      <div className="text-[11px] text-rose-800 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>Clarificare lipsă: {item.missingDetails}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MISSING & ACTION ITEMS */}
      {activeTab === "missing" && (
        <div className="space-y-4">
          <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl text-xs text-zinc-600">
            <h4 className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <FileWarning className="w-4 h-4 text-amber-400" />
              Documente Lipsă, Solicitate Suplimentar sau cu Scadență
            </h4>
            <p className="text-zinc-500 leading-relaxed">
              Această listă reunește toate documentele care necesită acțiune din partea asiguratului înainte ca asigurătorul să poată finaliza evaluarea dosarului.
            </p>
          </div>

          {missingItems.length === 0 ? (
            <div className="p-8 text-center text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 rounded-xl text-xs font-medium">
              Felicitări! Toate documentele aplicabile au fost consemnate ca fiind disponibile sau deja transmise.
            </div>
          ) : (
            <div className="space-y-3">
              {missingItems.map((item) => {
                const isOverdue =
                  item.followUpRequired &&
                  item.followUpTargetDate &&
                  isDatePast(item.followUpTargetDate);

                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isOverdue
                        ? "bg-rose-950/20 border-rose-800/60 text-rose-800"
                        : "bg-white border-zinc-200"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {isOverdue && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-800 border border-rose-500/30 font-bold uppercase">
                            Termen depășit
                          </span>
                        )}
                        <span className="text-xs font-bold text-zinc-900">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-zinc-500">
                          ({AVAILABILITY_LABELS[item.availability]?.ro})
                        </span>
                      </div>

                      {item.missingDetails && (
                        <p className="text-xs text-amber-800">
                          De completat: {item.missingDetails}
                        </p>
                      )}

                      {item.followUpTargetDate && (
                        <p className="text-xs text-zinc-500">
                          Data limită țintă: {formatLocalDateRo(item.followUpTargetDate)}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <Button
                        size="sm"
                        onClick={() =>
                          handleQuickAvailabilityToggle(item.id, "available")
                        }
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs h-8 gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Marchează Disponibil</span>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: GUIDE */}
      {activeTab === "guide" && (
        <div className="bg-white/70 border border-zinc-200 rounded-2xl p-6 space-y-6 text-sm text-zinc-600">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 mb-2">
              Ghid Metodologic: Întocmirea și Probațiunea Dosarului de Daună
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Completitudinea documentară este factorul cheie care determină viteza de lichidare și aprobare a unei despăgubiri. Asigurătorii au obligația legală de a analiza cererile în termene stabilite, însă termenul curge doar din momentul în care dosarul conține toate probele esențiale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                1. Regula Probațiunii Scrise
              </h4>
              <ul className="text-xs text-zinc-500 space-y-1.5 list-disc list-inside">
                <li>Solicitați întotdeauna număr de înregistrare sau confirmare scrisă de primire pe email pentru orice act depus.</li>
                <li>Păstrați copiile devizelor și ale proceselor verbale de constatare semnate de inspector.</li>
                <li>Verificați ca procesul verbal să consemneze toate piesele avariate, inclusiv cele cu avarii ascunse (cu mențiunea „se va demonta pentru reverificare”).</li>
              </ul>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                2. Limite & Precizări
              </h4>
              <ul className="text-xs text-zinc-500 space-y-1.5 list-disc list-inside">
                <li>Acest checklist este un instrument de organizare internă și nu substituie cerințele contractuale exprese ale asigurătorului.</li>
                <li>Nu trimiteți documente originale decât dacă este expres solicitat prin condițiile de asigurare.</li>
                <li>Nicio bifare pe această pagină nu garantează plata despăgubirii sau acceptarea cererii de daună.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* EDIT / ADD MODAL */}
      <AnimatePresence>
        {isEditModalOpen && editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-zinc-200 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  {editingItem.title ? "Editare Document Daună" : "Adăugare Document Nou"}
                </h3>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-zinc-500 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-600 font-medium mb-1">
                    Denumire Document *
                  </label>
                  <Input
                    value={editingItem.title}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, title: e.target.value })
                    }
                    placeholder="Ex: Deviz Estimativ Service, Factură Piesă Schimb"
                    className="bg-zinc-50 border-zinc-200 text-zinc-900 text-xs h-9"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">
                      Categorie Document
                    </label>
                    <select
                      value={editingItem.docCategory}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          docCategory: e.target.value as DocCategory,
                        })
                      }
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg h-9 px-2 text-zinc-800"
                    >
                      {Object.entries(DOC_CATEGORY_LABELS).map(([k, v]) => (
                        <option key={k} value={k}>
                          {v.ro}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">
                      Disponibilitate Curentă
                    </label>
                    <select
                      value={editingItem.availability}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          availability: e.target.value as DocumentAvailability,
                        })
                      }
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg h-9 px-2 text-zinc-800"
                    >
                      {Object.entries(AVAILABILITY_LABELS).map(([k, v]) => (
                        <option key={k} value={k}>
                          {v.ro}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">
                      Sursă Cerință
                    </label>
                    <select
                      value={editingItem.requirementSource}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          requirementSource: e.target.value as RequirementSource,
                        })
                      }
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg h-9 px-2 text-zinc-800"
                    >
                      {Object.entries(REQUIREMENT_SOURCE_LABELS).map(([k, v]) => (
                        <option key={k} value={k}>
                          {v.ro}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">
                      Tip Obligativitate
                    </label>
                    <select
                      value={editingItem.requirementType}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          requirementType: e.target.value as RequirementType,
                        })
                      }
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg h-9 px-2 text-zinc-800"
                    >
                      {Object.entries(REQUIREMENT_TYPE_LABELS).map(([k, v]) => (
                        <option key={k} value={k}>
                          {v.ro}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-600 font-medium mb-1">
                    Detaliu Referință Sursă (Opțional)
                  </label>
                  <Input
                    value={editingItem.requirementSourceDetail || ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        requirementSourceDetail: e.target.value,
                      })
                    }
                    placeholder="Ex: Cerere email inspector din 05.10, Condiții Art. 8.2"
                    className="bg-zinc-50 border-zinc-200 text-zinc-900 text-xs h-8"
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">
                      Dată Solicitat
                    </label>
                    <Input
                      type="date"
                      value={editingItem.dateRequested || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          dateRequested: e.target.value,
                        })
                      }
                      className="bg-zinc-50 border-zinc-200 text-zinc-900 text-xs h-8"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">
                      Dată Obținut
                    </label>
                    <Input
                      type="date"
                      value={editingItem.dateObtained || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          dateObtained: e.target.value,
                        })
                      }
                      className="bg-zinc-50 border-zinc-200 text-zinc-900 text-xs h-8"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">
                      Dată Transmis Asigurător
                    </label>
                    <Input
                      type="date"
                      value={editingItem.dateSubmitted || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          dateSubmitted: e.target.value,
                        })
                      }
                      className="bg-zinc-50 border-zinc-200 text-zinc-900 text-xs h-8"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="hasInsurerReceiptConfirmation"
                    checked={editingItem.hasInsurerReceiptConfirmation}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        hasInsurerReceiptConfirmation: e.target.checked,
                      })
                    }
                    className="rounded border-zinc-300 bg-white text-blue-600 focus:ring-0"
                  />
                  <label
                    htmlFor="hasInsurerReceiptConfirmation"
                    className="text-zinc-600 text-xs cursor-pointer select-none"
                  >
                    Există confirmare scrisă de primire de la asigurător / număr de înregistrare
                  </label>
                </div>

                {/* Follow-up */}
                <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="followUpRequiredChecklist"
                      checked={editingItem.followUpRequired}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          followUpRequired: e.target.checked,
                        })
                      }
                      className="rounded border-zinc-300 bg-white text-blue-600 focus:ring-0"
                    />
                    <label
                      htmlFor="followUpRequiredChecklist"
                      className="text-zinc-600 font-medium text-xs cursor-pointer select-none"
                    >
                      Urmărire / Follow-up activ
                    </label>
                  </div>

                  {editingItem.followUpRequired && (
                    <div>
                      <label className="block text-zinc-500 mb-1">
                        Dată Limită Follow-up
                      </label>
                      <Input
                        type="date"
                        value={editingItem.followUpTargetDate || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            followUpTargetDate: e.target.value,
                          })
                        }
                        className="bg-white border-zinc-200 text-zinc-900 text-xs h-8"
                      />
                    </div>
                  )}
                </div>

                {/* Missing Details */}
                <div>
                  <label className="block text-zinc-600 font-medium mb-1">
                    Ce detalii lipsesc sau trebuie clarificate? (Opțional)
                  </label>
                  <Input
                    value={editingItem.missingDetails || ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        missingDetails: e.target.value,
                      })
                    }
                    placeholder="Ex: Lipsește ștampila service-ului, devizul nu conține codurile de piesă"
                    className="bg-zinc-50 border-zinc-200 text-zinc-900 text-xs h-8"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-zinc-600 font-medium mb-1">
                    Observații Suplimentare
                  </label>
                  <textarea
                    rows={2}
                    value={editingItem.notes || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, notes: e.target.value })
                    }
                    placeholder="Note interne despre acest document..."
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-zinc-900 text-xs focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-zinc-200 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-zinc-800 border-zinc-300 text-zinc-600 text-xs h-9"
                >
                  Anulează
                </Button>
                <Button
                  size="sm"
                  disabled={!editingItem.title.trim()}
                  onClick={() => handleSaveItem(editingItem)}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs h-9"
                >
                  Salvează Document
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RESET CONFIRM MODAL */}
      <AnimatePresence>
        {isResetConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-zinc-200 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center gap-3 text-rose-400">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="text-base font-bold text-zinc-900">Resetare Spațiu Lucru</h3>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Datele există exclusiv în memoria locală a browserului. Dacă resetați fără a exporta un fișier JSON de backup sau raportul PDF, toate documentele consemnate se vor pierde.
              </p>
              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsResetConfirmOpen(false)}
                  className="bg-zinc-800 border-zinc-300 text-zinc-600 text-xs h-9"
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

      {/* DELETE CANDIDATE MODAL */}
      <AnimatePresence>
        {deleteCandidateId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-zinc-200 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center gap-3 text-rose-400">
                <Trash2 className="w-5 h-5" />
                <h3 className="text-base font-bold text-zinc-900">Ștergere Document</h3>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Sunteți sigur că doriți să ștergeți acest document din borderou?
              </p>
              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeleteCandidateId(null)}
                  className="bg-zinc-800 border-zinc-300 text-zinc-600 text-xs h-8"
                >
                  Anulează
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDeleteItem(deleteCandidateId)}
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
