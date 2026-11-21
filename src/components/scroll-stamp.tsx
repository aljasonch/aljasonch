"use client";

import { useEffect, useRef } from "react";

export default function ScrollStamp() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!svgRef.current) return;
      const deg = (window.scrollY * 0.22) % 360;
      svgRef.current.style.transform = `rotate(${deg.toFixed(1)}deg)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <a
      href="#selected-work"
      className="scroll-stamp"
      aria-label="Jump to selected work"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 120 120"
        className="scroll-stamp-ring"
        aria-hidden="true"
      >
        <defs>
          <path
            id="stamp-circle"
            d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
          />
        </defs>
        <text textLength="264" lengthAdjust="spacing">
          <textPath href="#stamp-circle" startOffset="0%">
            JASON CHRISTIAN · ENGINEER · TANGERANG ·
          </textPath>
        </text>
      </svg>
      <span className="scroll-stamp-center" aria-hidden="true">
        ↓
      </span>
    </a>
  );
}
