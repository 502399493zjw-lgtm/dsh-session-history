# @zhongjingwei/dsh-session-history

[![CI](https://github.com/502399493zjw-lgtm/dsh-session-history/actions/workflows/ci.yml/badge.svg)](https://github.com/502399493zjw-lgtm/dsh-session-history/actions/workflows/ci.yml)

[English](README.md) | 中文

DeepSeek Harness Web 插件：减少已完成 assistant 历史的加载数据，同时保持浏览器连续分页。

> 兼容范围：明确固定为 DSH `0.1.0-rc.5`。它不兼容 DSH `0.1.0-rc.8`；新版不再发布原有的 `api-proxy/history-events`、`session/history-page-gap` 和 `HistoryPageGap` 扩展契约。

## 演示

![更快加载长会话，并连续翻取两页更早历史](https://raw.githubusercontent.com/502399493zjw-lgtm/dsh-session-history/main/docs/assets/dsh-session-history-demo.gif)

录制使用同一份真实长会话副本，共 56 轮、1498 步。在同为 10 Mbps 的条件下，首屏历史响应从 2.85 MB 降至 1.08 MB（-62.2%）；随后真实执行两次“加载更早”，保持阅读锚点连续，并且仍可继续分页。原始会话只读，过程没有调用模型。

## 安装

仅用于明确固定在 rc.5 的 Web Profile：

```bash
dsh plugin --profile web add @zhongjingwei/dsh-session-history@next
```

安装后重启 Web。卸载命令：

```bash
dsh plugin --profile web remove @zhongjingwei/dsh-session-history
```

## 功能边界

- 仅当同一步已经存在最终 assistant 消息时，删除对应的流式 assistant chunk。
- 未完成事件和非 assistant 事件保持不变。
- 只有返回页确实早于当前已加载窗口时，才接受过滤后的分页缺口。
- 仅使用 rc.5 已发布的 Cordis Host/Browser 扩展点，不修改 DSH 核心。

## 开发验证

```bash
pnpm install
pnpm test
pnpm run build
pnpm run verify:package
pnpm pack
```

## 许可证

MIT
