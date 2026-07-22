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

import { getHomepageContent } from "@/lib/cms/published-content";

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
});
