import { DashboardLayout } from "@/features/layout";
import { DashboardPage } from "@/features/dashboard";

export default function Dashboard() {
  return (
    <DashboardLayout title="Dashboard">
      <DashboardPage />
    </DashboardLayout>
  );
}
