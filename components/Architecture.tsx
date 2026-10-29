type N = { x: number; y: number; w: number; t: string; s: string; gold?: boolean };

const nodes: Record<string, N> = {
  clients: { x: 0, y: 150, w: 150, t: "Clients", s: "ops, branches, fleet, partners" },
  nginx: { x: 200, y: 150, w: 120, t: "Nginx", s: "reverse proxy" },
  api: { x: 370, y: 150, w: 150, t: "NestJS API", s: "TypeScript, Docker", gold: true },
  redis: { x: 370, y: 30, w: 150, t: "Redis", s: "cache layer" },
  pgb: { x: 580, y: 150, w: 140, t: "PgBouncer", s: "pooling, read routing" },
  primary: { x: 790, y: 80, w: 210, t: "PostgreSQL primary", s: "partitioned by date", gold: true },
  replicas: { x: 790, y: 210, w: 210, t: "Read replicas", s: "reporting reads" },
  bull: { x: 370, y: 280, w: 150, t: "Bull queues", s: "ingest, notifications" },
  worker: { x: 580, y: 280, w: 140, t: "Worker", s: "dedicated process" },
  out: { x: 790, y: 310, w: 210, t: "WhatsApp, tracking", s: "events to customers" },
};
const H = 56;

const edges: [string, string][] = [
  ["clients", "nginx"], ["nginx", "api"], ["api", "redis"], ["api", "pgb"],
  ["pgb", "primary"], ["pgb", "replicas"], ["api", "bull"], ["bull", "worker"], ["worker", "out"],
];

function path(a: N, b: N) {
  const ax = a.x + a.w, ay = a.y + H / 2;
  if (b.y + H <= a.y) return `M${a.x + a.w / 2} ${a.y} L${b.x + b.w / 2} ${b.y + H}`;
  if (b.y >= a.y + H && b.x === a.x) return `M${a.x + a.w / 2} ${a.y + H} L${b.x + b.w / 2} ${b.y}`;
  const bx = b.x, by = b.y + H / 2, mx = (ax + bx) / 2;
  return `M${ax} ${ay} C${mx} ${ay}, ${mx} ${by}, ${bx} ${by}`;
}

export default function Architecture() {
  return (
    <svg viewBox="-2 0 1006 380" role="img" aria-label="Platform architecture diagram">
      <g fill="none" stroke="#C8A96A" strokeOpacity="0.55" strokeWidth="1">
        {edges.map(([a, b]) => <path key={a + b} d={path(nodes[a], nodes[b])} />)}
      </g>
      {Object.entries(nodes).map(([k, n]) => (
        <g key={k}>
          <rect x={n.x} y={n.y} width={n.w} height={H} rx="3" fill="#000" stroke={n.gold ? "#C8A96A" : "#3A3733"} />
          <text x={n.x + 16} y={n.y + 24} fill="#EDE8DF" fontSize="15" fontFamily="'Hanken Grotesk', sans-serif" fontWeight="600">{n.t}</text>
          <text x={n.x + 16} y={n.y + 42} fill="#8B867D" fontSize="12" fontFamily="'Hanken Grotesk', sans-serif">{n.s}</text>
        </g>
      ))}
    </svg>
  );
}
