import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Credit Verde - Cristian Văduva Premium',
  description: 'Finanțare eco‑friendly pentru proiecte de construcție verde, cu condiții avantajoase și aprobare rapidă.'
};

export default function CreditVerdePage() {
  return (
    <section className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-foreground">Credit Verde</h1>
      <p className="mb-4 text-lg text-muted-foreground">
        <strong>Ce este?</strong> Un credit destinat finanțării proiectelor de construcție cu impact redus asupra mediului – clădiri certificare BREEAM, LEED sau cu tehnologii sustenabile.
      </p>
      <p className="mb-4 text-lg text-muted-foreground">
        <strong>Beneficii:</strong> Rate competitive, posibilitatea de a accesa fonduri europene suplimentare și condiții flexibile de rambursare.
      </p>
      <p className="mb-4 text-lg text-muted-foreground">
        <strong>Cum aplici?</strong> Contactează brokerul, furnizează documentația proiectului și a planului de sustenabilitate, iar noi negociem cu partenerii bancari pentru cea mai bună ofertă.
      </p>
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
