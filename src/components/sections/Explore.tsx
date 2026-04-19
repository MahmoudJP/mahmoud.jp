"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FolderGit2, Wrench, ArrowUpRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useT } from "@/lib/i18n";

const t = {
  en: {
    kicker: "Explore",
    cards: [
      {
        href: "/projects",
        title: "Projects",
        desc: "Tools I'm building for DTP, translation, and multilingual workflows — including DTP Master.",
        cta: "See what I'm building",
        icon: "folder" as const,
      },
      {
        href: "/uses",
        title: "Uses",
        desc: "The software, hardware, and daily setup I rely on for production work.",
        cta: "View my stack",
        icon: "wrench" as const,
      },
    ],
  },
  ja: {
    kicker: "もっと見る",
    cards: [
      {
        href: "/projects",
        title: "プロジェクト",
        desc: "DTP・翻訳・多言語ワークフローのために制作中のツール — DTP Masterを含む。",
        cta: "制作中のツールを見る",
        icon: "folder" as const,
      },
      {
        href: "/uses",
        title: "使用ツール",
        desc: "制作業務で日常的に使用しているソフトウェア・ハードウェア・環境。",
        cta: "使用ツール一覧を見る",
        icon: "wrench" as const,
      },
    ],
  },
};

const iconMap = { folder: FolderGit2, wrench: Wrench };

const accents = [
  {
    border: "hover:border-cyan-500/40",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    grad: "from-cyan-500/20 via-blue-500/10 to-transparent",
    ctaColor: "text-cyan-300 group-hover:text-cyan-200",
  },
  {
    border: "hover:border-purple-500/40",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
    grad: "from-purple-500/20 via-fuchsia-500/10 to-transparent",
    ctaColor: "text-purple-300 group-hover:text-purple-200",
  },
];

export function Explore() {
  const text = useT(t);

  return (
    <section className="py-20 md:py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p
            variants={fadeInUp}
            custom={0}
            className="text-sm uppercase tracking-[0.25em] text-purple-300/80 mb-8 text-center"
          >
            {text.kicker}
          </motion.p>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
            {text.cards.map((c, i) => {
              const Icon = iconMap[c.icon];
              const a = accents[i];
              return (
                <motion.div key={c.href} variants={fadeInUp} custom={i + 1}>
                  <Link
                    href={c.href}
                    className={`group relative block rounded-2xl overflow-hidden border border-gray-800 bg-[#0f0f14] ${a.border} transition-colors duration-300 h-full`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${a.grad} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative p-6 md:p-7">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-2.5 rounded-xl ${a.iconBg} ring-1 ring-white/10`}>
                          <Icon className={`w-5 h-5 ${a.iconColor}`} />
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {c.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">{c.desc}</p>
                      <span className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${a.ctaColor}`}>
                        {c.cta}
                        <span aria-hidden>→</span>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
