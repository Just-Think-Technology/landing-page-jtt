import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const team = [
  {
    initials: "TA",
    name: "Thiago Canato de Azevedo",
    role: "CEO",
    line: "Business vision and client proximity — technology serving real outcomes.",
  },
  {
    initials: "JB",
    name: "Júlio Francisco Bernardino",
    role: "CTO",
    line: "Technical leadership and solid engineering — systems built to evolve.",
  },
] as const;

export function Team() {
  return (
    <section aria-label="Team" className="bg-[#0D0D0D]">
      <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading
          index="07"
          eyebrow="Team"
          title="Who is behind JTT"
          description="Two partners, direct involvement. Culture is how we work — communicated through the team, not a separate section."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {team.map((m) => (
            <Reveal key={m.name}>
              <article className="flex items-start gap-6 rounded-2xl border border-[#242424] bg-[#141414] p-8">
                <div
                  aria-hidden="true"
                  className="font-display flex size-16 shrink-0 items-center justify-center rounded-full bg-[#4F7CFF]/15 text-lg font-bold text-[#4F7CFF]"
                >
                  {m.initials}
                </div>
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
