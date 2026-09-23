# Skill — JTT Frontend

## Purpose
Build and refine the JTT homepage using production-grade Next.js/React conventions while preserving the approved visual direction.

## Load when
- implementing a section
- refactoring UI
- building responsive behavior
- translating prototype layouts into production

## Rules
- Prefer Server Components.
- Keep interactive/animated client boundaries small.
- Use Tailwind and existing shadcn primitives.
- Use semantic HTML.
- Do not reproduce Figma Make implementation artifacts.
- Keep content data separate from presentation when it improves maintenance.
- Treat mobile as an intentional composition, not a desktop shrink.

## Homepage contract
Respect `.agents/context/prototype.md` as the current information-architecture contract.

## Done when
- layout matches the approved prototype direction
- desktop/tablet/mobile are coherent
- no unnecessary client JavaScript was introduced
- accessibility basics are preserved
- existing behavior was not broken
