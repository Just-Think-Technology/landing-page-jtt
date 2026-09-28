"use client";

import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";

/** Positioning — merges Statement/About/Mission/Manifesto into one concise section. */
export function Positioning() {
  const { t } = useLanguage();
  const copy = t.positioning;
  return (
    <section id="about" aria-label="About JTT" className="scroll-mt-20 bg-[#050505]">
      <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal direction="down">
          <p className="font-technical text-xs tracking-[0.2em] text-[#4F7CFF] uppercase">
            <span className="text-[#8A8A8A]">01</span>
            <span aria-hidden="true" className="mx-3 text-[#242424]">
              /
            </span>
            {copy.eyebrow}
          </p>
        </Reveal>
        <Reveal direction="down" delay={0.05}>
          <p className="font-display mt-6 max-w-5xl text-2xl leading-snug font-medium tracking-tight text-balance sm:text-4xl sm:leading-tight">
            {copy.body}{" "}
            <span className="text-white">{copy.bodyHighlight1}</span>
            {copy.bodyMiddle}{" "}
            <span className="text-white">{copy.bodyHighlight2}</span>
            {copy.bodyEnd}{" "}
            <span className="text-white">{copy.bodyHighlight3}</span>.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[#242424] bg-[#242424] sm:grid-cols-3">
          {copy.items.map((item) => (
            <Reveal key={item.title} direction="down" className="bg-[#0D0D0D]">
              <div className="group h-full p-8 transition-colors duration-500 hover:bg-[#111111]">
                <div aria-hidden="true" className="mb-5 h-px w-10 bg-[#4F7CFF]/50 transition-all duration-500 group-hover:w-16 group-hover:bg-[#4F7CFF]" />
                <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#8A8A8A]">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
