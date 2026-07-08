import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Ecosystem } from "@/components/sections/ecosystem";
import { TestimonialsFaq } from "@/components/sections/testimonials-faq";
import { ContactForm } from "@/components/sections/contact-form";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <Ecosystem />
        <TestimonialsFaq />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
