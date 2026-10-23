# landing-page-jtt: agent guide

Institutional site of JTT (Just Think Technology), live at `jttechnology.com.br`. It must read as a premium, cinematic, editorial technology company, not a generic agency, template or SaaS landing page. Slogan: **Think Smarter. Build Better.**

This file is the map. The rules live in `.agents/rules/`; do not repeat them here.

## Stack

- **Framework:** Next.js 16.3.6 with the App Router, TypeScript
- **UI:** React 19.2.8, Tailwind CSS, shadcn/ui
- **Motion:** Motion for React and GSAP with ScrollTrigger
- **Package manager:** npm (`package-lock.json`)
- **Deploy:** static Next.js site; no database, no backend

CSS/Tailwind, Motion and GSAP are the approved animation stack. Another animation library needs a recorded decision.

## Commands

Run from the repository root.

```bash
npm run dev        # local development
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npx tsc --noEmit   # type check
```

There is no test script yet. A change is only done when lint, type check and build are green.

## Layout

```text
app/          # App Router routes, layout and global styles
components/   # sections and UI primitives
lib/          # shared helpers
public/       # static assets served as-is
docs/assets/  # screenshots and reference images
.agents/      # rules, context, workflows, checklists and skills
```

## Homepage contract

The current information architecture, section order and prototype requirements live in `.agents/context/prototype.md`. Approved copy and brand facts live in `.agents/context/`. Never invent a claim that is not there.

## Task flow

1. Inspect the relevant code and configuration before changing it.
2. Read this file and the applicable `.agents/` guidance. Ask only when ambiguity materially affects the implementation.
3. Choose the smallest coherent implementation.
4. Implement, preferring existing project patterns.
5. Run lint, type check and build.
6. Review the diff against the rules.
7. Report what changed and what was actually verified. Do not claim a check passed unless it ran.

## Rules

Always loaded through `opencode.json`: `clean-code`, `comments`, `testing`, `security`, `git`, `documentation`, `stack-nextjs`, `stack-react`.

Read on demand:

- `.agents/rules/project-architecture.md` before routes, Server vs Client Components or animation infrastructure.
- `.agents/rules/ui-design-system.md` before any visual choice.
- `.agents/rules/ui-frontend.md` before building or refactoring UI.
- `.agents/rules/ui-animation.md` before adding motion.
- `.agents/rules/ui-accessibility.md` before shipping an interactive element.
- `.agents/rules/project-content.md` before writing or reviewing copy.

## Context

Read what the task needs, not everything:

- `.agents/context/brand.md`: identity and voice.
- `.agents/context/approved-content.md`: claims and copy that are allowed.
- `.agents/context/information-architecture.md`: page structure.
- `.agents/context/prototype.md`: section-by-section homepage contract.

## Workflows and checklists

- `.agents/workflows/new-section.md`: adding a homepage section.
- `.agents/workflows/visual-change.md`: changing the visual system.
- `.agents/workflows/dependency-change.md`: adding or upgrading a dependency.
- `.agents/checklists/visual-qa.md`: before merging a visible change.
- `.agents/checklists/release.md`: before publishing.

## Skills

Use the smallest relevant set, not all of them:

- `vertical-slice`, `code-review`, `db-migration` (baseline; `db-migration` is kept for parity and does not apply to this site).
- `frontend`, `animation`, `architecture`, `seo-performance`, `visual-qa` (project).

## Decisions

Non-obvious choices are recorded in `.agents/decisions/DEC-XXX-slug.md`, from the template. A decision is superseded, never edited to fit a new opinion.

## Never do

- Never invent metrics, customers, outcomes, awards, certifications, partnerships, testimonials or technologies used by clients. Use `.agents/context/approved-content.md`.
- Never copy the visual references (GTA VI, Apple, Epic.net, Webflow). They are direction, not assets.
- Never add an animation library outside the approved stack without a decision.
- Never make hover the only interaction path, remove visible focus, or ignore `prefers-reduced-motion`.
- Never introduce generic SaaS cards, stock-photo aesthetics, cliché technology imagery, excessive gradients, icon overload or fake dashboards.
- Never add a second styling system or duplicate design tokens.
- Never claim a check passed without running it.
- Never push directly to `main` or open a PR with failing lint, type check or build.
- Never add an unrequested feature or an unrelated refactor.
