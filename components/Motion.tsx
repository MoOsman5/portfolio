"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * One client island for all page motion. Markup opts in with data attributes:
 *   data-reveal="up|mask|clip|fade"  revealed once when it enters the viewport
 *   data-count="20" data-suffix="M+" data-decimals="1"  counts up when revealed
 *   data-magnetic                     drifts toward the pointer
 *   data-tilt                         tilts in 3D under the pointer
 *   data-parallax="0.12"              moves against the scroll
 *   data-cursor="View"                cursor shows a label over it
 * Nothing runs for reduced motion; without JS everything is simply visible.
 */
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce) { root.classList.add("is-ready", "no-motion"); return; }

    const cleanups: (() => void)[] = [];

    // Smooth scroll
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 3.2), smoothWheel: true });
    let rafId = 0;
    const raf = (t: number) => { lenis.raf(t); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    const ready = () => lenis.start();
    if (!root.classList.contains("is-ready")) { lenis.stop(); window.addEventListener("mo:ready", ready, { once: true }); }
    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!;
      const el = id === "#top" ? document.body : document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: id === "#top" ? 0 : -40, duration: 1.6 });
    };
    document.addEventListener("click", onAnchor);
    cleanups.push(() => { cancelAnimationFrame(rafId); lenis.destroy(); document.removeEventListener("click", onAnchor); window.removeEventListener("mo:ready", ready); });

    // Reveal + count-up
    const fmt = (v: number, d: number) => v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
    const countUp = (el: HTMLElement) => {
      const to = parseFloat(el.dataset.count || "0"), d = parseInt(el.dataset.decimals || "0", 10);
      const suffix = el.dataset.suffix || "", t0 = performance.now(), dur = 1800;
      const step = (t: number) => {
        const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 4);
        el.textContent = fmt(to * e, d) + suffix;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        const el = en.target as HTMLElement;
        el.classList.add("in");
        el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
        if (el.dataset.count) countUp(el);
        io.unobserve(el);
      }
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    // Scroll-linked: progress bar, nav, timeline fill, parallax
    const bar = document.querySelector<HTMLElement>(".scrollbar");
    const nav = document.querySelector<HTMLElement>(".nav");
    const tl = document.querySelector<HTMLElement>(".timeline");
    const par = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
      if (nav) nav.classList.toggle("nav-hidden", y > lastY && y > 240);
      if (nav) nav.classList.toggle("nav-solid", y > 40);
      lastY = y;
      if (tl) {
        const r = tl.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height));
        tl.style.setProperty("--p", p.toFixed(4));
      }
      for (const el of par) {
        const r = el.getBoundingClientRect();
        const c = r.top + r.height / 2 - window.innerHeight / 2;
        el.style.setProperty("--py", `${(-c * parseFloat(el.dataset.parallax || "0.1")).toFixed(1)}px`);
      }
    };
    lenis.on("scroll", onScroll);
    onScroll();

    if (fine) {
      // Cursor
      const dot = document.createElement("div"), ring = document.createElement("div");
      dot.className = "cursor-dot"; ring.className = "cursor-ring";
      const label = document.createElement("span"); ring.appendChild(label);
      document.body.append(dot, ring);
      root.classList.add("has-cursor");
      let mx = -100, my = -100, rx = -100, ry = -100, cid = 0;
      const move = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px, ${my}px)`; };
      const loop = () => {
        rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
        ring.style.transform = `translate(${rx}px, ${ry}px)`;
        cid = requestAnimationFrame(loop);
      };
      cid = requestAnimationFrame(loop);
      const over = (e: PointerEvent) => {
        const t = e.target as HTMLElement;
        const lab = t.closest<HTMLElement>("[data-cursor]");
        const hot = t.closest("a, button, [data-magnetic]");
        ring.classList.toggle("is-hot", !!hot && !lab);
        ring.classList.toggle("is-label", !!lab);
        label.textContent = lab?.dataset.cursor || "";
      };
      const down = () => ring.classList.add("is-down"), up = () => ring.classList.remove("is-down");
      const leave = () => { mx = my = -100; };
      window.addEventListener("pointermove", move, { passive: true });
      document.addEventListener("pointerover", over);
      window.addEventListener("pointerdown", down);
      window.addEventListener("pointerup", up);
      document.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        cancelAnimationFrame(cid); dot.remove(); ring.remove(); root.classList.remove("has-cursor");
        window.removeEventListener("pointermove", move); document.removeEventListener("pointerover", over);
        window.removeEventListener("pointerdown", down); window.removeEventListener("pointerup", up);
        document.removeEventListener("pointerleave", leave);
      });

      // Magnetic
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const mm = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
          el.style.transform = `translate(${x * 0.28}px, ${y * 0.38}px)`;
        };
        const ml = () => { el.style.transform = ""; };
        el.addEventListener("pointermove", mm); el.addEventListener("pointerleave", ml);
        cleanups.push(() => { el.removeEventListener("pointermove", mm); el.removeEventListener("pointerleave", ml); });
      });

      // Tilt
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        const tm = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
          el.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`);
          el.style.setProperty("--ry", `${(x * 9).toFixed(2)}deg`);
          el.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
          el.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`);
        };
        const tl2 = () => { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); };
        el.addEventListener("pointermove", tm); el.addEventListener("pointerleave", tl2);
        cleanups.push(() => { el.removeEventListener("pointermove", tm); el.removeEventListener("pointerleave", tl2); });
      });
    }

    return () => cleanups.forEach((c) => c());
  }, []);

  return <div className="scrollbar" aria-hidden="true" />;
}
