import { draftMode } from "next/headers";
import { fetchPublishedRows } from "@/lib/cms/client";
import { fallbackHomepageHero } from "@/lib/cms/fallback/homepage";
import {
  homepageHeroSchema,
  previewRowSchema,
  publishedRowSchema,
  type HomepageHeroContent,
} from "@/lib/cms/schemas";
import type { LoadedContent } from "@/lib/cms/types";
import { fetchPreviewContent } from "@/lib/cms/preview-content";

function reportCmsFallback(reason: string) { console.error(`[cms] Alford fallback used: ${reason}`); }

export async function getHomepageContent(): Promise<LoadedContent<HomepageHeroContent>> {
  if (process.env.CMS_ENABLED !== "true") return { data: fallbackHomepageHero, source: "static" };
  if ((await draftMode()).isEnabled) {
    const preview = previewRowSchema.safeParse(await fetchPreviewContent("page_section", "homepage-hero"));
    if (preview.success) {
      const data = homepageHeroSchema.safeParse(preview.data.draft_data);
      if (data.success) return { data: data.data, source: "preview", revision: preview.data.draft_revision };
    }
    reportCmsFallback("preview content was missing or invalid");
  }
  try {
    const rows = await fetchPublishedRows("page_section", "homepage-hero");
    const row = publishedRowSchema.safeParse(Array.isArray(rows) ? rows[0] : null);
    if (row.success) {
      const data = homepageHeroSchema.safeParse(row.data.published_data);
      if (data.success) return { data: data.data, source: "published", revision: row.data.published_revision };
    }
    reportCmsFallback("published homepage hero was missing or invalid");
  } catch (error) { reportCmsFallback(error instanceof Error ? error.message : "published request failed"); }
  return { data: fallbackHomepageHero, source: "static" };
}

export async function getGlobalSettings() { return (await import("@/lib/cms/fallback/global")).fallbackGlobalSettings; }
export async function getServices() { return (await import("@/lib/cms/fallback/services")).services; }
export async function getProcessSteps() { return (await import("@/lib/cms/fallback/process")).processSteps; }
export async function getTestimonials() { return (await import("@/lib/cms/fallback/testimonials")).testimonials; }
export async function getServiceAreas() { return (await import("@/lib/cms/fallback/service-areas")).serviceAreaDetails; }
export async function getPortfolioProjects() { return (await import("@/lib/cms/fallback/portfolio")).portfolioProjects; }
export async function getJournalPosts() { return [] as const; }
