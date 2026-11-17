/**
 * The hero scene: a backend system drawn as light. Each node is a service, each route a call
 * between two services, and the packets are requests moving through it.
 * Nodes sit on a ground plane (x to the right, z toward the viewer); the first node is the hub.
 */
export type Node = { name: string; x: number; z: number; weight: number; hub?: boolean; label?: boolean };

export const nodes: Node[] = [
  { name: "API", x: -0.4, z: 0, weight: 1, hub: true, label: true },
  { name: "Web", x: -4.0, z: -1.5, weight: 0.18 },
  { name: "Clients", x: -4.2, z: 0.1, weight: 0.2, label: true },
  { name: "Partners", x: -3.9, z: 1.6, weight: 0.18 },
  { name: "Gateway", x: -2.3, z: 0, weight: 0.32 },
  { name: "Redis", x: -0.3, z: -2.2, weight: 0.5, label: true },
  { name: "PgBouncer", x: 1.3, z: -0.5, weight: 0.3 },
  { name: "PostgreSQL", x: 3.0, z: -1.3, weight: 0.85, label: true },
  { name: "Replica 1", x: 3.3, z: 0.5, weight: 0.38 },
  { name: "Replica 2", x: 4.0, z: -0.3, weight: 0.32 },
  { name: "Queues", x: 0.4, z: 2.1, weight: 0.55, label: true },
  { name: "Worker 1", x: 2.0, z: 2.6, weight: 0.32 },
  { name: "Worker 2", x: 2.3, z: 1.5, weight: 0.32 },
  { name: "Notifications", x: 3.8, z: 2.7, weight: 0.22 },
  { name: "Sockets", x: -2.0, z: 2.5, weight: 0.3 },
  { name: "Metrics", x: 1.1, z: -3.0, weight: 0.2 },
];

// Calls, written in the direction a request travels.
export const routes: [string, string][] = [
  ["Web", "Gateway"], ["Clients", "Gateway"], ["Partners", "Gateway"], ["Gateway", "API"],
  ["API", "Redis"], ["API", "PgBouncer"], ["PgBouncer", "PostgreSQL"], ["PgBouncer", "Replica 1"],
  ["PgBouncer", "Replica 2"], ["API", "Queues"], ["Queues", "Worker 1"], ["Queues", "Worker 2"],
  ["Worker 1", "Notifications"], ["Worker 2", "PostgreSQL"], ["API", "Sockets"], ["Sockets", "Clients"],
  ["API", "Metrics"], ["PostgreSQL", "Replica 2"],
];

// The path most requests take, drawn as a soft gold line.
export const spine = ["Clients", "Gateway", "API", "PgBouncer", "PostgreSQL"];

export const nodeIndex = (n: string) => nodes.findIndex((c) => c.name === n);
