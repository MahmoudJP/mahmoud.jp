"use client";

import { motion } from "framer-motion";
import { MapPin, Globe, Briefcase } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useT } from "@/lib/i18n";

const t = {
  en: {
    title: "About Me",
    p1a: "As a trilingual professional fluent in ",
    arabic: "Arabic",
    comma1: ", ",
    japanese: "Japanese",
    comma2: ", and ",
    english: "English",
    p1b: ", I've built strong experience in interpretation across Egypt and Japan. I volunteer regularly and help bridge cross-cultural communication.",
    p2: "Currently working in DTP operations and Arabic QC, I bring precision and attention to detail to every project. My background lets me adapt across a wide range of business needs.",
    locationLabel: "Location",
    locationValue: "Tokyo, Japan",
    nationalityLabel: "Nationality",
    nationalityValue: "Egyptian",
    roleLabel: "Current Role",
    roleValue: "SHAMS Co., Ltd.",
  },
  ja: {
    title: "自己紹介",
    p1a: "",
    arabic: "アラビア語",
    comma1: "・",
    japanese: "日本語",
    comma2: "・",
    english: "英語",
    p1b: "の3言語に堪能なトリリンガルとして、エジプトと日本で通訳の豊富な経験を積んできました。ボランティア活動にも定期的に参加し、異文化間のコミュニケーションの橋渡しに携わっています。",
    p2: "現在はDTPオペレーション業務とアラビア語の品質チェックを担当し、どのプロジェクトにも正確さと細やかな気配りを持って取り組んでいます。多様なバックグラウンドを活かし、幅広いビジネスニーズに柔軟に対応できます。",
    locationLabel: "所在地",
    locationValue: "東京、日本",
    nationalityLabel: "国籍",
    nationalityValue: "エジプト",
    roleLabel: "現職",
    roleValue: "株式会社SHAMS",
  },
  ar: {
    title: "نبذة عني",
    p1a: "كمحترف ثلاثي اللغات يتقن ",
    arabic: "العربية",
    comma1: " و",
    japanese: "اليابانية",
    comma2: " و",
    english: "الإنجليزية",
    p1b: "، اكتسبت خبرة قوية في الترجمة الفورية بين مصر واليابان. أتطوع بانتظام وأساعد في جسر الفجوة بين الثقافات.",
    p2: "أعمل حالياً في عمليات DTP ومراجعة جودة اللغة العربية، وأحرص على الدقة والتفاصيل في كل مشروع. خلفيتي تمكنني من التكيف مع مختلف احتياجات الأعمال.",
    locationLabel: "الموقع",
    locationValue: "طوكيو، اليابان",
    nationalityLabel: "الجنسية",
    nationalityValue: "مصري",
    roleLabel: "الوظيفة الحالية",
    roleValue: "شركة SHAMS",
  },
};

export function About() {
  const text = useT(t);

  return (
    <section id="about" className="py-20 md:py-24 px-6">
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
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
          >
            <span className="bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
              {text.title}
            </span>
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            custom={1}
            className="bg-[#111] border border-gray-800 rounded-2xl p-6 sm:p-8 md:p-10"
          >
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
              {text.p1a}
              <span className="text-blue-300 font-medium">{text.arabic}</span>
              {text.comma1}
              <span className="text-blue-300 font-medium">{text.japanese}</span>
              {text.comma2}
              <span className="text-green-300 font-medium">{text.english}</span>
              {text.p1b}
            </p>
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg mt-4">
              {text.p2}
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            custom={2}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6"
          >
            <div className="bg-[#111] border border-gray-800 rounded-xl p-5 sm:p-6 text-center">
              <MapPin className="w-6 h-6 text-blue-400 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">{text.locationLabel}</p>
              <p className="text-white font-medium">{text.locationValue}</p>
            </div>
            <div className="bg-[#111] border border-gray-800 rounded-xl p-5 sm:p-6 text-center">
              <Globe className="w-6 h-6 text-blue-400 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">{text.nationalityLabel}</p>
              <p className="text-white font-medium">{text.nationalityValue}</p>
            </div>
            <div className="bg-[#111] border border-gray-800 rounded-xl p-5 sm:p-6 text-center">
              <Briefcase className="w-6 h-6 text-green-400 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">{text.roleLabel}</p>
              <p className="text-white font-medium">{text.roleValue}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
