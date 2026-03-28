"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChevronRight } from "lucide-react";

const data = [
  { name: "Hôtels", value: 85000, percentage: 68, color: "#8b5cf6" },
  { name: "Restaurants", value: 25000, percentage: 20, color: "#0ea5e9" },
  { name: "Résidences", value: 10000, percentage: 8, color: "#f59e0b" },
  { name: "Autres", value: 5000, percentage: 4, color: "#ec4899" },
];

const totalSales = data.reduce((sum, item) => sum + item.value, 0);

export function TopCategoriesChart() {
  return (
    <div className="bg-background/60 backdrop-blur-xl border border-border/50 rounded-3xl p-6 shadow-sm h-full flex flex-col">
      <div className="flex flex-row items-center justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Top Catégories</h2>
          <p className="text-sm font-medium text-muted-foreground mt-1">Répartition des revenus</p>
        </div>
        <button className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1 group">
          Voir tout <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center justify-center my-6 relative min-h-[220px]">
          <div className="absolute inset-0 z-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius="70%"
                  outerRadius="90%"
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={8}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} className="drop-shadow-sm hover:opacity-80 transition-opacity cursor-pointer" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-widest">Total</p>
            <p className="text-3xl font-extrabold text-foreground tracking-tight">
              ${(totalSales / 1000).toFixed(0)}K
            </p>
          </div>
        </div>

        <div className="space-y-3 mt-auto">
          {data.map((category) => (
            <div key={category.name} className="flex items-center justify-between p-3 rounded-2xl hover:bg-muted/40 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div
                  className="w-3.5 h-3.5 rounded-full shadow-sm group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: category.color, boxShadow: `0 0 10px ${category.color}80` }}
                />
                <span className="text-sm font-semibold text-foreground">{category.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-foreground">
                  ${category.value.toLocaleString()}
                </span>
                <span className="text-sm font-medium text-muted-foreground w-10 text-right bg-muted/50 px-2 py-0.5 rounded-lg">
                  {category.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
