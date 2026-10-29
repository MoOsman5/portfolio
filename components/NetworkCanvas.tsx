"use client";

import { useEffect, useRef } from "react";

type City = { name: string; lon: number; lat: number; hub?: boolean; label?: boolean };

const cities: City[] = [
  { name: "Cairo", lon: 31.24, lat: 30.04, hub: true, label: true },
  { name: "Giza", lon: 31.0, lat: 29.9 },
  { name: "Alexandria", lon: 29.92, lat: 31.2, label: true },
  { name: "Marsa Matruh", lon: 27.24, lat: 31.35 },
  { name: "Damanhur", lon: 30.47, lat: 31.03 },
  { name: "Kafr El Sheikh", lon: 30.94, lat: 31.11 },
  { name: "Tanta", lon: 31.0, lat: 30.79 },
  { name: "Mansoura", lon: 31.38, lat: 31.04 },
  { name: "Damietta", lon: 31.81, lat: 31.42 },
  { name: "Port Said", lon: 32.3, lat: 31.26, label: true },
  { name: "Ismailia", lon: 32.27, lat: 30.6 },
  { name: "Zagazig", lon: 31.5, lat: 30.59 },
  { name: "Suez", lon: 32.55, lat: 29.97 },
  { name: "Faiyum", lon: 30.84, lat: 29.31 },
  { name: "Beni Suef", lon: 31.1, lat: 29.07 },
  { name: "Minya", lon: 30.75, lat: 28.1 },
  { name: "Asyut", lon: 31.18, lat: 27.18 },
  { name: "Sohag", lon: 31.69, lat: 26.56 },
  { name: "Qena", lon: 32.72, lat: 26.16 },
  { name: "Luxor", lon: 32.64, lat: 25.69 },
  { name: "Aswan", lon: 32.9, lat: 24.09, label: true },
  { name: "Hurghada", lon: 33.81, lat: 27.26, label: true },
  { name: "Sharm El Sheikh", lon: 34.33, lat: 27.92 },
];

const idx = (n: string) => cities.findIndex((c) => c.name === n);

// Road-like routes: the Nile valley chain, the Delta, the canal and the Red Sea coast.
const routes: [string, string][] = [
  ["Aswan", "Luxor"], ["Luxor", "Qena"], ["Qena", "Sohag"], ["Sohag", "Asyut"], ["Asyut", "Minya"],
  ["Minya", "Beni Suef"], ["Beni Suef", "Giza"], ["Faiyum", "Giza"], ["Giza", "Cairo"],
  ["Cairo", "Tanta"], ["Tanta", "Damanhur"], ["Damanhur", "Alexandria"], ["Alexandria", "Marsa Matruh"],
  ["Tanta", "Kafr El Sheikh"], ["Cairo", "Zagazig"], ["Zagazig", "Mansoura"], ["Mansoura", "Damietta"],
  ["Zagazig", "Ismailia"], ["Ismailia", "Port Said"], ["Cairo", "Suez"], ["Suez", "Hurghada"],
  ["Hurghada", "Qena"], ["Suez", "Sharm El Sheikh"], ["Cairo", "Alexandria"], ["Cairo", "Ismailia"],
];

type Edge = { a: number; b: number; bend: number };
type Packet = { edge: number; t: number; speed: number; dir: 1 | -1 };

export default function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const edges: Edge[] = routes.map(([a, b], i) => ({ a: idx(a), b: idx(b), bend: ((i * 37) % 11) / 11 - 0.5 }));
    let pts: { x: number; y: number }[] = [];
    let w = 0, h = 0, dpr = 1, raf = 0, last = performance.now(), spawn = 0;
    const packets: Packet[] = [];

    const layout = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Map lon 26.5–35 / lat 23.6–31.9 into the box, preserving aspect.
      const lonMin = 26.5, lonMax = 35, latMin = 23.6, latMax = 31.9;
      const sx = w / (lonMax - lonMin), sy = h / (latMax - latMin);
      const s = Math.min(sx, sy) * 0.92;
      const ox = (w - (lonMax - lonMin) * s) / 2, oy = (h - (latMax - latMin) * s) / 2;
      pts = cities.map((c) => ({ x: ox + (c.lon - lonMin) * s, y: oy + (latMax - c.lat) * s }));
    };

    const ctrl = (e: Edge) => {
      const p = pts[e.a], q = pts[e.b];
      const mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2;
      const dx = q.x - p.x, dy = q.y - p.y;
      const len = Math.hypot(dx, dy) || 1;
      const k = len * 0.18 * e.bend;
      return { x: mx - (dy / len) * k, y: my + (dx / len) * k };
    };
    const at = (e: Edge, t: number) => {
      const p = pts[e.a], q = pts[e.b], c = ctrl(e);
      const u = 1 - t;
      return { x: u * u * p.x + 2 * u * t * c.x + t * t * q.x, y: u * u * p.y + 2 * u * t * c.y + t * t * q.y };
    };

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, w, h);

      const hub = pts[0];
      const halo = ctx.createRadialGradient(hub.x, hub.y, 0, hub.x, hub.y, Math.min(w, h) * 0.32);
      halo.addColorStop(0, "rgba(200,169,106,0.10)");
      halo.addColorStop(1, "rgba(200,169,106,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, w, h);

      ctx.lineWidth = 1;
      for (const e of edges) {
        const p = pts[e.a], q = pts[e.b], c = ctrl(e);
        ctx.strokeStyle = "rgba(237,232,223,0.11)";
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.quadraticCurveTo(c.x, c.y, q.x, q.y); ctx.stroke();
      }

      if (!reduce) {
        spawn += dt * 18;
        while (spawn > 1) {
          spawn -= 1;
          const edge = Math.floor(Math.random() * edges.length);
          packets.push({ edge, t: 0, speed: 0.18 + Math.random() * 0.22, dir: Math.random() > 0.5 ? 1 : -1 });
        }
      }

      for (let i = packets.length - 1; i >= 0; i--) {
        const pk = packets[i];
        pk.t += pk.speed * dt;
        if (pk.t >= 1) { packets.splice(i, 1); continue; }
        const e = edges[pk.edge];
        const tt = pk.dir === 1 ? pk.t : 1 - pk.t;
        const tail = Math.max(0, pk.dir === 1 ? tt - 0.12 : tt + 0.12);
        const head = at(e, tt);
        const t0 = at(e, Math.min(1, tail));
        const g = ctx.createLinearGradient(t0.x, t0.y, head.x, head.y);
        g.addColorStop(0, "rgba(200,169,106,0)");
        g.addColorStop(1, "rgba(200,169,106,0.9)");
        ctx.strokeStyle = g; ctx.lineWidth = 1.6;
        ctx.beginPath();
        const steps = 8;
        for (let s = 0; s <= steps; s++) {
          const u = tail + ((tt - tail) * s) / steps;
          const pt = at(e, u);
          if (s === 0) ctx.moveTo(pt.x, pt.y); else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
        const glow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 7);
        glow.addColorStop(0, "rgba(232,212,168,0.55)");
        glow.addColorStop(1, "rgba(232,212,168,0)");
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(head.x, head.y, 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "rgba(245,232,200,1)";
        ctx.beginPath(); ctx.arc(head.x, head.y, 1.7, 0, Math.PI * 2); ctx.fill();
      }

      cities.forEach((c, i) => {
        const p = pts[i];
        if (c.hub) {
          const pulse = reduce ? 0.5 : (Math.sin(now / 700) + 1) / 2;
          ctx.strokeStyle = `rgba(200,169,106,${0.15 + pulse * 0.25})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(p.x, p.y, 10 + pulse * 8, 0, Math.PI * 2); ctx.stroke();
          ctx.fillStyle = "#C8A96A";
          ctx.beginPath(); ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2); ctx.fill();
        } else {
          ctx.fillStyle = "rgba(237,232,223,0.55)";
          ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2); ctx.fill();
        }
        if (c.label && w > 420) {
          ctx.font = "400 11px 'Hanken Grotesk', system-ui, sans-serif";
          ctx.fillStyle = c.hub ? "rgba(232,212,168,0.9)" : "rgba(139,134,125,0.9)";
          ctx.fillText(c.name, p.x + 8, p.y - 7);
        }
      });

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    layout();
    const ro = new ResizeObserver(() => { layout(); if (reduce) draw(performance.now()); });
    ro.observe(canvas);
    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduce) { last = performance.now(); raf = requestAnimationFrame(draw); }
    };
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  return <canvas ref={ref} className="network" aria-hidden="true" />;
}
