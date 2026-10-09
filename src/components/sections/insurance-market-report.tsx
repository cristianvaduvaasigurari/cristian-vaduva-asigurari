'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Building2,
  Car,
  HeartPulse,
  BookOpen,
  Download,
  ExternalLink,
  Copy,
  Check,
  Info,
  Calendar,
  Layers,
  ArrowRight,
  FileSpreadsheet,
  PieChart,
  Activity,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import {
  HEADLINE_MARKET_INDICATORS,
  MARKET_SEGMENT_SHARES,
  MARKET_TRENDS_ANALYSIS,
  OFFICIAL_SOURCES,
} from '@/data/marketReportData';

export function InsuranceMarketReport() {
  const [lang, setLang] = useState<'ro' | 'en'>('ro');
  const isRo = lang === 'ro';

  const [activeTab, setActiveTab] = useState<
    'executive' | 'segments' | 'auto_rca' | 'property_pad' | 'health_life' | 'trends' | 'sources'
  >('executive');

  const [copiedCitation, setCopiedCitation] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCitation(type);
    setTimeout(() => setCopiedCitation(null), 2500);
  };

  const citationMarkdown = `**Cristian Văduva Insurance Advisory** (2025). *Raportul Anual al Pieței Asigurărilor din România: Indicatori Cheie, Dinamica Daunelor și Structura Segmentelor*. Bazat pe Raportul Oficial ASF 2024 (publicat martie 2025), BAAR, PAID România și UNSAR. Disponibil la: https://insurance.cristianvaduva.com/raport-piata-asigurarilor`;

  const citationBibtex = `@misc{vaduva2025insurance_report,
  author = {Văduva, Cristian},
  title = {Raportul Anual al Pieței Asigurărilor din România — Analiză Consolidată},
  year = {2025},
  publisher = {Cristian Văduva Premium Insurance Advisory},
  howpublished = {\\url{https://insurance.cristianvaduva.com/raport-piata-asigurarilor}},
  note = {Date agregate din Raportul Oficial ASF 2024 (martie 2025), BAAR, PAID România, UNSAR. Accesat: Octombrie 2026}
}`;

  const handleDownloadJson = () => {
    const dataObj = {
      reportTitle: 'Raportul Anual al Pieței Asigurărilor din România',
      edition: '2024 / 2025',
      reportingPeriod: 'Exercițiul Financiar 2024 (Raport Oficial ASF Martie 2025)',
      publisher: 'Cristian Văduva Premium Insurance Advisory',
      canonicalUrl: 'https://insurance.cristianvaduva.com/raport-piata-asigurarilor',
      exportedAt: new Date().toISOString(),
      indicators: HEADLINE_MARKET_INDICATORS,
      segmentShares: MARKET_SEGMENT_SHARES,
      trends: MARKET_TRENDS_ANALYSIS,
      officialSources: OFFICIAL_SOURCES,
    };

    const blob = new Blob([JSON.stringify(dataObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `raport-piata-asigurari-romania-2024-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (

    <div className="space-y-10 text-zinc-900">
      {/* HEADER HERO BANNER */}
      <div className="relative rounded-3xl overflow-hidden border border-zinc-200/80 bg-gradient-to-b from-blue-50/30 via-slate-50/20 to-white p-6 sm:p-10 shadow-sm">
        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 border border-blue-200/80 text-blue-700 uppercase tracking-wider">
                {isRo ? 'Raport Editorial & Cercetare de Piață' : 'Editorial Market Research Report'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 border border-zinc-200 text-zinc-700">
                Date Oficiale ASF 2024 / 2025
              </span>
            </div>

            {/* Language switch */}
            <div className="inline-flex rounded-xl bg-zinc-100 p-1 border border-zinc-200">
              <button
                type="button"
                onClick={() => setLang('ro')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  lang === 'ro' ? 'bg-blue-600 text-white shadow-sm' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Română
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  lang === 'en' ? 'bg-blue-600 text-white shadow-sm' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                English
              </button>
            </div>
          </div>

          <div className="space-y-3 max-w-4xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-zinc-900 tracking-tight leading-tight">
              {isRo
                ? 'Raportul Anual al Pieței Asigurărilor din România'
                : 'Annual Report on the Romanian Insurance Market'}
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed">
              {isRo
                ? 'O sinteză documentată și transparentă a pieței naționale de asigurări, structurată pe baza raportului oficial al Autorității de Supraveghere Financiară (ASF 2024), completat cu date BAAR, PAID România și UNSAR. Indicatori cheie de volum (23,4 mld. RON), structura non-viață / viață (81,5% vs 18,5%) și despăgubiri totale acordate (10,6 mld. RON).'
                : 'An evidence-based overview of the Romanian insurance industry, compiled directly from primary regulatory publications of the Financial Supervisory Authority (ASF 2024 Report), BAAR, PAID Romania, and UNSAR. Key volume metrics (RON 23.4B), non-life/life split (81.5% vs 18.5%), and total claims paid (RON 10.6B).'}
            </p>
          </div>

          {/* Quick Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-zinc-200/80 text-xs">
            <div className="bg-white p-4 rounded-xl border border-zinc-200/80 shadow-xs space-y-1">
              <span className="text-zinc-500 font-medium block">{isRo ? 'Volum Total Piață (PBS):' : 'Total Market (GWP):'}</span>
              <span className="text-zinc-900 font-bold text-base sm:text-lg block">23,40 mld. RON</span>
              <span className="text-[11px] text-zinc-500 block">{isRo ? '(19,8 mld. ASF + 3,6 mld. Sucursale)' : '(19.8B ASF + 3.6B Branches)'}</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-zinc-200/80 shadow-xs space-y-1">
              <span className="text-zinc-500 font-medium block">{isRo ? 'Pondre Asigurări Generale:' : 'Non-Life Market Share:'}</span>
              <span className="text-zinc-900 font-bold text-base sm:text-lg block">81,5% (19,09 mld.)</span>
              <span className="text-[11px] text-zinc-500 block">{isRo ? 'Viață: 18,5% (4,34 mld. RON)' : 'Life: 18.5% (4.34B RON)'}</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-zinc-200/80 shadow-xs space-y-1">
              <span className="text-zinc-500 font-medium block">{isRo ? 'Total Despăgubiri Plătite:' : 'Total Claims Paid:'}</span>
              <span className="text-emerald-700 font-bold text-base sm:text-lg block">10,60 mld. RON</span>
              <span className="text-[11px] text-zinc-500 block">{isRo ? '(Asigurători + Sucursale UE)' : '(Insurers + EU Branches)'}</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-zinc-200/80 shadow-xs space-y-1">
              <span className="text-zinc-500 font-medium block">{isRo ? 'Penetrare Asigurări în PIB:' : 'GDP Penetration:'}</span>
              <span className="text-amber-700 font-bold text-base sm:text-lg block">1,42%</span>
              <span className="text-[11px] text-zinc-500 block">{isRo ? 'vs 6,8% media UE' : 'vs 6.8% EU average'}</span>
            </div>
          </div>

          {/* Report Actions */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
            <button
              onClick={handleDownloadJson}
              className="px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-semibold bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-300 shadow-xs transition-all flex items-center gap-2 shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              {isRo ? 'Descarcă Datele (JSON)' : 'Download Dataset (JSON)'}
            </button>
            <button
              onClick={() => copyToClipboard(citationMarkdown, 'markdown')}
              className="px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-semibold bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-300 shadow-xs transition-all flex items-center gap-2 shrink-0"
            >
              {copiedCitation === 'markdown' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-blue-600" />}
              {copiedCitation === 'markdown' ? (isRo ? 'Citat Copiat!' : 'Citation Copied!') : (isRo ? 'Copiază Citat' : 'Copy Citation')}
            </button>
            <button
              onClick={() => copyToClipboard(citationBibtex, 'bibtex')}
              className="px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-semibold bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-300 shadow-xs transition-all flex items-center gap-2 shrink-0"
            >
              {copiedCitation === 'bibtex' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-blue-600" />}
              {copiedCitation === 'bibtex' ? 'BibTeX Copiat!' : 'Citează BibTeX'}
            </button>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex items-center gap-2 overflow-x-auto pb-2.5 scrollbar-thin border-b border-zinc-200 overscroll-x-contain">
        {[
          { id: 'executive', labelRo: '1. Sinteză Executivă', labelEn: '1. Executive Summary', icon: Activity },
          { id: 'segments', labelRo: '2. Structura Segmentelor', labelEn: '2. Market Segments', icon: PieChart },
          { id: 'auto_rca', labelRo: '3. Auto (RCA & CASCO)', labelEn: '3. Motor (MTPL/CASCO)', icon: Car },
          { id: 'property_pad', labelRo: '4. Locuințe & PAD', labelEn: '4. Property & PAD', icon: Building2 },
          { id: 'health_life', labelRo: '5. Sănătate & Viață', labelEn: '5. Health & Life', icon: HeartPulse },
          { id: 'trends', labelRo: '6. Tendințe & Analiză', labelEn: '6. Trends & Outlook', icon: TrendingUp },
          { id: 'sources', labelRo: '7. Registru Surse Primare', labelEn: '7. Primary Sources', icon: BookOpen },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'executive' | 'segments' | 'auto_rca' | 'property_pad' | 'health_life' | 'trends' | 'sources')}
              className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 border shrink-0 ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-zinc-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
              {isRo ? tab.labelRo : tab.labelEn}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT SECTIONS */}

      {/* TAB 1: EXECUTIVE SUMMARY */}
      {activeTab === 'executive' && (
        <div className="space-y-8">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              {isRo ? 'Sinteza Executivă a Pieței Naționale de Asigurări (Date Oficiale ASF 2024)' : 'Executive Overview of the Romanian Insurance Market (Official ASF 2024 Data)'}
            </h2>
            <div className="text-zinc-700 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                {isRo
                  ? 'Conform raportului oficial publicat de Autoritatea de Supraveghere Financiară (ASF), piața asigurărilor din România a înregistrat în anul 2024 un volum total consolidat de prime brute subscrise de aproximativ 23,4 miliarde RON (+11% față de 2023). Din acest total, 19,8 miliarde RON au fost subscrise de cele 25 de societăți autorizate și supravegheate de ASF (dintre care 19 active pe segmentul non-viață/mixt), iar 3,6 miliarde RON de cele 14 sucursale ale asigurătorilor europeni care activează pe baza dreptului de stabilire (FOE).'
                  : 'According to the official report published by the Financial Supervisory Authority (ASF), the Romanian insurance market generated approximately RON 23.4 billion in total gross written premiums in 2024 (+11% YoY). Domestic ASF-supervised insurers (25 authorized entities, 19 writing non-life) accounted for RON 19.8 billion, while 14 EU branch entities operating under freedom of establishment contributed RON 3.6 billion.'}
              </p>
              <p>
                {isRo
                  ? 'Asigurările generale (non-life) totalizează 19,09 miliarde RON (81,5% din piață: 15,70 mld. ASF + 3,39 mld. sucursale UE), fiind dominate de liniile auto (RCA și CASCO). Asigurările de viață au înregistrat 4,34 miliarde RON (18,5% din piață), iar volumul total al indemnizațiilor brute plătite asiguraților și beneficiarilor de către companii și sucursale a atins 10,6 miliarde RON (+24% an-la-an conform sintezei executive ASF).'
                  : 'Non-life insurance totaled RON 19.09 billion (81.5% of total market: 15.70B domestic + 3.39B EU branches), driven by motor classes (MTPL and CASCO). Life insurance reached RON 4.34 billion (18.5% of market), while total gross claims and indemnities paid by insurers and branches rose to RON 10.6 billion (+24% YoY per ASF executive summary).'}
              </p>
            </div>
          </div>

          {/* Detailed Indicator Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {HEADLINE_MARKET_INDICATORS.map((indicator) => (
              <div
                key={indicator.id}
                className="bg-white border border-zinc-200/80 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-300 shadow-sm transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      {isRo ? indicator.nameRo : indicator.nameEn}
                    </span>
                    {indicator.yoyChange && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {indicator.yoyChange}
                      </span>
                    )}
                  </div>
                  <div className="text-2xl sm:text-3xl font-heading font-bold text-zinc-900 tracking-tight">
                    {indicator.value}
                  </div>
                  <div className="text-xs text-zinc-500 font-medium">
                    {indicator.unit} • <span className="text-zinc-400">{indicator.period}</span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed pt-2 border-t border-zinc-100">
                    {isRo ? indicator.descriptionRo : indicator.descriptionEn}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
                  <span className="font-semibold text-zinc-700">{indicator.sourceName}</span>
                  <a
                    href={indicator.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 font-medium"
                  >
                    {isRo ? 'Sursă Oficială' : 'Primary Source'}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MARKET SEGMENTS BREAKDOWN */}
      {activeTab === 'segments' && (
        <div className="space-y-8">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-blue-600" />
              {isRo ? 'Ponderea Liniilor de Asigurare în Volumul Total (23,40 mld. RON)' : 'Insurance Segment Breakdown by Volume'}
            </h2>
            <p className="text-zinc-600 text-sm">
              {isRo
                ? 'Distribuția primelor brute subscrise reflectă o dependență ridicată de produsele obligatorii de răspundere auto, concomitent cu o dezvoltare graduală a segmentelor de proprietăți, sănătate și viață.'
                : 'Gross written premium distribution highlights high concentration in mandatory motor lines, alongside gradual expansion in property, health, and life protection.'}
            </p>

            {/* Visual breakdown horizontal bar */}
            <div className="space-y-3 pt-2">
              <div className="w-full h-8 rounded-xl overflow-hidden flex shadow-inner border border-zinc-200">
                {MARKET_SEGMENT_SHARES.map((seg, idx) => (
                  <div
                    key={idx}
                    style={{ width: `${seg.sharePercent}%`, backgroundColor: seg.color }}
                    title={`${isRo ? seg.categoryRo : seg.categoryEn}: ${seg.sharePercent}% (${seg.volumeRonBillion} mld. RON)`}
                    className="h-full transition-all duration-300 hover:opacity-90 relative group"
                  />
                ))}
              </div>

              {/* Segment Legend Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-4">
                {MARKET_SEGMENT_SHARES.map((seg, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-zinc-50 border border-zinc-200/80 rounded-xl flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-3.5 h-3.5 rounded-md shrink-0 shadow-xs" style={{ backgroundColor: seg.color }} />
                      <span className="font-semibold text-zinc-800 truncate">
                        {isRo ? seg.categoryRo : seg.categoryEn}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-zinc-900 block">{seg.sharePercent}%</span>
                      <span className="text-[11px] text-zinc-500">{seg.volumeRonBillion} mld. RON</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MOTOR & RCA */}
      {activeTab === 'auto_rca' && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900 flex items-center gap-2">
              <Car className="w-5 h-5 text-blue-600" />
              {isRo ? 'Indicatorii Pieței Auto: RCA & CASCO' : 'Motor Market Indicators: MTPL & CASCO'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-zinc-700">
              <div className="p-5 bg-zinc-50 border border-zinc-200/80 rounded-xl space-y-3">
                <h3 className="font-bold text-zinc-900 text-base">
                  {isRo ? 'Dinamica RCA (Clasa A10)' : 'MTPL Dynamics (Class A10)'}
                </h3>
                <p className="leading-relaxed text-zinc-600">
                  {isRo
                    ? 'Polițele de răspundere civilă auto au generat ~10,5 miliarde RON în subscrieri totale la nivelul pieței. Rata combinată a daunei a rămas aproape de 100%, influențată de frecvența ridicată a accidentelor rutiere din România (printre cele mai ridicate din UE) și de creșterea prețurilor la piese și manoperă.'
                    : 'MTPL policies generated ~RON 10.5 billion in total market subscriptions. Combined ratios hovered around 100%, driven by elevated road accident frequencies in Romania and escalating repair labor rates.'}
                </p>
                <div className="pt-2 text-xs text-blue-700 font-semibold">
                  {isRo ? 'Daună Medie RCA: 10.450 RON / eveniment material' : 'Average MTPL Claim: 10,450 RON'}
                </div>
              </div>

              <div className="p-5 bg-zinc-50 border border-zinc-200/80 rounded-xl space-y-3">
                <h3 className="font-bold text-zinc-900 text-base">
                  {isRo ? 'Decontarea Directă & CASCO' : 'Direct Settlement & CASCO'}
                </h3>
                <p className="leading-relaxed text-zinc-600">
                  {isRo
                    ? 'Clauza de decontare directă pe RCA și polițele facultative CASCO au înregistrat un interes crescut în rândul șoferilor care doresc repararea rapidă a autovehiculului la propriul asigurător, fără a depinde de solvabilitatea sau viteza de reacție a asigurătorului vinovatului.'
                    : 'Direct settlement riders and comprehensive CASCO covers saw expanded adoption among policyholders seeking fast claims settlement directly through their chosen insurer.'}
                </p>
                <div className="pt-2 text-xs text-blue-700 font-semibold">
                  {isRo ? 'Volum CASCO: ~3,85 miliarde RON' : 'CASCO Volume: ~RON 3.85 Billion'}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Link
                href="/servicii/rca-insurance"
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                {isRo ? 'Consultanță & Servicii RCA / CASCO' : 'Explore MTPL / CASCO Services'}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PROPERTY & PAD */}
      {activeTab === 'property_pad' && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              {isRo ? 'Asigurările de Locuințe: Obligatoriu (PAD) vs. Facultativ' : 'Home Insurance: Mandatory PAD vs. Comprehensive'}
            </h2>
            <div className="space-y-4 text-sm text-zinc-700 leading-relaxed">
              <p>
                {isRo
                  ? 'Conform datelor oficiale raportate de PAID România (Pool-ul de Asigurare Împotriva Dezastrelor Naturale), numărul polițelor PAD active a atins ~2,21 milioane de locuințe, reprezentând un grad de cuprindere de 22,4% din fondul locativ rezidențial național (~9,6 milioane unități).'
                  : 'According to official PAID Romania data, active mandatory PAD policies stood at ~2.21 million residential properties, representing a national penetration rate of 22.4% out of ~9.6 million total housing units.'}
              </p>

              <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs sm:text-sm space-y-2">
                <div className="font-bold text-amber-800 flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0" />
                  {isRo ? 'Deficitul de Protecție Catastrofică (Protection Gap):' : 'The Disaster Protection Gap:'}
                </div>
                <p className="text-amber-800/90 leading-relaxed">
                  {isRo
                    ? 'Peste 77% din locuințele din România nu dețin nicio formă de protecție financiară în caz de cutremur sau inundații majore. În plus, pentru locuințele asigurate exclusiv prin PAD (plafon 20.000 EUR pentru tip A), diferența până la valoarea reală de reconstrucție (frecvent peste 100.000 EUR) rămâne descoperită fără o asigurare facultativă suplimentară.'
                    : 'Over 77% of Romanian homes possess no financial catastrophe protection. Furthermore, for properties with PAD only (EUR 20,000 ceiling), the difference to true rebuilding cost remains completely uncovered without supplementary voluntary insurance.'}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-4">
              <Link
                href="/harta-risc-seismic-bucuresti"
                className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 hover:text-amber-800 hover:underline"
              >
                {isRo ? 'Verifică Risc Seismic Imobil București' : 'Check Bucharest Seismic Risk'}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/servicii/home-insurance"
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                {isRo ? 'Ghid Asigurare Locuință & Bunuri' : 'Home Insurance Guide'}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: HEALTH & LIFE */}
      {activeTab === 'health_life' && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900 flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-blue-600" />
              {isRo ? 'Sănătate & Viață: Dinamica Beneficiilor de Personal' : 'Health & Life Insurance: Corporate Benefits Surge'}
            </h2>
            <div className="space-y-4 text-sm text-zinc-700 leading-relaxed">
              <p>
                {isRo
                  ? 'Segmentul asigurărilor voluntare de sănătate a consemnat o creștere de +19,4% a primelor brute subscrise, susținut în mod preponderent de pachetele corporate negociate de angajatori pentru retenția talentelor. Facilitatea fiscală de 400 EUR/an/angajat (neimpozabilă și scutită de CAS/CASS conform Art. 76 și 142 din Codul Fiscal) reprezintă principalul catalizator al acestei tranziții.'
                  : 'Voluntary health insurance recorded a +19.4% YoY surge in gross written premiums, driven predominantly by corporate group policies for employee retention, supported by the Fiscal Code EUR 400 annual non-taxable allowance.'}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <Link
                href="/asigurare-sanatate-angajati"
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                {isRo ? 'Ghid Fiscal & Solicitare Ofertă Sănătate Angajați' : 'Explore Corporate Health Benefits'}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: TRENDS & OUTLOOK */}
      {activeTab === 'trends' && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              {isRo ? 'Tendințe Structurale și Concluzii de Piață' : 'Structural Market Trends & Strategic Outlook'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {MARKET_TRENDS_ANALYSIS.map((trend) => (
                <div
                  key={trend.id}
                  className="p-5 bg-zinc-50 border border-zinc-200/80 rounded-xl space-y-2.5"
                >
                  <h3 className="font-bold text-zinc-900 text-sm sm:text-base">
                    {isRo ? trend.titleRo : trend.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {isRo ? trend.summaryRo : trend.summaryEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: OFFICIAL SOURCES REGISTER */}
      {activeTab === 'sources' && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              {isRo ? 'Registrul Oficial al Surselor Primare de Date' : 'Official Primary Source Register & Provenance'}
            </h2>
            <p className="text-zinc-600 text-sm">
              {isRo
                ? 'Toate datele statistice prezentate în acest raport provin exclusiv din publicațiile autorităților de reglementare și ale organismelor de specialitate din România.'
                : 'All statistical data published in this report are sourced exclusively from official regulatory reports and industry bodies.'}
            </p>

            <div className="space-y-4">
              {OFFICIAL_SOURCES.map((src) => (
                <div
                  key={src.id}
                  className="p-5 bg-zinc-50 border border-zinc-200/80 rounded-xl space-y-2 text-xs sm:text-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200/60 pb-3">
                    <span className="font-bold text-zinc-900 text-sm sm:text-base">
                      {src.institution}
                    </span>
                    <span className="text-zinc-500 text-xs">
                      {isRo ? 'Verificat: ' : 'Verified: '}
                      <strong className="text-zinc-700">{src.verifiedDate}</strong>
                    </span>
                  </div>

                  <div className="text-zinc-800 font-medium">
                    {src.reportTitle} {src.tableRef && <span className="text-zinc-500 font-normal">• {src.tableRef}</span>}
                  </div>

                  <p className="text-zinc-600 text-xs leading-relaxed">
                    {isRo ? src.scopeRo : src.scopeEn}
                  </p>

                  <div className="pt-2">
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1.5 font-medium text-xs"
                    >
                      {isRo ? 'Accesează documentul oficial' : 'Access official source page'}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER DISCLAIMER */}
      <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-6 text-center text-xs text-zinc-500 space-y-2">
        <p>
          {isRo
            ? 'Raport editorial independent realizat de Cristian Văduva Premium Insurance Advisory. Datele sunt agregate din rapoartele publice ASF, BAAR, PAID și UNSAR. Acest material are caracter informativ și statistic.'
            : 'Independent editorial report compiled by Cristian Văduva Premium Insurance Advisory. Data aggregated from official public publications of ASF, BAAR, PAID, and UNSAR.'}
        </p>
      </div>
    </div>
  );
}
