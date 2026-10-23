# JTT Skills

Skills are narrow, reusable workflows. Load them only when relevant. Each skill has `name` and `description` frontmatter so opencode can discover it.

## Baseline

- `vertical-slice/SKILL.md`: implement one behavior at a time, test first.
- `code-review/SKILL.md`: review a change against the rules and the spec.
- `db-migration/SKILL.md`: change a schema safely. Kept for baseline parity; this site has no database.

## Project

- `frontend/SKILL.md`: production React/Next.js UI implementation.
- `animation/SKILL.md`: Motion/GSAP/CSS motion strategy.
- `visual-qa/SKILL.md`: prototype fidelity and visual QA.
- `architecture/SKILL.md`: Server/Client boundaries and system structure.
- `seo-performance/SKILL.md`: metadata, assets, performance and discoverability.

## Rule

Do not load every skill for every task. Use the smallest relevant set. This keeps agent context focused and follows current guidance to avoid bloated instruction stacks.
