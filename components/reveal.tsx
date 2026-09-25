"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { ReactNode } from "react";

type RevealDirection = "up" | "down" | "left" | "right";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  /** Entrance direction — each homepage section uses a unique one. */
  direction?: RevealDirection;
  /** Scrubbed scale from N -> 1 (set 1 to disable). */
  scale?: number;
  /** Scrubbed blur from Npx -> 0 (set 0 to disable). */
  blur?: number;
  className?: string;
};

const DIRECTION_OFFSET: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 72 },
  down: { x: 0, y: -72 },
  left: { x: 96, y: 0 },
  right: { x: -96, y: 0 },
};

/**
 * Scroll-scrubbed cinematic reveal (GTA VI style interactivity).
 * - The visual state is a pure function of scroll position:
 *   progress 0 -> 1 maps hidden -> visible (translate + scale + blur + opacity).
 * - Scrolling down plays the entrance; scrolling back reverses the exact
 *   same mapping continuously. Nothing fires once and freezes.
 * - Smoothed with a spring so the scrub feels buttery, not jittery.
 * - Respects prefers-reduced-motion (renders static content).
 */
export function Reveal({
  children,
  delay = 0,
  y,
  x,
  direction = "up",
  scale = 0.96,
  blur = 8,
  className,
}: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <ScrubbedReveal
      delay={delay}
      y={y}
      x={x}
      direction={direction}
      scale={scale}
      blur={blur}
      className={className}
    >
      {children}
    </ScrubbedReveal>
  );
}

function ScrubbedReveal({
  children,
  delay = 0,
  y,
  x,
  direction = "up",
  scale = 0.96,
  blur = 8,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });
  // Buttery scrub: smooth the raw progress, then derive every property
  // from the same smoothed value so they stay in sync both directions.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.5,
  });

  const offset = DIRECTION_OFFSET[direction];
  const initialX = x ?? offset.x;
  const initialY = y ?? offset.y;

  // Preserve stagger intent: delay shifts where in the scroll range
  // the entrance starts. Entrance occupies roughly half the range,
  // then clamps at visible — static no matter how far past you scroll.
  const start = Math.min(Math.max(delay, 0), 0.6);
  const end = Math.min(start + 0.5, 1);

  const opacity = useTransform(smooth, [start, end], [0, 1]);
  const translateX = useTransform(smooth, [start, end], [initialX, 0]);
  const translateY = useTransform(smooth, [start, end], [initialY, 0]);
  const scaleValue = useTransform(smooth, [start, end], [scale, 1]);
  const blurValue = useTransform(smooth, [start, end], [blur, 0]);
  const filter = useMotionTemplate`blur(${blurValue}px)`;

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        x: translateX,
        y: translateY,
        scale: scaleValue,
        filter,
        willChange: "transform, opacity, filter",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
