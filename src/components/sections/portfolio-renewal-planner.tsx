"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Plus,
  Trash2,
  Edit3,
  Download,
  Upload,
  CalendarDays,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  Car,
  HeartPulse,
  Briefcase,
  Layers,
  FileText,
  Lock,
  ArrowRight,
  Sparkles,
  RotateCcw,
  X,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PolicyEntry,
  PolicyCategory,
  RenewalWindow,
  getRenewalWindow,
  getDaysUntilExpiry,
  CATEGORY_LABELS_RO,
  CATEGORY_LABELS_EN,
  generateIcsCalendar,
  validateImportedPortfolio,
} from "@/lib/portfolio-calendar";
import Link from "next/link";

const DEFAULT_POLICIES: PolicyEntry[] = [
  {
    id: "demo_casco_1",
    nickname: "CASCO Auto Principal (BMW)",
    category: "casco",
    insurer: "Generali Asigurări",
    policyNumber: "RO-CASCO-2026-9921",
    startDate: "2025-11-15",
    expiryDate: "2026-11-15",
    premiumAmount: 1450,
    currency: "EUR",
    paymentFrequency: "annual",
    notes: "Acoperire All-Risk completă, asistență extinsă.",
    requestReview: false,
    createdAt: "2026-09-01T10:00:00.000Z",
    updatedAt: "2026-09-01T10:00:00.000Z",
  },
  {
    id: "demo_home_1",
    nickname: "Locuință & Bunuri (Apartament)",
    category: "home",
    insurer: "Generali Asigurări",
    policyNumber: "RO-HOME-2026-1104",
    startDate: "2025-12-01",
    expiryDate: "2026-12-01",
    premiumAmount: 420,
    currency: "EUR",
    paymentFrequency: "annual",
    notes: "Clădire + conținut, clauză furt și inundație.",
    requestReview: false,
    createdAt: "2026-09-01T10:00:00.000Z",
    updatedAt: "2026-09-01T10:00:00.000Z",
  },
];

export function PortfolioRenewalPlanner() {
  const [lang, setLang] = useState<"ro" | "en">("ro");
  const [policies, setPolicies] = useState<PolicyEntry[]>(DEFAULT_POLICIES);
  const [isLoaded, setIsLoaded] = useState(true);

  // Filters & Sorting
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedWindow, setSelectedWindow] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"date_asc" | "date_desc" | "name">("date_asc");

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<PolicyEntry | null>(null);
  const [checklistPolicy, setChecklistPolicy] = useState<PolicyEntry | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // Import State
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const isRo = lang === "ro";

  const persistPolicies = (updated: PolicyEntry[]) => {
    setPolicies(updated);
  };

  const handleClearAll = () => {
    persistPolicies([]);
    setIsDeleteConfirmOpen(false);
  };

  const handleDeletePolicy = (id: string) => {
    const next = policies.filter((p) => p.id !== id);
    persistPolicies(next);
  };

  // Form State for Add / Edit
  const [formNickname, setFormNickname] = useState("");
  const [formCategory, setFormCategory] = useState<PolicyCategory>("rca");
  const [formInsurer, setFormInsurer] = useState("");
  const [formPolicyNumber, setFormPolicyNumber] = useState("");
  const [formExpiryDate, setFormExpiryDate] = useState("");
  const [formPremium, setFormPremium] = useState("");
  const [formCurrency, setFormCurrency] = useState<"RON" | "EUR">("RON");
  const [formFrequency, setFormFrequency] = useState<"annual" | "semiannual" | "quarterly" | "monthly">("annual");
  const [formNotes, setFormNotes] = useState("");
  const [formRequestReview, setFormRequestReview] = useState(false);

  const openAddModal = () => {
    setEditingPolicy(null);
    setFormNickname("");
    setFormCategory("rca");
    setFormInsurer("");
    setFormPolicyNumber("");
    setFormExpiryDate("");
    setFormPremium("");
    setFormCurrency("RON");
    setFormFrequency("annual");
    setFormNotes("");
    setFormRequestReview(false);
    setIsAddModalOpen(true);
  };

  const openEditModal = (p: PolicyEntry) => {
    setEditingPolicy(p);
    setFormNickname(p.nickname);
    setFormCategory(p.category);
    setFormInsurer(p.insurer);
    setFormPolicyNumber(p.policyNumber || "");
    setFormExpiryDate(p.expiryDate);
    setFormPremium(p.premiumAmount ? String(p.premiumAmount) : "");
    setFormCurrency(p.currency || "RON");
    setFormFrequency(p.paymentFrequency || "annual");
    setFormNotes(p.notes || "");
    setFormRequestReview(Boolean(p.requestReview));
    setIsAddModalOpen(true);
  };

  const handleSavePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNickname || !formExpiryDate) return;

    const premiumNum = parseFloat(formPremium);
    const validPremium = !isNaN(premiumNum) && premiumNum >= 0 ? premiumNum : undefined;

    const entry: PolicyEntry = {
      id: editingPolicy ? editingPolicy.id : `pol_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      nickname: formNickname.trim(),
      category: formCategory,
      insurer: formInsurer.trim(),
      policyNumber: formPolicyNumber.trim() || undefined,
      expiryDate: formExpiryDate,
      premiumAmount: validPremium,
      currency: formCurrency,
      paymentFrequency: formFrequency,
      notes: formNotes.trim() || undefined,
      requestReview: formRequestReview,
      createdAt: editingPolicy ? editingPolicy.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editingPolicy) {
      const next = policies.map((p) => (p.id === editingPolicy.id ? entry : p));
      persistPolicies(next);
    } else {
      persistPolicies([entry, ...policies]);
    }

    setIsAddModalOpen(false);
  };

  // Export JSON
  const handleExportJson = () => {
    const dataStr = JSON.stringify({ version: "1.0", exportedAt: new Date().toISOString(), policies }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portofoliu-asigurari-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export ICS
  const handleExportIcs = () => {
    const icsContent = generateIcsCalendar(policies, lang);
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reinnoiri-asigurari-${new Date().toISOString().slice(0, 10)}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON handler
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const res = validateImportedPortfolio(text);
      if (res.isValid && res.policies) {
        persistPolicies(res.policies);
        setImportStatus(isRo ? `Importat cu succes: ${res.policies.length} polițe.` : `Successfully imported: ${res.policies.length} policies.`);
        setTimeout(() => setImportStatus(null), 4000);
      } else {
        setImportStatus(res.error || "Fișier JSON neconform.");
        setTimeout(() => setImportStatus(null), 4000);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Derived Counts & Calculations
  const urgentCount = policies.filter((p) => getRenewalWindow(p.expiryDate) === "urgent_7_days").length;
  const monthCount = policies.filter((p) => getRenewalWindow(p.expiryDate) === "upcoming_30_days").length;
  const expiredCount = policies.filter((p) => getRenewalWindow(p.expiryDate) === "expired").length;

  const totalRonPremium = policies
    .filter((p) => p.currency === "RON" && typeof p.premiumAmount === "number")
    .reduce((acc, p) => acc + (p.premiumAmount || 0), 0);

  const totalEurPremium = policies
    .filter((p) => p.currency === "EUR" && typeof p.premiumAmount === "number")
    .reduce((acc, p) => acc + (p.premiumAmount || 0), 0);

  // Filtered and sorted list
  const filteredPolicies = policies
    .filter((p) => (selectedCategory === "all" ? true : p.category === selectedCategory))
    .filter((p) => (selectedWindow === "all" ? true : getRenewalWindow(p.expiryDate) === selectedWindow))
    .sort((a, b) => {
      if (sortOrder === "name") return a.nickname.localeCompare(b.nickname);
      const timeA = new Date(a.expiryDate).getTime() || 0;
      const timeB = new Date(b.expiryDate).getTime() || 0;
      return sortOrder === "date_asc" ? timeA - timeB : timeB - timeA;
    });

  return (
    <div className="w-full space-y-12 max-w-5xl mx-auto">
      {/* 1. TOP STATS CARDS & CONTROLS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold">Total Polițe</span>
          <div className="text-2xl sm:text-3xl font-heading font-black text-white">{policies.length}</div>
          <span className="text-[10px] text-zinc-500">Înregistrate local</span>
        </div>

        <div className={`p-5 rounded-2xl border space-y-1 ${urgentCount > 0 ? "bg-rose-500/10 border-rose-500/30 text-rose-400" : "bg-zinc-900/60 border-zinc-800 text-zinc-300"}`}>
          <span className="text-[11px] uppercase tracking-wider font-bold">Expiră în &le; 7 Zile</span>
          <div className="text-2xl sm:text-3xl font-heading font-black">{urgentCount}</div>
          <span className="text-[10px] opacity-80">Acțiune urgentă</span>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1 text-amber-400">
          <span className="text-[11px] uppercase tracking-wider font-bold">Expiră în 30 Zile</span>
          <div className="text-2xl sm:text-3xl font-heading font-black">{monthCount}</div>
          <span className="text-[10px] text-zinc-500">Faza de ofertare</span>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1 text-zinc-400">
          <span className="text-[11px] uppercase tracking-wider font-bold">Prime Totale / An</span>
          <div className="text-sm sm:text-base font-heading font-bold text-white truncate">
            {totalRonPremium > 0 && `${totalRonPremium.toLocaleString("ro-RO")} RON`}
            {totalRonPremium > 0 && totalEurPremium > 0 && " • "}
            {totalEurPremium > 0 && `${totalEurPremium.toLocaleString("ro-RO")} EUR`}
            {totalRonPremium === 0 && totalEurPremium === 0 && "—"}
          </div>
          <span className="text-[10px] text-zinc-500">Calcul orientativ</span>
        </div>
      </div>

      {/* 2. MAIN TOOLBAR: ADD, EXPORT, IMPORT, CLEAR */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-5 rounded-3xl bg-zinc-900/80 border border-zinc-800">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            onClick={openAddModal}
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 px-5 flex items-center gap-1.5 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>{isRo ? "Adaugă Poliță" : "Add Policy"}</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleExportIcs}
            disabled={policies.length === 0}
            className="rounded-full border-zinc-800 text-zinc-300 text-xs h-11 px-4 flex items-center gap-1.5"
          >
            <CalendarDays className="w-4 h-4 text-emerald-400" />
            <span>Export Calendar .ICS</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleExportJson}
            disabled={policies.length === 0}
            className="rounded-full border-zinc-800 text-zinc-300 text-xs h-11 px-4 flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-blue-400" />
            <span>Backup JSON</span>
          </Button>

          <label className="cursor-pointer rounded-full border border-zinc-800 hover:bg-zinc-800 text-zinc-300 text-xs h-11 px-4 inline-flex items-center gap-1.5 transition-colors">
            <Upload className="w-4 h-4 text-amber-400" />
            <span>Import JSON</span>
            <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
          </label>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3 text-xs border-t md:border-t-0 pt-3 md:pt-0 border-zinc-800">
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

          {policies.length > 0 && (
            <button
              type="button"
              onClick={() => setIsDeleteConfirmOpen(true)}
              className="text-zinc-500 hover:text-rose-400 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isRo ? "Șterge tot" : "Clear all"}</span>
            </button>
          )}
        </div>
      </div>

      {importStatus && (
        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-400" />
          <span>{importStatus}</span>
        </div>
      )}

      {/* 3. FILTERS BAR */}
      {policies.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-9 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-blue-500"
            >
              <option value="all">{isRo ? "Toate Categoriile" : "All Categories"}</option>
              {Object.entries(isRo ? CATEGORY_LABELS_RO : CATEGORY_LABELS_EN).map(([cat, lbl]) => (
                <option key={cat} value={cat}>
                  {lbl}
                </option>
              ))}
            </select>

            <select
              value={selectedWindow}
              onChange={(e) => setSelectedWindow(e.target.value)}
              className="h-9 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-blue-500"
            >
              <option value="all">{isRo ? "Toate Orizonturile" : "All Windows"}</option>
              <option value="urgent_7_days">{isRo ? "Urgent (&le; 7 zile)" : "Urgent (&le; 7 days)"}</option>
              <option value="upcoming_30_days">{isRo ? "8–30 Zile" : "8–30 Days"}</option>
              <option value="upcoming_60_days">{isRo ? "31–60 Zile" : "31–60 Days"}</option>
              <option value="future_60_plus">{isRo ? "> 60 Zile" : "> 60 Days"}</option>
              <option value="expired">{isRo ? "Expirate" : "Expired"}</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-500">{isRo ? "Sortare:" : "Sort:"}</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "date_asc" | "date_desc" | "name")}
              className="h-9 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-blue-500"
            >
              <option value="date_asc">{isRo ? "Dată Expirare (Apropiată)" : "Expiry Date (Nearest)"}</option>
              <option value="date_desc">{isRo ? "Dată Expirare (Îndepărtată)" : "Expiry Date (Furthest)"}</option>
              <option value="name">{isRo ? "Denumire (A-Z)" : "Name (A-Z)"}</option>
            </select>
          </div>
        </div>
      )}

      {/* 4. POLICY LIST OR EMPTY STATE */}
      {filteredPolicies.length === 0 ? (
        <div className="p-12 sm:p-16 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 text-center space-y-4">
          <div className="w-14 h-14 rounded-3xl bg-zinc-900 border border-zinc-800 text-zinc-500 flex items-center justify-center mx-auto">
            <CalendarIcon className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-lg font-heading font-bold text-white">
              {policies.length === 0
                ? isRo ? "Nu ai adăugat încă nicio poliță" : "No policies added yet"
                : isRo ? "Nicio poliță conform filtrelor selectate" : "No policies match the selected filter"}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {policies.length === 0
                ? isRo
                  ? "Organizează-ți polițele RCA, CASCO, Locuință, Sănătate sau Viață pentru a primi alerte de reînnoire din timp."
                  : "Organize your RCA, CASCO, Home, Health or Life policies to track renewal dates effortlessly."
                : isRo ? "Încearcă să resetezi filtrele pentru a vizualiza toate polițele." : "Try resetting the filters to view all policies."}
            </p>
          </div>
          {policies.length === 0 && (
            <Button
              type="button"
              onClick={openAddModal}
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 px-6"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              {isRo ? "Adaugă Prima Poliță" : "Add First Policy"}
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPolicies.map((p) => {
            const daysLeft = getDaysUntilExpiry(p.expiryDate);
            const windowType = getRenewalWindow(p.expiryDate);

            return (
              <div
                key={p.id}
                className="p-5 sm:p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-900 text-blue-400 border border-zinc-800">
                      {isRo ? CATEGORY_LABELS_RO[p.category] : CATEGORY_LABELS_EN[p.category]}
                    </span>

                    {windowType === "expired" && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30">
                        {isRo ? "Expirată" : "Expired"}
                      </span>
                    )}

                    {windowType === "urgent_7_days" && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
                        {isRo ? `Expiră în ${daysLeft} zile` : `Expires in ${daysLeft} days`}
                      </span>
                    )}

                    {windowType === "upcoming_30_days" && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        {isRo ? `Reînnoire în ${daysLeft} zile` : `Renews in ${daysLeft} days`}
                      </span>
                    )}

                    {windowType === "upcoming_60_days" && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                        {isRo ? `${daysLeft} zile rămase` : `${daysLeft} days left`}
                      </span>
                    )}

                    {p.insurer && (
                      <span className="text-xs text-zinc-400">
                        • {p.insurer}
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-heading font-bold text-white">
                    {p.nickname}
                  </h4>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                    <span>
                      {isRo ? "Dată Expirare:" : "Expiry Date:"} <strong className="text-zinc-200">{p.expiryDate}</strong>
                    </span>
                    {p.premiumAmount && (
                      <span>
                        {isRo ? "Primă:" : "Premium:"} <strong className="text-zinc-200">{p.premiumAmount} {p.currency || "RON"}</strong>
                      </span>
                    )}
                    {p.policyNumber && (
                      <span>
                        Nr: <span className="font-mono text-zinc-400">{p.policyNumber}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-zinc-800/80 w-full md:w-auto justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setChecklistPolicy(p)}
                    className="rounded-xl border-zinc-800 hover:bg-zinc-900 text-zinc-300 text-xs h-9 px-3"
                  >
                    <FileText className="w-3.5 h-3.5 mr-1 text-blue-400" />
                    <span>Checklist</span>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => openEditModal(p)}
                    className="rounded-xl border-zinc-800 hover:bg-zinc-900 text-zinc-300 text-xs h-9 px-3"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => handleDeletePolicy(p.id)}
                    className="rounded-xl text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 text-xs h-9 px-2.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. PRIVACY NOTICE & ADVISORY CALLOUT */}
      <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-3 text-xs text-zinc-400">
        <div className="flex items-center gap-2 text-zinc-300 font-bold">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>Garanția Confidențialității Locale</span>
        </div>
        <p className="leading-relaxed">
          Polițele și datele introduse sunt salvate <strong>strict în memoria locală a browserului tău</strong> (Local Storage). Nu sunt transmise către servere externe sau baze de date. Dacă ștergi memoria cache a browserului, înregistrările vor fi eliminate (folosește butonul <em>Backup JSON</em> pentru păstrare sigură).
        </p>
        <div className="pt-2 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>Dorești un audit independent al termenilor înainte de semnare?</span>
          <Link href="/verifica-polita" className="text-blue-400 hover:text-blue-300 underline underline-offset-4 inline-flex items-center gap-1 font-semibold">
            <span>Trimite o solicitare de audit &rarr;</span>
          </Link>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT POLICY */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg p-6 sm:p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-2xl relative space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <h3 className="text-lg font-heading font-bold text-white">
                  {editingPolicy ? (isRo ? "Editează Polița" : "Edit Policy") : (isRo ? "Adaugă Poliță Nouă" : "Add New Policy")}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900 border border-zinc-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSavePolicy} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-medium">Denumire / Nickname *</label>
                  <Input
                    placeholder="Ex: BMW CASCO, Apartament Victoriei, RCA Ford..."
                    value={formNickname}
                    onChange={(e) => setFormNickname(e.target.value)}
                    required
                    className="h-11 bg-zinc-900 border-zinc-800 text-white rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">Categorie *</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as PolicyCategory)}
                      className="w-full h-11 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-blue-500"
                    >
                      {Object.entries(isRo ? CATEGORY_LABELS_RO : CATEGORY_LABELS_EN).map(([cat, lbl]) => (
                        <option key={cat} value={cat}>
                          {lbl}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">Companie Asigurare</label>
                    <Input
                      placeholder="Ex: Generali, Allianz, Groupama..."
                      value={formInsurer}
                      onChange={(e) => setFormInsurer(e.target.value)}
                      className="h-11 bg-zinc-900 border-zinc-800 text-white rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">Dată Expirare / Reînnoire *</label>
                    <Input
                      type="date"
                      value={formExpiryDate}
                      onChange={(e) => setFormExpiryDate(e.target.value)}
                      required
                      className="h-11 bg-zinc-900 border-zinc-800 text-white rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">Număr Poliță (Opțional)</label>
                    <Input
                      placeholder="Ex: RO/01/2026/..."
                      value={formPolicyNumber}
                      onChange={(e) => setFormPolicyNumber(e.target.value)}
                      className="h-11 bg-zinc-900 border-zinc-800 text-white rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">Valoare Primă (Opțional)</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Ex: 1450"
                        value={formPremium}
                        onChange={(e) => setFormPremium(e.target.value)}
                        className="h-11 bg-zinc-900 border-zinc-800 text-white rounded-xl flex-1"
                      />
                      <select
                        value={formCurrency}
                        onChange={(e) => setFormCurrency(e.target.value as "RON" | "EUR")}
                        className="h-11 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
                      >
                        <option value="RON">RON</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">Frecvență Plată</label>
                    <select
                      value={formFrequency}
                      onChange={(e) => setFormFrequency(e.target.value as "annual" | "semiannual" | "quarterly" | "monthly")}
                      className="w-full h-11 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
                    >
                      <option value="annual">{isRo ? "Anuală (Integral)" : "Annual"}</option>
                      <option value="semiannual">{isRo ? "Semestrială (2 rate)" : "Semi-Annual"}</option>
                      <option value="quarterly">{isRo ? "Trimestrială (4 rate)" : "Quarterly"}</option>
                      <option value="monthly">{isRo ? "Lunară" : "Monthly"}</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-medium">Notițe Personale (Opțional)</label>
                  <Input
                    placeholder="Ex: Franșiză 150 EUR, include asistență rutieră extinsă..."
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    className="h-11 bg-zinc-900 border-zinc-800 text-white rounded-xl"
                  />
                </div>

                <div className="pt-4 border-t border-zinc-800 flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 rounded-xl border-zinc-800 text-zinc-300 h-11"
                  >
                    {isRo ? "Anulează" : "Cancel"}
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold h-11"
                  >
                    {isRo ? "Salvează Polița" : "Save Policy"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* MODAL: RENEWAL CHECKLIST */}
      {/* ======================================================== */}
      <AnimatePresence>
        {checklistPolicy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg p-6 sm:p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-2xl relative space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider block">
                    {isRo ? "PREGĂTIRE REÎNNOIRE CONTRACT" : "RENEWAL PREPARATION CHECKLIST"}
                  </span>
                  <h3 className="text-lg font-heading font-bold text-white">
                    {checklistPolicy.nickname}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setChecklistPolicy(null)}
                  className="p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900 border border-zinc-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <p className="text-zinc-400 leading-relaxed">
                  {isRo
                    ? "Înainte de a accepta automat oferta de reînnoire primită de la asigurator, parcurge acest checklist de verificare:"
                    : "Before accepting the insurer renewal notice, verify these key contractual points:"}
                </p>

                {[
                  {
                    title: isRo ? "1. Verifică data exactă de expirare" : "1. Confirm exact expiry date",
                    desc: isRo ? "Asigură-te că noua poliță intră în vigoare din secunda următoare expirării celei curente (fără zile descoperite)." : "Ensure continuous inception date with zero gap.",
                  },
                  {
                    title: isRo ? "2. Actualizează valorile asigurate" : "2. Update declared values",
                    desc: isRo ? "Dacă ai adus îmbunătățiri imobilului sau valoarea de piață a mașinii a variat, recalibrează suma asigurată." : "Adjust insured sums if property renovations or vehicle values changed.",
                  },
                  {
                    title: isRo ? "3. Compară excluderile și franșizele" : "3. Compare exclusions & deductibles",
                    desc: isRo ? "Verifică dacă asiguratorul nu a introdus franșize noi sau clauze restrictive la reînnoire." : "Ensure the renewal schedule does not add new deductibles or restrictions.",
                  },
                  {
                    title: isRo ? "4. Solicită audit independent" : "4. Request independent second opinion",
                    desc: isRo ? "Compară oferta primită cu alte 3 alternative de pe piață prin intermediul unui consultant independent." : "Compare with alternative market quotes through an independent advisor.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-0.5">
                    <strong className="text-zinc-200 block">{item.title}</strong>
                    <p className="text-zinc-400 text-[11px] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row gap-3">
                <Button asChild className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11">
                  <Link href="/verifica-polita">
                    Auditează Gratuit Oferta &rarr;
                  </Link>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setChecklistPolicy(null)}
                  className="rounded-xl border-zinc-800 text-zinc-300 text-xs h-11"
                >
                  {isRo ? "Închide" : "Close"}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* MODAL: CONFIRM CLEAR ALL */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isDeleteConfirmOpen && (
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
                {isRo ? "Ștergi toate polițele salvate?" : "Delete all saved policies?"}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {isRo
                  ? "Această acțiune va șterge toate datele din memoria locală a browserului tău. Asigură-te că ai descărcat un backup JSON înainte."
                  : "This action will clear all local data from your browser storage. Download a JSON backup first if needed."}
              </p>
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  className="flex-1 rounded-xl border-zinc-800 text-zinc-300 text-xs h-10"
                >
                  {isRo ? "Anulează" : "Cancel"}
                </Button>
                <Button
                  type="button"
                  onClick={handleClearAll}
                  className="flex-1 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs h-10"
                >
                  {isRo ? "Da, Șterge Tot" : "Yes, Delete All"}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
