export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      <nav className="bg-black text-white">Shared navbar in the dashboard layout</nav>
      {children}
    </div>
  );
}
