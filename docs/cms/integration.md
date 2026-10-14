# CMS integration

Page components depend on typed content loaders under `src/lib/cms`, never on Supabase directly.

Normal requests use the anonymous Supabase client to execute the narrow published-content RPC. Results are parsed by Zod, tagged by site/type/key, and fall back to the current static content on missing, unavailable, or invalid data. `CMS_ENABLED=false` bypasses remote CMS reads entirely.

Preview requests require an enabled Next.js Draft Mode session established through a five-minute RS256 token issued by D2D. The public verification key is server-only configuration (safe to disclose cryptographically but not bundled unnecessarily). Draft data comes from the D2D preview endpoint and is always `private, no-store`.

Publishing POSTs a signed token to `/api/cms/revalidate`. The route verifies key ID, signature, audience, `siteSlug=alford-custom-homes`, action, expiry, and an exact allowlist of paths/tags before using Next.js 16 revalidation APIs. Arbitrary URLs are rejected.

## Failure behavior

- CMS disabled: static source only.
- Published RPC unavailable or invalid: log a redacted error and use static fallback.
- Preview invalid/expired: do not enable Draft Mode; return a friendly error.
- Revalidation invalid: return a minimal 4xx response without token or stack details.
- Revalidation delivery fails after database publish: live database state remains published and D2D records a retryable failed publish event.

The CMS changes content values only. Existing DOM structure, CSS classes, GSAP/data attributes, responsive behavior, schema implementation, route URLs, and lead-form behavior remain source controlled.
