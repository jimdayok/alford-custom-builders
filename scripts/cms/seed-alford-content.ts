import { createClient } from "@supabase/supabase-js";
import { exportSnapshot } from "./current-content";

async function main() {
const dryRun = process.argv.includes("--dry-run");
const snapshot = await exportSnapshot();
if (dryRun) {
  console.log(JSON.stringify({ dryRun: true, organization: "alford-custom-homes", site: snapshot.site.slug, contentEntries: snapshot.contentEntries.length, media: snapshot.media.length }, null, 2));
  process.exit(0);
}
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const { data: organization, error: organizationError } = await supabase.from("organizations").upsert({ name: "Alford Custom Builders", slug: "alford-custom-homes", status: "active" }, { onConflict: "slug" }).select("id").single();
if (organizationError) throw organizationError;
const { data: site, error: siteError } = await supabase.from("sites").upsert({ organization_id: organization.id, name: snapshot.site.name, slug: snapshot.site.slug, production_url: snapshot.site.productionUrl, preview_url: snapshot.site.previewUrl, status: "active", publishing_mode: "approval_required", config: { adapter: "alford-custom-homes" } }, { onConflict: "slug" }).select("id").single();
if (siteError) throw siteError;
let insertedEntries = 0;
for (const item of snapshot.contentEntries) {
  const { data: existing } = await supabase.from("content_entries").select("id").eq("site_id", site.id).eq("content_type", item.contentType).eq("content_key", item.contentKey).maybeSingle();
  if (existing) continue;
  const now = new Date().toISOString();
  const { data: entry, error } = await supabase.from("content_entries").insert({ site_id: site.id, content_type: item.contentType, content_key: item.contentKey, title: item.title, slug: "slug" in item ? item.slug : null, workflow_status: "published", draft_data: item.data, published_data: item.data, draft_revision: 1, published_revision: 1, published_at: now }).select("id").single();
  if (error) throw error;
  const { error: versionError } = await supabase.from("content_versions").insert({ content_entry_id: entry.id, revision: 1, data: item.data, action: "created" });
  if (versionError) throw versionError;
  insertedEntries += 1;
}
let insertedMedia = 0;
for (const media of snapshot.media) {
  const { data: existing } = await supabase.from("media_assets").select("id").eq("site_id", site.id).eq("legacy_path", media.path).maybeSingle();
  if (existing) continue;
  const { error } = await supabase.from("media_assets").insert({ site_id: site.id, source_kind: "legacy_local", legacy_path: media.path, original_filename: media.filename, mime_type: media.mimeType, byte_size: media.byteSize, alt_text: media.altText, caption: media.caption ?? null });
  if (error) throw error;
  insertedMedia += 1;
}
console.log(JSON.stringify({ siteId: site.id, insertedEntries, insertedMedia, skippedEntries: snapshot.contentEntries.length - insertedEntries, skippedMedia: snapshot.media.length - insertedMedia }, null, 2));
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
