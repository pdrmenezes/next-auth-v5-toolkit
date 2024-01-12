"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";

export async function login(formData: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(formData);

  if (!validatedFields.success) return { error: "Invalid fields" };

  return { success: "Logging in" };
}
