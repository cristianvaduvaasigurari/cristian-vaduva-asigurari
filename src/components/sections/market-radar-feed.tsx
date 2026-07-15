"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, TrendingUp, TrendingDown, Cpu, Sparkles, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const radarSignals = [
  {
    id: "re-1",
    category: "Real Estate Market",
    title: "Creșterea chiriilor beneficiu în Pipera & Floreasca",
    trend: "+8.4% anual",
    status: "bullish",
    summary: "Cererea crescută de la expați și angajații multinaționalelor menține presiunea pe prețurile chiriilor pentru apartamentele cu 3-4 camere.",
    aiSummary: "Randamentul net imobiliar depășește acum 6.2% brut în aceste zone. Recomandare: securizați asigurarea împotriva neplății chiriei."
  },
  {
    id: "ins-1",
    category: "Insurance News",
    title: "Noi reglementări ASF pentru polițele RCA în 2026",
    trend: "Stabilizare Preț",
    status: "neutral",
    summary: "Se preconizează un nou algoritm de calcul al indicelui Bonus-Malus pentru penalizarea comportamentului agresiv în trafic.",
    aiSummary: "Polițele pe termen lung ar putea beneficia de o reducere de până la 15% pentru șoferii cu istoric imaculat (clasa B8)."
  },
  {
    id: "econ-1",
    category: "Economic News",
    title: "Scăderea dobânzilor de referință IRCC la 5.6%",
    trend: "-0.3% Trimestrial",
    status: "bullish",
    summary: "Banca Națională sugerează o politică monetară mai relaxată, stimulând piața creditelor ipotecare rezidențiale.",
    aiSummary: "Costul finanțării imobiliare scade, favorizând refinanțarea creditelor vechi cu dobânzi fixe mai avantajoase."
  },
  {
    id: "inv-1",
    category: "Investment Trends",
    title: "Fondurile Unit-Linked depășesc depozitele bancare",
    trend: "12.8% Randament Mediu",
    status: "bullish",
    summary: "Investitorii români migrează de la instrumentele clasice de economisire spre fonduri cu protecție de capital.",
    aiSummary: "Asigurările de viață cu componentă investițională devin pilonul principal de acumulare pe termen lung."
  },
  {
    id: "lux-1",
    category: "acces rapid pentru tine Market",
    title: "Creșterea taxelor de import pentru supercars electrice",
    trend: "+10% Taxare",
    status: "bearish",
    summary: "Modificările fiscale la nivel european afectează cotațiile mașinilor sport importate din afara Uniunii.",
    aiSummary: "Valoarea reziduală a modelelor termice exclusiviste (V8/V12) este în creștere pe piața secundară."
  }
];

export function MarketRadarFeed() {
  const [filter, setFilter] = useState("Toate");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [aiDigest, setAiDigest] = useState<string | null>(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const generateAiDigest = () => {
    setAiDigest("Conform analizei radar AiX din ultimele 24h: Scăderea indicelui IRCC deschide o fereastră optimă de refinanțare imobiliară. Piața rezidențială Pipera rămâne extrem de puternică (+8.4%), fiind indicată securizarea bunurilor cu polițe All-Risk. Pe zona de lux, valorile reziduale ale modelelor clasice cresc datorită noilor taxe pe supercars electrice.");
  };

  const filteredSignals = filter === "Toate" ? radarSignals : radarSignals.filter(s => s.category === filter);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
      
      {/* Control Bar */}
      <div className="glass p-6 rounded-[3.5rem] border border-slate-200 bg-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        
        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
          {["Toate", "Real Estate Market", "Insurance News", "Economic News", "Investment Trends", "acces rapid pentru tine Market"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${filter === cat ? 'bg-slate-900 text-white shadow' : 'bg-slate-50 border border-slate-100 text-slate-600 hover:border-slate-300'}`}
            >
              {cat === "Toate" ? "Toate Categoriile" : cat.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 shrink-0 w-full md:w-auto justify-end">
          <Button onClick={generateAiDigest} variant="outline" className="h-10 rounded-full font-bold text-xs bg-slate-50 hover:bg-slate-100 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Rezumat AI
          </Button>
          <Button onClick={handleRefresh} disabled={isRefreshing} variant="outline" className="h-10 rounded-full font-bold text-xs bg-slate-50 hover:bg-slate-100 flex items-center gap-1.5">
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} /> Actualizează
          </Button>
        </div>

      </div>

      {/* AI Digest Display */}
      {aiDigest && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }} 
          animate={{ opacity: 1, height: "auto" }} 
          className="p-6 rounded-[2rem] border border-blue-100 bg-blue-50/40 relative overflow-hidden"
        >
          <div className="flex gap-3 items-start">
            <div className="p-2 bg-blue-100 rounded-full text-blue-600 shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">AiX Market Intelligence Digest</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{aiDigest}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Signals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSignals.map((sig) => (
          <div key={sig.id} className="glass p-8 rounded-[2.5rem] border border-border bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Category & Status */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{sig.category}</span>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${sig.status === 'bullish' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : sig.status === 'bearish' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-slate-50 text-slate-600 border-slate-100'}`}>
                  {sig.status === 'bullish' ? <TrendingUp className="w-3 h-3" /> : sig.status === 'bearish' ? <TrendingDown className="w-3 h-3" /> : <Filter className="w-3 h-3" />}
                  {sig.trend}
                </span>
              </div>

              {/* Title & Body */}
              <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">{sig.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">{sig.summary}</p>
            </div>

            {/* AI Summary and Action */}
            <div className="border-t border-slate-50 pt-4 mt-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
              <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block mb-1">Impact &amp; Recomandare:</span>
              <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">{sig.aiSummary}</p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
