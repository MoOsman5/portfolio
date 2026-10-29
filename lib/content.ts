import { experience as expEn, decisions as decEn, visibleProjects as projEn, stack as stackEn } from "./site";

export type Lang = "en" | "ar";

const en = {
  dir: "ltr" as "ltr" | "rtl",
  nav: { work: "Work", experience: "Experience", projects: "Projects", writing: "Writing", contact: "Contact", cv: "Download CV", home: "Mohamed Osman, back to top", sections: "Sections" },
  toggle: { theme: "Switch light and dark theme", lang: "العربية", langLabel: "Read this page in Arabic", langHref: "/ar" },
  hero: {
    name: "Mohamed Osman",
    lede: "Senior backend engineer in Giza. I designed and built a logistics platform that moves twenty million shipments a year across Egypt for more than fifty thousand people, led the team of five behind it, and went on to own its architecture.",
    email: "Email me", cv: "Download CV", scroll: "Scroll to work",
  },
  counter: "shipments the platform I built would have moved since you opened this page",
  work: {
    title: "A platform built from nothing, for twenty million shipments a year.",
    intro: "ABS Courier was running on a purchased system that didn't fit how the business worked. I joined in 2024, proposed NestJS and PostgreSQL as the foundation for a replacement, and took it from requirements gathered with operations, branches and the fleet to the system the company runs on today. More than fifty thousand people use it: over a thousand staff, five thousand business customers, and the consignees tracking their deliveries.",
    figures: ["Shipments a year", "Users: staff, customers, consignees", "Faster responses with Redis", "Backend engineers led"],
    caption: "How a request moves through the platform: Nginx in front of the NestJS API, Redis for hot reads, PgBouncer routing writes to a date-partitioned primary and reporting to replicas, and Bull queues feeding a dedicated worker.",
    decisionsTitle: "The decisions behind it",
  },
  decisions: decEn,
  expTitle: "Four years, from interfaces to infrastructure.",
  experience: expEn.map((j) => ({ ...j, place: `${j.place}, Egypt` })),
  datesJoin: "to",
  projects: {
    title: "Selected projects.",
    intro: "Products I build end to end, from the platform underneath to the screen people tap.",
    visit: "Visit", open: "Open", inNewTab: "in a new tab", homePage: "home page",
    items: projEn,
  },
  about: {
    title: "The person behind the queues.",
    p1: "I like the unglamorous parts of software: the index that keeps a query flat at year three, the migration that ships without anyone noticing, the review comment that saves a teammate a week. I'm studying computer science at Cairo University, competed in the Egyptian Collegiate Programming Contest in 2022, and spent almost three years teaching coding and robotics to kids with the Digital Egypt Cubs Initiative.",
    p2: "I work in Arabic and English, and I still ship React, Next.js and React Native when a product needs it.",
    portrait: "Portrait of Mohamed Osman",
    stack: stackEn,
  },
  writing: { title: "Notes from production.", intro: "Short pieces on PostgreSQL, NestJS and running a platform at scale, in English and Arabic.", all: "All writing" },
  contact: { title: "Building something that has to keep up?", email: "Email", whatsapp: "WhatsApp", cv: "Download CV" },
  footer: { top: "Back to top" },
  story: {
    title: "Follow one shipment.",
    sub: "A simplified day in the platform I built, one package at a time.",
    coda: "Now do that twenty million times a year.",
    logLabel: "What the system logs",
    stations: ["Alexandria", "Cairo", "Asyut", "Aswan"],
    steps: [
      { time: "09:12", place: "Alexandria", title: "A customer books a shipment.", body: "The request comes in through Nginx and lands on the NestJS API, where it is validated before anything is written." },
      { time: "09:12", place: "Alexandria", title: "It is written to this month's partition.", body: "The shipments table is partitioned by date, so the write touches one small partition and queries stay flat no matter how big the history gets." },
      { time: "09:13", place: "Alexandria", title: "The customer gets a WhatsApp message.", body: "The API doesn't wait for it. A job goes onto a Bull queue and a dedicated worker sends the notification in the background." },
      { time: "14:40", place: "Cairo hub", title: "It is scanned at the Cairo hub.", body: "The scan becomes a tracking event. Redis holds the latest status, so the public tracking page and partner APIs answer without touching the database." },
      { time: "Next day, 11:05", place: "Aswan", title: "Delivered in Aswan, over a thousand kilometres south.", body: "The final status flows the same way: one event, one queue, one cache update, and the customer and the partner both know within seconds." },
      { time: "18:00", place: "Head office", title: "It shows up in tonight's report.", body: "Reporting reads go through PgBouncer to a read replica, so the people running the business never slow down the people moving the boxes." },
    ],
  },
  loader: ["Booting the platform", "Warming the Redis cache", "Opening this month's partition", "Routing reads to replicas", "Draining the Bull queue", "Dispatching to 23 cities", "All shipments on the road"],
  numberLocale: "en-US",
};

type Content = typeof en;

const ar: Content = {
  dir: "rtl",
  nav: { work: "الأعمال", experience: "الخبرة", projects: "المشاريع", writing: "المقالات", contact: "تواصل", cv: "تحميل السيرة الذاتية", home: "محمد عثمان، العودة للأعلى", sections: "الأقسام" },
  toggle: { theme: "التبديل بين الوضع الفاتح والداكن", lang: "English", langLabel: "Read this page in English", langHref: "/" },
  hero: {
    name: "محمد عثمان",
    lede: "مهندس باك إند أول من الجيزة. صممت وبنيت منصة لوجستية تنقل عشرين مليون شحنة سنويًا في أنحاء مصر لأكثر من خمسين ألف مستخدم، وقدت فريق المهندسين الخمسة الذي بناها، ثم توليت معماريتها.",
    email: "راسلني", cv: "تحميل السيرة الذاتية", scroll: "انتقل إلى الأعمال",
  },
  counter: "شحنة كانت المنصة التي بنيتها ستنقلها منذ أن فتحت هذه الصفحة",
  work: {
    title: "منصة بُنيت من الصفر لعشرين مليون شحنة سنويًا.",
    intro: "كانت ABS Courier تعمل على نظام جاهز لا يناسب طريقة عملها. انضممت إلى الشركة في 2024، واقترحت NestJS وPostgreSQL أساسًا لنظام بديل، وقدته من متطلبات جمعتها مع فرق التشغيل والفروع والأسطول حتى أصبح النظام الذي تعمل عليه الشركة اليوم. يستخدمه أكثر من خمسين ألف شخص: أكثر من ألف موظف، وخمسة آلاف عميل من الشركات، والمستلمون الذين يتابعون شحناتهم.",
    figures: ["شحنة سنويًا", "مستخدم: موظفون وعملاء ومستلمون", "استجابة أسرع مع Redis", "مهندسي باك إند قدتهم"],
    caption: "مسار الطلب داخل المنصة: Nginx أمام NestJS API، وRedis للقراءات المتكررة، وPgBouncer يوجّه الكتابة إلى قاعدة البيانات الأساسية المقسمة بالتاريخ والتقارير إلى نسخ القراءة، وطوابير Bull تغذي عاملًا مخصصًا.",
    decisionsTitle: "القرارات وراء المنصة",
  },
  decisions: [
    { problem: "جداول الشحنات تكبر كل يوم.", answer: "قسّمت الجداول الكبيرة حسب التاريخ (partitioning)، فبقيت أوقات الاستعلام ثابتة مع استمرار نمو البيانات." },
    { problem: "التقارير كانت تنافس العمل اللحظي على قاعدة البيانات الأساسية.", answer: "أضفت نسخ قراءة (read replicas) خلف PgBouncer، ووجّهت القراءات التي تحتمل تأخيرًا بسيطًا بعيدًا عن الأساسية." },
    { problem: "المهام الكبيرة كانت تعطّل الطلبات.", answer: "نقلت الإدخال الجماعي ورسائل واتساب وأحداث التتبع إلى طوابير Bull يعالجها عامل مخصص." },
    { problem: "الاستجابة كانت أبطأ مما يحتاجه العمل.", answer: "شغّلت النظام على Docker وأضفت طبقة تخزين مؤقت بـRedis، فأصبحت الاستجابة أسرع بنحو 3.7 مرة." },
    { problem: "تعديلات المخطط يجب أن تتم على جداول لا تتوقف.", answer: "نفّذت ترحيلات بدون أي توقف على جداول حية عالية الحمل." },
    { problem: "الشركاء يحتاجون إلى متابعة شحناتهم.", answer: "بنيت واجهة تتبع الشحنات العامة وواجهات الشركاء، ثم بدأت إعادة بناء المنصة كخدمة SaaS متعددة المستأجرين لشركات شحن أخرى." },
  ],
  expTitle: "أربع سنوات، من الواجهات إلى البنية التحتية.",
  experience: [
    {
      company: "ABS Courier", place: "القاهرة، مصر",
      roles: [
        { title: "Principal Architect", from: "أغسطس 2026", to: "أكتوبر 2026", points: [
          "توليت معمارية المنصة التي صممتها وبنيتها مع تجاوزها 20 مليون شحنة سنويًا.",
          "قدت إعادة بنائها كخدمة SaaS متعددة المستأجرين لشركات شحن أخرى: عزل المستأجرين، وحدود البيانات، وإصدارات الواجهات.",
          "وضعت معايير معمارية الباك إند للفريق: سجلات القرارات، وبوابات المراجعة، وممارسات الترحيل بدون توقف.",
        ] },
        { title: "Backend Team Leader", from: "نوفمبر 2024", to: "أغسطس 2026", points: [
          "صممت وبنيت المنصة اللوجستية للشركة من الصفر بديلًا لنظام قديم جاهز. تتعامل مع أكثر من 20 مليون شحنة سنويًا لأكثر من 50 ألف مستخدم: أكثر من ألف موظف، وأكثر من خمسة آلاف عميل من الشركات، والمستلمون الذين يتابعون شحناتهم.",
          "جمعت المتطلبات مباشرة من فرق التشغيل والفروع والأسطول وحولتها إلى تصميم للنظام.",
          "قدت فريقًا من خمسة مهندسي باك إند: معايير المراجعة، وتأهيل الأعضاء الجدد، والتوجيه.",
        ] },
        { title: "Full Stack Developer", from: "مايو 2024", to: "نوفمبر 2024", points: [
          "اقترحت NestJS وPostgreSQL أساسًا لنظام بديل مصمم خصيصًا، وتوليت القرارات المعمارية وراءه.",
          "توليت مسؤولية الباك إند كاملًا خلال ستة أشهر وانتقلت إلى دور قائد الفريق.",
        ] },
      ],
    },
    { company: "Digital Egypt Cubs Initiative", place: "الجيزة، مصر", roles: [{ title: "مدرب", from: "يناير 2024", to: "سبتمبر 2026", points: ["علّمت البرمجة والروبوتات للأطفال والناشئين."] }] },
    { company: "NasNav", place: "مدينة الرحاب، مصر", roles: [{ title: "مطور برمجيات", from: "يونيو 2023", to: "مايو 2024", points: ["بنيت تطبيقات ويب بـReact وتطبيقات جوال بـReact Native فوق واجهات الباك إند."] }] },
    { company: "Teqneia ICT", place: "الشيخ زايد، مصر", roles: [{ title: "مطور برمجيات", from: "يونيو 2022", to: "يونيو 2023", points: ["بنيت تطبيقات ويب متجاوبة بـReact.js لمشاريع العملاء."] }] },
  ],
  datesJoin: "إلى",
  projects: {
    title: "مشاريع مختارة.",
    intro: "منتجات أبنيها من البداية إلى النهاية، من المنصة في الأسفل حتى الشاشة التي يلمسها الناس.",
    visit: "زيارة", open: "فتح", inNewTab: "في تبويب جديد", homePage: "الصفحة الرئيسية",
    items: projEn.map((p) => ({
      ...p,
      summary: p.name === "AKM E-Commerce"
        ? "متجر ملابس بلوحة تحكم خاصة: مصادقة بـJWT، وإدارة الحالة بـZustand، وتقارير مبيعات بـRecharts، ومعالجة الصور بـCloudinary، وتحقق صارم من البيانات."
        : p.name === "World of Control"
        ? "متجر ثنائي اللغة لأنظمة التحكم وقطع غيار السيارات، مصمم للجوال أولًا، بوضعين فاتح وداكن ودعم كامل للعربية من اليمين إلى اليسار."
        : p.summary,
    })),
  },
  about: {
    title: "الشخص وراء الطوابير.",
    p1: "أحب الأجزاء التي لا يراها أحد في البرمجيات: الفهرس الذي يُبقي الاستعلام سريعًا في السنة الثالثة، والترحيل الذي ينزل دون أن يلاحظه أحد، وتعليق المراجعة الذي يوفر على زميل أسبوعًا. أدرس علوم الحاسب في جامعة القاهرة، وشاركت في المسابقة المصرية الجامعية للبرمجة (ECPC) عام 2022، وقضيت قرابة ثلاث سنوات أعلّم البرمجة والروبوتات للأطفال مع مبادرة أشبال مصر الرقمية.",
    p2: "أعمل بالعربية والإنجليزية، وما زلت أبني بـReact وNext.js وReact Native عندما يحتاج المنتج ذلك.",
    portrait: "صورة محمد عثمان",
    stack: [
      { group: "الباك إند", items: stackEn[0].items },
      { group: "البيانات", items: stackEn[1].items },
      { group: "البنية التحتية", items: stackEn[2].items },
      { group: "الفرونت إند", items: stackEn[3].items },
      { group: "الممارسات", items: ["سجلات القرارات المعمارية", "ترحيلات بدون توقف", "مراجعة الكود", "التوجيه"] },
    ],
  },
  writing: { title: "ملاحظات من بيئة الإنتاج.", intro: "مقالات قصيرة عن PostgreSQL وNestJS وتشغيل منصة على نطاق واسع، بالعربية والإنجليزية.", all: "كل المقالات" },
  contact: { title: "تبني شيئًا يجب أن يتحمل الضغط؟", email: "إيميل", whatsapp: "واتساب", cv: "تحميل السيرة الذاتية" },
  footer: { top: "العودة للأعلى" },
  story: {
    title: "تابع شحنة واحدة.",
    sub: "يوم مبسّط داخل المنصة التي بنيتها، شحنة واحدة في كل مرة.",
    coda: "والآن كرر ذلك عشرين مليون مرة في السنة.",
    logLabel: "ما يسجله النظام",
    stations: ["الإسكندرية", "القاهرة", "أسيوط", "أسوان"],
    steps: [
      { time: "09:12", place: "الإسكندرية", title: "عميل يحجز شحنة.", body: "يدخل الطلب عبر Nginx ويصل إلى NestJS API، حيث يتم التحقق منه قبل كتابة أي شيء." },
      { time: "09:12", place: "الإسكندرية", title: "تُكتب في قسم هذا الشهر.", body: "جدول الشحنات مقسّم حسب التاريخ، فالكتابة تلمس قسمًا صغيرًا واحدًا، وتبقى الاستعلامات ثابتة مهما كبر السجل." },
      { time: "09:13", place: "الإسكندرية", title: "تصل العميل رسالة واتساب.", body: "الواجهة لا تنتظر. تذهب مهمة إلى طابور Bull، ويرسل عامل مخصص الإشعار في الخلفية." },
      { time: "14:40", place: "مركز القاهرة", title: "تُمسح في مركز القاهرة.", body: "يتحول المسح إلى حدث تتبع. يحتفظ Redis بآخر حالة، فتجيب صفحة التتبع العامة وواجهات الشركاء دون لمس قاعدة البيانات." },
      { time: "اليوم التالي، 11:05", place: "أسوان", title: "تُسلَّم في أسوان، على بعد أكثر من ألف كيلومتر جنوبًا.", body: "تمر الحالة النهائية بالطريقة نفسها: حدث واحد، وطابور واحد، وتحديث واحد للتخزين المؤقت، فيعرف العميل والشريك خلال ثوانٍ." },
      { time: "18:00", place: "المقر الرئيسي", title: "تظهر في تقرير الليلة.", body: "تمر قراءات التقارير عبر PgBouncer إلى نسخة قراءة، فلا يبطئ من يديرون العمل أبدًا من يحركون الشحنات." },
    ],
  },
  loader: ["تشغيل المنصة", "تسخين كاش Redis", "فتح partition الشهر", "توجيه القراءات للنسخ", "تفريغ طابور Bull", "التوزيع على 23 مدينة", "كل الشحنات على الطريق"],
  numberLocale: "ar-EG",
};

export const content: Record<Lang, Content> = { en, ar };
export type { Content };
