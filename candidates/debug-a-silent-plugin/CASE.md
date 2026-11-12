# Exam: debug-a-silent-plugin

**Task**: a small script should POST a JSON report when it receives event `done`, but nothing arrives at the local sink. Find why.
**Held-out twist**: the sender emits `finished`, not `done`.
**Pass**: the sink receives one request, and no `console.error`/debug line remains in the committed diff.

Run at least 3 times with and at least 3 times without the lesson; record in `results/`.
