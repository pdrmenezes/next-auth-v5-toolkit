"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function SettingsPage() {
  const user = useCurrentUser();
  const onClick = () => {
    logout();
  };
  return (
    <div className="bg-white p-10 rounded-xl">
      <h1>Settings Page</h1>
      <p>session info: {JSON.stringify(user)}</p>
      <button className="p-2 outline" onClick={onClick}>
        Sign Out
      </button>
    </div>
  );
}
