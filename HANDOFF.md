# Handoff

What anyone picking up the work needs to know. Kept current by the coordinator, once per batch (see AGENTS.md).

## Goal

Short lessons (skills) from real Bive runs, for less skilled models. A lesson ships to `catalog/` only if a weak model
improves on a held-out case (README › The rule).

## Running it

Tests: `node --test tests/*.test.mjs`, then `node .github/scripts/check-catalog.mjs` (Node 22). The catalog is served
by GitHub Pages at `https://bived-apps.github.io/university/catalog/`.

## Decisions

- **Who writes, who decides (owner, 2026-11-16)**: this repository is the only source of lessons; agents write lessons
  and run exams, one pull request per lesson; only the owner merges.
- **How a lesson reaches a project (owner, 2026-11-16)**: copied into the project's `.opencode/skills/`, not loaded live.
- **Bive install (owner, 2026-11-16)**: Bive v0.2.4 installed from branch `install/bive`; coordinator merges off.

## Tasks

GitHub issues are the source of truth.

## Watch out

- `catalog-check.yml` and `check-catalog.mjs` are the university's own required check: keep them unchanged unless the
  owner asks.
- `.bive/registry-id` is the university's own id, never Bive's.
- Skill `bive-pick-model` step 1 runs `node lib/models-check-cli.ts`, which lives in Bive, not here: pick the model by
  reading `.bive/models.json` by hand.

## Session log

- 2026-11-16: Bive v0.2.4 installed (gate, guard, prompts, templates, rule docs).
