"use client";

import { ConsentBanner, ConsentDialog, ConsentManagerProvider, useConsentDialogTrigger, useConsentManager, type Theme } from "@c15t/react";
import { Analytics } from "@vercel/analytics/next";
import { useEffect } from "react";

let openPreferencesDialog: () => void = () => undefined;
export function openCookiePreferences() { openPreferencesDialog(); }

function PrivacyShieldIcon() {
  return <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="20" height="20">
    <path fill="#191d25" d="M12 2.75 19.5 6v5.3c0 4.45-2.94 8.23-7.5 10.1-4.56-1.87-7.5-5.65-7.5-10.1V6L12 2.75Z" />
    <path fill="none" stroke="#e4cba4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.35" d="m8.4 12.2 2.25 2.25 4.95-5" />
  </svg>;
}

const theme = {
  colors: { primary: "#191d25", primaryHover: "#2b3440", surface: "#f6f4ef", surfaceHover: "#e9e6df", text: "#191d25", textMuted: "#5f6268", textOnPrimary: "#ffffff" },
  radius: { md: "0.75rem", lg: "1rem" },
  slots: { consentBannerCard: { className: "alford-consent-banner", style: { maxWidth: "760px" } }, consentDialogCard: "alford-consent-dialog" },
} satisfies Theme;

function ConsentStateBridge({ children }: { children: React.ReactNode }) {
  const { has } = useConsentManager();
  const { openDialog } = useConsentDialogTrigger({ showWhen: "always" });
  const measurement = has("measurement");
  useEffect(() => { openPreferencesDialog = openDialog; return () => { openPreferencesDialog = () => undefined; }; }, [openDialog]);
  return <>{children}{measurement ? <Analytics /> : null}</>;
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  return <ConsentManagerProvider options={{
    mode: "hosted",
    backendURL: "/api/c15t",
    consentCategories: ["necessary", "functionality", "measurement"],
    legalLinks: { privacyPolicy: { href: "/privacy-policy", target: "_self" }, cookiePolicy: { href: "/cookie-policy", target: "_self" } },
    i18n: { locale: "en", detectBrowserLanguage: false, messages: { en: {
      cookieBanner: { title: "Your privacy choices", description: "We use optional functionality and measurement technologies to improve the Alford Custom Builders website. You can accept, reject, or choose by category." },
      consentManagerDialog: { title: "Privacy preferences", description: "Choose which optional technologies Alford Custom Builders may use. Necessary storage remains active for site security and remembering your choice." },
      common: { acceptAll: "Accept all", rejectAll: "Reject optional", customize: "Choose preferences", save: "Save preferences" },
      consentTypes: {
        necessary: { title: "Necessary", description: "Required for site security, core operation, and remembering your privacy choice." },
        functionality: { title: "Functionality", description: "Enables optional website features and embedded services when present." },
        measurement: { title: "Measurement", description: "Helps us understand website usage and performance through privacy-controlled analytics." },
      },
    } } }, theme,
  }}>
    <ConsentStateBridge>{children}</ConsentStateBridge>
    <ConsentBanner hideBranding layout={[["reject", "accept"], "customize"]} primaryButton={["reject", "accept"]} legalLinks={["privacyPolicy", "cookiePolicy"]} />
    <ConsentDialog hideBranding legalLinks={["privacyPolicy", "cookiePolicy"]} showTrigger={{ icon: <PrivacyShieldIcon />, ariaLabel: "Open privacy preferences", showWhen: "after-consent", size: "sm" }} />
  </ConsentManagerProvider>;
}
