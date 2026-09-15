import { type NextRequest, NextResponse } from "next/server";

const MAIN_HOSTS = new Set([
  "alfordcustombuilders.com",
  "www.alfordcustombuilders.com",
]);

type PreviewVersion = "preview1" | "preview2";

function requestWithMode(
  request: NextRequest,
  mode: "preview" | "coming-soon",
  previewVersion?: PreviewVersion,
) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-alford-site-mode", mode);
  if (previewVersion) requestHeaders.set("x-alford-preview-version", previewVersion);
  return requestHeaders;
}

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":")[0].toLowerCase() ?? "";
  const pathname = request.nextUrl.pathname;
  const localMode = process.env.NODE_ENV !== "production" ? request.nextUrl.searchParams.get("site_mode") : null;

  if (hostname === "preview.alfordcustombuilders.com") {
    const previewOneUrl = request.nextUrl.clone();
    previewOneUrl.hostname = "preview1.alfordcustombuilders.com";
    return NextResponse.redirect(previewOneUrl);
  }

  const isPreviewOne =
    hostname === "preview1.alfordcustombuilders.com" ||
    hostname === "preview1.localhost" ||
    localMode === "preview" ||
    localMode === "preview1";
  const isPreviewTwo =
    hostname === "preview2.alfordcustombuilders.com" ||
    hostname === "preview2.localhost" ||
    localMode === "preview2";
  const previewVersion: PreviewVersion | null = isPreviewTwo
    ? "preview2"
    : isPreviewOne
      ? "preview1"
      : null;
  const isPreview = previewVersion !== null;
  const isMain = MAIN_HOSTS.has(hostname) || localMode === "coming-soon";
  const isComingSoonDeploymentPreview = hostname.endsWith(".vercel.app") && pathname === "/coming-soon";

  if (isComingSoonDeploymentPreview) {
    const response = NextResponse.next({
      request: { headers: requestWithMode(request, "coming-soon") },
    });
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return response;
  }

  if (isPreview) {
    if (pathname === "/coming-soon") return NextResponse.redirect(new URL("/", request.url));

    if (
      previewVersion === "preview2" &&
      (pathname === "/about" || pathname === "/services" || pathname === "/our-process")
    ) {
      return NextResponse.redirect(new URL("/discover", request.url));
    }

    const response = NextResponse.next({
      request: { headers: requestWithMode(request, "preview", previewVersion) },
    });
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return response;
  }

  if (isMain) {
    const headers = requestWithMode(request, "coming-soon");
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
