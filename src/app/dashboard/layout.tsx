import { Navbar } from "@/components/layout/navbar";

export const metadata = {
  title: "Dashboard | Cristian Văduva",
  description: "Portal management leads",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 min-h-screen">
        {children}
      </main>
    </div>
  );
}
