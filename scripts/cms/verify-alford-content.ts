import { createClient } from "@supabase/supabase-js";
import { exportSnapshot } from "./current-content";

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
  }

  const expected = await exportSnapshot();
  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: site, error: siteError } = await supabase
    .from("sites")
    .select("id")
    .eq("slug", expected.site.slug)
    .single();

  if (siteError) throw siteError;

  const [{ data: entries, error: entriesError }, { data: media, error: mediaError }] =
    await Promise.all([
      supabase
        .from("content_entries")
        .select("content_type,content_key,published_data")
        .eq("site_id", site.id)
        .is("deleted_at", null),
      supabase.from("media_assets").select("legacy_path").eq("site_id", site.id).is("deleted_at", null),
    ]);

  if (entriesError) throw entriesError;
  if (mediaError) throw mediaError;

  const count = (type: string) =>
    entries?.filter((entry) => entry.content_type === type).length ?? 0;
  const expectedHero = expected.contentEntries.find(
    (entry) => entry.contentKey === "homepage-hero",
  )?.data as { heading?: string } | undefined;
  const expectedGlobal = expected.contentEntries.find(
    (entry) => entry.contentType === "global_settings",
  )?.data as { email?: string } | undefined;

  const actual = {
    services: count("service"),
    processSteps: count("process_step"),
    testimonials: count("testimonial"),
    serviceAreas: count("service_area"),
    journalDrafts: count("journal_post"),
    pages: count("page"),
    pageKeys:
      entries
        ?.filter((entry) => entry.content_type === "page")
        .map((entry) => entry.content_key)
        .sort() ?? [],
    hiddenJournalDrafts:
      entries?.filter(
        (entry) =>
          entry.content_type === "journal_post" &&
          (entry.published_data as { visible?: boolean } | null)?.visible === false,
      ).length ?? 0,
    portfolioProjects: count("portfolio_project"),
    media: media?.length ?? 0,
    portfolioSlugs:
      entries
        ?.filter((entry) => entry.content_type === "portfolio_project")
        .map((entry) => entry.content_key)
        .sort() ?? [],
    heroHeading: (
      entries?.find(
        (entry) =>
          entry.content_type === "page_section" && entry.content_key === "homepage-hero",
      )?.published_data as { heading?: string } | undefined
    )?.heading,
    globalEmail: (
      entries?.find((entry) => entry.content_type === "global_settings")?.published_data as
        | { email?: string }
        | undefined
    )?.email,
  };
  const expectedValues = {
    services: expected.audit.services,
    processSteps: expected.audit.processSteps,
    testimonials: expected.audit.testimonials,
    serviceAreas: expected.audit.serviceAreas,
    journalDrafts: expected.audit.journalDrafts,
    pages: expected.audit.pages,
    pageKeys: ["about", "contact"],
    hiddenJournalDrafts: expected.audit.journalDrafts,
    portfolioProjects: expected.audit.portfolioProjects,
    media: expected.media.length,
    portfolioSlugs: [...expected.audit.portfolioSlugs].sort(),
    heroHeading: expectedHero?.heading,
    globalEmail: expectedGlobal?.email,
  };
  const failures = Object.entries(expectedValues).filter(
    ([key, value]) =>
      JSON.stringify(actual[key as keyof typeof actual]) !== JSON.stringify(value),
  );

  console.log(
    JSON.stringify(
      {
        expected: expectedValues,
        actual,
        passed: failures.length === 0,
        failures: failures.map(([key]) => key),
      },
      null,
      2,
    ),
  );

  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
