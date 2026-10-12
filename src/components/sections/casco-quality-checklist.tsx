"use client";

import * as React from "react";
import { useState } from "react";
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  FileText, 
  Info,
  Car,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppCta } from "@/components/ui/whatsapp-cta";

interface ChecklistQuestion {
  id: string;
  number: number;
  title: string;
  explanation: string;
  clauseToVerify: string;
  options: {
    label: string;
    score: number; // 0, 5, or 10
    verdict: "safe" | "warning" | "unclear";
  }[];
}

const QUESTIONS: ChecklistQuestion[] = [
  {
    id: "q1",
    number: 1,
    title: "Cum este stabilită suma asigurată a mașinii pe durata contractului?",
    explanation: "Valoarea agreată garantează că în caz de daună totală primești suma fixată inițial, fără a fi penalizat de grilele obscure de depreciere din catalog.",
    clauseToVerify: "Capitolul «Suma Asigurată & Principiul Despăgubirii» — clauza de Valoare Agreată / Valoare de Factură vs Valoare de Piață la data sinistrului.",
    options: [
      { label: "Valoare agreată fixă (sau valoare de factură pentru mașină nouă)", score: 10, verdict: "safe" },
      { label: "Valoare de catalog (Schwacke / Eurotax / DAT) cu depreciere automată", score: 6, verdict: "warning" },
      { label: "Nu știu exact / Nu este clar în poliță", score: 2, verdict: "unclear" }
    ]
  },
  {
    id: "q2",
    number: 2,
    title: "Ce tip de piese de schimb sunt garantate în contractul de reparație?",
    explanation: "Piesele de origine (OEM) protejează garanția de fabrică și valoarea la revânzare a autovehiculului.",
    clauseToVerify: "Capitolul «Reguli de Despăgubire» — clauza privind utilizarea pieselor originale de prim montaj (OEM) vs piese omologate alternative (aftermarket).",
    options: [
      { label: "Exclusiv piese originale de origine (OEM) noi", score: 10, verdict: "safe" },
      { label: "Piese alternative / aftermarket echivalente agreate de asigurător", score: 4, verdict: "warning" },
      { label: "Nespecificat în mod expres în ofertă", score: 2, verdict: "unclear" }
    ]
  },
  {
    id: "q3",
    number: 3,
    title: "Unde ai dreptul să efectuezi reparația autoturismului?",
    explanation: "Libertatea de a alege reprezentanța de marcă este esențială pentru calitatea lucrărilor și calibrarea senzorilor ADAS.",
    clauseToVerify: "Capitolul «Unități Reparatoare» — dreptul de reparație în reprezentanțe autorizate de producător vs obligativitatea rețelei de service partenere.",
    options: [
      { label: "În orice reprezentanță autorizată de marcă sau service ales de mine", score: 10, verdict: "safe" },
      { label: "Exclusiv în rețeaua de unități partenere/agreate ale asigurătorului", score: 5, verdict: "warning" },
      { label: "Nu am verificat lista de unități partenere", score: 2, verdict: "unclear" }
    ]
  },
  {
    id: "q4",
    number: 4,
    title: "Beneficiezi de autovehicul la schimb (Courtesy Car) pe durata imobilizării?",
    explanation: "Reparațiile complexe de caroserie pot dura 2-4 săptămâni din cauza timpilor de livrare a pieselor.",
    clauseToVerify: "Clauza adițională «Autovehicul la schimb» — numărul de zile garantat (ex. 7, 14, 21 zile) și condițiile de acordare.",
    options: [
      { label: "Da, inclus gratuit (minim 10-15 zile pe eveniment)", score: 10, verdict: "safe" },
      { label: "Da, dar doar contra-cost sau limitat la maxim 3-5 zile", score: 6, verdict: "warning" },
      { label: "Nu este inclus / Nu beneficiaz de mașină la schimb", score: 0, verdict: "warning" }
    ]
  },
  {
    id: "q5",
    number: 5,
    title: "Cum sunt acoperite daunele provocate de grindină și fenomene meteo?",
    explanation: "Tehnologia PDR (îndreptare fără revopsire) păstrează vopseaua originală din fabrică a mașinii.",
    clauseToVerify: "Capitolul «Fenomene ale naturii» — acoperirea grindinei, furtunii și recunoașterea procedurilor moderne PDR (Paintless Dent Repair).",
    options: [
      { label: "Acoperire integrală grindină, inclusiv decontare tehnologie PDR", score: 10, verdict: "safe" },
      { label: "Acoperit, dar cu franșiză specială dedicată pentru grindină", score: 5, verdict: "warning" },
      { label: "Exclus sau neclar formulat în condițiile generale", score: 1, verdict: "unclear" }
    ]
  },
  {
    id: "q6",
    number: 6,
    title: "Sunt acoperite roțile, jantele și anvelopele la impactul cu gropi sau borduri?",
    explanation: "Jantele de aliaj mari și anvelopele de profil îngust se deteriorează frecvent în gropi neobservate.",
    clauseToVerify: "Capitolul «Excluderi specifice» — clauza de daune la trenul de rulare fără avarierea concomitentă a altor elemente de caroserie.",
    options: [
      { label: "Da, acoperire jante și anvelope chiar și fără avarierea caroseriei", score: 10, verdict: "safe" },
      { label: "Doar dacă se avariază simultan și alte componente de suspensie/caroserie", score: 5, verdict: "warning" },
      { label: "Exclus explicit / Nespecificat", score: 0, verdict: "unclear" }
    ]
  },
  {
    id: "q7",
    number: 7,
    title: "Ce regim de franșiză se aplică pentru geamuri, parbriz și plafon panoramic?",
    explanation: "Ciobirea parbrizului este cel mai frecvent incident pe autostradă.",
    clauseToVerify: "Clauza «Elemente vitrate» — franșiză 0€ la înlocuirea sau șlefuirea parbrizului.",
    options: [
      { label: "Franșiză 0 € la înlocuire parbriz/geamuri (clauză dedicată)", score: 10, verdict: "safe" },
      { label: "Se aplică franșiza standard generală a poliței (ex. 100€ sau 10%)", score: 6, verdict: "warning" },
      { label: "Plafonul din sticlă este exclus sau necesită subscriere separată", score: 2, verdict: "unclear" }
    ]
  },
  {
    id: "q8",
    number: 8,
    title: "Cum este acoperit riscul de furt parțial și tentativă de efracție?",
    explanation: "Furtul de catalizatoare, oglinzi exterioare, radare distronic și jante reprezintă 80% din dosarele de furt.",
    clauseToVerify: "Capitolul «Furt și tâlhărie» — extindere pentru furt componente exterioare, roți, sistem multimedia și chei originale.",
    options: [
      { label: "Furt total + furt parțial (oglinzi, roți, navigație, radar) acoperit complet", score: 10, verdict: "safe" },
      { label: "Doar furt total al mașinii; componentele exterioare sunt excluse", score: 3, verdict: "warning" },
      { label: "Nu cunosc dacă furtul parțial este inclus", score: 1, verdict: "unclear" }
    ]
  },
  {
    id: "q9",
    number: 9,
    title: "Care sunt limitele teritoriale ale acoperirii externe?",
    explanation: "Dacă pleci în vacanță sau delegație în străinătate, CASCO trebuie să te protejeze identic.",
    clauseToVerify: "Capitolul «Teritorialitate» — valabilitate automată în țările din Spațiul Economic European / Carte Verde fără plata unei prime zilnice adiționale.",
    options: [
      { label: "Acoperire automată fără cost suplimentar în toate statele UE / SEE", score: 10, verdict: "safe" },
      { label: "Valabil doar în România; extinderea externă necesită notificare și primă adițională", score: 4, verdict: "warning" },
      { label: "Nu am verificat teritorialitatea pentru călătorii externe", score: 2, verdict: "unclear" }
    ]
  },
  {
    id: "q10",
    number: 10,
    title: "Ce condiții speciale se aplică la franșiză în caz de regres pe un terț vinovat?",
    explanation: "Dacă un alt șofer lovește mașina și deschizi dosar CASCO pentru reparație rapidă, franșiza trebuie recuperată integral.",
    clauseToVerify: "Capitolul «Subrogare și Regres» — restituirea integrală a franșizei către asigurat după recuperarea prejudiciului de la asigurătorul RCA al vinovatului.",
    options: [
      { label: "Franșiză 0€ sau restituită 100% dacă vinovatul este identificat", score: 10, verdict: "safe" },
      { label: "Franșiza se reține indiferent de vinovăție și nu se mai recuperează", score: 3, verdict: "warning" },
      { label: "Nu știu cum funcționează decontarea regresului", score: 2, verdict: "unclear" }
    ]
  }
];

export function CascoQualityChecklist() {
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const answeredCount = Object.keys(answers).length;
  const totalScore = Object.values(answers).reduce((acc, score) => acc + score, 0);
  const maxPossible = QUESTIONS.length * 10;
  const scorePct = Math.round((totalScore / maxPossible) * 100);

  const handleSelect = (questionId: string, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const handleReset = () => {
    setAnswers({});
  };

  // Diagnostic grouping
  const questionsToReview = QUESTIONS.filter((q) => {
    const score = answers[q.id];
    return typeof score === "number" && score < 7;
  });

  const getTier = (pct: number) => {
    if (pct >= 85) return { label: "Poliță Premium / Solidă", color: "text-emerald-700 bg-emerald-50 border-emerald-200" };
    if (pct >= 65) return { label: "Poliță Standard (Cu limitări punctuale)", color: "text-blue-700 bg-blue-50 border-blue-200" };
    if (pct >= 40) return { label: "Poliță de Bază (Expuneri financiare majore)", color: "text-amber-700 bg-amber-50 border-amber-200" };
    return { label: "Evaluare Inițială Necesară", color: "text-zinc-700 bg-zinc-50 border-zinc-200" };
  };

  const currentTier = getTier(scorePct);

  return (
    <div className="space-y-8 bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="border-b border-zinc-200/80 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2 border border-blue-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            Audit Calitate & Clauze Contractuale
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900">
            Checklist Calitate Poliță CASCO în 10 Întrebări Esențiale
          </h2>
          <p className="text-sm text-zinc-600 mt-1 max-w-3xl">
            Prețul mic la CASCO ascunde adesea clauze restrictive: piese aftermarket, reparație interzisă în reprezentanță, lipsă mașină la schimb sau franșize ascunse. 
            Evaluează-ți contractul actual sau oferta primită și vezi exact ce capitole trebuie să recitiți.
          </p>
        </div>

        {answeredCount > 0 && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 underline font-semibold shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Resetează răspunsurile
          </button>
        )}
      </div>

      {/* Score Progress Bar Banner */}
      <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <span className="text-zinc-500 font-medium">Progres evaluare:</span>
            <div className="font-bold text-zinc-900 text-sm">
              {answeredCount} din {QUESTIONS.length} întrebări completate
            </div>
          </div>

          <div className="space-y-1 text-right">
            <span className="text-zinc-500 font-medium">Scor Calitate Clauze:</span>
            <div className="font-bold text-zinc-900 text-lg">
              {scorePct}% <span className="text-xs text-zinc-500 font-normal">({totalScore}/{maxPossible} pct)</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-zinc-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <span className={`px-2.5 py-1 rounded-md font-bold border ${currentTier.color}`}>
            Calificativ: {currentTier.label}
          </span>
          <span className="text-zinc-500 text-[11px]">
            * Întrebările necompletate nu sunt considerate excluderi confirmate.
          </span>
        </div>
      </div>

      {/* 10 Questions Accordion / List */}
      <div className="space-y-6">
        {QUESTIONS.map((q) => {
          const selectedScore = answers[q.id];

          return (
            <div
              key={q.id}
              className={`p-5 rounded-xl border transition-all ${
                typeof selectedScore === "number"
                  ? "bg-white border-zinc-300 shadow-xs"
                  : "bg-white/80 border-zinc-200 hover:border-zinc-300"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {q.number}
                  </span>
                  <div className="space-y-1 flex-1">
                    <h3 className="font-bold text-zinc-900 text-sm sm:text-base">
                      {q.title}
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                </div>

                {/* Options Radio List */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 pl-8">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedScore === opt.score;

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelect(q.id, opt.score)}
                        className={`p-3 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                          isSelected
                            ? opt.verdict === "safe"
                              ? "bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold ring-1 ring-emerald-400"
                              : opt.verdict === "warning"
                              ? "bg-amber-50 border-amber-400 text-amber-950 font-semibold ring-1 ring-amber-400"
                              : "bg-blue-50 border-blue-400 text-blue-950 font-semibold ring-1 ring-blue-400"
                            : "bg-zinc-50/70 border-zinc-200 text-zinc-700 hover:bg-zinc-100"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span
                            className={`w-3.5 h-3.5 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                              isSelected ? "border-zinc-900 bg-zinc-900 text-white text-[9px]" : "border-zinc-400"
                            }`}
                          >
                            {isSelected && "✓"}
                          </span>
                          <span>{opt.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Clause reference notice */}
                <div className="pl-8 pt-2 text-[11px] text-zinc-500 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>Unde verifici în contract: {q.clauseToVerify}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Diagnostic & Action Plan Box */}
      {answeredCount > 0 && (
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4 text-xs">
          <div className="font-bold text-zinc-900 text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Diagnostic de Risc & Capitole de Verificat în Polița Ta
          </div>

          {questionsToReview.length > 0 ? (
            <div className="space-y-2">
              <p className="text-zinc-700 leading-relaxed">
                Următoarele <strong>{questionsToReview.length} capitole</strong> prezintă clauze restrictive sau formulări neclare care pot reduce despăgubirea în caz de daună:
              </p>
              <ul className="space-y-1.5 pl-4 list-disc text-zinc-800">
                {questionsToReview.map((q) => (
                  <li key={q.id}>
                    <strong>Întrebarea {q.number}:</strong> {q.title} — <em>Verifică: {q.clauseToVerify}</em>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Toate răspunsurile bifate indică o poliță de înaltă calitate cu acoperiri solide și clauze favorabile asiguratului.
              </span>
            </div>
          )}

          <div className="p-3.5 bg-white border border-zinc-200 rounded-lg text-[11px] text-zinc-500 leading-relaxed">
            <strong>Aviz consultativ:</strong> Acest checklist are scop educațional și de orientare prealabilă. 
            El nu reprezintă o decizie formală de lichidare a unei daune și nu atestă conformitatea juridică a contractului. 
            Fiecare dosar se soluționează strict în baza poliței semnate și a normelor tehnice ale asigurătorului emitent.
          </div>
        </div>
      )}

      {/* Primary Conversion CTA */}
      <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-50 p-5 rounded-xl">
        <div className="text-xs text-zinc-600">
          <strong className="text-zinc-900 block text-sm">Vrei să verificăm gratuit clauzele poliței tale CASCO?</strong>
          Trimite-mi contractul actual sau oferta pe WhatsApp pentru o evaluare neutră a excluderilor.
        </div>
        <WhatsAppCta
          toolName="Checklist Calitate CASCO"
          contextSummary={`Scor obținut: ${scorePct}% (${answeredCount}/10 completate)`}
          label="Scrie-mi pe WhatsApp pentru Audit Poliță"
          size="md"
        />
      </div>
    </div>
  );
}
