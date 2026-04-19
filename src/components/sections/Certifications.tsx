"use client";

import { motion } from "framer-motion";
import { Award, Cloud, Shield } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useT } from "@/lib/i18n";

const certMeta = [
  { icon: Cloud, color: "text-orange-400", bg: "bg-orange-500/10", code: "CLF-C02" },
  { icon: Shield, color: "text-red-400", bg: "bg-red-500/10" },
];

const t = {
  en: {
    title: "Certifications",
    items: [
      { year: "2026", name: "AWS Certified Cloud Practitioner" },
      { year: "2025", name: "Fortinet Certified Cybersecurity Fundamentals" },
    ],
  },
  ja: {
    title: "資格",
    items: [
      { year: "2026年", name: "AWS認定クラウドプラクティショナー" },
      { year: "2025年", name: "Fortinet認定サイバーセキュリティ基礎" },
    ],
  },
};

export function Certifications() {
  const text = useT(t);

  return (
    <section id="certifications" className="py-20 md:py-24 px-6">
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
            <Award className="inline w-7 h-7 md:w-8 md:h-8 mr-3 text-yellow-400" />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {text.title}
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {text.items.map((cert, i) => {
              const meta = certMeta[i];
              const Icon = meta.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  custom={i + 1}
                  className="bg-[#111] border border-gray-800 rounded-xl p-5 sm:p-6 hover:border-yellow-500/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 p-3 rounded-lg ${meta.bg}`}>
                      <Icon className={`w-6 h-6 ${meta.color}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-yellow-300/70 text-sm">{cert.year}</p>
                        {meta.code && (
                          <span className="px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-300 text-xs font-mono border border-orange-500/20">
                            {meta.code}
                          </span>
                        )}
                      </div>
                      <h3 className="text-white font-bold leading-snug">{cert.name}</h3>
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
