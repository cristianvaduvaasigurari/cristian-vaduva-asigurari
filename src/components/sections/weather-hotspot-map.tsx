"use client";

import * as React from "react";
import { 
  CloudLightning, 
  Database, 
  AlertTriangle, 
  ExternalLink, 
  Info, 
  ShieldCheck, 
  CarFront,
  FileText
} from "lucide-react";
import { WhatsAppCta } from "@/components/ui/whatsapp-cta";

export function WeatherHotspotMap() {
  return (
    <div className="space-y-8 bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="border-b border-zinc-200/80 pb-5">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
            <Database className="w-3.5 h-3.5" />
            BLOCKED BY DATA — Limită Date Deschise Incidentografice
          </div>
          <span className="text-xs text-zinc-500 font-mono">
            Surse Oficiale: ANM (Meteorologie) & IGPR (Direcția Rutieră)
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900">
          Harta Hotspot-urilor de Grindină, Furturi și Accidente: De ce Nu Există Date Deschise?
        </h2>
        <p className="text-sm text-zinc-600 mt-1 max-w-3xl">
          Multe platforme online afișează hărți colorate cu „zone roșii de risc auto” generate aleatoriu. 
          În România, <strong>nici Inspectoratul General al Poliției Române (IGPR) și nici Administrația Națională de Meteorologie (ANM) nu oferă API-uri publice deschise cu micro-coordonate GPS ale fiecărui incident</strong>. 
          Iată datele oficiale reale și cum funcționează de fapt tarifarea în asigurări.
        </p>
      </div>

      {/* Real Data Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
        <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-xl space-y-3">
          <div className="p-2.5 bg-white border border-zinc-200 rounded-lg w-fit">
            <CloudLightning className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="font-bold text-zinc-900 text-sm">1. Grindină & Furtuni (ANM)</h3>
          <p className="text-zinc-600 leading-relaxed">
            ANM emite avertizări meteo tip Nowcasting (cod galben, portocaliu, roșu) la nivel de județ și localitate, bazate pe rețeaua națională de radare Doppler. 
            Totuși, căderea grindinei este un fenomen extrem de localizat (poate lovi un cartier și ocoli altul la 500 m distanță), neexistând un registru istoric la nivel de stradă.
          </p>
          <a
            href="https://meteoromania.ro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-semibold inline-flex items-center gap-1 text-[11px] pt-1"
          >
            Avertizări ANM Oficiale <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-xl space-y-3">
          <div className="p-2.5 bg-white border border-zinc-200 rounded-lg w-fit">
            <CarFront className="w-5 h-5 text-rose-600" />
          </div>
          <h3 className="font-bold text-zinc-900 text-sm">2. Accidente Rutiere (IGPR)</h3>
          <p className="text-zinc-600 leading-relaxed">
            Poliția Română publică anual „Buletinul Siguranței Rutiere” cu statistici detaliate pe drumuri naționale (ex. DN1, DN2, A1, A2) și județe, evidențiind cauzele principale (viteza, neacordarea de prioritate). 
            Nu există însă o hartă interactivă live deschisă publicului cu fiecare tamponare minoră.
          </p>
          <a
            href="https://politiaromana.ro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-semibold inline-flex items-center gap-1 text-[11px] pt-1"
          >
            Rapoarte Siguranță Rutieră IGPR <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-xl space-y-3">
          <div className="p-2.5 bg-white border border-zinc-200 rounded-lg w-fit">
            <ShieldCheck className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="font-bold text-zinc-900 text-sm">3. Furturi Auto & Componente</h3>
          <p className="text-zinc-600 leading-relaxed">
            Statisticile privind furturile de autovehicule și efracțiile sunt agregate exclusiv la nivel județean în rapoartele anuale de activitate ale MAI. 
            Din considerente de ordine publică și protecție a datelor, adresele exacte ale incidentelor nu sunt niciodată făcute publice.
          </p>
          <span className="text-[11px] text-zinc-400 block pt-1">Date exclusiv agregate MAI</span>
        </div>
      </div>

      {/* Insurance Actuarial Reality */}
      <div className="p-5 bg-blue-50/60 border border-blue-200 rounded-xl space-y-2 text-xs text-blue-950">
        <div className="font-bold flex items-center gap-1.5 text-blue-900">
          <Info className="w-4 h-4 text-blue-700" />
          Cum Tarifează de Fapt Asigurătorii Riscul Auto în România?
        </div>
        <p className="leading-relaxed text-zinc-700">
          Companiile de asigurare nu utilizează „hărți de risc pe cartiere”, ci baze de date actuariale reglementate de ASF și BAAR:
        </p>
        <ul className="space-y-1 pl-4 list-disc text-zinc-700">
          <li><strong>Baza de date AIDA (fostă CEDAM):</strong> Verifică istoricul personal de daune al șoferului și aplică clasa Bonus-Malus (B0 – B8 sau M1 – M8).</li>
          <li><strong>Puterea motorului (kW) & Cilindreea:</strong> Datele tehnice din cartea de identitate a vehiculului (CIV).</li>
          <li><strong>Județul de înmatriculare:</strong> Diferențe statistice majore de frecvență a daunelor (București/Ilfov are frecvență dublă față de județe mai puțin aglomerate).</li>
          <li><strong>Vârsta conducătorului:</strong> Segmentare pe categorii de vârstă și experiență la volan.</li>
        </ul>
      </div>

      {/* Primary Conversion CTA */}
      <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-50 p-5 rounded-xl">
        <div className="text-xs text-zinc-600">
          <strong className="text-zinc-900 block text-sm">Vrei să afli prețul real calculat de asigurători pentru mașina ta?</strong>
          Trimite-mi seria de șasiu (VIN) și datele autovehiculului pe WhatsApp pentru o evaluare preliminară și pașii necesari emiterii cotației oficiale.
        </div>
        <WhatsAppCta
          toolName="Ghid Riscuri Auto & Hotspot"
          contextSummary="Solicitare ofertă calculată oficial pe baza istoricului Bonus-Malus"
          label="Scrie-mi pe WhatsApp pentru Cotație Oficială"
          size="md"
        />
      </div>
    </div>
  );
}
