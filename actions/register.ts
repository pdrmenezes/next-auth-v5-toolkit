"use server";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { z } from "zod";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export async function register(formData: z.infer<typeof RegisterSchema>) {
  const validateFields = RegisterSchema.safeParse(formData);

  if (!validateFields.success) return { error: "Invalid fields" };

  const { email, name, password } = validateFields.data;

  const userExists = await getUserByEmail(email);
  if (userExists) return { error: "Sorry, this email is already in use." };

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificatinToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificatinToken.email, verificatinToken.token);

  return { success: "Confirmation e-mail sent" };
}
