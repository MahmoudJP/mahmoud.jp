"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useT } from "@/lib/i18n";

const t = {
  en: {
    title: "Education",
    jpTag: "JP 日本語",
    items: [
      {
        period: "2024 - 2025",
        duration: "1 yr",
        school: "Tokyo Language and Culture Academy",
        detail: "Japanese Language Studies",
        japanese: true,
        icon: "book",
      },
      {
        period: "2017 - 2022",
        duration: "4 yrs",
        school: "Benha University",
        detail: "Faculty of Arts — Japanese Language & Literature",
        japanese: true,
        icon: "cap",
      },
      {
        period: "2014 - 2017",
        duration: "3 yrs",
        school: "Elmasryeen High School",
        detail: "High School Diploma",
        japanese: false,
        icon: "cap",
      },
    ],
  },
  ja: {
    title: "学歴",
    jpTag: "日本語",
    items: [
      {
        period: "2024年 - 2025年",
        duration: "1年",
        school: "東京言語文化アカデミー",
        detail: "日本語学習",
        japanese: true,
        icon: "book",
      },
      {
        period: "2017年 - 2022年",
        duration: "4年",
        school: "バンハ大学",
        detail: "文学部 — 日本語・日本文学科",
        japanese: true,
        icon: "cap",
      },
      {
        period: "2014年 - 2017年",
        duration: "3年",
        school: "エル・マスリーン高等学校",
        detail: "高等学校卒業",
        japanese: false,
        icon: "cap",
      },
    ],
  },
};

export function Education() {
  const text = useT(t);

  return (
    <section id="education" className="py-20 md:py-24 px-6">
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
            <GraduationCap className="inline w-7 h-7 md:w-8 md:h-8 mr-3 text-blue-400" />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {text.title}
            </span>
          </motion.h2>

          <div className="grid gap-4">
            {text.items.map((edu, i) => {
              const Icon = edu.icon === "book" ? BookOpen : GraduationCap;
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  custom={i + 1}
                  className={`bg-[#111] border rounded-xl p-5 sm:p-6 transition-all duration-300 flex items-start gap-3 sm:gap-4 ${
                    edu.japanese
                      ? "border-red-500/20 hover:border-red-500/40"
                      : "border-gray-800 hover:border-blue-500/30"
                  }`}
                >
                  <div className={`flex-shrink-0 p-2.5 sm:p-3 rounded-lg ${edu.japanese ? "bg-red-500/10" : "bg-blue-500/10"}`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${edu.japanese ? "text-red-400" : "text-blue-400"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap sm:flex-nowrap">
                      <div className="min-w-0">
                        <p className={`text-xs sm:text-sm ${edu.japanese ? "text-red-300" : "text-blue-300"}`}>
                          {edu.period}
                          {edu.duration && <span className="text-gray-500"> · {edu.duration}</span>}
                        </p>
                        <h3 className="text-base sm:text-lg font-bold text-white leading-snug">{edu.school}</h3>
                        <p className="text-gray-400 text-sm mt-0.5">{edu.detail}</p>
                      </div>
                      {edu.japanese && (
                        <span className="flex-shrink-0 px-2 py-1 rounded-md bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">
                          {text.jpTag}
                        </span>
                      )}
                    </div>
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
