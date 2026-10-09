"use client";

import * as React from "react";
import { useState } from "react";
import { Shield, Lock, CheckCircle2, AlertCircle, ArrowRight, Loader2, Phone, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";

interface PrivateClientEnquiryFormProps {
  defaultAssetCategory?: string;
  sourceContext?: string;
  onSuccess?: () => void;
  className?: string;
}

const assetOptions = [
  "Supercar / Hypercar",
  "Classic / Collector Car",
  "Yacht",
  "Superyacht",
  "Private Jet",
  "Helicopter",
  "Jewellery",
  "Luxury Watches",
  "Fine Art",
  "Collectibles",
  "Luxury Residence",
  "Multiple Assets",
  "Other"
];

const currencies = ["EUR", "USD", "GBP", "RON", "Other"];

export function PrivateClientEnquiryForm({
  defaultAssetCategory,
  sourceContext = "Private Client Hub",
  onSuccess,
  className = ""
}: PrivateClientEnquiryFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("România");
  const [city, setCity] = useState("");
  const [preferredContact, setPreferredContact] = useState<"Phone" | "WhatsApp" | "Email">("Phone");
  const [assetCategory, setAssetCategory] = useState(defaultAssetCategory || "Supercar / Hypercar");
  const [currency, setCurrency] = useState("EUR");
  const [estimatedValue, setEstimatedValue] = useState("");
  const [valueNotDetermined, setValueNotDetermined] = useState(false);
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState(""); // anti-spam bot trap
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      // Silently discard spam bots
      setStatus("success");
      return;
    }

    if (!name.trim() || !phone.trim()) {
      setStatus("error");
      setErrorMessage("Vă rugăm să introduceți numele complet și numărul de telefon.");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      service: `PRIVATE CLIENT — ${assetCategory}`,
      source: `Private Client (${sourceContext})`,
      message: message.trim() || "Solicitare evaluare confidențială Private Client.",
      metadata: {
        division: "PRIVATE CLIENT",
        lead_type: "PRIVATE CLIENT",
        assetCategory,
        estimatedValue: valueNotDetermined ? "Not yet determined" : (estimatedValue ? `${estimatedValue} ${currency}` : "Unspecified"),
        currency,
        country: country.trim(),
        city: city.trim(),
        preferredContact,
        sourceContext,
        submittedAt: new Date().toISOString()
      }
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
          (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "private_client_enquiry_success", {
            category: assetCategory,
            source: sourceContext
          });
        }
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setStatus("error");
        setErrorMessage(data.error || "A apărut o problemă la transmiterea solicitării. Vă rugăm să reîncercați sau să ne contactați direct.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Eroare de conexiune securizată. Vă rugăm să reîncercați.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "success") {
    return (
      <div className={`p-8 md:p-12 rounded-3xl bg-zinc-900 text-white border border-zinc-800 text-center relative overflow-hidden shadow-2xl ${className}`}>
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />
        
        <div className="relative z-10 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-semibold mb-2 block">
            CONFIDENTIAL ENQUIRY RECEIVED
          </span>

          <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
            Solicitarea dumneavoastră a fost înregistrată.
          </h3>

          <p className="text-zinc-300 text-sm leading-relaxed mb-8">
            Vă mulțumim pentru încredere. Cristian Văduva va analiza personal cerințele și structura de risc înainte de a vă contacta prin canalul preferat ({preferredContact === "WhatsApp" ? "WhatsApp" : preferredContact === "Email" ? "Email" : "Telefon"}).
          </p>

          <div className="bg-zinc-950/60 p-5 rounded-2xl border border-zinc-800 text-left mb-8 space-y-2 text-xs text-zinc-400">
            <div className="flex justify-between">
              <span className="text-zinc-500">Asset Category:</span>
              <span className="text-zinc-200 font-medium">{assetCategory}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Contact:</span>
              <span className="text-zinc-200 font-medium">{phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Protocoale:</span>
              <span className="text-emerald-400 font-medium">Confidențialitate Strictă (NDA Standard)</span>
            </div>
          </div>

          <Button
            onClick={() => setStatus("idle")}
            variant="outline"
            className="rounded-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            Trimite o altă solicitare
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-8 md:p-12 rounded-3xl bg-[#0d0f12] text-white border border-zinc-800 shadow-2xl relative overflow-hidden ${className}`}>
      {/* Decorative ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-zinc-800/20 rounded-full blur-3xl -z-0 pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-10 text-left border-b border-zinc-800/80 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/60 text-zinc-300 text-xs font-semibold tracking-wider uppercase mb-3 border border-zinc-700/50">
            <Lock className="w-3.5 h-3.5 text-zinc-400" />
            PRIVATE CLIENT — CONFIDENTIAL ENQUIRY
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tight">
            Tell us what you would like to protect.
          </h2>
          <p className="text-zinc-400 text-sm mt-2 leading-relaxed max-w-2xl">
            We will review the requirements and determine the appropriate insurance route. Every enquiry is handled under strict confidentiality.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Honeypot hidden input */}
          <input
            type="text"
            name="website_code_verify"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* 1. ASSET SECTION */}
          <div className="space-y-4">
            <label className="block text-xs uppercase tracking-widest text-zinc-400 font-bold">
              1. Asset Category <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {assetOptions.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setAssetCategory(opt)}
                  className={`p-3 rounded-xl text-xs font-medium text-left transition-all border ${
                    assetCategory === opt
                      ? "bg-zinc-100 text-zinc-950 border-white font-semibold shadow-md"
                      : "bg-zinc-900/80 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* 2. ESTIMATED VALUE & LOCATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-widest text-zinc-400 font-bold">
                Estimated Value
              </label>
              <div className="flex gap-2">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  disabled={valueNotDetermined}
                  className="bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm rounded-xl px-3 py-3.5 focus:outline-none focus:border-zinc-500 disabled:opacity-50"
                >
                  {currencies.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder={valueNotDetermined ? "În curs de evaluare" : "ex: 450.000"}
                  value={valueNotDetermined ? "" : estimatedValue}
                  onChange={(e) => setEstimatedValue(e.target.value)}
                  disabled={valueNotDetermined}
                  className="flex-1 bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600 disabled:opacity-50"
                />
              </div>
              <label className="flex items-center gap-2 mt-2 cursor-pointer text-xs text-zinc-400 hover:text-zinc-300">
                <input
                  type="checkbox"
                  checked={valueNotDetermined}
                  onChange={(e) => setValueNotDetermined(e.target.checked)}
                  className="rounded border-zinc-700 bg-zinc-900 text-zinc-100 focus:ring-0"
                />
                <span>Not yet determined / Subject to professional appraisal</span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-zinc-400 font-bold">
                  Country
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="România / Monaco / UK"
                  className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-zinc-400 font-bold">
                  City / Region
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="București / Cluj / Ilfov"
                  className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600"
                />
              </div>
            </div>
          </div>

          {/* 3. PERSONAL INFORMATION & CONTACT PREFERENCE */}
          <div className="space-y-4 pt-4 border-t border-zinc-800/80">
            <label className="block text-xs uppercase tracking-widest text-zinc-400 font-bold">
              2. Personal Information & Confidential Contact
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ex: Cristian Popescu"
                  className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400">
                  Phone / Direct Line <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+40 7..."
                  className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600"
                />
              </div>
            </div>

            {/* Preferred Contact Method */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs text-zinc-400">Preferred Contact Method:</label>
              <div className="inline-flex p-1 bg-zinc-900 rounded-xl border border-zinc-800 gap-1">
                <button
                  type="button"
                  onClick={() => setPreferredContact("Phone")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                    preferredContact === "Phone"
                      ? "bg-zinc-100 text-zinc-900 font-semibold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" /> Direct Call
                </button>
                <button
                  type="button"
                  onClick={() => setPreferredContact("WhatsApp")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                    preferredContact === "WhatsApp"
                      ? "bg-emerald-600 text-white font-semibold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => setPreferredContact("Email")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                    preferredContact === "Email"
                      ? "bg-zinc-100 text-zinc-900 font-semibold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" /> Email
                </button>
              </div>
            </div>
          </div>

          {/* 4. ADDITIONAL INFORMATION */}
          <div className="space-y-2 pt-4 border-t border-zinc-800/80">
            <label className="block text-xs uppercase tracking-widest text-zinc-400 font-bold">
              3. Additional Risk & Asset Context
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us anything relevant about the asset, collection, ownership structure, storage security or unique risk considerations..."
              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm rounded-xl p-4 focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600 leading-relaxed"
            />
          </div>

          {/* Error display */}
          {status === "error" && (
            <div className="p-4 rounded-xl bg-red-950/50 border border-red-800/50 text-red-200 text-xs flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Compliance notice & CTA */}
          <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-xs text-zinc-500 max-w-md leading-normal">
              <span className="flex items-center gap-1 text-zinc-400 font-medium mb-1">
                <Shield className="w-3.5 h-3.5 text-zinc-400" /> Discretion & Compliance Guarantee
              </span>
              Coverage, eligibility, limits, exclusions and availability are subject to underwriting, policy terms and applicable requirements.
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto h-14 px-8 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-sm tracking-wide shadow-2xl flex items-center justify-center gap-2 flex-shrink-0"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Securing Transmission...
                </>
              ) : (
                <>
                  REQUEST PRIVATE CLIENT REVIEW
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
