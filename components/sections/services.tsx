import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const services = [
  {
    n: "01",
    tag: "Software",
    title: "Custom software",
    text: "Web systems and applications designed around your operation — from internal tools to customer-facing products.",
  },
  {
    n: "02",
    tag: "Platforms",
    title: "Platforms & systems",
    text: "Robust platforms with clean architecture, prepared for scale, new features and long-term maintenance.",
  },
  {
    n: "03",
    tag: "Integrations",
    title: "Integrations",
    text: "Connect your stack: APIs, third-party services and data flows working as one coherent system.",
  },
  {
    n: "04",
    tag: "Custom Solutions",
    title: "Tailored solutions",
    text: "When off-the-shelf is not enough — focused solutions for specific business constraints and goals.",
  },
] as const;

export function Services() {
  return (
    <section id="services" aria-label="Services" className="bg-[#050505]">
      <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading
          index="02"
          eyebrow="Services"
          title="What JTT builds"
          description="Four focused areas. Editorial, precise, and built for business outcomes — not generic feature lists."
        />
        <div className="mt-12 border-t border-[#242424]">
          {services.map((s) => (
            <Reveal key={s.n}>
              <article className="group grid gap-4 border-b border-[#242424] py-8 transition-colors sm:grid-cols-[64px_180px_1fr] sm:items-baseline sm:gap-8 sm:py-10 hover:bg-[#0D0D0D]/60">
                <p className="font-technical text-sm text-[#8A8A8A]">{s.n}</p>
                <p>
                  <span className="inline-flex rounded-full border border-[#242424] bg-[#141414] px-3 py-1 font-technical text-xs tracking-wider text-white uppercase">
                    {s.tag}
                  </span>
                </p>
                <div className="max-w-2xl">
                  <h3 className="font-display text-xl font-semibold sm:text-2xl">
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
