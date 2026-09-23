# Skill — JTT Animation

## Purpose
Implement cinematic interaction without turning the homepage into an animation demo.

## Load when
- creating scroll choreography
- building hero motion
- adding reveal/parallax effects
- reviewing animation performance

## Tool selection
1. CSS/Tailwind for simple state transitions.
2. Motion for React-local interaction and declarative UI animation.
3. GSAP + ScrollTrigger for complex timelines and cinematic choreography.

Do not introduce Anime.js unless explicitly approved.

## Rules
- One animation owner per property.
- Motion must communicate hierarchy, continuity, feedback or narrative.
- Keep initial page content understandable before/without animation.
- Respect `prefers-reduced-motion`.
- Prefer transform/opacity.
- Scope and clean up GSAP contexts and ScrollTriggers.
- Avoid scroll handlers that perform unnecessary layout reads/writes.
- Do not use animation to hide slow loading.

## Validation
Test:
- normal motion
- reduced motion
- mobile
- keyboard/focus states
- page visibility/background tab behavior for continuous effects
