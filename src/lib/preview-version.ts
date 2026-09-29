import { headers } from "next/headers";

export type PreviewVersion = "preview1" | "preview2";

export async function getPreviewVersion(): Promise<PreviewVersion | null> {
  const value = (await headers()).get("x-alford-preview-version");
  return value === "preview1" || value === "preview2" ? value : null;
}
