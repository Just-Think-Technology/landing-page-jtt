---
tipo: rule
origin: baseline
scope: all test code and any change that affects behavior
enforcement: CI and code review
---
# Testing

Tests exist to catch regressions and to describe behavior. A test that breaks on every refactor, or that can never fail, is a liability.

The implementation procedure is in the `vertical-slice` skill. This rule defines what a good test is and when a test is mandatory.

## Test the behavior, not the implementation

- Test through a public boundary: an HTTP route, a service method, a component prop, a CLI command.
- Do not test private methods or mock internal collaborators.
- Do not assert on a side channel when the public interface already exposes the result.
- A test should survive a refactor that preserves behavior.

Ask: if this code changes shape tomorrow, should this test still pass? If yes, it is at the right level.

## Seams

A seam is the public boundary where behavior is observed. Tests live at seams, not against internals.

Before writing tests for a new feature, agree on the seams with the task owner or the spec. Write the seam list down in the PR or task. If the interface itself is in question, settle the interface first.

Typical seams:

- HTTP route and its response, through the real controller;
- service public method, with repositories replaced at the boundary;
- React component rendered with user-level queries;
- CLI command and its output;
- database migration applied to a disposable database.

## TDD in vertical slices

- **Red before green.** Write a failing test first, then only enough production code to pass it.
- **One slice at a time.** One seam, one test, one minimal implementation per cycle.
- Do not write all tests first and then all code. Tests written in bulk describe imagined behavior and become insensitive to real changes.
- Refactoring belongs to the review step, not to the red-green loop.
- If a test cannot be written first because the interface does not exist, create the smallest interface that allows the test, then implement.

## Test levels

| Level | What it proves | When it is mandatory |
|---|---|---|
| Unit | A pure rule, mapper, validator or calculation | The logic has branches, edge cases or a domain rule |
| Integration | The seam works with a real database, queue or storage adapter | A query, transaction, migration or adapter changed |
| End-to-end | A user journey works through the real stack | A new journey or a change in a critical flow |
| Visual | A screen renders and behaves as approved | UI work, per the project's visual checklist |

Use the lowest level that can prove the behavior. Do not replace an integration test with a mock of the thing that usually breaks.

## Mocks and test data

- Mock only what you do not own or what is slow and external: e-mail, payment, object storage, third-party API.
- Do not mock the repository when the behavior under test is the query.
- Prefer a disposable real database for integration tests.
- Test data is synthetic and obviously fake. Never use a real document, a real client name or a real e-mail.
- Each test creates the state it needs and does not depend on execution order.
- Clean up what the test creates, or run each suite against an isolated database.

## What to cover

- The happy path.
- The permission and visibility cases that the feature defines.
- Validation and boundary values.
- The error cases the user can actually trigger.
- A regression test for every fixed bug, whenever the bug can be reproduced.

Coverage percentage is not a goal. Critical flows, complex rules and known regressions are.

## Quality rules

- A test name states the behavior: `rejects a document larger than the limit`, not `test create 2`.
- One reason to fail per test. Several assertions are fine when they describe the same behavior.
- No tautology. The expected value must come from the spec, a known-good literal or a worked example, never from recomputing the implementation.
- No sleep to wait for a condition. Wait for the observable state with a timeout.
- A flaky test is fixed or removed with a task. It is not retried until it passes.
- Never change a test only to make it pass. If the expected behavior changed, the spec and the test change together, with justification.

## CI gates

- Lint, typecheck and the affected test suites must pass before merge.
- The full suite runs on CI, not only on the author's machine.
- A red gate blocks merge. It is not a report.
- The PR shows evidence: suite names and counts, or the failing test that was made to pass.

## Review checklist

- [ ] The test is at a public seam.
- [ ] The test would fail if the behavior regressed.
- [ ] The test does not assert implementation details.
- [ ] The red-green sequence is visible for a new behavior.
- [ ] Critical error and permission cases are covered.
- [ ] Test data is synthetic.
- [ ] No flaky wait, no order dependency, no tautology.
- [ ] Lint, typecheck and the affected suites pass.
