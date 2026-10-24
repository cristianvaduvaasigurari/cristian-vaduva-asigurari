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
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [privacyError, setPrivacyError] = useState("");
  const [serverError, setServerError] = useState("");

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
    setPrivacyError("");
    setServerError("");

    if (!agreePrivacy) {
      setPrivacyError("Este necesar să confirmați acordul privind Politica de Confidențialitate pentru a trimite solicitarea.");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    try {
      const formEl = e.currentTarget;
      const formData = new FormData(formEl);
      formData.set("agreePrivacy", "true");

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
      formEl.reset();
      setAgreePrivacy(false);
    } catch (error: unknown) {
      console.error("Error submitting lead:", error);
      setStatus("error");
      setServerError(error instanceof Error ? error.message : "A apărut o eroare la trimiterea formularului.");
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
                {customTitle || "Solicită o analiză confidențială a riscurilor"}
              </motion.h2>
            )}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Nu promitem soluții universale. Analizăm ce deții, identificăm eventualele lacune din contractele existente și îți explicăm transparent opțiunile înainte să apară o daună.
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
                  Datele tale au fost trimise în regim de strictă confidențialitate. Cristian Văduva te va contacta personal pentru a stabili detaliile analizei.
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

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
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
                  <label htmlFor="service_type" className="text-sm font-medium ml-1">Domeniu de Interes *</label>
                  <div className="relative">
                    <select 
                      id="service_type" 
                      name="service" 
                      required
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="flex h-12 w-full rounded-xl border border-border bg-background px-4 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary appearance-none pr-10"
                    >
                      <option value="" disabled className="text-foreground bg-background">Alege domeniul de interes</option>
                      <option value="Nu stiu inca / Verificare lacune" className="text-foreground bg-background">Nu știu încă — Vreau o verificare generală a riscurilor</option>
                      <option value="Locuinte & Proprietati Premium" className="text-foreground bg-background">Locuință &amp; Patrimoniu (reconstrucție, daune mari)</option>
                      <option value="Automobile de Valoare & Colectie" className="text-foreground bg-background">Automobile de lux &amp; colecție (daune totale, evaluare)</option>
                      <option value="Ceasuri, Bijuterii & Colectii" className="text-foreground bg-background">Ceasuri, bijuterii &amp; artă (furt, sub-limite)</option>
                      <option value="Cyber & Securitate Digitala" className="text-foreground bg-background">Cyber &amp; Securitate digitală (fraude, ransomware)</option>
                      <option value="Afaceri & Continuitate Operationala" className="text-foreground bg-background">Afaceri &amp; Continuitate (întrerupere activitate)</option>
                      <option value="Raspundere Civila & D&O" className="text-foreground bg-background">Răspundere civilă &amp; management (litigii)</option>
                      <option value="Patrimoniu International" className="text-foreground bg-background">Patrimoniu internațional &amp; proprietăți externe</option>
                      <option value="Generali Asigurari" className="text-foreground bg-background">Asigurări Generale (Generali)</option>
                      <option value="Altele" className="text-foreground bg-background">Altă solicitare</option>
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

              {/* Anti-spam Honeypot (hidden from human users) */}
              <input
                type="text"
                name="website_hp"
                tabIndex={-1}
                autoComplete="off"
                className="hidden pointer-events-none opacity-0 absolute -z-50"
                aria-hidden="true"
              />

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreePrivacy"
                    name="agreePrivacy"
                    checked={agreePrivacy}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setAgreePrivacy(isChecked);
                      if (isChecked) {
                        setPrivacyError("");
                      }
                    }}
                    className="mt-1 h-4 w-4 rounded border-border text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer shrink-0"
                  />
                  <label htmlFor="agreePrivacy" className="text-xs text-muted-foreground leading-relaxed cursor-pointer select-none">
                    <span className="text-red-500 font-bold">*</span> Confirm că am citit și sunt de acord cu{" "}
                    <Link
                      href="/legal/privacy-policy"
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      className="text-blue-500 hover:underline"
                    >
                      Politica de Confidențialitate
                    </Link>{" "}
                    și consimt la prelucrarea datelor mele de contact strict în scopul soluționării acestei solicitări.
                  </label>
                </div>

                {privacyError && (
                  <div role="alert" aria-live="assertive" className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2.5 text-red-500 text-xs font-medium">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{privacyError}</span>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreeMarketing"
                    name="agreeMarketing"
                    className="mt-1 h-4 w-4 rounded border-border text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer shrink-0"
                  />
                  <label htmlFor="agreeMarketing" className="text-xs text-muted-foreground leading-relaxed cursor-pointer select-none">
                    (Opțional) Sunt de acord să primesc periodic informări profesionale și analize privind piața asigurărilor.
                  </label>
                </div>
              </div>

              {status === "error" && (
                <div role="alert" aria-live="assertive" className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">{serverError || "A apărut o eroare la trimiterea formularului. Te rugăm să verifici datele și să reîncerci."}</p>
                </div>
              )}

              <Button type="submit" size="lg" className="w-full text-base sm:text-lg h-14 bg-zinc-900 hover:bg-black text-white rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 font-semibold" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Se trimite solicitarea...
                  </>
                ) : (
                  "Solicită o Analiză Confidențială"
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground pt-2">
                Ai întrebări sau nu ești sigur de acoperirile existente? Răspundem prompt, fără nicio obligație contractuală.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
