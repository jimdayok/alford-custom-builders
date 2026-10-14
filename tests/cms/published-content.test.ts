import { afterEach, describe, expect, it, vi } from "vitest";

import { fallbackHomepageHero } from "@/lib/cms/fallback/homepage";

const mocks = vi.hoisted(() => ({
  draftMode: vi.fn(),
  fetchPreviewContent: vi.fn(),
  fetchPublishedRows: vi.fn(),
}));

vi.mock("next/headers", () => ({ draftMode: mocks.draftMode }));
vi.mock("@/lib/cms/preview-content", () => ({ fetchPreviewContent: mocks.fetchPreviewContent }));
vi.mock("@/lib/cms/client", () => ({ fetchPublishedRows: mocks.fetchPublishedRows }));

import { getHomepageContent, getJournalPosts, getServiceAreas } from "@/lib/cms/published-content";

describe("homepage CMS loading", () => {
  afterEach(() => {
    vi.clearAllMocks();
    delete process.env.CMS_ENABLED;
  });

  it("loads an authorized draft preview while public CMS loading is disabled", async () => {
    process.env.CMS_ENABLED = "false";
    mocks.draftMode.mockResolvedValue({ isEnabled: true });
    mocks.fetchPreviewContent.mockResolvedValue({
      content_type: "page_section",
      content_key: "homepage-hero",
      draft_data: { ...fallbackHomepageHero, heading: "Homepage draft preview" },
      draft_revision: 2,
      updated_at: "2026-07-22T00:00:00.000Z",
    });

    await expect(getHomepageContent()).resolves.toMatchObject({
      source: "preview",
      revision: 2,
      data: { heading: "Homepage draft preview" },
    });
    expect(mocks.fetchPublishedRows).not.toHaveBeenCalled();
  });

  it("keeps ordinary requests on the static fallback while public CMS loading is disabled", async () => {
    process.env.CMS_ENABLED = "false";
    mocks.draftMode.mockResolvedValue({ isEnabled: false });

    await expect(getHomepageContent()).resolves.toEqual({ data: fallbackHomepageHero, source: "static" });
    expect(mocks.fetchPreviewContent).not.toHaveBeenCalled();
    expect(mocks.fetchPublishedRows).not.toHaveBeenCalled();
  });

  it("loads and orders visible published service areas", async () => {
    process.env.CMS_ENABLED = "true";
    mocks.draftMode.mockResolvedValue({ isEnabled: false });
    mocks.fetchPublishedRows.mockResolvedValue([
      {
        site_slug: "alford-custom-homes",
        content_type: "service_area",
        content_key: "second",
        published_data: { title: "Second", slug: "second", shortDescription: "Second area", body: "Second area body", seo: { title: "Second", description: "Second area" }, order: 2, visible: true, ctaLabel: "Contact" },
        published_revision: 1,
        published_at: "2026-07-22T00:00:00.000Z",
      },
      {
        site_slug: "alford-custom-homes",
        content_type: "service_area",
        content_key: "first",
        published_data: { title: "First", slug: "first", shortDescription: "First area", body: "First area body", seo: { title: "First", description: "First area" }, order: 1, visible: true, ctaLabel: "Contact" },
        published_revision: 1,
        published_at: "2026-07-22T00:00:00.000Z",
      },
    ]);

    await expect(getServiceAreas()).resolves.toMatchObject([{ slug: "first" }, { slug: "second" }]);
    expect(mocks.fetchPublishedRows).toHaveBeenCalledWith("service_area");
  });

  it("does not synthesize public journal entries when the published RPC returns none", async () => {
    process.env.CMS_ENABLED = "true";
    mocks.draftMode.mockResolvedValue({ isEnabled: false });
    mocks.fetchPublishedRows.mockResolvedValue([]);

    await expect(getJournalPosts()).resolves.toEqual([]);
  });
});
