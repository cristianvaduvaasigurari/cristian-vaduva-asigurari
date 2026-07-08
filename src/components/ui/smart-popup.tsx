"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Calendar, Phone, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SmartPopup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-4 w-[calc(100vw-3rem)] sm:w-[380px] origin-bottom-right"
          >
            <div className="relative glass border border-border/50 shadow-2xl p-6 rounded-[2rem] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
              
              <div className="flex items-start justify-between mb-6 mt-2 relative z-10">
                <div>
                  <h3 className="text-xl font-heading font-bold mb-1">
                    Contact Rapid
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Suntem online pentru a te ajuta.
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
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
                  <Link href="https://wa.me/40767110439" target="_blank">
                    <Phone className="w-4 h-4 text-green-500" />
                    WhatsApp
                  </Link>
                </Button>
                <Button className="w-full justify-start gap-3 rounded-full h-12 bg-blue-500/10 hover:bg-blue-500/20 text-foreground border border-blue-500/20" asChild>
                  <a href="tel:+436509536345">
                    <Phone className="w-4 h-4 text-blue-500" />
                    Sună (+43 650 953 6345)
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-16 w-16 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-105"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-8 h-8" />}
      </button>
    </div>
  );
}
