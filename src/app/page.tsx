import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Ecosystem } from "@/components/sections/ecosystem";

import { ContactForm } from "@/components/sections/contact-form";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <section id="servicii"><Services /></section>
        <Ecosystem />
        
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
