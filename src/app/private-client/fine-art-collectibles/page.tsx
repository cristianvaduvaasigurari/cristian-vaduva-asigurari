import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PrivateClientCategoryView } from "@/components/private-client/PrivateClientCategoryView";
import { privateClientCategories } from "@/data/privateClientData";

const category = privateClientCategories["fine-art-collectibles"];

export const metadata: Metadata = {
  title: category.seoTitle,
  description: category.seoDescription,
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/private-client/fine-art-collectibles",
  },
  openGraph: {
    title: category.seoTitle,
    description: category.seoDescription,
    url: "https://insurance.cristianvaduva.com/private-client/fine-art-collectibles",
    siteName: "Cristian Văduva — Private Client",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: category.seoTitle,
    description: category.seoDescription,
  },
};

export default function FineArtCollectiblesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PrivateClientCategoryView category={category} />
      </main>
      <Footer />
    </>
  );
}
