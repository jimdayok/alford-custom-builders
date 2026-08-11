import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("shared c15t manager gates measurement and exposes policy controls", async () => {
  const [provider, layout, config, footer, proxy] = await Promise.all([
    read("src/components/cookie-consent-provider.tsx"), read("src/app/layout.tsx"), read("next.config.ts"), read("src/components/footer.tsx"), read("src/proxy.ts"),
  ]);
  assert.match(provider, /mode: "hosted"/);
  assert.match(provider, /backendURL: "\/api\/c15t"/);
  assert.match(provider, /has\("measurement"\)/);
  assert.match(provider, /measurement \? <Analytics \/>/);
  assert.match(provider, /function PrivacyShieldIcon\(\)/);
  assert.match(provider, /icon: <PrivacyShieldIcon \/>/);
  assert.doesNotMatch(provider, /icon: "settings"/);
  assert.match(config, /d2d-consent-service\.vercel\.app\/api\/c15t/);
  assert.match(layout, /CookieConsentProvider/);
  assert.match(footer, /CookiePreferencesButton/);
  assert.match(proxy, /PUBLIC_POLICY_PATHS/);
  assert.match(proxy, /NextResponse\.next\(\{ request: \{ headers \} \}\)/);
});
