import type { MetadataRoute } from "next";
import { objects } from "@/data/objects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://slasher.example";
  const routes = ["", "/collection", "/mint", "/studio", "/roadmap", "/doc"];
  return [
    ...routes.map((route) => ({ url: `${baseUrl}${route}`, changeFrequency: "monthly" as const, priority: route === "" ? 1 : .7 })),
    ...objects.map((object) => ({ url: `${baseUrl}/collection/${object.slug}`, changeFrequency: "monthly" as const, priority: .5 })),
  ];
}
