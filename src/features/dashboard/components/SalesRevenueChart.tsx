"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", oneTime: 50000, recurring: 30000 },
  { month: "Feb", oneTime: 60000, recurring: 35000 },
  { month: "Mar", oneTime: 75000, recurring: 40000 },
  { month: "Apr", oneTime: 90000, recurring: 45000 },
  { month: "May", oneTime: 110000, recurring: 50000 },
  { month: "Jun", oneTime: 95000, recurring: 48000 },
  { month: "Jul", oneTime: 105000, recurring: 52000 },
  { month: "Aug", oneTime: 120000, recurring: 55000 },
];

export function SalesRevenueChart() {
  const [period, setPeriod] = useState<"monthly" | "quarterly" | "yearly">(
    "monthly"
  );

  return (
    <Card className="border-gray-100 shadow-sm rounded-2xl bg-white/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Sales Revenue</CardTitle>
        <div className="flex gap-2">
          <Button
            variant={period === "monthly" ? "default" : "ghost"}
            size="sm"
            onClick={() => setPeriod("monthly")}
            className="text-xs"
          >
            Monthly
          </Button>
          <Button
            variant={period === "quarterly" ? "default" : "ghost"}
            size="sm"
            onClick={() => setPeriod("quarterly")}
            className="text-xs"
          >
            Quarterly
          </Button>
          <Button
            variant={period === "yearly" ? "default" : "ghost"}
            size="sm"
            onClick={() => setPeriod("yearly")}
            className="text-xs"
          >
            Yearly
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-gray-600">One-Time Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-gray-600">Recurring Revenue</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickFormatter={(value) => `${value / 1000}K`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
              formatter={(value: number | undefined) => [
                `$${(value || 0).toLocaleString()}`,
                "Revenue",
              ]}
            />
            <Bar dataKey="oneTime" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            <Bar dataKey="recurring" fill="#a855f7" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
