import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Întrebări frecvente - Credite - Cristian Văduva Premium',
  description: 'Răspunsuri la cele mai comune întrebări despre creditele ipotecare, refinanțare, credit pentru nevoi personale și alte produse de creditare.'
};

export default function CreditsFAQPage() {
  const questions = [
    { q: 'Ce venit minim trebuie să am?', a: 'În general, băncile cer un venit net lunar de minimum 2‑3 ori valoarea ratei lunare estimate.' },
    { q: 'Ce avans este necesar?', a: 'Avansul variază între 5‑20% din valoarea creditului, în funcție de tipul de credit și de bancă.' },
    { q: 'Pot aplica dacă sunt PFA?', a: 'Da, PFA‑urile pot accesa credite, dar de obicei este nevoie de documente suplimentare și un istoric financiar solid.' },
    { q: 'Pot refinanța un credit existent?', a: 'Refinanțarea este posibilă dacă noua ofertă are o rată mai mică sau condiții mai avantajoase decât creditul actual.' },
    { q: 'Ce verifică banca?', a: 'Banca analizează creditul, istoricul de plată, veniturile, datoriile existente și valoarea garanției (ex. imobil).' },
    { q: 'În cât timp primesc aprobarea?', a: 'În general, aprobarea durează între 3 și 10 zile lucrătoare, în funcție de complexitatea dosarului.' },
    { q: 'Pot cumpăra prin firmă?', a: 'Da, există credite dedicate persoanelor juridice, dar banca cere documente de înregistrare a firmei și situații financiare.' },
    { q: 'Ce documente sunt necesare?', a: 'Act de identitate, adeverință de venit, contract de vânzare‑cumpărare (dacă este cazul), extras de carte funciară și alte documente specifice băncii.' },
    { q: 'Care este diferența dintre dobândă fixă și variabilă?', a: 'Dobânda fixă rămâne constantă pe toată durata creditului, în timp ce cea variabilă se poate modifica în funcție de evoluția indicelui de referință.' },
    { q: 'Pot aplica dacă lucrez în străinătate?', a: 'Da, dar trebuie să furnizezi documente care să ateste veniturile și stabilitatea locului de muncă în străinătate.' },
    { q: 'Pot obține un credit fără avans?', a: 'În majoritatea cazurilor, un avans este obligatoriu, însă pentru anumite produse speciale există posibilitatea unui credit fără avans, de regulă cu costuri mai mari.' },
    { q: 'Ce costuri apar pe lângă credit?', a: 'Costurile includ comisioane de analiză, evaluarea garanției, asigurarea de viață, taxe notariale și eventuale penalități de rambursare anticipată.' },
    { q: 'Ce face brokerul în tot procesul?', a: 'Brokerul compară ofertele multiple, negociază condițiile, te asistă în completarea dosarului și urmărește aprobarea până la semnare.' },
    { q: 'Cum se calculează rata lunară?', a: 'Rata se calculează în funcție de suma împrumutată, durata creditului, dobânda și eventuale comisioane adiționale.' },
    { q: 'Este posibil să reduc rata prin refinanțare?', a: 'Da, refinanțarea poate reduce rata dacă găsești o ofertă cu dobândă mai mică sau condiții mai bune.' },
    { q: 'Cât durează semnarea contractului?', a: 'După aprobarea finală, semnarea poate avea loc în aceeași zi sau în câteva zile, în funcție de disponibilitatea părților.' },
    { q: 'Pot achita creditul anticipat?', a: 'Da, creditul poate fi răscutit anticipat, de regulă cu o penalizare de 1‑2% din valoarea rămasă, în funcție de contract.' },
    { q: 'Există asigurări obligatorii?', a: 'Pentru creditele ipotecare este obligatorie asigurarea de viață și de locuință, alte tipuri de credite pot avea asigurări opționale.' },
    { q: 'Cum aleg cel mai bun tip de credit?', a: 'Brokerul analizează nevoile tale, profilul financiar și obiectivele pentru a recomanda cea mai potrivită soluție.' },
    { q: 'Ce se întâmplă dacă nu pot plăti ratele?', a: 'În caz de dificultăți, poți discuta cu banca pentru restructurarea creditului sau alte soluții de refinanțare.' },
    { q: 'Există credite pentru achiziția de terenuri?', a: 'Da, există credite dedicate achiziționării de terenuri, de regulă cu condiții specifice de evaluare a proprietății.' },
    { q: 'Ce diferență există între creditul pentru construcții și creditul pentru renovare?', a: 'Pentru construcții se finanțează construcția de la zero, iar pentru renovare se finanțează lucrările de reparație sau îmbunătățire a unei proprietăți existente.' },
    { q: 'Este posibil să obțin un credit pentru un proiect verde?', a: 'Da, creditele verzi oferă condiții avantajoase pentru proiecte ecologice, cum ar fi izolații, panouri solare etc.' },
    { q: 'Cum pot consulta stadiul solicitării mele?', a: 'Brokerul îți furnizează actualizări periodice și poți urmări progresul direct prin platforma noastră online.' },
    { q: 'De ce să aleg un broker în loc să aplic direct la bancă?', a: 'Brokerul economisește timp, negociază condiții mai bune și îți oferă suport pe parcursul întregului proces.' }
  ];

  return (
    <section className="container mx-auto py-12 px-4">
      <h1 className="text-5xl font-bold mb-8 text-center text-foreground">Întrebări frecvente – Credite</h1>
      <div className="space-y-4 max-w-3xl mx-auto">
        {questions.map((item, idx) => (
          <details key={idx} className="border rounded-lg p-4 bg-background/30">
            <summary className="font-medium cursor-pointer text-lg text-foreground">{item.q}</summary>
            <p className="mt-2 text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link href="/credite/contact-broker" passHref>
          <Button size="lg" variant="default" className="rounded-full px-8">
            Cere o consultație gratuită acum
          </Button>
        </Link>
      </div>
    </section>
  );
}
