/**
 * ProcessArt — abstract per-step illustrations (no stock imagery).
 * Thin line-art motifs in the JTT palette: white/10 structure with a
 * single #4F7CFF focal point. Static SVGs; GSAP owns all motion here.
 */
export function ProcessArt({ index }: { index: number }) {
  return (
    <div
      aria-hidden="true"
      className="relative mb-6 h-36 overflow-hidden rounded-xl border border-[#242424] bg-[#0D0D0D] sm:h-44 md:mb-8 lg:h-48 md:landscape:mb-4 md:landscape:h-28"
    >
      <svg
        viewBox="0 0 400 200"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        {ART[index] ?? null}
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0D0D0D] to-transparent" />
    </div>
  );
}

const STRUCTURE = "rgba(255,255,255,0.14)";
const SOFT = "rgba(255,255,255,0.28)";
const ACCENT = "#4F7CFF";

const ART = [
  /* 01 — Understand: mapped nodes, one focal point under the lens */
  <g key="understand" fill="none" strokeWidth="1.5">
    <line x1="70" y1="100" x2="150" y2="60" stroke={STRUCTURE} />
    <line x1="70" y1="100" x2="150" y2="140" stroke={STRUCTURE} />
    <line x1="150" y1="60" x2="250" y2="100" stroke={STRUCTURE} />
    <line x1="150" y1="140" x2="250" y2="100" stroke={STRUCTURE} />
    <line x1="250" y1="100" x2="330" y2="100" stroke={STRUCTURE} strokeDasharray="4 5" />
    <circle cx="70" cy="100" r="7" stroke={SOFT} />
    <circle cx="150" cy="60" r="7" stroke={SOFT} />
    <circle cx="150" cy="140" r="7" stroke={SOFT} />
    <circle cx="330" cy="100" r="5" stroke={SOFT} />
    <circle cx="250" cy="100" r="10" stroke={ACCENT} strokeWidth="2" />
    <circle cx="250" cy="100" r="22" stroke={ACCENT} strokeOpacity="0.4" strokeDasharray="3 6" />
    <circle cx="250" cy="100" r="3.5" fill={ACCENT} stroke="none" />
  </g>,
  /* 02 — Plan: blueprint grid + wireframe with dimension lines */
  <g key="plan" fill="none" strokeWidth="1.5">
    <defs>
      <pattern id="plan-grid" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M 24 0 L 0 0 0 24" stroke={STRUCTURE} strokeWidth="1" />
      </pattern>
    </defs>
    <rect x="0" y="0" width="400" height="200" fill="url(#plan-grid)" stroke="none" />
    <rect x="120" y="48" width="160" height="104" stroke={SOFT} />
    <line x1="120" y1="84" x2="280" y2="84" stroke={STRUCTURE} />
    <line x1="176" y1="48" x2="176" y2="152" stroke={STRUCTURE} />
    <path d="M 102 40 h 18" stroke={ACCENT} strokeWidth="2.5" />
    <path d="M 262 40 h 18" stroke={ACCENT} strokeWidth="2.5" />
    <line x1="120" y1="40" x2="280" y2="40" stroke={ACCENT} strokeDasharray="2 5" />
    <path d="M 344 48 v 18 M 344 134 v 18" stroke={ACCENT} strokeWidth="2.5" />
    <line x1="344" y1="48" x2="344" y2="152" stroke={ACCENT} strokeDasharray="2 5" />
    <circle cx="120" cy="48" r="4" fill={ACCENT} stroke="none" />
  </g>,
  /* 03 — Build: code chevrons + stacked code lines */
  <g key="build" fill="none" strokeWidth="1.5">
    <path d="M 96 78 L 64 100 L 96 122" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 144 78 L 176 100 L 144 122" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="128" y1="66" x2="112" y2="134" stroke={SOFT} strokeWidth="2.5" strokeLinecap="round" />
    <rect x="208" y="52" width="128" height="12" rx="6" fill="rgba(255,255,255,0.12)" stroke="none" />
    <rect x="208" y="76" width="92" height="12" rx="6" fill={ACCENT} fillOpacity="0.35" stroke="none" />
    <rect x="208" y="100" width="112" height="12" rx="6" fill="rgba(255,255,255,0.12)" stroke="none" />
    <rect x="208" y="124" width="64" height="12" rx="6" fill="rgba(255,255,255,0.12)" stroke="none" />
    <line x1="40" y1="164" x2="360" y2="164" stroke={STRUCTURE} strokeDasharray="4 6" />
  </g>,
  /* 04 — Evolve: ascending curve with iteration dots */
  <g key="evolve" fill="none" strokeWidth="1.5">
    <line x1="48" y1="24" x2="48" y2="172" stroke={STRUCTURE} />
    <line x1="48" y1="172" x2="368" y2="172" stroke={STRUCTURE} />
    <path
      d="M 48 150 C 120 150, 130 110, 190 108 S 290 70, 344 44"
      stroke={SOFT}
      strokeWidth="2"
    />
    <circle cx="118" cy="128" r="5" stroke={SOFT} fill="#0D0D0D" />
    <circle cx="190" cy="108" r="5" stroke={SOFT} fill="#0D0D0D" />
    <circle cx="262" cy="84" r="5" stroke={SOFT} fill="#0D0D0D" />
    <circle cx="344" cy="44" r="7" stroke={ACCENT} strokeWidth="2" fill="#0D0D0D" />
    <circle cx="344" cy="44" r="3" fill={ACCENT} stroke="none" />
    <path d="M 330 38 L 348 40 L 342 56" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </g>,
  /* 05 — Communicate: two dialogue bubbles, open channel */
  <g key="communicate" fill="none" strokeWidth="1.5">
    <rect x="60" y="52" width="128" height="72" rx="14" stroke={SOFT} />
    <path d="M 92 124 L 86 142 L 108 124" stroke={SOFT} strokeLinejoin="round" />
    <rect x="212" y="80" width="128" height="72" rx="14" stroke={ACCENT} strokeOpacity="0.8" />
    <path d="M 308 152 L 314 170 L 292 152" stroke={ACCENT} strokeOpacity="0.8" strokeLinejoin="round" />
    <circle cx="92" cy="88" r="4" fill={SOFT} stroke="none" />
    <circle cx="112" cy="88" r="4" fill={SOFT} stroke="none" />
    <circle cx="132" cy="88" r="4" fill={ACCENT} stroke="none" />
    <circle cx="244" cy="116" r="4" fill={ACCENT} stroke="none" />
    <circle cx="264" cy="116" r="4" fill="rgba(255,255,255,0.5)" stroke="none" />
    <circle cx="284" cy="116" r="4" fill="rgba(255,255,255,0.5)" stroke="none" />
    <line x1="188" y1="88" x2="212" y2="98" stroke={STRUCTURE} strokeDasharray="3 5" />
  </g>,
];
