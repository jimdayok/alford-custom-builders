import { faqItems, serviceAreaDetails, siteConfig } from "@/lib/site-data";
import type { GlobalSettingsContent, ServiceAreaContent } from "@/lib/cms/schemas";

type PublicIdentity = Pick<GlobalSettingsContent, "businessName" | "email" | "phone" | "defaultDescription">;
const fallbackIdentity: PublicIdentity = { businessName: siteConfig.name, email: siteConfig.email, phone: siteConfig.phone, defaultDescription: siteConfig.description };

export function buildOrganizationSchema(identity: PublicIdentity = fallbackIdentity) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: identity.businessName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logos/aclogoblue.png`,
    email: identity.email,
    telephone: identity.phone,
  };
}

export function buildWebsiteSchema(identity: PublicIdentity = fallbackIdentity) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: identity.businessName,
    url: siteConfig.url,
    description: identity.defaultDescription,
  };
}

export function buildHomeConstructionBusinessSchema(identity: PublicIdentity = fallbackIdentity, areas: Array<Pick<ServiceAreaContent, "title">> = serviceAreaDetails) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    name: identity.businessName,
    url: siteConfig.url,
    image: `${siteConfig.url}/images/4301-armstrong-pkwy-hf-1-155.jpg`,
    description: identity.defaultDescription,
    areaServed: areas.map((area) => area.title),
    telephone: identity.phone,
    email: identity.email,
  };
}

export function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
