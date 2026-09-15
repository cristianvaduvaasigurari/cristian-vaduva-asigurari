"use client";

import * as React from "react";
import Link from "next/link";
import { getPublishedNewsArticles, InsuranceNewsArticle } from "@/data/insuranceNewsData";
import { ArrowUpRight } from "lucide-react";

const FALLBACK_ITEMS = [
  { text: "INSURANCE INTELLIGENCE • ANALIZE ȘI DATE OFICIALE DIN PIAȚA DE ASIGURĂRI", href: "/stiri" },
  { text: "CONSULTANȚĂ SPECIALIZATĂ • AUDIT & DIAGNOSTIC POLIȚE EXISTENTE", href: "#contact" },
  { text: "PARTENER GENERALI ROMÂNIA • PROTECȚIE PATRIMONIALĂ & RISCURI SPECIALE", href: "/despre-mine" }
];

export function TopTicker() {
  const publishedNews = React.useMemo(() => getPublishedNewsArticles(), []);

  const tickerItems = React.useMemo(() => {
    if (publishedNews.length > 0) {
      return publishedNews.map((article: InsuranceNewsArticle) => ({
        id: article.id,
        category: article.categoryLabel,
        title: article.title,
        href: `/stiri/${article.slug}`
      }));
    }
    return FALLBACK_ITEMS.map((item, idx) => ({
      id: `fallback-${idx}`,
      category: "OFICIAL",
      title: item.text,
      href: item.href
    }));
  }, [publishedNews]);

  return (
    <div
      role="region"
      aria-label="Insurance Intelligence Live Ticker"
      className="w-full bg-slate-950 text-slate-300 border-b border-slate-800/80 overflow-hidden relative select-none z-50 h-7 sm:h-8 flex items-center"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes topTickerSlide {
              0% {
                transform: translate3d(0, 0, 0);
              }
              100% {
                transform: translate3d(-50%, 0, 0);
              }
            }
            .top-ticker-track {
              display: inline-flex;
              white-space: nowrap;
              width: max-content;
              animation: topTickerSlide 55s linear infinite;
              will-change: transform;
            }
            .top-ticker-track:hover {
              animation-play-state: paused;
            }
            @media (prefers-reduced-motion: reduce) {
              .top-ticker-track {
                animation: none !important;
                transform: none !important;
              }
            }
          `
        }}
      />

      <div className="top-ticker-track flex items-center">
        {/* Set 1 */}
        <div className="flex items-center shrink-0">
          {tickerItems.map((item, idx) => (
            <span key={`t1-${item.id}-${idx}`} className="inline-flex items-center text-[10px] sm:text-[11px] font-medium tracking-wide text-slate-300">
              <Link
                href={item.href}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors group cursor-pointer"
              >
                <span className="font-bold text-slate-400 group-hover:text-slate-200 transition-colors uppercase text-[9px] sm:text-[10px] tracking-wider px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                  {item.category}
                </span>
                <span className="text-slate-300 group-hover:text-white transition-colors font-medium">
                  {item.title}
                </span>
                <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-slate-300 transition-colors shrink-0" />
              </Link>
              <span className="text-slate-700 font-bold mx-3 sm:mx-4 select-none" aria-hidden="true">•</span>
            </span>
          ))}
        </div>

        {/* Set 2 (Duplicate for seamless infinite loop) */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {tickerItems.map((item, idx) => (
            <span key={`t2-${item.id}-${idx}`} className="inline-flex items-center text-[10px] sm:text-[11px] font-medium tracking-wide text-slate-300">
              <Link
                href={item.href}
                tabIndex={-1}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors group cursor-pointer"
              >
                <span className="font-bold text-slate-400 group-hover:text-slate-200 transition-colors uppercase text-[9px] sm:text-[10px] tracking-wider px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                  {item.category}
                </span>
                <span className="text-slate-300 group-hover:text-white transition-colors font-medium">
                  {item.title}
                </span>
                <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-slate-300 transition-colors shrink-0" />
              </Link>
              <span className="text-slate-700 font-bold mx-3 sm:mx-4 select-none" aria-hidden="true">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
