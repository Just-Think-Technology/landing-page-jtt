import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { Positioning } from "@/components/sections/positioning";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Cases } from "@/components/sections/cases";
import { Products } from "@/components/sections/products";
import { WhyJtt } from "@/components/sections/why-jtt";
import { Team } from "@/components/sections/team";
import { Contact } from "@/components/sections/contact";
import { ManifestoLine } from "@/components/sections/manifesto-line";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-black"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Positioning />
        <Services />
        <Process />
        <Cases />
        <Products />
        <WhyJtt />
        <Team />
        <Contact />
        <ManifestoLine />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
