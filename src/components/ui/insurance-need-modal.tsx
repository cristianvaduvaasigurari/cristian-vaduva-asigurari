"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import {
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  HelpCircle,
  Check,
  Sparkles,
  Gift,
} from "lucide-react";
import Link from "next/link";
import { trackConversion } from "@/lib/analytics";
import { ReferralModal } from "./referral-modal";
import { cn } from "@/lib/utils";
import { useAutoScrollHide } from "@/hooks/useAutoScrollHide";

export const INSURANCE_NEEDS = [
  {
    id: "auto",
    title: "Vreau să îmi asigur mașina — RCA / CASCO.",
    placeholder: "ex: Vreau să revizuiesc polița CASCO sau să aflu cotațiile optime pentru un automobil nou.",
  },
  {
    id: "home",
    title: "Vreau să îmi asigur locuința.",
    placeholder: "ex: Vreau o asigurare completă pentru apartament / casă împotriva incendiilor, inundațiilor și cutremurelor.",
  },
  {
    id: "home_revalue",
    title: "Valoarea locuinței a crescut și vreau să revizuiesc suma asigurată.",
    placeholder: "ex: Banca a evaluat apartamentul la 150.000 €, dar acum consider că valorează 220.000 €. Vreau să verific suma asigurată.",
  },
  {
    id: "home_goods",
    title: "Vreau să asigur bunurile din locuință.",
    placeholder: "ex: Vreau să îmi asigur bunurile din casă, mobilierul și echipamentele electronice de valoare.",
  },
  {
    id: "clause_add",
    title: "Vreau să adaug o clauză sau o acoperire suplimentară.",
    placeholder: "ex: Am nevoie de o clauză suplimentară pentru polița actuală (ex: asistență de urgență la domiciliu, daune apă de conductă).",
  },
  {
    id: "travel",
    title: "Am nevoie de o asigurare de călătorie — de exemplu, pentru Tenerife.",
    placeholder: "ex: Plec în Tenerife și vreau o asigurare de călătorie cu acoperire medicală completă și anulare călătorie.",
  },
  {
    id: "life_health",
    title: "Vreau o asigurare de viață sau de sănătate.",
    placeholder: "ex: Caut o protecție financiară pentru familie și acces rapid la clinici și spitale private.",
  },
  {
    id: "rental_property",
    title: "Vreau să asigur o proprietate pe care o închiriez.",
    placeholder: "ex: Am o proprietate închiriată și vreau să îmi protejez proprietatea și răspunderea civilă față de chiriași și vecini.",
  },
  {
    id: "business",
    title: "Am nevoie de asigurări pentru compania mea.",
    placeholder: "ex: Caut asigurare pentru sediu, răspundere civilă profesională, echipamente sau sănătate pentru angajați.",
  },
  {
    id: "policy_review",
    title: "Vreau să verific sau să revizuiesc o poliță existentă.",
    placeholder: "ex: Vreau să revizuiesc polița actuală pentru a vedea dacă am clauze neacoperite sau dacă pot optimiza costul.",
  },
  {
    id: "luxury_valuable",
    title: "Am un bun de valoare — mașină premium, ceas, bijuterie, artă sau alt bun special.",
    placeholder: "ex: Dețin un automobil premium / colecție de artă / bijuterii și am nevoie de o soluție dedicată Private Client.",
  },
  {
    id: "other",
    title: "Altă nevoie.",
    placeholder: "ex: Spune-mi pe scurt situația ta și ce ai dori să analizăm împreună...",
  },
] as const;

export type InsuranceNeedId = (typeof INSURANCE_NEEDS)[number]["id"];

export function InsuranceNeedModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { isVisible: scrollVisible, isContactOpen } = useAutoScrollHide();
  const isContactVisible = isContactOpen || scrollVisible;
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [consent, setConsent] = useState<boolean>(false);

  // Status & Validation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Referral Modal Independent State & Ref
  const [isReferralOpen, setIsReferralOpen] = useState(false);
  const referralTriggerRef = useRef<HTMLButtonElement>(null);

  const resetForm = React.useCallback(() => {
    setSelectedCategory("");
    setDetails("");
    setPhone("");
    setEmail("");
    setConsent(false);
    setStatus("idle");
    setErrorMessage("");
    setFieldErrors({});
  }, []);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    if (status === "success") {
      resetForm();
    }
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 50);
  }, [status, resetForm]);

  const handleOpen = () => {
    setIsOpen(true);
    setStatus("idle");
    setErrorMessage("");
    setFieldErrors({});
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  // Dynamic placeholder based on selected category
  const activeNeed = INSURANCE_NEEDS.find((n) => n.title === selectedCategory);
  const currentPlaceholder =
    activeNeed?.placeholder ||
    "ex: Spune-mi pe scurt situația ta și ce ai vrea să asiguri sau să revizuim...";

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!selectedCategory.trim()) {
      errors.category = "Te rugăm să selectezi o opțiune din lista de nevoi.";
    }

    // Phone validation: min 8 digits, only phone characters
    const phoneClean = phone.replace(/\s+/g, "");
    if (!phoneClean) {
      errors.phone = "Numărul de telefon este obligatoriu.";
    } else if (!/^\+?[0-9\-().]{8,18}$/.test(phoneClean)) {
      errors.phone = "Te rugăm să introduci un număr de telefon valid (ex: 07xxxxxxxx).";
    }

    // Email validation
    const emailClean = email.trim();
    if (!emailClean) {
      errors.email = "Adresa de e-mail este obligatorie.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailClean)) {
      errors.email = "Te rugăm să introduci o adresă de e-mail validă (ex: nume@domeniu.ro).";
    }

    if (!consent) {
      errors.consent = "Este necesar consimțământul pentru prelucrarea datelor în vederea gestionării solicitării.";
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setErrorMessage("Te rugăm să completezi corect câmpurile obligatorii evidențiate.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const pagePathname = typeof window !== "undefined" ? window.location.pathname : "";
      const pageUrl = typeof window !== "undefined" ? window.location.href : "";
      const timestamp = new Date().toISOString();

      const payload = {
        name: "Solicitant (Ce nevoie ai?)",
        phone: phone.trim(),
        email: email.trim(),
        service: `Ce nevoie ai: ${selectedCategory}`,
        message: details.trim() || `Solicitare nevoie: ${selectedCategory}`,
        source: "insurance_need_widget",
        agreePrivacy: consent,
        metadata: {
          form_source: "insurance_need_widget",
          selected_category: selectedCategory,
          user_details: details.trim() || "Fără detalii suplimentare",
          page_pathname: pagePathname,
          page_url: pageUrl,
          submitted_at: timestamp,
        },
      };

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({ success: false }));

      if (response.ok && data.success) {
        setStatus("success");
        try {
          trackConversion("ce_nevoie_ai_submit");
        } catch {
          // Analytics non-blocking
        }
      } else {
        setStatus("error");
        setErrorMessage(
          data.error ||
            "Nu am putut transmite solicitarea ta în acest moment. Datele tale au fost păstrate. Te rugăm să încerci din nou."
        );
      }
    } catch (err) {
      console.error("[Insurance Need Widget] Submission failed:", err);
      setStatus("error");
      setErrorMessage(
        "A apărut o problemă de comunicare cu serverul. Datele tale au fost păstrate. Te rugăm să încerci din nou."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* 
        PERMANENT FLOATING CTA BUTTON: „Ce nevoie ai?”
        - Desktop: bottom-right area, positioned cleanly beside other controls without overlap.
        - Mobile: compact, visible, thumb-accessible pill at the bottom-right above other controls.
        - Style: Premium minimalist white, dark slate text, subtle border, luxury shadow.
      */}
      {/* 
        PERMANENT FLOATING CTA BUTTONS:
        1. „Recomandă & Beneficiați” (Top)
        2. „Ce nevoie ai?” (Bottom)
        - Desktop: bottom-right area, positioned cleanly beside other controls without overlap.
        - Mobile: compact, thumb-accessible stack at bottom-right above other controls.
        - Style: Premium minimalist white, dark slate text, subtle border, luxury shadow.
      */}
      <aside
        aria-label="Puncte permanente de consultanță și recomandare"
        className={cn(
          "fixed z-40 bottom-[150px] right-4 sm:bottom-[150px] sm:right-6 md:bottom-[36px] md:right-28 pb-[env(safe-area-inset-bottom)] pointer-events-none flex flex-col items-end gap-2 sm:gap-2.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none md:transform-none",
          isContactVisible ? "translate-y-0" : "translate-y-[72px]"
        )}
      >
        {/* Buton 1: Recomandă & Beneficiați */}
        <button
          ref={referralTriggerRef}
          type="button"
          onClick={() => setIsReferralOpen(true)}
          aria-label="Deschide programul: Recomandă & Beneficiați"
          aria-expanded={isReferralOpen}
          aria-haspopup="dialog"
          className="group relative inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white text-slate-900 hover:bg-slate-50 active:bg-slate-100 border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.18)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 font-bold text-xs sm:text-sm tracking-tight cursor-pointer pointer-events-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 max-w-[calc(100vw-2rem)] md:fixed md:left-6 md:right-auto md:bottom-[92px] md:mr-0"
        >
          <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700 group-hover:text-slate-900 transition-colors shrink-0" />
          <span className="text-slate-900 select-none truncate">Recomandă &amp; Beneficiați</span>
        </button>

        {/* Buton 2: Ce nevoie ai? */}
        <button
          ref={triggerRef}
          type="button"
          onClick={handleOpen}
          aria-label="Deschide formularul: Ce nevoie ai?"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className="group relative inline-flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white text-slate-900 hover:bg-slate-50 active:bg-slate-100 border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.18)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 font-bold text-xs sm:text-sm tracking-tight cursor-pointer pointer-events-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 max-w-[calc(100vw-2rem)]"
        >
          {/* Subtle pulse indicator */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-900" />
          </span>

          <HelpCircle className="w-4 h-4 text-slate-700 group-hover:text-slate-900 transition-colors shrink-0" />

          <span className="text-slate-900 select-none truncate">Ce nevoie ai?</span>
        </button>
      </aside>

      {/* REFERRAL & SECOND OPINION MODAL */}
      <ReferralModal
        isOpen={isReferralOpen}
        onClose={() => setIsReferralOpen(false)}
        triggerRef={referralTriggerRef}
      />

      {/* MODAL DIALOG */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="need-modal-title"
          aria-describedby="need-modal-desc"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleClose();
            }
          }}
        >
          <div
            ref={modalRef}
            className="relative w-full sm:max-w-xl md:max-w-2xl max-h-[92vh] sm:max-h-[90vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/80 shrink-0">
              <div className="space-y-1.5 pr-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-200/70 text-slate-800 text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-slate-700" />
                  <span>Consultanță &amp; Preluare Solicitare</span>
                </div>

                <h2
                  id="need-modal-title"
                  className="text-xl sm:text-2xl font-heading font-bold text-slate-900 leading-tight"
                >
                  Ce nevoie ai?
                </h2>

                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                  Spune-mi ce vrei să asiguri. Discutăm și găsim împreună soluția potrivită.
                </p>

                <p id="need-modal-desc" className="text-xs text-slate-500 leading-relaxed">
                  Spune-mi pe scurt de ce ai nevoie. Te contactez pentru a discuta opțiunile potrivite.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Închide formularul"
                className="p-2 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors cursor-pointer shrink-0 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body / Scrollable Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
              {status === "success" ? (
                /* SUCCESS STATE */
                <div className="py-8 sm:py-10 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                      Mulțumesc! Am primit solicitarea ta.
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                      Te voi contacta pentru a discuta detaliile.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left max-w-md mx-auto space-y-1.5 text-xs text-slate-600">
                    <p>
                      <span className="font-bold text-slate-800">Nevoia exprimată:</span>{" "}
                      {selectedCategory}
                    </p>
                    <p>
                      <span className="font-bold text-slate-800">Telefon de contact:</span>{" "}
                      {phone}
                    </p>
                    <p>
                      <span className="font-bold text-slate-800">E-mail:</span> {email}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-4 px-8 py-3 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                  >
                    Închide
                  </button>
                </div>
              ) : (
                /* FORM STATE */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {errorMessage && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2.5 animate-in fade-in duration-150"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                      <span className="leading-relaxed">{errorMessage}</span>
                    </div>
                  )}

                  {/* 1. Category Selection: 12 Options */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label
                        id="need-categories-label"
                        className="text-xs font-bold text-slate-900 uppercase tracking-wide block"
                      >
                        Alege nevoia ta principală <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[11px] text-slate-500">12 opțiuni disponibile</span>
                    </div>

                    <div
                      role="radiogroup"
                      aria-labelledby="need-categories-label"
                      className="grid grid-cols-1 gap-2 max-h-56 sm:max-h-64 overflow-y-auto pr-1 border border-slate-200/80 rounded-2xl p-2 bg-slate-50/40"
                    >
                      {INSURANCE_NEEDS.map((item, index) => {
                        const isSelected = selectedCategory === item.title;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => {
                              setSelectedCategory(item.title);
                              if (fieldErrors.category) {
                                setFieldErrors((prev) => {
                                  const next = { ...prev };
                                  delete next.category;
                                  return next;
                                });
                              }
                            }}
                            className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all duration-150 flex items-start gap-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                              isSelected
                                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                                : "bg-white text-slate-800 border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/80"
                            }`}
                          >
                            <span
                              className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold shrink-0 mt-0.5 ${
                                isSelected
                                  ? "bg-white text-slate-900"
                                  : "bg-slate-100 text-slate-600 border border-slate-200"
                              }`}
                            >
                              {isSelected ? <Check className="w-3 h-3 stroke-[3]" /> : index + 1}
                            </span>
                            <span className="leading-snug">{item.title}</span>
                          </button>
                        );
                      })}
                    </div>

                    {fieldErrors.category && (
                      <p className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {fieldErrors.category}
                      </p>
                    )}
                  </div>

                  {/* 2. Free Description Field (Optional) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="need-details"
                        className="text-xs font-bold text-slate-900 uppercase tracking-wide block"
                      >
                        Detalii despre nevoia ta{" "}
                        <span className="text-slate-400 font-normal normal-case">(opțional)</span>
                      </label>
                      <span className="text-[11px] text-slate-400">text liber</span>
                    </div>

                    <textarea
                      id="need-details"
                      rows={3}
                      placeholder={currentPlaceholder}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-slate-900 transition-colors resize-none placeholder:text-slate-400 placeholder:font-normal leading-relaxed"
                    />
                  </div>

                  {/* 3. Contact Data: Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="need-phone"
                        className="text-xs font-bold text-slate-900 uppercase tracking-wide block"
                      >
                        Telefon <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="need-phone"
                        type="tel"
                        required
                        placeholder="ex: 07xxxxxxxx sau +40..."
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (fieldErrors.phone) {
                            setFieldErrors((prev) => {
                              const next = { ...prev };
                              delete next.phone;
                              return next;
                            });
                          }
                        }}
                        className={`w-full h-11 px-3.5 rounded-xl border text-xs sm:text-sm font-medium focus:bg-white focus:outline-none transition-colors ${
                          fieldErrors.phone
                            ? "border-red-400 bg-red-50/50 text-slate-900 focus:border-red-600"
                            : "border-slate-200 bg-slate-50/50 text-slate-900 focus:border-slate-900"
                        }`}
                      />
                      {fieldErrors.phone && (
                        <p className="text-[11px] text-red-600 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          {fieldErrors.phone}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="need-email"
                        className="text-xs font-bold text-slate-900 uppercase tracking-wide block"
                      >
                        E-mail <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="need-email"
                        type="email"
                        required
                        placeholder="ex: prenume@exemplu.ro"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (fieldErrors.email) {
                            setFieldErrors((prev) => {
                              const next = { ...prev };
                              delete next.email;
                              return next;
                            });
                          }
                        }}
                        className={`w-full h-11 px-3.5 rounded-xl border text-xs sm:text-sm font-medium focus:bg-white focus:outline-none transition-colors ${
                          fieldErrors.email
                            ? "border-red-400 bg-red-50/50 text-slate-900 focus:border-red-600"
                            : "border-slate-200 bg-slate-50/50 text-slate-900 focus:border-slate-900"
                        }`}
                      />
                      {fieldErrors.email && (
                        <p className="text-[11px] text-red-600 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 4. Privacy Consent Checkbox */}
                  <div className="space-y-1 pt-1">
                    <div className="flex items-start gap-2.5">
                      <input
                        id="need-privacy"
                        type="checkbox"
                        required
                        checked={consent}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setConsent(isChecked);
                          if (isChecked) {
                            setErrorMessage("");
                          }
                          if (fieldErrors.consent) {
                            setFieldErrors((prev) => {
                              const next = { ...prev };
                              delete next.consent;
                              return next;
                            });
                          }
                        }}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer shrink-0"
                      />
                      <label
                        htmlFor="need-privacy"
                        className="text-[11px] text-slate-600 leading-relaxed cursor-pointer"
                      >
                        Sunt de acord cu prelucrarea datelor mele de contact în scopul gestionării
                        solicitării conform{" "}
                        <Link
                          href="/politica-de-confidentialitate"
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                          className="text-slate-900 underline font-semibold hover:text-blue-600 transition-colors"
                        >
                          Politicii de Confidențialitate
                        </Link>
                        .
                      </label>
                    </div>

                    {fieldErrors.consent && (
                      <p className="text-[11px] text-red-600 font-medium flex items-center gap-1 pl-6">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {fieldErrors.consent}
                      </p>
                    )}
                  </div>

                  {/* 5. Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md hover:shadow-lg mt-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Se trimite...</span>
                      </>
                    ) : (
                      <>
                        <span>Solicită să discutăm</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
