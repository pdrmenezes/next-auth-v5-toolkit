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
    // so the session token is identical to the token returned by the jwt callback
    // and we can customize the session object as well as the token inside the jwt callback to return whatever we want, for instance, add the isNewUser property (e.g.: token.isNewUser = true)
    async session({ session, user, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },

    // user and profile are not as reliable as the token, perhaps they allow for customization but in normal circunstances they may come out as 'undefined', so we'll use the token.sub and pass it as the userId to the session callback to get additional user information
    async jwt({ token }) {
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
