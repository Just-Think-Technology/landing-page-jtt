import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const items = [
  {
    title: "Business-focused engineering",
    text: "Technical decisions tied to business outcomes — not technology for its own sake.",
  },
  {
    title: "Direct technical involvement",
    text: "You talk to the people who design and build the system. No layers, no black box.",
  },
  {
    title: "Systems built for evolution",
    text: "Clean architecture that accepts change instead of resisting it.",
  },
  {
    title: "Long-term partnership",
    text: "JTT stays after launch: maintenance, iteration and continuous improvement.",
  },
] as const;

export function WhyJtt() {
  return (
    <section aria-label="Why JTT" className="bg-[#050505]">
      <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading
          index="06"
          eyebrow="Why JTT"
          title="Concrete reasons, not buzzwords"
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[#242424] bg-[#242424] sm:grid-cols-2">
          {items.map((item) => (
            <Reveal key={item.title} className="bg-[#0D0D0D]">
              <div className="h-full p-8 sm:p-10">
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
