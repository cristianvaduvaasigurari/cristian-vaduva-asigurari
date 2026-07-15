"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send } from "lucide-react";

type Message = {
  id: string;
  type: "bot" | "user";
  text: string;
  options?: string[];
};

type ConversationContext = {
  lastTopic?: string;
  userName?: string;
  hasCar?: boolean;
  isProprietar?: boolean;
  hasChildren?: boolean;
  conversationHistory: Array<{ role: 'user' | 'bot'; content: string }>;
  userIntent?: string;
  mentionedProducts?: string[];
  sentiment?: 'positive' | 'neutral' | 'negative';
  urgency?: 'low' | 'medium' | 'high';
  followUpQuestions?: string[];
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    type: "bot",
    text: "Salutare! Sunt AiX Assistant, consultantul tău digital. Te pot ajuta să identifici riscurile financiare, să configurezi polițele optime Generali sau să explorezi oportunitățile imobiliare premium. Despre ce dorești să discutăm?",
    options: ["Protecție Locuință", "Asigurări Auto", "Asigurare de Viață", "Sănătate & Familie", "Investiții Imobiliare"],
  },
];

export function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [context, setContext] = useState<ConversationContext>({
    conversationHistory: [],
    sentiment: 'neutral',
    urgency: 'low'
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const detectIntent = (text: string): { intent: string; confidence: number; products: string[] } => {
    const lowerText = text.toLowerCase();
    const keywords = {
      auto: ['auto', 'rca', 'casco', 'masina', 'mașină', 'vehicul', 'flotă', 'flota', 'accident', 'daună'],
      home: ['locuin', 'casa', 'casă', 'apartament', 'inundație', 'incendiu', 'proprietate', 'imobil', 'pad'],
      life: ['viață', 'viaţa', 'familie', 'moștenire', 'deces', 'invaliditate', 'copii', 'soț', 'soție'],
      health: ['sănătate', 'spital', 'clinică', 'medic', 'tratament', 'analize', 'operație'],
      business: ['afacere', 'firmă', 'companie', 'antreprenor', 'pfa', 'im', 'angajat', 'cyber'],
      investment: ['investiție', 'pensie', 'economisire', 'randament', 'fond', 'bursă', 'imobiliar'],
      urgent: ['urgent', 'acum', 'imediat', 'rapid', 'de urgență', 'problema', 'accident']
    };

    let maxConfidence = 0;
    let detectedIntent = 'general';
    const detectedProducts: string[] = [];

    for (const [intent, words] of Object.entries(keywords)) {
      const matches = words.filter(word => lowerText.includes(word)).length;
      const confidence = matches / words.length;
      if (confidence > maxConfidence) {
        maxConfidence = confidence;
        detectedIntent = intent;
      }
      if (matches > 0) {
        detectedProducts.push(...words.filter(word => lowerText.includes(word)));
      }
    }

    return { intent: detectedIntent, confidence: maxConfidence, products: [...new Set(detectedProducts)] };
  };

  const analyzeSentiment = (text: string): 'positive' | 'neutral' | 'negative' => {
    const positiveWords = ['mulțumesc', 'bun', 'excelent', 'perfect', 'ajutor', 'vreau', 'doresc', 'interesat'];
    const negativeWords = ['problema', 'urgent', 'accident', 'daună', 'nemulțumit', 'rău', 'greșit'];
    
    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;

    if (negativeCount > positiveCount) return 'negative';
    if (positiveCount > negativeCount) return 'positive';
    return 'neutral';
  };

  const generateContextualResponse = (text: string, intent: { intent: string; confidence: number; products: string[] }, sentiment: 'positive' | 'neutral' | 'negative'): { response: string; options?: string[] } => {
    const { intent: detectedIntent, products } = intent;
    const userName = context.userName || 'prietene';

    // Urgent situations get priority
    if (detectedIntent === 'urgent' || sentiment === 'negative') {
      return {
        response: `Înțeleg că situația este urgentă. Pentru asistență imediată, te rog să suni la numărul de urgență Generali: 021 9468. Pentru daune auto, apelează 021 9330. Dacă dorești să deschizi o dosar de daună online, pot să te ghidez pas cu pas.`,
        options: ['Vreau să deschid un dosar de daună', 'Aveam o întrebare generală', 'Contactez telefonic']
      };
    }

    // Auto insurance
    if (detectedIntent === 'auto') {
      const hasFleet = products.some(p => ['flotă', 'flota'].includes(p));
      if (hasFleet) {
        return {
          response: `Pentru flote auto, Generali oferă soluții personalizate cu reduceri volum și administrare centralizată. Câte vehicule are flota ta? Această informație îmi va permite să îți ofer o estimare mai precisă.`,
          options: ['1-5 vehicule', '6-20 vehicule', 'Peste 20 vehicule']
        };
      }
      return {
        response: `Pentru protecția autoturismului tău, recomand pachetul complet RCA + CASCO. RCA este obligatoriu și cu decontare directă nu depinzi de asigurătorul vinovatului. CASCO acoperă vandalismul, daunele proprii și fenomenele naturale. Ce vârstă are mașina ta?`,
        options: ['Sub 5 ani', '5-10 ani', 'Peste 10 ani']
      };
    }

    // Home insurance
    if (detectedIntent === 'home') {
      return {
        response: `Pentru locuința ta, polița facultativă Generali acoperă mult mai mult decât PAD-ul obligatoriu: finisajele de lux, electronicele, instalațiile și răspunderea civilă față de vecini. Ești proprietar sau chiriaș?`,
        options: ['Sunt proprietar', 'Sunt chiriaș', 'Am credit ipotecar']
      };
    }

    // Life insurance
    if (detectedIntent === 'life') {
      return {
        response: `Asigurarea de viață este fundamentul protecției financiare a familiei. În caz de deces sau invaliditate, suma asigurată poate stinge creditele și poate asigura continuarea stilului de viață pentru cei dragi. Ai persoane în întreținere (copii, partener)?`,
        options: ['Da, am copii', 'Da, am partener', 'Nu, sunt singur']
      };
    }

    // Health insurance
    if (detectedIntent === 'health') {
      return {
        response: `Asigurarea de sănătate privată Generali îți oferă acces direct la rețeaua premium de clinici și spitale, fără liste de așteptare. Include spitalizare, intervenții chirurgicale, și a doua opinie medicală internațională. Cât de des accesezi servicii medicale?`,
        options: ['Rar, doar preventiv', 'Ocazional', 'Frecvent, am afecțiuni cronice']
      };
    }

    // Business insurance
    if (detectedIntent === 'business') {
      return {
        response: `Pentru afacerea ta, Generali oferă protecție completă: bunuri, răspundere civilă, cyber risk și răspunderea managerilor (D&O). Un atac cibernetic poate bloca activitatea zile întregi. Ce tip de afacere administrezi?`,
        options: ['Comerț / Servicii', 'Producție', 'IT / Tehnologie', 'Altele']
      };
    }

    // Investment
    if (detectedIntent === 'investment') {
      return {
        response: `Pentru investiții și economisire, Generali oferă polițe cu componentă de capitalizare și acces la fonduri internaționale. Acestea combină protecția cu randamentul și au avantaje fiscale unice. Care este orizontul tău de investiție preferat?`,
        options: ['Scurt termen (1-3 ani)', 'Mediu termen (3-7 ani)', 'Lung termen (7+ ani)']
      };
    }

    // Greeting
    if (text.toLowerCase().includes('salut') || text.toLowerCase().includes('bună') || text.toLowerCase().includes('bună')) {
      return {
        response: `Salutare, ${userName}! Sunt aici să te ajut cu orice întrebare despre asigurări, protecție financiară sau oportunități imobiliare. Cu ce pot să te asist astăzi?`,
        options: ['Protecție Locuință', 'Asigurări Auto', 'Asigurare de Viață', 'Sănătate', 'Investiții']
      };
    }

    // Default response with context awareness
    if (context.lastTopic) {
      return {
        response: `Continuăm discuția despre ${context.lastTopic}. ${context.followUpQuestions && context.followUpQuestions.length > 0 ? context.followUpQuestions[0] : 'Ai alte întrebări legate de acest subiect sau dorești să explorăm alte domenii de protecție?'}`,
        options: ['Continuă pe acest subiect', 'Schimbă subiectul', 'Vreau să vorbesc cu un consultant']
      };
    }

    return {
      response: `Înțeleg. Pentru a-ți oferi cea mai bună recomandare, pot să te ghidez prin câteva întrebări rapide sau poți alege direct domeniul de interes. Ce preferi?`,
      options: ['Ghidare rapidă', 'Protecție Locuință', 'Asigurări Auto', 'Asigurare de Viață', 'Sănătate', 'Contact consultant']
    };
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message to conversation history
    const userMsg: Message = { id: String(messages.length + 1), type: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Analyze intent and sentiment
    const intent = detectIntent(text);
    const sentiment = analyzeSentiment(text);
    const userHistoryEntry = { role: 'user' as const, content: text };
    const updatedHistory = [...context.conversationHistory, userHistoryEntry];
    const extractedName =
      text.toLowerCase().includes("mă numesc") ||
      text.toLowerCase().includes("ma numesc") ||
      text.toLowerCase().startsWith("sunt ")
        ? text.trim().split(/\s+/).at(-1)
        : undefined;

    // Update context with new information
    setContext(prev => ({
      ...prev,
      conversationHistory: [...prev.conversationHistory, userHistoryEntry],
      userIntent: intent.intent,
      mentionedProducts: [...new Set([...(prev.mentionedProducts || []), ...intent.products])],
      userName: extractedName && extractedName.length > 2 ? extractedName : prev.userName,
      sentiment,
      urgency: sentiment === 'negative' ? 'high' : prev.urgency
    }));

    // Process intelligence and answer contextually
    setTimeout(() => {
      const { response: botResponse, options } = generateContextualResponse(text, intent, sentiment);
      
      // Update topic based on intent
      const newTopic = intent.intent !== 'general' ? intent.intent : context.lastTopic;
      
      setContext(prev => ({
        ...prev,
        lastTopic: newTopic,
        conversationHistory: [
          ...updatedHistory,
          { role: 'bot', content: botResponse }
        ],
        followUpQuestions: options
      }));

      const botMsg: Message = { 
        id: String(messages.length + 2), 
        type: "bot", 
        text: botResponse,
        options 
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 350);
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
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-[#fbfbfa]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-slate-800">AiX Assistant OS</h3>
                    <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Ecosistem Active Context
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

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-white">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.type === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed font-medium ${
                        msg.type === "user"
                          ? "bg-slate-900 text-white rounded-tr-sm shadow-md"
                          : "bg-slate-50 border border-slate-100 text-slate-700 rounded-tl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.options && msg.type === "bot" && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {msg.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleSend(opt)}
                            className="px-3 py-1.5 rounded-full border border-slate-200 text-slate-800 bg-white hover:bg-slate-50 text-[10px] font-bold shadow-sm transition-all"
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
              <div className="p-4 border-t border-slate-100 bg-[#fbfbfa]">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                    placeholder="Cum te pot asista astazi?..."
                    aria-label="Mesaj pentru asistentul AiX"
                    className="w-full bg-white border border-slate-200 rounded-full pl-4 pr-12 py-3 text-xs font-semibold focus:outline-none focus:border-slate-800 text-slate-800 placeholder:text-slate-400 shadow-sm"
                  />
                  <button
                    onClick={() => handleSend(input)}
                    disabled={!input.trim()}
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
