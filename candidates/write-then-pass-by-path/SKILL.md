---
name: write-then-pass-by-path
description: A shell command with a heredoc is refused by the guard. Write the text with the write tool, then pass the path.
---

# write-then-pass-by-path

When you need to give a command a long text (a pull request body, a commit message, a report), do not put it in the
command with `cat <<EOF`. The guard cannot analyse heredocs and refuses them ("Portable shell scanner cannot analyze
command: heredoc").

1. Write the text to a file inside your worktree with your write tool.
2. Pass the file's path: `gh pr create --body-file <path>`, `git commit -F <path>`.

Example: for a commit message, write `msg.txt` with the write tool, then run `git commit -F msg.txt`. Never retry
the refused command in another shape; use the two steps above.

Teaches: `docs/COORDINATING.md` (pull request from a report file).
