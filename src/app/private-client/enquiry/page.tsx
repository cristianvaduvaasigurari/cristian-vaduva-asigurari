import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PrivateClientEnquiryForm } from "@/components/private-client/PrivateClientEnquiryForm";
import { ShieldCheck, Lock, ChevronRight, Phone, Mail, MessageSquare } from "lucide-react";
import { CONTACT } from "@/config/contact";

export const metadata: Metadata = {
  title: "Confidential Enquiry | Private Client Insurance | Cristian Văduva",
  description:
    "Direct confidential enquiry for private client insurance advisory. Bespoke assessment for supercars, yachts, aviation, fine art, jewellery and luxury estates.",
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/private-client/enquiry",
  },
  openGraph: {
    title: "Confidential Enquiry | Private Client Insurance | Cristian Văduva",
    description: "Confidential insurance assessment for extraordinary personal assets and complex risks.",
    url: "https://insurance.cristianvaduva.com/private-client/enquiry",
    siteName: "Cristian Văduva — Private Client",
    locale: "ro_RO",
    type: "website",
  },
};

export default function PrivateClientEnquiryPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0b0d10] text-zinc-100 min-h-screen pt-36 pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-wider mb-8">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Insurance</Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <Link href="/private-client" className="hover:text-zinc-300 transition-colors">Private Client</Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-zinc-300 font-semibold">Confidential Enquiry</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold tracking-widest uppercase mb-4">
                <Lock className="w-3.5 h-3.5 text-zinc-400" />
                DIRECT ADVISORY CHANNEL
              </div>

              <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white tracking-tight leading-tight mb-4">
                Private Client Enquiry
              </h1>

              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
                Tell us what you would like to protect. Cristian Văduva conducts an individual assessment of your asset profile, risk concentration, and placement route before presenting structured advisory recommendations.
              </p>
            </div>

            <div className="lg:col-span-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-xs text-zinc-400 space-y-3">
              <div className="font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Guaranteed Discretion
              </div>
              <p className="leading-relaxed">
                All communications, asset schedules, and valuation registries are managed under strict confidentiality standards. No automated distribution to third parties.
              </p>
              <div className="pt-3 border-t border-zinc-800/80 space-y-1 text-zinc-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Direct: {CONTACT.phone.display}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp: {CONTACT.whatsapp.display}</span>
                </div>
              </div>
            </div>
          </div>

          <PrivateClientEnquiryForm sourceContext="Dedicated Enquiry Page" />

          {/* Footnote */}
          <div className="mt-16 text-center text-xs text-zinc-600 max-w-3xl mx-auto leading-relaxed">
            Coverage, eligibility, limits, exclusions and availability are subject to underwriting, policy terms and applicable requirements. Private Client operates as a specialist advisory and placement division.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
