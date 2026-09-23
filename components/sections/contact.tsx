import { site } from "@/lib/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <section id="contact" aria-label="Contact" className="bg-[#050505]">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2">
        <div>
          <SectionHeading
            index="08"
            eyebrow="Contact"
            title="How do I start?"
            description="Tell us about your problem. We respond with a structured view — not a generic sales pitch."
          />
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-3 text-sm">
              <p>
                <span className="font-technical text-xs tracking-[0.2em] text-[#8A8A8A] uppercase">
                  Email —{" "}
                </span>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-white underline-offset-4 hover:underline"
                >
                  {site.contact.email}
                </a>
              </p>
              <p>
                <span className="font-technical text-xs tracking-[0.2em] text-[#8A8A8A] uppercase">
                  WhatsApp —{" "}
                </span>
                <a
                  href={site.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline-offset-4 hover:underline"
                >
                  Start a conversation
                </a>
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <form
            action={`mailto:${site.contact.email}`}
            method="post"
            encType="text/plain"
            className="rounded-2xl border border-[#242424] bg-[#0D0D0D] p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="text-sm text-white/80">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  required
                  autoComplete="name"
                  className="h-11 rounded-lg border border-[#242424] bg-[#141414] px-4 text-sm text-white placeholder:text-[#8A8A8A] focus:border-[#4F7CFF] focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="text-sm text-white/80">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="h-11 rounded-lg border border-[#242424] bg-[#141414] px-4 text-sm text-white placeholder:text-[#8A8A8A] focus:border-[#4F7CFF] focus:outline-none"
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <label htmlFor="contact-company" className="text-sm text-white/80">
                Company
              </label>
              <input
                id="contact-company"
                name="company"
                autoComplete="organization"
                className="h-11 rounded-lg border border-[#242424] bg-[#141414] px-4 text-sm text-white placeholder:text-[#8A8A8A] focus:border-[#4F7CFF] focus:outline-none"
                placeholder="Company (optional)"
              />
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <label htmlFor="contact-message" className="text-sm text-white/80">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                className="rounded-lg border border-[#242424] bg-[#141414] px-4 py-3 text-sm text-white placeholder:text-[#8A8A8A] focus:border-[#4F7CFF] focus:outline-none"
                placeholder="What problem are you trying to solve?"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="mt-6 w-full rounded-full bg-white text-black hover:bg-[#4F7CFF] hover:text-white"
            >
              Start a project
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
