"use server";

import { signOut } from "@/auth";

export async function logout() {
  // helper to handle server logic before signin out a user (clearing information, deleting user, etc.)
  await signOut();
}
