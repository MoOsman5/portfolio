import { experience as expEn, decisions as decEn, projects as projEn, featured as featEn, stack as stackEn } from "./site";

export type Lang = "en" | "ar";

const en = {
  dir: "ltr" as "ltr" | "rtl",
  nav: { work: "Work", now: "Alpha Tech", projects: "Projects", experience: "Experience", writing: "Writing", contact: "Contact", cv: "Download CV", home: "Mohamed Osman, back to top", sections: "Sections" },
  toggle: { theme: "Switch light and dark theme", lang: "العربية", langLabel: "Read this page in Arabic", langHref: "/ar" },
  hero: {
    title: "Mohamed Osman builds backends that carry twenty million shipments a year.",
    lede: "Senior backend engineer in Giza. I designed ABS Courier's logistics platform from scratch and led the team behind it. Today I lead a team of seven at Alpha Tech, shipping whole products from the database to the screen.",
    email: "Email me", cv: "Download CV",
  },
  route: {
    title: "Route so far",
    status: "Available to start immediately",
    now: "Now",
    next: "Next stop",
    nextBody: "Open to senior backend and tech lead roles.",
    stops: [
      { date: "Jun 2022", place: "Teqneia ICT", role: "Software Developer" },
      { date: "Jun 2023", place: "NasNav", role: "Software Developer" },
      { date: "May 2024", place: "ABS Courier", role: "Full Stack Developer" },
      { date: "Nov 2024", place: "ABS Courier", role: "Backend Team Leader" },
      { date: "Aug 2026", place: "ABS Courier", role: "Principal Architect" },
      { date: "Nov 2026", place: "Alpha Tech", role: "Tech Lead, part-time" },
    ],
  },
  work: {
    title: "A platform built from nothing, for twenty million shipments a year.",
    intro: "ABS Courier was running on a purchased system that didn't fit how the business worked. I joined in 2024, proposed NestJS and PostgreSQL as the foundation for a replacement, and took it from requirements gathered with operations, branches and the fleet to the system the company runs on. More than a thousand staff work in it every day, and over twenty thousand merchant and partner accounts ship through it.",
    figures: [
      { value: "20M+", label: "Shipments a year" },
      { value: "20K+", label: "Merchant and partner accounts" },
      { value: "3.7×", label: "Faster responses with Redis" },
      { value: "5", label: "Backend engineers led" },
    ],
    archLabel: "Platform architecture diagram",
    caption: "How a request moves through the platform: Nginx in front of the NestJS API, Redis for hot reads, PgBouncer routing writes to a date-partitioned primary and reporting to replicas, and Bull queues feeding a dedicated worker.",
    decisionsTitle: "The decisions behind it",
    problem: "Problem", answer: "What I did",
  },
  decisions: decEn,
  story: {
    title: "Follow one shipment",
    sub: "A simplified day in the platform, one package at a time.",
    coda: "Now do that twenty million times a year.",
    steps: [
      { time: "09:12", place: "Alexandria", title: "A customer books a shipment.", body: "The request comes in through Nginx and lands on the NestJS API, where it is validated before anything is written." },
      { time: "09:12", place: "Alexandria", title: "It is written to this month's partition.", body: "The shipments table is partitioned by date, so the write touches one small partition and queries stay flat no matter how big the history gets." },
      { time: "09:13", place: "Alexandria", title: "The customer gets a WhatsApp message.", body: "The API doesn't wait for it. A job goes onto a Bull queue and a dedicated worker sends the notification in the background." },
      { time: "14:40", place: "Cairo hub", title: "It is scanned at the Cairo hub.", body: "The scan becomes a tracking event. Redis holds the latest status, so the public tracking page and partner APIs answer without touching the database." },
      { time: "Next day, 11:05", place: "Aswan", title: "Delivered in Aswan, over a thousand kilometres south.", body: "The final status flows the same way: one event, one queue, one cache update, and the customer and the partner both know within seconds." },
      { time: "18:00", place: "Head office", title: "It shows up in tonight's report.", body: "Reporting reads go through PgBouncer to a read replica, so the people running the business never slow down the people moving the boxes." },
    ],
  },
  now: {
    title: "Now leading a team of seven at Alpha Tech.",
    intro: "Since November 2026 I have been Tech Lead (part-time) at Alpha Tech. I plan the architecture, review every change and own deployment, with Claude Code implementing and testing under that review. Two products so far.",
    items: featEn,
    visit: "Visit the website",
    illustration: "Illustration of how it works, not a screenshot",
  },
  projects: {
    title: "Selected projects.",
    intro: "Products I build end to end, from the platform underneath to the screen people tap.",
    visit: "Visit", code: "View the code", inNewTab: "in a new tab", homePage: "home page",
    items: projEn,
  },
  expTitle: "Four years, from interfaces to infrastructure.",
  experience: expEn.map((j) => ({ ...j, place: `${j.place}, Egypt` })),
  datesJoin: "to",
  about: {
    title: "The person behind the queues.",
    p1: "I like the unglamorous parts of software: the index that keeps a query flat at year three, the migration that ships without anyone noticing, the review comment that saves a teammate a week. I'm studying computer science at Cairo University, competed in the Egyptian Collegiate Programming Contest in 2022, and spent almost three years teaching coding and robotics to kids with the Digital Egypt Cubs Initiative.",
    p2: "I work in Arabic and English, and I still ship React, Next.js and React Native when a product needs it. Day to day I build with Claude Code and Cursor, and nothing they write ships until a test proves it.",
    portrait: "Portrait of Mohamed Osman",
    stack: stackEn,
  },
  writing: { title: "Notes from production.", intro: "Short pieces on PostgreSQL, NestJS and running a platform at scale, in English and Arabic.", all: "All writing", min: "min read" },
  contact: { title: "Building something that has to keep up?", body: "I can start immediately, on site in Cairo or Giza, or remote.", email: "Email", whatsapp: "WhatsApp", linkedin: "LinkedIn", cv: "Download CV" },
  footer: { top: "Back to top" },
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
  nav: { work: "الأعمال", now: "Alpha Tech", projects: "المشاريع", experience: "الخبرة", writing: "المقالات", contact: "تواصل", cv: "تحميل السيرة الذاتية", home: "محمد عثمان، العودة للأعلى", sections: "الأقسام" },
  toggle: { theme: "التبديل بين الوضع الفاتح والداكن", lang: "English", langLabel: "Read this page in English", langHref: "/" },
  hero: {
    title: "محمد عثمان يبني أنظمة الباك إند التي تحمل عشرين مليون شحنة سنويًا.",
    lede: "مهندس باك إند أول من الجيزة. صممت المنصة اللوجستية لشركة ABS Courier من الصفر وقدت الفريق الذي بناها. واليوم أقود فريقًا من سبعة في Alpha Tech، ونسلّم منتجات كاملة من قاعدة البيانات حتى الشاشة.",
    email: "راسلني", cv: "تحميل السيرة الذاتية",
  },
  route: {
    title: "المسار حتى الآن",
    status: "متاح للبدء فورًا",
    now: "الآن",
    next: "المحطة التالية",
    nextBody: "منفتح على أدوار مهندس باك إند أول وقائد تقني.",
    stops: [
      { date: "يونيو 2022", place: "Teqneia ICT", role: "مطور برمجيات" },
      { date: "يونيو 2023", place: "NasNav", role: "مطور برمجيات" },
      { date: "مايو 2024", place: "ABS Courier", role: "Full Stack Developer" },
      { date: "نوفمبر 2024", place: "ABS Courier", role: "Backend Team Leader" },
      { date: "أغسطس 2026", place: "ABS Courier", role: "Principal Architect" },
      { date: "نوفمبر 2026", place: "Alpha Tech", role: "قائد تقني، دوام جزئي" },
    ],
  },
  work: {
    title: "منصة بُنيت من الصفر لعشرين مليون شحنة سنويًا.",
    intro: "كانت ABS Courier تعمل على نظام جاهز لا يناسب طريقة عملها. انضممت إلى الشركة في 2024، واقترحت NestJS وPostgreSQL أساسًا لنظام بديل، وقدته من متطلبات جمعتها مع فرق التشغيل والفروع والأسطول حتى أصبح النظام الذي تعمل عليه الشركة. يعمل عليه يوميًا أكثر من ألف موظف، وتشحن عبره أكثر من عشرين ألف حساب للتجار والشركاء.",
    figures: [
      { value: "20M+", label: "شحنة سنويًا" },
      { value: "20K+", label: "حساب للتجار والشركاء" },
      { value: "3.7×", label: "استجابة أسرع مع Redis" },
      { value: "5", label: "مهندسي باك إند قدتهم" },
    ],
    archLabel: "مخطط معمارية المنصة",
    caption: "مسار الطلب داخل المنصة: Nginx أمام NestJS API، وRedis للقراءات المتكررة، وPgBouncer يوجّه الكتابة إلى قاعدة البيانات الأساسية المقسمة بالتاريخ والتقارير إلى نسخ القراءة، وطوابير Bull تغذي عاملًا مخصصًا.",
    decisionsTitle: "القرارات وراء المنصة",
    problem: "المشكلة", answer: "ما فعلته",
  },
  decisions: [
    { problem: "جداول الشحنات تكبر كل يوم.", answer: "قسّمت الجداول الكبيرة حسب التاريخ (partitioning)، فبقيت أوقات الاستعلام ثابتة مع استمرار نمو البيانات." },
    { problem: "التقارير كانت تنافس العمل اللحظي على قاعدة البيانات الأساسية.", answer: "أضفت نسخ قراءة (read replicas) خلف PgBouncer، ووجّهت القراءات التي تحتمل تأخيرًا بسيطًا بعيدًا عن الأساسية." },
    { problem: "المهام الكبيرة كانت تعطّل الطلبات.", answer: "نقلت الإدخال الجماعي ورسائل واتساب وأحداث التتبع إلى طوابير Bull يعالجها عامل مخصص." },
    { problem: "الاستجابة كانت أبطأ مما يحتاجه العمل.", answer: "شغّلت النظام على Docker وأضفت طبقة تخزين مؤقت بـRedis، فأصبحت الاستجابة أسرع بنحو 3.7 مرة." },
    { problem: "تعديلات المخطط يجب أن تتم على جداول لا تتوقف.", answer: "نفّذت ترحيلات بدون أي توقف على جداول حية عالية الحمل." },
    { problem: "الشركاء يحتاجون إلى متابعة شحناتهم.", answer: "بنيت واجهة تتبع الشحنات العامة وواجهات الشركاء، ثم بدأت إعادة بناء المنصة كخدمة SaaS متعددة المستأجرين لشركات شحن أخرى." },
  ],
  story: {
    title: "تابع شحنة واحدة",
    sub: "يوم مبسّط داخل المنصة، شحنة واحدة في كل مرة.",
    coda: "والآن كرر ذلك عشرين مليون مرة في السنة.",
    steps: [
      { time: "09:12", place: "الإسكندرية", title: "عميل يحجز شحنة.", body: "يدخل الطلب عبر Nginx ويصل إلى NestJS API، حيث يتم التحقق منه قبل كتابة أي شيء." },
      { time: "09:12", place: "الإسكندرية", title: "تُكتب في قسم هذا الشهر.", body: "جدول الشحنات مقسّم حسب التاريخ، فالكتابة تلمس قسمًا صغيرًا واحدًا، وتبقى الاستعلامات ثابتة مهما كبر السجل." },
      { time: "09:13", place: "الإسكندرية", title: "تصل العميل رسالة واتساب.", body: "الواجهة لا تنتظر. تذهب مهمة إلى طابور Bull، ويرسل عامل مخصص الإشعار في الخلفية." },
      { time: "14:40", place: "مركز القاهرة", title: "تُمسح في مركز القاهرة.", body: "يتحول المسح إلى حدث تتبع. يحتفظ Redis بآخر حالة، فتجيب صفحة التتبع العامة وواجهات الشركاء دون لمس قاعدة البيانات." },
      { time: "اليوم التالي، 11:05", place: "أسوان", title: "تُسلَّم في أسوان، على بعد أكثر من ألف كيلومتر جنوبًا.", body: "تمر الحالة النهائية بالطريقة نفسها: حدث واحد، وطابور واحد، وتحديث واحد للتخزين المؤقت، فيعرف العميل والشريك خلال ثوانٍ." },
      { time: "18:00", place: "المقر الرئيسي", title: "تظهر في تقرير الليلة.", body: "تمر قراءات التقارير عبر PgBouncer إلى نسخة قراءة، فلا يبطئ من يديرون العمل أبدًا من يحركون الشحنات." },
    ],
  },
  now: {
    title: "الآن أقود فريقًا من سبعة في Alpha Tech.",
    intro: "منذ نوفمبر 2026 أعمل قائدًا تقنيًا (دوام جزئي) في Alpha Tech. أخطط المعمارية، وأراجع كل تغيير، وأتولى النشر، بينما ينفّذ Claude Code ويختبر تحت هذه المراجعة. منتجان حتى الآن.",
    items: featEn.map((p) => ({ ...p, ...featAr[p.name] })),
    visit: "زيارة الموقع",
    illustration: "رسم توضيحي لطريقة العمل، وليس لقطة شاشة",
  },
  projects: {
    title: "مشاريع مختارة.",
    intro: "منتجات أبنيها من البداية إلى النهاية، من المنصة في الأسفل حتى الشاشة التي يلمسها الناس.",
    visit: "زيارة", code: "عرض الكود", inNewTab: "في تبويب جديد", homePage: "الصفحة الرئيسية",
    items: projEn.map((p) => ({ ...p, ...projAr[p.name] })),
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
  writing: { title: "ملاحظات من بيئة الإنتاج.", intro: "مقالات قصيرة عن PostgreSQL وNestJS وتشغيل منصة على نطاق واسع، بالعربية والإنجليزية.", all: "كل المقالات", min: "دقائق قراءة" },
  contact: { title: "تبني شيئًا يجب أن يتحمل الضغط؟", body: "أستطيع البدء فورًا، من المكتب في القاهرة أو الجيزة، أو عن بُعد.", email: "إيميل", whatsapp: "واتساب", linkedin: "لينكدإن", cv: "تحميل السيرة الذاتية" },
  footer: { top: "العودة للأعلى" },
};

export const content: Record<Lang, Content> = { en, ar };
export type { Content };
