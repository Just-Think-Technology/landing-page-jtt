"use client";

import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";

export function WhyJtt() {
  const { t } = useLanguage();
  const copy = t.why;
  return (
    <section aria-label="Why JTT" className="bg-[#050505]">
      <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading
          index="06"
          eyebrow={copy.eyebrow}
          title={copy.title}
          direction="left"
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[#242424] bg-[#242424] sm:grid-cols-2">
          {copy.items.map((item) => (
            <Reveal key={item.title} direction="left" className="bg-[#0D0D0D]">
              <div className="group h-full p-8 transition-colors duration-500 hover:bg-[#111111] sm:p-10">
                <div aria-hidden="true" className="mb-5 h-px w-10 bg-[#242424] transition-all duration-500 group-hover:w-16 group-hover:bg-[#4F7CFF]" />
                <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#8A8A8A] sm:text-base sm:leading-7">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
