import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PreviewBanner } from "@/components/preview-banner";
import { SiteMotion } from "@/components/site-motion";
import { siteConfig } from "@/lib/site-data";
import { getGlobalSettings } from "@/lib/cms/published-content";
import { getPreviewVersion } from "@/lib/preview-version";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export async function generateMetadata(): Promise<Metadata> {
  const [settings, previewVersion] = await Promise.all([
    getGlobalSettings(),
    getPreviewVersion(),
  ]);
  const isPreviewTwo = previewVersion === "preview2";
  const description = isPreviewTwo
    ? "Personal custom homes shaped by thoughtful planning, trusted relationships, and exceptional craftsmanship."
    : settings.defaultSeoDescription;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: settings.defaultSeoTitle,
      template: `%s | ${settings.businessName}`,
    },
    description,
    applicationName: settings.businessName,
    keywords: isPreviewTwo
      ? ["custom home builder", "luxury custom homes", "custom home remodeling", "residential additions"]
      : [
        "Dallas custom home builder",
        "Park Cities home builder",
        "Preston Hollow builder",
        "University Park custom home builder",
        "Highland Park luxury remodel",
        "luxury remodel Dallas",
        "high-end residential construction",
        "Dallas luxury custom homes",
        "custom home planning Dallas",
      ],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      siteName: settings.businessName,
      title: settings.defaultSeoTitle,
      description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: settings.businessName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.defaultSeoTitle,
      description,
      images: ["/opengraph-image"],
    },
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml", sizes: "any" }],
      apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
      shortcut: ["/icon.svg"],
    },
    alternates: {
      canonical: siteConfig.url,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const siteMode = requestHeaders.get("x-alford-site-mode");
  const previewVersionValue = requestHeaders.get("x-alford-preview-version");
  const previewVersion = previewVersionValue === "preview1" || previewVersionValue === "preview2"
    ? previewVersionValue
    : null;
  const isComingSoon = siteMode === "coming-soon";
  const isPublished = requestHeaders.get("x-alford-site-published") === "true";
  const showPreviewBanner = previewVersion !== null && !isPublished;

  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className={isPublished ? "acb-site--published" : undefined}>
        {isComingSoon ? (
          <main>{children}</main>
        ) : (
          <div className="site-bg min-h-screen">
            {showPreviewBanner && previewVersion ? <PreviewBanner version={previewVersion} /> : null}
            <SiteMotion />
            <Header previewVersion={previewVersion} showPreviewBanner={showPreviewBanner} />
            <main>{children}</main>
            <Footer previewVersion={previewVersion} />
          </div>
        )}
      </body>
    </html>
  );
}
