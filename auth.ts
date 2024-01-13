import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    // the session callback uses the token from the jwt callback to get the session and session info
    async session({ session, user, token }) {
      return session;
    },

    async jwt({ token, user, account, profile }) {
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
