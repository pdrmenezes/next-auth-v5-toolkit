import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export async function newVerification(token: string) {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist." };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired." };
  }

  const userExists = await getUserByEmail(existingToken.email);

  if (!userExists) {
    return { error: "Email does not exist." };
  }

  await db.user.update({
    where: {
      id: userExists.id,
    },
    // used on registration but also if user wants to change their email
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  await db.verificationToken.delete({ where: { id: existingToken.id } });

  return { success: "Email verified." };
}
