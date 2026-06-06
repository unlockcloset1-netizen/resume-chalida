import DashboardLayout from "@/components/layout/DashboardLayout";
import "./admin.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-root">
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
}

