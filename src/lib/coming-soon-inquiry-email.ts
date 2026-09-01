export const DEFAULT_INQUIRY_TO_EMAIL = "BenA@Alfordhomes.com";

type InquiryEmailInput = {
  firstName: string;
  lastName: string;
  email: string;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#039;",
    '"': "&quot;",
  })[character] ?? character);
}

export function buildComingSoonInquiryEmail({ firstName, lastName, email }: InquiryEmailInput) {
  const safeFirstName = escapeHtml(firstName);
  const safeLastName = escapeHtml(lastName);
  const safeEmail = escapeHtml(email);
  const fullName = `${firstName} ${lastName}`;

  return {
    subject: `New Website Inquiry — ${fullName} | Alford Custom Builders`,
    html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Website Inquiry</title>
  </head>
  <body style="margin:0;padding:0;background:#eef1f3;color:#17212b;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">A new inquiry was submitted through alfordcustombuilders.com.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;background:#eef1f3;">
      <tr>
        <td align="center" style="padding:36px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:640px;background:#ffffff;border:1px solid #d9dfe3;border-radius:18px;overflow:hidden;box-shadow:0 16px 40px rgba(15,35,50,0.10);">
            <tr>
              <td style="background:#172f42;padding:30px 36px;border-bottom:4px solid #d6b58f;">
                <p style="margin:0;color:#d6b58f;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">Alford Custom Builders</p>
                <h1 style="margin:12px 0 0;color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:34px;font-weight:400;line-height:1.15;">New website inquiry</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:34px 36px 38px;">
                <p style="margin:0 0 24px;color:#4a5965;font-size:16px;line-height:1.65;">A prospective client submitted the contact form at <strong style="color:#17212b;">alfordcustombuilders.com</strong>.</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;border:1px solid #dfe4e7;border-radius:12px;overflow:hidden;">
                  <tr>
                    <td style="width:120px;padding:16px 18px;background:#f6f7f8;border-bottom:1px solid #dfe4e7;color:#66727c;font-size:12px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;">Name</td>
                    <td style="padding:16px 18px;border-bottom:1px solid #dfe4e7;color:#17212b;font-size:16px;font-weight:700;">${safeFirstName} ${safeLastName}</td>
                  </tr>
                  <tr>
                    <td style="width:120px;padding:16px 18px;background:#f6f7f8;color:#66727c;font-size:12px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;">Email</td>
                    <td style="padding:16px 18px;color:#17212b;font-size:16px;"><a href="mailto:${safeEmail}" style="color:#8b6847;text-decoration:underline;text-underline-offset:3px;">${safeEmail}</a></td>
                  </tr>
                </table>
                <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:28px;">
                  <tr>
                    <td style="border-radius:999px;background:#d6b58f;">
                      <a href="mailto:${safeEmail}" style="display:inline-block;padding:14px 24px;color:#17212b;font-size:12px;font-weight:700;letter-spacing:1.6px;text-decoration:none;text-transform:uppercase;">Reply to ${safeFirstName}</a>
                    </td>
                  </tr>
                </table>
                <p style="margin:30px 0 0;padding-top:22px;border-top:1px solid #e3e7e9;color:#84909a;font-size:12px;line-height:1.6;">Website submission · alfordcustombuilders.com · This notification was sent automatically by the Alford Custom Builders website.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
    text: `NEW WEBSITE INQUIRY — ALFORD CUSTOM BUILDERS\n\nA prospective client submitted the contact form at alfordcustombuilders.com.\n\nName: ${fullName}\nEmail: ${email}\n\nReply directly to this email to contact ${firstName}.`,
  };
}
