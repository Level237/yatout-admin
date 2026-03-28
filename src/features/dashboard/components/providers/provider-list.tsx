'use client'

import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Star, MapPin, Phone, Mail, Globe, Heart, MoreVertical, Search, Filter, ChevronDown, Users, Utensils, Building2, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Suspense } from "react";

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
    description: 'Hôtel 5 étoiles de luxe au cœur de Paris',
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
    description: 'Restaurant chaleureux avec cuisine française authentique',
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
    description: 'Superbe villa méditerranéenne avec vue mer',
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
    description: 'Complexe en montagne au charme alpin',
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
    description: 'Restaurant gastronomique étoilé Michelin',
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
    description: 'Charmant studio à Montmartre',
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
    hotel: { icon: Building2, color: 'text-violet-500', bgColor: 'bg-violet-500/10', label: 'Hôtel', border: 'border-violet-500/20' },
    restaurant: { icon: Utensils, color: 'text-blue-500', bgColor: 'bg-blue-500/10', label: 'Restaurant', border: 'border-blue-500/20' },
    residence: { icon: Users, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10', label: 'Résidence', border: 'border-emerald-500/20' },
  }

  const config = typeConfig[provider.type]
  const IconComponent = config.icon

  return (
    <div className="bg-background/60 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-300 flex flex-col group">
      {/* Image Container */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        <img
          src={provider.image || "/placeholder.svg"}
          alt={provider.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          {provider.featured && (
            <div className="bg-amber-500 text-white text-[10px] uppercase tracking-widest font-extrabold px-3 py-1.5 rounded-xl shadow-lg shadow-amber-500/20">
              Vedette
            </div>
          )}
          <div className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] uppercase font-extrabold shadow-lg backdrop-blur-md border', config.bgColor, config.color, config.border)}>
            <IconComponent className="w-3.5 h-3.5" />
            <span>{config.label}</span>
          </div>
        </div>
        <button
          onClick={() => onFavorite(provider.id)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-xl bg-white/20 hover:bg-white backdrop-blur-md shadow-lg transition-all group/btn border border-white/20"
        >
          <Heart className="w-4 h-4 text-white group-hover/btn:text-rose-500 group-hover/btn:fill-rose-500 transition-colors" />
        </button>

        {/* Floating Title & Rating */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between">
          <div className="min-w-0 flex-1 pr-4">
            <h3 className="font-bold text-white text-lg tracking-tight truncate">{provider.name}</h3>
            <div className="flex items-center gap-1.5 text-white/80 text-xs mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span className="truncate">{provider.location}</span>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-md px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 border border-white/20 shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold text-white">{provider.rating}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col gap-5">
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{provider.description}</p>

        {/* Contact Info (Compact) */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2.5 px-3 py-2 bg-muted/40 rounded-xl border border-border/50 hover:bg-muted/60 transition-colors">
            <Phone className="w-4 h-4 text-primary" />
            <span className="truncate font-medium text-foreground text-xs">{provider.phone}</span>
          </div>
          <div className="flex items-center gap-2.5 px-3 py-2 bg-muted/40 rounded-xl border border-border/50 hover:bg-muted/60 transition-colors">
            <Mail className="w-4 h-4 text-primary" />
            <span className="truncate font-medium text-foreground text-xs" title={provider.email}>{provider.email}</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between mt-auto pt-5 border-t border-border/50">
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">Revenus</p>
            <p className="text-base font-extrabold text-foreground">{provider.revenue}</p>
          </div>
          <div className="w-px h-8 bg-border/50" />
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">Résas</p>
            <p className="text-base font-extrabold text-foreground">{provider.reservations}</p>
          </div>
          <div className="w-px h-8 bg-border/50" />
          <div className="text-right">
            <span className={cn(
              'inline-flex items-center justify-center px-2.5 py-1 text-[10px] uppercase tracking-widest font-extrabold rounded-lg border',
              provider.status === 'active' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                provider.status === 'pending' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                  'bg-rose-500/10 text-rose-600 border-rose-500/20'
            )}>
              {provider.status === 'active' ? 'Actif' : provider.status === 'pending' ? 'En attente' : 'Inactif'}
            </span>
          </div>
        </div>

        {/* Action button */}
        <button
          onClick={() => onEdit(provider)}
          className="w-full py-3 bg-muted hover:bg-primary hover:text-primary-foreground text-foreground border border-border/50 rounded-xl transition-all duration-300 font-bold text-sm shadow-sm flex items-center justify-center gap-2 group/action"
        >
          <span>Gérer le profil</span>
          <ChevronDown className="w-4 h-4 -rotate-90 group-hover/action:translate-x-1 transition-transform opacity-50" />
        </button>
      </div>
    </div>
  )
}

function ProvidersListContent() {
  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type') as 'hotel' | 'restaurant' | 'residence' | null

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'pending' | 'inactive'>('all')

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

  const typeLabels = {
    hotel: 'Hôtels',
    restaurant: 'Restaurants',
    residence: 'Résidences',
  }
  const typeLabel = typeParam ? typeLabels[typeParam] : 'Tous les Prestataires'
  const typeDescription = typeParam ? `Gérez vos établissements de type ${typeLabels[typeParam].toLowerCase()}` : 'Gérez l\'ensemble du réseau d\'hôtels, restaurants et résidences partenaires'

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">{typeLabel}</h1>
            <span className="px-3 py-1 rounded-xl text-xs font-bold bg-primary/10 text-primary border border-primary/20">
              {filteredProviders.length}
            </span>
          </div>
          <p className="text-muted-foreground font-medium">{typeDescription}</p>
        </div>

        <button className="flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all font-bold shadow-sm whitespace-nowrap">
          <Plus className="w-5 h-5" />
          Ajouter un partenaire
        </button>
      </div>

      {/* Control Bar */}
      <div className="bg-background/60 backdrop-blur-xl border border-border/50 rounded-3xl p-3 sm:p-4 flex flex-col sm:flex-row gap-3 shadow-sm">
        <label className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Rechercher par nom, ville, ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-muted/40 hover:bg-muted/60 focus:bg-background border border-border/50 focus:border-primary/30 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all text-foreground"
          />
        </label>

        <div className="flex gap-3">
          <label className="relative flex-1 sm:w-48 group">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <select
              value={typeParam || 'all'}
              onChange={(e) => {
                const value = e.target.value
                window.location.href = value === 'all' ? '/providers' : `/providers?type=${value}`
              }}
              className="w-full pl-11 pr-10 py-3 bg-muted/40 hover:bg-muted/60 border border-border/50 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all appearance-none cursor-pointer text-foreground"
            >
              <option value="all">Tous les types</option>
              <option value="hotel">Hôtels</option>
              <option value="restaurant">Restaurants</option>
              <option value="residence">Résidences</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </label>

          <label className="relative flex-1 sm:w-48 group">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="w-full pl-11 pr-10 py-3 bg-muted/40 hover:bg-muted/60 border border-border/50 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all appearance-none cursor-pointer text-foreground"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actifs</option>
              <option value="pending">En attente</option>
              <option value="inactive">Inactifs</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </label>
        </div>
      </div>

      {/* Grid Content */}
      <div className="pb-12">
        {filteredProviders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-background/60 backdrop-blur-xl border border-border/50 rounded-3xl border-dashed">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">Aucun prestataire trouvé</h3>
            <p className="text-muted-foreground max-w-sm text-center font-medium">
              Ajustez vos filtres ou ajoutez un nouveau partenaire pour commencer à remplir cette liste.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredProviders.map(provider => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                onEdit={(p) => console.log('Edit', p.id)}
                onFavorite={(id) => console.log('Fav', id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function ProvidersList() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground animate-pulse">Chargement de la vue premium...</div>}>
      <ProvidersListContent />
    </Suspense>
  )
}
