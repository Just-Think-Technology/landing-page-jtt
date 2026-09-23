"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

/** Vendono — restrained scroll-linked mockup motion (scale/translate, reversible). */
export function Products() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);

  return (
    <section id="products" aria-label="Products" className="bg-[#0D0D0D]">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="font-technical text-xs tracking-[0.2em] text-[#4F7CFF] uppercase">
              <span className="text-[#8A8A8A]">05</span>
              <span aria-hidden="true" className="mx-3 text-[#242424]">
                /
              </span>
              Products
            </p>
            <h2 className="font-display mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Vendono
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#8A8A8A] sm:text-lg sm:leading-8">
              A JTT-owned product for commercial operations — built with the
              same structured engineering behind every JTT system. Clear
              workflows, reliable data, designed to evolve with the business.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white text-black hover:bg-[#4F7CFF] hover:text-white"
              >
                <Link href="#contact">
                  Request access <ArrowUpRight size={16} />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>

        <div ref={ref} className="relative">
          <motion.div
            style={reduce ? undefined : { scale, y }}
            className="overflow-hidden rounded-2xl border border-[#242424] bg-[#141414] shadow-[0_40px_120px_-40px_rgba(79,124,255,0.35)]"
          >
            <div className="flex items-center gap-1.5 border-b border-[#242424] px-4 py-3" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-[#242424]" />
              <span className="size-2.5 rounded-full bg-[#242424]" />
              <span className="size-2.5 rounded-full bg-[#4F7CFF]" />
            </div>
            <div className="space-y-3 p-6" aria-hidden="true">
              <div className="h-8 w-2/3 rounded-md bg-white/10" />
              <div className="grid grid-cols-3 gap-3">
                <div className="h-20 rounded-lg bg-white/5" />
                <div className="h-20 rounded-lg bg-[#4F7CFF]/25" />
                <div className="h-20 rounded-lg bg-white/5" />
              </div>
              <div className="h-24 rounded-lg bg-white/5" />
              <div className="h-10 w-1/3 rounded-full bg-white/15" />
            </div>
            <p className="sr-only">Vendono product interface preview (illustrative mockup).</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
