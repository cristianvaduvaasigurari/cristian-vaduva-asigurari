import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Credit pentru Dezvoltatori - Cristian Văduva Premium',
  description: 'Finanțare pentru dezvoltatori imobiliari, cu condiții adaptate și aprobare rapidă.'
};

export default function CreditDezvoltatoriPage() {
  return (
    <section className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-foreground">Credit pentru Dezvoltatori</h1>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Pentru cine este?</strong> Dezvoltatorii imobiliari care doresc să finanțeze proiecte de construcție sau renovare.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Ce problemă rezolvă?</strong> Asigură capitalul necesar pentru achiziție teren, materiale și costuri de construcție, eliminând constrângerile de cash flow.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Care sunt avantajele?</strong> Rate concurențiale, perioade de grație, flexibilitate în rambursare și acces la parteneri bancari specializați.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Cum funcționează?</strong> Prezinți proiectul, estimările de cost, planul de execuție și noi negociem cu banca pentru cea mai bună ofertă.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Ce acte sunt necesare?</strong> Act de identitate, certificatul de înregistrare a firmei, planul de dezvoltare, avize și autorizații de construcție, bugete și prognoze financiare.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Care este procesul?</strong> 1. Consult inițial 2. Analiză proiect 3. Colectare documente 4. Negociere bancă 5. Aprobare și semnare.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>În cât timp primești răspuns?</strong> 7‑14 zile lucrătoare, în funcție de complexitatea proiectului.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Cum te ajut personal?</strong> Ofer sprijin complet, de la prezentarea ofertei la semnarea contractului și monitorizarea execuției.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>De ce este mai bine?</strong> Avem relații solide cu instituții de creditare care susțin dezvoltatorii cu condiții avantajoase și flexibilitate.</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md px-6 h-11" asChild>
          <Link href="/credite/contact-broker-credite">Solicită Consultanță Gratuită</Link>
        </Button>
        <Link href="/credite">
          <Button variant="ghost">Înapoi la lista credite</Button>
        </Link>
      </div>
    </section>
  );
}
