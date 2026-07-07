import { faqItems, serviceAreaDetails, siteConfig } from "@/lib/site-data";

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logos/aclogoblue.png`,
    email: siteConfig.email,
    telephone: siteConfig.phone,
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

export function buildHomeConstructionBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/images/4301-armstrong-pkwy-hf-1-155.jpg`,
    description: siteConfig.description,
    areaServed: serviceAreaDetails.map((area) => area.title),
    telephone: siteConfig.phone,
    email: siteConfig.email,
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
