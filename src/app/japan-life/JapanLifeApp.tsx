"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Compass,
  ExternalLink,
  FileText,
  Languages,
  LocateFixed,
  Map,
  MapPin,
  Moon,
  Navigation,
  Phone,
  Printer,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Store,
  Train,
  Utensils,
} from "lucide-react";
import {
  emergencyCards,
  cityCoverageHubs,
  foodSafetyRules,
  halalMarkets,
  halalRestaurants,
  hubSearchUrl,
  japanLifePlaces,
  mosquePlaces,
  officialResources,
  phrasebook,
  placeDirectionsUrl,
  placeMapsUrl,
  prayerRooms,
  regionGuides,
  starterChecklists,
  type HalalConfidence,
  type JapanLifePlace,
  type JapanLifePlaceKind,
  type ResourceLink,
} from "@/lib/japan-life";

type Tab = "near" | "places" | "food" | "guide" | "phrases" | "official";
type GeoState = { status: "idle" | "loading" | "ready" | "denied" | "unsupported"; lat?: number; lng?: number };

const tabs: Array<{ id: Tab; label: string; icon: typeof Compass }> = [
  { id: "near", label: "اليوم", icon: Compass },
  { id: "places", label: "صلاة", icon: Moon },
  { id: "food", label: "أكل", icon: Utensils },
  { id: "guide", label: "استقرار", icon: ShieldCheck },
  { id: "phrases", label: "ياباني", icon: Languages },
  { id: "official", label: "مصادر", icon: FileText },
];

const kindLabel: Record<JapanLifePlaceKind, string> = {
  mosque: "مسجد",
  prayer: "غرفة صلاة",
  food: "مطعم",
  market: "متجر",
  service: "خدمة",
};

const confidenceLabel: Record<HalalConfidence, string> = {
  certified: "موثق",
  "muslim-owned": "مسلم",
  "muslim-friendly": "مناسب",
  verify: "تحقق",
};

const resourceLabel: Record<ResourceLink["category"], string> = {
  official: "رسمي",
  pdf: "PDF",
  muslim: "مسلم",
  daily: "حياة",
  emergency: "طوارئ",
  apps: "تطبيق",
  transport: "تنقل",
};

const liveSearches = [
  { label: "أقرب مسجد", query: "mosque near me Japan", icon: Moon },
  { label: "أقرب غرفة صلاة", query: "prayer room near me Japan Muslim", icon: Compass },
  { label: "مطعم حلال قريب", query: "halal restaurant near me Japan", icon: Utensils },
  { label: "سوبرماركت حلال", query: "halal grocery near me Japan", icon: Store },
];

const guideTracks = [
  { title: "أول يوم", body: "المطار، الإنترنت، بطاقة المواصلات، أقرب أكل، وأقرب صلاة للفندق.", icon: Train },
  { title: "أول أسبوع", body: "البلدية، التأمين، بنك/دفع، نفايات المنطقة، وأقرب مستشفى.", icon: ShieldCheck },
  { title: "المسلم يوميا", body: "مسجد قريب، مطاعم آمنة، أسئلة المنيو، ومتاجر طبخ للبيت.", icon: Moon },
  { title: "طوارئ", body: "أرقام سريعة، تطبيقات إنذار، مركز إخلاء، وعنوانك بالياباني.", icon: Phone },
];

function includesQuery(value: string, query: string) {
  return value.toLowerCase().includes(query.trim().toLowerCase());
}

function placeText(place: JapanLifePlace) {
  return [place.name, place.city, place.region, place.area, place.address, place.summary, place.tags.join(" "), place.bestFor].join(" ");
}

function distanceKm(from: { lat: number; lng: number }, to: { lat: number; lng: number }) {
  const radius = 6371;
  const dLat = (to.lat - from.lat) * Math.PI / 180;
  const dLng = (to.lng - from.lng) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(from.lat * Math.PI / 180) * Math.cos(to.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDistance(km?: number) {
  if (km == null) return "شغل GPS";
  if (km < 1) return `${Math.round(km * 1000)} م`;
  return `${km.toFixed(km < 10 ? 1 : 0)} كم`;
}

function nearbySearchUrl(query: string, location: { lat: number; lng: number } | null) {
  if (!location) return `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
  return `https://www.google.com/maps/search/${encodeURIComponent(query)}/@${location.lat},${location.lng},14z`;
}

function PlaceKindIcon({ kind, className }: { kind: JapanLifePlaceKind; className?: string }) {
  if (kind === "food") return <Utensils className={className} />;
  if (kind === "market") return <Store className={className} />;
  if (kind === "service") return <Phone className={className} />;
  return <Moon className={className} />;
}

function PlaceCard({ place, distance, compact = false }: { place: JapanLifePlace; distance?: number; compact?: boolean }) {
  return (
    <article className="group rounded-3xl border border-[#dce5df] bg-white p-4 shadow-[0_18px_55px_rgba(24,45,34,.08)] transition hover:-translate-y-0.5 hover:border-[#79c69b]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-black text-[#148355]">{kindLabel[place.kind]} · {place.city} · {place.area}</p>
          <h3 className={`${compact ? "text-base" : "text-xl"} mt-1 font-black leading-7 text-[#12241b]`}>{place.name}</h3>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#eef8f1] text-[#148355]">
          <PlaceKindIcon kind={place.kind} className="h-5 w-5" />
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#fff3cf] px-3 py-1 text-xs font-black text-[#7a5b08]">{confidenceLabel[place.confidence]}</span>
        <span className="rounded-full bg-[#e9f8ef] px-3 py-1 text-xs font-black text-[#148355]">{formatDistance(distance)}</span>
      </div>
      {!compact && <p className="mt-3 text-sm leading-7 text-[#506258]">{place.summary}</p>}
      <p className="mt-2 text-xs leading-6 text-[#758379]">{place.address}</p>
      {!compact && (
        <div className="mt-3 flex flex-wrap gap-2">
          {place.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-full border border-[#dce5df] px-3 py-1 text-[11px] font-bold text-[#617167]">{tag}</span>
          ))}
        </div>
      )}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <a href={placeDirectionsUrl(place)} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[#15291f] px-3 text-sm font-black text-white">
          <Navigation className="h-4 w-4" />
          اتجاهات
        </a>
        <a href={placeMapsUrl(place)} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-[#dce5df] px-3 text-sm font-black text-[#12241b]">
          <MapPin className="h-4 w-4" />
          خرائط
        </a>
      </div>
      {!compact && (
        <a href={place.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-xs font-black text-[#66766c]">
          {place.sourceLabel}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      )}
    </article>
  );
}

function ResourceCard({ resource }: { resource: ResourceLink }) {
  return (
    <article className="rounded-3xl border border-[#dce5df] bg-white p-5 shadow-[0_18px_55px_rgba(24,45,34,.07)]">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-[#e9f8ef] px-3 py-1 text-xs font-black text-[#148355]">{resourceLabel[resource.category]}</span>
        <BookOpen className="h-5 w-5 text-[#63766b]" />
      </div>
      <h3 className="mt-4 text-lg font-black leading-7 text-[#12241b]">{resource.title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#506258]">{resource.description}</p>
      <a href={resource.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-2xl bg-[#15291f] px-3 text-sm font-black text-white">
        {resource.label}
        <ExternalLink className="h-4 w-4" />
      </a>
    </article>
  );
}

export function JapanLifeApp() {
  const [activeTab, setActiveTab] = useState<Tab>("near");
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All");
  const [geo, setGeo] = useState<GeoState>({ status: "idle" });

  const userLocation = useMemo(
    () => geo.status === "ready" && geo.lat != null && geo.lng != null ? { lat: geo.lat, lng: geo.lng } : null,
    [geo.lat, geo.lng, geo.status],
  );
  const cities = useMemo(() => ["All", ...Array.from(new Set(japanLifePlaces.map((place) => place.city))).sort()], []);
  const placesWithDistance = useMemo(() => japanLifePlaces
    .map((place) => ({ place, distance: userLocation ? distanceKm(userLocation, place) : undefined }))
    .sort((a, b) => (a.distance ?? 99999) - (b.distance ?? 99999) || a.place.city.localeCompare(b.place.city)), [userLocation]);

  const filteredPlaces = useMemo(() => {
    const allowedKinds: JapanLifePlaceKind[] = activeTab === "places"
      ? ["mosque", "prayer"]
      : activeTab === "food"
        ? ["food", "market"]
        : ["mosque", "prayer", "food", "market", "service"];
    return placesWithDistance.filter(({ place }) => {
      const cityMatches = city === "All" || place.city === city;
      const kindMatches = allowedKinds.includes(place.kind);
      const queryMatches = !query.trim() || includesQuery(placeText(place), query);
      return cityMatches && kindMatches && queryMatches;
    });
  }, [activeTab, city, placesWithDistance, query]);

  const filteredPhrases = useMemo(
    () => phrasebook.filter((phrase) => !query.trim() || includesQuery([phrase.situation, phrase.arabic, phrase.japanese, phrase.romaji].join(" "), query)),
    [query],
  );
  const filteredResources = useMemo(
    () => officialResources.filter((resource) => !query.trim() || includesQuery([resource.title, resource.description, resource.label, resourceLabel[resource.category]].join(" "), query)),
    [query],
  );

  function requestLocation() {
    if (!("geolocation" in navigator)) {
      setGeo({ status: "unsupported" });
      return;
    }
    setGeo({ status: "loading" });
    navigator.geolocation.getCurrentPosition(
      (position) => setGeo({ status: "ready", lat: position.coords.latitude, lng: position.coords.longitude }),
      () => setGeo({ status: "denied" }),
      { enableHighAccuracy: true, timeout: 9000, maximumAge: 1000 * 60 * 5 },
    );
  }

  const nearestPrayer = placesWithDistance.filter(({ place }) => place.kind === "mosque" || place.kind === "prayer").slice(0, 5);
  const nearestFood = placesWithDistance.filter(({ place }) => place.kind === "food" || place.kind === "market").slice(0, 5);
  const leadPrayer = nearestPrayer[0];
  const leadFood = nearestFood[0];

  return (
    <main dir="rtl" className="min-h-screen bg-[#f5f7f4] text-[#12241b]" style={{ fontFamily: "var(--font-noto-ar), var(--font-geist-sans), sans-serif" }}>
      <section className="border-b border-[#dce5df] bg-[#fbfcfa]">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#15291f] text-lg font-black text-white">JP</span>
              <div>
                <p className="text-xs font-black uppercase tracking-[.2em] text-[#148355]">Private Studio App</p>
                <h1 className="text-xl font-black">Japan Life</h1>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/studio" className="inline-flex min-h-10 items-center justify-center rounded-2xl border border-[#dce5df] bg-white px-3 text-sm font-black">Studio</Link>
              <Link href="/studio/apps/japan-life/print" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-2xl bg-[#15291f] px-3 text-sm font-black text-white">
                <Printer className="h-4 w-4" />
                PDF
              </Link>
            </div>
          </nav>

          <div className="grid gap-5 py-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
            <div className="flex min-h-[560px] flex-col justify-between overflow-hidden rounded-[2.25rem] bg-[#15291f] p-5 text-white shadow-[0_30px_90px_rgba(21,41,31,.2)] sm:p-7">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-[#9be2b9]">GPS-ready</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-[#ffe3a0]">Private</span>
                </div>
                <h2 className="mt-5 max-w-2xl text-5xl font-black leading-[1.04] tracking-tight sm:text-6xl">
                  اليابان من غير توتر: صلاة، أكل، أوراق، وطوارئ.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-[#cbd8d0]">
                  التطبيق بيبدأ من موقعك الحالي: يرتب الأماكن بالإحداثيات، يفتح Google Maps للاتجاهات، ويخليك تراجع المصدر الأصلي قبل ما تتحرك.
                </p>
              </div>

              <div className="mt-8">
                <button onClick={requestLocation} className="flex min-h-16 w-full items-center justify-between gap-4 rounded-3xl bg-[#79d79c] px-5 text-right font-black text-[#07110c]">
                  <span className="flex items-center gap-3"><LocateFixed className="h-5 w-5" /> {geo.status === "loading" ? "بجيب موقعك..." : "شغل موقعي ورتب الأقرب"}</span>
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {liveSearches.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a key={item.label} href={nearbySearchUrl(item.query, userLocation)} target="_blank" rel="noreferrer" className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white/10 px-3 text-sm font-black text-white">
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </a>
                    );
                  })}
                </div>
                {geo.status === "denied" && <p className="mt-3 text-sm font-bold text-[#ffe3a0]">المتصفح قافل الموقع. افتحه أو استخدم المدينة والبحث.</p>}
                {geo.status === "unsupported" && <p className="mt-3 text-sm font-bold text-[#ffe3a0]">المتصفح الحالي لا يدعم GPS.</p>}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[2.25rem] border border-[#dce5df] bg-white p-4 shadow-[0_25px_70px_rgba(24,45,34,.1)]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-black text-[#148355]">{userLocation ? "مرتب حسب موقعك الحالي" : "شغل GPS للترتيب الحقيقي"}</p>
                    <h3 className="mt-1 text-3xl font-black">لو خرجت دلوقتي</h3>
                  </div>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#f0f5f1] text-[#15291f]">
                    <Map className="h-5 w-5" />
                  </span>
                </div>

                <div className="mt-4 grid gap-3 lg:grid-cols-2">
                  {leadPrayer && <PlaceCard place={leadPrayer.place} distance={leadPrayer.distance} compact />}
                  {leadFood && <PlaceCard place={leadFood.place} distance={leadFood.distance} compact />}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-4">
                <div className="rounded-3xl border border-[#dce5df] bg-white p-4">
                  <strong className="block text-3xl font-black">{mosquePlaces.length + prayerRooms.length}</strong>
                  <span className="text-sm font-bold text-[#66766c]">صلاة بإحداثيات</span>
                </div>
                <div className="rounded-3xl border border-[#dce5df] bg-white p-4">
                  <strong className="block text-3xl font-black">{halalRestaurants.length + halalMarkets.length}</strong>
                  <span className="text-sm font-bold text-[#66766c]">أكل ومتاجر</span>
                </div>
                <div className="rounded-3xl border border-[#dce5df] bg-white p-4">
                  <strong className="block text-3xl font-black">{cityCoverageHubs.length}</strong>
                  <span className="text-sm font-bold text-[#66766c]">مدينة مغطاة</span>
                </div>
                <div className="rounded-3xl border border-[#dce5df] bg-white p-4">
                  <strong className="block text-3xl font-black">{phrasebook.length}</strong>
                  <span className="text-sm font-bold text-[#66766c]">جملة يابانية</span>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {guideTracks.map((track) => {
                  const Icon = track.icon;
                  return (
                    <article key={track.title} className="rounded-3xl border border-[#dce5df] bg-white p-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#fff3cf] text-[#7a5b08]"><Icon className="h-4 w-4" /></span>
                        <h3 className="font-black">{track.title}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-[#506258]">{track.body}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-20 border-b border-[#dce5df] bg-[#f5f7f4]/90 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 py-3 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
          <label className="flex min-h-12 items-center gap-3 rounded-2xl border border-[#dce5df] bg-white px-4 shadow-[0_12px_40px_rgba(24,45,34,.06)]">
            <Search className="h-5 w-5 text-[#758379]" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث: أساكوسا، رامن، مسجد، مطار، تأشيرة..." className="h-12 min-w-0 flex-1 bg-transparent text-base font-bold outline-none placeholder:text-[#87958d]" />
          </label>
          <label className="flex h-12 items-center gap-2 rounded-2xl border border-[#dce5df] bg-white px-4 font-black shadow-[0_12px_40px_rgba(24,45,34,.06)]">
            <SlidersHorizontal className="h-4 w-4 text-[#758379]" />
            <select value={city} onChange={(event) => setCity(event.target.value)} className="h-10 bg-transparent text-sm font-black outline-none">
              {cities.map((item) => <option key={item} value={item}>{item === "All" ? "كل المدن" : item}</option>)}
            </select>
          </label>
          <nav className="flex gap-2 overflow-x-auto lg:col-span-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex min-h-11 shrink-0 items-center gap-2 rounded-2xl px-4 text-sm font-black ${activeTab === tab.id ? "bg-[#15291f] text-white" : "border border-[#dce5df] bg-white text-[#506258]"}`}><Icon className="h-4 w-4" />{tab.label}</button>;
            })}
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {activeTab === "near" && (
          <div className="grid gap-6">
            <section className="grid gap-4 lg:grid-cols-2">
              <div>
                <div className="mb-3 flex items-center justify-between"><h3 className="text-2xl font-black">أقرب صلاة</h3><span className="text-sm font-black text-[#148355]">{userLocation ? "حسب GPS" : "اضغط زر الموقع"}</span></div>
                <div className="grid gap-3">{nearestPrayer.map(({ place, distance }) => <PlaceCard key={place.id} place={place} distance={distance} />)}</div>
              </div>
              <div>
                <div className="mb-3 flex items-center justify-between"><h3 className="text-2xl font-black">أقرب أكل/متجر</h3><span className="text-sm font-black text-[#148355]">{userLocation ? "مرتب بالأقرب" : "داتا البداية"}</span></div>
                <div className="grid gap-3">{nearestFood.map(({ place, distance }) => <PlaceCard key={place.id} place={place} distance={distance} />)}</div>
              </div>
            </section>
            <section className="grid gap-3 md:grid-cols-5">
              {regionGuides.map((region) => (
                <article key={region.region} className="rounded-3xl border border-[#dce5df] bg-white p-4">
                  <h3 className="font-black text-[#15291f]">{region.region}</h3>
                  <p className="mt-1 text-xs font-bold text-[#66766c]">{region.cities}</p>
                  <p className="mt-3 text-sm leading-7 text-[#506258]">{region.summary}</p>
                </article>
              ))}
            </section>
            <section>
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-2xl font-black">تغطية اليابان بالمدن</h3>
                <span className="text-sm font-black text-[#148355]">بحث حي على الخرائط</span>
              </div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {cityCoverageHubs.map((hub) => (
                  <article key={`${hub.city}-${hub.center}`} className="rounded-3xl border border-[#dce5df] bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-black text-[#148355]">{hub.region} · {hub.center}</p>
                        <h4 className="mt-1 text-xl font-black">{hub.city}</h4>
                      </div>
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#eef8f1] text-[#148355]"><MapPin className="h-4 w-4" /></span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[#506258]">{hub.note}</p>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <a href={hubSearchUrl(hub, "halal restaurant")} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-2xl bg-[#15291f] px-3 text-sm font-black text-white"><Utensils className="h-4 w-4" />أكل</a>
                      <a href={hubSearchUrl(hub, "mosque prayer room Muslim")} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-2xl border border-[#dce5df] px-3 text-sm font-black"><Moon className="h-4 w-4" />صلاة</a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}

        {(activeTab === "places" || activeTab === "food") && (
          <section>
            <div className="mb-4 flex items-center justify-between gap-3"><h3 className="text-2xl font-black">{activeTab === "places" ? "المساجد وغرف الصلاة" : "مطاعم ومتاجر حلال"}</h3><span className="rounded-full bg-[#e9f8ef] px-3 py-1 text-sm font-black text-[#148355]">{filteredPlaces.length}</span></div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filteredPlaces.map(({ place, distance }) => <PlaceCard key={place.id} place={place} distance={distance} />)}</div>
            {!filteredPlaces.length && <div className="rounded-3xl border border-dashed border-[#cdd8d1] bg-white p-8 text-center font-bold text-[#66766c]">مفيش نتيجة. غير المدينة أو البحث.</div>}
          </section>
        )}

        {activeTab === "guide" && (
          <section className="grid gap-5 lg:grid-cols-[1fr_.8fr]">
            <div className="grid gap-4 md:grid-cols-2">
              {starterChecklists.map((group) => (
                <article key={group.title} className="rounded-3xl border border-[#dce5df] bg-white p-5">
                  <h3 className="text-xl font-black">{group.title}</h3>
                  <ul className="mt-4 space-y-3">{group.items.map((item) => <li key={item} className="flex gap-3 text-sm leading-7 text-[#506258]"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#148355]" />{item}</li>)}</ul>
                </article>
              ))}
            </div>
            <aside className="rounded-3xl border border-[#f1d690] bg-[#fff8e5] p-5">
              <div className="flex items-center gap-3 text-[#7a5b08]"><AlertTriangle className="h-5 w-5" /><h3 className="text-xl font-black">قواعد الأكل الآمن</h3></div>
              <div className="mt-4 grid gap-3">{foodSafetyRules.map((rule) => <p key={rule} className="rounded-2xl bg-white p-3 text-sm leading-7 text-[#5d4c1f]">{rule}</p>)}</div>
              <div className="mt-5 grid gap-3">
                {emergencyCards.map((card) => (
                  <article key={card.number} className="rounded-2xl bg-white p-4">
                    <p className="text-3xl font-black text-[#15291f]">{card.number}</p>
                    <h4 className="mt-1 font-black">{card.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-[#5d4c1f]">{card.body}</p>
                  </article>
                ))}
              </div>
            </aside>
          </section>
        )}

        {activeTab === "phrases" && (
          <section className="grid gap-3 md:grid-cols-2">
            {filteredPhrases.map((phrase) => (
              <article key={`${phrase.situation}-${phrase.japanese}`} className="rounded-3xl border border-[#dce5df] bg-white p-4">
                <div className="flex items-center justify-between gap-3"><span className="rounded-full bg-[#e9f8ef] px-3 py-1 text-xs font-black text-[#148355]">{phrase.situation}</span><span dir="ltr" className="text-left text-sm font-bold text-[#66766c]">{phrase.romaji}</span></div>
                <p className="mt-4 text-lg font-black">{phrase.arabic}</p>
                <p dir="ltr" className="mt-2 text-left text-2xl font-black">{phrase.japanese}</p>
              </article>
            ))}
          </section>
        )}

        {activeTab === "official" && (
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredResources.map((resource) => <ResourceCard key={resource.url} resource={resource} />)}
          </section>
        )}
      </div>
    </main>
  );
}
