import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Credit Refinanțare - Cristian Văduva Premium',
  description: 'Refinanțare credit pentru reducerea ratei, optimizarea termenelor și obținerea unor condiții mai avantajoase.'
};

export default function CreditRefinantarePage() {
  return (
    <section className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-foreground">Credit Refinanțare</h1>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Pentru cine este?</strong> Pentru persoanele care dețin deja un credit ipotecar sau alt tip de credit și doresc să îmbunătățească condițiile de rambursare.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Ce problemă rezolvă?</strong> Reduce rata lunară, scurtează durata creditului și poate elimina comisioane nejustificate.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Care sunt avantajele?</strong> Rate mai mici, termeni flexibili, posibilitatea consolidării datoriilor și consultanță gratuită.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Cum funcționează?</strong> Analizăm creditul existent, căutăm oferte mai bune în piață și negociem în numele tău cu băncile.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Ce acte sunt necesare?</strong> Contractul de credit existent, act de identitate, adeverință de venit și eventual documente suplimentare cerute de bancă.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Care este procesul?</strong> 1. Evaluare inițială 2. Colectare documente 3. Negociere cu banca 4. Aprobare și semnare.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>În cât timp primești răspuns?</strong> În 5‑7 zile lucrătoare, în funcție de complexitatea dosarului.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Cum te ajut personal?</strong> Ofer consultanță pas cu pas, gestionăm toată documentația și comunicăm cu banca pentru tine.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>De ce este mai bine?</strong> Avem acces la oferte exclusive și reușim să obținem condiții mult mai bune decât o căutare independentă.</p>
      <Link href="/credite" className="mt-6 inline-block">
        <Button variant="ghost">Înapoi la lista credite</Button>
      </Link>
    </section>
  );
}
