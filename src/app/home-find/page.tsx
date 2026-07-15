import * as React from "react";
import Link from "next/link";
import { ArrowRight, Shield, Home, Search, Activity, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Home Find™ | Cristian Văduva",
  description: "The beneficiu ecosystem connecting property acquisition with intelligent insurance solutions."
};

export default function HomeFindPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 to-white/0 -z-10" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/50 text-amber-800 text-sm font-medium mb-8 border border-amber-200/50">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
              Ecosistem beneficiu AiX
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
              Home Find™ <br />
              <span className="text-slate-400">Find. Buy. Protect.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              The beneficiu ecosystem connecting property acquisition with intelligent insurance solutions. 
              Because buying a property and protecting it should be one continuous experience.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full bg-slate-900 text-white hover:bg-slate-800 h-14 px-8 text-base shadow-xl">
                <a href="https://real-estate-platform-brown.vercel.app/" target="_blank" rel="noopener noreferrer">
                  Explore Home Find™ <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-slate-200 hover:bg-slate-50 h-14 px-8 text-base">
                <Link href="/contact">
                  Request Insurance Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What is Home Find™ */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Redefining the Journey
            </h2>
            <p className="text-lg text-slate-600">
              Home Find™ is not just a real estate platform. It is an end-to-end luxury-assets ecosystem managed by Cristian Văduva and Generali România.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Curated Selection</h3>
              <p className="text-slate-600">beneficiu properties vetted for quality, location, and investment potential.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 text-amber-600">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Immediate Protection</h3>
              <p className="text-slate-600">Seamlessly integrate Generali insurance solutions the moment you acquire your asset.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">AiX OS Integration</h3>
              <p className="text-slate-600">Monitor your asset's value and protection status in real-time within the AiX Ecosystem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                Featured Properties
              </h2>
              <p className="text-lg text-slate-600">
                Discover a selection of beneficiu real estate, ready for immediate acquisition and comprehensive protection.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-full border-slate-200 group">
              <a href="https://real-estate-platform-brown.vercel.app/" target="_blank" rel="noopener noreferrer">
                View All on Home Find™ <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>



          <div className="mt-12 text-center max-w-2xl mx-auto p-6 bg-amber-50/50 border border-amber-100 rounded-3xl">
            <Shield className="w-8 h-8 text-amber-600 mx-auto mb-4" />
            <h4 className="font-bold text-lg mb-2">Why Protect Immediately?</h4>
            <p className="text-slate-600 text-sm">
              Buying a property is only the first step. Protecting your investment from day one is equally important. Our integrated Generali solutions ensure zero coverage gaps during your transition.
            </p>
          </div>
        </div>
      </section>

      {/* Ecosystem Diagram Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              The Asset Lifecycle
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A continuous flow from discovery to long-term preservation, managed entirely within the AiX ecosystem.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-4">
              
              <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm relative">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Search className="w-8 h-8" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold mb-1">Property Discovery</h3>
                  <p className="text-slate-400 text-sm">Find your ideal beneficiu asset through Home Find™.</p>
                </div>
              </div>

              <div className="flex justify-center -my-2 relative z-10 text-slate-600">
                <ArrowRight className="w-6 h-6 rotate-90 md:rotate-0" />
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm relative">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Home className="w-8 h-8" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold mb-1">Property Purchase</h3>
                  <p className="text-slate-400 text-sm">Secure the asset smoothly and safely.</p>
                </div>
              </div>

              <div className="flex justify-center -my-2 relative z-10 text-slate-600">
                <ArrowRight className="w-6 h-6 rotate-90 md:rotate-0" />
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm relative">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Shield className="w-8 h-8" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold mb-1">Insurance Protection</h3>
                  <p className="text-slate-400 text-sm">Immediate, custom coverage through Generali România.</p>
                </div>
              </div>

              <div className="flex justify-center -my-2 relative z-10 text-slate-600">
                <ArrowRight className="w-6 h-6 rotate-90 md:rotate-0" />
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm relative">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                  <Activity className="w-8 h-8" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold mb-1">AiX OS Monitoring</h3>
                  <p className="text-slate-400 text-sm">Track your property's value and insurance status digitally.</p>
                </div>
              </div>

              <div className="flex justify-center -my-2 relative z-10 text-slate-600">
                <ArrowRight className="w-6 h-6 rotate-90 md:rotate-0" />
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm relative">
                <div className="w-16 h-16 rounded-2xl bg-slate-700 text-white flex items-center justify-center shrink-0">
                  <Lock className="w-8 h-8" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold mb-1">Long-term Asset Protection</h3>
                  <p className="text-slate-400 text-sm">Continuous optimization of your real estate portfolio.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Ready to Begin?
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Experience the future of real estate and insurance integration. 
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full bg-slate-900 text-white hover:bg-slate-800 h-14 px-8 text-base shadow-xl">
              <a href="https://real-estate-platform-brown.vercel.app/" target="_blank" rel="noopener noreferrer">
                Explore Home Find™
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-slate-200 hover:bg-slate-50 h-14 px-8 text-base">
              <Link href="/contact">
                Request Insurance Consultation
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
