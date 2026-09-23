import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <section aria-label="Start a project" className="bg-[#0D0D0D]">
      <div className="mx-auto w-full max-w-7xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <Reveal>
          <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Have a real problem? Let&apos;s build the right system.
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-black hover:bg-[#4F7CFF] hover:text-white"
            >
              <Link href="#contact">
                Start a project <ArrowUpRight size={16} />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-[#242424] bg-transparent text-white hover:border-white/40 hover:bg-white/5 hover:text-white"
            >
              <a href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
