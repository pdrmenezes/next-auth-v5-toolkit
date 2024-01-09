"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { delay } from "@/lib/utils";

export async function login(formData: z.infer<typeof LoginSchema>) {
  // const validateFields = LoginSchema.safeParse(formData);

  // if (!validateFields.success) return { error: "Invalid fields" };

  // return { success: "Loggin in" };

  console.log(formData);
  await delay(1000);
  console.log("awaited 1 second");
}
