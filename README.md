# @zhongjingwei/dsh-session-history

[![CI](https://github.com/502399493zjw-lgtm/dsh-session-history/actions/workflows/ci.yml/badge.svg)](https://github.com/502399493zjw-lgtm/dsh-session-history/actions/workflows/ci.yml)

English | [中文](README.zh.md)

DeepSeek Harness Web plugin that reduces completed assistant-history payloads while preserving continuous browser pagination.

> Compatibility: intentionally pinned to DSH `0.1.0-rc.5`. It is not compatible with DSH `0.1.0-rc.8`, where the former `api-proxy/history-events`, `session/history-page-gap`, and `HistoryPageGap` extension contracts are no longer published.

## Demo

![Load a long session faster and page through two older history windows](https://raw.githubusercontent.com/502399493zjw-lgtm/dsh-session-history/main/docs/assets/dsh-session-history-demo.gif)

The recording uses one real copied session with 56 turns and 1,498 steps. Under the same 10 Mbps limit, the initial history response falls from 2.85 MB to 1.08 MB (-62.2%). It then performs two real **Load earlier** requests, preserves the reading anchor, and keeps pagination available. The source session remained read-only and no model was called.

## Install

Use only with an intentionally pinned rc.5 Web profile:

```bash
dsh plugin --profile web add @zhongjingwei/dsh-session-history@next
```

Restart Web after installation. Remove the plugin with:

```bash
dsh plugin --profile web remove @zhongjingwei/dsh-session-history
```

## Behavior

- Removes streaming assistant chunks only when the same step already has a finalized assistant message.
- Keeps unfinished and non-assistant events unchanged.
- Accepts filtered page gaps only when the returned page is genuinely older than the loaded window.
- Uses published rc.5 Cordis Host and Browser extension points without patching DSH core.

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
