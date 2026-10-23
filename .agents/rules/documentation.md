---
tipo: rule
origin: baseline
scope: every document in the repository, including README and .agents
enforcement: code review
---
# Documentation

Documentation is part of the change. A behavior that exists only in code and in someone's memory is not documented.

## What lives where

| Place | Holds | Loaded |
|---|---|---|
| `README.md` | What the product is, for whom, and the product link. Built from `001-company/standards/readme.md` | Always, by a human |
| `AGENTS.md` | The repository map: stack, commands, layout, task flow, pointers | Always, by the agent |
| `.agents/rules/` | Constraints the agent must obey | Baseline always; project rules on demand |
| `.agents/decisions/` | Choices that cannot be inferred from the code | On demand |
| `.agents/context/` | Facts the agent cannot derive: brand, approved copy, information architecture | On demand |
| `.agents/workflows/` | Procedures longer than a rule | On demand |
| `.agents/checklists/` | Definition of done per delivery type | On demand |
| `docs/` | Product contract, runbook, operational detail and working docs | On demand |

## README

- Follow the repository type in `readme.md`: own product, client product, site, internal or open source.
- The README sells what exists. It does not invent metrics, clients or promises.
- Setup and operational detail belong in `docs/`, except in an open-source repository, where install and usage are mandatory.
- One screenshot or demo GIF, stored in `docs/assets/` and referenced by a relative path.
- The README never links the private vault.

## AGENTS.md

- Maximum 150 lines. It is a map, not a manual.
- It lists the stack, the commands with their directories, the layout and the task flow.
- It points to the rules and decisions. It does not repeat them.
- When the stack, a command or the layout changes, `AGENTS.md` changes in the same PR.
- If a section cannot be filled, leave `TO FILL IN` and ask. Do not invent.

## Decisions

- A non-obvious choice gets a record in `.agents/decisions/DEC-XXX-slug.md`.
- The record says the context, the decision, the consequences and the alternatives.
- A decision is superseded, not deleted. The new record links the old one.
- A repository decision is technical. A business decision belongs in the vault.

## Context

`context/` holds facts, not rules:

- brand and visual identity;
- approved copy and tone;
- information architecture and navigation;
- domain vocabulary that the code and the UI share;
- external constraints, such as a court's terminology.

A fact that changes often belongs in `docs/`, not in a decision. A rule that must be obeyed belongs in `rules/`.

## Language and style

- Code, identifiers, comments, rules and `AGENTS.md` are in English.
- User-facing documentation (README, product copy, e-mails, UI text) is in Brazilian Portuguese, unless the repository is open source.
- One topic per file. Short notes beat a long manual.
- Dates use `YYYY-MM-DD`. User-facing dates use `dd/mm/YYYY`.
- No emojis, decorative icons or badges, unless the repository type explicitly allows them. It does not by default.
- No em dash as punctuation. Use a colon, a comma or parentheses.

## Links and references

- Use relative links inside the repository. A link that only works on one machine is broken.
- Link the decision from the rule or the code that depends on it.
- When a file moves, update every link in the same change.
- Do not copy a document into two places. Link to the single home.

## When to update

Update documentation in the same change when:

- a command, a stack version or the layout changes;
- a public behavior, contract or permission changes;
- a new decision is made or an old one is superseded;
- a new workflow, checklist or skill is added;
- a README claim stops being true.

A change that alters behavior without updating the affected document is incomplete.

## Never

- Never put a secret, a token or real personal data in a document, an example or a screenshot.
- Never document a command that does not exist.
- Never keep a stale section "for history". Git has history.
- Never duplicate a rule in `README.md`, `AGENTS.md` and a decision. Pick one home and link it.

## Review checklist

- [ ] The README still matches the product and the standard.
- [ ] `AGENTS.md` is under 150 lines and points to the rules.
- [ ] The affected rule, decision or context was updated.
- [ ] Links resolve and no file was moved without updating its references.
- [ ] No secret or real personal data.
- [ ] Language follows the repository type.
