---
tipo: rule
origin: stack
stack: nextjs
scope: Next.js App Router code, its tests and its build
enforcement: code review and CI
---
# Stack: Next.js

Use this pack with the baseline rules. It adds what is specific to the App Router, React and Tailwind.

## Rendering model

- **Server Components are the default.** Add `"use client"` only to the smallest component that needs state, an effect, an event handler or a browser API.
- Do not mark a page as a client component to make one button work. Extract the button into its own client component.
- Fetch data on the server when the data is needed to render the page. Do not repeat the same fetch in the client.
- Be explicit about caching and revalidation. A page that shows fresh data must say how it becomes fresh.
- Do not use `useEffect` to fetch data that could have been fetched during render on the server.

## Data and the backend

- The browser never talks to the database or to object storage.
- If the repository has a separate backend, the browser talks to it through the project's single gateway or BFF. Do not create a second path.
- Server Components use the server-side gateway. Browser-initiated mutations go through the same-origin route, never directly to an internal service.
- The backend is the source of truth for role, ownership, status and visibility. The UI may hide an action, but the server enforces it.
- Do not expose an internal URL, a service token or a database credential to the client.

## Environment and secrets

- Only `NEXT_PUBLIC_*` values reach the browser. Treat every one of them as public.
- Secrets stay on the server. Do not import a server-only module into a client component.
- Validate the environment at build or boot. A missing required variable fails loudly.
- Never commit `.env`. Keep `.env.example` with placeholders.

## Routes and layout

- Routes live under `app/`, following the product's public paths.
- Use `layout.tsx` for shared chrome and `loading.tsx` / `error.tsx` where they apply. Do not fake a loading state with an empty shell.
- Every list has four states: loading, empty, error and success. A spinner is not an empty state.
- A protected page checks the session on the server and redirects to login. Do not render a broken page and hide it with CSS.
- A destructive action asks for confirmation and says it cannot be undone.

## Components

- Function components and hooks. No class components.
- Keep state as local as possible. Lift it only when a sibling needs it.
- Derive values during render instead of storing a second copy in state.
- Use `useEffect` only to synchronize with an external system, not to compute derived data.
- Stable, semantic keys in a list. Do not use the array index when the list can reorder.
- Props are typed. Do not use `any` to silence a mismatch.

## UI and accessibility

- Semantic HTML first: `button`, `a`, `form`, `label`, `table`. A clickable `div` is a bug.
- Every input has a label. Every icon-only button has an accessible name.
- Keyboard navigation works, and focus is visible.
- Colour is not the only carrier of status. Pair it with text.
- Images use `next/image` or an equivalent with explicit dimensions and alt text.
- User-facing copy is in Brazilian Portuguese, actionable and specific.
- Follow the project's design tokens or Tailwind conventions. Do not introduce a second styling system.

## Security headers and CSP

- Configure headers once, in `next.config` or the project's single middleware. Do not define a policy per page.
- A new third-party script, font or analytics provider requires an update to the CSP and a recorded reason.
- `unsafe-inline` or `unsafe-eval` is an exception with a written reason. Never add it for convenience.
- Do not render user content as HTML without sanitization. Prefer text.

## Performance

- Do not ship a large client bundle for a server-rendered page. Check what crosses the `"use client"` boundary.
- Use dynamic import for a heavy component that is not needed on first paint.
- Optimize the image that the page actually shows. Do not preload every asset.
- Measure before optimizing. Record the reason for a non-obvious optimization.

## Testing

- Unit and component tests with Vitest and Testing Library, through user-level queries: role, label, text.
- Do not assert on internal state or implementation details.
- End-to-end tests with Playwright for the critical journeys, against a real backend or a contract stub that preserves the behavior.
- Test the four states of a list and the permission differences between profiles.
- Run `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build` before the PR.

## Review checklist

- [ ] Server Components are the default; `"use client"` is minimal and justified.
- [ ] No secret or internal URL reaches the client.
- [ ] Data is fetched once, on the server, unless the interaction requires the client.
- [ ] Loading, empty, error and success states exist.
- [ ] Protected pages check the session on the server.
- [ ] Semantic HTML, labels and keyboard access.
- [ ] Headers and CSP are centralized.
- [ ] The client bundle does not include server-only code.
- [ ] Lint, typecheck, tests and build pass.
