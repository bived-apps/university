import { after, test } from "node:test"
import assert from "node:assert/strict"
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { check, parseResult, shipped } from "../.github/scripts/check-catalog.mjs"

const result = (over = {}) => {
  const f = { lesson: "stop-on-refusal", verdict: "ships", runs_with: "3", passes_with: "3", runs_without: "3", passes_without: "1", ...over }
  return Object.entries(f).map(([k, v]) => `- ${k}: ${v}`).join("\n") + "\n"
}

const roots = []
after(() => { for (const r of roots) rmSync(r, { recursive: true, force: true }) })

function tree({ skills = [], dirs = [], results = {} }) {
  const root = mkdtempSync(join(process.cwd(), ".tmp-catalog-"))
  roots.push(root)
  mkdirSync(join(root, "catalog"))
  writeFileSync(join(root, "catalog", "index.json"), JSON.stringify({ skills }))
  for (const d of dirs) {
    mkdirSync(join(root, "catalog", d))
    writeFileSync(join(root, "catalog", d, "SKILL.md"), "x")
  }
  mkdirSync(join(root, "results"))
  for (const [name, text] of Object.entries(results)) writeFileSync(join(root, "results", name), text)
  return root
}

const entry = { name: "stop-on-refusal", version: "1", files: ["SKILL.md"] }

test("an empty catalog passes", () => {
  assert.deepEqual(check(tree({})), [])
})

test("a lesson with a shipping result passes", () => {
  const root = tree({ skills: [entry], dirs: ["stop-on-refusal"], results: { "2026-11-16-stop-on-refusal-m.md": result() } })
  assert.deepEqual(check(root), [])
})

test("a lesson without a result is refused", () => {
  const problems = check(tree({ skills: [entry], dirs: ["stop-on-refusal"] }))
  assert.equal(problems.length, 1)
  assert.match(problems[0], /no results\/ file/)
})

test("a dropped, inconclusive or zero-gain result does not ship a lesson", () => {
  for (const over of [{ verdict: "dropped" }, { runs_with: "2", passes_with: "2" }, { passes_without: "3" }, { passes_with: "4" }]) {
    assert.equal(shipped(parseResult(result(over)), "stop-on-refusal"), false, JSON.stringify(over))
  }
})

test("a result for another lesson does not count", () => {
  assert.equal(shipped(parseResult(result({ lesson: "fill-the-report" })), "stop-on-refusal"), false)
})

test("index.json and catalog/ must agree", () => {
  assert.match(check(tree({ skills: [entry] })).join("\n"), /does not exist/)
  assert.match(check(tree({ dirs: ["stop-on-refusal"] })).join("\n"), /not listed in index.json/)
})
