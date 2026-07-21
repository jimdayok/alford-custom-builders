import type { HomepageHeroContent } from "@/lib/cms/schemas";

export const fallbackHomepageHero = {
  seo: {
    title: "Dallas Luxury Custom Homes",
    description:
      "Dallas luxury custom homes and high-end remodels led by Ben Alford, a second-generation builder known for clarity, craftsmanship, legacy standards, and personal attention.",
  },
  eyebrow: "Built On Legacy. Led With Personal Attention.",
  heading:
    "Luxury custom homes and high-end renovations for Dallas clients who expect clarity, craftsmanship, and personal attention.",
  supportingCopy:
    "Led by Ben Alford, a second-generation builder, the firm serves Preston Hollow, University Park, Highland Park, the Park Cities, and surrounding Dallas luxury neighborhoods with a professional, trusted, and timeless approach.",
  image: {
    sourceKind: "legacy_local",
    path: "/images/4301-armstrong-pkwy-hf-1-1.jpg",
    altText: "Exterior of a luxury custom home by Alford Custom Builders",
    decorative: false,
  },
  primaryCta: {
    label: "Start a Private Consultation",
    href: "/contact",
  },
  secondaryCta: {
    label: "View Our Work",
    href: "/portfolio",
  },
  trustCues: ["Preston Hollow", "University Park", "Highland Park", "The Park Cities"],
} satisfies HomepageHeroContent;
