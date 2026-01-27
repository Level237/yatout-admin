'use client'

import React, { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, Loader } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'


export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter(); 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (!email || !password) {
        setError('Veuillez remplir tous les champs')
        return
      }

      if(email=="admin@yatoutapp.com" && password=="demo1234") {
        router.push('/dashboard')
      }
      
      console.log('Login attempt:', { email, password })
      // Here you would call your authentication API
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      // Simulate Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Google sign-in initiated')
      // Here you would initiate Google OAuth flow
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Adresse e-mail
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              id="email"
              type="email"
              placeholder="nom@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className={cn(
                'w-full pl-10 pr-4 py-2.5 bg-muted border border-border rounded-lg',
                'text-foreground placeholder:text-muted-foreground',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                'transition-all disabled:opacity-50 disabled:cursor-not-allowed',
                'text-sm sm:text-base'
              )}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Mot de passe
            </label>
            <a href="#" className="text-xs sm:text-sm text-primary hover:underline font-medium">
              Mot de passe oublié?
            </a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className={cn(
                'w-full pl-10 pr-12 py-2.5 bg-muted border border-border rounded-lg',
                'text-foreground placeholder:text-muted-foreground',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                'transition-all disabled:opacity-50 disabled:cursor-not-allowed',
                'text-sm sm:text-base'
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            'w-full py-2.5 sm:py-3 px-4 rounded-lg font-semibold text-sm sm:text-base',
            'bg-gradient-to-r from-primary to-secondary text-white',
            'hover:opacity-90 transition-all duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'flex items-center justify-center gap-2'
          )}
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              Connexion en cours...
            </>
          ) : (
            'Se connecter'
          )}
        </button>
      </form>
    </div>
  )
}
