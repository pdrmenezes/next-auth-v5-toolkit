import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const BASE_URL = "http://localhost:3000";

export async function sendResetPasswordEmail(email: string, token: string) {
  const resetPasswordLink = `${BASE_URL}/auth/new-password?token=${token}`;

  await resend.emails.send({
    // before domain verification it has to be resend's email
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p><a href='${resetPasswordLink}'>Click here</a> to reset your password.</p>`,
  });
}
export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `${BASE_URL}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    // before domain verification it has to be resend's email
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p><a href='${confirmLink}'>Click here</a> to confirm your email.</p>`,
  });
}
