import { cookies } from "next/headers";
import { previewRowSchema } from "@/lib/cms/schemas";

export async function fetchPreviewContent(contentType: string, contentKey: string) {
  const token = (await cookies()).get("d2d_preview_token")?.value;
  const baseUrl = process.env.D2D_PREVIEW_API_URL;
  if (!token || !baseUrl) return null;
  const url = new URL(baseUrl);
  url.searchParams.set("contentType", contentType); url.searchParams.set("contentKey", contentKey);
  const response = await fetch(url, { headers: { authorization: `Bearer ${token}` }, cache: "no-store" });
  if (!response.ok) return null;
  const payload = await response.json() as { entries?: unknown[] };
  const row = previewRowSchema.safeParse(payload.entries?.[0]);
  return row.success ? row.data : null;
}
