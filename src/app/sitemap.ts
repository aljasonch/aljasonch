import type { MetadataRoute } from "next";
import { profile } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/portfolio", "/cv", "/contact", "/blog"].map((path) => ({
    url: `${profile.website}${path}`,
  }));
}
