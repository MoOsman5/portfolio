"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; ox: number; oy: number; r: number; a: number; tw: number; ts: number; gold: boolean };
type Layer = { depth: number; stars: Star[] };
type Meteor = { x: number; y: number; vx: number; vy: number; life: number };

/**
 * The page sits in space. A fixed, depth-layered star field runs behind every section:
 * layers drift at different speeds as you scroll, stretch into streaks when you scroll fast,
 * and the cursor is a small light with a comet tail that pushes nearby stars aside.
 */
export default function Cosmos() {
  const bg = useRef<HTMLCanvasElement>(null);
  const fg = useRef<HTMLCanvasElement>(null);
  const label = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cb = bg.current!, cf = fg.current!;
    const b = cb.getContext("2d")!, f = cf.getContext("2d")!;
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches && !reduce;

    let W = 0, H = 0, dpr = 1;
    let layers: Layer[] = [];
    const meteors: Meteor[] = [];
    const nebula = document.createElement("canvas");

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      W = window.innerWidth; H = window.innerHeight;
      for (const c of [cb, cf]) { c.width = Math.round(W * dpr); c.height = Math.round(H * dpr); c.style.width = W + "px"; c.style.height = H + "px"; }
      b.setTransform(dpr, 0, 0, dpr, 0, 0);
      f.setTransform(dpr, 0, 0, dpr, 0, 0);
      const area = (W * H) / (1440 * 900);
      const spec = [
        { depth: 0.08, n: 320, r: [0.35, 0.8], a: [0.15, 0.4] },
        { depth: 0.22, n: 170, r: [0.6, 1.15], a: [0.3, 0.6] },
        { depth: 0.5, n: 70, r: [0.9, 1.7], a: [0.5, 0.9] },
      ];
      // Nebulae, painted once into a tall texture (three screens) and scrolled slowly.
      const nw = Math.round(W / 2), nh = Math.round(H * 1.5);
      nebula.width = nw; nebula.height = nh;
      const n = nebula.getContext("2d")!;
      n.clearRect(0, 0, nw, nh);
      const blob = (x: number, y: number, r: number, c: string) => {
        const g = n.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, c); g.addColorStop(1, "rgba(0,0,0,0)");
        n.fillStyle = g; n.fillRect(0, 0, nw, nh);
      };
      blob(nw * 0.82, nh * 0.12, Math.max(nw, nh) * 0.3, "rgba(200,169,106,0.06)");
      blob(nw * 0.12, nh * 0.5, Math.max(nw, nh) * 0.32, "rgba(90,110,160,0.06)");
      blob(nw * 0.62, nh * 0.86, Math.max(nw, nh) * 0.28, "rgba(200,169,106,0.045)");
      layers = spec.map((s) => ({
        depth: s.depth,
        stars: Array.from({ length: Math.round(s.n * Math.max(0.45, area)) }, () => ({
          x: Math.random() * W, y: Math.random() * H, ox: 0, oy: 0,
          r: s.r[0] + Math.random() * (s.r[1] - s.r[0]),
          a: s.a[0] + Math.random() * (s.a[1] - s.a[0]),
          tw: Math.random() * Math.PI * 2, ts: 0.6 + Math.random() * 1.8, gold: Math.random() < 0.14,
        })),
      }));
    };
    build();

    // Pointer state
    let mx = -9999, my = -9999, hx = -9999, hy = -9999, hot = 0, hotT = 0, lab = "", down = 0;
    const trail: { x: number; y: number }[] = [];
    const onMove = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; if (hx < -999) { hx = mx; hy = my; } };
    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const l = t.closest<HTMLElement>("[data-cursor]");
      lab = l?.dataset.cursor || "";
      hotT = l || t.closest("a, button, [data-magnetic]") ? 1 : 0;
      if (label.current) { label.current.textContent = lab; label.current.classList.toggle("on", !!lab); }
    };
    const onLeave = () => { mx = my = hx = hy = -9999; trail.length = 0; };
    const onDown = () => { down = 1; };
    const onUp = () => { down = 0; };
    if (fine) {
      root.classList.add("has-cursor");
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver);
      document.addEventListener("pointerleave", onLeave);
      window.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", onUp);
    }

    let lastScroll = window.scrollY, vel = 0, raf = 0, last = performance.now(), nextMeteor = 3000;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const sy = window.scrollY;
      vel += ((sy - lastScroll) - vel) * 0.2;
      lastScroll = sy;

      b.clearRect(0, 0, W, H);

      // Nebulae texture, wrapped vertically
      {
        const th = H * 3, off = (sy * 0.05) % th;
        b.globalAlpha = 1;
        b.drawImage(nebula, 0, -off, W, th);
        if (th - off < H) b.drawImage(nebula, 0, th - off, W, th);
      }

      const R = 150;
      const streak = Math.min(36, Math.abs(vel) * 0.9);
      for (const L of layers) {
        const shift = (sy * L.depth) % H;
        for (const s of L.stars) {
          let py = s.y - shift; if (py < 0) py += H;
          const px = s.x;
          // pushed aside by the cursor light
          let tx = 0, ty = 0, glow = 0;
          if (fine && mx > -999) {
            const dx = px - mx, dy = py - my, d = Math.hypot(dx, dy);
            if (d < R) {
              const k = (1 - d / R) ** 2;
              tx = (dx / (d || 1)) * k * 26 * (0.4 + L.depth * 1.6);
              ty = (dy / (d || 1)) * k * 26 * (0.4 + L.depth * 1.6);
              glow = k;
            }
          }
          s.ox += (tx - s.ox) * 0.12; s.oy += (ty - s.oy) * 0.12;
          const x = px + s.ox, y = py + s.oy;
          const twinkle = reduce ? 1 : 0.65 + 0.35 * Math.sin(now / 1000 * s.ts + s.tw);
          const alpha = Math.min(1, s.a * twinkle + glow * 0.8);
          const col = s.gold || glow > 0.25 ? `rgba(232,212,168,${alpha})` : `rgba(237,232,223,${alpha})`;
          const len = streak * L.depth * 2.2;
          if (len > 1.2) {
            b.strokeStyle = col; b.lineWidth = s.r * 1.1; b.lineCap = "round";
            b.beginPath(); b.moveTo(x, y); b.lineTo(x, y + (vel > 0 ? len : -len)); b.stroke();
          } else {
            b.fillStyle = col;
            const r = s.r * (1 + glow * 0.8);
            if (r < 1.1) b.fillRect(x - r, y - r, r * 2, r * 2);
            else { b.beginPath(); b.arc(x, y, r, 0, Math.PI * 2); b.fill(); }
          }
        }
      }

      // Shooting stars
      if (!reduce) {
        nextMeteor -= dt * 1000;
        if (nextMeteor < 0) {
          nextMeteor = 4500 + Math.random() * 6000;
          const fromLeft = Math.random() < 0.5;
          meteors.push({ x: fromLeft ? Math.random() * W * 0.5 : W * 0.5 + Math.random() * W * 0.5, y: -20, vx: (fromLeft ? 1 : -1) * (380 + Math.random() * 260), vy: 260 + Math.random() * 180, life: 1 });
        }
        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i];
          m.x += m.vx * dt; m.y += m.vy * dt; m.life -= dt * 0.55;
          if (m.life <= 0 || m.y > H + 40) { meteors.splice(i, 1); continue; }
          const tl = 0.16;
          const g = b.createLinearGradient(m.x, m.y, m.x - m.vx * tl, m.y - m.vy * tl);
          g.addColorStop(0, `rgba(245,232,200,${0.9 * m.life})`); g.addColorStop(1, "rgba(245,232,200,0)");
          b.strokeStyle = g; b.lineWidth = 1.4;
          b.beginPath(); b.moveTo(m.x, m.y); b.lineTo(m.x - m.vx * tl, m.y - m.vy * tl); b.stroke();
        }
      }

      // Comet cursor
      f.clearRect(0, 0, W, H);
      if (fine && mx > -999) {
        hx += (mx - hx) * 0.32; hy += (my - hy) * 0.32;
        hot += (hotT - hot) * 0.18;
        trail.unshift({ x: hx, y: hy });
        if (trail.length > 26) trail.pop();
        for (let i = 1; i < trail.length; i++) {
          const k = 1 - i / trail.length;
          f.strokeStyle = `rgba(232,212,168,${0.55 * k * (1 - hot * 0.6)})`;
          f.lineWidth = 4.2 * k + 0.3; f.lineCap = "round";
          f.beginPath(); f.moveTo(trail[i - 1].x, trail[i - 1].y); f.lineTo(trail[i].x, trail[i].y); f.stroke();
        }
        const halo = f.createRadialGradient(hx, hy, 0, hx, hy, 34);
        halo.addColorStop(0, `rgba(232,212,168,${0.28 + hot * 0.1})`); halo.addColorStop(1, "rgba(232,212,168,0)");
        f.fillStyle = halo; f.beginPath(); f.arc(hx, hy, 34, 0, Math.PI * 2); f.fill();
        f.fillStyle = "#F5E8C8";
        f.beginPath(); f.arc(mx, my, 2.6 * (1 - hot * 0.3) * (1 - down * 0.3), 0, Math.PI * 2); f.fill();
        if (hot > 0.02) {
          f.strokeStyle = `rgba(232,212,168,${0.85 * hot})`; f.lineWidth = 1;
          f.beginPath(); f.arc(hx, hy, 10 + hot * (lab ? 34 : 18) - down * 4, 0, Math.PI * 2); f.stroke();
        }
        if (label.current) label.current.style.transform = `translate(${hx.toFixed(1)}px, ${hy.toFixed(1)}px)`;
      }

      if (!reduce) raf = requestAnimationFrame(frame);
    };

    const onResize = () => { build(); if (reduce) frame(performance.now()); };
    const onVis = () => { if (!document.hidden && !reduce) { last = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); } else cancelAnimationFrame(raf); };
    const onScrollStatic = () => { if (reduce) frame(performance.now()); };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("scroll", onScrollStatic, { passive: true });
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("scroll", onScrollStatic);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      root.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <canvas ref={bg} className="cosmos" aria-hidden="true" />
      <canvas ref={fg} className="comet" aria-hidden="true" />
      <div ref={label} className="comet-label" aria-hidden="true" />
    </>
  );
}
