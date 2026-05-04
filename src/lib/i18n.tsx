"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Locale = "en" | "ja" | "ar";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  ready: boolean;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  setLocale: () => {},
  ready: false,
});

const STORAGE_KEY = "mahmoud-jp-locale";

function dirFor(l: Locale) {
  return l === "ar" ? "rtl" : "ltr";
}

function applyLocaleToDom(l: Locale) {
  document.documentElement.lang = l;
  document.documentElement.dir = dirFor(l);
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let savedLocale: Locale = "en";

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "ja" || saved === "en" || saved === "ar") {
        savedLocale = saved;
      }
    } catch {}

    applyLocaleToDom(savedLocale);

    queueMicrotask(() => {
      setLocaleState(savedLocale);
      setReady(true);
    });
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {}
    applyLocaleToDom(l);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, ready }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function useT<T extends Record<Locale, unknown>>(dict: T): T[Locale] {
  const { locale } = useLocale();
  return dict[locale];
}

export function useDir(): "rtl" | "ltr" {
  const { locale } = useLocale();
  return dirFor(locale);
}
