"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Waves,
  ShieldAlert,
  FileDown,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Printer,
  Sparkles,
  PhoneCall,
  ArrowRight,
  Info,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateClaimFilePdf } from "@/lib/pdf-claim-generator";
import Link from "next/link";

export function ClaimFileGenerator() {
  const [lang, setLang] = useState<"ro" | "en">("ro");
  const [incidentType, setIncidentType] = useState<"auto" | "water" | "theft">("auto");

  // Conditional circumstances
  const [hasInjuries, setHasInjuries] = useState(false);
  const [isAmicablePossible, setIsAmicablePossible] = useState(true);
  const [waterSource, setWaterSource] = useState<"pipe" | "neighbor" | "natural">("pipe");
  const [forcedEntry, setForcedEntry] = useState(true);

  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const isRo = lang === "ro";

  const handleDownloadPdf = () => {
    try {
      const doc = generateClaimFilePdf({
        incidentType,
        lang,
        circumstances: {
          hasInjuries,
          amicablePossible: isAmicablePossible,
          waterSource,
          forcedEntry,
        },
      });

      const dateTag = new Date().toISOString().slice(0, 10);
      const filename = `dosar-dauna-${incidentType}-${dateTag}.pdf`;
      doc.save(filename);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error("PDF Generation error:", err);
    }
  };

  return (
    <div className="w-full space-y-10 max-w-4xl mx-auto">
      {/* 1. TOP CONTROLS & LANGUAGE TOGGLE */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
        <div className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
          <FileText className="w-4 h-4 text-blue-400" />
          <span>{isRo ? "Pasul 1: Alege Tipul Incidentului & Limba" : "Step 1: Select Incident & Language"}</span>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-full bg-zinc-950 border border-zinc-800 text-xs">
          <button
            type="button"
            onClick={() => setLang("ro")}
            className={`px-3 py-1 rounded-full font-medium transition-all ${
              lang === "ro" ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            Română
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`px-3 py-1 rounded-full font-medium transition-all ${
              lang === "en" ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* 2. INCIDENT TYPE BUTTONS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          type="button"
          onClick={() => setIncidentType("auto")}
          className={`p-6 rounded-3xl border text-left transition-all flex flex-col justify-between ${
            incidentType === "auto"
              ? "bg-rose-500/10 border-rose-500/50 shadow-lg"
              : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700"
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-white text-base">
              {isRo ? "Accident Auto / Tamponare" : "Road Accident / Collision"}
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              {isRo ? "RCA, CASCO, Amiabilă sau Poliție" : "RCA, CASCO, Amicable or Police"}
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setIncidentType("water")}
          className={`p-6 rounded-3xl border text-left transition-all flex flex-col justify-between ${
            incidentType === "water"
              ? "bg-blue-500/10 border-blue-500/50 shadow-lg"
              : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700"
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
            <Waves className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-white text-base">
              {isRo ? "Inundație / Avarii Instalații" : "Water Damage / Flooding"}
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              {isRo ? "Conducte sparte, infiltrații, vecini" : "Burst pipes, leaks, neighbor liability"}
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setIncidentType("theft")}
          className={`p-6 rounded-3xl border text-left transition-all flex flex-col justify-between ${
            incidentType === "theft"
              ? "bg-amber-500/10 border-amber-500/50 shadow-lg"
              : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700"
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-white text-base">
              {isRo ? "Furt / Efracție" : "Theft / Burglary"}
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              {isRo ? "Bunuri furate, forțare încuietori" : "Stolen goods, forced locks, police log"}
            </p>
          </div>
        </button>
      </div>

      {/* 3. SAFETY PRIORITY BANNER */}
      <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-500/40 flex items-start gap-4 text-xs sm:text-sm">
        <div className="p-2.5 rounded-xl bg-rose-600 text-white font-bold shrink-0">
          112
        </div>
        <div className="space-y-1 text-rose-200">
          <strong className="block text-white font-bold">
            {isRo ? "Măsură de Urgență Vitală:" : "Critical Emergency Precaution:"}
          </strong>
          <p className="leading-relaxed text-xs text-rose-200/90">
            {isRo
              ? "Siguranța personală are prioritate absolută. Nu colectați documente și nu fotografiați locul faptei dacă există pericol activ, incendiu sau vătămări corporale. Apelați imediat 112."
              : "Personal safety takes priority over collecting paperwork. Do not document active hazards or injuries before reaching safety. Call 112 immediately."}
          </p>
        </div>
      </div>

      {/* 4. DYNAMIC INTERACTIVE CHECKLIST PREVIEW */}
      <div className="p-8 sm:p-10 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-2xl space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <span className="text-xs uppercase tracking-widest text-blue-400 font-bold block mb-1">
              {isRo ? "PREVIZUALIZARE DOSAR DE DAUNĂ" : "CLAIM FILE CHECKLIST PREVIEW"}
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
              {incidentType === "auto"
                ? isRo ? "Accident Rutier: Documente & Acțiuni" : "Road Accident: Documents & Steps"
                : incidentType === "water"
                ? isRo ? "Inundație Imobil: Documente & Acțiuni" : "Water Ingress: Documents & Steps"
                : isRo ? "Furt / Efracție: Documente & Plângere" : "Theft: Documents & Police Report"}
            </h3>
          </div>

          <Button
            type="button"
            onClick={handleDownloadPdf}
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-12 px-6 shadow-xl shrink-0 flex items-center gap-2"
          >
            <FileDown className="w-4 h-4" />
            <span>{isRo ? "Descarcă Checklist PDF" : "Download Claim PDF"}</span>
          </Button>
        </div>

        {downloadSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{isRo ? "Documentul PDF a fost generat și descărcat cu succes!" : "PDF document successfully generated and downloaded!"}</span>
          </div>
        )}

        {/* Dynamic Checklist Content */}
        <div className="space-y-4">
          {incidentType === "auto" && (
            <div className="space-y-3">
              {[
                {
                  title: isRo ? "1. Siguranța Pasagerilor & Semnalizare" : "1. Passenger Safety & Triangles",
                  desc: isRo ? "Îmbrăcați vesta reflectorizantă, amplasați triunghiurile de presemnalizare la min. 30m și aprindeți luminile de avarie." : "Wear high-vis vest, turn on hazard lights, place triangles min 30m behind vehicle.",
                },
                {
                  title: isRo ? "2. Stabilirea Procedurii (Amiabilă vs. Poliție)" : "2. Select Procedure (Amicable vs Police)",
                  desc: isRo ? "Dacă sunt doar 2 mașini fără vătămări corporale -> se completează formularul de Constatare Amiabilă. În orice alt caz -> Poliția Rutieră în 24h." : "2 vehicles with no injuries -> Amicable settlement. Disputes, injuries or 3+ cars -> Traffic Police within 24h.",
                },
                {
                  title: isRo ? "3. Documentare Foto Înainte de Degajare" : "3. Scene Photos Before Clearing Road",
                  desc: isRo ? "Fotografiați poziția mașinilor, numerele de înmatriculare, semnele de circulație și detaliile avariilor din mai multe unghiuri." : "Capture car positions, license plates, road markings, and damage from multiple angles.",
                },
                {
                  title: isRo ? "4. Schimbul de Documente Obligatorii" : "4. Document Exchange with Other Driver",
                  desc: isRo ? "Fotografiați polița RCA, Cartea de Identitate, Permisul și Certificatul de Înmatriculare (Talon) cu ITP valabil." : "Photograph both RCA policies, ID cards, driver licenses, and vehicle registration certificates.",
                },
                {
                  title: isRo ? "5. Asistență Rutieră & Notificare Asigurator" : "5. Towing Assistance & Damage Survey",
                  desc: isRo ? "Apelați numărul de asistență de pe poliță. Nu reparați mașina înainte de efectuarea constatării oficiale de daună." : "Call roadside recovery on your policy. Do not repair vehicle prior to official insurance survey.",
                },
              ].map((step, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-1">
                  <strong className="text-white text-xs sm:text-sm block">{step.title}</strong>
                  <p className="text-xs text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          )}

          {incidentType === "water" && (
            <div className="space-y-3">
              {[
                {
                  title: isRo ? "1. Oprire Alimentare & Evitare Pericol Electric" : "1. Shut Off Water & Avoid Electric Shock",
                  desc: isRo ? "Închideți robinetul principal. Dacă apa atinge tabloul sau prizele, opriți siguranțele generale doar dacă aveți acces uscat." : "Shut off main water valve. If water reaches electrical outlets, cut power safely before stepping into water.",
                },
                {
                  title: isRo ? "2. Constatare Asociație de Proprietari" : "2. Building Administration Incident Report",
                  desc: isRo ? "Solicitați administratorului de bloc întocmirea unui Proces-Verbal oficial de constatare a sursei inundației." : "Request the building administrator to issue a written Incident Report documenting the source of water.",
                },
                {
                  title: isRo ? "3. Documentare Video & Foto Înainte de Curățare" : "3. Detailed Photo & Video Evidence",
                  desc: isRo ? "Înregistrați video tavanele, parchetul îmbibat, pereții și electrocasnicele afectate înainte de uscarea completă." : "Record clear video/photos of waterlogged ceilings, flooring, drywall, and damaged electronics.",
                },
                {
                  title: isRo ? "4. Notificare Asigurator & Păstrare Bunuri Avariate" : "4. Notify Insurer & Preserve Damaged Contents",
                  desc: isRo ? "Notificați asiguratorul în termenul din contract (24-48h). Nu aruncați parchetul sau mobilierul înainte de vizita inspectorului." : "Notify insurer within contractual window (24-48h). Do not discard damaged furniture before surveyor inspection.",
                },
              ].map((step, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-1">
                  <strong className="text-white text-xs sm:text-sm block">{step.title}</strong>
                  <p className="text-xs text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          )}

          {incidentType === "theft" && (
            <div className="space-y-3">
              {[
                {
                  title: isRo ? "1. Securitate Personală & Apel 112" : "1. Personal Safety & Call 112",
                  desc: isRo ? "Dacă suspectați că autorul este încă în zonă, retrageți-vă la o distanță sigură și sunați imediat la 112." : "If an intruder could still be inside, retreat to a safe distance and call 112 immediately.",
                },
                {
                  title: isRo ? "2. Conservarea Locului Faptei" : "2. Preserve Crime Scene Untouched",
                  desc: isRo ? "Nu atingeți încuietorile forțate, geamurile sparte sau obiectele răvășite până la finalizarea cercetării criminalistice a Poliției." : "Do not touch broken locks, forced windows or moved items until Police forensics finish their report.",
                },
                {
                  title: isRo ? "3. Întocmire Inventar Bunuri Lipsă" : "3. Missing Items Inventory & Receipts",
                  desc: isRo ? "Pregătiți lista obiectelor sustrase, certificate de garanție/autenticitate, serii de fabricație și fotografii anterioare." : "Compile detailed inventory of stolen assets, serial numbers, purchase invoices, and appraisal certificates.",
                },
                {
                  title: isRo ? "4. Obținere Număr Dosar Penal Poliție" : "4. Obtain Official Police Crime Number",
                  desc: isRo ? "Solicitați numărul de înregistrare al plângerii penale de la secția de Poliție, document esențial la deschiderea dosarului de daună." : "Request the official Police Crime Case Number (Număr Dosar Penal) needed for insurer claim filing.",
                },
              ].map((step, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-1">
                  <strong className="text-white text-xs sm:text-sm block">{step.title}</strong>
                  <p className="text-xs text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Download PDF Bottom CTA */}
        <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-zinc-400">
            {isRo
              ? "PDF-ul include spațiu de notițe tipăribil și contactul direct de consultanță."
              : "The generated PDF includes printable note-taking space and advisory contact info."}
          </div>

          <Button
            type="button"
            onClick={handleDownloadPdf}
            className="w-full sm:w-auto rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-12 px-8 shadow-xl flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>{isRo ? "Descarcă & Tipărește Checklist (PDF)" : "Download & Print Checklist (PDF)"}</span>
          </Button>
        </div>
      </div>

      {/* 5. CLAIMS ADVISORY FOOTER */}
      <div className="p-8 rounded-[2rem] bg-zinc-900/40 border border-zinc-800 space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 shrink-0">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h4 className="text-base sm:text-lg font-heading font-bold text-white">
              {isRo ? "Consultanță & Asistență la Deschiderea Dosarului de Daună" : "Insurance Claims Advisory & Broker Support"}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {isRo
                ? "Ai nevoie de îndrumare privind clauzele contractuale, devizele de reparație sau comunicarea cu inspectorul de daune? Contactează consultantul Cristian Văduva. Acest număr este destinat exclusiv consultanței de asigurare (nu este un serviciu de dispecerat de urgență)."
                : "Need guidance regarding policy wording, repair estimates, or insurer communication? Contact advisor Cristian Văduva. This contact is strictly for insurance advisory and is not an emergency dispatch service."}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
              <a
                href="tel:0767110439"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                {isRo ? "Consultanță: 0767 110 439" : "Advisory: 0767 110 439"}
              </a>
              <Link
                href="/verifica-polita"
                className="text-zinc-400 hover:text-white underline underline-offset-4"
              >
                {isRo ? "Verifică o poliță existentă &rarr;" : "Review an existing policy &rarr;"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
