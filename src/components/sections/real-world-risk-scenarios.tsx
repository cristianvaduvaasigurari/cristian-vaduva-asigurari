"use client";

import * as React from "react";
import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  riskScenarios,
  RiskCategory,
  AssetPersona,
  RiskScenario
} from "@/data/riskScenariosData";

export type ScenarioVisual = {
  image: string;
  alt: string;
};

// 100% EXPLICIT SCENARIO-LEVEL VISUAL MAPPING — 37 UNIQUE SEMANTIC DIRECTIONS
export const SCENARIO_VISUALS: Record<string, ScenarioVisual> = {
  // ─── 01. CASCO (4 Scenarios) ───
  "casco-headlight-sensor": {
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    alt: "Avariere far Matrix LED și senzor frontal de distanță pe vehicul premium"
  },
  "casco-parking-hit-run": {
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80",
    alt: "Acroșaj uși laterale și caroserie în parcare rezidențială fără autor"
  },
  "casco-severe-hail": {
    image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1200&q=80",
    alt: "Furtună violentă cu bucăți mari de grindină peste parbriz și plafon"
  },
  "casco-total-theft": {
    image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80",
    alt: "Loc de parcare gol noaptea în fața locuinței după furtul total al vehiculului"
  },

  // ─── 02. RCA (3 Scenarios) ───
  "rca-multi-car-chain": {
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    alt: "Coliziune multiplă în lanț pe bulevard aglomerat cauzată de distragere"
  },
  "rca-commercial-truck-impact": {
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    alt: "Impact cu utilitară comercială de distribuție și avarierea mărfii din interior"
  },
  "rca-bodily-injury-third-party": {
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80",
    alt: "Intervenție medicală de urgență pentru vătămarea corporală a pasagerilor terți"
  },

  // ─── 03. HOME INSURANCE (3 Scenarios) ───
  "home-water-pipe-leak": {
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    alt: "Conductă spartă și inundație gravă în apartament cu daune la vecini"
  },
  "home-kitchen-electrical-fire": {
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    alt: "Incendiu izbucnit în bucătărie din scurtcircuit cu fum toxic pe interior"
  },
  "home-roof-storm-damage": {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    alt: "Acoperiș distrus de furtună extremă și panouri fotovoltaice smulse"
  },

  // ─── 04. TRAVEL INSURANCE (3 Scenarios) ───
  "travel-medical-emergency-abroad": {
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1200&q=80",
    alt: "Evacuare cu elicopter de urgență după accident pe pârtie de schi în străinătate"
  },
  "travel-lost-luggage-business": {
    image: "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?auto=format&fit=crop&w=1200&q=80",
    alt: "Bagaj de călătorie rătăcit pe banda aeroportului la escală transcontinentală"
  },
  "travel-storno-cancellation": {
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    alt: "Panou de plecări aeroport cu zbor anulat din urgență medicală de familie"
  },

  // ─── 05. ACCIDENT INSURANCE (3 Scenarios) ───
  "accident-temporary-disability": {
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    alt: "Fractură severă de gleznă cu cârje și perioada de imobilizare la pat"
  },
  "accident-permanent-disability": {
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80",
    alt: "Adaptare spațiu locativ pentru mobilitate redusă după invaliditate permanentă"
  },
  "accident-surgery-hospitalization": {
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    alt: "Bloc operator ortopedic pentru operație complexă după accident de agrement"
  },

  // ─── 06. LIFE INSURANCE (2 Scenarios) ───
  "life-family-income-mortgage": {
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80",
    alt: "Protecția capitalului familiei și acoperirea creditului ipotecar"
  },
  "life-key-person-business": {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    alt: "Scaun de asociat cheie rămas vacant în sala de consiliu a firmei"
  },

  // ─── 07. HEALTH INSURANCE (3 Scenarios) ───
  "health-private-network-access": {
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    alt: "Scaner RMN de înaltă rezoluție în clinică medicală privat"
  },
  "health-international-surgery": {
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    alt: "Spital privat specializat din străinătate pentru chirurgie complexă"
  },
  "health-family-prevention-dental": {
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    alt: "Cabinet stomatologic privat de prevenție și urgențe dentare pentru familie"
  },

  // ─── 08. IMM & BUSINESS (4 Scenarios) ───
  "imm-business-interruption": {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    alt: "Spațiu comercial închis și activitate sistată timp de 6 săptămâni"
  },
  "imm-stock-equipment-water-damage": {
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    alt: "Servere IT și stocuri de marfă distruse de inundația depozitului"
  },
  "imm-premises-liability-customer": {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    alt: "Scări și podea alunecoasă în showroom unde un client s-a accidentat"
  },
  "imm-machinery-breakdown": {
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    alt: "Modul electronic al unui utilaj industrial CNC avariat de supratensiune"
  },

  // ─── 09. CORPORATE & RĂSPUNDERI (3 Scenarios) ───
  "corporate-professional-indemnity": {
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    alt: "Notificare legală de daune corporate pentru eroare de calcul tehnic"
  },
  "corporate-visitor-injury-industrial": {
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80",
    alt: "Hală industrială unde un auditor extern a suferit un accident de muncă"
  },
  "corporate-third-party-property-damage": {
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    alt: "Tablou electric și rețea de date avariate accidental în sediul clientului"
  },

  // ─── 10. CYBER RISK (3 Scenarios) ───
  "cyber-ransomware-monday": {
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    alt: "Terminal de server blocate de un atac de criptare ransomware"
  },
  "cyber-data-breach-gdpr": {
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    alt: "Echipă de securitate cibernetică investigând o scurgere de date GDPR"
  },
  "cyber-ceo-fraud-social-engineering": {
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    alt: "Ecran de contabilitate procesând un transfer bancar fals de tip CEO Fraud"
  },

  // ─── 11. D&O — RĂSPUNDEREA MANAGERIALĂ (2 Scenarios) ───
  "dno-shareholder-lawsuit": {
    image: "https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=1200&q=80",
    alt: "Acțiune în instanță deschisă de acționari împotriva conducerii executive"
  },
  "dno-regulatory-investigation-anpc": {
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    alt: "Inspecție a autorităților de reglementare viziând deciziile manageriale"
  },

  // ─── 12. CARGO & GOODS IN TRANSIT (2 Scenarios) ───
  "cargo-overturned-truck-electronics": {
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80",
    alt: "Camion internațional cu echipamente electronice răsturnat pe traseu"
  },
  "cargo-theft-unattended-parking": {
    image: "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1200&q=80",
    alt: "Camion de marfă cu prelata tăiată în parcare de pe traseu pe timp de noapte"
  },

  // ─── 13. CONSTRUCTION & PROJECTS — CAR (2 Scenarios) ───
  "construction-formwork-collapse": {
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80",
    alt: "Eșafodaj de betonare prăbușit pe șantier peste utilaje de construcții"
  },
  "construction-utility-damage-neighbors": {
    image: "https://images.unsplash.com/photo-150337762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    alt: "Săpătură adâncă de fundație cauzând fisuri clădirii vecine"
  }
};

// Strict scenario-level visual lookup (No silent generic fallback)
function getScenarioVisual(scenarioId: string): ScenarioVisual {
  const visual = SCENARIO_VISUALS[scenarioId];
  if (visual) {
    return visual;
  }
  return {
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    alt: "Model de risc neprecizat"
  };
}

// Zero-dependency SVG Icon renderer with strict aria attributes and inline display styling
function SvgIcon({ name, className = "w-4 h-4" }: { name: string; className?: string }) {
  const props = {
    className: `inline-block shrink-0 align-middle ${className}`,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    "aria-hidden": true
  };

  switch (name) {
    case "Car":
      return (
        <svg {...props}>
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
          <path d="M5 17h10" />
        </svg>
      );
    case "Home":
      return (
        <svg {...props}>
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case "Users":
      return (
        <svg {...props}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "Activity":
      return (
        <svg {...props}>
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      );
    case "Plane":
      return (
        <svg {...props}>
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z" />
        </svg>
      );
    case "Briefcase":
      return (
        <svg {...props}>
          <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          <rect width="20" height="14" x="2" y="6" rx="2" />
        </svg>
      );
    case "UserCheck":
      return (
        <svg {...props}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <polyline points="16 11 18 13 22 9" />
        </svg>
      );
    case "Building":
      return (
        <svg {...props}>
          <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
        </svg>
      );
    case "ShieldCheck":
      return (
        <svg {...props}>
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "ShieldAlert":
      return (
        <svg {...props}>
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
      );
    case "CloudRain":
      return (
        <svg {...props}>
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
          <path d="M16 14v6M8 14v6M12 16v6" />
        </svg>
      );
    case "Key":
      return (
        <svg {...props}>
          <circle cx="7.5" cy="15.5" r="5.5" />
          <path d="m21 2-9.6 9.6M15.5 7.5l3 3" />
        </svg>
      );
    case "Truck":
      return (
        <svg {...props}>
          <rect width="9" height="11" x="1" y="3" rx="1" />
          <path d="M10 8h4l3 3v5h-7V8z" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="14.5" cy="18.5" r="2.5" />
        </svg>
      );
    case "HeartPulse":
      return (
        <svg {...props}>
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
        </svg>
      );
    case "Droplets":
      return (
        <svg {...props}>
          <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19L7 7.25l-2.29 1.81C3.57 9.99 3 11.09 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
          <path d="M17 21c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19l-2.29-1.81-2.29 1.81c-1.14.93-1.71 2.03-1.71 3.19 0 2.22 1.8 4.05 4 4.05z" />
        </svg>
      );
    case "Flame":
      return (
        <svg {...props}>
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z" />
        </svg>
      );
    case "CalendarX":
      return (
        <svg {...props}>
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
          <path d="m14 14-4 4M10 14l4 4" />
        </svg>
      );
    case "Heart":
      return (
        <svg {...props}>
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      );
    case "Building2":
      return (
        <svg {...props}>
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
          <path d="M6 12H4a2 2 0 0 0-2 2v8h4M18 9h2a2 2 0 0 1 2 2v11h-4M10 6h4M10 10h4M10 14h4M10 18h4" />
        </svg>
      );
    case "Stethoscope":
      return (
        <svg {...props}>
          <path d="M4.8 2.3A.3.3 0 0 0 4.5 2.6V7a5 5 0 0 0 10 0V2.6a.3.3 0 0 0-.3-.3h-.4a.3.3 0 0 0-.3.3V7a4 4 0 0 1-8 0V2.6a.3.3 0 0 0-.3-.3h-.4z" />
          <path d="M9.5 12v6.5a2.5 2.5 0 0 0 5 0V17" />
          <circle cx="14.5" cy="17" r="2.5" />
        </svg>
      );
    case "Globe":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
        </svg>
      );
    case "TrendingDown":
      return (
        <svg {...props}>
          <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
          <polyline points="16 17 22 17 22 11" />
        </svg>
      );
    case "Server":
      return (
        <svg {...props}>
          <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
          <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
          <line x1="6" x2="6.01" y1="6" y2="6" />
          <line x1="6" x2="6.01" y1="18" y2="18" />
        </svg>
      );
    case "Zap":
      return (
        <svg {...props}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "Scale":
      return (
        <svg {...props}>
          <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
          <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
          <path d="M7 21h10M12 3v18M3 7h18" />
        </svg>
      );
    case "AlertTriangle":
      return (
        <svg {...props}>
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <line x1="12" x2="12" y1="9" y2="13" />
          <line x1="12" x2="12.01" y1="17" y2="17" />
        </svg>
      );
    case "Wrench":
      return (
        <svg {...props}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case "Lock":
      return (
        <svg {...props}>
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case "CreditCard":
      return (
        <svg {...props}>
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
      );
    case "FileText":
      return (
        <svg {...props}>
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8" />
        </svg>
      );
    case "Package":
      return (
        <svg {...props}>
          <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
          <path d="M12 22V12M3.3 7l8.7 5 8.7-5M7.5 4.27l9 5.15" />
        </svg>
      );
    case "Compass":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
    case "ArrowRight":
      return (
        <svg {...props}>
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      );
    case "X":
      return (
        <svg {...props}>
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      );
    case "ChevronRight":
      return (
        <svg {...props}>
          <path d="m9 18 6-6-6-6" />
        </svg>
      );
    case "ChevronDown":
      return (
        <svg {...props}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        </svg>
      );
  }
}

export type ProtectionFilterId =
  | "all"
  | "auto"
  | "home"
  | "goods"
  | "family"
  | "life"
  | "health"
  | "accident"
  | "travel"
  | "imm"
  | "malpractice"
  | "liability"
  | "dno"
  | "cyber"
  | "cargo"
  | "construction"
  | "equipment"
  | "team";

export interface ProtectionFilterOption {
  id: ProtectionFilterId;
  label: string;
  sublabel?: string;
  icon: string;
  href: string;
  isPrimary?: boolean;
  categories: RiskCategory[];
  personas?: AssetPersona[];
  tags?: string[];
}

export const PROTECTION_FILTERS: ProtectionFilterOption[] = [
  { id: "all", label: "Toate Scenariile", sublabel: "37 scenarii complete", icon: "ShieldCheck", href: "/servicii", isPrimary: true, categories: [] },
  { id: "auto", label: "Auto & Flotă", sublabel: "CASCO & RCA", icon: "Car", href: "/servicii/casco-insurance", isPrimary: true, categories: ["casco", "rca"], personas: ["car"] },
  { id: "home", label: "Proprietate & Casă", sublabel: "Clădiri & Imobile", icon: "Home", href: "/servicii/home-insurance", isPrimary: true, categories: ["home"], personas: ["home"] },
  { id: "life", label: "Asigurări de Viață", sublabel: "Venit & Capital", icon: "Heart", href: "/servicii/life-insurance", isPrimary: true, categories: ["life"] },
  { id: "health", label: "Sănătate & Spital", sublabel: "Servicii Medicale", icon: "Activity", href: "/servicii/health-insurance", isPrimary: true, categories: ["health"], personas: ["health"] },
  { id: "travel", label: "Călatorii & Travel", sublabel: "Vacanțe & Business", icon: "Plane", href: "/servicii/travel-insurance", isPrimary: true, categories: ["travel"], personas: ["travel"] },
  { id: "imm", label: "Afacerea & IMM", sublabel: "Bunuri & Activitate", icon: "Briefcase", href: "/servicii/imm-insurance", isPrimary: true, categories: ["imm"], personas: ["business"] },
  
  // Secondary categories revealed in expanded view
  { id: "goods", label: "Bunuri Personale", sublabel: "Valori Interior", icon: "Package", href: "/servicii/personal-goods-insurance", categories: ["home"] },
  { id: "family", label: "Familia & Venitul", sublabel: "Protecție Financiară", icon: "Users", href: "/servicii/life-insurance-capitalizare", categories: ["life", "accident"], personas: ["family"] },
  { id: "accident", label: "Accidente Personale", sublabel: "Invaliditate & Spital", icon: "HeartPulse", href: "/servicii/accident-insurance", categories: ["accident"] },
  { id: "malpractice", label: "Malpraxis Medical", sublabel: "Erori Profesionale", icon: "Scale", href: "/servicii/business-malpractice-insurance", categories: ["imm", "corporate"], tags: ["malpraxis", "profesional"] },
  { id: "liability", label: "Răspundere Civilă", sublabel: "Daune Terți", icon: "ShieldAlert", href: "/servicii/business-general-liability", categories: ["imm", "corporate", "rca"], tags: ["răspundere", "terți"] },
  { id: "dno", label: "Directori & D&O", sublabel: "Governance", icon: "UserCheck", href: "/servicii/business-directors-liability", categories: ["dno"] },
  { id: "cyber", label: "Cyber Risk", sublabel: "Atacuri & Data Breach", icon: "Lock", href: "/servicii/business-cyber-insurance", categories: ["cyber"] },
  { id: "cargo", label: "Cargo & Transport", sublabel: "Transport Logistic", icon: "Truck", href: "/servicii/business-cargo-insurance", categories: ["cargo"] },
  { id: "construction", label: "Șantier & CAR", sublabel: "Construcții Imobile", icon: "Building", href: "/servicii/business-construction-insurance", categories: ["construction"], personas: ["projects"] },
  { id: "equipment", label: "Utilaje & Echipament", sublabel: "Avarii Accidentale", icon: "Wrench", href: "/servicii/business-equipment-insurance", categories: ["imm", "construction"], tags: ["echipament", "utilaj"] },
  { id: "team", label: "Angajați & Echipa", sublabel: "Beneficii Corporate", icon: "Users", href: "/servicii/health-insurance-corporate", categories: ["corporate", "health"], personas: ["employees"] }
];

// Explicit Category Portfolio Visual Asset Mapping (18 Unique High-Resolution Directions)
export const CATEGORY_PORTFOLIO_VISUALS: Record<ProtectionFilterId, { image: string; alt: string }> = {
  all: {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    alt: "Portofoliu complet de protecție financiară și patrimoniu"
  },
  auto: {
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    alt: "Flotă auto și vehicule premium"
  },
  home: {
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    alt: "Proprietate rezidențială și clădiri"
  },
  life: {
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80",
    alt: "Protecția vieții și capitalului familial"
  },
  health: {
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    alt: "Servicii medicale și sănătate privată"
  },
  travel: {
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    alt: "Călatorii de afaceri și vacanțe"
  },
  imm: {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    alt: "Afaceri, IMM și active comerciale"
  },
  goods: {
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    alt: "Bunuri personale și valori din interior"
  },
  family: {
    image: "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&w=1200&q=80",
    alt: "Familia și continuitatea veniturilor"
  },
  accident: {
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    alt: "Accidente personale și spitalizare"
  },
  malpractice: {
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    alt: "Malpraxis medical și erori profesionale"
  },
  liability: {
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    alt: "Răspundere civilă legală față de terți"
  },
  dno: {
    image: "https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=1200&q=80",
    alt: "Răspunderea managerială a directorilor (D&O)"
  },
  cyber: {
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    alt: "Protecție cyber risk și securitate IT"
  },
  cargo: {
    image: "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1200&q=80",
    alt: "Cargo și transport internațional de marfă"
  },
  construction: {
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80",
    alt: "Șantiere și proiecte de construcții imobiliare"
  },
  equipment: {
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    alt: "Utilaje industriale și echipamente de producție"
  },
  team: {
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    alt: "Echipă corporate și beneficii angajați"
  }
};

interface RealWorldRiskScenariosProps {
  isHomePagePreview?: boolean;
}

export function RealWorldRiskScenarios({ isHomePagePreview = false }: RealWorldRiskScenariosProps) {
  const [activeFilter, setActiveFilter] = useState<ProtectionFilterId>("all");
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState<boolean>(false);
  const [activeScenario, setActiveScenario] = useState<RiskScenario | null>(null);
  
  // Exposure calculator state
  const [exposureAssetType, setExposureAssetType] = useState<"auto" | "home" | "income" | "business" | "project">("auto");
  const [assetValueEUR, setAssetValueEUR] = useState<number>(65000);

  const modalContainerRef = useRef<HTMLDivElement>(null);

  const formatCurrency = (val: number) => {
    if (isNaN(val) || val === null || val === undefined) return "0 €";
    return new Intl.NumberFormat("ro-RO", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0
    }).format(val);
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeScenario) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeScenario]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeScenario) {
        setActiveScenario(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeScenario]);

  // Helper to compute scenario count for any filter option
  const getFilterCount = (filter: ProtectionFilterOption) => {
    if (filter.id === "all") return riskScenarios.length;
    return riskScenarios.filter((sc) => {
      const matchCategory = filter.categories.includes(sc.category);
      const matchPersona = filter.personas ? filter.personas.some((p) => sc.assetPersona.includes(p)) : false;
      const matchTag = filter.tags ? filter.tags.some((t) => sc.tags.some((sTag) => sTag.toLowerCase().includes(t.toLowerCase()))) : false;
      return matchCategory || matchPersona || matchTag;
    }).length;
  };

  const selectedFilterOption = useMemo(() => {
    return PROTECTION_FILTERS.find((f) => f.id === activeFilter) || PROTECTION_FILTERS[0];
  }, [activeFilter]);

  const filteredScenarios = useMemo(() => {
    if (activeFilter === "all") {
      return isHomePagePreview ? riskScenarios.slice(0, 6) : riskScenarios;
    }

    const list = riskScenarios.filter((sc) => {
      const matchCategory = selectedFilterOption.categories.includes(sc.category);
      const matchPersona = selectedFilterOption.personas ? selectedFilterOption.personas.some((p) => sc.assetPersona.includes(p)) : false;
      const matchTag = selectedFilterOption.tags ? selectedFilterOption.tags.some((t) => sc.tags.some((sTag) => sTag.toLowerCase().includes(t.toLowerCase()))) : false;
      return matchCategory || matchPersona || matchTag;
    });

    if (isHomePagePreview) {
      return list.slice(0, 6);
    }
    return list;
  }, [activeFilter, selectedFilterOption, isHomePagePreview]);

  // Exposure calculation estimations (Educational Bloomberg Private Wealth model)
  const exposureDetails = useMemo(() => {
    switch (exposureAssetType) {
      case "auto":
        return {
          label: "Vehicul Premium / Fleet Auto",
          min: 15000,
          max: 300000,
          step: 5000,
          estimatedLossRatio: 0.12,
          impactLabel: "Reparație Daună Parțială Majoră sau Furt",
          ratioText: "Raport Poliță an vs. Risc Preluat ~ 1 : 25"
        };
      case "home":
        return {
          label: "Locuință, Interior & Bunuri",
          min: 50000,
          max: 1500000,
          step: 25000,
          estimatedLossRatio: 0.25,
          impactLabel: "Inundație Gravă, Incendiu Parțial sau Răspundere Vecini",
          ratioText: "Raport Poliță an vs. Risc Preluat ~ 1 : 350"
        };
      case "income":
        return {
          label: "Venit Anual Familie & Credite",
          min: 20000,
          max: 500000,
          step: 10000,
          estimatedLossRatio: 0.75,
          impactLabel: "Incapacitate de Muncă, Invaliditate sau Deces",
          ratioText: "Raport Poliță an vs. Risc Preluat ~ 1 : 400"
        };
      case "business":
        return {
          label: "Cifră de Afaceri / Valoare IMM",
          min: 100000,
          max: 3000000,
          step: 50000,
          estimatedLossRatio: 0.20,
          impactLabel: "Pauză de Business, Atac Cyber sau Eroare Profesională",
          ratioText: "Raport Poliță an vs. Risc Preluat ~ 1 : 150"
        };
      case "project":
        return {
          label: "Proiect Imobiliar / Șantier (CAR)",
          min: 150000,
          max: 5000000,
          step: 100000,
          estimatedLossRatio: 0.15,
          impactLabel: "Accident Structural, Avariere Vecinătăți sau Intemperii",
          ratioText: "Raport Poliță an vs. Risc Preluat ~ 1 : 200"
        };
    }
  }, [exposureAssetType]);

  const estimatedLossAmount = Math.round(assetValueEUR * exposureDetails.estimatedLossRatio);
  const lossPercentage = Math.round(exposureDetails.estimatedLossRatio * 100);

  // Visible filter options based on expansion state
  const visibleFilterOptions = useMemo(() => {
    if (isCategoriesExpanded) {
      return PROTECTION_FILTERS;
    }
    return PROTECTION_FILTERS.filter((f) => f.isPrimary);
  }, [isCategoriesExpanded]);

  return (
    <section
      id="scenarii-risc"
      style={{ backgroundColor: "#05070A", color: "#F5F5F2" }}
      className="py-24 md:py-36 relative overflow-hidden font-sans border-t border-[#1A3150] w-full max-w-full box-border"
      aria-label="Scenarii Reale de Risc"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 max-w-7xl w-full box-border">
        {/* Luxury Editorial Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24 space-y-6">
          <div
            style={{ backgroundColor: "#09111D", color: "#94A3B8", borderColor: "#1A3150" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border font-mono text-xs uppercase tracking-[0.25em]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] animate-pulse" aria-hidden="true" />
            RISK INTELLIGENCE • PRIVATE WEALTH
          </div>

          <h2 style={{ color: "#F5F5F2" }} className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight leading-[1.08]">
            Când neprevăzutul <br className="hidden sm:inline" />
            <span style={{ color: "#94A3B8" }} className="font-light">devine costisitor.</span>
          </h2>

          <p style={{ color: "#CBD5E1" }} className="text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed pt-2">
            Asigurarea nu este o cheltuială. Este decizia din timp privind{" "}
            <strong style={{ color: "#F5F5F2" }} className="font-semibold underline underline-offset-4 decoration-[#C9A227]">
              cine preia impactul financiar
            </strong>.
          </p>
        </div>

        {/* LAYER 1: LUXURY EDITORIAL PROTECTION PORTFOLIO SELECTOR */}
        <div className="mb-16 max-w-7xl mx-auto w-full box-border">
          {/* SECTION HEADER */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#1A3150] w-full">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#94A3B8] font-semibold block">
                PROTECTION PORTFOLIO
              </span>
              <h3 className="text-2xl md:text-4xl font-bold font-heading text-[#F5F5F0] tracking-tight">
                CE MERITĂ PROTEJAT?
              </h3>
              <p className="text-sm text-[#94A3B8] font-light">
                Selectează ceea ce ai cel mai mult de pierdut.
              </p>
            </div>

            {/* EXPLICIT EDITORIAL NAVIGATION CONTROL */}
            <button
              type="button"
              onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
              className="text-xs font-mono font-semibold text-[#F5F5F0] hover:text-[#C9A227] bg-[#09111D] hover:bg-[#0D1929] border border-[#1A3150] hover:border-[#C9A227]/50 rounded-xl px-5 py-3.5 transition-all flex items-center gap-3 cursor-pointer shadow-xl shrink-0"
            >
              <span className="tracking-wider">{isCategoriesExpanded ? "ÎNCHIDE CATEGORIILE" : "VEZI TOATE CATEGORIILE · 18 ZONE"}</span>
              <SvgIcon name={isCategoriesExpanded ? "ChevronDown" : "ArrowRight"} className="w-4 h-4 text-[#C9A227]" />
            </button>
          </div>

          {/* PORTFOLIO GRID WITH REAL NEXT.JS LINK NAVIGATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-full box-border">
            {visibleFilterOptions.map((filter, fIdx) => {
              const isAnchor = filter.id === "all";
              const count = getFilterCount(filter);
              const formattedIndex = (fIdx + 1).toString().padStart(2, "0");
              const visual = CATEGORY_PORTFOLIO_VISUALS[filter.id] || CATEGORY_PORTFOLIO_VISUALS.all;

              return (
                <Link
                  key={filter.id}
                  href={filter.href}
                  className={`group relative overflow-hidden text-left transition-all duration-700 cursor-pointer focus:outline-none flex flex-col justify-between p-6 md:p-8 bg-[#05070A] w-full max-w-full box-border mx-auto rounded-2xl border border-[#1A3150] sm:border-transparent ${
                    isAnchor
                      ? "md:col-span-2 lg:col-span-2 md:aspect-[21/9] min-h-[220px] sm:min-h-[260px] md:min-h-[340px]"
                      : "md:aspect-[16/10] min-h-[200px] sm:min-h-[220px] md:min-h-[260px]"
                  }`}
                >
                  {/* HIGH VISIBILITY PHOTOGRAPHY CANVAS (80-90% VISUALLY PERCEPTIBLE) */}
                  <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">
                    <Image
                      src={visual.image}
                      alt={visual.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center w-full h-full opacity-95 sm:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                    />
                    {/* Very Light Upper Header Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#05070A]/35 via-transparent to-transparent z-10" />
                    {/* Localized Bottom Text-Safe Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05070A]/90 via-[#05070A]/45 via-30% to-transparent z-10" />
                  </div>

                  {/* TOP INDEX & SUBTITLE REGISTRATION */}
                  <div className="relative z-20 flex items-center justify-between w-full">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-[#E2E8F0] [text-shadow:0_2px_10px_rgba(0,0,0,0.95)]">
                      {filter.sublabel || "PATRIMONIU"}
                    </span>
                    <span className="text-[11px] font-mono text-[#CBD5E1] font-semibold [text-shadow:0_2px_10px_rgba(0,0,0,0.95)]">
                      {formattedIndex} / {PROTECTION_FILTERS.length.toString().padStart(2, "0")}
                    </span>
                  </div>

                  {/* MAIN CATEGORY TITLE & SCENARIO COUNT */}
                  <div className="relative z-20 space-y-2 my-auto pt-6 pb-4 w-full">
                    <h4 className={`font-semibold font-heading text-[#FFFFFF] [text-shadow:0_2px_14px_rgba(0,0,0,0.98),0_1px_4px_rgba(0,0,0,0.95)] leading-snug group-hover:text-[#FDE68A] transition-colors ${
                      isAnchor ? "text-2xl md:text-3xl lg:text-4xl" : "text-xl md:text-2xl"
                    }`}>
                      {filter.label}
                    </h4>

                    {isAnchor && (
                      <p className="text-xs md:text-sm text-[#F1F5F9] font-light max-w-md line-clamp-2 [text-shadow:0_2px_10px_rgba(0,0,0,0.95)]">
                        Portofoliul complet de modele reale de risc și analiză financiară pentru patrimoniu personal și comercial.
                      </p>
                    )}
                  </div>

                  {/* BOTTOM INTERACTION & METADATA ROW */}
                  <div className="relative z-20 pt-4 border-t border-white/20 flex items-center justify-between w-full">
                    <span className="text-xs font-mono text-[#E2E8F0] font-semibold [text-shadow:0_2px_10px_rgba(0,0,0,0.95)]">
                      {count.toString().padStart(2, "0")} {count === 1 ? "SCENARIU" : "SCENARII"}
                    </span>

                    {/* PURE EDITORIAL TEXT LINK INTERACTION */}
                    <div className="text-xs font-mono font-bold flex items-center gap-1.5 transition-all duration-300 text-[#FFFFFF] group-hover:text-[#C9A227] [text-shadow:0_2px_10px_rgba(0,0,0,0.95)]">
                      <span className="group-hover:tracking-wider transition-all">
                        EXPLOREAZĂ
                      </span>
                      <SvgIcon name="ArrowRight" className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Financial Calculator */}
        <div
          style={{ backgroundColor: "#09111D", borderColor: "#1A3150" }}
          className="mb-20 md:mb-28 p-6 sm:p-8 md:p-12 rounded-2xl border shadow-2xl relative overflow-hidden w-full max-w-full box-border"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
            {/* Left Control Panel */}
            <div className="lg:col-span-7 space-y-6 w-full">
              <div>
                <span style={{ color: "#94A3B8" }} className="text-xs uppercase tracking-widest font-mono block mb-1 font-semibold">
                  CALCULEAZĂ EXPUNEREA FINANCIARĂ
                </span>
                <h3 style={{ color: "#F5F5F2" }} className="text-2xl md:text-4xl font-bold font-heading">
                  Ce se întâmplă dacă un singur incident lovește acest activ?
                </h3>
              </div>

              <p style={{ color: "#CBD5E1" }} className="text-xs md:text-sm leading-relaxed font-normal">
                Selectează categoria de patrimoniu și simulează valoarea protejată. Evaluează scara financiară a unei daune majore dintr-un singur eveniment.
              </p>

              {/* Asset Class Selector */}
              <div className="flex flex-wrap gap-2 pt-2 w-full">
                {[
                  { id: "auto", label: "Vehicul Auto" },
                  { id: "home", label: "Locuință & Bunuri" },
                  { id: "income", label: "Venit Familie" },
                  { id: "business", label: "Firma / IMM" },
                  { id: "project", label: "Proiect Șantier" }
                ].map((item) => {
                  const isActive = exposureAssetType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        const type = item.id as "auto" | "home" | "income" | "business" | "project";
                        setExposureAssetType(type);
                        if (type === "auto") setAssetValueEUR(65000);
                        if (type === "home") setAssetValueEUR(250000);
                        if (type === "income") setAssetValueEUR(120000);
                        if (type === "business") setAssetValueEUR(450000);
                        if (type === "project") setAssetValueEUR(750000);
                      }}
                      style={{
                        backgroundColor: isActive ? "#F5F5F2" : "#0D1929",
                        color: isActive ? "#05070A" : "#94A3B8",
                        borderColor: isActive ? "#F5F5F2" : "#1A3150"
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer shrink-0"
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              {/* Asset Value Slider */}
              <div className="space-y-4 pt-3 w-full">
                <div className="flex justify-between items-end w-full">
                  <span style={{ color: "#94A3B8" }} className="text-xs font-semibold uppercase tracking-wider font-mono">
                    VALOAREA ACTIVULUI
                  </span>
                  <div style={{ color: "#F5F5F2" }} className="text-2xl md:text-4xl font-bold font-mono tracking-tight">
                    {formatCurrency(assetValueEUR)}
                  </div>
                </div>

                <input
                  type="range"
                  aria-label={exposureDetails.label}
                  min={exposureDetails.min}
                  max={exposureDetails.max}
                  step={exposureDetails.step}
                  value={assetValueEUR}
                  onChange={(e) => setAssetValueEUR(Number(e.target.value))}
                  style={{ backgroundColor: "#0D1929" }}
                  className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-[#C9A227]"
                />

                <div style={{ color: "#94A3B8" }} className="flex justify-between text-[11px] font-mono font-semibold w-full">
                  <span>{formatCurrency(exposureDetails.min)}</span>
                  <span>{formatCurrency(exposureDetails.max)}</span>
                </div>
              </div>
            </div>

            {/* Right Financial Display */}
            <div
              style={{ backgroundColor: "#05070A", borderColor: "#1A3150" }}
              className="lg:col-span-5 border p-6 md:p-8 rounded-xl flex flex-col justify-between space-y-6 shadow-inner w-full box-border"
            >
              <div>
                <span style={{ color: "#94A3B8" }} className="text-[11px] uppercase tracking-widest font-mono block font-semibold">
                  UN SINGUR INCIDENT • EXPUNERE ESTIMATĂ
                </span>
                <div style={{ color: "#FB7185" }} className="text-3xl md:text-5xl font-bold font-mono tracking-tight mt-3">
                  ~{formatCurrency(estimatedLossAmount)}
                </div>
                <div
                  style={{ backgroundColor: "rgba(244,63,94,0.15)", borderColor: "rgba(244,63,94,0.30)", color: "#FDA4AF" }}
                  className="inline-block mt-2 px-2.5 py-1 rounded border text-xs font-mono font-semibold"
                >
                  ≈ {lossPercentage}% din valoarea totală a activului
                </div>
                <p style={{ color: "#94A3B8" }} className="text-xs mt-3 font-normal leading-relaxed">
                  {exposureDetails.impactLabel}
                </p>
              </div>

              <div
                style={{ backgroundColor: "#0D1929", borderColor: "#1A3150", color: "#F5F5F2" }}
                className="p-4 rounded-xl border text-xs space-y-2.5 font-sans w-full"
              >
                <div className="flex justify-between items-center w-full">
                  <span style={{ color: "#94A3B8" }} className="font-medium">Impact Fără Poliță:</span>
                  <span style={{ color: "#FB7185" }} className="font-bold">Capital propriu</span>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span style={{ color: "#94A3B8" }} className="font-medium">Preluare Risc:</span>
                  <span style={{ color: "#34D399" }} className="font-bold">Poliță Generali</span>
                </div>
                <div style={{ borderColor: "#1A3150", color: "#94A3B8" }} className="pt-2 border-t text-[11px] font-mono font-semibold w-full">
                  {exposureDetails.ratioText}
                </div>
              </div>

              <p style={{ color: "#94A3B8", borderColor: "#C9A227" }} className="text-[11px] italic leading-normal border-l-2 pl-3">
                „Nu calculezi doar prima de asigurare, ci costul acoperirii unei pierderi din fondurile proprii.”
              </p>
            </div>
          </div>
        </div>

        {/* LAYER 2: SCENARIO RESULTS HEADER & ACTION B (RESET FILTER) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#1A3150] w-full">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C9A227]" aria-hidden="true" />
            <div>
              <h3 className="text-lg md:text-xl font-bold font-heading text-[#F5F5F2] uppercase tracking-wide">
                {activeFilter === "all" ? "37 SCENARII DE RISC" : selectedFilterOption.label}
              </h3>
              <span className="text-xs font-mono text-[#94A3B8]">
                {filteredScenarios.length} {filteredScenarios.length === 1 ? "SCENARIU AFISAT" : "SCENARII AFISATE"} DIN 37
              </span>
            </div>
          </div>

          {/* ACTION B: VEZI TOATE CELE 37 DE SCENARII RESET BUTTON */}
          {activeFilter !== "all" && (
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className="text-xs font-mono text-[#C9A227] hover:text-[#F5F5F2] uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>[ VEZI TOATE CELE 37 DE SCENARII → ]</span>
            </button>
          )}
        </div>

        {/* PURE VISUAL ART-DIRECTION — HIGH VISIBILITY CINEMATIC PHOTOGRAPHY GRID (80-90% PERCEPTIBLE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-20 w-full max-w-full box-border">
          {(isHomePagePreview ? filteredScenarios.slice(0, 6) : filteredScenarios).map((sc, index) => {
            const formattedIndex = (index + 1).toString().padStart(2, "0");
            const isFeatured = index === 0;
            const visual = getScenarioVisual(sc.id);

            return (
              <div
                key={sc.id}
                tabIndex={0}
                role="button"
                onClick={() => setActiveScenario(sc)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveScenario(sc);
                  }
                }}
                className={`group relative overflow-hidden bg-[#05070A] transition-all duration-700 cursor-pointer w-full max-w-full box-border mx-auto flex flex-col justify-between focus:outline-none rounded-2xl border border-[#1A3150] sm:border-transparent min-h-[380px] sm:min-h-[420px] md:min-h-[480px] ${
                  isFeatured ? "md:col-span-2 lg:col-span-2 md:aspect-[16/9]" : "md:aspect-[16/10]"
                }`}
              >
                {/* HIGH VISIBILITY PHOTOGRAPHY CANVAS (80-90% VISUALLY PERCEPTIBLE) */}
                <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">
                  <Image
                    src={visual.image}
                    alt={visual.alt || sc.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center w-full h-full opacity-95 sm:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                  />
                  
                  {/* Very Light Upper Header Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#05070A]/35 via-transparent to-transparent z-10" />
                  {/* Localized Bottom Text-Safe Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070A]/90 via-[#05070A]/45 via-30% to-transparent z-10" />
                </div>

                {/* TOP REGISTRATION MARK: MAGAZINE INSCRIPTION & DISCREET CATALOGUE REFERENCE */}
                <div className="relative z-20 p-6 md:p-8 flex items-center justify-between w-full">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.25em] text-[#E2E8F0] [text-shadow:0_2px_10px_rgba(0,0,0,0.95)]">
                    {sc.categoryLabel}
                  </span>
                  <span className="text-[11px] font-mono text-[#CBD5E1] font-semibold [text-shadow:0_2px_10px_rgba(0,0,0,0.95)]">
                    {formattedIndex} / {riskScenarios.length.toString().padStart(2, "0")}
                  </span>
                </div>

                {/* NARRATIVE CORE & EDITORIAL FINANCIAL EXPOSURE (FLOATING DIRECTLY OVER CANVAS) */}
                <div className="relative z-20 p-6 md:p-8 space-y-6 w-full">
                  <div className="space-y-2 w-full">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#FDE68A] font-semibold block [text-shadow:0_2px_10px_rgba(0,0,0,0.95)]">
                      {sc.eyebrow || sc.categoryLabel}
                    </span>

                    <h3 className={`font-medium font-heading text-[#FFFFFF] [text-shadow:0_2px_14px_rgba(0,0,0,0.98),0_1px_4px_rgba(0,0,0,0.95)] leading-snug group-hover:text-[#FDE68A] transition-colors line-clamp-2 ${
                      isFeatured ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
                    }`}>
                      {sc.title}
                    </h3>

                    <p className="text-xs text-[#F1F5F9] font-normal leading-relaxed line-clamp-2 max-w-xl [text-shadow:0_2px_10px_rgba(0,0,0,0.95)]">
                      {sc.situation}
                    </p>
                  </div>

                  {/* EDITORIAL FINANCIAL EXPOSURE & PURE EDITORIAL TEXT LINK (NO BUTTON CONTAINER) */}
                  <div className="flex items-end justify-between gap-4 pt-2 w-full">
                    <div>
                      <span className="text-[9px] font-mono text-[#E2E8F0] uppercase tracking-wider block font-semibold mb-0.5 [text-shadow:0_2px_10px_rgba(0,0,0,0.95)]">
                        EXPOSURE
                      </span>
                      <div className="text-xl md:text-2xl font-bold font-mono text-[#FFFFFF] tracking-tight [text-shadow:0_2px_12px_rgba(0,0,0,0.98)]">
                        {sc.exposure.replace("Expunere financiară ilustrativă: ", "")}
                      </div>
                      <span className="text-[9px] font-mono text-[#FDE68A] font-semibold block uppercase tracking-wider mt-0.5 [text-shadow:0_2px_10px_rgba(0,0,0,0.95)]">
                        HIGH IMPACT • SINGLE-EVENT LOSS
                      </span>
                    </div>

                    {/* PURE EDITORIAL TEXT LINK INTERACTION */}
                    <div className="text-xs font-mono font-bold text-[#FFFFFF] group-hover:text-[#C9A227] flex items-center gap-1.5 transition-all duration-300 pb-1 shrink-0 [text-shadow:0_2px_10px_rgba(0,0,0,0.95)]">
                      <span className="group-hover:tracking-wider transition-all">VEZI SCENARIUL</span>
                      <SvgIcon name="ArrowRight" className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Homepage Preview Navigation Button */}
        {isHomePagePreview && (
          <div className="text-center mb-20 w-full">
            <Link
              href="/scenarii-risc"
              style={{ backgroundColor: "#F5F5F2", color: "#05070A" }}
              className="inline-flex items-center justify-center gap-2 h-13 px-8 text-sm md:text-base font-bold rounded-xl shadow-2xl transition-all hover:bg-[#C9A227]"
            >
              <span>Explorează Toate cele 37 de Scenarii de Risc</span>
              <SvgIcon name="ArrowRight" className="w-5 h-5" />
            </Link>
          </div>
        )}

        {/* Story Reader Modal / 3-Zone Dialog with Fixed Header, Independent Scrollable Content, and Fixed Footer */}
        {activeScenario && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setActiveScenario(null);
              }
            }}
          >
            <div
              ref={modalContainerRef}
              style={{ backgroundColor: "#09111D", borderColor: "#1A3150", color: "#F5F5F2", height: "min(85dvh, 850px)", maxHeight: "85dvh" }}
              className="relative w-full max-w-2xl lg:max-w-3xl flex flex-col border border-[#1A3150] rounded-2xl shadow-2xl overflow-hidden focus:outline-none shrink-0"
              tabIndex={-1}
            >
              {/* SIBLING 1: FIXED MODAL HEADER (OUTSIDE SCROLL CONTAINER) */}
              <div
                style={{ backgroundColor: "#09111D", borderColor: "#1A3150" }}
                className="flex items-center justify-between px-5 py-3.5 sm:px-6 sm:py-4 border-b shrink-0 z-10 w-full"
              >
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-[#0D1929] border border-[#1A3150] text-xs font-mono font-bold text-[#F5F5F2] uppercase tracking-wider flex items-center gap-2">
                    <SvgIcon name={activeScenario.iconName} className="w-3.5 h-3.5 text-[#C9A227]" />
                    <span>{activeScenario.categoryLabel}</span>
                  </span>
                  <span className="text-xs font-mono text-[#94A3B8] font-semibold hidden sm:inline">
                    • Scenariu Ilustrativ
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveScenario(null)}
                  style={{ backgroundColor: "#122238", borderColor: "#1A3150", color: "#F5F5F2" }}
                  className="p-2 sm:p-2.5 rounded-full hover:bg-[#1A3150] transition-colors cursor-pointer border shadow-md shrink-0"
                  aria-label="Închide scenariul"
                >
                  <SvgIcon name="X" className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* SIBLING 2: INDEPENDENT SCROLLABLE CONTENT BODY (THE ONLY SCROLLING ELEMENT) */}
              <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain p-5 sm:p-8 space-y-6 text-[#F5F5F2] touch-pan-y w-full">
                {/* PHOTOGRAPHY HERO (CRISP & HIGHLY PERCEPTIBLE 95-100%) */}
                <div className="relative w-full h-48 sm:h-64 md:h-72 rounded-xl overflow-hidden shrink-0 border border-[#1A3150]">
                  <Image
                    src={getScenarioVisual(activeScenario.id).image}
                    alt={getScenarioVisual(activeScenario.id).alt || activeScenario.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover object-center w-full h-full opacity-95 sm:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09111D]/80 via-[#09111D]/20 to-transparent z-10" />
                </div>

                {/* HEADLINE & EYEBROW */}
                <div className="space-y-1.5 w-full">
                  <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#C9A227] block">
                    {activeScenario.eyebrow}
                  </span>
                  <h3 id="modal-title" className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-[#F5F5F0] leading-snug">
                    {activeScenario.title}
                  </h3>
                </div>

                {/* 5-STEP EDITORIAL RISK BREAKDOWN */}
                <div className="space-y-4 text-xs sm:text-sm md:text-base leading-relaxed font-sans w-full">
                  {/* 01 - Normal Life */}
                  <div style={{ backgroundColor: "#0D1929", borderColor: "#1A3150" }} className="p-4 sm:p-6 rounded-xl border w-full">
                    <div style={{ color: "#94A3B8" }} className="text-xs font-bold uppercase tracking-widest mb-1.5 font-mono">
                      01 — Contextul Inițial (Cotidianul)
                    </div>
                    <p style={{ color: "#F5F5F2" }} className="font-normal">{activeScenario.situation}</p>
                  </div>

                  {/* 02 - Interruption */}
                  <div style={{ backgroundColor: "rgba(245,158,11,0.15)", borderColor: "rgba(245,158,11,0.30)" }} className="p-4 sm:p-6 rounded-xl border w-full">
                    <div style={{ color: "#FCD34D" }} className="text-xs font-bold uppercase tracking-widest mb-1.5 font-mono">
                      02 — Întreruperea Neprevăzută
                    </div>
                    <p style={{ color: "#FFFFFF" }} className="font-normal">{activeScenario.interruption}</p>
                  </div>

                  {/* 03 - Realization */}
                  <div style={{ backgroundColor: "#0D1929", borderColor: "#1A3150" }} className="p-4 sm:p-6 rounded-xl border w-full">
                    <div style={{ color: "#94A3B8" }} className="text-xs font-bold uppercase tracking-widest mb-1.5 font-mono">
                      03 — Momentul Conștientizării
                    </div>
                    <p style={{ color: "#F5F5F2" }} className="font-normal">{activeScenario.realization}</p>
                  </div>

                  {/* 04 - Financial Exposure */}
                  <div style={{ backgroundColor: "rgba(244,63,94,0.15)", borderColor: "rgba(244,63,94,0.30)" }} className="p-4 sm:p-6 rounded-xl border w-full">
                    <div style={{ color: "#FDA4AF" }} className="text-xs font-bold uppercase tracking-widest mb-1.5 font-mono">
                      04 — Impactul & Expunerea Financiară
                    </div>
                    <p style={{ color: "#FFE4E6" }} className="font-bold text-sm sm:text-base md:text-lg">{activeScenario.exposure}</p>
                  </div>

                  {/* 05 - Protection Control */}
                  <div style={{ backgroundColor: "rgba(16,185,129,0.15)", borderColor: "rgba(16,185,129,0.30)" }} className="p-4 sm:p-6 rounded-xl border w-full">
                    <div style={{ color: "#6EE7B7" }} className="text-xs font-bold uppercase tracking-widest mb-1.5 font-mono">
                      05 — Controlul Oferit de Asigurare
                    </div>
                    <p style={{ color: "#D1FAE5" }} className="font-normal">{activeScenario.protection}</p>
                  </div>
                </div>
              </div>

              {/* SIBLING 3: FIXED MODAL FOOTER (OUTSIDE SCROLL CONTAINER WITH SAFE AREA SUPPORT) */}
              <div
                style={{ backgroundColor: "#09111D", borderColor: "#1A3150", paddingBottom: "max(14px, env(safe-area-inset-bottom))" }}
                className="flex flex-col sm:flex-row gap-3 px-5 py-3.5 sm:px-6 sm:py-4 border-t shrink-0 z-10 w-full"
              >
                <Link
                  href={activeScenario.ctaHref}
                  style={{ backgroundColor: "#F5F5F2", color: "#05070A" }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base h-11 sm:h-12 px-6 font-bold rounded-xl shadow-lg transition-all hover:bg-[#C9A227]"
                >
                  <span>{activeScenario.ctaLabel}</span>
                  <SvgIcon name="ArrowRight" className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
                
                <button
                  type="button"
                  style={{ backgroundColor: "#0D1929", color: "#F5F5F2", borderColor: "#1A3150" }}
                  className="w-full sm:w-auto h-11 sm:h-12 px-6 border rounded-xl font-semibold text-xs sm:text-sm transition-colors hover:bg-[#122238]"
                  onClick={() => setActiveScenario(null)}
                >
                  Închide Scenariul
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Global Bottom Conversion Banner & Legal Disclaimer */}
        <div
          style={{ backgroundColor: "#09111D", borderColor: "#1A3150" }}
          className="mt-16 p-8 md:p-14 rounded-2xl border text-center relative overflow-hidden w-full max-w-full box-border"
        >
          <div className="max-w-3xl mx-auto space-y-6 w-full">
            <div
              style={{ backgroundColor: "rgba(201,162,39,0.15)", borderColor: "rgba(201,162,39,0.30)", color: "#C9A227" }}
              className="w-12 h-12 rounded-full border flex items-center justify-center mx-auto mb-2"
            >
              <SvgIcon name="ShieldCheck" className="w-6 h-6" />
            </div>
            <h3 style={{ color: "#F5F5F2" }} className="text-2xl md:text-4xl font-bold font-heading leading-tight">
              „Nu trebuie să asiguri totul. Trebuie doar să înțelegi ce te-ar durea să pierzi.”
            </h3>
            <p style={{ color: "#CBD5E1" }} className="text-sm md:text-base font-normal max-w-xl mx-auto leading-relaxed">
              Programează o analiză discretă a portofoliului tău de riscuri. Cristian Văduva îți va identifica expunerile reale și îți va recomanda soluții optimizate Generali.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full">
              <Link
                href="/contact"
                style={{ backgroundColor: "#F5F5F2", color: "#05070A" }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm md:text-base h-13 px-8 font-bold rounded-xl shadow-xl transition-all hover:scale-105 hover:bg-[#C9A227]"
              >
                <span>Solicită Analiză de Risc Personalizată</span>
                <SvgIcon name="ArrowRight" className="w-5 h-5" />
              </Link>
              <Link
                href="/servicii"
                style={{ backgroundColor: "#0D1929", color: "#F5F5F2", borderColor: "#1A3150" }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm md:text-base h-13 px-8 border rounded-xl font-semibold transition-all hover:bg-[#122238]"
              >
                Vezi Toate Soluțiile de Asigurare
              </Link>
            </div>

            {/* Discreet Legal Compliance Notice */}
            <p style={{ color: "#94A3B8", borderColor: "#1A3150" }} className="text-[11px] font-normal pt-6 border-t leading-relaxed max-w-2xl mx-auto">
              Notă de conformitate: Scenariile prezentate sunt modele ilustrative de risc cu rol educativ și de conștientizare. Acoperirile, excluderile, limitele financiare și condițiile de eligibilitate depind strict de produsul de asigurare ales și de termenii contractuali agreați în polița emisă.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
