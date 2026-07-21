import { stat } from "node:fs/promises";
import { join } from "node:path";
import { portfolioProjects } from "../../src/data/portfolio";
import { fallbackHomepageHero } from "../../src/lib/cms/fallback/homepage";
import { brandPillars, differentiators, founderStory, journalTopics, marketFocus, processSteps, serviceAreaDetails, services, siteConfig, testimonials } from "../../src/lib/site-data";

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const legacyImage = (path: string, altText: string, caption?: string) => ({ sourceKind: "legacy_local" as const, path, altText, decorative: false, ...(caption ? { caption } : {}) });

export const contentEntries = [
  { contentType: "global_settings", contentKey: "global", title: "Global settings", data: { businessName: siteConfig.name, phone: siteConfig.phone, email: siteConfig.email, serviceAreaSummary: siteConfig.location, defaultDescription: siteConfig.description, defaultSeoTitle: siteConfig.name, defaultSeoDescription: siteConfig.description, defaultSocialImage: legacyImage(siteConfig.ogImage, `${siteConfig.name} logo`), footerContactCopy: siteConfig.location, consultationCtaLabel: "Schedule a Consultation" } },
  { contentType: "page_section", contentKey: "homepage-hero", title: "Homepage hero", data: fallbackHomepageHero },
  { contentType: "page", contentKey: "about", title: "About", data: {
    seo: { title: "About", description: "Learn about Ben Alford, the second-generation story behind Alford Custom Builders, and the values guiding each Dallas project." },
    eyebrow: "About",
    heading: "A second-generation builder creating timeless Dallas homes with personal attention and clear accountability.",
    introduction: "Alford Custom Builders was shaped around legacy, relationships, and the belief that premium residential construction should feel trusted, orderly, and personally led from first conversation through final detail review.",
    founderEyebrow: founderStory.eyebrow,
    founderTitle: founderStory.title,
    founderDescription: founderStory.description,
    founderImage: legacyImage("/images/4301-armstrong-pkwy-hf-1-154.jpg", "Interior architectural detail from an Alford Custom Builders project"),
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
  } },
  { contentType: "page", contentKey: "contact", title: "Contact", data: {
    seo: { title: "Contact", description: "Contact Alford Custom Builders to discuss a Dallas luxury custom home or high-end remodel project." },
    eyebrow: "Contact",
    heading: "Let’s start with a conversation about your home, your goals, and the standard you expect from your builder.",
    introduction: "Whether your project is still forming or already has plans in hand, Alford Custom Builders welcomes thoughtful inquiries for Preston Hollow, University Park, Highland Park, the Park Cities, and surrounding Dallas luxury neighborhoods.",
    displayedPhone: siteConfig.phone,
    displayedEmail: siteConfig.email,
    serviceAreaCopy: siteConfig.location,
    ctaText: "Email Your Project Details",
  } },
  ...services.map((service, order) => ({ contentType: "service", contentKey: slugify(service.title), title: service.title, slug: slugify(service.title), data: { ...service, slug: slugify(service.title), order, visible: true } })),
  ...processSteps.map((step, order) => ({ contentType: "process_step", contentKey: `step-${step.step}`, title: step.title, data: { ...step, order, visible: true } })),
  ...testimonials.map((item, order) => ({ contentType: "testimonial", contentKey: `testimonial-${order + 1}`, title: item.name, data: { ...item, featured: order === 0, order, visible: true } })),
  ...serviceAreaDetails.map((area, order) => ({ contentType: "service_area", contentKey: area.slug, title: area.title, slug: area.slug, data: { title: area.title, slug: area.slug, shortDescription: area.description, body: area.description, seo: { title: `${area.title} Custom Home Builder`, description: area.description.slice(0, 200) }, order, visible: true, ctaLabel: "Schedule a Consultation" } })),
  ...journalTopics.map((topic) => ({ contentType: "journal_post", contentKey: slugify(topic.title), title: topic.title, slug: slugify(topic.title), data: {
    title: topic.title,
    slug: slugify(topic.title),
    excerpt: topic.description,
    body: [{ type: "paragraph" as const, text: topic.description }],
    authorDisplayName: "Ben Alford",
    publishDate: "2026-07-21",
    seo: { title: topic.title, description: topic.description.slice(0, 200) },
    visible: false,
  } })),
  ...portfolioProjects.map((project, order) => ({ contentType: "portfolio_project", contentKey: project.slug, title: project.title, slug: project.slug, data: { title: project.title, slug: project.slug, category: "Portfolio", description: project.description, coverImage: legacyImage(project.coverImage, `${project.title} cover image`), featured: order < 3, visible: true, order, images: project.images.map((image, imageOrder) => ({ ...legacyImage(image.src, image.alt, image.caption), room: image.room, order: imageOrder, visible: true })) } })),
];

export async function legacyMedia() {
  const byPath = new Map<string, { path: string; altText: string; caption?: string }>();
  const add = (image: { path: string; altText: string; caption?: string }) => { if (!byPath.has(image.path)) byPath.set(image.path, image); };
  add({ path: fallbackHomepageHero.image.path, altText: fallbackHomepageHero.image.altText });
  add({ path: "/images/4301-armstrong-pkwy-hf-1-154.jpg", altText: "Interior architectural detail from an Alford Custom Builders project" });
  portfolioProjects.forEach((project) => project.images.forEach((image) => add({ path: image.src, altText: image.alt, caption: image.caption })));
  const output = [];
  for (const image of byPath.values()) {
    const diskPath = join(process.cwd(), "public", image.path.replace(/^\//, ""));
    const info = await stat(diskPath);
    const extension = image.path.split(".").pop()?.toLowerCase();
    const mimeType = extension === "png" ? "image/png" : extension === "webp" ? "image/webp" : "image/jpeg";
    output.push({ ...image, filename: image.path.split("/").pop() ?? "image", byteSize: info.size, mimeType });
  }
  return output;
}

export async function exportSnapshot() {
  const media = await legacyMedia();
  return { version: 1, site: { name: siteConfig.name, slug: "alford-custom-homes", productionUrl: siteConfig.url }, contentEntries, media, audit: { services: services.length, processSteps: processSteps.length, testimonials: testimonials.length, serviceAreas: serviceAreaDetails.length, journalDrafts: journalTopics.length, pages: 2, portfolioProjects: portfolioProjects.length, projectImages: portfolioProjects.reduce((sum, project) => sum + project.images.length, 0), portfolioSlugs: portfolioProjects.map((project) => project.slug) } };
}
