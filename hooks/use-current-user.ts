import { useSession } from "next-auth/react";

export function useCurrentUser() {
  const session = useSession();
  return sessionStorage.data?.user;
}
