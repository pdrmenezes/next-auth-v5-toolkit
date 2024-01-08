export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      <nav className="bg-black text-white">Shared navbar in the Auth layout</nav>
      {children}
    </div>
  );
}
