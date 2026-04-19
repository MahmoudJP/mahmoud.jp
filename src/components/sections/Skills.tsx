"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Languages as LanguagesIcon,
  Headphones,
  Server,
  Wrench,
  Cpu,
  MonitorCog,
  Gamepad2,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useT } from "@/lib/i18n";

const skillMeta = [
  { icon: Server, color: "text-orange-400", bg: "bg-orange-500/10" },
  { icon: Wrench, color: "text-green-400", bg: "bg-green-500/10" },
  { icon: MonitorCog, color: "text-amber-400", bg: "bg-amber-500/10" },
  { icon: Cpu, color: "text-purple-400", bg: "bg-purple-500/10" },
  { icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10" },
  { icon: LanguagesIcon, color: "text-pink-400", bg: "bg-pink-500/10" },
  { icon: Headphones, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { icon: Gamepad2, color: "text-rose-400", bg: "bg-rose-500/10" },
];

const t = {
  en: {
    title: "Skills",
    skills: [
      "Server Administration",
      "IT Support & Repair",
      "Windows Setup & Deployment",
      "PC Building & Hardware",
      "DTP (InDesign / Illustrator)",
      "Arabic Translation QC",
      "Simultaneous Interpretation",
      "Gaming & Tech Expertise",
    ],
  },
  ja: {
    title: "スキル",
    skills: [
      "サーバー管理",
      "ITサポート & 修理",
      "Windows構築 & 導入",
      "PC自作 & ハードウェア",
      "DTP (InDesign / Illustrator)",
      "アラビア語翻訳QC",
      "同時通訳",
      "ゲーミング & テクノロジー",
    ],
  },
};

export function Skills() {
  const text = useT(t);

  return (
    <section id="skills" className="py-20 md:py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            variants={fadeInUp}
            custom={0}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            <Wrench className="inline w-7 h-7 md:w-8 md:h-8 mr-3 text-purple-400" />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {text.title}
            </span>
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {text.skills.map((name, i) => {
              const meta = skillMeta[i];
              const Icon = meta.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  custom={Math.min(i + 1, 5)}
                  className="bg-[#111] border border-gray-800 rounded-xl p-4 sm:p-5 hover:border-gray-700 transition-all duration-300 text-center"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${meta.bg} flex items-center justify-center mx-auto mb-3`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${meta.color}`} />
                  </div>
                  <p className="text-white font-medium text-xs sm:text-sm leading-snug">{name}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
