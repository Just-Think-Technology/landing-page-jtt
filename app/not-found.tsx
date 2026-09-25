"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

/**
 * Themed 404 — JTT "lost in the void" page.
 * Standalone (outside LanguageProvider): static bilingual copy,
 * PT first since it's the default locale. Plain Links so it works
 * with zero client state beyond the entrance choreography.
 */
export default function NotFound() {
  const reduce = useReducedMotion();

  return (
    <main className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#050505]">
      {/* Cinematic backdrop — matches the hero grid language */}
      <div aria-hidden="true" className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, transparent 50%, #050505 96%), radial-gradient(ellipse 75% 55% at 50% 36%, rgba(79,124,255,0.22), transparent 70%), repeating-linear-gradient(to right, rgba(255,255,255,0.055) 0 1px, transparent 1px 96px), repeating-linear-gradient(to bottom, rgba(255,255,255,0.045) 0 1px, transparent 1px 96px)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 32, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-7xl px-5 sm:px-8"
      >
        <p className="font-technical inline-flex items-center gap-3 text-xs tracking-[0.25em] text-[#8A8A8A] uppercase">
          <span className="inline-block size-1.5 rounded-full bg-[#4F7CFF]" />
          Erro 404 · Error 404
        </p>

        <p
          aria-hidden="true"
          className="font-display mt-6 leading-none font-bold tracking-tighter text-transparent select-none text-[clamp(6rem,22vw,16rem)]"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.22)" }}
        >
          404
        </p>

        <h1 className="font-display mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          Página não encontrada.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#8A8A8A] sm:text-lg sm:leading-8">
          A rota que você tentou não existe. Mas todo sistema bom tem um
          caminho de volta.{" "}
          <span className="text-white/60">
            The page you tried does not exist. Every good system has a way
            back.
          </span>
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4F7CFF] hover:text-white hover:shadow-[0_16px_48px_-12px_rgba(79,124,255,0.65)]"
          >
            <ArrowLeft size={16} /> Voltar ao início
          </Link>
          <Link
            href="/#contact"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#242424] bg-transparent px-8 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5"
          >
            Fale conosco <ArrowUpRight size={16} />
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
