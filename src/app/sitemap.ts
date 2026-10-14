import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-data";
import { portfolioProjects } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/services", "/portfolio", "/available", "/contact", ...portfolioProjects.map((project) => `/portfolio/${project.slug}`)];
  return paths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
