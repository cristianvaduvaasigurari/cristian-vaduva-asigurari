import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { CustomerReviews } from "@/components/sections/customer-reviews";
import { InsuranceIntelligencePreview } from "@/components/sections/insurance-intelligence-preview";
import { Ecosystem } from "@/components/sections/ecosystem";
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
  title: "Cristian Văduva | Consultant Asigurări Premium & Partener Generali",
  description: "Consultanță strategică în asigurări Generali România, protecție financiară personală și optimizarea patrimoniului de afaceri. Consultant autorizat București.",
  keywords: ["consultant asigurări București", "asigurări Generali", "asigurare de viață", "asigurare de sănătate", "CASCO", "RCA", "protecție financiară", "AiX OS"],
  alternates: {
    canonical: "https://insurance.cristianvaduva.com",
  },
  openGraph: {
    title: "Cristian Văduva | Consultant Asigurări Premium & Partener Generali",
    description: "Consultanță strategică în asigurări Generali România, protecție financiară și optimizarea riscurilor de patrimoniu.",
    url: "https://insurance.cristianvaduva.com",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cristian Văduva | Consultant Asigurări Premium & Partener Generali",
    description: "Consultanță strategică în asigurări Generali România, protecție financiară și optimizarea riscurilor de patrimoniu.",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <section id="servicii"><Services /></section>
        <RealWorldRiskScenarios isHomePagePreview={true} />
        <InsuranceIntelligencePreview />
        <CustomerReviews />
        <Ecosystem />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
