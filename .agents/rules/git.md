---
tipo: rule
origin: baseline
scope: every change committed to the repository
enforcement: code review and CI
---
# Git

Git history is part of the documentation. A commit should explain a change to someone who was not there.

## Branches

- Never work directly on `main`. Every change goes through a branch and a pull request.
- One task, one branch. Do not mix unrelated changes.
- Branch names use a type and a short slug: `feat/document-visibility`, `fix/upload-size`, `docs/agent-system`, `test/login-throttle`, `chore/bump-node`.
- Branch from the current default branch unless the task explicitly depends on another branch.
- Do not force-push a shared branch. Rewriting your own unpublished branch is fine.

## Commits

- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`, `build:`, `ci:`, `perf:`.
- The subject is in English, imperative, lower case after the type and without a final period: `feat: add document visibility matrix`.
- The body explains what changed and why, when the subject is not enough. Wrap it at a readable width.
- One logical change per commit. A commit that fixes a bug and renames a module is two commits.
- Do not commit generated artifacts, build output, local `.env`, secrets, editor files or real client documents.
- Do not commit a failing test alone, except when the workflow explicitly asks for a red commit as evidence. In that case, the next commit is the minimal green.
- Review `git status` and `git diff` before committing. Stage only the files the task touched.
- Never rewrite a commit that is already on the remote default branch.

## Pull requests

- The PR title follows the same type convention as the commit.
- The body says what changed, how to validate and which checks ran.
- Link the task or issue. If there is a spec, link it.
- Keep the PR focused. A large PR is split by behavior, not by file type.
- A PR is not done while lint, typecheck or the affected suites are red.
- A PR that changes a public contract, authorization or a destructive migration is announced before merge.
- Review the diff as a reviewer would: no drive-by edits, no debug code, no commented-out code, no unrelated formatting.

## Review

- Review behavior and tests first, style second.
- A review comment names the rule or the risk, not only the preference.
- Do not approve a change you do not understand. Ask.
- A resolved comment is resolved because the code changed or because the reviewer agreed, not because the thread was closed.
- The author merges after approval, unless the repository policy says otherwise.

## Merge and release

- Follow the repository's merge policy. Do not change it inside a feature PR.
- Do not merge with a failing required check.
- A release is a tag or a published artifact, not a branch name that moves.
- Production deploys use an immutable reference: a tag, a digest or a signed artifact.
- Record what is running when the deploy is not obvious from the pipeline.

## Agent behavior

- Never commit, amend, push or open a PR unless the user explicitly asks.
- When asked to commit, inspect `git status` and `git diff` first, stage only the intended files and use a message that matches the repository style.
- Never commit secrets, credentials or personal data, even if they are already tracked. Stop and report.
- If a hook rejects a commit, fix the cause and create a new commit. Do not bypass the hook with `--no-verify` unless the user explicitly asks.

## Review checklist

- [ ] The change is on a branch, not on `main`.
- [ ] Commits are conventional, focused and in English.
- [ ] No secret, `.env`, generated artifact or real personal data.
- [ ] The PR explains what changed, how to validate and what ran.
- [ ] Lint, typecheck and the affected suites are green.
- [ ] No force-push on a shared branch and no rewrite of published history.
