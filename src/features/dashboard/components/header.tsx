'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Search, Filter, Calendar, LogOut, Settings, User, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HeaderProps {
  onMobileMenuToggle?: (open: boolean) => void
  isMobileMenuOpen?: boolean
}

export function Header({ onMobileMenuToggle, isMobileMenuOpen = false }: HeaderProps) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false)
      }
    }

    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [profileDropdownOpen])

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between flex-shrink-0 relative z-50 px-4 sm:px-6 gap-4">
      {/* Left - Mobile Menu Toggle */}
      <button
        onClick={() => onMobileMenuToggle?.(!isMobileMenuOpen)}
        className="sm:hidden p-2 hover:bg-muted rounded-lg transition-colors text-foreground"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Left - Title */}
      <div className="min-w-0 flex-1 sm:flex-initial">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">Tableau de bord</h1>
        <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Bienvenue dans votre espace administrateur YaTout</p>
      </div>

      {/* Center - Search (hidden on mobile) */}
      <div className="hidden md:block flex-1 max-w-xs">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-all"
          />
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-2 sm:gap-3 ml-auto">
        {/* Search button - mobile only */}
        <button className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors text-foreground">
          <Search className="w-5 h-5" />
        </button>

        {/* Filter button - hidden on small mobile */}
        <button className="hidden sm:flex p-2 hover:bg-muted rounded-lg transition-colors text-foreground">
          <Filter className="w-5 h-5" />
        </button>

        {/* Calendar button - hidden on small mobile */}
        <button className="hidden sm:flex p-2 hover:bg-muted rounded-lg transition-colors text-foreground">
          <Calendar className="w-5 h-5" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs sm:text-sm hover:shadow-lg transition-shadow flex-shrink-0"
            aria-label="Profile menu"
            aria-expanded={profileDropdownOpen}
          >
            AD
          </button>

          {/* Dropdown menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50 animate-in fade-in-0 slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-semibold text-foreground">Admin Dupont</p>
                <p className="text-xs text-muted-foreground">admin@yatout.com</p>
              </div>

              <div className="py-1">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                  <User className="w-4 h-4" />
                  Mon profil
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                  <Settings className="w-4 h-4" />
                  Paramètres
                </button>
              </div>

              <div className="border-t border-border py-1">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors">
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
