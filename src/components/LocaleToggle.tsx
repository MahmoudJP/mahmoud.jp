"use client";

import { useLocale, type Locale } from "@/lib/i18n";

const OPTIONS: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ja", label: "JA" },
  { code: "ar", label: "AR" },
];

export function LocaleToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale, ready } = useLocale();

  if (!ready) {
    return (
      <div className={`inline-flex rounded-full border border-gray-700/50 bg-[#0f0f14] p-0.5 opacity-50 ${className}`}>
        {OPTIONS.map((o) => (
          <span key={o.code} className="px-2.5 py-1 text-xs font-medium text-gray-400">
            {o.label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`inline-flex rounded-full border border-gray-700/60 bg-[#0f0f14]/80 backdrop-blur p-0.5 ${className}`}
      role="group"
      aria-label="Language"
      dir="ltr"
    >
      {OPTIONS.map((o) => (
        <button
          key={o.code}
          type="button"
          onClick={() => setLocale(o.code)}
          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
            locale === o.code
              ? "bg-blue-500/20 text-white"
              : "text-gray-400 hover:text-white"
          }`}
          aria-pressed={locale === o.code}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
