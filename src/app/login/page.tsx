import { verifyAdminAuthorization } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/auth/admin-login-form";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Autentificare Administrator | Cristian Văduva Asigurări",
  description: "Portal securizat de administrare pentru Cristian Văduva Asigurări.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LoginPage() {
  const authResult = await verifyAdminAuthorization();

  // If already authorized as admin, redirect directly to dashboard
  if (authResult.isAuthorized) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <AdminLoginForm redirectTo="/dashboard" />
    </div>
  );
}
