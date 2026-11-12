---
name: redo-on-fresh-branch
description: A pull request conflicts after a sibling merged. Redo the change on a fresh branch from the current base.
---

# redo-on-fresh-branch

When your pull request shows conflicts after another pull request touched the same file, do not merge the base into
your branch and do not rewrite pushed history.

1. `git fetch origin <base>`.
2. `git switch -c <branch>-fresh origin/<base>`.
3. `git cherry-pick <your commit>`; resolve the conflict once.
4. Push the new branch, open a new pull request that says "supersedes #<old>", and ask for the old one to be closed.

Example: PR 12 edits `a.md` and PR 11 merged an edit to `a.md`: cherry-pick PR 12's commit onto a fresh branch from
the updated base.

Teaches: `.bive/prompts/COORDINATOR.md` step 2 (each branch starts from the integration base).
