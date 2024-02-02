"use server";

import { getResetPasswordTokenByToken } from "@/data/reset-password-token";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function setNewPassword(formData: z.infer<typeof NewPasswordSchema>, token: string | null) {
  if (!token) {
    return { error: "Missing token." };
  }

  const validatedFields = NewPasswordSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getResetPasswordTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid token." };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired." };
  }

  const userExists = await getUserByEmail(existingToken.email);

  if (!userExists) {
    return { error: "Email does not exist." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({ where: { id: userExists.id }, data: { password: hashedPassword } });

  await db.resetPasswordToken.delete({ where: { id: existingToken.id } });

  return { success: "Password successfully updated." };
}
