import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Credit pentru Persoane Juridice - Cristian Văduva Premium',
  description: 'Finanțare dedicată companiilor, cu condiții flexibile și rată de aprobare ridicată.'
};

export default function CreditPersoaneJuridicePage() {
  return (
    <section className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-foreground">Credit pentru Persoane Juridice</h1>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Pentru cine este?</strong> Întreprinderi mici și mijlocii care doresc capital de lucru sau investiții în active.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Ce problemă rezolvă?</strong> Asigură fonduri pentru extindere, achiziție echipamente sau alte nevoi financiare ale afacerii.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Care sunt avantajele?</strong> Rate competitive, termeni flexibili, consultanță dedicată și soluții personalizate.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Cum funcționează?</strong> Analizăm situația financiară a companiei, negociem cu banca și obținem cea mai bună ofertă.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Ce acte sunt necesare?</strong> Act constitutiv, registru de comerț, bilanț contabil, extrase de cont și alte documente solicitate de bancă.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Care este procesul?</strong> 1. Contact inițial 2. Evaluarea necesarului 3. Colectarea documentelor 4. Negociere bancă 5. Aprobare și semnare.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>În cât timp primești răspuns?</strong> 7‑10 zile lucrătoare, în funcție de complexitatea dosarului.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Cum te ajut personal?</strong> Îți ofer suport complet, de la analiza inițială la semnarea contractului.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>De ce este mai bine?</strong> Colaborăm cu bănci care au produse specializate pentru IMM-uri, obținând condiții avantajoase.</p>
      <Link href="/credite" className="mt-6 inline-block">
        <Button variant="ghost">Înapoi la lista credite</Button>
      </Link>
    </section>
  );
}
