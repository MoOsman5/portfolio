"use client";

import { useEffect, useRef, useState } from "react";

type Step = { time: string; place: string; title: string; body: string; log: string[]; station: number };

// A simplified walk through one shipment. Each step is something the platform actually does.
const steps: Step[] = [
  {
    time: "09:12", place: "Alexandria", station: 0,
    title: "A customer books a shipment.",
    body: "The request comes in through Nginx and lands on the NestJS API, where it is validated before anything is written.",
    log: ["POST /shipments", "validate CreateShipmentDto", "201 Created"],
  },
  {
    time: "09:12", place: "Alexandria", station: 0,
    title: "It is written to this month's partition.",
    body: "The shipments table is partitioned by date, so the write touches one small partition and queries stay flat no matter how big the history gets.",
    log: ["INSERT INTO shipments", "→ partition shipments_2026_10"],
  },
  {
    time: "09:13", place: "Alexandria", station: 0,
    title: "The customer gets a WhatsApp message.",
    body: "The API doesn't wait for it. A job goes onto a Bull queue and a dedicated worker sends the notification in the background.",
    log: ["queue.add('notifications')", "worker: whatsapp.sent"],
  },
  {
    time: "14:40", place: "Cairo hub", station: 1,
    title: "It is scanned at the Cairo hub.",
    body: "The scan becomes a tracking event. Redis holds the latest status, so the public tracking page and partner APIs answer without touching the database.",
    log: ["event: shipment.scanned", "SET cache tracking:latest", "GET /track (public API)"],
  },
  {
    time: "Next day, 11:05", place: "Aswan", station: 3,
    title: "Delivered in Aswan, over a thousand kilometres south.",
    body: "The final status flows the same way: one event, one queue, one cache update, and the customer and the partner both know within seconds.",
    log: ["event: shipment.delivered", "worker: whatsapp.sent"],
  },
  {
    time: "18:00", place: "Head office", station: 3,
    title: "It shows up in tonight's report.",
    body: "Reporting reads go through PgBouncer to a read replica, so the people running the business never slow down the people moving the boxes.",
    log: ["PgBouncer → replica-1", "SELECT … daily_report"],
  },
];

// Route stations on the little map (viewBox 0 0 320 520): Alexandria, Cairo, Asyut, Aswan.
const stations = [
  { name: "Alexandria", x: 92, y: 52 },
  { name: "Cairo", x: 150, y: 118 },
  { name: "Asyut", x: 168, y: 300 },
  { name: "Aswan", x: 232, y: 468 },
];
const ROUTE = "M92 52 C 118 78, 132 98, 150 118 S 150 220, 168 300 S 212 410, 232 468";
// Which station the parcel is at during each step; it travels in the last part of a step.
const atStation = [0, 0, 0, 1, 3, 3];

export default function Story() {
  const section = useRef<HTMLElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const [p, setP] = useState(0);
  const [len, setLen] = useState(1000);
  const [stationT, setStationT] = useState([0, 0.2, 0.55, 1]);

  useEffect(() => {
    const path = routeRef.current;
    if (path) {
      const L = path.getTotalLength();
      setLen(L);
      // Find each station's position along the route.
      setStationT(stations.map((st) => {
        let best = 0, bestD = Infinity;
        for (let k = 0; k <= 400; k++) {
          const pt = path.getPointAtLength((k / 400) * L);
          const d = (pt.x - st.x) ** 2 + (pt.y - st.y) ** 2;
          if (d < bestD) { bestD = d; best = k / 400; }
        }
        return best;
      }));
    }
    const onScroll = () => {
      const el = section.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      setP(Math.min(1, Math.max(0, -r.top / Math.max(1, total))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  const n = steps.length;
  const f = Math.min(n - 0.0001, p * n * 1.08); // finish a little early so the last step rests
  const active = Math.min(n - 1, Math.floor(f));
  const local = Math.min(1, f - active);
  const move = Math.max(0, (local - 0.55) / 0.45);
  const ease = move < 0.5 ? 2 * move * move : 1 - Math.pow(-2 * move + 2, 2) / 2;
  const from = stationT[atStation[active]];
  const to = stationT[atStation[Math.min(n - 1, active + 1)]];
  const routeT = from + (to - from) * ease;
  const point = routeRef.current ? routeRef.current.getPointAtLength(routeT * len) : { x: stations[0].x, y: stations[0].y };
  const reached = (i: number) => routeT >= stationT[i] - 0.004;

  return (
    <section ref={section} className="story" id="story" aria-labelledby="story-title" style={{ ["--steps" as string]: n }}>
      <div className="story-pin">
        <div className="story-head">
          <h2 id="story-title" className="h2" data-reveal="mask">Follow one shipment.</h2>
          <p className="story-sub">A simplified day in the platform I built, one package at a time.</p>
        </div>

        <div className="story-grid">
          <ol className="story-steps">
            {steps.map((s, i) => (
              <li key={i} className={`story-step ${i === active ? "is-active" : i < active ? "is-past" : ""}`} aria-current={i === active ? "step" : undefined}>
                <p className="story-when"><span>{s.time}</span><span>{s.place}</span></p>
                <h3 className="story-title">{s.title}</h3>
                <p className="story-body">{s.body}</p>
                <pre className="story-log" aria-label="What the system logs">{s.log.map((l, k) => <span key={k} style={{ ["--k" as string]: k }}>{l}</span>)}</pre>
              </li>
            ))}
          </ol>

          <div className="story-map" aria-hidden="true">
            <svg viewBox="0 0 320 520">
              <defs>
                <radialGradient id="pkGlow"><stop offset="0" stopColor="#E8D4A8" stopOpacity="0.9" /><stop offset="1" stopColor="#E8D4A8" stopOpacity="0" /></radialGradient>
              </defs>
              <path d="M40 30 C 120 10, 220 20, 290 40 M60 30 C 110 90, 120 200, 150 300 S 230 440, 250 510" className="story-coast" />
              <path ref={routeRef} d={ROUTE} className="story-route-bg" />
              <path d={ROUTE} className="story-route" style={{ strokeDasharray: len, strokeDashoffset: len * (1 - routeT) }} />
              {stations.map((s, i) => (
                <g key={s.name} className={`story-station ${reached(i) ? "on" : ""}`}>
                  <circle cx={s.x} cy={s.y} r="5" />
                  <circle cx={s.x} cy={s.y} r="12" className="story-station-ring" />
                  <text x={s.x + (i === 0 ? -14 : 18)} y={s.y + 4} textAnchor={i === 0 ? "end" : "start"}>{s.name}</text>
                </g>
              ))}
              <g transform={`translate(${point.x} ${point.y})`} className="story-parcel">
                <circle r="26" fill="url(#pkGlow)" />
                <rect x="-7" y="-7" width="14" height="14" rx="2" transform={`rotate(${routeT * 360})`} />
              </g>
            </svg>
            <p className="story-count"><span>{String(active + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}</p>
          </div>
        </div>

        <div className="story-bar"><span style={{ transform: `scaleX(${p})` }} /></div>
        <p className={`story-coda ${p > 0.96 ? "on" : ""}`}>Now do that twenty million times a year.</p>
      </div>
    </section>
  );
}
