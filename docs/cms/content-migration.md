# Content migration

The migration is additive. Current static data remains the fallback until seeded CMS content passes verification with `CMS_ENABLED=true`.

## Repeatable flow

1. `npm run cms:export -- --dry-run` reads the current TypeScript/JSON sources and writes no database data.
2. Review the export, especially temporary testimonials, generated alt text, and portfolio room categories.
3. `npm run cms:seed -- --dry-run` validates environment/configuration and reports intended upserts.
4. Run the seed without `--dry-run`. It upserts the Alford organization/site, content entries, initial versions, and legacy media by stable slugs/keys.
5. `npm run cms:verify` compares services, process steps, testimonials, areas, projects, images, slugs, contact details, and homepage hero content.

The seed must use server-only credentials and never embed production keys. Repeated runs update stable seed-owned rows and do not duplicate entries.

## Acceptance gates

- Current wording, slugs, paths, metadata, alt/caption values, project/image ordering, and structured-data inputs match the export.
- 6 portfolio projects and 434 current image records are accounted for.
- Temporary testimonial identities are explicitly approved or replaced before production.
- Portfolio room categories and generated alt text receive human review.
- CMS-disabled rendering remains unchanged.
- CMS-enabled rendering uses valid published content, and invalid/unavailable content exercises the static fallback with an operational log.

Do not remove `src/lib/site-data.ts`, `src/data/portfolio.ts`, generated JSON, or the generator during the initial rollout.
