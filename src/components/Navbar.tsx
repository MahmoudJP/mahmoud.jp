"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  FolderGit2,
  Home as HomeIcon,
  Mail,
  Menu,
  PenLine,
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
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname() ?? "/";
  const text = useT(labels);

  React.useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

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

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "border-b border-white/7 bg-[#06101d]/88 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-8 lg:px-12">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-cyan-300/20 bg-cyan-300/[0.06]">
            <Image
              src="/logo-mark.svg"
              alt=""
              width={28}
              height={26}
              priority
              className="h-6 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block truncate text-sm font-semibold tracking-tight text-white">
              Mahmoud Adel
            </span>
            <span className="block truncate font-mono text-[9px] uppercase tracking-[0.17em] text-slate-500">
              {text.brand}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/8 bg-[#08111e]/75 p-1 shadow-lg shadow-black/20 backdrop-blur lg:flex">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium transition-colors ${
                  active
                    ? "bg-white/[0.08] text-white"
                    : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${active ? "text-cyan-300" : ""}`} />
                {text[item.key]}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <LocaleToggle className="shrink-0" />
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? text.close : text.menu}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-slate-200 lg:hidden"
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
            className="border-t border-white/7 bg-[#06101d]/97 px-4 pb-6 pt-4 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto grid max-w-7xl gap-2">
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
                          : "border-white/7 bg-white/[0.025] text-slate-300"
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
