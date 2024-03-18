import { UserNav } from "@/components/user-nav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="container">
      <UserNav />
      {children}
    </div>
  );
}
