import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-data";
import { getJournalPosts, getPortfolioProjects } from "@/lib/cms/published-content";

const routes = ["", "/about", "/services", "/portfolio", "/service-areas", "/journal", "/our-process", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [portfolioProjects, journalPosts] = await Promise.all([getPortfolioProjects(), getJournalPosts()]);
  const staticRoutes = routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1 : 0.8,
  }));

  const projectRoutes = portfolioProjects.map((project) => ({
    url: `${siteConfig.url}/portfolio/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const journalRoutes = journalPosts.map((post) => ({ url: `${siteConfig.url}/journal/${post.slug}`, lastModified: new Date(post.publishDate), changeFrequency: "monthly" as const, priority: 0.7 }));
  return [...staticRoutes, ...projectRoutes, ...journalRoutes];
}
