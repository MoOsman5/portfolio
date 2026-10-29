export const site = {
  url: "https://mohamed-osman.com",
  name: "Mohamed Osman",
  role: "Senior Backend Engineer",
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
    "Mohamed Osman is a senior backend engineer in Giza, Egypt. He designed and built ABS Courier's logistics platform from scratch, now handling 20M+ shipments a year, with NestJS, PostgreSQL, Bull queues and Redis.",
};

export const experience = [
  {
    company: "ABS Courier",
    place: "Cairo",
    roles: [
      {
        title: "Backend Team Leader",
        from: "Nov 2024",
        to: "Oct 2026",
        points: [
          "Designed and built the company's logistics platform from scratch, replacing a purchased legacy system. It handles 20M+ shipments a year for 1,000+ users.",
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

export const projects: {
  name: string; href: string; image: string; width: number; height: number;
  summary: string; stack: string[]; status?: string;
}[] = [
  {
    name: "Mahsoom",
    href: "https://mahsoom.com/",
    image: "/images/mahsoom.webp",
    width: 1400,
    height: 669,
    status: "In development",
    summary:
      "A multi-tenant business platform for small businesses in Egypt and the wider region, Arabic first. One modular kernel carries several products: a site builder that publishes a merchant's site on their own domain, and a WhatsApp inbox where every order becomes a tracked lead.",
    stack: ["NestJS on Fastify", "PostgreSQL", "Drizzle", "Redis", "BullMQ", "Next.js", "Nx monorepo"],
  },
  {
    name: "Kabtenna",
    href: "https://kabtenna.com/",
    image: "/images/kabtenna.webp",
    width: 1400,
    height: 669,
    status: "Launching soon",
    summary:
      "Coaches and gyms in one app, across gym, football, swimming, padel and running. Gym owners run members, renewals and payments by cash, InstaPay or wallet with reminders on WhatsApp; trainees find a coach and train on a plan built for them. Built on the Mahsoom platform.",
    stack: ["React Native (Expo)", "NestJS", "PostgreSQL", "Redis", "Next.js"],
  },
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
];

export const stack = [
  { group: "Backend", items: ["TypeScript", "Node.js", "NestJS", "Express", "REST", "GraphQL", "Event-driven design", "Multi-tenant architecture"] },
  { group: "Data", items: ["PostgreSQL", "Partitioning", "Replication", "Query tuning", "PgBouncer", "Redis", "Bull", "MySQL", "MongoDB"] },
  { group: "Infrastructure", items: ["Docker", "AWS (EC2, S3, RDS, Aurora)", "Nginx", "CI/CD", "OpenTelemetry", "Prometheus", "Loki"] },
  { group: "Frontend", items: ["React", "Next.js", "React Native"] },
  { group: "Practice", items: ["Architecture Decision Records", "Zero-downtime migrations", "Code review", "Mentoring"] },
];
