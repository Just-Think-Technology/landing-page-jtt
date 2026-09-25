"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { ScrollLink } from "@/components/scroll-link";
import { ProcessArt } from "@/components/sections/process-art";
import { useLanguage } from "@/components/language-provider";

gsap.registerPlugin(ScrollTrigger, useGSAP);
// Prevent scroll jumps when mobile browser chrome shows/hides.
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * Process — GSAP horizontal journey (gsap.com style).
 * The section pins and vertical scroll scrubs the track sideways:
 * scrolling down moves right, scrolling back reverses the exact
 * same mapping. GSAP owns this choreography exclusively.
 * - Desktop (≥768px): pinned horizontal track (intro + 5 steps + outro).
 * - Mobile / reduced-motion: static vertical stack, no pin.
 */
export function Process() {
  const reduce = useReducedMotion();
  const { locale, t } = useLanguage();
  const copy = t.process;
  const scope = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduce) return;
      // Recalculate pin distances once everything (fonts, images,
      // embeds) has loaded, so anchor targets below stay accurate.
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      // Lock measurements as soon as webfonts settle — a late font swap
      // changes track width and would make a fast scrub jump back/forth.
      let fontsCancelled = false;
      document.fonts?.ready.then(() => {
        if (!fontsCancelled) ScrollTrigger.refresh();
      });
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const section = scope.current;
        const track = section?.querySelector("[data-track]");
        if (!section || !track) return;
        const distance = () => track.scrollWidth - window.innerWidth;
        // NOTE: no manual kills here — mm.revert() in the outer cleanup
        // is the single teardown path. Manually killing the tween and its
        // ScrollTrigger first orphans GSAP's per-element pin cache, so a
        // later setup (e.g. after a locale swap) pins with a stale
        // y-compensation and the whole section renders off-screen.
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            // Tight scrub: the track tracks the wheel closely instead of
            // chasing it with a long lag (which reads as back-and-forth
            // on fast flicks), while staying smooth.
            scrub: 0.5,
            pin: true,
            anticipatePin: 0,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (barRef.current) {
                barRef.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });
      });
      return () => {
        fontsCancelled = true;
        window.removeEventListener("load", onLoad);
        mm.revert();
      };
    },
    { dependencies: [locale, reduce], scope }
  );

  if (reduce) {
    return <ProcessStatic />;
  }

  // Keyed wrapper: when the locale settles after hydration the whole
  // subtree remounts on brand-new DOM nodes, so GSAP sets the pin up
  // exactly once per mount (same condition as a fresh single-locale
  // load) instead of tearing down and re-setting up on shared nodes.
  return (
    <div key={locale} style={{ display: "contents" }}>
      <section ref={scope} id="process" aria-label="Process" className="scroll-mt-20 bg-[#0D0D0D]">
      {/* Mobile — static vertical stack */}
      <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 md:hidden">
        <ProcessHeading />
        <ol className="mt-12 grid gap-4">
          {copy.steps.map((s, i) => (
            <Reveal key={s.n} direction="right" delay={i * 0.08}>
              <li className="flex h-full flex-col rounded-2xl border border-[#242424] bg-[#141414] p-6">
                <ProcessArt index={i} />
                <p className="font-technical text-sm text-[#4F7CFF]">{s.n}</p>
                <h3 className="font-display mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#8A8A8A]">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* Desktop — pinned horizontal journey */}
      <div className="relative hidden overflow-hidden md:block">
        <div data-track className="flex h-svh w-max items-stretch">
          {/* Intro panel */}
          <div className="flex w-[46vw] shrink-0 flex-col justify-center px-[6vw] py-16 md:landscape:py-6 lg:w-[42vw]">
            <p className="font-technical text-xs tracking-[0.2em] text-[#4F7CFF] uppercase">
              <span className="text-[#8A8A8A]">03</span>
              <span aria-hidden="true" className="mx-3 text-[#242424]">
                /
              </span>
              {copy.eyebrow}
            </p>
            <h2 className="font-display mt-5 text-4xl font-semibold tracking-tight text-balance lg:text-5xl md:landscape:mt-3 md:landscape:text-3xl">
              {copy.title}
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-[#8A8A8A] sm:text-lg sm:leading-8 md:landscape:mt-3 md:landscape:text-base md:landscape:leading-7">
              {copy.description}
            </p>
            <p className="font-technical mt-10 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-[#8A8A8A] uppercase md:landscape:mt-5">
              {copy.scrollHint} <ArrowDown size={14} className="animate-bounce" />
            </p>
          </div>

          {/* Step panels */}
          {copy.steps.map((s, i) => (
            <article
              key={s.n}
              className="relative flex w-[44vw] shrink-0 flex-col justify-center border-l border-[#242424] px-[4vw] py-16 md:landscape:py-6 lg:w-[40vw]"
            >
              <span
                aria-hidden="true"
                className="font-display pointer-events-none absolute top-24 left-[3vw] text-[11rem] leading-none font-bold tracking-tighter text-white/[0.05] select-none lg:top-[13vh] lg:text-[15rem] md:landscape:top-20 md:landscape:text-[7rem]"
              >
                {s.n}
              </span>
              <ProcessArt index={i} />
              <p className="font-technical text-sm text-[#4F7CFF]">
                {s.n} <span className="text-[#8A8A8A]">/ 05</span>
              </p>
              <h3 className="font-display mt-4 text-3xl font-semibold tracking-tight lg:text-4xl md:landscape:mt-2 md:landscape:text-2xl">
                {s.title}
              </h3>
              <p className="mt-4 max-w-md text-base leading-7 text-[#8A8A8A] md:landscape:mt-2 md:landscape:text-sm md:landscape:leading-6">
                {s.text}
              </p>
            </article>
          ))}

          {/* Outro panel */}
          <div className="flex w-[40vw] shrink-0 flex-col justify-center border-l border-[#242424] bg-[#111111] px-[4vw] py-16 md:landscape:py-6 lg:w-[36vw]">
            <h3 className="font-display max-w-sm text-3xl font-semibold tracking-tight text-balance lg:text-4xl">
              {copy.outroTitle}
            </h3>
            <p className="mt-4 max-w-sm text-base leading-7 text-[#8A8A8A]">
              {copy.outroText}
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4F7CFF] hover:text-white hover:shadow-[0_16px_48px_-12px_rgba(79,124,255,0.65)]"
              >
                <ScrollLink to="contact">
                  {t.getInTouch} <ArrowUpRight size={16} />
                </ScrollLink>
              </Button>
            </div>
          </div>
        </div>

        {/* Journey progress */}
        <div className="absolute inset-x-0 bottom-10">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <div aria-hidden="true" className="h-px w-full bg-[#242424]">
              <div
                ref={barRef}
                className="h-px w-full origin-left bg-[#4F7CFF]"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}

/** Static heading shared by the mobile stack. */
function ProcessHeading() {
  const { t } = useLanguage();
  const copy = t.process;
  return (
    <Reveal direction="right" className="max-w-3xl">
      <p className="font-technical text-xs tracking-[0.2em] text-[#4F7CFF] uppercase">
        <span className="text-[#8A8A8A]">03</span>
        <span aria-hidden="true" className="mx-3 text-[#242424]">
          /
        </span>
        {copy.eyebrow}
      </p>
      <h2 className="font-display mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {copy.title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-7 text-[#8A8A8A]">
        {copy.description}
      </p>
    </Reveal>
  );
}

/** Reduced-motion fallback — calm vertical list, no pin, no scrub. */
function ProcessStatic() {
  const { t } = useLanguage();
  const copy = t.process;
  return (
    <section id="process" aria-label="Process" className="scroll-mt-20 bg-[#0D0D0D]">
      <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="max-w-3xl">
          <p className="font-technical text-xs tracking-[0.2em] text-[#4F7CFF] uppercase">
            <span className="text-[#8A8A8A]">03</span>
            <span aria-hidden="true" className="mx-3 text-[#242424]">
              /
            </span>
            {copy.eyebrow}
          </p>
          <h2 className="font-display mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            {copy.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#8A8A8A] sm:text-lg sm:leading-8">
            {copy.description}
          </p>
        </div>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {copy.steps.map((s, i) => (
            <li
              key={s.n}
              className="flex h-full flex-col rounded-2xl border border-[#242424] bg-[#141414] p-6"
            >
              <ProcessArt index={i} />
              <p className="font-technical text-sm text-[#4F7CFF]">{s.n}</p>
              <h3 className="font-display mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#8A8A8A]">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
