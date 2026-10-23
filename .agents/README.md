# JTT Agent System: baseline

`baseline: jtt-agents v1`

This folder is the source for the `.agents/` system used in JTT repositories. It is copied into a repository, never referenced from it, so the repository stays self-contained.

Source of truth: `001-company/standards/agent-system.md`. If this README and the standard disagree, the standard wins.

## What is here

| Path | Purpose |
|---|---|
| `AGENTS.md` | Repository map template, maximum 150 lines |
| `opencode.json` | opencode configuration template |
| `rules/` | 6 baseline rules plus 4 stack packs |
| `decisions/_template.md` | Decision record template |
| `skills/` | `vertical-slice`, `code-review`, `db-migration` |

The baseline rules are always loaded. Project rules, decisions, `context/`, `workflows/`, `checklists/` and skills are loaded on demand. `AGENTS.md` must say when each one matters.

## How to apply

1. Copy `AGENTS.md`, `opencode.json` and `.agents/` to the repository root.
2. Keep in `.agents/rules/` the 6 baseline rules plus only the stack packs the repository uses.
3. Adapt `AGENTS.md` to the project. It is a map, not a copy of the rules.
4. Add the project decisions and, when they exist, `context/`, `workflows/` and `checklists/`.
5. Remove `.agents/settings.json` if it exists. `opencode.json` is the only configuration.
6. Set `baseline: jtt-agents v1` in `.agents/README.md`.
7. Run `opencode debug config` and `opencode debug skill` from the repository root.

## Rules for the copy

- Do not edit a baseline rule to fit one project. Add a project rule with a domain prefix, such as `rules/project-*.md`, `rules/security-*.md` or `rules/ui-*.md`, and link it from `AGENTS.md`.
- A baseline rule can be overridden only with a decision in `decisions/`. The project rule must link that decision.
- Do not duplicate an instruction in `AGENTS.md` and in a rule. Pick one home and point to it.
- Do not put secrets, credentials or personal data in `.agents/`.
- When the baseline changes, update the copy and the version line in `.agents/README.md`.

## Baseline contents

### Rules

- `clean-code.md`: naming, functions, control flow, errors, duplication, abstraction, side effects, dead code.
- `comments.md`: when and how to comment, file headers, public API docs, prohibited patterns.
- `testing.md`: TDD in vertical slices, seams, test levels, test data, CI gates.
- `security.md`: secrets, auth, authorization, input, personal data, logging, dependencies, headers, uploads, backups.
- `git.md`: branches, Conventional Commits, PRs, review, commit hygiene.
- `documentation.md`: README, `AGENTS.md`, `.agents/`, `docs/`, decisions, when to update.

### Stack packs

- `stack-nestjs.md`: NestJS, Prisma, PostgreSQL.
- `stack-nextjs.md`: Next.js App Router, React, Tailwind.
- `stack-fastapi.md`: FastAPI, SQLAlchemy, Alembic, pytest.
- `stack-react.md`: React with Vite, React Router, Vitest.

### Skills

- `vertical-slice`: implement one behavior at a time, test first, verify with evidence.
- `code-review`: review against the rules and the spec, with two separate axes.
- `db-migration`: change a schema safely, forward-only.

## Versioning

The version is a single line in this file. A change to any baseline rule, stack pack or skill bumps it. Repositories receive the change as a migration, not as an automatic sync.

Version history:

| Version | Date | Change |
|---|---|---|
| `jtt-agents v1` | 2026-10-20 | Initial baseline: 6 rules, 4 stack packs, 3 skills |
