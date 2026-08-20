/** Response-only Host projection that omits finalized streaming deltas from history pages. */

import type { Context } from '@deepseek-ai/cordis'
import type { SessionEvent } from '@deepseek-ai/dsh-session'
import type {} from '@deepseek-ai/dsh-host-apiproxy'

export const name = 'session-history-lite'
export const inject = ['apiProxy']

function assistantStepKey(turn: number, step: number): string {
  return `${turn}:${step}`
}

/** Remove stream delta events for steps that already have an assembled assistant message. */
export function withoutFinalizedAssistantChunks(events: readonly SessionEvent[]): readonly SessionEvent[] {
  const finalizedSteps = new Set<string>()
  for (const event of events) {
    if (event.type === 'assistant/message') {
      finalizedSteps.add(assistantStepKey(event.data.turn, event.data.step))
    }
  }
  return events.filter(event => event.type !== 'assistant/chunk'
    || !finalizedSteps.has(assistantStepKey(event.data.turn, event.data.step)))
}

/** Register pre-pagination history chunk elision. */
export function apply(ctx: Context): void {
  ctx.on('api-proxy/history-events', (_read, next) => withoutFinalizedAssistantChunks(next()))
}
