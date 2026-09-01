import { describe, expect, it } from "vitest";

import { buildComingSoonInquiryEmail, DEFAULT_INQUIRY_TO_EMAIL } from "@/lib/coming-soon-inquiry-email";

describe("coming-soon inquiry email", () => {
  it("defaults new inquiries to Ben", () => {
    expect(DEFAULT_INQUIRY_TO_EMAIL).toBe("BenA@Alfordhomes.com");
  });

  it("clearly identifies a professional website submission", () => {
    const email = buildComingSoonInquiryEmail({
      firstName: "Taylor",
      lastName: "Morgan",
      email: "taylor@example.com",
    });

    expect(email.subject).toBe("New Website Inquiry — Taylor Morgan | Alford Custom Builders");
    expect(email.html).toContain("A prospective client submitted the contact form");
    expect(email.html).toContain("alfordcustombuilders.com");
    expect(email.html).toContain("mailto:taylor@example.com");
    expect(email.text).toContain("NEW WEBSITE INQUIRY — ALFORD CUSTOM BUILDERS");
  });

  it("escapes visitor details in the HTML version", () => {
    const email = buildComingSoonInquiryEmail({
      firstName: "<Taylor>",
      lastName: "Morgan & Co.",
      email: "taylor@example.com",
    });

    expect(email.html).toContain("&lt;Taylor&gt; Morgan &amp; Co.");
    expect(email.html).not.toContain("<Taylor>");
  });
});
