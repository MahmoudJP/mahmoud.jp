"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Download, Cloud, Monitor, Sparkles, ArrowUpRight } from "lucide-react";
import { Particles } from "@/components/Particles";
import { useT } from "@/lib/i18n";

const t = {
  en: {
    tagline: "Trilingual Professional in Tokyo · DTP Specialist · Interpreter",
    founder: "Founder · DTP Master app",
    credentials: [
      { label: "AWS Certified · Studying Cloud Engineering" },
      { label: "AI Power User" },
    ],
    contact: "Contact Me",
    learnMore: "Learn More",
    cv: "CV",
  },
  ja: {
    tagline: "東京在住のトリリンガル・DTPスペシャリスト・通訳者",
    founder: "ファウンダー · DTP Master アプリ",
    credentials: [
      { label: "AWS認定 · クラウドエンジニアリング学習中" },
      { label: "AI活用エキスパート" },
    ],
    contact: "お問い合わせ",
    learnMore: "詳しく見る",
    cv: "履歴書",
  },
  ar: {
    tagline: "محترف ثلاثي اللغات في طوكيو · أخصائي DTP · مترجم فوري",
    founder: "المؤسس · تطبيق DTP Master",
    credentials: [
      { label: "معتمد من AWS · أدرس هندسة السحابة" },
      { label: "مستخدم محترف للذكاء الاصطناعي" },
    ],
    contact: "تواصل معي",
    learnMore: "اعرف المزيد",
    cv: "السيرة الذاتية",
  },
};

const credentialMeta = [
  { icon: Cloud, color: "text-orange-300", bg: "bg-orange-500/10", border: "border-orange-500/30" },
  { icon: Sparkles, color: "text-sky-300", bg: "bg-sky-500/10", border: "border-sky-500/30" },
];

export function Hero() {
  const text = useT(t);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1a1a2e_0%,_#0a0a0a_70%)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <Particles />

      <div className="relative z-10 text-center px-6 max-w-4xl w-full py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-[3px] shadow-xl shadow-blue-500/20">
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <Image
                src="/mahmoud-cropped.jpg"
                alt="Mahmoud Adel"
                fill
                priority
                sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 160px"
                className="object-cover scale-105 contrast-[1.05] brightness-[1.1]"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#0a0a0a]/30 to-transparent" />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4"
        >
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Mahmoud Adel
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-base sm:text-xl md:text-2xl text-blue-300 mb-5 font-light"
        >
          {text.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <Link
            href="/projects/dtp-master"
            className="group relative inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-blue-500/15 text-cyan-100 text-sm sm:text-base font-medium shadow-[0_0_28px_-6px_rgba(34,211,238,0.45)] hover:shadow-[0_0_40px_-4px_rgba(34,211,238,0.7)] hover:border-cyan-300/70 hover:-translate-y-0.5 transition-all duration-300"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-70 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
            </span>
            <Monitor className="relative w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            <span className="relative">{text.founder}</span>
            <ArrowUpRight className="relative w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {text.credentials.map((cred, i) => {
            const meta = credentialMeta[i];
            const Icon = meta.icon;
            return (
              <span
                key={i}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${meta.border} ${meta.bg} ${meta.color} text-xs sm:text-sm`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {cred.label}
              </span>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mt-4"
        >
          <a
            href="#contact"
            className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium text-sm sm:text-base hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-blue-500/20 whitespace-nowrap"
          >
            {text.contact}
          </a>
          <a
            href="#about"
            className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-gray-600 text-gray-300 text-sm sm:text-base hover:border-gray-400 hover:text-white transition-all duration-300 whitespace-nowrap"
          >
            {text.learnMore}
          </a>
          <a
            href="/mahmoud-cv.pdf"
            download
            className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-blue-500/30 text-blue-300 text-sm sm:text-base hover:bg-blue-500/10 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            {text.cv}
          </a>
          <a
            href="https://www.linkedin.com/in/mahmoud-adel-jp"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-blue-500/30 text-blue-300 text-sm sm:text-base hover:bg-blue-500/10 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="w-6 h-6 text-gray-500 animate-bounce" />
      </motion.div>
    </section>
  );
}
