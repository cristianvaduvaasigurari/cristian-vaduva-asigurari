import { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { InsuranceMarketReport } from '@/components/sections/insurance-market-report';

export const metadata: Metadata = {
  title: 'Raportul Anual al Pieței Asigurărilor din România | Date Oficiale și Analiză',
  description:
    'Sinteză editorială documentată privind piața asigurărilor din România pe baza rapoartelor oficiale ASF, BAAR, PAID și UNSAR: PBS, RCA, asigurări de locuințe PAD, daune medii și rate de penetrare.',
  alternates: {
    canonical: 'https://insurance.cristianvaduva.com/raport-piata-asigurarilor',
  },
  openGraph: {
    title: 'Raportul Anual al Pieței Asigurărilor din România | Cristian Văduva',
    description:
      'Analiză riguroasă și registru de surse oficiale (ASF, BAAR, PAID, UNSAR) pentru indicatorii cheie ai pieței de asigurări din România.',
    url: 'https://insurance.cristianvaduva.com/raport-piata-asigurarilor',
    siteName: 'Cristian Văduva - Consultanță Asigurări Premium',
    type: 'article',
    locale: 'ro_RO',
  },
};

export default function RaportPiataAsigurarilorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Report',
    name: 'Raportul Anual al Pieței Asigurărilor din România',
    headline: 'Indicatori Cheie, Dinamică și Surse Primare de Date',
    datePublished: '2024-03-31',
    dateModified: '2025-01-15',
    author: {
      '@type': 'Person',
      name: 'Cristian Văduva',
      jobTitle: 'Consultant Asigurări Premium & Broker Partener',
      url: 'https://insurance.cristianvaduva.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cristian Văduva Insurance Advisory',
      url: 'https://insurance.cristianvaduva.com',
    },
    description:
      'Sinteză de cercetare a pieței de asigurări din România bazată pe date publice verificate de la ASF, BAAR, PAID și UNSAR.',
    keywords: [
      'piata asigurarilor romania',
      'raport asf asigurari',
      'statistici rca baar',
      'asigurari locuinte pad',
      'dauna medie rca',
      'rata penetrare asigurari pib',
    ],
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 relative">
        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <InsuranceMarketReport />
        </div>
      </main>

      <Footer />
    </div>
  );
}
