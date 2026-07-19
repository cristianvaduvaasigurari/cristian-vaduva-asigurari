"use client";

import * as React from "react"; import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Paperclip, ShieldAlert, Bot, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveAssessment } from "@/lib/actions";

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
};

export function ClaimAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "ai", text: "Salut! Sunt asistentul tău AiX. Îmi pare rău că treci prin acest incident. Te voi ghida pas cu pas pentru a strânge documentele necesare deschiderii dosarului de daună. Te rog să descrii, pe scurt, ce s-a întâmplat." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [claimId, setClaimId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI logic based on conversation length
    setTimeout(async () => {
      let aiResponse = "";
      
      if (messages.length === 1) {
        aiResponse = "Am înțeles situația. Pentru a putea evalua acoperirea, te rog să încarci câteva fotografii clare ale daunei folosind butonul de upload.";
      } else if (messages.length === 3) {
        aiResponse = "Fotografiile au fost recepționate și securizate în sistem. Pentru a finaliza rezumatul daunei, am nevoie de acordul tău pentru a prelucra aceste informații.";
      } else if (messages.length >= 5 && !claimId) {
        aiResponse = "Mulțumesc. Generez rezumatul daunei și îl transmit către echipa umană pentru verificare...";
        setMessages(prev => [...prev, { id: Date.now().toString(), sender: "ai", text: aiResponse }]);
        
        // Save to our platform
        const res = await saveAssessment("Claim_Report", { history: [...messages, userMsg] });
        setIsTyping(false);
        
        if (res.success && res.id) {
          setClaimId(res.id);
          setMessages(prev => [...prev, { 
            id: Date.now().toString(), 
            sender: "ai", 
            text: `Am înregistrat incidentul cu ID-ul temporar: ${res.id}. IMPORTANT: Acest raport are rol pur informativ și NU garantează aprobarea despăgubirii. Dosarul va fi preluat de inspectorii asiguratorului tău.` 
          }]);
        }
        return;
      } else {
        aiResponse = "Informație înregistrată. Mai ai și alte detalii pe care vrei să le adaugi?";
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), sender: "ai", text: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass rounded-[2.5rem] border border-border shadow-xl overflow-hidden flex flex-col h-[700px] bg-white">
      
      {/* Header */}
      <div className="p-6 border-b border-border bg-slate-50 flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold font-heading text-lg">AiX Claim Assistant</h3>
            <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Online
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Disclaimer</p>
          <p className="text-[10px] text-slate-400 max-w-[150px] leading-tight">Ghidaj AI. Nu reprezintă o decizie de aprobare a daunei.</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start gap-3 mb-8">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 leading-relaxed">
            Dacă este o urgență medicală, un incendiu activ sau dacă sunt implicate persoane rănite, te rugăm să abandonezi acest asistent și să suni imediat la <strong>112</strong>!
          </p>
        </div>

        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`max-w-[80%] p-4 rounded-2xl ${
                msg.sender === "user" 
                  ? "bg-blue-600 text-white rounded-br-sm" 
                  : "bg-white border border-border shadow-sm text-slate-700 rounded-bl-sm"
              }`}
            >
              <p className="text-[15px] leading-relaxed">{msg.text}</p>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-white border border-border shadow-sm rounded-2xl rounded-bl-sm p-4 flex gap-1 items-center">
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-white flex items-center gap-3">
        <Button variant="outline" className="h-12 w-12 rounded-full shrink-0 border-border" onClick={() => setInput(input + " [Poze Încărcate] ")} title="Simulare Încărcare Foto">
          <Camera className="w-5 h-5 text-slate-500" />
        </Button>
        <Button variant="outline" className="h-12 w-12 rounded-full shrink-0 border-border" onClick={() => setInput(input + " [Document Încărcat] ")} title="Simulare Încărcare Document">
          <Paperclip className="w-5 h-5 text-slate-500" />
        </Button>
        <div className="flex-1 relative">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Descrie incidentul sau încarcă poze..."
            className="h-14 rounded-full pl-6 pr-14 border-2 focus-visible:ring-0 focus-visible:border-blue-600 bg-slate-50"
            disabled={!!claimId || isTyping}
          />
          <Button 
            onClick={handleSend}
            disabled={!input.trim() || !!claimId || isTyping}
            className="absolute right-1 top-1 h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white p-0 flex items-center justify-center transition-transform active:scale-95"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
