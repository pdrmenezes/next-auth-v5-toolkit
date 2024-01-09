"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";

export async function login(formData: z.infer<typeof LoginSchema>) {
  const validateFields = LoginSchema.safeParse(formData);

  if (!validateFields.success) return { error: "Invalid fields" };

  return { success: "Logging in" };
}
