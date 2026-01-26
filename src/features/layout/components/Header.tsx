"use client";

import { Bell, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-white">
      <div className="flex h-16 items-center gap-4 px-6">
        {/* Title */}
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Collaborators */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white flex items-center justify-center text-white text-xs font-semibold">
              JD
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center text-white text-xs font-semibold">
              SM
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white flex items-center justify-center text-white text-xs font-semibold">
              AL
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5"
          >
            <Plus className="h-4 w-4 text-gray-600" />
          </Button>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </Button>

        {/* Search */}
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search anything"
            className="pl-9 bg-gray-50 border-gray-200"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium text-gray-600">
            ⌘K
          </kbd>
        </div>

        {/* User Menu */}
        <Button variant="ghost" size="icon" className="rounded-full">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white text-sm font-semibold">
            YA
          </div>
        </Button>
      </div>
    </header>
  );
}
