"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { useLoading } from "@/components/loading-provider";
import { ScrollLink } from "@/components/scroll-link";
import { HeroLogo } from "@/components/sections/hero-logo";

/**
 * Hero — cinematic one-shot entrance + scroll-linked parallax.
 * - Eyebrow fades/slides, headline lines rise inside overflow masks
 *   (clip reveal, transform-only), sub/CTAs follow with scale+blur.
 * - Content drifts up + fades on scroll; backdrop scales, fades and
 *   the accent glow travels — restrained to transform/opacity.
 */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const fadeItem: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.98, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineMask: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { t } = useLanguage();
  // The cinematic entrance only plays once the loading veil lifts,
  // so it never performs hidden behind the loader.
  const { loaded } = useLoading();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Content choreography on scroll: rises, shrinks slightly, fades.
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

  // Backdrop choreography: slow zoom-out + fade + glow drift.
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden lg:min-h-[92svh]"
    >
      {/* Cinematic backdrop — transform/opacity only */}
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { scale: bgScale, opacity: bgOpacity }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[#050505]" />
        <motion.div
          className="absolute inset-0"
          style={reduce ? undefined : { y: glowY }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, transparent 50%, #050505 96%), radial-gradient(ellipse 75% 55% at 50% 36%, rgba(79,124,255,0.32), transparent 70%), radial-gradient(ellipse 40% 28% at 78% 62%, rgba(79,124,255,0.12), transparent 70%), repeating-linear-gradient(to right, rgba(255,255,255,0.055) 0 1px, transparent 1px 96px), repeating-linear-gradient(to bottom, rgba(255,255,255,0.045) 0 1px, transparent 1px 96px)",
            }}
          />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
        {/* Fine top glow line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4F7CFF]/60 to-transparent" />
      </motion.div>

      <motion.div
        variants={reduce ? undefined : container}
        initial={reduce ? false : "hidden"}
        animate={reduce ? undefined : loaded ? "show" : "hidden"}
        style={
          reduce
            ? undefined
            : { y: contentY, opacity: contentOpacity, scale: contentScale }
        }
        className="relative mx-auto w-full max-w-7xl px-5 pt-28 pb-16 sm:px-8 sm:pb-20 lg:pt-32 lg:pb-24"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div>
        <motion.p
          variants={reduce ? undefined : fadeItem}
          className="font-technical inline-flex items-center gap-3 text-xs tracking-[0.25em] text-[#8A8A8A] uppercase"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4F7CFF] opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-[#4F7CFF]" />
          </span>
          {t.hero.eyebrow}
        </motion.p>

        <motion.h1
          variants={reduce ? undefined : lineFade}
          className="font-display mt-6 max-w-5xl text-5xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-6xl lg:text-8xl"
        >
          <span className="block overflow-hidden pb-1">
            <motion.span variants={reduce ? undefined : lineMask} className="block will-change-transform">
              Think Smarter.
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-2 text-[#8A8A8A]">
            <motion.span variants={reduce ? undefined : lineMask} className="block will-change-transform">
              Build Better.
              <span aria-hidden="true" className="jtt-caret text-white">
                _
              </span>
            </motion.span>
          </span>
        </motion.h1>

        <motion.div
          variants={reduce ? undefined : fadeItem}
          className="mt-8 flex max-w-2xl flex-col gap-8"
        >
          <p className="text-base leading-7 text-[#8A8A8A] sm:text-lg sm:leading-8">
            {t.hero.sub}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4F7CFF] hover:text-white hover:shadow-[0_16px_48px_-12px_rgba(79,124,255,0.65)]"
            >
              <ScrollLink to="contact">
                {t.hero.primaryCta} <ArrowUpRight size={16} />
              </ScrollLink>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-[#242424] bg-transparent text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5 hover:text-white"
            >
              <ScrollLink to="cases">{t.hero.secondaryCta}</ScrollLink>
            </Button>
          </div>
        </motion.div>
          </div>

          {/* Desktop-only logo — hidden on mobile/tablet */}
          <motion.div
            variants={reduce ? undefined : fadeItem}
            className="hidden justify-center lg:flex"
          >
            <HeroLogo />
          </motion.div>
        </div>

        <motion.a
          href="#about"
          variants={reduce ? undefined : fadeItem}
          className="mt-14 inline-flex items-center gap-2 font-technical text-xs tracking-[0.2em] text-[#8A8A8A] uppercase hover:text-white"
          aria-label={t.hero.scrollAria}
        >
          <ArrowDown size={14} className="animate-bounce" /> {t.hero.scroll}
        </motion.a>
      </motion.div>
    </section>
  );
}
