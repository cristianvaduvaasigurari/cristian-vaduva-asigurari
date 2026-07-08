"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send } from "lucide-react";
import { CONTACT } from "@/config/contact";

type Message = {
  id: string;
  type: "bot" | "user";
  text: string;
  options?: string[];
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    type: "bot",
    text: "Bună! Sunt asistentul virtual al platformei Cristian Văduva. Cu ce te pot ajuta?",
    options: ["Asigurare Auto", "Asigurare Locuință", "Asigurare de Viață", "Asigurare Sănătate", "Real Estate", "Investiții"],
  },
];

export function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = { id: String(messages.length + 1), type: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let botResponse = "Am înregistrat solicitarea ta. Te rugăm să ne lași un număr de telefon sau o adresă de email, iar un consultant premium te va contacta în cel mai scurt timp.";
      let options: string[] | undefined;

      if (lowerText.includes("auto") || lowerText.includes("rca") || lowerText.includes("casco")) {
        botResponse = `Pentru asigurări auto (RCA/CASCO), te rugăm să pregătești talonul mașinii. Poți trimite o poză pe ${CONTACT.whatsapp.label} la ${CONTACT.whatsapp.display} pentru a primi o cotație rapidă.`;
        options = ["Vreau ofertă RCA", "Vreau ofertă CASCO", "Sună-mă"];
      } else if (lowerText.includes("locuin") || lowerText.includes("casă") || lowerText.includes("apart")) {
        botResponse = "Asigurările de locuință (PAD + Facultativă) pot fi personalizate. Avem nevoie de adresa exactă, tipul imobilului și suprafața utilă. Cum dorești să fii contactat?";
        options = ["WhatsApp", "Telefonic", "Email"];
      } else if (lowerText.includes("viaț") || lowerText.includes("viata")) {
        botResponse = "Asigurarea de viață îți protejează familia financiar în cazul unui eveniment nefericit. Oferim polite flexibile prin Generali, cu posibilitate de capitalizare. Dorești o consultație?";
        options = ["Da, vreau consultanță", "Cere ofertă"];
      } else if (lowerText.includes("sănăt") || lowerText.includes("sanat") || lowerText.includes("health")) {
        botResponse = "Asigurările private de sănătate oferă acces la clinici și spitale private de top, fără timpi de așteptare. Acoperim ambulatoriu, spitalizare și intervenții chirurgicale.";
        options = ["Vreau ofertă", "Detalii acoperire"];
      } else if (lowerText.includes("travel") || lowerText.includes("călători") || lowerText.includes("calator")) {
        botResponse = "Asigurarea de călătorie acoperă cheltuieli medicale în străinătate, anularea zborurilor și pierderea bagajelor. Emitere instantă pe email!";
        options = ["Emite poliță", "Detalii preț"];
      } else if (lowerText.includes("real estate") || lowerText.includes("proprietat") || lowerText.includes("imobili")) {
        botResponse = "Oferăm consultanță premium în Real Estate: Buyer Representation, proprietăți off-market și Investment Advisory prin AiXLuxury și Home Find. Cum te putem ajuta?";
        options = ["Caut o proprietate", "Vreau să vând", "Consultanță investiții"];
      } else if (lowerText.includes("investiți") || lowerText.includes("investit")) {
        botResponse = "Strategii de investiții imobiliare cu analiză ROI, yield estimation și exit strategy. Programează o consultanță personalizată cu Cristian Văduva.";
        options = ["Programează consultanță", "Detalii servicii"];
      } else if (lowerText.includes("imm") || lowerText.includes("business") || lowerText.includes("firm")) {
        botResponse = "Asigurările pentru IMM/Corporate acoperă patrimoniul firmei, stocuri, echipamente și pierderea de profit. Oferim și polițe D&O și Cyber Risk.";
        options = ["Audit de risc", "Cere ofertă IMM"];
      } else if (lowerText.includes("sună") || lowerText.includes("telefon") || lowerText.includes("apel")) {
        botResponse = `Ne poți suna direct la ${CONTACT.phone.display} sau pe ${CONTACT.whatsapp.label} la ${CONTACT.whatsapp.display}. Suntem disponibili luni-vineri, 9:00-18:00.`;
      } else if (lowerText.includes("ofert") || lowerText.includes("preț") || lowerText.includes("cost")) {
        botResponse = `Pentru o ofertă personalizată, te rugăm să accesezi pagina de Contact sau să ne trimiți un mesaj pe ${CONTACT.whatsapp.label} cu detaliile. Răspundem în maxim 24h.`;
        options = ["Mergi la Contact", "WhatsApp"];
      }

      const botMsg: Message = {
        id: String(messages.length + 2),
        type: "bot",
        text: botResponse,
        options,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
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
            className="mb-4 w-[calc(100vw-3rem)] sm:w-[350px] origin-bottom-left"
          >
            <div className="flex flex-col h-[500px] max-h-[70vh] glass border border-border/50 shadow-2xl rounded-[2rem] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-muted">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-foreground">AiX Assistant</h3>
                    <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Online
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-black/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.type === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                        msg.type === "user"
                          ? "bg-blue-600 text-white rounded-tr-sm"
                          : "bg-muted border border-border text-foreground rounded-tl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.options && msg.type === "bot" && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {msg.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleSend(opt)}
                            className="px-3 py-1.5 rounded-full border border-blue-200 text-blue-700 bg-blue-50/50 hover:bg-blue-100 text-xs transition-colors"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-border bg-muted">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                    placeholder="Scrie un mesaj..."
                    className="w-full bg-white border border-border rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-blue-500 text-foreground placeholder:text-muted-foreground shadow-sm"
                  />
                  <button
                    onClick={() => handleSend(input)}
                    disabled={!input.trim()}
                    className="absolute right-2 p-2 rounded-full text-blue-600 hover:bg-blue-50 disabled:opacity-50 transition-colors"
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
        className="h-14 w-14 glass border border-border hover:border-blue-500 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all hover:scale-105 group"
      >
        {isOpen ? <X className="w-5 h-5 text-foreground" /> : <Sparkles className="w-6 h-6 group-hover:animate-pulse" />}
      </button>
    </div>
  );
}
