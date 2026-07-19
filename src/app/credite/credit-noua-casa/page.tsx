import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Credit Nouă Casă - Cristian Văduva Premium',
  description: 'Credit pentru achiziționarea unei noi locuințe, cu aprobare rapidă și consultanță gratuită.'
};

export default function CreditNouaCasaPage() {
  return (
    <section className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-foreground">Credit Nouă Casă</h1>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Pentru cine este?</strong> Persoane fizice care doresc să cumpere prima locuință sau să achiziționeze o casă nouă.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Ce problemă rezolvă?</strong> Oferă finanțare completă pentru achiziția locuinței, simplificând procesul de creditare.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Care sunt avantajele?</strong> Rată de aprobare ridicată, proces rapid, condiții flexibile, consultanță gratuită.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Cum funcționează?</strong> Completați formularul, trimiteți documentele, analizăm profilul și negociem cu banca.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Ce acte sunt necesare?</strong> Act de identitate, adeverință de venit, contract de vânzare-cumpărare, extras de carte funciară.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Care este procesul?</strong> 1. Contact inițial 2. Evaluare necesar 3. Colectare documente 4. Negociere bancă 5. Aprobare și semnare.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>În cât timp primești răspuns?</strong> 3‑5 zile lucrătoare, în funcție de complexitate.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Cum te ajut personal?</strong> Consultanță gratuită, suport pe tot parcursul procesului, negociere cu banca.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>De ce este mai bine?</strong> Parteneriate extinse cu băncile, rată de aprobare superioară, soluții adaptate nevoilor tale.</p>

      {/* Benefits */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Beneficii cheie</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center"><CheckCircle className="w-6 h-6 text-green-600 mr-2" /><span>Rată de aprobare ridicată</span></div>
          <div className="flex items-center"><CheckCircle className="w-6 h-6 text-green-600 mr-2" /><span>Proces rapid și simplu</span></div>
          <div className="flex items-center"><CheckCircle className="w-6 h-6 text-green-600 mr-2" /><span>Consultanță gratuită</span></div>
          <div className="flex items-center"><CheckCircle className="w-6 h-6 text-green-600 mr-2" /><span>Condiții flexibile</span></div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Procesul de aprobare</h2>
        <ol className="list-decimal ml-5 space-y-2">
          <li>Contact inițial și evaluare nevoi</li>
          <li>Colectarea documentelor necesare</li>
          <li>Negocierea cu băncile partenere</li>
          <li>Prezentarea ofertei și semnarea contractului</li>
          <li>Eliberarea fondurilor și finalizarea achiziției</li>
        </ol>
      </section>

      {/* FAQ */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Întrebări frecvente</h2>
        <div className="space-y-2">
          <details className="border rounded p-2">
            <summary className="font-medium cursor-pointer">Cât timp durează aprobarea?</summary>
            <p className="mt-2">De regulă 3‑5 zile lucrătoare, în funcție de complexitatea dosarului.</p>
          </details>
          <details className="border rounded p-2">
            <summary className="font-medium cursor-pointer">Ce comisioane se percep?</summary>
            <p className="mt-2">Comisionul este negociat cu banca și depinde de tipul creditului; noi nu percepem taxe ascunse.</p>
          </details>
          <details className="border rounded p-2">
            <summary className="font-medium cursor-pointer">Este nevoie de avans?</summary>
            <p className="mt-2">Băncile pot solicita un avans între 5‑20% din valoarea tranzacției.</p>
          </details>
        </div>
      </section>

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
