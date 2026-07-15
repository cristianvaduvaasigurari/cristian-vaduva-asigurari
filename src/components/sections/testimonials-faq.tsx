"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alexandru Popescu",
    role: "CEO, TechFlow",
    text: "Cristian ne-a ajutat să ne asigurăm portofoliul companiei într-un mod eficient. Soluțiile sale pentru IMM-uri sunt excepționale.",
  },
  {
    name: "Maria Ionescu",
    role: "Investitor Imobiliar",
    text: "Platforma Home Find combinată cu Ecosistemul AiX mi-au transformat complet modul în care analizez și cumpăr proprietăți.",
  },
  {
    name: "Andrei Mureșan",
    role: "Antreprenor",
    text: "Expertiza lui Cristian în asigurări de viață și planificare financiară este inestimabilă. Recomand cu toată încrederea.",
  }
];

const faqs = [
  {
    q: "Ce servicii de asigurare oferiți prin Generali?",
    a: "Oferim o gamă completă: asigurări auto (RCA, CASCO), locuință, viață, sănătate, travel și asigurări complexe pentru IMM-uri și corporații."
  },
  {
    q: "Ce înseamnă mai exact ecosistemul Cristian Văduva?",
    a: "Este un ansamblu de platforme digitale interconectate (Home Find, AiXLuxury) susținute de AiX OS, gândite să optimizeze investițiile imobiliare și procesele asociate."
  },
  {
    q: "Cât durează procesul pentru obținerea unei oferte de asigurare?",
    a: "În majoritatea cazurilor, pentru polițe standard, primiți oferta în 24 de ore. Pentru asigurări corporate sau IMM, procesul durează între 2 și 5 zile lucrătoare pentru o analiză de risc detaliată."
  }
];

export function TestimonialsFaq() {
  return (
    <section id="testimoniale" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Testimonials */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-heading font-bold mb-6"
            >
              Ce Spun Clienții
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass premium-card p-8 rounded-3xl"
              >
                <div className="flex text-yellow-500 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-lg mb-8 text-muted-foreground italic">&quot;{t.text}&quot;</p>
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div id="faq" className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-heading font-bold"
            >
              Întrebări Frecvente
            </motion.h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-6 md:p-8 rounded-2xl"
              >
                <h3 className="text-xl font-bold mb-3">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
