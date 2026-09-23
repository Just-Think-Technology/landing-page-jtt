import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export function ManifestoLine() {
  return (
    <section aria-label="Manifesto" className="border-t border-[#242424] bg-[#050505]">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <p className="font-display text-center text-xl font-medium tracking-tight text-balance sm:text-3xl">
            {site.slogan} <span className="text-[#8A8A8A]">Real problems, structured thinking, lasting systems.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
