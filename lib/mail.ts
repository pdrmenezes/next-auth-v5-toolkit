import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const BASE_URL = "http://localhost:3000";

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `${BASE_URL}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p><a href='${confirmLink}'>Click here</a> to confirm your email.</p>`,
  });
}
