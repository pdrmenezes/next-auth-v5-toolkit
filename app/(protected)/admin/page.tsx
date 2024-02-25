// using hook to fetch role in client component
"use client";

import { useCurrentRole } from "@/hooks/use-current-role";

export default function AdminPage() {
  const role = useCurrentRole();
  return (
    <>
      <p>Role: {role}</p>
    </>
  );
}

// using function to fetch role in server component
import { currentRole } from "@/lib/auth";

export default async function AdminPage() {
  const role = currentRole();
  return (
    <>
      <p>Role: {role}</p>
    </>
  );
}
