import { createClient } from "@/lib/supabase/server";
import { verifyAdminAuthorization } from "@/lib/auth";
import { formatDistanceToNow } from "date-fns";
import { ro } from "date-fns/locale";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { ShieldAlert, Inbox, Phone, Mail, Clock } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Portal Lead-uri | Cristian Văduva Asigurări",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardPage() {
  const authResult = await verifyAdminAuthorization();

  if (!authResult.isAuthorized) {
    if (authResult.reason === "forbidden") {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="glass max-w-md w-full p-8 rounded-2xl border border-red-500/20 text-center">
            <div
              className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-4 text-xl font-bold"
              aria-hidden="true"
            >
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-heading font-bold mb-2 text-foreground">Acces Refuzat (403)</h1>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Contul tău ({authResult.user?.email || "autentificat"}) nu deține rolul administrativ necesar pentru a vizualiza sau gestiona datele confidențiale ale lead-urilor.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <SignOutButton redirectTo="/dashboard" />
              <Link
                href="/"
                className="inline-block px-5 py-2 border border-border text-foreground font-medium rounded-md text-sm hover:bg-accent transition-colors"
              >
                Înapoi pe prima pagină
              </Link>
            </div>
          </div>
        </div>
      );
    }

    // Unauthenticated visitor -> strictly redirect to /login
    redirect("/login");
  }

  const supabase = await createClient();

  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="min-h-screen bg-background p-8 max-w-7xl mx-auto flex items-center justify-center">
        <div className="glass p-8 rounded-2xl border border-red-500/20 max-w-lg w-full text-center">
          <h1 className="text-2xl font-bold mb-2 text-red-500">Eroare la încărcarea datelor</h1>
          <p className="text-sm text-muted-foreground mb-6">{error.message}</p>
          <div className="flex items-center justify-center gap-3">
            <SignOutButton redirectTo="/dashboard" />
            <Link
              href="/"
              className="px-4 py-2 border border-border text-foreground rounded-md text-sm hover:bg-accent transition-colors"
            >
              Înapoi pe prima pagină
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 pb-6 border-b border-border/40">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-semibold uppercase tracking-wider">
              Panou Administrator
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              {authResult.user?.email}
            </span>
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Portal Lead-uri</h1>
          <p className="text-sm text-muted-foreground mt-1">Gestionează mesajele și cererile primite de pe website.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass px-4 py-2 rounded-lg text-sm font-medium border border-border/50">
            Total înregistrări: <span className="text-blue-500 font-bold ml-1">{leads?.length || 0}</span>
          </div>
          <SignOutButton redirectTo="/dashboard" />
        </div>
      </div>

      <div className="grid gap-4">
        {!leads || leads.length === 0 ? (
          <div className="text-center py-20 glass rounded-2xl border border-dashed border-border">
            <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
            <h3 className="text-xl font-bold mb-1">Nu există lead-uri</h3>
            <p className="text-sm text-muted-foreground">Mesajele noi trimise prin formularele de pe site vor apărea aici.</p>
          </div>
        ) : (
          leads.map((lead) => (
            <div key={lead.id} className="glass p-6 rounded-2xl border border-border/50 hover:border-border transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-lg font-bold flex items-center gap-2 text-foreground">
                    {lead.name || "Anonim"}
                    {lead.service_type && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 font-medium border border-blue-500/20">
                        {lead.service_type}
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>
                      {lead.created_at ? formatDistanceToNow(new Date(lead.created_at), { addSuffix: true, locale: ro }) : "-"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
                  {lead.phone && (
                    <a
                      href={`tel:${lead.phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/60 hover:bg-accent text-foreground transition-colors border border-border/40 text-xs"
                    >
                      <Phone className="w-3.5 h-3.5 text-blue-500" />
                      {lead.phone}
                    </a>
                  )}
                  {lead.email && (
                    <a
                      href={`mailto:${lead.email}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/60 hover:bg-accent text-foreground transition-colors border border-border/40 text-xs"
                    >
                      <Mail className="w-3.5 h-3.5 text-blue-500" />
                      {lead.email}
                    </a>
                  )}
                </div>
              </div>
              
              {lead.message && (
                <div className="mt-3 pt-3 border-t border-border/40">
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">{lead.message}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
