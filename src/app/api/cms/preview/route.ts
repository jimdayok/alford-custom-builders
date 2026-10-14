import { draftMode, cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isAllowedPath } from "@/lib/cms/allowlist";
import { verifyCmsToken } from "@/lib/cms/verify-token";

export async function GET(request: Request) {
  const url = new URL(request.url); const token = url.searchParams.get("token");
  if (!token) return new Response("Preview token required.", { status: 401 });
  try {
    const payload = await verifyCmsToken(token, "preview");
    if (typeof payload.path !== "string" || !isAllowedPath(payload.path)) throw new Error("Path rejected.");
    (await draftMode()).enable();
    (await cookies()).set("d2d_preview_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 300 });
    return NextResponse.redirect(new URL(payload.path, url.origin));
  } catch { return new Response("This preview link is invalid or expired. Return to D2D Site Manager and open a new preview.", { status: 401, headers: { "cache-control": "private, no-store" } }); }
}
