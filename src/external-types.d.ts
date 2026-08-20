export interface SessionEvent {
  readonly type: string
  readonly data: { readonly turn: number; readonly step: number }
}

export interface Context {
  on(event: string, handler: (...args: any[]) => unknown): unknown
}

export interface ClientContext {
  on(event: string, handler: (gap: HistoryPageGap) => unknown): unknown
}

export interface HistoryPageGap {
  readonly tailSeq: number
  readonly baseSeq: number
}

declare module '@deepseek-ai/dsh-session' {
  export type { SessionEvent }
}

declare module '@deepseek-ai/cordis' {
  export type { Context }
}

declare module '@deepseek-ai/dsh-host-apiproxy' {}

declare module '@deepseek-ai/dsh-client-runtime/client' {
  export type { ClientContext, HistoryPageGap }
}
