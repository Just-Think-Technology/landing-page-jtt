# Skill — JTT Architecture

## Purpose
Keep the JTT website fast, maintainable and predictable while supporting a highly animated homepage.

## Load when
- creating routes/components
- deciding Server vs Client Components
- introducing animation infrastructure
- reorganizing the homepage

## Rules
- Next.js App Router conventions first.
- Server Components by default.
- Client Components only where required.
- Keep animation infrastructure isolated from content.
- Avoid global state unless justified.
- Avoid premature abstractions.
- Prefer composition over giant configurable components.
- Keep heavy/optional browser code out of the critical path where practical.
- Preserve clean ownership of navigation, sections and reusable primitives.

## Performance questions
Before adding client code ask:
- Can this be rendered on the server?
- Can CSS solve this?
- Does this need runtime state?
- Does this animation need GSAP?
- Does this asset belong above the fold?
- Can loading be deferred?
