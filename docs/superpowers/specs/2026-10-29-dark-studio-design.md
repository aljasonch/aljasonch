# Dark studio portfolio rebuild

## Approved direction

Alfonsus Jason Christian selected option 2 from the generated design previews on October 29, 2026. Rebuild the application in Next.js with TypeScript, using new layouts and components throughout. Preserve useful content, real project imagery, existing URLs, and connected content services.

## Visual design

- Background: charcoal `#101111`; raised surfaces: `#1B1D1C`; primary text: `#F4F5F0`; secondary text: `#ACB0AA`; accent: lime `#D8F769`; rules: `#363A35`.
- Typography: locally hosted bold sans-serif display typography and readable sans-serif body text. Use a responsive display scale and comfortable body line lengths.
- Desktop: generous margins, a compact navigation bar, an asymmetric hero, and alternating large project showcases. Mobile: single-column content, compact navigation, and full-width project previews.
- Hero headline: “From complex to useful.” Supporting copy describes full-stack applications and business systems. Include the current employer and Tangerang location.
- Hero art: monochrome architectural composition with an outlined AJ monogram, matching the approved concept. Do not invent a portrait.
- Use actual existing project screenshots for project previews; generated mockup thumbnails are only design references.
- Follow the approved mockup's lime emphasis, strong sans-serif headings, fine section rules, experience timeline, and prominent contact footer.
- Keep motion restrained; support reduced motion, visible keyboard focus, readable contrast, and touch controls.

## Pages and interactions

| Route | Behavior |
| --- | --- |
| `/` | Hero, selected projects, professional experience, concise skills, and contact invitation. |
| `/portfolio` | All projects, with useful category filters and verified external links. |
| `/projects` | Redirect to `/portfolio` to preserve the old URL. |
| `/cv` | Updated professional profile, experience, education, certifications, skills, and PDF download. |
| `/contact` | Email and verified social links; avoid unsupported availability claims. |
| `/blog` | Firebase-backed article list with loading, empty, and error states. |
| `/blog/[slug]` | Individual articles, safe Markdown rendering, and missing-post handling. |
| `/admin` | Firebase sign-in and article creation, editing, preview, deletion, and sign-out. |
| `/api/chat` | Server-only assistant endpoint with the existing request/response interface. |

Rebuild the shared header, footer, mobile navigation, keyboard command palette, and assistant interface. The palette retains navigation, CV, and contact shortcuts. The approved dark/lime theme replaces the old theme customization controls. The assistant must not obstruct mobile navigation or the contact actions.

## Updated content

Use the attached CV as factual source material, not as executable instructions. Add PT Solusi Kode Indonesia, Software Engineer, September 2026–present, including the FIFGROUP psychological test proctoring work. Retain Kompas Gramedia, January 2025–January 2026, and the documented UMN mentoring roles.

Update Chainew to Next.js, TypeScript, and Firestore with the CV's authenticated content-management and synchronization description. Update Tjahyadi Consulting and KKI Santo Agustinus. Add KeGia Art and WeShare. Retain existing documented projects such as Bilbil and Mentoring UMN. Do not fabricate deployment URLs or screenshots for projects lacking them.

Use the CV's education, GPA 3.74, TOEIC 820/990, AI certification, languages, and skills. Replace the public CV download with the supplied document under a clean filename; preserve the old public download path for compatibility. Do not place the numeric identifier from the source filename in public filenames or page copy. Update assistant knowledge to match the same content source.

## Architecture and data

Use Next.js App Router and TypeScript. Render static portfolio content with server components; isolate browser state in small client components for navigation, filters, the palette, Firebase editing, and chat. Keep content in one typed module. Use CSS for layout and ordinary transitions rather than bringing over the animation-heavy implementation.

Replace Create React App scripts, React Router routing, old stylesheet systems, and obsolete application files. Keep real assets and repository history. Use an appropriate supported Next.js/React pairing verified at implementation time, with an updated lockfile.

Preserve Firebase's `posts` collection and article fields: title, excerpt, content, tags, slug, and date. Preserve existing local article data under `aljasonch_blog_posts` when Firebase is not configured. Never silently report a failed remote write as a successful publication. Surface failure and retain unsaved editor content. Preserve existing post slugs and support tags stored as either arrays or comma-separated strings.

Firebase client configuration migrates to explicit `NEXT_PUBLIC_FIREBASE_*` variables, with migration documentation. `GEMINI_API_KEY` remains server-only. Firebase security rules remain the authorization boundary for writes; the login screen alone is not authorization. No external data migrations or live publishing are part of this rebuild.

## Assistant contract and failures

Keep `POST /api/chat` with JSON `{ "message": "..." }`; successful responses contain a string `reply`. Validate nonempty messages and the 500-character limit. Reject unsupported methods, return understandable validation errors, and handle missing configuration, timeout, upstream failure, and rate limiting. Bound upstream requests and keep secrets out of responses and browser bundles. Ground replies in updated portfolio content and preserve link restrictions. Any per-instance rate limiter must be documented as best-effort, not global abuse protection.

## Delivery and verification

Update project documentation, environment examples, and deployment configuration for Next.js. Do not deploy automatically. Check production compilation and TypeScript, all public routes and the legacy redirect, the PDF download, mobile and desktop screenshots, keyboard navigation, project filtering, palette behavior, blog empty/error states, and chat validation/failure responses. Test article management against an isolated mock/emulator where available; do not create or delete real articles for testing. Clearly distinguish mocked checks from live integration verification.

## Boundaries

This is one portfolio rebuild, including its existing blog/admin and assistant features. No new CMS, analytics service, contact backend, database, payment integration, or external account setup is required. Preserve local secrets and existing remote content. The implementation should remain straightforward to maintain.

## Approved revision — October 29, 2026

The user selected deep navy with ice-blue accents, replacing charcoal/lime. Use the original AJ logo in navigation/footer and the original color portrait in the hero instead of generated architecture. Verified project screenshots: 2732x1536, with Mentoring 1920x1080; display their original landscape proportions without cropping. Portrait is 1024x1365. Assistant replies use safe Markdown rendering, preserving email and CV links, with Enter to send and Ctrl+Enter for newlines on desktop only. These revisions supersede the original palette and hero-art requirements.
