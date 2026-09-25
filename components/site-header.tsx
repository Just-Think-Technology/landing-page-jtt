"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ScrollLink } from "@/components/scroll-link";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={reduce ? false : { y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-[#242424] bg-[#050505]/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <ScrollLink
          to="top"
          className="flex items-center gap-2.5"
          ariaLabel={t.backToTop}
        >
          <span className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-white">
            <Image
              src="/sem-fundo-logo.png"
              alt=""
              width={36}
              height={36}
              className="size-7 object-contain"
              priority
            />
          </span>
          <span className="font-display text-sm font-bold tracking-[0.18em] text-white">
            JTT<span className="text-[#4F7CFF]">.</span>
          </span>
        </ScrollLink>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {t.nav.map((item) => (
            <ScrollLink
              key={item.href}
              to={item.href.replace("#", "")}
              className="text-sm text-[#8A8A8A] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#4F7CFF]"
            >
              {item.label}
            </ScrollLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <Button
            asChild
            className="rounded-full bg-white text-black hover:bg-[#4F7CFF] hover:text-white"
          >
            <ScrollLink to="contact">{t.getInTouch}</ScrollLink>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md text-white"
            aria-expanded={open}
            aria-label={open ? t.closeMenu : t.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          aria-label="Mobile"
          className="border-t border-[#242424] bg-[#0D0D0D] px-5 pt-2 pb-6 md:hidden"
        >
          {t.nav.map((item) => (
            <ScrollLink
              key={item.href}
              to={item.href.replace("#", "")}
              onClick={() => setOpen(false)}
              className="block border-b border-[#242424] py-4 text-base text-white last:border-0"
            >
              {item.label}
            </ScrollLink>
          ))}
          <Button
            asChild
            className="mt-4 w-full rounded-full bg-white text-black hover:bg-[#4F7CFF] hover:text-white"
          >
            <ScrollLink to="contact" onClick={() => setOpen(false)}>
              {t.getInTouch}
            </ScrollLink>
          </Button>
        </nav>
      ) : null}
      {/* Scroll progress — cinematic continuity between sections */}
      {reduce ? null : (
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-[#4F7CFF] via-[#4F7CFF]/70 to-transparent"
        />
      )}
    </motion.header>
  );
}
