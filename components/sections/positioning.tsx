import { Reveal } from "@/components/reveal";

/** Positioning — merges Statement/About/Mission/Manifesto into one concise section. */
export function Positioning() {
  return (
    <section id="about" aria-label="About JTT" className="bg-[#050505]">
      <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="font-technical text-xs tracking-[0.2em] text-[#4F7CFF] uppercase">
            <span className="text-[#8A8A8A]">01</span>
            <span aria-hidden="true" className="mx-3 text-[#242424]">
              /
            </span>
            Positioning
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="font-display mt-6 max-w-5xl text-2xl leading-snug font-medium tracking-tight text-balance sm:text-4xl sm:leading-tight">
            JTT is a technology company focused on{" "}
            <span className="text-white">software that solves real business problems</span>{" "}
            — planned with rigor, built with{" "}
            <span className="text-white">solid engineering</span>, and designed to{" "}
            <span className="text-white">evolve</span>.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[#242424] bg-[#242424] sm:grid-cols-3">
          {[
            {
              title: "Structured thinking",
              text: "Every system starts from the business problem — then architecture, then code.",
            },
            {
              title: "Solid engineering",
              text: "Reliable, scalable solutions built to last beyond the first release.",
            },
            {
              title: "Long-term evolution",
              text: "Software that grows with the business instead of becoming legacy.",
            },
          ].map((item) => (
            <Reveal key={item.title} className="bg-[#0D0D0D]">
              <div className="h-full p-8">
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
