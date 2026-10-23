"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import {
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Gift,
  Share2,
  Copy,
  Check,
  Users,
  ShieldCheck,
  FileSearch,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { trackConversion } from "@/lib/analytics";

export type ReferralTabType = "referral" | "existing_client" | "second_opinion";

export interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
  initialTab?: ReferralTabType;
}

export const WHATSAPP_REFERRAL_MESSAGE =
  "Salut! Îți recomand să discuți cu CRISTIAN VADUVA despre nevoile tale de asigurare. Poți cere o a doua opinie gratuită și poți verifica dacă sunt disponibile beneficii pentru tine. Detalii: https://insurance.cristianvaduva.com";

const RELATIONSHIP_OPTIONS = [
  "Prieten",
  "Familie",
  "Coleg",
  "Client / Partener",
  "Altă relație",
] as const;

export function ReferralModal({
  isOpen,
  onClose,
  triggerRef,
  initialTab = "referral",
}: ReferralModalProps) {
  const [activeTab, setActiveTab] = useState<ReferralTabType>(initialTab);

  // Form Fields
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [relationship, setRelationship] = useState<string>("Prieten");
  const [details, setDetails] = useState<string>("");
  const [consent, setConsent] = useState<boolean>(true);

  // Clipboard & Submission Status
  const [copied, setCopied] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const modalRef = useRef<HTMLDivElement>(null);

  const resetForm = React.useCallback(() => {
    setName("");
    setPhone("");
    setEmail("");
    setRelationship("Prieten");
    setDetails("");
    setConsent(true);
    setStatus("idle");
    setErrorMessage("");
    setFieldErrors({});
    setCopied(false);
  }, []);

  const handleClose = React.useCallback(() => {
    onClose();
    if (status === "success") {
      resetForm();
    }
    setTimeout(() => {
      triggerRef?.current?.focus();
    }, 50);
  }, [onClose, status, resetForm, triggerRef]);

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

  const handleCopyMessage = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(WHATSAPP_REFERRAL_MESSAGE);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = WHATSAPP_REFERRAL_MESSAGE;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      try {
        trackConversion("referral_copy_message");
      } catch {
        // Non-blocking
      }
    } catch (err) {
      console.error("[Referral] Clipboard copy error:", err);
    }
  };

  const handleWhatsAppShare = () => {
    try {
      trackConversion("referral_whatsapp_share");
    } catch {
      // Non-blocking
    }
    const url = `https://wa.me/?text=${encodeURIComponent(WHATSAPP_REFERRAL_MESSAGE)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    const cleanName = name.trim();
    if (!cleanName) {
      errors.name = "Numele este obligatoriu.";
    } else if (cleanName.length < 2) {
      errors.name = "Te rugăm să introduci numele complet.";
    }

    const cleanPhone = phone.replace(/\s+/g, "");
    if (!cleanPhone) {
      errors.phone = "Numărul de telefon este obligatoriu.";
    } else if (!/^\+?[0-9\-().]{8,18}$/.test(cleanPhone)) {
      errors.phone = "Te rugăm să introduci un număr de telefon valid (ex: 07xxxxxxxx).";
    }

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      errors.email = "Adresa de e-mail este obligatorie.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      errors.email = "Te rugăm să introduci o adresă de e-mail validă (ex: nume@domeniu.ro).";
    }

    if (activeTab === "referral" && !relationship) {
      errors.relationship = "Te rugăm să specifici relația cu persoana recomandată.";
    }

    if (!consent) {
      errors.consent =
        "Este necesar consimțământul pentru prelucrarea datelor în vederea gestionării solicitării.";
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

      let source: string;
      let serviceTitle: string;
      let formattedMsg: string;

      if (activeTab === "referral") {
        source = "insurance_referral";
        serviceTitle = "Program Recomandare: Recomand pe cineva";
        formattedMsg = [
          `Solicitant: ${name.trim()}`,
          `Relație cu persoana recomandată: ${relationship}`,
          details.trim() ? `Nevoie estimată / Detalii: ${details.trim()}` : null,
          "Notă: Nu au fost colectate datele terțului. Solicitantul a fost instruit să folosească mesajul de distribuire sau să fie contactat direct.",
        ]
          .filter(Boolean)
          .join("\n");
      } else if (activeTab === "existing_client") {
        source = "insurance_existing_client_benefits";
        serviceTitle = "Verificare Beneficii Client Existent Generali";
        formattedMsg = [
          `Solicitant client existent: ${name.trim()}`,
          details.trim() ? `Poliță / Detalii solicitare: ${details.trim()}` : "Solicitare verificare beneficii și discounturi pentru client existent.",
        ].join("\n");
      } else {
        source = "insurance_second_opinion";
        serviceTitle = "Solicitare A Doua Opinie Gratuită Poliță";
        formattedMsg = [
          `Solicitant a doua opinie: ${name.trim()}`,
          details.trim() ? `Nelămurire / Detalii poliță: ${details.trim()}` : "Solicitare analiză inițială gratuită pentru o poliță existentă.",
        ].join("\n");
      }

      const payload = {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        service: serviceTitle,
        message: formattedMsg,
        source: source,
        metadata: {
          form_source: source,
          option_type: activeTab,
          relationship: activeTab === "referral" ? relationship : undefined,
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
          trackConversion(`referral_modal_${activeTab}_submit`);
        } catch {
          // Analytics non-blocking
        }
      } else {
        setStatus("error");
        setErrorMessage(
          data.error ||
            "Nu am putut transmite solicitarea în acest moment. Datele tale au fost păstrate. Te rugăm să încerci din nou."
        );
      }
    } catch (err) {
      console.error("[Referral Modal] Submission failed:", err);
      setStatus("error");
      setErrorMessage(
        "A apărut o problemă de conexiune cu serverul. Datele tale au fost păstrate. Te rugăm să încerci din nou."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="referral-modal-title"
      aria-describedby="referral-modal-desc"
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
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/80 shrink-0">
          <div className="space-y-1.5 pr-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-200/70 text-slate-800 text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-slate-700" />
              <span>Program de Recomandare &amp; Beneficii</span>
            </div>

            <h2
              id="referral-modal-title"
              className="text-xl sm:text-2xl font-heading font-bold text-slate-900 leading-tight"
            >
              Cunoști pe cineva care are nevoie de o asigurare?
            </h2>

            <p id="referral-modal-desc" className="text-xs sm:text-sm text-slate-600 leading-snug">
              Recomandă-ne unui prieten, unei persoane din familie sau unei cunoștințe. Analizăm
              nevoia și verificăm ce soluții și beneficii sunt disponibile.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Închide dialogul"
            className="p-2 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors cursor-pointer shrink-0 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Desktop Tab Navigation */}
        <div className="hidden sm:block px-5 pt-3 border-b border-slate-100 bg-white shrink-0">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "referral"}
              onClick={() => {
                setActiveTab("referral");
                setErrorMessage("");
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === "referral"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200/70"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Recomand pe cineva</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "existing_client"}
              onClick={() => {
                setActiveTab("existing_client");
                setErrorMessage("");
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === "existing_client"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200/70"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Sunt deja client Generali</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "second_opinion"}
              onClick={() => {
                setActiveTab("second_opinion");
                setErrorMessage("");
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === "second_opinion"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200/70"
              }`}
            >
              <FileSearch className="w-3.5 h-3.5" />
              <span>Vreau o a doua opinie</span>
            </button>
          </div>
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
                  {activeTab === "referral" && "Mulțumesc pentru recomandare!"}
                  {activeTab === "existing_client" && "Am înregistrat solicitarea ta de verificare!"}
                  {activeTab === "second_opinion" && "Am primit solicitarea pentru a doua opinie!"}
                </h3>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  Te voi contacta în cel mai scurt timp pentru a discuta detaliile și beneficiile
                  disponibile.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left max-w-md mx-auto space-y-1.5 text-xs text-slate-600">
                <p>
                  <span className="font-bold text-slate-800">Nume contact:</span> {name}
                </p>
                <p>
                  <span className="font-bold text-slate-800">Telefon:</span> {phone}
                </p>
                <p>
                  <span className="font-bold text-slate-800">E-mail:</span> {email}
                </p>
                {activeTab === "referral" && (
                  <p>
                    <span className="font-bold text-slate-800">Relație:</span> {relationship}
                  </p>
                )}
              </div>

              {/* Helpful sharing reminder even after submit */}
              {activeTab === "referral" && (
                <div className="max-w-md mx-auto pt-2">
                  <p className="text-xs text-slate-500 mb-2.5">
                    Îi poți trimite prietenului tău mesajul direct pe WhatsApp:
                  </p>
                  <div className="flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={handleWhatsAppShare}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Trimite pe WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copiat!" : "Copiază text"}</span>
                    </button>
                  </div>
                </div>
              )}

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
            <div className="space-y-5">
              {/* MOBILE: 3 Opțiuni Verticale (sm:hidden) */}
              <div className="sm:hidden space-y-2.5" role="tablist" aria-label="Alege tipul de solicitare">
                <div className="flex items-center justify-between pb-0.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Alege una dintre cele 3 opțiuni:
                  </span>
                </div>

                {/* 1. Recomand pe cineva */}
                <div
                  role="tab"
                  tabIndex={0}
                  aria-selected={activeTab === "referral"}
                  onClick={() => {
                    setActiveTab("referral");
                    setErrorMessage("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveTab("referral");
                      setErrorMessage("");
                    }
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left ${
                    activeTab === "referral"
                      ? "border-slate-900 bg-slate-900 text-white shadow-md ring-2 ring-slate-900/10"
                      : "border-slate-200 bg-white hover:bg-slate-50/80 text-slate-900 shadow-xs"
                  }`}
                >
                  <div className="flex items-start gap-2.5 mb-1.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        activeTab === "referral"
                          ? "bg-white/15 text-white"
                          : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold leading-tight">1. Recomand pe cineva</h4>
                      <p
                        className={`text-[11px] mt-1 leading-relaxed ${
                          activeTab === "referral" ? "text-slate-200" : "text-slate-600"
                        }`}
                      >
                        Recomandă un prieten sau partener și aflați ce beneficii reciproce sunt disponibile. Distribuie pe WhatsApp sau lasă-ne datele.
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 flex items-center justify-between border-t border-current/10 mt-2">
                    <span className="text-[10px] font-medium opacity-80">
                      {activeTab === "referral" ? "Formularul este deschis mai jos" : "Apasă pentru selectare"}
                    </span>
                    <button
                      type="button"
                      tabIndex={-1}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        activeTab === "referral"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "bg-slate-900 text-white hover:bg-slate-800"
                      }`}
                    >
                      {activeTab === "referral" ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Opțiune selectată</span>
                        </>
                      ) : (
                        <>
                          <span>Recomandă pe cineva</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* 2. Sunt deja client Generali */}
                <div
                  role="tab"
                  tabIndex={0}
                  aria-selected={activeTab === "existing_client"}
                  onClick={() => {
                    setActiveTab("existing_client");
                    setErrorMessage("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveTab("existing_client");
                      setErrorMessage("");
                    }
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left ${
                    activeTab === "existing_client"
                      ? "border-slate-900 bg-slate-900 text-white shadow-md ring-2 ring-slate-900/10"
                      : "border-slate-200 bg-white hover:bg-slate-50/80 text-slate-900 shadow-xs"
                  }`}
                >
                  <div className="flex items-start gap-2.5 mb-1.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        activeTab === "existing_client"
                          ? "bg-white/15 text-white"
                          : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold leading-tight">2. Sunt deja client Generali</h4>
                      <p
                        className={`text-[11px] mt-1 leading-relaxed ${
                          activeTab === "existing_client" ? "text-slate-200" : "text-slate-600"
                        }`}
                      >
                        Ai deja o poliță Generali? Întreabă dacă ai un discount sau un beneficiu disponibil pentru o nouă asigurare sau recomandare.
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 flex items-center justify-between border-t border-current/10 mt-2">
                    <span className="text-[10px] font-medium opacity-80">
                      {activeTab === "existing_client" ? "Formularul este deschis mai jos" : "Apasă pentru selectare"}
                    </span>
                    <button
                      type="button"
                      tabIndex={-1}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        activeTab === "existing_client"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "bg-slate-900 text-white hover:bg-slate-800"
                      }`}
                    >
                      {activeTab === "existing_client" ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Opțiune selectată</span>
                        </>
                      ) : (
                        <>
                          <span>Verifică dacă ai beneficiu</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* 3. Vreau o a doua opinie */}
                <div
                  role="tab"
                  tabIndex={0}
                  aria-selected={activeTab === "second_opinion"}
                  onClick={() => {
                    setActiveTab("second_opinion");
                    setErrorMessage("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveTab("second_opinion");
                      setErrorMessage("");
                    }
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left ${
                    activeTab === "second_opinion"
                      ? "border-slate-900 bg-slate-900 text-white shadow-md ring-2 ring-slate-900/10"
                      : "border-slate-200 bg-white hover:bg-slate-50/80 text-slate-900 shadow-xs"
                  }`}
                >
                  <div className="flex items-start gap-2.5 mb-1.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        activeTab === "second_opinion"
                          ? "bg-white/15 text-white"
                          : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      <FileSearch className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold leading-tight">3. Vreau o a doua opinie</h4>
                      <p
                        className={`text-[11px] mt-1 leading-relaxed ${
                          activeTab === "second_opinion" ? "text-slate-200" : "text-slate-600"
                        }`}
                      >
                        Ai deja o poliță și vrei să știi dacă acoperirile sunt potrivite? Analiza inițială este gratuită și fără obligații.
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 flex items-center justify-between border-t border-current/10 mt-2">
                    <span className="text-[10px] font-medium opacity-80">
                      {activeTab === "second_opinion" ? "Formularul este deschis mai jos" : "Apasă pentru selectare"}
                    </span>
                    <button
                      type="button"
                      tabIndex={-1}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        activeTab === "second_opinion"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "bg-slate-900 text-white hover:bg-slate-800"
                      }`}
                    >
                      {activeTab === "second_opinion" ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Opțiune selectată</span>
                        </>
                      ) : (
                        <>
                          <span>Solicită a doua opinie gratuită</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="pt-1.5 pb-1 flex items-center gap-2">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Formular de completat
                  </span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>
              </div>
              {/* Mutual Benefits Banner (Section 3) */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/60 border border-slate-200/90 text-left space-y-2">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-slate-800 shrink-0" />
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    Tu recomanzi. Prietenul tău descoperă soluția potrivită. Iar amândoi puteți beneficia de avantaje.
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Spune-ne pe cine ai vrea să recomanzi sau distribuie-i linkul nostru. Verificăm ce
                  beneficii pot fi oferite pentru recomandare și pentru persoana recomandată, în
                  funcție de produs, eligibilitate și regulile aplicabile.
                </p>
                <p className="text-[10px] text-slate-500 italic">
                  * Beneficiile și condițiile speciale sunt confirmate individual după analiza eligibilității. Fără promisiuni automate nerealiste.
                </p>
              </div>

              {/* Error Banner */}
              {errorMessage && (
                <div
                  role="alert"
                  className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2.5 animate-in fade-in duration-150"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                  <span className="leading-relaxed">{errorMessage}</span>
                </div>
              )}

              {/* TAB 1: RECOMAND PE CINEVA */}
              {activeTab === "referral" && (
                <div className="space-y-5">
                  {/* WhatsApp & Copy Sharing Box (Section 4) */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        Distribuire rapidă &amp; confidențială
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Cea mai simplă cale: trimite direct mesajul de recomandare prin WhatsApp
                        sau copiază textul pentru orice altă aplicație. Prietenul tău alege dacă
                        dorește să ne contacteze direct.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 italic leading-relaxed">
                      „{WHATSAPP_REFERRAL_MESSAGE}”
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 pt-1">
                      <button
                        type="button"
                        onClick={handleWhatsAppShare}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Recomandă prin WhatsApp</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleCopyMessage}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs transition-colors shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Mesaj copiat!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-600" />
                            <span>Copiază mesajul</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink mx-3 text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                      sau lasă-ne datele tale și discutăm pașii
                    </span>
                    <div className="flex-grow border-t border-slate-200"></div>
                  </div>

                  {/* Form for Tab 1 */}
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="referral-name"
                        className="text-xs font-bold text-slate-900 uppercase tracking-wide block"
                      >
                        Numele tău complet <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="referral-name"
                        type="text"
                        required
                        placeholder="ex: Andrei Popescu"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (fieldErrors.name) {
                            setFieldErrors((prev) => {
                              const next = { ...prev };
                              delete next.name;
                              return next;
                            });
                          }
                        }}
                        className={`w-full h-11 px-3.5 rounded-xl border text-xs sm:text-sm font-medium focus:bg-white focus:outline-none transition-colors ${
                          fieldErrors.name
                            ? "border-red-400 bg-red-50/50 text-slate-900 focus:border-red-600"
                            : "border-slate-200 bg-slate-50/50 text-slate-900 focus:border-slate-900"
                        }`}
                      />
                      {fieldErrors.name && (
                        <p className="text-[11px] text-red-600 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="referral-phone"
                          className="text-xs font-bold text-slate-900 uppercase tracking-wide block"
                        >
                          Telefonul tău <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="referral-phone"
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
                          htmlFor="referral-email"
                          className="text-xs font-bold text-slate-900 uppercase tracking-wide block"
                        >
                          E-mailul tău <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="referral-email"
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

                    {/* Relationship Selection */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-900 uppercase tracking-wide block">
                        Relația cu persoana recomandată <span className="text-red-500">*</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {RELATIONSHIP_OPTIONS.map((opt) => {
                          const isSel = relationship === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                setRelationship(opt);
                                if (fieldErrors.relationship) {
                                  setFieldErrors((prev) => {
                                    const next = { ...prev };
                                    delete next.relationship;
                                    return next;
                                  });
                                }
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                                isSel
                                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {fieldErrors.relationship && (
                        <p className="text-[11px] text-red-600 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          {fieldErrors.relationship}
                        </p>
                      )}
                    </div>

                    {/* Optional Details */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="referral-details"
                          className="text-xs font-bold text-slate-900 uppercase tracking-wide block"
                        >
                          Detalii despre nevoia de asigurare{" "}
                          <span className="text-slate-400 font-normal normal-case">(opțional)</span>
                        </label>
                      </div>
                      <textarea
                        id="referral-details"
                        rows={2}
                        placeholder="ex: Prietenul meu caută o asigurare CASCO / locuință / viață și dorește o analiză..."
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-slate-900 transition-colors resize-none placeholder:text-slate-400 placeholder:font-normal leading-relaxed"
                      />
                    </div>

                    {/* Strict GDPR notice on third-party data */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 leading-relaxed">
                      <span className="font-bold text-slate-800">Protecția datelor:</span> Nu
                      solicităm numărul de telefon sau e-mailul persoanei recomandate fără ca
                      aceasta să fi fost informată și de acord. Te vom contacta pe tine pentru a
                      stabili modul optim în care putem lua legătura cu persoana interesată.
                    </div>

                    {/* Privacy consent checkbox */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-start gap-2.5">
                        <input
                          id="referral-privacy"
                          type="checkbox"
                          required
                          checked={consent}
                          onChange={(e) => {
                            setConsent(e.target.checked);
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
                          htmlFor="referral-privacy"
                          className="text-[11px] text-slate-600 leading-relaxed cursor-pointer"
                        >
                          Sunt de acord cu prelucrarea datelor mele de contact în scopul gestionării
                          recomandării conform{" "}
                          <Link
                            href="/politica-de-confidentialitate"
                            target="_blank"
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

                    {/* Submit Button */}
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
                          <span>Trimite Recomandarea</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 2: SUNT DEJA CLIENT GENERALI */}
              {activeTab === "existing_client" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Ești deja client Generali?
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Întreabă dacă ai un discount sau un beneficiu disponibil pentru o nouă poliță
                      ori pentru o recomandare. Verificăm istoricul și portofoliul tău pentru a
                      identifica ofertele la care ești eligibil.
                    </p>
                    <p className="text-[10px] text-slate-500 italic pt-1">
                      * Beneficiile depind de tipul produsului, clauzele contractuale și regulile
                      aplicabile. Nu promitem reduceri automate fără o analiză prealabilă.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="existing-name"
                        className="text-xs font-bold text-slate-900 uppercase tracking-wide block"
                      >
                        Numele tău complet <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="existing-name"
                        type="text"
                        required
                        placeholder="ex: Andrei Popescu"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (fieldErrors.name) {
                            setFieldErrors((prev) => {
                              const next = { ...prev };
                              delete next.name;
                              return next;
                            });
                          }
                        }}
                        className={`w-full h-11 px-3.5 rounded-xl border text-xs sm:text-sm font-medium focus:bg-white focus:outline-none transition-colors ${
                          fieldErrors.name
                            ? "border-red-400 bg-red-50/50 text-slate-900 focus:border-red-600"
                            : "border-slate-200 bg-slate-50/50 text-slate-900 focus:border-slate-900"
                        }`}
                      />
                      {fieldErrors.name && (
                        <p className="text-[11px] text-red-600 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="existing-phone"
                          className="text-xs font-bold text-slate-900 uppercase tracking-wide block"
                        >
                          Telefon de contact <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="existing-phone"
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
                          htmlFor="existing-email"
                          className="text-xs font-bold text-slate-900 uppercase tracking-wide block"
                        >
                          E-mail de contact <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="existing-email"
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

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="existing-details"
                          className="text-xs font-bold text-slate-900 uppercase tracking-wide block"
                        >
                          Poliță existentă sau întrebare{" "}
                          <span className="text-slate-400 font-normal normal-case">(opțional)</span>
                        </label>
                      </div>
                      <textarea
                        id="existing-details"
                        rows={3}
                        placeholder="ex: Am o poliță CASCO sau locuință și vreau să aflu ce opțiuni sau beneficii am pentru o nouă asigurare sau recomandare..."
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-slate-900 transition-colors resize-none placeholder:text-slate-400 placeholder:font-normal leading-relaxed"
                      />
                    </div>

                    {/* Privacy consent checkbox */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-start gap-2.5">
                        <input
                          id="existing-privacy"
                          type="checkbox"
                          required
                          checked={consent}
                          onChange={(e) => {
                            setConsent(e.target.checked);
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
                          htmlFor="existing-privacy"
                          className="text-[11px] text-slate-600 leading-relaxed cursor-pointer"
                        >
                          Sunt de acord cu prelucrarea datelor mele de contact în scopul verificării
                          beneficiilor conform{" "}
                          <Link
                            href="/politica-de-confidentialitate"
                            target="_blank"
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

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md hover:shadow-lg mt-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Se verifică...</span>
                        </>
                      ) : (
                        <>
                          <span>Verifică Beneficiile Disponibile</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 3: VREAU O A DOUA OPINIE */}
              {activeTab === "second_opinion" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Vrei o a doua opinie pentru polița ta?
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ai deja o poliță și vrei să știi dacă acoperirile sunt potrivite? Putem discuta
                      și analiza inițială este gratuită. Identificăm eventualele clauze lipsă,
                      subasigurări sau posibilități de optimizare.
                    </p>
                    <p className="text-[10px] text-slate-500 italic pt-1">
                      * Discutăm de principiu. Nu solicita și nu transmite documente sensibile prin
                      acest formular inițial.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="second-name"
                        className="text-xs font-bold text-slate-900 uppercase tracking-wide block"
                      >
                        Numele tău complet <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="second-name"
                        type="text"
                        required
                        placeholder="ex: Andrei Popescu"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (fieldErrors.name) {
                            setFieldErrors((prev) => {
                              const next = { ...prev };
                              delete next.name;
                              return next;
                            });
                          }
                        }}
                        className={`w-full h-11 px-3.5 rounded-xl border text-xs sm:text-sm font-medium focus:bg-white focus:outline-none transition-colors ${
                          fieldErrors.name
                            ? "border-red-400 bg-red-50/50 text-slate-900 focus:border-red-600"
                            : "border-slate-200 bg-slate-50/50 text-slate-900 focus:border-slate-900"
                        }`}
                      />
                      {fieldErrors.name && (
                        <p className="text-[11px] text-red-600 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="second-phone"
                          className="text-xs font-bold text-slate-900 uppercase tracking-wide block"
                        >
                          Telefon de contact <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="second-phone"
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
                          htmlFor="second-email"
                          className="text-xs font-bold text-slate-900 uppercase tracking-wide block"
                        >
                          E-mail de contact <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="second-email"
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

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="second-details"
                          className="text-xs font-bold text-slate-900 uppercase tracking-wide block"
                        >
                          Ce tip de poliță vrei să analizăm sau ce nelămurire ai?{" "}
                          <span className="text-slate-400 font-normal normal-case">(opțional)</span>
                        </label>
                      </div>
                      <textarea
                        id="second-details"
                        rows={3}
                        placeholder="ex: Am o poliță de locuință / CASCO / viață și vreau să știu dacă sunt acoperit optim sau dacă pot obține condiții mai bune..."
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-slate-900 transition-colors resize-none placeholder:text-slate-400 placeholder:font-normal leading-relaxed"
                      />
                    </div>

                    {/* Privacy consent checkbox */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-start gap-2.5">
                        <input
                          id="second-privacy"
                          type="checkbox"
                          required
                          checked={consent}
                          onChange={(e) => {
                            setConsent(e.target.checked);
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
                          htmlFor="second-privacy"
                          className="text-[11px] text-slate-600 leading-relaxed cursor-pointer"
                        >
                          Sunt de acord cu prelucrarea datelor mele de contact în scopul oferirii unei a
                          doua opinii conform{" "}
                          <Link
                            href="/politica-de-confidentialitate"
                            target="_blank"
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
                          <span>Solicită o A Doua Opinie Gratuită</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
