"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";

export async function register(formData: z.infer<typeof RegisterSchema>) {
  const validateFields = RegisterSchema.safeParse(formData);

  if (!validateFields.success) return { error: "Invalid fields" };

  return { success: "Logging in" };
}
