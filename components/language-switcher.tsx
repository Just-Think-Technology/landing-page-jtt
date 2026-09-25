"use client";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";
import type { Locale } from "@/lib/i18n/dictionaries";

/**
 * Language switcher — segmented PT | EN control for the navbar.
 * CSS-only transitions; the choice persists via LanguageProvider.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage();

  const options: { value: Locale; label: string }[] = [
    { value: "pt", label: "PT" },
    { value: "en", label: "EN" },
  ];

  return (
    <div
      role="group"
      aria-label={t.languageLabel}
      className={cn(
        "inline-flex items-center rounded-full border border-[#242424] bg-[#0D0D0D] p-1",
        className
      )}
    >
      {options.map((opt) => {
        const active = locale === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLocale(opt.value)}
            aria-pressed={active}
            className={cn(
              "rounded-full px-2.5 py-1.5 font-technical text-xs tracking-[0.15em] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#4F7CFF] sm:px-3",
              active
                ? "bg-white text-black"
                : "text-[#8A8A8A] hover:text-white"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
