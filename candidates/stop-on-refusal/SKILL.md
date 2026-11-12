---
name: stop-on-refusal
description: When a tool call is refused, stop that part and report; do not rewrite the command.
---

# stop-on-refusal

A refusal by the guard or a check is a hard stop. Do not try the same thing another way, do not continue with
other commands, do not push.

1. Keep your uncommitted work as it is.
2. Report: the exact command, the refusal message, and the state of the worktree.
3. Wait for the coordinator's decision.

Example: a write outside the worktree is refused; do not write it with `cp` or `tee` instead.

Teaches: `.bive/prompts/DELEGATE.md` (hard stop on refusal).
