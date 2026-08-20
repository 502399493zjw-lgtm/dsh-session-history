# @zhongjingwei/dsh-session-history

[![CI](https://github.com/502399493zjw-lgtm/dsh-session-history/actions/workflows/ci.yml/badge.svg)](https://github.com/502399493zjw-lgtm/dsh-session-history/actions/workflows/ci.yml)

English | [中文](README.zh.md)

Long-session history loading optimization for older DeepSeek Harness releases.

> Version positioning: this plugin was designed to solve the long-session loading limitations in DSH `0.1.0-rc.5`. Starting with DSH `0.1.0-rc.7`, stock DSH provides that behavior natively. DSH `0.1.0-rc.8` likewise includes the 50-message initial window, older-history pagination, and raw event-sequence continuity. Do not install it on a new rc.8 setup.

The rc.8 implementation in this repository is intentionally a no-op. It exists only so an environment that already has the plugin can upgrade safely and then remove it; it adds no history-loading optimization on rc.8.

## Demo

![Load a long session faster and page through two older history windows](https://raw.githubusercontent.com/502399493zjw-lgtm/dsh-session-history/main/docs/assets/dsh-session-history-demo.gif)

The recording demonstrates the rc.5 history-path problem this plugin solved: reducing the initial history payload while preserving continuous **Load earlier** pagination. Starting with rc.7, DSH owns these capabilities natively, so this demo must not be read as a reason to install the plugin on rc.7 or rc.8.

## Version recommendation

- DSH rc.5: the plugin's functional release and demo target this old history path.
- DSH rc.7: the initial window and **Load earlier** behavior are native; installation is not recommended.
- DSH rc.8: the behavior remains native; do not install it on a new setup.
- Upgrading an older setup to rc.8: upgrade DSH first, then remove this plugin.

Removal on rc.8:

```bash
dsh plugin --profile web remove @zhongjingwei/dsh-session-history
```

## Behavior

- The rc.5 functional line removes redundant finalized assistant stream chunks while preserving backward pagination continuity.
- The rc.8 compatibility Host and browser entries intentionally register no behavior.
- Stock rc.8 loads a 50-message initial window and exposes explicit older-history pagination.
- On rc.8, raw persisted events remain untouched so stock sequence-continuity checks stay valid.

## Development

```bash
pnpm install
pnpm test
pnpm run build
pnpm run verify:package
pnpm pack
```

## License

MIT
