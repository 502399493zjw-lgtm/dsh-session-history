import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const host = await readFile(new URL('../src/index.ts', import.meta.url), 'utf8')
const client = await readFile(new URL('../src/client/index.ts', import.meta.url), 'utf8')
const externalTypes = await readFile(new URL('../src/external-types.d.ts', import.meta.url), 'utf8')
const combined = `${host}\n${client}\n${externalTypes}`

test('does not register either removed rc.5 history hook', () => {
  assert.doesNotMatch(combined, /api-proxy\/history-events/u)
  assert.doesNotMatch(combined, /session\/history-page-gap/u)
})

test('does not elide raw assistant chunks required by rc.8 sequence continuity', () => {
  assert.doesNotMatch(combined, /assistant\/chunk/u)
  assert.doesNotMatch(combined, /withoutFinalizedAssistantChunks/u)
})
