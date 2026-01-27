'use client'

import React, { useState, useCallback } from 'react'
import { Sidebar } from "./sidebar"
import { Header } from './header'

interface LayoutContainerProps {
  children: React.ReactNode
}

export function LayoutContainer({ children }: LayoutContainerProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleToggleSidebar = useCallback((expanded: boolean) => {
    setSidebarExpanded(expanded)
  }, [])

  const handleToggleMobileMenu = useCallback((open: boolean) => {
    setMobileMenuOpen(open)
  }, [])

  const handleCloseMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  return (
    <div className="flex h-screen w-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden sm:block">
        <Sidebar
          expanded={sidebarExpanded}
          onExpandChange={handleToggleSidebar}
          isMobile={false}
        />
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 sm:hidden z-30"
          onClick={handleCloseMobileMenu}
        />
      )}

      <div className="sm:hidden">
        <Sidebar
          expanded={true}
          isOpen={mobileMenuOpen}
          onClose={handleCloseMobileMenu}
          isMobile={true}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full min-w-0 overflow-hidden">
        {/* Header */}
        <Header
          onMobileMenuToggle={handleToggleMobileMenu}
          isMobileMenuOpen={mobileMenuOpen}
        />

        {/* Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
