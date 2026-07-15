import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import dynamic from 'next/dynamic';
import type { Metadata } from "next";

// Lazy load heavy components for better performance
const Ecosystem = dynamic(() => import('@/components/sections/ecosystem').then(mod => ({ default: mod.Ecosystem })), {
  loading: () => <div className="h-96 animate-pulse bg-muted/20 rounded-3xl" />,
  ssr: true
});

const ContactForm = dynamic(() => import('@/components/sections/contact-form').then(mod => ({ default: mod.ContactForm })), {
  loading: () => <div className="h-96 animate-pulse bg-muted/20 rounded-3xl" />,
  ssr: true
});

export const metadata: Metadata = {
  title: "Cristian Văduva | Consultant Asigurări Premium & Real Estate de Lux",
  description: "Expertiză premium în asigurări Generali, real estate de lux și optimizare patrimoniu. Consultant asigurări București cu focus pe protecție financiară și investiții inteligente.",
  keywords: ["consultant asigurări București", "asigurări Generali", "real estate de lux", "investiții imobiliare", "protecție financiară", "AiX OS", "Home Find"],
  openGraph: {
    title: "Cristian Văduva | Consultant Asigurări Premium & Real Estate de Lux",
    description: "Expertiză premium în asigurări Generali, real estate de lux și optimizare patrimoniu. Consultant asigurări București cu focus pe protecție financiară.",
    url: "https://cristianvaduva.com",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <section id="servicii"><Services /></section>
        <Ecosystem />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
