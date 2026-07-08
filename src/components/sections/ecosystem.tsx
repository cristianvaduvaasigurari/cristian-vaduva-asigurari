"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building, Smartphone, Globe } from "lucide-react";
import Link from "next/link";

const ecosystems = [
  {
    icon: <Building className="w-8 h-8" />,
    title: "Real Estate",
    description: "Consultanță de top pentru investiții, proprietăți de lux și optimizarea portofoliilor imobiliare.",
    href: "/real-estate",
    gradient: "from-blue-500 to-cyan-400"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "AiXLuxury",
    description: "O selecție exclusivistă de proprietăți de lux și oportunități investiționale high-end.",
    href: "https://aixluxury.com",
    gradient: "from-amber-500 to-orange-400"
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "AiX OS",
    description: "Sistemul de operare al viitorului pentru management imobiliar și portofolii.",
    href: "https://ai-x-os.vercel.app/",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: <Building className="w-8 h-8" />,
    title: "Home Find",
    description: "Sistem inteligent pentru identificarea și achiziția de proprietăți off-market.",
    href: "https://real-estate-platform-brown.vercel.app/",
    gradient: "from-emerald-400 to-emerald-600"
  }
];

export function Ecosystem() {
  return (
    <section id="ecosistem" className="py-24 relative overflow-hidden bg-muted/50">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold mb-6"
          >
            Ecosistemul <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">AiX</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Descoperă suite-ul nostru complet de platforme și servicii interconectate.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ecosystems.map((eco, index) => (
            <motion.div
              key={eco.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative group rounded-[2.5rem] p-8 glass overflow-hidden border border-border/50 hover:border-border transition-colors h-full flex flex-col"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${eco.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="mb-8">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${eco.gradient} text-white mb-6 shadow-lg`}>
                  {eco.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{eco.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {eco.description}
                </p>
              </div>

              <div className="mt-auto pt-8">
                <Link 
                  href={eco.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full py-4 rounded-full bg-background border border-border group-hover:bg-foreground group-hover:text-background transition-all duration-300 font-medium"
                >
                  Explorează platforma
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
