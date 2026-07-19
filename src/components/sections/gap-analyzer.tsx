"use client";

import * as React from "react"; import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, Shield, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const gapsQuestions = [
  {
    id: "health",
    question: "Dacă tu sau copilul tău ați avea nevoie de o operație în străinătate de 50.000 EUR mâine, ai acești bani disponibili imediat?",
    options: [
      { text: "Da, am asigurare de sănătate cu acoperire internațională.", score: "protected" },
      { text: "Nu, m-aș baza pe sistemul de stat / economii.", score: "missing" },
      { text: "Am un abonament la o clinică, dar nu acoperă operații mari.", score: "partial" }
    ]
  },
  {
    id: "life",
    question: "Dacă principalul aducător de venit din familie dispare, timp de câți ani și-ar putea menține familia același nivel de trai?",
    options: [
      { text: "Peste 5 ani (Am o asigurare de viață consistentă).", score: "protected" },
      { text: "1-2 ani (Din economii).", score: "partial" },
      { text: "Sub 1 an (Avem rate mari și ne-ar fi foarte greu).", score: "missing" }
    ]
  },
  {
    id: "home",
    question: "În caz de cutremur major sau incendiu care distruge locuința complet, cum o reconstruiești?",
    options: [
      { text: "Sunt acoperit la valoarea reală de reconstrucție prin asigurare facultativă.", score: "protected" },
      { text: "Am doar PAD-ul obligatoriu (maxim 20.000 EUR).", score: "missing" },
      { text: "Am asigurare de la bancă, dar cred că acoperă doar creditul rămas.", score: "partial" }
    ]
  },
  {
    id: "liability",
    question: "Dacă produci o daună accidentală majoră (ex: inunzi un bloc întreg sau lovești din greșeală pe cineva la schi), cine plătește despăgubirile?",
    options: [
      { text: "Eu personal (Nu am o astfel de asigurare).", score: "missing" },
      { text: "Am o asigurare de răspundere civilă personală.", score: "protected" },
      { text: "Nu știu, nu m-am gândit.", score: "missing" }
    ]
  }
];

export function GapAnalyzer() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (score: string) => {
    const currentQ = gapsQuestions[step];
    const newAnswers = { ...answers, [currentQ.id]: score };
    setAnswers(newAnswers);

    if (step < gapsQuestions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const getResultDetails = (id: string, score: string) => {
    switch (id) {
      case "health":
        if (score === "protected") return { status: "Protected", text: "Ești asigurat medical la standarde internaționale.", color: "text-emerald-600", bg: "bg-emerald-50", icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" /> };
        if (score === "partial") return { status: "Partially Protected", text: "Abonamentele private acoperă doar prevenția. Ești vulnerabil la boli grave.", color: "text-amber-600", bg: "bg-amber-50", icon: <AlertTriangle className="w-6 h-6 text-amber-600" /> };
        return { status: "Missing Protection", text: "Costurile medicale majore îți pot epuiza economiile. O asigurare privată este urgentă.", color: "text-rose-600", bg: "bg-rose-50", icon: <XCircle className="w-6 h-6 text-rose-600" />, link: "/servicii/health-insurance" };
      
      case "life":
        if (score === "protected") return { status: "Protected", text: "Familia ta are un buffer financiar excelent.", color: "text-emerald-600", bg: "bg-emerald-50", icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" /> };
        if (score === "partial") return { status: "Partially Protected", text: "Economiile nu sunt suficiente pentru evenimente fatale. O poliță de viață cu capitalizare te-ar ajuta.", color: "text-amber-600", bg: "bg-amber-50", icon: <AlertTriangle className="w-6 h-6 text-amber-600" />, link: "/servicii/life-insurance-capitalizare" };
        return { status: "Missing Protection", text: "Familia este extrem de vulnerabilă în fața imprevizibilului.", color: "text-rose-600", bg: "bg-rose-50", icon: <XCircle className="w-6 h-6 text-rose-600" />, link: "/servicii/life-insurance" };

      case "home":
        if (score === "protected") return { status: "Protected", text: "Patrimoniul imobiliar e în siguranță totală.", color: "text-emerald-600", bg: "bg-emerald-50", icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" /> };
        if (score === "partial") return { status: "Partially Protected", text: "Asigurarea băncii protejează banca, nu pe tine. Trebuie să completezi acoperirea.", color: "text-amber-600", bg: "bg-amber-50", icon: <AlertTriangle className="w-6 h-6 text-amber-600" />, link: "/servicii/home-insurance" };
        return { status: "Missing Protection", text: "Riscul de a pierde tot ce ai muncit fără posibilitate de recuperare este uriaș.", color: "text-rose-600", bg: "bg-rose-50", icon: <XCircle className="w-6 h-6 text-rose-600" />, link: "/servicii/home-insurance" };

      case "liability":
        if (score === "protected") return { status: "Protected", text: "Nu poți fi ruinat de un simplu accident stupid.", color: "text-emerald-600", bg: "bg-emerald-50", icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" /> };
        return { status: "Missing Protection", text: "Răspunderea civilă personală este ignorată, deși o daună cerută în instanță te poate falimenta.", color: "text-rose-600", bg: "bg-rose-50", icon: <XCircle className="w-6 h-6 text-rose-600" /> };
        
      default: return null;
    }
  };

  if (showResults) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-12">
          <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-foreground">Harta Vulnerabilităților Tale</h2>
          <p className="text-lg text-muted-foreground">Iată o analiză sinceră a riscurilor la care ești expus în prezent.</p>
        </div>

        <div className="space-y-6">
          {Object.entries(answers).map(([key, score]) => {
            const details = getResultDetails(key, score);
            if (!details) return null;

            return (
              <div key={key} className={`p-6 rounded-3xl border border-border flex flex-col md:flex-row gap-6 items-start ${details.bg}`}>
                <div className="flex-shrink-0 mt-1">{details.icon}</div>
                <div className="flex-grow">
                  <h3 className={`font-bold text-lg mb-2 ${details.color}`}>{details.status}</h3>
                  <p className="text-foreground/80 font-medium mb-1">
                    {key === "health" && "Sănătate și Operații majore"}
                    {key === "life" && "Protecția Veniturilor Familiei"}
                    {key === "home" && "Patrimoniul Imobiliar"}
                    {key === "liability" && "Răspundere față de Terți"}
                  </p>
                  <p className="text-muted-foreground text-sm">{details.text}</p>
                </div>
                {details.link && (
                  <Button variant="outline" asChild className="rounded-full bg-white hover:bg-gray-50 flex-shrink-0 whitespace-nowrap">
                    <Link href={details.link}>
                      Acoperă Riscul <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center p-8 glass premium-card rounded-[2.5rem]">
          <h3 className="text-2xl font-bold mb-4">Ai zone vulnerabile?</h3>
          <p className="text-muted-foreground mb-6">Programează o sesiune de audit cu Cristian Văduva pentru a elimina exact aceste goluri, fără a cumpăra asigurări inutile.</p>
          <Button size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
            <Link href="/contact">Programează Audit 1:1</Link>
          </Button>
        </div>
      </motion.div>
    );
  }

  const currentQ = gapsQuestions[step];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8 flex justify-center gap-2">
        {gapsQuestions.map((_, i) => (
          <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === step ? "w-12 bg-blue-600" : i < step ? "w-4 bg-blue-400" : "w-4 bg-gray-200"}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="glass p-8 md:p-12 rounded-[2.5rem] border border-border text-center shadow-lg"
        >
          <span className="text-blue-600 font-bold tracking-wider uppercase text-xs mb-4 block">Întrebarea {step + 1}</span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-10 leading-relaxed">
            {currentQ.question}
          </h2>

          <div className="flex flex-col gap-4 text-left">
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(opt.score)}
                className="group p-5 rounded-2xl border-2 border-border text-foreground font-medium hover:border-blue-600 hover:bg-blue-50/50 transition-all flex items-center justify-between"
              >
                <span>{opt.text}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-blue-600 transition-colors" />
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
