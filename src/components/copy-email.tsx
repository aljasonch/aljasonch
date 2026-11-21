"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/content";

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <div className="contact-email-box">
      <a className="contact-email-link" href={`mailto:${profile.email}`}>
        {profile.email}
      </a>
      <div className="contact-email-actions">
        <button
          type="button"
          className="button"
          onClick={copyAddress}
          aria-live="polite"
        >
          {copied ? "Copied address ✓" : "Copy email"}
        </button>
        <a className="button secondary" href={`mailto:${profile.email}`}>
          Open mail <span className="arrow-cue" aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
