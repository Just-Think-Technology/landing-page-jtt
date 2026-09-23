# JTT Homepage — Implementation Plan

> **Status:** Planned
> **Project:** Just Think Technology — Institutional Homepage
> **Primary reference:** https://done-chunk-85975887.figma.site/
> **Stack:** Next.js + TypeScript + App Router + Tailwind CSS + shadcn/ui + Motion + GSAP
> **Governing instructions:** `/AGENTS.md` and `.agents/**`

---

## 1. Purpose

Implement the JTT institutional homepage as a premium, technical, cinematic and editorial web experience.

The implementation must follow the existing `.agents` system and its rules for:

- Architecture
- Frontend
- Design system
- Animation
- Accessibility
- Performance
- Content integrity
- Visual QA
- Release validation

The prototype is the primary visual/structural reference. Existing JTT project context remains the source for factual company information.

---

## 2. Non-Negotiable Principles

### 2.1 The homepage is one narrative

The page must communicate a single continuous story:

```
WHO IS JTT?
  → WHAT DOES JTT BUILD?
  → HOW DOES JTT WORK?
  → WHAT HAS JTT BUILT?
  → WHAT DOES JTT OWN?
  → WHY JTT?
  → WHO IS BEHIND JTT?
  → HOW DO I START?
```

Do not reintroduce removed or duplicated sections.

### 2.2 Scroll is a first-class interaction

The primary animation model is **scroll-linked animation**. The scroll position must control the visual state:

```
scroll position → section progress → animation progress → visual state
```

Required behavior:

| User action | Result |
|---|---|
| Scrolls down | Animation progresses (0% → 100%) |
| Stops | Animation remains at its current state |
| Scrolls back up | Animation reverses (100% → 0%) |

The same animation must be deterministic in both directions.

**Prefer:**
```
scrollProgress → visualState
```

**Avoid:**
```
scroll event → play animation
```

Do not implement a one-way animation where a scroll event simply calls `play()`. This is a core acceptance criterion for the homepage.

---

## 3. Source of Truth

Before implementation, agents/developers must read:

**Context**
- `/AGENTS.md`
- `.agents/context/brand.md`
- `.agents/context/prototype.md`
- `.agents/context/information-architecture.md`
- `.agents/context/approved-content.md`
- `.agents/context/technical-decisions.md`

**Rules**
- `.agents/rules/architecture.md`
- `.agents/rules/frontend.md`
- `.agents/rules/animation.md`
- `.agents/rules/design-system.md`
- `.agents/rules/accessibility.md`
- `.agents/rules/content.md`
- `.agents/rules/performance.md`

**Workflows**
- `.agents/workflows/new-section.md`
- `.agents/workflows/visual-change.md`
- `.agents/workflows/animation-change.md`
- `.agents/workflows/dependency-change.md`
- `.agents/workflows/release.md`

**Skills**
- `.agents/skills/frontend/SKILL.md`
- `.agents/skills/animation/SKILL.md`
- `.agents/skills/visual-qa/SKILL.md`
- `.agents/skills/architecture/SKILL.md`
- `.agents/skills/seo-performance/SKILL.md`
- `.agents/skills/code-review/SKILL.md`

---

## 4. Current Homepage Information Architecture

Final structure:

```
HEADER
HERO
POSITIONING
SERVICES
PROCESS
CASES
PRODUCTS
WHY JTT
TEAM
CONTACT
MANIFESTO LINE
FINAL CTA
FOOTER
```

**Navigation:** Services · Products · Cases · About · Get in touch

Do **not** add `Contact` or `Culture` as separate navigation items.

---

## 5. Phase 0 — Project Audit

**Objective:** Understand the current implementation before modifying it.

**Tasks**
- Read `AGENTS.md`
- Read relevant `.agents/context`
- Inspect current app structure
- Inspect existing components
- Inspect installed dependencies
- Confirm Next.js version
- Confirm React version
- Confirm Tailwind configuration
- Confirm shadcn setup
- Confirm Motion installation
- Confirm GSAP installation
- Identify existing global styles
- Identify existing fonts
- Identify existing image/media assets
- Identify current metadata
- Identify existing animation code
- Identify components that can be reused
- Identify obsolete homepage sections

**Deliverable:** A short implementation note containing:
- Current structure
- Reusable components
- Required changes
- Potential technical risks

Do not refactor unrelated parts of the project during this phase.

---

## 6. Phase 1 — Foundation

**Objective:** Create the structural foundation before implementing detailed sections or cinematic motion.

**Tasks**
- Establish page shell
- Establish global container
- Establish responsive grid
- Establish typography
- Establish design tokens
- Establish spacing system
- Establish border/radius conventions
- Establish semantic section structure
- Establish Header
- Establish Footer
- Establish anchor IDs

**Design tokens**

| Token | Value |
|---|---|
| Background | `#050505` |
| Surface | `#0D0D0D` |
| Surface 2 | `#141414` |
| Foreground | `#FFFFFF` |
| Muted | `#8A8A8A` |
| Border | `#242424` |
| Accent | `#4F7CFF` |

**Typography**

- **Display:** Manrope · Geist · Inter Tight
- **Body:** Inter
- **Technical:** Geist Mono · IBM Plex Mono

Use the project's actual installed/approved font configuration rather than introducing unnecessary alternatives.

---

## 7. Phase 2 — Static Homepage

Implement the complete page without complex scroll choreography first. This phase exists to validate:

- Information architecture
- Hierarchy
- Copy
- Spacing
- Responsive behavior
- Section order
- Visual direction

Do not attempt to solve every animation before the static structure is correct.

---

## 8. Header

**Required content:** Logo · Services · Products · Cases · About · Get in touch

**Behavior**

| State | Appearance |
|---|---|
| Initial | Transparent / integrated with Hero |
| Scrolled | May become compact, with surface + border |

The transition must respond to scroll state and return correctly when the user returns toward the top.

**Acceptance**
- No `Contact` nav item
- No `Culture` nav item
- `Get in touch` is the only header button
- Keyboard accessible
- Mobile navigation works
- Header does not cause horizontal overflow

---

## 9. Hero

**Content:** Use the currently approved headline and subtitle from the project source.

**CTAs:** `Start a project` · `Our work`

**Visual direction** — the Hero should establish:
- JTT identity
- Premium technology positioning
- Cinematic atmosphere
- Strong typography
- Restrained motion

**Scroll choreography**

| Hero progress | State |
|---|---|
| 0 | Initial composition |
| 0.25 | Headline transformation begins |
| 0.50 | Supporting elements move/reveal |
| 0.75 | Composition transitions |
| 1.0 | Hero completes |

Scrolling back must reverse the same states.

**Acceptance**
- No one-shot animation for the primary Hero choreography
- Scroll down advances it
- Scroll up reverses it
- Fast scrolling does not leave inconsistent states
- Reduced-motion behavior exists

---

## 10. Positioning

Merge the former concepts — **Statement, About, Mission, Manifesto** — into one concise positioning section.

It should answer: *Who is JTT and how does JTT think about technology?*

Do not recreate the old four-section structure.

**Animation** — use scroll-linked reveal/transformation where appropriate. Example model:

```
progress 0 → 1
opacity   0 → 1
y         40 → 0
```

Reverse automatically when progress goes `1 → 0`.

---

## 11. Services

**Four categories:**
1. Software
2. Platforms
3. Integrations
4. Custom Solutions

Prefer editorial rows over generic SaaS cards.

**Required correction:** The Integrations content must remain contained and must not overlap/collide with neighboring text.

**Interaction:** Each row can respond to scroll progress and/or local hover. Avoid unnecessary card-heavy UI.

**Acceptance**
- Exactly four categories
- Correct terminology
- Editorial treatment
- No text collision
- Responsive
- Accessible

---

## 12. Process

Place directly below Services. Exactly one process:

1. Understand
2. Plan
3. Build
4. Evolve
5. Communicate

Do not duplicate Process elsewhere.

**Animation concept:** A visual timeline can progress according to section scroll, e.g. a step-by-step indicator (01 → 02 → 03 → 04 → 05), or another editorial timeline consistent with the prototype.

The active state must be derived from scroll progress rather than a one-time trigger.

---

## 13. Cases

Use an editorial presentation inspired by the prototype/reference direction. Each case should communicate:

- Project
- Visual
- Context
- Verified result
- Verified quote, if available

**Content integrity** — never invent:
- Metrics
- Percentages
- Revenue
- Testimonials
- Client quotes
- Outcomes

If a result is not verified, **omit it**. Do not create placeholder fake proof that could accidentally reach production.

**Typo fix:** Correct `INTEORATIONS` → `INTEGRATIONS`.

---

## 14. Case Scroll Storytelling

Cases are candidates for a stronger scroll-linked experience.

**Preferred model:**

```
section
 └── sticky viewport
      ├── visual
      ├── project information
      └── result
```

The visual/content state can evolve with section progress:

| Progress | State |
|---|---|
| 0.00 | Initial case |
| 0.25 | Visual enters |
| 0.50 | Visual expands |
| 0.75 | Result appears |
| 1.00 | Case exits |

Reverse the same timeline when scrolling upward.

Use GSAP ScrollTrigger with `scrub` when the sequence becomes sufficiently complex to justify GSAP.

---

## 15. Products — Vendono

Present **VENDONO** with:
- Product description
- Product mockup
- `Request access`

**Animation** — the mockup may use restrained scroll-linked movement (scale, translate, small rotation, opacity). Do not overdo 3D effects. Example:

```
progress 0 → 1
scale    0.92 → 1
y        80 → 0
rotation 2deg → 0
```

Reverse when scrolling upward.

---

## 16. Why JTT

Use 3–4 concrete differentiators. The section should communicate documented JTT characteristics rather than generic value words.

Potential conceptual areas grounded in the approved project material include:
- Business-focused engineering
- Direct technical involvement
- Systems built for evolution
- Long-term technology partnership

Final wording must be validated against the approved content.

Avoid standalone generic claims such as *Innovation, Excellence, Quality, Commitment* unless they are accompanied by concrete meaning.

---

## 17. Team

Show both partners:

| Name | Role |
|---|---|
| Thiago Canato de Azevedo | CEO |
| Júlio Francisco Bernardino | CTO |

Each profile should include: photo, name, role, and one concise line.

Culture should be communicated through the Team/About narrative and working model. Do not create a separate Culture section.

---

## 18. Contact

Keep the form short.

**Suggested structure:** Name · Email · Company · Message · `Start a project`

Also expose: **Email** and **WhatsApp**.

Use the current authoritative contact details from the project source. Do not invent or duplicate outdated contact data.

---

## 19. Manifesto Line

Only one concise line before the final CTA. Do not recreate the previous full Manifesto section.

The line should reinforce the JTT identity and slogan without introducing unsupported claims.

---

## 20. Final CTA

**Primary:** `Start a project`
**Secondary:** `WhatsApp` or `Email`

Do not use `View our services`.

The final CTA should feel like the natural conclusion of the narrative.

---

## 21. Footer

Include: JTT · Navigation · Location · Email · WhatsApp

Navigation should reflect the current IA.

---

## 22. Phase 3 — Animation Architecture

Only after the static page passes visual QA.

**Animation ownership**

| System | Use for |
|---|---|
| CSS / Tailwind | Hover, focus, simple transitions, small UI state changes |
| Motion | React-local interactions, viewport-linked component behavior, layout transitions, local reveals, `useScroll`, `useTransform` |
| GSAP / ScrollTrigger | Cinematic Hero timeline, complex scroll choreography, sticky/pinned sequences, synchronized timelines, SVG/path animation, complex scrubbed interactions |

**Rule:** Never let multiple animation systems control the same property simultaneously.

---

## 23. Scroll-Linked Animation System

Create a small reusable animation architecture rather than implementing unrelated scroll logic in every section.

```
useScroll → section progress → transform mapping → visual state
```

- **Simple cases:** Motion (`useScroll`, `useTransform`)
- **Complex cases:** GSAP (`ScrollTrigger`, `scrub`)

**Important:** Do not use this pattern as the main mechanism for cinematic sections:

```
onScroll → if threshold → play()
```

Use this instead:

```
scroll position → continuous progress → animation state
```

This guarantees reversibility.

---

## 24. Scroll Direction

Scroll direction can be used for UI behaviors such as the Header. It must not replace scroll-linked progress for continuous animations.

**Example:**
- Scroll down → compact header
- Scroll up → reveal header

**For continuous animation:** `scrollY → progress → visual state` — **not** `scroll direction → play/reverse`.

---

## 25. Motion Timing

Use restrained timings.

| Type | Duration |
|---|---|
| Micro interaction | 150–300ms |
| UI transition | 300–600ms |
| Entrance | 500–800ms |

For scrubbed animations, duration should primarily be determined by scroll distance rather than a fixed duration.

---

## 26. Sticky Sections

Use sticky sections where they improve storytelling.

**Candidates:** Hero · Cases · Products · Process

Do not make every section sticky. A sticky section must have:
- A clear narrative purpose
- A bounded scroll range
- Predictable exit
- Mobile fallback

---

## 27. Mobile Motion Strategy

Desktop and mobile do not need identical choreography.

| Breakpoint | Strategy |
|---|---|
| Desktop | Full cinematic treatment |
| Tablet | Reduce parallax distance, simultaneous animated elements, large transforms |
| Mobile | Prioritize readability, touch interaction, performance, predictable scrolling |

Simplify complex pinned sequences where necessary.

---

## 28. Reduced Motion

When `prefers-reduced-motion: reduce` is set, the site must remain completely functional.

Reduce or disable: parallax, large transforms, complex scrubbed sequences, decorative motion.

Never hide meaningful content because animation is disabled.

---

## 29. Performance

Animations must not compromise the site's primary purpose.

**Prefer:** `transform`, `opacity`, `clip-path`

**Avoid** unnecessary animation of: `width`, `height`, `top`, `left`, `margin`, `padding` when another technique is suitable.

**Additional requirements:**
- Keep client boundaries small
- Optimize images
- Lazy-load non-critical heavy media
- Avoid duplicate animation libraries
- Avoid unnecessary event listeners
- Clean up GSAP contexts
- Avoid scroll-jacking
- Keep the main thread available for interaction

---

## 30. Phase 4 — Responsive Implementation

**Test:** Mobile · Tablet · Desktop · Wide desktop

**Validate:** header, hero, typography, grids, editorial rows, sticky sections, cases, mockups, contact form, footer, horizontal overflow.

The desktop composition must not simply be scaled down.

---

## 31. Phase 5 — Accessibility

Run the `.agents/checklists/accessibility.md` checklist.

**Minimum requirements:**
- Semantic landmarks
- Correct heading hierarchy
- Keyboard navigation
- Visible focus states
- Form labels
- Accessible names
- Sufficient contrast
- No color-only meaning
- Reduced-motion support
- Usable touch targets
- Appropriate image alt behavior

---

## 32. Phase 6 — SEO & Performance

Follow `.agents/skills/seo-performance/SKILL.md`.

**Validate:** title, description, metadata, canonical strategy if applicable, semantic headings, crawlable links, image alt text, image dimensions, loading behavior, client JavaScript, production build.

SEO copy must not distort the approved JTT positioning.

---

## 33. Phase 7 — Visual QA

Follow `.agents/skills/visual-qa/SKILL.md` and `.agents/checklists/visual-qa.md`.

**Compare implementation against:** prototype, brand, information architecture, approved content.

**Check:** typography, spacing, hierarchy, alignment, section rhythm, visual density, animation, mobile behavior, overflow, CTA consistency.

---

## 34. Animation Acceptance Tests

Every scroll-linked animation must pass these tests:

| Test | Action | Expected result |
|---|---|---|
| A — Slow scroll down | Scroll ↓ slowly | Animation follows scroll position |
| B — Slow scroll up | Scroll ↑ slowly | Animation reverses continuously |
| C — Stop | Scroll → stop | Animation freezes at current visual state |
| D — Fast scroll | Scroll ↓ quickly | No broken intermediate state |
| E — Fast reverse | Scroll ↑ quickly | Animation returns correctly |
| F — Repeated direction changes | ↓ ↑ ↓ ↑ ↓ | Deterministic visual state |
| G — Resize | Desktop → mobile → desktop | Triggers and dimensions remain correct |
| H — Reduced motion | `prefers-reduced-motion` | Content remains usable; decorative motion is reduced |

---

## 35. Phase 8 — Final Validation

Before release:

- [ ] Typecheck
- [ ] Lint
- [ ] Production build
- [ ] Visual QA
- [ ] Accessibility QA
- [ ] Performance QA
- [ ] Responsive QA
- [ ] SEO QA
- [ ] Content verification
- [ ] Navigation verification
- [ ] Contact verification
- [ ] Animation reverse-direction QA
- [ ] Reduced-motion QA
- [ ] Runtime console review
- [ ] Git diff review

Use `.agents/workflows/release.md` as the final release workflow.

---

## 36. Definition of Done

The homepage is complete only when all of the following are true:

**Structure**
- Current IA implemented
- Removed sections remain removed
- No duplicated Process
- Navigation matches specification

**Content**
- Approved content used
- No fabricated metrics
- No fabricated testimonials
- No unsupported claims
- Typo corrected

**Design**
- Brand tokens applied
- Prototype direction respected
- Editorial composition preserved
- Responsive layouts complete

**Motion**
- Scroll-linked animation implemented where specified
- Scrolling down advances animations
- Scrolling up reverses animations
- Animations remain stable when scrolling stops
- Fast direction changes do not break state
- Reduced motion supported
- No conflicting animation ownership

**Engineering**
- Server Components used by default
- Client boundaries justified
- Motion and GSAP have clear responsibilities
- No unnecessary dependencies
- Performance validated
- Accessibility validated
- Production build passes

---

## 37. Recommended Implementation Order

1. Project audit
2. Foundation
3. Design system
4. Header + Footer
5. Hero
6. Positioning
7. Services
8. Process
9. Cases
10. Products / Vendono
11. Why JTT
12. Team
13. Contact
14. Manifesto line
15. Final CTA
16. Responsive
17. Static visual QA
18. Scroll animation architecture
19. Hero scroll choreography
20. Services / Process motion
21. Case storytelling
22. Vendono motion
23. Remaining section motion
24. Micro-interactions
25. Reduced motion
26. Performance
27. Accessibility
28. SEO
29. Final visual QA
30. Release validation

---

## 38. Final Engineering Principle

The JTT homepage should **not** be implemented as:

```
sections + random animations
```

It should be implemented as:

```
CONTENT
  + VISUAL SYSTEM
  + SCROLL SYSTEM
  + MOTION SYSTEM
  + RESPONSIVE SYSTEM
  + ACCESSIBILITY
  + PERFORMANCE
```

The scroll experience is part of the information architecture. The user should feel that the page is responding to their movement through the story — not that a collection of animations happens to exist on a long page.

The final implementation must remain maintainable inside the project's `.agents` operating system.
