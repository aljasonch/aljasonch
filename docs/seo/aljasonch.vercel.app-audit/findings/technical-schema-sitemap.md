# Technical, sitemap, and structured-data findings

Audit target: current local Next.js redesign at `http://127.0.0.1:3100`; intended public origin `https://aljasonch.vercel.app`. Date: 2026-10-29. Source inspection completed; runtime crawl validation pending in this initial pass. This is a local readiness assessment, not a claim about Google's current index or the deployed site.

## Initial findings

1. **High — Journal article content and metadata depend on client rendering.** `src/components/journal.tsx:18` fetches public posts in `useEffect`; initial `loading` is true and returns the loading paragraph at line 38. `src/app/blog/[slug]/page.tsx:3` only forwards the slug to that client component and defines no article metadata. This makes crawler access less reliable and prevents per-article titles/descriptions/social metadata in the raw response. Google can render JavaScript, so this is not a demonstrated site-wide indexing block. Render published posts and article metadata on the server; retain client-side filtering as an enhancement.
2. **High — Invalid article slugs have no server 404 path.** `src/app/blog/[slug]/page.tsx:8` does not load/validate a post or call `notFound()`. `src/components/journal.tsx:59` displays “Article not found” after the page has already been served. Verify HTTP status with a nonexistent slug; correct with server lookup + genuine 404.
3. **Medium — No canonical declarations.** `src/app/layout.tsx:9` sets `metadataBase`, which resolves metadata URLs but does not create canonical tags. No `alternates.canonical` or `generateMetadata` is present. Set per-route absolute canonicals using the intended production origin. Missing canonicals alone do not prevent indexing.
4. **Medium, conditional — Published posts are outside the sitemap.** `src/app/sitemap.ts:4` enumerates only five static routes and never reads posts. With an empty journal there are no missing published URLs to prove today; the omission becomes real when posts exist. Once server-accessible public posts are implemented, append only published, canonical, 200 article URLs and truthful update dates.
5. **Medium opportunity — No structured data is implemented.** No JSON-LD, Microdata, or entity RDFa is present in source. Add a truthful `Person` + `ProfilePage` graph on the profile page; consider `WebSite` at the root and `BlogPosting` only for real published articles. This is an entity-clarity improvement, not an indexing requirement or guaranteed rich-result/ranking gain.
6. **Low — Admin robots policy obscures its noindex.** `src/app/admin/page.tsx:6` emits noindex, but `src/app/robots.ts:4` disallows crawling `/admin`. A compliant crawler cannot see a noindex on a blocked page. Choose the desired policy: a crawlable public login shell with noindex, or real server-side access restriction. Robots rules are not authorization. This does not imply the authenticated publishing functionality is exposed.

## Existing strengths

- `html lang="en"`, server metadata, semantic landmarks, meaningful headings and internal anchor navigation exist.
- Main public content outside the journal is rendered by Next.js into the initial HTML.
- robots rules permit normal public routes and declare the intended production sitemap.
- Sitemap contains only five clean HTTPS URLs; excludes admin, API, redirected `/projects`, and not-found routes.
- Sitemap does not fabricate `lastmod`, `priority`, or `changefreq` values.
- `/projects` has a single configured permanent redirect to `/portfolio` (`next.config.ts:23`).
- General unknown routes use Next.js's `not-found.tsx`, distinct from the article-specific client fallback.
- Public site copy has no ecommerce/review markup that could make false rich-result claims.

## Measurement limits

Live production HTTPS/HSTS, Google-selected canonicals, Search Console indexation, CrUX LCP/INP/CLS, backlink strength, and real search visibility are not established by source inspection. No field-performance scores are assigned here. Security headers on localhost must not be treated as evidence of production header behavior.
