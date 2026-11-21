"use client";

import { useRef, type ReactNode } from "react";

export default function Magnetic({
  children,
  strength = 0.22,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (event.clientY - (rect.top + rect.height / 2)) * strength;
    ref.current.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
  }

  function onLeave() {
    if (!ref.current) return;
    ref.current.style.transform = "translate3d(0, 0, 0)";
  }

  return (
    <div
      ref={ref}
      className={`magnetic-wrap ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </div>
  );
}
