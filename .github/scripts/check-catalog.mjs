// The university's rule as a check: a lesson is in catalog/ only if results/ holds an experiment that shipped it.
// Reads the tree only (no network, no git). Usage: node .github/scripts/check-catalog.mjs [root]
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"

/** Fields of a results file (`- key: value` lines). */
export function parseResult(text) {
  const fields = {}
  for (const line of text.split("\n")) {
    const m = /^- ([a-z_]+): (.*)$/.exec(line.trim())
    if (m) fields[m[1]] = m[2].trim()
  }
  return fields
}

/** True when a results file shows the lesson shipped: verdict ships, positive gain recomputed from the counts. */
export function shipped(fields, id) {
  if (fields.lesson !== id || fields.verdict !== "ships") return false
  const n = (k) => Number.parseInt(fields[k], 10)
  const [rw, pw, ro, po] = [n("runs_with"), n("passes_with"), n("runs_without"), n("passes_without")]
  if (![rw, pw, ro, po].every(Number.isInteger) || rw < 3 || ro < 3 || pw > rw || po > ro) return false
  return pw / rw - po / ro > 0
}

/** Every problem found under root, as sentences; empty when the catalog follows the rule. */
export function check(root) {
  const problems = []
  const catalog = join(root, "catalog")
  const lessons = existsSync(catalog)
    ? readdirSync(catalog).filter((d) => statSync(join(catalog, d)).isDirectory()).sort()
    : []
  let index
  try {
    index = JSON.parse(readFileSync(join(catalog, "index.json"), "utf8"))
  } catch (err) {
    return [`catalog/index.json is missing or not JSON (${err.message})`]
  }
  const listed = Array.isArray(index.skills) ? index.skills : null
  if (!listed) return ["catalog/index.json has no `skills` array"]
  const names = listed.map((s) => s && s.name)
  for (const name of names) if (!lessons.includes(name)) problems.push(`index.json lists ${name}, but catalog/${name}/ does not exist`)
  for (const id of lessons) if (!names.includes(id)) problems.push(`catalog/${id}/ is not listed in index.json`)
  for (const s of listed) {
    for (const f of (s && s.files) || []) {
      if (!existsSync(join(catalog, String(s.name), String(f)))) problems.push(`index.json: catalog/${s.name}/${f} does not exist`)
    }
  }
  const resultsDir = join(root, "results")
  const results = existsSync(resultsDir) ? readdirSync(resultsDir).filter((f) => /^\d{4}-\d{2}-\d{2}-.+\.md$/.test(f)) : []
  for (const id of lessons) {
    const ok = results.some((f) => shipped(parseResult(readFileSync(join(resultsDir, f), "utf8")), id))
    if (!ok) problems.push(`catalog/${id}/ has no results/ file with lesson: ${id}, verdict: ships, at least 3 runs a side and a positive gain`)
  }
  return problems
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const problems = check(process.argv[2] || ".")
  for (const p of problems) console.error(`catalog-check: ${p}`)
  if (problems.length) process.exit(1)
  console.log("catalog-check: every catalog lesson has a shipping result")
}
