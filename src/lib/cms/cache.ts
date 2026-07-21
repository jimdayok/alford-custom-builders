export const siteCacheTag = "site:alford-custom-homes";
export function contentCacheTags(type: string, key: string) { return [siteCacheTag, `content:${type}`, `content:${type}:${key}`]; }
