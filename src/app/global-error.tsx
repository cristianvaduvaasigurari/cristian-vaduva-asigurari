"use client";

import * as React from "react";
import Link from "next/link";
import { captureException } from "@/lib/sentry";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const correlationId = error.digest || "ERR-GEN";

  React.useEffect(() => {
    captureException(error, {
      route: "global-error",
      extra: { digest: error.digest },
    });
  }, [error]);

  return (
    <html lang="ro">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <main
          role="alert"
          aria-live="assertive"
          className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl"
        >
          <div className="w-14 h-14 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
            !
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            A intervenit o eroare temporară
          </h1>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            Echipa noastră tehnică a fost notificată automat. Te rugăm să încerci reîncărcarea paginii.
          </p>

          {correlationId && (
            <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 mb-6 text-xs text-slate-400 font-mono">
              ID Referință: <span className="text-slate-200 select-all">{correlationId}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => reset()}
              type="button"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-full text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Reîncearcă
            </button>
            <Link
              href="/"
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-full text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Înapoi pe site
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
