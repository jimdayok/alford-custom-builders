# Alford CMS content inventory

Audited sources: `src/lib/site-data.ts`, all `src/app/**/page.tsx` routes, `src/app/layout.tsx`, `src/lib/schema.ts`, header/footer components, `src/data/portfolio.ts`, generated portfolio JSON, and the portfolio generator.

## Global and shared

| Source | Content | Classification | Notes |
| --- | --- | --- | --- |
| `siteConfig` | display name, phone, email, location/service summary, default description, OG image | Client editable | Domain remains code controlled; email/phone output is validated |
| root layout | title template, keywords, social metadata, icons | D2D editable only / derived | Defaults derive from validated global data; implementation is code controlled |
| `navigation` | labels and destinations | Code controlled | Navigation mechanics and route availability are not client editable in phase 1 |
| header/footer | contact CTA copy, phone/email display, footer narrative | Client editable where identified | Logo, menus, responsive behavior, and markup remain code controlled |
| `src/lib/schema.ts` | JSON-LD structure | Code controlled | Values derive automatically from published global/area/FAQ content |
| sitemap/robots | public route list and crawl rules | Code controlled / derived | Collection entries derive from visible published records |

## Homepage

| Content | Current source | Classification |
| --- | --- | --- |
| SEO title/description | `src/app/page.tsx` metadata | Client editable |
| hero eyebrow, heading, body, image/alt, CTAs | inline in `src/app/page.tsx` | Client editable; CTA destinations restricted to approved internal links |
| trust cues | `homepageTrustCues` | Client editable |
| builder-led feature eyebrow/title/body/highlights/image | inline plus `whyAlfordPoints` | Client editable |
| statistics | `stats` | Client editable with ordered records |
| founder story/quote/highlights and image | `founderStory`, `founderHighlights`, page literal/image | Client editable; identity claims require D2D review |
| guided process introduction and steps | page literals plus `processJourney` | Client editable; component/GSAP behavior code controlled |
| signature standards | inline plus `whyAlfordPoints` | Client editable |
| featured projects/order | first three `portfolioProjects` | Client editable relations; cards/layout derived |
| materials showcase | `materialsShowcase` | Client editable |
| testimonials intro/items/order | inline plus `testimonials` | Client editable; current names are explicitly temporary and must not be treated as verified |
| service-area intro/cards | inline plus `serviceAreaDetails` | Client editable |
| FAQ introduction/items | inline plus `faqItems` | Client editable; JSON-LD derived |
| final CTA/contact intro | inline in page | Client editable |
| chapter rail IDs, data attributes, motion, grid, styles | components/page markup | Code controlled |

## Interior pages

| Area | Editable content | Classification notes |
| --- | --- | --- |
| About | SEO, hero copy, hero/founder image and alt, founder story/quote/highlights, legacy narrative, pillars, CTA | Content client editable; layout/animation code controlled |
| Services | SEO, hero/intro/supporting copy, individual services, order, visibility, CTA | Each service independently versioned where practical |
| Process | SEO, intro, ordered steps, client-experience narrative, pillars, CTA | Step markup and numbering presentation code controlled |
| Service areas | SEO, intro, each title/slug/descriptions, images, order, visibility, CTA | Published slug changes require redirects; current page uses anchors rather than individual dynamic routes |
| Portfolio index | SEO and hero/intro/CTA | Counts derived automatically |
| Portfolio project | title, slug, category/location, description, year, cover, featured/order, images, room, alt, caption, order/visibility | Existing filtering behavior code controlled; redirects required on slug changes |
| Journal | SEO, intro, article records and visibility | Current `journalTopics` are planned placeholders; restricted rich text only, no raw HTML |
| Contact | SEO, intro, displayed phone/email/service-area copy/CTA | Form implementation, spam controls, recipients, validation, and integration controlled |

## Data collections

`src/lib/site-data.ts` currently exports: `siteConfig`, `navigation`, `featuredProjects`, `services`, `differentiators`, `processSteps`, `homepageTrustCues`, `processJourney`, `stats`, `brandPillars`, `marketFocus`, `clientFit`, `founderStory`, `founderHighlights`, `recentWork`, `materialsShowcase`, `whyAlfordPoints`, `serviceAreaDetails`, `faqItems`, `journalTopics`, `homepageGallery`, and `testimonials`.

Some exports are unused or overlap newer page structures (`featuredProjects`, `differentiators`, `recentWork`, `homepageGallery`). They should be preserved during initial export, then either mapped deliberately or retired only after parity verification.

Portfolio data is generated from repository image filenames. The audited snapshot contains 6 projects and 434 images with slugs `bryn-mawr-dr`, `greenbrier-dr`, `armstrong-pkwy`, `deloache-ave`, `stefani-dr`, and `other-projects`. All currently generated images have the room `Featured Space`; room/category migration therefore requires manual curation before production acceptance. Generated alt text and captions are derived automatically from project/room/index and should be reviewed for meaningful accessibility.

## Never client editable

Layouts, responsive classes, CSS variables, fonts, GSAP behavior, React components, route implementation, form endpoints/recipients, analytics/scripts, canonical construction, JSON-LD structure, image host allowlists, Supabase/DNS/deployment configuration, secrets, security policy, and source code.
