'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
    icon: <Home className="w-[18px] h-[18px]" />,
    href: '/dashboard',
  },
  {
    id: 'prestateurs',
    label: 'Prestataires',
    icon: <Building2 className="w-[18px] h-[18px]" />,
    href: '/providers',
    submenu: [
      { id: 'hotels', label: 'Hôtels', icon: <Building2 className="w-4 h-4" />, href: '/providers?type=hotel' },
      { id: 'restaurants', label: 'Restaurants', icon: <Utensils className="w-4 h-4" />, href: '/providers?type=restaurant' },
      { id: 'residences', label: 'Résidences', icon: <Building2 className="w-4 h-4" />, href: '/providers?type=residence' },
    ],
  },
  {
    id: 'reservations',
    label: 'Réservations',
    icon: <BarChart3 className="w-[18px] h-[18px]" />,
    href: '/reservations',
    badge: 12,
  },
  {
    id: 'clients',
    label: 'Clients',
    icon: <Users className="w-[18px] h-[18px]" />,
    href: '#',
  },
  {
    id: 'revenus',
    label: 'Revenus',
    icon: <TrendingUp className="w-[18px] h-[18px]" />,
    href: '#',
  },
  {
    id: 'parametres',
    label: 'Paramètres',
    icon: <Settings className="w-[18px] h-[18px]" />,
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
  const pathname = usePathname()

  const activeMenuId = React.useMemo(() => {
    for (const item of MENU_ITEMS) {
      if (item.href !== '#' && pathname?.startsWith(item.href)) {
        return item.id
      }
    }
    return 'overview'
  }, [pathname])

  const [expandedMenu, setExpandedMenu] = useState<string | null>(activeMenuId)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsExpanded(expanded)
  }, [expanded])

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
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          'flex flex-col bg-background/80 backdrop-blur-2xl border-r border-border/50 transition-all duration-300 ease-in-out',
          'h-screen z-40 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] dark:shadow-none',
          !isMobile ? 'fixed sm:relative' : 'fixed top-16 h-[calc(100vh-64px)]',
          isExpanded ? 'w-[280px]' : 'w-[80px]',
          isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'
        )}
      >
        {/* Logo Section */}
        {!isMobile && (
          <div className="flex items-center gap-3 px-6 py-6 transition-all duration-300 h[88px]">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
              <span className="text-white font-bold text-sm leading-none">YT</span>
            </div>
            {isExpanded && (
              <div
                className="flex-1 min-w-0 animate-in fade-in duration-300"
              >
                <h1 className="font-extrabold text-foreground text-lg tracking-tight truncate">YaTout</h1>
                <p className="text-xs text-muted-foreground font-medium truncate uppercase tracking-widest">Admin</p>
              </div>
            )}
          </div>
        )}

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-2 select-none hide-scrollbar">
          {MENU_ITEMS.map((item) => {
            const isActive = activeMenuId === item.id
            const isSubmenuOpen = expandedMenu === item.id && isExpanded

            return (
              <div key={item.id} className="relative">
                {item.submenu ? (
                  <button
                    onClick={() => handleMenuClick(item.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 relative z-10 group',
                      isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    )}
                    title={!isExpanded ? item.label : undefined}
                  >
                    <span className={cn('flex-shrink-0 transition-transform duration-200 group-hover:scale-110', isActive && 'text-primary')}>
                      {item.icon}
                    </span>
                    {isExpanded && (
                      <div className="flex-1 flex justify-between items-center overflow-hidden whitespace-nowrap animate-in fade-in duration-200">
                        <span className="text-sm font-semibold tracking-wide">{item.label}</span>
                        <ChevronDown className={cn("w-4 h-4 opacity-70 transition-transform duration-300", isSubmenuOpen && "rotate-180")} />
                      </div>
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 relative z-10 group',
                      isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    )}
                    title={!isExpanded ? item.label : undefined}
                  >
                    <span className={cn('flex-shrink-0 transition-transform duration-200 group-hover:scale-110', isActive && 'text-primary')}>
                      {item.icon}
                    </span>
                    {isExpanded && (
                      <div className="flex-1 flex justify-between items-center overflow-hidden whitespace-nowrap animate-in fade-in duration-200">
                        <span className="text-sm font-semibold tracking-wide">{item.label}</span>
                        {item.badge && (
                          <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                    {!isExpanded && item.badge && (
                      <span className="absolute top-1 right-1 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-background shadow-sm">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}

                {/* Submenu */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isSubmenuOpen ? "max-h-48 opacity-100 mt-2" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="ml-[22px] space-y-1 pl-4 border-l-2 border-border/50">
                    {item.submenu?.map((subitem) => {
                      const isSubActive = pathname === subitem.href
                      return (
                        <Link
                          key={subitem.id}
                          href={subitem.href}
                          onClick={handleLinkClick}
                          className={cn(
                            'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                            isSubActive ? 'text-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                          )}
                        >
                          <span className={cn("opacity-70 transition-transform scale-90", isSubActive && "text-primary opacity-100 scale-100")}>{subitem.icon}</span>
                          {subitem.label}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-border/50 space-y-2 bg-gradient-to-t from-background/80 to-transparent">
          {isExpanded && (
            <button
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground animate-in fade-in duration-300 group"
            >
              <div className="relative">
                <Bell className="w-5 h-5 flex-shrink-0 group-hover:-rotate-12 transition-transform" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background" />
              </div>
              <span className="text-sm font-semibold tracking-wide flex-1 text-left">Notifications</span>
            </button>
          )}

          {!isMobile && (
            <button
              onClick={handleToggle}
              className="w-full flex items-center justify-center gap-3 px-3 py-3 rounded-xl hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground group"
              title={isExpanded ? 'Réduire' : 'Étendre'}
            >
              <div className={cn("transition-transform duration-300", !isExpanded && "rotate-180")}>
                <ChevronLeft className="w-5 h-5 flex-shrink-0 group-hover:-translate-x-0.5 transition-transform" />
              </div>
              {isExpanded && (
                <span className="text-sm font-semibold tracking-wide whitespace-nowrap animate-in fade-in duration-300">
                  Réduire
                </span>
              )}
            </button>
          )}

          {isExpanded && (
            <button
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-500/10 text-red-500/80 hover:text-red-600 transition-colors group animate-in fade-in duration-300"
            >
              <LogOut className="w-5 h-5 flex-shrink-0 group-hover:scale-110 group-hover:-translate-x-1 transition-all" />
              <span className="text-sm font-semibold tracking-wide">Déconnexion</span>
            </button>
          )}
        </div>
      </aside>

      {/* Hide scrollbar styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </>
  )
}
