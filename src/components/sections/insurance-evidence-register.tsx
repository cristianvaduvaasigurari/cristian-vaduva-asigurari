"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCheck,
  Plus,
  Trash2,
  Edit3,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Link as LinkIcon,
  Unlink,
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  EvidenceSource,
  EvidenceStatement,
  SourceType,
  VerificationStatus,
  StatementStatus,
  SOURCE_TYPE_INFO,
  VERIFICATION_STATUS_INFO,
  STATEMENT_STATUS_INFO,
  getFollowUpStatus,
  generateEvidenceSummaryStats,
  generateEvidenceRegisterPdf,
  validateImportedEvidenceRegister,
  EvidenceRegisterData,
} from "@/lib/insurance-evidence-register";
import Link from "next/link";

const INITIAL_DEMO_SOURCES: EvidenceSource[] = [
  {
    id: "src_1",
    title: "Condiții Generale CASCO Ediția 2026",
    sourceType: "policy_wording",
    authorOrOrganization: "Omniasig VIG",
    dateOfDocument: "2026-01-15",
    dateReceived: "2026-03-01",
    relatedPolicyNickname: "CASCO Autoturism Principal",
    relatedCategory: "CASCO",
    referenceOrSection: "Cap. IV, Art. 12.3 (Avarii provocate de fenomene meteo)",
    summary: "Include grindină și căderi de corpuri fără franșiză suplimentară dacă mașina era parcată regulamentar.",
    verificationStatus: "passage_reviewed",
    followUpDate: undefined,
    notes: "Consultat în format PDF oficial descărcat de pe portalul asiguratorului.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "src_2",
    title: "Email Clarificare Inundare Conducte Locuință",
    sourceType: "insurer_communication",
    authorOrOrganization: "Allianz-Țiriac (Departament Subscriere)",
    dateOfDocument: "2026-02-18",
    dateReceived: "2026-02-18",
    relatedPolicyNickname: "Asigurare Locuință & PAD",
    relatedCategory: "Locuință",
    referenceOrSection: "Email ref: CLAR-883492",
    summary: "Asiguratorul a confirmat în scris că daunele prin refularea canalizării municipale sunt acoperite în limita a 15.000 EUR.",
    verificationStatus: "clarification_received",
    followUpDate: undefined,
    notes: "Adresă salvată în dosarul electronic de poliță.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "src_3",
    title: "Ofertă Reînnoire RCA & Decontare Directă 2026",
    sourceType: "renewal_offer",
    authorOrOrganization: "Generali Broker Portal",
    dateOfDocument: "2026-02-25",
    dateReceived: "2026-02-26",
    relatedPolicyNickname: "RCA Autoturism",
    relatedCategory: "RCA",
    referenceOrSection: "Pagină unică ofertă",
    summary: "Cotat 1.250 RON cu clauză decontare directă inclusă.",
    verificationStatus: "source_recorded_unverified",
    followUpDate: "2026-10-15",
    notes: "Urmează să confirm dacă prețul include reducerea de bonus-malus maxim.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const INITIAL_DEMO_STATEMENTS: EvidenceStatement[] = [
  {
    id: "stmt_1",
    statement: "Daunele cauzate de grindină nu au franșiză separată la CASCO dacă autoturismul este parcat.",
    category: "CASCO",
    relatedPolicyNickname: "CASCO Autoturism Principal",
    sourceIds: ["src_1"],
    sourceReference: "Art. 12.3",
    statementStatus: "passage_reviewed",
    dateRecorded: "2026-03-02",
    notes: "Verificat în textul condițiilor.",
    conflictNote: undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "stmt_2",
    statement: "Refularea canalizării este acoperită până la 15.000 EUR.",
    category: "Locuință",
    relatedPolicyNickname: "Asigurare Locuință & PAD",
    sourceIds: ["src_2"],
    sourceReference: "Email subscriere",
    statementStatus: "clarified_in_writing",
    dateRecorded: "2026-02-19",
    notes: "Avem confirmare expresă de la subscriitor.",
    conflictNote: undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "stmt_3",
    statement: "Panourile fotovoltaice instalate pe acoperiș sunt acoperite automat în limita valorii clădirii.",
    category: "Locuință",
    relatedPolicyNickname: "Asigurare Locuință & PAD",
    sourceIds: [],
    sourceReference: undefined,
    statementStatus: "requires_clarification",
    dateRecorded: "2026-03-05",
    notes: "Nu am găsit mențiune specifică în poliță, trebuie solicitată anexă suplimentară.",
    conflictNote: "Agentul verbal a spus că sunt acoperite, dar contractul exclude instalațiile exterioare nespecificate în raport.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function InsuranceEvidenceRegister() {
  const [sources, setSources] = useState<EvidenceSource[]>(INITIAL_DEMO_SOURCES);
  const [statements, setStatements] = useState<EvidenceStatement[]>(INITIAL_DEMO_STATEMENTS);
  const [activeTab, setActiveTab] = useState<"sources" | "statements" | "matrix" | "queue" | "report">("sources");

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSourceType, setFilterSourceType] = useState<string>("all");
  const [filterVerifStatus, setFilterVerifStatus] = useState<string>("all");
  const [filterStatementStatus, setFilterStatementStatus] = useState<string>("all");

  // Modals & form states
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [editingSource, setEditingSource] = useState<EvidenceSource | null>(null);
  const [sourceFormData, setSourceFormData] = useState<Partial<EvidenceSource>>({
    sourceType: "policy_wording",
    verificationStatus: "user_entered_unverified",
  });

  const [isStatementModalOpen, setIsStatementModalOpen] = useState(false);
  const [editingStatement, setEditingStatement] = useState<EvidenceStatement | null>(null);
  const [statementFormData, setStatementFormData] = useState<Partial<EvidenceStatement>>({
    statementStatus: "user_assertion",
    sourceIds: [],
  });

  const [itemToDelete, setItemToDelete] = useState<{ type: "source"; item: EvidenceSource } | { type: "statement"; item: EvidenceStatement } | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [userNotes, setUserNotes] = useState("");
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);

  const stats = useMemo(() => generateEvidenceSummaryStats(sources, statements), [sources, statements]);

  // Filtered Sources
  const filteredSources = useMemo(() => {
    return sources.filter((s) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = s.title.toLowerCase().includes(q);
        const matchOrg = s.authorOrOrganization?.toLowerCase().includes(q);
        const matchSumm = s.summary?.toLowerCase().includes(q);
        const matchNick = s.relatedPolicyNickname?.toLowerCase().includes(q);
        if (!matchTitle && !matchOrg && !matchSumm && !matchNick) return false;
      }
      if (filterSourceType !== "all" && s.sourceType !== filterSourceType) return false;
      if (filterVerifStatus !== "all" && s.verificationStatus !== filterVerifStatus) return false;
      return true;
    });
  }, [sources, searchQuery, filterSourceType, filterVerifStatus]);

  // Filtered Statements
  const filteredStatements = useMemo(() => {
    return statements.filter((st) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchText = st.statement.toLowerCase().includes(q);
        const matchCat = st.category?.toLowerCase().includes(q);
        const matchNick = st.relatedPolicyNickname?.toLowerCase().includes(q);
        const matchNotes = st.notes?.toLowerCase().includes(q);
        if (!matchText && !matchCat && !matchNick && !matchNotes) return false;
      }
      if (filterStatementStatus !== "all" && st.statementStatus !== filterStatementStatus) return false;
      return true;
    });
  }, [statements, searchQuery, filterStatementStatus]);

  // Handlers for Sources
  const handleOpenAddSource = () => {
    setSourceFormData({
      title: "",
      sourceType: "policy_wording",
      verificationStatus: "user_entered_unverified",
    });
    setEditingSource(null);
    setIsSourceModalOpen(true);
  };

  const handleOpenEditSource = (src: EvidenceSource) => {
    setSourceFormData({ ...src });
    setEditingSource(src);
    setIsSourceModalOpen(true);
  };

  const handleSaveSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceFormData.title || !sourceFormData.title.trim()) return;

    const now = new Date().toISOString();

    if (editingSource) {
      setSources((prev) =>
        prev.map((s) =>
          s.id === editingSource.id
            ? ({
                ...s,
                ...sourceFormData,
                title: sourceFormData.title!.trim(),
                updatedAt: now,
              } as EvidenceSource)
            : s
        )
      );
    } else {
      const newSource: EvidenceSource = {
        id: `src_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        title: sourceFormData.title.trim(),
        sourceType: sourceFormData.sourceType || "other",
        authorOrOrganization: sourceFormData.authorOrOrganization?.trim() || undefined,
        dateOfDocument: sourceFormData.dateOfDocument || undefined,
        dateReceived: sourceFormData.dateReceived || undefined,
        relatedPolicyNickname: sourceFormData.relatedPolicyNickname?.trim() || undefined,
        relatedCategory: sourceFormData.relatedCategory?.trim() || undefined,
        referenceOrSection: sourceFormData.referenceOrSection?.trim() || undefined,
        summary: sourceFormData.summary?.trim() || undefined,
        verificationStatus: sourceFormData.verificationStatus || "user_entered_unverified",
        followUpDate: sourceFormData.followUpDate || undefined,
        notes: sourceFormData.notes?.trim() || undefined,
        createdAt: now,
        updatedAt: now,
      };
      setSources((prev) => [newSource, ...prev]);
    }

    setIsSourceModalOpen(false);
    setEditingSource(null);
  };

  // Handlers for Statements
  const handleOpenAddStatement = () => {
    setStatementFormData({
      statement: "",
      statementStatus: "user_assertion",
      sourceIds: [],
    });
    setEditingStatement(null);
    setIsStatementModalOpen(true);
  };

  const handleOpenEditStatement = (st: EvidenceStatement) => {
    setStatementFormData({ ...st });
    setEditingStatement(st);
    setIsStatementModalOpen(true);
  };

  const handleSaveStatement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statementFormData.statement || !statementFormData.statement.trim()) return;

    const now = new Date().toISOString();

    if (editingStatement) {
      setStatements((prev) =>
        prev.map((st) =>
          st.id === editingStatement.id
            ? ({
                ...st,
                ...statementFormData,
                statement: statementFormData.statement!.trim(),
                updatedAt: now,
              } as EvidenceStatement)
            : st
        )
      );
    } else {
      const newStatement: EvidenceStatement = {
        id: `stmt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        statement: statementFormData.statement.trim(),
        category: statementFormData.category?.trim() || undefined,
        relatedPolicyNickname: statementFormData.relatedPolicyNickname?.trim() || undefined,
        sourceIds: statementFormData.sourceIds || [],
        sourceReference: statementFormData.sourceReference?.trim() || undefined,
        statementStatus: statementFormData.statementStatus || "user_assertion",
        dateRecorded: statementFormData.dateRecorded || new Date().toISOString().split("T")[0],
        notes: statementFormData.notes?.trim() || undefined,
        conflictNote: statementFormData.conflictNote?.trim() || undefined,
        createdAt: now,
        updatedAt: now,
      };
      setStatements((prev) => [newStatement, ...prev]);
    }

    setIsStatementModalOpen(false);
    setEditingStatement(null);
  };

  // Deletion
  const handleDeleteItem = () => {
    if (!itemToDelete) return;
    if (itemToDelete.type === "source") {
      const srcId = itemToDelete.item.id;
      setSources((prev) => prev.filter((s) => s.id !== srcId));
      // unlink from statements
      setStatements((prev) =>
        prev.map((st) => ({
          ...st,
          sourceIds: st.sourceIds.filter((id) => id !== srcId),
        }))
      );
    } else {
      setStatements((prev) => prev.filter((st) => st.id !== itemToDelete.item.id));
    }
    setItemToDelete(null);
  };

  // Workspace Reset
  const handleResetWorkspace = () => {
    setSources([]);
    setStatements([]);
    setUserNotes("");
    setIsResetConfirmOpen(false);
  };

  // JSON Export & Import
  const handleExportJson = () => {
    const exportData: EvidenceRegisterData = {
      schemaVersion: "1.0",
      exportedAt: new Date().toISOString(),
      userNotes: userNotes.trim() || undefined,
      sources,
      statements,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registru-documentare-asigurari-${new Date().toISOString().split("T")[0]}.json`;
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
        const result = validateImportedEvidenceRegister(parsed);

        if (!result.valid || !result.data) {
          setImportError(result.error || "Fișierul JSON nu este valid.");
          setImportSuccess(null);
          return;
        }

        setSources(result.data.sources);
        setStatements(result.data.statements);
        if (result.data.userNotes) setUserNotes(result.data.userNotes);
        setImportError(null);
        setImportSuccess(`Au fost importate cu succes ${result.data.sources.length} surse și ${result.data.statements.length} afirmații!`);
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
    const exportData: EvidenceRegisterData = {
      schemaVersion: "1.0",
      exportedAt: new Date().toISOString(),
      userNotes: userNotes.trim() || undefined,
      sources,
      statements,
    };
    generateEvidenceRegisterPdf(exportData);
  };

  return (
    <div className="space-y-8">
      {/* KPI Overview Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Surse Notate</div>
          <div className="text-2xl sm:text-3xl font-bold text-zinc-900 mt-1">{stats.totalSources}</div>
          <div className="text-[11px] text-zinc-500 mt-1">Documente & adrese</div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Afirmații & Clauze</div>
          <div className="text-2xl sm:text-3xl font-bold text-blue-400 mt-1">{stats.totalStatements}</div>
          <div className="text-[11px] text-zinc-500 mt-1">Mențiuni inventariate</div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Clarificări Așteptate</div>
          <div className="text-2xl sm:text-3xl font-bold text-purple-400 mt-1">{stats.clarificationsPending}</div>
          <div className="text-[11px] text-zinc-500 mt-1">Solicitate în scris</div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Clarificate</div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mt-1">{stats.clarificationsReceived}</div>
          <div className="text-[11px] text-zinc-500 mt-1">Confirmate în scris</div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Follow-Up Depășit</div>
          <div className="text-2xl sm:text-3xl font-bold text-red-400 mt-1">{stats.overdueFollowUps}</div>
          <div className="text-[11px] text-zinc-500 mt-1">Scadențe trecute</div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Fără Sursă / Conflict</div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-400 mt-1">
            {stats.unlinkedStatements + stats.conflictingStatements}
          </div>
          <div className="text-[11px] text-zinc-500 mt-1">Necesită reconciliere</div>
        </div>
      </div>

      {/* Main Tab Navigation & Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-zinc-200 rounded-xl overflow-x-auto">
          <button
            onClick={() => setActiveTab("sources")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === "sources"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-zinc-500 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Surse & Documente ({sources.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("statements")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === "statements"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-zinc-500 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Afirmații & Clauze ({statements.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("matrix")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === "matrix"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-zinc-500 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Matrice Relații & Conflicte</span>
          </button>

          <button
            onClick={() => setActiveTab("queue")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === "queue"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-zinc-500 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Coadă Follow-Up ({stats.clarificationsPending + stats.overdueFollowUps + stats.unlinkedStatements})</span>
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
          {activeTab === "sources" ? (
            <Button
              onClick={handleOpenAddSource}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-xs font-semibold shadow-md shadow-blue-900/20"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Adaugă Sursă
            </Button>
          ) : (
            <Button
              onClick={handleOpenAddStatement}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-xs font-semibold shadow-md shadow-blue-900/20"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Adaugă Afirmație
            </Button>
          )}

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

      {/* TAB 1: SOURCES REGISTER */}
      {activeTab === "sources" && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Caută în surse, emitent, sumar..."
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
              value={filterSourceType}
              onChange={(e) => setFilterSourceType(e.target.value)}
              className="bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs text-zinc-600 focus:outline-none focus:border-blue-500"
            >
              <option value="all">Toate Tipurile de Surse</option>
              {Object.keys(SOURCE_TYPE_INFO).map((k) => (
                <option key={k} value={k}>
                  {SOURCE_TYPE_INFO[k as SourceType].labelRo}
                </option>
              ))}
            </select>

            <select
              value={filterVerifStatus}
              onChange={(e) => setFilterVerifStatus(e.target.value)}
              className="bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs text-zinc-600 focus:outline-none focus:border-blue-500"
            >
              <option value="all">Toate Statusurile</option>
              {Object.keys(VERIFICATION_STATUS_INFO).map((k) => (
                <option key={k} value={k}>
                  {VERIFICATION_STATUS_INFO[k as VerificationStatus].labelRo}
                </option>
              ))}
            </select>
          </div>

          {/* Sources List */}
          {filteredSources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSources.map((src) => {
                const srcType = SOURCE_TYPE_INFO[src.sourceType];
                const verifStatus = VERIFICATION_STATUS_INFO[src.verificationStatus];
                const followUp = getFollowUpStatus(src.followUpDate);
                const linkedStmts = statements.filter((st) => st.sourceIds.includes(src.id));

                return (
                  <div
                    key={src.id}
                    className="bg-white border border-zinc-200 hover:border-zinc-300 rounded-2xl p-5 transition-all flex flex-col justify-between shadow-lg shadow-black/10"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-800 text-blue-400 border border-zinc-300">
                            {srcType.labelRo}
                          </span>
                          <h4 className="text-sm font-bold text-zinc-900 mt-1.5 leading-snug">{src.title}</h4>
                        </div>

                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border shrink-0 ${
                            verifStatus.color === "emerald"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : verifStatus.color === "purple"
                              ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                              : verifStatus.color === "blue"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                              : verifStatus.color === "red"
                              ? "bg-red-500/10 text-red-400 border-red-500/20"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          }`}
                        >
                          {verifStatus.labelRo}
                        </span>
                      </div>

                      {/* Meta information */}
                      <div className="text-xs text-zinc-500 space-y-1 mb-3">
                        <div>
                          <span className="text-zinc-500">Emitent: </span>
                          <span className="text-zinc-800 font-medium">{src.authorOrOrganization || "Nespecificat"}</span>
                        </div>
                        {(src.dateOfDocument || src.dateReceived) && (
                          <div>
                            <span className="text-zinc-500">Dată: </span>
                            <span>{src.dateOfDocument ? `Emis ${src.dateOfDocument}` : ""}</span>
                            <span>{src.dateReceived ? ` (Primit ${src.dateReceived})` : ""}</span>
                          </div>
                        )}
                        {src.relatedPolicyNickname && (
                          <div>
                            <span className="text-zinc-500">Poliță asociată: </span>
                            <span className="text-zinc-600">{src.relatedPolicyNickname}</span>
                          </div>
                        )}
                        {src.referenceOrSection && (
                          <div className="text-[11px] text-zinc-500 italic">
                            Ref: {src.referenceOrSection}
                          </div>
                        )}
                      </div>

                      {/* Summary Box */}
                      {src.summary && (
                        <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs text-zinc-600 mb-3">
                          {src.summary}
                        </div>
                      )}

                      {/* Follow-Up Warning */}
                      {src.followUpDate && (
                        <div className="flex items-center gap-1.5 text-[11px] text-amber-400 mb-2">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Follow-up: {src.followUpDate} ({followUp.labelRo})</span>
                        </div>
                      )}

                      {/* Linked statements count */}
                      <div className="text-[11px] text-zinc-500">
                        {linkedStmts.length} afirmații asociate acestei surse
                      </div>
                    </div>

                    {/* Actions bar */}
                    <div className="pt-3 border-t border-zinc-200/80 flex items-center justify-between gap-2 mt-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditSource(src)}
                          className="p-1.5 rounded-lg bg-zinc-800 text-zinc-600 hover:text-white hover:bg-zinc-700 transition-colors"
                          title="Editează sursa"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setItemToDelete({ type: "source", item: src })}
                          className="p-1.5 rounded-lg bg-zinc-800 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Șterge sursa"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {src.verificationStatus !== "superseded_outdated" ? (
                        <button
                          onClick={() => {
                            setSources((prev) =>
                              prev.map((s) => (s.id === src.id ? { ...s, verificationStatus: "superseded_outdated" } : s))
                            );
                          }}
                          className="text-[11px] text-zinc-500 hover:text-red-400 transition-colors"
                        >
                          Marchează ca perimat
                        </button>
                      ) : (
                        <span className="text-[11px] text-red-400 italic">Sursă perimată / istorică</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-zinc-50 border border-zinc-200/60 rounded-2xl">
              <FileText className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-zinc-600">Nicio sursă înregistrată</h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                Adaugă prima sursă documentară (condiții de asigurare, email asigurator, ofertă scrisă) pentru a fundamenta afirmațiile despre polițe.
              </p>
              <Button onClick={handleOpenAddSource} size="sm" className="mt-4 bg-blue-600 hover:bg-blue-500 text-xs">
                <Plus className="w-3.5 h-3.5 mr-1" />
                Adaugă Sursă
              </Button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: STATEMENTS & EVIDENCE CLAIMS */}
      {activeTab === "statements" && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Caută în conținutul afirmațiilor, clauzelor sau notițelor..."
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
              value={filterStatementStatus}
              onChange={(e) => setFilterStatementStatus(e.target.value)}
              className="bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs text-zinc-600 focus:outline-none focus:border-blue-500"
            >
              <option value="all">Toate Statusurile Afirmațiilor</option>
              {Object.keys(STATEMENT_STATUS_INFO).map((k) => (
                <option key={k} value={k}>
                  {STATEMENT_STATUS_INFO[k as StatementStatus].labelRo}
                </option>
              ))}
            </select>
          </div>

          {/* Statements List */}
          {filteredStatements.length > 0 ? (
            <div className="space-y-4">
              {filteredStatements.map((st) => {
                const stStatus = STATEMENT_STATUS_INFO[st.statementStatus];
                const linkedSources = sources.filter((s) => st.sourceIds.includes(s.id));

                return (
                  <div
                    key={st.id}
                    className="bg-white border border-zinc-200 hover:border-zinc-300 rounded-2xl p-5 transition-all space-y-3 shadow-lg shadow-black/10"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {st.category && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-800 text-zinc-600 border border-zinc-300">
                              {st.category}
                            </span>
                          )}
                          {st.relatedPolicyNickname && (
                            <span className="text-xs text-zinc-500 font-medium">
                              Poliță: <strong className="text-zinc-800">{st.relatedPolicyNickname}</strong>
                            </span>
                          )}
                          {st.dateRecorded && (
                            <span className="text-[11px] text-zinc-500">Notat la: {st.dateRecorded}</span>
                          )}
                        </div>

                        <h4 className="text-sm font-semibold text-white leading-relaxed pt-1">
                          „{st.statement}”
                        </h4>
                      </div>

                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border shrink-0 ${
                          stStatus.color === "emerald"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : stStatus.color === "purple"
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                            : stStatus.color === "blue"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                            : stStatus.color === "red"
                            ? "bg-red-500/10 text-red-400 border-red-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {stStatus.labelRo}
                      </span>
                    </div>

                    {/* Linked Sources pills */}
                    <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/60 text-xs">
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mb-1.5">
                        Surse Documentare Asociate ({linkedSources.length})
                      </div>
                      {linkedSources.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {linkedSources.map((ls) => (
                            <span
                              key={ls.id}
                              className="px-2.5 py-1 rounded-lg bg-zinc-800 border border-zinc-300 text-zinc-800 text-[11px] flex items-center gap-1.5"
                            >
                              <FileText className="w-3 h-3 text-blue-400" />
                              <span>{ls.title}</span>
                              {st.sourceReference && <span className="text-zinc-500 font-mono">({st.sourceReference})</span>}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="text-amber-400/90 text-xs flex items-center gap-1.5 italic">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span>Afirmație proprie nesusținută încă de o sursă înregistrată.</span>
                        </div>
                      )}
                    </div>

                    {/* Conflict Callout */}
                    {st.conflictNote && (
                      <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold">Conflict / Nepotrivire semnalată: </span>
                          <span>{st.conflictNote}</span>
                        </div>
                      </div>
                    )}

                    {/* Notes snippet */}
                    {st.notes && (
                      <div className="text-xs text-zinc-500 italic">
                        Notă: &ldquo;{st.notes}&rdquo;
                      </div>
                    )}

                    {/* Actions */}
                    <div className="pt-2 border-t border-zinc-200/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditStatement(st)}
                          className="text-xs text-blue-400 hover:text-blue-800 inline-flex items-center gap-1 font-medium"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Editează afirmația</span>
                        </button>
                      </div>

                      <button
                        onClick={() => setItemToDelete({ type: "statement", item: st })}
                        className="text-xs text-zinc-500 hover:text-red-400 inline-flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Șterge</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-zinc-50 border border-zinc-200/60 rounded-2xl">
              <MessageSquare className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-zinc-600">Nicio afirmație înregistrată</h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                Notează clauze concrete sau întrebări de confirmat, asociindu-le cu sursele existente.
              </p>
              <Button onClick={handleOpenAddStatement} size="sm" className="mt-4 bg-blue-600 hover:bg-blue-500 text-xs">
                <Plus className="w-3.5 h-3.5 mr-1" />
                Adaugă Afirmație
              </Button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MATRIX & RECONCILIATION */}
      {activeTab === "matrix" && (
        <div className="space-y-6">
          <div className="bg-zinc-50 border border-zinc-200/60 rounded-xl p-4 text-xs text-zinc-500 flex items-start gap-3">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-zinc-800">Reconciliere documentară:</span> Această matrice afișează legătura dintre fiecare afirmație/clauză și documentele care o susțin. Dacă există neconcordanțe (ex: promisiuni verbale contrazise de contract), acestea sunt evidențiate pentru discuția cu consilierul sau asiguratorul.
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-zinc-200 font-bold text-sm text-white">
              Matrice Afirmații vs. Surse Documentare
            </div>

            <div className="divide-y divide-zinc-800/80">
              {statements.map((st) => {
                const linkedSources = sources.filter((s) => st.sourceIds.includes(s.id));
                const stStatus = STATEMENT_STATUS_INFO[st.statementStatus];

                return (
                  <div key={st.id} className="p-4 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="font-semibold text-sm text-white">
                        „{st.statement}”
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold border shrink-0 ${
                          stStatus.color === "emerald"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : stStatus.color === "purple"
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {stStatus.labelRo}
                      </span>
                    </div>

                    {/* Sources mapping */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 text-xs">
                        <div className="text-[10px] text-zinc-500 uppercase font-semibold mb-1">Surse de Sprijin</div>
                        {linkedSources.length > 0 ? (
                          <ul className="space-y-1">
                            {linkedSources.map((ls) => (
                              <li key={ls.id} className="text-zinc-600 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                <span className="font-medium text-white">{ls.title}</span>
                                <span className="text-zinc-500">({SOURCE_TYPE_INFO[ls.sourceType].labelRo})</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="text-amber-400/90 italic">Fără documente asociate</div>
                        )}
                      </div>

                      <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 text-xs">
                        <div className="text-[10px] text-zinc-500 uppercase font-semibold mb-1">Status Reconciliere</div>
                        {st.conflictNote ? (
                          <div className="text-red-400">
                            <strong>Conflict identificat:</strong> {st.conflictNote}
                          </div>
                        ) : linkedSources.length > 0 ? (
                          <div className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Aliniat cu sursa notată</span>
                          </div>
                        ) : (
                          <div className="text-amber-400">Necesită atașarea unei dovezi scrise</div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FOLLOW-UP QUEUE */}
      {activeTab === "queue" && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" />
              <h3 className="text-base font-bold text-zinc-900">Coadă de Acțiuni & Clarificări</h3>
            </div>
            <p className="text-xs text-zinc-500">
              Urmărește clarificările solicitate asiguratorilor, termenele de revenire și afirmațiile care au rămas fără confirmare documentară.
            </p>

            {/* Overdue items */}
            {sources.filter((s) => getFollowUpStatus(s.followUpDate).status === "overdue").length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                  ⚠️ Termene de Follow-up Depășite
                </div>
                {sources
                  .filter((s) => getFollowUpStatus(s.followUpDate).status === "overdue")
                  .map((src) => (
                    <div
                      key={src.id}
                      className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-zinc-800 flex items-center justify-between gap-3"
                    >
                      <div>
                        <span className="font-semibold text-white">{src.title}</span> — Data scadenței: {src.followUpDate}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleOpenEditSource(src)}
                        className="bg-zinc-800 hover:bg-zinc-700 text-xs"
                      >
                        Actualizează
                      </Button>
                    </div>
                  ))}
              </div>
            )}

            {/* Clarification pending */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                Clarificări Solicitate către Asigurator / Broker
              </div>
              {sources.filter((s) => s.verificationStatus === "clarification_requested").length > 0 ||
              statements.filter((st) => st.statementStatus === "requires_clarification").length > 0 ? (
                <div className="space-y-2">
                  {sources
                    .filter((s) => s.verificationStatus === "clarification_requested")
                    .map((s) => (
                      <div
                        key={s.id}
                        className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-xs text-zinc-800 flex items-center justify-between"
                      >
                        <div>
                          <span className="font-semibold text-white">Sursă: {s.title}</span> — Așteaptă răspuns de la {s.authorOrOrganization || "asigurator"}
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleOpenEditSource(s)}
                          className="bg-zinc-800 hover:bg-zinc-700 text-xs"
                        >
                          Marchează primit
                        </Button>
                      </div>
                    ))}
                  {statements
                    .filter((st) => st.statementStatus === "requires_clarification")
                    .map((st) => (
                      <div
                        key={st.id}
                        className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-xs text-zinc-800 flex items-center justify-between"
                      >
                        <div>
                          <span className="font-semibold text-white">Afirmație: „{st.statement}”</span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleOpenEditStatement(st)}
                          className="bg-zinc-800 hover:bg-zinc-700 text-xs"
                        >
                          Rezolvă
                        </Button>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-xs text-zinc-500">
                  Nu există clarificări marcate în așteptare.
                </div>
              )}
            </div>

            {/* Unlinked statements */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Afirmații Proprii fără Document Atașat
              </div>
              {statements.filter((st) => st.sourceIds.length === 0).length > 0 ? (
                <div className="space-y-2">
                  {statements
                    .filter((st) => st.sourceIds.length === 0)
                    .map((st) => (
                      <div
                        key={st.id}
                        className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-zinc-800 flex items-center justify-between"
                      >
                        <div>„{st.statement}”</div>
                        <Button
                          size="sm"
                          onClick={() => handleOpenEditStatement(st)}
                          className="bg-zinc-800 hover:bg-zinc-700 text-xs"
                        >
                          Asociază Sursă
                        </Button>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-xs text-zinc-500">
                  Toate afirmațiile au cel puțin o sursă asociată.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: REPORT & BACKUP */}
      {activeTab === "report" && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-zinc-900">Export & Raport Registru Documentare</h3>
              <p className="text-xs text-zinc-500 mt-1">
                Descarcă un dosar complet PDF sau salvează un backup JSON securizat local în browser.
              </p>
            </div>

            {/* User notes */}
            <div>
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2">
                Notițe Generale / Concluzii Documentare
              </label>
              <textarea
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="Ex: Am adunat toate clarificările pentru CASCO și Locuință, urmează să transmit lista către Cristian Văduva..."
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
                    Document tipărit cu inventarul surselor, clauzelor și stadiului clarificărilor.
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
                    Încarcă un fișier de registru salvat anterior pentru a continua lucrul.
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

      {/* MODAL: ADD / EDIT SOURCE */}
      <AnimatePresence>
        {isSourceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-zinc-200 rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900">
                    {editingSource ? "Editează Sursă" : "Adaugă Sursă Documentară"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsSourceModalOpen(false)}
                  className="text-zinc-500 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveSource} className="p-6 overflow-y-auto space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-600 font-semibold mb-1">
                    Titlu Sursă / Document <span className="text-red-400">*</span>
                  </label>
                  <Input
                    required
                    value={sourceFormData.title || ""}
                    onChange={(e) => setSourceFormData({ ...sourceFormData, title: e.target.value })}
                    placeholder="Ex: Condiții Generale CASCO Ediția 2026, Email Clarificare Subscriitor..."
                    className="bg-zinc-50 border-zinc-200 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Tip Sursă</label>
                    <select
                      value={sourceFormData.sourceType || "policy_wording"}
                      onChange={(e) => setSourceFormData({ ...sourceFormData, sourceType: e.target.value as SourceType })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-800 focus:outline-none focus:border-blue-500"
                    >
                      {Object.keys(SOURCE_TYPE_INFO).map((k) => (
                        <option key={k} value={k}>
                          {SOURCE_TYPE_INFO[k as SourceType].labelRo}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Organizație / Autor Emitent</label>
                    <Input
                      value={sourceFormData.authorOrOrganization || ""}
                      onChange={(e) => setSourceFormData({ ...sourceFormData, authorOrOrganization: e.target.value })}
                      placeholder="Ex: Allianz-Țiriac, Broker, Evaluator autorizat..."
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Dată Document</label>
                    <Input
                      type="date"
                      value={sourceFormData.dateOfDocument || ""}
                      onChange={(e) => setSourceFormData({ ...sourceFormData, dateOfDocument: e.target.value })}
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Dată Primire / Accesare</label>
                    <Input
                      type="date"
                      value={sourceFormData.dateReceived || ""}
                      onChange={(e) => setSourceFormData({ ...sourceFormData, dateReceived: e.target.value })}
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Poliță / Categorie Asociată</label>
                    <Input
                      value={sourceFormData.relatedPolicyNickname || ""}
                      onChange={(e) => setSourceFormData({ ...sourceFormData, relatedPolicyNickname: e.target.value })}
                      placeholder="Ex: CASCO Autoturism, Asigurare Locuință..."
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Secțiune / Pagină / Referință</label>
                    <Input
                      value={sourceFormData.referenceOrSection || ""}
                      onChange={(e) => setSourceFormData({ ...sourceFormData, referenceOrSection: e.target.value })}
                      placeholder="Ex: Art. 12.3, Pagină 4, Număr înregistrare..."
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-600 font-medium mb-1">Sumar Clauză sau Extras Relevat</label>
                  <textarea
                    value={sourceFormData.summary || ""}
                    onChange={(e) => setSourceFormData({ ...sourceFormData, summary: e.target.value })}
                    placeholder="Scurt rezumat a ceea ce stabilește sau confirmă acest document..."
                    rows={3}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs text-zinc-800 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Status Verificare</label>
                    <select
                      value={sourceFormData.verificationStatus || "user_entered_unverified"}
                      onChange={(e) => setSourceFormData({ ...sourceFormData, verificationStatus: e.target.value as VerificationStatus })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-800 focus:outline-none focus:border-blue-500"
                    >
                      {Object.keys(VERIFICATION_STATUS_INFO).map((k) => (
                        <option key={k} value={k}>
                          {VERIFICATION_STATUS_INFO[k as VerificationStatus].labelRo}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Dată Follow-up / Scadență</label>
                    <Input
                      type="date"
                      value={sourceFormData.followUpDate || ""}
                      onChange={(e) => setSourceFormData({ ...sourceFormData, followUpDate: e.target.value })}
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-200 flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsSourceModalOpen(false)}
                    className="border-zinc-300 text-xs"
                  >
                    Anulează
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs">
                    {editingSource ? "Salvează Sursa" : "Adaugă Sursa"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD / EDIT STATEMENT */}
      <AnimatePresence>
        {isStatementModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-zinc-200 rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900">
                    {editingStatement ? "Editează Afirmație" : "Adaugă Afirmație / Clauză"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsStatementModalOpen(false)}
                  className="text-zinc-500 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveStatement} className="p-6 overflow-y-auto space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-600 font-semibold mb-1">
                    Textul Afirmației / Clauzei de Verificat <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    required
                    value={statementFormData.statement || ""}
                    onChange={(e) => setStatementFormData({ ...statementFormData, statement: e.target.value })}
                    placeholder="Ex: „Polița acoperă furtul oglinzilor fără franșiză”, „Am nevoie de confirmare dacă panourile solare sunt asigurate...”"
                    rows={3}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Categorie Asigurare</label>
                    <Input
                      value={statementFormData.category || ""}
                      onChange={(e) => setStatementFormData({ ...statementFormData, category: e.target.value })}
                      placeholder="Ex: CASCO, Locuință, RCA, Sănătate..."
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Poliță Asociată</label>
                    <Input
                      value={statementFormData.relatedPolicyNickname || ""}
                      onChange={(e) => setStatementFormData({ ...statementFormData, relatedPolicyNickname: e.target.value })}
                      placeholder="Ex: CASCO BMW, Locuință Ilfov..."
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Sources Selection */}
                <div>
                  <label className="block text-zinc-600 font-semibold mb-1.5">
                    Surse Documentare de Sprijin
                  </label>
                  {sources.length > 0 ? (
                    <div className="max-h-36 overflow-y-auto p-2 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1.5">
                      {sources.map((s) => {
                        const isChecked = (statementFormData.sourceIds || []).includes(s.id);
                        return (
                          <label
                            key={s.id}
                            className="flex items-center gap-2.5 p-1.5 rounded hover:bg-white cursor-pointer text-xs text-zinc-600"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                const current = statementFormData.sourceIds || [];
                                if (e.target.checked) {
                                  setStatementFormData({ ...statementFormData, sourceIds: [...current, s.id] });
                                } else {
                                  setStatementFormData({ ...statementFormData, sourceIds: current.filter((id) => id !== s.id) });
                                }
                              }}
                              className="rounded bg-white border-zinc-300 text-blue-600 focus:ring-0"
                            />
                            <span className="font-medium text-white truncate">{s.title}</span>
                            <span className="text-zinc-500 text-[10px]">({SOURCE_TYPE_INFO[s.sourceType].labelRo})</span>
                          </label>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-zinc-500 text-xs italic">
                      Nu ai adăugat încă nicio sursă. Poți crea una în tab-ul „Surse & Documente”.
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Status Afirmație</label>
                    <select
                      value={statementFormData.statementStatus || "user_assertion"}
                      onChange={(e) => setStatementFormData({ ...statementFormData, statementStatus: e.target.value as StatementStatus })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-800 focus:outline-none focus:border-blue-500"
                    >
                      {Object.keys(STATEMENT_STATUS_INFO).map((k) => (
                        <option key={k} value={k}>
                          {STATEMENT_STATUS_INFO[k as StatementStatus].labelRo}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Referință Paragraf / Pagină</label>
                    <Input
                      value={statementFormData.sourceReference || ""}
                      onChange={(e) => setStatementFormData({ ...statementFormData, sourceReference: e.target.value })}
                      placeholder="Ex: Art. 12.3, Clauza 4..."
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-600 font-medium mb-1">Note de Conflict / Nepotrivire (Opțional)</label>
                  <Input
                    value={statementFormData.conflictNote || ""}
                    onChange={(e) => setStatementFormData({ ...statementFormData, conflictNote: e.target.value })}
                    placeholder="Ex: Oferta nouă spune că franșiza este 100 EUR, dar condițiile vechi aveau 0 EUR..."
                    className="bg-zinc-50 border-zinc-200 text-xs text-white"
                  />
                </div>

                <div className="pt-4 border-t border-zinc-200 flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsStatementModalOpen(false)}
                    className="border-zinc-300 text-xs"
                  >
                    Anulează
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs">
                    {editingStatement ? "Salvează Modificările" : "Adaugă Afirmația"}
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
                  Confirmă Ștergerea {itemToDelete.type === "source" ? "Sursei" : "Afirmației"}
                </h3>
              </div>
              <p className="text-zinc-600 mb-4">
                Sigur dorești să ștergi înregistrarea <strong className="text-white">&ldquo;{itemToDelete.type === "source" ? itemToDelete.item.title : itemToDelete.item.statement}&rdquo;</strong>?
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
                <h3 className="text-sm font-bold text-zinc-900">Resetare Completă Registru</h3>
              </div>
              <p className="text-zinc-600 mb-4 leading-relaxed">
                Această acțiune va șterge toate sursele și afirmațiile înregistrate în această sesiune de navigare. Descarcă un raport PDF sau un export JSON înainte de resetare.
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
