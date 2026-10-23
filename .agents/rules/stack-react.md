---
tipo: rule
origin: stack
stack: react
scope: React single-page apps built with Vite, their tests and their build
enforcement: code review and CI
---
# Stack: React with Vite

Use this pack with the baseline rules. It is for a Vite single-page app. A Next.js app uses `stack-nextjs.md` instead.

## Components

- Function components and hooks. No class components.
- One component per file when the component has behavior or styles of its own. Small presentational helpers may share a file.
- Props are typed. Do not use `any` to silence a mismatch.
- Keep components focused. A component that fetches, transforms, renders a form and handles permissions is several components.
- Prefer composition over a growing list of boolean props.

## State

- Keep state as local as possible. Lift it only when a sibling or a parent needs it.
- Derive values during render. Do not store a second copy of something that can be computed.
- Use context for cross-cutting values that many components need: session, theme, locale. Do not use context as a global store for one screen.
- Do not add a state library before the problem requires one. A recorded decision justifies it.
- Keep the URL as the source of truth for filters, pagination and tabs that should survive a reload.

## Effects

- Use `useEffect` only to synchronize with an external system: a subscription, the document title, a browser API.
- Do not use an effect to compute derived state or to react to a prop change that can be handled during render.
- Every effect has a cleanup when it subscribes to something.
- Do not hide a race condition behind a timeout. Cancel the request or ignore the stale result explicitly.
- Data fetching belongs at the route or page boundary, not scattered in leaf components.

## Data and the backend

- The browser never talks to the database or to object storage.
- All requests go through the project's single API client. Do not call `fetch` with a hand-built URL in a component.
- The server is the source of truth for role, ownership and permissions. Hiding a button is usability, not authorization.
- Handle the four states of a request: loading, empty, error and success.
- Never store a token in `localStorage`. Prefer an `httpOnly` cookie set by the server.
- Only `VITE_*` values reach the browser. Treat every one of them as public. Secrets stay on the server.

## Routing

- Routes are declared in one place. A protected route checks the session and redirects to login.
- A deep link works after a reload. Do not rely on in-memory state to render a route.
- A not-found route exists.
- A route change does not lose an unsaved form without warning.

## UI and accessibility

- Semantic HTML first: `button`, `a`, `form`, `label`, `table`. A clickable `div` is a bug.
- Every input has a label. Every icon-only button has an accessible name.
- Keyboard navigation works, and focus is visible.
- Colour is not the only carrier of status. Pair it with text.
- Images have alt text and explicit dimensions.
- User-facing copy is in Brazilian Portuguese, actionable and specific.
- Follow the project's tokens or Tailwind conventions. Do not introduce a second styling system.

## Performance

- Do not ship a large bundle for a route that does not need it. Split by route.
- Use `loading="lazy"` for images below the fold.
- Measure before optimizing. Record the reason for a non-obvious optimization.
- Do not add a dependency for a small utility that the project can own in a few lines.

## Testing

- Vitest with Testing Library, through user-level queries: role, label, text.
- Do not assert on component internals, state or class names.
- Test the behavior the user sees: a validation message, a disabled action, a successful submit.
- Mock the network at the boundary, not the component's own functions.
- Test the four request states and the permission differences between profiles.
- Run `pnpm lint` (or the project's lint), `pnpm typecheck`, `pnpm test` and `pnpm build` before the PR.

## Review checklist

- [ ] Components are function components with typed props.
- [ ] State is local unless sharing is real.
- [ ] No effect computes derived state.
- [ ] Requests go through the single API client.
- [ ] Loading, empty, error and success states exist.
- [ ] No token in `localStorage` and no secret in the bundle.
- [ ] Semantic HTML, labels and keyboard access.
- [ ] Tests use user-level queries and cover the permission cases.
- [ ] Lint, typecheck, tests and build pass.
