"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";

const photos = ["/thiago.png", "/julio.png"] as const;

export function Team() {
  const { t } = useLanguage();
  const copy = t.team;
  return (
    <section aria-label="Team" className="bg-[#0D0D0D]">
      <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading
          index="07"
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
          direction="right"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {copy.members.map((m, i) => (
            <Reveal key={m.name} direction="right">
              <article className="group flex flex-col gap-6 rounded-2xl border border-[#242424] bg-[#141414] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_24px_64px_-32px_rgba(255,255,255,0.25)] min-[420px]:flex-row min-[420px]:items-start sm:p-8">
                <Image
                  src={photos[i] ?? photos[0]}
                  alt={`${m.name}, ${m.role} of JTT`}
                  width={64}
                  height={64}
                  className="size-16 shrink-0 rounded-full border border-[#242424] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div>
                  <h3 className="font-display text-xl font-semibold">{m.name}</h3>
                  <p className="font-technical mt-1 text-xs tracking-[0.2em] text-[#4F7CFF] uppercase">
                    {m.role}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#8A8A8A]">{m.line}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
