"use client";

import * as React from "react"; import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Car, Flame, HeartPulse, Waves, Plane, Building2, PhoneCall, ChevronRight, X, FileText, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

const emergencies = [
  {
    id: "accident",
    title: "Accident Auto",
    icon: <Car className="w-8 h-8" />,
    color: "bg-rose-50 text-rose-600 border-rose-100",
    phone: "112 (dacă sunt victime)",
    steps: [
      "Securizează zona și aprinde avariile. Dacă sunt victime, sună imediat la 112.",
      "Fotografiază ambele vehicule (poziția, numerele de înmatriculare, daunele).",
      "Mută mașinile din trafic doar DACĂ nu sunt victime și sunteți de acord cu vinovăția.",
      "Completează formularul de Constatare Amiabilă (sau cheamă Poliția).",
      "Sună la asistența rutieră a asiguratorului (număr pe polița RCA/CASCO)."
    ],
    docs: ["Buletin", "Permis", "Talon", "Polița RCA/CASCO", "Poze"]
  },
  {
    id: "medical",
    title: "Urgență Medicală",
    icon: <HeartPulse className="w-8 h-8" />,
    color: "bg-red-50 text-red-600 border-red-100",
    phone: "112 (Ambulanță)",
    steps: [
      "Sună la 112 pentru orice urgență care pune viața în pericol.",
      "Dacă este o problemă acută dar nu vitală, folosește numărul de call-center al rețelei private (dacă ai abonament sau poliță privată).",
      "Prezintă cardul de identitate și cardul de asigurare la recepția clinicii.",
      "Cere întotdeauna copie după fișa de la UPU/Consult dacă ai o poliță de invaliditate/spitalizare."
    ],
    docs: ["Buletin", "Card Sănătate / Card Poliță Privată", "Istoric medical sumar"]
  },
  {
    id: "fire",
    title: "Incendiu Casă",
    icon: <Flame className="w-8 h-8" />,
    color: "bg-orange-50 text-orange-600 border-orange-100",
    phone: "112 (Pompieri)",
    steps: [
      "Evacuează imediat clădirea. Viața este prioritară. Sună la 112.",
      "Nu încerca să stingi un incendiu major sau unul electric cu apă.",
      "Așteaptă stingerea de către pompieri și cere Procesul Verbal de Intervenție (vital pentru asigurare).",
      "Nu arunca și nu repara nimic până la vizita inspectorului de daune.",
      "Contactează brokerul sau asiguratorul pentru deschiderea dosarului."
    ],
    docs: ["Proces Verbal Pompieri", "Polița de Asigurare (PAD + Facultativă)", "Poze/Video"]
  },
  {
    id: "flood",
    title: "Inundație Apartament",
    icon: <Waves className="w-8 h-8" />,
    color: "bg-blue-50 text-blue-600 border-blue-100",
    phone: "Administrator Bloc",
    steps: [
      "Oprește imediat apa de la robineții principali sau de pe scară.",
      "Oprește curentul electric din panou dacă apa a ajuns la prize.",
      "Află sursa (de la tine, de la vecin, coloană comună) și anunță administratorul.",
      "Fă fotografii și video clare cu toate daunele (pereți, parchet, mobilă).",
      "Contactează vecinul dacă el te-a inundat și cere-i polița de răspundere civilă (sau folosește-o pe a ta cu regres)."
    ],
    docs: ["Poze Video clare", "Notificare Asigurator", "Act de spațiu"]
  },
  {
    id: "travel",
    title: "Urgență Călătorie",
    icon: <Plane className="w-8 h-8" />,
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    phone: "Numărul de Asistență (pe poliță)",
    steps: [
      "SUNĂ ÎNTÂI la numărul de asistență 24/7 scris pe polița Travel ÎNAINTE de a merge la un spital (pentru a fi direcționat către rețeaua decontată direct).",
      "Păstrează toate bonurile fiscale (taxi spre spital, medicamente prescrise).",
      "Dacă zborul s-a anulat sau bagajul e pierdut, cere raportul oficial de la compania aeriană (P.I.R).",
      "Păstrează tichetul de îmbarcare."
    ],
    docs: ["Polița Travel (PDF pe telefon)", "Pașaport", "Facturi Medicale (dacă plătești din buzunar)"]
  },
  {
    id: "business",
    title: "Daună Business",
    icon: <Building2 className="w-8 h-8" />,
    color: "bg-purple-50 text-purple-600 border-purple-100",
    phone: "Broker / Autorități Locale",
    steps: [
      "Asigură siguranța angajaților.",
      "Limitează proporțiile daunei (oprește utilaje, utilități).",
      "Cheamă autoritățile competente (Poliție/Pompieri/ITM) în funcție de specific.",
      "Fotografiază detaliat stocul afectat, utilajele sau clădirea.",
      "Sună brokerul tău imediat. Nu altera probatoriul."
    ],
    docs: ["Registru Inventar", "Proces Verbal Autorități", "Documente contabile doveditoare"]
  }
];

export function EmergencyCenter() {
  const [selectedScenario, setSelectedScenario] = useState<typeof emergencies[0] | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto">
      
      {!selectedScenario ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emergencies.map((em, i) => (
            <motion.button
              key={em.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedScenario(em)}
              className={`p-8 rounded-[2rem] border transition-all text-left group hover:shadow-xl bg-white ${em.color.split(' ')[2]} border-border hover:border-slate-300`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${em.color}`}>
                {em.icon}
              </div>
              <h3 className="text-xl font-bold font-heading mb-2 text-foreground">{em.title}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                Apasă pentru pașii critici <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </p>
            </motion.button>
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-8 md:p-12 rounded-[3rem] border border-border shadow-2xl bg-white relative"
        >
          <button 
            onClick={() => setSelectedScenario(null)}
            className="absolute top-8 right-8 p-2 text-muted-foreground hover:text-foreground transition-colors bg-slate-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
            <div className={`w-24 h-24 rounded-3xl flex items-center justify-center shrink-0 ${selectedScenario.color}`}>
              {selectedScenario.icon}
            </div>
            <div>
              <h2 className="text-4xl font-heading font-bold mb-4">{selectedScenario.title}</h2>
              <div className="flex items-center gap-3 p-4 bg-rose-50 text-rose-700 font-bold rounded-2xl border border-rose-200 w-fit">
                <PhoneCall className="w-5 h-5 animate-pulse" />
                Primul Apel: {selectedScenario.phone}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-8">
              <h3 className="text-2xl font-bold font-heading flex items-center gap-2 border-b border-border pb-4">
                <AlertCircle className="w-6 h-6 text-rose-500" /> Ce trebuie să faci imediat
              </h3>
              <ul className="space-y-6">
                {selectedScenario.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-sm">
                      {idx + 1}
                    </span>
                    <span className="text-lg leading-relaxed text-slate-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold font-heading mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" /> Documente Necesare
                </h4>
                <ul className="space-y-3">
                  {selectedScenario.docs.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold font-heading mb-4 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-emerald-600" /> Atenție
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Nu arunca nimic și nu modifica locul faptei. Fotografiile și documentele eliberate de autorități sunt cruciale pentru plata despăgubirilor.
                </p>
              </div>

              <Button className="w-full h-14 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold" onClick={() => window.location.href='/claim-assistant'}>
                Deschide AI Claim Assistant
              </Button>
            </div>
          </div>
        </motion.div>
      )}
      
    </div>
  );
}
