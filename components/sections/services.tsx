"use client";

import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";

export function Services() {
  const { t } = useLanguage();
  const copy = t.services;
  return (
    <section id="services" aria-label="Services" className="scroll-mt-20 bg-[#050505]">
      <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading
          index="02"
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
          direction="left"
        />
        <div className="mt-12 border-t border-[#242424]">
          {copy.items.map((s) => (
            <Reveal key={s.n} direction="left">
              <article className="group grid gap-4 border-b border-[#242424] py-8 transition-all duration-500 sm:grid-cols-[64px_180px_1fr] sm:items-baseline sm:gap-8 sm:py-10 hover:bg-[#0D0D0D]/60 hover:pl-2 sm:hover:pl-4">
                <p className="font-technical text-sm text-[#8A8A8A] transition-colors duration-300 group-hover:text-[#4F7CFF]">{s.n}</p>
                <p>
                  <span className="inline-flex rounded-full border border-[#242424] bg-[#141414] px-3 py-1 font-technical text-xs tracking-wider text-white uppercase transition-all duration-300 group-hover:border-[#4F7CFF]/50 group-hover:bg-[#4F7CFF]/10">
                    {s.tag}
                  </span>
                </p>
                <div className="max-w-2xl">
                  <h3 className="font-display text-xl font-semibold transition-transform duration-500 group-hover:translate-x-1 sm:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#8A8A8A] sm:text-base sm:leading-7">
                    {s.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
