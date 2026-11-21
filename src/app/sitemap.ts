import type { MetadataRoute } from "next";
import { profile, projects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/portfolio", "/cv", "/contact", "/blog"];
  const projectRoutes = projects.map((project) => `/portfolio/${project.slug}`);
  return [...staticRoutes, ...projectRoutes].map((path) => ({
    url: `${profile.website}${path}`,
  }));
}
