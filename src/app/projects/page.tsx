"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Construction } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Particles } from "@/components/Particles";
import { useT } from "@/lib/i18n";

type Project = {
  slug?: string;
  name: string;
  tagline: string;
  status: string;
  year: string;
  description: string;
  accent: string;
};

const t = {
  en: {
    kicker: "Projects",
    heading: "Things I'm building.",
    sub: "Tools for translation, DTP, and multilingual workflows — built to solve problems I hit in my own day-to-day work.",
    statusInDev: "In Development",
    boardKicker: "On the drawing board",
    projects: [
      {
        slug: "dtp-master",
        name: "DTP Master",
        tagline: "All-in-one desktop toolkit for DTP professionals",
        year: "2025 — Present",
        description: "A Windows desktop app bundling the everyday workflow of a DTP operator — PDF comparison, Smart QC, Arabic mirror checking, font fixing, delivery packaging. One signed, auto-updating tool replacing a dozen scattered utilities.",
      },
    ],
    ideas: [
      "A web-based QC dashboard for Arabic/Japanese translation teams.",
      "A lightweight quote calculator for translation agencies.",
      "A snippets & templates library for DTP teams.",
    ],
  },
  ja: {
    kicker: "プロジェクト",
    heading: "制作中のプロジェクト",
    sub: "翻訳・DTP・多言語ワークフローのためのツール。日々の業務で直面する課題を解決するために自ら制作しています。",
    statusInDev: "開発中",
    boardKicker: "構想中のアイデア",
    projects: [
      {
        slug: "dtp-master",
        name: "DTP Master",
        tagline: "DTPプロフェッショナル向けのオールインワン デスクトップツール",
        year: "2025年 — 現在",
        description: "DTPオペレーターの日常業務をまとめたWindowsデスクトップアプリ。PDF比較、スマートQC、アラビア語ミラーチェック、フォント修復、納品パッケージングなどを1つのアプリに集約。署名済み・自動アップデート対応で、散在していた十数個のユーティリティを置き換えます。",
      },
    ],
    ideas: [
      "アラビア語・日本語翻訳チーム向けのWebベースQCダッシュボード。",
      "翻訳会社向けの軽量な見積もり計算ツール。",
      "DTPチーム向けのスニペット&テンプレートライブラリ。",
    ],
  },
  ar: {
    kicker: "المشاريع",
    heading: "أشياء أبنيها.",
    sub: "أدوات للترجمة وDTP والعمل متعدد اللغات — مصممة لحل مشاكل أواجهها يومياً في عملي.",
    statusInDev: "قيد التطوير",
    boardKicker: "على لوحة الأفكار",
    projects: [
      {
        slug: "dtp-master",
        name: "DTP Master",
        tagline: "أداة مكتبية شاملة لمحترفي DTP",
        year: "2025 — حتى الآن",
        description: "تطبيق سطح مكتب لـWindows يجمع كل مهام مشغّل الـDTP اليومية — مقارنة PDF، مراجعة ذكية، فحص مرآة للعربية، إصلاح الخطوط، تغليف التسليم. أداة واحدة موقّعة ذاتية التحديث تحل محل عشرات الأدوات المبعثرة.",
      },
    ],
    ideas: [
      "لوحة تحكم جودة ويب لفرق الترجمة العربية/اليابانية.",
      "حاسبة عروض أسعار خفيفة لوكالات الترجمة.",
      "مكتبة قصاصات وقوالب لفرق DTP.",
    ],
  },
};

export default function ProjectsPage() {
  const text = useT(t);

  const projects: Project[] = text.projects.map((p, i) => ({
    ...p,
    status: text.statusInDev,
    accent: ["from-cyan-500/20 via-blue-500/10 to-transparent"][i] ?? "",
  }));

  return (
    <>
      <Navbar />

      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1a1a2e_0%,_#0a0a0a_70%)]" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <Particles />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm uppercase tracking-[0.25em] text-blue-300/80 mb-4"
          >
            {text.kicker}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-5 leading-[1.05]"
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              {text.heading}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl"
          >
            {text.sub}
          </motion.p>
        </div>
      </section>

      <main className="relative pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="grid gap-5">
            {projects.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
              >
                {p.slug && (
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group relative block rounded-2xl overflow-hidden border border-gray-800 bg-[#0f0f14] hover:border-cyan-500/40 transition-colors duration-300"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative p-6 md:p-8">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-xs font-mono text-gray-500">{p.year}</span>
                          <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full border border-cyan-500/30 text-cyan-300 bg-cyan-500/10">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping" />
                              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
                            </span>
                            {p.status}
                          </span>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-cyan-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-2">
                        <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-cyan-200 group-hover:to-blue-300 transition-all duration-500">
                          {p.name}
                        </span>
                      </h2>
                      <p className="text-gray-300 mb-3">{p.tagline}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{p.description}</p>
                    </div>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mt-20"
          >
            <div className="flex items-center gap-2 mb-6">
              <Construction className="w-4 h-4 text-amber-400" />
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                {text.boardKicker}
              </p>
            </div>
            <ul className="grid gap-3">
              {text.ideas.map((idea, i) => (
                <motion.li
                  key={idea}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-3 p-4 rounded-xl border border-gray-800/60 bg-[#0d0d12] hover:border-amber-500/30 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-amber-400/80 flex-shrink-0 mt-1" />
                  <span className="text-gray-400 leading-relaxed">{idea}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
