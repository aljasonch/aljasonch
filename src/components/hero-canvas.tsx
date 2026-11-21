"use client";

import { useEffect, useRef } from "react";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const pointer = { x: -9999, y: -9999, active: false };
    const smooth = { x: -9999, y: -9999 };

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      draw();
    }

    function readColors() {
      const style = getComputedStyle(document.documentElement);
      return {
        tick: style.getPropertyValue("--canvas-tick").trim() || "rgba(255,255,255,0.14)",
        accent: style.getPropertyValue("--accent").trim() || "#ff4f17",
      };
    }

    function draw() {
      if (!ctx || width === 0 || height === 0) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const { tick, accent } = readColors();
      const gap = width < 760 ? 52 : 64;
      const cols = Math.ceil(width / gap);
      const rows = Math.ceil(height / gap);
      const offsetX = (width - (cols - 1) * gap) / 2;
      const offsetY = (height - (rows - 1) * gap) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = offsetX + c * gap;
          const cy = offsetY + r * gap;
          let angle = -Math.PI / 4;
          let influence = 0;

          if (pointer.active && !reduced) {
            const dx = smooth.x - cx;
            const dy = smooth.y - cy;
            const dist = Math.hypot(dx, dy);
            const radius = 260;
            if (dist < radius) {
              influence = 1 - dist / radius;
              angle = Math.atan2(dy, dx);
            }
          }

          const len = 5 + influence * 7;
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.moveTo(-len, 0);
          ctx.lineTo(len, 0);
          ctx.strokeStyle = influence > 0.32 ? accent : tick;
          ctx.globalAlpha = influence > 0.32 ? 0.35 + influence * 0.65 : 1;
          ctx.lineWidth = influence > 0.32 ? 1.5 : 1;
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    function loop() {
      smooth.x += (pointer.x - smooth.x) * 0.14;
      smooth.y += (pointer.y - smooth.y) * 0.14;
      draw();
      if (pointer.active && !reduced) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    }

    function onMove(event: PointerEvent) {
      if (!canvas || event.pointerType !== "mouse" || reduced) return;
      const rect = canvas.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      if (!inside) {
        if (pointer.active) {
          pointer.active = false;
          draw();
        }
        return;
      }
      const nx = event.clientX - rect.left;
      const ny = event.clientY - rect.top;
      if (!pointer.active) {
        smooth.x = nx;
        smooth.y = ny;
      }
      pointer.x = nx;
      pointer.y = ny;
      pointer.active = true;
      if (!raf) raf = requestAnimationFrame(loop);
    }

    function onLeave() {
      pointer.active = false;
      draw();
    }

    const observer = new MutationObserver(() => draw());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-vector-canvas" aria-hidden="true" />;
}
