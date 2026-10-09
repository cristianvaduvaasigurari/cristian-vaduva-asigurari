"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  ShieldCheck,
  Calculator,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Key,
  Layers,
  HelpCircle,
  ArrowRight,
  Info,
  Clock,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitRentalProtectionLead } from "@/lib/actions";

export function RentalProtectionJourney() {
  // Calculator State (Deterministic Local MVP)
  const [calcUnits, setCalcUnits] = useState<number>(1);
  const [calcModel, setCalcModel] = useState<"long" | "short" | "mixed">("long");
  const [calcArea, setCalcArea] = useState<string>("60");
  const [calcFocus, setCalcFocus] = useState<"all" | "building" | "liability" | "contents">("all");
  const [hasCalculated, setHasCalculated] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [propertyLocation, setPropertyLocation] = useState("");
  const [propertyType, setPropertyType] = useState("Apartament");
  const [unitsCount, setUnitsCount] = useState("1 proprietate");
  const [surfaceArea, setSurfaceArea] = useState("60");
  const [occupancyStatus, setOccupancyStatus] = useState("Ocupată de chiriaș");
  const [rentalModel, setRentalModel] = useState("Termen lung");
  const [estimatedValue, setEstimatedValue] = useState("");
  const [requestedAssistance, setRequestedAssistance] = useState<string[]>([
    "Asigurare Clădire Închiriată",
    "Răspundere Civilă față de Vecini",
    "Bunuri & Mobilier Proprietar",
  ]);
  const [consent, setConsent] = useState(true);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setHasCalculated(true);
    // Sync calculator values to form defaults
    setUnitsCount(calcUnits === 1 ? "1 proprietate" : calcUnits < 4 ? `${calcUnits} proprietăți` : "4+ proprietăți (Portofoliu)");
    setRentalModel(calcModel === "long" ? "Termen lung" : calcModel === "short" ? "Regim hotelier / Airbnb" : "Mixt (Lung + Scurt)");
    setSurfaceArea(calcArea);
  };

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
      formData.append("unitsCount", unitsCount);
      formData.append("surfaceArea", surfaceArea);
      formData.append("occupancyStatus", occupancyStatus);
      formData.append("rentalModel", rentalModel);
      formData.append("estimatedValue", estimatedValue);
      requestedAssistance.forEach((ast) => formData.append("requestedAssistance", ast));
      formData.append("source", "Rental Protection Journey");
      formData.append("consent", consent ? "true" : "false");

      const res = await submitRentalProtectionLead(formData);

      if (res.success && res.referenceId) {
        setSubmittedReference(res.referenceId);
      } else {
        setErrorMessage(res.error || "A apărut o eroare la trimiterea solicitării. Te rugăm să reîncerci.");
      }
    } catch {
      setErrorMessage("Eroare de comunicare. Te rugăm să verifici datele introduse.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-16">
      {/* 1. SIX EDUCATIONAL PILLARS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Rented Property Status */}
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
            01
          </div>
          <h3 className="text-lg font-heading font-bold text-white">Declararea Destinației Reale</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Asiguratorul trebuie să fie notificat că imobilul este închiriat. O poliță standard de uz rezidențial personal poate fi refuzată la plată dacă dauna are loc într-un imobil închiriat nedeclarat.
          </p>
        </div>

        {/* 2. Building vs Contents */}
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
            02
          </div>
          <h3 className="text-lg font-heading font-bold text-white">Clădire vs. Bunuri Proprietar</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Polița trebuie să diferențieze structura clădirii de mobilierul/electrocasnicele proprietarului și de bunurile personale ale chiriașului (care necesită asigurare proprie a chiriașului).
          </p>
        </div>

        {/* 3. Third-Party Liability */}
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
            03
          </div>
          <h3 className="text-lg font-heading font-bold text-white">Răspunderea față de Vecini</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            O țeavă spartă sau un scurtcircuit produs în apartamentul închiriat poate inunda mai multe etaje inferioare. Clauza de răspundere civilă preia despăgubirea pagubelor cauzate vecinilor.
          </p>
        </div>

        {/* 4. Responsibilities */}
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
            04
          </div>
          <h3 className="text-lg font-heading font-bold text-white">Contractul & Inventarul</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Asigurarea nu înlocuiește procesul-verbal de predare-primire, inventarul foto semnat și mentenanța periodică a instalațiilor sanitare și termice conform legii.
          </p>
        </div>

        {/* 5. Rent Default Caveats */}
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs">
            05
          </div>
          <h3 className="text-lg font-heading font-bold text-white">Garantarea Chiriei (Opțional)</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Protecția împotriva neplății chiriei este un produs specializat distinct, disponibil doar în condiții stricte de eligibilitate și verificare a bonității chiriașului (nu este inclus în polițe standard).
          </p>
        </div>

        {/* 6. Portfolio Management */}
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
            06
          </div>
          <h3 className="text-lg font-heading font-bold text-white">Portofolii Imobiliare</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Pentru investitorii cu multiple unități (mix de închiriere pe termen lung și regim hotelier), analizăm fiecare imobil în parte pentru optimizarea primelor și evitarea suprapunerilor.
          </p>
        </div>
      </div>

      {/* 2. RENTAL RISK ESTIMATOR (DETERMINISTIC LIGHTWEIGHT MVP) */}
      <div className="p-8 sm:p-10 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 relative overflow-hidden shadow-xl">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-widest">
              <Calculator className="w-3.5 h-3.5" />
              Simulator Profil & Checklist Risc Închiriere
            </div>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
              Identifică punctele critice pentru proprietatea ta
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
              Instrument educațional de calibrare a discuției cu un consultant. Nu generează cotații automate de preț și nu reprezintă o ofertă fermă.
            </p>
          </div>

          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400">Număr Proprietăți</label>
                <select
                  value={calcUnits}
                  onChange={(e) => setCalcUnits(Number(e.target.value))}
                  className="w-full h-11 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-blue-500"
                >
                  <option value={1}>1 Proprietate</option>
                  <option value={2}>2 Proprietăți</option>
                  <option value={3}>3 Proprietăți</option>
                  <option value={5}>4-10 (Portofoliu)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400">Model de Închiriere</label>
                <select
                  value={calcModel}
                  onChange={(e) => setCalcModel(e.target.value as "long" | "short" | "mixed")}
                  className="w-full h-11 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-blue-500"
                >
                  <option value="long">Termen Lung (Rezidențial)</option>
                  <option value="short">Regim Hotelier (Airbnb/Booking)</option>
                  <option value="mixed">Model Mixt</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400">Suprafață Medie (mp)</label>
                <Input
                  value={calcArea}
                  onChange={(e) => setCalcArea(e.target.value)}
                  placeholder="Ex: 60"
                  className="h-11 bg-zinc-900 border-zinc-800 text-white text-xs rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400">Prioritate Evaluare</label>
                <select
                  value={calcFocus}
                  onChange={(e) => setCalcFocus(e.target.value as "all" | "building" | "liability" | "contents")}
                  className="w-full h-11 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-blue-500"
                >
                  <option value="all">Pachet Complet (Recomandat)</option>
                  <option value="liability">Răspundere Civilă & Vecini</option>
                  <option value="building">Doar Structură & PAD</option>
                  <option value="contents">Bunuri & Mobilier</option>
                </select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition-all"
            >
              Generează Checklist-ul de Discuție cu Consultantul &rarr;
            </Button>
          </form>

          {/* Calculator Output Display */}
          {hasCalculated && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-zinc-900/80 border border-blue-500/30 space-y-4 text-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  Rezumat Profil: {calcUnits} {calcUnits === 1 ? "unitate" : "unități"} • {calcModel === "long" ? "Termen Lung" : calcModel === "short" ? "Regim Hotelier" : "Mixt"}
                </span>
                <span className="text-zinc-500 text-[10px]">Evaluare locală deterministă</span>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-zinc-200">Recomandări esențiale de discutat cu asiguratorul:</p>
                <ul className="space-y-1.5 text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>
                      <strong>Clauza de Închiriere:</strong> Menționarea expresă a destinației ({calcModel === "short" ? "activitate turistică / regim hotelier" : "închiriere rezidențială către terți"}) pe poliță.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>
                      <strong>Plafon Răspundere Civilă:</strong> Recomandat minim 10.000–30.000 € pentru daune provocate instalațiilor comune sau apartamentelor vecine.
                    </span>
                  </li>
                  {calcModel === "short" && (
                    <li className="flex items-start gap-2 text-amber-300">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>
                        <strong>Specific Regim Hotelier:</strong> Verificarea dacă vandalismul oaspeților sau furtul fără efracție sunt incluse sau excluse.
                      </span>
                    </li>
                  )}
                  {calcUnits > 1 && (
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>
                        <strong>Optimizare Portofoliu:</strong> Posibilitatea emiterii unui contract-cadru cu scadențe comune și discount de volum.
                      </span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400">Datele au fost transferate în formularul de mai jos.</span>
                <a
                  href="#formular-proprietar"
                  className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-4"
                >
                  Completează cererea de ofertă &darr;
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* 3. ADVISORY LEAD FORM */}
      <div id="formular-proprietar" className="p-8 sm:p-12 rounded-[2.5rem] bg-zinc-950/90 border border-zinc-800 shadow-2xl relative">
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
                  Cererea a fost transmisă cu succes!
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Număr de înregistrare solicitare: <strong className="text-white font-mono">{submittedReference}</strong>.
                  Consultantul Cristian Văduva va analiza profilul de risc și vă va transmite soluțiile optime pentru portofoliul dumneavoastră.
                </p>
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
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                  Consultanță Specializată pentru Proprietăți Închiriate
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Transmite detaliile imobilului sau portofoliului tău pentru a primi o ofertă calibrată pe riscurile reale ale activității de închiriere.
                </p>
              </div>

              {errorMessage && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Step 1: Portfolio & Property Details */}
              <div className="space-y-4">
                <h4 className="text-sm uppercase tracking-wider font-bold text-zinc-300 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-400" />
                  1. Detalii despre Proprietate & Închiriere
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400">Număr Proprietăți</label>
                    <select
                      value={unitsCount}
                      onChange={(e) => setUnitsCount(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-blue-500"
                    >
                      <option value="1 proprietate">1 proprietate</option>
                      <option value="2-3 proprietăți">2-3 proprietăți</option>
                      <option value="4+ proprietăți (Portofoliu)">4+ proprietăți (Portofoliu)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400">Model Închiriere</label>
                    <select
                      value={rentalModel}
                      onChange={(e) => setRentalModel(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-blue-500"
                    >
                      <option value="Termen lung">Termen lung (Rezidențial)</option>
                      <option value="Regim hotelier / Airbnb">Regim hotelier (Airbnb / Booking)</option>
                      <option value="Mixt">Mixt</option>
                      <option value="Comercial / Birou">Comercial / Birou mic</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400">Status Ocupare</label>
                    <select
                      value={occupancyStatus}
                      onChange={(e) => setOccupancyStatus(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-blue-500"
                    >
                      <option value="Ocupată de chiriaș">Ocupată de chiriaș</option>
                      <option value="Liberă / Căutare chiriaș">Liberă / În căutare chiriaș</option>
                      <option value="În curs de renovare/amenajare">În curs de renovare/amenajare</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400">Localitate / Zonă</label>
                    <Input
                      placeholder="Ex: București (Sector 2), Cluj-Napoca, Timișoara..."
                      value={propertyLocation}
                      onChange={(e) => setPropertyLocation(e.target.value)}
                      className="h-11 bg-zinc-900 border-zinc-800 text-white text-xs rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400">Valoare Estimată a Imobilului (Opțional)</label>
                    <Input
                      placeholder="Ex: 120.000 EUR"
                      value={estimatedValue}
                      onChange={(e) => setEstimatedValue(e.target.value)}
                      className="h-11 bg-zinc-900 border-zinc-800 text-white text-xs rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Desired Protection Layers */}
              <div className="space-y-3 pt-4 border-t border-zinc-800/60">
                <label className="text-xs uppercase tracking-wider font-bold text-zinc-300 block">
                  Ce riscuri dorești să fie acoperite prioritar?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    "Asigurare Clădire Închiriată (FLEXA + Riscuri Naturale)",
                    "Răspundere Civilă față de Vecini (Avarii Apă / Foc)",
                    "Bunuri & Mobilier Proprietar în Spațiul Închiriat",
                    "Asigurare Obligatorie PAD",
                    "Opțiuni de Protecție la Neplata Chiriei (Informații)",
                    "Audit Portofoliu Imobiliar Multi-Unit",
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

              {/* Step 3: Contact */}
              <div className="space-y-4 pt-4 border-t border-zinc-800/60">
                <h4 className="text-sm uppercase tracking-wider font-bold text-zinc-300 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  2. Date de Contact Proprietar / Administrator
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400">Nume & Prenume *</label>
                    <Input
                      placeholder="Ex: Mihai Ionescu"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-11 bg-zinc-900 border-zinc-800 text-white text-xs rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400">Număr Telefon *</label>
                    <Input
                      placeholder="Ex: 0733 000 000"
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
                      placeholder="Ex: mihai@exemplu.ro"
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
                  id="consent-rental"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-zinc-800 bg-zinc-900 text-blue-600 focus:ring-0"
                />
                <label htmlFor="consent-rental" className="text-xs text-zinc-400 leading-relaxed cursor-pointer">
                  Sunt de acord cu prelucrarea datelor de contact pentru primirea analizei de asigurare, conform{" "}
                  <a href="/politica-de-confidentialitate" target="_blank" className="text-zinc-300 underline underline-offset-2">
                    Politicii de Confidențialitate
                  </a>
                  . Înțeleg că emiterea este condiționată de normele tehnice de subscriere ale asiguratorului.
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-heading font-bold text-sm tracking-wide shadow-xl transition-all"
              >
                {isSubmitting ? (
                  "Se transmite cererea..."
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Solicită Analiza Portofoliului & Oferta <ArrowRight className="w-4 h-4" />
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
