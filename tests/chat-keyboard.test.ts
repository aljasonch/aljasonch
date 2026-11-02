import test from "node:test";
import assert from "node:assert/strict";
import { chatEnterAction } from "../src/lib/chat-keyboard.ts";

test("desktop Enter sends, Ctrl+Enter adds a line, mobile and IME retain native behavior", () => {
  const enter = {
    key: "Enter",
    ctrlKey: false,
    shiftKey: false,
    metaKey: false,
    altKey: false,
    isComposing: false,
  };
  assert.equal(chatEnterAction(enter, true), "send");
  assert.equal(chatEnterAction({ ...enter, ctrlKey: true }, true), "newline");
  assert.equal(chatEnterAction({ ...enter, shiftKey: true }, true), "native");
  assert.equal(chatEnterAction(enter, false), "native");
  assert.equal(
    chatEnterAction({ ...enter, isComposing: true }, true),
    "native",
  );
});
