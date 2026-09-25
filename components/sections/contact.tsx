"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { site } from "@/lib/site";
import { CONTACT_HONEYPOT_FIELD } from "@/lib/contact";
import { sendContactMessage } from "@/app/actions/contact";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

type Status = "idle" | "sending" | "success" | "error";

/** Minimum time between submissions from this browser (spam friction). */
const RESUBMIT_MS = 30_000;

export function Contact() {
  const { t } = useLanguage();
  const copy = t.contact;
  const [status, setStatus] = useState<Status>("idle");
  const lastSentAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);

  // Success toast auto-dismisses after 3 seconds.
  useEffect(() => {
    if (status !== "success") return;
    const t = setTimeout(() => setStatus("idle"), 3000);
    return () => clearTimeout(t);
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    if (Date.now() - lastSentAt.current < RESUBMIT_MS) return;
    setStatus("sending");
    try {
      const result = await sendContactMessage(
        new FormData(e.currentTarget)
      );
      if (result.ok) {
        lastSentAt.current = Date.now();
        formRef.current?.reset();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "h-11 rounded-lg border border-[#242424] bg-[#141414] px-4 text-sm text-white placeholder:text-[#8A8A8A] focus:border-[#4F7CFF] focus:outline-none";

  return (
    <section id="contact" aria-label="Contact" className="scroll-mt-20 bg-[#050505]">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2">
        <div>
          <SectionHeading
            index="08"
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
            direction="up"
          />
          <Reveal direction="up" delay={0.1}>
            <div className="mt-8 space-y-3 text-sm">
              <p>
                <span className="font-technical text-xs tracking-[0.2em] text-[#8A8A8A] uppercase">
                  {copy.emailLabel}{" "}
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
                  {copy.whatsappLabel}{" "}
                </span>
                <a
                  href={site.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline-offset-4 hover:underline"
                >
                  {copy.startConversation}
                </a>
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.05}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[#242424] bg-[#0D0D0D] p-6 sm:p-8"
          >
            {/* Honeypot trap — invisible to humans, irresistible to bots */}
            <div aria-hidden="true" className="absolute h-0 overflow-hidden opacity-0">
              <label>
                Website
                <input
                  type="text"
                  name={CONTACT_HONEYPOT_FIELD}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="text-sm text-white/80">
                  {copy.name}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  required
                  minLength={2}
                  maxLength={120}
                  autoComplete="name"
                  className={inputClass}
                  placeholder={copy.namePlaceholder}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="text-sm text-white/80">
                  {copy.email}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={inputClass}
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <label htmlFor="contact-company" className="text-sm text-white/80">
                {copy.company}
              </label>
              <input
                id="contact-company"
                name="company"
                maxLength={120}
                autoComplete="organization"
                className={inputClass}
                placeholder={copy.companyPlaceholder}
              />
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <label htmlFor="contact-message" className="text-sm text-white/80">
                {copy.message}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                minLength={10}
                maxLength={5000}
                rows={5}
                className="rounded-lg border border-[#242424] bg-[#141414] px-4 py-3 text-sm text-white placeholder:text-[#8A8A8A] focus:border-[#4F7CFF] focus:outline-none"
                placeholder={copy.messagePlaceholder}
              />
            </div>

            {status === "error" && (
              <p
                role="alert"
                className="mt-5 flex items-start gap-2.5 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm leading-6"
              >
                <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-400" />
                <span>
                  <strong className="font-semibold text-white">{copy.errorTitle}</strong>
                  <br />
                  <span className="text-white/70">{copy.errorText}</span>
                </span>
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={status === "sending"}
              className="mt-6 w-full rounded-full bg-white text-black hover:bg-[#4F7CFF] hover:text-white disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> {copy.sending}
                </>
              ) : (
                copy.submit
              )}
            </Button>
          </form>
        </Reveal>
      </div>

      {/* Success toast — 3 seconds, then gone */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed inset-x-0 bottom-5 z-[60] flex justify-center px-5 sm:bottom-8"
          >
            <p className="flex max-w-md items-start gap-2.5 rounded-2xl border border-emerald-400/30 bg-[#0D0D0D]/95 p-4 text-sm leading-6 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.8)] backdrop-blur-md">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
              <span>
                <strong className="font-semibold text-white">{copy.successTitle}</strong>
                <br />
                <span className="text-white/70">{copy.successText}</span>
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
