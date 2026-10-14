import { siteConfig } from "@/lib/site-data";

export const fallbackGlobalSettings = {
  businessName: siteConfig.name,
  phone: siteConfig.phone,
  email: siteConfig.email,
  serviceAreaSummary: siteConfig.location,
  defaultDescription: siteConfig.description,
  defaultSeoTitle: siteConfig.name,
  defaultSeoDescription: siteConfig.description,
  defaultSocialImage: { sourceKind: "legacy_local" as const, path: siteConfig.ogImage, altText: `${siteConfig.name} logo`, decorative: false },
  footerContactCopy: siteConfig.location,
  consultationCtaLabel: "Schedule a Consultation",
};
