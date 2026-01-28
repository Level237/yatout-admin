'use client'

import React, { useState, useMemo } from 'react'
import { Suspense } from "react";
import { useSearchParams } from 'next/navigation'
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Building2,
  Utensils,
  Home,
  CheckCircle,
  AlertCircle,
  XCircle,
  Search,
  Filter,
  Download,
  Eye,
  MoreVertical,
  ChevronDown,
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
  hotel: 'bg-primary/10 text-primary',
  restaurant: 'bg-secondary/10 text-secondary',
  residence: 'bg-accent/10 text-accent',
}

const typeLabels = {
  hotel: 'Hôtel',
  restaurant: 'Restaurant',
  residence: 'Résidence',
}

const statusConfig = {
  confirmed: { icon: CheckCircle, label: 'Confirmée', color: 'text-green-600 dark:text-green-400' },
  pending: { icon: AlertCircle, label: 'En attente', color: 'text-yellow-600 dark:text-yellow-400' },
  cancelled: { icon: XCircle, label: 'Annulée', color: 'text-red-600 dark:text-red-400' },
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
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="p-4 sm:p-6 space-y-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Réservations</h1>
              {statusParam && (
                <span className={cn('px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold', 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400')}>
                  {filteredReservations.length} résultat{filteredReservations.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Gérez et suivez toutes les réservations de vos prestataires</p>
          </div>

          {statusParam && (
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">Filtre actif :</p>
              <a href="/reservations" className="inline-flex items-center gap-2 px-3 py-1 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium text-foreground transition-colors">
                Voir toutes les réservations
              </a>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            <div className="bg-muted rounded-lg p-2 sm:p-3 text-center">
              <p className="text-xs sm:text-sm text-muted-foreground">Total</p>
              <p className="text-lg sm:text-xl font-bold text-foreground">{stats.total}</p>
            </div>
            <div className="bg-green-100/50 dark:bg-green-900/20 rounded-lg p-2 sm:p-3 text-center">
              <p className="text-xs sm:text-sm text-green-700 dark:text-green-400">Confirmées</p>
              <p className="text-lg sm:text-xl font-bold text-green-700 dark:text-green-400">{stats.confirmed}</p>
            </div>
            <div className="bg-yellow-100/50 dark:bg-yellow-900/20 rounded-lg p-2 sm:p-3 text-center">
              <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-400">En attente</p>
              <p className="text-lg sm:text-xl font-bold text-yellow-700 dark:text-yellow-400">{stats.pending}</p>
            </div>
            <div className="bg-red-100/50 dark:bg-red-900/20 rounded-lg p-2 sm:p-3 text-center">
              <p className="text-xs sm:text-sm text-red-700 dark:text-red-400">Annulées</p>
              <p className="text-lg sm:text-xl font-bold text-red-700 dark:text-red-400">{stats.cancelled}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="w-full sm:flex-1 flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                placeholder="Rechercher par client, numéro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground focus:outline-none"
              />
            </div>

            <div className="w-full sm:w-auto flex gap-2 sm:gap-3 items-center">
              <select
                value={statusParam || selectedStatus}
                onChange={(e) => {
                  const value = e.target.value
                  if (value === 'all') {
                    window.location.href = '/reservations'
                  } else {
                    window.location.href = `/reservations?status=${value}`
                  }
                }}
                className="flex-1 sm:flex-none px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none cursor-pointer"
              >
                <option value="all">Tous les statuts</option>
                <option value="confirmed">Confirmées</option>
                <option value="pending">En attente</option>
                <option value="cancelled">Annulées</option>
              </select>

              <button className="hidden sm:flex items-center gap-2 px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium text-foreground transition-colors">
                <Download className="w-4 h-4" />
              </button>

              <div className="hidden sm:flex items-center gap-1 bg-muted rounded-lg p-1">
                <button onClick={() => setViewMode('table')} className={cn('px-3 py-1.5 rounded text-sm font-medium transition-colors', viewMode === 'table' ? 'bg-card text-foreground' : 'text-muted-foreground hover:text-foreground')}>
                  Tableau
                </button>
                <button onClick={() => setViewMode('cards')} className={cn('px-3 py-1.5 rounded text-sm font-medium transition-colors', viewMode === 'cards' ? 'bg-card text-foreground' : 'text-muted-foreground hover:text-foreground')}>
                  Cartes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {viewMode === 'table' ? (
          // Table View
          <div className="p-4 sm:p-6">
            <div className="bg-card rounded-lg sm:rounded-xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left py-3 px-2 sm:px-4 font-semibold text-foreground">Numéro</th>
                      <th className="text-left py-3 px-2 sm:px-4 font-semibold text-foreground hidden md:table-cell">Client</th>
                      <th className="text-left py-3 px-2 sm:px-4 font-semibold text-foreground hidden lg:table-cell">Prestataire</th>
                      <th className="text-left py-3 px-2 sm:px-4 font-semibold text-foreground hidden sm:table-cell">Dates</th>
                      <th className="text-left py-3 px-2 sm:px-4 font-semibold text-foreground">Montant</th>
                      <th className="text-left py-3 px-2 sm:px-4 font-semibold text-foreground">Statut</th>
                      <th className="text-center py-3 px-2 sm:px-4 font-semibold text-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReservations.map((res) => {
                      const StatusIcon = statusConfig[res.status].icon
                      return (
                        <tr key={res.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-2 sm:px-4 font-medium text-foreground">{res.reservationNumber}</td>
                          <td className="py-3 px-2 sm:px-4 text-foreground hidden md:table-cell">{res.clientName}</td>
                          <td className="py-3 px-2 sm:px-4 hidden lg:table-cell">
                            <div className="flex items-center gap-2">
                              <span className={cn('p-1 rounded', typeColors[res.providerType])}>{typeIcons[res.providerType]}</span>
                              <span className="text-foreground">{res.providerName}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 sm:px-4 text-muted-foreground hidden sm:table-cell text-xs">
                            {new Date(res.checkInDate).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })}
                          </td>
                          <td className="py-3 px-2 sm:px-4 font-semibold text-foreground">{res.totalAmount} €</td>
                          <td className="py-3 px-2 sm:px-4">
                            <div className="flex items-center gap-1">
                              <StatusIcon className={cn('w-4 h-4', statusConfig[res.status].color)} />
                              <span className={cn('text-xs font-medium', statusConfig[res.status].color)}>{statusConfig[res.status].label}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 sm:px-4 text-center">
                            <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          // Cards View
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredReservations.map((res) => {
                const StatusIcon = statusConfig[res.status].icon
                return (
                  <div key={res.id} className="bg-card rounded-lg sm:rounded-xl border border-border p-4 sm:p-6 hover:shadow-lg hover:border-border/60 transition-all duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">{res.reservationNumber}</p>
                        <h3 className="text-base sm:text-lg font-bold text-foreground mt-1">{res.clientName}</h3>
                      </div>
                      <div className="flex items-center gap-1">
                        <StatusIcon className={cn('w-5 h-5', statusConfig[res.status].color)} />
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="w-4 h-4 flex-shrink-0" />
                        <span>{res.providerName}</span>
                        <span className={cn('px-2 py-0.5 rounded text-xs font-semibold', typeColors[res.providerType])}>{typeLabels[res.providerType]}</span>
                      </div>

                      {res.nights ? (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          <span>
                            {new Date(res.checkInDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })} au{' '}
                            {new Date(res.checkOutDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })} ({res.nights}N)
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span>{new Date(res.checkInDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4 flex-shrink-0" />
                        <span>{res.guests} client{res.guests > 1 ? 's' : ''}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <span>{res.clientPhone}</span>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4 flex items-end justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Montant total</p>
                        <p className="text-lg sm:text-xl font-bold text-foreground">{res.totalAmount} €</p>
                      </div>
                      <button className="text-muted-foreground hover:text-foreground transition-colors p-2">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function ReservationList() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ReservationListContent />
    </Suspense>
  )
}
