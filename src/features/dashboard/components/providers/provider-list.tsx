'use client'

import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Star, MapPin, Phone, Mail, Globe, Heart, MoreVertical, Search, Filter, ChevronDown, Users, Utensils, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Provider {
  id: string
  name: string
  type: 'hotel' | 'restaurant' | 'residence'
  description: string
  rating: number
  reviews: number
  location: string
  image: string
  phone: string
  email: string
  website?: string
  priceRange: string
  status: 'active' | 'pending' | 'inactive'
  revenue: string
  reservations: number
  featured: boolean
}

const PROVIDERS_DATA: Provider[] = [
  {
    id: '1',
    name: 'Hotel Grand Paris',
    type: 'hotel',
    description: '5-star luxury hotel in the heart of Paris',
    rating: 4.8,
    reviews: 324,
    location: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=300&fit=crop',
    phone: '+33 1 42 34 56 78',
    email: 'contact@hotelgrandparis.fr',
    website: 'hotelgrandparis.fr',
    priceRange: '$$$',
    status: 'active',
    revenue: '45,230 €',
    reservations: 156,
    featured: true,
  },
  {
    id: '2',
    name: 'Le Petit Restaurant',
    type: 'restaurant',
    description: 'Cozy restaurant with authentic French cuisine',
    rating: 4.6,
    reviews: 187,
    location: 'Lyon, France',
    image: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=500&h=300&fit=crop',
    phone: '+33 4 78 12 34 56',
    email: 'hello@lepetitrestaurant.fr',
    website: 'lepetitrestaurant.fr',
    priceRange: '$$',
    status: 'active',
    revenue: '12,450 €',
    reservations: 89,
    featured: false,
  },
  {
    id: '3',
    name: 'Villa Côte d\'Azur',
    type: 'residence',
    description: 'Stunning Mediterranean villa with sea view',
    rating: 4.9,
    reviews: 412,
    location: 'Nice, France',
    image: 'https://images.unsplash.com/photo-1512207736139-aab701420ff5?w=500&h=300&fit=crop',
    phone: '+33 4 93 87 65 43',
    email: 'booking@villacotedazur.fr',
    website: 'villacotedazur.fr',
    priceRange: '$$$',
    status: 'active',
    revenue: '58,900 €',
    reservations: 234,
    featured: true,
  },
  {
    id: '4',
    name: 'Hotel Mont-Blanc',
    type: 'hotel',
    description: 'Mountain resort with alpine charm',
    rating: 4.7,
    reviews: 268,
    location: 'Chamonix, France',
    image: 'https://images.unsplash.com/photo-1613395877297-d2d1b86b1f16?w=500&h=300&fit=crop',
    phone: '+33 4 50 53 05 09',
    email: 'info@hotelmontblanc.fr',
    priceRange: '$$$',
    status: 'active',
    revenue: '38,670 €',
    reservations: 142,
    featured: false,
  },
  {
    id: '5',
    name: 'Resto Gourmet',
    type: 'restaurant',
    description: 'Michelin-starred gastronomic restaurant',
    rating: 4.9,
    reviews: 156,
    location: 'Bordeaux, France',
    image: 'https://images.unsplash.com/photo-1504674900769-7a7f0f84d51f?w=500&h=300&fit=crop',
    phone: '+33 5 56 51 73 66',
    email: 'reservations@restogourmet.fr',
    website: 'restogourmet.fr',
    priceRange: '$$$$',
    status: 'active',
    revenue: '28,340 €',
    reservations: 112,
    featured: true,
  },
  {
    id: '6',
    name: 'Studio Montmartre',
    type: 'residence',
    description: 'Charming studio apartment in Montmartre',
    rating: 4.5,
    reviews: 89,
    location: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=300&fit=crop',
    phone: '+33 1 46 06 26 52',
    email: 'hello@studiomontmartre.fr',
    priceRange: '$$',
    status: 'pending',
    revenue: '5,600 €',
    reservations: 32,
    featured: false,
  },
]

interface ProviderCardProps {
  provider: Provider
  onEdit: (provider: Provider) => void
  onFavorite: (id: string) => void
}

function ProviderCard({ provider, onEdit, onFavorite }: ProviderCardProps) {
  const typeConfig = {
    hotel: {
      icon: Building2,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      label: 'Hôtel',
    },
    restaurant: {
      icon: Utensils,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      label: 'Restaurant',
    },
    residence: {
      icon: Users,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      label: 'Résidence',
    },
  }

  const config = typeConfig[provider.type]
  const IconComponent = config.icon

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg hover:border-border/60 transition-all duration-200">
      {/* Image */}
      <div className="relative h-40 sm:h-48 overflow-hidden bg-muted">
        <img
          src={provider.image || "/placeholder.svg"}
          alt={provider.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {provider.featured && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full">
            Vedette
          </div>
        )}
        <button
          onClick={() => onFavorite(provider.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-colors"
        >
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">{provider.name}</h3>
            <p className="text-xs text-muted-foreground truncate">{provider.description}</p>
          </div>
          <button className="p-1 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Type badge */}
        <div className={cn('inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium', config.bgColor)}>
          <IconComponent className={cn('w-3 h-3', config.color)} />
          <span className={config.color}>{config.label}</span>
        </div>

        {/* Location and rating */}
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{provider.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-accent text-accent" />
              <span className="text-sm font-semibold text-foreground">{provider.rating}</span>
              <span className="text-xs text-muted-foreground">({provider.reviews})</span>
            </div>
            <div className={cn(
              'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
              provider.status === 'active' && 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
              provider.status === 'pending' && 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
              provider.status === 'inactive' && 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
            )}>
              {provider.status === 'active' ? 'Actif' : provider.status === 'pending' ? 'En attente' : 'Inactif'}
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="space-y-1 pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <Phone className="w-3.5 h-3.5" />
            <span className="truncate">{provider.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <Mail className="w-3.5 h-3.5" />
            <span className="truncate">{provider.email}</span>
          </div>
          {provider.website && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              <Globe className="w-3.5 h-3.5" />
              <span className="truncate">{provider.website}</span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
          <div className="bg-muted rounded-lg p-2 text-center">
            <p className="text-xs text-muted-foreground">Revenus</p>
            <p className="text-sm font-semibold text-foreground">{provider.revenue}</p>
          </div>
          <div className="bg-muted rounded-lg p-2 text-center">
            <p className="text-xs text-muted-foreground">Réservations</p>
            <p className="text-sm font-semibold text-foreground">{provider.reservations}</p>
          </div>
        </div>

        {/* Action button */}
        <button
          onClick={() => onEdit(provider)}
          className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
        >
          Gérer
        </button>
      </div>
    </div>
  )
}

export function ProvidersList() {
  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type') as 'hotel' | 'restaurant' | 'residence' | null
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'pending' | 'inactive'>('all')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null)

  const filteredProviders = useMemo(() => {
    return PROVIDERS_DATA.filter(provider => {
      const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = !typeParam || provider.type === typeParam
      const matchesStatus = selectedStatus === 'all' || provider.status === selectedStatus
      return matchesSearch && matchesType && matchesStatus
    })
  }, [searchTerm, typeParam, selectedStatus])

  const handleFavorite = (id: string) => {
    console.log('[v0] Favorited provider:', id)
  }

  const handleEdit = (provider: Provider) => {
    setEditingProvider(provider)
  }

  const typeStats = {
    hotel: PROVIDERS_DATA.filter(p => p.type === 'hotel').length,
    restaurant: PROVIDERS_DATA.filter(p => p.type === 'restaurant').length,
    residence: PROVIDERS_DATA.filter(p => p.type === 'residence').length,
  }

  const typeLabels = {
    hotel: 'Hôtels',
    restaurant: 'Restaurants',
    residence: 'Résidences',
  }
  const typeLabel = typeParam ? typeLabels[typeParam] : 'Prestataires'
  const typeDescriptions = {
    hotel: 'Gérez vos établissements hôteliers et hébergements',
    restaurant: 'Gérez vos restaurants et établissements de restauration',
    residence: 'Gérez vos résidences et locations de vacances',
  }
  const typeDescription = typeParam ? typeDescriptions[typeParam] : 'Gérez tous vos hôtels, restaurants et résidences'

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="p-4 sm:p-6 space-y-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{typeLabel}</h1>
              {typeParam && (
                <span className={cn(
                  'px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold',
                  typeParam === 'hotel' && 'bg-primary/10 text-primary',
                  typeParam === 'restaurant' && 'bg-secondary/10 text-secondary',
                  typeParam === 'residence' && 'bg-accent/10 text-accent'
                )}>
                  {filteredProviders.length} résultat{filteredProviders.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{typeDescription}</p>
          </div>

          {/* Clear filter button when type is set */}
          {typeParam && (
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">Filtre actif :</p>
              <a
                href="/prestataires"
                className="inline-flex items-center gap-2 px-3 py-1 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium text-foreground transition-colors"
              >
                Voir tous les prestataires
              </a>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4">
            <div className="bg-muted rounded-lg p-2 sm:p-3 text-center">
              <p className="text-xs sm:text-sm text-muted-foreground">Total</p>
              <p className="text-lg sm:text-xl font-bold text-foreground">{filteredProviders.length}</p>
            </div>
            <div className="bg-primary/10 rounded-lg p-2 sm:p-3 text-center">
              <p className="text-xs sm:text-sm text-primary">Hôtels</p>
              <p className="text-lg sm:text-xl font-bold text-primary">{typeStats.hotel}</p>
            </div>
            <div className="bg-secondary/10 rounded-lg p-2 sm:p-3 text-center">
              <p className="text-xs sm:text-sm text-secondary">Restaurants</p>
              <p className="text-lg sm:text-xl font-bold text-secondary">{typeStats.restaurant}</p>
            </div>
            <div className="bg-accent/10 rounded-lg p-2 sm:p-3 text-center">
              <p className="text-xs sm:text-sm text-accent">Résidences</p>
              <p className="text-lg sm:text-xl font-bold text-accent">{typeStats.residence}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and search */}
      <div className="border-b border-border bg-card p-4 sm:p-6 space-y-3 sm:space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher par nom, localisation, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Type filter - disabled if URL param is set */}
          <div className="flex items-center gap-2 flex-1">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <select
              value={typeParam || 'all'}
              onChange={(e) => {
                const value = e.target.value
                if (value === 'all') {
                  window.location.href = '/prestataires'
                } else {
                  window.location.href = `/prestataires?type=${value}`
                }
              }}
              className={cn(
                'flex-1 px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none cursor-pointer pr-8',
                typeParam && 'opacity-80'
              )}
            >
              <option value="all">Tous les types</option>
              <option value="hotel">Hôtels</option>
              <option value="restaurant">Restaurants</option>
              <option value="residence">Résidences</option>
            </select>
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2 flex-1">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none cursor-pointer pr-8"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actifs</option>
              <option value="pending">En attente</option>
              <option value="inactive">Inactifs</option>
            </select>
          </div>

          {/* Add button */}
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm whitespace-nowrap">
            Ajouter +
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6">
          {filteredProviders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-center space-y-3">
                <Building2 className="w-12 h-12 text-muted-foreground mx-auto" />
                <h3 className="text-lg font-semibold text-foreground">Aucun prestataire trouvé</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Essayez de modifier vos filtres ou ajoutez un nouveau prestataire pour commencer.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProviders.map(provider => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  onEdit={handleEdit}
                  onFavorite={handleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
