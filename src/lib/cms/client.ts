const SITE_SLUG = "alford-custom-homes";

export async function fetchPublishedRows(contentType?: string, contentKey?: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) throw new Error("Published CMS client is not configured.");
  const response = await fetch(`${url}/rest/v1/rpc/get_published_content`, {
    method: "POST", headers: { apikey: anonKey, authorization: `Bearer ${anonKey}`, "content-type": "application/json" },
    body: JSON.stringify({ requested_site_slug: SITE_SLUG, requested_content_type: contentType ?? null, requested_content_key: contentKey ?? null }),
    next: { tags: [
      `site:${SITE_SLUG}`,
      ...(contentType ? [`content:${contentType}`] : []),
      ...(contentType && contentKey ? [`content:${contentType}:${contentKey}`] : []),
    ] },
  });
  if (!response.ok) throw new Error(`Published CMS request failed (${response.status}).`);
  return response.json() as Promise<unknown>;
}
