"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Video, Volume2, Sparkles, Send, Play, Pause, RefreshCw, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const presetQuestions = [
  { q: "Cum pot să îmi protejez afacerea?", a: "Pentru protecția afacerii tale, recomandăm un mix strategic format din asigurarea Bunurilor Clădirilor la Valoare de Nou, clauza de Întrerupere a Activității (Business Interruption) și asigurarea de răspundere managerială D&O." },
  { q: "Ce este AiX OS?", a: "AiX OS este un sistem de operare financiar dezvoltat special pentru administrarea simplificată a polițelor tale de asigurări, a portofoliului imobiliar și a planurilor de protecție a averii, într-un singur panou inteligent." },
  { q: "Cum funcționează Home Find?", a: "Home Find utilizează algoritmi de analiză și filtrare în timp real pentru a identifica oportunități imobiliare off-market conforme cu profilul tău de risc și randament setat." },
  { q: "Am nevoie de Asigurare de Viață?", a: "Dacă deții credite active sau ai persoane care depind de veniturile tale, o asigurare de viață la termen (risc pur) este fundația esențială pentru protejarea familiei tale." }
];

export function AiVideoAvatar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState<"Standby" | "Speaking" | "Listening">("Standby");
  const [response, setResponse] = useState("Salutare! Sunt asistentul tău digital AiX. Alege o întrebare de mai jos sau folosește bara de chat pentru a discuta despre asigurări și planificarea financiară.");
  const [inputVal, setInputVal] = useState("");

  const handleQuestionSelect = (qItem: typeof presetQuestions[0]) => {
    setStatus("Speaking");
    setIsPlaying(true);
    setResponse(`[AiX Concierge] "${qItem.q}" - ${qItem.a}`);
    
    // Simulate speaking completion
    setTimeout(() => {
      setStatus("Standby");
    }, 5000);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal) return;
    setStatus("Speaking");
    setIsPlaying(true);
    setResponse(`[AiX Concierge] Analizez solicitarea ta despre "${inputVal}"... Recomandarea mea este să deschizi consola AiX Mission Control sau să programezi un audit cu consultantul Cristian Văduva.`);
    setInputVal("");

    setTimeout(() => {
      setStatus("Standby");
    }, 4000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
      
      {/* AVATAR STREAM CONTAINER */}
      <div className="w-full lg:w-6/12 border border-slate-100 bg-white rounded-[3rem] p-6 relative overflow-hidden flex flex-col justify-between shadow-sm min-h-[450px]">
        {/* Status Indicator */}
        <div className="flex justify-between items-center z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Stream Video Activ</span>
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${status === 'Standby' ? 'bg-blue-600' : status === 'Speaking' ? 'bg-emerald-600 animate-ping' : 'bg-rose-600'} transition-colors`} />
            <span className="text-xs font-bold text-slate-800">{status}</span>
          </div>
        </div>

        {/* Video Simulation Canvas */}
        <div className="my-auto flex flex-col items-center justify-center relative py-12">
          {/* Circular Pulse indicating voice activity */}
          <div className="w-40 h-40 rounded-full border border-slate-100 flex items-center justify-center relative bg-slate-50/50">
            {status === "Speaking" && (
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-emerald-500"
                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
            )}
            <Video className={`w-12 h-12 ${status === 'Speaking' ? 'text-emerald-600' : 'text-slate-400'}`} />
          </div>

          <p className="text-xs text-muted-foreground mt-6 uppercase tracking-wider text-center max-w-xs font-bold">
            Interfață video beneficiu gata pentru integrare HeyGen / D-ID
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex justify-between items-center z-10 border-t border-slate-100 pt-6">
          <div className="flex gap-2">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-200"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-200">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
            <Volume2 className="w-4 h-4" /> Volum Nativ Activ
          </div>
        </div>

      </div>

      {/* CHAT & QUESTIONS AREA */}
      <div className="w-full lg:w-6/12 flex flex-col gap-6">
        
        {/* Presets Questions */}
        <div className="glass p-8 rounded-[3rem] border border-border bg-white shadow-sm flex flex-col gap-4">
          <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <MessageSquare className="w-4.5 h-4.5 text-slate-400" /> Întrebări Frecvente
          </h4>
          <div className="flex flex-col gap-2">
            {presetQuestions.map((qItem, idx) => (
              <button 
                key={idx}
                onClick={() => handleQuestionSelect(qItem)}
                className="w-full text-left p-4 rounded-2xl border border-slate-100 hover:border-slate-800 hover:bg-slate-50/50 transition-all font-bold text-xs flex justify-between items-center text-slate-800"
              >
                <span>{qItem.q}</span>
                <Sparkles className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>

        {/* AI Answer & Custom Query Input */}
        <div className="glass p-8 rounded-[3rem] border border-border bg-white shadow-sm flex flex-col justify-between flex-grow">
          <div>
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-4">Răspuns Concierge AI</h4>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 min-h-[120px] text-sm text-slate-600 leading-relaxed font-medium">
              {response}
            </div>
          </div>

          <form onSubmit={handleCustomSend} className="flex gap-2 mt-6 border-t border-slate-100 pt-6">
            <Input 
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="Întreabă-mă orice altceva despre portofoliu..."
              className="h-12 rounded-full border-2 bg-slate-50 focus-visible:ring-0 focus-visible:border-slate-300 text-sm shadow-inner"
            />
            <Button type="submit" className="h-12 w-12 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-colors shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>

      </div>

    </div>
  );
}
