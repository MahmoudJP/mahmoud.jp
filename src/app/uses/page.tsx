"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Languages as LanguagesIcon,
  Mic,
  Code2,
  Monitor,
  Globe,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Particles } from "@/components/Particles";
import { useT } from "@/lib/i18n";

type Tool = { name: string; note: string };
type Group = {
  id: string;
  title: string;
  blurb: string;
  icon: "file" | "lang" | "mic" | "code" | "monitor" | "globe";
  accent: string;
  tools: Tool[];
};

const iconMap = {
  file: FileText,
  lang: LanguagesIcon,
  mic: Mic,
  code: Code2,
  monitor: Monitor,
  globe: Globe,
};

const t = {
  en: {
    kicker: "Uses",
    heading: "What I work with.",
    sub: "The tools, software, and workflow I rely on day-to-day for DTP, translation, interpretation, and building things.",
    footnote: "Updated periodically. Happy to answer questions about any of these — drop me a line.",
    groups: [
      {
        id: "dtp",
        title: "DTP & Design",
        blurb: "The core of my daily work — multilingual layout, PDF prep, and delivery.",
        icon: "file" as const,
        accent: "from-cyan-500/20 via-blue-500/10 to-transparent",
        tools: [
          { name: "Adobe InDesign", note: "Primary layout tool for AR / JA / EN documents." },
          { name: "Adobe Illustrator", note: "Logos, vector assets, complex typographic work." },
          { name: "Adobe Photoshop", note: "Image prep, retouching, print-ready rasters." },
          { name: "Adobe Acrobat Pro", note: "PDF comparison, preflight, final delivery checks." },
        ],
      },
      {
        id: "file-languages",
        title: "File Languages",
        blurb: "Scripts I typeset and QC in DTP production — from RTL shaping to CJK rules to Latin diacritics.",
        icon: "globe" as const,
        accent: "from-indigo-500/20 via-sky-500/10 to-transparent",
        tools: [
          { name: "Japanese — 日本語", note: "CJK — horizontal & vertical (tategaki), kinsoku shori, mixed kanji/kana/latin." },
          { name: "English", note: "Latin baseline, standard Western typography." },
          { name: "Arabic — العربية", note: "Right-to-left, contextual shaping, ligatures, kashida, bidirectional text." },
          { name: "Korean — 한국어", note: "Hangul with CJK typesetting rules and punctuation." },
          { name: "Simplified Chinese — 简体中文", note: "CJK with simplified glyph set." },
          { name: "Traditional Chinese — 繁體中文", note: "CJK with traditional glyph set, often vertical setting." },
          { name: "French — Français", note: "Latin with French spacing rules around punctuation (« » : ; ! ?)." },
          { name: "Spanish — Español", note: "Latin with inverted opening punctuation (¿¡) and accented characters." },
          { name: "Italian — Italiano", note: "Latin, standard Western rules with Italian diacritics." },
          { name: "Indonesian — Bahasa Indonesia", note: "Latin alphabet, straightforward Western typesetting." },
        ],
      },
      {
        id: "translation",
        title: "Translation & Localization",
        blurb: "The software and AI tools I use alongside DTP to keep multilingual work consistent.",
        icon: "lang" as const,
        accent: "from-blue-500/20 via-teal-500/10 to-transparent",
        tools: [
          { name: "SDL Trados Studio", note: "Primary CAT tool — TM, glossary, segment-level QC." },
          { name: "Microsoft Word", note: "Track changes review, client-facing deliverables." },
          { name: "ChatGPT", note: "Terminology research, draft translation review, quick cross-language sanity checks." },
          { name: "Google Gemini", note: "Second opinion on translations, especially for JA ↔ AR nuance." },
        ],
      },
      {
        id: "services",
        title: "Interpretation & QC",
        blurb: "Services I provide alongside production work.",
        icon: "mic" as const,
        accent: "from-slate-500/20 via-zinc-500/10 to-transparent",
        tools: [
          { name: "Arabic Language QC", note: "Proofreading and quality checking of Arabic deliverables — catching typesetting issues, shaping errors, and translation inconsistencies." },
          { name: "Simultaneous Interpretation", note: "Occasional live interpretation (AR / JA / EN) for phone and video meetings on short notice." },
        ],
      },
      {
        id: "dev",
        title: "Development",
        blurb: "For building DTP Master and this site.",
        icon: "code" as const,
        accent: "from-amber-500/20 via-orange-500/10 to-transparent",
        tools: [
          { name: "Visual Studio Code", note: "Primary editor." },
          { name: "Claude Code", note: "AI pair-programmer in the terminal — how I build most things now." },
          { name: "Git + GitHub", note: "Version control and hosting." },
          { name: "Next.js + Tailwind CSS", note: "This site's stack — React 19, App Router, TS." },
          { name: "Python + PySide6", note: "DTP Master is built on this." },
        ],
      },
      {
        id: "system",
        title: "Daily System",
        blurb: "The hardware and accounts I actually sit in front of.",
        icon: "monitor" as const,
        accent: "from-teal-500/20 via-cyan-500/10 to-transparent",
        tools: [
          { name: "Windows 11", note: "Primary OS — required for most DTP production tools." },
          { name: "Japanese + Arabic IMEs", note: "Daily input switching between three scripts." },
          { name: "Dual monitor setup", note: "Source document on one screen, target on the other." },
          { name: "iCloud+ Custom Domain", note: "m@mahmoud.jp — professional email through iCloud on my own domain." },
        ],
      },
    ],
  },
  ja: {
    kicker: "使用ツール",
    heading: "普段使っているツール",
    sub: "DTP・翻訳・通訳・開発の日常業務で頼りにしているソフトウェアとワークフロー。",
    footnote: "随時更新しています。各ツールについてのご質問はお気軽にどうぞ。",
    groups: [
      {
        id: "dtp",
        title: "DTP & デザイン",
        blurb: "日常業務の中心 — 多言語レイアウト、PDF準備、納品対応。",
        icon: "file" as const,
        accent: "from-cyan-500/20 via-blue-500/10 to-transparent",
        tools: [
          { name: "Adobe InDesign", note: "アラビア語・日本語・英語ドキュメントのメインレイアウトツール。" },
          { name: "Adobe Illustrator", note: "ロゴ、ベクター素材、複雑なタイポグラフィ作業。" },
          { name: "Adobe Photoshop", note: "画像準備、レタッチ、印刷用ラスター処理。" },
          { name: "Adobe Acrobat Pro", note: "PDF比較、プリフライト、最終納品チェック。" },
        ],
      },
      {
        id: "file-languages",
        title: "対応言語",
        blurb: "DTP制作で組版・QCを行う言語 — RTLのシェイピング、CJKの組版ルール、ラテン系のダイアクリティカルマークまで。",
        icon: "globe" as const,
        accent: "from-indigo-500/20 via-sky-500/10 to-transparent",
        tools: [
          { name: "日本語", note: "CJK — 横組み・縦組み(縦書き)、禁則処理、漢字・仮名・英字混在。" },
          { name: "英語 — English", note: "ラテン文字、標準的な欧文タイポグラフィ。" },
          { name: "アラビア語 — العربية", note: "右から左(RTL)、コンテクスチュアルシェイピング、合字、カシダ、双方向テキスト。" },
          { name: "韓国語 — 한국어", note: "ハングル、CJK組版ルールと句読点対応。" },
          { name: "簡体字中国語 — 简体中文", note: "CJK、簡体字字形セット。" },
          { name: "繁体字中国語 — 繁體中文", note: "CJK、繁体字字形セット、縦組みが多い。" },
          { name: "フランス語 — Français", note: "ラテン文字、フランス語固有の句読点前後スペース処理(« » : ; ! ?)。" },
          { name: "スペイン語 — Español", note: "ラテン文字、開始側の逆転句読点 (¿¡) とアクセント記号対応。" },
          { name: "イタリア語 — Italiano", note: "ラテン文字、標準的な欧文ルールとイタリア語ダイアクリティカルマーク。" },
          { name: "インドネシア語 — Bahasa Indonesia", note: "ラテンアルファベット、シンプルな欧文組版。" },
        ],
      },
      {
        id: "translation",
        title: "翻訳 & ローカライゼーション",
        blurb: "多言語作業の一貫性を保つために併用しているソフトウェアとAIツール。",
        icon: "lang" as const,
        accent: "from-blue-500/20 via-teal-500/10 to-transparent",
        tools: [
          { name: "SDL Trados Studio", note: "メインのCATツール — TM、用語集、セグメント単位のQC。" },
          { name: "Microsoft Word", note: "変更履歴レビュー、クライアント向け成果物。" },
          { name: "ChatGPT", note: "用語調査、翻訳ドラフトのレビュー、多言語の簡易チェック。" },
          { name: "Google Gemini", note: "翻訳のセカンドオピニオン、特に日本語⇔アラビア語のニュアンス確認に活用。" },
        ],
      },
      {
        id: "services",
        title: "通訳 & 品質チェック",
        blurb: "制作業務と併せて提供しているサービス。",
        icon: "mic" as const,
        accent: "from-slate-500/20 via-zinc-500/10 to-transparent",
        tools: [
          { name: "アラビア語 品質チェック (QC)", note: "アラビア語成果物の校正とQC — 組版ミス、シェイピングエラー、翻訳の不整合を検出。" },
          { name: "同時通訳", note: "電話・Web会議での同時通訳を随時対応(アラビア語・日本語・英語)。" },
        ],
      },
      {
        id: "dev",
        title: "開発",
        blurb: "DTP Masterとこのサイトを作るために使用。",
        icon: "code" as const,
        accent: "from-amber-500/20 via-orange-500/10 to-transparent",
        tools: [
          { name: "Visual Studio Code", note: "メインエディタ。" },
          { name: "Claude Code", note: "ターミナル内のAIペアプログラマ — 最近はこれで開発しています。" },
          { name: "Git + GitHub", note: "バージョン管理とホスティング。" },
          { name: "Next.js + Tailwind CSS", note: "このサイトのスタック — React 19、App Router、TS。" },
          { name: "Python + PySide6", note: "DTP Masterはこれで構築。" },
        ],
      },
      {
        id: "system",
        title: "日常環境",
        blurb: "実際に使用しているハードウェアとアカウント。",
        icon: "monitor" as const,
        accent: "from-teal-500/20 via-cyan-500/10 to-transparent",
        tools: [
          { name: "Windows 11", note: "メインOS — 多くのDTP制作ツールが必要とするため。" },
          { name: "日本語 + アラビア語 IME", note: "3つの言語体系を日常的に切り替え。" },
          { name: "デュアルモニター", note: "一方に原文、もう一方に訳文を表示。" },
          { name: "iCloud+ カスタムドメイン", note: "m@mahmoud.jp — 独自ドメインでのiCloudメール。" },
        ],
      },
    ],
  },
  ar: {
    kicker: "الأدوات",
    heading: "ما أعمل به.",
    sub: "الأدوات والبرامج وسير العمل اللي أعتمد عليه يومياً في DTP والترجمة والترجمة الفورية وبناء الأشياء.",
    footnote: "يتم التحديث دورياً. يسعدني الإجابة على أي سؤال — راسلني.",
    groups: [
      {
        id: "dtp",
        title: "DTP والتصميم",
        blurb: "قلب عملي اليومي — تخطيط متعدد اللغات وتحضير PDF والتسليم.",
        icon: "file" as const,
        accent: "from-cyan-500/20 via-blue-500/10 to-transparent",
        tools: [
          { name: "Adobe InDesign", note: "أداة التخطيط الأساسية للمستندات العربية/اليابانية/الإنجليزية." },
          { name: "Adobe Illustrator", note: "الشعارات والأصول الفيكتورية والأعمال التايبوغرافية المعقدة." },
          { name: "Adobe Photoshop", note: "تحضير الصور والريتوش وإعداد الراستر للطباعة." },
          { name: "Adobe Acrobat Pro", note: "مقارنة PDF وتدقيق ما قبل الطباعة وفحوصات التسليم النهائية." },
        ],
      },
      {
        id: "file-languages",
        title: "لغات الملفات",
        blurb: "اللغات اللي بنضّدها وأراجع جودتها في إنتاج DTP — من تشكيل العربية RTL لقواعد CJK للحروف اللاتينية بعلامات التشكيل.",
        icon: "globe" as const,
        accent: "from-indigo-500/20 via-sky-500/10 to-transparent",
        tools: [
          { name: "اليابانية — 日本語", note: "CJK — أفقي وعمودي (tategaki)، قواعد kinsoku، مزيج من الكانجي والكانا والحروف اللاتينية." },
          { name: "الإنجليزية — English", note: "حروف لاتينية، تايبوغرافيا غربية قياسية." },
          { name: "العربية — Arabic", note: "من اليمين لليسار، تشكيل سياقي، ربط الحروف، كشيدة، نص ثنائي الاتجاه." },
          { name: "الكورية — 한국어", note: "هانغول مع قواعد CJK للتنضيد وعلامات الترقيم." },
          { name: "الصينية المبسطة — 简体中文", note: "CJK، مجموعة الحروف المبسطة." },
          { name: "الصينية التقليدية — 繁體中文", note: "CJK، مجموعة الحروف التقليدية، غالباً تنضيد عمودي." },
          { name: "الفرنسية — Français", note: "لاتينية مع قواعد المسافات الفرنسية حول علامات الترقيم (« » : ; ! ?)." },
          { name: "الإسبانية — Español", note: "لاتينية مع علامات الترقيم المقلوبة (¿¡) والحروف المشكّلة." },
          { name: "الإيطالية — Italiano", note: "لاتينية، قواعد غربية قياسية مع علامات تشكيل إيطالية." },
          { name: "الإندونيسية — Bahasa Indonesia", note: "أبجدية لاتينية، تنضيد غربي مباشر." },
        ],
      },
      {
        id: "translation",
        title: "الترجمة والتوطين",
        blurb: "البرامج وأدوات الذكاء الاصطناعي اللي أستخدمها بجانب DTP للحفاظ على اتساق العمل متعدد اللغات.",
        icon: "lang" as const,
        accent: "from-blue-500/20 via-teal-500/10 to-transparent",
        tools: [
          { name: "SDL Trados Studio", note: "أداة CAT الأساسية — ذاكرة الترجمة والمصطلحات والمراجعة على مستوى المقطع." },
          { name: "Microsoft Word", note: "مراجعة التعديلات والتسليمات المتجهة للعميل." },
          { name: "ChatGPT", note: "بحث المصطلحات ومراجعة المسودات وفحوصات سريعة بين اللغات." },
          { name: "Google Gemini", note: "رأي ثانٍ على الترجمات، خاصة لنواحٍ دقيقة بين اليابانية والعربية." },
        ],
      },
      {
        id: "services",
        title: "الترجمة الفورية والمراجعة",
        blurb: "خدمات أقدمها بجانب العمل الإنتاجي.",
        icon: "mic" as const,
        accent: "from-slate-500/20 via-zinc-500/10 to-transparent",
        tools: [
          { name: "مراجعة جودة اللغة العربية", note: "تدقيق ومراجعة جودة المخرجات العربية — ضبط أخطاء التنضيد والشكل وعدم اتساق الترجمة." },
          { name: "الترجمة الفورية", note: "ترجمة فورية حية (عربي/ياباني/إنجليزي) للمكالمات الهاتفية ومقابلات الفيديو عند الطلب." },
        ],
      },
      {
        id: "dev",
        title: "البرمجة",
        blurb: "لبناء DTP Master وهذا الموقع.",
        icon: "code" as const,
        accent: "from-amber-500/20 via-orange-500/10 to-transparent",
        tools: [
          { name: "Visual Studio Code", note: "المحرر الأساسي." },
          { name: "Claude Code", note: "شريك برمجي ذكي داخل الطرفية — به أبني معظم الأشياء الآن." },
          { name: "Git + GitHub", note: "التحكم في الإصدارات والاستضافة." },
          { name: "Next.js + Tailwind CSS", note: "ستاك هذا الموقع — React 19 وApp Router وTS." },
          { name: "Python + PySide6", note: "DTP Master مبني على هذا." },
        ],
      },
      {
        id: "system",
        title: "النظام اليومي",
        blurb: "العتاد والحسابات اللي أجلس أمامها فعلاً.",
        icon: "monitor" as const,
        accent: "from-teal-500/20 via-cyan-500/10 to-transparent",
        tools: [
          { name: "Windows 11", note: "النظام الأساسي — لازم لمعظم أدوات إنتاج DTP." },
          { name: "IMEs ياباني + عربي", note: "تبديل إدخال يومي بين ثلاث أبجديات." },
          { name: "إعداد شاشتين", note: "المستند المصدر على شاشة والهدف على الأخرى." },
          { name: "iCloud+ بنطاق مخصص", note: "m@mahmoud.jp — بريد احترافي عبر iCloud بنطاقي الخاص." },
        ],
      },
    ],
  },
};

export default function UsesPage() {
  const text = useT(t);
  const groups = text.groups as Group[];

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
          <div className="grid gap-6">
            {groups.map((g, i) => {
              const Icon = iconMap[g.icon];
              return (
                <motion.section
                  key={g.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.5 }}
                  className="group relative rounded-2xl overflow-hidden border border-gray-800 bg-[#0f0f14]"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${g.accent} opacity-50`} />
                  <div className="relative p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-5">
                      <div className="flex-shrink-0 p-2.5 rounded-xl bg-white/5 ring-1 ring-white/10">
                        <Icon className="w-5 h-5 text-white/90" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-1.5">
                          {g.title}
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">{g.blurb}</p>
                      </div>
                    </div>

                    <ul className="grid gap-2.5">
                      {g.tools.map((tool) => (
                        <li
                          key={tool.name}
                          className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 py-2.5 px-3 rounded-lg bg-[#0a0a0e] border border-gray-800/60"
                        >
                          <span className="text-white font-medium text-sm flex-shrink-0 sm:min-w-[200px]">
                            {tool.name}
                          </span>
                          <span className="text-gray-400 text-sm leading-relaxed">
                            {tool.note}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.section>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-gray-500 text-sm text-center mt-12 leading-relaxed"
          >
            {text.footnote}
          </motion.p>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
