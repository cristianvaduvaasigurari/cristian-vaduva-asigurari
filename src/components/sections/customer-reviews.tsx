"use client";

import * as React from "react";
import { useState, useMemo, useEffect, useRef } from "react";
import {
  customerReviewsData,
  CustomerStory,
  REVIEW_FILTER_GROUPS,
  FilterGroup,
  ReviewCategory
} from "@/data/customerReviewsData";
import {
  ChevronRight,
  X,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
  Quote,
  Car,
  Home,
  Heart,
  Activity,
  Briefcase,
  Scale,
  Truck,
  Shield,
  FileCheck,
  AlertTriangle,
  Award,
  Compass,
  ShieldCheck,
  type LucideIcon
} from "lucide-react";

// Semantic category icon dictionary
const categoryIconMap: Record<string, LucideIcon> = {
  "auto-premium": Car,
  "casco": Car,
  "rca": Car,
  "locuinta": Home,
  "viata": Heart,
  "sanatate": Activity,
  "business": Briefcase,
  "raspundere": Scale,
  "cargo": Truck,
  "cyber": Shield,
  "polita-existenta": FileCheck,
  "comparatie": Scale,
  "pret-vs-acoperire": ShieldCheck,
  "reinnoire": Clock,
  "dauna": AlertTriangle,
  "consultanta": Award,
  "preventie": Compass
};

function StoryCategoryIcon({ category, className = "w-4 h-4" }: { category: ReviewCategory; className?: string }) {
  const IconComponent = categoryIconMap[category] || ShieldCheck;
  return <IconComponent className={className} />;
}

export function CustomerReviews() {
  const [activeFilterId, setActiveFilterId] = useState<string>("all");
  const [activeStory, setActiveStory] = useState<CustomerStory | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeStory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeStory]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeStory) {
        setActiveStory(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeStory]);

  // Filtered stories calculation
  const filteredStories = useMemo(() => {
    if (activeFilterId === "all") return customerReviewsData;
    const group = REVIEW_FILTER_GROUPS.find((g) => g.id === activeFilterId);
    if (!group || group.categories.length === 0) return customerReviewsData;
    return customerReviewsData.filter((story) => group.categories.includes(story.category));
  }, [activeFilterId]);

  // Count helper for filter group pills
  const getFilterCount = (group: FilterGroup) => {
    if (group.id === "all") return customerReviewsData.length;
    return customerReviewsData.filter((s) => group.categories.includes(s.category)).length;
  };

  // Find featured story or fallback to first
  const featuredStory = useMemo(() => {
    return customerReviewsData.find((s) => s.featured) || customerReviewsData[0];
  }, []);

  return (
    <section
      id="experiente-clienti"
      aria-labelledby="reviews-heading"
      className="py-24 relative overflow-hidden bg-background border-t border-border/40"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* SECTION HEADER */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-800 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-slate-700" />
            <span>Experiențe &amp; Rezultate Reale</span>
          </div>

          <h2
            id="reviews-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight text-slate-900 mb-6"
          >
            Ce spun oamenii după ce au lucrat cu mine.
          </h2>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Nu despre preț. Despre ce au înțeles, ce au rezolvat și ce au făcut diferit.
          </p>
        </div>

        {/* FEATURED STORY HERO CARD */}
        {featuredStory && (
          <div className="mb-16 max-w-5xl mx-auto">
            <div
              className="glass relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 text-white flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-slate-300" />
                    Situație de Referință
                  </span>
                  <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    {featuredStory.categoryLabel}
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> Lectură: {featuredStory.readTime || "2 min"}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-5">
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 leading-snug">
                    {featuredStory.headline}
                  </h3>

                  <div className="relative pl-4 border-l-2 border-slate-900 py-1">
                    <p className="text-base sm:text-lg text-slate-800 font-normal italic leading-relaxed">
                      „{featuredStory.quote}”
                    </p>
                  </div>

                  {featuredStory.takeaway && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                          Concluzia practică
                        </span>
                        <p className="text-xs sm:text-sm font-medium text-slate-900 leading-relaxed">
                          {featuredStory.takeaway}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-5 bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80 space-y-4 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-3">
                      Rezumatul Situației
                    </span>

                    <div className="space-y-3 text-xs sm:text-sm">
                      {featuredStory.context && (
                        <div>
                          <span className="font-bold text-slate-900 block text-xs mb-0.5">Punct de plecare:</span>
                          <span className="text-slate-600 leading-relaxed">{featuredStory.context}</span>
                        </div>
                      )}
                      {featuredStory.discovery && (
                        <div>
                          <span className="font-bold text-slate-900 block text-xs mb-0.5">Descoperire:</span>
                          <span className="text-slate-600 leading-relaxed">{featuredStory.discovery}</span>
                        </div>
                      )}
                      {featuredStory.outcome && (
                        <div>
                          <span className="font-bold text-slate-900 block text-xs mb-0.5">Rezultat:</span>
                          <span className="text-slate-600 leading-relaxed">{featuredStory.outcome}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveStory(featuredStory)}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    <span>Citește analiza detaliată</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CATEGORY FILTER PILLS */}
        <div className="mb-10 flex items-center justify-between flex-wrap gap-4 border-b border-slate-200/70 pb-5">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full md:w-auto scrollbar-none">
            {REVIEW_FILTER_GROUPS.map((group) => {
              const isActive = activeFilterId === group.id;
              const count = getFilterCount(group);

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
            {filteredStories.length} din {customerReviewsData.length} situații
          </div>
        </div>

        {/* STORIES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredStories.map((story, index) => {
            const formattedIndex = (index + 1).toString().padStart(2, "0");

            return (
              <div
                key={story.id}
                tabIndex={0}
                role="button"
                onClick={() => setActiveStory(story)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveStory(story);
                  }
                }}
                className="glass premium-card bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 flex flex-col justify-between cursor-pointer transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-slate-900/20"
              >
                <div>
                  {/* Card Top Metadata */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-200">
                        <StoryCategoryIcon category={story.category} className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        {story.categoryLabel}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      #{formattedIndex}
                    </span>
                  </div>

                  {/* Card Headline & Quote */}
                  <div className="relative mb-5">
                    <Quote className="w-5 h-5 text-slate-200 mb-1.5 -ml-0.5" />
                    <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900 mb-2.5 leading-snug group-hover:text-slate-950 transition-colors">
                      {story.headline}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic line-clamp-4">
                      „{story.quote}”
                    </p>
                  </div>
                </div>

                {/* Card Footer / Action */}
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 group-hover:translate-x-0.5 transition-transform duration-200">
                    <span>Vezi analiza cazului</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {story.readTime || "2 min"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM SECTION CTA (Subtle & Direct) */}
        <div className="glass max-w-4xl mx-auto rounded-3xl bg-white/90 p-8 sm:p-10 md:p-12 text-center relative overflow-hidden shadow-sm border border-slate-200/90">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1">Audit &amp; Diagnostic</span>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
              Ai o poliță pe care vrei să o verificăm?
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Înainte să alegi sau să reînnoiești, hai să vedem clar ce cumperi, ce acoperiri ai și ce riscuri rămân expuse.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-xs sm:text-sm font-semibold shadow-xs transition-all"
              >
                <span>Solicită o verificare gratuită</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/scenarii-risc"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium transition-all"
              >
                <span>Explorează scenariile de risc</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* STORY DETAIL READER MODAL */}
      {activeStory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-story-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setActiveStory(null);
            }
          }}
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-2xl max-h-[88vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/80">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center">
                    <StoryCategoryIcon category={activeStory.category} className="w-3 h-3" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-800">
                    {activeStory.categoryLabel}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Studiu de Caz
                  </span>
                </div>
                <h3
                  id="modal-story-title"
                  className="text-lg sm:text-xl font-heading font-bold text-slate-900 leading-snug"
                >
                  {activeStory.headline}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveStory(null)}
                aria-label="Închide fereastra"
                className="p-2 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors cursor-pointer shrink-0 shadow-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
              {/* Highlighted Quote */}
              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 relative">
                <Quote className="w-5 h-5 text-slate-300 mb-1.5 -ml-0.5" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                  Perspectiva Asiguratului
                </span>
                <p className="text-sm sm:text-base text-slate-900 italic font-medium leading-relaxed">
                  „{activeStory.quote}”
                </p>
              </div>

              {/* 4-Step Narrative Matrix */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                  Analiza Structurată a Cazului
                </span>

                <div className="grid grid-cols-1 gap-2.5">
                  {activeStory.context && (
                    <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/80 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wide">
                        <span className="w-2 h-2 rounded-full bg-slate-400" />
                        01. Context &amp; Punct de Plecare
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-4">
                        {activeStory.context}
                      </p>
                    </div>
                  )}

                  {activeStory.discovery && (
                    <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/80 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wide">
                        <span className="w-2 h-2 rounded-full bg-slate-600" />
                        02. Problema sau Clauza Descoperită
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-4">
                        {activeStory.discovery}
                      </p>
                    </div>
                  )}

                  {activeStory.action && (
                    <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/80 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wide">
                        <span className="w-2 h-2 rounded-full bg-slate-800" />
                        03. Acțiunea &amp; Soluția Implementată
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-4">
                        {activeStory.action}
                      </p>
                    </div>
                  )}

                  {activeStory.outcome && (
                    <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/80 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wide">
                        <span className="w-2 h-2 rounded-full bg-slate-950" />
                        04. Rezultatul Concret
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-4">
                        {activeStory.outcome}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Takeaway / Concluzie */}
              {activeStory.takeaway && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                      Concluzia Cheie
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                      {activeStory.takeaway}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer CTA */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-600 text-center sm:text-left font-medium">
                Vrei să verificăm o situație similară pentru contractele tale?
              </div>
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setActiveStory(null)}
                  className="w-1/2 sm:w-auto px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Închide
                </button>
                <a
                  href="#contact"
                  onClick={() => setActiveStory(null)}
                  className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold transition-colors text-center"
                >
                  <span>Discută cu Cristian</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
