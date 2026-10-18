"use client";

import * as React from "react";
import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import {
  type NewsFilterCategory,
  type MaterialTypeFilter,
  NEWS_FILTER_CATEGORIES,
  MATERIAL_TYPE_FILTERS,
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
  ChevronLeft,
  FileText,
  Download,
  Filter,
  ArrowUpDown,
  Scale,
  FileCheck2,
  BookOpen,
  Layers,
  RotateCcw,
  BadgeAlert,
} from "lucide-react";

type SortOption = "date_desc" | "date_asc" | "read_time";

export function NewsCenterHub() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>("all");
  const [activeMaterialTypeId, setActiveMaterialTypeId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("date_desc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const articlesGridRef = useRef<HTMLDivElement>(null);

  const PAGE_SIZE = 9;

  const allArticles = useMemo(() => getPublishedNewsArticles(), []);
  const featuredArticle = useMemo(() => getFeaturedNewsArticle(), []);

  // Handlers that reset page to 1 on filter/search change
  const handleCategorySelect = (id: string) => {
    setActiveCategoryId(id);
    setCurrentPage(1);
  };

  const handleMaterialTypeSelect = (id: string) => {
    setActiveMaterialTypeId(id);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveCategoryId("all");
    setActiveMaterialTypeId("all");
    setSortBy("date_desc");
    setCurrentPage(1);
  };

  // Filtered & sorted list
  const filteredArticles = useMemo(() => {
    let result = [...allArticles];

    // Category filter
    if (activeCategoryId !== "all") {
      const activeGroup = NEWS_FILTER_CATEGORIES.find((c: NewsFilterCategory) => c.id === activeCategoryId);
      if (activeGroup && activeGroup.categories.length > 0) {
        result = result.filter(article => activeGroup.categories.includes(article.category));
      }
    }

    // Material type filter
    if (activeMaterialTypeId !== "all") {
      const activeMaterialGroup = MATERIAL_TYPE_FILTERS.find((m: MaterialTypeFilter) => m.id === activeMaterialTypeId);
      if (activeMaterialGroup && activeMaterialGroup.types.length > 0) {
        result = result.filter(article => article.materialType && activeMaterialGroup.types.includes(article.materialType));
      }
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(article =>
        article.title.toLowerCase().includes(q) ||
        article.subtitle.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.sourceName.toLowerCase().includes(q) ||
        article.categoryLabel.toLowerCase().includes(q) ||
        article.tags.some(tag => tag.toLowerCase().includes(q)) ||
        article.keyTakeaways.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "date_desc") {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
      if (sortBy === "date_asc") {
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      }
      if (sortBy === "read_time") {
        const readA = parseInt(a.readTime, 10) || 0;
        const readB = parseInt(b.readTime, 10) || 0;
        return readA - readB;
      }
      return 0;
    });

    return result;
  }, [allArticles, activeCategoryId, activeMaterialTypeId, searchQuery, sortBy]);

  // Pagination calculation
  const totalArticles = filteredArticles.length;
  const totalPages = Math.ceil(totalArticles / PAGE_SIZE) || 1;
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredArticles.slice(start, start + PAGE_SIZE);
  }, [filteredArticles, currentPage, PAGE_SIZE]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (articlesGridRef.current) {
      articlesGridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Category counts
  const getCategoryCount = (group: NewsFilterCategory) => {
    if (group.id === "all") return allArticles.length;
    return allArticles.filter(a => group.categories.includes(a.category)).length;
  };

  // Material type counts
  const getMaterialTypeCount = (group: MaterialTypeFilter) => {
    if (group.id === "all") return allArticles.length;
    return allArticles.filter(a => a.materialType && group.types.includes(a.materialType)).length;
  };

  // Material badge visual styling
  const renderMaterialBadge = (materialType?: string) => {
    switch (materialType) {
      case "raport":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
            <FileText className="w-3 h-3" />
            <span>Raport Oficial ASF</span>
          </span>
        );
      case "decizie":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
            <Scale className="w-3 h-3" />
            <span>Decizie Consiliu ASF</span>
          </span>
        );
      case "legislatie":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200">
            <FileCheck2 className="w-3 h-3" />
            <span>Reglementare &amp; Norme</span>
          </span>
        );
      case "ghid":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
            <BookOpen className="w-3 h-3" />
            <span>Ghid Consumatori</span>
          </span>
        );
      case "informare":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200">
            <BadgeAlert className="w-3 h-3" />
            <span>Informare Oficială</span>
          </span>
        );
      case "comunicat":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
            <Layers className="w-3 h-3" />
            <span>Comunicat de Presă</span>
          </span>
        );
    }
  };

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 border-b border-slate-200/80 bg-gradient-to-b from-slate-100/60 via-slate-50/50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-800 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-slate-700" />
              <span>Surse Oficiale ASF, BAAR, PAID &amp; EIOPA</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
              Insurance Intelligence
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto">
              Centru de analiză tehnică, date verificate, decizii de supraveghere și noutăți legislative din domeniul asigurărilor din România. Conținut autentic explicat obiectiv pe înțelesul asiguraților și companiilor.
            </p>

            {/* Official Source Provenance Notice */}
            <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 font-medium pt-1">
              <span className="flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Actualizat periodic din arhivele oficiale asfromania.ro</span>
              </span>
              <span>•</span>
              <span>{allArticles.length} analize &amp; rapoarte documentate</span>
            </div>

            {/* Search Bar */}
            <div className="pt-4 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Caută după subiect (ex: RCA, Solvabilitate S1, Tarife Referință, DORA, PAD, SAL-FIN, Pensii)..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full h-12 pl-11 pr-24 rounded-full bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/20 shadow-xs transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => handleSearchChange("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
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
        {/* FEATURED STORY HERO BANNER (When not actively searching or filtering) */}
        {!searchQuery && activeCategoryId === "all" && activeMaterialTypeId === "all" && featuredArticle && (
          <div className="mb-16">
            <div className="glass relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 text-white flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    Analiză de Referință
                  </span>
                  {renderMaterialBadge(featuredArticle.materialType)}
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
                      Puncte Cheie &amp; Cifre Oficiale ASF
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
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs space-y-2">
                      <div className="font-semibold text-slate-900">{featuredArticle.sourceName}</div>
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <a
                          href={featuredArticle.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-900 underline font-medium"
                        >
                          <span>Anunțul oficial ASF</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        {featuredArticle.officialDocumentUrl && (
                          <a
                            href={featuredArticle.officialDocumentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
                          >
                            <Download className="w-3 h-3" />
                            <span>Descarcă PDF Oficial</span>
                          </a>
                        )}
                      </div>
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

        {/* CONTROLS SECTION: CATEGORY TABS & MATERIAL FILTERS */}
        <div ref={articlesGridRef} className="space-y-4 mb-8">
          {/* CATEGORY FILTER TABS (Tier 1) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {NEWS_FILTER_CATEGORIES.map((group) => {
              const isActive = activeCategoryId === group.id;
              const count = getCategoryCount(group);

              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => handleCategorySelect(group.id)}
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

          {/* MATERIAL TYPE PILLS & SORT CONTROLS (Tier 2) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2 border-t border-slate-200/80">
            {/* Material type pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <span className="text-[11px] font-semibold text-slate-400 mr-1 flex items-center gap-1 shrink-0">
                <Filter className="w-3 h-3" />
                <span>Format:</span>
              </span>
              {MATERIAL_TYPE_FILTERS.map((mFilter) => {
                const isActive = activeMaterialTypeId === mFilter.id;
                const count = getMaterialTypeCount(mFilter);

                return (
                  <button
                    key={mFilter.id}
                    type="button"
                    onClick={() => handleMaterialTypeSelect(mFilter.id)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? "bg-slate-800 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                    }`}
                  >
                    <span>{mFilter.label}</span>
                    <span className="ml-1.5 opacity-70">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Sort Dropdown & Counter */}
            <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[11px] font-medium text-slate-500">Sortare:</span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value as SortOption)}
                  className="bg-white border border-slate-200 text-slate-800 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer"
                >
                  <option value="date_desc">Cele mai recente</option>
                  <option value="date_asc">Cele mai vechi</option>
                  <option value="read_time">Timp de citire</option>
                </select>
              </div>

              <div className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                {totalArticles} din {allArticles.length} analize
              </div>
            </div>
          </div>
        </div>

        {/* ARTICLES GRID */}
        {paginatedArticles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {paginatedArticles.map((article, index) => {
                const absoluteIndex = (currentPage - 1) * PAGE_SIZE + index + 1;
                const formattedIndex = absoluteIndex.toString().padStart(2, "0");

                return (
                  <article
                    key={article.id}
                    className="glass bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 flex flex-col justify-between transition-all duration-300 group"
                  >
                    <div className="space-y-4">
                      {/* Top Badges & Index */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {renderMaterialBadge(article.materialType)}
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                            {article.categoryLabel}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400 font-semibold">
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

                      {/* Official Source Information & Direct PDF Link */}
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-[11px]">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-slate-800 truncate max-w-[200px]">
                            {article.sourceName}
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-slate-200 text-slate-800 shrink-0">
                            {article.sourceType}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-200/50">
                          <a
                            href={article.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-900 underline truncate max-w-[140px]"
                          >
                            <span>Sursa oficială</span>
                            <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                          </a>

                          {article.officialDocumentUrl && (
                            <a
                              href={article.officialDocumentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors shrink-0"
                            >
                              <Download className="w-2.5 h-2.5" />
                              <span>PDF Oficial</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-slate-400 font-medium text-[11px]">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>
                          {new Date(article.publishedAt).toLocaleDateString("ro-RO", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                          })}
                        </span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>

                      <Link
                        href={`/stiri/${article.slug}`}
                        className="inline-flex items-center gap-1 font-semibold text-slate-900 group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>Citește</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* PROGRESSIVE PAGINATION CONTROLS */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-slate-200/80 mb-16">
                <div className="text-xs text-slate-500 font-medium">
                  Se afișează analizele <span className="font-bold text-slate-900">{(currentPage - 1) * PAGE_SIZE + 1}</span> -{" "}
                  <span className="font-bold text-slate-900">{Math.min(currentPage * PAGE_SIZE, totalArticles)}</span> din{" "}
                  <span className="font-bold text-slate-900">{totalArticles}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Anterior</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => {
                      const isCurrent = pageNumber === currentPage;
                      return (
                        <button
                          key={pageNumber}
                          type="button"
                          onClick={() => handlePageChange(pageNumber)}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                            isCurrent
                              ? "bg-slate-900 text-white shadow-xs"
                              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <span>Următor</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="py-16 text-center space-y-4 bg-slate-50 rounded-3xl border border-slate-200 max-w-lg mx-auto mb-16 p-8 shadow-xs">
            <FileText className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-heading font-bold text-slate-900">
              Nicio analiză găsită pentru criteriile selectate
            </h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Nu am găsit materiale care să corespundă filtrelor sau termenului de căutare „{searchQuery}”.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Resetează toate filtrele</span>
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
              Înainte să alegi sau să reînnoiești, hai să vedem clar ce cumperi, ce acoperiri ai și ce riscuri rămân expuse conform noilor reglementări oficiale ale pieței.
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
