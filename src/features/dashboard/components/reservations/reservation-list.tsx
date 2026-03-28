'use client'

import React, { useState, useMemo } from 'react'
import { Suspense } from "react";
import { useSearchParams } from 'next/navigation'
import {
  Calendar,
  Clock,
  User,
  Phone,
  Building2,
  Utensils,
  Home,
  CheckCircle,
  AlertCircle,
  XCircle,
  Search,
  Download,
  Eye,
  MoreVertical,
  ChevronDown,
  Filter
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Reservation {
  id: string
  reservationNumber: string
  clientName: string
  clientEmail: string
  clientPhone: string
  providerName: string
  providerType: 'hotel' | 'restaurant' | 'residence'
  checkInDate: string
  checkOutDate: string
  nights?: number
  guests: number
  totalAmount: number
  status: 'confirmed' | 'pending' | 'cancelled'
  createdAt: string
  notes: string
}

const RESERVATIONS_DATA: Reservation[] = [
  {
    id: '1',
    reservationNumber: 'RES-2026-001',
    clientName: 'Jean Dupont',
    clientEmail: 'jean.dupont@email.com',
    clientPhone: '+33 6 12 34 56 78',
    providerName: 'Hotel Grand Paris',
    providerType: 'hotel',
    checkInDate: '2026-02-10',
    checkOutDate: '2026-02-15',
    nights: 5,
    guests: 2,
    totalAmount: 450,
    status: 'confirmed',
    createdAt: '2026-01-25',
    notes: 'Demande chambre vue sur la Seine',
  },
  {
    id: '2',
    reservationNumber: 'RES-2026-002',
    clientName: 'Marie Martin',
    clientEmail: 'marie.martin@email.com',
    clientPhone: '+33 6 98 76 54 32',
    providerName: 'Restaurant Le Petit',
    providerType: 'restaurant',
    checkInDate: '2026-02-08',
    checkOutDate: '2026-02-08',
    guests: 4,
    totalAmount: 180,
    status: 'confirmed',
    createdAt: '2026-01-25',
    notes: 'Table en terrasse si possible',
  },
  {
    id: '3',
    reservationNumber: 'RES-2026-003',
    clientName: 'Pierre Durand',
    clientEmail: 'pierre.durand@email.com',
    clientPhone: '+33 7 45 67 89 01',
    providerName: 'Villa Côte d\'Azur',
    providerType: 'residence',
    checkInDate: '2026-03-01',
    checkOutDate: '2026-03-08',
    nights: 7,
    guests: 6,
    totalAmount: 1200,
    status: 'pending',
    createdAt: '2026-01-24',
    notes: 'Vérifier disponibilité parking',
  },
  {
    id: '4',
    reservationNumber: 'RES-2026-004',
    clientName: 'Sophie Bernard',
    clientEmail: 'sophie.bernard@email.com',
    clientPhone: '+33 6 23 45 67 89',
    providerName: 'Hotel Mont-Blanc',
    providerType: 'hotel',
    checkInDate: '2026-02-20',
    checkOutDate: '2026-02-22',
    nights: 2,
    guests: 1,
    totalAmount: 320,
    status: 'confirmed',
    createdAt: '2026-01-22',
    notes: 'Petit-déjeuner inclus',
  },
  {
    id: '5',
    reservationNumber: 'RES-2026-005',
    clientName: 'Luc Fournier',
    clientEmail: 'luc.fournier@email.com',
    clientPhone: '+33 7 89 01 23 45',
    providerName: 'Resto Gourmet',
    providerType: 'restaurant',
    checkInDate: '2026-02-14',
    checkOutDate: '2026-02-14',
    guests: 2,
    totalAmount: 150,
    status: 'confirmed',
    createdAt: '2026-01-20',
    notes: 'Menu dégustation demandé',
  },
  {
    id: '6',
    reservationNumber: 'RES-2026-006',
    clientName: 'Isabelle Lefebvre',
    clientEmail: 'isabelle.lefebvre@email.com',
    clientPhone: '+33 6 56 78 90 12',
    providerName: 'Maison Provençale',
    providerType: 'residence',
    checkInDate: '2026-04-15',
    checkOutDate: '2026-04-22',
    nights: 7,
    guests: 4,
    totalAmount: 980,
    status: 'cancelled',
    createdAt: '2026-01-18',
    notes: 'Annulation client - Raison professionnelle',
  },
]

const typeIcons = {
  hotel: <Building2 className="w-4 h-4" />,
  restaurant: <Utensils className="w-4 h-4" />,
  residence: <Home className="w-4 h-4" />,
}

const typeColors = {
  hotel: 'bg-violet-500/10 text-violet-600 border-violet-500/20',
  restaurant: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  residence: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
}

const typeLabels = {
  hotel: 'Hôtel',
  restaurant: 'Restaurant',
  residence: 'Résidence',
}

const statusConfig = {
  confirmed: { icon: CheckCircle, label: 'Confirmée', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
  pending: { icon: AlertCircle, label: 'En attente', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
  cancelled: { icon: XCircle, label: 'Annulée', color: 'bg-rose-500/10 text-rose-600 border-rose-500/20' },
}

function ReservationListContent() {
  const searchParams = useSearchParams()
  const statusParam = searchParams.get('status') as 'confirmed' | 'pending' | 'cancelled' | null

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'confirmed' | 'pending' | 'cancelled'>('all')
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')

  const filteredReservations = useMemo(() => {
    return RESERVATIONS_DATA.filter((res) => {
      const matchesSearch =
        res.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.reservationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.clientEmail.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = !statusParam && selectedStatus === 'all' ? true : statusParam ? res.status === statusParam : res.status === selectedStatus
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, selectedStatus, statusParam])

  const stats = {
    total: RESERVATIONS_DATA.length,
    confirmed: RESERVATIONS_DATA.filter((r) => r.status === 'confirmed').length,
    pending: RESERVATIONS_DATA.filter((r) => r.status === 'pending').length,
    cancelled: RESERVATIONS_DATA.filter((r) => r.status === 'cancelled').length,
  }

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">Réservations</h1>
            <span className="px-3 py-1 rounded-xl text-xs font-bold bg-primary/10 text-primary border border-primary/20 shadow-sm">
              {stats.total} total
            </span>
          </div>
          <p className="text-muted-foreground font-medium">Gérez le flux des réservations sur toute la plateforme YaTout</p>
        </div>

        <div className="flex gap-2">
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-muted/50 text-foreground border border-border/50 rounded-xl hover:bg-muted/80 transition-colors font-semibold text-sm shadow-sm backdrop-blur-md">
            <Download className="w-4 h-4" />
            Exporter CSV
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: stats.total, color: 'text-foreground', bg: 'bg-muted/40' },
          { label: 'Confirmées', value: stats.confirmed, color: 'text-emerald-500', bg: 'bg-emerald-500/5', border: 'border-emerald-500/20' },
          { label: 'En attente', value: stats.pending, color: 'text-amber-500', bg: 'bg-amber-500/5', border: 'border-amber-500/20' },
          { label: 'Annulées', value: stats.cancelled, color: 'text-rose-500', bg: 'bg-rose-500/5', border: 'border-rose-500/20' }
        ].map((stat) => (
          <div key={stat.label} className={cn("p-5 rounded-3xl border border-border/50 backdrop-blur-xl shadow-sm", stat.bg, stat.border)}>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
            <p className={cn("text-3xl font-extrabold", stat.color)}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Control Bar */}
      <div className="bg-background/60 backdrop-blur-xl border border-border/50 rounded-3xl p-3 sm:p-4 flex flex-col sm:flex-row gap-3 shadow-sm justify-between">
        <label className="relative flex-1 group max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Rechercher par client, email, référence..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-muted/40 hover:bg-muted/60 focus:bg-background border border-border/50 focus:border-primary/30 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all text-foreground"
          />
        </label>

        <div className="flex gap-3 items-center">
          <label className="relative w-full sm:w-48 group">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <select
              value={statusParam || selectedStatus}
              onChange={(e) => {
                const value = e.target.value
                window.location.href = value === 'all' ? '/reservations' : `/reservations?status=${value}`
              }}
              className="w-full pl-11 pr-10 py-3 bg-muted/40 hover:bg-muted/60 border border-border/50 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all appearance-none cursor-pointer text-foreground"
            >
              <option value="all">Tous les statuts</option>
              <option value="confirmed">Confirmées</option>
              <option value="pending">En attente</option>
              <option value="cancelled">Annulées</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </label>

          <div className="flex p-1 bg-muted/40 border border-border/50 rounded-xl">
            <button
              onClick={() => setViewMode('table')}
              className={cn('px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300', viewMode === 'table' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground')}
            >
              LiSTE
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={cn('px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300', viewMode === 'cards' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground')}
            >
              Cartes
            </button>
          </div>
        </div>
      </div>

      {/* Grid or Table Content */}
      <div className="pb-12">
        {filteredReservations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-background/60 backdrop-blur-xl border border-border/50 rounded-3xl border-dashed">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">Aucune réservation trouvée</h3>
            <p className="text-muted-foreground max-w-sm text-center font-medium">
              Ajustez vos filtres pour voir d'autres résultats.
            </p>
          </div>
        ) : viewMode === 'table' ? (
          <div className="bg-background/60 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-border/50 bg-muted/20">
                    <th className="py-4 px-6 font-semibold text-muted-foreground whitespace-nowrap">Référence</th>
                    <th className="py-4 px-6 font-semibold text-muted-foreground whitespace-nowrap">Client</th>
                    <th className="py-4 px-6 font-semibold text-muted-foreground whitespace-nowrap">Prestataire</th>
                    <th className="py-4 px-6 font-semibold text-muted-foreground whitespace-nowrap">Dates</th>
                    <th className="py-4 px-6 font-semibold text-muted-foreground text-right whitespace-nowrap">Montant</th>
                    <th className="py-4 px-6 font-semibold text-muted-foreground text-center whitespace-nowrap">Statut</th>
                    <th className="py-4 px-6 font-semibold text-muted-foreground text-center whitespace-nowrap w-16">Act</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.map((res) => {
                    return (
                      <tr key={res.id} className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors group">
                        <td className="py-4 px-6 whitespace-nowrap">
                          <span className="font-bold text-foreground font-mono bg-muted/50 px-2 py-1 rounded-md text-xs">{res.reservationNumber}</span>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                          <span className="font-bold text-foreground block">{res.clientName}</span>
                          <span className="text-xs font-medium text-muted-foreground">{res.clientEmail}</span>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className={cn('p-1.5 rounded-lg border shadow-sm', typeColors[res.providerType])}>{typeIcons[res.providerType]}</span>
                            <span className="font-semibold text-foreground">{res.providerName}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                          <span className="text-sm font-medium text-foreground">
                            {new Date(res.checkInDate).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })}
                          </span>
                          {res.nights ? <span className="text-xs text-muted-foreground ml-1">({res.nights} Nuits)</span> : ''}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap text-right">
                          <span className="font-extrabold text-foreground text-base">{res.totalAmount} €</span>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap text-center">
                          <span className={cn('inline-flex items-center justify-center px-2.5 py-1.5 text-[10px] uppercase tracking-widest font-extrabold rounded-xl border', statusConfig[res.status].color)}>
                            {statusConfig[res.status].label}
                          </span>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap text-center">
                          <button className="p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-xl transition-colors">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReservations.map((res) => {
              const StatusIcon = statusConfig[res.status].icon
              return (
                <div key={res.id} className="bg-background/60 backdrop-blur-xl border border-border/50 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <span className="text-xs font-bold text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded-md">{res.reservationNumber}</span>
                      <h3 className="text-xl font-extrabold text-foreground mt-3 leading-tight">{res.clientName}</h3>
                    </div>
                    <span className={cn('inline-flex items-center justify-center p-2 rounded-xl border', statusConfig[res.status].color)}>
                      <StatusIcon className="w-5 h-5" />
                    </span>
                  </div>

                  <div className="space-y-4 mb-6 pt-4 border-t border-border/50">
                    <div className="flex items-start gap-3">
                      <div className="bg-muted p-2 rounded-xl border border-border/50">
                        <Building2 className="w-4 h-4 text-foreground/70" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{res.providerName}</p>
                        <span className={cn('inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border', typeColors[res.providerType])}>
                          {typeLabels[res.providerType]}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-muted p-2 rounded-xl border border-border/50">
                        {res.nights ? <Calendar className="w-4 h-4 text-foreground/70" /> : <Clock className="w-4 h-4 text-foreground/70" />}
                      </div>
                      <div>
                        {res.nights ? (
                          <p className="font-semibold text-foreground text-sm">
                            {new Date(res.checkInDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' })}
                          </p>
                        ) : (
                          <p className="font-semibold text-foreground text-sm">
                            Le {new Date(res.checkInDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' })}
                          </p>
                        )}
                        <p className="text-xs font-medium text-muted-foreground mt-0.5">{res.guests} personne{res.guests > 1 ? 's' : ''}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 px-3 py-2 bg-muted/40 rounded-xl border border-border/50">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="truncate font-medium text-foreground text-xs">{res.clientPhone}</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-tr from-muted/50 to-background rounded-2xl p-4 border border-border/50 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest mb-1">Montant payé</p>
                      <p className="text-2xl font-extrabold text-foreground leading-none">{res.totalAmount} €</p>
                    </div>
                    <button className="w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center hover:bg-primary/90 transition-colors shadow-sm">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function ArrowRight(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  )
}

export function ReservationList() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground animate-pulse">Chargement de la vue premium...</div>}>
      <ReservationListContent />
    </Suspense>
  )
}
