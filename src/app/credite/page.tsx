import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Credite - Cristian Văduva Premium',
  description: 'Descoperă soluțiile de creditare potrivite pentru tine. Broker de credite în România – economie de timp, rată de aprobare ridicată.',
};

export default function CreditePage() {
  const creditProducts = [
    { name: 'Credit Ipotecar', href: '/credite/credit-ipotecar' },
    { name: 'Credit Nouă Casă', href: '/credite/credit-noua-casa' },
    { name: 'Credit Refinanțare', href: '/credite/credit-refinantare' },
    { name: 'Credit de Nevoi Personale', href: '/credite/credit-nevoi-personale' },
    { name: 'Credit pentru Investiții Imobiliare', href: '/credite/credit-investitii-imobiliare' },
    { name: 'Credit pentru Persoane Juridice', href: '/credite/credit-persoane-juridice' },
    { name: 'Credit pentru Dezvoltatori', href: '/credite/credit-dezvoltatori' },
    { name: 'Credit pentru Construcții', href: '/credite/credit-constructii' },
    { name: 'Credit pentru Terenuri', href: '/credite/credit-terenuri' },
    { name: 'Credit pentru Achiziții Comerciale', href: '/credite/credit-achizitii-comerciale' },
  ];
  return (
    <section className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-foreground">Credite</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Soluții de creditare adaptate fiecărui profil. Consultanță gratuită, proces rapid și acces la partenerii noștri bancari.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creditProducts.map((c) => (
          <Link key={c.href} href={c.href} className="block rounded-xl border border-border/30 hover:border-primary transition-shadow shadow-sm hover:shadow-lg p-6 bg-background">
            <h2 className="text-2xl font-semibold mb-2 text-foreground">{c.name}</h2>
            <Button variant="ghost" className="mt-2">Vezi detalii</Button>
          </Link>
        ))}
      </div>
    </section>
  );
}
