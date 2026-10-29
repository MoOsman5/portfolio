export type Article = {
  slug: string;
  lang: "en" | "ar";
  title: string;
  description: string;
  date: string; // ISO date the post was first published on LinkedIn
  linkedin: string;
  tags: string[];
  body: string; // paragraphs separated by blank lines; lines starting with "- " become a list
};

const li = (id: string) => `https://www.linkedin.com/feed/update/urn:li:activity:${id}/`;

export const articles: Article[] = [
  {
    slug: "postgresql-shared-buffers-dirty-pages",
    lang: "ar",
    title: "ليه كويري القراءة في PostgreSQL بقى بطيء؟ shared_buffers والـ dirty pages ببساطة",
    description:
      "شرح الكاش في PostgreSQL بمثال مكتبة: shared_buffers، والـ WAL، والـ clock sweep، والـ Background Writer، وليه SELECT ممكن يدفع تمن كتابة حد تاني.",
    date: "2026-10-18",
    linkedin: li("7517465170894385152"),
    tags: ["PostgreSQL", "Performance", "shared_buffers", "WAL"],
    body: `كويري عندك بقى بطيء.

مفيش داتا زادت، مفيش كود اتغير، والـ EXPLAIN شكله عادي تماماً.

وهو كويري قراءة. SELECT وبس.

خليني أحكيلك عن مكتبة.

الكتب كلها في مخزن في آخر المبنى. تروح تجيب منه كتاب، تضيع عشر دقايق.

عشان كده فيه ترابيزة في الاستقبال، عليها الكتب اللي الناس بتطلبها كتير.

الترابيزة دي الكاش في الذاكرة (shared_buffers). والمخزن ده الهارد.

تطلب كتاب موجود على الترابيزة، تاخده فوراً (cache hit). مش موجود؟ حد يقوم يجيبه من المخزن ويحطه عليها (cache miss).

لحد هنا كله منطقي.

طب لما حد يعدّل؟

بيكتب بالرصاص على الكتاب وهو على الترابيزة، ويسجّل سطر في دفتر يوميات قدامه (WAL).

السطر ده بينزل المخزن فعلاً قبل ما يرد عليك — بس كتابة سطر في آخر دفتر (sequential write) أرخص بكتير من إنه يمشي يدور على رف الكتاب في آخر المبنى (random write).

والكتاب نفسه؟ هيرجع مكانه بعدين.

خد بالك من السطر ده: التعديل كان سريع لأن التمن اتأجّل. مش لأنه اتلغى.

دلوقتي الترابيزة مليانة، وجه حد طلب كتاب جديد. لازم كتاب يمشي (eviction).

والمكتبة ما بتمشّيش الأقدم.

كل ما حد يطلب كتاب، بتتحط عليه شرطة (usage_count). والشرط بتوصل لخمسة بالكتير وبعدكده بتقف.

ولما تحتاج تفضي مكان، بتلف على الترابيزة زي عقرب الساعة (clock sweep) وتمسح شرطة واحدة من كل كتاب محدش بيطلبه. وأول كتاب تخلص شُرَطه — يطلع.

وليه السقف خمسة؟

من غيره، كتاب اتطلب ألف مرة من شهر هيفضل محتل مكانه لحد ما تمسح ألف شرطة. شهرة قديمة بتتحول لملكية دايمة.

السقف بيخلي السؤال "اتطلب مؤخراً؟" مش "اتطلب كام مرة في حياته؟"

طيب، والكتب اللي اتكتب عليها بالرصاص؟

فيه موظف شغال في الخلفية (Background Writer) بيرجّعها المخزن على مهله، عشان دايماً يسيب قدامك كتب نضيفة تشيلها بسهولة.

وهنا المفاجأة.

الموظف ده بيقصّر. لما الضغط يزيد، بتلاقي كل اللي قدامك مكتوب عليه.

وساعتها اللي جه يطلب كتاب — هو اللي بيمشي يرجّع كتاب حد تاني بإيده الأول، عشان يفضي لنفسه مكان.

ده اللي بيحصل في الـ SELECT بتاعك.

الصفحة اللي اتعدلت في الذاكرة ولسه ما نزلتش الديسك اسمها dirty page. ولما الكويري بتاعك يطردها، هو اللي بيستنى لحد ما تتكتب.

كويري قراءة بحت، بيدفع تمن كتابة حد تاني من شوية.

ما فيش إندكس هيحل دي.

ولو زوّدت الرام عشوائي، احتمال تزوّدها — ترابيزة أكبر يعني كتب مكتوب عليها أكتر مستنية دورها.

التخمين بيشتغل. لحد ما السيستم يكبر.`,
  },
  {
    slug: "postgresql-read-replicas-pgbouncer",
    lang: "ar",
    title: "Read replicas وPgBouncer: إزاي فصلنا التقارير عن الكتابة في PostgreSQL",
    description:
      "أكبر مشكلة أداء واجهتنا في منصة شحن بتشيل 20 مليون شحنة في السنة: تقارير وإدخال ضخم وكتابة لحظية على نفس السيرفر، وإزاي حلّيناها بالـ read replicas والكيوز وPgBouncer.",
    date: "2026-10-14",
    linkedin: li("7516045171491377153"),
    tags: ["PostgreSQL", "Read replicas", "PgBouncer", "Queues", "MinIO"],
    body: `أكتر مشكلة أداء واجهتنا مكانتش كويري بطيئة. كانت تلات شغلات كلها صح، بتتضارب على نفس السيرفر.

على طول اليوم، النظام بيستقبل كتابة مستمرة من العملاء. وفي نفس الوقت، عمليات الداتا إنتري بتدخّل شحنات بالآلاف في المرة الواحدة — ممكن توصل 200 ألف وأكتر. وفوق ده كله، خدمة العملاء وكل أقسام الشركة بيسحبوا تقارير.

النتيجة إن تقرير بيمسح شهر شحنات يخلي إدخال شحنة جديدة يستنى. ومحدش فيهم غلطان — كله شغل ضروري.

الحلول اللي كانت قدامنا للتقارير:

- تكبّر السيرفر. أسرع حل، وبيشتريلك وقت بس.
- data warehouse منفصل. أنظف على المدى الطويل، بس مشروع كامل بـ ETL وصيانة، ومكناش محتاجين تحليلات معقدة.
- تكاشّ التقارير. بينفع مع المتكرر، مش مع تقرير بفلاتر مختلفة كل مرة.
- read replicas. نسخة قراية، التقارير تروح عليها والـ primary يفضل للكتابة.

اخترنا الرابع، لأن مشكلتنا مكانتش شكل الداتا ولا حجمها — المشكلة إن القراية والكتابة بيتنافسوا على نفس الموارد.

والـ replica بتجيب سؤال مالوش إجابة عامة: أي قراية تتحمل تأخير؟ هي بتكون ورا الـ primary بملي ثانية أو ثواني حسب الحِمل. تقرير شهري مايفرقش. حد لسه معدّل شحنة وبيفتح صفحتها؟ دي لازم تروح على الـ primary.

بس الـ replica لوحدها مكانتش تكفي.

موجة 200 ألف صف مش مفروض تحصل وحد مستنى رد أصلاً. فنقلناها لكويو ووركر بره مسار الريكوست، والوركر بيقسّمها ويدخلها على دفعات.

وفضلت مشكلة ماكنتش واخد بالي منها: الملف نفسه. رفع ملف بمئات الآلاف من الصفوف على الـ API مباشرة يعني ريكوست فاضل مفتوح وذاكرة بتتاكل وتايم أوت مستني.

واحد من الفريق اقترح حل أبسط من أي حاجة كنت بفكر فيها: الفرونت يرفع الملف على MinIO على طول، ويبعت للـ API مرجعه بس. الوركر يروح يجيبه من هناك وقت ما يجهز.

كده الـ API بطل يشيل الملف أصلاً.

والنتيجة إن كل شغلة بقى ليها مسارها: التقارير على الـ replica، الإدخال الضخم على الوركر، والـ primary للشغل اللحظي اللي فيه حد مستني قدام الشاشة.

وضفنا PgBouncer قدام الداتابيز، لأن Postgres بيعمل process لكل كونكشن والرقم بيطلع بسرعة مع أكتر من خدمة شغالة.

الدرس اللي فضل معايا: لما شغلات صح تتضارب، الحل غالباً مش إنك تسرّع واحدة — الحل إنك تبطل تحطهم في نفس المكان.`,
  },
  {
    slug: "requirements-from-the-warehouse-floor",
    lang: "en",
    title: "What a warehouse floor taught me about gathering requirements",
    description:
      "Before building a logistics platform for 20M+ shipments a year, I thought a warehouse was a status column. Walking the floor and asking people to explain their jobs changed the design.",
    date: "2026-10-11",
    linkedin: li("7514928486801879040"),
    tags: ["Requirements", "Logistics", "System design"],
    body: `Before I built anything, I thought a warehouse was simple. Shipments come in, get sorted, go out. A few tables and a status column.

The first time I actually walked into one, I realised I had been designing for something that didn't exist.

It isn't one operation. It's many, run by different teams, handing off to each other all day. At our volume, everything happens simultaneously. What I had modelled as a status field was dozens of people coordinating in real time, and every handoff between them was somewhere a shipment could stall.

No document would have taught me that. Not because nobody could write it — because I didn't know what to ask.

So I sat with each team and watched them work. Where do you wait? What slows you down? What do you do when the system won't let you?

And once I understood the job, something changed: I could start proposing instead of collecting. I'd suggest removing a step. They'd tell me why it existed. I'd suggest something better. After a few rounds we'd land on a design neither of us had at the start.

Those pushbacks weren't resistance. They were years of experience doing a job I had never done.

That system now handles over 20M shipments a year. Most of what makes it work came out of standing in a warehouse asking people to explain their own jobs to me.

If you're building for an operation you've never physically been inside, go.`,
  },
  {
    slug: "nestjs-vs-express-dependency-injection",
    lang: "en",
    title: "Why I chose NestJS over Express for a system meant to outlive me",
    description:
      "Rebuilding a logistics platform from scratch, I picked NestJS on Fastify over Express. Not for performance: for dependency injection that is enforced by default rather than left to discipline.",
    date: "2026-10-07",
    linkedin: li("7513478691876679680"),
    tags: ["NestJS", "Express", "Fastify", "Dependency injection", "Architecture"],
    body: `When we decided to rebuild our logistics system from scratch, the obvious choice was Express. We knew it, it's fast, and it stays out of your way.

I picked NestJS. Not for performance — I took performance out of the equation entirely.

Nest isn't a server. It's an organisational layer that runs on top of Express or Fastify. So I ran it on Fastify, which closed the one argument that could have stopped me. That left the decision resting on something else: how the code reaches itself.

In the codebase I'd worked in before, every file that needed the repository instantiated its own copy.

The problem with that isn't memory — the instance is a handful of bytes. The real costs are elsewhere:

- If each copy holds its own connection or cache, you lose pooling and state fragments.
- Testing becomes close to impossible. When a class news up its own dependency, there's no seam to swap in a mock. You end up hitting the real database.
- And any change to a constructor means touching dozens of files.

I first solved it by making the classes static. It fixed the duplication and introduced a different problem: the dependency was now fixed at write time. I couldn't swap it in tests, and I couldn't run two instances with different configuration.

And here's the part I should be straight about:

All of this was solvable in Express. Instantiate once and export it, or reach for a DI library like tsyringe or awilix. There is nothing here that only NestJS can do.

The difference is that Express leaves it as a choice, and Nest makes it the default path.

That's what mattered to me. On a small project with one developer, discipline is easy. On a system that will keep growing for years and get handed to engineers who've never seen it, discipline is the first thing to go when a deadline arrives.

So what I chose wasn't a capability. It was having that capability enforced rather than left to judgement.

Two years on, that system handles over 20M shipments a year.

Express wasn't the wrong choice. It was the wrong choice for a system meant to outlive whoever wrote it.`,
  },
  {
    slug: "when-to-replace-a-legacy-system",
    lang: "ar",
    title: "إمتى تستبدل نظام قديم؟ بُص على الحيل اللي الناس بتعملها حواليه",
    description:
      "أوضح إشارة إن النظام القديم لازم يتغير مش الحِمل ولا التكلفة: هي الحيل اللي الموظفين بيعملوها عشان يخلّصوا شغلهم. كل حيلة منهم requirement محدش كتبها.",
    date: "2026-10-04",
    linkedin: li("7512391243218427904"),
    tags: ["Legacy systems", "Requirements", "Product"],
    body: `عشان تيم ليدر فرع يغيّر عنوان شحنة في النظام القديم، كان لازم يفتح شاشة الكول سنتر ويسجّل مكالمة متمّتش.

ده كان الطريق الوحيد لخانة العنوان. محدش صممه كده — حد اكتشفه من سنين، نفع، وبقى هو الإجراء. والناس اللي بتعمله مكانوش شايفينه حيلة أصلاً، كانوا حافظين الخطوات وخلاص: العنوان بيتغير من هنا.

فالنتيجة إن سجلات الشحنات اتملت بمكالمات محصلتش.

التفصيلة دي قالتلي أكتر من أي مقياس أداء. المشكلة مكانتش إن النظام تقيل أو بطيء — المشكلة إنه مش مغطي الشغل الحقيقي. ولما النظام ميغطيش الشغل، الناس مبتوقفش، بتلف حواليه. والداتا بتبطّل تعني اللي مكتوب فيها من غير ما حد ياخد باله.

الكلام اللي بيتقال عن إمتى تستبدل نظام قديم بيركز على الحِمل والتكلفة والصيانة. وكل ده مهم.

بس أوضح إشارة لقيتها كانت حاجة تانية: بُص على اللي الناس بتعمله واللي النظام ماكانش ناوي عليه.

كل حيلة من دي هي ريكوايرمنت محدش كتبها. احنا جمعناها، وهي اللي بقت المواصفات اللي بنينا عليها البديل.

النظام ده دلوقتي بيشيل أكتر من 20 مليون شحنة في السنة.

وتيم ليدر الفرع بيغيّر العنوان بإنه يغيّر العنوان.`,
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

export function blocks(body: string) {
  return body.split(/\n\s*\n/).map((p) => {
    const lines = p.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.every((l) => l.startsWith("- "))) return { type: "list" as const, items: lines.map((l) => l.slice(2)) };
    return { type: "p" as const, text: lines.join(" ") };
  });
}

export const readingMinutes = (body: string) => Math.max(1, Math.round(body.split(/\s+/).length / 200));
