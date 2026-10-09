import { Metadata } from 'next';
import { InsuranceGlossary } from '@/components/sections/insurance-glossary';
import { GLOSSARY_TERMS } from '@/data/glossaryData';

export const metadata: Metadata = {
  title: 'Glosar Asigurări | Dicționar Tehnic și Juridic Complet',
  description:
    'Glosar autorizat de termeni de asigurare: franșiză, subasigurare, sumă asigurată, PAD, CASCO, RCA, D&O, răspundere civilă, clauze, excluderi și proceduri de daună.',
  alternates: {
    canonical: 'https://insurance.cristianvaduva.com/glosar-asigurari',
  },
  openGraph: {
    title: 'Glosar Asigurări | Cristian Văduva - Consultanță Asigurări',
    description:
      'Dicționar complet de termeni de asigurare, concepte contractuale, exemple practice și temeiuri juridice din legislația românească.',
    url: 'https://insurance.cristianvaduva.com/glosar-asigurari',
    siteName: 'Cristian Văduva - Consultanță Asigurări Premium',
    type: 'article',
    locale: 'ro_RO',
  },
};

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function GlosarAsigurariPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Glosar Tehnic și Juridic de Asigurări',
    description:
      'Colecție autorizată de concepte, termeni contractuale, exemple de daune și legislație în asigurările din România.',
    url: 'https://insurance.cristianvaduva.com/glosar-asigurari',
    hasDefinedTerm: GLOSSARY_TERMS.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.termRo,
      alternateName: t.termEn,
      description: t.shortDefinitionRo,
      url: `https://insurance.cristianvaduva.com/glosar-asigurari#${t.slug}`,
    })),
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
          <InsuranceGlossary />
        </div>
      </main>

      <Footer />
    </div>
  );
}
