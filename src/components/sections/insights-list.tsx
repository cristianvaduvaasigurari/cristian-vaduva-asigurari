"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight, Rss } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Structură abstractă pentru a acomoda viitoarele integrări (OpenAI, RSS, Supabase)
export type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
  source: "AiX" | "RSS" | "OpenAI" | "Supabase";
  link: string;
};

// Demo Data
const DEMO_ARTICLES: Article[] = [
  {
    id: "1",
    title: "Cum influențează inteligența artificială procesarea daunelor auto în 2026",
    excerpt: "Sistemele AiX OS pot acum evalua daunele pe baza fotografiilor într-un timp record de sub 3 minute, accelerând decontările către service-urile partenere.",
    category: "Inovație",
    date: "Azi, 10:45",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
    source: "AiX",
    link: "#"
  },
  {
    id: "2",
    title: "Creșterea dobânzilor: De ce unit-linked devine un instrument preferat",
    excerpt: "Analiza randamentelor fondurilor cu expunere pe bursele americane vs. dobânzile depozitelor la termen pe plan local. Ce trebuie să știe antreprenorii.",
    category: "Investiții",
    date: "Ieri, 14:20",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
    source: "AiX",
    link: "#"
  },
  {
    id: "3",
    title: "Cyber Risk pentru IMM-uri: Cum te protejezi de noile campanii ransomware",
    excerpt: "Peste 40% din companiile mici au fost ținta unui atac cibernetic anul trecut. Generali introduce acoperiri extinse pentru recuperarea datelor.",
    category: "Corporate",
    date: "Acum 2 zile",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
    source: "AiX",
    link: "#"
  },
  {
    id: "4",
    title: "Home Find: Algoritmul care identifică locuințe cu randament peste piață",
    excerpt: "Noul modul integrat în ecosistemul AiX analizează zilnic mii de oferte imobiliare pentru a detecta proprietățile subevaluate din București Nord.",
    category: "Real Estate",
    date: "Acum 3 zile",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    source: "AiX",
    link: "#"
  }
];

export function InsightsList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Aici se va face fetch-ul din Supabase sau endpoint-ul OpenAI/RSS.
    // Abstractizat deocamdată sub un setTimeout pentru a simula delay-ul de rețea.
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        // Ex: const { data } = await supabase.from('articles').select('*');
        // setArticles(data);
        
        await new Promise(resolve => setTimeout(resolve, 800));
        setArticles(DEMO_ARTICLES);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="glass rounded-[2rem] overflow-hidden border border-border h-[400px]">
            <div className="w-full h-48 bg-muted/50" />
            <div className="p-8">
              <div className="w-20 h-4 bg-muted/50 rounded-full mb-4" />
              <div className="w-full h-6 bg-muted/50 rounded mb-2" />
              <div className="w-3/4 h-6 bg-muted/50 rounded mb-4" />
              <div className="w-full h-4 bg-muted/50 rounded mb-2" />
              <div className="w-2/3 h-4 bg-muted/50 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold font-heading">Ultimele Analize</h2>
          <p className="text-muted-foreground text-sm">Actualizat în timp real via AiX Core</p>
        </div>
        <Button variant="outline" className="rounded-full gap-2 text-muted-foreground hidden sm:flex">
          <Rss className="w-4 h-4" />
          Abonare RSS
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article, idx) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group glass rounded-[2.5rem] overflow-hidden border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="relative h-56 overflow-hidden">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-6 left-6 z-20">
                <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold uppercase tracking-wider text-foreground">
                  {article.category}
                </span>
              </div>
            </div>
            
            <div className="p-8 flex-grow flex flex-col">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {article.date}
                <span className="mx-2">•</span>
                <span className="uppercase text-blue-600">{article.source}</span>
              </div>
              
              <h3 className="text-2xl font-bold font-heading mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                {article.title}
              </h3>
              
              <p className="text-muted-foreground mb-8 flex-grow line-clamp-3">
                {article.excerpt}
              </p>
              
              <Link href={article.link} className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-foreground group-hover:text-blue-600 transition-colors w-max">
                Citește Analiza <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
