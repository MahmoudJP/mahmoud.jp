"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, Loader2, FileText, CheckCircle2 } from "lucide-react";
import { useT } from "@/lib/i18n";

const t = {
  en: {
    title: "Request my CV",
    blurb: "Leave your email and I'll send my CV over. A short note about who you are is welcome but optional.",
    emailLabel: "Your email",
    emailPlaceholder: "your@email.com",
    messageLabel: "Message (optional)",
    messagePlaceholder: "A line about you or your company…",
    send: "Send request",
    sending: "Sending…",
    sent: "Request sent — I'll get back to you with my CV.",
    error: "Couldn't send — please try again, or email m@mahmoud.jp directly.",
    close: "Close",
  },
  ja: {
    title: "履歴書をリクエスト",
    blurb: "メールアドレスをご記入いただければ、履歴書をお送りします。ご所属などの一言があれば嬉しいですが、任意です。",
    emailLabel: "メールアドレス",
    emailPlaceholder: "your@email.com",
    messageLabel: "メッセージ（任意）",
    messagePlaceholder: "ご自身や会社について一言…",
    send: "リクエストを送る",
    sending: "送信中…",
    sent: "送信しました — 履歴書を添えてご連絡します。",
    error: "送信に失敗しました — もう一度お試しいただくか、m@mahmoud.jp までご連絡ください。",
    close: "閉じる",
  },
  ar: {
    title: "اطلب سيرتي الذاتية",
    blurb: "اترك بريدك الإلكتروني وسأرسل لك سيرتي الذاتية. سطر تعريفي عنك أو عن شركتك مُرحَّب به لكنه اختياري.",
    emailLabel: "بريدك الإلكتروني",
    emailPlaceholder: "your@email.com",
    messageLabel: "رسالة (اختياري)",
    messagePlaceholder: "سطر عنك أو عن شركتك…",
    send: "إرسال الطلب",
    sending: "جارٍ الإرسال…",
    sent: "تم الإرسال — سأعود إليك بسيرتي الذاتية.",
    error: "تعذّر الإرسال — حاول مرة أخرى أو راسلني على m@mahmoud.jp مباشرة.",
    close: "إغلاق",
  },
};

type Status = "idle" | "sending" | "sent" | "error";

export function RequestCvModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const text = useT(t);
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [website, setWebsite] = React.useState(""); // honeypot
  const [status, setStatus] = React.useState<Status>("idle");

  // Close on Escape
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Reset state shortly after closing
  React.useEffect(() => {
    if (open) return;
    const id = setTimeout(() => {
      setStatus("idle");
      setEmail("");
      setMessage("");
    }, 300);
    return () => clearTimeout(id);
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/request-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message, website }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={text.title}
            className="relative w-full max-w-md rounded-2xl border border-gray-700/70 bg-[#05070c] p-6 sm:p-7 shadow-2xl shadow-black/50"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={text.close}
              className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300">
                <FileText className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-white">{text.title}</h2>
            </div>

            {status === "sent" ? (
              <div className="flex flex-col items-center text-center gap-3 py-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                <p className="text-gray-200">{text.sent}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-sm text-gray-400 leading-relaxed">{text.blurb}</p>

                {/* Honeypot — hidden from real users */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="hidden"
                  aria-hidden
                />

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1.5">
                    {text.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={text.emailPlaceholder}
                    className="w-full rounded-lg border border-gray-700 bg-[#05070c] px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:border-blue-500/60 focus:outline-none focus:ring-1 focus:ring-blue-500/40 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1.5">
                    {text.messageLabel}
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={text.messagePlaceholder}
                    className="w-full resize-none rounded-lg border border-gray-700 bg-[#05070c] px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:border-blue-500/60 focus:outline-none focus:ring-1 focus:ring-blue-500/40 transition-colors"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-400">{text.error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2.5 text-sm font-medium text-white hover:from-blue-500 hover:to-cyan-500 disabled:opacity-60 transition-all"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {text.sending}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {text.send}
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
