"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
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

// The stack, bottom to top. Each layer is a plate carrying the things that live on it.
const LAYERS = ["Database", "Queues and cache", "API", "Screens"];
const PW = 3.4, PD = 2.4; // plate width and depth

export default function Hero3D() {
  const mount = useRef<HTMLDivElement>(null);
  const labels = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    if (!hasWebGL()) { setFallback(true); window.__moScene = true; window.dispatchEvent(new Event("mo:scene")); return; }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    el.appendChild(renderer.domElement);

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(x: T) => { disposables.push(x); return x; };

    const scene = new THREE.Scene();
    // Reflections for the metal come from a generated room, so no image files are needed.
    const pmrem = track(new THREE.PMREMGenerator(renderer));
    const room = new RoomEnvironment();
    const envRT = track(pmrem.fromScene(room, 0.04));
    scene.environment = envRT.texture;
    scene.environmentIntensity = 0.9;
    room.dispose();

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 80);
    const camBase = new THREE.Vector3(6.4, 5.4, 9.2);
    const look = new THREE.Vector3(0, 1.75, 0);

    const key = new THREE.DirectionalLight(0xffe6b8, 2.6);
    key.position.set(4, 8, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xc8a96a, 1.4);
    rim.position.set(-6, 3, -4);
    scene.add(rim);

    const world = new THREE.Group();
    world.scale.setScalar(0.88);
    scene.add(world);

    // Materials
    const gold = track(new THREE.MeshStandardMaterial({ color: 0xd6b06c, metalness: 1, roughness: 0.2, envMapIntensity: 1.7 }));
    const goldDeep = track(new THREE.MeshStandardMaterial({ color: 0x9a7d45, metalness: 1, roughness: 0.34, envMapIntensity: 1.3 }));
    const glow = track(new THREE.MeshStandardMaterial({ color: 0xd6b06c, metalness: 0.6, roughness: 0.35, emissive: 0xd9a548, emissiveIntensity: 0.8 }));
    const plateMat = track(new THREE.MeshPhysicalMaterial({ color: 0x080807, metalness: 0.9, roughness: 0.42, envMapIntensity: 0.22, transparent: true, opacity: 0.86 }));
    const screenMat = track(new THREE.MeshStandardMaterial({ color: 0x070706, metalness: 0.6, roughness: 0.2 }));
    const edgeMat = track(new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.95 }));
    const gridMat = track(new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.22 }));
    const tex = track(glowTexture());

    const box = (w: number, h: number, d: number) => track(new THREE.BoxGeometry(w, h, d));
    const edged = (g: THREE.BufferGeometry, m: THREE.Material) => {
      const mesh = new THREE.Mesh(g, m);
      mesh.add(new THREE.LineSegments(track(new THREE.EdgesGeometry(g)), edgeMat));
      return mesh;
    };
    const halo = (size: number, opacity: number) => {
      const sp = new THREE.Sprite(track(new THREE.SpriteMaterial({ map: tex, color: GOLD_SOFT, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity })));
      sp.scale.setScalar(size);
      return sp;
    };

    // One plate per layer, with a fine grid etched on top.
    const layers = LAYERS.map(() => {
      const g = new THREE.Group();
      g.add(edged(box(PW, 0.07, PD), plateMat));
      const pts: number[] = [];
      for (let x = -PW / 2 + 0.2; x < PW / 2; x += 0.4) pts.push(x, 0.04, -PD / 2, x, 0.04, PD / 2);
      for (let z = -PD / 2 + 0.2; z < PD / 2; z += 0.4) pts.push(-PW / 2, 0.04, z, PW / 2, 0.04, z);
      const gg = track(new THREE.BufferGeometry());
      gg.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
      g.add(new THREE.LineSegments(gg, gridMat));
      world.add(g);
      return g;
    });
    const [db, queue, api, ui] = layers;

    // Database: three stores made of stacked gold disks; the primary is the tall one.
    const disk = track(new THREE.CylinderGeometry(0.36, 0.36, 0.13, 56));
    [[-1.05, 3], [0, 5], [1.05, 3]].forEach(([x, n]) => {
      for (let k = 0; k < n; k++) {
        const m = new THREE.Mesh(disk, k === n - 1 ? gold : goldDeep);
        m.position.set(x, 0.11 + k * 0.17, 0);
        db.add(m);
      }
    });

    // Queues and cache: jobs moving along a rail, and two rings for the cache.
    const rail = new THREE.Mesh(box(PW - 0.5, 0.03, 0.34), goldDeep);
    rail.position.set(0, 0.06, 0.55);
    queue.add(rail);
    const jobGeo = box(0.24, 0.16, 0.24);
    const jobs = Array.from({ length: 7 }, (_, i) => {
      const m = new THREE.Mesh(jobGeo, i % 3 === 0 ? glow : gold);
      m.position.set(0, 0.16, 0.55);
      queue.add(m);
      return m;
    });
    const ringGeo = track(new THREE.TorusGeometry(0.34, 0.055, 20, 72));
    const rings = [-0.9, 0.15].map((x, i) => {
      const m = new THREE.Mesh(ringGeo, i ? goldDeep : gold);
      m.position.set(x, 0.42, -0.55);
      queue.add(m);
      return m;
    });

    // API: a block of services around a bright core.
    const svcGeo = box(0.42, 0.3, 0.42);
    const services: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) {
      const m = new THREE.Mesh(svcGeo, gold);
      m.position.set(-1.14 + i * 0.76, 0.19, -0.42 + j * 0.84);
      api.add(m);
      services.push(m);
    }
    const core = new THREE.Mesh(track(new THREE.OctahedronGeometry(0.3, 0)), glow);
    core.position.set(0, 0.62, 0);
    api.add(core);
    const coreHalo = halo(2.2, 0.55);
    coreHalo.position.copy(core.position);
    api.add(coreHalo);

    // Screens: a monitor, a tablet and a phone, each with a few lit interface bars.
    const device = (w: number, h: number, x: number, z: number, ry: number, bars: [number, number, number][]) => {
      const g = new THREE.Group();
      g.add(edged(box(w, h, 0.05), screenMat));
      bars.forEach(([bx, by, bw], k) => {
        const b = new THREE.Mesh(box(bw, 0.05, 0.012), k === 0 ? glow : gold);
        b.position.set(bx, by, 0.032);
        g.add(b);
      });
      g.position.set(x, h / 2 + 0.1, z);
      g.rotation.set(-0.16, ry, 0);
      ui.add(g);
      return g;
    };
    device(1.5, 0.92, -0.55, -0.2, 0.18, [[-0.32, 0.28, 0.66], [-0.4, 0.12, 0.5], [0.3, 0.12, 0.6], [-0.2, -0.06, 0.9], [-0.35, -0.24, 0.6]]);
    device(0.8, 0.56, 0.92, -0.1, -0.3, [[-0.12, 0.14, 0.4], [0, 0, 0.64], [-0.1, -0.14, 0.44]]);
    device(0.36, 0.7, 0.95, 0.72, -0.42, [[0, 0.2, 0.22], [0, 0.06, 0.26], [0, -0.08, 0.26], [0, -0.22, 0.16]]);

    // Requests: points of light dropping through the stack and replies rising back.
    const LANES = 16, MAX = 70, TRAIL = 10, N = MAX * TRAIL;
    const lanes = Array.from({ length: LANES }, (_, i) => ({ x: ((i * 0.618) % 1 - 0.5) * (PW - 0.5), z: ((i * 0.381) % 1 - 0.5) * (PD - 0.4) }));
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
    type Pk = { lane: number; t: number; v: number; dir: number; alive: boolean };
    const packets: Pk[] = Array.from({ length: MAX }, () => ({ lane: 0, t: 0, v: 0, dir: 1, alive: false }));

    // Light under the stack, and dust in the air.
    const floor = halo(9, 0.42);
    floor.position.set(0, -0.6, 0);
    world.add(floor);
    const DUST = 420;
    const dPos = new Float32Array(DUST * 3), dSize = new Float32Array(DUST), dAlpha = new Float32Array(DUST), dCol = new Float32Array(DUST * 3);
    for (let i = 0; i < DUST; i++) {
      dPos[i * 3] = (Math.random() - 0.5) * 16;
      dPos[i * 3 + 1] = Math.random() * 8 - 1;
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

    // Sizing, with the stack nudged right on wide screens so the name has room.
    let W = 0, H = 0;
    const resize = () => {
      const r = el.getBoundingClientRect();
      W = Math.max(1, r.width); H = Math.max(1, r.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(W, H, false);
      pm.uniforms.uPixelRatio.value = dpr;
      camera.aspect = W / H;
      // Wide: the stack sits to the right of the name. Narrow and tablet: it is pulled back and
      // lifted so it stays above the name instead of behind the text.
      const wide = W / H > 1.15;
      if (wide) camera.setViewOffset(W, H, -W * 0.25, 0, W, H);
      else camera.setViewOffset(W, H, 0, H * 0.1, W, H);
      camera.fov = wide ? 30 : Math.min(62, 44 + Math.max(0, W / H - 0.75) * 40);
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // Pointer parallax, scroll, and the assembly when the preloader opens.
    const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    let scroll = 0;
    let flyStart = -1;
    const startFly = () => { if (flyStart < 0) flyStart = performance.now(); };
    if (document.documentElement.classList.contains("is-ready")) startFly();
    window.addEventListener("mo:ready", startFly);
    const ease = (x: number) => 1 - Math.pow(1 - x, 4);
    const onScroll = () => { scroll = Math.min(1, window.scrollY / Math.max(1, H)); };
    window.addEventListener("scroll", onScroll, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !reduce) loop(); });
    io.observe(el);

    const tmp = new THREE.Vector3();
    let raf = 0, last = performance.now(), spawn = 0, time = 0, running = false, announced = false;
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      time += dt;

      cur.x += (target.x - cur.x) * 0.04;
      cur.y += (target.y - cur.y) * 0.04;
      const fly = reduce ? 1 : flyStart < 0 ? 0 : ease(Math.min(1, (now - flyStart) / 2800));
      const away = 1 - fly;

      // The layers arrive from above one after another, then open up as the page scrolls.
      const gap = 1.08 + scroll * 0.75;
      layers.forEach((g, i) => {
        const late = Math.max(0, Math.min(1, away * 1.6 - (layers.length - 1 - i) * 0.2));
        g.position.y = i * gap + late * (7 + i * 2) + Math.sin(time * 0.8 + i * 1.3) * 0.035;
        g.rotation.y = late * (i % 2 ? 1.2 : -1.2);
      });
      const top = (layers.length - 1) * gap;
      world.rotation.y = -0.2 + Math.sin(time * 0.18) * 0.22 + cur.x * 0.28 + scroll * 0.9;
      world.rotation.x = cur.y * 0.06;
      look.y = top / 2 + 0.35;
      camera.position.set(camBase.x + cur.x * 0.5, camBase.y - cur.y * 0.6 + scroll * 1.2, camBase.z + away * 4);
      camera.lookAt(look);

      // Moving parts
      jobs.forEach((m, i) => { m.position.x = (((i / jobs.length + time * 0.09) % 1) - 0.5) * (PW - 0.8); });
      rings[0].rotation.set(Math.PI / 2 + Math.sin(time * 0.7) * 0.5, time * 0.9, 0);
      rings[1].rotation.set(Math.PI / 2 + Math.cos(time * 0.6) * 0.5, -time * 0.7, 0);
      core.rotation.y = time * 1.1;
      core.position.y = 0.62 + Math.sin(time * 1.6) * 0.05;
      coreHalo.position.y = core.position.y;
      glow.emissiveIntensity = 0.75 + Math.sin(time * 2.2) * 0.25;
      services.forEach((m, i) => { m.scale.y = 1 + Math.max(0, Math.sin(time * 1.7 + i * 0.9)) * 0.5; m.position.y = 0.04 + 0.15 * m.scale.y; });

      spawn += dt * 14;
      while (spawn > 1) {
        spawn -= 1;
        const p = packets.find((x) => !x.alive);
        if (!p) break;
        p.alive = true; p.lane = Math.floor(Math.random() * LANES); p.t = 0;
        p.v = 0.35 + Math.random() * 0.35; p.dir = Math.random() > 0.3 ? 1 : -1;
      }
      for (let i = 0; i < MAX; i++) {
        const p = packets[i];
        if (p.alive) { p.t += p.v * dt; if (p.t >= 1) p.alive = false; }
        const ln = lanes[p.lane];
        for (let j = 0; j < TRAIL; j++) {
          const k = i * TRAIL + j;
          const tt = p.t - j * 0.014;
          if (!p.alive || tt < 0) { pAlpha[k] = 0; continue; }
          const u = p.dir === 1 ? 1 - tt : tt; // requests fall from the screens to the database
          pPos.set([ln.x, 0.1 + u * (top + 0.5), ln.z], k * 3);
          const f = 1 - j / TRAIL;
          pSize[k] = (j === 0 ? 5 : 3.2) * f;
          pAlpha[k] = (j === 0 ? 1 : 0.5) * f * fly;
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
        if (dPos[i * 3 + 1] > 7) dPos[i * 3 + 1] = -1;
      }
      dg.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      if (!announced) { announced = true; window.__moScene = true; window.dispatchEvent(new Event("mo:scene")); }

      const els = labels.current?.children;
      if (els) {
        const fade = String(Math.max(0, 1 - scroll * 1.6) * (fly > 0.92 ? 1 : 0));
        for (let i = 0; i < els.length; i++) {
          tmp.set(PW / 2, 0.05, PD / 2);
          layers[i].localToWorld(tmp);
          tmp.project(camera);
          const x = (tmp.x * 0.5 + 0.5) * W, y = (-tmp.y * 0.5 + 0.5) * H;
          const e = els[i] as HTMLElement;
          e.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
          e.style.opacity = fade;
        }
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
      // One still frame with a few requests in flight.
      for (let i = 0; i < 60; i++) frame(performance.now() + i * 50);
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mo:ready", startFly);
      document.removeEventListener("visibilitychange", onVis);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  if (fallback) return <NetworkCanvas />;
  return (
    <div ref={mount} className="scene" aria-hidden="true">
      <div ref={labels} className="scene-labels" dir="ltr">
        {LAYERS.map((n) => <div key={n} className="scene-label"><span>{n}</span></div>)}
      </div>
    </div>
  );
}
