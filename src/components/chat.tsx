"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { allowedChatUrl } from "../lib/chat-links";
import { chatEnterAction } from "../lib/chat-keyboard";
import "./chat.css";

type Message = { role: "user" | "assistant"; text: string };

const STARTER_PROMPTS = [
  "What does Jason currently work on?",
  "Tell me about Chainew and Tjahyadi Consulting.",
  "Summarize his tech stack and education.",
];

export default function Chat() {
  const dialog = useRef<HTMLDialogElement>(null);
  const inputField = useRef<HTMLTextAreaElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const controller = useRef<AbortController | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi, I’m Jason’s portfolio assistant. Ask about his engineering roles, projects, tech stack, or education.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [messages, busy, error]);

  useEffect(() => () => controller.current?.abort(), []);

  useEffect(() => {
    const onOpen = () => {
      if (!dialog.current?.open) dialog.current?.showModal();
      requestAnimationFrame(() => inputField.current?.focus());
    };
    window.addEventListener("open-portfolio-chat", onOpen);
    return () => window.removeEventListener("open-portfolio-chat", onOpen);
  }, []);

  async function sendQuestion(raw: string) {
    const message = raw.trim();
    if (!message || busy) return;
    setBusy(true);
    setError("");
    setInput("");
    setMessages((previous) =>
      [...previous, { role: "user" as const, text: message }].slice(-20),
    );
    const abort = new AbortController();
    controller.current = abort;
    const timer = setTimeout(() => abort.abort(), 20000);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
        signal: abort.signal,
      });
      const data = (await response.json()) as {
        reply?: string;
        error?: string;
      };
      if (!response.ok || typeof data.reply !== "string")
        throw new Error(
          data.error || "The assistant is unavailable. Please try again.",
        );
      setMessages((previous) =>
        [
          ...previous,
          { role: "assistant" as const, text: data.reply!.slice(0, 1200) },
        ].slice(-20),
      );
    } catch (cause) {
      setError(
        abort.signal.aborted
          ? "The request timed out. Please try again."
          : cause instanceof Error
            ? cause.message
            : "Could not connect. Please try again.",
      );
      setInput(message);
    } finally {
      clearTimeout(timer);
      setBusy(false);
      controller.current = null;
      requestAnimationFrame(() => {
        if (dialog.current?.open) inputField.current?.focus();
      });
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await sendQuestion(input);
  }

  const showSuggestions = messages.length === 1 && !busy;

  return (
    <dialog
      ref={dialog}
      id="portfolio-chat"
      className="chat-dialog"
      aria-labelledby="chat-title"
      aria-describedby="chat-description"
      onClick={(event) => {
        if (event.target === event.currentTarget) dialog.current?.close();
      }}
    >
        <header className="chat-header">
          <div>
            <p className="chat-eyebrow">Portfolio Assistant</p>
            <h2 id="chat-title">Ask about Jason.</h2>
          </div>
          <button
            type="button"
            className="chat-close"
            aria-label="Close assistant"
            onClick={() => dialog.current?.close()}
          >
            ×
          </button>
        </header>

        <p id="chat-description" className="chat-description">
          Grounded strictly in this portfolio. For direct inquiries,{" "}
          <a href="/contact">contact Jason</a>.
        </p>

        <div
          ref={log}
          className="chat-log"
          role="log"
          aria-label="Conversation"
          aria-live="polite"
          aria-relevant="additions"
          tabIndex={0}
        >
          {messages.map((message, index) => (
            <div
              className={`chat-message chat-message-${message.role}`}
              key={index}
            >
              <span className="chat-speaker">
                {message.role === "user" ? "You" : "Assistant"}
              </span>
              {message.role === "user" ? (
                <p>{message.text}</p>
              ) : (
                <div className="chat-markdown">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    skipHtml
                    disallowedElements={["img", "input"]}
                    urlTransform={(url) => (allowedChatUrl(url) ? url : "")}
                    components={{
                      a: ({ href, children }) =>
                        href ? (
                          <a
                            href={href}
                            target={
                              href.startsWith("https:") ? "_blank" : undefined
                            }
                            rel={
                              href.startsWith("https:")
                                ? "noopener noreferrer"
                                : undefined
                            }
                          >
                            {children}
                          </a>
                        ) : (
                          <span>{children}</span>
                        ),
                    }}
                  >
                    {message.text}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          ))}

          {showSuggestions && (
            <div className="chat-suggestions" aria-label="Suggested questions">
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="chat-suggestion"
                  onClick={() => void sendQuestion(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {busy && (
            <p className="chat-pending" role="status">
              Thinking…
            </p>
          )}
        </div>

        {error && (
          <p className="chat-error" role="alert">
            {error}
          </p>
        )}

        <form className="chat-form" onSubmit={submit}>
          <label htmlFor="chat-input">
            <span>Your question</span>
            <span>{input.length}/500</span>
          </label>
          <textarea
            id="chat-input"
            ref={inputField}
            autoFocus
            rows={2}
            value={input}
            maxLength={500}
            disabled={busy}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              const action = chatEnterAction(
                { ...event, isComposing: event.nativeEvent.isComposing },
                window.matchMedia("(min-width: 761px) and (pointer: fine)")
                  .matches,
              );
              if (action === "send") {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
              if (action === "newline") {
                event.preventDefault();
                const field = event.currentTarget;
                const start = field.selectionStart;
                const next =
                  input.slice(0, start) +
                  "\n" +
                  input.slice(field.selectionEnd);
                if (next.length <= 500) {
                  setInput(next);
                  requestAnimationFrame(() =>
                    field.setSelectionRange(start + 1, start + 1),
                  );
                }
              }
            }}
            placeholder="Ask about projects, Odoo, Next.js, or background…"
            required
          />
          <div className="chat-form-footer">
            <p className="chat-keyboard-hint">
              Enter to send · Ctrl+Enter for new line
            </p>
            <button
              className="chat-send"
              type="submit"
              disabled={busy || !input.trim()}
            >
              {busy ? "Answering…" : "Send ↗"}
            </button>
          </div>
      </form>
    </dialog>
  );
}
