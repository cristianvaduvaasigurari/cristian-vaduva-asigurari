import { createClient } from "@/lib/supabase/server";
import { verifyAdminAuthorization } from "@/lib/auth";
import { formatDistanceToNow } from "date-fns";
import { ro } from "date-fns/locale";
import Link from "next/link";

export default async function DashboardPage() {
  const authResult = await verifyAdminAuthorization();

  if (!authResult.isAuthorized) {
    if (authResult.reason === "forbidden") {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="glass max-w-md w-full p-8 rounded-2xl border border-red-500/20 text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-4 text-xl font-bold" aria-hidden="true">
              🚫
            </div>
            <h1 className="text-2xl font-heading font-bold mb-2 text-foreground">Acces Refuzat (403)</h1>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Contul tău este autentificat, dar nu deține rolul administrativ necesar pentru a vizualiza sau gestiona datele confidențiale ale lead-urilor.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2.5 bg-foreground text-background font-medium rounded-full text-sm hover:opacity-90 transition-opacity"
            >
              Înapoi pe prima pagină
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="glass max-w-md w-full p-8 rounded-2xl border border-border text-center">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-4 text-xl font-bold" aria-hidden="true">
            🔒
          </div>
          <h1 className="text-2xl font-heading font-bold mb-2">Acces Restricționat</h1>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Portalul de administrare a lead-urilor este protejat. Este necesară autentificarea cu un cont de administrator autorizat.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 bg-foreground text-background font-medium rounded-full text-sm hover:opacity-90 transition-opacity"
          >
            Înapoi pe prima pagină
          </Link>
        </div>
      </div>
    );
  }

  const supabase = await createClient();

  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4 text-red-500">Eroare la încărcarea datelor</h1>
        <p className="text-muted-foreground">{error.message}</p>
        <p className="text-sm mt-4">Note: Verifică politicile RLS în consola Supabase.</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Portal Lead-uri</h1>
          <p className="text-muted-foreground">Gestionează mesajele și cererile primite de pe website.</p>
        </div>
        <div className="glass px-4 py-2 rounded-full text-sm font-medium">
          Total: {leads?.length || 0}
        </div>
      </div>

      <div className="grid gap-6">
        {!leads || leads.length === 0 ? (
          <div className="text-center py-20 glass rounded-lg border border-dashed border-border">
            <h3 className="text-xl font-bold mb-2">Nu există lead-uri</h3>
            <p className="text-muted-foreground">Mesajele noi vor apărea aici.</p>
          </div>
        ) : (
          leads.map((lead) => (
            <div key={lead.id} className="glass p-6 rounded-2xl border border-border/50 hover:border-border transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    {lead.name}
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-500 font-medium">
                      {lead.service_type}
                    </span>
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true, locale: ro })}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm font-medium">
                  <a href={`tel:${lead.phone}`} className="hover:text-blue-500 transition-colors px-3 py-1.5 rounded-full bg-accent">
                    {lead.phone}
                  </a>
                  <a href={`mailto:${lead.email}`} className="hover:text-blue-500 transition-colors px-3 py-1.5 rounded-full bg-accent">
                    {lead.email}
                  </a>
                </div>
              </div>
              
              {lead.message && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <p className="text-muted-foreground whitespace-pre-wrap">{lead.message}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
