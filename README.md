# Alfonsus Jason Christian — portfolio

A fresh navy-studio portfolio built with Next.js App Router, React, TypeScript, and native CSS. The public profile reflects the October 2026 CV, including PT Solusi Kode Indonesia and the latest freelance and community projects.

## Run locally

Use Node.js 22.18+ (Node 24 recommended).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Production: `npm run build`, then `npm start`.

## Checks

```sh
npm run typecheck
npm test
npm run build
```

Tests include an isolated local HTTP server for assistant success, upstream error, malformed response, and timeout checks. They require loopback network access but never call Gemini or write to Firebase.

## Content and design

- `src/lib/content.ts`: profile, project details, experience, education, and skills; also supplies assistant knowledge.
- `src/app/globals.css`: navy/ice-blue design, responsive layout, and accessible interaction styles.
- `public/images/`: real project screenshots and the original portrait.
- `public/alfonsus-jason-christian-cv.pdf`: current CV. The legacy CV filename remains available.
- `/portfolio`, `/cv`, `/contact`, `/blog`, `/blog/[slug]`, `/admin`: preserved public routes. `/projects` redirects permanently to `/portfolio`.

## Firebase configuration

Copy `.env.example` to `.env.local` and set your existing public Firebase configuration. Prefer `NEXT_PUBLIC_FIREBASE_*`. During migration, `next.config.ts` also accepts the old `REACT_APP_FIREBASE_*` values. Only those six explicit public Firebase fields are exposed; server secrets are never mapped.

The `posts` collection and existing document IDs, slugs, fields, and comma-separated or array tags remain compatible. Existing browser-local posts under `aljasonch_blog_posts` remain readable when Firebase is not configured. Cloud read errors are displayed; write failures preserve the editor content and never silently become local-only publications.

Enable Firebase email/password authentication and retain Firestore rules that allow public reads and restrict writes to the actual site administrator (for example, a specific UID). The login UI is not a replacement for those rules. A signed-in account does not itself imply admin authorization. This rebuild does not change deployed Firebase rules or existing content.

## Portfolio assistant

Set server-only `GEMINI_API_KEY`. Optional `GEMINI_MODEL` defaults to the existing `gemini-3.5-flash-lite` configuration. Verify model access in your own project before production use. See `docs/chat-api.md` for the contract, failure responses, test evidence, and limits of per-instance rate limiting. No live model calls are needed to build.

## Deployment

Vercel uses the Next.js preset, `npm run build`, and `.next` output, explicitly set in `vercel.json`. Keep the existing Vercel project and environment variables. Remove any manually configured CRA output override (`build`) or SPA rewrite to `/index.html` in the Vercel dashboard if present. The repository does not deploy automatically during local development.

The existing Azure pipeline retains its project-selection and token configuration. It installs Node 24, runs tests, and builds/deploys using Vercel when explicitly triggered. No deployment was performed as part of this rewrite.

## Asset provenance

The hero uses the original profile photograph; navigation and the footer use the original AJ logo. Project previews are original repository assets with their verified landscape aspect ratios preserved. Generated concept screenshots are not used as representations of real projects. Projects without existing screenshots use typography; missing public URLs are not invented.

## Assistant formatting and keyboard

The assistant uses react-markdown with remark-gfm. Server-side Markdown parsing validates link nodes without stripping domain-like text from email addresses or technology names. Raw HTML and images are not rendered, and client links use the same destination allowlist. Desktop devices with a fine pointer and viewport wider than 760px use Enter to send and Ctrl+Enter for a new line; mobile Enter remains a normal newline. IME composition never sends a message.
