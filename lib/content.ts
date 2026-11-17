import { experience as expEn, decisions as decEn, projects as projEn, featured as featEn, stack as stackEn } from "./site";

export type Lang = "en" | "ar";

const en = {
  dir: "ltr" as "ltr" | "rtl",
  nav: { work: "Work", now: "Alpha Tech", experience: "Experience", projects: "Projects", writing: "Writing", contact: "Contact", cv: "Download CV", home: "Mohamed Osman, back to top", sections: "Sections" },
  toggle: { theme: "Switch light and dark theme", lang: "العربية", langLabel: "Read this page in Arabic", langHref: "/ar" },
  hero: {
    name: "Mohamed Osman",
    lede: "Senior software engineer and tech lead in Giza, backend-first. I design systems that hold up under real load, lead the teams that build them, and ship the whole product, from the database to the screen.",
    email: "Email me", cv: "Download CV", scroll: "Scroll to what I do",
  },
  facts: [
    { value: "4+", label: "years building production systems" },
    { value: "2", label: "teams led, of five and seven" },
    { value: "20M+", label: "shipments a year on a platform I designed" },
  ],
  work: {
    title: "A platform built from nothing, for twenty million shipments a year.",
    intro: "ABS Courier was running on a purchased system that didn't fit how the business worked. I joined in 2024, proposed NestJS and PostgreSQL as the foundation for a replacement, and took it from requirements gathered with operations, branches and the fleet to the system the company runs on. More than a thousand staff work in it every day, and over twenty thousand merchant and partner accounts ship through it.",
    figures: ["Shipments a year", "Merchant and partner accounts", "Faster responses with Redis", "Backend engineers led"],
    caption: "How a request moves through the platform: Nginx in front of the NestJS API, Redis for hot reads, PgBouncer routing writes to a date-partitioned primary and reporting to replicas, and Bull queues feeding a dedicated worker.",
    decisionsTitle: "The decisions behind it",
  },
  decisions: decEn,
  now: {
    title: "Now leading a team of seven at Alpha Tech.",
    intro: "Since November 2026 I have been Tech Lead (part-time) at Alpha Tech. I plan the architecture, review every change and own deployment, with Claude Code implementing and testing under that review. Two products so far.",
    items: featEn,
    visit: "Visit the website",
    illustration: "Illustration of how it works, not a screenshot",
  },
  expTitle: "Four years, from interfaces to infrastructure.",
  experience: expEn.map((j) => ({ ...j, place: `${j.place}, Egypt` })),
  datesJoin: "to",
  projects: {
    title: "Selected projects.",
    intro: "Products I build end to end, from the platform underneath to the screen people tap.",
    visit: "Visit", code: "View the code", open: "Open", inNewTab: "in a new tab", homePage: "home page",
    items: projEn,
  },
  about: {
    title: "The person behind the queues.",
    p1: "I like the unglamorous parts of software: the index that keeps a query flat at year three, the migration that ships without anyone noticing, the review comment that saves a teammate a week. I'm studying computer science at Cairo University, competed in the Egyptian Collegiate Programming Contest in 2022, and spent almost three years teaching coding and robotics to kids with the Digital Egypt Cubs Initiative.",
    p2: "I work in Arabic and English, and I still ship React, Next.js and React Native when a product needs it. Day to day I build with Claude Code and Cursor, and nothing they write ships until a test proves it.",
    portrait: "Portrait of Mohamed Osman",
    stack: stackEn,
  },
  writing: { title: "Notes from production.", intro: "Short pieces on PostgreSQL, NestJS and running a platform at scale, in English and Arabic.", all: "All writing" },
  contact: { title: "Building something that has to keep up?", email: "Email", whatsapp: "WhatsApp", cv: "Download CV" },
  footer: { top: "Back to top" },
  story: {
    title: "What I bring to a team.",
    sub: "Six things I do well, each with the work that proves it.",
    coda: "Now see the work behind each one.",
    logLabel: "The evidence",
    stations: ["Scale", "Diagnosis", "Leadership", "Real time", "Trust", "Speed"],
    steps: [
      { time: "ABS Courier", place: "20M+ shipments a year", title: "I design systems that stay fast as they grow.", body: "I built ABS Courier's logistics platform from scratch: tables partitioned by date, reads routed to replicas, heavy work moved onto queues. The data keeps growing and the queries stay flat." },
      { time: "ABS Courier", place: "Timeouts to under 100 ms", title: "I find the real cause, not the nearest patch.", body: "Filters were timing out. EXPLAIN showed sequential scans across every partition because the statistics were stale. I ran ANALYZE, scheduled it nightly, and the same filters answered in under 100 ms." },
      { time: "ABS Courier, Alpha Tech", place: "Teams of 5 and 7", title: "I lead the people who build it.", body: "I sit with operations to turn how they really work into a design, break it into tasks, review every pull request, and write the decisions down so the next engineer knows why." },
      { time: "POP", place: "Every phone within 350 ms", title: "I make a room full of phones act at the same instant.", body: "In POP a DJ controls every phone at a party. Each command is scheduled on the server's clock, so screens, flashes and music fire together, and a phone that drifts corrects itself." },
      { time: "AWN", place: "40,936 permission checks", title: "I build business systems you can trust with your data.", body: "AWN runs a Saudi company's whole client lifecycle. Each role sees only its own scope, enforced in the query itself, with SSO and rotating tokens, and a test matrix that checks every role against every endpoint." },
      { time: "AWN, Mahsoom", place: "A full platform in two weeks", title: "I ship fast with AI, and prove it with tests.", body: "I plan the architecture and review every change; Claude Code implements and tests. That is how AWN's API, dashboard and website shipped in two weeks, and why nothing counts as done until a test passes." },
    ],
  },
  loader: ["Reading the requirements", "Designing the schema", "Writing the tests first", "Reviewing every diff", "Migrating with zero downtime", "Deploying", "Ready to work"],
  numberLocale: "en-US",
};

type Content = typeof en;

const featAr: Record<string, { tagline: string; summary: string; facts: string[] }> = {
  AWN: {
    tagline: "منصة لإدارة خدمات الأعمال لشركة سعودية.",
    summary: "نظام واحد لدورة العميل كاملة: طلب من الموقع، ثم عرض سعر، ثم عقد، ثم فاتورة، ثم اشتراك، ثم طلبات الخدمات الحكومية وتنبيهات التجديد. بالعربية والإنجليزية، مع بوابة خدمة ذاتية للعملاء.",
    facts: [
      "سلّمت الـAPI ولوحة التحكم والموقع التسويقي خلال أسبوعين.",
      "نحو 70 وحدة في الباك إند و8 أدوار جاهزة، ونطاق البيانات (الكل أو الفرع أو الخاص) مطبّق على مستوى الاستعلام.",
      "دخول موحّد OIDC مع PKCE، ورموز تحديث دوّارة مع كشف إعادة الاستخدام.",
      "مُختبرة بمصفوفة صلاحيات من 40,936 حالة على الـAPI واختبارات Playwright شاملة.",
    ],
  },
  POP: {
    tagline: "تطبيق حفلات يجعل كل هاتف جزءًا من العرض.",
    summary: "يتحكم الـDJ في شاشات وفلاشات وأصوات كل الهواتف في المكان في اللحظة نفسها، ويشغّل أغنية واحدة متزامنة على الجميع. الهواتف تتبع ساعة الخادم لا ساعتها.",
    facts: [
      "كل أمر يُجدول قبل تنفيذه بـ350 مللي ثانية على توقيت الخادم، فتنفّذه كل الهواتف معًا.",
      "الأغاني المشتركة: كل هاتف يراجع موضعه ويصحّح نفسه إذا انحرف أكثر من 140 مللي ثانية.",
      "غرف صوتية على LiveKit، وSocket.IO مع Redis adapter لتشغيل أكثر من خادم على الغرفة نفسها.",
      "221 اختبارًا للباك إند تعمل قبل كل نشر.",
    ],
  },
};

const projAr: Record<string, { summary: string; status?: string }> = {
  "AKM E-Commerce": { summary: "متجر ملابس بلوحة تحكم خاصة: مصادقة بـJWT، وإدارة الحالة بـZustand، وتقارير مبيعات بـRecharts، ومعالجة الصور بـCloudinary، وتحقق صارم من البيانات." },
  "World of Control": { summary: "متجر ثنائي اللغة لأنظمة التحكم وقطع غيار السيارات، مصمم للجوال أولًا، بوضعين فاتح وداكن ودعم كامل للعربية من اليمين إلى اليسار." },
  Mahsoom: { status: "قيد التطوير", summary: "منصة SaaS متعددة المستأجرين للتجار الصغار، أبنيها مع شريك. حركة المخزون تمر عبر سجل لا يقبل إلا الإضافة، واختبار تزامن يثبت أنه عندما يتسابق مشتريان على آخر قطعة ينجح واحد فقط." },
  Masroof: { status: "قيد التطوير", summary: "واجهة API للمصروفات متعددة المستأجرين بـASP.NET Core وMongoDB، أبنيها لأنقل خبرتي في NestJS إلى ‎.NET. التالي: مصادقة JWT مع سياق المستأجر، واستخراج بيانات الإيصالات بنموذج لغوي." },
};


const ar: Content = {
  dir: "rtl",
  nav: { work: "الأعمال", now: "Alpha Tech", experience: "الخبرة", projects: "المشاريع", writing: "المقالات", contact: "تواصل", cv: "تحميل السيرة الذاتية", home: "محمد عثمان، العودة للأعلى", sections: "الأقسام" },
  toggle: { theme: "التبديل بين الوضع الفاتح والداكن", lang: "English", langLabel: "Read this page in English", langHref: "/" },
  hero: {
    name: "محمد عثمان",
    lede: "مهندس برمجيات أول وقائد تقني من الجيزة، أبدأ من الباك إند. أصمم أنظمة تصمد تحت الضغط الحقيقي، وأقود الفرق التي تبنيها، وأسلّم المنتج كاملًا، من قاعدة البيانات حتى الشاشة.",
    email: "راسلني", cv: "تحميل السيرة الذاتية", scroll: "انتقل إلى الأعمال",
  },
  facts: [
    { value: "4+", label: "سنوات في بناء أنظمة تعمل في الإنتاج" },
    { value: "2", label: "فريقان قدتهما، من خمسة وسبعة" },
    { value: "20M+", label: "شحنة سنويًا على منصة صممتها" },
  ],
  work: {
    title: "منصة بُنيت من الصفر لعشرين مليون شحنة سنويًا.",
    intro: "كانت ABS Courier تعمل على نظام جاهز لا يناسب طريقة عملها. انضممت إلى الشركة في 2024، واقترحت NestJS وPostgreSQL أساسًا لنظام بديل، وقدته من متطلبات جمعتها مع فرق التشغيل والفروع والأسطول حتى أصبح النظام الذي تعمل عليه الشركة. يعمل عليه يوميًا أكثر من ألف موظف، وتشحن عبره أكثر من عشرين ألف حساب للتجار والشركاء.",
    figures: ["شحنة سنويًا", "حساب للتجار والشركاء", "استجابة أسرع مع Redis", "مهندسي باك إند قدتهم"],
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
  now: {
    title: "الآن أقود فريقًا من سبعة في Alpha\u00a0Tech.",
    intro: "منذ نوفمبر 2026 أعمل قائدًا تقنيًا (دوام جزئي) في Alpha Tech. أخطط المعمارية، وأراجع كل تغيير، وأتولى النشر، بينما ينفّذ Claude Code ويختبر تحت هذه المراجعة. منتجان حتى الآن.",
    items: featEn.map((p) => ({ ...p, ...featAr[p.name] })),
    visit: "زيارة الموقع",
    illustration: "رسم توضيحي لطريقة العمل، وليس لقطة شاشة",
  },
  expTitle: "أربع سنوات، من الواجهات إلى البنية التحتية.",
  experience: [
    {
      company: "Alpha Tech", place: "الجيزة، مصر",
      roles: [
        { title: "قائد تقني (دوام جزئي)", from: "نوفمبر 2026", to: "الآن", points: [
          "أقود فريقًا من سبعة وتسليم منتجين. أتولى المعمارية والتخطيط ومراجعة الكود والنشر، وينفّذ Claude Code ويختبر تحت هذه المراجعة.",
          "سلّمت AWN، منصة خدمات أعمال لشركة سعودية، خلال أسبوعين: NestJS API بنحو 70 وحدة، ولوحة تحكم بـReact 19، وموقع تسويقي.",
          "بنيت POP، تطبيق حفلات لحظي: باك إند بـNestJS وSocket.IO وRedis يُبقي كل هاتف في المكان على ساعة الخادم، مع تطبيق Flutter.",
        ] },
      ],
    },
    {
      company: "ABS Courier", place: "القاهرة، مصر",
      roles: [
        { title: "Principal Architect", from: "أغسطس 2026", to: "أكتوبر 2026", points: [
          "توليت معمارية المنصة التي صممتها وبنيتها مع تجاوزها 20 مليون شحنة سنويًا.",
          "قدت إعادة بنائها كخدمة SaaS متعددة المستأجرين لشركات شحن أخرى: عزل المستأجرين، وحدود البيانات، وإصدارات الواجهات.",
          "وضعت معايير معمارية الباك إند للفريق: سجلات القرارات، وبوابات المراجعة، وممارسات الترحيل بدون توقف.",
        ] },
        { title: "Backend Team Leader", from: "نوفمبر 2024", to: "أغسطس 2026", points: [
          "صممت وبنيت المنصة اللوجستية للشركة من الصفر بديلًا لنظام قديم جاهز. تتعامل مع أكثر من 20 مليون شحنة سنويًا لأكثر من ألف موظف وأكثر من عشرين ألف حساب للتجار والشركاء، مع موقع تتبع عام.",
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
    visit: "زيارة", code: "عرض الكود", open: "فتح", inNewTab: "في تبويب جديد", homePage: "الصفحة الرئيسية",
    items: projEn.map((p) => ({ ...p, ...projAr[p.name] })),
  },
  about: {
    title: "الشخص وراء الطوابير.",
    p1: "أحب الأجزاء التي لا يراها أحد في البرمجيات: الفهرس الذي يُبقي الاستعلام سريعًا في السنة الثالثة، والترحيل الذي ينزل دون أن يلاحظه أحد، وتعليق المراجعة الذي يوفر على زميل أسبوعًا. أدرس علوم الحاسب في جامعة القاهرة، وشاركت في المسابقة المصرية الجامعية للبرمجة (ECPC) عام 2022، وقضيت قرابة ثلاث سنوات أعلّم البرمجة والروبوتات للأطفال مع مبادرة أشبال مصر الرقمية.",
    p2: "أعمل بالعربية والإنجليزية، وما زلت أبني بـReact وNext.js وReact Native عندما يحتاج المنتج ذلك. أعمل يوميًا بـClaude Code وCursor، ولا يُنشر شيء مما يكتبانه قبل أن يثبته اختبار.",
    portrait: "صورة محمد عثمان",
    stack: [
      { group: "الباك إند", items: stackEn[0].items },
      { group: "البيانات", items: stackEn[1].items },
      { group: "البنية التحتية", items: stackEn[2].items },
      { group: "الفرونت إند", items: stackEn[3].items },
      { group: "أدوات الذكاء الاصطناعي", items: stackEn[4].items },
      { group: "الممارسات", items: ["سجلات القرارات المعمارية", "ترحيلات بدون توقف", "مراجعة الكود", "التوجيه"] },
    ],
  },
  writing: { title: "ملاحظات من بيئة الإنتاج.", intro: "مقالات قصيرة عن PostgreSQL وNestJS وتشغيل منصة على نطاق واسع، بالعربية والإنجليزية.", all: "كل المقالات" },
  contact: { title: "تبني شيئًا يجب أن يتحمل الضغط؟", email: "إيميل", whatsapp: "واتساب", cv: "تحميل السيرة الذاتية" },
  footer: { top: "العودة للأعلى" },
  story: {
    title: "ما الذي أضيفه إلى الفريق.",
    sub: "ستة أشياء أجيدها، ومع كل واحد العمل الذي يثبته.",
    coda: "والآن شاهد العمل وراء كل واحد منها.",
    logLabel: "الدليل",
    stations: ["التوسّع", "التشخيص", "القيادة", "اللحظي", "الثقة", "السرعة"],
    steps: [
      { time: "ABS Courier", place: "أكثر من 20 مليون شحنة سنويًا", title: "أصمم أنظمة تبقى سريعة وهي تكبر.", body: "بنيت المنصة اللوجستية لـABS Courier من الصفر: جداول مقسمة بالتاريخ، وقراءات موجّهة إلى نسخ القراءة، ومهام ثقيلة منقولة إلى الطوابير. البيانات تكبر والاستعلامات تبقى ثابتة." },
      { time: "ABS Courier", place: "من انتهاء المهلة إلى أقل من 100 مللي ثانية", title: "أصل إلى السبب الحقيقي، لا إلى أقرب ترقيع.", body: "كانت الفلاتر تتجاوز المهلة. أظهر EXPLAIN مسحًا كاملًا لكل الأقسام بسبب إحصاءات قديمة. نفّذت ANALYZE وجدولته كل ليلة، فأجابت الفلاتر نفسها في أقل من 100 مللي ثانية." },
      { time: "ABS Courier و Alpha Tech", place: "فريقان من 5 و7", title: "أقود من يبنون النظام.", body: "أجلس مع فرق التشغيل لأحوّل طريقة عملهم الفعلية إلى تصميم، وأقسّمه إلى مهام، وأراجع كل pull request، وأدوّن القرارات ليعرف المهندس التالي السبب." },
      { time: "POP", place: "كل الهواتف خلال 350 مللي ثانية", title: "أجعل قاعة كاملة من الهواتف تتحرك في اللحظة نفسها.", body: "في POP يتحكم الـDJ في كل هاتف في الحفلة. كل أمر يُجدول على ساعة الخادم، فتنطلق الشاشات والفلاشات والموسيقى معًا، والهاتف الذي ينحرف يصحّح نفسه." },
      { time: "AWN", place: "40,936 اختبار صلاحيات", title: "أبني أنظمة أعمال تأتمنها على بياناتك.", body: "AWN يدير دورة العميل كاملة لشركة سعودية. كل دور يرى نطاقه فقط، والقيد مطبّق داخل الاستعلام نفسه، مع دخول موحّد ورموز دوّارة، ومصفوفة اختبارات تفحص كل دور أمام كل endpoint." },
      { time: "AWN ومحسوم", place: "منصة كاملة في أسبوعين", title: "أسلّم بسرعة مع الذكاء الاصطناعي، وأثبت ذلك بالاختبارات.", body: "أخطط المعمارية وأراجع كل تغيير، وClaude Code ينفّذ ويختبر. هكذا سُلّم API ولوحة تحكم وموقع AWN خلال أسبوعين، ولهذا لا يُعد شيء منتهيًا حتى ينجح اختباره." },
    ],
  },
  loader: ["قراءة المتطلبات", "تصميم قاعدة البيانات", "كتابة الاختبارات أولًا", "مراجعة كل تغيير", "ترحيل بدون توقف", "النشر", "جاهز للعمل"],
  numberLocale: "ar-EG",
};

export const content: Record<Lang, Content> = { en, ar };
export type { Content };
