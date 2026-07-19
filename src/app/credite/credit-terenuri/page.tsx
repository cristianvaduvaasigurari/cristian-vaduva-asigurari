import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Credit pentru Terenuri - Cristian Văduva Premium',
  description: 'Finanțare pentru achiziționarea și dezvoltarea de terenuri, cu aprobare rapidă și condiții avantajoase.'
};

export default function CreditTerenuriPage() {
  return (
    <section className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-foreground">Credit pentru Terenuri</h1>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Pentru cine este?</strong> Investitorii și dezvoltatorii care doreșt să achiziționeze terenuri pentru proiecte imobiliare sau alte scopuri.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Ce problemă rezolvă?</strong> Oferă capitalul necesar pentru cumpărarea terenului, reducând povara financiară inițială.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Care sunt avantajele?</strong> Rate competitive, termeni de rambursare flexibili, posibilitatea de finanțare parțială sau totală a terenului.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Cum funcționează?</strong> Prezinți detaliile terenului, documentația cadastrală și planurile, noi negociem cu banca pentru cea mai bună ofertă.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Ce acte sunt necesare?</strong> Act de identitate, document cadastral al terenului, act de proprietate și eventuală autorizație de construcție.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Care este procesul?</strong> 1. Consult inițial 2. Evaluare teren 3. Colectare documente 4. Negociere bancă 5. Aprobare și semnare.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>În cât timp primești răspuns?</strong> 5‑10 zile lucrătoare, în funcție de complexitatea dosarului.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Cum te ajut personal?</strong> Ofer consultanță completă, analiza ofertei și suport pe parcursul întregului proces.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>De ce este mai bine?</strong> Avem parteneriate cu bănci specializate în finanțarea terenurilor, obținând condiții avantajoase pentru clienți.</p>
      <Link href="/credite" className="mt-6 inline-block">
        <Button variant="ghost">Înapoi la lista credite</Button>
      </Link>
    </section>
  );
}
