import { Metadata } from 'next';
import { CorporateHealthJourney } from '@/components/sections/corporate-health-journey';

export const metadata: Metadata = {
  title: 'Asigurare de Sănătate pentru Angajați | Ghid HR, Fiscalitate și Ofertă Corporate',
  description:
    'Ghid complet pentru HR și antreprenori privind asigurarea voluntară de sănătate pentru angajați: comparație cu abonamentele medicale, deductibilitate fiscală conform Legii 227/2015 și solicitare ofertă de grup.',
  alternates: {
    canonical: 'https://insurance.cristianvaduva.com/asigurare-sanatate-angajati',
  },
  openGraph: {
    title: 'Asigurare Sănătate Angajați | Cristian Văduva - Consultanță Corporate',
    description:
      'Structurare pachete de sănătate corporate, comparație cu abonamentele de clinică și optimizare fiscală (400 EUR/an conform Codului Fiscal).',
    url: 'https://insurance.cristianvaduva.com/asigurare-sanatate-angajati',
    siteName: 'Cristian Văduva - Consultanță Asigurări Premium',
    type: 'article',
    locale: 'ro_RO',
  },
};

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function AsigurareSanatateAngajatiPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Consultanță Asigurări de Sănătate pentru Angajați & Beneficii Corporate',
    provider: {
      '@type': 'Person',
      name: 'Cristian Văduva',
      jobTitle: 'Consultant Asigurări Corporate & Broker Partener',
      url: 'https://insurance.cristianvaduva.com',
    },
    serviceType: 'Corporate Health Insurance & Employee Benefits Advisory',
    description:
      'Consultanță specializată pentru echipe de HR și companii în selectarea, negocierea și optimizarea pachetelor de sănătate pentru angajați.',
    url: 'https://insurance.cristianvaduva.com/asigurare-sanatate-angajati',
  };

  return (
    <div className="min-h-screen bg-[#0b0d10] text-zinc-100 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <CorporateHealthJourney />
        </div>
      </main>

      <Footer />
    </div>
  );
}
