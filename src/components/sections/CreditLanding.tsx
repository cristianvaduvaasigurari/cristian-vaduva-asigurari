"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/sections/contact-form";

type Benefit = { title: string; icon: string };
	type FAQLink = { href: string; text: string };

interface CreditLandingProps {
  heroTitle: string;
  heroSubtitle: string;
  benefits: Benefit[];
  steps: string[];
  ctaLink: string;
  ctaText: string;
  faqLinks: FAQLink[];
}

export function CreditLanding({
  heroTitle,
  heroSubtitle,
  benefits,
  steps,
  ctaLink,
  ctaText,
  faqLinks,
}: CreditLandingProps) {
  return (
    <section className="container mx-auto py-12 px-4">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">{heroTitle}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{heroSubtitle}</p>
      </div>

      {/* Benefits */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {benefits.map((item, i) => (
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
          {steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </div>

      {/* Contact Form */}
      <div className="max-w-3xl mx-auto mb-12">
        <ContactForm customTitle="Solicită o consultanță gratuită" />
      </div>

      {/* FAQ Preview */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-foreground text-center">Întrebări frecvente</h2>
        <ul className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto list-disc list-inside text-muted-foreground">
          {faqLinks.map((link, i) => (
            <li key={i}>
              <Link href={link.href} className="hover:text-foreground transition-colors">
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link href={ctaLink} passHref>
          <Button size="lg" variant="default" className="rounded-full px-8">
            {ctaText}
          </Button>
        </Link>
      </div>
    </section>
  );
}
