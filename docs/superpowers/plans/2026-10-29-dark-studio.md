# Dark studio implementation plan

> Execute with subagent-driven-development; review implementation and run checks before completion.

**Goal:** Replace the CRA portfolio with the approved dark-studio Next.js application.

**Architecture:** Server-rendered portfolio pages share typed content and a new CSS design system. Client components own navigation, project filtering, Firebase article editing, and assistant interaction. Preserve existing public routes and data formats.

**Stack:** Next.js App Router, React, TypeScript, Firebase, native CSS, Node test runner.

## Constraints

Follow `../specs/2026-10-29-dark-studio-design.md`. Preserve secrets and live data. Do not deploy. Use actual screenshots, updated CV facts, and no invented project links. Keep Gemini credentials server-only. Local verification must not write to live services.

## Task 1: Foundation and public portfolio

- [x] Replace package configuration with Next.js scripts, React, TypeScript, Firebase, Markdown support, and local fonts; remove CRA build tools.
- [x] Create `src/app/layout.tsx`, `src/app/globals.css`, and `src/lib/content.ts`.
- [x] Build home, portfolio, CV, and contact routes plus not-found and the legacy projects redirect.
- [x] Implement header, mobile navigation, native dialog command palette, project filtering, footer, and responsive project showcases.
- [x] Move existing real project images to public assets; copy updated CV to clean and legacy download filenames.
- [x] Validate using TypeScript, production build, route requests, and desktop/mobile browser checks.

## Task 2: Journal and administration

- [x] Rewrite `src/lib/posts.ts`, `src/lib/firebase.ts`, `src/components/journal.tsx`, and `src/components/admin.tsx`; create blog and admin routes.
- [x] Before implementation, add Node tests for tag normalization, legacy post conversion, invalid local data, and post validation in `tests/posts.test.ts`.
- [x] Preserve Firestore collection/fields and local storage key. Fail remote writes visibly; retain editor input. Use safe Markdown.
- [x] Verify test failures, implement, rerun tests, and review auth gating, empty/error states, stable slugs, and loading behavior.

## Task 3: Assistant

- [x] Define the existing POST message/reply contract in `docs/chat-api.md` and test validation, missing key, upstream failures, and unsafe output links in `tests/chat.test.ts` before implementation.
- [x] Rewrite server handler in `src/lib/chat.ts`, Next route in `src/app/api/chat/route.ts`, and client widget in `src/components/chat.tsx`.
- [x] Consume the shared updated content, enforce bounded input/reply/request duration, maintain best-effort bounded rate limiting, and handle user-facing errors.
- [x] Use isolated HTTP simulation for upstream behavior if tooling is available; report mocked versus live evidence.

## Task 4: Integration and review

- [x] Remove obsolete application code and configuration after replacements exist.
- [x] Update README, environment migration instructions, ignore rules, and Vercel/Azure build configuration.
- [x] Run `npm test`, `npm run typecheck`, and `npm run build`.
- [x] Check all routes, redirect, PDF bytes, UI keyboard behavior, filtering, article states, and mobile overflow against the running app.
- [x] Request independent review, fix material findings, and rerun affected checks. Record completed work and remaining live-service verification limits.
