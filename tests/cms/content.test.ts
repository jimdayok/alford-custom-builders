import { describe, expect, it } from "vitest";
import { isAllowedPath, isAllowedTag } from "@/lib/cms/allowlist";
import { fallbackHomepageHero } from "@/lib/cms/fallback/homepage";
import { homepageHeroSchema, publishedRowSchema } from "@/lib/cms/schemas";
import { siteConfig } from "@/lib/site-data";

describe("Alford CMS boundary", () => {
  it("uses the canonical customer name and website", () => {
    expect(siteConfig.name).toBe("Alford Custom Builders");
    expect(siteConfig.url).toBe("https://alfordcustombuilders.com");
  });

  it("keeps the static homepage fallback valid", () => expect(homepageHeroSchema.safeParse(fallbackHomepageHero).success).toBe(true));
  it("rejects malformed published rows", () => expect(publishedRowSchema.safeParse({ site_slug: "other", published_data: {} }).success).toBe(false));
  it("allows only known preview paths", () => { expect(isAllowedPath("/portfolio/armstrong-pkwy")).toBe(true); expect(isAllowedPath("https://attacker.test")).toBe(false); expect(isAllowedPath("//attacker.test")).toBe(false); });
  it("allows scoped tags and rejects arbitrary tags", () => { expect(isAllowedTag("content:page_section:homepage-hero")).toBe(true); expect(isAllowedTag("other-site:secret")).toBe(false); });
});
