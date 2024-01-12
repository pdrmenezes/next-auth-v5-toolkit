import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [github, google],
} satisfies NextAuthConfig;
