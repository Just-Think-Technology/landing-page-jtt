---
name: vertical-slice
description: Use when implementing a feature or fixing a bug test-first in one thin slice. Also use when the user mentions TDD, red-green-refactor, tracer bullet or vertical slice.
---
# Vertical slice

A vertical slice is one behavior, proven end to end, before the next behavior starts. It keeps the tests honest: each test responds to what the previous slice taught you.

## Before the first test

1. Read `AGENTS.md` for the commands and the stack pack for the project.
2. Read the spec or the task. If the behavior is ambiguous, stop and ask.
3. Write down the seams under test. A seam is the public boundary where the behavior is observed: an HTTP route, a service method, a component prop, a CLI command.
4. Confirm the seams with the task owner when the interface is not already defined. Do not write a test at an unconfirmed seam.
5. Identify the smallest behavior that is worth proving first. It should be a tracer bullet: a thin path through every layer the feature needs.

## The loop

### 1. Red

- Write one failing test for the chosen behavior.
- The test name states the behavior, not the implementation.
- Run only that test and show the failure. A test that passes before the code exists is not a red test.
- If the test cannot fail, the assertion is wrong or the seam is wrong. Fix the test before writing production code.

### 2. Green

- Write the smallest production change that makes the test pass.
- Do not add a second behavior, a speculative parameter or an abstraction for a future case.
- Run the test again. If it fails, fix the code, not the assertion.
- Keep the change reviewable. A slice is small enough to explain in one paragraph.

### 3. Next slice

- Choose the next behavior, usually the next branch, error or permission case.
- Repeat red and green.
- Do not write all tests first and then all code. That is horizontal slicing and it tests imagined behavior.

### 4. Refactor

- Refactor only after the slice is green.
- Refactoring belongs to the review step: remove duplication, improve names, move a rule to its home.
- The tests must stay green through the refactor. If a test breaks, behavior changed, not the shape.

## What a good test looks like

- It verifies behavior through a public interface.
- It survives a refactor that preserves behavior.
- It does not mock an internal collaborator or assert on a private method.
- Its expected value comes from the spec, a known-good literal or a worked example, not from recomputing the implementation.
- It is deterministic. No sleep, no order dependency, no shared mutable state.

## What to avoid

- **Horizontal slicing:** all tests first, then all code.
- **Implementation coupling:** mocking the repository when the query is the behavior; asserting on a private field.
- **Tautology:** computing the expected value the same way the code does.
- **Test-only production code:** a parameter or a hook that exists only to make a test pass.
- **Editing the test to make it pass:** if the expected behavior changed, change the spec and the test together, with justification.

## Verification

Before claiming the slice is done:

1. Run the new test and the affected suite.
2. Run lint and typecheck.
3. For a route or a journey, run the integration or e2e suite that covers it.
4. Check the diff: only the files the slice needs.
5. Prepare the evidence: test names and counts, or the red failure and the green result.

A green unit test is not evidence that the feature works end to end. Use the level that matches the risk.

## JTT specifics

- Work on a branch. Never commit directly to `main`.
- Do not commit, push or open a PR unless the user asks.
- Update the decision or the context when the slice changes a non-obvious choice.
- No secrets, no real personal data and no real client document in a fixture.
- If the environment cannot run the test (missing service, broken database), stop and report the blocker. Do not weaken the test to make it run.
