"use client";

import Image from "next/image";
import { site } from "@/lib/site";
import { useLanguage } from "@/components/language-provider";
import { ScrollLink } from "@/components/scroll-link";

export function SiteFooter() {
  const { t } = useLanguage();
  const copy = t.footer;
  return (
    <footer className="border-t border-[#242424] bg-[#050505]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-white">
              <Image
                src="/sem-fundo-logo.png"
                alt=""
                width={36}
                height={36}
                className="size-7 object-contain"
              />
            </span>
            <span className="font-display text-sm font-bold tracking-[0.18em]">
              JTT<span className="text-[#4F7CFF]">.</span>
            </span>
          </p>
          <p className="mt-3 text-sm text-[#8A8A8A]">{copy.tagline}</p>
          <p className="mt-1 font-technical text-xs text-[#8A8A8A]">
            {copy.location}
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="font-technical text-xs tracking-[0.2em] text-[#8A8A8A] uppercase">
            {copy.navigate}
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {t.nav.map((item) => (
              <li key={item.href}>
                <ScrollLink
                  to={item.href.replace("#", "")}
                  className="text-white/80 hover:text-white"
                >
                  {item.label}
                </ScrollLink>
              </li>
            ))}
            <li>
              <ScrollLink to="contact" className="text-white/80 hover:text-white">
                {t.getInTouch}
              </ScrollLink>
            </li>
          </ul>
        </nav>
        <div>
          <p className="font-technical text-xs tracking-[0.2em] text-[#8A8A8A] uppercase">
            {copy.contact}
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="text-white/80 hover:text-white"
              >
                {site.contact.email}
              </a>
            </li>
            <li>
              <a
                href={site.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#242424]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-5 py-6 font-technical text-xs text-[#8A8A8A] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} {copy.rights}</p>
          <p>{copy.bottom}</p>
        </div>
      </div>
    </footer>
  );
}
