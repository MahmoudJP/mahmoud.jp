"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Home as HomeIcon, FolderGit2, Wrench, Mail, PenLine, X } from "lucide-react";
import { useT } from "@/lib/i18n";
import { LocaleToggle } from "@/components/LocaleToggle";

const NAV = [
  { href: "/", key: "home", icon: HomeIcon },
  { href: "/projects", key: "projects", icon: FolderGit2 },
  { href: "/writing", key: "writing", icon: PenLine },
  { href: "/uses", key: "uses", icon: Wrench },
  { href: "/#contact", key: "contact", icon: Mail },
] as const;

const navLabels = {
  en: { home: "Home", projects: "Projects", writing: "Writing", uses: "Uses", contact: "Contact" },
  ja: { home: "ホーム", projects: "プロジェクト", writing: "ノート", uses: "使用ツール", contact: "お問合せ" },
  ar: { home: "الرئيسية", projects: "المشاريع", writing: "الكتابة", uses: "الأدوات", contact: "تواصل" },
};

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/#contact") return false;
  return pathname === href || pathname.startsWith(href + "/");
}

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [avatarOpen, setAvatarOpen] = React.useState(false);
  const labels = useT(navLabels);
  const pathname = usePathname() ?? "/";

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (!avatarOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAvatarOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [avatarOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-lg shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setAvatarOpen(true)}
            aria-label="View photo"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-[2px] shadow-md shadow-blue-500/20 isolate hover:scale-105 hover:shadow-blue-500/40 transition-transform duration-200 cursor-pointer"
          >
            <span className="block w-full h-full rounded-full overflow-hidden relative [transform:translateZ(0)]">
              <Image
                src="/mahmoud-cropped.jpg"
                alt="Mahmoud Adel"
                fill
                sizes="48px"
                className="object-cover scale-105 contrast-[1.05] brightness-[1.1]"
              />
            </span>
          </button>
          <Link
            href="/"
            aria-label="Home"
            className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            MA
          </Link>
        </div>

        <div className="relative flex items-center gap-0.5 rounded-full border border-gray-800/80 bg-[#0d0d12]/70 backdrop-blur-md p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={labels[item.key]}
                className={`relative px-2.5 sm:px-3 md:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-150 flex items-center gap-1 sm:gap-1.5 ${
                  active
                    ? "text-white bg-gradient-to-b from-white/[0.08] to-white/[0.02] ring-1 ring-white/10 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_4px_16px_-4px_rgba(139,92,246,0.25)]"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 transition-colors ${
                    active ? "text-blue-300" : "opacity-70"
                  }`}
                />
                <span className="whitespace-nowrap">{labels[item.key]}</span>
              </Link>
            );
          })}
        </div>

        <LocaleToggle className="shrink-0" />
      </div>

      <AnimatePresence>
        {avatarOpen && (
          <motion.div
            key="avatar-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setAvatarOpen(false)}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 backdrop-blur-sm cursor-zoom-out p-4"
          >
            <button
              type="button"
              onClick={() => setAvatarOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[min(90vw,520px)] aspect-square rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-500 p-[3px] shadow-2xl shadow-blue-500/30"
            >
              <span className="block w-full h-full rounded-full overflow-hidden relative">
                <Image
                  src="/mahmoud.jpg"
                  alt="Mahmoud Adel"
                  fill
                  priority
                  sizes="(max-width: 640px) 90vw, 520px"
                  className="object-cover"
                />
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
