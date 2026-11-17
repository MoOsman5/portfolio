export const site = {
  url: "https://mohamed-osman.com",
  name: "Mohamed Osman",
  role: "Senior Software Engineer",
  location: "Giza, Egypt",
  email: "imohamedosmann@gmail.com",
  phone: "+20 10 9590 2696",
  phoneHref: "tel:+201095902696",
  whatsapp: "https://wa.me/201095902696",
  linkedin: "https://www.linkedin.com/in/mohamed-osman-eg",
  github: "https://github.com/MoOsman5",
  leetcode: "https://leetcode.com/MoOsman_5/",
  cv: "/Mohamed-Osman-CV.pdf",
  description:
    "Mohamed Osman is a senior software engineer and tech lead in Giza, Egypt: backend-first, with full stack delivery. He designs systems that hold up under real load, leads the teams that build them, and ships whole products with NestJS, PostgreSQL, Redis and React. Built ABS Courier's logistics platform for 20M+ shipments a year.",
};

export const experience = [
  {
    company: "Alpha Tech",
    place: "Giza",
    roles: [
      {
        title: "Tech Lead (part-time)",
        from: "Nov 2026",
        to: "Present",
        points: [
          "Lead a team of seven and the delivery of two products. I own architecture, planning, code review and deployment, with Claude Code implementing and testing under that review.",
          "Delivered AWN, a business-services platform for a Saudi company, in two weeks: NestJS API with about 70 modules, React 19 admin dashboard and marketing website.",
          "Built POP, a real-time party app: a NestJS, Socket.IO and Redis backend that keeps every phone in the room on the server's clock, with a Flutter client.",
        ],
      },
    ],
  },
  {
    company: "ABS Courier",
    place: "Cairo",
    roles: [
      {
        title: "Principal Architect",
        from: "Aug 2026",
        to: "Oct 2026",
        points: [
          "Owned the architecture of the platform I designed and built, as it scaled past 20M+ shipments a year.",
          "Led its re-architecture into a multi-tenant SaaS for external courier companies: tenant isolation, data boundaries and API versioning.",
          "Set backend architecture standards across the team: decision records, review gates and zero-downtime migration practice.",
        ],
      },
      {
        title: "Backend Team Leader",
        from: "Nov 2024",
        to: "Aug 2026",
        points: [
          "Designed and built the company's logistics platform from scratch, replacing a purchased legacy system. It handles 20M+ shipments a year for 1,000+ staff and 20,000+ merchant and partner accounts, plus a public tracking site.",
          "Gathered requirements directly from operations, branch and fleet management, and turned them into system design.",
          "Led a team of five backend engineers: review standards, onboarding and mentoring.",
        ],
      },
      {
        title: "Full Stack Developer",
        from: "May 2024",
        to: "Nov 2024",
        points: [
          "Proposed NestJS and PostgreSQL as the foundation for a purpose-built replacement and owned the architecture decisions behind it.",
          "Took ownership of the backend within six months and moved into the team lead role.",
        ],
      },
    ],
  },
  {
    company: "Digital Egypt Cubs Initiative",
    place: "Giza",
    roles: [
      {
        title: "Instructor",
        from: "Jan 2024",
        to: "Sep 2026",
        points: ["Taught coding and robotics to young learners."],
      },
    ],
  },
  {
    company: "NasNav",
    place: "Al Rehab City",
    roles: [
      {
        title: "Software Developer",
        from: "Jun 2023",
        to: "May 2024",
        points: ["Built React web applications and cross-platform React Native apps on top of backend APIs."],
      },
    ],
  },
  {
    company: "Teqneia ICT",
    place: "El Sheikh Zayed",
    roles: [
      {
        title: "Software Developer",
        from: "Jun 2022",
        to: "Jun 2023",
        points: ["Built responsive React.js web applications for client projects."],
      },
    ],
  },
];

export const decisions = [
  {
    problem: "Shipment tables grew every single day.",
    answer: "Partitioned the high-volume tables by date, so query times stayed flat as the dataset kept growing.",
  },
  {
    problem: "Reporting was competing with live traffic on the primary.",
    answer: "Put PostgreSQL read replicas behind PgBouncer and routed lag-tolerant reads off the primary.",
  },
  {
    problem: "Bulk work was blocking requests.",
    answer: "Moved bulk ingest, WhatsApp notifications and tracking events onto Bull queues processed by a dedicated worker.",
  },
  {
    problem: "Responses were slower than the business needed.",
    answer: "Containerised the stack with Docker and added a Redis caching layer. Responses got about 3.7 times faster.",
  },
  {
    problem: "Schema changes had to land on tables that never stop.",
    answer: "Ran zero-downtime migrations on live, high-volume tables.",
  },
  {
    problem: "Partners needed to see their shipments.",
    answer: "Built the public shipment-tracking API and the partner-facing APIs, then started the re-architecture into a multi-tenant SaaS for other courier companies.",
  },
];

export type Cover = "pop" | "masroof";
export type Project = {
  name: string; href?: string; image?: string; width?: number; height?: number; cover?: Cover;
  summary: string; stack: string[]; status?: string;
};

// Work delivered at Alpha Tech. A project shows `image` when it has one, otherwise a drawn `cover`.
export const featured: (Project & { tagline: string; facts: string[] })[] = [
  {
    name: "AWN",
    tagline: "A business-services platform for a Saudi company.",
    href: "https://landing-awn.alphaa-tech.com/",
    image: "/images/awn.webp",
    width: 1400,
    height: 788,
    summary:
      "One system for the whole client lifecycle: website lead, quotation, contract, invoice, subscription, government-service requests and renewal reminders. Arabic and English, with a client self-service portal.",
    facts: [
      "API, admin dashboard and marketing website delivered in two weeks.",
      "About 70 backend modules and 8 built-in roles, with data scope (all, branch or own) enforced at the query level.",
      "OIDC SSO with PKCE, and rotating refresh tokens with reuse detection.",
      "Checked by a 40,936-case API permission matrix and Playwright end-to-end tests.",
    ],
    stack: ["NestJS", "TypeORM", "MySQL", "React 19", "Tailwind 4", "Three.js"],
  },
  {
    name: "POP",
    tagline: "A party app that turns every phone into part of the show.",
    cover: "pop",
    summary:
      "The DJ controls the screens, flashes and sounds of every phone in the room at the same instant, and can play one song in sync on all of them. Phones follow the server's clock, not their own.",
    facts: [
      "Each command is scheduled 350 ms ahead on server time, so every phone fires together.",
      "Shared songs: each phone checks its position and corrects itself when it drifts more than 140 ms.",
      "Voice rooms on LiveKit, and Socket.IO with a Redis adapter so more servers can join the same room.",
      "221 backend tests run before every deploy.",
    ],
    stack: ["NestJS", "Socket.IO", "Redis", "MySQL", "LiveKit", "Flutter"],
  },
];

export const projects: Project[] = [
  {
    name: "AKM E-Commerce",
    href: "https://akm-ecommerce-pnyk.vercel.app/",
    image: "/images/akm.webp",
    width: 1400,
    height: 646,
    summary:
      "A streetwear storefront with its own admin dashboard: JWT auth, Zustand state, sales reporting with Recharts, a Cloudinary image pipeline and strict DTO validation.",
    stack: ["Next.js", "NestJS", "MongoDB", "TypeScript"],
  },
  {
    name: "World of Control",
    href: "https://world-of-control.vercel.app/en",
    image: "/images/world-of-control.webp",
    width: 1400,
    height: 563,
    summary:
      "A bilingual store for automotive control systems and parts, mobile-first, with light and dark themes and full right-to-left Arabic support.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  },
  {
    name: "Mahsoom",
    href: "https://mahsoom.com/",
    image: "/images/mahsoom.webp",
    width: 1400,
    height: 796,
    status: "In progress",
    summary:
      "A multi-tenant SaaS for small merchants, built with a partner. Stock moves through an append-only ledger, and a concurrency test proves that when two buyers race for the last unit, exactly one wins.",
    stack: ["NestJS", "Drizzle", "PostgreSQL RLS", "BullMQ", "Next.js", "Expo"],
  },
  {
    name: "Masroof",
    href: "https://github.com/MoOsman5/masroof",
    cover: "masroof",
    status: "In progress",
    summary:
      "A multi-tenant expense API in ASP.NET Core and MongoDB, built to carry my NestJS experience over to .NET. Next: JWT auth with tenant context and LLM receipt extraction.",
    stack: ["ASP.NET Core", ".NET 10", "MongoDB", "Docker"],
  },
];

export const stack = [
  { group: "Backend", items: ["TypeScript", "Node.js", "NestJS", "Express", "REST", "GraphQL", "Event-driven design", "Multi-tenant architecture"] },
  { group: "Data", items: ["PostgreSQL", "Partitioning", "Replication", "Query tuning", "PgBouncer", "Redis", "Bull", "MySQL", "MongoDB"] },
  { group: "Infrastructure", items: ["Docker", "AWS (EC2, S3, RDS, Aurora)", "Nginx", "CI/CD", "OpenTelemetry", "Prometheus", "Loki"] },
  { group: "Frontend", items: ["React", "Next.js", "React Native", "Tailwind CSS", "TanStack Query", "Zustand"] },
  { group: "AI tooling", items: ["Claude Code", "Cursor", "GitHub Copilot", "Windsurf"] },
  { group: "Practice", items: ["Architecture Decision Records", "Zero-downtime migrations", "Code review", "Mentoring"] },
];

