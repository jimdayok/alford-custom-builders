import { brandPillars, differentiators, founderStory, marketFocus } from "@/lib/site-data";

export const fallbackAboutPage = {
  seo: { title: "About", description: "Learn about Ben Alford, the second-generation story behind Alford Custom Builders, and the values guiding each Dallas project." },
  eyebrow: "About",
  heading: "A second-generation builder creating timeless Dallas homes with personal attention and clear accountability.",
  introduction: "Alford Custom Builders was shaped around legacy, relationships, and the belief that premium residential construction should feel trusted, orderly, and personally led from first conversation through final detail review.",
  founderEyebrow: founderStory.eyebrow,
  founderTitle: founderStory.title,
  founderDescription: founderStory.description,
  founderImage: { sourceKind: "legacy_local" as const, path: "/images/4301-armstrong-pkwy-hf-1-154.jpg", altText: "Interior architectural detail from an Alford Custom Builders project", decorative: false },
  differentiators,
  legacyEyebrow: "Legacy And Values",
  legacyTitle: "The business is built on doing the work well and standing behind it.",
  legacyParagraphs: [
    "Ben Alford learned the business from his dad and sees this company as a continuation of that legacy. The goal is not to chase trends. It is to build homes that feel classic, memorable, and worth the investment.",
    "Clients choose Alford Custom Builders for relationships, communication, professionalism, and the confidence that if something needs to be made right, it will be handled the right way.",
  ],
  valuesEyebrow: "What Matters Here",
  valuesTitle: "The brand is meant to feel trusted, professional, classic, and best-in-class.",
  valuesDescription: "Those qualities came through repeatedly in the discovery work, and they define how the company wants to show up in the market.",
  brandPillars,
  marketFocus,
  ctaTitle: "Tell us about the home or remodel you want to create.",
  ctaDescription: "If you want a builder who values communication, quality, and a clean process, Alford Custom Builders would love to hear about your plans.",
  primaryCtaLabel: "Discuss Your Build",
  secondaryCtaLabel: "View Our Work",
};
