# Animation Rules

## Tool ownership
CSS/Tailwind → simple visual states.
Motion → React-local interaction, enter/exit, layout and viewport reveals.
GSAP → cinematic timelines, ScrollTrigger, complex choreography, SVG/path animation.

Use the simplest tool that solves the problem.

Every animation must communicate hierarchy, continuity, feedback, reveal content or reinforce narrative. Otherwise remove it.

Prefer transform/opacity. Avoid layout-thrashing animation, excessive blur, continuous unnecessary effects and long blocking sequences.

GSAP timelines/listeners must be scoped and cleaned up. Motion components should remain as small as practical.

Respect `prefers-reduced-motion`; essential content and interaction must remain usable without decorative motion.
