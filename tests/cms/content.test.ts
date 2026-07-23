import { describe, expect, it } from "vitest";
import type { ZodType } from "zod";
import { isAllowedPath, isAllowedTag } from "@/lib/cms/allowlist";
import { fallbackHomepageHero } from "@/lib/cms/fallback/homepage";
import {
  aboutPageSchema,
  contactPageSchema,
  globalSettingsSchema,
  homepageHeroSchema,
  journalPostSchema,
  portfolioProjectSchema,
  processStepSchema,
  publishedRowSchema,
  serviceAreaSchema,
  serviceSchema,
  testimonialSchema,
} from "@/lib/cms/schemas";
import { siteConfig } from "@/lib/site-data";
import { contentEntries, exportSnapshot } from "../../scripts/cms/current-content";

const schemaByType: Record<string, ZodType> = {
  global_settings: globalSettingsSchema,
  page_section: homepageHeroSchema,
  service: serviceSchema,
  process_step: processStepSchema,
  testimonial: testimonialSchema,
  service_area: serviceAreaSchema,
  journal_post: journalPostSchema,
  portfolio_project: portfolioProjectSchema,
} as const;

describe("Alford CMS boundary", () => {
  it("uses the canonical customer name and website", () => {
    expect(siteConfig.name).toBe("Alford Custom Builders");
    expect(siteConfig.url).toBe("https://alfordcustombuilders.com");
  });

  it("uses the canonical www host for signed preview and revalidation requests", async () => {
    const snapshot = await exportSnapshot();
    expect(snapshot.site.productionUrl).toBe("https://alfordcustombuilders.com");
    expect(snapshot.site.previewUrl).toBe("https://www.alfordcustombuilders.com");
  });

  it("keeps the static homepage fallback valid", () => expect(homepageHeroSchema.safeParse(fallbackHomepageHero).success).toBe(true));

  it("keeps every seeded public content model compatible with its runtime schema", () => {
    for (const entry of contentEntries) {
      const schema = entry.contentType === "page"
        ? entry.contentKey === "about" ? aboutPageSchema : contactPageSchema
        : schemaByType[entry.contentType];
      expect(schema?.safeParse(entry.data).success, `${entry.contentType}:${entry.contentKey}`).toBe(true);
    }
  });

  it("keeps seeded journal topics hidden until an editor explicitly publishes them", () => {
    const journalEntries = contentEntries.filter((entry) => entry.contentType === "journal_post");
    expect(journalEntries).toHaveLength(5);
    expect(journalEntries.every((entry) => "visible" in entry.data && entry.data.visible === false)).toBe(true);
  });
  it("rejects malformed published rows", () => expect(publishedRowSchema.safeParse({ site_slug: "other", published_data: {} }).success).toBe(false));
  it("allows only known preview paths", () => { expect(isAllowedPath("/portfolio/armstrong-pkwy")).toBe(true); expect(isAllowedPath("https://attacker.test")).toBe(false); expect(isAllowedPath("//attacker.test")).toBe(false); });
  it("allows scoped tags and rejects arbitrary tags", () => { expect(isAllowedTag("content:page_section:homepage-hero")).toBe(true); expect(isAllowedTag("other-site:secret")).toBe(false); });
});
