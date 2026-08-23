"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  FileText,
  Home,
  Languages,
  MapPin,
  Moon,
  Plane,
  Printer,
  Search,
  Shield,
  Utensils,
} from "lucide-react";
import {
  emergencyCards,
  halalRestaurants,
  mapsUrl,
  mosquePlaces,
  officialResources,
  phrasebook,
  starterChecklists,
  type Place,
  type ResourceLink,
} from "@/lib/japan-life";

type Tab = "start" | "places" | "food" | "phrases" | "docs";

const tabs: Array<{ id: Tab; label: string; icon: typeof Home }> = [
  { id: "start", label: "البداية", icon: Home },
  { id: "places", label: "الصلاة", icon: Moon },
  { id: "food", label: "الحلال", icon: Utensils },
  { id: "phrases", label: "الجمل", icon: Languages },
  { id: "docs", label: "الملفات", icon: FileText },
];

const categoryLabel: Record<ResourceLink["category"], string> = {
  official: "رسمي",
  pdf: "PDF",
  muslim: "مسلم",
  daily: "حياة",
  emergency: "طوارئ",
};

function includesQuery(value: string, query: string) {
  return value.toLowerCase().includes(query.trim().toLowerCase());
}

function placeText(place: Place) {
  return [place.name, place.city, place.area, place.address, place.summary, place.tags.join(" ")].join(" ");
}

function AppLink({
  href,
  children,
  tone = "dark",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-black transition ${
        tone === "light"
          ? "bg-[#eefaf3] text-[#10251b] hover:bg-white"
          : "border border-[#d9eadf] bg-white text-[#18251d] hover:border-[#9bd7b4]"
      }`}
    >
      {children}
      <ExternalLink className="h-4 w-4" />
    </a>
  );
}

function PlaceCard({ place, kind }: { place: Place; kind: "mosque" | "food" }) {
  return (
    <article className="rounded-2xl border border-[#dce7df] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black text-[#5d7568]">
            {place.city} · {place.area}
          </p>
          <h3 className="mt-1 text-lg font-black leading-7 text-[#101a14]">{place.name}</h3>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e9f7ef] text-[#1c7d52]">
          {kind === "mosque" ? <Moon className="h-5 w-5" /> : <Utensils className="h-5 w-5" />}
        </span>
      </div>
      <p className="mt-3 text-sm leading-7 text-[#53635a]">{place.summary}</p>
      <p className="mt-2 text-xs leading-5 text-[#718079]">{place.address}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {place.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-[#f3f6f1] px-3 py-1 text-xs font-bold text-[#526358]">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <AppLink href={mapsUrl(`${place.name} ${place.address}`)}>
          <MapPin className="h-4 w-4" />
          خرائط
        </AppLink>
        <AppLink href={place.sourceUrl}>{place.sourceLabel}</AppLink>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-[#cad8cf] bg-white/70 p-8 text-center text-sm font-bold text-[#65746b]">
      مفيش نتائج بنفس البحث. جرّب اسم مدينة، مطعم، مسجد، أو كلمة زي تأشيرة.
    </div>
  );
}

export function JapanLifeApp() {
  const [activeTab, setActiveTab] = useState<Tab>("start");
  const [query, setQuery] = useState("");

  const filteredMosques = useMemo(
    () => mosquePlaces.filter((place) => !query.trim() || includesQuery(placeText(place), query)),
    [query],
  );
  const filteredFood = useMemo(
    () => halalRestaurants.filter((place) => !query.trim() || includesQuery(placeText(place), query)),
    [query],
  );
  const filteredPhrases = useMemo(
    () => phrasebook.filter((phrase) => !query.trim() || includesQuery([phrase.situation, phrase.arabic, phrase.japanese, phrase.romaji].join(" "), query)),
    [query],
  );
  const filteredResources = useMemo(
    () => officialResources.filter((resource) => !query.trim() || includesQuery([resource.title, resource.description, resource.label, categoryLabel[resource.category]].join(" "), query)),
    [query],
  );

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#eef2ec] text-[#101a14]"
      style={{ fontFamily: "var(--font-noto-ar), var(--font-geist-sans), sans-serif" }}
    >
      <div className="mx-auto grid min-h-screen max-w-7xl gap-0 lg:grid-cols-[310px_1fr]">
        <aside className="border-b border-[#d4ded7] bg-[#10251b] px-5 py-5 text-white lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-l">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black text-[#98d8b5]">Private app</p>
              <h1 className="mt-1 text-2xl font-black">Japan Life</h1>
            </div>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e1bd69] text-lg font-black text-[#10251b]">
              JP
            </span>
          </div>

          <div className="mt-6 rounded-2xl bg-white/8 p-4">
            <p className="text-sm leading-7 text-[#dcebe2]">
              تطبيق خاص لترتيب حياة العرب في اليابان: ورق، صلاة، أكل حلال، جمل، وروابط رسمية.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            {emergencyCards.map((card) => (
              <div key={card.number} className="rounded-2xl bg-white/8 p-3">
                <strong className="block text-xl text-[#ffe09a]">{card.number}</strong>
                <span className="mt-1 block text-xs font-bold text-[#dcebe2]">{card.title}</span>
              </div>
            ))}
          </div>

          <nav className="mt-5 grid gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const selected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex min-h-12 items-center gap-3 rounded-2xl px-4 text-right text-sm font-black transition ${
                    selected ? "bg-[#e9f7ef] text-[#10251b]" : "bg-white/5 text-[#dcebe2] hover:bg-white/10"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-5 rounded-2xl border border-[#ffd98c]/25 bg-[#ffd98c]/12 p-4">
            <div className="flex items-center gap-2 text-[#ffe09a]">
              <Shield className="h-5 w-5" />
              <strong>خاص وغير مفهرس</strong>
            </div>
            <p className="mt-2 text-xs leading-6 text-[#eadfc7]">
              الصفحة لا تظهر في القائمة العامة ولا الـ sitemap، والدخول محمي بحساب Studio.
            </p>
          </div>
        </aside>

        <section className="min-w-0 px-4 py-5 sm:px-6 lg:px-8">
          <header className="rounded-3xl border border-[#d4ded7] bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-xs font-black text-[#5c7467]">دليل عملي قابل للتحويل لموبايل لاحقا</p>
                <h2 className="mt-1 text-3xl font-black leading-tight sm:text-4xl">
                  كل حاجة مهمة في اليابان، مرتبة للاستخدام اليومي.
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/studio"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#d9eadf] px-4 text-sm font-black text-[#10251b] hover:border-[#9bd7b4]"
                >
                  Studio
                </Link>
                <Link
                  href="/japan-life/print"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#10251b] px-4 text-sm font-black text-white hover:bg-[#183829]"
                >
                  <Printer className="h-4 w-4" />
                  طباعة / PDF
                </Link>
              </div>
            </div>

            <label className="mt-5 flex min-h-12 items-center gap-3 rounded-2xl border border-[#d9eadf] bg-[#f8faf7] px-4">
              <Search className="h-5 w-5 text-[#62766b]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="ابحث: طوكيو، مسجد، رامن، تأشيرة، مستشفى..."
                className="h-12 min-w-0 flex-1 bg-transparent text-base font-bold outline-none placeholder:text-[#829087]"
              />
            </label>
          </header>

          {activeTab === "start" && (
            <div className="mt-5 grid gap-5">
              <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
                <article className="rounded-3xl border border-[#d4ded7] bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Plane className="h-6 w-6 text-[#1c7d52]" />
                    <h3 className="text-2xl font-black">ابدأ حسب حالتك</h3>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      ["سائح", "Visit Japan Web، الفندق، مسجد قريب، مطاعم حول خط السير."],
                      ["طالب", "البلدية، التأمين، البنك، بطاقة الطالب، سكن قريب من المواصلات."],
                      ["شغل", "عقد العمل، التأمين، الضرائب، السكن، وحقوقك من بوابة الهجرة."],
                      ["مقيم", "روتين أوراق، طوارئ، أكل آمن، وروابط رسمية مفضلة."],
                    ].map(([title, body]) => (
                      <div key={title} className="rounded-2xl bg-[#f4f7f2] p-4">
                        <strong className="text-lg">{title}</strong>
                        <p className="mt-2 text-sm leading-7 text-[#5b6a61]">{body}</p>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="rounded-3xl border border-[#d4ded7] bg-[#10251b] p-5 text-white shadow-sm">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-1 h-6 w-6 text-[#ffe09a]" />
                    <div>
                      <h3 className="text-2xl font-black">قاعدة الثقة</h3>
                      <p className="mt-3 text-sm leading-7 text-[#dcebe2]">
                        اليابان مفيهاش جهة حلال مركزية واحدة لكل الأماكن. قبل ما تروح مطعم،
                        افتح المصدر أو الخرائط واتأكد من ساعات العمل والمنيو والفرع.
                      </p>
                    </div>
                  </div>
                </article>
              </section>

              <section className="grid gap-4 md:grid-cols-2">
                {starterChecklists.map((group) => (
                  <article key={group.title} className="rounded-3xl border border-[#d4ded7] bg-white p-5 shadow-sm">
                    <h3 className="text-xl font-black">{group.title}</h3>
                    <ul className="mt-4 space-y-3">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-7 text-[#53635a]">
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#1c7d52]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </section>
            </div>
          )}

          {activeTab === "places" && (
            <section className="mt-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-2xl font-black">المساجد وأماكن الصلاة</h3>
                <span className="rounded-full bg-white px-3 py-1 text-sm font-black text-[#526358]">{filteredMosques.length}</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredMosques.map((place) => <PlaceCard key={place.name} place={place} kind="mosque" />)}
              </div>
              {!filteredMosques.length && <EmptyState />}
            </section>
          )}

          {activeTab === "food" && (
            <section className="mt-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-2xl font-black">مطاعم حلال كبداية</h3>
                <span className="rounded-full bg-white px-3 py-1 text-sm font-black text-[#526358]">{filteredFood.length}</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredFood.map((place) => <PlaceCard key={place.name} place={place} kind="food" />)}
              </div>
              {!filteredFood.length && <EmptyState />}
            </section>
          )}

          {activeTab === "phrases" && (
            <section className="mt-5 rounded-3xl border border-[#d4ded7] bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-2xl font-black">جمل يابانية جاهزة</h3>
                <span className="rounded-full bg-[#f3f6f1] px-3 py-1 text-sm font-black text-[#526358]">{filteredPhrases.length}</span>
              </div>
              <div className="grid gap-3">
                {filteredPhrases.map((phrase) => (
                  <article key={`${phrase.situation}-${phrase.japanese}`} className="rounded-2xl border border-[#e1e9e3] bg-[#fbfcfa] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full bg-[#e9f7ef] px-3 py-1 text-xs font-black text-[#1c7d52]">{phrase.situation}</span>
                      <span dir="ltr" className="text-left text-sm font-bold text-[#68766d]">{phrase.romaji}</span>
                    </div>
                    <p className="mt-3 text-base font-black">{phrase.arabic}</p>
                    <p dir="ltr" className="mt-2 text-left text-xl font-black text-[#10251b]">{phrase.japanese}</p>
                  </article>
                ))}
              </div>
              {!filteredPhrases.length && <EmptyState />}
            </section>
          )}

          {activeTab === "docs" && (
            <section className="mt-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-2xl font-black">روابط رسمية وملفات</h3>
                <span className="rounded-full bg-white px-3 py-1 text-sm font-black text-[#526358]">{filteredResources.length}</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredResources.map((resource) => (
                  <article key={resource.url} className="rounded-2xl border border-[#dce7df] bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-[#e9f7ef] px-3 py-1 text-xs font-black text-[#1c7d52]">
                        {categoryLabel[resource.category]}
                      </span>
                      <BookOpen className="h-5 w-5 text-[#6b7c72]" />
                    </div>
                    <h4 className="mt-4 text-lg font-black">{resource.title}</h4>
                    <p className="mt-2 text-sm leading-7 text-[#53635a]">{resource.description}</p>
                    <div className="mt-4">
                      <AppLink href={resource.url}>{resource.label}</AppLink>
                    </div>
                  </article>
                ))}
              </div>
              {!filteredResources.length && <EmptyState />}
            </section>
          )}
        </section>
      </div>
    </main>
  );
}
