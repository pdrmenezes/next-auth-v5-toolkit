"use client";

import { useSession } from "next-auth/react";

export default function SettingsPage() {
  const session = useSession();
  return (
    <div>
      <h1>Settings Page</h1>
      <p>session info: {JSON.stringify(session)}</p>
      <form>
        <button className="p-2 outline" type="submit">
          Sign Out
        </button>
      </form>
    </div>
  );
}
