"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, AlertCircle, HelpCircle, Info, 
  ShieldAlert, ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "insurance", label: "Ofertă Asigurare" },
  { id: "property", label: "Ofertă Imobiliară" },
  { id: "investment", label: "Idee Investiții" },
  { id: "contract", label: "Contract Comercial / Credit" }
];

interface ReportData {
  points: string[];
  risks: string[];
  questions: string[];
  missing: string[];
}

export function SecondOpinionAnalyzer() {
  const [selectedCat, setSelectedCat] = useState("insurance");
  const [textInput, setTextInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<ReportData | null>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput) return;
    setIsAnalyzing(true);
    setReport(null);

    // Mock analysis lag
    setTimeout(() => {
      setIsAnalyzing(false);
      setReport({
        points: [
          "Limita de despăgubire pe eveniment nu este indexată la inflație.",
          "Franșize ascunse de tip procentual aplicabile la daune totale.",
          "Excluderi specifice pentru riscuri de fenomene naturale majore."
        ],
        risks: [
          "Expunere la sub-asigurare în caz de refacere completă a imobilului.",
          "Risc de respingere a dosarului de daună din cauza lipsei notificării rapide (limita de 48h)."
        ],
        questions: [
          "Care este franșiza exactă în caz de catastrofă naturală?",
          "Sunt incluse în prima prezentată toate clauzele de protecție a terților și chiriașilor?",
          "Este inclusă asistența rutieră cu autovehicul la schimb?"
        ],
        missing: [
          "Raportul oficial de evaluare seismică / Eurotax-ul actualizat.",
          "Specificațiile tehnice ale sistemelor de alarmare antifurt din contract."
        ]
      });
    }, 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
      
      {/* Input Console */}
      <div className="glass p-8 rounded-[3rem] border border-border bg-white shadow-sm flex flex-col gap-6">
        
        {/* Category Selector */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-3">Categorie Document / Solicitare</span>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-5 py-3 rounded-full text-xs font-bold transition-all border ${
                  selectedCat === cat.id 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Text Input area */}
        <form onSubmit={handleAnalyze} className="space-y-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-3">Detalii Ofertă sau Text Document</span>
            <textarea
              value={textInput}
              onChange={e => setTextInput(e.target.value)}
              placeholder="Lipește textul ofertei primite sau descrie ideea ta de investiție/asigurare pentru a solicita o a doua opinie..."
              className="w-full h-40 p-5 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:border-slate-900 transition-colors shadow-inner resize-none"
            />
          </div>

          <div className="flex justify-between items-center flex-wrap gap-4 pt-4 border-t border-slate-50">
            <span className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1.5">
              <Info className="w-4 h-4" /> Integrarea cu LLM și OCR-ul de documente va fi disponibilă în faza următoare.
            </span>
            <Button 
              type="submit" 
              disabled={isAnalyzing || !textInput}
              className="h-12 px-8 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
            >
              {isAnalyzing ? "Se analizează..." : "Rulează Analiză Educativă"}
            </Button>
          </div>
        </form>

      </div>

      {/* Analyzing state */}
      {isAnalyzing && (
        <div className="glass p-12 rounded-[3rem] border border-border bg-white text-center flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-slate-900 animate-spin mb-6" />
          <h3 className="font-heading font-black text-2xl text-slate-900 mb-2">Se analizează clauzele...</h3>
          <p className="text-sm text-muted-foreground max-w-xs">Identificăm excluderile ascunse, franșizele potențiale și riscurile de sub-asigurare din oferta deținută.</p>
        </div>
      )}

      {/* Report results */}
      <AnimatePresence>
        {report && !isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-6"
          >
            
            {/* Grid for Analysis sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Risks & Points */}
              <div className="glass p-8 rounded-[2.5rem] border border-border bg-white shadow-sm flex flex-col gap-6">
                <div>
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <AlertCircle className="w-4.5 h-4.5 text-rose-500" /> Riscuri Identificate
                  </h4>
                  <ul className="space-y-3">
                    {report.risks.map((r: string, i: number) => (
                      <li key={i} className="text-xs text-slate-600 pl-4 border-l-2 border-rose-300 leading-relaxed font-medium">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-slate-50 pt-6">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <Info className="w-4.5 h-4.5 text-slate-400" /> Puncte de Atenție Majoră
                  </h4>
                  <ul className="space-y-3">
                    {report.points.map((p: string, i: number) => (
                      <li key={i} className="text-xs text-slate-600 pl-4 border-l-2 border-slate-200 leading-relaxed">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Questions & Missing Info */}
              <div className="glass p-8 rounded-[2.5rem] border border-border bg-white shadow-sm flex flex-col gap-6">
                <div>
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <HelpCircle className="w-4.5 h-4.5 text-blue-500" /> Întrebări de adresat broker-ului
                  </h4>
                  <ul className="space-y-3">
                    {report.questions.map((q: string, i: number) => (
                      <li key={i} className="text-xs text-slate-600 pl-4 border-l-2 border-blue-200 leading-relaxed font-semibold">
                        &quot;{q}&quot;
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-slate-50 pt-6">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <FileText className="w-4.5 h-4.5 text-slate-400" /> Informații lipsă / Documente adiționale necesare
                  </h4>
                  <ul className="space-y-3">
                    {report.missing.map((m: string, i: number) => (
                      <li key={i} className="text-xs text-slate-600 pl-4 border-l-2 border-slate-200 leading-relaxed">
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Disclaimer box */}
            <div className="glass p-6 rounded-[2rem] border border-amber-100 bg-amber-50/50 flex gap-3 items-start shadow-sm">
              <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-[9px] font-bold text-amber-800 uppercase tracking-widest">Disclaimer Legal de Analiză</span>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Aceasta este o analiză educațională generată pe baza informațiilor furnizate. Acest raport nu constituie consultanță juridică, fiscală sau financiară și nu oferă garanții legale. Vă recomandăm să validați contractele finale direct cu expertul licențiat Cristian Văduva în cadrul unei ședințe private.
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <Button className="h-14 rounded-full bg-slate-900 text-white font-bold px-8 hover:bg-slate-800 transition-colors flex items-center gap-2" asChild>
                <a href="/smart-forms">Trimite Documentul la Audit Gratuit <ArrowRight className="w-4 h-4" /></a>
              </Button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
