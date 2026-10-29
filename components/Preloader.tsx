"use client";

import { useEffect, useRef, useState } from "react";
import { markPolygons, O_PATH } from "./Logo";

const LOGS = [
  "Booting the platform",
  "Warming the Redis cache",
  "Opening this month's partition",
  "Routing reads to replicas",
  "Draining the Bull queue",
  "Dispatching to 23 cities",
  "All shipments on the road",
];

const SLABS = markPolygons(9);
const MIN_MS = 1900;
const MAX_MS = 5000;

declare global {
  interface Window { __moScene?: boolean }
}

/**
 * Loads with the page's real work: fonts, the 3D scene's first frame and window load.
 * Each slab of the mark fills as the work completes, then a curtain opens on the hero.
 * Adds html.is-ready when it leaves; the hero entrance keys off that.
 */
export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState<"load" | "out" | "done">("load");
  const raf = useRef(0);

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { root.classList.add("is-ready"); setPhase("done"); return; }

    const start = performance.now();
    const done = { fonts: false, load: document.readyState === "complete", scene: !!window.__moScene };
    document.fonts?.ready.then(() => { done.fonts = true; });
    const onLoad = () => { done.load = true; };
    const onScene = () => { done.scene = true; };
    window.addEventListener("load", onLoad);
    window.addEventListener("mo:scene", onScene);

    let shown = 0;
    const tick = () => {
      const t = performance.now() - start;
      let real = (done.fonts ? 0.3 : 0) + (done.load ? 0.3 : 0) + (done.scene ? 0.4 : 0);
      if (t > MAX_MS) real = 1;
      const pace = Math.min(1, t / MIN_MS);
      const target = Math.min(real, pace) * 100;
      shown += (target - shown) * 0.12;
      if (target === 100 && shown > 99.4) shown = 100;
      setPct(shown);
      if (shown >= 100) {
        setPhase("out");
        root.classList.add("is-ready");
        window.dispatchEvent(new Event("mo:ready"));
        window.setTimeout(() => setPhase("done"), 1300);
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("mo:scene", onScene);
    };
  }, []);

  if (phase === "done") return null;
  const n = Math.floor(pct);
  const log = LOGS[Math.min(LOGS.length - 1, Math.floor((pct / 100) * (LOGS.length - 1) + 0.0001))];

  return (
    <div className={`loader ${phase === "out" ? "loader-out" : ""}`} aria-hidden="true">
      <div className="loader-panel loader-top" />
      <div className="loader-panel loader-bottom" />
      <div className="loader-center">
        <svg className="loader-mark" viewBox="0 0 160 100" width="220" height="138">
          {SLABS.map((p, i) => {
            const fill = Math.max(0, Math.min(1, (pct / 100) * 10 - i));
            return (
              <g key={i}>
                <polygon points={p} className="loader-ghost" />
                <polygon points={p} className="loader-slab" style={{ transform: `scaleY(${fill})` }} />
              </g>
            );
          })}
          <path d={O_PATH} fillRule="evenodd" className="loader-ghost" />
          <path d={O_PATH} fillRule="evenodd" className={`loader-o ${pct >= 99 ? "on" : ""}`} />
        </svg>
        <p className="loader-count">{String(n).padStart(3, "0")}</p>
        <p className="loader-log" key={log}>{log}</p>
      </div>
      <div className="loader-bar" style={{ transform: `scaleX(${pct / 100})` }} />
    </div>
  );
}
