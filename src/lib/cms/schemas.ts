import { z } from "zod";

export const cmsImageSchema = z.object({
  sourceKind: z.enum(["legacy_local", "supabase_draft", "supabase_public"]),
  path: z.string().min(1), altText: z.string(), decorative: z.boolean(), caption: z.string().optional(),
});

export const homepageHeroSchema = z.object({
  seo: z.object({ title: z.string().max(80), description: z.string().max(200) }),
  eyebrow: z.string().min(1).max(60), heading: z.string().min(1).max(140),
  supportingCopy: z.string().min(1).max(500), image: cmsImageSchema,
  primaryCta: z.object({ label: z.string().min(1).max(60), href: z.string().regex(/^\/(?!\/)/) }),
  secondaryCta: z.object({ label: z.string().min(1).max(60), href: z.string().regex(/^\/(?!\/)/) }),
  trustCues: z.array(z.string().min(1).max(60)).min(1).max(8),
});

const seoSchema = z.object({ title: z.string().max(80), description: z.string().max(200) });
const titledCopySchema = z.object({ title: z.string().min(1).max(140), description: z.string().min(1).max(1200) });

export const globalSettingsSchema = z.object({
  businessName: z.string().min(1).max(120), phone: z.string().min(7).max(40), email: z.string().email(),
  serviceAreaSummary: z.string().min(1).max(300), defaultDescription: z.string().min(1).max(300),
  defaultSeoTitle: z.string().max(80), defaultSeoDescription: z.string().max(200), defaultSocialImage: cmsImageSchema,
  footerContactCopy: z.string().max(600), consultationCtaLabel: z.string().min(1).max(60),
});
export const serviceSchema = z.object({ title: z.string().min(1).max(100), slug: z.string(), description: z.string().min(1).max(1000), order: z.number().int().min(0), visible: z.boolean() });
export const processStepSchema = z.object({ step: z.string().min(1).max(10), eyebrow: z.string().max(60).optional(), title: z.string().min(1).max(100), description: z.string().min(1).max(1000), image: cmsImageSchema.optional(), order: z.number().int().min(0), visible: z.boolean() });
export const testimonialSchema = z.object({ quote: z.string().min(1).max(2000), name: z.string().min(1).max(120), context: z.string().max(200).optional(), featured: z.boolean(), order: z.number().int().min(0), visible: z.boolean() });
export const serviceAreaSchema = z.object({ title: z.string().min(1).max(100), slug: z.string(), shortDescription: z.string().min(1).max(400), body: z.string().max(10000), heroImage: cmsImageSchema.optional(), seo: seoSchema, order: z.number().int().min(0), visible: z.boolean(), ctaLabel: z.string().max(60) });
export const portfolioProjectSchema = z.object({ title: z.string().min(1).max(140), slug: z.string(), category: z.string().max(100), location: z.string().max(160).optional(), description: z.string().min(1).max(3000), completionYear: z.number().int().optional(), coverImage: cmsImageSchema, featured: z.boolean(), visible: z.boolean(), order: z.number().int().min(0), images: z.array(cmsImageSchema.extend({ room: z.string().min(1).max(80), order: z.number().int().min(0), visible: z.boolean() })).max(500) });
export const journalPostSchema = z.object({ title: z.string().min(1).max(160), slug: z.string(), excerpt: z.string().min(1).max(500), body: z.array(z.object({ type: z.enum(["paragraph", "heading", "blockquote", "list"]), text: z.string().max(10000) })).max(300), coverImage: cmsImageSchema.optional(), authorDisplayName: z.string().min(1).max(120), publishDate: z.string(), seo: seoSchema, visible: z.boolean() });
export const contactPageSchema = z.object({ seo: seoSchema, eyebrow: z.string().max(60), heading: z.string().min(1).max(160), introduction: z.string().min(1).max(1000), displayedPhone: z.string().min(7).max(40), displayedEmail: z.string().email(), serviceAreaCopy: z.string().max(1000), ctaText: z.string().max(120) });
export const aboutPageSchema = z.object({
  seo: seoSchema, eyebrow: z.string().min(1).max(60), heading: z.string().min(1).max(180), introduction: z.string().min(1).max(1200),
  founderEyebrow: z.string().min(1).max(60), founderTitle: z.string().min(1).max(180), founderDescription: z.string().min(1).max(2000), founderImage: cmsImageSchema,
  differentiators: z.array(titledCopySchema).min(1).max(12), legacyEyebrow: z.string().min(1).max(60), legacyTitle: z.string().min(1).max(180), legacyParagraphs: z.array(z.string().min(1).max(2000)).min(1).max(6),
  valuesEyebrow: z.string().min(1).max(60), valuesTitle: z.string().min(1).max(180), valuesDescription: z.string().min(1).max(1200), brandPillars: z.array(titledCopySchema).min(1).max(12), marketFocus: z.array(z.string().min(1).max(120)).min(1).max(20),
  ctaTitle: z.string().min(1).max(180), ctaDescription: z.string().min(1).max(1000), primaryCtaLabel: z.string().min(1).max(60), secondaryCtaLabel: z.string().min(1).max(60),
});

export const publishedRowSchema = z.object({
  site_slug: z.literal("alford-custom-homes"), content_type: z.string(), content_key: z.string(),
  published_data: z.unknown(), published_revision: z.number().int().positive(), published_at: z.string(),
});

export const previewRowSchema = z.object({
  content_type: z.string(), content_key: z.string(), draft_data: z.unknown(), draft_revision: z.number().int().positive(), updated_at: z.string(),
});

export type HomepageHeroContent = z.infer<typeof homepageHeroSchema>;
export type GlobalSettingsContent = z.infer<typeof globalSettingsSchema>;
export type AboutPageContent = z.infer<typeof aboutPageSchema>;
export type ContactPageContent = z.infer<typeof contactPageSchema>;
export type ServiceContent = z.infer<typeof serviceSchema>;
export type ProcessStepContent = z.infer<typeof processStepSchema>;
export type TestimonialContent = z.infer<typeof testimonialSchema>;
export type ServiceAreaContent = z.infer<typeof serviceAreaSchema>;
export type PortfolioProjectContent = z.infer<typeof portfolioProjectSchema>;
export type JournalPostContent = z.infer<typeof journalPostSchema>;
