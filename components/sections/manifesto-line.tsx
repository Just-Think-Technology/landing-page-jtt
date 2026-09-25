"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { useLanguage } from "@/components/language-provider";

/** Manifesto — single line with scroll-linked drift + cinematic settle. */
export function ManifestoLine() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [48, -48]);
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section
      ref={ref}
      aria-label="Manifesto"
      className="relative overflow-hidden border-t border-[#242424] bg-[#050505]"
    >
      <motion.div
        aria-hidden="true"
        style={reduce ? { opacity: 0 } : { opacity: glow }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4F7CFF]/10 blur-[100px]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal direction="down" scale={0.97} blur={10}>
          <motion.p
            style={reduce ? undefined : { x }}
            className="font-display text-center text-xl font-medium tracking-tight text-balance sm:text-3xl"
          >
            {site.slogan}{" "}
            <span className="text-[#8A8A8A]">
              {t.manifesto.trailing}
            </span>
          </motion.p>
        </Reveal>
      </div>
    </section>
  );
}
