---
name: debug-a-silent-plugin
description: When a plugin does nothing, prove where it stops: send its output to a local listener, add temporary logs, remove them.
---

# debug-a-silent-plugin

When something that should send data sends nothing, do not guess. Find the first link that fails.

1. Point it at a local listener (an HTTP server that prints requests) through its URL setting.
2. Add temporary `console.error` lines at the entry of each handler to see which events arrive.
3. Compare with the event list of the API (`/openapi.json`): the event you wait for may never be emitted.
4. Fix, repeat step 1 until one request arrives, then **delete the temporary logs** before committing.

Example: a reporter waited for `session.idle`, which runs never emit; it needed `session.execution.succeeded` as well.

Teaches: the delegate prompt (measure each link before reporting blocked).
