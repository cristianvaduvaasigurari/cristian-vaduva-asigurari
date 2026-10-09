"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Car,
  Home,
  HeartPulse,
  Briefcase,
  Crown,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Lock,
  Copy,
  Check,
  AlertCircle,
  MessageSquare,
  Clock,
  Sparkles,
  Phone,
  Mail,
  Send,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitPolicyReview } from "@/lib/actions";
import { PolicyCategory } from "@/lib/policy-review";
import Link from "next/link";

interface CategoryOption {
  id: PolicyCategory;
  titleRo: string;
  titleEn: string;
  descRo: string;
  descEn: string;
  icon: React.ReactNode;
  popularGoalsRo: string[];
  popularGoalsEn: string[];
}

const CATEGORIES: CategoryOption[] = [
  {
    id: "auto",
    titleRo: "Auto (CASCO / RCA)",
    titleEn: "Motor (CASCO / Fleet)",
    descRo: "Franșize ascunse, clauze de decontare și asistență rutieră extinsă.",
    descEn: "Hidden deductibles, direct settlement terms, and roadside limits.",
    icon: <Car className="w-6 h-6 text-blue-400" />,
    popularGoalsRo: [
      "Verificare franșiză și clauze CASCO",
      "Comparație cost vs acoperire la reînnoire",
      "Asistență la decontare directă / daună",
      "Analiză flotă auto comercială"
    ],
    popularGoalsEn: [
      "Check deductibles and CASCO clauses",
      "Cost vs coverage benchmark on renewal",
      "Direct settlement terms audit",
      "Commercial fleet policy review"
    ]
  },
  {
    id: "home",
    titleRo: "Locuință & Patrimoniu",
    titleEn: "Home & Property",
    descRo: "Sub-asigurare, clauze bancare, riscuri naturale și bunuri de valoare.",
    descEn: "Under-insurance, mortgage assignment, natural risks, and contents.",
    icon: <Home className="w-6 h-6 text-emerald-400" />,
    popularGoalsRo: [
      "Verificare sumă asigurată vs cost real reconstrucție",
      "Clauze poliță bancară (Cesiune credit)",
      "Acoperire bunuri casnice și răspundere vecini",
      "PAD obligatoriu vs Poliță facultativă completă"
    ],
    popularGoalsEn: [
      "Insured sum vs true rebuilding replacement cost",
      "Mortgage assignment clause review",
      "Contents and neighbour liability coverage",
      "Mandatory PAD vs comprehensive policy comparison"
    ]
  },
  {
    id: "health",
    titleRo: "Sănătate & Viață",
    titleEn: "Health & Life",
    descRo: "Spitalizare internațională, boli grave, excluderi preexistente.",
    descEn: "International hospitalization, critical illness, and exclusions.",
    icon: <HeartPulse className="w-6 h-6 text-rose-400" />,
    popularGoalsRo: [
      "Verificare acoperire spitalizare în străinătate",
      "Clauze boli grave și indemnizație forfetară",
      "Diferență abonament clinică vs poliță asigurare",
      "Poliță de viață cu componentă de economisire"
    ],
    popularGoalsEn: [
      "International inpatient hospitalization limits",
      "Critical illness and lump-sum terms",
      "Corporate clinic subscription vs true insurance",
      "Life insurance with capital accumulation"
    ]
  },
  {
    id: "business",
    titleRo: "Business & Răspunderi",
    titleEn: "Business & Liability",
    descRo: "Răspunderea managerilor (D&O), Cyber Risk, malpraxis și CAR.",
    descEn: "Management liability (D&O), Cyber Risk, professional indemnity.",
    icon: <Briefcase className="w-6 h-6 text-amber-400" />,
    popularGoalsRo: [
      "Audit poliță D&O (Răspundere Administratori)",
      "Verificare poliță Cyber Risk și breșe GDPR",
      "Răspundere profesională (IT, Medical, Arhitectură)",
      "Bunuri comerciale și întreruperea afacerii"
    ],
    popularGoalsEn: [
      "Directors & Officers (D&O) liability audit",
      "Cyber Risk and GDPR exposure check",
      "Professional indemnity (IT, Medical, Engineering)",
      "Commercial property & business interruption"
    ]
  },
  {
    id: "private-client",
    titleRo: "Private Client & Lux",
    titleEn: "Private Client & High Value",
    descRo: "Supercars, ambarcațiuni, colecții de ceasuri, artă și proprietăți premium.",
    descEn: "Supercars, yachts, horology collections, fine art, and estates.",
    icon: <Crown className="w-6 h-6 text-yellow-400" />,
    popularGoalsRo: [
      "Valoare agreată (Agreed Value) fără depreciere",
      "Poliță ceasuri / bijuterii cu acoperire mondială",
      "Supercar & colecție auto de performanță",
      "Yachting, marină privată și aviație"
    ],
    popularGoalsEn: [
      "Agreed Value terms without standard depreciation",
      "Worldwide watch & jewellery collector policy",
      "Supercar & bespoke automotive coverage",
      "Yacht, private aviation and estate structure"
    ]
  }
];

export function PolicyReviewJourney() {
  const [lang, setLang] = useState<"ro" | "en">("ro");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [category, setCategory] = useState<PolicyCategory>("auto");
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const [customGoal, setCustomGoal] = useState<string>("");
  const [currentInsurer, setCurrentInsurer] = useState<string>("");
  const [expiryTimeline, setExpiryTimeline] = useState<string>("");
  const [clientNotes, setClientNotes] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [preferredContact, setPreferredContact] = useState<"whatsapp" | "phone" | "email">("whatsapp");
  const [consent, setConsent] = useState<boolean>(true);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [successReferenceId, setSuccessReferenceId] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const activeCategory = CATEGORIES.find((c) => c.id === category) || CATEGORIES[0];
  const goalOptions = lang === "ro" ? activeCategory.popularGoalsRo : activeCategory.popularGoalsEn;

  const handleNextFromStep1 = () => {
    const finalGoal = selectedGoal || customGoal.trim();
    if (!finalGoal) {
      setValidationErrors({ reviewGoal: lang === "ro" ? "Selectează sau precizează obiectivul verificării." : "Please select or type your review objective." });
      return;
    }
    setValidationErrors({});
    setStep(2);
  };

  const handleNextFromStep2 = () => {
    setValidationErrors({});
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setValidationErrors({});

    const effectiveGoal = selectedGoal || customGoal.trim();
    if (!effectiveGoal) {
      setValidationErrors((prev) => ({ ...prev, reviewGoal: "Obiectivul este obligatoriu." }));
      setStep(1);
      return;
    }

    if (!name.trim() || name.trim().length < 2) {
      setValidationErrors((prev) => ({ ...prev, name: lang === "ro" ? "Introdu numele complet." : "Please enter your full name." }));
      return;
    }

    const cleanPhone = phone.replace(/[\s.-]/g, "");
    if (!cleanPhone || cleanPhone.length < 9) {
      setValidationErrors((prev) => ({ ...prev, phone: lang === "ro" ? "Introdu un număr de telefon valid." : "Please enter a valid phone number." }));
      return;
    }

    if (!consent) {
      setValidationErrors((prev) => ({ ...prev, consent: lang === "ro" ? "Acordul de confidențialitate este obligatoriu." : "Privacy consent is required." }));
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("category", category);
      formData.append("reviewGoal", effectiveGoal);
      formData.append("currentInsurer", currentInsurer.trim());
      formData.append("expiryTimeline", expiryTimeline.trim());
      formData.append("clientNotes", clientNotes.trim());
      formData.append("name", name.trim());
      formData.append("phone", cleanPhone);
      formData.append("email", email.trim());
      formData.append("preferredContact", preferredContact);
      formData.append("language", lang);
      formData.append("consent", consent ? "true" : "false");

      const result = await submitPolicyReview(formData);

      setIsSubmitting(false);

      if (result.success && result.referenceId) {
        setSuccessReferenceId(result.referenceId);
      } else {
        setErrorMessage(result.error || (lang === "ro" ? "A apărut o eroare la salvare." : "An error occurred."));
        if (result.validationErrors) {
          setValidationErrors(result.validationErrors);
        }
      }
    } catch {
      setIsSubmitting(false);
      setErrorMessage(lang === "ro" ? "Eroare de conexiune. Te rugăm să încerci din nou." : "Network error. Please try again.");
    }
  };

  const copyReference = () => {
    if (successReferenceId) {
      navigator.clipboard.writeText(successReferenceId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // SUCCESS SCREEN
  if (successReferenceId) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl mx-auto p-8 sm:p-12 glass rounded-[2.5rem] border border-emerald-500/30 bg-zinc-950/80 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="text-center space-y-6">
          <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              {lang === "ro" ? "Solicitare Înregistrată cu Succes" : "Review Request Registered"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              {lang === "ro" ? "Polița Ta Intră în Analiză" : "Your Policy Review Has Started"}
            </h2>
          </div>

          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
            {lang === "ro"
              ? "Am generat identificatorul unic de referință. Consultantul Cristian Văduva va analiza solicitarea și te va contacta pe canalul selectat."
              : "We have generated your unique review reference. Cristian Văduva will review your submission and connect with you via your preferred channel."}
          </p>

          {/* REFERENCE ID BOX */}
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3">
            <p className="text-xs uppercase tracking-widest text-zinc-400 font-medium">
              {lang === "ro" ? "Număr Unic de Referință (Păstrează acest cod)" : "Unique Reference ID (Keep for your records)"}
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400 tracking-wider">
                {successReferenceId}
              </span>
              <button
                type="button"
                onClick={copyReference}
                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                title="Copiază ID"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            {copied && (
              <p className="text-xs text-emerald-400">
                {lang === "ro" ? "ID-ul a fost copiat în clipboard!" : "Reference copied to clipboard!"}
              </p>
            )}
          </div>

          {/* NEXT STEPS */}
          <div className="text-left p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-3 text-sm text-zinc-300">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {lang === "ro" ? "Ce urmează acum?" : "What happens next?"}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>
                  {lang === "ro"
                    ? "Consultantul verifică specificul categoriei și termenii pieței actuale."
                    : "The advisor prepares the benchmark analysis based on your stated category."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>
                  {lang === "ro"
                    ? "Dacă sunt necesare documente adiționale (ex: clauze speciale), le vei transmite direct pe canalul securizat convenit."
                    : "If policy documents are needed for clause interpretation, you will share them directly via the agreed private channel."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>
                  {lang === "ro"
                    ? "Primești un raport clar cu riscurile identificate, franșizele ascunse și opțiunile de optimizare."
                    : "You receive an objective assessment of coverage gaps, hidden clauses, and optimization terms."}
                </span>
              </li>
            </ul>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-8 h-12 text-sm font-semibold"
              onClick={() => {
                setSuccessReferenceId(null);
                setStep(1);
                setSelectedGoal("");
                setCustomGoal("");
              }}
            >
              {lang === "ro" ? "Verifică o altă poliță" : "Review another policy"}
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-zinc-700 hover:bg-zinc-800 text-zinc-200 h-12 text-sm"
              asChild
            >
              <Link href="/">{lang === "ro" ? "Înapoi la pagina principală" : "Back to Home"}</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* TOP CONTROLS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            {lang === "ro" ? "Audit Independent de Polițe" : "Independent Policy Review"}
          </span>
          <span className="text-zinc-300">•</span>
          <span className="text-xs text-zinc-500 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {lang === "ro" ? "~2 min completare" : "~2 min completion"}
          </span>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs">
          <button
            type="button"
            onClick={() => setLang("ro")}
            className={`px-3 py-1 rounded-full font-medium transition-all ${
              lang === "ro" ? "bg-blue-600 text-white shadow-sm" : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            Română
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`px-3 py-1 rounded-full font-medium transition-all ${
              lang === "en" ? "bg-blue-600 text-white shadow-sm" : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="rounded-[2.5rem] border border-zinc-200/80 bg-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
        {/* PROGRESS STEP INDICATOR */}
        <div className="grid grid-cols-3 gap-2 mb-10 pb-6 border-b border-zinc-200">
          <div className="flex flex-col gap-1.5">
            <div className={`h-1.5 rounded-full transition-all ${step >= 1 ? "bg-blue-600" : "bg-zinc-200"}`} />
            <span className={`text-xs font-semibold ${step >= 1 ? "text-blue-600" : "text-zinc-400"}`}>
              1. {lang === "ro" ? "Categorie & Obiectiv" : "Category & Goal"}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className={`h-1.5 rounded-full transition-all ${step >= 2 ? "bg-blue-600" : "bg-zinc-200"}`} />
            <span className={`text-xs font-semibold ${step >= 2 ? "text-blue-600" : "text-zinc-400"}`}>
              2. {lang === "ro" ? "Detalii Poliță" : "Policy Details"}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className={`h-1.5 rounded-full transition-all ${step >= 3 ? "bg-blue-600" : "bg-zinc-200"}`} />
            <span className={`text-xs font-semibold ${step >= 3 ? "text-blue-600" : "text-zinc-400"}`}>
              3. {lang === "ro" ? "Contact & Canal" : "Contact & Channel"}
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: CATEGORY & GOAL */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-900 mb-2">
                  {lang === "ro" ? "Ce poliță dorești să analizăm?" : "Which policy would you like us to review?"}
                </h3>
                <p className="text-zinc-600 text-sm sm:text-base">
                  {lang === "ro"
                    ? "Selectează categoria pentru a adapta criteriile de evaluare și clauzele specifice."
                    : "Select the category to customize underwriting criteria and specific policy clauses."}
                </p>
              </div>

              {/* CATEGORY GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {CATEGORIES.map((cat) => {
                  const isSelected = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setCategory(cat.id);
                        setSelectedGoal("");
                        setValidationErrors({});
                      }}
                      className={`text-left p-5 rounded-2xl border transition-all relative flex flex-col justify-between ${
                        isSelected
                          ? "bg-blue-50/60 border-blue-500 ring-2 ring-blue-500/20 shadow-sm"
                          : "bg-zinc-50 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-100"
                      }`}
                    >
                      <div>
                        <div className="mb-3 p-2.5 rounded-xl bg-white border border-zinc-200 inline-block shadow-xs">
                          {cat.icon}
                        </div>
                        <h4 className="font-bold text-zinc-900 text-base mb-1">
                          {lang === "ro" ? cat.titleRo : cat.titleEn}
                        </h4>
                        <p className="text-xs text-zinc-600 leading-relaxed">
                          {lang === "ro" ? cat.descRo : cat.descEn}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-zinc-200 flex items-center justify-between text-xs">
                        <span className={isSelected ? "text-blue-600 font-semibold" : "text-zinc-500"}>
                          {isSelected ? (lang === "ro" ? "Selectat" : "Selected") : (lang === "ro" ? "Alege" : "Select")}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* REVIEW GOAL SELECTOR */}
              <div className="pt-4 space-y-4">
                <label className="block text-sm font-semibold text-zinc-900">
                  {lang === "ro" ? "Care este principalul obiectiv al verificării?" : "What is your primary review objective?"}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {goalOptions.map((goal) => {
                    const isSelected = selectedGoal === goal;
                    return (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => {
                          setSelectedGoal(goal);
                          setCustomGoal("");
                          setValidationErrors({});
                        }}
                        className={`text-left px-4 py-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-blue-600 text-white font-semibold border-blue-600 shadow-sm"
                            : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-100"
                        }`}
                      >
                        <span>{goal}</span>
                        {isSelected && <Check className="w-4 h-4 text-white shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Goal Input */}
                <div className="pt-2">
                  <Input
                    placeholder={
                      lang === "ro"
                        ? "Sau scrie un obiectiv specific (ex: Vreau să știu dacă am acoperire pentru incendiu la terasă)..."
                        : "Or type a custom question (e.g. Do I have coverage for battery degradation?)..."
                    }
                    value={customGoal}
                    onChange={(e) => {
                      setCustomGoal(e.target.value);
                      if (e.target.value) {
                        setSelectedGoal("");
                      }
                      setValidationErrors({});
                    }}
                    className="bg-zinc-50 border-zinc-300 text-zinc-900 text-sm h-12 focus:ring-2 focus:ring-blue-600 placeholder:text-zinc-400"
                  />
                  {validationErrors.reviewGoal && (
                    <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {validationErrors.reviewGoal}
                    </p>
                  )}
                </div>
              </div>

              {/* ACTION FOOTER */}
              <div className="pt-6 flex justify-end">
                <Button
                  type="button"
                  onClick={handleNextFromStep1}
                  className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 text-sm font-semibold flex items-center gap-2 shadow-md"
                >
                  <span>{lang === "ro" ? "Continuă spre detalii" : "Next: Policy details"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: POLICY DETAILS */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-900 mb-2">
                  {lang === "ro" ? "Detalii despre polița actuală" : "Details about your current policy"}
                </h3>
                <p className="text-zinc-600 text-sm sm:text-base">
                  {lang === "ro"
                    ? "Informațiile ne ajută să pregătim analiza comparativă înainte de discuție."
                    : "These details allow us to prepare accurate comparative terms before our discussion."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                    {lang === "ro" ? "Compania de asigurare actuală (opțional)" : "Current Insurance Company (optional)"}
                  </label>
                  <Input
                    placeholder={lang === "ro" ? "ex: Omniasig, Allianz, Generali, Groupama..." : "e.g. Allianz, Generali, Groupama..."}
                    value={currentInsurer}
                    onChange={(e) => setCurrentInsurer(e.target.value)}
                    className="bg-zinc-50 border-zinc-300 text-zinc-900 text-sm h-12 focus:ring-2 focus:ring-blue-600 placeholder:text-zinc-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                    {lang === "ro" ? "Când expiră sau se reînnoiește? (opțional)" : "When does it expire or renew? (optional)"}
                  </label>
                  <Input
                    placeholder={lang === "ro" ? "ex: Luna viitoare, În 3 luni, A expirat recent..." : "e.g. Next month, In 3 months, Expired..."}
                    value={expiryTimeline}
                    onChange={(e) => setExpiryTimeline(e.target.value)}
                    className="bg-zinc-50 border-zinc-300 text-zinc-900 text-sm h-12 focus:ring-2 focus:ring-blue-600 placeholder:text-zinc-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                  {lang === "ro" ? "Ce te nemulțumește sau ce întrebări ai despre contract?" : "Specific concerns or questions regarding the policy"}
                </label>
                <Textarea
                  placeholder={
                    lang === "ro"
                      ? "ex: Prețul la reînnoire s-a dublat; Nu știu dacă sunt asigurate și daunele provocate de fenomene meteo; Vreau să aflu franșiza reală..."
                      : "e.g. The renewal premium doubled; I want to confirm if track days or flood exclusions apply..."
                  }
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  className="bg-zinc-50 border-zinc-300 text-zinc-900 text-sm min-h-[110px] focus:ring-2 focus:ring-blue-600 placeholder:text-zinc-400"
                />
              </div>

              {/* ZERO PUBLIC UPLOADS NOTICE */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-start gap-3 text-xs text-zinc-600">
                <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-zinc-900 block mb-0.5">
                    {lang === "ro" ? "Protecția Documentelor Tale:" : "Document Privacy & Security:"}
                  </span>
                  <span>
                    {lang === "ro"
                      ? "Pentru siguranța ta, polițele complete nu se încarcă în formulare web publice. Dacă analiza necesită inspectarea contractului PDF, îl vei transmite exclusiv pe canalul direct convenit."
                      : "For privacy and safety, policy PDFs are not uploaded via public forms. If contract inspection is needed, you will share it directly via your verified private channel."}
                  </span>
                </div>
              </div>

              {/* ACTION FOOTER */}
              <div className="pt-4 flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="rounded-full border-zinc-300 hover:bg-zinc-100 text-zinc-800 h-12 px-6 text-sm font-semibold shadow-xs"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  <span>{lang === "ro" ? "Înapoi" : "Back"}</span>
                </Button>
                <Button
                  type="button"
                  onClick={handleNextFromStep2}
                  className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 text-sm font-semibold flex items-center gap-2 shadow-md"
                >
                  <span>{lang === "ro" ? "Continuă spre date de contact" : "Next: Contact details"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: CONTACT & PREFERRED CHANNEL */}
          {step === 3 && (
            <motion.form
              key="step3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-900 mb-2">
                  {lang === "ro" ? "Unde îți trimitem concluziile analizei?" : "Where should we send your review summary?"}
                </h3>
                <p className="text-zinc-600 text-sm sm:text-base">
                  {lang === "ro"
                    ? "Datele tale sunt confidențiale și utilizate strict pentru această verificare."
                    : "Your contact details are strictly protected and used solely for this evaluation."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                    {lang === "ro" ? "Nume și Prenume *" : "Full Name *"}
                  </label>
                  <Input
                    placeholder="ex: Alex Popescu"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setValidationErrors((prev) => ({ ...prev, name: "" }));
                    }}
                    className="bg-zinc-50 border-zinc-300 text-zinc-900 text-sm h-12 focus:ring-2 focus:ring-blue-600 placeholder:text-zinc-400"
                    required
                  />
                  {validationErrors.name && (
                    <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {validationErrors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                    {lang === "ro" ? "Număr de Telefon *" : "Phone Number *"}
                  </label>
                  <Input
                    type="tel"
                    placeholder="ex: 0722 000 000"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setValidationErrors((prev) => ({ ...prev, phone: "" }));
                    }}
                    className="bg-zinc-50 border-zinc-300 text-zinc-900 text-sm h-12 focus:ring-2 focus:ring-blue-600 placeholder:text-zinc-400"
                    required
                  />
                  {validationErrors.phone && (
                    <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {validationErrors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                  {lang === "ro" ? "Email (opțional, pentru transmiterea raportului scris)" : "Email (optional, for written review report)"}
                </label>
                <Input
                  type="email"
                  placeholder="ex: contact@domeniu.ro"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setValidationErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  className="bg-zinc-50 border-zinc-300 text-zinc-900 text-sm h-12 focus:ring-2 focus:ring-blue-600 placeholder:text-zinc-400"
                />
                {validationErrors.email && (
                  <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {validationErrors.email}
                  </p>
                )}
              </div>

              {/* PREFERRED CONTACT METHOD */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider block">
                  {lang === "ro" ? "Canalul de comunicare preferat:" : "Preferred communication channel:"}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPreferredContact("whatsapp")}
                    className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                      preferredContact === "whatsapp"
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreferredContact("phone")}
                    className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                      preferredContact === "phone"
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    <span>{lang === "ro" ? "Telefon" : "Call"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreferredContact("email")}
                    className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                      preferredContact === "email"
                        ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                        : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </button>
                </div>
              </div>

              {/* PRIVACY CONSENT CHECKBOX */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer text-xs text-zinc-600">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      setValidationErrors((prev) => ({ ...prev, consent: "" }));
                    }}
                    className="mt-0.5 rounded border-zinc-300 text-blue-600 focus:ring-blue-600 h-4 w-4"
                  />
                  <span>
                    {lang === "ro" ? (
                      <>
                        Sunt de acord cu prelucrarea datelor pentru realizarea analizei comparative, conform{" "}
                        <Link href="/politica-de-confidentialitate" className="text-blue-600 hover:underline" target="_blank">
                          Politicii de Confidențialitate
                        </Link>
                        . Fără apeluri spam sau transmitere către terți.
                      </>
                    ) : (
                      <>
                        I consent to processing my details for the policy review pursuant to the{" "}
                        <Link href="/politica-de-confidentialitate" className="text-blue-600 hover:underline" target="_blank">
                          Privacy Policy
                        </Link>
                        . No spam, no third-party distribution.
                      </>
                    )}
                  </span>
                </label>
                {validationErrors.consent && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {validationErrors.consent}
                  </p>
                )}
              </div>

              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* ACTION FOOTER */}
              <div className="pt-4 flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                  disabled={isSubmitting}
                  className="rounded-full border-zinc-300 hover:bg-zinc-100 text-zinc-800 h-12 px-6 text-sm font-semibold shadow-xs"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  <span>{lang === "ro" ? "Înapoi" : "Back"}</span>
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-10 h-12 text-sm font-semibold flex items-center gap-2 shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{lang === "ro" ? "Se procesează..." : "Processing..."}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{lang === "ro" ? "Trimite Solicitarea" : "Submit Policy Review"}</span>
                    </>
                  )}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

