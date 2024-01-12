import NextAuth from "next-auth";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({ providers: [github, google] });
