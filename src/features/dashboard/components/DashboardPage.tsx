import { StatsCard } from "./StatsCard";
import { SalesRevenueChart } from "./SalesRevenueChart";
import { TopCategoriesChart } from "./TopCategoriesChart";
import { RecentActivityList } from "./RecentActivityList";
import { TopProductsTable } from "./TopProductsTable";
import { Package, DollarSign, TrendingUp, TrendingDown } from "lucide-react";

export function DashboardPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 mt-1">{currentDate}</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            Download Report
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20">
            Export Data
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          label="Total Products"
          value="1,525"
          icon={Package}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-50"
        />
        <StatsCard
          label="Total Sales"
          value="10,892"
          icon={DollarSign}
          iconColor="text-green-600"
          iconBgColor="bg-green-50"
        />
        <StatsCard
          label="Total Income"
          value="$157,342"
          icon={TrendingUp}
          iconColor="text-primary"
          iconBgColor="bg-cyan-50"
        />
        <StatsCard
          label="Total Expenses"
          value="$12,453"
          icon={TrendingDown}
          iconColor="text-red-600"
          iconBgColor="bg-red-50"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesRevenueChart />
        </div>
        <div>
          <TopCategoriesChart />
        </div>
      </div>

      {/* Activity and Products Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <RecentActivityList />
        </div>
        <div className="lg:col-span-2">
          <TopProductsTable />
        </div>
      </div>
    </div>
  );
}
