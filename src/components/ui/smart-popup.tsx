"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SmartPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    // Deschide popup-ul după 15 secunde de inactivitate sau imediat dacă utilizatorul face scroll mult.
    const timer = setTimeout(() => {
      if (!hasOpened) {
        setIsOpen(true);
        setHasOpened(true);
      }
    }, 10000); // 10 secunde e suficient

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight && !hasOpened) {
        setIsOpen(true);
        setHasOpened(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasOpened]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 w-[90%] max-w-[380px]"
        >
          <div className="relative glass border border-border/50 shadow-2xl p-6 rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
            
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 mt-2">
              <h3 className="text-xl font-heading font-bold mb-2">
                Protect what you built.<br/>Build what matters next.
              </h3>
              <p className="text-sm text-muted-foreground uppercase tracking-widest mt-4 font-medium">
                Cristian Văduva
              </p>
              <p className="text-xs text-muted-foreground">Insurance & Investment Advisor</p>
            </div>

            <div className="flex flex-col gap-3 relative z-10">
              <Button className="w-full justify-start gap-3 rounded-full h-12 bg-white/10 hover:bg-white/20 text-foreground border border-white/5" asChild>
                <Link href="/contact?type=oferta">
                  <MessageCircle className="w-4 h-4 text-blue-400" />
                  Cere ofertă
                </Link>
              </Button>
              <Button className="w-full justify-start gap-3 rounded-full h-12 bg-white/10 hover:bg-white/20 text-foreground border border-white/5" asChild>
                <Link href="/contact?type=consultanta">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  Programează consultanță
                </Link>
              </Button>
              <Button className="w-full justify-start gap-3 rounded-full h-12 bg-green-500/10 hover:bg-green-500/20 text-foreground border border-green-500/20" asChild>
                <Link href="https://wa.me/40700000000" target="_blank">
                  <Phone className="w-4 h-4 text-green-500" />
                  WhatsApp
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
