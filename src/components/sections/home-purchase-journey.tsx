"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Home,
  FileCheck2,
  Building2,
  Landmark,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
  Clock,
  Sparkles,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitHomePurchaseLead } from "@/lib/actions";

export function HomePurchaseJourney() {
  const searchParams = useSearchParams();

  const rawSource = searchParams.get("source");
  const rawListingId = searchParams.get("listing_id") || searchParams.get("listingId") || searchParams.get("id");

  const [source] = useState<string>(() => rawSource?.toLowerCase() || "Direct");
  const [listingId] = useState<string>(() => rawListingId || "");

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [propertyLocation, setPropertyLocation] = useState("");
  const [propertyType, setPropertyType] = useState("Apartament");
  const [surfaceArea, setSurfaceArea] = useState("");
  const [purchaseStage, setPurchaseStage] = useState("Proprietate selectată");
  const [hasMortgage, setHasMortgage] = useState("Da — Credit Ipotecar");
  const [bankName, setBankName] = useState("");
  const [estimatedSigningDate, setEstimatedSigningDate] = useState("");
  const [requestedAssistance, setRequestedAssistance] = useState<string[]>([
    "PAD (Obligatorie)",
    "Poliță Facultativă Clădire + Bunuri",
    "Cerinte Bancă / Ipotecă",
  ]);
  const [consent, setConsent] = useState(true);

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);

  const toggleAssistance = (item: string) => {
    setRequestedAssistance((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("propertyLocation", propertyLocation);
      formData.append("propertyType", propertyType);
      formData.append("surfaceArea", surfaceArea);
      formData.append("purchaseStage", purchaseStage);
      formData.append("hasMortgage", hasMortgage);
      formData.append("bankName", bankName);
      formData.append("estimatedSigningDate", estimatedSigningDate);
      requestedAssistance.forEach((ast) => formData.append("requestedAssistance", ast));
      formData.append("source", source);
      formData.append("listingId", listingId);
      formData.append("consent", consent ? "true" : "false");

      const res = await submitHomePurchaseLead(formData);

      if (res.success && res.referenceId) {
        setSubmittedReference(res.referenceId);
      } else {
        setErrorMessage(res.error || "A apărut o eroare la transmiterea cererii. Te rugăm să reîncerci.");
      }
    } catch {
      setErrorMessage("Eroare de conexiune. Te rugăm să verifici datele și să reîncerci.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-16">
      {/* 1. EDUCATIONAL 4-PILLAR ARCHITECTURE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Pillar 1: PAD */}
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
            01
          </div>
          <h3 className="text-lg font-heading font-bold text-white">1. Asigurarea Obligatorie (PAD)</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Obligație legală prevăzută de Legea 260/2008. Acoperă strict 3 riscuri de dezastre naturale (cutremur, inundație naturală, alunecare de teren) în limita a 20.000 € (Tip A) sau 10.000 € (Tip B).
          </p>
          <div className="pt-2 text-[11px] text-zinc-500 border-t border-zinc-800/80 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>Condiție prealabilă obligatorie pentru credit și notariat.</span>
          </div>
        </div>

        {/* Pillar 2: Facultativa */}
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
            02
          </div>
          <h3 className="text-lg font-heading font-bold text-white">2. Asigurarea Facultativă Clădire</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Protejează valoarea reală de reconstrucție a imobilului împotriva incendiilor, exploziilor, furtunilor, avariilor la conductele de apă și răspunderii civile față de vecini.
          </p>
          <div className="pt-2 text-[11px] text-zinc-500 border-t border-zinc-800/80 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Acoperirea depinde de termenii contractuali și clauzele alese.</span>
          </div>
        </div>

        {/* Pillar 3: Bank Requirements */}
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
            03
          </div>
          <h3 className="text-lg font-heading font-bold text-white">3. Cerințele Băncii & Ipotecă</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            În cazul achiziției prin credit, banca impune cesionarea poliței de locuință în favoarea sa. De asemenea, poate solicita sau recomanda o asigurare de viață corelată cu soldul creditului.
          </p>
          <div className="pt-2 text-[11px] text-zinc-500 border-t border-zinc-800/80 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Pregătim polițele cu anexa de cesiune conform normelor băncii.</span>
          </div>
        </div>
      </div>

      {/* 2. PREPARATION CHECKLIST BOX */}
      <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-zinc-900/80 to-zinc-950 border border-zinc-800 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6 pb-6 border-b border-zinc-800">
          <div>
            <span className="text-xs uppercase tracking-widest text-blue-400 font-bold block mb-1">
              CHECKLIST PREGĂTIRE DOSAR
            </span>
            <h3 className="text-2xl font-heading font-bold text-white">
              Ce documente și informații sunt necesare înainte de semnare
            </h3>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-800 text-zinc-300 text-xs font-semibold shrink-0">
            <Clock className="w-4 h-4 text-blue-400" />
            Recomandat cu 3-5 zile înainte de Notar
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-1">
            <p className="font-bold text-zinc-200">1. Date Tehnice Imobil</p>
            <p className="text-zinc-400 leading-relaxed">Adresă completă, suprafață utilă, an construcție, structură de rezistență (beton, cărămidă etc.).</p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-1">
            <p className="font-bold text-zinc-200">2. Acte Proprietate / Cadastru</p>
            <p className="text-zinc-400 leading-relaxed">Extras de Carte Funciară recent, releveu / schiță cadastrală și contract de vânzare-cumpărare / antecontract.</p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-1">
            <p className="font-bold text-zinc-200">3. Datele Băncii Finanțatoare</p>
            <p className="text-zinc-400 leading-relaxed">Denumirea băncii, sucursala, numărul contractului de credit și clauzele standard de cesiune cerute de bancă.</p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-1">
            <p className="font-bold text-zinc-200">4. Evaluarea Bunurilor</p>
            <p className="text-zinc-400 leading-relaxed">Suma estimată pentru finisaje premium, mobilier și echipamente casnice incluse în polița facultativă.</p>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE ADVISORY FORM */}
      <div id="formular-achizitie" className="p-8 sm:p-12 rounded-[2.5rem] bg-zinc-950/90 border border-zinc-800 shadow-2xl relative">
        <AnimatePresence mode="wait">
          {submittedReference ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-6 max-w-xl mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-heading font-bold text-white">
                  Solicitarea a fost înregistrată!
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Număr de referință solicitare: <strong className="text-white font-mono">{submittedReference}</strong>.
                  Consultantul Cristian Văduva va analiza cerințele transmise și vă va contacta pentru pregătirea ofertelor și a anexelor de cesiune.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 text-left space-y-1">
                <p className="font-bold text-zinc-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Etapele următoare:
                </p>
                <p>1. Verificăm eligibilitatea imobilului și cerințele băncii.</p>
                <p>2. Transmitem propunerea optimă (PAD + Facultativă + Cesiune).</p>
                <p>3. Emiterea se finalizează digital, documentele fiind pregătite înainte de semnarea notarială.</p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setSubmittedReference(null)}
                className="rounded-full border-zinc-800 text-zinc-300 text-xs"
              >
                Trimite o altă solicitare
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="space-y-8 max-w-3xl mx-auto"
            >
              <div className="text-center space-y-2 pb-6 border-b border-zinc-800/80">
                {source !== "Direct" && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Parteneriat Ecosistem: {source.toUpperCase()}{listingId ? ` • Listing #${listingId}` : ""}</span>
                  </div>
                )}
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                  Pregătește Asigurarea pentru Noua Ta Locuință
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Completează datele esențiale pentru a primi o analiză comparativă și proiectul de poliță conform cerințelor băncii sau notarului.
                </p>
              </div>

              {errorMessage && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Step A: Property Details */}
              <div className="space-y-4">
                <h4 className="text-sm uppercase tracking-wider font-bold text-zinc-300 flex items-center gap-2">
                  <Home className="w-4 h-4 text-blue-400" />
                  1. Detalii despre Proprietate & Stadiu Achiziție
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400">Tip Imobil</label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-blue-500"
                    >
                      <option value="Apartament">Apartament (Bloc)</option>
                      <option value="Casă / Vilă Individuală">Casă / Vilă Individuală</option>
                      <option value="Duplex / Calcan">Duplex / Înșiruită</option>
                      <option value="Construcție Nouă (Dezvoltator)">Construcție Nouă (Dezvoltator)</option>
                      <option value="Penthouse / Proprietate Premium">Penthouse / Proprietate Premium</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400">Localitate / Sector</label>
                    <Input
                      placeholder="Ex: București, Sector 1 sau Cluj-Napoca"
                      value={propertyLocation}
                      onChange={(e) => setPropertyLocation(e.target.value)}
                      className="h-11 bg-zinc-900 border-zinc-800 text-white text-xs rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400">Stadiu Achiziție</label>
                    <select
                      value={purchaseStage}
                      onChange={(e) => setPurchaseStage(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-blue-500"
                    >
                      <option value="Explorare / Căutare">Explorare / Căutare proprietate</option>
                      <option value="Proprietate selectată / Antecontract semnat">Proprietate selectată / Antecontract semnat</option>
                      <option value="Dosar de credit în analiză la bancă">Dosar de credit în analiză la bancă</option>
                      <option value="Semnare contract final programată">Semnare contract final programată (urgent)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400">Suprafață Utilă Aproximativă (mp)</label>
                    <Input
                      placeholder="Ex: 85"
                      value={surfaceArea}
                      onChange={(e) => setSurfaceArea(e.target.value)}
                      className="h-11 bg-zinc-900 border-zinc-800 text-white text-xs rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Step B: Financing & Bank */}
              <div className="space-y-4 pt-4 border-t border-zinc-800/60">
                <h4 className="text-sm uppercase tracking-wider font-bold text-zinc-300 flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-emerald-400" />
                  2. Finanțare & Data Semnării
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400">Credit Ipotecar</label>
                    <select
                      value={hasMortgage}
                      onChange={(e) => setHasMortgage(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-blue-500"
                    >
                      <option value="Da — Credit Ipotecar">Da — Credit Ipotecar</option>
                      <option value="Da — Noua Casă">Da — Programul Noua Casă</option>
                      <option value="Nu — Fonduri Proprii (Cash)">Nu — Fonduri Proprii (Cash)</option>
                      <option value="Nedecis / În evaluare">Nedecis / În evaluare</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400">Banca Finanțatoare (Opțional)</label>
                    <Input
                      placeholder="Ex: BCR, Banca Transilvania, ING, BRD..."
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="h-11 bg-zinc-900 border-zinc-800 text-white text-xs rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400">Data Estimată a Semnării</label>
                    <Input
                      type="date"
                      value={estimatedSigningDate}
                      onChange={(e) => setEstimatedSigningDate(e.target.value)}
                      className="h-11 bg-zinc-900 border-zinc-800 text-white text-xs rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Step C: Assistance Packages */}
              <div className="space-y-3 pt-4 border-t border-zinc-800/60">
                <label className="text-xs uppercase tracking-wider font-bold text-zinc-300 block">
                  Ce tipuri de asistență dorești să analizăm?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    "PAD (Asigurarea Obligatorie)",
                    "Poliță Facultativă Clădire + Bunuri",
                    "Cesionare Poliță către Bancă",
                    "Evaluare Asigurare de Viață Credit",
                    "Răspundere Civilă față de Vecini",
                  ].map((ast) => (
                    <button
                      key={ast}
                      type="button"
                      onClick={() => toggleAssistance(ast)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                        requestedAssistance.includes(ast)
                          ? "bg-blue-500/10 border-blue-500/40 text-white font-medium"
                          : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      <span>{ast}</span>
                      {requestedAssistance.includes(ast) && (
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step D: Contact Details */}
              <div className="space-y-4 pt-4 border-t border-zinc-800/60">
                <h4 className="text-sm uppercase tracking-wider font-bold text-zinc-300 flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-blue-400" />
                  3. Date de Contact pentru Transmiterea Ofertelor
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400">Nume & Prenume *</label>
                    <Input
                      placeholder="Ex: Andrei Popescu"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-11 bg-zinc-900 border-zinc-800 text-white text-xs rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400">Număr Telefon *</label>
                    <Input
                      placeholder="Ex: 0722 000 000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="h-11 bg-zinc-900 border-zinc-800 text-white text-xs rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400">Adresă Email (Opțional)</label>
                    <Input
                      type="email"
                      placeholder="Ex: andrei@exemplu.ro"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 bg-zinc-900 border-zinc-800 text-white text-xs rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Privacy Consent */}
              <div className="pt-2 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent-purchase"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-zinc-800 bg-zinc-900 text-blue-600 focus:ring-0"
                />
                <label htmlFor="consent-purchase" className="text-xs text-zinc-400 leading-relaxed cursor-pointer">
                  Sunt de acord cu prelucrarea datelor de contact în scopul pregătirii consultanței de asigurare, conform{" "}
                  <a href="/politica-de-confidentialitate" target="_blank" className="text-zinc-300 underline underline-offset-2">
                    Politicii de Confidențialitate
                  </a>
                  . Emiterea oricărei polițe este condiționată de eligibilitate și termenii asiguratorului.
                </label>
              </div>

              {/* Submit CTA */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-heading font-bold text-sm tracking-wide shadow-xl transition-all"
              >
                {isSubmitting ? (
                  "Se procesează solicitarea..."
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Solicită Evaluarea & Oferta de Asigurare <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
