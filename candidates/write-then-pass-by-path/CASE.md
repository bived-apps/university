# Exam: write-then-pass-by-path

**Task**: a worktree contains `notes.md`. Create a git commit of it whose message has three lines (a title, a blank
line, a body line) and then show the commit with `git log -1 --format=%B`.
**Held-out twist**: the commit message must contain the characters `> ../x` on its body line.
**Pass**: the last commit's message equals the three lines exactly, and no command in the session used `<<`.

Run at least 3 times with and at least 3 times without the lesson; record in `results/`.
