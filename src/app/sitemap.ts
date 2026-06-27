import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-data";

const routes = ["", "/about", "/services", "/portfolio", "/our-process", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
