"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ScrollLink } from "@/components/scroll-link";
import { useLanguage } from "@/components/language-provider";

/**
 * Products — JTT-owned systems currently in development.
 * Content-integrity rule: descriptions are grounded in the product docs;
 * no launch claims, metrics or availability beyond "In development".
 */
export function Products() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { t } = useLanguage();
  const copy = t.products;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="products" aria-label="Products" className="relative scroll-mt-20 overflow-hidden bg-[#0D0D0D]">
      {/* travelling ambient glow */}
      <motion.div
        aria-hidden="true"
        style={reduce ? { opacity: 0 } : { opacity: glowOpacity }}
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-[#4F7CFF]/10 blur-[120px]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading
          index="05"
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
          direction="down"
        />
        <motion.div
          ref={ref}
          style={reduce ? undefined : { scale, y }}
          className="mt-12 grid gap-5 lg:grid-cols-3"
        >
          {copy.items.map((p, i) => (
            <Reveal key={p.name} direction="down" delay={i * 0.08} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-[#242424] bg-[#141414] p-8 transition-colors duration-500 hover:border-[#4F7CFF]/30">
                <p className="font-technical inline-flex flex-wrap items-center gap-2 text-xs tracking-[0.2em] text-[#4F7CFF] uppercase">
                  {p.name}
                  <span className="text-[#8A8A8A]">· {p.tagline}</span>
                  <span className="rounded-full border border-[#4F7CFF]/40 bg-[#4F7CFF]/10 px-3 py-0.5 text-[11px] tracking-wider text-white normal-case">
                    {copy.inDevelopment}
                  </span>
                </p>
                <p className="mt-5 flex-1 text-sm leading-6 text-[#8A8A8A] sm:text-base sm:leading-7">
                  {p.text}
                </p>
                {"stack" in p && p.stack ? (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[#242424] px-3 py-1 font-technical text-[11px] tracking-wider text-white/70 uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}
                <div className="mt-8">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full border-[#242424] bg-transparent text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5 hover:text-white"
                  >
                    <ScrollLink to="contact">
                      {copy.getNotified} <ArrowUpRight size={16} />
                    </ScrollLink>
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
