"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Home as HomeIcon, FolderGit2, Wrench, Mail } from "lucide-react";
import { useT } from "@/lib/i18n";
import { LocaleToggle } from "@/components/LocaleToggle";

const NAV = [
  { href: "/", key: "home", icon: HomeIcon },
  { href: "/projects", key: "projects", icon: FolderGit2 },
  { href: "/uses", key: "uses", icon: Wrench },
  { href: "/#contact", key: "contact", icon: Mail },
] as const;

const navLabels = {
  en: { home: "Home", projects: "Projects", uses: "Uses", contact: "Contact" },
  ja: { home: "ホーム", projects: "プロジェクト", uses: "使用ツール", contact: "お問合せ" },
};

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/#contact") return false;
  return pathname === href || pathname.startsWith(href + "/");
}

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const labels = useT(navLabels);
  const pathname = usePathname() ?? "/";

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-gray-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          MA
        </Link>

        <div className="hidden md:flex items-center gap-3">
          <div className="relative flex items-center gap-1 rounded-full border border-gray-800/70 bg-[#0d0d12]/60 backdrop-blur-sm p-1">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 ${
                    active ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/25 to-blue-500/25 border border-purple-400/30 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="relative w-3.5 h-3.5 opacity-80" />
                  <span className="relative">{labels[item.key]}</span>
                </Link>
              );
            })}
          </div>
          <LocaleToggle className="ml-1" />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LocaleToggle />
          <button
            className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-gray-800/50 px-4 pb-4"
        >
          <div className="grid gap-1.5">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 text-white"
                      : "border border-transparent text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-80" />
                  <span>{labels[item.key]}</span>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
