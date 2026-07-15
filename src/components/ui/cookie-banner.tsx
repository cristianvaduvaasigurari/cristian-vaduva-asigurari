"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Delay for a smoother experience
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setIsVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="glass p-6 rounded-2xl border border-white/10 shadow-2xl relative pointer-events-auto flex flex-col md:flex-row items-center gap-6">
              
              <button 
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors md:hidden"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex-1">
                <h3 className="font-heading font-bold text-lg mb-2">Respectăm confidențialitatea ta</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Folosim cookie-uri pentru a-ți asigura o experiență beneficiu pe platformă, pentru analiza traficului și personalizarea conținutului. 
                  Prin apăsarea butonului &quot;Accept&quot;, ești de acord cu utilizarea acestora conform <Link href="/politica-cookie" className="text-white underline decoration-white/30 hover:decoration-white transition-all">Politicii noastre de Cookie-uri</Link>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <Button 
                  variant="outline" 
                  onClick={rejectCookies}
                  className="rounded-full bg-transparent border-white/10 hover:bg-white/5 hover:text-white"
                >
                  Setări / Refuză
                </Button>
                <Button 
                  onClick={acceptCookies}
                  className="rounded-full bg-white text-black hover:bg-white/90 font-medium px-8"
                >
                  Accept Toate
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
