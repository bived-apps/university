# Roadmap

The plan, in enough detail that another agent can take any item. Kept strictly in sync with the code: every change
here is committed with the code it describes (an item started → `doing`, finished → `done in <commit>`).

## Principles

Lessons ship only on measured gain on a held-out case; failed lessons stay in `results/` as evidence. Not training data,
not a handbook, not a package (README › What this is not).

## Epics

### 1. Bive install (coordinator) — doing, S
- Bive v0.2.4 gate, guard and prompts on this repository; then `bived` and its ruleset (owner).
