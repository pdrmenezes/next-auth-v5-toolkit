"use client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "../form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export function RoleGate({ allowedRole, children }: RoleGateProps) {
  const role = useCurrentRole();

  if (role !== allowedRole) return <FormError message="You do not have permission do view this content" />;

  return <>{children}</>;
}
