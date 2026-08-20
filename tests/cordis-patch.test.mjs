import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const patch = await readFile(new URL('../cordis.patch.yml', import.meta.url), 'utf8')
const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'))
const buildConfig = await readFile(new URL('../tsdown.config.ts', import.meta.url), 'utf8')
const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8')
const readmeZh = await readFile(new URL('../README.zh.md', import.meta.url), 'utf8')

test('the standalone bundle inserts only the session-history plugin', () => {
  assert.match(patch, /^\s*- id: session-history$/m)
  assert.match(patch, /^\s+name: ['"]?@zhongjingwei\/dsh-session-history['"]?$/m)
  assert.doesNotMatch(patch, /session-history-lite/)
})

test('the standalone compatibility package targets stock DSH rc.8', () => {
  assert.deepEqual(packageJson.repository, {
    type: 'git',
    url: 'git+https://github.com/502399493zjw-lgtm/dsh-session-history.git',
  })
  assert.equal(packageJson.homepage, 'https://github.com/502399493zjw-lgtm/dsh-session-history#readme')
  assert.equal(packageJson.bugs?.url, 'https://github.com/502399493zjw-lgtm/dsh-session-history/issues')
  assert.equal(packageJson.version, '0.1.0-rc.8')
  assert.equal(packageJson.peerDependencies['@deepseek-ai/cordis'], '4.0.1')
  assert.equal(packageJson.peerDependencies['@deepseek-ai/dsh-client-runtime'], '0.1.0-rc.8')
  assert.equal(packageJson.peerDependencies['@deepseek-ai/dsh-host-apiproxy'], undefined)
  assert.equal(packageJson.peerDependencies['@deepseek-ai/dsh-session'], undefined)
  assert.doesNotMatch(buildConfig, /\/Users\/|deepseek-harness\/packages/u)
  assert.match(readme, /DSH `0\.1\.0-rc\.8`/u)
  assert.match(readme, /50-message/u)
  assert.match(readme, /designed to solve the long-session loading limitations in DSH `0\.1\.0-rc\.5`/u)
  assert.match(readme, /Starting with DSH `0\.1\.0-rc\.7`, stock DSH provides that behavior natively/u)
  assert.match(readme, /Do not install it on a new rc\.8 setup/u)
  assert.match(readmeZh, /主要用于解决 DSH `0\.1\.0-rc\.5` 的长会话历史加载问题/u)
  assert.match(readmeZh, /从 DSH `0\.1\.0-rc\.7` 起，stock DSH 已原生提供这些能力/u)
  assert.match(readmeZh, /新的 rc\.8 环境不建议安装/u)
  assert.match(readme, /docs\/assets\/dsh-session-history-demo\.gif/u)
})
