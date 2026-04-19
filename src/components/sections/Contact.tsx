"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useT } from "@/lib/i18n";

const t = {
  en: {
    title: "Get In Touch",
    emailLabel: "Email",
    phoneLabel: "Phone",
    nameLabel: "Name",
    emailField: "Email",
    messageLabel: "Message",
    namePlaceholder: "Your name",
    emailPlaceholder: "your@email.com",
    messagePlaceholder: "Your message...",
    send: "Send Message",
    sent: "Sent!",
    subjectPrefix: "Message from",
    fromPrefix: "From:",
  },
  ja: {
    title: "お問い合わせ",
    emailLabel: "メール",
    phoneLabel: "電話番号",
    nameLabel: "お名前",
    emailField: "メールアドレス",
    messageLabel: "メッセージ",
    namePlaceholder: "お名前",
    emailPlaceholder: "your@email.com",
    messagePlaceholder: "メッセージをご記入ください...",
    send: "送信する",
    sent: "送信しました!",
    subjectPrefix: "お問い合わせ -",
    fromPrefix: "送信者:",
  },
};

export function Contact() {
  const text = useT(t);
  const [formData, setFormData] = React.useState({ name: "", email: "", message: "" });
  const [sent, setSent] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:m@mahmoud.jp?subject=${encodeURIComponent(
      `${text.subjectPrefix} ${formData.name}`
    )}&body=${encodeURIComponent(`${formData.message}\n\n${text.fromPrefix} ${formData.email}`)}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="py-20 md:py-24 px-6">
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
            <Mail className="inline w-7 h-7 md:w-8 md:h-8 mr-3 text-purple-400" />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {text.title}
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <motion.div variants={fadeInUp} custom={1} className="space-y-4">
              <a
                href="mailto:m@mahmoud.jp"
                className="bg-[#111] border border-gray-800 rounded-xl p-5 sm:p-6 hover:border-purple-500/30 transition-all duration-300 group block"
              >
                <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-purple-400 mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-gray-400 text-sm">{text.emailLabel}</p>
                <p className="text-white font-medium break-all">m@mahmoud.jp</p>
              </a>
              <a
                href="tel:08035455054"
                className="bg-[#111] border border-gray-800 rounded-xl p-5 sm:p-6 hover:border-blue-500/30 transition-all duration-300 group block"
              >
                <Phone className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400 mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-gray-400 text-sm">{text.phoneLabel}</p>
                <p className="text-white font-medium">080-3545-5054</p>
              </a>
            </motion.div>

            <motion.form
              variants={fadeInUp}
              custom={2}
              onSubmit={handleSubmit}
              className="bg-[#111] border border-gray-800 rounded-xl p-5 sm:p-6 space-y-4"
            >
              <div>
                <label className="text-gray-400 text-sm block mb-1">{text.nameLabel}</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder={text.namePlaceholder}
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">{text.emailField}</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder={text.emailPlaceholder}
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">{text.messageLabel}</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  placeholder={text.messagePlaceholder}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-500 hover:to-blue-500 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {sent ? text.sent : <><Send className="w-4 h-4" /> {text.send}</>}
              </button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
