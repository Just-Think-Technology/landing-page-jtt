"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";

/**
 * Cases — only verified client work.
 * Content-integrity rule: no invented metrics, quotes or client names.
 * Julãos Burger is live at julaosburger.com.br (verified by the client).
 */
export function Cases() {
  const { t } = useLanguage();
  const c = t.cases;
  return (
    <section id="cases" aria-label="Selected work" className="scroll-mt-20 bg-[#050505]">
      <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading
          index="04"
          eyebrow={c.eyebrow}
          title={c.title}
          description={c.description}
          direction="up"
        />
        <div className="mt-12 max-w-5xl">
          <Reveal direction="up">
            <article className="group grid overflow-hidden rounded-2xl border border-[#242424] bg-[#0D0D0D] transition-all duration-500 hover:-translate-y-1 hover:border-[#4F7CFF]/40 hover:shadow-[0_32px_80px_-24px_rgba(79,124,255,0.4)] lg:grid-cols-2">
              {/* Live website preview — real site embedded, click-through to production */}
              <div
                className="relative aspect-[16/10] overflow-hidden bg-[#141414] lg:aspect-auto lg:min-h-[340px]"
                style={{
                  backgroundImage:
                    "radial-gradient(ellipse 80% 90% at 50% 110%, rgba(79,124,255,0.28), transparent 65%), repeating-linear-gradient(to right, rgba(255,255,255,0.05) 0 1px, transparent 1px 48px)",
                }}
              >
                <iframe
                  src="https://julaosburger.com.br"
                  title={c.previewTitle}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  sandbox="allow-scripts allow-same-origin"
                  aria-hidden="true"
                  tabIndex={-1}
                  className="pointer-events-none absolute inset-0 h-full w-full border-0"
                />
                <span className="font-technical absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#050505]/85 px-3 py-1 text-[11px] tracking-[0.18em] text-white uppercase backdrop-blur-sm">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                  </span>
                  {c.live}
                </span>
                <Link
                  href="https://julaosburger.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={c.previewAria}
                  className="absolute inset-0 focus-visible:outline-2 focus-visible:outline-[#4F7CFF]"
                />
              </div>
              <div className="flex flex-1 flex-col p-7 sm:p-9">
                <p className="font-technical text-xs tracking-[0.2em] text-[#8A8A8A] uppercase">
                  {c.context}
                </p>
                <h3 className="font-display mt-2 text-2xl font-semibold">{c.project}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-[#8A8A8A] sm:text-base sm:leading-7">
                  {c.text}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#242424] px-3 py-1 font-technical text-[11px] tracking-wider text-white/70 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="https://julaosburger.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm text-white underline-offset-4 hover:text-[#4F7CFF] hover:underline"
                >
                  {c.visit} <ArrowUpRight size={15} />
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
