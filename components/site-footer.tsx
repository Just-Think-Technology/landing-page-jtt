import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#242424] bg-[#050505]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-sm font-bold tracking-[0.18em]">
            JTT<span className="text-[#4F7CFF]">.</span>
          </p>
          <p className="mt-3 text-sm text-[#8A8A8A]">{site.slogan}</p>
          <p className="mt-1 font-technical text-xs text-[#8A8A8A]">
            BRAZIL — REMOTE FIRST
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="font-technical text-xs tracking-[0.2em] text-[#8A8A8A] uppercase">
            Navigate
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/80 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="#contact" className="text-white/80 hover:text-white">
                Get in touch
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <p className="font-technical text-xs tracking-[0.2em] text-[#8A8A8A] uppercase">
            Contact
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="text-white/80 hover:text-white"
              >
                {site.contact.email}
              </a>
            </li>
            <li>
              <a
                href={site.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#242424]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-5 py-6 font-technical text-xs text-[#8A8A8A] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Just Think Technology.</p>
          <p>Structured technology. Real business impact.</p>
        </div>
      </div>
    </footer>
  );
}
