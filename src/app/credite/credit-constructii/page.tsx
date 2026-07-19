import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Credit pentru Construcții - Cristian Văduva Premium',
  description: 'Finanțare pentru proiecte de construcție, cu condiții flexibile și aprobare rapidă.'
};

export default function CreditConstructiiPage() {
  return (
    <section className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-foreground">Credit pentru Construcții</h1>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Pentru cine este?</strong> Companii și persoane fizice care doresc să finanțeze construcția de noi clădiri sau extinderi ale celor existente.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Ce problemă rezolvă?</strong> Asigură capitalul necesar pentru achiziția terenului, materiale de construcție și servicii de execuție, reducând dependența de fonduri proprii.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Care sunt avantajele?</strong> Rate competitive, posibilitatea perioadelor de grație, structuri de rambursare adaptate și acces la parteneri bancari specializați în construcții.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Cum funcționează?</strong> Prezinți proiectul, estimările de cost, planul de execuție și noi negociem cu banca pentru a obține cea mai bună ofertă.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Ce acte sunt necesare?</strong> Act de identitate, certificat de înregistrare a firmei (dacă este cazul), proiect detaliat, autorizații de construcție, bugete și prognoze financiare.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Care este procesul?</strong> 1. Consult inițial 2. Analiză proiect 3. Colectare documente 4. Negociere bancă 5. Aprobare și semnare.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>În cât timp primești răspuns?</strong> 7‑14 zile lucrătoare, în funcție de complexitatea proiectului.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Cum te ajut personal?</strong> Ofer sprijin complet, de la prezentarea ofertei la semnarea contractului și monitorizarea execuției.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>De ce este mai bine?</strong> Avem relații solide cu instituții de creditare care susțin proiecte de construcție cu condiții avantajoase și flexibilitate.</p>
      <Link href="/credite" className="mt-6 inline-block">
        <Button variant="ghost">Înapoi la lista credite</Button>
      </Link>
    </section>
  );
}
