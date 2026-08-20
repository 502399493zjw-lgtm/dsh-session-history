/**
 * DSH rc.8 compatibility host entry.
 *
 * Stock rc.8 owns message-bounded initial history and continuous older-page
 * loading. The former response-filter seam no longer exists, so this package
 * intentionally contributes no host behavior during an rc.5 → rc.8 upgrade.
 */
export function apply(): void {}
