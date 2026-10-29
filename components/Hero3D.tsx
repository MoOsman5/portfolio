"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { cities, routes, cityIndex } from "@/lib/geo";
import NetworkCanvas from "./NetworkCanvas";

const GOLD = new THREE.Color("#C8A96A");
const GOLD_SOFT = new THREE.Color("#E8D4A8");
const IVORY = new THREE.Color("#EDE8DF");

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function glowTexture() {
  const s = 128;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  grd.addColorStop(0, "rgba(255,240,210,1)");
  grd.addColorStop(0.25, "rgba(232,212,168,0.55)");
  grd.addColorStop(1, "rgba(200,169,106,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, s, s);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const pointVert = /* glsl */ `
  attribute float aSize;
  attribute float aAlpha;
  attribute vec3 aColor;
  varying float vAlpha;
  varying vec3 vColor;
  uniform float uPixelRatio;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (40.0 / -mv.z);
    vAlpha = aAlpha;
    vColor = aColor;
  }
`;
const pointFrag = /* glsl */ `
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a = pow(a, 1.6);
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor, a * vAlpha);
  }
`;

export default function Hero3D() {
  const mount = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    if (!hasWebGL()) { setFallback(true); return; }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setClearColor(0x000000, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 11, 22);
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
    const camBase = new THREE.Vector3(0, 7.2, 10.5);
    camera.position.copy(camBase);
    camera.lookAt(0, 0.6, 0);

    const world = new THREE.Group();
    world.rotation.y = -0.38;
    scene.add(world);

    // Projection from lon/lat to the ground plane.
    const K = 0.95;
    const P = (lon: number, lat: number, y = 0) => new THREE.Vector3((lon - 31.1) * K, y, -(lat - 27.8) * K);
    const pos = cities.map((c) => P(c.lon, c.lat));

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(x: T) => { disposables.push(x); return x; };

    // Ground: a field of fine dots that fades toward the edges.
    {
      const pts: number[] = [], col: number[] = [];
      for (let x = -7; x <= 7; x += 0.2) {
        for (let z = -6; z <= 6; z += 0.2) {
          const d = Math.hypot(x * 0.9, z);
          if (d > 6.2) continue;
          pts.push(x, 0, z);
          const f = Math.max(0, 1 - d / 6.2) * 0.38;
          col.push(f, f * 0.96, f * 0.9);
        }
      }
      const g = track(new THREE.BufferGeometry());
      g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
      g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
      const m = track(new THREE.PointsMaterial({ size: 0.022, vertexColors: true, transparent: true, depthWrite: false }));
      world.add(new THREE.Points(g, m));
    }

    // The Nile, as a soft gold line from Aswan to the Delta.
    {
      const nile = ["Aswan", "Luxor", "Qena", "Sohag", "Asyut", "Minya", "Beni Suef", "Giza", "Cairo"].map((n) => pos[cityIndex(n)].clone());
      const curve = new THREE.CatmullRomCurve3(nile, false, "catmullrom", 0.4);
      const g = track(new THREE.TubeGeometry(curve, 200, 0.012, 6, false));
      const m = track(new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.35, depthWrite: false }));
      world.add(new THREE.Mesh(g, m));
    }

    // Light pillars, one per city.
    const tex = track(glowTexture());
    const pillarMat = track(new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uColor: { value: GOLD_SOFT } },
      vertexShader: `varying float vY; void main(){ vY = uv.y; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `uniform vec3 uColor; varying float vY; void main(){ gl_FragColor = vec4(uColor, pow(1.0 - vY, 1.4) * 0.9); }`,
    }));
    let hubRing: THREE.Mesh | null = null;
    let hubTop = new THREE.Vector3();
    cities.forEach((c, i) => {
      const h = 0.25 + c.weight * 2.6;
      const g = track(new THREE.CylinderGeometry(c.hub ? 0.03 : 0.014, c.hub ? 0.03 : 0.014, h, 8, 1, true));
      // Flip uv so 0 is the ground.
      const uv = g.getAttribute("uv") as THREE.BufferAttribute;
      for (let k = 0; k < uv.count; k++) uv.setY(k, 1 - uv.getY(k));
      const pillar = new THREE.Mesh(g, pillarMat);
      pillar.position.copy(pos[i]).setY(h / 2);
      world.add(pillar);

      const sm = track(new THREE.SpriteMaterial({ map: tex, color: c.hub ? GOLD_SOFT : GOLD, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: c.hub ? 1 : 0.8 }));
      const base = new THREE.Sprite(sm);
      base.position.copy(pos[i]).setY(0.02);
      const s = c.hub ? 0.9 : 0.28 + c.weight * 0.3;
      base.scale.set(s, s, s);
      world.add(base);

      if (c.hub) {
        hubTop = pos[i].clone().setY(h);
        const rg = track(new THREE.RingGeometry(0.34, 0.36, 64));
        const rm = track(new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.6, side: THREE.DoubleSide, depthWrite: false }));
        hubRing = new THREE.Mesh(rg, rm);
        hubRing.rotation.x = -Math.PI / 2;
        hubRing.position.copy(pos[i]).setY(0.01);
        world.add(hubRing);
      }
    });

    // Routes as arcs above the ground.
    const curves = routes.map(([a, b]) => {
      const p = pos[cityIndex(a)], q = pos[cityIndex(b)];
      const mid = p.clone().add(q).multiplyScalar(0.5);
      mid.y = 0.25 + p.distanceTo(q) * 0.32;
      return new THREE.QuadraticBezierCurve3(p.clone(), mid, q.clone());
    });
    {
      const lm = track(new THREE.LineBasicMaterial({ color: IVORY, transparent: true, opacity: 0.1, depthWrite: false }));
      curves.forEach((c) => {
        const g = track(new THREE.BufferGeometry().setFromPoints(c.getPoints(48)));
        world.add(new THREE.Line(g, lm));
      });
    }

    // Packets with short trails, drawn as soft additive points.
    const MAX = 160, TRAIL = 9, N = MAX * TRAIL;
    const pPos = new Float32Array(N * 3), pSize = new Float32Array(N), pAlpha = new Float32Array(N), pCol = new Float32Array(N * 3);
    const pg = track(new THREE.BufferGeometry());
    pg.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pg.setAttribute("aSize", new THREE.BufferAttribute(pSize, 1));
    pg.setAttribute("aAlpha", new THREE.BufferAttribute(pAlpha, 1));
    pg.setAttribute("aColor", new THREE.BufferAttribute(pCol, 3));
    const pm = track(new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uPixelRatio: { value: 1 } }, vertexShader: pointVert, fragmentShader: pointFrag,
    }));
    const packetPoints = new THREE.Points(pg, pm);
    packetPoints.frustumCulled = false;
    world.add(packetPoints);
    type Pk = { c: number; t: number; v: number; dir: number; alive: boolean };
    const packets: Pk[] = Array.from({ length: MAX }, () => ({ c: 0, t: 0, v: 0, dir: 1, alive: false }));
    const tmp = new THREE.Vector3();

    // Dust in the air.
    const DUST = 500;
    const dPos = new Float32Array(DUST * 3), dSize = new Float32Array(DUST), dAlpha = new Float32Array(DUST), dCol = new Float32Array(DUST * 3);
    for (let i = 0; i < DUST; i++) {
      dPos[i * 3] = (Math.random() - 0.5) * 16;
      dPos[i * 3 + 1] = Math.random() * 6;
      dPos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      dSize[i] = 0.6 + Math.random() * 1.4;
      dAlpha[i] = 0.08 + Math.random() * 0.25;
      dCol.set([IVORY.r, IVORY.g, IVORY.b], i * 3);
    }
    const dg = track(new THREE.BufferGeometry());
    dg.setAttribute("position", new THREE.BufferAttribute(dPos, 3));
    dg.setAttribute("aSize", new THREE.BufferAttribute(dSize, 1));
    dg.setAttribute("aAlpha", new THREE.BufferAttribute(dAlpha, 1));
    dg.setAttribute("aColor", new THREE.BufferAttribute(dCol, 3));
    const dust = new THREE.Points(dg, pm);
    dust.frustumCulled = false;
    scene.add(dust);

    // Sizing, with the scene nudged right on wide screens so the name has room.
    let W = 0, H = 0;
    const resize = () => {
      const r = el.getBoundingClientRect();
      W = Math.max(1, r.width); H = Math.max(1, r.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(W, H, false);
      pm.uniforms.uPixelRatio.value = dpr;
      camera.aspect = W / H;
      if (W / H > 1.15) camera.setViewOffset(W, H, -W * 0.2, 0, W, H);
      else camera.clearViewOffset();
      camera.fov = W / H < 0.8 ? 46 : 34;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // Pointer parallax and scroll dive.
    const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    let scroll = 0;
    const onScroll = () => { scroll = Math.min(1, window.scrollY / Math.max(1, H)); };
    window.addEventListener("scroll", onScroll, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !reduce) loop(); });
    io.observe(el);

    let raf = 0, last = performance.now(), spawn = 0, time = 0, running = false;
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      time += dt;

      cur.x += (target.x - cur.x) * 0.04;
      cur.y += (target.y - cur.y) * 0.04;
      world.rotation.y = -0.38 + Math.sin(time * 0.09) * 0.18 + cur.x * 0.12;
      camera.position.set(camBase.x + cur.x * 0.6, camBase.y - cur.y * 0.5 - scroll * 2.4, camBase.z - scroll * 3.2);
      camera.lookAt(0, 0.6 + scroll * 0.6, 0);

      if (hubRing) {
        const k = (time * 0.6) % 1;
        hubRing.scale.setScalar(1 + k * 2.4);
        (hubRing.material as THREE.MeshBasicMaterial).opacity = 0.6 * (1 - k);
      }

      spawn += dt * 22;
      while (spawn > 1) {
        spawn -= 1;
        const p = packets.find((x) => !x.alive);
        if (!p) break;
        p.alive = true; p.c = Math.floor(Math.random() * curves.length); p.t = 0;
        p.v = 0.16 + Math.random() * 0.2; p.dir = Math.random() > 0.5 ? 1 : -1;
      }
      for (let i = 0; i < MAX; i++) {
        const p = packets[i];
        if (p.alive) { p.t += p.v * dt; if (p.t >= 1) p.alive = false; }
        for (let j = 0; j < TRAIL; j++) {
          const k = i * TRAIL + j;
          if (!p.alive) { pAlpha[k] = 0; continue; }
          const tt = p.t - j * 0.012;
          if (tt < 0) { pAlpha[k] = 0; continue; }
          curves[p.c].getPoint(p.dir === 1 ? tt : 1 - tt, tmp);
          pPos.set([tmp.x, tmp.y, tmp.z], k * 3);
          const f = 1 - j / TRAIL;
          pSize[k] = (j === 0 ? 5.2 : 3.4) * f;
          pAlpha[k] = (j === 0 ? 1 : 0.55) * f;
          const c = j === 0 ? GOLD_SOFT : GOLD;
          pCol.set([c.r, c.g, c.b], k * 3);
        }
      }
      pg.attributes.position.needsUpdate = true;
      pg.attributes.aSize.needsUpdate = true;
      pg.attributes.aAlpha.needsUpdate = true;
      pg.attributes.aColor.needsUpdate = true;

      for (let i = 0; i < DUST; i++) {
        dPos[i * 3 + 1] += dt * 0.05;
        if (dPos[i * 3 + 1] > 6) dPos[i * 3 + 1] = 0;
      }
      dg.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);

      if (label.current) {
        tmp.copy(hubTop).setY(hubTop.y + 0.25);
        world.localToWorld(tmp);
        tmp.project(camera);
        const x = (tmp.x * 0.5 + 0.5) * W, y = (-tmp.y * 0.5 + 0.5) * H;
        label.current.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
        label.current.style.opacity = String(Math.max(0, 1 - scroll * 2));
      }
    };
    const loop = () => {
      if (running) return;
      running = true;
      last = performance.now();
      const tick = (now: number) => {
        if (!visible || document.hidden) { running = false; return; }
        frame(now);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const onVis = () => { if (!document.hidden && !reduce) loop(); };
    document.addEventListener("visibilitychange", onVis);

    if (reduce) {
      // One still frame with a few packets in flight.
      for (let i = 0; i < 60; i++) frame(performance.now() + i * 50);
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  if (fallback) return <NetworkCanvas />;
  return (
    <div ref={mount} className="scene" aria-hidden="true">
      <div ref={label} className="scene-label">
        <span>Cairo hub</span>
      </div>
    </div>
  );
}
