"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Expand, X } from "lucide-react";

type ProductPreviewDialogProps = {
  src: string;
  /** Intrinsic dimensions of the source file — avoids layout shift. */
  width: number;
  height: number;
  productName: string;
  thumbnailAlt: string;
  expandLabel: string;
  closeLabel: string;
};

/**
 * ProductPreviewDialog — thumbnail button that expands a system
 * screenshot into an accessible lightbox (Escape/backdrop to close,
 * focus moved to the dialog and restored on close, scroll locked).
 */
export function ProductPreviewDialog({
  src,
  width,
  height,
  productName,
  thumbnailAlt,
  expandLabel,
  closeLabel,
}: ProductPreviewDialogProps) {
  const [open, setOpen] = useState(false);
  // Portal target only exists on the client — subscribe-free store that is
  // false during SSR/hydration and true afterwards (no setState-in-effect).
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const reduce = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Escape closes; body scroll locks while open; focus moves into the dialog.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const trigger = triggerRef.current;
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open, close]);

  const duration = reduce ? 0 : 0.25;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`${expandLabel} — ${productName}`}
        className="group relative block aspect-[16/10] w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F7CFF]"
      >
        <Image
          src={src}
          alt={thumbnailAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          quality={85}
          className="object-cover object-top"
        />
        <span
          aria-hidden="true"
          className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#050505]/85 px-3 py-1.5 text-[11px] tracking-wider text-white uppercase opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <Expand size={13} />
          {expandLabel}
        </span>
      </button>

      {/* Portalled to <body>: ancestors use transform/filter for scroll
          reveals, which would trap a nested `fixed` overlay inside the
          card's stacking context (broken position, siblings painting above). */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={`${productName} — ${thumbnailAlt}`}
                onClick={close}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration }}
                className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-[#050505]/90 p-4 backdrop-blur-sm sm:p-8"
              >
                <motion.figure
                  onClick={(e) => e.stopPropagation()}
                  initial={reduce ? undefined : { scale: 0.96, y: 12 }}
                  animate={reduce ? undefined : { scale: 1, y: 0 }}
                  exit={reduce ? undefined : { scale: 0.98, y: 8 }}
                  transition={{ duration }}
                  className="relative w-fit max-w-full cursor-default"
                >
                  <Image
                    src={src}
                    alt={thumbnailAlt}
                    width={width}
                    height={height}
                    sizes="90vw"
                    quality={95}
                    priority
                    className="h-auto max-h-[82vh] w-auto max-w-[92vw] rounded-xl border border-[#242424] object-contain shadow-[0_32px_80px_-24px_rgba(79,124,255,0.4)]"
                  />
                  <figcaption className="font-technical mt-3 text-center text-xs tracking-[0.2em] text-[#8A8A8A] uppercase">
                    {productName}
                  </figcaption>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={close}
                    aria-label={closeLabel}
                    className="absolute -top-3 -right-3 inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-[#242424] bg-[#141414] text-white transition-colors hover:border-[#4F7CFF]/50 hover:bg-[#1c1c1c] focus-visible:outline-2 focus-visible:outline-[#4F7CFF]"
                  >
                    <X size={16} />
                  </button>
                </motion.figure>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
