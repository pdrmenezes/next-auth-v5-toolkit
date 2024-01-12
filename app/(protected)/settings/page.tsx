import { auth, signOut } from "@/auth";

export default async function SettingsPage() {
  const session = await auth();
  return (
    <div>
      <h1>Settings Page</h1>
      <p>session info: {JSON.stringify(session)}</p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="p-2 outline" type="submit">
          Sign Out
        </button>
      </form>
    </div>
  );
}
