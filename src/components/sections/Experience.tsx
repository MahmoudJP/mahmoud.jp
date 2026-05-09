"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { calcDuration } from "@/lib/duration";
import { useLocale, useT } from "@/lib/i18n";

type Experience = {
  period: string;
  durationStart: string;
  durationEnd: string;
  company: string;
  role: string;
  description: string;
  badge?: { label: string; color: "purple" | "blue" };
  cardHover: string;
};

const t = {
  en: {
    title: "Work Experience",
    primaryRole: "Primary Role",
    sideContract: "Side Contract",
    dualRolesMobile: "Dual Roles — Full-time & Contract",
    full: "Full-time",
    contract: "Contract",
    edj: {
      period: "May 2021 - May 2024",
      company: "EDJ Translation Company",
      role: "Arabic Interpreter & Translator",
      description: "Arabic interpretation and translation services on a project-by-project basis.",
    },
    shams: {
      period: "Sep 2025 - Present",
      company: "SHAMS Co., Ltd.",
      role: "DTP Operator & Arabic QC",
      description: "DTP operations for multilingual documents and Arabic translation QC. Also handle company server administration and IT support — hardware troubleshooting and device maintenance.",
    },
    beborn: {
      period: "Apr 2026 - Present",
      company: "BeBorn Inc.",
      role: "On-Call Interpreter (Arabic / Japanese)",
      description: "24/7 on-call telephone interpretation service. Real-time Arabic-Japanese interpretation for emergencies, hospital visits, real estate offices, utility companies, and various business communications. Contract role alongside current position at SHAMS.",
    },
    yearsSuffix: (n: number) => ` · ${n} ${n === 1 ? "yr" : "yrs"}`,
    monthsSuffix: (n: number) => ` · ${n} ${n === 1 ? "mo" : "mo"}`,
  },
  ja: {
    title: "職務経歴",
    primaryRole: "本業",
    sideContract: "副業契約",
    dualRolesMobile: "二つの役割 — 正社員 & 業務委託",
    full: "正社員",
    contract: "業務委託",
    edj: {
      period: "2021年5月 - 2024年5月",
      company: "EDJ翻訳株式会社",
      role: "アラビア語通訳・翻訳者",
      description: "プロジェクトごとのアラビア語の通訳・翻訳業務を担当。",
    },
    shams: {
      period: "2025年9月 - 現在",
      company: "株式会社SHAMS",
      role: "DTPオペレーター・アラビア語QC",
      description: "多言語ドキュメントのDTP業務およびアラビア語翻訳の品質チェックを担当。加えて、社内サーバー管理とITサポート(ハードウェアのトラブル対応・機器メンテナンス)も担当。",
    },
    beborn: {
      period: "2026年4月 - 現在",
      company: "株式会社BeBorn",
      role: "オンコール通訳者(アラビア語/日本語)",
      description: "24時間対応の電話通訳サービス。緊急時・病院・不動産会社・公共料金関連・各種ビジネス対応におけるアラビア語⇔日本語のリアルタイム通訳を提供。SHAMSでの業務と並行して業務委託契約で従事。",
    },
    yearsSuffix: (n: number) => ` · ${n}年`,
    monthsSuffix: (n: number) => ` · ${n}ヶ月`,
  },
  ar: {
    title: "الخبرة العملية",
    primaryRole: "الوظيفة الأساسية",
    sideContract: "عقد جانبي",
    dualRolesMobile: "وظيفتان — دوام كامل وعقد",
    full: "دوام كامل",
    contract: "عقد",
    edj: {
      period: "مايو 2021 - مايو 2024",
      company: "شركة EDJ للترجمة",
      role: "مترجم فوري وتحريري للعربية",
      description: "خدمات ترجمة فورية وتحريرية للعربية على أساس المشاريع.",
    },
    shams: {
      period: "سبتمبر 2025 - حتى الآن",
      company: "شركة SHAMS",
      role: "مشغّل DTP ومراجع جودة عربية",
      description: "عمليات DTP للمستندات متعددة اللغات ومراجعة جودة الترجمة العربية. أتولى أيضاً إدارة خوادم الشركة والدعم الفني — استكشاف أعطال العتاد وصيانة الأجهزة.",
    },
    beborn: {
      period: "أبريل 2026 - حتى الآن",
      company: "شركة BeBorn",
      role: "مترجم فوري عند الطلب (عربي / ياباني)",
      description: "خدمة ترجمة هاتفية فورية على مدار الساعة. ترجمة فورية بين العربية واليابانية للطوارئ وزيارات المستشفيات ومكاتب العقارات وشركات المرافق ومختلف التواصل التجاري. عقد جانبي بجانب الوظيفة الحالية في SHAMS.",
    },
    yearsSuffix: (n: number) => ` · ${n} ${n === 1 ? "سنة" : "سنوات"}`,
    monthsSuffix: (n: number) => ` · ${n} ${n === 1 ? "شهر" : "أشهر"}`,
  },
};

const badgeStyle = {
  purple: "bg-blue-500/10 text-blue-400",
  blue: "bg-blue-500/10 text-blue-400",
};

function Card({ exp, durationLabel }: { exp: Experience; durationLabel: string }) {
  return (
    <div className={`bg-[#111] border border-gray-800 rounded-xl p-5 sm:p-6 transition-all duration-300 h-full ${exp.cardHover}`}>
      {exp.badge && (
        <span className={`inline-block px-3 py-1 rounded-full ${badgeStyle[exp.badge.color]} text-xs font-medium mb-3`}>
          {exp.badge.label}
        </span>
      )}
      <p className="text-blue-300 text-sm mb-1">
        {exp.period}
        <span className="text-gray-500">{durationLabel}</span>
      </p>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{exp.company}</h3>
      <p className="text-blue-300 text-sm mb-3">{exp.role}</p>
      <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
    </div>
  );
}

function formatDuration(start: string, end: string, locale: "en" | "ja" | "ar"): string {
  const raw = calcDuration(start, end);
  const match = raw.match(/(\d+)\s*(yr|yrs|mo)/);
  if (!match) return ` · ${raw}`;
  const n = parseInt(match[1], 10);
  const unit = match[2];
  const dict = locale === "ja" ? t.ja : locale === "ar" ? t.ar : t.en;
  if (unit === "mo") return dict.monthsSuffix(n);
  return dict.yearsSuffix(n);
}

export function Experience() {
  const text = useT(t);
  const { locale } = useLocale();

  const edj: Experience = {
    period: text.edj.period,
    durationStart: "May 2021",
    durationEnd: "May 2024",
    company: text.edj.company,
    role: text.edj.role,
    description: text.edj.description,
    cardHover: "hover:border-gray-600",
  };

  const shams: Experience = {
    period: text.shams.period,
    durationStart: "Sep 2025",
    durationEnd: "Present",
    company: text.shams.company,
    role: text.shams.role,
    description: text.shams.description,
    badge: { label: text.full, color: "purple" },
    cardHover: "hover:border-blue-500/30",
  };

  const beborn: Experience = {
    period: text.beborn.period,
    durationStart: "Apr 2026",
    durationEnd: "Present",
    company: text.beborn.company,
    role: text.beborn.role,
    description: text.beborn.description,
    badge: { label: text.contract, color: "blue" },
    cardHover: "hover:border-blue-500/30",
  };

  return (
    <section id="experience" className="py-20 md:py-24 px-6 bg-[#0a1020]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.h2
            variants={fadeInUp}
            custom={0}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            <Briefcase className="inline w-7 h-7 md:w-8 md:h-8 mr-3 text-blue-400" />
            <span className="bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
              {text.title}
            </span>
          </motion.h2>

          <div className="relative">
            <div className="absolute left-[11px] sm:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent" />

            <motion.div variants={fadeInUp} custom={1} className="relative mb-10 md:mb-12">
              <div className="absolute left-[7px] sm:left-1/2 sm:-translate-x-1/2 top-6 w-2.5 h-2.5 rounded-full bg-gray-500 ring-4 ring-[#060606]" />
              <div className="sm:grid sm:grid-cols-2 sm:gap-6 md:gap-8">
                <div className="pl-8 sm:pl-0 sm:pr-4 sm:text-right">
                  <Card exp={edj} durationLabel={formatDuration(edj.durationStart, edj.durationEnd, locale)} />
                </div>
                <div className="hidden sm:block" />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} custom={2} className="relative mb-4 hidden sm:block">
              <div className="grid grid-cols-2 gap-6 md:gap-8">
                <div className="pr-4 text-right">
                  <span className="inline-flex items-center gap-2 text-blue-300 text-sm font-medium">
                    <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    {text.primaryRole}
                  </span>
                </div>
                <div className="pl-4">
                  <span className="inline-flex items-center gap-2 text-blue-300 text-sm font-medium">
                    <span className="text-gray-600">&amp;</span>
                    {text.sideContract}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} custom={2} className="relative mb-4 sm:hidden pl-8">
              <span className="inline-flex items-center gap-2 text-green-400 text-sm font-medium">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                {text.dualRolesMobile}
              </span>
            </motion.div>

            <motion.div variants={fadeInUp} custom={3} className="relative">
              <div className="absolute left-[7px] sm:left-1/2 sm:-translate-x-1/2 top-6 w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse ring-4 ring-[#060606]" />
              <div className="pl-8 sm:pl-0 grid gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8">
                <div className="sm:pr-4">
                  <Card exp={shams} durationLabel={formatDuration(shams.durationStart, shams.durationEnd, locale)} />
                </div>
                <div className="sm:pl-4">
                  <Card exp={beborn} durationLabel={formatDuration(beborn.durationStart, beborn.durationEnd, locale)} />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
