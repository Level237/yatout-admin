import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
}

export function StatsCard({
  label,
  value,
  icon: Icon,
  iconColor,
  iconBgColor,
}: StatsCardProps) {
  return (
    <Card className="border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl bg-white/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
            <p className="text-2xl font-bold text-gray-900 tracking-tight">{value}</p>
          </div>
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconBgColor} transition-transform duration-200 hover:scale-105`}
          >
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
