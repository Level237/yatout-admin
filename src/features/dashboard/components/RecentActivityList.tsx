import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Package, AlertCircle, Megaphone, Settings } from "lucide-react";

const activities = [
  {
    id: "1",
    type: "order",
    title: "Order #2048",
    description: "John Doe",
    date: "12 Jan '25",
    badge: { label: "New Order", variant: "info" as const },
    icon: Package,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    id: "2",
    type: "stock",
    title: "Low Stock Alert",
    description: "MacBook Air M2",
    date: "10 Jan '25",
    badge: { label: "Low Stock", variant: "destructive" as const },
    icon: AlertCircle,
    iconColor: "text-red-600",
    iconBg: "bg-red-100",
  },
  {
    id: "3",
    type: "campaign",
    title: 'Promo code "SUMMER20"',
    description: "Applied 52 times",
    date: "8 Jan '25",
    badge: { label: "Campaign", variant: "default" as const },
    icon: Megaphone,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
  },
  {
    id: "4",
    type: "system",
    title: "System Update",
    description: "Version 1.2.1",
    date: "2 Jan '25",
    badge: { label: "System", variant: "secondary" as const },
    icon: Settings,
    iconColor: "text-gray-600",
    iconBg: "bg-gray-100",
  },
];

export function RecentActivityList() {
  return (
    <Card className="border-gray-100 shadow-sm rounded-2xl bg-white/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-600" />
          Recent Activity
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-xs text-primary">
          See All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.iconBg} flex-shrink-0`}
                >
                  <Icon className={`h-5 w-5 ${activity.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <Badge variant={activity.badge.variant} className="text-xs flex-shrink-0">
                      {activity.badge.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
