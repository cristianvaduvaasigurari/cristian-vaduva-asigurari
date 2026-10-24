import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { CustomerReviews } from "@/components/sections/customer-reviews";
import { InsuranceIntelligencePreview } from "@/components/sections/insurance-intelligence-preview";
import { Ecosystem } from "@/components/sections/ecosystem";
import { AboutAdvisorPreview } from "@/components/sections/about-advisor-preview";
import { RiskConsequences } from "@/components/sections/risk-consequences";
import { ProtectionGaps } from "@/components/sections/protection-gaps";
import { RiskAnalysisProcess } from "@/components/sections/risk-analysis-process";
import dynamic from 'next/dynamic';
import type { Metadata } from "next";

// Lazy load heavy interactive components
const RealWorldRiskScenarios = dynamic(() => import('@/components/sections/real-world-risk-scenarios').then(mod => ({ default: mod.RealWorldRiskScenarios })), {
  loading: () => <div className="h-96 animate-pulse bg-slate-950/20 rounded-lg" />,
});

const ContactForm = dynamic(() => import('@/components/sections/contact-form').then(mod => ({ default: mod.ContactForm })), {
  loading: () => <div className="h-96 animate-pulse bg-muted/20 rounded-lg" />,
});

export const metadata: Metadata = {
  title: "Înțelege ce ai de pierdut înainte să afli cât te costă | Cristian Văduva",
  description: "Consultanță strategică în analiza riscurilor, identificarea lacunelor din polițele existente și protecția patrimoniului pentru locuințe, colecții, mașini și companii.",
  keywords: ["analiza riscuri asigurare", "consultant asigurari Bucuresti", "audit polite asigurare", "asigurare locuinte premium", "asigurare colectii ceasuri", "asigurare cyber companii", "Generali Romania"],
  alternates: {
    canonical: "https://insurance.cristianvaduva.com",
  },
  openGraph: {
    title: "Înțelege ce ai de pierdut înainte să afli cât te costă | Cristian Văduva",
    description: "Consultanță strategică în analiza riscurilor, identificarea lacunelor din polițe și structurarea protecției financiare.",
    url: "https://insurance.cristianvaduva.com",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Înțelege ce ai de pierdut înainte să afli cât te costă | Cristian Văduva",
    description: "Consultanță strategică în analiza riscurilor, identificarea lacunelor din polițe și structurarea protecției financiare.",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <RiskConsequences />
        <ProtectionGaps />
        <RiskAnalysisProcess />
        <section id="servicii"><Services /></section>
        <RealWorldRiskScenarios isHomePagePreview={true} />
        <InsuranceIntelligencePreview />
        <AboutAdvisorPreview />
        <CustomerReviews />
        <Ecosystem />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
