import { Metadata } from 'next';
import { SmeRiskAudit } from '@/components/sections/sme-risk-audit';

export const metadata: Metadata = {
  title: 'Audit de Riscuri pentru Firme și IMM-uri în 30 de Minute | Cristian Văduva',
  description:
    'Sesiune consultativă structurată de 30 de minute pentru companii și IMM-uri: audit patrimoniu, răspundere civilă, riscuri cibernetice, D&O și beneficii angajați.',
  alternates: {
    canonical: 'https://insurance.cristianvaduva.com/audit-riscuri-companii',
  },
  openGraph: {
    title: 'Audit Riscuri Companii în 30 de Minute | Cristian Văduva',
    description:
      'Cartografiază expunerile de asigurare ale firmei tale, clauzele contractuale și prioritățile de protecție financiară alături de un consultant autorizat.',
    url: 'https://insurance.cristianvaduva.com/audit-riscuri-companii',
    siteName: 'Cristian Văduva - Consultanță Asigurări Premium',
    type: 'website',
    locale: 'ro_RO',
  },
};

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function AuditRiscuriCompaniiPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Audit de Riscuri pentru Firme și IMM-uri în 30 de Minute',
    provider: {
      '@type': 'Person',
      name: 'Cristian Văduva',
      jobTitle: 'Consultant Asigurări Companii & Broker Partener',
      url: 'https://insurance.cristianvaduva.com',
    },
    serviceType: 'Risk Assessment & Commercial Insurance Advisory',
    description:
      'Evaluare preliminară structurată a expunerilor de răspundere civilă, daune patrimoniale, riscuri digitale și beneficii de personal.',
    url: 'https://insurance.cristianvaduva.com/audit-riscuri-companii',
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <SmeRiskAudit />
        </div>
      </main>

      <Footer />
    </div>
  );
}
