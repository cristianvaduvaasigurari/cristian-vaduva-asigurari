"use client";



import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, Shield, Car, Briefcase, Building2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { TopTicker } from "@/components/layout/top-ticker";

const megaMenuData = [
  {
    title: "Asigurări Personale",
    icon: <Shield className="w-5 h-5 mb-2 text-blue-600" />,
    items: [
      { name: "Asigurare Locuință", href: "/servicii/home-insurance" },
      { name: "Asigurare Viață", href: "/servicii/life-insurance" },
      { name: "Asigurare Sănătate", href: "/servicii/health-insurance" },
      { name: "Asigurare Accidente", href: "/servicii/accident-insurance" },
    ]
  },
  {
    title: "Auto & Călătorii",
    icon: <Car className="w-5 h-5 mb-2 text-blue-600" />,
    items: [
      { name: "Asigurare RCA", href: "/servicii/rca-insurance" },
      { name: "Asigurare CASCO", href: "/servicii/casco-insurance" },
      { name: "Asigurare Flote Auto", href: "/servicii/fleet-insurance" },
      { name: "Asistență Rutieră", href: "/servicii/roadside-assistance" },
      { name: "Travel Individual", href: "/servicii/travel-insurance-individual" },
      { name: "Travel Familie", href: "/servicii/travel-insurance-family" },
      { name: "Travel Business", href: "/servicii/travel-business-insurance" },
      { name: "Travel Multi-Trip", href: "/servicii/travel-insurance-annual" },
    ]
  },
  {
    title: "Business & Răspunderi",
    icon: <Briefcase className="w-5 h-5 mb-2 text-blue-600" />,
    items: [
      { name: "Asigurări IMM", href: "/servicii/imm-insurance" },
      { name: "Clădiri Comerciale", href: "/servicii/business-building-insurance" },
      { name: "Bunuri Business", href: "/servicii/business-goods-insurance" },
      { name: "Răspundere Generală", href: "/servicii/business-general-liability" },
      { name: "Răspundere Profesională", href: "/servicii/business-professional-liability" },
      { name: "Răspunderea Managerilor (D&O)", href: "/servicii/business-directors-liability" },
      { name: "Malpraxis Medical", href: "/servicii/business-malpractice-insurance" },
      { name: "Audit Riscuri IMM (30 Min)", href: "/audit-riscuri-companii" },
    ]
  },
  {
    title: "Corporate & Speciale",
    icon: <Building2 className="w-5 h-5 mb-2 text-blue-600" />,
    items: [
      { name: "Asigurare Cyber Risk", href: "/servicii/business-cyber-insurance" },
      { name: "Asigurare Cargo (Marfă)", href: "/servicii/business-cargo-insurance" },
      { name: "Asigurare Șantier (CAR)", href: "/servicii/business-construction-insurance" },
      { name: "Asigurare Echipamente", href: "/servicii/business-equipment-insurance" },
      { name: "Business Interruption", href: "/servicii/business-interruption-insurance" },
      { name: "Sănătate Corporate", href: "/servicii/health-insurance-corporate" },
      { name: "Sănătate Angajați (HR)", href: "/asigurare-sanatate-angajati" },
    ]
  }
];

const ecosystemMenuData = [
  {
    title: "Daune & Urgențe",
    items: [
      { name: "Centru Urgențe 24/7", href: "/urgente" },
      { name: "Generator Notificare Daună", href: "/generator-dosar-dauna" },
      { name: "Verificare Documente Daună", href: "/verificare-documente-dauna" },
      { name: "Urmărire Progres Daună", href: "/urmarire-dauna" },
      { name: "Analiză Ofertă Despăgubire", href: "/analiza-despagubire" },
    ],
  },
  {
    title: "Audit & Analiză Polițe",
    items: [
      { name: "Verifică Polița (Audit Gratuit)", href: "/verifica-polita" },
      { name: "Calculator Asigurare & Reconstrucție", href: "/calculator-asigurare" },
      { name: "Comparație Polițe & Clauze", href: "/compara-polite" },
      { name: "Profil de Risc & Audit Nevoi", href: "/profil-risc" },
      { name: "Coverage Gap Analyzer", href: "/gap-analyzer" },
      { name: "Recomandă-mi Asigurarea", href: "/advisor" },
    ],
  },
  {
    title: "Portofoliu & Reînnoiri",
    items: [
      { name: "Harta Portofoliu Asigurări", href: "/harta-asigurarilor" },
      { name: "Calendar Expirări & Reînnoiri", href: "/calendar-asigurari" },
      { name: "Fișă Decizie Reînnoire", href: "/decizie-reinnoire" },
      { name: "Analiză Oferte Reînnoire", href: "/analiza-reinnoire" },
      { name: "Cronologie & Termene Polițe", href: "/termene-polite" },
      { name: "Urmărire Modificări & Addendum", href: "/modificari-polite" },
    ],
  },
  {
    title: "Ghiduri, Cercetare & Glosar",
    items: [
      { name: "Hartă Risc Seismic București", href: "/harta-risc-seismic-bucuresti" },
      { name: "Raportul Anual al Pieței", href: "/raport-piata-asigurarilor" },
      { name: "Glosar Tehnic Asigurări", href: "/glosar-asigurari" },
      { name: "Dosar Pregătire Asigurare", href: "/dosar-asigurare" },
      { name: "Planificare Revizuire Broker", href: "/planificare-revizuire" },
      { name: "Registru Documentare & Dovezi", href: "/registru-documentare" },
      { name: "Ghid Cumpărători Locuință", href: "/cumpar-casa" },
      { name: "Pachet Proprietari Închirieri", href: "/proprietari-inchirieri" },
      { name: "International Clients (EN)", href: "/international-clients" },
    ],
  },
];

// Credits menu links (dropdown similar to mega menu but single column)
const creditsMenuLinks = [
  { name: "Credit Ipotecar", href: "/credite/credit-ipotecar" },
  { name: "Noua Casă", href: "/credite/credit-noua-casa" },
  { name: "Refinanțare", href: "/credite/credit-refinantare" },
  { name: "Credit de Nevoi Personale", href: "/credite/credit-nevoi-personale" },
  { name: "Credit pentru Investiții Imobiliare", href: "/credite/credit-investitii-imobiliare" },
  { name: "Credit pentru Firme", href: "/credite/credit-persoane-juridice" },
  { name: "Compară Bănci", href: "/credite/compara-banci" },
  { name: "De ce să lucrezi cu un Broker de Credite", href: "/credite/de-ce-broker" },
  { name: "Întrebări Frecvente", href: "/credite/faq" },
  { name: "Contact Broker Credite", href: "/credite/contact-broker-credite" },
  { name: "Credit pentru Construcții", href: "/credite/credit-constructii" },
  { name: "Credit Verde", href: "/credite/credit-verde" },
];

const privateClientMenuLinks = [
  { name: "Supercars & Exotics", href: "/private-client/supercars", badge: "Automotive" },
  { name: "Yachts & Superyachts", href: "/private-client/yachts", badge: "Maritime" },
  { name: "Private Aviation", href: "/private-client/private-aviation", badge: "Aviation" },
  { name: "Jewellery & Watches", href: "/private-client/jewellery-watches", badge: "Horology" },
  { name: "Fine Art & Collectibles", href: "/private-client/fine-art-collectibles", badge: "Fine Art" },
  { name: "Luxury Homes & Estates", href: "/private-client/luxury-homes", badge: "Estates" },
  { name: "Personal Collections", href: "/private-client/collections", badge: "Collections" },
  { name: "Private Client Liability", href: "/private-client/private-client-liability", badge: "Liability" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeMobileMegaMenu, setActiveMobileMegaMenu] = React.useState<number | null>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);


  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle clicks outside the mobile menu and Escape key to close menu
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!isMobileMenuOpen) return;
      const target = e.target as Node;
      if (buttonRef.current && buttonRef.current.contains(target)) return;
      if (menuRef.current && menuRef.current.contains(target)) return;
      setIsMobileMenuOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen]);


  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <TopTicker />
      <div
        className={cn(
          "transition-all duration-300 border-b",
          isScrolled || isMobileMenuOpen
            ? "bg-white/95 backdrop-blur-xl border-zinc-200/80 shadow-sm py-3"
            : "bg-white/90 md:bg-white/80 backdrop-blur-md border-zinc-200/60 shadow-xs py-3 md:py-3.5"
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start justify-center gap-0.5 relative z-50">
              <Link href="/" className="font-heading font-bold text-xl tracking-tight leading-none text-zinc-900 flex items-center hover:text-blue-600 transition-colors">
                <Home className="w-5 h-5 mr-1 text-blue-600" />
                Insurance
              </Link>
            </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {/* Private Client Item */}
            <div className="group relative">
              <Link
                href="/private-client"
                className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-zinc-900 hover:text-black transition-colors py-4 uppercase"
              >
                <span>PRIVATE CLIENT</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-zinc-500" />
              </Link>
              <div className="absolute top-full left-0 w-[640px] max-w-[calc(100vw-2.5rem)] bg-[#0c0e12] text-white border border-zinc-800 shadow-2xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left translate-y-4 group-hover:translate-y-0 p-6 z-50">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
                  <div>
                    <div className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">PRIVATE CLIENT DIVISION</div>
                    <div className="text-sm font-bold text-white">Insurance for Extraordinary Assets</div>
                  </div>
                  <Button size="sm" className="rounded-full bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold px-4" asChild>
                    <Link href="/private-client">Explore Division</Link>
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {privateClientMenuLinks.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      className="p-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800/60 transition-colors flex items-center justify-between group/item"
                    >
                      <div>
                        <div className="text-xs font-semibold text-white group-hover/item:text-zinc-100">{item.name}</div>
                        <div className="text-[10px] text-zinc-400">{item.badge}</div>
                      </div>
                      <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-zinc-500 group-hover/item:text-white transition-colors" />
                    </Link>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                  <span>Confidential advisory & bespoke placement</span>
                  <Link href="/private-client/enquiry" className="text-zinc-200 hover:text-white font-medium underline">
                    Confidential Enquiry →
                  </Link>
                </div>
              </div>
            </div>

            {/* Mega Menu Trigger: Asigurări */}
            <div className="group relative">
              <button type="button" aria-expanded="false" aria-haspopup="true" className="flex items-center gap-1 text-sm font-medium text-zinc-700 hover:text-zinc-950 transition-colors py-4">
                Asigurări
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              {/* Mega Menu Dropdown */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] bg-white border border-zinc-200/80 shadow-2xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-4 group-hover:translate-y-0 p-8">
                <div className="grid grid-cols-4 gap-8">
                  {megaMenuData.map((col, i) => (
                    <div key={i} className="flex flex-col">
                      <div className="flex flex-col items-start mb-4 pb-4 border-b border-zinc-100">
                        {col.icon}
                        <h4 className="font-bold text-zinc-900 text-sm tracking-tight">{col.title}</h4>
                      </div>
                      <ul className="space-y-3">
                        {col.items.map((item, j) => (
                          <li key={j}>
                            <Link href={item.href} className="text-sm text-zinc-600 hover:text-blue-600 transition-colors block">
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-zinc-100 flex justify-between items-center bg-zinc-50/80 -mx-8 -mb-8 p-6 rounded-b-2xl">
                  <div className="text-sm text-zinc-600">
                    <span className="font-bold text-zinc-900">Nu ești sigur ce să alegi?</span> Încearcă noul Recomandă-mi Asigurarea Potrivită.
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 rounded-full" asChild>
                    <Link href="/advisor">Deschide Recomandă-mi Asigurarea Potrivită</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Credits Dropdown */}
            <div className="group relative">
              <button type="button" aria-expanded="false" aria-haspopup="true" className="flex items-center gap-1 text-sm font-medium text-zinc-700 hover:text-zinc-950 transition-colors py-4">
                Credite
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white border border-zinc-200/80 shadow-2xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-4 group-hover:translate-y-0 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {/* 🏠 Locuință */}
                  <div>
                    <h4 className="font-semibold text-zinc-900 mb-2">🏠 Locuință</h4>
                    <ul className="space-y-1">
                      {creditsMenuLinks.filter(i => [
                        "Credit Ipotecar",
                        "Noua Casă",
                        "Refinanțare",
                        "Credit pentru Construcții",
                        "Credit Verde"
                      ].includes(i.name)).map((item, i) => (
                        <li key={i}>
                          <Link href={item.href} className="block text-sm text-zinc-600 hover:text-blue-600 transition-colors">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* 💼 Investiții & Business */}
                  <div>
                    <h4 className="font-semibold text-zinc-900 mb-2">💼 Investiții & Business</h4>
                    <ul className="space-y-1">
                      {creditsMenuLinks.filter(i => [
                        "Credit pentru Investiții Imobiliare",
                        "Credit pentru Firme",
                        "Consolidare Credite"
                      ].includes(i.name)).map((item, i) => (
                        <li key={i}>
                          <Link href={item.href} className="block text-sm text-zinc-600 hover:text-blue-600 transition-colors">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* 📊 Informații utile */}
                  <div>
                    <h4 className="font-semibold text-zinc-900 mb-2">📊 Informații utile</h4>
                    <ul className="space-y-1">
                      {creditsMenuLinks.filter(i => [
                        "Compară Bănci",
                        "De ce să lucrezi cu un Broker de Credite"
                      ].includes(i.name)).map((item, i) => (
                        <li key={i}>
                          <Link href={item.href} className="block text-sm text-zinc-600 hover:text-blue-600 transition-colors">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* ❓ Suport */}
                  <div>
                    <h4 className="font-semibold text-zinc-900 mb-2">❓ Suport</h4>
                    <ul className="space-y-1">
                      {creditsMenuLinks.filter(i => [
                        "Întrebări Frecvente",
                        "Contact Broker Credite"
                      ].includes(i.name)).map((item, i) => (
                        <li key={i}>
                          <Link href={item.href} className="block text-sm text-zinc-600 hover:text-blue-600 transition-colors">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <button type="button" aria-expanded="false" aria-haspopup="true" className="flex items-center gap-1 text-sm font-medium text-zinc-700 hover:text-zinc-950 transition-colors py-4">
                Ecosistem AiX
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] bg-white border border-zinc-200/80 shadow-2xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-4 group-hover:translate-y-0 p-8 z-50">
                <div className="grid grid-cols-4 gap-8">
                  {ecosystemMenuData.map((col, i) => (
                    <div key={i} className="flex flex-col">
                      <div className="flex flex-col items-start mb-4 pb-4 border-b border-zinc-100">
                        <h4 className="font-bold text-zinc-900 text-sm tracking-tight">{col.title}</h4>
                      </div>
                      <ul className="space-y-3">
                        {col.items.map((item, j) => (
                          <li key={j}>
                            <Link href={item.href} className="text-sm text-zinc-600 hover:text-blue-600 transition-colors block">
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/stiri"
              className="text-sm font-medium text-zinc-700 hover:text-zinc-950 transition-colors py-4 inline-flex items-center gap-1.5"
            >
              <span>Intelligence</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-700 border border-amber-500/20">
                Știri
              </span>
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" className="rounded-full border-zinc-300 text-zinc-800 hover:bg-zinc-100" asChild>
              <Link href="/gap-analyzer">Gap Analyzer</Link>
            </Button>
            <Button variant="outline" className="rounded-full border-zinc-300 text-zinc-800 hover:bg-zinc-100" asChild>
              <Link href="/calculatoare">Calculatoare</Link>
            </Button>
            <Button className="rounded-full bg-zinc-900 text-white hover:bg-black font-semibold shadow-md" asChild>
              <Link href="/oferta-rapida">Ofertă Rapidă</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            aria-label="Toggle mobile navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
            className="md:hidden flex items-center justify-center w-11 h-11 p-2 text-zinc-900 hover:text-blue-600 bg-zinc-100 hover:bg-zinc-200/80 rounded-xl relative z-60 cursor-pointer transition-colors border border-zinc-200/80"
            ref={buttonRef}
            onClick={(e) => { e.stopPropagation(); setIsMobileMenuOpen(prev => !prev); }}
          >
            {isMobileMenuOpen ? <X size={24} className="text-zinc-900" /> : <Menu size={24} className="text-zinc-900" />}
          </button>
          
        </div>
      </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-white text-zinc-900 z-40 overflow-y-auto pt-24 pb-28 px-4 sm:px-6 overscroll-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-3 max-w-lg mx-auto">
              {/* Private Client Mobile Accordion */}
              <div className="flex flex-col border-b border-zinc-200/80 pb-1">
                <button
                  type="button"
                  aria-expanded={activeMobileMegaMenu === 4}
                  className="text-lg sm:text-xl font-bold p-2 text-left flex justify-between items-center text-zinc-900 hover:text-blue-600 transition-colors"
                  onClick={() => setActiveMobileMegaMenu(activeMobileMegaMenu === 4 ? null : 4)}
                >
                  <span className="flex items-center gap-2 text-zinc-900">
                    Private Client
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 text-white font-semibold">Division</span>
                  </span>
                  <ChevronDown className={cn("w-5 h-5 text-zinc-500 transition-transform", activeMobileMegaMenu === 4 ? "rotate-180 text-zinc-900" : "")} />
                </button>
                {activeMobileMegaMenu === 4 && (
                  <div className="pl-3 pb-3 flex flex-col gap-2 bg-[#0c0e12] text-white p-4 rounded-2xl my-2 border border-zinc-800">
                    <Link href="/private-client" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold text-zinc-200 py-1.5 border-b border-zinc-800 flex justify-between items-center hover:text-white">
                      <span>Division Overview</span>
                      <span>→</span>
                    </Link>
                    {privateClientMenuLinks.map((item, i) => (
                      <Link key={i} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-zinc-300 py-1.5 pl-2 hover:text-white flex justify-between items-center rounded-lg hover:bg-zinc-900">
                        <span>{item.name}</span>
                        <span className="text-[10px] text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded">{item.badge}</span>
                      </Link>
                    ))}
                    <Link href="/private-client/enquiry" onClick={() => setIsMobileMenuOpen(false)} className="mt-2 text-xs font-bold text-center py-2.5 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 transition-colors">
                      Start Confidential Enquiry
                    </Link>
                  </div>
                )}
              </div>

              {/* Asigurări Mobile Accordion */}
              <div className="flex flex-col border-b border-zinc-200/80 pb-1">
                <button
                  type="button"
                  aria-expanded={activeMobileMegaMenu === 1}
                  className="text-lg sm:text-xl font-bold p-2 text-left flex justify-between items-center text-zinc-900 hover:text-blue-600 transition-colors"
                  onClick={() => setActiveMobileMegaMenu(activeMobileMegaMenu === 1 ? null : 1)}
                >
                  <span className="text-zinc-900">Asigurări</span>
                  <ChevronDown className={cn("w-5 h-5 text-zinc-500 transition-transform", activeMobileMegaMenu === 1 ? "rotate-180 text-zinc-900" : "")} />
                </button>
                {activeMobileMegaMenu === 1 && (
                  <div className="pl-2 pb-3 flex flex-col gap-4 bg-zinc-50/80 border border-zinc-200/80 p-4 rounded-2xl my-2">
                    {megaMenuData.map((col, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-blue-700 flex items-center gap-1.5 mt-1">
                          {col.icon}
                          {col.title}
                        </h4>
                        <div className="flex flex-col gap-1 pl-2">
                          {col.items.map((item, j) => (
                            <Link key={j} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-zinc-700 hover:text-blue-600 hover:bg-white py-1.5 px-2.5 rounded-lg transition-colors block">
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Credite Mobile Accordion */}
              <div className="flex flex-col border-b border-zinc-200/80 pb-1">
                <button
                  type="button"
                  aria-expanded={activeMobileMegaMenu === 3}
                  className="text-lg sm:text-xl font-bold p-2 text-left flex justify-between items-center text-zinc-900 hover:text-blue-600 transition-colors"
                  onClick={() => setActiveMobileMegaMenu(activeMobileMegaMenu === 3 ? null : 3)}
                >
                  <span className="text-zinc-900">Credite</span>
                  <ChevronDown className={cn("w-5 h-5 text-zinc-500 transition-transform", activeMobileMegaMenu === 3 ? "rotate-180 text-zinc-900" : "")} />
                </button>
                {activeMobileMegaMenu === 3 && (
                  <div className="pl-2 pb-3 flex flex-col gap-1.5 bg-zinc-50/80 border border-zinc-200/80 p-4 rounded-2xl my-2">
                    {creditsMenuLinks.map((item, i) => (
                      <Link key={i} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-zinc-700 hover:text-blue-600 hover:bg-white py-1.5 px-2.5 rounded-lg transition-colors block">
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Ecosistem AiX Mobile Accordion */}
              <div className="flex flex-col border-b border-zinc-200/80 pb-1">
                <button
                  type="button"
                  aria-expanded={activeMobileMegaMenu === 2}
                  className="text-lg sm:text-xl font-bold p-2 text-left flex justify-between items-center text-zinc-900 hover:text-blue-600 transition-colors"
                  onClick={() => setActiveMobileMegaMenu(activeMobileMegaMenu === 2 ? null : 2)}
                >
                  <span className="text-zinc-900">Ecosistem AiX</span>
                  <ChevronDown className={cn("w-5 h-5 text-zinc-500 transition-transform", activeMobileMegaMenu === 2 ? "rotate-180 text-zinc-900" : "")} />
                </button>
                {activeMobileMegaMenu === 2 && (
                  <div className="pl-2 pb-3 flex flex-col gap-4 bg-zinc-50/80 border border-zinc-200/80 p-4 rounded-2xl my-2">
                    {ecosystemMenuData.map((col, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <h4 className="font-bold text-xs text-zinc-500 uppercase tracking-widest mt-1">{col.title}</h4>
                        <div className="flex flex-col gap-1 pl-2">
                          {col.items.map((item, j) => (
                            <Link key={j} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold text-zinc-800 hover:text-blue-600 hover:bg-white py-1.5 px-2.5 rounded-lg transition-colors block">
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Standalone Links */}
              <Link href="/de-ce-asigurari" onClick={() => setIsMobileMenuOpen(false)} className="text-lg sm:text-xl font-bold p-2 border-b border-zinc-200/80 text-zinc-900 hover:text-blue-600 transition-colors block">
                De Ce Asigurări
              </Link>

              <Link href="/real-estate" onClick={() => setIsMobileMenuOpen(false)} className="text-lg sm:text-xl font-bold p-2 border-b border-zinc-200/80 text-zinc-900 hover:text-blue-600 transition-colors block">
                Real Estate
              </Link>

              <Link href="/despre-mine" onClick={() => setIsMobileMenuOpen(false)} className="text-lg sm:text-xl font-bold p-2 border-b border-zinc-200/80 text-zinc-900 hover:text-blue-600 transition-colors block">
                Despre Mine
              </Link>

              <Link href="/stiri" onClick={() => setIsMobileMenuOpen(false)} className="text-lg sm:text-xl font-bold p-2 border-b border-zinc-200/80 flex items-center justify-between text-amber-700 hover:text-amber-800 transition-colors">
                <span>Insurance Intelligence</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 border border-amber-500/20">Știri</span>
              </Link>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mt-6 pt-2">
                <Button variant="outline" className="w-full h-12 text-base justify-center rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold shadow-xs" asChild>
                  <Link href="/oferta-rapida" onClick={() => setIsMobileMenuOpen(false)}>Ofertă Rapidă</Link>
                </Button>
                <Button className="w-full h-12 text-base justify-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md" asChild>
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Solicită Consultanță</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
