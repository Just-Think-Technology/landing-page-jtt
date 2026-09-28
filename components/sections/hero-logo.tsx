"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

/**
 * HeroLogo — circular JTT mark shown only on desktop (lg+).
 * 3D tilt on mousemove: rotateY = x * 25, rotateX = -y * 25.
 * Respects prefers-reduced-motion and cleans up GSAP + listeners.
 */
export function HeroLogo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const target = imgRef.current;
    if (!wrap || !target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set(target, { transformPerspective: 600 });
    }, wrap);

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(target, {
        rotateY: x * 25,
        rotateX: -y * 25,
        duration: 0.3,
        transformPerspective: 600,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onLeave = () => {
      gsap.to(target, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="hidden select-none lg:block"
      style={{ perspective: "900px" }}
    >
      <div ref={imgRef} className="will-change-transform">
        <Image
          src="/logo-branco-sem-fundo.png"
          alt=""
          width={800}
          height={800}
          priority
          className="h-auto w-full max-w-[420px] rounded-full object-cover xl:max-w-[480px]"
        />
      </div>
    </div>
  );
}
