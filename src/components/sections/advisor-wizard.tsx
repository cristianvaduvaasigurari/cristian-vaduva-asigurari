"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, ShieldCheck, User, Home, Car, Briefcase, Plane, HeartPulse, TrendingUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const questions = [
  {
    id: "name",
    title: "Cum te numești?",
    description: "Să începem prin a ne cunoaște.",
    type: "input",
    inputType: "text",
    placeholder: "Numele tău complet",
    icon: <User className="w-8 h-8 text-blue-600 mb-4" />
  },
  {
    id: "age",
    title: "Ce vârstă ai?",
    description: "Vârsta ne ajută să calculăm primele optime de risc.",
    type: "options",
    options: ["18-25 ani", "26-35 ani", "36-45 ani", "46-55 ani", "Peste 55 ani"],
    icon: <HeartPulse className="w-8 h-8 text-rose-500 mb-4" />
  },
  {
    id: "family",
    title: "Care este statutul tău familial?",
    description: "Protecția se extinde adesea la cei dragi.",
    type: "options",
    options: ["Singur(ă)", "În cuplu", "Căsătorit(ă)"],
    icon: <User className="w-8 h-8 text-purple-500 mb-4" />
  },
  {
    id: "children",
    title: "Ai copii în întreținere?",
    description: "Produsele de economisire pentru copii sunt esențiale.",
    type: "options",
    options: ["Nu", "1 copil", "2 copii", "3+ copii"],
    icon: <ShieldCheck className="w-8 h-8 text-emerald-500 mb-4" />
  },
  {
    id: "home",
    title: "Locuința ta actuală",
    description: "Pentru a-ți proteja patrimoniul.",
    type: "options",
    options: ["Proprietar (Fără credit)", "Proprietar (Cu credit)", "Chiriaș"],
    icon: <Home className="w-8 h-8 text-amber-500 mb-4" />
  },
  {
    id: "car",
    title: "Deții un autoturism?",
    description: "Asigurările auto și de asistență rutieră.",
    type: "options",
    options: ["Da, unul", "Da, mai multe", "Nu"],
    icon: <Car className="w-8 h-8 text-slate-700 mb-4" />
  },
  {
    id: "profession",
    title: "Care este statutul tău profesional?",
    description: "Riscurile antreprenoriale diferă de cele ale angajaților.",
    type: "options",
    options: ["Angajat", "Antreprenor / Administrator", "Freelancer / PFA", "Pensionar"],
    icon: <Briefcase className="w-8 h-8 text-indigo-500 mb-4" />
  },
  {
    id: "travel",
    title: "Cât de des călătorești în străinătate?",
    description: "Pentru soluții de Travel multi-trip.",
    type: "options",
    options: ["Foarte rar", "Ocazional (1-2 ori/an)", "Frecvent (Business/Vacanțe)"],
    icon: <Plane className="w-8 h-8 text-sky-500 mb-4" />
  },
  {
    id: "investment",
    title: "Care este principalul tău obiectiv financiar?",
    description: "Pentru planificarea viitorului tău.",
    type: "options",
    options: ["Protecția veniturilor", "Economisire pentru copii", "Pensie privată", "Investiții premium / Randament"],
    icon: <TrendingUp className="w-8 h-8 text-green-600 mb-4" />
  },
  {
    id: "contact",
    title: "Unde îți trimitem analiza?",
    description: "Vei primi recomandările pe email, iar un expert te va contacta scurt.",
    type: "input-multi",
    fields: [
      { id: "email", label: "Email", type: "email", placeholder: "adresa@email.com" },
      { id: "phone", label: "Telefon", type: "tel", placeholder: "07XX XXX XXX" }
    ],
    icon: <ShieldCheck className="w-8 h-8 text-blue-600 mb-4" />
  }
];

export function AdvisorWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [recommendations, setRecommendations] = useState<Array<{title: string, desc: string, tag: string}>>([]);

  const handleOptionSelect = (option: string) => {
    setAnswers({ ...answers, [questions[step].id]: option });
    handleNext();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldId?: string) => {
    if (fieldId) {
      setAnswers({ ...answers, [fieldId]: e.target.value });
    } else {
      setAnswers({ ...answers, [questions[step].id]: e.target.value });
    }
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      analyzeData();
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const generateRecommendations = (data: Record<string, string>) => {
    const recs = [];
    
    // Logic based on answers
    if (data.home && data.home.includes("Proprietar")) {
      recs.push({
        title: "Asigurare Completă Locuință",
        desc: data.home.includes("credit") ? "Protecție obligatorie pentru credit + acoperire premium pentru bunuri interioare." : "Protecție premium pentru proprietate împotriva incendiilor și dezastrelor.",
        tag: "Patrimoniu"
      });
    }

    if (data.family === "Căsătorit(ă)" || data.children !== "Nu") {
      recs.push({
        title: "Asigurare de Viață cu Componentă de Protecție",
        desc: "Garantează stabilitatea financiară a familiei tale indiferent de imprevizibil.",
        tag: "Familie"
      });
    }

    if (data.profession === "Antreprenor / Administrator") {
      recs.push({
        title: "Asigurare Răspundere Manageri (D&O) și IMM",
        desc: "Protejează-ți compania și averea personală în fața deciziilor de management.",
        tag: "Business"
      });
    }

    if (data.investment === "Pensie privată" || data.investment === "Investiții premium / Randament") {
      recs.push({
        title: "Asigurare de Viață cu Capitalizare (AiX Wealth)",
        desc: "Creștere de capital pe termen lung cu protecție inclusă, gestionat de experți.",
        tag: "Investiții"
      });
    }

    if (data.travel === "Frecvent (Business/Vacanțe)") {
      recs.push({
        title: "Asigurare Travel Multi-Trip Anuală",
        desc: "Nu mai pierde timp înainte de fiecare plecare. Ești asigurat tot anul, oriunde.",
        tag: "Mobilitate"
      });
    }

    // Default catch-all
    if (recs.length === 0) {
      recs.push({
        title: "Pachet Sănătate Premium",
        desc: "Acces la cele mai bune clinici private din România și străinătate.",
        tag: "Sănătate"
      });
    }

    return recs;
  };

  const analyzeData = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3500));
    
    const recs = generateRecommendations(answers);
    setRecommendations(recs);
    setIsAnalyzing(false);
    setIsComplete(true);

    // Save Lead to Supabase
    try {
      const formData = new FormData();
      formData.append("name", answers.name || "Anonim");
      formData.append("email", answers.email || "");
      formData.append("phone", answers.phone || "");
      formData.append("service", "AiX Advisor Assessment");
      formData.append("message", "Generated via AI Advisor Wizard");
      formData.append("source", "AiX Advisor");
      formData.append("metadata", JSON.stringify(answers));

      const response = await fetch('/api/lead', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (!result.success) {
        console.warn('Could not save lead:', result.error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const currentQuestion = questions[step];
  const progress = ((step) / questions.length) * 100;

  if (isAnalyzing) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center text-center p-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="mb-8"
        >
          <div className="w-16 h-16 border-4 border-blue-600/30 border-t-blue-600 rounded-full" />
        </motion.div>
        <h2 className="text-2xl font-bold font-heading mb-4 text-foreground">Analizăm profilul tău...</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Motorul AiX corelează răspunsurile tale cu sute de soluții de piață pentru a genera cel mai eficient portofoliu de protecție pentru tine.
        </p>
      </div>
    );
  }

  if (isComplete) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-heading font-bold mb-4 text-foreground">Profil Finalizat</h2>
          <p className="text-xl text-muted-foreground">
            {answers.name}, iată arhitectura de protecție recomandată special pentru tine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {recommendations.map((rec, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-6 rounded-3xl border border-border flex flex-col h-full"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3 bg-blue-50 w-max px-3 py-1 rounded-full">
                {rec.tag}
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{rec.title}</h3>
              <p className="text-muted-foreground flex-grow">{rec.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="glass premium-card p-10 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/50 to-white text-center">
          <h3 className="text-2xl font-bold mb-4 text-foreground">Un expert Cristian Văduva Premium a fost notificat.</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Analiza ta a fost trimisă în siguranță. Te vom contacta în scurt timp pe numărul <strong>{answers.phone}</strong> pentru a discuta detaliile ofertării și optimizării costurilor.
          </p>
          <Button size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold" onClick={() => window.location.href = '/'}>
            Înapoi la pagina principală
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between text-sm font-medium text-muted-foreground mb-3">
          <span>Pasul {step + 1} din {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-blue-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-border shadow-sm min-h-[400px] flex flex-col relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-grow flex flex-col"
          >
            {currentQuestion.icon}
            <h2 className="text-3xl font-heading font-bold mb-3 text-foreground">{currentQuestion.title}</h2>
            <p className="text-muted-foreground mb-10 text-lg">{currentQuestion.description}</p>

            {currentQuestion.type === "options" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options?.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleOptionSelect(opt)}
                    className="p-5 rounded-2xl border-2 border-border text-left font-medium text-foreground hover:border-blue-600 hover:bg-blue-50/50 transition-all duration-200"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === "input" && (
              <div className="max-w-md w-full">
                <Input 
                  type={currentQuestion.inputType}
                  placeholder={currentQuestion.placeholder}
                  value={answers[currentQuestion.id] || ""}
                  onChange={(e) => handleInputChange(e)}
                  className="h-14 text-lg rounded-2xl border-border focus:border-blue-600"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && answers[currentQuestion.id]) handleNext();
                  }}
                />
              </div>
            )}

            {currentQuestion.type === "input-multi" && (
              <div className="max-w-md w-full space-y-4">
                {currentQuestion.fields?.map((f) => (
                  <div key={f.id}>
                    <label className="block text-sm font-medium mb-2 text-foreground">{f.label}</label>
                    <Input 
                      type={f.type}
                      placeholder={f.placeholder}
                      value={answers[f.id] || ""}
                      onChange={(e) => handleInputChange(e, f.id)}
                      className="h-14 text-lg rounded-2xl border-border focus:border-blue-600"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 pt-6 border-t border-border flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={handlePrev} 
            disabled={step === 0}
            className="text-muted-foreground hover:text-foreground rounded-full"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Înapoi
          </Button>

          {(currentQuestion.type === "input" || currentQuestion.type === "input-multi") && (
            <Button 
              onClick={handleNext} 
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8"
              disabled={
                (currentQuestion.type === "input" && !answers[currentQuestion.id]) ||
                (currentQuestion.type === "input-multi" && currentQuestion.fields?.some(f => !answers[f.id]))
              }
            >
              Următorul Pas
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
