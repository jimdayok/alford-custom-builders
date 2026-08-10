"use client";
import { openCookiePreferences } from "@/components/cookie-consent-provider";
export function CookiePreferencesButton() { return <button type="button" onClick={openCookiePreferences} className="w-fit text-left transition hover:text-[var(--color-wood)] hover:underline">Privacy preferences</button>; }
