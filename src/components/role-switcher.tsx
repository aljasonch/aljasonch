"use client";

import { useEffect, useState } from "react";

const DOMAINS = ["SYSTEMS", "PRODUCTS", "ERP / ODOO", "AI AGENTS"];

export default function RoleSwitcher() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % DOMAINS.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <button
      type="button"
      className="hero-domain-btn"
      onClick={() => setIndex((prev) => (prev + 1) % DOMAINS.length)}
      title="Click to cycle engineering focus"
    >
      <span key={DOMAINS[index]} className="hero-domain-word">
        {DOMAINS[index]}
      </span>
    </button>
  );
}
