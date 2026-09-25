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
import { LanguageProvider } from "@/components/language-provider";
import { LoadingProvider } from "@/components/loading-provider";
import { SkipLink } from "@/components/skip-link";

export default function Home() {
  return (
    <LanguageProvider>
      <LoadingProvider>
        <SkipLink />
        <SiteHeader />
        <main id="main" className="overflow-x-clip">
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
      </LoadingProvider>
    </LanguageProvider>
  );
}
