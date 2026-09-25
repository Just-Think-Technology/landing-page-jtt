"use client";

import { useCallback, type MouseEvent, type ReactNode, type Ref } from "react";
import { useReducedMotion } from "motion/react";

type ScrollLinkProps = {
  /** Target element id (without the `#`). */
  to: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
  ref?: Ref<HTMLAnchorElement>;
};

/**
 * In-page anchor link with guaranteed scrolling.
 * Bypasses router handling so the click always lands on the section,
 * even with pinned scroll choreography on the page. Combined with
 * `scroll-mt-*` on the targets, the fixed header never covers them.
 * Respects prefers-reduced-motion (instant jump).
 */
export function ScrollLink({
  to,
  children,
  className,
  ariaLabel,
  onClick,
  ref,
}: ScrollLinkProps) {
  const reduce = useReducedMotion();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const el = document.getElementById(to);
      if (el) {
        el.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
          block: "start",
        });
        window.history.replaceState(null, "", `#${to}`);
      }
      onClick?.();
    },
    [to, reduce, onClick]
  );

  return (
    <a
      ref={ref}
      href={`#${to}`}
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
