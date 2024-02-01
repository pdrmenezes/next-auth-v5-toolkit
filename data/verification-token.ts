import { db } from "@/lib/db";

export async function getVerificationTokenByEmail(email: string) {
  try {
    const verificatinToken = await db.verificationToken.findFirst({ where: { email } });
    return verificatinToken;
  } catch (error) {
    return null;
  }
}

export async function getVerificationTokenByToken(token: string) {
  try {
    const verificatinToken = await db.verificationToken.findUnique({ where: { token } });
    return verificatinToken;
  } catch (error) {
    return null;
  }
}
