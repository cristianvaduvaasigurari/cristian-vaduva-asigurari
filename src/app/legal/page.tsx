import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { Metadata } from "next";
import { 
  Shield, FileText, Cookie, HelpCircle, Cpu, ShieldAlert, 
  Home, Landmark, TrendingUp, Eye, Lock, Copyright, Mail, Scale 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Centru Legal | Legal Center - Cristian Văduva",
  description: "Tot ce trebuie să știi despre cum Cristian Văduva îți protejează confidențialitatea, drepturile și informațiile personale.",
  alternates: {
    canonical: "https://cristianvaduva.com/legal",
  },
  openGraph: {
    title: "Centru Legal | Legal Center - Cristian Văduva",
    description: "Tot ce trebuie să știi despre cum Cristian Văduva îți protejează confidențialitatea, drepturile și informațiile personale.",
    url: "https://cristianvaduva.com/legal",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Centru Legal | Legal Center - Cristian Văduva",
    description: "Tot ce trebuie să știi despre cum Cristian Văduva îți protejează confidențialitatea, drepturile și informațiile personale.",
  },
};

const legalDocuments = [
  {
    title: "Politica de Confidențialitate & GDPR",
    subtitle: "Privacy Policy & GDPR Notice",
    description: "Cum colectăm, utilizăm și protejăm datele tale cu caracter personal pe platforma noastră.",
    href: "/legal/privacy-policy",
    icon: Shield,
    color: "text-blue-500 bg-blue-500/10",
  },
  {
    title: "Termeni de Utilizare",
    subtitle: "Terms of Use",
    description: "Regulile și condițiile de utilizare ale platformei cristianvaduva.com.",
    href: "/legal/terms-of-use",
    icon: FileText,
    color: "text-purple-500 bg-purple-500/10",
  },
  {
    title: "Politica de Cookie-uri",
    subtitle: "Cookie Policy",
    description: "Informații despre cum și de ce utilizăm cookie-uri pentru a optimiza experiența ta.",
    href: "/legal/cookie-policy",
    icon: Cookie,
    color: "text-amber-500 bg-amber-500/10",
  },
  {
    title: "Drepturile Tale GDPR",
    subtitle: "GDPR Requests / Data Subject Rights",
    description: "Află care sunt drepturile tale conform GDPR și cum poți face o solicitare de date.",
    href: "/legal/data-subject-request",
    icon: HelpCircle,
    color: "text-emerald-500 bg-emerald-500/10",
  },
  {
    title: "Limitare Răspundere AI",
    subtitle: "AI Disclaimer (AiX OS)",
    description: "Clarificări legale cu privire la asistentul AI, estimări, simulatoare și caracterul lor informativ.",
    href: "/legal/ai-disclaimer",
    icon: Cpu,
    color: "text-indigo-500 bg-indigo-500/10",
  },
  {
    title: "Limitare Răspundere Asigurări",
    subtitle: "Insurance Disclaimer",
    description: "Clarificări despre rolul nostru de intermediar, cotații indicative și emiterea polițelor.",
    href: "/legal/insurance-disclaimer",
    icon: ShieldAlert,
    color: "text-red-500 bg-red-500/10",
  },
  {
    title: "Limitare Răspundere Imobiliare",
    subtitle: "Real Estate Disclaimer",
    description: "Precizări privind disponibilitatea proprietăților, prețuri și serviciul Home Find.",
    href: "/legal/real-estate-disclaimer",
    icon: Home,
    color: "text-cyan-500 bg-cyan-500/10",
  },
  {
    title: "Limitare Răspundere Credite",
    subtitle: "Mortgage Disclaimer",
    description: "Informații despre criteriile de eligibilitate ale băncilor și caracterul informativ al calculatoarelor.",
    href: "/legal/mortgage-disclaimer",
    icon: Landmark,
    color: "text-teal-500 bg-teal-500/10",
  },
  {
    title: "Limitare Răspundere Investiții",
    subtitle: "Investment Disclaimer",
    description: "Avertisment de risc imobiliar și financiar privind oportunitățile prezentate pe platformă.",
    href: "/legal/investment-disclaimer",
    icon: TrendingUp,
    color: "text-orange-500 bg-orange-500/10",
  },
  {
    title: "Declarație de Accesibilitate",
    subtitle: "Accessibility Statement",
    description: "Angajamentul nostru de a oferi o platformă web conformă cu standardele WCAG.",
    href: "/legal/accessibility",
    icon: Eye,
    color: "text-sky-500 bg-sky-500/10",
  },
  {
    title: "Securitatea Platformei",
    subtitle: "Platform Security",
    description: "Măsurile luate pentru a asigura confidențialitatea și securitatea datelor tale (SSL, criptare).",
    href: "/legal/security",
    icon: Lock,
    color: "text-green-500 bg-green-500/10",
  },
  {
    title: "Proprietate Intelectuală & Copyright",
    subtitle: "Copyright Notice",
    description: "Termenii privind drepturile de autor asupra textelor, brandului, logo-urilor și asistenților.",
    href: "/legal/copyright",
    icon: Copyright,
    color: "text-rose-500 bg-rose-500/10",
  },
  {
    title: "Contact Legal GDPR",
    subtitle: "Legal & GDPR Contact",
    description: "Informații de contact oficiale pentru solicitări legate de confidențialitate și aspecte legale.",
    href: "/legal/contact",
    icon: Mail,
    color: "text-indigo-400 bg-indigo-500/10",
  },
];

export default function LegalCenterPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 z-0 bg-background pointer-events-none" aria-hidden="true">
          <div className="absolute top-[10%] left-[5%] w-[35%] h-[35%] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen"></div>
          <div className="absolute bottom-[10%] right-[5%] w-[35%] h-[35%] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border border-white/5">
              <Scale size={16} className="text-blue-500 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Compliance Center</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 tracking-tight">
              Legal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Center</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
              Everything you need to know about how Cristian Văduva protects your privacy, your rights, your personal information and the use of this platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legalDocuments.map((doc, idx) => {
              const IconComponent = doc.icon;
              return (
                <Link 
                  key={idx} 
                  href={doc.href} 
                  className="group relative glass hover:bg-white/5 border border-white/10 hover:border-white/20 p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl"
                >
                  <div>
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${doc.color}`}>
                      <IconComponent size={24} />
                    </div>
                    <h2 className="text-xl font-bold font-heading text-white group-hover:text-blue-400 transition-colors mb-1">
                      {doc.title}
                    </h2>
                    <p className="text-xs font-medium text-blue-500/80 mb-4 tracking-wider uppercase">
                      {doc.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {doc.description}
                    </p>
                  </div>
                  <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-white/90 group-hover:text-blue-400 transition-colors">
                    <span>Vizualizează document</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
