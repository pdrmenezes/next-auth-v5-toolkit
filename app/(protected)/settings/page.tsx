"use client";

import { logout } from "@/actions/logout";
import { useSession } from "next-auth/react";

export default function SettingsPage() {
  const session = useSession();
  const onClick = () => {
    logout();
  };
  return (
    <div>
      <h1>Settings Page</h1>
      <p>session info: {JSON.stringify(session)}</p>
      <button className="p-2 outline" onClick={onClick}>
        Sign Out
      </button>
    </div>
  );
}
