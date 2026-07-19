import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Credit Ipotecar - Cristian Văduva Premium',
  description: 'Credit ipotecar cu rată de aprobare ridicată, proces rapid și consultanță gratuită. Pentru persoane fizice care doresc să achiziționeze sau să refinanceze locuința.'
};

export default function CreditIpotecarPage() {
  return (
    <section className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-foreground">Credit Ipotecar</h1>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Pentru cine este?</strong> Persoane fizice care doresc să cumpere o locuință nouă, să renoveze una existentă sau să restructureze un credit ipotecar existent.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Ce problemă rezolvă?</strong> Asigură finanțarea necesară achiziției sau renovării imobilului, eliminând dificultatea găsirii unui credit potrivit și a procesului birocratic.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Care sunt avantajele?</strong> Rată de aprobare ridicată, proces rapid, consultanță gratuită, opțiuni flexibile de rambursare, parteneriate cu principalele bănci din România.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Cum funcționează?</strong> Completați formularul de cerere, furnizați documentele necesare, noi analizăm profilul și negociem cu banca pentru a obține cele mai bune condiții.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Ce acte sunt necesare?</strong> Act de identitate, adeverință de venit, contract de vânzare-cumpărare (dacă este cazul), extras de carte funciară și alte documente specifice băncii.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Care este procesul?</strong> 1. Contact inițial 2. Evaluarea necesarului 3. Colectarea documentelor 4. Negocierea cu banca 5. Aprobarea și semnarea contractului.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>În cât timp primești răspuns?</strong> De regulă în 3‑5 zile lucrătoare, în funcție de complexitatea dosarului.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Cum te ajut personal?</strong> Îți ofer consultanță gratuită, analiză personalizată și suport pe tot parcursul procesului, de la depunerea dosarului până la semnarea contractului.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>De ce este mai bine?</strong> Colaborăm cu o rețea extinsă de bănci și oferim soluții adaptate nevoilor tale, cu o rată de aprobare superioară pieței.</p>
      <Link href="/credite" className="mt-6 inline-block">
        <Button variant="ghost">Înapoi la lista credite</Button>
      </Link>
    </section>
  );
}
