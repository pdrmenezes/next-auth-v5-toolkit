import { db } from "@/lib/db";

export async function getResetPasswordTokenByToken(token: string) {
  try {
    const resetPasswordToken = await db.resetPasswordToken.findUnique({ where: { token } });

    return resetPasswordToken;
  } catch {
    return null;
  }
}

export async function getResetPasswordTokenByEmail(email: string) {
  try {
    const resetPasswordToken = await db.resetPasswordToken.findFirst({ where: { email } });

    return resetPasswordToken;
  } catch {
    return null;
  }
}
