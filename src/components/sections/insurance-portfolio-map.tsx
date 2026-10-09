"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Map,
  Plus,
  Trash2,
  Edit3,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Car,
  Home as HomeIcon,
  HeartPulse,
  Activity,
  Plane,
  Building2,
  Briefcase,
  Sparkles,
  Layers,
  ShieldAlert,
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
  Layers as LayersIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PortfolioPolicy,
  PortfolioCategory,
  CurrencyCode,
  PaymentFrequency,
  PortfolioReviewStatus,
  CATEGORY_INFO,
  REVIEW_STATUS_INFO,
  getMissingPolicyFields,
  getPolicyExpiryStatus,
  detectCategoryOverlaps,
  generatePortfolioSummaryStats,
  generatePortfolioMapPdf,
  validateImportedPortfolio,
  PortfolioMapExportData,
} from "@/lib/insurance-portfolio-map";
import Link from "next/link";

const INITIAL_DEMO_POLICIES: PortfolioPolicy[] = [
  {
    id: "demo_1",
    nickname: "RCA Autoturism Principal",
    category: "rca",
    insurer: "Generali Asigurări",
    productName: "RCA Standard + Decontare Directă",
    startDate: "2026-03-01",
    expiryDate: "2027-02-28",
    premiumAmount: 1250,
    currency: "RON",
    paymentFrequency: "annual",
    coverageLimit: 6070000,
    limitCurrency: "EUR",
    limitBasis: "Conform legii RCA",
    deductible: 0,
    deductibleCurrency: "RON",
    deductibleBasis: "Fără franșiză terți",
    declaredProtection: "Răspundere civilă auto pentru daune materiale și vătămări corporale.",
    exclusions: "Conducere sub influența alcoolului, lipsă ITP.",
    notes: "Include decontare directă activată.",
    reviewStatus: "reviewed_by_user",
    reviewNote: "Verificat la ultima reînnoire.",
    lastReviewedDate: "2026-03-01",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "demo_2",
    nickname: "CASCO Autoturism Principal",
    category: "casco",
    insurer: "Omniasig VIG",
    productName: "CASCO All Risks",
    startDate: "2026-04-15",
    expiryDate: "2027-04-14",
    premiumAmount: 950,
    currency: "EUR",
    paymentFrequency: "quarterly",
    coverageLimit: 42000,
    limitCurrency: "EUR",
    limitBasis: "Valoare de piață agreată",
    deductible: 100,
    deductibleCurrency: "EUR",
    deductibleBasis: "Pe eveniment la daune parțiale",
    declaredProtection: "Avarii accidentale, furt total/parțial, vandalism, fenomene naturale.",
    exclusions: "Accidente produse pe circuite închise, neglijență gravă.",
    notes: "Clauză de asistență rutieră extinsă VIP inclusă.",
    reviewStatus: "needs_review",
    reviewNote: "Trebuie renegociată franșiza la următoarea reînnoire.",
    lastReviewedDate: "2026-04-10",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "demo_3",
    nickname: "Asigurare Locuință & PAD",
    category: "home",
    insurer: "Allianz-Țiriac",
    productName: "Locuință Confort Extra + PAD Obligatoriu",
    startDate: "2025-11-20",
    expiryDate: "2026-11-19",
    premiumAmount: 380,
    currency: "EUR",
    paymentFrequency: "annual",
    coverageLimit: 250000,
    limitCurrency: "EUR",
    limitBasis: "Cost de reconstrucție de nou",
    deductible: 0,
    deductibleCurrency: "EUR",
    deductibleBasis: "Fără franșiză daune clădire",
    declaredProtection: "Incendiu, trăsnet, explozie, inundații conducte, răspundere față de vecini.",
    exclusions: "Infiltrații prin fațade neizolate, vicii ascunse de construcție.",
    notes: "Include răspundere civilă față de terți / vecini până la 30.000 EUR.",
    reviewStatus: "advisor_pending",
    reviewNote: "Vreau să confirm dacă panourile fotovoltaice de pe acoperiș sunt acoperite.",
    lastReviewedDate: "2026-02-15",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "demo_4",
    nickname: "Sănătate Privată Familie",
    category: "health",
    insurer: "Signal Iduna",
    productName: "Vital Plus International",
    startDate: "2026-01-01",
    expiryDate: "2026-12-31",
    premiumAmount: 1800,
    currency: "EUR",
    paymentFrequency: "semiannual",
    coverageLimit: 100000,
    limitCurrency: "EUR",
    limitBasis: "Plafon anual pe membru de familie",
    deductible: 50,
    deductibleCurrency: "EUR",
    deductibleBasis: "Co-plată pe consultație specialitate",
    declaredProtection: "Spitalizare, intervenții chirurgicale, a doua opinie medicală internațională.",
    exclusions: "Afecțiuni preexistente nedeclarate la încheiere.",
    notes: "Acoperire valabilă în rețeaua Regina Maria & Sanador.",
    reviewStatus: "info_requested",
    reviewNote: "Aștept actualizarea listei de clinici partenere.",
    lastReviewedDate: "2026-01-05",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function InsurancePortfolioMap() {
  const [policies, setPolicies] = useState<PortfolioPolicy[]>(INITIAL_DEMO_POLICIES);
  const [activeTab, setActiveTab] = useState<"map" | "register" | "alerts" | "report">("map");

  // Filters & Search for Register
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterReviewStatus, setFilterReviewStatus] = useState<string>("all");
  const [filterExpiry, setFilterExpiry] = useState<string>("all");
  const [filterMissing, setFilterMissing] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"nickname" | "expiry_asc" | "expiry_desc" | "category">("expiry_asc");

  // Modals & States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<PortfolioPolicy | null>(null);
  const [viewingPolicy, setViewingPolicy] = useState<PortfolioPolicy | null>(null);
  const [policyToDelete, setPolicyToDelete] = useState<PortfolioPolicy | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [userNotes, setUserNotes] = useState<string>("");
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState<Partial<PortfolioPolicy>>({
    nickname: "",
    category: "rca",
    currency: "EUR",
    paymentFrequency: "annual",
    reviewStatus: "needs_review",
  });

  const stats = useMemo(() => generatePortfolioSummaryStats(policies), [policies]);
  const overlaps = useMemo(() => detectCategoryOverlaps(policies), [policies]);

  const filteredPolicies = useMemo(() => {
    return policies
      .filter((p) => {
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchNick = p.nickname.toLowerCase().includes(q);
          const matchInsurer = p.insurer?.toLowerCase().includes(q);
          const matchProd = p.productName?.toLowerCase().includes(q);
          const matchNotes = p.notes?.toLowerCase().includes(q);
          if (!matchNick && !matchInsurer && !matchProd && !matchNotes) return false;
        }

        // Category Filter
        if (filterCategory !== "all" && p.category !== filterCategory) return false;

        // Review Status Filter
        if (filterReviewStatus !== "all" && p.reviewStatus !== filterReviewStatus) return false;

        // Expiry Filter
        if (filterExpiry !== "all") {
          const exp = getPolicyExpiryStatus(p.expiryDate);
          if (filterExpiry === "expired" && exp.status !== "expired") return false;
          if (filterExpiry === "urgent_7_days" && exp.status !== "urgent_7_days") return false;
          if (filterExpiry === "upcoming_30_days" && exp.status !== "upcoming_30_days" && exp.status !== "urgent_7_days") return false;
          if (filterExpiry === "active" && (exp.status === "expired" || exp.status === "insufficient_info")) return false;
          if (filterExpiry === "insufficient_info" && exp.status !== "insufficient_info") return false;
        }

        // Missing Info Filter
        if (filterMissing) {
          const missing = getMissingPolicyFields(p);
          if (missing.length === 0) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "nickname") {
          return a.nickname.localeCompare(b.nickname);
        }
        if (sortBy === "category") {
          return a.category.localeCompare(b.category);
        }
        if (sortBy === "expiry_asc" || sortBy === "expiry_desc") {
          const dateA = a.expiryDate ? new Date(a.expiryDate).getTime() : 9999999999999;
          const dateB = b.expiryDate ? new Date(b.expiryDate).getTime() : 9999999999999;
          return sortBy === "expiry_asc" ? dateA - dateB : dateB - dateA;
        }
        return 0;
      });
  }, [policies, searchQuery, filterCategory, filterReviewStatus, filterExpiry, filterMissing, sortBy]);

  // Handle Form Open / Submit
  const handleOpenAdd = (defaultCategory?: PortfolioCategory) => {
    setFormData({
      nickname: "",
      category: defaultCategory || "rca",
      currency: "EUR",
      paymentFrequency: "annual",
      reviewStatus: "needs_review",
    });
    setEditingPolicy(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (policy: PortfolioPolicy) => {
    setFormData({ ...policy });
    setEditingPolicy(policy);
    setIsAddModalOpen(true);
  };

  const handleSavePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nickname || !formData.nickname.trim()) return;

    const now = new Date().toISOString();

    if (editingPolicy) {
      setPolicies((prev) =>
        prev.map((p) =>
          p.id === editingPolicy.id
            ? ({
                ...p,
                ...formData,
                nickname: formData.nickname!.trim(),
                category: formData.category || "other",
                reviewStatus: formData.reviewStatus || "needs_review",
                updatedAt: now,
              } as PortfolioPolicy)
            : p
        )
      );
    } else {
      const newPolicy: PortfolioPolicy = {
        id: `pol_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        nickname: formData.nickname.trim(),
        category: formData.category || "other",
        insurer: formData.insurer?.trim() || undefined,
        productName: formData.productName?.trim() || undefined,
        startDate: formData.startDate || undefined,
        expiryDate: formData.expiryDate || undefined,
        premiumAmount: formData.premiumAmount !== undefined && !isNaN(formData.premiumAmount) ? Number(formData.premiumAmount) : undefined,
        currency: formData.currency || "EUR",
        paymentFrequency: formData.paymentFrequency || "annual",
        coverageLimit: formData.coverageLimit !== undefined && !isNaN(formData.coverageLimit) ? Number(formData.coverageLimit) : undefined,
        limitCurrency: formData.limitCurrency || "EUR",
        limitBasis: formData.limitBasis?.trim() || undefined,
        deductible: formData.deductible !== undefined && !isNaN(formData.deductible) ? Number(formData.deductible) : undefined,
        deductibleCurrency: formData.deductibleCurrency || "EUR",
        deductibleBasis: formData.deductibleBasis?.trim() || undefined,
        declaredProtection: formData.declaredProtection?.trim() || undefined,
        exclusions: formData.exclusions?.trim() || undefined,
        notes: formData.notes?.trim() || undefined,
        reviewStatus: formData.reviewStatus || "needs_review",
        reviewNote: formData.reviewNote?.trim() || undefined,
        lastReviewedDate: formData.lastReviewedDate || undefined,
        createdAt: now,
        updatedAt: now,
      };

      setPolicies((prev) => [newPolicy, ...prev]);
    }

    setIsAddModalOpen(false);
    setEditingPolicy(null);
  };

  const handleDeletePolicy = (policy: PortfolioPolicy) => {
    setPolicies((prev) => prev.filter((p) => p.id !== policy.id));
    setPolicyToDelete(null);
    if (viewingPolicy?.id === policy.id) setViewingPolicy(null);
  };

  const handleResetWorkspace = () => {
    setPolicies([]);
    setUserNotes("");
    setIsResetConfirmOpen(false);
  };

  const handleExportJson = () => {
    const exportData: PortfolioMapExportData = {
      schemaVersion: "1.0",
      exportedAt: new Date().toISOString(),
      userNotes: userNotes.trim() || undefined,
      policies,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portofoliu-asigurari-${new Date().toISOString().split("T")[0]}.json`;
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
        const result = validateImportedPortfolio(parsed);

        if (!result.valid || !result.data) {
          setImportError(result.error || "Fișierul JSON nu este valid.");
          setImportSuccess(null);
          return;
        }

        setPolicies(result.data.policies);
        if (result.data.userNotes) setUserNotes(result.data.userNotes);
        setImportError(null);
        setImportSuccess(`Au fost importate cu succes ${result.data.policies.length} polițe!`);
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
    const exportData: PortfolioMapExportData = {
      schemaVersion: "1.0",
      exportedAt: new Date().toISOString(),
      userNotes: userNotes.trim() || undefined,
      policies,
    };
    generatePortfolioMapPdf(exportData);
  };

  const allCategories: PortfolioCategory[] = [
    "rca",
    "casco",
    "home",
    "life",
    "health",
    "travel",
    "business",
    "professional_liability",
    "private_client",
    "other",
  ];

  const getCategoryIcon = (category: PortfolioCategory) => {
    switch (category) {
      case "rca":
        return <ShieldAlert className="w-5 h-5 text-blue-400" />;
      case "casco":
        return <Car className="w-5 h-5 text-cyan-400" />;
      case "home":
        return <HomeIcon className="w-5 h-5 text-amber-400" />;
      case "life":
        return <HeartPulse className="w-5 h-5 text-rose-400" />;
      case "health":
        return <Activity className="w-5 h-5 text-emerald-400" />;
      case "travel":
        return <Plane className="w-5 h-5 text-sky-400" />;
      case "business":
        return <Building2 className="w-5 h-5 text-indigo-400" />;
      case "professional_liability":
        return <Briefcase className="w-5 h-5 text-purple-400" />;
      case "private_client":
        return <Sparkles className="w-5 h-5 text-amber-800" />;
      case "other":
      default:
        return <Layers className="w-5 h-5 text-zinc-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Total Polițe</div>
          <div className="text-2xl sm:text-3xl font-bold text-zinc-900 mt-1">{stats.totalPolicies}</div>
          <div className="text-[11px] text-zinc-500 mt-1">Înregistrate manual</div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Detalii Lipsă</div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-400 mt-1">{stats.policiesWithMissingInfo}</div>
          <div className="text-[11px] text-zinc-500 mt-1">Necesită completare</div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Expiră &lt; 30 Zile</div>
          <div className="text-2xl sm:text-3xl font-bold text-orange-400 mt-1">{stats.expiringSoonCount}</div>
          <div className="text-[11px] text-zinc-500 mt-1">Reînnoire apropiată</div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Expirate</div>
          <div className="text-2xl sm:text-3xl font-bold text-red-400 mt-1">{stats.expiredCount}</div>
          <div className="text-[11px] text-zinc-500 mt-1">Conform datei notate</div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">De Revizuit</div>
          <div className="text-2xl sm:text-3xl font-bold text-purple-400 mt-1">{stats.needsReviewCount}</div>
          <div className="text-[11px] text-zinc-500 mt-1">Marcate de utilizator</div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Suprapuneri</div>
          <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mt-1">{stats.overlapCount}</div>
          <div className="text-[11px] text-zinc-500 mt-1">Intervale paralele</div>
        </div>
      </div>

      {/* Main Tab Bar & Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-zinc-200 rounded-xl overflow-x-auto">
          <button
            onClick={() => setActiveTab("map")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === "map"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-zinc-500 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Harta Categoriilor</span>
          </button>

          <button
            onClick={() => setActiveTab("register")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === "register"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-zinc-500 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <LayersIcon className="w-3.5 h-3.5" />
            <span>Registru Polițe ({policies.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("alerts")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === "alerts"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-zinc-500 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Alerte & Suprapuneri ({overlaps.length + stats.policiesWithMissingInfo})</span>
          </button>

          <button
            onClick={() => setActiveTab("report")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === "report"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-zinc-500 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Raport & Backup</span>
          </button>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            onClick={() => handleOpenAdd()}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-xs font-semibold shadow-md shadow-blue-900/20"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Adaugă Poliță
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

      {/* TAB 1: COVERAGE CATEGORY MAP */}
      {activeTab === "map" && (
        <div className="space-y-6">
          <div className="bg-zinc-50 border border-zinc-200/60 rounded-xl p-4 text-xs text-zinc-500 flex items-start gap-3">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-zinc-800">Harta vizuală a categoriilor de asigurare:</span> Categoriile fără polițe înregistrate sunt afișate transparent ca neacoperite în portofoliu. Prezența mai multor înregistrări într-o categorie indică polițe distincte (ex: două autoturisme sau două imobile), nu o dublă asigurare automată.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allCategories.map((cat) => {
              const catInfo = CATEGORY_INFO[cat];
              const catPolicies = policies.filter((p) => p.category === cat);
              const isCovered = catPolicies.length > 0;

              return (
                <div
                  key={cat}
                  className={`border rounded-2xl p-5 transition-all flex flex-col justify-between ${
                    isCovered
                      ? "bg-white border-zinc-300/70 shadow-lg shadow-black/20"
                      : "bg-zinc-50 border-zinc-200/50 opacity-75 hover:opacity-100"
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-zinc-800/80 border border-zinc-300/50">
                          {getCategoryIcon(cat)}
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-white">{catInfo.labelRo}</h3>
                          <p className="text-[11px] text-zinc-500 line-clamp-1">{catInfo.descriptionRo}</p>
                        </div>
                      </div>

                      {isCovered ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {catPolicies.length} {catPolicies.length === 1 ? "poliță" : "polițe"}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-800 text-zinc-500 border border-zinc-300/50">
                          Neînregistrat
                        </span>
                      )}
                    </div>

                    {/* Policy List in this Category */}
                    {isCovered ? (
                      <div className="space-y-2 mt-4">
                        {catPolicies.map((p) => {
                          const expiry = getPolicyExpiryStatus(p.expiryDate);
                          const missing = getMissingPolicyFields(p);

                          return (
                            <div
                              key={p.id}
                              onClick={() => setViewingPolicy(p)}
                              className="p-2.5 rounded-lg bg-zinc-800/40 border border-zinc-300/40 hover:border-zinc-600 cursor-pointer transition-all flex items-center justify-between gap-2"
                            >
                              <div className="min-w-0 flex-1">
                                <div className="text-xs font-medium text-zinc-800 truncate">{p.nickname}</div>
                                <div className="text-[11px] text-zinc-500 flex items-center gap-1.5 mt-0.5">
                                  <span>{p.insurer || "Asigurator nespecificat"}</span>
                                  {p.expiryDate && (
                                    <>
                                      <span>•</span>
                                      <span className={expiry.status === "expired" ? "text-red-400" : expiry.status === "urgent_7_days" ? "text-amber-400" : "text-zinc-500"}>
                                        {expiry.labelRo}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-1 shrink-0">
                                {missing.length > 0 && (
                                  <span className="w-2 h-2 rounded-full bg-amber-400" title={`Detalii lipsă: ${missing.length}`} />
                                )}
                                <Eye className="w-3.5 h-3.5 text-zinc-500" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-6 text-center text-zinc-600 text-xs flex flex-col items-center justify-center">
                        <Layers className="w-6 h-6 mb-1 opacity-30" />
                        <span>Nicio poliță înregistrată</span>
                      </div>
                    )}
                  </div>

                  {/* Add action */}
                  <div className="mt-4 pt-3 border-t border-zinc-200/60 flex items-center justify-between">
                    <button
                      onClick={() => handleOpenAdd(cat)}
                      className="text-[11px] text-blue-400 hover:text-blue-800 inline-flex items-center gap-1 font-medium"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Adaugă în această categorie</span>
                    </button>
                    {isCovered && catPolicies.length > 1 && (
                      <span className="text-[10px] text-zinc-500">Multiple înregistrări</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: POLICY REGISTER (TABLE / CARDS) */}
      {activeTab === "register" && (
        <div className="space-y-6">
          {/* Filter & Search Bar */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Caută după denumire, asigurator, produs, notițe..."
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

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs text-zinc-600 focus:outline-none focus:border-blue-500"
                >
                  <option value="all">Toate Categoriile</option>
                  {allCategories.map((c) => (
                    <option key={c} value={c}>
                      {CATEGORY_INFO[c].labelRo}
                    </option>
                  ))}
                </select>

                <select
                  value={filterReviewStatus}
                  onChange={(e) => setFilterReviewStatus(e.target.value)}
                  className="bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs text-zinc-600 focus:outline-none focus:border-blue-500"
                >
                  <option value="all">Toate Statusurile</option>
                  <option value="needs_review">Necesită revizuire</option>
                  <option value="info_requested">Informații solicitate</option>
                  <option value="reviewed_by_user">Revizuit de utilizator</option>
                  <option value="advisor_pending">Clarificare consilier</option>
                </select>

                <select
                  value={filterExpiry}
                  onChange={(e) => setFilterExpiry(e.target.value)}
                  className="bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs text-zinc-600 focus:outline-none focus:border-blue-500"
                >
                  <option value="all">Toate Termenele</option>
                  <option value="urgent_7_days">Urgent (&lt; 7 zile)</option>
                  <option value="upcoming_30_days">Apropiat (&lt; 30 zile)</option>
                  <option value="active">Polițe Active</option>
                  <option value="expired">Polițe Expirate</option>
                  <option value="insufficient_info">Fără dată validă</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "nickname" | "expiry_asc" | "expiry_desc" | "category")}
                  className="bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs text-zinc-600 focus:outline-none focus:border-blue-500"
                >
                  <option value="expiry_asc">Sortare: Expirare (Urgent prima)</option>
                  <option value="expiry_desc">Sortare: Expirare (Depărtat prima)</option>
                  <option value="nickname">Sortare: Denumire (A-Z)</option>
                  <option value="category">Sortare: Categorie</option>
                </select>
              </div>
            </div>

            {/* Toggle Missing */}
            <div className="flex items-center gap-2 pt-2 border-t border-zinc-200/60">
              <label className="flex items-center gap-2 text-xs text-zinc-500 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filterMissing}
                  onChange={(e) => setFilterMissing(e.target.checked)}
                  className="rounded bg-zinc-50 border-zinc-300 text-blue-600 focus:ring-0"
                />
                <span>Afișează doar polițele cu detalii incomplete / lipsă</span>
              </label>

              {(searchQuery || filterCategory !== "all" || filterReviewStatus !== "all" || filterExpiry !== "all" || filterMissing) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilterCategory("all");
                    setFilterReviewStatus("all");
                    setFilterExpiry("all");
                    setFilterMissing(false);
                  }}
                  className="ml-auto text-[11px] text-blue-400 hover:text-blue-800 underline underline-offset-2"
                >
                  Resetează filtrele
                </button>
              )}
            </div>
          </div>

          {/* Policy Cards Grid */}
          {filteredPolicies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPolicies.map((p) => {
                const missing = getMissingPolicyFields(p);
                const expiry = getPolicyExpiryStatus(p.expiryDate);
                const statusInfo = REVIEW_STATUS_INFO[p.reviewStatus];
                const catInfo = CATEGORY_INFO[p.category];

                return (
                  <div
                    key={p.id}
                    className="bg-white border border-zinc-200 hover:border-zinc-300 rounded-2xl p-5 transition-all flex flex-col justify-between shadow-lg shadow-black/10"
                  >
                    <div>
                      {/* Top bar */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 rounded-lg bg-zinc-800 border border-zinc-300">
                            {getCategoryIcon(p.category)}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-zinc-900 leading-snug">{p.nickname}</h4>
                            <div className="text-[11px] text-zinc-500">{catInfo.labelRo}</div>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                            statusInfo.color === "emerald"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : statusInfo.color === "blue"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                              : statusInfo.color === "purple"
                              ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          }`}
                        >
                          {statusInfo.labelRo}
                        </span>
                      </div>

                      {/* Insurer & Product */}
                      <div className="text-xs text-zinc-600 mb-3">
                        <span className="text-zinc-500">Asigurator: </span>
                        <span className="font-medium text-zinc-800">{p.insurer || "Nespecificat"}</span>
                        {p.productName && <span className="text-zinc-500"> • {p.productName}</span>}
                      </div>

                      {/* Key Financials & Dates */}
                      <div className="grid grid-cols-2 gap-2 p-3 bg-zinc-50 rounded-xl border border-zinc-200/60 text-xs mb-3">
                        <div>
                          <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Valoare Primă</div>
                          <div className="font-semibold text-white mt-0.5">
                            {p.premiumAmount !== undefined ? (
                              <span>
                                {p.premiumAmount.toLocaleString("ro-RO")} {p.currency}
                              </span>
                            ) : (
                              <span className="text-zinc-500 italic">Nespecificată</span>
                            )}
                          </div>
                          <div className="text-[10px] text-zinc-500 capitalize">{p.paymentFrequency || "Frecvență n/a"}</div>
                        </div>

                        <div>
                          <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Valabilitate</div>
                          <div
                            className={`font-semibold mt-0.5 ${
                              expiry.status === "expired"
                                ? "text-red-400"
                                : expiry.status === "urgent_7_days"
                                ? "text-amber-400"
                                : "text-zinc-800"
                            }`}
                          >
                            {p.expiryDate || "Dată lipsă"}
                          </div>
                          <div className="text-[10px] text-zinc-500">{expiry.labelRo}</div>
                        </div>

                        <div>
                          <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Limită Despăgubire</div>
                          <div className="text-zinc-600 font-medium mt-0.5 truncate">
                            {p.coverageLimit ? `${p.coverageLimit.toLocaleString("ro-RO")} ${p.limitCurrency}` : p.limitBasis || "Nespecificată"}
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Franșiză</div>
                          <div className="text-zinc-600 font-medium mt-0.5 truncate">
                            {p.deductible !== undefined ? `${p.deductible.toLocaleString("ro-RO")} ${p.deductibleCurrency}` : p.deductibleBasis || "Fără franșiză / nespecificată"}
                          </div>
                        </div>
                      </div>

                      {/* Missing warnings */}
                      {missing.length > 0 && (
                        <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-800 flex items-start gap-2 mb-3">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                          <div>
                            <span className="font-semibold">Detalii de completat: </span>
                            <span>{missing.map((m) => m.labelRo).join(", ")}</span>
                          </div>
                        </div>
                      )}

                      {/* Notes snippet */}
                      {p.notes && (
                        <p className="text-[11px] text-zinc-500 line-clamp-2 italic mb-3">
                          &ldquo;{p.notes}&rdquo;
                        </p>
                      )}
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-3 border-t border-zinc-200/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setViewingPolicy(p)}
                        className="text-xs text-zinc-500 hover:text-white inline-flex items-center gap-1 font-medium"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Detalii complete</span>
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg bg-zinc-800 text-zinc-600 hover:text-white hover:bg-zinc-700 transition-colors"
                          title="Editează polița"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setPolicyToDelete(p)}
                          className="p-1.5 rounded-lg bg-zinc-800 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Șterge polița"
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
              <Layers className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-zinc-600">Nicio poliță găsită</h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                Nu există nicio înregistrare care să corespundă criteriilor de filtrare selectate sau portofoliul este gol.
              </p>
              <Button onClick={() => handleOpenAdd()} size="sm" className="mt-4 bg-blue-600 hover:bg-blue-500 text-xs">
                <Plus className="w-3.5 h-3.5 mr-1" />
                Adaugă prima poliță
              </Button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ALERTS & OVERLAPS */}
      {activeTab === "alerts" && (
        <div className="space-y-6">
          {/* Overlaps Section */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-zinc-900">Analiză Suprapuneri de Perioadă în Aceeași Categorie</h3>
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed">
              Verifică dacă ai înregistrat două sau mai multe polițe în aceeași categorie a căror perioadă de valabilitate se suprapune calendaristic. Acest lucru te ajută să clarifici dacă obiectele asigurate sunt distincte (ex: două mașini) sau dacă există clauze redundante.
            </p>

            {overlaps.length > 0 ? (
              <div className="space-y-3">
                {overlaps.map((o, idx) => {
                  const catInfo = CATEGORY_INFO[o.category];

                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="font-semibold text-amber-800 flex items-center gap-2">
                          <span>Suprapunere în categoria: {catInfo.labelRo}</span>
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-[10px] font-mono">
                            {o.overlapPeriod}
                          </span>
                        </div>
                        <p className="text-zinc-600 mt-1">
                          Polițele <strong className="text-white">&ldquo;{o.policy1.nickname}&rdquo;</strong> și <strong className="text-white">&ldquo;{o.policy2.nickname}&rdquo;</strong> au intervale de valabilitate paralele.
                        </p>
                        <p className="text-zinc-500 text-[11px] mt-0.5">
                          💡 Recomandare: Confirmă dacă acestea protejează bunuri diferite sau dacă una este o extensie a celeilalte.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setViewingPolicy(o.policy1)}
                          className="text-xs border-zinc-300 bg-zinc-800"
                        >
                          Polița 1
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setViewingPolicy(o.policy2)}
                          className="text-xs border-zinc-300 bg-zinc-800"
                        >
                          Polița 2
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Nu au fost detectate suprapuneri temporale între polițele din aceeași categorie cu date complete.</span>
              </div>
            )}
          </div>

          {/* Missing Fields List */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-blue-400" />
              <h3 className="text-base font-bold text-zinc-900">Inventar Informații Incomplete pe Polițe</h3>
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed">
              O documentație completă îți permite să compari mai ușor ofertele la reînnoire și să transmiți rapid datele către un consilier.
            </p>

            {policies.filter((p) => getMissingPolicyFields(p).length > 0).length > 0 ? (
              <div className="space-y-3">
                {policies
                  .filter((p) => getMissingPolicyFields(p).length > 0)
                  .map((p) => {
                    const missing = getMissingPolicyFields(p);

                    return (
                      <div
                        key={p.id}
                        className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="font-semibold text-zinc-800">{p.nickname}</div>
                          <div className="text-zinc-500 text-[11px] mt-0.5">
                            Câmpuri necompletate: <span className="text-amber-400">{missing.map((m) => m.labelRo).join(", ")}</span>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          onClick={() => handleOpenEdit(p)}
                          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-800 text-xs shrink-0"
                        >
                          <Edit3 className="w-3.5 h-3.5 mr-1" />
                          Completează
                        </Button>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Toate polițele înregistrate au setul principal de informații completat!</span>
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
              <h3 className="text-lg font-bold text-zinc-900">Export & Backup Portofoliu</h3>
              <p className="text-xs text-zinc-500 mt-1">
                Generează un document PDF tipărit pentru dosarul personal sau salvează un fișier JSON pentru a-ți transfera datele în siguranță între dispozitive.
              </p>
            </div>

            {/* Notes Section */}
            <div>
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2">
                Notițe Generale Portofoliu / Obiective Revizuire
              </label>
              <textarea
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="Exemplu: Vreau să reduc cheltuiala anuală totală cu 10% și să verific dacă acoperirea CASCO este competitivă..."
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
                    Include inventarul complet al polițelor, avertizările de expirare și disclaimerul legal.
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
                    Descarcă un fișier JSON securizat local pentru a reîncărca oricând datele înapoi.
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
                    Încarcă un backup JSON salvat anterior pentru a continua organizarea.
                  </p>
                </div>
                <label className="mt-4 inline-flex items-center justify-center rounded-md text-xs font-medium border border-zinc-300 bg-zinc-800 px-4 py-2 text-zinc-800 hover:bg-zinc-700 cursor-pointer">
                  <Upload className="w-3.5 h-3.5 mr-1.5" />
                  <span>Încarcă Fișier</span>
                  <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
                </label>
              </div>
            </div>

            {/* Privacy & Reset bar */}
            <div className="pt-6 border-t border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Datele sunt prelucrate 100% în memoria browserului și nu părăsesc dispozitivul tău.</span>
              </div>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => setIsResetConfirmOpen(true)}
                className="text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                Resetează Portofoliul
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT POLICY */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-zinc-200 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                    {editingPolicy ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                  <h3 className="text-base font-bold text-zinc-900">
                    {editingPolicy ? "Editează Polița" : "Adaugă Poliță Nouă"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-zinc-500 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSavePolicy} className="p-6 overflow-y-auto space-y-4 text-xs">
                {/* Nickname & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-600 font-semibold mb-1">
                      Denumire Poliță (Nickname) <span className="text-red-400">*</span>
                    </label>
                    <Input
                      required
                      value={formData.nickname || ""}
                      onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                      placeholder="Ex: CASCO Mașină Familie, RCA BMW..."
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-semibold mb-1">
                      Categorie de Asigurare <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={formData.category || "rca"}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as PortfolioCategory })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-800 focus:outline-none focus:border-blue-500"
                    >
                      {allCategories.map((c) => (
                        <option key={c} value={c}>
                          {CATEGORY_INFO[c].labelRo}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Insurer & Product */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Companie Asigurare (Opțional)</label>
                    <Input
                      value={formData.insurer || ""}
                      onChange={(e) => setFormData({ ...formData, insurer: e.target.value })}
                      placeholder="Ex: Allianz-Țiriac, Omniasig, Generali..."
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Denumire Produs / Pachet</label>
                    <Input
                      value={formData.productName || ""}
                      onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                      placeholder="Ex: CASCO All Risks, Confort Extra..."
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Data Început Valabilitate</label>
                    <Input
                      type="date"
                      value={formData.startDate || ""}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Data Expirării</label>
                    <Input
                      type="date"
                      value={formData.expiryDate || ""}
                      onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Premium & Frequency */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Valoare Primă</label>
                    <Input
                      type="number"
                      step="any"
                      value={formData.premiumAmount !== undefined ? formData.premiumAmount : ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          premiumAmount: e.target.value === "" ? undefined : parseFloat(e.target.value),
                        })
                      }
                      placeholder="Ex: 1200"
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Monedă</label>
                    <select
                      value={formData.currency || "EUR"}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value as CurrencyCode })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-800 focus:outline-none focus:border-blue-500"
                    >
                      <option value="RON">RON</option>
                      <option value="EUR">EUR</option>
                      <option value="USD">USD</option>
                      <option value="GBP">GBP</option>
                      <option value="OTHER">Altă monedă</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Frecvență Plată</label>
                    <select
                      value={formData.paymentFrequency || "annual"}
                      onChange={(e) => setFormData({ ...formData, paymentFrequency: e.target.value as PaymentFrequency })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-800 focus:outline-none focus:border-blue-500"
                    >
                      <option value="annual">Anuală (1 rată)</option>
                      <option value="semiannual">Semestrială (2 rate)</option>
                      <option value="quarterly">Trimestrială (4 rate)</option>
                      <option value="monthly">Lunară (12 rate)</option>
                      <option value="single_premium">Primă unică</option>
                      <option value="other">Altă frecvență</option>
                    </select>
                  </div>
                </div>

                {/* Coverage Limit & Deductible */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-zinc-600 font-medium">Limită Despăgubire / Bază</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        step="any"
                        placeholder="Sumă (ex: 200000)"
                        value={formData.coverageLimit !== undefined ? formData.coverageLimit : ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            coverageLimit: e.target.value === "" ? undefined : parseFloat(e.target.value),
                          })
                        }
                        className="bg-zinc-50 border-zinc-200 text-xs text-white"
                      />
                      <Input
                        placeholder="Bază (ex: De nou)"
                        value={formData.limitBasis || ""}
                        onChange={(e) => setFormData({ ...formData, limitBasis: e.target.value })}
                        className="bg-zinc-50 border-zinc-200 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-zinc-600 font-medium">Franșiză / Condiție</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        step="any"
                        placeholder="Valoare (ex: 100)"
                        value={formData.deductible !== undefined ? formData.deductible : ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            deductible: e.target.value === "" ? undefined : parseFloat(e.target.value),
                          })
                        }
                        className="bg-zinc-50 border-zinc-200 text-xs text-white"
                      />
                      <Input
                        placeholder="Bază (ex: Pe eveniment)"
                        value={formData.deductibleBasis || ""}
                        onChange={(e) => setFormData({ ...formData, deductibleBasis: e.target.value })}
                        className="bg-zinc-50 border-zinc-200 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Declared Protection & Exclusions */}
                <div>
                  <label className="block text-zinc-600 font-medium mb-1">Protecție Declarată / Obiect Asigurat</label>
                  <Input
                    value={formData.declaredProtection || ""}
                    onChange={(e) => setFormData({ ...formData, declaredProtection: e.target.value })}
                    placeholder="Ex: Apartament 3 camere, 95mp + bunuri casnice..."
                    className="bg-zinc-50 border-zinc-200 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-600 font-medium mb-1">Excluderi sau Restricții Notate</label>
                  <Input
                    value={formData.exclusions || ""}
                    onChange={(e) => setFormData({ ...formData, exclusions: e.target.value })}
                    placeholder="Ex: Fără asistență rutieră externă, excludere daune prin îngheț..."
                    className="bg-zinc-50 border-zinc-200 text-xs text-white"
                  />
                </div>

                {/* Review Status & Notes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Status Revizuire</label>
                    <select
                      value={formData.reviewStatus || "needs_review"}
                      onChange={(e) => setFormData({ ...formData, reviewStatus: e.target.value as PortfolioReviewStatus })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-800 focus:outline-none focus:border-blue-500"
                    >
                      <option value="needs_review">Necesită revizuire</option>
                      <option value="info_requested">Informații solicitate</option>
                      <option value="reviewed_by_user">Revizuit de utilizator</option>
                      <option value="advisor_pending">Clarificare consilier în așteptare</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Data Ultimei Revizuiri</label>
                    <Input
                      type="date"
                      value={formData.lastReviewedDate || ""}
                      onChange={(e) => setFormData({ ...formData, lastReviewedDate: e.target.value })}
                      className="bg-zinc-50 border-zinc-200 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-600 font-medium mb-1">Notă Personală</label>
                  <Input
                    value={formData.notes || ""}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Observații proprii, număr de telefon asistență, clauze speciale..."
                    className="bg-zinc-50 border-zinc-200 text-xs text-white"
                  />
                </div>

                {/* Footer Submit */}
                <div className="pt-4 border-t border-zinc-200 flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddModalOpen(false)}
                    className="border-zinc-300 text-xs"
                  >
                    Anulează
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs">
                    {editingPolicy ? "Salvează Modificările" : "Adaugă Polița"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: VIEW POLICY DETAILS */}
      <AnimatePresence>
        {viewingPolicy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-zinc-200 rounded-2xl w-full max-w-xl flex flex-col overflow-hidden shadow-2xl text-xs"
            >
              <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-zinc-800">
                    {getCategoryIcon(viewingPolicy.category)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900">{viewingPolicy.nickname}</h3>
                    <div className="text-[11px] text-zinc-500">
                      {CATEGORY_INFO[viewingPolicy.category].labelRo}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setViewingPolicy(null)}
                  className="text-zinc-500 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-3 p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase">Asigurator</div>
                    <div className="text-zinc-800 font-medium mt-0.5">{viewingPolicy.insurer || "Nespecificat"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase">Produs</div>
                    <div className="text-zinc-800 font-medium mt-0.5">{viewingPolicy.productName || "Nespecificat"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase">Perioadă</div>
                    <div className="text-zinc-800 font-medium mt-0.5">
                      {viewingPolicy.startDate || "Nedefinit"} → {viewingPolicy.expiryDate || "Nedefinit"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase">Status Expirare</div>
                    <div className="text-zinc-800 font-medium mt-0.5">
                      {getPolicyExpiryStatus(viewingPolicy.expiryDate).labelRo}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase">Primă Anuală / Plată</div>
                    <div className="text-zinc-800 font-medium mt-0.5">
                      {viewingPolicy.premiumAmount !== undefined
                        ? `${viewingPolicy.premiumAmount.toLocaleString("ro-RO")} ${viewingPolicy.currency} (${viewingPolicy.paymentFrequency || "frecvență n/a"})`
                        : "Nespecificată"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase">Status Revizuire</div>
                    <div className="text-zinc-800 font-medium mt-0.5">
                      {REVIEW_STATUS_INFO[viewingPolicy.reviewStatus].labelRo}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase">Limită Acoperire</div>
                    <div className="text-zinc-800 font-medium mt-0.5">
                      {viewingPolicy.coverageLimit
                        ? `${viewingPolicy.coverageLimit.toLocaleString("ro-RO")} ${viewingPolicy.limitCurrency || ""}`
                        : viewingPolicy.limitBasis || "Nespecificată"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase">Franșiză</div>
                    <div className="text-zinc-800 font-medium mt-0.5">
                      {viewingPolicy.deductible !== undefined
                        ? `${viewingPolicy.deductible.toLocaleString("ro-RO")} ${viewingPolicy.deductibleCurrency || ""}`
                        : viewingPolicy.deductibleBasis || "Fără franșiză / nespecificată"}
                    </div>
                  </div>
                </div>

                {viewingPolicy.declaredProtection && (
                  <div>
                    <div className="text-zinc-500 font-semibold mb-1">Protecție Declarată</div>
                    <div className="p-2.5 rounded-lg bg-zinc-50 text-zinc-600 border border-zinc-200">
                      {viewingPolicy.declaredProtection}
                    </div>
                  </div>
                )}

                {viewingPolicy.exclusions && (
                  <div>
                    <div className="text-zinc-500 font-semibold mb-1">Excluderi & Restricții Notate</div>
                    <div className="p-2.5 rounded-lg bg-zinc-50 text-zinc-600 border border-zinc-200">
                      {viewingPolicy.exclusions}
                    </div>
                  </div>
                )}

                {viewingPolicy.notes && (
                  <div>
                    <div className="text-zinc-500 font-semibold mb-1">Notițe Utilizator</div>
                    <div className="p-2.5 rounded-lg bg-zinc-50 text-zinc-600 border border-zinc-200 italic">
                      &ldquo;{viewingPolicy.notes}&rdquo;
                    </div>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 border-t border-zinc-200 flex items-center justify-between">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setPolicyToDelete(viewingPolicy);
                  }}
                  className="bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs"
                >
                  Șterge Polița
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const p = viewingPolicy;
                      setViewingPolicy(null);
                      handleOpenEdit(p);
                    }}
                    className="border-zinc-300 text-xs"
                  >
                    Editează
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setViewingPolicy(null)}
                    className="bg-zinc-800 hover:bg-zinc-700 text-xs"
                  >
                    Închide
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: CONFIRM DELETE */}
      <AnimatePresence>
        {policyToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-zinc-200 rounded-2xl w-full max-w-md p-6 text-xs shadow-2xl"
            >
              <div className="flex items-center gap-3 text-red-400 mb-3">
                <Trash2 className="w-5 h-5" />
                <h3 className="text-sm font-bold text-zinc-900">Confirmă Ștergerea Poliței</h3>
              </div>
              <p className="text-zinc-600 mb-4">
                Sigur dorești să ștergi înregistrarea <strong className="text-white">&ldquo;{policyToDelete.nickname}&rdquo;</strong> din portofoliu?
              </p>
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPolicyToDelete(null)}
                  className="border-zinc-300 text-xs"
                >
                  Anulează
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeletePolicy(policyToDelete)}
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
                <h3 className="text-sm font-bold text-zinc-900">Resetare Completă Portofoliu</h3>
              </div>
              <p className="text-zinc-600 mb-4 leading-relaxed">
                Această acțiune va șterge toate polițele introduse în această sesiune de navigare. Asigură-te că ai descărcat un raport PDF sau un export JSON înainte de a reseta.
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
