"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

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
  const [period, setPeriod] = useState<"monthly" | "quarterly" | "yearly">("monthly");

  return (
    <div className="bg-background/60 backdrop-blur-xl border border-border/50 rounded-3xl p-6 shadow-sm h-full flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Évolution des revenus</h2>
          <p className="text-sm font-medium text-muted-foreground mt-1">Revenus uniques vs Récurrents</p>
        </div>
        <div className="flex bg-muted/50 p-1 rounded-xl border border-border/50">
          {(["monthly", "quarterly", "yearly"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 capitalize",
                period === p
                  ? "bg-background text-foreground shadow-sm ring-1 ring-border/50"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {p === 'monthly' ? 'Mois' : p === 'quarterly' ? 'Trim' : 'Année'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          <span className="text-sm font-medium text-muted-foreground">Revenus uniques</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
          <span className="text-sm font-medium text-muted-foreground">Revenus récurrents</span>
        </div>
      </div>

      <div className="flex-1 min-h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorOneTime" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorRecurring" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 500 }}
              dy={15}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 500 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderRadius: '16px',
                borderColor: 'hsl(var(--border))',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                padding: '12px 16px',
              }}
              itemStyle={{ fontWeight: 600 }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
            />
            <Area
              type="monotone"
              dataKey="oneTime"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorOneTime)"
              activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }}
            />
            <Area
              type="monotone"
              dataKey="recurring"
              stroke="#8b5cf6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRecurring)"
              activeDot={{ r: 6, strokeWidth: 0, fill: '#8b5cf6' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
