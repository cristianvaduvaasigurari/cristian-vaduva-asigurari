"use client";

import * as React from "react";

const TICKER_ITEMS = [
  "ASIGURARE AUTO",
  "CASCO",
  "RCA",
  "LOCUINȚĂ & PATRIMONIU",
  "ASIGURARE DE VIAȚĂ",
  "ASIGURARE DE SĂNĂTATE",
  "BUSINESS & IMM",
  "CARGO & TRANSPORT",
  "RĂSPUNDERE PROFESIONALĂ",
  "CYBER RISK",
  "CONSULTANȚĂ & AUDIT POLIȚE",
  "PREVENȚIE RISCURI",
  "PARTENER GENERALI ROMÂNIA"
];

export function TopTicker() {
  return (
    <div
      role="region"
      aria-label="Teme și Servicii de Asigurări"
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
              animation: topTickerSlide 40s linear infinite;
              will-change: transform;
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
          {TICKER_ITEMS.map((item, idx) => (
            <span key={`t1-${idx}`} className="inline-flex items-center text-[10px] sm:text-[11px] font-semibold tracking-wider text-slate-300 uppercase">
              <span>{item}</span>
              <span className="text-slate-600 font-bold mx-3.5 select-none" aria-hidden="true">•</span>
            </span>
          ))}
        </div>

        {/* Set 2 (Duplicate for seamless infinite loop) */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {TICKER_ITEMS.map((item, idx) => (
            <span key={`t2-${idx}`} className="inline-flex items-center text-[10px] sm:text-[11px] font-semibold tracking-wider text-slate-300 uppercase">
              <span>{item}</span>
              <span className="text-slate-600 font-bold mx-3.5 select-none" aria-hidden="true">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
