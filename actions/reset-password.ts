"use server";

import { getUserByEmail } from "@/data/user";
import { sendResetPasswordEmail } from "@/lib/mail";
import { generateResetPasswordToken } from "@/lib/tokens";
import { ResetPasswordSchema } from "@/schemas";
import { z } from "zod";

export async function resetPassword(formData: z.infer<typeof ResetPasswordSchema>) {
  const validatedFields = ResetPasswordSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: "Invalid email" };
  }

  const { email } = validatedFields.data;

  const userExists = await getUserByEmail(email);
  if (!userExists) {
    return { error: "Email not found." };
  }

  const resetPasswordToken = await generateResetPasswordToken(email);
  await sendResetPasswordEmail(resetPasswordToken.email, resetPasswordToken.token);

  return { success: "Reset password email sent." };
}
