"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import {
  X,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Car,
  Home,
  Briefcase
} from "lucide-react";
import Link from "next/link";
import { trackConversion } from "@/lib/analytics";

export function QuickOfferModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  
  // Contextual Fields
  const [carDetails, setCarDetails] = useState("");
  const [carYear, setCarYear] = useState("");
  const [carValue, setCarValue] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertyValue, setPropertyValue] = useState("");
  const [businessActivity, setBusinessActivity] = useState("");
  
  const [message, setMessage] = useState("");
  const [agreePrivacy, setAgreePrivacy] = useState(true);

  const modalRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setService("");
    setCarDetails("");
    setCarYear("");
    setCarValue("");
    setPropertyType("");
    setPropertyValue("");
    setBusinessActivity("");
    setMessage("");
    setAgreePrivacy(true);
    setStatus("idle");
    setErrorMessage("");
  };

  const handleOpen = () => {
    setIsOpen(true);
    setStatus("idle");
  };

  const handleClose = () => {
    setIsOpen(false);
    if (status === "success") {
      resetForm();
    }
  };

  const isAutoService = service === "RCA" || service === "CASCO" || service === "RCA + CASCO";
  const isHomeService = service === "Locuință";
  const isBusinessService = service === "Business / IMM" || service === "Răspundere profesională" || service === "Cargo";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    // Validation
    if (!name.trim()) {
      setErrorMessage("Te rugăm să introduci numele complet.");
      return;
    }
    if (!phone.trim()) {
      setErrorMessage("Te rugăm să introduci numărul de telefon.");
      return;
    }
    if (!service) {
      setErrorMessage("Te rugăm să selectezi tipul de asigurare dorit.");
      return;
    }
    if (!agreePrivacy) {
      setErrorMessage("Este necesar acordul pentru prelucrarea datelor de contact.");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    try {
      // Build structured metadata for contextual fields
      const metadata: Record<string, string> = {};
      if (isAutoService) {
        if (carDetails.trim()) metadata["Marca și Model"] = carDetails.trim();
        if (carYear.trim()) metadata["An Fabricație"] = carYear.trim();
        if (carValue.trim()) metadata["Valoare Estimată"] = carValue.trim();
      } else if (isHomeService) {
        if (propertyType.trim()) metadata["Tip Proprietate"] = propertyType.trim();
        if (propertyValue.trim()) metadata["Valoare Estimată"] = propertyValue.trim();
      } else if (isBusinessService) {
        if (businessActivity.trim()) metadata["Domeniu / Activitate"] = businessActivity.trim();
      }

      const payload = {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        service: `Cere Ofertă: ${service}`,
        message: message.trim(),
        source: "insurance-site-cere-oferta",
        metadata: Object.keys(metadata).length > 0 ? metadata : undefined
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json().catch(() => ({ success: false }));

      if (data.success || res.ok) {
        setStatus("success");
        trackConversion("quick_offer_form_submit");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Nu am putut trimite solicitarea. Te rugăm să încerci din nou.");
      }
    } catch (err) {
      console.error("[Quick Offer] Submission error:", err);
      setStatus("error");
      setErrorMessage("A apărut o problemă de conexiune. Te rugăm să încerci din nou.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ALWAYS-ON FLOATING CTA BUTTON (Desktop & Mobile Safe Area) */}
      <div className="fixed bottom-6 right-6 z-40 pb-[env(safe-area-inset-bottom)] pointer-events-auto">
        <button
          type="button"
          onClick={handleOpen}
          aria-label="Deschide formularul Cere Ofertă"
          className="group inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 font-bold text-xs uppercase tracking-wider cursor-pointer border border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-slate-900/30"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <FileText className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors" />
          <span>CERE OFERTĂ</span>
        </button>
      </div>

      {/* QUICK OFFER MODAL DIALOG */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-offer-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleClose();
            }
          }}
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/80 shrink-0">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3 text-slate-700" />
                  <span>Consultanță &amp; Cotație Gratuită</span>
                </div>
                <h3
                  id="quick-offer-title"
                  className="text-xl sm:text-2xl font-heading font-bold text-slate-900 leading-tight"
                >
                  Cere Ofertă Personalizată
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Completează datele de bază și Cristian Văduva te va contacta cu opțiunile optime.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Închide formularul"
                className="p-2 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors cursor-pointer shrink-0 shadow-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body / Scrollable Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
              {status === "success" ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-heading font-bold text-slate-900">
                    Solicitarea a fost trimisă.
                  </h4>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Am primit datele tale și revenim cât mai curând cu analiza și oferta personalizată.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-4 px-6 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Închide
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Primary Fields: Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <label htmlFor="offer-name" className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                        Nume complet *
                      </label>
                      <input
                        id="offer-name"
                        type="text"
                        required
                        placeholder="ex: Mihai Ionescu"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-slate-800 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="offer-phone" className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                        Telefon *
                      </label>
                      <input
                        id="offer-phone"
                        type="tel"
                        required
                        placeholder="ex: 07xx xxx xxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-slate-800 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email & Service Dropdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <label htmlFor="offer-email" className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                        Email <span className="text-slate-400 font-normal">(opțional)</span>
                      </label>
                      <input
                        id="offer-email"
                        type="email"
                        placeholder="ex: mihai@exemplu.ro"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-slate-800 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="offer-service" className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                        Ce asigurare cauți? *
                      </label>
                      <select
                        id="offer-service"
                        required
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-slate-800 transition-colors cursor-pointer"
                      >
                        <option value="" disabled>Alege o categorie...</option>
                        <option value="CASCO">CASCO</option>
                        <option value="RCA">RCA</option>
                        <option value="RCA + CASCO">RCA + CASCO</option>
                        <option value="Locuință">Locuință &amp; Patrimoniu</option>
                        <option value="Viață">Asigurare de Viață</option>
                        <option value="Sănătate">Asigurare de Sănătate</option>
                        <option value="Business / IMM">Business &amp; IMM</option>
                        <option value="Răspundere profesională">Răspundere profesională</option>
                        <option value="Cargo">Cargo / Transport Marfă</option>
                        <option value="Alt tip de asigurare">Alt tip de asigurare</option>
                      </select>
                    </div>
                  </div>

                  {/* Contextual Dynamic Fields */}
                  {isAutoService && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 animate-in fade-in duration-200">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wide">
                        <Car className="w-3.5 h-3.5 text-slate-700" />
                        <span>Detalii Automobil</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <input
                          type="text"
                          placeholder="Marca și modelul"
                          value={carDetails}
                          onChange={(e) => setCarDetails(e.target.value)}
                          className="h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-slate-800"
                        />
                        <input
                          type="text"
                          placeholder="An fabricație"
                          value={carYear}
                          onChange={(e) => setCarYear(e.target.value)}
                          className="h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-slate-800"
                        />
                        <input
                          type="text"
                          placeholder="Valoare aprox. (€)"
                          value={carValue}
                          onChange={(e) => setCarValue(e.target.value)}
                          className="h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-slate-800"
                        />
                      </div>
                    </div>
                  )}

                  {isHomeService && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 animate-in fade-in duration-200">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wide">
                        <Home className="w-3.5 h-3.5 text-slate-700" />
                        <span>Detalii Locuință</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <input
                          type="text"
                          placeholder="Tip proprietate (ex: Apartament, Vilă)"
                          value={propertyType}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-slate-800"
                        />
                        <input
                          type="text"
                          placeholder="Valoare aprox. (€)"
                          value={propertyValue}
                          onChange={(e) => setPropertyValue(e.target.value)}
                          className="h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-slate-800"
                        />
                      </div>
                    </div>
                  )}

                  {isBusinessService && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 animate-in fade-in duration-200">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wide">
                        <Briefcase className="w-3.5 h-3.5 text-slate-700" />
                        <span>Detalii Companie</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Domeniu de activitate / Tip business"
                        value={businessActivity}
                        onChange={(e) => setBusinessActivity(e.target.value)}
                        className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-slate-800"
                      />
                    </div>
                  )}

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="offer-message" className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                      Detalii suplimentare <span className="text-slate-400 font-normal">(opțional)</span>
                    </label>
                    <textarea
                      id="offer-message"
                      rows={2}
                      placeholder="Spune-ne pe scurt ce vrei să asiguri sau ce ofertă cauți..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-slate-800 transition-colors resize-none"
                    />
                  </div>

                  {/* Privacy Checkbox */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      id="offer-privacy"
                      type="checkbox"
                      required
                      checked={agreePrivacy}
                      onChange={(e) => setAgreePrivacy(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                    />
                    <label htmlFor="offer-privacy" className="text-[11px] text-slate-600 leading-relaxed cursor-pointer">
                      Sunt de acord ca datele introduse să fie folosite pentru a fi contactat în legătură cu solicitarea mea conform{" "}
                      <Link href="/politica-de-confidentialitate" target="_blank" className="text-slate-900 underline font-semibold">
                        Politicii de Confidențialitate
                      </Link>.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md hover:shadow-lg mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>SE TRIMITE...</span>
                      </>
                    ) : (
                      <>
                        <span>TRIMITE SOLICITAREA</span>
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
