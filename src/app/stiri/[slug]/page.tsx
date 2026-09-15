import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  getPublishedNewsArticles,
  getNewsArticleBySlug,
  getRelatedNewsArticles,
} from "@/data/insuranceNewsData";
import { newsArticleSchema } from "@/lib/structuredData";
import {
  ShieldCheck,
  Calendar,
  Clock,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Lightbulb,
  Building2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const articles = getPublishedNewsArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);

  if (!article) {
    return {
      title: "Articol negăsit | Insurance Intelligence Cristian Văduva",
      description: "Articolul căutat nu există sau a fost arhivat.",
    };
  }

  const url = `https://insurance.cristianvaduva.com/stiri/${article.slug}`;

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
      url,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      section: article.categoryLabel,
      tags: article.tags,
      locale: "ro_RO",
      siteName: "Cristian Văduva — Asigurări Premium & Partener Generali",
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.seoDescription,
    },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedNewsArticles(article.slug, 3);
  const structuredData = newsArticleSchema({
    headline: article.title,
    description: article.excerpt,
    url: `https://insurance.cristianvaduva.com/stiri/${article.slug}`,
    image: article.imageUrl,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    authorName: "Cristian Văduva",
    authorUrl: "https://insurance.cristianvaduva.com/despre-mine",
    publisherName: "Cristian Văduva — Asigurări Premium Generali",
    publisherUrl: "https://insurance.cristianvaduva.com",
    publisherLogo: "https://insurance.cristianvaduva.com/images/og-image.png",
    sourceName: article.sourceName,
    sourceUrl: article.sourceUrl,
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500/20 selection:text-amber-300">
        {/* Schema JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-amber-500/10 via-slate-900/0 to-transparent pointer-events-none blur-3xl -z-10" />

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center space-x-2 text-xs text-slate-400 mb-8 overflow-x-auto pb-2 scrollbar-none"
          >
            <Link
              href="/"
              className="hover:text-amber-400 transition-colors whitespace-nowrap"
            >
              Acasă
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <Link
              href="/stiri"
              className="hover:text-amber-400 transition-colors whitespace-nowrap"
            >
              Insurance Intelligence
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span className="text-slate-300 truncate max-w-[200px] sm:max-w-sm">
              {article.title}
            </span>
          </nav>

          {/* Back Button */}
          <Link
            href="/stiri"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Înapoi la toate analizele</span>
          </Link>

          {/* Meta badges header */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {article.categoryLabel}
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>
                {article.sourceType === "OFFICIAL"
                  ? "Sursă Oficială Verificată"
                  : "Raport Instituțional"}
              </span>
            </span>

            <div className="flex items-center gap-4 text-xs text-slate-400 ml-auto">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <time dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString("ro-RO", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {article.readTime} lectură
              </span>
            </div>
          </div>

          {/* Main Title & Subtitle */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6 font-display">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed border-l-2 border-amber-500/40 pl-4 mb-8 bg-slate-900/30 py-3 rounded-r-lg">
            {article.subtitle}
          </p>

          {/* Author & Verification Card */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 mb-10 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-bold text-slate-950 text-sm">
                CV
              </div>
              <div>
                <p className="font-semibold text-slate-200">
                  Analiză & Sinteză: Cristian Văduva
                </p>
                <p className="text-slate-400">
                  Consultant Autorizat Asigurări • Partener Generali
                </p>
              </div>
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-slate-500">Sursă primară:</p>
              <p className="font-medium text-slate-300 truncate max-w-xs">
                {article.sourceName}
              </p>
            </div>
          </div>

          {/* Key Takeaways Box */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <section
              aria-labelledby="key-takeaways-heading"
              className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/20 border border-amber-500/20 shadow-lg mb-12 relative overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-4 text-amber-400">
                <Sparkles className="w-4 h-4" />
                <h2
                  id="key-takeaways-heading"
                  className="text-xs font-bold uppercase tracking-wider text-amber-400"
                >
                  Puncte Cheie & Esențialul Analizei
                </h2>
              </div>
              <ul className="space-y-3">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-slate-200 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Structured Editorial Content Body */}
          <div className="space-y-10 text-slate-300 leading-relaxed">
            {/* 1. Ce s-a întâmplat */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5 text-white">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <FileText className="w-4 h-4" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                  1. Ce s-a întâmplat
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-300 pl-9">
                {article.structuredContent.whatHappened}
              </p>
            </section>

            {/* 2. Datele importante */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5 text-white">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Building2 className="w-4 h-4" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                  2. Datele importante & Cifre oficiale
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-300 pl-9">
                {article.structuredContent.importantData}
              </p>
            </section>

            {/* 3. Context */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5 text-white">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                  3. Context de piață & legislativ
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-300 pl-9">
                {article.structuredContent.context}
              </p>
            </section>

            {/* 4. Ce înseamnă pentru asigurați */}
            <section className="space-y-3 p-5 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="flex items-center gap-2.5 text-white">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                  4. Ce înseamnă pentru tine
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-300 pl-9">
                {article.structuredContent.whatItMeans}
              </p>
            </section>

            {/* 5. Ce trebuie să știe un client */}
            <section className="space-y-3 p-5 rounded-xl bg-amber-950/20 border border-amber-500/20">
              <div className="flex items-center gap-2.5 text-amber-400">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  5. Ce trebuie să verifici în contractul tău
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-300 pl-9">
                {article.structuredContent.whatClientMustKnow}
              </p>
            </section>

            {/* 6. Concluzie */}
            <section className="space-y-3 pt-4">
              <div className="flex items-center gap-2.5 text-white">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                  6. Concluzie & Recomandare practică
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-300 pl-9 font-medium">
                {article.structuredContent.conclusion}
              </p>
            </section>
          </div>

          {/* Source Attribution Box */}
          <div className="mt-12 p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Sursa Originală Documentată
              </p>
              <p className="text-sm font-bold text-slate-200 mt-1">
                {article.sourceName}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Verificat și integrat editorial conform normelor în vigoare la data de{" "}
                {article.publishedAt}.
              </p>
            </div>
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all shrink-0 group"
            >
              <span>Accesează Sursa Oficială</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Related Service Cross-Link Banner */}
          {article.relatedServiceSlug && article.relatedServiceName && (
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider font-bold text-amber-400">
                  Soluție Corelată de Protecție
                </span>
                <h3 className="text-base font-bold text-white">
                  Consultă detaliile complete pentru: {article.relatedServiceName}
                </h3>
                <p className="text-xs text-slate-400">
                  Descoperă clauzele specifice, excluderile și modalitatea de despăgubire.
                </p>
              </div>
              <Link
                href={`/servicii/${article.relatedServiceSlug}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors shrink-0 group"
              >
                <span>Vezi Detalii Serviciu</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          )}

          {/* Audit & Diagnostic CTA Box (Reusing Existing Lead Form Flow) */}
          <section
            aria-labelledby="cta-policy-audit"
            className="mt-14 p-8 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-slate-950 shadow-xl relative overflow-hidden"
          >
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-950/15 text-slate-950 mb-3">
                Audit & Diagnostic Gratuit
              </span>
              <h2
                id="cta-policy-audit"
                className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-3"
              >
                Ai o poliță pe care vrei să o verificăm?
              </h2>
              <p className="text-sm sm:text-base text-slate-900 font-medium leading-relaxed mb-6">
                Înainte să alegi sau să reînnoiești, hai să vedem clar ce cumperi, ce acoperiri
                ai și ce riscuri rămân expuse conform noilor reglementări.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-slate-950 text-white hover:bg-slate-900 transition-all shadow-md group"
                >
                  <span>CERE OFERTĂ & AUDIT</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/stiri"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-slate-950/10 hover:bg-slate-950/20 text-slate-950 transition-colors"
                >
                  <span>Explorează mai multe analize</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="mt-20 pt-12 border-t border-slate-800/80">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Analize și Știri Conexe
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Informații documentate din aceeași categorie de risc
                  </p>
                </div>
                <Link
                  href="/stiri"
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 group"
                >
                  <span>Toate analizele</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <article
                    key={rel.id}
                    className="p-5 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3">
                        <span className="text-amber-400 font-medium">
                          {rel.categoryLabel}
                        </span>
                        <span>{rel.readTime}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug mb-2">
                        <Link href={`/stiri/${rel.slug}`}>{rel.title}</Link>
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                        {rel.excerpt}
                      </p>
                    </div>

                    <Link
                      href={`/stiri/${rel.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors pt-2 border-t border-slate-800/60"
                    >
                      <span>Citește analiza</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
