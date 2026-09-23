# Skill — JTT Code Review

## Purpose
Review changes against JTT's architecture, visual direction, accessibility and product requirements.

## Load when
- reviewing a PR/diff
- finishing a major implementation
- refactoring the homepage

## Review priorities

### P0 — correctness
- broken functionality
- runtime errors
- broken navigation
- invalid React/Next.js patterns
- accessibility blockers

### P1 — architecture
- unnecessary client components
- duplicate animation engines
- leaked GSAP contexts/listeners
- unnecessary dependencies
- large duplicated components
- hidden state complexity

### P1 — product fidelity
- deviation from `.agents/context/prototype.md`
- removed sections returning accidentally
- wrong navigation/CTA structure
- missing required prototype elements

### P2 — quality
- visual inconsistencies
- responsive issues
- performance regressions
- weak semantics
- maintainability problems

## Review rule
Every finding must identify:
1. what is wrong
2. why it matters
3. where it occurs
4. the smallest appropriate fix

Do not rewrite working code merely to impose a personal style.
