import { NextResponse } from "next/server";
import { z } from "zod";

const inquirySchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(254),
  website: z.string().max(240).optional().default(""),
});

const allowedOrigins = new Set([
  "https://alfordcustombuilders.com",
  "https://www.alfordcustombuilders.com",
  "https://preview.alfordcustombuilders.com",
]);

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#039;",
    '"': "&quot;",
  })[character] ?? character);
}

function brandedFromAddress(configuredFrom: string) {
  const angleAddress = configuredFrom.match(/<([^>]+)>/)?.[1];
  return `Alford Custom Builders <${angleAddress || configuredFrom}>`;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const isLocal = origin?.startsWith("http://localhost:") || origin?.startsWith("http://127.0.0.1:");
  if (origin && !allowedOrigins.has(origin) && !isLocal) {
    return NextResponse.json({ message: "This request could not be verified." }, { status: 403 });
  }

  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ message: "Please check the form and try again." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ message: "Please enter your first name, last name, and a valid email." }, { status: 400 });
  }

  if (parsed.data.website) return NextResponse.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const configuredFrom = process.env.ALFORD_INQUIRY_FROM_EMAIL;
  const to = process.env.ALFORD_INQUIRY_TO_EMAIL || "andrea@d2dmktg.com";
  if (!apiKey || !configuredFrom) {
    console.error("Coming-soon inquiry email is not configured.");
    return NextResponse.json({ message: "Email delivery is temporarily unavailable. Please try again soon." }, { status: 503 });
  }

  const firstName = escapeHtml(parsed.data.firstName);
  const lastName = escapeHtml(parsed.data.lastName);
  const email = escapeHtml(parsed.data.email);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: brandedFromAddress(configuredFrom),
      to: [to],
      reply_to: parsed.data.email,
      subject: `Alford coming-soon inquiry from ${parsed.data.firstName} ${parsed.data.lastName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;color:#171c24">
          <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#98734f">Alford Custom Builders</p>
          <h1 style="font-family:Georgia,serif;font-size:34px;font-weight:normal">New coming-soon inquiry</h1>
          <table style="width:100%;border-collapse:collapse;margin-top:24px">
            <tr><td style="padding:12px;border-bottom:1px solid #ddd">Name</td><td style="padding:12px;border-bottom:1px solid #ddd"><strong>${firstName} ${lastName}</strong></td></tr>
            <tr><td style="padding:12px;border-bottom:1px solid #ddd">Email</td><td style="padding:12px;border-bottom:1px solid #ddd"><a href="mailto:${email}">${email}</a></td></tr>
          </table>
          <p style="margin-top:24px;color:#666">Submitted through alfordcustombuilders.com.</p>
        </div>
      `,
      text: `New Alford coming-soon inquiry\n\nName: ${parsed.data.firstName} ${parsed.data.lastName}\nEmail: ${parsed.data.email}`,
    }),
  });

  if (!response.ok) {
    console.error("Resend rejected a coming-soon inquiry email.", response.status);
    return NextResponse.json({ message: "We could not send your request. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
