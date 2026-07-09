"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, CheckCircle2, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { submitLead } from "@/lib/actions";

const resources = [
  { id: "guide-home", title: "Ghid Complet: Asigurarea Locuinței", desc: "Află cum să nu fii păcălit de polițele băncilor și cum să acoperi valoarea reală de reconstrucție.", type: "PDF Guide", color: "bg-amber-50 text-amber-700" },
  { id: "guide-life", title: "Ghid Complet: Asigurarea de Viață", desc: "Cum să calculezi suma corectă pentru a-ți asigura familia în caz de tragedie, pas cu pas.", type: "PDF Guide", color: "bg-blue-50 text-blue-700" },
  { id: "guide-health", title: "Ghid Complet: Sănătate Privată", desc: "Diferența dintre abonament medical și asigurare de sănătate cu acoperire pentru boli grave.", type: "PDF Guide", color: "bg-rose-50 text-rose-700" },
  { id: "guide-business", title: "Ghid Complet: Asigurări Business", desc: "Top 5 riscuri pe care IMM-urile românești le ignoră și cum să le transferi inteligent.", type: "PDF Guide", color: "bg-indigo-50 text-indigo-700" },
  { id: "guide-investments", title: "Investiții Inteligente & AiX OS", desc: "Cum funcționează unit-linked și de ce capitalizarea pe termen lung bate inflația garantat.", type: "PDF Guide", color: "bg-emerald-50 text-emerald-700" },
  { id: "check-property", title: "Checklist: Cumpărarea unei Proprietăți", desc: "30 de aspecte ascunse (juridice, tehnice, financiare) pe care trebuie să le verifici înainte de a da avansul.", type: "Checklist", color: "bg-slate-100 text-slate-700" },
  { id: "check-insurance", title: "Checklist: Revizuirea Polițelor", desc: "Formular de auto-audit. Verifică în 5 minute dacă polițele pe care le ai deja își mai fac treaba.", type: "Checklist", color: "bg-slate-100 text-slate-700" },
  { id: "guide-family", title: "Ghidul Protecției Familiei", desc: "Un sumar de 10 pagini cu toate măsurile financiare pe care trebuie să le iei când devii părinte.", type: "PDF Guide", color: "bg-purple-50 text-purple-700" },
];

export function ResourcesList() {
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloaded, setDownloaded] = useState<Record<string, boolean>>({});

  const handleDownloadRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !selectedResource) return;

    setIsSubmitting(true);
    const res = resources.find(r => r.id === selectedResource);

    // Save Lead to Supabase for the Lead Magnet
    const formData = new FormData();
    formData.append("name", "Descărcare Resursă");
    formData.append("email", email);
    formData.append("service", `Descărcare: ${res?.title}`);
    formData.append("source", "Premium Resources Page");
    
    await submitLead(formData);
    
    // Simulate generation / sending
    await new Promise(r => setTimeout(r, 1000));
    
    setDownloaded({ ...downloaded, [selectedResource]: true });
    setIsSubmitting(false);
    setTimeout(() => {
      setSelectedResource(null);
      setEmail("");
    }, 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((res, idx) => (
          <motion.div
            key={res.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass rounded-3xl p-8 border border-border flex flex-col justify-between h-[320px] group hover:border-foreground/20 hover:shadow-xl transition-all"
          >
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${res.color}`}>
                <FileText className="w-3.5 h-3.5" />
                {res.type}
              </div>
              <h3 className="text-xl font-bold font-heading mb-3 text-foreground line-clamp-2">{res.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{res.desc}</p>
            </div>

            {downloaded[res.id] ? (
              <div className="flex items-center gap-2 text-emerald-600 font-bold bg-emerald-50 px-4 py-3 rounded-2xl w-full justify-center">
                <CheckCircle2 className="w-5 h-5" /> Trimis pe email!
              </div>
            ) : (
              <Button 
                onClick={() => setSelectedResource(res.id)}
                variant="outline" 
                className="w-full rounded-2xl h-12 border-2 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-all gap-2 font-bold"
              >
                Descarcă PDF <Download className="w-4 h-4" />
              </Button>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedResource && !downloaded[selectedResource] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass p-10 rounded-[3rem] border border-border shadow-2xl max-w-md w-full text-center relative bg-white"
            >
              <button 
                onClick={() => setSelectedResource(null)}
                className="absolute top-6 right-6 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
              
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                <Lock className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-bold font-heading mb-2">Acces Material Premium</h3>
              <p className="text-sm text-muted-foreground mb-8">
                Introdu adresa de email pentru a primi instant <strong>{resources.find(r => r.id === selectedResource)?.title}</strong> în format PDF.
              </p>

              <form onSubmit={handleDownloadRequest} className="flex flex-col gap-4">
                <Input 
                  type="email" 
                  placeholder="adresa@email.com" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 text-center rounded-2xl border-2 focus-visible:ring-0 focus:border-foreground"
                />
                <Button type="submit" disabled={isSubmitting} className="h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold w-full">
                  {isSubmitting ? "Se generează PDF-ul..." : "Deblochează Resursa"} <Download className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-widest">Conexiune securizată AiX</p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
