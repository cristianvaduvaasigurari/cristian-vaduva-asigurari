"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/sections/contact-form';
import { CONTACT } from '@/config/contact';
import { Phone, Mail, User } from 'lucide-react';

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

      {/* Benefits */}
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
          <li>Alegerea băncilor potrivite și a ofertei optime</li>
          <li>Pregătirea dosarului complet și verificarea documentelor</li>
          <li>Depunerea cererii la bancă și negocierea condițiilor</li>
          <li>Aprobare și obținere ofertă finală</li>
          <li>Semnarea contractului și suport până la finalizare</li>
        </ol>
      </div>

      {/* Contact Information */}
      <div className="mb-12 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-foreground">Contact direct</h3>
          <p className="flex items-center text-muted-foreground"><User className="w-5 h-5 mr-2" /> Cristian Văduva</p>
          <p className="flex items-center text-muted-foreground"><Phone className="w-5 h-5 mr-2" /> {CONTACT.phone.display}</p>
          <p className="flex items-center text-muted-foreground"><Mail className="w-5 h-5 mr-2" /> {CONTACT.email.display}</p>
        </div>
        <div className="text-center">
          <Button size="lg" variant="default" className="rounded-full px-8">
            <Link href={CONTACT.phone.href}>Sună acum</Link>
          </Button>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-3xl mx-auto mb-12">
        <ContactForm customTitle="Solicită o consultanță gratuită" />
      </div>

      {/* FAQ Preview */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-foreground text-center">Întrebări frecvente</h2>
        <ul className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto list-disc list-inside text-muted-foreground">
          <li><Link href="/credite/faq#intrebare1" className="hover:text-foreground transition-colors">Ce documente sunt necesare pentru un credit ipotecar?</Link></li>
          <li><Link href="/credite/faq#intrebare2" className="hover:text-foreground transition-colors">Cât timp durează aprobarea unui credit?</Link></li>
          <li><Link href="/credite/faq#intrebare3" className="hover:text-foreground transition-colors">Pot negocia rata dobânzii cu brokerul?</Link></li>
          <li><Link href="/credite/faq#intrebare4" className="hover:text-foreground transition-colors">Ce se întâmplă dacă nu pot rambursa creditul?</Link></li>
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link href="/credite/contact" passHref>
          <Button size="lg" variant="default" className="rounded-full px-8">
            Cere o consultație gratuită acum
          </Button>
        </Link>
      </div>
    </section>
  );
}
