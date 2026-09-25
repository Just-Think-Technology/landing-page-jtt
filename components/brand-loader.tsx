"use client";

import { motion } from "motion/react";

/**
 * BrandLoader — flat wordmark with a self-drawing contour.
 * The JTT outline strokes itself in (stroke-dashoffset sweep) and the
 * fill fades up at the end. No 3D, no spin — pure line choreography.
 */
export function BrandLoader({ progress }: { progress: number }) {
  const pct = Math.min(100, Math.floor(progress));

  return (
    <motion.div
      role="status"
      aria-label="Loading Just Think Technology"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
      exit={{ opacity: 0, scale: 1.06, filter: "blur(6px)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[36rem] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4F7CFF]/15 blur-[120px]"
      />

      {/* Self-drawing wordmark */}
      <svg
        viewBox="0 0 340 160"
        className="relative w-64 sm:w-80"
        role="img"
        aria-label="JTT"
      >
        <text
          x="50%"
          y="52%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="118"
          fontWeight={700}
          letterSpacing="-2"
          className="font-display loader-draw"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth="1.5"
        >
          JTT
          <tspan fill="#4F7CFF" stroke="#4F7CFF">
            .
          </tspan>
        </text>
      </svg>

      {/* Wordmark */}
      <p className="font-technical mt-10 text-xs tracking-[0.3em] text-[#8A8A8A] uppercase">
        Think Smarter. Build Better.
      </p>

      {/* Progress */}
      <div className="mt-6 w-56 sm:w-64" aria-hidden="true">
        <div className="h-px w-full bg-white/10">
          <div
            className="h-px w-full origin-left bg-[#4F7CFF]"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
        <p className="font-technical mt-3 text-center text-xs tracking-[0.2em] text-white tabular-nums">
          {pct}%
        </p>
      </div>
    </motion.div>
  );
}
