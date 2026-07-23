"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, UserCheck, AlertCircle, CheckCircle2 } from "lucide-react";


type Message = {
  id: string;
  type: "bot" | "user" | "form" | "system";
  text: string;
  options?: string[];
  formType?: "consultant";
};

type FlowState = 
  | "INITIAL"
  | "HOME_INSURANCE"
  | "AUTO_INSURANCE"
  | "LIFE_INSURANCE"
  | "HEALTH_INSURANCE"
  | "BUSINESS_INSURANCE"
  | "INVESTMENT"
  | "CONSULTANT_REQUEST"
  | "SUCCESS";

interface ChatState {
  flow: FlowState;
  step: number;
  data: Record<string, string>;
  lastBotMsg: string;
  loopCount: number;
}

export function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      text: "Salutare! Sunt AiX Assistant, consultantul tău digital premium. Te pot ajuta să identifici riscurile financiare, să configurezi polițele optime Generali sau să explorezi oportunitățile imobiliare. Despre ce dorești să discutăm?",
      options: ["Protecție Locuință", "Asigurări Auto", "Asigurare de Viață", "Sănătate & Familie", "Asigurări Business", "Investiții Imobiliare", "Vreau să vorbesc cu un consultant"],
    }
  ]);
  const [input, setInput] = useState("");
  
  const [chatState, setChatState] = useState<ChatState>({
    flow: "INITIAL",
    step: 0,
    data: {},
    lastBotMsg: "",
    loopCount: 0
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleConsultantRequest = () => {
    setChatState(prev => ({ ...prev, flow: "CONSULTANT_REQUEST", step: 0 }));
    setMessages(prev => [
      ...prev,
      { id: String(Date.now()), type: "user", text: "Vreau să vorbesc cu un consultant" },
      { id: String(Date.now() + 1), type: "bot", text: "Te rog să completezi datele de mai jos pentru a fi preluat de un consultant." },
      { id: String(Date.now() + 2), type: "form", text: "", formType: "consultant" }
    ]);
  };

  const submitLead = async (formData: Record<string, string>) => {
    // Structure prepared for CRM Integration
    const leadData = {
      ...formData,
      collectedData: chatState.data,
      insuranceCategory: chatState.flow,
      source: "AiX Assistant",
      timestamp: new Date().toISOString()
    };
    console.log("Lead submitted to CRM:", leadData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    setChatState(prev => ({ ...prev, flow: "SUCCESS", step: 0 }));
    setMessages(prev => [
      ...prev,
      { 
        id: String(Date.now()), 
        type: "system", 
        text: "Solicitarea ta a fost înregistrată cu succes. Cristian Văduva te va contacta în cel mai scurt timp." 
      }
    ]);
  };

  const advanceFlow = (userSelection: string) => {
    const nextState = { ...chatState };
    nextState.data[`step_${nextState.step}`] = userSelection;

    if (userSelection === "Vreau să vorbesc cu un consultant") {
      handleConsultantRequest();
      return;
    }

    let botText = "";
    let botOptions: string[] = [];

    switch (nextState.flow) {
      case "INITIAL":
        if (userSelection.includes("Locuință")) {
          nextState.flow = "HOME_INSURANCE";
          botText = "Pentru a configura protecția locuinței tale, te rog să-mi spui tipul imobilului:";
          botOptions = ["Apartament", "Casă/Vilă", "Vreau să vorbesc cu un consultant"];
        } else if (userSelection.includes("Auto")) {
          nextState.flow = "AUTO_INSURANCE";
          botText = "Ce tip de asigurare auto te interesează?";
          botOptions = ["RCA", "CASCO", "Ambele", "Vreau să vorbesc cu un consultant"];
        } else if (userSelection.includes("Viață")) {
          nextState.flow = "LIFE_INSURANCE";
          botText = "Asigurarea de viață oferă liniște pentru viitor. Care este scopul principal?";
          botOptions = ["Protecția familiei", "Acoperirea unui credit", "Economisire", "Vreau să vorbesc cu un consultant"];
        } else if (userSelection.includes("Sănătate")) {
          nextState.flow = "HEALTH_INSURANCE";
          botText = "Sănătatea este prioritară. Cât de des accesezi serviciile medicale private?";
          botOptions = ["Rar, doar preventiv", "Ocazional", "Frecvent", "Vreau să vorbesc cu un consultant"];
        } else if (userSelection.includes("Business")) {
          nextState.flow = "BUSINESS_INSURANCE";
          botText = "Pentru a identifica riscurile companiei tale, în ce domeniu activezi?";
          botOptions = ["Comerț / Servicii", "IT / Tehnologie", "Construcții / Producție", "Altele", "Vreau să vorbesc cu un consultant"];
        } else if (userSelection.includes("Investiții")) {
          nextState.flow = "INVESTMENT";
          botText = "Investițiile imobiliare premium necesită o analiză atentă. Care este obiectivul tău?";
          botOptions = ["Randament din chirie", "Creșterea valorii", "Achiziție proprie", "Vreau să vorbesc cu un consultant"];
        } else {
          botText = "Scuză-mă, nu am înțeles. Alege un domeniu de mai jos:";
          botOptions = ["Protecție Locuință", "Asigurări Auto", "Asigurare de Viață", "Sănătate & Familie", "Asigurări Business", "Investiții Imobiliare", "Vreau să vorbesc cu un consultant"];
        }
        break;

      case "BUSINESS_INSURANCE":
        if (nextState.step === 0) {
          botText = `Am înțeles. Pentru o companie din zona ${userSelection}, cele mai importante riscuri sunt:
- daune la sediu sau spațiu comercial
- întreruperea activității
- răspunderea față de clienți
- accidente și riscuri pentru angajați
- atacuri cibernetice

Pentru a identifica protecția potrivită, câți angajați are compania?`;
          botOptions = ["1-10 angajați", "11-50 angajați", "Peste 50 angajați", "Vreau să vorbesc cu un consultant"];
        } else if (nextState.step === 1) {
          botText = "Care este cifra aproximativă de afaceri anuală?";
          botOptions = ["Sub 100.000 €", "100.000 - 1 milion €", "Peste 1 milion €", "Vreau să vorbesc cu un consultant"];
        } else if (nextState.step === 2) {
          botText = "Care este principala nevoie de protecție pentru afacerea ta?";
          botOptions = ["Protejarea bunurilor", "Protecție împotriva reclamațiilor", "Cyber Risk", "Protecția administratorilor (D&O)", "Toate cele de mai sus", "Vreau să vorbesc cu un consultant"];
        } else {
          handleConsultantRequest();
          return;
        }
        break;

      case "HEALTH_INSURANCE":
        if (nextState.step === 0) {
          botText = `Perfect. Pentru o utilizare "${userSelection}", soluția optimă este orientată spre controale periodice, acces rapid la specialiști și prevenție. Pentru cine dorești protecția?`;
          botOptions = ["Doar pentru mine", "Familie", "Angajați", "Vreau să vorbesc cu un consultant"];
        } else if (nextState.step === 1) {
          botText = "Ce nivel de acoperire preferi?";
          botOptions = ["Acoperire de bază", "Acoperire premium internațională", "Vreau să vorbesc cu un consultant"];
        } else {
          handleConsultantRequest();
          return;
        }
        break;

      case "HOME_INSURANCE":
        if (nextState.step === 0) {
          botText = "Care este valoarea estimată a proprietății?";
          botOptions = ["Sub 100.000 €", "100.000 - 300.000 €", "Peste 300.000 €", "Vreau să vorbesc cu un consultant"];
        } else if (nextState.step === 1) {
          botText = "Proprietatea este achiziționată printr-un credit ipotecar?";
          botOptions = ["Da", "Nu", "Vreau să vorbesc cu un consultant"];
        } else {
          handleConsultantRequest();
          return;
        }
        break;

      case "AUTO_INSURANCE":
        if (nextState.step === 0) {
          botText = "Pentru a calibra oferta, ce an de fabricație are vehiculul?";
          botOptions = ["2020-2024", "2015-2019", "Înainte de 2015", "Vreau să vorbesc cu un consultant"];
        } else if (nextState.step === 1) {
          botText = "Este un vehicul personal sau utilizat în scop comercial/flotă?";
          botOptions = ["Personal", "Comercial / Flotă", "Vreau să vorbesc cu un consultant"];
        } else {
          handleConsultantRequest();
          return;
        }
        break;

      case "LIFE_INSURANCE":
        if (nextState.step === 0) {
          botText = "Ai persoane în întreținere (copii, partener)?";
          botOptions = ["Da, am copii", "Da, partener", "Sunt singur", "Vreau să vorbesc cu un consultant"];
        } else if (nextState.step === 1) {
          botText = "Ce sumă aproximativă ai dori să acopere polița în caz de eveniment neprevăzut?";
          botOptions = ["Sub 50.000 €", "50.000 - 150.000 €", "Peste 150.000 €", "Nu sunt sigur", "Vreau să vorbesc cu un consultant"];
        } else {
          handleConsultantRequest();
          return;
        }
        break;

      case "INVESTMENT":
        if (nextState.step === 0) {
          botText = "Care este bugetul orientativ pe care îl ai în vedere pentru investiție?";
          botOptions = ["Sub 100.000 €", "100.000 - 250.000 €", "Peste 250.000 €", "Vreau să vorbesc cu un consultant"];
        } else if (nextState.step === 1) {
          botText = "Cât de repede dorești să realizezi această achiziție?";
          botOptions = ["În următoarele 3 luni", "În 3-6 luni", "Doar explorez", "Vreau să vorbesc cu un consultant"];
        } else {
          handleConsultantRequest();
          return;
        }
        break;

      default:
        handleConsultantRequest();
        return;
    }

    // Anti-loop protection
    if (nextState.lastBotMsg === botText) {
      nextState.loopCount += 1;
    } else {
      nextState.loopCount = 0;
    }

    if (nextState.loopCount >= 2) {
      setMessages(prev => [
        ...prev,
        { id: String(Date.now() + 1), type: "bot", text: "Se pare că avem nevoie de câteva detalii suplimentare pentru a continua. Te conectez cu un consultant." },
        { id: String(Date.now() + 2), type: "form", text: "", formType: "consultant" }
      ]);
      setChatState(prev => ({ ...prev, flow: "CONSULTANT_REQUEST" }));
      return;
    }

    nextState.lastBotMsg = botText;
    nextState.step += 1;

    setMessages(prev => [
      ...prev,
      { id: String(Date.now() + 1), type: "bot", text: botText, options: botOptions }
    ]);
    setChatState(nextState);
  };

  const handleInput = (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => {
      // Remove options from the previous bot message so they don't linger
      const updatedPrev = prev.map(m => m.type === "bot" ? { ...m, options: undefined } : m);
      return [...updatedPrev, { id: String(Date.now()), type: "user", text }];
    });
    setInput("");

    setTimeout(() => {
      advanceFlow(text);
    }, 400);
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
            className="mb-4 w-[calc(100vw-3rem)] sm:w-[400px] origin-bottom-left"
          >
            <div className="flex flex-col h-[580px] max-h-[80vh] glass border border-border/50 shadow-2xl rounded-[2.2rem] overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-[#fbfbfa]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white">
                    <UserCheck className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-slate-800">AiX Assistant</h3>
                    <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Lead Qualification Active
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
                    {msg.type === "form" ? (
                      <ConsultantForm onSubmit={submitLead} />
                    ) : msg.type === "system" ? (
                      <div className="w-full flex flex-col items-center justify-center p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-3" />
                        <p className="text-sm font-semibold text-emerald-800">{msg.text}</p>
                      </div>
                    ) : (
                      <>
                        <div
                          className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed font-medium whitespace-pre-wrap ${
                            msg.type === "user"
                              ? "bg-slate-900 text-white rounded-tr-sm shadow-md"
                              : "bg-slate-50 border border-slate-100 text-slate-700 rounded-tl-sm"
                          }`}
                        >
                          {msg.text}
                        </div>
                        {msg.options && msg.type === "bot" && (
                          <div className="flex flex-wrap gap-2 mt-3 w-full">
                            {msg.options.map((opt, i) => (
                              <button
                                key={i}
                                onClick={() => handleInput(opt)}
                                className={`px-4 py-2 rounded-full border text-[11px] font-bold shadow-sm transition-all text-left ${
                                  opt === "Vreau să vorbesc cu un consultant"
                                    ? "w-full border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                                    : "border-slate-200 text-slate-700 bg-white hover:bg-slate-50"
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-slate-100 bg-[#fbfbfa]">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleInput(input)}
                    placeholder="Scrie un mesaj..."
                    aria-label="Mesaj pentru asistentul AiX"
                    disabled={chatState.flow === "CONSULTANT_REQUEST" || chatState.flow === "SUCCESS"}
                    className="w-full bg-white border border-slate-200 rounded-full pl-4 pr-12 py-3 text-xs font-semibold focus:outline-none focus:border-slate-800 text-slate-800 placeholder:text-slate-400 shadow-sm disabled:opacity-50"
                  />
                  <button
                    onClick={() => handleInput(input)}
                    disabled={!input.trim() || chatState.flow === "CONSULTANT_REQUEST" || chatState.flow === "SUCCESS"}
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

function ConsultantForm({ onSubmit }: { onSubmit: (data: Record<string, string>) => void }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", insuranceType: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (formData.name.trim().length < 3) newErrors.name = "Numele este prea scurt.";
    if (!/^\+?[0-9\s\-]{8,15}$/.test(formData.phone)) newErrors.phone = "Număr de telefon invalid.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email invalid.";
    if (!formData.insuranceType) newErrors.insuranceType = "Alege un tip de asigurare.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Nume Complet *</label>
        <input 
          type="text" 
          value={formData.name} 
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          className={`w-full border ${errors.name ? 'border-red-400 bg-red-50' : 'border-slate-200'} rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:border-slate-800`}
        />
        {errors.name && <p className="text-[10px] text-red-500 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.name}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Telefon *</label>
          <input 
            type="tel" 
            value={formData.phone} 
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            className={`w-full border ${errors.phone ? 'border-red-400 bg-red-50' : 'border-slate-200'} rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:border-slate-800`}
          />
          {errors.phone && <p className="text-[10px] text-red-500 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.phone}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email *</label>
          <input 
            type="email" 
            value={formData.email} 
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className={`w-full border ${errors.email ? 'border-red-400 bg-red-50' : 'border-slate-200'} rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:border-slate-800`}
          />
          {errors.email && <p className="text-[10px] text-red-500 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.email}</p>}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Interes Principal *</label>
        <select 
          value={formData.insuranceType}
          onChange={e => setFormData({ ...formData, insuranceType: e.target.value })}
          className={`w-full border ${errors.insuranceType ? 'border-red-400 bg-red-50' : 'border-slate-200'} rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:border-slate-800 bg-white`}
        >
          <option value="">Alege o categorie...</option>
          <option value="Locuinta">Protecție Locuință</option>
          <option value="Auto">Asigurare Auto</option>
          <option value="Viata">Asigurare de Viață</option>
          <option value="Sanatate">Sănătate</option>
          <option value="Business">Asigurare Business</option>
          <option value="Investitii">Investiții / Imobiliare</option>
        </select>
        {errors.insuranceType && <p className="text-[10px] text-red-500 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.insuranceType}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Detalii Suplimentare (Opțional)</label>
        <textarea 
          rows={2}
          value={formData.message} 
          onChange={e => setFormData({ ...formData, message: e.target.value })}
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:border-slate-800 resize-none"
        />
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-slate-900 text-white font-bold text-xs py-3 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Se trimite..." : "Solicită Consultant"}
      </button>
    </form>
  );
}
