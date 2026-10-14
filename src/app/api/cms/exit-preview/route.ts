import { cookies, draftMode } from "next/headers";
import { NextResponse } from "next/server";
export async function GET(request: Request) { (await draftMode()).disable(); (await cookies()).delete("d2d_preview_token"); return NextResponse.redirect(new URL("/", request.url)); }
