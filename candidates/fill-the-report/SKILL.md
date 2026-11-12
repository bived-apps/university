---
name: fill-the-report
description: A delegate report has fixed sections, starts with Closes #N, has no template comments, and never quotes its own head SHA.
---

# fill-the-report

Your final message (or your last commit's body) is the report the coordinator turns into the pull request body.

1. First line: `Closes #N` (or `Part of #N`).
2. Sections, all filled: **State**, **Changed**, **Checks**, **Left**, **Log**.
3. No `<!--` left anywhere.
4. Checks: the exact commands and their results (counts).
5. Log: the date and your model. Never your own head SHA: it cannot be known inside your own commit.

Example Checks line: `node --test tests/a.test.ts -> 4 pass, 0 fail`.

Teaches: `.bive/templates/report.md`.
