import { draftMode } from "next/headers";
import type { z } from "zod";

import { fetchPublishedRows } from "@/lib/cms/client";
import { fallbackAboutPage } from "@/lib/cms/fallback/about";
import { fallbackContactPage } from "@/lib/cms/fallback/contact";
import { fallbackGlobalSettings } from "@/lib/cms/fallback/global";
import { fallbackHomepageHero } from "@/lib/cms/fallback/homepage";
import {
  aboutPageSchema,
  contactPageSchema,
  globalSettingsSchema,
  homepageHeroSchema,
  journalPostSchema,
  portfolioProjectSchema,
  previewRowSchema,
  processStepSchema,
  publishedRowSchema,
  serviceAreaSchema,
  serviceSchema,
  testimonialSchema,
  type AboutPageContent,
  type ContactPageContent,
  type GlobalSettingsContent,
  type HomepageHeroContent,
  type JournalPostContent,
  type PortfolioProjectContent,
  type ProcessStepContent,
  type ServiceAreaContent,
  type ServiceContent,
  type TestimonialContent,
} from "@/lib/cms/schemas";
import { fetchPreviewContent } from "@/lib/cms/preview-content";
import type { LoadedContent } from "@/lib/cms/types";
import { portfolioProjects as fallbackPortfolioProjects, type PortfolioProject } from "@/data/portfolio";
import {
  processSteps as fallbackProcessSteps,
  serviceAreaDetails as fallbackServiceAreas,
  services as fallbackServices,
  testimonials as fallbackTestimonials,
} from "@/lib/site-data";

function reportCmsFallback(reason: string) {
  console.error(`[cms] Alford fallback used: ${reason}`);
}

async function getSingleton<T>(options: {
  contentType: string;
  contentKey: string;
  schema: z.ZodType<T>;
  fallback: T;
}): Promise<LoadedContent<T>> {
  if ((await draftMode()).isEnabled) {
    try {
      const preview = previewRowSchema.safeParse(await fetchPreviewContent(options.contentType, options.contentKey));
      if (preview.success) {
        const data = options.schema.safeParse(preview.data.draft_data);
        if (data.success) return { data: data.data, source: "preview", revision: preview.data.draft_revision };
      }
      reportCmsFallback(`preview ${options.contentType}:${options.contentKey} was missing or invalid`);
    } catch (error) {
      reportCmsFallback(error instanceof Error ? `preview request failed: ${error.message}` : "preview request failed");
    }
  }

  if (process.env.CMS_ENABLED !== "true") return { data: options.fallback, source: "static" };

  try {
    const rows = await fetchPublishedRows(options.contentType, options.contentKey);
    const row = publishedRowSchema.safeParse(Array.isArray(rows) ? rows[0] : null);
    if (row.success) {
      const data = options.schema.safeParse(row.data.published_data);
      if (data.success) return { data: data.data, source: "published", revision: row.data.published_revision };
    }
    reportCmsFallback(`published ${options.contentType}:${options.contentKey} was missing or invalid`);
  } catch (error) {
    reportCmsFallback(error instanceof Error ? error.message : "published request failed");
  }

  return { data: options.fallback, source: "static" };
}

async function getPublishedList<T>(contentType: string, schema: z.ZodType<T>, fallback: T[]): Promise<T[]> {
  if (process.env.CMS_ENABLED !== "true") return fallback;
  try {
    const rows = await fetchPublishedRows(contentType);
    if (!Array.isArray(rows)) throw new Error(`${contentType} response was not a list`);
    const parsed = rows.flatMap((candidate) => {
      const row = publishedRowSchema.safeParse(candidate);
      if (!row.success) return [];
      const data = schema.safeParse(row.data.published_data);
      return data.success ? [data.data] : [];
    });
    if (parsed.length === 0 && rows.length > 0) throw new Error(`${contentType} rows failed validation`);
    return parsed;
  } catch (error) {
    reportCmsFallback(error instanceof Error ? error.message : `${contentType} request failed`);
    return fallback;
  }
}

export function getHomepageContent(): Promise<LoadedContent<HomepageHeroContent>> {
  return getSingleton({ contentType: "page_section", contentKey: "homepage-hero", schema: homepageHeroSchema, fallback: fallbackHomepageHero });
}

export function getGlobalSettingsContent(): Promise<LoadedContent<GlobalSettingsContent>> {
  return getSingleton({ contentType: "global_settings", contentKey: "global", schema: globalSettingsSchema, fallback: fallbackGlobalSettings });
}

export async function getGlobalSettings() {
  return (await getGlobalSettingsContent()).data;
}

export function getAboutPageContent(): Promise<LoadedContent<AboutPageContent>> {
  return getSingleton({ contentType: "page", contentKey: "about", schema: aboutPageSchema, fallback: fallbackAboutPage });
}

export function getContactPageContent(): Promise<LoadedContent<ContactPageContent>> {
  return getSingleton({ contentType: "page", contentKey: "contact", schema: contactPageSchema, fallback: fallbackContactPage });
}

export async function getServices(): Promise<ServiceContent[]> {
  const fallback = fallbackServices.map((item, order) => ({ ...item, slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), order, visible: true }));
  return (await getPublishedList("service", serviceSchema, fallback)).filter((item) => item.visible).sort((a, b) => a.order - b.order);
}

export async function getProcessSteps(): Promise<ProcessStepContent[]> {
  const fallback = fallbackProcessSteps.map((item, order) => ({ ...item, order, visible: true }));
  return (await getPublishedList("process_step", processStepSchema, fallback)).filter((item) => item.visible).sort((a, b) => a.order - b.order);
}

export async function getTestimonials(): Promise<TestimonialContent[]> {
  const fallback = fallbackTestimonials.map((item, order) => ({ ...item, featured: order === 0, order, visible: true }));
  return (await getPublishedList("testimonial", testimonialSchema, fallback)).filter((item) => item.visible).sort((a, b) => a.order - b.order);
}

export async function getServiceAreas(): Promise<ServiceAreaContent[]> {
  const fallback = fallbackServiceAreas.map((item, order) => ({ title: item.title, slug: item.slug, shortDescription: item.description, body: item.description, seo: { title: `${item.title} Custom Home Builder`, description: item.description.slice(0, 200) }, order, visible: true, ctaLabel: "Schedule a Consultation" }));
  return (await getPublishedList("service_area", serviceAreaSchema, fallback)).filter((item) => item.visible).sort((a, b) => a.order - b.order);
}

function toPortfolioProject(item: PortfolioProjectContent): PortfolioProject {
  const images = item.images.filter((image) => image.visible).sort((a, b) => a.order - b.order).map((image) => ({ src: image.path, filename: image.path.split("/").pop() ?? "image", room: image.room, alt: image.altText, caption: image.caption ?? "" }));
  const rooms = Array.from(new Set(images.map((image) => image.room))).sort();
  return { title: item.title, slug: item.slug, description: item.description, coverImage: item.coverImage.path, images, photoCount: images.length, rooms };
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const cms = await getPublishedList<PortfolioProjectContent>("portfolio_project", portfolioProjectSchema, []);
  const visible = cms.filter((item) => item.visible).sort((a, b) => a.order - b.order).map(toPortfolioProject);
  return visible.length > 0 ? visible : fallbackPortfolioProjects;
}

export async function getJournalPosts(): Promise<JournalPostContent[]> {
  return (await getPublishedList<JournalPostContent>("journal_post", journalPostSchema, [])).filter((item) => item.visible).sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}
