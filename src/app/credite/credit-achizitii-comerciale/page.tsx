import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Credit pentru Achiziții Comerciale - Cristian Văduva Premium',
  description: 'Finanțare pentru achiziționarea de spații comerciale, cu aprobare rapidă și condiții avantajoase.'
};

export default function CreditAchizitiiComercialePage() {
  return (
    <section className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-foreground">Credit pentru Achiziții Comerciale</h1>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Pentru cine este?</strong> Întreprinderi și investitori care doresc să achiziționeze spații comerciale pentru birouri, magazine sau alte activități comerciale.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Ce problemă rezolvă?</strong> Asigură capitalul necesar pentru achiziția unui imobil comercial, eliminând barierele financiare inițiale și facilitând extinderea afacerii.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Care sunt avantajele?</strong> Rate competitive, termen flexibil de rambursare, posibilitatea finanțării parțiale sau totale a imobilului și consultanță gratuită.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Cum funcționează?</strong> Prezinți detaliile imobilului, documentația cadastrală și planurile de afaceri, iar noi negociem cu banca pentru a obține cea mai bună ofertă.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Ce acte sunt necesare?</strong> Act de identitate, act de proprietate al imobilului, documente cadastrale, plan de afaceri și eventuale autorizații necesare pentru utilizarea spațiului comercial.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Care este procesul?</strong> 1. Consult inițial 2. Evaluarea necesarului 3. Colectarea documentelor 4. Negociere bancă 5. Aprobare și semnare.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>În cât timp primești răspuns?</strong> 7‑12 zile lucrătoare, în funcție de complexitatea dosarului și de tipul imobilului.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Cum te ajut personal?</strong> Ofer sprijin complet pe parcursul procesului, de la depunerea dosarului până la semnarea contractului și următoarea gestionare a creditului.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>De ce este mai bine?</strong> Colaborăm cu bănci specializate în finanțarea imobilelor comerciale, garantând condiții avantajoase și flexibilitate în structura creditului.</p>
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
