"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Particles } from "@/components/Particles";
import { useT } from "@/lib/i18n";

type AppItem = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  accent: string;
};

const KORYUU_URL = "https://koryuu.com";

// Visual accent per app (matches the Koryuu site).
const ACCENTS: Record<string, string> = {
  "dtp-master": "from-cyan-500/20 via-cyan-500/5 to-transparent",
  "jlpt-master": "from-rose-500/20 via-rose-500/5 to-transparent",
  supernotch: "from-violet-500/20 via-violet-500/5 to-transparent",
  switcher: "from-emerald-500/20 via-emerald-500/5 to-transparent",
  "cloudops-associate": "from-sky-500/20 via-sky-500/5 to-transparent",
  mylife: "from-amber-500/20 via-amber-500/5 to-transparent",
};

const t = {
  en: {
    kicker: "Founder · Koryuu",
    heading: "Koryuu",
    tagline: "Software at the crossroads of cultures.",
    intro:
      "Koryuu (交流, “exchange”) is the software studio I founded — the home for everything I build. From trilingual DTP automation to language-learning tools and native macOS utilities, every project below lives under the Koryuu umbrella, each one born from a real problem in my own work across Arabic, Japanese, and English.",
    visitCta: "Visit koryuu.com",
    inside: "What's inside",
    moreNote: "…and more, with the full story and downloads on koryuu.com.",
    closing: "Explore the full collection",
    apps: [
      { slug: "dtp-master", name: "DTP Master", category: "Production", tagline: "Trilingual desktop-publishing, automated." },
      { slug: "jlpt-master", name: "JLPT Master", category: "Study", tagline: "Japanese, the way Arabic speakers learn it." },
      { slug: "supernotch", name: "SuperNotch", category: "macOS", tagline: "Your MacBook's notch, finally useful." },
      { slug: "switcher", name: "Switcher", category: "macOS", tagline: "Two thumb-keys, one window away." },
      { slug: "cloudops-associate", name: "CloudOps Associate", category: "Study", tagline: "AWS SOA-C03, drilled the right way." },
      { slug: "mylife", name: "Mylife", category: "Personal", tagline: "Track the parts of life that matter." },
    ],
  },
  ja: {
    kicker: "創業者 · Koryuu",
    heading: "Koryuu",
    tagline: "文化の交差点に立つソフトウェア。",
    intro:
      "Koryuu（交流）は、私が手がけるすべてのソフトウェアの拠点として立ち上げたスタジオです。三言語対応のDTP自動化から、言語学習ツール、ネイティブのmacOSユーティリティまで——以下のプロジェクトはすべてKoryuuの傘下にあり、アラビア語・日本語・英語をまたぐ私自身の現場の課題から生まれています。",
    visitCta: "koryuu.com を見る",
    inside: "収録プロジェクト",
    moreNote: "…ほかにも多数。詳細とダウンロードは koryuu.com で。",
    closing: "すべてのプロジェクトを見る",
    apps: [
      { slug: "dtp-master", name: "DTP Master", category: "制作", tagline: "三言語DTPワークフローを自動化。" },
      { slug: "jlpt-master", name: "JLPT Master", category: "学習", tagline: "アラビア語話者のための日本語学習。" },
      { slug: "supernotch", name: "SuperNotch", category: "macOS", tagline: "MacBookのノッチを使えるツールに。" },
      { slug: "switcher", name: "Switcher", category: "macOS", tagline: "親指キー2つでウィンドウ操作。" },
      { slug: "cloudops-associate", name: "CloudOps Associate", category: "学習", tagline: "AWS SOA-C03を効率的に対策。" },
      { slug: "mylife", name: "Mylife", category: "パーソナル", tagline: "大切な日々の習慣を記録。" },
    ],
  },
  ar: {
    kicker: "المؤسس · Koryuu",
    heading: "Koryuu",
    tagline: "برمجيات عند ملتقى الثقافات.",
    intro:
      "Koryuu (交流، أي «التبادل») هو الاستوديو البرمجي الذي أسّسته ليكون بيتاً لكل ما أبنيه. من أتمتة الـDTP ثلاثية اللغات إلى أدوات تعلّم اللغات وأدوات macOS الأصلية — كل المشاريع أدناه تقع تحت مظلة Koryuu، وكلٌّ منها وُلد من مشكلة حقيقية في عملي بين العربية واليابانية والإنجليزية.",
    visitCta: "زيارة koryuu.com",
    inside: "ماذا يضم",
    moreNote: "…والمزيد، مع التفاصيل الكاملة والتنزيلات على koryuu.com.",
    closing: "استكشف المجموعة كاملةً",
    apps: [
      { slug: "dtp-master", name: "DTP Master", category: "إنتاج", tagline: "أتمتة النشر المكتبي ثلاثي اللغات." },
      { slug: "jlpt-master", name: "JLPT Master", category: "تعلّم", tagline: "اليابانية كما يتعلّمها العرب فعلاً." },
      { slug: "supernotch", name: "SuperNotch", category: "macOS", tagline: "نوتش الماك بوك أخيراً مفيد." },
      { slug: "switcher", name: "Switcher", category: "macOS", tagline: "مفتاحان تحت إبهامك ونافذة واحدة بعيدة." },
      { slug: "cloudops-associate", name: "CloudOps Associate", category: "تعلّم", tagline: "تحضير امتحان AWS SOA-C03 كما يجب." },
      { slug: "mylife", name: "Mylife", category: "شخصي", tagline: "تتبّع تفاصيل الحياة التي تهمّك." },
    ],
  },
};

export default function ProjectsPage() {
  const text = useT(t);

  const apps: AppItem[] = text.apps.map((a) => ({
    ...a,
    accent: ACCENTS[a.slug] ?? "from-blue-500/20 via-blue-500/5 to-transparent",
  }));

  return (
    <>
      <Navbar />

      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1a1430_0%,_#0a0a0a_70%)]" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <Particles />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm uppercase tracking-[0.25em] text-indigo-300/80 mb-4"
          >
            {text.kicker}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-4 leading-[1.05]"
          >
            <span className="bg-gradient-to-r from-white via-indigo-100 to-violet-300 bg-clip-text text-transparent">
              {text.heading}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg md:text-xl text-indigo-200/90 mb-5"
          >
            {text.tagline}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mb-8"
          >
            {text.intro}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <a
              href={KORYUU_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/20 transition-all duration-300"
            >
              {text.visitCta}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>
      </section>

      <main className="relative pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-6">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">{text.inside}</p>
            <span className="h-px flex-1 bg-gradient-to-r from-gray-700/60 to-transparent" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {apps.map((app, i) => (
              <motion.a
                key={app.slug}
                href={`${KORYUU_URL}/apps/${app.slug}/`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.5 }}
                className="group relative block rounded-2xl overflow-hidden border border-gray-800 bg-[#0f0f14] hover:border-indigo-500/40 transition-colors duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${app.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative p-5 md:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs px-2.5 py-0.5 rounded-full border border-gray-700 text-gray-400 bg-white/[0.02]">
                      {app.category}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-indigo-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h2 className="text-xl font-bold mt-3 mb-1.5">
                    <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-indigo-200 group-hover:to-violet-300 transition-all duration-500">
                      {app.name}
                    </span>
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed">{app.tagline}</p>
                </div>
              </motion.a>
            ))}
          </div>

          <p className="text-gray-600 text-sm mt-6">{text.moreNote}</p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="mt-14 rounded-2xl border border-indigo-500/25 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent p-8 text-center"
          >
            <p className="text-lg text-gray-200 mb-5">{text.closing}</p>
            <a
              href={KORYUU_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors"
            >
              {text.visitCta}
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
