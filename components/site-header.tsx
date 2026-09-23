"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[#242424] bg-[#050505]/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="#top"
          className="font-display text-sm font-bold tracking-[0.18em] text-white"
          aria-label="Just Think Technology — back to top"
        >
          JTT<span className="text-[#4F7CFF]">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[#8A8A8A] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#4F7CFF]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            asChild
            className="rounded-full bg-white text-black hover:bg-[#4F7CFF] hover:text-white"
          >
            <Link href="#contact">Get in touch</Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md text-white md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <nav
          aria-label="Mobile"
          className="border-t border-[#242424] bg-[#0D0D0D] px-5 pt-2 pb-6 md:hidden"
        >
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-[#242424] py-4 text-base text-white last:border-0"
            >
              {item.label}
            </Link>
          ))}
          <Button
            asChild
            className="mt-4 w-full rounded-full bg-white text-black hover:bg-[#4F7CFF] hover:text-white"
          >
            <Link href="#contact" onClick={() => setOpen(false)}>
              Get in touch
            </Link>
          </Button>
        </nav>
      ) : null}
    </header>
  );
}
