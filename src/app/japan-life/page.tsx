import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Compass,
  ExternalLink,
  FileText,
  Landmark,
  Languages,
  LifeBuoy,
  MapPin,
  Plane,
  Printer,
  ShieldCheck,
  Utensils,
} from "lucide-react";
import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import {
  emergencyCards,
  halalRestaurants,
  mapsUrl,
  mosquePlaces,
  officialResources,
  phrasebook,
  scenarios,
  starterChecklists,
  type Place,
} from "@/lib/japan-life";

export const metadata: Metadata = {
  title: "دليل اليابان للعرب | Mahmoud Adel",
  description:
    "دليل عربي عملي للحياة والسفر إلى اليابان: مساجد، مطاعم حلال، روابط رسمية، جمل يابانية، قوائم تجهيز، وطوارئ.",
  alternates: {
    canonical: "/japan-life",
  },
  openGraph: {
    title: "دليل اليابان للعرب",
    description:
      "دليل عربي عملي لأي شخص يعيش في اليابان أو يفكر في السفر إليها.",
    url: "/japan-life",
    type: "website",
  },
};

const resourceCategory = {
  official: "رسمي",
  pdf: "PDF / دليل",
  muslim: "مسلم وحلال",
  daily: "حياة يومية",
  emergency: "طوارئ",
} as const;

function ExternalButton({
  href,
  children,
  icon = "external",
}: {
  href: string;
  children: React.ReactNode;
  icon?: "external" | "map";
}) {
  const Icon = icon === "map" ? MapPin : ExternalLink;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
    >
      <Icon className="h-4 w-4 text-cyan-200" />
      <span>{children}</span>
    </a>
  );
}

function PlaceCard({ place, kind }: { place: Place; kind: "mosque" | "food" }) {
  const Icon = kind === "mosque" ? Landmark : Utensils;
  return (
    <article className="rounded-lg border border-white/10 bg-[#071018] p-5 shadow-xl shadow-black/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
            {place.city} · {place.area}
          </p>
          <h3 className="mt-2 text-xl font-bold text-white">{place.name}</h3>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-200">
          <Icon className="h-5 w-5" />
        </span>
      </div>

      <p className="mt-3 text-sm leading-7 text-slate-300">{place.summary}</p>
      <p className="mt-3 text-sm leading-6 text-slate-400">{place.address}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {place.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-medium text-slate-200"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <ExternalButton href={mapsUrl(`${place.name} ${place.address}`)} icon="map">
          Google Maps
        </ExternalButton>
        <ExternalButton href={place.sourceUrl}>{place.sourceLabel}</ExternalButton>
      </div>
    </article>
  );
}

export default function JapanLifePage() {
  const topPhrases = phrasebook.slice(0, 10);

  return (
    <>
      <Navbar />

      <main
        dir="rtl"
        className="relative min-h-screen overflow-hidden pt-28 text-white"
        style={{ fontFamily: "var(--font-noto-ar), var(--font-geist-sans), sans-serif" }}
      >
        <section className="relative pb-12">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-sm font-semibold text-cyan-100">
                <Compass className="h-4 w-4" />
                دليل عملي للعرب في اليابان
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.15] text-white sm:text-6xl">
                اليابان من أول يوم: سكن، ورق، صلاة، أكل حلال، وطوارئ.
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-9 text-slate-300">
                صفحة واحدة لأي عربي عايش في اليابان أو بيفكر ييجي: روابط رسمية، مساجد،
                مطاعم حلال موثوقة كبداية، جمل يابانية جاهزة، وقوائم تجهيز تقدر تطبعها
                وتحولها PDF.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/japan-life/print"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-200"
                >
                  <Printer className="h-4 w-4" />
                  نسخة طباعة / PDF
                </Link>
                <a
                  href="#maps"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white transition hover:border-white/25 hover:bg-white/[0.08]"
                >
                  <MapPin className="h-4 w-4" />
                  المساجد والمطاعم
                </a>
              </div>
            </div>

            <div className="relative min-h-[440px] overflow-hidden rounded-lg border border-white/10 bg-[#071018] p-5 shadow-2xl shadow-black/30">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-cyan-300 via-emerald-300 to-amber-300" />
              <div className="grid grid-cols-2 gap-3">
                {scenarios.map((scenario, index) => (
                  <div
                    key={scenario.title}
                    className={`rounded-lg border p-4 ${
                      index === 0
                        ? "border-cyan-300/20 bg-cyan-300/10"
                        : index === 1
                          ? "border-emerald-300/20 bg-emerald-300/10"
                          : index === 2
                            ? "border-amber-300/20 bg-amber-300/10"
                            : "border-rose-300/20 bg-rose-300/10"
                    }`}
                  >
                    <p className="text-base font-black text-white">{scenario.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{scenario.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-lg border border-white/10 bg-black/25 p-5">
                <div className="flex items-center gap-2 text-cyan-100">
                  <ShieldCheck className="h-5 w-5" />
                  <h2 className="text-lg font-black">أرقام لازم تتحفظ</h2>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {emergencyCards.map((card) => (
                    <div key={card.number} className="rounded-lg bg-white/[0.04] p-3">
                      <p className="text-2xl font-black text-amber-200">{card.number}</p>
                      <p className="mt-1 text-sm font-bold text-white">{card.title}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-400">{card.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-lg border border-amber-300/20 bg-amber-300/10 p-4">
                <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-amber-200" />
                <p className="text-sm leading-7 text-amber-50">
                  حالة الحلال وساعات العمل ممكن تتغير. اعتبر الدليل نقطة بداية قوية،
                  وراجع الموقع الرسمي أو اتصل بالمكان في نفس اليوم قبل المشوار.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#05070c]/80 py-14">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="flex items-center gap-3">
              <ClipboardList className="h-6 w-6 text-cyan-200" />
              <h2 className="text-3xl font-black">ابدأ من هنا</h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {starterChecklists.map((group) => (
                <article key={group.title} className="rounded-lg border border-white/10 bg-[#071018] p-5">
                  <h3 className="text-xl font-black text-white">{group.title}</h3>
                  <ul className="mt-4 space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-7 text-slate-300">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="maps" className="py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">
                خرائط عملية
              </p>
              <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                مساجد وأماكن صلاة كبداية موثوقة
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                جمعت أهم نقاط البداية في طوكيو، كانساي، ناغويا، وتشيبـا. كل بطاقة فيها
                رابط Google Maps ورابط مصدر للمراجعة.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {mosquePlaces.map((place) => (
                <PlaceCard key={place.name} place={place} kind="mosque" />
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#05070c]/80 py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-200">
                أكل حلال
              </p>
              <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                مطاعم حلال ومسلم فريندلي في طوكيو وكيوتو وأوساكا
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                القائمة مركزة على أماكن تظهر في أدلة متخصصة مثل Japan Muslim Guide و
                Halal Food in Japan. المطاعم الحلال في اليابان لازم تتراجع قبل الزيارة،
                خصوصا الفروع والمنيو وساعات العمل.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {halalRestaurants.map((place) => (
                <PlaceCard key={place.name} place={place} kind="food" />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3">
                  <Languages className="h-6 w-6 text-amber-200" />
                  <h2 className="text-3xl font-black">جمل يابانية جاهزة</h2>
                </div>
                <p className="mt-4 text-base leading-8 text-slate-300">
                  أهم جمل المطعم، الصلاة، البلدية، المستشفى، والسكن. النسخة المطبوعة
                  فيها القائمة كاملة بشكل أوضح.
                </p>
              </div>
              <Link
                href="/japan-life/print#phrases"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-white transition hover:border-amber-200/50 hover:bg-amber-200/10"
              >
                <FileText className="h-4 w-4 text-amber-200" />
                افتح كارت الجمل
              </Link>
            </div>

            <div className="mt-8 overflow-hidden rounded-lg border border-white/10 bg-[#071018]">
              <div className="grid bg-white/[0.05] px-4 py-3 text-sm font-black text-slate-200 md:grid-cols-[0.8fr_1.3fr_1.5fr_1.3fr]">
                <span>الموقف</span>
                <span>العربي</span>
                <span>الياباني</span>
                <span>النطق</span>
              </div>
              {topPhrases.map((phrase) => (
                <div
                  key={`${phrase.situation}-${phrase.japanese}`}
                  className="grid gap-2 border-t border-white/10 px-4 py-4 text-sm leading-7 text-slate-300 md:grid-cols-[0.8fr_1.3fr_1.5fr_1.3fr]"
                >
                  <span className="font-bold text-cyan-100">{phrase.situation}</span>
                  <span>{phrase.arabic}</span>
                  <span dir="ltr" className="text-left font-semibold text-white">
                    {phrase.japanese}
                  </span>
                  <span dir="ltr" className="text-left text-slate-400">
                    {phrase.romaji}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#05070c]/80 py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-rose-200" />
              <h2 className="text-3xl font-black">روابط رسمية وملفات PDF</h2>
            </div>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
              هنا المصادر الثقيلة التي ترجع لها عند القرار: تأشيرة، هجرة، جمارك،
              حياة يومية، كوارث، ومصادر المسلمين في اليابان.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {officialResources.map((resource) => (
                <article key={resource.url} className="rounded-lg border border-white/10 bg-[#071018] p-5">
                  <span className="rounded-md bg-rose-200/10 px-2.5 py-1 text-xs font-black text-rose-100">
                    {resourceCategory[resource.category]}
                  </span>
                  <h3 className="mt-4 text-xl font-black text-white">{resource.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{resource.description}</p>
                  <div className="mt-5">
                    <ExternalButton href={resource.url}>{resource.label}</ExternalButton>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
            <div>
              <div className="flex items-center gap-3">
                <LifeBuoy className="h-6 w-6 text-cyan-200" />
                <h2 className="text-3xl font-black">نظام استخدام سريع</h2>
              </div>
              <p className="mt-4 text-base leading-8 text-slate-300">
                خليه مفتوح على الموبايل أول أسبوع. احفظ الأماكن على الخريطة، اطبع
                قائمة التجهيز، وخلي روابط المصادر الرسمية في المفضلة.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Plane, title: "قبل الوصول", body: "Visit Japan Web، التأشيرة، سكن أول ليلة، مطاعم حول الفندق." },
                { icon: Landmark, title: "بعد الوصول", body: "البلدية، التأمين، البنك، خط الهاتف، وفرز النفايات." },
                { icon: Utensils, title: "كل يوم", body: "راجع الحلال، احفظ المساجد، استخدم الجمل عند المطاعم والطوارئ." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-lg border border-white/10 bg-[#071018] p-5">
                    <Icon className="h-6 w-6 text-cyan-200" />
                    <h3 className="mt-4 text-lg font-black text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{item.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
