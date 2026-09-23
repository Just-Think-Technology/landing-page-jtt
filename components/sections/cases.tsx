import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

/**
 * Cases — editorial presentation.
 * Content-integrity rule: no invented metrics, quotes or client names.
 * Only verified outcomes may appear; unverified results are omitted.
 */
const cases = [
  {
    project: "Operations platform",
    context: "Internal system",
    text: "A central platform replacing fragmented spreadsheets and manual routines with one structured workflow.",
    tags: ["Software", "Platforms"],
  },
  {
    project: "Integration layer",
    context: "Systems & APIs",
    text: "Connected services, APIs and data flows into a coherent architecture that the business can evolve.",
    tags: ["Integrations", "Architecture"],
  },
  {
    project: "Business application",
    context: "Custom solution",
    text: "A tailored application built around a specific operational constraint that off-the-shelf tools could not solve.",
    tags: ["Custom Solutions"],
  },
] as const;

export function Cases() {
  return (
    <section id="cases" aria-label="Selected work" className="bg-[#050505]">
      <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading
          index="04"
          eyebrow="Cases"
          title="What JTT has built"
          description="Representative engagements. Detailed metrics and client quotes appear only when verified — never invented."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {cases.map((c) => (
            <Reveal key={c.project}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#242424] bg-[#0D0D0D]">
                <div
                  aria-hidden="true"
                  className="aspect-[16/9] bg-[#141414]"
                  style={{
                    backgroundImage:
                      "radial-gradient(ellipse 80% 90% at 50% 110%, rgba(79,124,255,0.28), transparent 65%), repeating-linear-gradient(to right, rgba(255,255,255,0.05) 0 1px, transparent 1px 48px)",
                  }}
                />
                <div className="flex flex-1 flex-col p-7">
                  <p className="font-technical text-xs tracking-[0.2em] text-[#8A8A8A] uppercase">
                    {c.context}
                  </p>
                  <h3 className="font-display mt-2 text-xl font-semibold">{c.project}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-[#8A8A8A]">{c.text}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[#242424] px-3 py-1 font-technical text-[11px] tracking-wider text-white/70 uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
