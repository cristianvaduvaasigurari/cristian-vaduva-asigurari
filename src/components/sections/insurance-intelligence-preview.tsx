import Link from "next/link";
import {
  getFeaturedNewsArticle,
  getPublishedNewsArticles,
} from "@/data/insuranceNewsData";
import {
  ShieldCheck,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export function InsuranceIntelligencePreview() {
  const featured = getFeaturedNewsArticle();
  const allPublished = getPublishedNewsArticles();
  
  // Get 3 latest articles that are not the featured one
  const latestStories = allPublished
    .filter((a) => a.id !== featured?.id)
    .slice(0, 3);

  if (!featured && latestStories.length === 0) {
    return null;
  }

  return (
    <section
      id="intelligence"
      className="py-20 bg-slate-950/80 border-t border-b border-slate-800/60 relative overflow-hidden"
      aria-label="Insurance Intelligence News Preview"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>INSURANCE INTELLIGENCE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display">
              Știri, date și schimbări relevante din asigurări
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
              Analize editoriale obiective bazate pe date oficiale ASF, BAAR, UNSAR și legislația în vigoare.
            </p>
          </div>

          <Link
            href="/stiri"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/40 transition-all shadow-sm group shrink-0"
          >
            <span>Centrul de Informare</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 2-Column Layout: Featured Story on Left (5 cols), 3 Latest Stories on Right (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Featured Story */}
          {featured && (
            <div className="lg:col-span-5 flex flex-col">
              <div className="h-full p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/20 border border-amber-500/20 shadow-xl flex flex-col justify-between group hover:border-amber-500/40 transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      <Sparkles className="w-3 h-3" />
                      Analiză Principală
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {featured.readTime}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-slate-400 block mb-2">
                    {featured.categoryLabel}
                  </span>

                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors leading-snug mb-3">
                    <Link href={`/stiri/${featured.slug}`}>{featured.title}</Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 mb-6">
                    {featured.excerpt}
                  </p>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-1.5 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Sursă documentată:</span>
                      <span className="font-medium text-slate-200 truncate max-w-[200px]">
                        {featured.sourceName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Publicat:</span>
                      <span className="font-medium text-slate-300">
                        {new Date(featured.publishedAt).toLocaleDateString("ro-RO", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/stiri/${featured.slug}`}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md group/btn"
                >
                  <span>Citește analiza completă</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}

          {/* 3 Latest Stories Stack */}
          <div className={`${featured ? "lg:col-span-7" : "lg:col-span-12"} flex flex-col justify-between gap-4`}>
            {latestStories.map((story) => (
              <article
                key={story.id}
                className="p-5 sm:p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-amber-400 border border-slate-700">
                      {story.categoryLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 text-slate-400">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      {story.sourceName}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400 inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {new Date(story.publishedAt).toLocaleDateString("ro-RO", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                    <Link href={`/stiri/${story.slug}`}>{story.title}</Link>
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {story.excerpt}
                  </p>
                </div>

                <div className="sm:self-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  <Link
                    href={`/stiri/${story.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <span>Citește</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}

            {/* Bottom mini banner to view all */}
            <div className="p-4 rounded-xl bg-slate-900/30 border border-dashed border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Descoperă ghidurile de prevenție și legislația actualizată:</span>
              <Link
                href="/stiri"
                className="font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
              >
                <span>Toate cele {allPublished.length} analize</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
