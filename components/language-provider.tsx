"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  dictionaries,
  type Dictionary,
  type Locale,
} from "@/lib/i18n/dictionaries";

const STORAGE_KEY = "jtt-locale";
const SCROLL_KEY = "jtt-scroll";
const DEFAULT_LOCALE: Locale = "pt";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: dictionaries[DEFAULT_LOCALE],
});

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function readStoredLocale(): Locale {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "pt";
  } catch {
    return DEFAULT_LOCALE;
  }
}

/**
 * Language provider — pt-BR default, en-US optional.
 * Persisted in localStorage via useSyncExternalStore: the server and the
 * first client render both use the default locale (no hydration mismatch),
 * then React re-reads the stored value after hydration. <html lang> stays
 * in sync for accessibility and SEO.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribe,
    readStoredLocale,
    () => DEFAULT_LOCALE
  );

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
        // Full reload so every animation measures the new copy fresh.
        // Keep the scroll position to avoid throwing the user back to top.
        window.sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
      } catch {
        // storage unavailable — reload still applies the session locale
      }
      window.location.reload();
    },
    [locale]
  );

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en-US";
    // Restore the pre-reload scroll position after a language switch.
    try {
      const saved = window.sessionStorage.getItem(SCROLL_KEY);
      if (saved !== null) {
        window.sessionStorage.removeItem(SCROLL_KEY);
        const y = parseInt(saved, 10);
        if (!Number.isNaN(y)) {
          requestAnimationFrame(() => window.scrollTo(0, y));
        }
      }
    } catch {
      // storage unavailable — stay at the top
    }
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale, setLocale]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
