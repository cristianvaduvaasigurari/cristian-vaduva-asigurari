"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Volume2, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const speakSuggestions = [
  { text: "Vreau să cumpăr o casă în Pipera", response: "Am înțeles. Pentru a cumpăra o casă în Pipera, este recomandat să rulezi mai întâi o simulare în RE Analyzer pentru randament și apoi să deschizi Home Find pentru a vizualiza listările off-market active." },
  { text: "Cum îmi protejez familia?", response: "Protecția familiei începe cu stabilirea deficitului de asigurare de viață. În Family Planner poți adăuga dependenții și calcula exact suma optimă pe care trebuie să o contractezi." },
  { text: "Vreau să investesc €50,000", response: "O sumă de 50.000 EUR poate fi diversificată într-un mod securizat. Recomandăm analizarea opțiunilor de Unit-Linked prin AiX Advisor sau consultarea strategiei noastre de Real Estate." },
  { text: "Am nevoie de o ofertă CASCO", response: "Perfect. Putem genera o cotație personalizată CASCO. Accesează direct formularul de Ofertă Rapidă sau asistentul de daune Claim Assistant în caz că ai deja un incident." }
];

export function VoiceAiWidget() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [reply, setReply] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const startVoiceSession = () => {
    setIsListening(true);
    setTranscript(null);
    setReply(null);

    // Simulate listening for 3 seconds
    setTimeout(() => {
      setIsListening(false);
      // Choose a random preset query to simulate spoken input
      const randomQuery = speakSuggestions[Math.floor(Math.random() * speakSuggestions.length)];
      setTranscript(randomQuery.text);
      
      setIsSpeaking(true);
      setTimeout(() => {
        setReply(randomQuery.response);
        setIsSpeaking(false);
      }, 1500);
    }, 3000);
  };

  const simulateSpeech = (suggestion: typeof speakSuggestions[0]) => {
    setTranscript(suggestion.text);
    setIsSpeaking(true);
    setReply(null);
    
    setTimeout(() => {
      setReply(suggestion.response);
      setIsSpeaking(false);
    }, 1200);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
      
      {/* Central Pulsing Microphone Sphere */}
      <div className="border border-slate-100 bg-white rounded-[3rem] p-10 flex flex-col items-center justify-center min-h-[350px] shadow-sm relative overflow-hidden">
        
        {/* Pulsing background rings */}
        <AnimatePresence>
          {isListening && (
            <>
              <motion.div 
                className="absolute w-64 h-64 rounded-full border-2 border-slate-900"
                initial={{ scale: 0.6, opacity: 0.8 }}
                animate={{ scale: 1.4, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
              />
              <motion.div 
                className="absolute w-80 h-80 rounded-full border border-dashed border-slate-400"
                initial={{ scale: 0.6, opacity: 0.6 }}
                animate={{ scale: 1.6, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5, ease: "easeOut" }}
              />
            </>
          )}
        </AnimatePresence>

        <button 
          onClick={startVoiceSession}
          disabled={isListening}
          className={`w-28 h-28 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform z-10 ${isListening ? 'bg-rose-600 text-white' : 'bg-slate-900 text-white'}`}
        >
          {isListening ? <Mic className="w-10 h-10 animate-bounce" /> : <Mic className="w-10 h-10" />}
        </button>

        <h3 className="font-heading font-black text-2xl text-slate-900 mt-8 mb-2">
          {isListening ? "Te ascult..." : "Apasă pentru a vorbi"}
        </h3>
        <p className="text-sm text-muted-foreground text-center max-w-xs leading-relaxed">
          {isListening ? "Spune comanda ta cu voce tare în limba română." : "Sistemul vocal utilizează rețele neuronale pentru procesare limbaj natural."}
        </p>

        {/* Status bar */}
        {isSpeaking && (
          <div className="absolute bottom-6 flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5 animate-pulse">
            <Volume2 className="w-3.5 h-3.5" /> AiX sintetizează răspunsul vocal...
          </div>
        )}
      </div>

      {/* Suggested Commands Row */}
      <div>
        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5 justify-center">
          <MessageSquare className="w-4 h-4 text-slate-400" /> Exemple de comenzi rapide (click pentru a simula):
        </h4>
        <div className="flex flex-wrap gap-2.5 justify-center">
          {speakSuggestions.map((item, idx) => (
            <button
              key={idx}
              onClick={() => simulateSpeech(item)}
              className="px-5 py-3 rounded-full bg-white border border-slate-100 hover:border-slate-800 text-xs font-bold text-slate-800 shadow-sm flex items-center gap-2 transition-all hover:-translate-y-0.5"
            >
              &quot;{item.text}&quot; <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Dialog Transcript Terminal */}
      <AnimatePresence>
        {(transcript || reply) && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass p-8 rounded-[2.5rem] border border-border bg-white shadow-md flex flex-col gap-6"
          >
            {transcript && (
              <div className="flex gap-4 items-start pb-6 border-b border-slate-50">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-3 py-1 rounded-full shrink-0">Tu (Voce)</span>
                <p className="text-slate-950 font-bold text-base italic">&quot;{transcript}&quot;</p>
              </div>
            )}
            
            {reply && (
              <div className="flex gap-4 items-start">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full shrink-0">AiX AI</span>
                <div className="flex-grow">
                  <p className="text-slate-700 leading-relaxed text-sm font-medium">{reply}</p>
                  
                  {/* Action Link Mock */}
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" className="h-9 rounded-full text-xs font-bold border-slate-200" onClick={() => alert("Asistentul vocal este în modul sandbox. Integrarea hardware completă urmează în curând.")}>
                      Ascultă Audio <Volume2 className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
