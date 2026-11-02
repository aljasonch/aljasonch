import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import {
  createChatHandler,
  sanitizeReply,
  createRateLimiter,
} from "../src/lib/chat.ts";
const request = (message: unknown) =>
  new Request("http://localhost/api/chat", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
test("validates before checking configuration and caps streamed bodies", async () => {
  const handler = createChatHandler({ apiKey: "" });
  for (const message of ["", "   ", null, 1, "a".repeat(501)])
    assert.equal((await handler(request(message))).status, 400);
  assert.equal((await handler(request("hello"))).status, 503);
  assert.equal(
    (
      await handler(
        new Request("http://localhost", { method: "POST", body: "{" }),
      )
    ).status,
    400,
  );
  assert.equal((await handler(request("a".repeat(9000)))).status, 413);
  assert.equal((await handler(new Request("http://localhost"))).status, 405);
});
test("removes unsafe raw and Markdown URLs while preserving safe Markdown links", () => {
  const result = sanitizeReply(
    "[bad](https://evil.com) https://evil.com/test https://github.com.evil.com [code](https://github.com/aljasonch) javascript:alert(1) [internal](//evil) //evil.com www.evil.com mailto:aljasonch@gmail.com.evil",
  );
  assert.ok(!result.includes("evil"));
  assert.ok(!result.includes("javascript:"));
  assert.ok(result.includes("https://github.com/aljasonch"));
  assert.ok(result.includes("[code](https://github.com/aljasonch)"));
  assert.ok(sanitizeReply("a".repeat(2000)).length <= 1200);
});
test("preserves contact details, CV downloads, and escaped URLs from model output", () => {
  const input =
    "Email: aljasonch@gmail.com\\\n\\\nWebsite: https\\://aljasonch.vercel.app\nLinkedIn: https\\://www\\.linkedin.com/in/aljasonch/\n[Download CV](/alfonsus-jason-christian-cv.pdf)\n**Next.js** and React.js";
  const output = sanitizeReply(input);
  assert.ok(output.includes("aljasonch@gmail.com"));
  assert.ok(output.includes("https://aljasonch.vercel.app"));
  assert.ok(output.includes("https://www.linkedin.com/in/aljasonch/"));
  assert.ok(output.includes("/alfonsus-jason-christian-cv.pdf"));
  assert.ok(output.includes("Next.js") && output.includes("React.js"));
});
test("rate limit resets and memory stays bounded", () => {
  let now = 0;
  const limited = createRateLimiter(() => now, 2);
  for (let i = 0; i < 10; i++) assert.equal(limited("one"), false);
  assert.equal(limited("one"), true);
  now = 60001;
  assert.equal(limited("one"), false);
  limited("two");
  limited("three");
  assert.equal(limited.size(), 2);
});
test("real local HTTP upstream: success, failure, malformed JSON, timeout", async () => {
  const server = createServer((req, res) => {
    if (req.url === "/timeout") return;
    if (req.url === "/failure") {
      res.writeHead(503);
      res.end("private upstream details");
      return;
    }
    if (req.url === "/invalid") {
      res.end("not JSON");
      return;
    }
    res.setHeader("content-type", "application/json");
    res.end(
      JSON.stringify({
        candidates: [
          {
            content: {
              parts: [{ text: "Jason builds software. https://evil.com" }],
            },
          },
        ],
      }),
    );
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const endpoint = `http://127.0.0.1:${address.port}`;
  try {
    for (const [path, status] of [
      ["/success", 200],
      ["/failure", 502],
      ["/invalid", 502],
      ["/timeout", 504],
    ] as const) {
      const handler = createChatHandler({
        apiKey: "test-only",
        endpoint: endpoint + path,
        timeoutMs: path === "/timeout" ? 50 : 2000,
      });
      const response = await handler(request("What does Jason do?"));
      assert.equal(response.status, status);
      const body = await response.text();
      assert.ok(
        !body.includes("evil.com") &&
          !body.includes("private upstream") &&
          !body.includes("test-only"),
      );
      if (status === 200) assert.match(body, /Jason builds software/);
    }
  } finally {
    server.closeAllConnections();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});

test("accepts the 500-character boundary and rejects oversized streamed data", async () => {
  const handler = createChatHandler({ apiKey: "" });
  assert.equal((await handler(request("x".repeat(500)))).status, 503);
  const body = new ReadableStream({
    start(controller) {
      controller.enqueue(new Uint8Array(8193));
      controller.close();
    },
  });
  const streamed = new Request("http://localhost/api/chat", {
    method: "POST",
    body,
    duplex: "half",
  } as RequestInit);
  assert.equal((await handler(streamed)).status, 413);
});

test("handler reports rate limiting with retry guidance", async () => {
  const handler = createChatHandler({ apiKey: "" });
  const makeRequest = () =>
    new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "x-forwarded-for": "192.0.2.25" },
      body: JSON.stringify({ message: "hello" }),
    });
  for (let i = 0; i < 10; i++)
    assert.equal((await handler(makeRequest())).status, 503);
  const response = await handler(makeRequest());
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("Retry-After"), "60");
});
