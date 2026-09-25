"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { useLanguage } from "@/components/language-provider";
import { ScrollLink } from "@/components/scroll-link";

/** Final CTA — closing beat with scroll-linked scale + travelling glow. */
export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { t } = useLanguage();
  const copy = t.finalCta;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [64, 0]);
  const glow = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <section ref={ref} aria-label="Start a project" className="relative overflow-hidden bg-[#0D0D0D]">
      <motion.div
        aria-hidden="true"
        style={reduce ? { opacity: 0.4 } : { opacity: glow, scale }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4F7CFF]/15 blur-[130px]"
      />
      <motion.div
        style={reduce ? undefined : { scale, y }}
        className="relative mx-auto w-full max-w-7xl px-5 py-24 text-center sm:px-8 sm:py-32"
      >
        <Reveal direction="up" scale={0.95} blur={10}>
          <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            {copy.title}
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-black transition-all duration-300 hover:-translate-y-1 hover:bg-[#4F7CFF] hover:text-white hover:shadow-[0_24px_64px_-16px_rgba(79,124,255,0.7)]"
            >
              <ScrollLink to="contact">
                {copy.primary} <ArrowUpRight size={16} />
              </ScrollLink>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-[#242424] bg-transparent text-white transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/5 hover:text-white"
            >
              <a href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer">
                {copy.whatsapp}
              </a>
            </Button>
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
}
