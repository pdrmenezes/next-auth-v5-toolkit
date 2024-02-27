"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

export async function updateSettings(values: z.infer<typeof SettingsSchema>) {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized." };
  }

  const userExists = await getUserById(user.id);
  if (!userExists) {
    return { error: "Unauthorized." };
  }

  await db.user.update({
    where: { id: userExists.id },
    data: { ...values },
  });

  return { success: "Settings successfully updated." };
}
