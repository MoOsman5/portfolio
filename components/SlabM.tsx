"use client";

import { useEffect, useRef } from "react";
import { markPolygons } from "./Logo";

const SLABS = markPolygons(9);

/**
 * The logo's slab M, set inline as the first letter of the name.
 * The slabs rise in when the page opens, then breathe like an equaliser;
 * the closer the pointer, the harder they bounce.
 */
export default function SlabM() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const slabs = Array.from(svg.querySelectorAll<SVGPolygonElement>(".sm-slab"));
    let energy = 0, target = 0, raf = 0, t0 = performance.now(), visible = true;

    const onMove = (e: PointerEvent) => {
      const r = svg.getBoundingClientRect();
      const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
      target = Math.max(0, 1 - d / 420);
    };
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) loop(); });
    const tick = (now: number) => {
      if (!visible) { raf = 0; return; }
      const t = (now - t0) / 1000;
      energy += (target - energy) * 0.08;
      const amp = 0.07 + energy * 0.32;
      const speed = 1.3 + energy * 3.2;
      slabs.forEach((s, i) => {
        const w = Math.sin(t * speed + i * 0.75) * 0.5 + Math.sin(t * speed * 1.7 + i * 1.9) * 0.5;
        s.style.transform = `scaleY(${(1 - amp * 0.5 + w * amp * 0.5).toFixed(4)})`;
      });
      raf = requestAnimationFrame(tick);
    };
    const loop = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const start = () => window.setTimeout(() => { t0 = performance.now(); loop(); }, 1500);

    window.addEventListener("pointermove", onMove, { passive: true });
    io.observe(svg);
    if (document.documentElement.classList.contains("is-ready")) start();
    else window.addEventListener("mo:ready", start, { once: true });
    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mo:ready", start);
    };
  }, []);

  return (
    <svg ref={ref} className="slab-m" viewBox="6 14 74 72" aria-hidden="true" focusable="false">
      {SLABS.map((p, i) => (
        <g key={i} className="sm-in" style={{ ["--i" as string]: i }}>
          <polygon className="sm-slab" points={p} />
        </g>
      ))}
    </svg>
  );
}
