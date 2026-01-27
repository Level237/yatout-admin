'use client'

import React from 'react'
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { ArrowUpRight, ArrowDownRight, Users, Building2, DollarSign, TrendingUp, MoreVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

const revenueData = [
  { month: 'Jan', hotels: 4000, restaurants: 2400, residences: 2400 },
  { month: 'Fév', hotels: 3000, restaurants: 1398, residences: 2210 },
  { month: 'Mar', hotels: 2000, restaurants: 9800, residences: 2290 },
  { month: 'Avr', hotels: 2780, restaurants: 3908, residences: 2000 },
  { month: 'Mai', hotels: 1890, restaurants: 4800, residences: 2181 },
  { month: 'Jun', hotels: 2390, restaurants: 3800, residences: 2500 },
]

const prestataireData = [
  { name: 'Hôtels', value: 45, color: '#7c3aed' },
  { name: 'Restaurants', value: 38, color: '#0891b2' },
  { name: 'Résidences', value: 27, color: '#fbbf24' },
]

const reservationsData = [
  { date: 'Lun', reservations: 65, confirmations: 45 },
  { date: 'Mar', reservations: 78, confirmations: 52 },
  { date: 'Mer', reservations: 42, confirmations: 38 },
  { date: 'Jeu', reservations: 89, confirmations: 61 },
  { date: 'Ven', reservations: 95, confirmations: 73 },
  { date: 'Sam', reservations: 110, confirmations: 88 },
  { date: 'Dim', reservations: 85, confirmations: 62 },
]

interface MetricCardProps {
  label: string
  value: string | number
  change: number
  icon: React.ReactNode
  trend: 'up' | 'down'
  color: string
}

function MetricCard({ label, value, change, icon, trend, color }: MetricCardProps) {
  return (
    <div className="bg-card rounded-lg sm:rounded-xl border border-border p-4 sm:p-6 hover:shadow-lg hover:border-border/60 transition-all duration-200">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div
          className={cn(
            'p-2 sm:p-3 rounded-lg',
            color === 'primary' && 'bg-primary/10 text-primary',
            color === 'secondary' && 'bg-secondary/10 text-secondary',
            color === 'accent' && 'bg-accent/10 text-accent'
          )}
        >
          <span className="block w-5 h-5 sm:w-6 sm:h-6">{icon}</span>
        </div>
        <button className="text-muted-foreground hover:text-foreground p-1 transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground mb-2">{label}</p>
      <div className="flex items-baseline gap-2 flex-wrap">
        <h3 className="text-lg sm:text-2xl font-bold text-foreground">{value}</h3>
        <div
          className={cn(
            'flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg',
            trend === 'up'
              ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
          )}
        >
          {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(change)}%
        </div>
      </div>
    </div>
  )
}

export function DashboardPage() {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <MetricCard
              label="Revenus totaux"
              value="24,580 €"
              change={12}
              trend="up"
              icon={<DollarSign className="w-full h-full" />}
              color="primary"
            />
            <MetricCard
              label="Prestataires actifs"
              value="142"
              change={8}
              trend="up"
              icon={<Building2 className="w-full h-full" />}
              color="secondary"
            />
            <MetricCard
              label="Clients actifs"
              value="3,240"
              change={5}
              trend="up"
              icon={<Users className="w-full h-full" />}
              color="accent"
            />
            <MetricCard
              label="Réservations"
              value="584"
              change={15}
              trend="up"
              icon={<TrendingUp className="w-full h-full" />}
              color="primary"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Revenue Chart */}
            <div className="lg:col-span-2 bg-card rounded-lg sm:rounded-xl border border-border p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-foreground">Revenus par type</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Évolution sur 6 mois</p>
                </div>
                <button className="text-muted-foreground hover:text-foreground p-1 transition-colors flex-shrink-0">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorHotels" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorRestaurants" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0891b2" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0891b2" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorResidences" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
                  <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Area type="monotone" dataKey="hotels" stackId="1" stroke="#7c3aed" fillOpacity={1} fill="url(#colorHotels)" />
                  <Area type="monotone" dataKey="restaurants" stackId="1" stroke="#0891b2" fillOpacity={1} fill="url(#colorRestaurants)" />
                  <Area type="monotone" dataKey="residences" stackId="1" stroke="#fbbf24" fillOpacity={1} fill="url(#colorResidences)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-card rounded-lg sm:rounded-xl border border-border p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-foreground">Distribution</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Par type</p>
                </div>
                <button className="text-muted-foreground hover:text-foreground p-1 transition-colors flex-shrink-0">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={prestataireData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name }) => name}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {prestataireData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Reservations Chart */}
          <div className="bg-card rounded-lg sm:rounded-xl border border-border p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-foreground">Réservations cette semaine</h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Nouvelle vs confirmées</p>
              </div>
              <button className="text-muted-foreground hover:text-foreground p-1 transition-colors flex-shrink-0">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={reservationsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
                <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="reservations" fill="#7c3aed" radius={[8, 8, 0, 0]} />
                <Bar dataKey="confirmations" fill="#0891b2" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activity Table */}
          <div className="bg-card rounded-lg sm:rounded-xl border border-border p-4 sm:p-6 pb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-foreground">Activité récente</h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Dernières réservations</p>
              </div>
              <button className="text-muted-foreground hover:text-foreground p-1 transition-colors flex-shrink-0">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-foreground text-xs">Prestataire</th>
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-foreground text-xs hidden sm:table-cell">Client</th>
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-foreground text-xs">Type</th>
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-foreground text-xs">Montant</th>
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-foreground text-xs">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { provider: 'Hotel Grand Paris', client: 'Jean Dupont', type: 'Hôtel', amount: '450 €', status: 'Confirmée', date: '25 Jan 2026' },
                    { provider: 'Restaurant Le Petit', client: 'Marie Martin', type: 'Restaurant', amount: '85 €', status: 'Confirmée', date: '25 Jan 2026' },
                    { provider: 'Villa Côte d\'Azur', client: 'Pierre Durand', type: 'Résidence', amount: '1,200 €', status: 'En attente', date: '24 Jan 2026' },
                    { provider: 'Hotel Mont-Blanc', client: 'Sophie Bernard', type: 'Hôtel', amount: '320 €', status: 'Confirmée', date: '24 Jan 2026' },
                    { provider: 'Resto Gourmet', client: 'Luc Fournier', type: 'Restaurant', amount: '150 €', status: 'Confirmée', date: '24 Jan 2026' },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-foreground font-medium text-xs">{row.provider}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-foreground hidden sm:table-cell text-xs">{row.client}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                          {row.type.split(' ')[0]}
                        </span>
                      </td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-foreground font-semibold text-xs">{row.amount}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4">
                        <span
                          className={cn(
                            'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                            row.status === 'Confirmée'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                          )}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
