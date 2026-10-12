"use client";

import * as React from "react";
import { 
  Zap, 
  BatteryCharging, 
  ShieldAlert, 
  Truck, 
  Car, 
  Home, 
  CheckCircle2, 
  AlertTriangle,
  Info
} from "lucide-react";
import { WhatsAppCta } from "@/components/ui/whatsapp-cta";

export function EvInsuranceGuide() {
  const evTopics = [
    {
      icon: <BatteryCharging className="w-5 h-5 text-emerald-600" />,
      title: "1. Bateria de Tracțiune: Cel mai Scump Component",
      highlight: "Reprezintă 40-55% din valoarea totală a vehiculului electric.",
      description: "La un impact pe dedesubt (piatră, bordură, denivelare carosabil), producătorul poate refuza reparația locală și poate impune înlocuirea completă a pachetului de baterii de înaltă tensiune (cost: 12.000 € – 35.000 €). Asigură-te că polița CASCO nu conține sub-limite restrictive pentru daune la șasiu inferior și baterie.",
      clauseWarning: "Verifică: Capitolul «Avarii Accidentale» — să includă explicit șocuri mecanice sub caroserie și incendiu spontan al acumulatorului."
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
      title: "2. Degradare Naturală (SOH) vs Avarie Accidentală",
      highlight: "Scăderea graduală a autonomiei NU este acoperită de asigurare.",
      description: "Polița CASCO nu este o garanție comercială a producătorului. Degradarea firească a capacității celulelor (State of Health - SOH) cauzată de cicluri repetate de încărcare este o excludere universală. Polița despăgubește exclusiv avarii mecanice violente, scurtcircuite accidentale la alimentare sau incendii de natură externă.",
      clauseWarning: "Verifică: Capitolul «Excluderi» — formularea clară privind uzura bateriei și defectele electrice de fabricație."
    },
    {
      icon: <Zap className="w-5 h-5 text-blue-600" />,
      title: "3. Cablurile de Încărcare & Adaptoarele Portabile",
      highlight: "Ținte frecvente pentru furt la stațiile publice de încărcare.",
      description: "Cablurile Type 2 și încărcătoarele mobile de 22 kW costă între 300 € și 1.200 €. Dacă lași mașina la încărcat peste noapte în spațiul public și cablul este forțat ori tăiat, o poliță CASCO standard poate refuza dosarul dacă nu are bifată clauza de accesorii exterioare.",
      clauseWarning: "Verifică: Clauza adițională «Echipamente de încărcare mobile și accesorii declarate»."
    },
    {
      icon: <Home className="w-5 h-5 text-indigo-600" />,
      title: "4. Stația Fixă de Domiciliu (Wallbox): CASCO sau Casă?",
      highlight: "Unde asiguri stația montată pe peretele garajului?",
      description: "Un wallbox fix montat în curte sau garaj nu face parte din vehicul odată deconectat. El trebuie inclus ca anexă a Asigurării Facultative de Locuință (categoria «Instalații și Echipamente fixe»). Dacă o supratensiune din rețea arde stația și mașina simultan, ambele polițe trebuie să conțină clauze armonizate.",
      clauseWarning: "Verifică: Corelarea poliței CASCO cu Asigurarea Locuinței pentru protecție la supratensiune."
    },
    {
      icon: <Truck className="w-5 h-5 text-purple-600" />,
      title: "5. Asistență Rutieră Specializată: Fără Rulare pe Roți",
      highlight: "Tractarea neconformă poate arde invertorul și motoarele magnetice.",
      description: "Majoritatea vehiculelor electrice nu permit tractarea clasică cu roțile motoare pe carosabil fără a genera curenți periculoși. Asistența rutieră inclusă în CASCO trebuie să garanteze platformă completă de încărcare și, ideal, serviciu de tractare la cea mai apropiată stație rapidă dacă rămâi fără baterie (descărcare 0%).",
      clauseWarning: "Verifică: Capitolul «Asistență Rutieră VIP» — clauza de transport pe platformă dedicată EV."
    },
    {
      icon: <Car className="w-5 h-5 text-rose-600" />,
      title: "6. Autovehicul la Schimb Compatibil (EV sau Hibrid)",
      highlight: "Nu dorești o mașină pe benzină dacă ai abonamente de încărcare.",
      description: "Polițele ieftine oferă mașină de curtoazie din clasa A sau B (manuală pe benzină). Pentru un proprietar de EV, este recomandată clauza care garantează vehicul automat, hibrid sau full electric pentru a păstra confortul obișnuit.",
      clauseWarning: "Verifică: Clauza de Mașină la Schimb — specificațiile categoriei de vehicul atribuite."
    }
  ];

  return (
    <div className="space-y-8 bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="border-b border-zinc-200/80 pb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2 border border-emerald-200">
          <Zap className="w-3.5 h-3.5" />
          Ghid Specializat Vehicule Electrice & Plug-in Hybrid
        </div>
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900">
          Asigurarea CASCO pentru Mașini Electrice: Ce Clauze Sunt Vitale?
        </h2>
        <p className="text-sm text-zinc-600 mt-1 max-w-3xl">
          Vehiculele electrice (Tesla, BMW i, Porsche Taycan, Hyundai Ioniq, Mercedes EQ etc.) au provocări tehnice unice: baterii de înaltă tensiune, 
          cuplu instantaneu ridicat, timpi lungi de livrare pentru piese de caroserie și cerințe speciale de tractare. 
          Iată cele 6 puncte critice pe care trebuie să le verifici în contractul tău.
        </p>
      </div>

      {/* Grid of Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {evTopics.map((topic, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl border border-zinc-200/90 bg-zinc-50/50 hover:bg-white hover:border-zinc-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="p-2.5 bg-white border border-zinc-200 rounded-lg w-fit shadow-xs">
                {topic.icon}
              </div>
              <h3 className="font-bold text-zinc-900 text-sm sm:text-base leading-snug">
                {topic.title}
              </h3>
              <div className="text-xs font-semibold text-emerald-700 bg-emerald-50/80 px-2.5 py-1 rounded-md border border-emerald-200/60">
                {topic.highlight}
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {topic.description}
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-200 text-[11px] text-zinc-500 space-y-1">
              <span className="font-semibold text-zinc-700 block">Sfat de verificare:</span>
              <p className="italic">{topic.clauseWarning}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Comparative Underwriting Note */}
      <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-3">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-blue-950 block">Abordarea Asigurătorilor din România:</strong>
          <p className="leading-relaxed">
            Nu toți asigurătorii au condiții identice pentru vehiculele electrice. Companii precum Generali România oferă pachete CASCO adaptate cu recunoaștere expresă a bateriei de tracțiune și a cablurilor de încărcare. Este esențial să nu cumperi un produs CASCO generic fără clauze specific menționate în anexa contractului.
          </p>
        </div>
      </div>

      {/* Primary Conversion CTA */}
      <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-50 p-5 rounded-xl">
        <div className="text-xs text-zinc-600">
          <strong className="text-zinc-900 block text-sm">Ai o mașină electrică sau urmează să preiei una în leasing?</strong>
          Scrie-mi pe WhatsApp pentru o ofertă CASCO cu acoperire completă a bateriei și reprezentanță de marcă.
        </div>
        <WhatsAppCta
          toolName="Ghid Asigurare Vehicule Electrice"
          contextSummary="Consultanță CASCO dedicată pentru mașină electrică / plug-in hybrid"
          label="Scrie-mi pe WhatsApp pentru CASCO Electric"
          size="md"
        />
      </div>
    </div>
  );
}
