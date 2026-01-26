"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Electronics", value: 85000, percentage: 68, color: "#3b82f6" },
  { name: "Fashion", value: 25000, percentage: 20, color: "#f59e0b" },
  { name: "Health & Wellness", value: 10000, percentage: 8, color: "#ec4899" },
  { name: "Home & Living", value: 5000, percentage: 4, color: "#8b5cf6" },
];

const totalSales = data.reduce((sum, item) => sum + item.value, 0);

export function TopCategoriesChart() {
  return (
    <Card className="border-gray-100 shadow-sm rounded-2xl bg-white/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Top Categories</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs text-primary">
          See All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-xs text-gray-600">Total Sales</p>
              <p className="text-lg font-bold text-gray-900">
                ${(totalSales / 1000).toFixed(0)}K
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          {data.map((category) => (
            <div key={category.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm text-gray-700">{category.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">
                  ${category.value.toLocaleString()}
                </span>
                <span className="text-sm text-gray-600 w-10 text-right">
                  {category.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
