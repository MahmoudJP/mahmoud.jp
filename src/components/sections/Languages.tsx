"use client";

import { motion } from "framer-motion";
import { Languages as LanguagesIcon } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useT } from "@/lib/i18n";

const langStyles = [
  { code: "EG", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20", gradient: "from-green-500 to-emerald-500" },
  { code: "JP", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", gradient: "from-red-500 to-rose-500" },
  { code: "EN", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", gradient: "from-blue-500 to-cyan-500" },
];

const t = {
  en: {
    title: "Languages",
    items: [
      { name: "Arabic", level: "Native" },
      { name: "Japanese", level: "Fluent" },
      { name: "English", level: "Fluent" },
    ],
  },
  ja: {
    title: "言語",
    items: [
      { name: "アラビア語", level: "ネイティブ" },
      { name: "日本語", level: "流暢" },
      { name: "英語", level: "流暢" },
    ],
  },
};

export function Languages() {
  const text = useT(t);

  return (
    <section id="languages" className="py-20 md:py-24 px-6 bg-[#060606]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={fadeInUp}
            custom={0}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            <LanguagesIcon className="inline w-7 h-7 md:w-8 md:h-8 mr-3 text-green-400" />
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              {text.title}
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {text.items.map((lang, i) => {
              const s = langStyles[i];
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  custom={i + 1}
                  className={`bg-[#111] border ${s.border} rounded-xl p-5 sm:p-6 text-center hover:border-gray-600 transition-all duration-300`}
                >
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg`}>
                    {s.code}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{lang.name}</h3>
                  <span className={`inline-block px-4 py-1.5 rounded-full ${s.bg} ${s.color} text-sm font-medium`}>
                    {lang.level}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
