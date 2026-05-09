"use client";

import { motion } from "framer-motion";
import { Users, Globe, Phone, Mic, BookOpen, Handshake, ExternalLink } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useT } from "@/lib/i18n";

const iconMap = { globe: Globe, phone: Phone, mic: Mic, handshake: Handshake, book: BookOpen, link: ExternalLink };

const t = {
  en: {
    title: "Freelance & Volunteer",
    items: [
      {
        period: "Dec 2025",
        title: "Youth Synergy Chiangmai 2025",
        desc: "Traveled to Chiang Mai, Thailand to join the Southeast Asia & Asia-Pacific Youth Forum — an international exchange program connecting young professionals across the region.",
        icon: "globe" as const,
        highlight: true,
        tag: "Thailand",
      },
      {
        period: "Oct 2022",
        title: "Hilton Hotel Call Center Internship",
        desc: "Japanese customer support at the Hilton hotel reservation call center.",
        icon: "phone" as const,
      },
      {
        period: "Mar 2022",
        title: "EgyCon Anime Convention — Interpreter",
        desc: "English/Japanese interpretation at the anime convention.",
        icon: "mic" as const,
      },
      {
        period: "Mar 2022",
        title: "ESPESL — Interpreter",
        desc: "Arabic/Japanese interpretation for the Egyptian Association for Economics, Statistics and Legislation.",
        icon: "handshake" as const,
      },
      {
        period: "Feb 2022",
        title: "Cairo International Book Fair",
        desc: "Radio interpretation (Arabic/Japanese) at the international book fair.",
        icon: "book" as const,
      },
      {
        period: "Dec 2021",
        title: "Japan Foundation at Benha University",
        desc: "Interpretation for an international exchange event (Arabic/Japanese).",
        icon: "globe" as const,
      },
      {
        period: "2015 - 2022",
        title: "Social Media Marketing Freelancer",
        desc: "Social media promotion campaigns and account security management.",
        icon: "link" as const,
      },
    ],
  },
  ja: {
    title: "フリーランス & ボランティア",
    items: [
      {
        period: "2025年12月",
        title: "Youth Synergy Chiang Mai 2025",
        desc: "タイ・チェンマイで開催された東南アジア&アジア太平洋ユースフォーラムに参加。地域の若手専門家が集う国際交流プログラム。",
        icon: "globe" as const,
        highlight: true,
        tag: "タイ",
      },
      {
        period: "2022年10月",
        title: "ヒルトンホテル予約コールセンター インターン",
        desc: "ヒルトンホテル予約コールセンターにて日本語のカスタマーサポートを担当。",
        icon: "phone" as const,
      },
      {
        period: "2022年3月",
        title: "EgyCon アニメコンベンション — 通訳",
        desc: "アニメコンベンションで英語・日本語の通訳を担当。",
        icon: "mic" as const,
      },
      {
        period: "2022年3月",
        title: "ESPESL — 通訳",
        desc: "エジプト経済・統計・立法協会のためのアラビア語・日本語通訳。",
        icon: "handshake" as const,
      },
      {
        period: "2022年2月",
        title: "カイロ国際ブックフェア",
        desc: "国際ブックフェアにてラジオ通訳(アラビア語・日本語)を担当。",
        icon: "book" as const,
      },
      {
        period: "2021年12月",
        title: "国際交流基金 @ バンハ大学",
        desc: "国際交流イベントでのアラビア語・日本語通訳を担当。",
        icon: "globe" as const,
      },
      {
        period: "2015年 - 2022年",
        title: "SNSマーケティング フリーランス",
        desc: "SNSプロモーションキャンペーンとアカウントセキュリティ管理。",
        icon: "link" as const,
      },
    ],
  },
  ar: {
    title: "عمل حر وتطوع",
    items: [
      {
        period: "ديسمبر 2025",
        title: "Youth Synergy Chiangmai 2025",
        desc: "سافرت إلى شيانغ ماي بتايلاند للمشاركة في منتدى شباب جنوب شرق آسيا وآسيا والمحيط الهادئ — برنامج تبادل دولي يربط بين الشباب المحترفين في المنطقة.",
        icon: "globe" as const,
        highlight: true,
        tag: "تايلاند",
      },
      {
        period: "أكتوبر 2022",
        title: "تدريب بمركز اتصال فندق هيلتون",
        desc: "دعم عملاء باللغة اليابانية في مركز حجوزات فندق هيلتون.",
        icon: "phone" as const,
      },
      {
        period: "مارس 2022",
        title: "مؤتمر EgyCon للأنيمي — مترجم",
        desc: "ترجمة فورية إنجليزي/ياباني في مؤتمر الأنيمي.",
        icon: "mic" as const,
      },
      {
        period: "مارس 2022",
        title: "ESPESL — مترجم",
        desc: "ترجمة فورية عربي/ياباني للجمعية المصرية للاقتصاد والإحصاء والتشريع.",
        icon: "handshake" as const,
      },
      {
        period: "فبراير 2022",
        title: "معرض القاهرة الدولي للكتاب",
        desc: "ترجمة إذاعية (عربي/ياباني) في معرض الكتاب الدولي.",
        icon: "book" as const,
      },
      {
        period: "ديسمبر 2021",
        title: "مؤسسة اليابان بجامعة بنها",
        desc: "ترجمة فورية في فعالية تبادل دولية (عربي/ياباني).",
        icon: "globe" as const,
      },
      {
        period: "2015 - 2022",
        title: "مسوّق حر على وسائل التواصل",
        desc: "حملات ترويج على السوشيال ميديا وإدارة أمان الحسابات.",
        icon: "link" as const,
      },
    ],
  },
};

export function Freelance() {
  const text = useT(t);

  return (
    <section id="volunteer" className="relative py-20 md:py-24 px-6 bg-[#0a1020]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0d1424] to-transparent" />
      <div className="relative max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2
            variants={fadeInUp}
            custom={0}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            <Users className="inline w-7 h-7 md:w-8 md:h-8 mr-3 text-green-400" />
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              {text.title}
            </span>
          </motion.h2>

          <div className="grid gap-3">
            {text.items.map((act, i) => {
              const Icon = iconMap[act.icon];
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  custom={Math.min(i + 1, 5)}
                  className={`bg-[#111] border rounded-xl p-4 sm:p-5 transition-all duration-300 flex items-start gap-3 sm:gap-4 ${
                    act.highlight
                      ? "border-cyan-500/30 hover:border-cyan-500/50"
                      : "border-gray-800 hover:border-green-500/20"
                  }`}
                >
                  <div className={`flex-shrink-0 p-2 rounded-lg mt-0.5 ${act.highlight ? "bg-cyan-500/10" : "bg-green-500/10"}`}>
                    <Icon className={`w-5 h-5 ${act.highlight ? "text-cyan-400" : "text-green-400"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-white font-semibold text-sm sm:text-base leading-snug">
                        {act.title}
                        {act.tag && (
                          <span className="ml-2 inline-block px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-medium border border-cyan-500/20 align-middle">
                            {act.tag}
                          </span>
                        )}
                      </h3>
                      <span className={`text-xs whitespace-nowrap flex-shrink-0 mt-0.5 ${act.highlight ? "text-cyan-300/60" : "text-green-300/60"}`}>
                        {act.period}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{act.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
