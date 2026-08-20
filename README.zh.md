# @zhongjingwei/dsh-session-history

[![CI](https://github.com/502399493zjw-lgtm/dsh-session-history/actions/workflows/ci.yml/badge.svg)](https://github.com/502399493zjw-lgtm/dsh-session-history/actions/workflows/ci.yml)

[English](README.md) | 中文

面向旧版 DeepSeek Harness 的长会话历史加载优化插件。

> 版本定位：本插件主要用于解决 DSH `0.1.0-rc.5` 的长会话历史加载问题。从 DSH `0.1.0-rc.7` 起，stock DSH 已原生提供这些能力；`0.1.0-rc.8` 同样自带 50-message 首屏窗口、加载更早历史和原始事件序列连续性，新的 rc.8 环境不建议安装。

仓库中的 rc.8 实现有意保持 no-op，只用于让已经安装本插件的环境平滑升级并随后移除；它不会在 rc.8 上提供额外的历史加载优化。

## 演示

![更快加载长会话，并连续翻取两页更早历史](https://raw.githubusercontent.com/502399493zjw-lgtm/dsh-session-history/main/docs/assets/dsh-session-history-demo.gif)

录屏展示的是 rc.5 旧历史加载链路中本插件解决的问题：减少首屏历史数据，并保持“加载更早”连续分页。从 rc.7 起这些能力已进入 DSH 本体，不应把这段演示理解为 rc.7 或 rc.8 仍需安装插件。

## 版本建议

- DSH rc.5：本插件的功能版本和演示对应此旧历史链路。
- DSH rc.7：已经原生支持首屏消息窗口和“加载更早”，不建议安装。
- DSH rc.8：继续原生支持，不建议安装；直接使用 DSH 自带能力。
- 从旧版升级到 rc.8：先升级 DSH，再移除本插件。

rc.8 环境卸载命令：

```bash
dsh plugin --profile web remove @zhongjingwei/dsh-session-history
```

## 功能边界

- rc.5 功能线减少已完成 assistant 历史中的冗余流式 chunk，同时保持向前分页连续。
- rc.8 compatibility 实现的 Host 与 Browser 入口有意不注册任何行为。
- stock rc.8 原生加载 50-message 首屏窗口，并提供显式“加载更早”分页。
- rc.8 下不再改写原始持久化事件，保证 stock 的序列连续性校验成立。

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
