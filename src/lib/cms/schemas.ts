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

export const publishedRowSchema = z.object({
  site_slug: z.literal("alford-custom-homes"), content_type: z.string(), content_key: z.string(),
  published_data: z.unknown(), published_revision: z.number().int().positive(), published_at: z.string(),
});

export const previewRowSchema = z.object({
  content_type: z.string(), content_key: z.string(), draft_data: z.unknown(), draft_revision: z.number().int().positive(), updated_at: z.string(),
});

export type HomepageHeroContent = z.infer<typeof homepageHeroSchema>;
