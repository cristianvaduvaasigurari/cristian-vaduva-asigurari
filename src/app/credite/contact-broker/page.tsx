"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/sections/contact-form';

export default function ContactBrokerCreditePage() {
  return (
    <section className="container mx-auto py-12 px-4">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-foreground">Contactează un Broker Credite</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Un broker de credite îți simplifică procesul financiar: economisește timp, reduci costurile și elimini stresul. Obții oferte personalizate și suport complet până la semnarea contractului.
        </p>
      </div>

      {/* Why contact a broker? */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          { title: 'Comparăm ofertele mai multor bănci', icon: '🏦' },
          { title: 'Negociem condiții mai bune', icon: '🤝' },
          { title: 'Te ajutăm cu documentele', icon: '📄' },
          { title: 'Economisești timp', icon: '⏱️' },
          { title: 'Primești răspuns rapid', icon: '⚡' },
          { title: 'Sprijin până la semnarea contractului', icon: '🖋️' }
        ].map((item, i) => (
          <div key={i} className="glass premium-card p-8 rounded-[2.5rem] text-center flex flex-col items-center">
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
          </div>
        ))}
      </div>

      {/* Process Timeline */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-foreground text-center">Cum colaborăm</h2>
        <ol className="list-decimal ml-6 space-y-4 text-lg text-muted-foreground">
          <li>Discuție inițială pentru a înțelege nevoile și bugetul</li>
          <li>Analiza situației financiare și profilului de credit</li>
          <li>Alegerea băncilor potrivite și a ofertei optimale</li>
          <li>Pregătirea dosarului complet și verificarea documentelor</li>
          <li>Depunerea cererii la bancă și negocierea condițiilor</li>
          <li>Aprobare și obținere ofertă finală</li>
          <li>Semnarea contractului și suport până la finalizare</li>
        </ol>
      </div>

      {/* Contact Form */}
      <div className="max-w-3xl mx-auto mb-12">
        <ContactForm customTitle="Solicită o consultanță gratuită" />
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link href="/credite/contact-broker" passHref>
          <Button size="lg" variant="default" className="rounded-full px-8">
            Cere o consultație gratuită acum
          </Button>
        </Link>
      </div>
    </section>
  );
}
