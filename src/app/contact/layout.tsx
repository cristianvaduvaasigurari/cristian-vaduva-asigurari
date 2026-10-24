import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Cristian Văduva | Consultant Asigurări & Advisory București",
  description: "Contactează direct consultantul tău de asigurări. Programează consultanță strategică, solicită oferte Generali sau cere asistență dedicată.",
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/contact",
  },
  openGraph: {
    title: "Contact Cristian Văduva | Consultant Asigurări & Advisory București",
    description: "Contactează direct consultantul tău de asigurări. Programează consultanță strategică, solicită oferte Generali sau cere asistență dedicată.",
    url: "https://insurance.cristianvaduva.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
