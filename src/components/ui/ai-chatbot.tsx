"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Loader2 } from "lucide-react";
import { CONTACT } from "@/config/contact";

type Message = {
  id: string;
  type: "bot" | "user";
  text: string;
};

export function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      text: "Salutare! Sunt AiX Assistant, un consultant digital alimentat de o arhitectură avansată AI. Cum te pot ajuta astăzi?",
    }
  ]);
  const [input, setInput] = useState("");
  
  // Persistent Structured Memory State
  const [context, setContext] = useState({
    currentTopic: null,
    previousTopic: null,
    longTermObjective: null,
    frustrationLevel: "low",
    knownFacts: {}
  });
  
  const [history, setHistory] = useState<Array<{role: string, content: string}>>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { id: String(Date.now()), type: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const newHistory = [...history, { role: "user", content: text }];
    setHistory(newHistory);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: newHistory.slice(-10), // Keep context window manageable
          context: context
        })
      });

      const data = await response.json();
      
      const botMsg: Message = { id: String(Date.now() + 1), type: "bot", text: data.response };
      setMessages(prev => [...prev, botMsg]);
      
      // Update memory and history
      if (data.updatedContext) {
        setContext(data.updatedContext);
      }
      setHistory([...newHistory, { role: "assistant", content: data.response }]);

    } catch {
      const errorMsg: Message = { 
        id: String(Date.now() + 2), 
        type: "bot", 
        text: `A apărut o eroare tehnică. Te rog să ne contactezi direct la ${CONTACT.phone.display}.` 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-4 w-[calc(100vw-3rem)] sm:w-[380px] origin-bottom-left"
          >
            <div className="flex flex-col h-[520px] max-h-[75vh] glass border border-border/50 shadow-2xl rounded-[2.2rem] overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-[#fbfbfa]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-slate-800">AiX Assistant V2</h3>
                    <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Multi-Layer Reasoning Active
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Închide asistentul AiX"
                  className="p-2 text-slate-400 hover:text-slate-800 transition-colors rounded-full hover:bg-black/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-white">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.type === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed font-medium whitespace-pre-wrap ${
                        msg.type === "user"
                          ? "bg-slate-900 text-white rounded-tr-sm shadow-md"
                          : "bg-slate-50 border border-slate-100 text-slate-700 rounded-tl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex flex-col items-start">
                    <div className="max-w-[85%] p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 rounded-tl-sm flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                      <span className="text-xs font-medium text-slate-400">Analizează...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-slate-100 bg-[#fbfbfa]">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                    placeholder="Cum te pot asista astazi?..."
                    aria-label="Mesaj pentru asistentul AiX"
                    disabled={isLoading}
                    className="w-full bg-white border border-slate-200 rounded-full pl-4 pr-12 py-3 text-xs font-semibold focus:outline-none focus:border-slate-800 text-slate-800 placeholder:text-slate-400 shadow-sm disabled:opacity-50"
                  />
                  <button
                    onClick={() => handleSend(input)}
                    disabled={!input.trim() || isLoading}
                    aria-label="Trimite mesaj"
                    className="absolute right-2 p-2 rounded-full text-slate-800 hover:bg-slate-50 disabled:opacity-50 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Închide asistentul AiX" : "Deschide asistentul AiX"}
        aria-expanded={isOpen}
        className="h-14 w-14 glass border border-slate-200 hover:border-slate-800 bg-white text-slate-800 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all hover:scale-105 group"
      >
        {isOpen ? <X className="w-5 h-5 text-slate-700" /> : <Sparkles className="w-5 h-5 text-slate-800 group-hover:text-amber-500 transition-colors" />}
      </button>
    </div>
  );
}
