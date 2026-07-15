import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cristian Văduva - beneficiu Portfolio",
    short_name: "Cristian Văduva",
    description: "Platformă beneficiu pentru servicii de Asigurări Generali, Real Estate, AiXbeneficiu și Ecosistemul AiX OS.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
