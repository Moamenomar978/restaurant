import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import hero from "@/assets/hero.jpg";
import lamb from "@/assets/dish-lamb.jpg";
import kebab from "@/assets/dish-kebab.jpg";
import tawouk from "@/assets/dish-tawouk.jpg";
import hummus from "@/assets/dish-hummus.jpg";
import mutabbal from "@/assets/dish-mutabbal.jpg";
import fattoush from "@/assets/dish-fattoush.jpg";
import knafeh from "@/assets/dish-knafeh.jpg";
import omiali from "@/assets/dish-omiali.jpg";
import mahallabi from "@/assets/dish-mahallabi.jpg";
import ambience from "@/assets/ambience.jpg";
import grill from "@/assets/grill.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "مطعم جمر — مشويات فاخرة على الفحم" },
      { name: "description", content: "مطعم جمر: مشويات شرقية فاخرة، أجواء دافئة، واحجز طاولتك الآن." },
      { property: "og:title", content: "مطعم جمر — مشويات فاخرة" },
      { property: "og:description", content: "مشويات شرقية فاخرة وأجواء دافئة. احجز طاولتك الآن." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Dish = {
  name: string;
  price: number;
  desc: string;
  img: string;
  tag?: string;
  time: string;
  kcal: number;
  veg?: boolean;
};

const menu = {
  "مشويات": [
    {
      name: "ريش ضاني بالأعشاب",
      price: 320,
      desc: "ريش ضاني طازجة تُتبل بزيت الزيتون والثوم والزعتر الأخضر، ثم تُشوى على جمر الفحم حتى تحمرّ أطرافها.",
      img: lamb,
      tag: "الأكثر طلباّ",
      time: "٢٥ دقيقة",
      kcal: 620,
    },
    {
      name: "كباب حلبي",
      price: 240,
      desc: "لحم مفروم مع بهارات حلب الأصلية، يُقدَّم على السيخ مع بصل السماق والبقدونس والليمون.",
      img: kebab,
      time: "٢٠ دقيقة",
      kcal: 540,
    },
    {
      name: "شيش طاووق",
      price: 190,
      desc: "قطع دجاج متبّلة بالزبادي والزعفران والليمون، تُشوى على الفحم مع ثوم مهروس وطحينة.",
      img: tawouk,
      tag: "خيار الشيف",
      time: "١٨ دقيقة",
      kcal: 430,
    },
  ],
  "مقبلات": [
    {
      name: "حمص بالطحينة",
      price: 60,
      desc: "حمص مخفوق مع طحينة وزيت زيتون بلدي، يُقدَّم في صحن فخاري مع خبز التنور الساخن.",
      img: hummus,
      veg: true,
      time: "٥ دقائق",
      kcal: 280,
    },
    {
      name: "متبل باذنجان",
      price: 65,
      desc: "باذنجان مدخّن على النار مباشرة، يُهرس مع الطحينة والليمون ويُزيَّن بالرمان.",
      img: mutabbal,
      veg: true,
      time: "٥ دقائق",
      kcal: 240,
    },
    {
      name: "فتوش",
      price: 70,
      desc: "خضار موسمية مع خبز محمّص وسماق ودبس الرمان، تُخلط أمامك على السفرة.",
      img: fattoush,
      tag: "يُخلط على السفرة",
      veg: true,
      time: "٥ دقائق",
      kcal: 190,
    },
  ],
  "حلويات": [
    {
      name: "كنافة نابلسية",
      price: 90,
      desc: "خيبتة ذهبية بالجبنة الذائبة وشراب القطر، تُرشّ بالفستق الحلبي وتُقدَّم فور خروجها من الفرن.",
      img: knafeh,
      tag: "تُقدَّم ساخنة",
      time: "١٥ دقيقة",
      kcal: 480,
    },
    {
      name: "أم علي",
      price: 80,
      desc: "حليب دافئ مع رقاق ومكسرات وزبيب، تُخبز في الفرن حتى تُصبح وجهها ذهبية.",
      img: omiali,
      time: "١٢ دقيقة",
      kcal: 420,
    },
    {
      name: "مهلبية بالفستق",
      price: 70,
      desc: "كريمة حليب باردة بماء الورد، تُزيَّن بالفستق المجروش وبتلات الورد.",
      img: mahallabi,
      time: "٤ دقائق",
      kcal: 310,
    },
  ],
} as const satisfies Record<string, readonly Dish[]>;

type Cat = keyof typeof menu;

const reviews = [
  { text: "أفضل ريش ضاني جربتها في القاهرة، الطعم يذكرني بطبخ بيت جدي في الصعيد.", name: "سارة م.", note: "زيارتها ١٤" },
  { text: "حجزت طاولة لعائلة من ١٢ شخصاّ، الخدمة كانت سريعة والكل خرج سعيداّ.", name: "أحمد ع.", note: "زيارته ٦" },
  { text: "الكنافة النابلسية تستحق الزيارة وحدها، تُقدَّم ساخنة فعلاّ كما يقولون.", name: "نور ح.", note: "زيارتها ٢١" },
];

const faqs = [
  { q: "هل أحتاج حجزاّ مسبقاّ؟", a: "في معظم الأوقات لا، لكننا ننصح بالحجز يومياّ الخميس والجمعة بعد الساعة ٨ مساءاً، ولموائد الستة أشخاص فأكثر." },
  { q: "هل توجد خيارات نباتية؟", a: "نعم، كل المقبلات نباتية، ولدينا طبق مشويات خضاري خاص يُحضَّر من الخضار الموسمية المشوية." },
  { q: "هل توفّرون خدمة التوصيل؟", a: "نوفّر التوصيل داخل القاهرة ضمن نطاق ١٠ كم، وتُحسب التكلفة حسب المسافة وتُعرض لك قبل التأكيد." },
  { q: "هل يمكن حجز المكان لمناسبة خاصة؟", a: "بالتأكيد. نخصّص قسم المناسبات وخدمة الضيافة حتى ٦٠ ضيفاّ، مع قائمة مُعدّة مسبقاّ حسب ذوقك." },
];

const ar = (n: number | string) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);

function Index() {
  const [cat, setCat] = useState<Cat>("مشويات");
  const [sent, setSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState<Record<string, number>>({});

  const add = (name: string) => setOrder((o) => ({ ...o, [name]: (o[name] ?? 0) + 1 }));

  const { count, total } = useMemo(() => {
    const all = Object.values(menu).flat() as Dish[];
    let count = 0;
    let total = 0;
    for (const [name, qty] of Object.entries(order)) {
      const dish = all.find((d) => d.name === name);
      if (dish) {
        count += qty;
        total += dish.price * qty;
      }
    }
    return { count, total };
  }, [order]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  return (
    <div dir="rtl" className="font-body">
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled || open ? "bg-background/90 backdrop-blur border-b" : ""}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="font-display text-3xl text-primary">جمر</a>
          <div className="hidden gap-8 text-sm md:flex">
            <a href="#about" className="hover:text-primary">عن المطعم</a>
            <a href="#menu" className="hover:text-primary">القائمة</a>
            <a href="#gallery" className="hover:text-primary">الأجواء</a>
            <a href="#reviews" className="hover:text-primary">آراء الضيوف</a>
            <a href="#book" className="hover:text-primary">الحجز</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#book" className="btn-ember text-sm">احجز الآن</a>
            <button aria-label="القائمة" onClick={() => setOpen((o) => !o)} className="border border-border p-2 md:hidden">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="mt-1 block h-0.5 w-5 bg-current" />
              <span className="mt-1 block h-0.5 w-5 bg-current" />
            </button>
          </div>
        </div>
        {open && (
          <div className="mx-auto max-w-6xl px-6 pb-4 text-sm md:hidden">
            <a href="#about" onClick={() => setOpen(false)} className="block py-2">عن المطعم</a>
            <a href="#menu" onClick={() => setOpen(false)} className="block py-2">القائمة</a>
            <a href="#gallery" onClick={() => setOpen(false)} className="block py-2">الأجواء</a>
            <a href="#reviews" onClick={() => setOpen(false)} className="block py-2">آراء الضيوف</a>
            <a href="#faq" onClick={() => setOpen(false)} className="block py-2">أسئلة شائعة</a>
          </div>
        )}
      </nav>

      <header className="relative flex min-h-screen items-center overflow-hidden">
        <img src={hero} alt="ريش ضاني مشوية" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="mb-4 tracking-widest text-primary">منذ ١٩٩٨ · القاهرة</p>
          <h1 className="font-display max-w-2xl text-6xl leading-tight md:text-8xl">نكهة النار<br />بروح الشرق</h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">مشويات على جمر الفحم، تُحضَّّر بوصفات عائلية متوارثة ومكونات طازجة يومياّ.</p>
          <div className="mt-10 flex gap-4">
            <a href="#book" className="btn-ember">احجز طاولتك</a>
            <a href="#menu" className="btn-ghost">تصفح القائمة</a>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-3">
        {[["٢٥+", "عاماّ من الخبرة"], ["٤٠", "طبقاّ مميزاّ"], ["٤.٩", "تقييم الضيوف"]].map(([n, l]) => (
          <div key={l} className="reveal border-t border-primary/40 pt-6">
            <div className="font-display text-6xl text-primary">{n}</div>
            <div className="mt-2 text-muted-foreground">{l}</div>
          </div>
        ))}
      </section>

      <section id="about" className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div className="reveal overflow-hidden rounded-2xl border">
          <img src={grill} alt="شيف يقلب السيوف على جمر الفحم" loading="lazy" width={1024} height={768} className="h-full w-full object-cover" />
        </div>
        <div className="reveal">
          <p className="eyebrow">قصتنا</p>
          <h2 className="font-display mt-3 text-5xl">نار لا تنطفيء<br />منذ ١٩٩٨</h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            بدأنا بكشك صغير في شارع التحرير، وجمر واحد لا نوقده إلا بالفحم الطبيعي.
            اليوم نفس الوصفات، ونفس اليد التي تتبل اللحم قبل الفجر، ونفس قاعدة لا نساوم عليها:
            لا شيء يخرج من المطبخ قبل أن يكون جاهزاّ فعلاّ.
          </p>
          <ul className="mt-8 grid gap-4 text-sm">
            {[
              "فحم طبيعي ١٠٠٪، بدون مواد مسرّعة",
              "لحوم طازجة تصل صباح كل يوم",
              "خضار ومقبلات تُحضَّر طازجة كل صباح",
              "خبز تنور يُخبز على مدار اليوم",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="menu" className="bg-card py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal text-center">
            <p className="eyebrow">قائمتنا</p>
            <h2 className="font-display mt-3 text-5xl">القائمة</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              اختر ما يعجبك وأضفه إلى طلبك — سنحضره لك على الطاولة في موعد حجزك.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {(Object.keys(menu) as Cat[]).map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`tab ${cat === c ? "tab-active" : ""}`}>
                {c}
                <span className="mr-2 text-xs opacity-70">{ar(menu[c].length)}</span>
              </button>
            ))}
          </div>

          <div key={cat} className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {menu[cat].map((d, i) => (
              <article key={d.name} className="dish-card group" style={{ animationDelay: `${i * 90}ms` }}>
                <div className="relative h-52 overflow-hidden">
                  <img src={d.img} alt={d.name} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  {d.tag && <span className="chip absolute top-3 right-3">{d.tag}</span>}
                  <span className="absolute bottom-3 left-3 rounded-full bg-background/85 px-3 py-1 text-sm font-bold text-primary">
                    {ar(d.price)} ج.م
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-2xl">{d.name}</h3>
                    {d.veg && <span title="نباتي" className="h-4 w-4 rounded-full border-2 border-primary" />}
                  </div>
                  <p className="mt-2 min-h-[4.5rem] text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-xs text-muted-foreground">{d.time} · {ar(d.kcal)} سعرة</span>
                    <button onClick={() => add(d.name)} className={`add-btn ${order[d.name] ? "on" : ""}`}>
                      {order[d.name] ? `في طلبك (${ar(order[d.name])})` : "أضف إلى طلبك"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="reveal mt-14 flex flex-col items-center gap-4 rounded-2xl border border-primary/40 bg-primary/5 p-8 text-center md:flex-row md:justify-between md:text-right">
            <div>
              <p className="chip">عرض الأسبوع</p>
              <h3 className="font-display mt-3 text-3xl">صينية المشويات العائلي لأربعة أشخاص بخصم ٢٠٪</h3>
              <p className="mt-2 text-sm text-muted-foreground">كباب + ريش + شيش طاووق + أرز بالشرش + ٣ مقبلات — الكود <span className="font-bold text-primary">JAMR20</span></p>
            </div>
            <a href="#book" className="btn-ember shrink-0">اطلب العرض</a>
          </div>
        </div>
      </section>

      <section id="gallery" className="mx-auto max-w-6xl px-6 py-28">
        <div className="reveal text-center">
          <p className="eyebrow">الأجواء</p>
          <h2 className="font-display mt-3 text-5xl">مكان يُجلسك أطول مما خطّطت</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="reveal overflow-hidden rounded-2xl border md:col-span-2">
            <img src={ambience} alt="صالة المطعم بأجوائها الدافئة" loading="lazy" width={1024} height={768} className="h-72 w-full object-cover" />
          </div>
          <div className="reveal flex flex-col justify-between rounded-2xl border bg-card p-8">
            <div>
              <h3 className="font-display text-3xl">مواعيدنا</h3>
              <dl className="mt-6 space-y-3 text-sm">
                {[["يومياّ", "١ ظهراّ – ١ صباحاّ"], ["المطبخ", "١٢ ظهراّ – ١٢ منتصف الليل"], ["التوصيل", "١ ظهراّ – ١١ مساءاّ"]].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between border-b border-border pb-2">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="font-bold">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-8 space-y-1 text-sm text-muted-foreground">
              <p>شارع التحرير، وسط البلد، القاهرة</p>
              <p dir="ltr" className="text-right">02 2345 6789</p>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-card py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal text-center">
            <p className="eyebrow">آراء الضيوف</p>
            <h2 className="font-display mt-3 text-5xl">ماذا يقول من جلسوا معنا</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.name} className="reveal rounded-2xl border bg-background p-8">
                <div className="text-primary" aria-label="تقييم ٥ من ٥">★★★★★</div>
                <blockquote className="mt-4 leading-relaxed">«{r.text}»</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4 text-sm">
                  <span className="font-display text-2xl text-primary">{r.name[0]}</span>
                  <span>
                    <span className="block font-bold">{r.name}</span>
                    <span className="block text-xs text-muted-foreground">{r.note}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-6 py-28">
        <div className="reveal text-center">
          <p className="eyebrow">أسئلة شائعة</p>
          <h2 className="font-display mt-3 text-5xl">قبل أن تأتي</h2>
        </div>
        <div className="reveal mt-12">
          {faqs.map((f) => (
            <details key={f.q} className="faq">
              <summary>{f.q}<span className="text-primary">+</span></summary>
              <p className="pb-5 leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="book" className="mx-auto max-w-xl px-6 pb-28">
        <div className="text-center">
          <p className="eyebrow">الحجز</p>
          <h2 className="font-display mt-3 text-5xl">احجز طاولتك</h2>
        </div>
        {sent ? (
          <div className="mt-10 rounded-lg border border-primary p-8 text-center">
            <p className="text-lg">شكراّ لك! سنتواصل معك لتأكيد الحجز 🔥</p>
            {count > 0 && (
              <p className="mt-4 text-sm text-muted-foreground">
                طلبك المسجّل: {ar(count)} أطباق بإجمالي {ar(total)} ج.م — سنحضره على طاولتك.
              </p>
            )}
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-10 grid gap-4">
            {count > 0 && (
              <div className="rounded-lg border border-primary/40 bg-primary/5 p-4 text-sm">
                <p className="font-bold text-primary">طلبك ({ar(count)} أطباق · {ar(total)} ج.م)</p>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  {Object.entries(order).map(([name, qty]) => (
                    <li key={name} className="flex justify-between">
                      <span>{name}</span>
                      <span>{ar(qty)}×</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <input required placeholder="الاسم" className="field" />
            <input required type="tel" placeholder="رقم الهاتف" className="field" />
            <div className="grid grid-cols-2 gap-4">
              <input required type="date" className="field" />
              <input required type="time" className="field" />
            </div>
            <input required type="number" min={1} max={20} placeholder="عدد الأشخاص" className="field" />
            <textarea rows={3} placeholder="ملاحظات (مناسبة، مكان الجلوس، حساسية طعام...)" className="field" />
            <button className="btn-ember mt-2">تأكيد الحجز</button>
          </form>
        )}
      </section>

      {count > 0 && !sent && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
            <p className="text-sm">
              <span className="font-bold text-primary">{ar(count)} أطباق</span>
              <span className="mx-2 text-muted-foreground">·</span>
              <span>{ar(total)} ج.م</span>
            </p>
            <div className="flex items-center gap-3">
              <button onClick={() => setOrder({})} className="text-xs text-muted-foreground hover:text-destructive">إفراغ الطلب</button>
              <a href="#book" className="btn-ember text-sm">أكمل الحجز</a>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t pb-28 pt-12 md:pb-12">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
          <div>
            <p className="font-display text-3xl text-primary">جمر</p>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">مشويات على الفحم في قلب القاهرة منذ ١٩٩٨. نكهة النار بروح الشرق.</p>
          </div>
          <div className="text-sm">
            <p className="font-bold">تواصل</p>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li>شارع التحرير، وسط البلد، القاهرة</li>
              <li dir="ltr" className="text-right">02 2345 6789</li>
              <li>hello@jamr.example</li>
            </ul>
          </div>
          <div className="text-sm">
            <p className="font-bold">تابعنا</p>
            <div className="mt-3 flex gap-3">
              {["انستغرام", "فيسبوك", "تيك توك"].map((s) => (
                <a key={s} href="#" className="rounded-full border border-border px-4 py-1.5 text-xs hover:border-primary hover:text-primary">{s}</a>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground">يومياّ ١ ظهراّ – ١ صباحاّ</p>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-muted-foreground">© جمر 2026 · جميع الحقوق محفوظة</p>
      </footer>
    </div>
  );
}
