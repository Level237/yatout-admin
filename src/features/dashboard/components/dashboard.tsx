'use client'

import React from 'react'
import { ArrowUpRight, ArrowDownRight, Users, Building2, DollarSign, TrendingUp, MoreVertical, CreditCard, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SalesRevenueChart } from './SalesRevenueChart'
import { TopCategoriesChart } from './TopCategoriesChart'
import { TopProductsTable } from './TopProductsTable'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const reservationsData = [
  { date: 'Lun', new: 65, confirmed: 45 },
  { date: 'Mar', new: 78, confirmed: 52 },
  { date: 'Mer', new: 42, confirmed: 38 },
  { date: 'Jeu', new: 89, confirmed: 61 },
  { date: 'Ven', new: 95, confirmed: 73 },
  { date: 'Sam', new: 110, confirmed: 88 },
  { date: 'Dim', new: 85, confirmed: 62 },
]

interface MetricCardProps {
  label: string
  value: string | number
  change: number
  icon: React.ReactNode
  trend: 'up' | 'down'
  gradient: string
}

function MetricCard({ label, value, change, icon, trend, gradient }: MetricCardProps) {
  return (
    <div className="relative overflow-hidden bg-background/60 backdrop-blur-xl border border-border/50 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 group">
      {/* Decorative Gradient Blob */}
      <div className={cn(
        "absolute -right-6 -top-6 w-24 h-24 rounded-full blur-[40px] opacity-20 transition-opacity duration-300 group-hover:opacity-40",
        gradient
      )} />

      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="p-3 rounded-2xl bg-muted/40 shadow-sm border border-border/50 group-hover:scale-110 transition-transform duration-300">
          <span className="block w-6 h-6 text-foreground/80">{icon}</span>
        </div>
        <button className="text-muted-foreground hover:text-foreground p-1 transition-colors rounded-lg hover:bg-muted/50">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-1 relative z-10">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-extrabold tracking-tight text-foreground">{value}</h3>
          <div
            className={cn(
              'flex items-center gap-1 text-xs font-bold px-2 py-1.5 rounded-xl shadow-sm border',
              trend === 'up'
                ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400'
                : 'bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400'
            )}
          >
            {trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            {Math.abs(change)}%
          </div>
        </div>
      </div>
    </div>
  )
}

export function DashboardPage() {
  return (
    <div className="w-full h-full flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <MetricCard
          label="Revenus totaux"
          value="24 580 €"
          change={12.5}
          trend="up"
          icon={<DollarSign className="w-full h-full" />}
          gradient="bg-blue-500"
        />
        <MetricCard
          label="Prestataires actifs"
          value="142"
          change={8.2}
          trend="up"
          icon={<Building2 className="w-full h-full" />}
          gradient="bg-violet-500"
        />
        <MetricCard
          label="Clients actifs"
          value="3 240"
          change={5.1}
          trend="down"
          icon={<Users className="w-full h-full" />}
          gradient="bg-emerald-500"
        />
        <MetricCard
          label="Réservations"
          value="584"
          change={14.6}
          trend="up"
          icon={<Activity className="w-full h-full" />}
          gradient="bg-amber-500"
        />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesRevenueChart />
        </div>
        <div className="lg:col-span-1">
          <TopCategoriesChart />
        </div>
      </div>

      {/* Secondary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
        <div className="lg:col-span-2">
          <TopProductsTable />
        </div>

        {/* Reservations Bar Chart Replaces Recent Activity visually for variety */}
        <div className="bg-background/60 backdrop-blur-xl border border-border/50 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">Flux des réservations</h2>
              <p className="text-sm font-medium text-muted-foreground mt-1">Comparatif semaine</p>
            </div>
          </div>
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reservationsData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 500 }}
                />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderRadius: '16px',
                    borderColor: 'hsl(var(--border))',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  itemStyle={{ fontWeight: 600 }}
                />
                <Bar dataKey="new" name="Nouvelles" fill="#8b5cf6" radius={[6, 6, 6, 6]} barSize={12} />
                <Bar dataKey="confirmed" name="Confirmées" fill="#0ea5e9" radius={[6, 6, 6, 6]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
