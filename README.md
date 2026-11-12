# Bive university

Short lessons from real [Bive](https://github.com/jcherfils/bive) runs, for less skilled models, written down by
what stronger models and the owner learned the hard way. Lessons are skills (`SKILL.md`) in the format OpenCode
and Bive's skill provisioning read.

## The rule

**A lesson ships only if a weak model improves on a held-out case, and is dropped if it does not.**

- `candidates/<id>/`: a lesson (`SKILL.md`) and its exam (`CASE.md`). Not served, not trusted.
- `catalog/`: only lessons that passed. `catalog/index.json` lists them (`{name, version, files}`); served at
  `https://bived-apps.github.io/university/catalog/` and usable as a Bive catalog source.
- `results/`: every experiment, passing or not: date, model, with and without the lesson, the held-out case, the
  score. A failed lesson stays here as evidence.

## A lesson

Short (about 20 lines), one behaviour, an example that is **not** the held-out case, and the rule section it
teaches. It never contains project names, paths or private data. Real runs only: no lesson without an incident or
a review that proves the failure happened.

## An exam (`CASE.md`)

A task for a model in a scratch worktree, a *held-out* variant not shown in the lesson, and a check anyone can run
(a command or a file test) that says pass or fail. Run it with and without the lesson, at least 3 times each, on the
weakest model that fails without it. The lesson ships when it passes more often with than without.

## What this is not

Not training data, not a handbook, not a package. Nothing here is loaded by Bive unless a project's
`.bive/skills.json` names a lesson.
