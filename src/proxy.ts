import { type NextRequest, NextResponse } from "next/server";

const MAIN_HOSTS = new Set([
  "alfordcustombuilders.com",
  "www.alfordcustombuilders.com",
]);
const PUBLIC_POLICY_PATHS = new Set(["/privacy-policy", "/cookie-policy"]);

function requestWithMode(request: NextRequest, mode: "preview" | "coming-soon") {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-alford-site-mode", mode);
  return requestHeaders;
}

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":")[0].toLowerCase() ?? "";
  const pathname = request.nextUrl.pathname;
  const localMode = process.env.NODE_ENV !== "production" ? request.nextUrl.searchParams.get("site_mode") : null;
  const isPreview = hostname === "preview.alfordcustombuilders.com" || localMode === "preview";
  const isMain = MAIN_HOSTS.has(hostname) || localMode === "coming-soon";

  if (isPreview) {
    if (pathname === "/coming-soon") return NextResponse.redirect(new URL("/", request.url));

    const response = NextResponse.next({
      request: { headers: requestWithMode(request, "preview") },
    });
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return response;
  }

  if (isMain) {
    const headers = requestWithMode(request, "coming-soon");
    if (PUBLIC_POLICY_PATHS.has(pathname)) {
      return NextResponse.next({ request: { headers } });
    }
    if (pathname === "/coming-soon") {
      return NextResponse.next({ request: { headers } });
    }

    return NextResponse.rewrite(new URL("/coming-soon", request.url), {
      request: { headers },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff2?)$).*)",
  ],
};
