"use client";

import { useLocale } from "@/lib/i18n";

export function LocaleToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale, ready } = useLocale();

  if (!ready) {
    return (
      <div className={`inline-flex rounded-full border border-gray-700/50 bg-[#0f0f14] p-0.5 opacity-50 ${className}`}>
        <span className="px-2.5 py-1 text-xs font-medium text-gray-400">EN</span>
        <span className="px-2.5 py-1 text-xs font-medium text-gray-400">日本語</span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex rounded-full border border-gray-700/60 bg-[#0f0f14]/80 backdrop-blur p-0.5 ${className}`}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
          locale === "en"
            ? "bg-purple-500/20 text-white"
            : "text-gray-400 hover:text-white"
        }`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("ja")}
        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
          locale === "ja"
            ? "bg-purple-500/20 text-white"
            : "text-gray-400 hover:text-white"
        }`}
        aria-pressed={locale === "ja"}
      >
        日本語
      </button>
    </div>
  );
}
