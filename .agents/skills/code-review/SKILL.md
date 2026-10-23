---
name: code-review
description: Review a change since a fixed point (commit, branch, tag or merge-base) on two axes, standards and spec. Use when the user asks to review a branch, a PR, work in progress, or "review since X".
---
# Code review

Review the diff twice, on two independent axes:

- **Standards:** does the change follow this repository's documented rules?
- **Spec:** does the change implement what the task or spec asked for?

Run the two axes in parallel sub-agents so neither contaminates the other. Then report them side by side.

## 1. Pin the fixed point

- Use the commit, branch, tag or merge-base the user named.
- If none was named, ask.
- Capture the diff once: `git diff <fixed-point>...HEAD` (three dots, so the comparison is against the merge-base).
- Capture the commit list: `git log <fixed-point>..HEAD --oneline`.
- Confirm the ref resolves and the diff is not empty before spawning anything.

## 2. Find the spec

Look for the originating requirement, in this order:

1. The task or issue linked in the commit or PR.
2. A path the user passed.
3. A spec under `docs/`, `specs/` or the functional contract referenced by `AGENTS.md`.
4. Ask the user. If there is no spec, the spec axis reports "no spec available" and is skipped.

## 3. Collect the standards

Read, in this order:

1. `AGENTS.md`.
2. The 6 baseline rules in `.agents/rules/`.
3. The active stack packs listed in `opencode.json`.
4. Project rules referenced by `AGENTS.md`.
5. Decisions under `.agents/decisions/` that the change touches.

A documented repository rule always wins over a generic preference. Skip anything a formatter, linter or type checker already enforces.

## 4. Spawn both sub-agents in parallel

Use the task tool with two `general` sub-agents, one per axis. Give each the diff command, the commit list and the sources it needs. Each returns under 400 words.

### Standards sub-agent

Brief:

> Review the diff at `<command>` against these standards: `<paths>`. Report, per file or hunk: (a) every place the diff violates a documented rule, citing the file and the rule; (b) any judgement-call smell you spot, naming it and quoting the hunk. Distinguish hard violations from judgement calls. A documented rule overrides a generic smell. Do not report style that tooling enforces. Under 400 words.

Judgement calls to look for, beyond the documented rules:

- duplicated code that should be one home;
- a function that reaches into another object's data more than its own;
- a primitive standing in for a domain concept;
- abstraction, a parameter or a hook added for a need the spec does not have;
- one logical change scattered across many files;
- a long navigation chain the caller should not depend on;
- a wrapper that only delegates.

### Spec sub-agent

Brief:

> Review the diff at `<command>` against this spec: `<path or text>`. Report: (a) requirements that are missing or partial; (b) behavior in the diff that was not asked for; (c) requirements that look implemented but where the implementation looks wrong. Quote the spec line for each finding. Under 400 words.

## 5. Aggregate

Present the two reports under `## Standards` and `## Spec`, as returned or lightly cleaned. Do not merge or rerank them. A change can pass one axis and fail the other, and that distinction is the point of the review.

End with one line per axis: the number of findings and the worst one within that axis. Do not pick a single winner across axes.

## 6. Check the claims

- If the PR claims tests, lint or typecheck passed, verify the command exists and, when the environment allows, run it.
- Do not accept "done" without evidence. A green claim without output is not evidence.
- Do not run a destructive command to reproduce a review finding.

## Output shape

```text
## Standards
<findings>

## Spec
<findings>

Summary: standards <n> findings, worst: <...>. spec <n> findings, worst: <...>.
```

## Rules for the reviewer

- Cite the rule or the spec line. "I would do it differently" is not a finding.
- Separate a hard violation from a preference.
- Do not report a finding that the diff did not introduce.
- Do not edit the code during the review unless the user asks for the fix.
- Do not approve a change you do not understand. Ask.
