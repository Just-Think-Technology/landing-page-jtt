import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const steps = [
  { n: "01", title: "Understand", text: "Business context, constraints and goals before any technical decision." },
  { n: "02", title: "Plan", text: "Architecture and scope defined with clarity — no improvisation." },
  { n: "03", title: "Build", text: "Solid engineering with continuous validation and communication." },
  { n: "04", title: "Evolve", text: "Release, measure, improve. Systems designed for the next iteration." },
  { n: "05", title: "Communicate", text: "Direct technical dialogue throughout — no black box." },
] as const;

export function Process() {
  return (
    <section id="process" aria-label="Process" className="bg-[#0D0D0D]">
      <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading
          index="03"
          eyebrow="Process"
          title="How JTT works"
          description="One process, five steps. The active state of each step is driven by scroll progress — deterministic in both directions."
        />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <li className="flex h-full flex-col rounded-2xl border border-[#242424] bg-[#141414] p-6">
                <p className="font-technical text-sm text-[#4F7CFF]">{s.n}</p>
                <h3 className="font-display mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#8A8A8A]">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
