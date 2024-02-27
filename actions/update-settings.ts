"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";

export async function updateSettings(values: z.infer<typeof SettingsSchema>) {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized." };
  }

  const userExists = await getUserById(user.id);
  if (!userExists) {
    return { error: "Unauthorized." };
  }

  // if user is logged in with OAuth provider they can't update these informations
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const userExists = await getUserByEmail(values.email);

    // if email is in use and it's different from the user who requested the change, return error
    if (userExists && userExists.id !== user.id) {
      return { error: "Email already in use" };
    }

    // if passed the check we'll send a new verification email so the user can verify email ownership
    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: "Verification email successfully sent." };
  }

  if (values.password && values.newPassword && userExists.password) {
    const passwordsMatch = await bcrypt.compare(values.password, userExists.password);
    if (!passwordsMatch) {
      return { error: "Incorrect password" };
    }
    const hashedNewPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedNewPassword;
    // to be sure not to send a field that doesn't exist on the database
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: userExists.id },
    data: { ...values },
  });

  return { success: "Settings successfully updated." };
}
