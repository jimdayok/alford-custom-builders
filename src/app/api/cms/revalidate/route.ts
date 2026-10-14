import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { isAllowedPath, isAllowedTag } from "@/lib/cms/allowlist";
import { verifyCmsToken } from "@/lib/cms/verify-token";

const schema = z.object({ path: z.string(), tags: z.array(z.string()).max(12) });
export async function POST(request: Request) {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return Response.json({ revalidated: false }, { status: 401 });
  const input = schema.safeParse(await request.json().catch(() => null));
  if (!input.success || !isAllowedPath(input.data.path) || !input.data.tags.every(isAllowedTag)) return Response.json({ revalidated: false }, { status: 400 });
  try {
    const payload = await verifyCmsToken(auth.slice(7), "revalidate");
    if (payload.path !== input.data.path || JSON.stringify(payload.tags) !== JSON.stringify(input.data.tags)) throw new Error("Request does not match signed claims.");
    input.data.tags.forEach((tag) => revalidateTag(tag, { expire: 0 }));
    revalidatePath(input.data.path);
    if (/^\/(portfolio|journal)/.test(input.data.path)) revalidatePath("/sitemap.xml");
    return Response.json({ revalidated: true });
  } catch { return Response.json({ revalidated: false }, { status: 401 }); }
}
