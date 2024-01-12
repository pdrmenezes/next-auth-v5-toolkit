import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
