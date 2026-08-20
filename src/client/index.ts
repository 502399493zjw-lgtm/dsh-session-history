/** Browser pagination policy paired with the Host history projection. */

import type { ClientContext, HistoryPageGap } from '@deepseek-ai/dsh-client-runtime/client'

export const inject = ['sessions']

/** Accept only a page that is genuinely older than the loaded window. */
export function acceptsFilteredHistoryGap(gap: HistoryPageGap): true | undefined {
  return gap.tailSeq < gap.baseSeq ? true : undefined
}

/** Register the browser half of filtered history pagination. */
export function apply(ctx: ClientContext): void {
  ctx.on('session/history-page-gap', acceptsFilteredHistoryGap)
}
