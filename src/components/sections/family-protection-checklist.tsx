"use client";

import * as React from "react";
import { useState } from "react";
import { 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  FolderLock,
  PhoneCall,
  Scale,
  RotateCcw
} from "lucide-react";
import { WhatsAppCta } from "@/components/ui/whatsapp-cta";

interface FamilyChecklistItem {
  id: string;
  pillar: string;
  title: string;
  description: string;
  actionAdvice: string;
}

const FAMILY_ITEMS: FamilyChecklistItem[] = [
  {
    id: "f1",
    pillar: "Desemnare Beneficiari",
    title: "Beneficiarii sunt nominalizați expres pe toate polițele de viață și pensii?",
    description: "Fără clauză expresă cu nume și CNP, indemnizația de asigurare este atrasă în masa succesorală notarială, putând rămâne blocată între 6 și 18 luni până la dezbaterea moștenirii.",
    actionAdvice: "Verifică pe polițele de viață dacă este trecut «Moștenitorii legali» sau numele concret al partenerului / copiilor."
  },
  {
    id: "f2",
    pillar: "Dosar de Urgență",
    title: "Partenerul tău știe exact unde se află dosarul cu contractele financiare?",
    description: "În caz de accident sau spitalizare de urgență, familia trebuie să știe instant codurile polițelor, numele asigurătorului și numărul de asistență 24/7.",
    actionAdvice: "Centralizează într-un dosar fizic sau folder digital securizat toate polițele, titlurile de proprietate și datele brokerului."
  },
  {
    id: "f3",
    pillar: "Contacte Cheie",
    title: "Familia are numărul direct al brokerului tău de asigurări și al avocatului?",
    description: "La un deces sau eveniment major, rudele nu au luciditatea de a negocia cu companiile de asigurare; un contact de încredere preia avizarea și dosarul.",
    actionAdvice: "Salvează contactul brokerului în telefonul partenerului cu eticheta clară «Consilier Asigurări Familie»."
  },
  {
    id: "f4",
    pillar: "Active & Credite",
    title: "Există o listă clară a tuturor conturilor, creditelor și bunurilor deținute?",
    description: "Multe familii pierd indemnizații sau descoperă datorii neștiute luni de zile mai târziu din lipsa unui inventar financiar sintetic.",
    actionAdvice: "Întocmește o listă a băncilor creditoare, a soldurilor și a bunurilor imobiliare deținute (fără parole sau date de acces bancar)."
  },
  {
    id: "f5",
    pillar: "Planificare Succesorală",
    title: "Ați discutat sau revizuit planul succesoral (testament / partaj voluntar)?",
    description: "Dacă există copii din căsătorii anterioare, firme active sau proprietăți comune, legea succesorală din România impune rezerve succesorale stricte.",
    actionAdvice: "Consultă un notar sau avocat specializat pentru a armoniza polițele de asigurare cu actele succesorale."
  }
];

export function FamilyProtectionChecklist() {
  const [checkedIds, setCheckedIds] = useState<string[]>(["f2"]);

  const toggleItem = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const resetAll = () => setCheckedIds([]);

  const scorePct = Math.round((checkedIds.length / FAMILY_ITEMS.length) * 100);

  return (
    <div className="space-y-8 bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="border-b border-zinc-200/80 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2 border border-blue-200">
            <Users className="w-3.5 h-3.5" />
            Checklist Protecția Familiei & Dosar de Urgență
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900">
            Cât de Pregătită Financiar Este Familia Ta pentru Evenimente Neprevăzute?
          </h2>
          <p className="text-sm text-zinc-600 mt-1 max-w-3xl">
            Asigurările de viață și sănătate funcționează optim doar dacă sunt acompaniate de o bună organizare a documentelor și de desemnarea expresă a beneficiarilor. 
            Acest checklist te ajută să bifezi cei 5 pași esențiali de siguranță fără a colecta date medicale confidențiale.
          </p>
        </div>

        {checkedIds.length > 0 && (
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 underline font-semibold shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Resetează bifările
          </button>
        )}
      </div>

      {/* Score Banner */}
      <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-zinc-500 font-medium">Nivel de pregătire familială:</span>
            <div className="font-bold text-zinc-900 text-base">
              {checkedIds.length} din {FAMILY_ITEMS.length} măsuri implementate ({scorePct}%)
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-md text-xs font-bold border ${
              scorePct >= 80
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : scorePct >= 50
                ? "bg-blue-50 text-blue-800 border-blue-200"
                : "bg-amber-50 text-amber-800 border-amber-200"
            }`}
          >
            {scorePct >= 80 ? "Familie Excelent Protejată" : scorePct >= 50 ? "Protecție Parțială" : "Vulnerabilități Critice"}
          </span>
        </div>

        <div className="w-full bg-zinc-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${scorePct}%` }}
          />
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-4">
        {FAMILY_ITEMS.map((item, idx) => {
          const isChecked = checkedIds.includes(item.id);

          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-5 rounded-xl border transition-all cursor-pointer ${
                isChecked
                  ? "bg-emerald-50/40 border-emerald-300 shadow-xs"
                  : "bg-white border-zinc-200 hover:border-zinc-300"
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-5 h-5 rounded-md border mt-0.5 shrink-0 flex items-center justify-center transition-colors ${
                    isChecked
                      ? "bg-emerald-600 border-emerald-600 text-white font-bold text-xs"
                      : "border-zinc-300 bg-white"
                  }`}
                >
                  {isChecked && "✓"}
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      Pilonul {idx + 1}: {item.pillar}
                    </span>
                    {isChecked ? (
                      <span className="text-xs font-semibold text-emerald-700">Confirmat ✓</span>
                    ) : (
                      <span className="text-xs text-zinc-400">Apasă pentru confirmare</span>
                    )}
                  </div>

                  <h3 className="font-bold text-zinc-900 text-sm sm:text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 text-[11px] text-zinc-500 flex items-center gap-1.5 border-t border-zinc-100 mt-2">
                    <FileText className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span><strong>Sfat practic:</strong> {item.actionAdvice}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Privacy Guarantee Box */}
      <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-600 flex items-start gap-3">
        <FolderLock className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-zinc-900 block">Fără date medicale sau documente colectate:</strong>
          <p>
            Acest instrument funcționează 100% în browserul tău. Nu colectăm date medicale, dosare de sănătate, certificate de naștere sau parole. 
            Ghidul este un exercițiu personal de conștientizare și bună organizare pentru familia ta.
          </p>
        </div>
      </div>

      {/* Primary Conversion CTA */}
      <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-50 p-5 rounded-xl">
        <div className="text-xs text-zinc-600">
          <strong className="text-zinc-900 block text-sm">Vrei să desemnezi corect beneficiarii pe polițe sau să structurezi un plan de familie?</strong>
          Scrie-mi pe WhatsApp pentru o sesiune gratuită de structurare a dosarului de asigurare al familiei tale.
        </div>
        <WhatsAppCta
          toolName="Checklist Protecția Familiei"
          contextSummary={`Checklist familie completat (${checkedIds.length}/5 măsuri bifate)`}
          label="Scrie-mi pe WhatsApp pentru Planul Familiei"
          size="md"
        />
      </div>
    </div>
  );
}
