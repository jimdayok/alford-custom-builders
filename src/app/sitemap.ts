import type { MetadataRoute } from "next";

import { portfolioProjects } from "@/data/portfolio";
import { siteConfig } from "@/lib/site-data";

const routes = ["", "/about", "/services", "/portfolio", "/our-process", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const projectRoutes = portfolioProjects.map((project) => ({
    url: `${siteConfig.url}/portfolio/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
