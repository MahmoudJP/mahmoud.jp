"use client";

import { motion } from "framer-motion";
import { PenLine, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Particles } from "@/components/Particles";
import { useT } from "@/lib/i18n";

const t = {
  en: {
    kicker: "Writing",
    heading: "Notes & articles.",
    sub: "Short write-ups on multilingual DTP, Arabic typesetting quirks, translation QC, and what I learn building DTP Master.",
    status: "Draft",
    soon: "Publishing soon — ping me if any of these sound useful and I'll prioritize it.",
    drafts: [
      {
        title: "Arabic in InDesign: the 5 mistakes I see every week",
        summary: "From broken shaping to mirrored number sequences — the recurring issues I catch when QC'ing Arabic DTP work, and how to fix them once and for all.",
      },
      {
        title: "How I'm building DTP Master",
        summary: "Shipping a signed Windows app as a solo developer — Python, Nuitka, Firebase, and the pipeline that quietly pushes updates to every user.",
      },
      {
        title: "Japanese ↔ Arabic: the translation pitfalls nobody talks about",
        summary: "Why literal JA→AR translation breaks readability, and the small adjustments that make a technical document actually usable.",
      },
    ],
  },
  ja: {
    kicker: "ライティング",
    heading: "ノート & 記事",
    sub: "多言語DTP、アラビア語の組版、翻訳QC、そしてDTP Masterを作りながら学んだことについての短い記録。",
    status: "ドラフト",
    soon: "近日公開予定 — 興味のあるテーマがあれば連絡ください、優先して公開します。",
    drafts: [
      {
        title: "InDesignでのアラビア語:毎週目にする5つのミス",
        summary: "字形崩れから数字列のミラー化まで、アラビア語DTPのQC中によく見つける問題と、根本的に解決する方法。",
      },
      {
        title: "DTP Masterの作り方",
        summary: "個人開発者が署名付きWindowsアプリを出荷するまで — Python、Nuitka、Firebase、そして静かに全ユーザーへアップデートを届けるパイプライン。",
      },
      {
        title: "日本語 ⇔ アラビア語:誰も話さない翻訳の落とし穴",
        summary: "直訳が読みやすさを壊す理由と、技術ドキュメントを本当に使えるものにする小さな調整。",
      },
    ],
  },
  ar: {
    kicker: "الكتابة",
    heading: "ملاحظات ومقالات.",
    sub: "كتابات قصيرة عن DTP متعدد اللغات وتحديات تنضيد العربية ومراجعة جودة الترجمة وما أتعلمه أثناء بناء DTP Master.",
    status: "مسودة",
    soon: "قريباً — راسلني لو أي عنوان يهمّك وأنا أقدّم نشره.",
    drafts: [
      {
        title: "العربية في InDesign: ٥ أخطاء أشوفها كل أسبوع",
        summary: "من كسر الشكل للأرقام المقلوبة — المشاكل اللي بلاقيها في مراجعة DTP العربي، وإزاي تتحل بشكل نهائي.",
      },
      {
        title: "كيف أبني DTP Master",
        summary: "شحن تطبيق Windows موقّع كمطوّر فردي — Python، Nuitka، Firebase، وخط الأنابيب اللي بيدفع التحديثات بهدوء لكل مستخدم.",
      },
      {
        title: "ياباني ⇔ عربي: المطبّات اللي محدش بيتكلم فيها",
        summary: "ليه الترجمة الحرفية من الياباني للعربي بتكسر القراءة، والتعديلات الصغيرة اللي بتخلي المستند التقني قابل للاستخدام فعلاً.",
      },
    ],
  },
};

export default function WritingPage() {
  const text = useT(t);

  return (
    <>
      <Navbar />

      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1a1a2e_0%,_#0a0a0a_70%)]" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <Particles />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-300/80 mb-4">
            {text.kicker}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-[1.05]">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              {text.heading}
            </span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
            {text.sub}
          </p>
        </div>
      </section>

      <main className="relative pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="grid gap-4">
            {text.drafts.map((d, i) => (
              <motion.article
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                className="rounded-2xl border border-gray-800 bg-[#0f0f14] p-6 md:p-7"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-3.5 h-3.5 text-amber-400/70" />
                  <span className="text-xs uppercase tracking-[0.15em] text-amber-400/70">
                    {text.status}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-3 leading-snug">
                  {d.title}
                </h2>
                <p className="text-gray-400 leading-relaxed">{d.summary}</p>
              </motion.article>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 text-gray-500 text-sm text-center mt-10"
          >
            <PenLine className="w-4 h-4" />
            {text.soon}
          </motion.p>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
