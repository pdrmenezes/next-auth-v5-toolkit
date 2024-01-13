import NextAuth, { type DefaultSession, JWT } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "USER";
    } & DefaultSession["user"];
  }
}
// TODO fix token type declaration
declare module "next-auth/jwt" {
  interface JWT {
    role: "ADMIN" | "USER";
  }
}
