---
tipo: rule
origin: baseline
scope: all source files, configuration and scripts
enforcement: code review
---
# Comments

A comment explains what the code cannot: a reason, a constraint, a trade-off or a non-obvious business rule. It never translates the code into English.

## Language

- Code, identifiers, commit messages and comments are in English.
- User-facing strings are in Brazilian Portuguese at the edges: validation messages, API errors, e-mails and UI text.
- Do not mix the two inside the same comment or identifier.

## File header

Every source file starts with one line that states its purpose:

```ts
// Document repository: data access for case documents
```

```python
"""Document repository: data access for case documents."""
```

```dockerfile
# Build stage: compiles the backend
```

No copyright, license, author or date header. Git history holds provenance.

Generated files are never edited and do not need a header.

## Section headers

Use a section divider only when a file has distinct logical parts:

```ts
// --- Public API ---
```

```prisma
// --- Enums ---
```

```sql
-- --- Indexes ---
```

- Three dashes on each side.
- Title Case, two to four words, no trailing punctuation.
- One blank line before and after.
- Do not use `====` or decorative ASCII art.

## Inline comments

Write a comment when:

- the reason for a business rule is not obvious from the code;
- the code works around a framework or library limitation;
- a performance or security trade-off needs to be recorded;
- a complex algorithm needs a short statement of what it achieves.

Do not write a comment when:

- a clear name already explains the code;
- the comment restates the line below it;
- the comment exists to compensate for a confusing implementation. Rename or refactor instead.

```ts
// Good: explains why the rule exists
// Only an admin may change visibility, so the toggle is hidden elsewhere
if (caller.role === "ADMIN") {
  await documents.setVisibility(id, input.visibility);
}

// Bad: restates the code
// Increment the counter
counter++;
```

## Public API documentation

Document exported functions, classes, types and constants with the language's documentation syntax: JSDoc in TypeScript, docstrings in Python.

```ts
/**
 * Decides whether a caller may read a document, per the visibility matrix.
 *
 * @param document - Document being read, with owner and visibility
 * @param caller - Authenticated user, or null for a visitor
 * @returns True when the read is allowed
 */
export function canReadDocument(document: Document, caller: User | null): boolean {
  // ...
}
```

Rules:

- One-line summary, blank line, details only when needed.
- Document parameters, return value and known exceptions.
- Do not document private helpers with the public API format. Use inline comments.
- No `@author`, `@version` or `@since`. Git covers that.
- Keep the documentation next to the behavior it describes. Move or delete it when the behavior changes.

## Prohibited patterns

| Pattern | Alternative |
|---|---|
| `TODO`, `FIXME`, `NOTE`, `HACK` | Track it in the task or issue tracker |
| Commented-out code | Delete it. Git has history |
| `// =====` or decorative dividers | `// --- Name ---` |
| Multi-line `/* */` for an inline comment | `//` per line, or a doc comment when it documents an API |
| License, author or date header | One-line purpose comment |
| A comment that repeats the code | Remove it, or rename the code |

A `TODO` that must stay in the code needs a task reference and an owner. A generic `TODO` is not a plan.

## Review checklist

- [ ] The file has a one-line purpose header.
- [ ] Section headers use the `--- Name ---` format, when used.
- [ ] Inline comments explain why or what, never how.
- [ ] No prohibited tags or commented-out code.
- [ ] Public APIs are documented with parameters, return and exceptions.
- [ ] Private code uses inline comments, not public API docs.
- [ ] Comments are in English; user-facing strings are in Brazilian Portuguese.
- [ ] A comment that no longer matches the code was updated or removed.
