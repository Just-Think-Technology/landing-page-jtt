---
tipo: rule
origin: baseline
scope: all source code, scripts and configuration in the repository
enforcement: code review
---
# Clean Code

Code is read far more often than it is written. Optimize for the next person who has to change it, not for the shortest diff.

## Principles

- **Clarity first.** A reader should understand the intent without reconstructing it from the implementation.
- **Simplicity.** Prefer the simplest solution that satisfies the requirement today.
- **One responsibility.** Each function, module and file has one reason to change.
- **Consistency.** Follow the conventions already in the repository before inventing a new one.
- **Testability.** Business rules must be testable without HTTP, a browser or a real database.
- **Scope discipline.** Touch only what the task needs. Unrelated improvements are suggestions, not code.
- **YAGNI and KISS.** Do not build for hypothetical futures. Do not add indirection without a concrete need.

## Naming

Names describe the domain concept or the behavior, not the type or the shape.

- Variables: meaningful nouns. `judicialCase`, `activeUsers`, `documentSizeBytes`, not `data`, `result`, `temp`.
- Functions: verbs or verb phrases. `publishDocument`, `findVerifiedCreditor`, not `handle`, `process`, `execute`.
- Booleans: a condition. `isActive`, `hasPermission`, `canCancel`, not `active`, `permission`, `status`.
- Classes and types: a responsibility or a domain concept. `DocumentsService`, `DocumentRepository`, `CreateDocumentDto`, not `Helper`, `Manager`, `Utils`.
- Use the domain vocabulary already in the repository. Do not create a second name for the same concept.
- Avoid abbreviations unless they are established in the domain. Do not encode the type in the name.

## Functions and methods

- One clear responsibility. If a function validates input, queries the database, applies a business rule and formats a response, split it.
- Keep the normal path obvious. Extract a function when the extraction gives a name to a meaningful step, not merely to reduce line count.
- Prefer a parameter object when several related values travel together.
- Avoid flags that switch behavior inside a function. Split into two functions with honest names.
- Keep side effects explicit. A function that writes, sends, publishes or deletes must say so in its name.
- Do not return `null` and an error at the same time. Pick one contract.

## Control flow

- Use guard clauses to keep the happy path at the left margin.
- Avoid deep nesting. If a block needs three levels of `if`, extract a function or simplify the condition.
- Do not hide a business rule in a clever one-liner. Give the condition a name.
- Prefer positive conditions. `if (!isEligible)` is fine when the negation is the rule; avoid double negations.
- Return early instead of assigning a result and falling through.

```ts
const canSendDocument =
  user.isActive &&
  !user.isBlocked &&
  user.role === "CREDITOR" &&
  judicialCase.isOpen;

if (!canSendDocument) {
  return;
}
```

## Errors

- Errors are explicit and meaningful. Prefer a domain error over a generic `Error("something went wrong")`.
- Never swallow an exception. If it is intentionally ignored, say why in one line and log the minimum needed.
- Handle an error at the layer that can do something about it.
- Do not expose internal details, stack traces or database errors to the user.
- User-facing messages are in Brazilian Portuguese, actionable and specific. Logs and identifiers stay in English.
- Distinguish expected failures from defects. A duplicate upload is a user error, not a `500`.

## Duplication

- Extract shared code when the behavior is genuinely the same and the abstraction has a clear name.
- Do not abstract code that only looks similar. Wait for the second real use.
- **Second-use rule:** code needed by a second place is extracted by the change that creates the second use. Never keep a third copy.
- Do not copy an implementation and tweak it. Decide whether the behavior belongs to the feature, a shared module or the framework.

## Abstraction

Abstraction must solve a real problem: reuse, isolation, testability, replaceability or separation of responsibility.

Avoid:

- an interface with one implementation and no boundary to protect;
- a factory that creates one thing;
- a utility layer that only forwards calls;
- a pattern introduced because it exists in a book;
- a generic solution for a problem that has one case.

A small feature does not need an elaborate architecture. Add a layer when it earns its cost.

## Data and domain modeling

- Prefer domain types over primitives when the type prevents a mistake: `DocumentId`, `Email`, money in cents, sizes in bytes.
- Store integers for counts and byte sizes. Do not store formatted values.
- Use the same vocabulary in the database, the API and the UI. Translate only at the edges.
- Keep dates and time zones explicit. Store instants as `timestamptz`; display in the user's time zone.
- Validate at the boundary and trust the validated type inside.

## Side effects and state

- Separate calculation from mutation when the distinction matters.
- Prefer immutable operations when they make the change easier to follow.
- Local, intentional mutation is acceptable when it is simpler and contained.
- Do not hide a network call, a write or an external publish inside a function that looks pure.

## Dead code

Remove:

- unused imports, variables and parameters;
- unreachable branches;
- commented-out code;
- duplicate implementations;
- deprecated code that is no longer referenced.

Git history is the archive. Do not keep code "just in case".

## Configuration and secrets

- Environment-specific values belong in configuration, not in source.
- Secrets never enter the repository, a log, a test fixture or `.agents/`.
- A missing required secret must fail loudly at boot, not silently become an empty string.
- Do not duplicate configuration logic across services. One shared loader per concern.

## Refactoring

Refactor when it improves the code directly related to the task:

- remove duplication;
- clarify a responsibility;
- improve a name;
- reduce complexity;
- correct an architectural violation;
- make a test possible.

Do not perform a broad refactor during a feature. Record it as a separate task.

## Files and modules

- Each file has one purpose. Feature folders group controller, service, repository and types for the same domain.
- Do not let a file become a collection of unrelated utilities.
- A module exposes a public surface and keeps the rest private.
- No module writes into another module's tables. Cross-module reads go through the owner's public surface.

## Review checklist

- [ ] Names describe the concept or the action.
- [ ] Functions have one focused responsibility.
- [ ] Business rules live in the layer that owns them.
- [ ] Control flow is simple and the happy path is obvious.
- [ ] Errors are explicit and do not leak internals.
- [ ] No meaningful logic is duplicated.
- [ ] No premature abstraction was introduced.
- [ ] Side effects are visible in the name and the contract.
- [ ] No magic value hides a business rule.
- [ ] Dead code and commented-out code are gone.
- [ ] Configuration and secrets are handled correctly.
- [ ] The change stays inside the task scope.
