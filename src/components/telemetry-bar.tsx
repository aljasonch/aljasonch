"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content";

function formatClock() {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: profile.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());
  } catch {
    return "--:--:--";
  }
}

export default function TelemetryBar() {
  const [clock, setClock] = useState("");
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    setClock(formatClock());
    const timer = setInterval(() => setClock(formatClock()), 1000);

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      setCoords({ x: Math.round(event.clientX), y: Math.round(event.clientY) });
    };

    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      const pct = Math.min(100, Math.max(0, Math.round((window.scrollY / max) * 100)));
      setScrollPct(pct);
    };

    onScroll();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearInterval(timer);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="telemetry-wrap">
      <div className="telemetry-bar container">
        <span className="telemetry-cell">
          <span className="telemetry-label">LOC</span>
          <span>TANGERANG, ID</span>
          <span className="telemetry-sep">/</span>
          <span className="telemetry-val" suppressHydrationWarning>
            {clock ? `${clock} WIB` : "UTC+7"}
          </span>
        </span>
        <span className="telemetry-cell telemetry-desktop-only">
          <span className="telemetry-label">XY</span>
          <span className="telemetry-val">
            {String(coords.x).padStart(4, "0")} ·{" "}
            {String(coords.y).padStart(4, "0")}
          </span>
        </span>
        <span className="telemetry-cell telemetry-right">
          <span className="telemetry-label">SCROLL</span>
          <span className="telemetry-val">
            {String(scrollPct).padStart(3, "0")}%
          </span>
        </span>
      </div>
      <div className="scroll-rail" aria-hidden="true">
        <div
          className="scroll-rail-fill"
          style={{ transform: `scaleX(${scrollPct / 100})` }}
        />
      </div>
    </div>
  );
}
