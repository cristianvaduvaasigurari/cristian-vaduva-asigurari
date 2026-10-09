import { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { SeismicRiskChecker } from '@/components/sections/seismic-risk-checker';

export const metadata: Metadata = {
  title: 'Hartă de Risc Seismic București — Verifică Imobilul Înainte de Cumpărare | Cristian Văduva',
  description:
    'Verifică informațiile publice despre clădirile expertizate seismic din București (AMCCRS / PMB), consultă sursele oficiale și solicită o analiză de asigurare pentru proprietatea pe care o evaluezi.',
  alternates: {
    canonical: 'https://insurance.cristianvaduva.com/harta-risc-seismic-bucuresti',
  },
  openGraph: {
    title: 'Hartă Risc Seismic București & Due Diligence Imobiliar | Cristian Văduva',
    description:
      'Verifică încadrarea seismică oficială a imobilelor din București (RsI - RsIV, Clădiri Consolidate), eligibilitatea de asigurare PAD și facultativă.',
    url: 'https://insurance.cristianvaduva.com/harta-risc-seismic-bucuresti',
    siteName: 'Cristian Văduva - Consultanță Asigurări Premium',
    type: 'website',
    locale: 'ro_RO',
  },
};

export default function HartaRiscSeismicBucurestiPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Verificare Risc Seismic Imobil București & Due Diligence Asigurare',
    provider: {
      '@type': 'Person',
      name: 'Cristian Văduva',
      jobTitle: 'Consultant Asigurări Imobiliare & Partener Generali',
      url: 'https://insurance.cristianvaduva.com',
    },
    serviceType: 'Property Due Diligence & Insurance Advisory',
    description:
      'Instrument de verificare a încadrării seismice publice AMCCRS pentru clădirile din București și consultanță pentru asigurarea locuinței.',
    url: 'https://insurance.cristianvaduva.com/harta-risc-seismic-bucuresti',
  };

  return (
    <div className="min-h-screen bg-[#0b0d10] text-zinc-100 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <SeismicRiskChecker />
        </div>
      </main>

      <Footer />
    </div>
  );
}
