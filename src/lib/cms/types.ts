export type CmsSource = "static" | "published" | "preview";
export type LoadedContent<T> = { data: T; source: CmsSource; revision?: number };
