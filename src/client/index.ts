/**
 * DSH rc.8 compatibility browser entry.
 *
 * Pagination and sequence validation are native in stock rc.8, so there is no
 * browser override to register. Keeping the entry makes package upgrades safe.
 */
export function apply(): void {}
