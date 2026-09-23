# JTT — Agent Instructions

## Project
Just Think Technology (JTT) is a Brazilian technology company focused on software and digital systems that solve real business problems.

Slogan: **Think Smarter. Build Better.**

The website is a premium institutional experience. It must communicate technology, engineering, precision, ambition and credibility — not a generic agency, template or SaaS landing page.

## Source of truth
1. Inspect the relevant code and configuration before changing it.
2. Read the applicable `.agents/` guidance.
3. Prefer existing project patterns.
4. Never invent company claims, metrics, clients, testimonials or capabilities.
5. Ask only when ambiguity materially affects the implementation.

## Stack
Next.js + TypeScript, App Router, Tailwind CSS, shadcn/ui, Motion for React and GSAP.

Do not introduce another animation library merely to solve a problem already covered by Motion or GSAP. Anime.js is not part of the approved animation stack unless explicitly approved.

## JTT homepage contract

The current homepage information architecture and prototype-specific requirements live in `.agents/context/prototype.md`.

Use these skills when relevant:
- `.agents/skills/frontend/SKILL.md`
- `.agents/skills/animation/SKILL.md`
- `.agents/skills/visual-qa/SKILL.md`
- `.agents/skills/architecture/SKILL.md`
- `.agents/skills/seo-performance/SKILL.md`
- `.agents/skills/code-review/SKILL.md`

Do not load all skills for every task; use progressive disclosure.

## Architecture
- Prefer Server Components.
- Use Client Components only for browser APIs, state, interaction or animation.
- Keep client boundaries small.
- Keep content separate from animation logic when practical.
- Avoid unnecessary global client state.
- Preserve semantic HTML and accessibility.
- Follow existing Next.js App Router conventions.

## Animation ownership
- CSS/Tailwind: simple transitions and states.
- Motion: React-local interaction, enter/exit, layout and viewport reveals.
- GSAP + ScrollTrigger: cinematic timelines, complex scroll choreography, SVG/path animation and advanced hero sequences.

Do not make the same property depend on multiple animation engines without a concrete reason.

All animation must have a UX or narrative purpose. Respect `prefers-reduced-motion`. Prefer transform/opacity and clean up GSAP contexts/listeners.

## JTT visual direction
References: GTA VI (cinematic storytelling), Apple (clarity/typography/precision), Epic.net (editorial project presentation), Webflow (interaction/scroll). These are references only; do not copy them.

Palette:
- `#050505`
- `#0D0D0D`
- `#141414`
- `#FFFFFF`
- `#8A8A8A`
- `#242424`
- `#4F7CFF`

Avoid generic SaaS cards, stock-photo aesthetics, cliché technology imagery, excessive gradients, icon overload, fake dashboards, fake metrics and purposeless animation.

## Content
Core themes: structured technology, solid engineering, reliability, scalability, evolution, real business impact, innovation, technical excellence, customer focus, learning and long-term vision.

Never fabricate results, awards, certifications, partnerships, testimonials or metrics.

## Workflow
For non-trivial tasks:
1. Inspect.
2. Load relevant `.agents/` guidance.
3. Choose the smallest coherent implementation.
4. Implement.
5. Run relevant checks from `package.json`.
6. Review the diff.
7. Report what changed and what was actually verified.

Do not claim checks passed unless they were run.

## Precedence
1. System/developer/user instructions.
2. More-specific nested `AGENTS.md`.
3. This root `AGENTS.md`.
4. Supporting `.agents/` documents.
