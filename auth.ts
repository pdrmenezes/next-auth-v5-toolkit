import NextAuth, { type Session, type User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";
import { JWT } from "next-auth/jwt";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    // quick way to handle signIn behavior such as not allow a user with email still not verified to login
    // async signIn({ user, account, profile, email, credentials }) {
    //   if(user.id){
    //     const userExists = await getUserById(user.id);
    //     if (!userExists || !userExists.emailVerified) return false;
    //   }

    //   return true;
    // },

    // The session callback uses the token from the jwt callback to get the session and session info
    // So the session token is identical to the token returned by the jwt callback
    // And we can customize the session object as well as the token inside the jwt callback to return whatever we want, for instance, add the isNewUser property (e.g.: token.isNewUser = true)
    // Now in server or client components we'll have access to the user id we grabbed from the token
    // We'll also extend the session to get access to the new userRole field we added to the user table inside the database
    async session({ session, user, token }: { session: Session; user?: User; token?: JWT }) {
      if (token && token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token && token.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },

    // User and profile are not as reliable as the token, perhaps they allow for customization but in normal circunstances they may come out as 'undefined', so we'll use the token.sub and pass it as the userId to the session callback to get additional user information
    // We can aceess the token inside the middleware from the request object so we can customize the token to better suit our middleware needs such as validate is the user is an admin or not to restrict pages based on userRole
    async jwt({ token }) {
      if (!token.sub) return token;
      const userExists = await getUserById(token.sub);
      if (!userExists) return token;
      token.role = userExists.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});

// auth flow
// 1. get the token with the user id (token.sub) from the authentication (jwt)
// 2. the token is passed to the session callback
