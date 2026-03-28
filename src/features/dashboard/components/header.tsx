'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Search, Filter, Calendar, LogOut, Settings, User, Menu, X, Bell, ChevronDown, LayoutDashboard } from 'lucide-react'
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
    <header className="h-[88px] bg-background/80 backdrop-blur-xl border-b border-border/50 flex items-center justify-between flex-shrink-0 relative z-30 px-6 sm:px-10 gap-6 transition-all duration-300">
      {/* Left - Mobile Menu Toggle & Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onMobileMenuToggle?.(!isMobileMenuOpen)}
          className="sm:hidden p-2.5 bg-muted/50 hover:bg-muted/80 rounded-xl transition-all text-foreground"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="min-w-0 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-primary hidden sm:block" />
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight truncate">Vue d'ensemble</h1>
          </div>
          <p className="text-sm text-muted-foreground font-medium mt-1 hidden sm:block">
            Pilotez votre activité avec YaTout Admin
          </p>
        </div>
      </div>

      {/* Center - Command/Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md justify-center absolute left-1/2 -translate-x-1/2">
        <label className="relative w-full group cursor-text">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Rechercher partenaires, clients, ou réservations..."
            className="w-full pl-11 pr-12 py-3.5 rounded-2xl bg-muted/40 hover:bg-muted/60 focus:bg-background text-foreground placeholder:text-muted-foreground border border-transparent focus:border-primary/30 focus:shadow-[0_0_0_4px_rgba(124,58,237,0.1)] outline-none transition-all duration-300 text-sm font-medium"
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold text-muted-foreground bg-background border border-border/50 rounded-lg shadow-sm">
              ⌘K
            </kbd>
          </div>
        </label>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-3 sm:gap-4 ml-auto">
        <button className="md:hidden p-2.5 bg-muted/40 hover:bg-muted/80 rounded-xl transition-all text-muted-foreground hover:text-foreground">
          <Search className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <button className="p-2.5 bg-muted/40 hover:bg-muted/80 rounded-xl transition-all text-muted-foreground hover:text-foreground group relative">
            <Filter className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
          <button className="p-2.5 bg-muted/40 hover:bg-muted/80 rounded-xl transition-all text-muted-foreground hover:text-foreground group relative">
            <Calendar className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
          <button className="p-2.5 bg-muted/40 hover:bg-muted/80 rounded-xl transition-all text-muted-foreground hover:text-foreground group relative">
            <Bell className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-background" />
          </button>
        </div>

        <div className="h-8 w-px bg-border/50 hidden sm:block mx-2" />

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-3 p-1.5 pr-4 rounded-full hover:bg-muted/50 transition-colors"
            aria-label="Profile menu"
            aria-expanded={profileDropdownOpen}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-primary flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-background">
              AD
            </div>
            <div className="hidden sm:flex flex-col items-start leading-tight">
              <span className="text-sm font-bold text-foreground">Admin Dupont</span>
              <span className="text-[11px] font-bold text-primary">Superadmin</span>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground hidden lg:block ml-2 opacity-50" />
          </button>

          {/* Dropdown menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in-0 slide-in-from-top-2 duration-200">
              <div className="px-5 py-4 border-b border-border/50 bg-muted/20">
                <p className="text-sm font-bold text-foreground">Admin Dupont</p>
                <p className="text-xs text-muted-foreground font-medium mt-1">admin@yatout.com</p>
              </div>

              <div className="py-2 px-2">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                  <User className="w-4 h-4" />
                  Mon profil
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                  <Settings className="w-4 h-4" />
                  Paramètres
                </button>
              </div>

              <div className="p-2 border-t border-border/50 bg-muted/10">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-colors">
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
