"use server";

import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";

export async function register(formData: z.infer<typeof RegisterSchema>) {
  const validateFields = RegisterSchema.safeParse(formData);

  if (!validateFields.success) return { error: "Invalid fields" };

  const { email, name, password } = validateFields.data;

  const userExists = await db.user.findUnique({ where: { email } });
  if (userExists) return { error: "Email already in use" };

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "User successfully created!" };
}
