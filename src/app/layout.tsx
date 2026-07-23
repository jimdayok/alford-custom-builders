import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { siteConfig } from "@/lib/site-data";
import { getGlobalSettings } from "@/lib/cms/published-content";

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
  const settings = await getGlobalSettings();
  return {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: settings.defaultSeoTitle,
    template: `%s | ${settings.businessName}`,
  },
  description: settings.defaultSeoDescription,
  applicationName: settings.businessName,
  keywords: [
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
    description: settings.defaultSeoDescription,
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
    description: settings.defaultSeoDescription,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logos/aclogoblue.png", type: "image/png" },
    ],
    apple: [{ url: "/logos/aclogoblue.png" }],
    shortcut: ["/favicon.ico"],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <div className="site-bg min-h-screen">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
