# Portfolio assistant API

`POST /api/chat` accepts JSON `{ "message": "What has Jason built?" }` and returns `{ "reply": "..." }` on success. Replies are Markdown, at most 1,200 characters. Questions must be nonempty strings with at most 500 characters before trimming. No conversation history or personal data is stored persistently.

Error responses contain an `error` string: 400 invalid JSON/message, 408 body read timeout, 413 request over 8 KiB, 429 rate limit, 503 missing server configuration, 502 upstream failure or malformed response, and 504 upstream timeout. Unsupported methods receive 405. Configuration is checked after input validation. Clients should preserve the question on failure and offer retry.

Set `GEMINI_API_KEY` only on the server; never use a `NEXT_PUBLIC_` name. `GEMINI_MODEL` optionally overrides the existing `gemini-3.5-flash-lite` default. A live contact-information question was successfully verified in the local production preview on October 29, 2026; broader model availability remains account-dependent. The key is sent in an upstream header and never returned in errors. Instructions use the shared portfolio content module; model output is parsed as Markdown, with unsafe link nodes removed. The client uses react-markdown and remark-gfm, disables raw HTML/images, and validates link destinations with the same allowlist. Email addresses and the local PDF download path are preserved.

The incoming body has a five-second read limit. Gemini fetch has a 12-second abort deadline and a 64 KiB response cap. The client stops waiting after 20 seconds. A maximum of 1,000 in-memory IP entries permits ten validated questions per minute per instance. This is best-effort only: restarts, multiple instances, eviction, and spoofable forwarding headers prevent global abuse protection. Deploy behind a trusted proxy that replaces forwarding headers; use platform rate limits for stronger enforcement.

## Isolated verification

Run `node --experimental-strip-types --test tests/chat.test.ts` using Node 24. Tests cover invalid requests before configuration checks, body limits, missing configuration, link filtering, bounded rate limiter state and expiry, and a real loopback HTTP fixture serving successful, failed, malformed, and stalled upstream responses. No external Gemini calls or real credentials are used. These checks establish local transport/failure handling; they do not verify live model entitlement, billing, or answer quality.

## Browser verification

A live contact question rendered the email mailto link, GitHub/LinkedIn/Instagram links, and the full local CV download URL correctly. Desktop Ctrl+Enter inserted a newline and Enter sent the question. Mobile Enter retained multiline input. The unit suite separately covers the original escaped-URL and truncated-email regression.
