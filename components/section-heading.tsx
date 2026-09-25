"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
  direction = "up",
}: SectionHeadingProps) {
  const reduce = useReducedMotion();
  return (
    <Reveal direction={direction} className={cn("max-w-3xl", className)}>
      <p className="font-technical text-xs tracking-[0.2em] text-[#4F7CFF] uppercase">
        <span className="text-[#8A8A8A]">{index}</span>
        <span aria-hidden="true" className="mx-3 text-[#242424]">
          /
        </span>
        {eyebrow}
      </p>
      <h2 className="font-display mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#8A8A8A] sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
      {/* Cinematic anchor line — grows on enter, retracts on exit (reversible) */}
      {reduce ? (
        <div aria-hidden="true" className="mt-8 h-px w-24 bg-[#4F7CFF]/60" />
      ) : (
        <motion.div
          aria-hidden="true"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 h-px w-24 origin-left bg-gradient-to-r from-[#4F7CFF] to-transparent"
        />
      )}
    </Reveal>
  );
}
