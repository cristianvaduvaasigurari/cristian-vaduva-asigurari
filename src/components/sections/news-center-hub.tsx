"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import Link from "next/link";
import {
  type NewsFilterCategory,
  NEWS_FILTER_CATEGORIES,
  getPublishedNewsArticles,
  getFeaturedNewsArticle,
} from "@/data/insuranceNewsData";
import {
  Sparkles,
  ArrowRight,
  Clock,
  ExternalLink,
  ShieldCheck,
  Search,
  CheckCircle2,
  Calendar,
  ChevronRight,
  FileText,
} from "lucide-react";

export function NewsCenterHub() {
  const [activeFilterId, setActiveFilterId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const allArticles = useMemo(() => getPublishedNewsArticles(), []);
  const featuredArticle = useMemo(() => getFeaturedNewsArticle(), []);

  // Filtered list based on category pill and search input
  const filteredArticles = useMemo(() => {
    let result = allArticles;

    // Category filter
    if (activeFilterId !== "all") {
      const activeGroup = NEWS_FILTER_CATEGORIES.find((c: NewsFilterCategory) => c.id === activeFilterId);
      if (activeGroup && activeGroup.categories.length > 0) {
        result = result.filter(article => activeGroup.categories.includes(article.category));
      }
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(article =>
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.sourceName.toLowerCase().includes(q) ||
        article.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    return result;
  }, [allArticles, activeFilterId, searchQuery]);

  // Count helper for category badges
  const getCategoryCount = (group: NewsFilterCategory) => {
    if (group.id === "all") return allArticles.length;
    return allArticles.filter(a => group.categories.includes(a.category)).length;
  };

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 border-b border-slate-200/80 bg-slate-50/50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-800 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-slate-700" />
              <span>Intelligence &amp; Analize Oficiale</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
              Insurance Intelligence
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
              Știri, date verificate și schimbări legislative relevante din lumea asigurărilor din România și Europa. Analize obiective explicate pe înțelesul asiguraților.
            </p>

            {/* Search Bar */}
            <div className="pt-4 max-w-xl mx-auto">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Caută după subiect (ex: RCA, CASCO, PAD, NIS 2, deductibilitate)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-full bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/20 shadow-xs transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
                  >
                    Resetează
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* FEATURED STORY HERO BANNER (When not actively searching) */}
        {!searchQuery && activeFilterId === "all" && featuredArticle && (
          <div className="mb-16">
            <div className="glass relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 text-white flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-slate-300" />
                    Analiză de Referință
                  </span>
                  <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    {featuredArticle.categoryLabel}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {new Date(featuredArticle.publishedAt).toLocaleDateString("ro-RO", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {featuredArticle.readTime}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <Link href={`/stiri/${featuredArticle.slug}`} className="group block space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 group-hover:text-slate-700 transition-colors leading-snug">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {featuredArticle.excerpt}
                    </p>
                  </Link>

                  {/* Key Takeaways Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Puncte Cheie &amp; Concluzii
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-800">
                      {featuredArticle.keyTakeaways.slice(0, 3).map((takeaway, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-800 shrink-0 mt-0.5" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80 space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wide">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Sursă Oficială Verificată</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                      <div className="font-semibold text-slate-900">{featuredArticle.sourceName}</div>
                      <a
                        href={featuredArticle.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-900 underline"
                      >
                        <span>Consultă sursa originală</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <Link
                    href={`/stiri/${featuredArticle.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    <span>Citește analiza detaliată</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CATEGORY FILTER TABS */}
        <div className="mb-10 flex items-center justify-between flex-wrap gap-4 border-b border-slate-200/80 pb-5">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full md:w-auto scrollbar-none">
            {NEWS_FILTER_CATEGORIES.map((group) => {
              const isActive = activeFilterId === group.id;
              const count = getCategoryCount(group);

              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setActiveFilterId(group.id)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span>{group.label}</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-500 font-medium hidden md:block">
            {filteredArticles.length} din {allArticles.length} analize verificate
          </div>
        </div>

        {/* ARTICLES GRID */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredArticles.map((article, index) => {
              const formattedIndex = (index + 1).toString().padStart(2, "0");

              return (
                <article
                  key={article.id}
                  className="glass bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 flex flex-col justify-between transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    {/* Top Metadata */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                        {article.categoryLabel}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        #{formattedIndex}
                      </span>
                    </div>

                    {/* Headline & Excerpt */}
                    <div className="space-y-2">
                      <Link href={`/stiri/${article.slug}`}>
                        <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900 group-hover:text-slate-950 transition-colors leading-snug line-clamp-3">
                          {article.title}
                        </h3>
                      </Link>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Source Information */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-700 truncate max-w-[180px]">
                        {article.sourceName}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-slate-200 text-slate-800">
                        {article.sourceType}
                      </span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">
                      {new Date(article.publishedAt).toLocaleDateString("ro-RO", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}
                    </span>

                    <Link
                      href={`/stiri/${article.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Citește analiza</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center space-y-4 bg-slate-50 rounded-3xl border border-slate-200 max-w-md mx-auto mb-16 p-8">
            <FileText className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-heading font-bold text-slate-900">
              Nicio analiză găsită
            </h3>
            <p className="text-xs text-slate-600">
              Nu există știri verificate care să corespundă căutării „{searchQuery}”.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveFilterId("all");
              }}
              className="px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-semibold cursor-pointer"
            >
              Vezi toate analizele
            </button>
          </div>
        )}

        {/* BOTTOM SECTION CTA */}
        <div className="glass max-w-4xl mx-auto rounded-3xl bg-white/90 p-8 sm:p-10 text-center relative overflow-hidden shadow-sm border border-slate-200/90">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1">
              Audit &amp; Diagnostic Gratuit
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
              Ai o poliță pe care vrei să o verificăm?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Înainte să alegi sau să reînnoiești, hai să vedem clar ce cumperi, ce acoperiri ai și ce riscuri rămân expuse conform noilor reglementări.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-7 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold shadow-xs transition-all"
              >
                <span>Solicită o verificare gratuită</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/scenarii-risc"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium transition-all"
              >
                <span>Explorează scenariile de risc</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
