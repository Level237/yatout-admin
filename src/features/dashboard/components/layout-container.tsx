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
    <div className="flex bg-[#FBFBFC] dark:bg-[#0B0C10] max-w-[100vw] h-screen overflow-hidden text-foreground">
      {/* Background Mesh Gradients (Optional aesthetic layer) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 dark:bg-primary/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] pointer-events-none z-0" />

      {/* Desktop Sidebar */}
      <div className="hidden sm:block z-20 relative">
        <Sidebar
          expanded={sidebarExpanded}
          onExpandChange={handleToggleSidebar}
          isMobile={false}
        />
      </div>

      {/* Mobile Sidebar overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm sm:hidden z-30 transition-opacity animate-in fade-in"
          onClick={handleCloseMobileMenu}
        />
      )}

      <div className="sm:hidden z-40 relative">
        <Sidebar
          expanded={true}
          isOpen={mobileMenuOpen}
          onClose={handleCloseMobileMenu}
          isMobile={true}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full min-w-0 overflow-hidden relative z-10 transition-all duration-300">
        {/* Header */}
        <Header
          onMobileMenuToggle={handleToggleMobileMenu}
          isMobileMenuOpen={mobileMenuOpen}
        />

        {/* Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto w-full h-full">
            {children}
          </div>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(150, 150, 150, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(150, 150, 150, 0.4);
        }
      `}} />
    </div>
  )
}
