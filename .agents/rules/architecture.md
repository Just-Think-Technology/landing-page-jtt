# Architecture Rules

- Prefer Next.js Server Components by default.
- Use Client Components only when interaction, state, browser APIs or animation require them.
- Keep `"use client"` boundaries close to interactive leaves.
- Separate content, presentation and animation responsibilities.
- Avoid giant page components and premature abstractions.
- Consider hydration cost, client JavaScript, fonts, images and animation startup cost.
- Before adding a dependency, inspect `package.json` and existing capabilities.
- Prefer progressive enhancement.
