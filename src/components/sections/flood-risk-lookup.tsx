"use client";

import * as React from "react";
import { 
  Droplets, 
  AlertTriangle, 
  ExternalLink, 
  Info, 
  ShieldCheck, 
  MapPin, 
  Database,
  Building,
  CheckCircle2
} from "lucide-react";
import { WhatsAppCta } from "@/components/ui/whatsapp-cta";

export function FloodRiskLookup() {
  const riverBasins = [
    { name: "Bazinul Hidrografic Argeș - Vedea", focus: "București, Ilfov, Argeș, Giurgiu, Dâmbovița, Teleorman" },
    { name: "Bazinul Hidrografic Buzău - Ialomița", focus: "Prahova, Ialomița, Buzău, Brăila, Călărași" },
    { name: "Bazinul Hidrografic Someș - Tisa", focus: "Cluj, Maramureș, Satu Mare, Sălaj, Bistrița-Năsăud" },
    { name: "Bazinul Hidrografic Mureș", focus: "Mureș, Alba, Hunedoara, Arad, Harghita" },
    { name: "Bazinul Hidrografic Siret & Prut-Bârlad", focus: "Bacău, Iași, Neamț, Vrancea, Galați, Suceava, Botoșani" },
    { name: "Bazinul Hidrografic Dobrogea - Litoral", focus: "Constanța, Tulcea" },
  ];

  return (
    <div className="space-y-8 bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Header with explicit honest data status badge */}
      <div className="border-b border-zinc-200/80 pb-5">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
            <Database className="w-3.5 h-3.5" />
            BLOCKED BY DATA — Limită Registru Național Parcelar
          </div>
          <span className="text-xs text-zinc-500 font-mono">
            Sursă oficială: ANAR / Ministerul Mediului (PMRI Ciclul II 2022-2027)
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900">
          Verificare Risc Inundații: Date Oficiale vs Limitări Tehnice
        </h2>
        <p className="text-sm text-zinc-600 mt-1 max-w-3xl">
          Spre deosebire de riscul seismic din București (unde Primăria publică o listă nominală de adrese expertizate), 
          <strong> în România nu există un API public deschis care să permită interogarea riscului de inundație la nivel de număr poștal sau parcelă cadastrală</strong>. 
          Pentru a respecta integritatea datelor, nu am creat scoruri fictive. Iată datele oficiale reale și modul corect de verificare.
        </p>
      </div>

      {/* Official Dataset Analysis Card */}
      <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-xl space-y-4 text-xs">
        <div className="font-bold text-zinc-900 text-sm flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-600" />
          Fișa Tehnică a Evidențelor Oficiale de Inundații (ANAR & IGSU)
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-zinc-700">
          <div className="p-3 bg-white rounded-lg border border-zinc-200 space-y-1">
            <span className="text-zinc-500 block">Autoritate responsabilă:</span>
            <strong>ANAR (Apele Române) & MMAP</strong>
          </div>
          <div className="p-3 bg-white rounded-lg border border-zinc-200 space-y-1">
            <span className="text-zinc-500 block">Cadru legal european:</span>
            <strong>Directiva 2007/60/CE privind inundațiile</strong>
          </div>
          <div className="p-3 bg-white rounded-lg border border-zinc-200 space-y-1">
            <span className="text-zinc-500 block">Nivel de rezoluție:</span>
            <strong>Bazin hidrografic / Bandă de hazard</strong>
          </div>
          <div className="p-3 bg-white rounded-lg border border-zinc-200 space-y-1">
            <span className="text-zinc-500 block">Căutare pe adresă exactă:</span>
            <strong className="text-rose-700">Nesuportată tehnic în date deschise</strong>
          </div>
        </div>

        <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl text-amber-900 space-y-1.5 leading-relaxed">
          <strong className="block text-amber-800">Avertisment privind instrumentele neoficiale din internet:</strong>
          <p>
            Dacă o aplicație pretinde că îți oferă un „scor procentual de inundație” introducând doar o adresă din România, acel scor este inventat sau bazat pe aproximări satelitare grosiere. 
            Hărțile oficiale ANAR funcționează pe benzi de probabilitate hidrologică (scenarii de debite Q0.1% — 1 la 1000 ani, Q1% — 1 la 100 ani și Q10% — 1 la 10 ani) pentru albii majore, nu pe numere de imobile.
          </p>
        </div>
      </div>

      {/* Official Map Viewer Link */}
      <div className="p-6 bg-blue-50/50 border border-blue-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block">
            Portalul Geografic Oficial
          </span>
          <h3 className="font-heading font-bold text-zinc-900 text-lg">
            Hărțile Naționale de Hazard și Risc la Inundații (Inundatii.ro)
          </h3>
          <p className="text-xs text-zinc-600 max-w-2xl leading-relaxed">
            Consultă vizualizatorul GIS oficial al Administrației Naționale „Apele Române” pentru a suprapune harta zonei tale peste benzile de hazard ale bazinelor hidrografice.
          </p>
        </div>

        <a
          href="https://inundatii.ro"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all inline-flex items-center gap-2 shadow-sm shrink-0"
        >
          <span>Deschide Inundatii.ro (ANAR)</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Insurance Reality: PAD vs Facultative */}
      <div className="p-5 bg-white border border-zinc-200 rounded-xl space-y-3 text-xs">
        <div className="font-bold text-zinc-900 text-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Cum Evaluează Asigurătorii Riscul de Inundație la Subscriere?
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2">
            <span className="font-bold text-zinc-900 block">Polița Obligatorie PAD (Legea 260/2008):</span>
            <p className="text-zinc-600 leading-relaxed">
              Acoperă <strong>inundațiile ca dezastru natural</strong> (revărsarea apelor naturale sau torente din precipitații violente) în limita legală de 20.000 EUR (Tip A, primă 130 RON/an) sau 10.000 EUR (Tip B). 
              PAD este emisă obligatoriu pentru orice locuință autorizată, indiferent de zonă.
            </p>
          </div>

          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2">
            <span className="font-bold text-zinc-900 block">Polița Facultativă Casă & Bunuri:</span>
            <p className="text-zinc-600 leading-relaxed">
              Acoperă atât inundațiile de suprafață peste limita PAD, cât și <strong>inundațiile provocate de avarii la conducte interioare, instalații sanitare, infiltrații sau vecini</strong>. 
              Asigurătorul inspectează dacă subsolul este impermeabilizat și dacă proprietatea este la o cotă sigură față de pârâuri locale.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Conversion CTA */}
      <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-50 p-5 rounded-xl">
        <div className="text-xs text-zinc-600">
          <strong className="text-zinc-900 block text-sm">Evaluezi o casă aproape de o apă sau într-o zonă depresionară?</strong>
          Scrie-mi pe WhatsApp pentru a verifica normele specifice de subscriere ale asigurătorilor și includerea clauzelor complete de inundații și alunecări.
        </div>
        <WhatsAppCta
          toolName="Ghid Risc Inundații ANAR"
          contextSummary="Consultanță verificare zonă potențial inundabilă și acoperire PAD + Facultativ"
          label="Scrie-mi pe WhatsApp pentru Risc Inundație"
          size="md"
        />
      </div>
    </div>
  );
}
