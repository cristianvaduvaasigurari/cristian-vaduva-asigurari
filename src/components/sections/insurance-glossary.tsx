'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Tag, 
  Scale, 
  AlertCircle, 
  ExternalLink, 
  Check, 
  Share2, 
  Layers, 
  FileText,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Globe
} from 'lucide-react';
import { GLOSSARY_TERMS, GLOSSARY_CATEGORIES, GlossaryTerm } from '@/data/glossaryData';

export function InsuranceGlossary() {
  const [language, setLanguage] = useState<'ro' | 'en'>('ro');
  const isEn = language === 'en';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');
  const [copiedTermId, setCopiedTermId] = useState<string | null>(null);

  // Available unique letters from dataset
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    GLOSSARY_TERMS.forEach(t => {
      letters.add(t.letter.toUpperCase());
    });
    return Array.from(letters).sort();
  }, []);

  // Filtered terms
  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Letter filter
      if (selectedLetter !== 'all' && item.letter.toUpperCase() !== selectedLetter) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesRo = 
          item.termRo.toLowerCase().includes(q) ||
          item.shortDefinitionRo.toLowerCase().includes(q) ||
          item.fullDefinitionRo.toLowerCase().includes(q) ||
          (item.distinctionsRo && item.distinctionsRo.toLowerCase().includes(q));

        const matchesEn = 
          item.termEn.toLowerCase().includes(q) ||
          item.shortDefinitionEn.toLowerCase().includes(q) ||
          item.fullDefinitionEn.toLowerCase().includes(q) ||
          (item.distinctionsEn && item.distinctionsEn.toLowerCase().includes(q));

        return matchesRo || matchesEn;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedLetter]);

  // Handle hash scrolling on load or click
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  const copyTermLink = (termSlug: string) => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/glosar-asigurari#${termSlug}`;
      navigator.clipboard.writeText(url);
      setCopiedTermId(termSlug);
      setTimeout(() => setCopiedTermId(null), 2500);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLetter('all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase">
              <BookOpen className="w-3.5 h-3.5" />
              {isEn ? 'Authoritative Insurance Glossary' : 'Glosar Autorizat de Asigurări'}
            </div>
            <div className="inline-flex rounded-lg bg-white p-0.5 border border-zinc-200">
              <button
                onClick={() => setLanguage('ro')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  language === 'ro' ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:text-white'
                }`}
              >
                RO
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  language === 'en' ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            {isEn ? 'Comprehensive Insurance Terminology' : 'Glosar Tehnic și Juridic de Asigurări'}
          </h1>
          <p className="text-zinc-600 text-base sm:text-lg leading-relaxed">
            {isEn
              ? 'Definitive explanations, legal statutory references, practical claims examples, and distinctions for essential terms in Romanian and international insurance.'
              : 'Definiții clare, temeiuri juridice din Codul Civil și legi speciale, exemple practice de daune și diferențieri esențiale pentru termenii din piața asigurărilor.'}
          </p>
        </div>

        {/* Search and interactive filter controls */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 backdrop-blur-md shadow-xl space-y-6">
          
          {/* Main search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isEn
                  ? 'Search by term, concept or keyword (e.g. Franșiză, D&O, Subasigurare, PAD)...'
                  : 'Caută după termen, concept sau cuvânt-cheie (ex. Franșiză, D&O, Subasigurare, PAD, Daună)...'
              }
              className="w-full bg-zinc-50 border border-zinc-200 text-white placeholder-zinc-400 rounded-xl pl-12 pr-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs bg-slate-700 hover:bg-slate-600 text-zinc-600 px-2 py-1 rounded-md"
              >
                {isEn ? 'Clear' : 'Șterge'}
              </button>
            )}
          </div>

          {/* Category tabs */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-blue-400" />
              {isEn ? 'Filter by Category' : 'Filtrează după categorie'}
            </div>
            <div className="flex flex-wrap gap-2">
              {GLOSSARY_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-slate-700/60 border border-zinc-200/60'
                  }`}
                >
                  {isEn ? cat.labelEn : cat.labelRo}
                </button>
              ))}
            </div>
          </div>

          {/* Alphabetical index pills */}
          <div className="space-y-2 pt-2 border-t border-zinc-200/60">
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              {isEn ? 'Alphabetical Navigation' : 'Navigare Alfabetică (A - Z)'}
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setSelectedLetter('all')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                  selectedLetter === 'all'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-zinc-100 text-zinc-500 hover:bg-slate-700'
                }`}
              >
                {isEn ? 'ALL' : 'TOATE'}
              </button>
              {availableLetters.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  className={`w-7 h-7 rounded text-xs font-bold flex items-center justify-center transition-colors ${
                    selectedLetter === letter
                      ? 'bg-blue-500 text-white'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-slate-700'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Results counter and reset */}
        <div className="flex items-center justify-between text-sm text-zinc-500 px-2">
          <div>
            {isEn
              ? `Showing ${filteredTerms.length} of ${GLOSSARY_TERMS.length} insurance terms`
              : `Se afișează ${filteredTerms.length} din ${GLOSSARY_TERMS.length} termeni documentați`}
          </div>
          {(selectedCategory !== 'all' || selectedLetter !== 'all' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-800 underline font-medium"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {isEn ? 'Reset all filters' : 'Resetează filtrele'}
            </button>
          )}
        </div>

        {/* Empty state */}
        {filteredTerms.length === 0 && (
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-12 text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
            <h3 className="text-xl font-bold text-zinc-900">
              {isEn ? 'No matching terms found' : 'Niciun termen găsit'}
            </h3>
            <p className="text-zinc-500 max-w-md mx-auto text-sm">
              {isEn
                ? 'Try broadening your search term, switching categories, or resetting the filter.'
                : 'Încearcă un alt termen de căutare sau resetează filtrele pentru a vizualiza întregul glosar.'}
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              {isEn ? 'View All Terms' : 'Afișează toți termenii'}
            </button>
          </div>
        )}

        {/* Term list */}
        <div className="space-y-6">
          {filteredTerms.map((term) => {
            const isCopied = copiedTermId === term.slug;

            return (
              <article
                key={term.id}
                id={term.slug}
                className="bg-white/70 hover:bg-white/90 border border-zinc-200/80 rounded-2xl p-6 sm:p-8 transition-all duration-200 shadow-md scroll-mt-24"
              >
                {/* Header of Term Card */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-zinc-200/60 pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">
                        {term.termRo}
                      </h2>
                      <button
                        onClick={() => copyTermLink(term.slug)}
                        title={isEn ? 'Copy link to this term' : 'Copiază link direct către acest termen'}
                        className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-zinc-500 hover:text-white transition-colors"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="text-sm font-medium text-blue-400 flex items-center gap-2">
                      <span className="text-xs uppercase tracking-wider text-zinc-500">EN:</span>
                      {term.termEn}
                    </div>
                  </div>

                  <span className="self-start px-3 py-1 rounded-full text-xs font-semibold bg-zinc-50 text-zinc-600 border border-zinc-200">
                    {GLOSSARY_CATEGORIES.find(c => c.id === term.category)?.[isEn ? 'labelEn' : 'labelRo'] || term.category}
                  </span>
                </div>

                {/* Body Definition */}
                <div className="mt-5 space-y-4">
                  {/* Short Summary Callout */}
                  <div className="p-3.5 bg-blue-950/40 border border-blue-800/40 rounded-xl text-blue-100 text-sm font-medium leading-relaxed">
                    {isEn ? term.shortDefinitionEn : term.shortDefinitionRo}
                  </div>

                  {/* Full detailed explanation */}
                  <div className="text-zinc-600 text-sm sm:text-base leading-relaxed space-y-2">
                    <p>{isEn ? term.fullDefinitionEn : term.fullDefinitionRo}</p>
                  </div>

                  {/* Practical Example Box */}
                  {(term.practicalExampleRo || term.practicalExampleEn) && (
                    <div className="p-4 bg-emerald-950/20 border border-emerald-800/30 rounded-xl text-xs sm:text-sm text-emerald-950/90 flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-emerald-800 block mb-1">
                          {isEn ? 'Practical Claims / Policy Example:' : 'Exemplu practic de daună / aplicare:'}
                        </span>
                        {isEn ? term.practicalExampleEn : term.practicalExampleRo}
                      </div>
                    </div>
                  )}

                  {/* Distinctions */}
                  {(term.distinctionsRo || term.distinctionsEn) && (
                    <div className="p-4 bg-amber-950/20 border border-amber-800/30 rounded-xl text-xs sm:text-sm text-amber-950/90 flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-amber-800 block mb-1">
                          {isEn ? 'Important Distinction:' : 'Diferențiere tehnică esențială:'}
                        </span>
                        {isEn ? term.distinctionsEn : term.distinctionsRo}
                      </div>
                    </div>
                  )}

                  {/* Legal Note */}
                  {(term.legalNoteRo || term.legalNoteEn) && (
                    <div className="flex items-center gap-2 text-xs text-zinc-500 pt-1">
                      <Scale className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>
                        <strong className="text-zinc-600">{isEn ? 'Legal Reference: ' : 'Temei legal: '}</strong>
                        {isEn ? term.legalNoteEn : term.legalNoteRo}
                      </span>
                    </div>
                  )}

                  {/* Connected interactive tools */}
                  {term.relatedToolLinks && term.relatedToolLinks.length > 0 && (
                    <div className="pt-4 border-t border-zinc-200/60 flex flex-wrap items-center gap-3">
                      <span className="text-xs text-zinc-500 font-medium">
                        {isEn ? 'Related Advisory Tools:' : 'Instrumente conexe pe site:'}
                      </span>
                      {term.relatedToolLinks.map((link, idx) => (
                        <Link
                          key={idx}
                          href={link.href}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-blue-600/20 text-blue-800 hover:bg-blue-600 hover:text-white border border-blue-500/30 transition-all"
                        >
                          {isEn ? link.titleEn : link.titleRo}
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      ))}
                    </div>
                  )}

                </div>
              </article>
            );
          })}
        </div>

        {/* Footer info box */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 text-center text-xs text-zinc-500 space-y-2">
          <p>
            {isEn
              ? 'This glossary provides informative guidance and general industry definitions. Specific policy terms, exclusions, deductibles, and claim settlements are strictly governed by the contractual terms and applicable legislation issued by the insurer.'
              : 'Acest glosar are caracter informativ și explicativ. Definițiile contractuale obligatorii, excluderile și limitele exacte sunt cele stipulate în condițiile particulare și generale de asigurare emise de compania de asigurări.'}
          </p>
        </div>

      </div>
    </div>
  );
}
