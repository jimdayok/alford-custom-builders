import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "../src/proxy";

function visit(host: string, path = "/") {
  return proxy(new NextRequest(`https://${host}${path}`, { headers: { host } }));
}
describe("public version 2 launch", () => {
  it("serves the full public site on both official domains", () => {
    for (const host of ["alfordcustombuilders.com", "www.alfordcustombuilders.com"]) {
      for (const path of ["/", "/about", "/services", "/portfolio", "/available", "/contact"]) {
        const response = visit(host, path);
        expect(response.headers.get("x-middleware-request-x-alford-site-mode")).toBe("public");
        expect(response.headers.get("x-middleware-request-x-alford-preview-version")).toBe("preview2");
        expect(response.headers.get("x-middleware-rewrite")).toBeNull();
        expect(response.headers.get("x-robots-tag")).toBeNull();
      }
    }
  });
  it("redirects the retired entry screen and older navigation", () => {
    for (const [path, target] of [["/coming-soon", "/"], ["/discover", "/about"], ["/our-process", "/services"]]) {
      const response = visit("www.alfordcustombuilders.com", path);
      expect(response.status).toBe(308);
      expect(response.headers.get("location")).toBe(`https://www.alfordcustombuilders.com${target}`);
    }
  });
  it("keeps review aliases separate and excluded from indexing", () => {
    const response = visit("preview2.alfordcustombuilders.com");
    expect(response.headers.get("x-middleware-request-x-alford-site-mode")).toBe("preview");
    expect(response.headers.get("x-robots-tag")).toContain("noindex");
  });
});
