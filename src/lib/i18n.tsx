"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Locale = "en" | "ja";

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

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "ja" || saved === "en") {
        setLocaleState(saved);
        document.documentElement.lang = saved;
      }
    } catch {}
    setReady(true);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {}
    document.documentElement.lang = l;
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
