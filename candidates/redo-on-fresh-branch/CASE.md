# Exam: redo-on-fresh-branch

**Task**: a repo has branch `base` and branch `feature` that conflict on line 3 of `data.txt`. Make `feature`'s change
land on top of `base` without merging `base` into `feature` and without force-pushing.
**Held-out twist**: `feature` has two commits; only the second should be kept.
**Pass**: a branch exists that contains `base`, has only the second commit's change on top, and has no merge commit.

Run at least 3 times with and at least 3 times without the lesson; record in `results/`.
