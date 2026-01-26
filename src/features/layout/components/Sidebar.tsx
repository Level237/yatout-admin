"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  FileText,
  Settings,
  HelpCircle,
  Zap,
  CreditCard,
  ChevronDown,
} from "lucide-react";

const mainNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Package, label: "Products", href: "/products" },
  { icon: ShoppingCart, label: "Orders", href: "/orders" },
  { icon: DollarSign, label: "Sales", href: "/sales" },
  { icon: Users, label: "Customers", href: "/customers" },
  { icon: FileText, label: "Reports", href: "/reports" },
];

const settingsNavItems = [
  { icon: Zap, label: "Marketplace Sync", href: "/settings/marketplace" },
  { icon: CreditCard, label: "Payment Gateways", href: "/settings/payments" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: HelpCircle, label: "Help Center", href: "/help" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-600 rounded-lg flex items-center justify-center shadow-md shadow-primary/20">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5 text-white"
          >
            <path
              d="M9 11L12 14L22 4"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-lg font-bold text-gray-900">Yatout Admin</span>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        {/* Main Section */}
        <div className="px-3 mb-6">
          <p className="mb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Main
          </p>
          <nav className="space-y-1">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <Separator className="my-4" />

        {/* Settings Section */}
        <div className="px-3">
          <p className="mb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Settings
          </p>
          <nav className="space-y-1">
            {settingsNavItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {item.label === "Settings" && (
                    <ChevronDown className="ml-auto h-4 w-4" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Upgrade Section */}
      <div className="p-4 border-t">
        <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-4 mb-3">
          <p className="text-sm font-semibold text-gray-900 mb-1">
            Upgrade to Premium
          </p>
          <p className="text-xs text-gray-600 mb-3">
            Your Premium Account will expire in 18 days
          </p>
          <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );
}
