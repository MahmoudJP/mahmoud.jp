"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  GitCompareArrows,
  ShieldCheck,
  FlipHorizontal,
  Type,
  FileStack,
  PackageCheck,
  Calculator,
  Kanban,
  Zap,
  Cloud,
  Lock,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Particles } from "@/components/Particles";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useT } from "@/lib/i18n";

const iconMap = {
  compare: GitCompareArrows,
  shield: ShieldCheck,
  flip: FlipHorizontal,
  type: Type,
  stack: FileStack,
  package: PackageCheck,
  calc: Calculator,
  kanban: Kanban,
};

const featureStyles = [
  { iconColor: "text-cyan-300", iconBg: "bg-cyan-500/10", ring: "group-hover:ring-cyan-400/30", glow: "group-hover:shadow-cyan-500/20", hoverBorder: "hover:border-cyan-500/40" },
  { iconColor: "text-emerald-300", iconBg: "bg-emerald-500/10", ring: "group-hover:ring-emerald-400/30", glow: "group-hover:shadow-emerald-500/20", hoverBorder: "hover:border-emerald-500/40" },
  { iconColor: "text-purple-300", iconBg: "bg-purple-500/10", ring: "group-hover:ring-purple-400/30", glow: "group-hover:shadow-purple-500/20", hoverBorder: "hover:border-purple-500/40" },
  { iconColor: "text-amber-300", iconBg: "bg-amber-500/10", ring: "group-hover:ring-amber-400/30", glow: "group-hover:shadow-amber-500/20", hoverBorder: "hover:border-amber-500/40" },
  { iconColor: "text-rose-300", iconBg: "bg-rose-500/10", ring: "group-hover:ring-rose-400/30", glow: "group-hover:shadow-rose-500/20", hoverBorder: "hover:border-rose-500/40" },
  { iconColor: "text-blue-300", iconBg: "bg-blue-500/10", ring: "group-hover:ring-blue-400/30", glow: "group-hover:shadow-blue-500/20", hoverBorder: "hover:border-blue-500/40" },
  { iconColor: "text-orange-300", iconBg: "bg-orange-500/10", ring: "group-hover:ring-orange-400/30", glow: "group-hover:shadow-orange-500/20", hoverBorder: "hover:border-orange-500/40" },
  { iconColor: "text-indigo-300", iconBg: "bg-indigo-500/10", ring: "group-hover:ring-indigo-400/30", glow: "group-hover:shadow-indigo-500/20", hoverBorder: "hover:border-indigo-500/40" },
];

const stackIcons = [Zap, Cloud, Lock];

const t = {
  en: {
    back: "Projects",
    year: "2025 — Present",
    status: "In Development",
    title: "DTP Master",
    tagline: "An all-in-one Windows desktop toolkit for Desktop Publishing professionals working with multilingual documents.",
    whyP1: "Working as a DTP operator on Arabic, Japanese, and English documents, I kept jumping between a dozen utilities — one for PDF diff, another for text extraction, a third for mirror checks, more for quotes, file packaging, and delivery tracking. Each tool solved a piece of the problem and none of them talked to each other.",
    whyP2: "DTP Master bundles the whole workflow into a single application built for the multilingual DTP space — with particular attention to Arabic right-to-left correctness, which most generic tools get wrong.",
    insideKicker: "What's inside",
    modulesLabel: (n: number) => `${n} modules`,
    evolveNote: "The app evolves quickly — features and UI change with every release.",
    stackKicker: "Built with",
    ctaTitle: "Interested in early access?",
    ctaSub: "Reach out to follow progress or try an early build.",
    ctaButton: "Get in touch",
    features: [
      { key: "compare", name: "Document comparison", description: "Side-by-side PDF↔PDF, PDF↔Word, and InDesign↔Word diffing. Catches text, formatting, and layout drift before delivery." },
      { key: "shield", name: "Smart QC", description: "Automated checks for multilingual documents — spelling, punctuation, number consistency, and common DTP mistakes." },
      { key: "flip", name: "Arabic mirror check", description: "Specialized verification for right-to-left layouts. Flags unmirrored elements, broken shaping, and bidirectional text issues." },
      { key: "type", name: "Font fixer & text tools", description: "Resolve missing-font issues, extract text from PDFs, compare blocks, and manage a reusable snippets library." },
      { key: "stack", name: "PDF studio", description: "Edit pages, crop, reorder, and compress — with granular control over output size and quality." },
      { key: "package", name: "Delivery packager", description: "Bundle final files, generate quotes, and track jobs with built-in job-bag templates." },
      { key: "calc", name: "Quote calculator", description: "Project pricing based on page count, language pair, complexity, and turnaround." },
      { key: "kanban", name: "Project tracker", description: "Lightweight in-app project management and contact book — no external tools, no subscription fees." },
    ] as const,
    stack: [
      { label: "Python + Nuitka", detail: "Compiled to native machine code for speed and protection." },
      { label: "Firebase", detail: "Auth, data sync, and a silent auto-updater pipeline." },
      { label: "Inno Setup + code signing", detail: "Signed Windows installer with auto-installed certificate." },
    ],
  },
  ja: {
    back: "プロジェクト一覧",
    year: "2025年 — 現在",
    status: "開発中",
    title: "DTP Master",
    tagline: "多言語ドキュメントを扱うDTPプロフェッショナル向けの、オールインワンWindowsデスクトップツール。",
    whyP1: "アラビア語・日本語・英語のドキュメントを扱うDTPオペレーターとして働く中で、PDF差分比較、テキスト抽出、ミラーチェック、見積もり、納品パッケージングなど、十数個の別々のツールを行き来する日々でした。それぞれのツールは問題の一部しか解決できず、互いに連携もしません。",
    whyP2: "DTP Masterは、こうしたワークフロー全体を1つのアプリケーションに統合しました。多言語DTPの現場を念頭に設計されており、特にアラビア語の右から左へのレイアウト処理について、一般的なツールが見落としがちな部分まで細やかに対応しています。",
    insideKicker: "搭載機能",
    modulesLabel: (n: number) => `${n}機能`,
    evolveNote: "アプリは継続的に進化中 — 機能とUIはリリースごとに更新されます。",
    stackKicker: "使用技術",
    ctaTitle: "早期アクセスに興味はありますか?",
    ctaSub: "進捗の追跡や早期版のお試しをご希望の方はお気軽にご連絡ください。",
    ctaButton: "お問い合わせ",
    features: [
      { key: "compare", name: "ドキュメント比較", description: "PDF↔PDF、PDF↔Word、InDesign↔Word の並列差分表示。納品前にテキスト・書式・レイアウトのずれを検出します。" },
      { key: "shield", name: "スマートQC", description: "多言語ドキュメント向けの自動チェック — スペル、句読点、数字の整合性、DTP特有のミスを検出。" },
      { key: "flip", name: "アラビア語ミラーチェック", description: "右から左へのレイアウトに特化した検証。ミラー処理漏れ、字形崩れ、双方向テキストの問題を指摘します。" },
      { key: "type", name: "フォント修復・テキストツール", description: "不足フォントの解決、PDFからのテキスト抽出、ブロック比較、再利用可能なスニペットライブラリの管理。" },
      { key: "stack", name: "PDFスタジオ", description: "ページの編集、トリミング、並び替え、圧縮。出力サイズと品質を細かく制御できます。" },
      { key: "package", name: "納品パッケージャー", description: "最終ファイルのバンドル、見積もり生成、ジョブバッグテンプレートによる案件管理。" },
      { key: "calc", name: "見積もり計算", description: "ページ数、言語ペア、難易度、納期に基づくプロジェクト価格設定。" },
      { key: "kanban", name: "プロジェクト管理", description: "アプリ内の軽量プロジェクト管理と連絡先管理 — 外部ツール不要、月額料金なし。" },
    ] as const,
    stack: [
      { label: "Python + Nuitka", detail: "ネイティブマシンコードにコンパイル。高速かつ保護された実行環境。" },
      { label: "Firebase", detail: "認証、データ同期、サイレント自動アップデートのパイプライン。" },
      { label: "Inno Setup + コード署名", detail: "証明書自動インストール付きの署名済みWindowsインストーラー。" },
    ],
  },
};

export default function DtpMasterPage() {
  const text = useT(t);

  return (
    <>
      <Navbar />

      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0e1b2c_0%,_#0a0a0a_70%)]" />
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <Particles />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {text.back}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-3 mb-5 text-xs flex-wrap"
          >
            <span className="font-mono text-gray-500">{text.year}</span>
            <span className="text-gray-700">·</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-cyan-500/30 text-cyan-300 bg-cyan-500/10">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </span>
              {text.status}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-[1.02]"
          >
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
              {text.title}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl"
          >
            {text.tagline}
          </motion.p>
        </div>
      </section>

      <main className="relative pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mb-20 space-y-5 text-gray-400 leading-relaxed text-base md:text-lg"
          >
            <p>{text.whyP1}</p>
            <p>{text.whyP2}</p>
          </motion.section>

          <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mb-20"
          >
            <motion.div variants={fadeInUp} custom={0} className="flex items-baseline justify-between mb-8">
              <h2 className="text-sm uppercase tracking-[0.2em] text-gray-500">
                {text.insideKicker}
              </h2>
              <span className="text-xs text-gray-600 font-mono">{text.modulesLabel(text.features.length)}</span>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-4">
              {text.features.map((f, i) => {
                const s = featureStyles[i];
                const Icon = iconMap[f.key as keyof typeof iconMap];
                return (
                  <motion.div
                    key={f.key}
                    variants={fadeInUp}
                    custom={i + 1}
                    whileHover={{ y: -3 }}
                    className={`group relative rounded-xl border border-gray-800 bg-[#0f0f14] p-5 transition-all duration-300 shadow-[0_0_0_0_transparent] hover:shadow-lg ${s.hoverBorder} ${s.glow}`}
                  >
                    <div className="relative">
                      <div className={`inline-flex items-center justify-center w-11 h-11 rounded-lg ${s.iconBg} ring-1 ring-white/5 ${s.ring} transition-all duration-300 mb-4 group-hover:scale-110`}>
                        <Icon className={`w-5 h-5 ${s.iconColor}`} />
                      </div>
                      <h3 className="text-white font-semibold mb-2 leading-snug">{f.name}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {f.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <p className="text-gray-600 text-xs mt-6">{text.evolveNote}</p>
          </motion.section>

          <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-20"
          >
            <motion.h2
              variants={fadeInUp}
              custom={0}
              className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-8"
            >
              {text.stackKicker}
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-4">
              {text.stack.map((s, i) => {
                const Icon = stackIcons[i];
                return (
                  <motion.div
                    key={s.label}
                    variants={fadeInUp}
                    custom={i + 1}
                    className="rounded-xl border border-gray-800 bg-[#0f0f14] p-5"
                  >
                    <Icon className="w-5 h-5 text-purple-300/90 mb-3" />
                    <h3 className="text-white font-medium mb-2">{s.label}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{s.detail}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 p-8 md:p-10"
          >
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{text.ctaTitle}</h2>
                <p className="text-gray-400">{text.ctaSub}</p>
              </div>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 whitespace-nowrap self-start"
              >
                {text.ctaButton}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
