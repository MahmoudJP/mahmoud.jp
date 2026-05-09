"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { useT } from "@/lib/i18n";

const copy = {
  en: { greeting: "Three languages.", name: "One story." },
  ja: { greeting: "三つの言語、", name: "一つの物語。" },
  ar: { greeting: "بين ثلاث لغات…", name: "قصة واحدة" },
};

export function IntroSplash() {
  const [show, setShow] = useState(true);
  const t = useT(copy);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => setShow(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!show) {
      document.body.style.overflow = "";
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onClick={() => setShow(false)}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-black cursor-pointer"
        >
          <div className="absolute inset-0 h-full w-full">
            <SparklesCore
              id="intro-sparkles"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={100}
              className="h-full w-full"
              particleColor="#FFFFFF"
              speed={1}
            />
          </div>

          <div className="relative z-20 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400 md:text-6xl lg:text-7xl"
            >
              {t.greeting}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-base text-neutral-300 md:text-lg"
            >
              {t.name}
            </motion.p>
          </div>

          <div className="pointer-events-none absolute inset-0 h-full w-full bg-black [mask-image:radial-gradient(circle_at_center,transparent_30%,black)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
