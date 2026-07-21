import "server-only";
import { importSPKI, jwtVerify } from "jose";

export async function verifyCmsToken(token: string, action: "preview" | "revalidate") {
  const pem = process.env.D2D_CMS_SIGNING_PUBLIC_KEY?.replace(/\\n/g, "\n");
  const kid = process.env.D2D_CMS_SIGNING_KEY_ID;
  if (!pem || !kid) throw new Error("CMS verification is not configured.");
  const key = await importSPKI(pem, "RS256");
  const { payload, protectedHeader } = await jwtVerify(token, key, { algorithms: ["RS256"], audience: "alford-custom-homes" });
  if (protectedHeader.kid !== kid || payload.action !== action || payload.siteSlug !== "alford-custom-homes") throw new Error("CMS token scope is invalid.");
  return payload;
}
