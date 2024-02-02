import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuid } from "uuid";
import { db } from "@/lib/db";
import { getResetPasswordTokenByEmail } from "@/data/reset-password-token";

const ONE_HOUR_IN_MILISECONDS = 3600 * 1000;

export async function generateResetPasswordToken(email: string) {
  const token = uuid();
  const expires = new Date(new Date().getTime() + ONE_HOUR_IN_MILISECONDS);

  const existingToken = await getResetPasswordTokenByEmail(email);

  if (existingToken) {
    await db.resetPasswordToken.delete({
      where: { id: existingToken.id },
    });
  }

  const resetPasswordToken = await db.resetPasswordToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return resetPasswordToken;
}

export async function generateVerificationToken(email: string) {
  const token = uuid();
  const expires = new Date(new Date().getTime() + ONE_HOUR_IN_MILISECONDS);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({ where: { id: existingToken.id } });
  }
  const verificatinToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificatinToken;
}
