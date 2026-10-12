"use client";

import * as React from "react";
import { useState } from "react";
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Scale, 
  Server, 
  ExternalLink, 
  Info,
  Lock,
  Building2,
  FileCheck2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppCta } from "@/components/ui/whatsapp-cta";

export function Nis2Checklist() {
  const [sectorType, setSectorType] = useState<"essential" | "important" | "other">("essential");
  const [companySize, setCompanySize] = useState<"large" | "medium" | "small">("medium");
  const [isCriticalSupplier, setIsCriticalSupplier] = useState<boolean>(true);
  const [hasTechnicalMeasures, setHasTechnicalMeasures] = useState<boolean>(false);
  const [hasCyberInsurance, setHasCyberInsurance] = useState<boolean>(false);

  // Evaluation logic
  const isDirectlyInScope =
    (sectorType === "essential" || sectorType === "important") &&
    (companySize === "large" || companySize === "medium");

  const isSupplyChainScope = !isDirectlyInScope && isCriticalSupplier;

  return (
    <div className="space-y-8 bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="border-b border-zinc-200/80 pb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 text-xs font-semibold mb-2 border border-cyan-200">
          <Server className="w-3.5 h-3.5" />
          Ghid Orientativ NIS2 • OUG 155/2024 aprobată prin Legea 124/2025
        </div>
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900">
          Evaluare Preliminară privind Incidența Cadrului Național NIS2 (DNSC)
        </h2>
        <p className="text-sm text-zinc-600 mt-1 max-w-3xl">
          Directiva (UE) 2022/2555 (NIS2) este aplicabilă în România prin forma consolidată a <strong>OUG nr. 155/2024, aprobată cu modificări și completări prin Legea nr. 124/2025</strong>, autoritatea națională competentă fiind <strong>DNSC (Directoratul Național de Securitate Cibernetică)</strong>. 
          Acest instrument oferă exclusiv o evaluare preliminară și orientativă pentru managementul riscurilor și transfer prin polițe Cyber Risk; <em>nu garantează încadrarea juridică a companiei și nu constituie un substitut pentru evaluarea și procedura oficială derulată prin platforma DNSC</em>.
        </p>
      </div>

      {/* Interactive Questionnaire */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-5">
          {/* Step 1: Sector */}
          <div className="space-y-2 text-xs">
            <label className="block font-semibold text-zinc-700 uppercase tracking-wider">
              1. În ce sector de activitate activează compania?
            </label>
            <div className="space-y-2">
              <label className="flex items-start gap-3 p-3.5 rounded-xl border border-zinc-200 bg-zinc-50/60 cursor-pointer hover:bg-zinc-100 transition-colors">
                <input
                  type="radio"
                  name="sector"
                  checked={sectorType === "essential"}
                  onChange={() => setSectorType("essential")}
                  className="mt-0.5 text-blue-600"
                />
                <div>
                  <strong className="text-zinc-900 block text-xs">Sectoare de Înaltă Criticitate (Anexa I - OUG 155/2024 modif. L. 124/2025):</strong>
                  <span className="text-zinc-600 text-[11px] leading-relaxed">
                    Energie, Transporturi, Bănci & Finanțe, Sănătate, Apă potabilă/uzată, Infrastructură digitală (Cloud, DNS, Data Centers, Furnizori internet), Administrație publică, Spațiu.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-xl border border-zinc-200 bg-zinc-50/60 cursor-pointer hover:bg-zinc-100 transition-colors">
                <input
                  type="radio"
                  name="sector"
                  checked={sectorType === "important"}
                  onChange={() => setSectorType("important")}
                  className="mt-0.5 text-blue-600"
                />
                <div>
                  <strong className="text-zinc-900 block text-xs">Alte Sectoare Critice (Anexa II - OUG 155/2024 modif. L. 124/2025):</strong>
                  <span className="text-zinc-600 text-[11px] leading-relaxed">
                    Servicii poștale & curierat, Deșeuri, Producție chimică sau alimentară, Dispozitive medicale, Producție electronice/echipamente, Furnizori digitali (Piețe online, motoare căutare, rețele sociale).
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-xl border border-zinc-200 bg-zinc-50/60 cursor-pointer hover:bg-zinc-100 transition-colors">
                <input
                  type="radio"
                  name="sector"
                  checked={sectorType === "other"}
                  onChange={() => setSectorType("other")}
                  className="mt-0.5 text-blue-600"
                />
                <div>
                  <strong className="text-zinc-900 block text-xs">Alt sector / Servicii Generale:</strong>
                  <span className="text-zinc-600 text-[11px]">
                    Consulting, HoReCa, Retail clasic non-alimentar, Construcții civile etc.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Step 2: Size */}
          <div className="space-y-2 text-xs pt-2 border-t border-zinc-100">
            <div className="flex items-center justify-between">
              <label className="block font-semibold text-zinc-700 uppercase tracking-wider">
                2. Dimensiunea companiei (Personal & Cifră de afaceri)
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setCompanySize("large")}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  companySize === "large"
                    ? "bg-blue-50 border-blue-600 ring-1 ring-blue-600 text-blue-950 font-bold"
                    : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                <div className="text-xs">Mare (&gt; 250 angajați)</div>
                <div className="text-[10px] text-zinc-500 font-normal mt-0.5">sau CA &gt; 50M € (Bilanț &gt; 43M €)</div>
              </button>

              <button
                type="button"
                onClick={() => setCompanySize("medium")}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  companySize === "medium"
                    ? "bg-blue-50 border-blue-600 ring-1 ring-blue-600 text-blue-950 font-bold"
                    : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                <div className="text-xs">Medie (50 - 249 angajați)</div>
                <div className="text-[10px] text-zinc-500 font-normal mt-0.5">sau CA 10M - 50M € (Bilanț &lt; 43M €)</div>
              </button>

              <button
                type="button"
                onClick={() => setCompanySize("small")}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  companySize === "small"
                    ? "bg-blue-50 border-blue-600 ring-1 ring-blue-600 text-blue-950 font-bold"
                    : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                <div className="text-xs">Mică (&lt; 50 angajați)</div>
                <div className="text-[10px] text-zinc-500 font-normal mt-0.5">și CA / Bilanț &lt; 10M €</div>
              </button>
            </div>
            <p className="text-[10px] text-zinc-500 italic mt-1">
              * Criterii stabilite prin OUG nr. 155/2024 aprobată cu modificări prin Legea nr. 124/2025. Excepție legală: Anumite categorii (furnizori rețele publice de comunicații electronice, registre TLD, furnizori servicii DNS, furnizori servicii de încredere) intră sub incidență directă indiferent de dimensiune.
            </p>
          </div>

          {/* Step 3: Supply Chain */}
          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2 text-xs">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isCriticalSupplier}
                onChange={(e) => setIsCriticalSupplier(e.target.checked)}
                className="mt-0.5 rounded border-zinc-300 text-blue-600"
              />
              <div>
                <strong className="text-zinc-900 block">
                  Compania este furnizor de servicii IT, software, cloud sau logistică pentru clienți mari din sectoarele critice?
                </strong>
                <span className="text-zinc-600 text-[11px] leading-relaxed">
                  Conform cerințelor de securitate a lanțului de aprovizionare (art. 23 din OUG 155/2024 modif. L. 124/2025), entitățile esențiale și importante impun partenerilor contractuali măsuri tehnice dovedite, audituri de securitate și transfer de risc prin poliță Cyber Risk.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-zinc-900 text-white shadow-md space-y-6">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold block">
              EVALUARE PRELIMINARĂ DE ÎNCADRARE (ORIENTATIVĂ)
            </span>

            <div className="space-y-2">
              <div className="text-xl sm:text-2xl font-heading font-black text-white">
                {isDirectlyInScope
                  ? sectorType === "essential"
                    ? "Potențial Entitate Esențială"
                    : "Potențial Entitate Importantă"
                  : isSupplyChainScope
                  ? "Incidență Indirectă (Supply Chain)"
                  : "În Afara Ariei Directe Tipice"}
              </div>

              <div
                className={`p-3 rounded-xl border text-xs leading-relaxed ${
                  isDirectlyInScope
                    ? "bg-rose-950/60 border-rose-500/50 text-rose-200"
                    : isSupplyChainScope
                    ? "bg-amber-950/60 border-amber-500/50 text-amber-200"
                    : "bg-emerald-950/60 border-emerald-500/50 text-emerald-200"
                }`}
              >
                {isDirectlyInScope && (
                  <p>
                    Răspunsurile indică o probabilitate ridicată de incidență sub cerințele OUG nr. 155/2024 aprobată cu modificări prin Legea nr. 124/2025. Aceasta este o evaluare preliminară orientativă ce nu garantează încadrarea juridică a companiei. Este obligatorie parcurgerea procedurii oficiale de evaluare și înregistrare în platforma DNSC.
                  </p>
                )}
                {isSupplyChainScope && (
                  <p>
                    Deși compania se situează sub pragurile generale de dimensiune, cerințele de securitate ale partenerilor comerciali reglementați (art. 23 din OUG nr. 155/2024 aprobată prin Legea nr. 124/2025) vă pot impune măsuri tehnice avansate și transfer de risc prin asigurare Cyber.
                  </p>
                )}
                {!isDirectlyInScope && !isSupplyChainScope && (
                  <p>
                    Nu au fost identificate indicii preliminare de încadrare directă sub criteriile generale din OUG 155/2024 (Legea 124/2025). Totuși, incidentele de tip ransomware sau breșele de date rămân riscuri majore de business și de răspundere civilă.
                  </p>
                )}
              </div>
            </div>

            {/* Crucial legal distinction */}
            <div className="p-3.5 bg-zinc-800/80 border border-zinc-700 rounded-xl space-y-2 text-xs text-zinc-300">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-cyan-400" />
                Caracter Preliminar & Rolul Asigurării:
              </div>
              <p className="text-[11px] leading-relaxed text-zinc-400">
                Acest instrument oferă exclusiv o evaluare preliminară și nu reprezintă un substitut pentru evaluarea și procedura oficială a Directoratului Național de Securitate Cibernetică (DNSC), nici o garanție a încadrării juridice a companiei. 
                Polița de Cyber Risk acoperă investigațiile forensice, restaurarea datelor, pierderea de profit din oprirea sistemelor și despăgubirile civile cerute de terți, fără a prelua sancțiunile contravenționale aplicate de autorități.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-800 space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <a
                href="https://dnsc.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1"
              >
                <span>Portal Oficial DNSC România</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-[10px] text-zinc-500">OUG 155/2024 • Legea 124/2025 • DNSC</span>
            </div>
            <a
              href="https://dnsc.ro/stiri/categorie/nis2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-zinc-400 hover:text-zinc-200 inline-flex items-center gap-1"
            >
              <span>Ghiduri oficiale și secțiune NIS2 DNSC →</span>
            </a>
          </div>
        </div>
      </div>

      {/* Primary Conversion CTA */}
      <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-50 p-5 rounded-xl">
        <div className="text-xs text-zinc-600">
          <strong className="text-zinc-900 block text-sm">Vrei să evaluezi o poliță de Cyber Risk pentru compania ta?</strong>
          Scrie-mi pe WhatsApp pentru un audit al expunerilor digitale și prezentarea ofertelor specializate de răspundere cibernetică.
        </div>
        <WhatsAppCta
          toolName="Ghid Aplicabilitate NIS2"
          contextSummary="Consultanță evaluare cerințe NIS2 și acoperire Cyber Risk"
          label="Scrie-mi pe WhatsApp pentru Asigurare Cyber"
          size="md"
        />
      </div>
    </div>
  );
}
