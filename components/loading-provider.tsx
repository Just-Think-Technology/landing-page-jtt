"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import { BrandLoader } from "@/components/brand-loader";

const MIN_MS = 2200;
const MIN_MS_REDUCED = 500;
const MAX_MS = 5000;
/** Progress ceiling while real load signals are still pending. */
const HOLD_AT = 88;

type LoadingContextValue = {
  loaded: boolean;
};

const LoadingContext = createContext<LoadingContextValue>({ loaded: false });

/**
 * Loading gate — always shows on page load (per product decision).
 * Progress follows real signals (webfonts + window load) with a minimum
 * cinematic hold and a hard failsafe, so the loader can never trap the
 * user. While active, page scroll is locked and restored on exit.
 */
export function LoadingProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const doneRef = useRef(false);
  const minMs = reduce ? MIN_MS_REDUCED : MIN_MS;

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    progressRef.current = 100;
    setProgress(100);
    // Brief beat on 100% before the veil lifts.
    setTimeout(() => {
      setLoaded(true);
      document.documentElement.style.overflow = "";
    }, 250);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    let raf = 0;
    const start = performance.now();
    let fontsDone = false;
    let winDone =
      typeof document !== "undefined" && document.readyState === "complete";
    const onLoad = () => {
      winDone = true;
    };
    if (!winDone) window.addEventListener("load", onLoad);
    document.fonts?.ready.then(
      () => {
        fontsDone = true;
      },
      () => {
        fontsDone = true;
      }
    );
    // Safety: a hanging font request must not hold the loader.
    const fontsTimeout = setTimeout(() => {
      fontsDone = true;
    }, 3500);

    const tick = (now: number) => {
      const elapsed = now - start;
      const signalsReady = fontsDone && winDone;
      if (signalsReady && elapsed >= minMs && progressRef.current >= 99) {
        finish();
        return;
      }
      const target = signalsReady && elapsed >= minMs ? 100 : HOLD_AT;
      progressRef.current = Math.min(
        progressRef.current + (target - progressRef.current) * 0.06 + 0.2,
        99.4
      );
      setProgress(progressRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const failsafe = setTimeout(finish, MAX_MS);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
      clearTimeout(fontsTimeout);
      window.removeEventListener("load", onLoad);
      document.documentElement.style.overflow = "";
    };
  }, [finish, minMs]);

  const value = useMemo<LoadingContextValue>(() => ({ loaded }), [loaded]);

  return (
    <LoadingContext.Provider value={value}>
      <AnimatePresence>
        {!loaded && <BrandLoader key="brand-loader" progress={progress} />}
      </AnimatePresence>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
