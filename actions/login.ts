"use server";

import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export async function login(formData: z.infer<typeof LoginSchema>, callbackUrl?: string) {
  const validatedFields = LoginSchema.safeParse(formData);

  if (!validatedFields.success) return { error: "Invalid fields" };

  const { email, password, confirmationCode } = validatedFields.data;

  const userExists = await getUserByEmail(email);

  if (!userExists || !userExists.email || !userExists.password) {
    return { error: "Email does not exist." };
  }

  if (!userExists.emailVerified) {
    const verificationToken = await generateVerificationToken(userExists.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    return { success: "Confirmation email sent." };
  }

  if (userExists.isTwoFactorEnabled && userExists.email) {
    if (confirmationCode) {
      const twoFactorToken = await getTwoFactorTokenByEmail(userExists.email);
      if (!twoFactorToken) return { error: "Invalid code." };
      if (twoFactorToken.token !== confirmationCode) return { error: "Invalid code" };

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) return { error: "Code has expired" };

      await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } });
      const existingConfirmation = await getTwoFactorConfirmationByUserId(userExists.id);
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }
      await db.twoFactorConfirmation.create({
        data: { userId: userExists.id },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(userExists.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
}
