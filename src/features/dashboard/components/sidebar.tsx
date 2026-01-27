'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import {
  ChevronDown,
  BarChart3,
  Users,
  Utensils,
  Building2,
  TrendingUp,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  Bell,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MenuItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  badge?: number
  submenu?: MenuItem[]
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'overview',
    label: 'Tableau de bord',
    icon: <Home className="w-5 h-5" />,
    href: '#',
  },
  {
    id: 'prestateurs',
    label: 'Prestataires',
    icon: <Building2 className="w-5 h-5" />,
    href: '#',
    submenu: [
      { id: 'hotels', label: 'Hôtels', icon: <Building2 className="w-4 h-4" />, href: '#' },
      { id: 'restaurants', label: 'Restaurants', icon: <Utensils className="w-4 h-4" />, href: '#' },
      { id: 'residences', label: 'Résidences', icon: <Building2 className="w-4 h-4" />, href: '#' },
    ],
  },
  {
    id: 'reservations',
    label: 'Réservations',
    icon: <BarChart3 className="w-5 h-5" />,
    href: '#',
    badge: 12,
  },
  {
    id: 'clients',
    label: 'Clients',
    icon: <Users className="w-5 h-5" />,
    href: '#',
  },
  {
    id: 'revenus',
    label: 'Revenus',
    icon: <TrendingUp className="w-5 h-5" />,
    href: '#',
  },
  {
    id: 'parametres',
    label: 'Paramètres',
    icon: <Settings className="w-5 h-5" />,
    href: '#',
  },
]

interface SidebarProps {
  expanded?: boolean
  onExpandChange?: (expanded: boolean) => void
  isOpen?: boolean
  onClose?: () => void
  isMobile?: boolean
}

export function Sidebar({
  expanded = true,
  onExpandChange,
  isOpen = true,
  onClose,
  isMobile = false,
}: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(expanded)
  const [expandedMenu, setExpandedMenu] = useState<string | null>('prestateurs')
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Synchronize expanded state
  useEffect(() => {
    setIsExpanded(expanded)
  }, [expanded])

  // Handle click outside on mobile
  useEffect(() => {
    if (!isMobile || !isOpen) return

    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose?.()
      }
    }

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
    }, 0)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, isMobile, onClose])

  const handleToggle = () => {
    const newState = !isExpanded
    setIsExpanded(newState)
    onExpandChange?.(newState)
  }

  const handleMenuClick = (menuId: string) => {
    setExpandedMenu(expandedMenu === menuId ? null : menuId)
  }

  const handleLinkClick = () => {
    if (isMobile) {
      onClose?.()
    }
  }

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        'bg-sidebar text-sidebar-foreground transition-all duration-300 ease-out',
        'border-r border-sidebar-border flex flex-col',
        'h-screen overflow-hidden',
        // Desktop positioning
        !isMobile && 'fixed left-0 top-0 sm:relative',
        // Mobile positioning
        isMobile && 'fixed left-0 top-16 z-40 h-[calc(100vh-64px)]',
        isMobile && (isOpen ? 'translate-x-0' : '-translate-x-full'),
        isExpanded ? 'w-64' : 'w-20'
      )}
    >
      {/* Logo Section - Desktop only */}
      {!isMobile && (
        <div
          className={cn(
            'flex items-center gap-3 px-4 py-6 border-b border-sidebar-border',
            'transition-all duration-300 justify-between'
          )}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">YT</span>
            </div>
            {isExpanded && (
              <div className="flex-1 min-w-0">
                <h1 className="font-bold text-white text-base truncate">YaTout</h1>
                <p className="text-xs text-sidebar-foreground/60 truncate">Admin</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {MENU_ITEMS.map((item) => (
          <div key={item.id}>
            {item.submenu ? (
              <button
                onClick={() => handleMenuClick(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                  'hover:bg-sidebar-accent/10 text-sidebar-foreground',
                  expandedMenu === item.id && 'bg-sidebar-accent/15'
                )}
                title={!isExpanded ? item.label : undefined}
              >
                <span className="flex-shrink-0 text-sidebar-accent">{item.icon}</span>
                {isExpanded && (
                  <>
                    <span className="flex-1 text-left text-sm font-medium truncate">
                      {item.label}
                    </span>
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 transition-transform duration-200 flex-shrink-0',
                        expandedMenu === item.id && 'rotate-180'
                      )}
                    />
                  </>
                )}
              </button>
            ) : (
              <Link
                href={item.href}
                onClick={handleLinkClick}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                  'hover:bg-sidebar-accent/10 text-sidebar-foreground',
                  'group relative'
                )}
                title={!isExpanded ? item.label : undefined}
              >
                <span className="flex-shrink-0 text-sidebar-accent">{item.icon}</span>
                {isExpanded && (
                  <>
                    <span className="flex-1 text-left text-sm font-medium truncate">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {!isExpanded && item.badge && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            )}

            {/* Submenu */}
            {item.submenu && expandedMenu === item.id && isExpanded && (
              <div className="mt-1 ml-6 space-y-1 pl-3 border-l border-sidebar-border/30 animate-in fade-in-0 slide-in-from-top-1 duration-200">
                {item.submenu.map((subitem) => (
                  <Link
                    key={subitem.id}
                    href={subitem.href}
                    onClick={handleLinkClick}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200',
                      'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/10'
                    )}
                  >
                    <span className="text-sidebar-accent/60">{subitem.icon}</span>
                    {subitem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-sidebar-border px-3 py-3 space-y-2">
        {isExpanded && (
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-sidebar-accent/10 transition-all duration-200 text-sidebar-foreground text-sm">
            <Bell className="w-5 h-5 text-sidebar-accent flex-shrink-0" />
            <span className="font-medium">Notifications</span>
            <span className="bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ml-auto flex-shrink-0">
              3
            </span>
          </button>
        )}

        {!isMobile && (
          <button
            onClick={handleToggle}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-sidebar-accent/10 transition-all duration-200 text-sidebar-foreground"
            title={isExpanded ? 'Réduire' : 'Étendre'}
          >
            {isExpanded ? (
              <>
                <ChevronLeft className="w-5 h-5 text-sidebar-accent flex-shrink-0" />
                <span className="text-sm font-medium">Réduire</span>
              </>
            ) : (
              <ChevronRight className="w-5 h-5 text-sidebar-accent mx-auto flex-shrink-0" />
            )}
          </button>
        )}

        {isExpanded && (
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/10 transition-all duration-200 text-red-500 text-sm font-medium">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span>Déconnexion</span>
          </button>
        )}
      </div>
    </aside>
  )
}
