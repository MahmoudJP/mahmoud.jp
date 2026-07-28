"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  FolderGit2,
  Home as HomeIcon,
  Mail,
  Menu,
  PenLine,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import { LocaleToggle } from "@/components/LocaleToggle";
import { useT } from "@/lib/i18n";

const NAV = [
  { href: "/", key: "home", icon: HomeIcon },
  { href: "/projects", key: "projects", icon: FolderGit2 },
  { href: "/writing", key: "writing", icon: PenLine },
  { href: "/uses", key: "uses", icon: Wrench },
  { href: "/#contact", key: "contact", icon: Mail },
] as const;

const labels = {
  en: {
    home: "Home",
    projects: "Projects",
    writing: "Writing",
    uses: "Uses",
    contact: "Contact",
    menu: "Menu",
    close: "Close menu",
    brand: "Multilingual product builder",
  },
  ja: {
    home: "ホーム",
    projects: "プロジェクト",
    writing: "ノート",
    uses: "使用ツール",
    contact: "お問い合わせ",
    menu: "メニュー",
    close: "メニューを閉じる",
    brand: "多言語プロダクトビルダー",
  },
  ar: {
    home: "الرئيسية",
    projects: "المشاريع",
    writing: "الكتابة",
    uses: "الأدوات",
    contact: "تواصل",
    menu: "القائمة",
    close: "إغلاق القائمة",
    brand: "باني منتجات متعددة اللغات",
  },
};

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/#contact") return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [cursorEffect, setCursorEffect] = React.useState(true);
  const pathname = usePathname() ?? "/";
  const text = useT(labels);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  React.useEffect(() => {
    setCursorEffect(window.localStorage.getItem("mahmoud-cursor-effect") !== "off");
  }, []);

  const toggleCursorEffect = () => {
    const enabled = !cursorEffect;
    setCursorEffect(enabled);
    window.localStorage.setItem("mahmoud-cursor-effect", enabled ? "on" : "off");
    window.dispatchEvent(
      new CustomEvent("cursor-effect-change", { detail: { enabled } }),
    );
  };

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 px-5 pt-5 sm:px-8 lg:px-12"
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link
          href="/"
          className="group min-w-0 drop-shadow-[0_2px_10px_rgba(2,6,23,0.95)]"
        >
          <span className="block truncate text-base font-semibold tracking-[-0.035em] text-white leading-none">
            Mahmoud Adel
          </span>
          <span className="mt-1.5 hidden whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.11em] text-cyan-100 sm:block">
            {text.brand}
          </span>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative inline-flex items-center gap-1.5 py-2 text-xs font-medium transition-colors ${
                  active
                    ? "text-white after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-cyan-300"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${active ? "text-cyan-300" : ""}`} />
                {text[item.key]}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 drop-shadow-[0_2px_10px_rgba(2,6,23,0.95)]">
          <LocaleToggle className="shrink-0" />
          <button
            type="button"
            onClick={toggleCursorEffect}
            aria-pressed={cursorEffect}
            aria-label={cursorEffect ? "Disable cursor effect" : "Enable cursor effect"}
            title={cursorEffect ? "Turn off cursor effect" : "Turn on cursor effect"}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
              cursorEffect
                ? "bg-cyan-300/10 text-cyan-200 hover:bg-cyan-300/15"
                : "bg-[#05070c] text-slate-500 hover:bg-[#0b1525] hover:text-slate-300"
            }`}
          >
            <Sparkles className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? text.close : text.menu}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#05070c] text-slate-200 transition-colors hover:bg-[#0b1525] lg:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-[calc(100%+0.9rem)] w-[min(22rem,calc(100vw-2.5rem))] rounded-2xl bg-[#05070c] p-3 shadow-2xl shadow-black/40 lg:hidden"
          >
            <div className="grid gap-2">
              {NAV.map((item, index) => {
                const active = isActive(pathname, item.href);
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.035 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-sm font-medium ${
                        active
                          ? "border-cyan-300/20 bg-cyan-300/[0.07] text-white"
                          : "border-white/7 bg-[#05070c] text-slate-300"
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${active ? "text-cyan-300" : ""}`} />
                      {text[item.key]}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
