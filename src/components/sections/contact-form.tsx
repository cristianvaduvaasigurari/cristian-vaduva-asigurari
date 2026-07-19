"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trackConversion } from "@/lib/analytics";

import { Loader2, CheckCircle2, AlertCircle, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ContactForm({ customTitle, target, brokerName }: { customTitle?: string; target?: string; brokerName?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [selectedService, setSelectedService] = useState("");

  useEffect(() => {
    const detectService = () => {
      if (target) {
        setSelectedService(target);
      } else if (typeof window !== "undefined") {
        const path = window.location.pathname;
        if (path.includes("/servicii")) {
          setSelectedService("Generali Asigurări");
        } else if (path.includes("/credite")) {
          setSelectedService("Credite");
        } else if (path.includes("/home-find") || path.includes("/real-estate")) {
          setSelectedService("Real Estate");
        } else if (path.includes("/aix") || path.includes("/luxury")) {
          setSelectedService("AiX OS");
        }
      }
    };

    const timer = setTimeout(detectService, 0);
    return () => clearTimeout(timer);
  }, [target]);

  // Handle unused warning for brokerName safely
  useEffect(() => {
    void brokerName;
  }, [brokerName]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch('/api/lead', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Eroare la salvare");
      }
      
      setStatus("success");
      trackConversion(target ? `lead_form_submit_${target}` : "contact_form_submit");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error submitting lead:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-muted/30">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            {customTitle !== " " && (
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-heading font-bold mb-6"
              >
                {customTitle || "Contactează-ne"}
              </motion.h2>
            )}
            <p className="text-lg text-muted-foreground">
              Completează datele de mai jos și Cristian Văduva te va contacta în cel mai scurt timp pentru a-ți oferi soluții personalizate.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 rounded-[2.5rem] relative"
          >
            {status === "success" && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md rounded-[2.5rem]">
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Solicitare Transmisă cu Succes!</h3>
                <p className="text-muted-foreground text-center max-w-md px-6 leading-relaxed">
                  Datele tale au fost trimise securizat. Cristian Văduva te va contacta telefonic sau prin email în cel mai scurt timp.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-8 rounded-full"
                  onClick={() => setStatus("idle")}
                >
                  Trimite altă solicitare
                </Button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-100 dark:border-zinc-800">
                <Button type="button" variant="outline" size="sm" className="rounded-full gap-1 text-[11px] h-8" asChild>
                  <Link href="/"><Home className="w-3.5 h-3.5" /> Home</Link>
                </Button>
                <Button type="button" variant="outline" size="sm" className="rounded-full gap-1 text-[11px] h-8" onClick={() => window.history.back()}>
                  <ArrowLeft className="w-3.5 h-3.5" /> Înapoi
                </Button>
                <Button type="button" variant="ghost" size="sm" className="rounded-full text-muted-foreground text-[11px] h-8" asChild>
                  <Link href="/">Renunță</Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium ml-1">Nume Complet *</label>
                  <Input id="name" name="name" required placeholder="Ion Popescu" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium ml-1">Telefon *</label>
                  <Input id="phone" name="phone" required type="tel" placeholder="07xx xxx xxx" className="rounded-xl" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium ml-1">Email *</label>
                  <Input id="email" name="email" required type="email" placeholder="ion@exemplu.ro" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="service_type" className="text-sm font-medium ml-1">Interesat de *</label>
                  <div className="relative">
                    <select 
                      id="service_type" 
                      name="service" 
                      required
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="flex h-12 w-full rounded-xl border border-border bg-background px-4 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary appearance-none pr-10"
                    >
                      <option value="" disabled className="text-foreground bg-background">Alege un serviciu</option>
                      <option value="Credite" className="text-foreground bg-background">Credite</option>
                      <option value="Generali Asigurări" className="text-foreground bg-background">Asigurări (Generali)</option>
                      <option value="Real Estate" className="text-foreground bg-background">Real Estate</option>
                      <option value="AiX OS" className="text-foreground bg-background">Ecosistem AiX OS</option>
                      <option value="Altele" className="text-foreground bg-background">Altele</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium ml-1">Mesaj (Opțional)</label>
                <Textarea id="message" name="message" placeholder="Spune-ne mai multe despre nevoile tale pentru a te ajuta mai eficient..." className="rounded-xl min-h-[100px]" />
              </div>

              {status === "error" && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">A apărut o eroare la trimiterea formularului. Te rugăm să încerci din nou.</p>
                </div>
              )}

              <Button type="submit" size="lg" className="w-full text-lg h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-transform hover:-translate-y-0.5" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Se trimite...
                  </>
                ) : (
                  "Solicită Consultanță Acum"
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
