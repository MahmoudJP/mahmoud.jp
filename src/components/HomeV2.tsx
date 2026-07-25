"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Braces,
  Check,
  ExternalLink,
  FileText,
  Globe2,
  Languages,
  LayoutTemplate,
  Mail,
  MapPin,
  Mic2,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Contact } from "@/components/sections/Contact";
import { RequestCvModal } from "@/components/RequestCvModal";
import { type Locale, useT } from "@/lib/i18n";

type HomeCopy = {
  eyebrow: string;
  headlineStart: string;
  headlineAccent: string;
  intro: string;
  studio: string;
  status: string;
  buttons: {
    contact: string;
    learn: string;
    cv: string;
    linkedin: string;
  };
  proof: { label: string; value: string }[];
  workKicker: string;
  workTitle: string;
  workIntro: string;
  featured: {
    label: string;
    title: string;
    description: string;
    result: string;
    cta: string;
  };
  projects: {
    label: string;
    title: string;
    description: string;
    cta: string;
  }[];
  aboutKicker: string;
  aboutTitle: string;
  aboutBody: string;
  aboutPoints: string[];
  capabilitiesKicker: string;
  capabilitiesTitle: string;
  capabilities: {
    title: string;
    description: string;
  }[];
  journeyKicker: string;
  journeyTitle: string;
  journey: {
    period: string;
    title: string;
    meta: string;
    description: string;
  }[];
  writingKicker: string;
  writingTitle: string;
  writingIntro: string;
  writingCta: string;
  notes: {
    title: string;
    summary: string;
    tag: string;
  }[];
};

const copy: Record<Locale, HomeCopy> = {
  en: {
    eyebrow: "Tokyo · Arabic / 日本語 / English",
    headlineStart: "I build software for work",
    headlineAccent: "between languages.",
    intro:
      "I turn the difficult parts of multilingual production into clear tools — combining Arabic DTP, Japanese communication, interpretation, and practical software.",
    studio: "Founder of Koryuu · Creator of DTP Master",
    status: "Building in public from Tokyo",
    buttons: {
      contact: "Contact me",
      learn: "Learn more",
      cv: "Request CV",
      linkedin: "LinkedIn",
    },
    proof: [
      { label: "Working languages", value: "Arabic · Japanese · English" },
      { label: "Base", value: "Tokyo, Japan" },
      { label: "Focus", value: "DTP · Software · Interpretation" },
    ],
    workKicker: "Selected work",
    workTitle: "Products born from real workflow problems.",
    workIntro:
      "I build the tools I wish existed in multilingual production, language learning, and everyday work.",
    featured: {
      label: "Flagship product · Windows",
      title: "DTP Master",
      description:
        "A trilingual quality-control workspace for Arabic, Japanese, and English desktop-publishing teams.",
      result: "PDF comparison, Arabic QC, inspection, packaging, and team workflows in one desktop app.",
      cta: "Explore DTP Master",
    },
    projects: [
      {
        label: "Software studio",
        title: "Koryuu",
        description:
          "The home for software built at the crossroads of Arabic, Japanese, and English.",
        cta: "Visit Koryuu",
      },
      {
        label: "Language learning",
        title: "JLPT Master",
        description:
          "Japanese exam practice designed around how Arabic speakers actually learn.",
        cta: "See the project",
      },
      {
        label: "Personal systems",
        title: "Mylife",
        description:
          "A private dashboard for the habits, goals, health, and routines that matter.",
        cta: "View all projects",
      },
    ],
    aboutKicker: "The person behind the work",
    aboutTitle: "A bridge between production, language, and software.",
    aboutBody:
      "My work started in Arabic translation and interpretation, moved into multilingual DTP and quality control, and grew into building software for the problems I kept seeing. That combination lets me understand both the human context and the technical workflow.",
    aboutPoints: [
      "Arabic-native, fluent Japanese, professional English",
      "Hands-on DTP operations and translation QC",
      "Independent product development with AI-assisted workflows",
    ],
    capabilitiesKicker: "Capabilities",
    capabilitiesTitle: "One profile, four connected disciplines.",
    capabilities: [
      {
        title: "Multilingual DTP",
        description:
          "Arabic typesetting, layout QC, mirrored content, fonts, PDFs, and production handoff.",
      },
      {
        title: "Software building",
        description:
          "Product design and development for desktop and web tools that solve real work.",
      },
      {
        title: "Interpretation",
        description:
          "Arabic ↔ Japanese communication with cultural context, clarity, and precision.",
      },
      {
        title: "Cloud & AI",
        description:
          "AWS-certified foundations and practical AI systems for faster, safer workflows.",
      },
    ],
    journeyKicker: "Journey",
    journeyTitle: "Experience, condensed.",
    journey: [
      {
        period: "2024 — now",
        title: "DTP Operations & Arabic QC",
        meta: "SHAMS Co., Ltd. · Tokyo",
        description:
          "Multilingual production, Arabic quality control, workflow improvement, and internal tooling.",
      },
      {
        period: "2021 — 2024",
        title: "Arabic Interpreter & Translator",
        meta: "EDJ Translation Company",
        description:
          "Project-based interpretation and translation across Japanese and Arabic contexts.",
      },
      {
        period: "Independent",
        title: "Founder & Product Builder",
        meta: "Koryuu · DTP Master",
        description:
          "Designing and shipping software shaped by real multilingual work.",
      },
    ],
    writingKicker: "Field notes",
    writingTitle: "What I learn while building.",
    writingIntro:
      "Practical notes on Arabic typography, multilingual quality, and independent software.",
    writingCta: "Open writing desk",
    notes: [
      {
        title: "Arabic in InDesign: five mistakes I see every week",
        summary:
          "Recurring shaping, direction, and number issues — and how to stop them reaching delivery.",
        tag: "Arabic DTP",
      },
      {
        title: "How I’m building DTP Master",
        summary:
          "The decisions behind a signed Windows product built by one person.",
        tag: "Build log",
      },
      {
        title: "Japanese ⇄ Arabic: the translation pitfalls nobody mentions",
        summary:
          "Why literal output breaks readability and what makes a document actually usable.",
        tag: "Translation QC",
      },
    ],
  },
  ja: {
    eyebrow: "東京 · العربية / 日本語 / English",
    headlineStart: "言語をまたぐ仕事のための",
    headlineAccent: "ソフトウェアをつくる。",
    intro:
      "アラビア語DTP、日本語コミュニケーション、通訳、ソフトウェア開発を組み合わせ、多言語制作の難しい部分をわかりやすいツールに変えています。",
    studio: "Koryuu 創業者 · DTP Master 開発者",
    status: "東京からプロダクトを開発中",
    buttons: {
      contact: "お問い合わせ",
      learn: "詳しく見る",
      cv: "履歴書をリクエスト",
      linkedin: "LinkedIn",
    },
    proof: [
      { label: "対応言語", value: "アラビア語 · 日本語 · 英語" },
      { label: "拠点", value: "東京、日本" },
      { label: "専門", value: "DTP · ソフトウェア · 通訳" },
    ],
    workKicker: "主なプロジェクト",
    workTitle: "現場の課題から生まれたプロダクト。",
    workIntro:
      "多言語制作、言語学習、日々の仕事で「欲しかった」ツールを自分で形にしています。",
    featured: {
      label: "主要プロダクト · Windows",
      title: "DTP Master",
      description:
        "アラビア語・日本語・英語のDTPチーム向け、三言語対応の品質管理ワークスペース。",
      result:
        "PDF比較、アラビア語QC、検査、納品パッケージ、チーム作業を一つのアプリに。",
      cta: "DTP Masterを見る",
    },
    projects: [
      {
        label: "ソフトウェアスタジオ",
        title: "Koryuu",
        description:
          "アラビア語・日本語・英語の交差点から生まれるソフトウェアの拠点。",
        cta: "Koryuuを見る",
      },
      {
        label: "語学学習",
        title: "JLPT Master",
        description:
          "アラビア語話者の学び方を基に設計した日本語試験対策。",
        cta: "プロジェクトを見る",
      },
      {
        label: "パーソナルシステム",
        title: "Mylife",
        description:
          "習慣、目標、健康、日々のルーティンをまとめるプライベートダッシュボード。",
        cta: "全プロジェクト",
      },
    ],
    aboutKicker: "つくる人",
    aboutTitle: "制作・言語・ソフトウェアをつなぐ。",
    aboutBody:
      "アラビア語の翻訳・通訳から始まり、多言語DTPと品質管理へ進み、現場で繰り返し見た課題を解決するソフトウェア開発へ広がりました。人の文脈と技術的なワークフローの両方を理解できることが強みです。",
    aboutPoints: [
      "アラビア語ネイティブ・日本語堪能・英語業務対応",
      "DTPオペレーションと翻訳QCの実務経験",
      "AIを活用した個人プロダクト開発",
    ],
    capabilitiesKicker: "できること",
    capabilitiesTitle: "4つの専門性を、一つの仕事に。",
    capabilities: [
      {
        title: "多言語DTP",
        description:
          "アラビア語組版、レイアウトQC、左右反転、フォント、PDF、納品工程。",
      },
      {
        title: "ソフトウェア開発",
        description:
          "現場の問題を解決するデスクトップ・Webツールの企画と開発。",
      },
      {
        title: "通訳",
        description:
          "文化的な背景、明確さ、正確さを大切にしたアラビア語⇄日本語コミュニケーション。",
      },
      {
        title: "クラウド & AI",
        description:
          "AWS認定の基礎と、安全で効率的なAIワークフローの実践。",
      },
    ],
    journeyKicker: "経歴",
    journeyTitle: "経験をコンパクトに。",
    journey: [
      {
        period: "2024 — 現在",
        title: "DTPオペレーション & アラビア語QC",
        meta: "SHAMS Co., Ltd. · 東京",
        description:
          "多言語制作、アラビア語品質管理、ワークフロー改善、社内ツール。",
      },
      {
        period: "2021 — 2024",
        title: "アラビア語通訳・翻訳",
        meta: "EDJ Translation Company",
        description:
          "日本語とアラビア語をつなぐプロジェクト単位の通訳・翻訳。",
      },
      {
        period: "個人開発",
        title: "創業者 & プロダクトビルダー",
        meta: "Koryuu · DTP Master",
        description:
          "実際の多言語業務から生まれたソフトウェアを設計・開発。",
      },
    ],
    writingKicker: "フィールドノート",
    writingTitle: "つくりながら学んだこと。",
    writingIntro:
      "アラビア語組版、多言語品質、個人開発についての実践的なノート。",
    writingCta: "ライティングを見る",
    notes: [
      {
        title: "InDesignのアラビア語：毎週見る5つのミス",
        summary:
          "字形、文字方向、数字で繰り返す問題と、納品前に止める方法。",
        tag: "アラビア語DTP",
      },
      {
        title: "DTP Masterをどう作っているか",
        summary:
          "一人で署名付きWindows製品を作るための設計と判断。",
        tag: "開発記録",
      },
      {
        title: "日本語⇄アラビア語：見落とされる翻訳の落とし穴",
        summary:
          "直訳が読みやすさを壊す理由と、使える文書にするための調整。",
        tag: "翻訳QC",
      },
    ],
  },
  ar: {
    eyebrow: "طوكيو · العربية / 日本語 / English",
    headlineStart: "أبني برمجيات للعمل",
    headlineAccent: "بين اللغات.",
    intro:
      "أحوّل الأجزاء الصعبة في الإنتاج متعدد اللغات إلى أدوات واضحة، جامعًا بين DTP العربي والتواصل الياباني والترجمة الفورية وتطوير البرمجيات.",
    studio: "مؤسس Koryuu · مطوّر DTP Master",
    status: "أبني منتجاتي من طوكيو",
    buttons: {
      contact: "تواصل معي",
      learn: "اعرف المزيد",
      cv: "اطلب السيرة الذاتية",
      linkedin: "LinkedIn",
    },
    proof: [
      { label: "لغات العمل", value: "العربية · اليابانية · الإنجليزية" },
      { label: "الموقع", value: "طوكيو، اليابان" },
      { label: "التركيز", value: "DTP · برمجيات · ترجمة فورية" },
    ],
    workKicker: "أعمال مختارة",
    workTitle: "منتجات وُلدت من مشاكل حقيقية في العمل.",
    workIntro:
      "أبني الأدوات التي تمنيت وجودها في الإنتاج متعدد اللغات وتعلّم اللغات والعمل اليومي.",
    featured: {
      label: "المنتج الرئيسي · Windows",
      title: "DTP Master",
      description:
        "مساحة عمل ثلاثية اللغات لمراجعة الجودة في فرق النشر المكتبي العربية واليابانية والإنجليزية.",
      result:
        "مقارنة PDF ومراجعة العربية والفحص وتجهيز التسليم والعمل الجماعي في تطبيق واحد.",
      cta: "استكشف DTP Master",
    },
    projects: [
      {
        label: "استوديو برمجيات",
        title: "Koryuu",
        description:
          "البيت الذي يجمع البرمجيات المبنية عند ملتقى العربية واليابانية والإنجليزية.",
        cta: "زيارة Koryuu",
      },
      {
        label: "تعلّم اللغات",
        title: "JLPT Master",
        description:
          "تدريب للاختبار الياباني مصمم وفق الطريقة التي يتعلم بها الناطقون بالعربية.",
        cta: "شاهد المشروع",
      },
      {
        label: "أنظمة شخصية",
        title: "Mylife",
        description:
          "لوحة خاصة للعادات والأهداف والصحة والروتين اليومي المهم.",
        cta: "كل المشاريع",
      },
    ],
    aboutKicker: "الشخص خلف العمل",
    aboutTitle: "حلقة وصل بين الإنتاج واللغة والبرمجيات.",
    aboutBody:
      "بدأ عملي في الترجمة العربية والترجمة الفورية، وانتقل إلى النشر المكتبي متعدد اللغات ومراجعة الجودة، ثم تطور إلى بناء برامج للمشاكل التي تكررت أمامي. هذا المزيج يجعلني أفهم السياق الإنساني ومسار العمل التقني معًا.",
    aboutPoints: [
      "العربية لغتي الأم، واليابانية بطلاقة، والإنجليزية للعمل",
      "خبرة عملية في DTP ومراجعة جودة الترجمة",
      "تطوير منتجات مستقلة بمسارات عمل مدعومة بالذكاء الاصطناعي",
    ],
    capabilitiesKicker: "القدرات",
    capabilitiesTitle: "أربع خبرات متصلة في شخص واحد.",
    capabilities: [
      {
        title: "DTP متعدد اللغات",
        description:
          "تنضيد العربية ومراجعة التصميم والاتجاهات والخطوط وPDF وتجهيز التسليم.",
      },
      {
        title: "بناء البرمجيات",
        description:
          "تصميم وتطوير أدوات سطح المكتب والويب لحل مشاكل عمل حقيقية.",
      },
      {
        title: "الترجمة الفورية",
        description:
          "تواصل عربي ⇄ ياباني يحافظ على السياق الثقافي والوضوح والدقة.",
      },
      {
        title: "السحابة والذكاء الاصطناعي",
        description:
          "أساس معتمد من AWS وأنظمة AI عملية لمسارات عمل أسرع وأكثر أمانًا.",
      },
    ],
    journeyKicker: "المسيرة",
    journeyTitle: "الخبرة بدون إطالة.",
    journey: [
      {
        period: "2024 — الآن",
        title: "عمليات DTP ومراجعة العربية",
        meta: "SHAMS Co., Ltd. · طوكيو",
        description:
          "إنتاج متعدد اللغات ومراجعة جودة العربية وتحسين المسارات وبناء أدوات داخلية.",
      },
      {
        period: "2021 — 2024",
        title: "مترجم عربي فوري وتحريري",
        meta: "EDJ Translation Company",
        description:
          "ترجمة فورية وتحريرية حسب المشروع بين السياقين الياباني والعربي.",
      },
      {
        period: "عمل مستقل",
        title: "مؤسس وباني منتجات",
        meta: "Koryuu · DTP Master",
        description:
          "تصميم وشحن برمجيات تشكلت من احتياجات العمل متعدد اللغات.",
      },
    ],
    writingKicker: "ملاحظات من الميدان",
    writingTitle: "ما أتعلمه وأنا أبني.",
    writingIntro:
      "ملاحظات عملية عن تنضيد العربية والجودة متعددة اللغات وتطوير البرمجيات بشكل مستقل.",
    writingCta: "افتح صفحة الكتابة",
    notes: [
      {
        title: "العربية في InDesign: خمسة أخطاء أراها كل أسبوع",
        summary:
          "مشاكل متكررة في شكل الحروف والاتجاه والأرقام، وكيف نمنع وصولها للتسليم.",
        tag: "DTP عربي",
      },
      {
        title: "كيف أبني DTP Master",
        summary:
          "القرارات خلف منتج Windows موقّع يبنيه شخص واحد.",
        tag: "سجل التطوير",
      },
      {
        title: "ياباني ⇄ عربي: مطبات الترجمة التي لا يذكرها أحد",
        summary:
          "لماذا تفسد الترجمة الحرفية القراءة، وما الذي يجعل المستند قابلًا للاستخدام.",
        tag: "مراجعة الترجمة",
      },
    ],
  },
};

const capabilityIcons = [LayoutTemplate, Braces, Mic2, Sparkles];

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.16 },
  transition: { duration: 0.55 },
};

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 font-mono text-xs uppercase tracking-[0.26em] text-cyan-300/80">
      {children}
    </p>
  );
}

export function HomeV2() {
  const text = useT(copy);
  const [cvOpen, setCvOpen] = React.useState(false);

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <section className="cultural-grid relative min-h-[100svh] px-5 pb-14 pt-28 sm:px-8 lg:px-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_25%,rgba(8,145,178,0.17),transparent_34%),radial-gradient(circle_at_20%_72%,rgba(99,102,241,0.12),transparent_30%)]" />
          <div
            aria-hidden
            className="absolute right-[7%] top-24 hidden select-none gap-4 text-[8rem] font-black leading-none text-white/[0.025] lg:flex"
          >
            <span>ع</span>
            <span>交</span>
            <span>A</span>
          </div>

          <div className="relative mx-auto grid min-h-[calc(100svh-8rem)] max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="max-w-3xl"
            >
              <div className="mb-7 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-1.5 text-xs font-medium text-cyan-100">
                  <Globe2 className="h-3.5 w-3.5" />
                  {text.eyebrow}
                </span>
                <span className="inline-flex items-center gap-2 text-xs text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                  {text.status}
                </span>
              </div>

              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.97] tracking-[-0.05em] text-white sm:text-6xl lg:text-[5.4rem]">
                {text.headlineStart}{" "}
                <span className="text-gradient-cultural">{text.headlineAccent}</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                {text.intro}
              </p>

              <Link
                href="/projects"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-200 transition-colors hover:text-white"
              >
                <span className="h-px w-7 bg-cyan-300/70" />
                {text.studio}
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <div className="mt-9 flex flex-wrap gap-2.5">
                <a href="#contact" className="button-primary">
                  <Mail className="h-4 w-4" />
                  {text.buttons.contact}
                </a>
                <a href="#about" className="button-secondary">
                  <ArrowDown className="h-4 w-4" />
                  {text.buttons.learn}
                </a>
                <button
                  type="button"
                  onClick={() => setCvOpen(true)}
                  className="button-secondary cursor-pointer"
                >
                  <FileText className="h-4 w-4" />
                  {text.buttons.cv}
                </button>
                <a
                  href="https://www.linkedin.com/in/mahmoud-adel-jp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-secondary"
                >
                  <ExternalLink className="h-4 w-4" />
                  {text.buttons.linkedin}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="relative mx-auto w-full max-w-xl"
            >
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-cyan-400/10 via-transparent to-indigo-500/10 blur-2xl" />
              <div className="product-window relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#07101f]/90 shadow-2xl shadow-black/50">
                <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">
                    DTP Master · v1.5
                  </span>
                </div>
                <div className="relative aspect-[16/10] bg-[#0b1322]">
                  <Image
                    src="/dtp-master/screen-1.png"
                    alt="DTP Master application interface"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 42vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07101f] to-transparent" />
                </div>
                <div className="grid grid-cols-3 gap-px border-t border-white/8 bg-white/8">
                  {["العربية", "日本語", "English"].map((language) => (
                    <div
                      key={language}
                      className="bg-[#07101f] px-3 py-3 text-center text-xs text-slate-300"
                    >
                      {language}
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-5 -left-3 rounded-2xl border border-white/10 bg-[#0b1424]/95 p-4 shadow-xl backdrop-blur sm:-left-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  Built for
                </p>
                <p className="mt-1 text-sm font-medium text-white">
                  Multilingual production
                </p>
              </div>
            </motion.div>
          </div>

          <div className="relative mx-auto mt-8 grid max-w-7xl gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-3">
            {text.proof.map((item) => (
              <div key={item.label} className="bg-[#08101d]/90 px-5 py-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-200">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="section-shell bg-[#07101d]">
          <motion.div {...reveal} className="section-heading">
            <Kicker>{text.workKicker}</Kicker>
            <h2>{text.workTitle}</h2>
            <p>{text.workIntro}</p>
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-7xl gap-5 lg:grid-cols-[1.3fr_0.7fr]">
            <motion.article {...reveal} className="bento-card group p-6 sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
                <div>
                  <span className="project-label">{text.featured.label}</span>
                  <h3 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {text.featured.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-300">
                    {text.featured.description}
                  </p>
                  <p className="mt-5 border-s-2 border-cyan-300/40 ps-4 text-sm leading-6 text-slate-400">
                    {text.featured.result}
                  </p>
                  <Link href="/projects/dtp-master" className="project-link mt-7">
                    {text.featured.cta}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                  <Image
                    src="/dtp-master/screen-2.png"
                    alt="DTP Master comparison workspace"
                    fill
                    sizes="(max-width: 1024px) 90vw, 42vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.025]"
                  />
                </div>
              </div>
            </motion.article>

            <div className="grid gap-5">
              {text.projects.slice(0, 2).map((project, index) => (
                <motion.article
                  key={project.title}
                  {...reveal}
                  transition={{ duration: 0.55, delay: index * 0.06 }}
                  className="bento-card cultural-card p-6"
                >
                  <span className="project-label">{project.label}</span>
                  <div className="mt-7 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                      <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                        {project.description}
                      </p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-cyan-200">
                      {index === 0 ? (
                        <Globe2 className="h-4 w-4" />
                      ) : (
                        <Languages className="h-4 w-4" />
                      )}
                    </span>
                  </div>
                  <a
                    href={
                      index === 0
                        ? "https://koryuu.com"
                        : "https://koryuu.com/apps/jlpt-master/"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link mt-6"
                  >
                    {project.cta}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </motion.article>
              ))}
            </div>
          </div>

          <motion.div
            {...reveal}
            className="mx-auto mt-5 flex max-w-7xl flex-col justify-between gap-6 rounded-2xl border border-white/8 bg-white/[0.025] p-6 sm:flex-row sm:items-center"
          >
            <div>
              <span className="project-label">{text.projects[2].label}</span>
              <h3 className="mt-2 text-xl font-semibold text-white">
                {text.projects[2].title}
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                {text.projects[2].description}
              </p>
            </div>
            <Link href="/projects" className="button-secondary shrink-0">
              {text.projects[2].cta}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </section>

        <section id="about" className="section-shell bg-[#091322]">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <motion.div {...reveal} className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cyan-400/12 to-indigo-500/12 blur-2xl" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0d1728]">
                <Image
                  src="/mahmoud.jpg"
                  alt="Mahmoud Adel in Tokyo"
                  fill
                  sizes="(max-width: 1024px) 90vw, 34vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#091322] to-transparent" />
                <div className="absolute bottom-5 start-5 rounded-xl border border-white/10 bg-black/45 px-4 py-3 backdrop-blur">
                  <p className="flex items-center gap-2 text-sm font-medium text-white">
                    <MapPin className="h-4 w-4 text-cyan-300" />
                    Tokyo, Japan
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div {...reveal}>
              <Kicker>{text.aboutKicker}</Kicker>
              <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                {text.aboutTitle}
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
                {text.aboutBody}
              </p>
              <ul className="mt-8 grid gap-3">
                {text.aboutPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 rounded-xl border border-white/7 bg-white/[0.025] px-4 py-3.5 text-sm leading-6 text-slate-300"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-300/10 text-cyan-200">
                      <Check className="h-3 w-3" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        <section className="section-shell bg-[#07101d]">
          <motion.div {...reveal} className="section-heading">
            <Kicker>{text.capabilitiesKicker}</Kicker>
            <h2>{text.capabilitiesTitle}</h2>
          </motion.div>
          <div className="mx-auto mt-12 grid max-w-7xl gap-4 sm:grid-cols-2">
            {text.capabilities.map((capability, index) => {
              const Icon = capabilityIcons[index];
              return (
                <motion.article
                  key={capability.title}
                  {...reveal}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`bento-card p-6 sm:p-8 ${
                    index === 0 || index === 3 ? "sm:col-span-1" : ""
                  }`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.07] text-cyan-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-8 text-xl font-semibold text-white">{capability.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
                    {capability.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="section-shell bg-[#091322]">
          <motion.div {...reveal} className="section-heading">
            <Kicker>{text.journeyKicker}</Kicker>
            <h2>{text.journeyTitle}</h2>
          </motion.div>
          <div className="mx-auto mt-12 max-w-5xl">
            {text.journey.map((item, index) => (
              <motion.article
                key={item.title}
                {...reveal}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                className="grid gap-3 border-t border-white/8 py-7 first:border-t-0 sm:grid-cols-[150px_1fr]"
              >
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-300/70">
                  {item.period}
                </p>
                <div>
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.meta}</p>
                  </div>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section-shell bg-[#07101d]">
          <motion.div
            {...reveal}
            className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-end"
          >
            <div className="max-w-3xl">
              <Kicker>{text.writingKicker}</Kicker>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                {text.writingTitle}
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-400">
                {text.writingIntro}
              </p>
            </div>
            <Link href="/writing" className="button-secondary shrink-0">
              {text.writingCta}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="mx-auto mt-10 grid max-w-7xl gap-4 lg:grid-cols-3">
            {text.notes.map((note, index) => (
              <motion.article
                key={note.title}
                {...reveal}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bento-card flex min-h-64 flex-col p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="project-label">{note.tag}</span>
                  <BookOpen className="h-4 w-4 text-slate-600" />
                </div>
                <h3 className="mt-10 text-xl font-semibold leading-snug text-white">
                  {note.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{note.summary}</p>
                <div className="mt-auto pt-6 text-xs font-medium text-cyan-300/70">
                  Coming soon
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="bg-[#091322]">
          <Contact />
        </section>
      </main>
      <Footer />
      <BackToTop />
      <RequestCvModal open={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  );
}
