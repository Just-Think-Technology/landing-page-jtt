"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Hero scroll choreography (scroll-linked, reversible):
 * progress 0 -> 1 drives opacity / y / scale via useTransform.
 * Scrolling back reverses the same mapping. No one-shot play().
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const subOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-end overflow-hidden"
    >
      {/* Cinematic backdrop — transform/opacity only */}
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { scale: bgScale, opacity: bgOpacity }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[#050505]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, transparent 55%, #050505 96%), radial-gradient(ellipse 70% 50% at 50% 38%, rgba(79,124,255,0.22), transparent 70%), repeating-linear-gradient(to right, rgba(255,255,255,0.05) 0 1px, transparent 1px 96px), repeating-linear-gradient(to bottom, rgba(255,255,255,0.04) 0 1px, transparent 1px 96px)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
      </motion.div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-32 pb-16 sm:px-8 sm:pb-20">
        <motion.p
          style={reduce ? undefined : { y: subY, opacity: subOpacity }}
          className="font-technical inline-flex items-center gap-3 text-xs tracking-[0.25em] text-[#8A8A8A] uppercase"
        >
          <span className="inline-block size-1.5 rounded-full bg-[#4F7CFF]" />
          Just Think Technology — Software Engineering
        </motion.p>

        <motion.h1
          style={reduce ? undefined : { y: headlineY, opacity: headlineOpacity }}
          className="font-display mt-6 max-w-5xl text-5xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-6xl lg:text-8xl"
        >
          Think Smarter.
          <br />
          <span className="text-[#8A8A8A]">Build Better.</span>
        </motion.h1>

        <motion.div
          style={reduce ? undefined : { y: subY, opacity: subOpacity }}
          className="mt-8 flex max-w-2xl flex-col gap-8"
        >
          <p className="text-base leading-7 text-[#8A8A8A] sm:text-lg sm:leading-8">
            JTT designs and builds reliable, scalable and evolvable software for
            real business problems — structured technology, solid engineering,
            real impact.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-black hover:bg-[#4F7CFF] hover:text-white"
            >
              <Link href="#contact">
                Start a project <ArrowUpRight size={16} />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-[#242424] bg-transparent text-white hover:border-white/40 hover:bg-white/5 hover:text-white"
            >
              <Link href="#cases">Our work</Link>
            </Button>
          </div>
        </motion.div>

        <motion.a
          href="#about"
          style={reduce ? undefined : { opacity: indicatorOpacity }}
          className="mt-14 inline-flex items-center gap-2 font-technical text-xs tracking-[0.2em] text-[#8A8A8A] uppercase hover:text-white"
          aria-label="Scroll to about section"
        >
          <ArrowDown size={14} className="animate-bounce" /> Scroll
        </motion.a>
      </div>
    </section>
  );
}
