import { type NextRequest, NextResponse } from "next/server";

const MAIN_HOSTS = new Set([
  "alfordcustombuilders.com",
  "www.alfordcustombuilders.com",
  "127.0.0.1",
  "localhost",
]);

type PreviewVersion = "preview1" | "preview2" | "preview3";

function requestWithMode(
  request: NextRequest,
  mode: "preview" | "coming-soon" | "public",
  previewVersion?: PreviewVersion,
) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-alford-site-mode", mode);
  requestHeaders.delete("x-alford-preview-version");
  if (previewVersion) requestHeaders.set("x-alford-preview-version", previewVersion);
  return requestHeaders;
}

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":")[0].toLowerCase() ?? "";
  const pathname = request.nextUrl.pathname;
  const localMode = process.env.NODE_ENV !== "production" ? request.nextUrl.searchParams.get("site_mode") : null;

  const isPreviewOne =
    hostname === "preview1.alfordcustombuilders.com" ||
    hostname === "preview1.localhost" ||
    localMode === "preview" ||
    localMode === "preview1";
  const isPreviewTwo =
    hostname === "preview2.alfordcustombuilders.com" ||
    hostname === "preview2.localhost" ||
    localMode === "preview2";
  const isPreviewThree =
    hostname === "preview.alfordcustombuilders.com" ||
    hostname === "preview3.localhost" ||
    localMode === "preview3";
  const previewVersion: PreviewVersion | null = isPreviewThree
    ? "preview3"
    : isPreviewTwo
    ? "preview2"
    : isPreviewOne
      ? "preview1"
      : null;
  const isPreview = previewVersion !== null;
  const isMain = MAIN_HOSTS.has(hostname) || hostname.endsWith(".vercel.app");

  if (isPreview) {
    if (pathname === "/coming-soon") return NextResponse.redirect(new URL("/", request.url));

    if (previewVersion === "preview2" && pathname === "/discover") {
      return NextResponse.redirect(new URL("/about", request.url));
    }

    if (previewVersion === "preview2" && pathname === "/our-process") {
      return NextResponse.redirect(new URL("/services", request.url));
    }

    const response = NextResponse.next({
      request: { headers: requestWithMode(request, "preview", previewVersion) },
    });
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return response;
  }

  if (isMain) {
    const redirects: Record<string, string> = {
      "/coming-soon": "/",
      "/discover": "/about",
      "/our-process": "/services",
    };
    if (redirects[pathname]) return NextResponse.redirect(new URL(redirects[pathname], request.url), 308);
    return NextResponse.next({
      request: { headers: requestWithMode(request, "public", "preview2") },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff2?)$).*)",
  ],
};
