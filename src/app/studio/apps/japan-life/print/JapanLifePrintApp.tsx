import Link from "next/link";
import {
  emergencyCards,
  halalRestaurants,
  mapsUrl,
  mosquePlaces,
  officialResources,
  phrasebook,
  starterChecklists,
} from "@/lib/japan-life";

export function JapanLifePrintApp() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-white px-5 py-8 text-slate-950 sm:px-10 lg:px-16 print:px-0 print:py-0"
      style={{ fontFamily: "var(--font-noto-ar), var(--font-geist-sans), sans-serif" }}
    >
      <style>{`
        @page { margin: 14mm; }
        @media print {
          .no-print { display: none !important; }
          a { color: #0f172a; text-decoration: none; }
          section { break-inside: avoid; }
          article { break-inside: avoid; }
        }
      `}</style>

      <div className="mx-auto max-w-5xl print:max-w-none">
        <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <Link href="/studio/apps/japan-life" className="font-bold text-slate-700 hover:text-slate-950">
            رجوع للدليل الكامل
          </Link>
          <p className="text-sm text-slate-600">
            من المتصفح اختار Print ثم Save as PDF.
          </p>
        </div>

        <header className="border-b-4 border-slate-950 pb-6">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-slate-500">
            Mahmoud Studio · Japan Life Arabic Pack
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight">
            دليل اليابان للعرب: نسخة طباعة سريعة
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-8 text-slate-700">
            استخدم هذه النسخة كملف PDF أولي قبل السفر أو أول أسبوع في اليابان. راجع
            ساعات العمل وحالة الحلال من المصادر الأصلية قبل الذهاب لأي مكان.
          </p>
        </header>

        <section className="mt-8">
          <h2 className="text-2xl font-black">أرقام الطوارئ</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            {emergencyCards.map((card) => (
              <article key={card.number} className="rounded-lg border-2 border-slate-900 p-4">
                <p className="text-3xl font-black">{card.number}</p>
                <h3 className="mt-1 font-black">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-black">قوائم التجهيز</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {starterChecklists.map((group) => (
              <article key={group.title} className="rounded-lg border border-slate-300 p-4">
                <h3 className="text-xl font-black">{group.title}</h3>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-800">
                  {group.items.map((item) => (
                    <li key={item}>□ {item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="phrases" className="mt-8">
          <h2 className="text-2xl font-black">كارت جمل يابانية</h2>
          <div className="mt-4 overflow-hidden rounded-lg border border-slate-300">
            <div className="grid bg-slate-950 px-3 py-2 text-sm font-black text-white md:grid-cols-[0.75fr_1.25fr_1.5fr_1.25fr]">
              <span>الموقف</span>
              <span>العربي</span>
              <span>الياباني</span>
              <span>النطق</span>
            </div>
            {phrasebook.map((phrase) => (
              <div
                key={`${phrase.situation}-${phrase.japanese}`}
                className="grid gap-2 border-t border-slate-200 px-3 py-3 text-sm leading-6 md:grid-cols-[0.75fr_1.25fr_1.5fr_1.25fr]"
              >
                <span className="font-bold">{phrase.situation}</span>
                <span>{phrase.arabic}</span>
                <span dir="ltr" className="text-left font-semibold">
                  {phrase.japanese}
                </span>
                <span dir="ltr" className="text-left text-slate-700">
                  {phrase.romaji}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-black">مساجد أساسية وروابط خرائط</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {mosquePlaces.map((place) => (
              <article key={place.name} className="rounded-lg border border-slate-300 p-4">
                <h3 className="text-lg font-black">{place.name}</h3>
                <p className="text-sm font-bold text-slate-600">
                  {place.city} · {place.area}
                </p>
                <p className="mt-2 text-sm leading-6">{place.address}</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{place.summary}</p>
                <p className="mt-3 break-all text-xs leading-5 text-slate-600">
                  Maps: {mapsUrl(`${place.name} ${place.address}`)}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-black">مطاعم حلال كبداية</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {halalRestaurants.map((place) => (
              <article key={place.name} className="rounded-lg border border-slate-300 p-4">
                <h3 className="text-lg font-black">{place.name}</h3>
                <p className="text-sm font-bold text-slate-600">
                  {place.city} · {place.area}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{place.summary}</p>
                <p className="mt-3 break-all text-xs leading-5 text-slate-600">
                  Maps: {mapsUrl(`${place.name} ${place.address}`)}
                </p>
                <p className="mt-1 break-all text-xs leading-5 text-slate-600">
                  Source: {place.sourceUrl}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-black">روابط رسمية ومصادر PDF</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {officialResources.map((resource) => (
              <article key={resource.url} className="rounded-lg border border-slate-300 p-4">
                <h3 className="text-lg font-black">{resource.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{resource.description}</p>
                <p className="mt-3 break-all text-xs leading-5 text-slate-600">
                  {resource.url}
                </p>
              </article>
            ))}
          </div>
        </section>

        <footer className="mt-10 border-t border-slate-300 pt-5 text-sm leading-7 text-slate-600">
          هذا الملف نقطة بداية عملية وليس بديلا عن المصدر الرسمي أو نصيحة قانونية أو طبية.
          آخر تحديث ميداني: 23 أغسطس 2026.
        </footer>
      </div>
    </main>
  );
}
